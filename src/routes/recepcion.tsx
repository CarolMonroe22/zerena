import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Users,
  AlertCircle,
  Clock,
  MapPin,
  Building2,
  Filter,
  CheckCircle2,
  Loader2,
  ShieldAlert,
  ChevronDown,
  UserCheck,
  LogOut,
  RefreshCw,
  MessageSquare,
  NotebookPen,
  Plus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SerenaMark } from "@/components/SerenaMark";
import {
  getMyStaffRoles,
  getInboxRequests,
  getStaffList,
  updateRequestUrgency,
  updateRequestStatus,
  assignSupportRequest,
  getSessionNotes,
  addSessionNote,
  type SupportRequestItem,
  type StaffMember,
  type StaffRole,
  type SessionNote,
} from "@/lib/recepcion.functions";

export const Route = createFileRoute("/recepcion")({
  head: () => ({
    meta: [
      { title: "Área de equipo — Zerena" },
      { name: "description", content: "Bandeja interna de recepción y triaje de Zerena." },
    ],
  }),
  component: RecepcionRoute,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-md p-6 text-center pt-20">
      <ShieldAlert className="mx-auto text-destructive" size={48} />
      <h1 className="mt-4 font-serif text-2xl text-foreground">Acceso no autorizado</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {error.message || "Ocurrió un error al verificar tus permisos de equipo."}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
        >
          Cerrar sesión e intentar de nuevo
        </button>
      </div>
    </div>
  ),
  notFoundComponent: () => <div className="p-8 text-center">No encontrado.</div>,
});

function RecepcionRoute() {
  const [sessionUser, setSessionUser] = useState<{ id: string; email?: string } | null | undefined>(
    undefined
  );
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [signupMsg, setSignupMsg] = useState("");

  const fetchRoles = useServerFn(getMyStaffRoles);
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setSessionUser(data.user ? { id: data.user.id, email: data.user.email } : null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, session) => {
      setSessionUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
      if (_evt === "SIGNED_IN" || _evt === "SIGNED_OUT") {
        queryClient.invalidateQueries({ queryKey: ["staff_roles"] });
        queryClient.invalidateQueries({ queryKey: ["inbox_requests"] });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  const { data: staffRoles, isLoading: rolesLoading } = useQuery({
    queryKey: ["staff_roles", sessionUser?.id],
    queryFn: () => fetchRoles(),
    enabled: !!sessionUser?.id,
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    setSignupMsg("");

    if (authMode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: authEmail.trim(),
        password: authPassword,
      });
      if (error) {
        setAuthError(error.message || "No se pudo crear la cuenta.");
        setAuthLoading(false);
        return;
      }
      // Sin sesión = requiere confirmar el correo antes de entrar
      if (!data.session) {
        setSignupMsg(
          "Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión."
        );
        setAuthMode("login");
        setAuthLoading(false);
      }
      // Con sesión, onAuthStateChange entra directo
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail.trim(),
      password: authPassword,
    });

    if (error) {
      setAuthError("Correo o contraseña incorrectos. Verifica tus datos.");
      setAuthLoading(false);
    }
  };

  if (sessionUser === undefined || (sessionUser && rolesLoading)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
        <Loader2 className="animate-spin text-sage-deep" size={36} />
        <p className="mt-4 font-serif text-lg text-foreground">Verificando acceso de equipo…</p>
      </div>
    );
  }

  // Pantalla de Login si no hay sesión o si inició sesión pero no tiene roles de staff
  if (!sessionUser || !staffRoles || staffRoles.length === 0) {
    return (
      <div className="mx-auto max-w-[420px] px-5 py-12 text-center">
        <div className="flex justify-center">
          <SerenaMark size={64} />
        </div>
        <h1 className="mt-4 font-serif text-3xl text-foreground">Área de equipo</h1>
        <p className="mt-1 text-sm font-medium text-sage-deep uppercase tracking-wider">
          Solo personal autorizado
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {authMode === "login"
            ? "Ingresa con tu correo de coordinación o voluntariado de Zerena."
            : "Crea tu cuenta de equipo con tu correo de coordinación de Zerena."}
        </p>

        {sessionUser && (!staffRoles || staffRoles.length === 0) && (
          <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-left text-sm text-destructive">
            <p className="font-semibold">Cuenta sin permisos de equipo</p>
            <p className="mt-1 text-xs leading-relaxed text-destructive/90">
              Iniciaste sesión como <span className="underline">{sessionUser.email}</span>, pero esta
              cuenta no tiene asignado un rol de equipo. Si acabas de registrarte como coordinadora con{" "}
              <b>hello@carolmonroe.com</b>, cierra sesión y vuelve a entrar.
            </p>
            <button
              onClick={() => supabase.auth.signOut()}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold underline"
            >
              <LogOut size={14} /> Cerrar sesión actual
            </button>
          </div>
        )}

        <form onSubmit={handleAuth} className="serena-card mt-8 space-y-4 p-6 text-left">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="nombre@equipo.org"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-sage-deep"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-sage-deep"
            />
          </div>

          {authError && (
            <div className="rounded-xl bg-destructive/10 p-3 text-xs font-medium text-destructive">
              {authError}
            </div>
          )}

          {signupMsg && (
            <div className="rounded-xl bg-sage-deep/10 p-3 text-xs font-medium text-sage-deep">
              {signupMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full rounded-full bg-sage-deep py-3 text-base font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {authLoading
              ? authMode === "signup"
                ? "Creando cuenta…"
                : "Entrando…"
              : authMode === "signup"
              ? "Crear mi cuenta"
              : "Entrar a Recepción"}
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode(authMode === "login" ? "signup" : "login");
              setAuthError("");
              setSignupMsg("");
            }}
            className="w-full text-center text-xs font-semibold text-sage-deep underline underline-offset-2"
          >
            {authMode === "login"
              ? "¿Primera vez? Crear mi cuenta de equipo"
              : "¿Ya tienes cuenta? Iniciar sesión"}
          </button>
        </form>

        <p className="mt-6 text-xs text-muted-foreground">
          ¿Problemas de acceso? Contacta a la coordinación general.
        </p>
      </div>
    );
  }

  // Usuario autenticado y con rol de staff
  return <InboxView user={sessionUser} roles={staffRoles} />;
}

// ==========================================
// BANDEJA PRINCIPAL (INBOX)
// ==========================================

function InboxView({
  user,
  roles,
}: {
  user: { id: string; email?: string };
  roles: StaffRole[];
}) {
  const queryClient = useQueryClient();
  const isCoordinator = roles.includes("coordinador");

  // Filtros
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [filterUrgency, setFilterUrgency] = useState<string>("todas");
  const [filterForWhom, setFilterForWhom] = useState<string>("todos");
  const [filterProfile, setFilterProfile] = useState<string>("todos");

  const fetchInbox = useServerFn(getInboxRequests);
  const fetchStaff = useServerFn(getStaffList);

  const { data: requests = [], isLoading, isRefetching } = useQuery({
    queryKey: ["inbox_requests"],
    queryFn: () => fetchInbox(),
  });

  const { data: staffList = [] } = useQuery({
    queryKey: ["staff_list"],
    queryFn: () => fetchStaff(),
  });

  const urgencyFn = useServerFn(updateRequestUrgency);
  const statusFn = useServerFn(updateRequestStatus);
  const assignFn = useServerFn(assignSupportRequest);

  // Mutaciones
  const urgencyMut = useMutation({
    mutationFn: (args: { id: string; urgency: "alta" | "media" | "baja" }) => urgencyFn({ data: args }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inbox_requests"] }),
  });

  const statusMut = useMutation({
    mutationFn: (args: { id: string; status: "nuevo" | "en_seguimiento" | "cerrado" }) => statusFn({ data: args }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inbox_requests"] }),
  });

  const assignMut = useMutation({
    mutationFn: (args: { id: string; assigned_to: string | null }) => assignFn({ data: args }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inbox_requests"] }),
  });

  // Contadores
  const countNuevo = requests.filter((r) => r.status === "nuevo").length;
  const countSeguimiento = requests.filter((r) => r.status === "en_seguimiento").length;
  const countCerrado = requests.filter((r) => r.status === "cerrado").length;

  // Filtrado de lista
  const filteredRequests = requests.filter((item) => {
    if (filterStatus !== "todos" && item.status !== filterStatus) return false;
    if (filterUrgency !== "todas" && item.urgency !== filterUrgency) return false;
    if (filterForWhom !== "todos" && item.for_whom !== filterForWhom) return false;
    if (filterProfile !== "todos" && (item.profile || "no_indicado") !== filterProfile) return false;
    return true;
  });

  const mapForWhom = (fw: string) => {
    if (fw === "mi") return "Para sí mismo";
    if (fw === "otra") return "Para otra persona";
    if (fw === "albergue") return "Albergue / Refugio";
    return fw;
  };

  const mapProfile = (p: string | null) => {
    if (!p) return "Población general";
    const map: Record<string, string> = {
      adulto: "Adulto",
      nino_adolescente: "Niño / Adolescente",
      cuidador: "Cuidador",
      adulto_mayor: "Adulto mayor",
      discapacidad: "Discapacidad",
    };
    return map[p] || p;
  };

  const getUrgencyBadge = (urg: string) => {
    if (urg === "alta") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-3 py-1 text-xs font-bold text-destructive">
          <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" /> Urgencia Alta
        </span>
      );
    }
    if (urg === "media") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-500" /> Urgencia Media
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
        <span className="h-2 w-2 rounded-full bg-emerald-500" /> Urgencia Baja
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Barra superior del equipo */}
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl text-foreground">Recepción y Triaje</h1>
            {isRefetching && <RefreshCw className="animate-spin text-muted-foreground" size={16} />}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Conectado como <b className="text-foreground">{user.email}</b> ({roles.join(", ")})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ["inbox_requests"] })}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            title="Actualizar lista"
          >
            <RefreshCw size={14} /> Actualizar
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut size={14} /> Salir
          </button>
        </div>
      </header>

      {/* Contadores grandes por Estado */}
      <section className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        <button
          onClick={() => setFilterStatus(filterStatus === "nuevo" ? "todos" : "nuevo")}
          className={`rounded-2xl border p-4 text-center transition-all ${
            filterStatus === "nuevo"
              ? "border-sage-deep bg-sage-deep/10 ring-2 ring-sage-deep/20"
              : "border-border bg-card hover:border-sage/50"
          }`}
        >
          <p className="text-2xl font-bold text-foreground sm:text-3xl">{countNuevo}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-sage-deep">Nuevos</p>
        </button>

        <button
          onClick={() => setFilterStatus(filterStatus === "en_seguimiento" ? "todos" : "en_seguimiento")}
          className={`rounded-2xl border p-4 text-center transition-all ${
            filterStatus === "en_seguimiento"
              ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20"
              : "border-border bg-card hover:border-amber-500/50"
          }`}
        >
          <p className="text-2xl font-bold text-foreground sm:text-3xl">{countSeguimiento}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            En seguimiento
          </p>
        </button>

        <button
          onClick={() => setFilterStatus(filterStatus === "cerrado" ? "todos" : "cerrado")}
          className={`rounded-2xl border p-4 text-center transition-all ${
            filterStatus === "cerrado"
              ? "border-muted-foreground bg-secondary ring-2 ring-muted-foreground/20"
              : "border-border bg-card hover:bg-secondary/50"
          }`}
        >
          <p className="text-2xl font-bold text-foreground sm:text-3xl">{countCerrado}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Cerrados
          </p>
        </button>
      </section>

      {/* Barra de Filtros secundarios */}
      <section className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-secondary/50 p-3.5 sm:p-4">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Filter size={14} /> Filtros:
        </div>

        <select
          value={filterUrgency}
          onChange={(e) => setFilterUrgency(e.target.value)}
          className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground outline-none"
        >
          <option value="todas">Urgencia: Todas</option>
          <option value="alta">🔴 Alta</option>
          <option value="media">🟡 Media</option>
          <option value="baja">🟢 Baja</option>
        </select>

        <select
          value={filterForWhom}
          onChange={(e) => setFilterForWhom(e.target.value)}
          className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground outline-none"
        >
          <option value="todos">Para quién: Todos</option>
          <option value="mi">Para sí mismo</option>
          <option value="otra">Para otra persona</option>
          <option value="albergue">Albergue / Refugio</option>
        </select>

        <select
          value={filterProfile}
          onChange={(e) => setFilterProfile(e.target.value)}
          className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground outline-none"
        >
          <option value="todos">Población: Todas</option>
          <option value="adulto">Adultos</option>
          <option value="nino_adolescente">Niños / Adolescentes</option>
          <option value="cuidador">Cuidadores</option>
          <option value="adulto_mayor">Adultos mayores</option>
          <option value="discapacidad">Con discapacidad</option>
        </select>

        {(filterStatus !== "todos" || filterUrgency !== "todas" || filterForWhom !== "todos" || filterProfile !== "todos") && (
          <button
            onClick={() => {
              setFilterStatus("todos");
              setFilterUrgency("todas");
              setFilterForWhom("todos");
              setFilterProfile("todos");
            }}
            className="ml-auto text-xs font-bold text-sage-deep underline underline-offset-2"
          >
            Limpiar filtros
          </button>
        )}
      </section>

      {/* LISTA DE SOLICITUDES */}
      <section className="mt-6 space-y-4">
        {isLoading ? (
          <div className="py-20 text-center">
            <Loader2 className="mx-auto animate-spin text-sage-deep" size={36} />
            <p className="mt-3 text-sm text-muted-foreground">Cargando bandeja de casos…</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <CheckCircle2 className="mx-auto text-sage" size={40} />
            <p className="mt-3 font-serif text-lg text-foreground">No hay solicitudes en esta vista</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {requests.length === 0
                ? "La bandeja está al día. Nadie ha enviado solicitudes nuevas."
                : "Prueba cambiando o limpiando los filtros de arriba."}
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const dateStr = new Date(req.created_at).toLocaleString("es-VE", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            });

            const assignedMember = req.assigned_to
              ? staffList.find((s) => s.user_id === req.assigned_to)
              : null;

            return (
              <article
                key={req.id}
                className="serena-card overflow-hidden p-5 transition-all hover:border-sage/60 sm:p-6"
              >
                {/* Cabecera de la Tarjeta del caso */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {getUrgencyBadge(req.urgency)}
                    <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground">
                      {mapForWhom(req.for_whom)}
                    </span>
                    <span className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">
                      {mapProfile(req.profile)}
                    </span>
                    {req.disability_type && (
                      <span className="rounded-md bg-peach-bg px-2 py-0.5 text-xs text-foreground">
                        Discapacidad: {req.disability_type}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock size={14} /> {dateStr}
                  </div>
                </div>

                {/* Si es albergue, recuadro destacado */}
                {req.for_whom === "albergue" && (
                  <div className="mt-4 rounded-xl bg-amber-500/10 p-3.5 text-xs leading-relaxed text-foreground dark:bg-amber-500/15 sm:p-4">
                    <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
                      <Building2 size={16} /> Datos del Albergue o Refugio:
                    </div>
                    <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
                      <div>
                        <span className="text-muted-foreground">Nombre:</span>{" "}
                        <b>{req.shelter_name || "No indicado"}</b>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Ubicación:</span>{" "}
                        <b>{req.shelter_location || "No indicada"}</b>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Personas:</span>{" "}
                        <b>{req.shelter_people_count || "Sin dato"}</b>
                      </div>
                    </div>
                    {req.shelter_contact && (
                      <div className="mt-1.5 pt-1.5 border-t border-amber-500/20">
                        <span className="text-muted-foreground">Contacto del albergue:</span>{" "}
                        <b>{req.shelter_contact}</b>
                      </div>
                    )}
                  </div>
                )}

                {/* Extracto del caso */}
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Detalle de lo que ocurre {req.name ? `(enviado por ${req.name})` : ""}
                  </p>
                  <p className="mt-1.5 whitespace-pre-line rounded-xl bg-background p-4 text-sm leading-relaxed text-foreground border border-border/50 font-sans">
                    {req.case_details || "Sin detalles específicos indicados en la solicitud."}
                  </p>
                </div>

                {/* Contacto */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Canal de contacto de la persona:
                  </span>
                  <span className="rounded-lg bg-secondary px-3 py-1 font-mono font-medium text-foreground select-all">
                    {req.contact}
                  </span>
                </div>

                {/* HOJA DE SEGUIMIENTO */}
                <CaseNotes
                  caseId={req.id}
                  canWrite={isCoordinator || req.assigned_to === user.id}
                />

                {/* ZONA DE ACCIONES GRANDES Y CLARAS */}
                <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4 bg-secondary/30 -mx-5 -mb-5 p-5 sm:-mx-6 sm:-mb-6 sm:p-6">
                  {/* Grupo 1: Estado y Urgencia */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {/* Botón de urgencia */}
                    <div className="relative inline-block">
                      <select
                        value={req.urgency}
                        disabled={urgencyMut.isPending}
                        onChange={(e) =>
                          urgencyMut.mutate({
                            id: req.id,
                            urgency: e.target.value as "alta" | "media" | "baja",
                          })
                        }
                        className="cursor-pointer appearance-none rounded-xl border border-border bg-card py-2.5 pl-3 pr-8 text-xs font-bold text-foreground shadow-sm outline-none hover:bg-secondary focus:ring-2 focus:ring-sage"
                      >
                        <option value="alta">🔴 Urgencia: Alta</option>
                        <option value="media">🟡 Urgencia: Media</option>
                        <option value="baja">🟢 Urgencia: Baja</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                    </div>

                    {/* Botón de estado */}
                    <div className="relative inline-block">
                      <select
                        value={req.status}
                        disabled={statusMut.isPending}
                        onChange={(e) =>
                          statusMut.mutate({
                            id: req.id,
                            status: e.target.value as "nuevo" | "en_seguimiento" | "cerrado",
                          })
                        }
                        className={`cursor-pointer appearance-none rounded-xl border py-2.5 pl-3 pr-8 text-xs font-bold shadow-sm outline-none focus:ring-2 focus:ring-sage ${
                          req.status === "nuevo"
                            ? "border-sage-deep bg-sage-deep/10 text-sage-deep"
                            : req.status === "en_seguimiento"
                            ? "border-amber-500 bg-amber-500/10 text-amber-800 dark:text-amber-300"
                            : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        <option value="nuevo">✨ Estado: Nuevo</option>
                        <option value="en_seguimiento">💬 En seguimiento</option>
                        <option value="cerrado">✔️ Caso cerrado</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                    </div>
                  </div>

                  {/* Grupo 2: Asignación */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {/* Botón rápido Tomar caso (si está libre o asignado a otro) */}
                    {req.assigned_to !== user.id && (
                      <button
                        type="button"
                        disabled={assignMut.isPending}
                        onClick={() => assignMut.mutate({ id: req.id, assigned_to: user.id })}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-sage-deep px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                      >
                        <UserCheck size={16} /> Tomar caso
                      </button>
                    )}

                    {/* Asignar a... */}
                    <div className="relative inline-block">
                      <select
                        value={req.assigned_to || ""}
                        disabled={assignMut.isPending}
                        onChange={(e) =>
                          assignMut.mutate({
                            id: req.id,
                            assigned_to: e.target.value === "" ? null : e.target.value,
                          })
                        }
                        className="cursor-pointer appearance-none rounded-xl border border-border bg-card py-2.5 pl-3 pr-8 text-xs font-medium text-foreground shadow-sm outline-none hover:bg-secondary focus:ring-2 focus:ring-sage"
                      >
                        <option value="">👤 Asignar a… (Nadie)</option>
                        <option value={user.id}>🙋 Mí mismo ({user.email})</option>
                        {staffList
                          .filter((s) => s.user_id !== user.id)
                          .map((s) => (
                            <option key={s.user_id} value={s.user_id}>
                              {s.email} ({s.role})
                            </option>
                          ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                    </div>

                    {req.assigned_to && (
                      <span className="text-xs text-muted-foreground">
                        Asignado a:{" "}
                        <b className="text-foreground">
                          {req.assigned_to === user.id ? "Tí" : assignedMember?.email || "Staff"}
                        </b>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}

// ==========================================
// HOJA DE SEGUIMIENTO (notas de sesión por caso)
// ==========================================

function CaseNotes({ caseId, canWrite }: { caseId: string; canWrite: boolean }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [temas, setTemas] = useState("");
  const [salio, setSalio] = useState("");
  const [indicaciones, setIndicaciones] = useState("");
  const [evolucion, setEvolucion] = useState<"mas_tranquila" | "igual" | "agitada" | null>(null);

  const fetchNotes = useServerFn(getSessionNotes);
  const addNote = useServerFn(addSessionNote);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["session_notes", caseId],
    queryFn: () => fetchNotes({ data: { caseId } }),
    enabled: open,
  });

  const addMut = useMutation({
    mutationFn: () =>
      addNote({
        data: {
          case_id: caseId,
          temas_tratados: temas || undefined,
          salio_a_flote: salio || undefined,
          indicaciones: indicaciones || undefined,
          evolucion: evolucion || undefined,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session_notes", caseId] });
      setTemas("");
      setSalio("");
      setIndicaciones("");
      setEvolucion(null);
      setShowForm(false);
    },
  });

  const evoLabel = (e: string | null) =>
    e === "mas_tranquila"
      ? "🌤️ Más tranquila"
      : e === "igual"
      ? "➖ Igual"
      : e === "agitada"
      ? "⚡ Agitada"
      : "";

  const empty = !temas && !salio && !indicaciones && !evolucion;

  return (
    <div className="mt-5 border-t border-border pt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sage-deep"
      >
        <NotebookPen size={15} /> Hoja de seguimiento
        {notes.length > 0 ? ` (${notes.length})` : ""}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {canWrite && !showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sage-deep px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90"
            >
              <Plus size={16} /> Nueva nota de sesión
            </button>
          )}

          {canWrite && showForm && (
            <div className="space-y-3 rounded-2xl border border-border bg-background p-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Temas tratados</label>
                <textarea
                  value={temas}
                  onChange={(e) => setTemas(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-sage"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Lo que salió a flote</label>
                <textarea
                  value={salio}
                  onChange={(e) => setSalio(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-sage"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Indicaciones dadas</label>
                <textarea
                  value={indicaciones}
                  onChange={(e) => setIndicaciones(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-sage"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">¿Cómo se le vio?</label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["mas_tranquila", "🌤️ Más tranquila"],
                      ["igual", "➖ Igual"],
                      ["agitada", "⚡ Agitada"],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setEvolucion(evolucion === val ? null : val)}
                      className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                        evolucion === val
                          ? "border-sage-deep bg-sage-deep/10 text-sage-deep"
                          : "border-border bg-card text-foreground hover:bg-secondary"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {addMut.isError && (
                <p className="text-xs text-destructive">
                  No se pudo guardar la nota. Verifica que el caso esté asignado a ti.
                </p>
              )}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  disabled={addMut.isPending || empty}
                  onClick={() => addMut.mutate()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-sage-deep px-4 py-2.5 text-xs font-bold text-primary-foreground disabled:opacity-50"
                >
                  {addMut.isPending ? "Guardando…" : "Guardar nota"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-border px-4 py-2.5 text-xs font-medium text-muted-foreground hover:bg-secondary"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {isLoading ? (
            <p className="py-2 text-xs text-muted-foreground">Cargando notas…</p>
          ) : notes.length === 0 ? (
            <p className="py-2 text-xs text-muted-foreground">
              Aún no hay notas de seguimiento para este caso.
            </p>
          ) : (
            <div className="space-y-2.5">
              {notes.map((n: SessionNote) => {
                const d = new Date(n.created_at).toLocaleString("es-VE", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <div key={n.id} className="rounded-xl border border-border/60 bg-card p-3.5 text-sm">
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{d}</span>
                      {n.evolucion && (
                        <span className="font-semibold text-foreground">{evoLabel(n.evolucion)}</span>
                      )}
                    </div>
                    {n.temas_tratados && (
                      <p className="mt-2">
                        <b className="text-xs text-muted-foreground">Temas: </b>
                        {n.temas_tratados}
                      </p>
                    )}
                    {n.salio_a_flote && (
                      <p className="mt-1">
                        <b className="text-xs text-muted-foreground">Salió a flote: </b>
                        {n.salio_a_flote}
                      </p>
                    )}
                    {n.indicaciones && (
                      <p className="mt-1">
                        <b className="text-xs text-muted-foreground">Indicaciones: </b>
                        {n.indicaciones}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
