import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type StaffRole = "coordinador" | "profesional" | "voluntario";

export type SupportRequestItem = {
  id: string;
  created_at: string;
  for_whom: "mi" | "otra" | "albergue";
  name: string | null;
  case_details: string | null;
  contact: string;
  profile: string | null;
  disability_type: string | null;
  shelter_name: string | null;
  shelter_location: string | null;
  shelter_people_count: string | null;
  shelter_contact: string | null;
  status: "nuevo" | "en_seguimiento" | "cerrado";
  urgency: "alta" | "media" | "baja";
  assigned_to: string | null;
};

// 1. Verificar sesión y obtener roles del usuario en el staff
export const getMyStaffRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);

    if (error) {
      console.error("Error fetching user roles:", error);
      return [];
    }

    return (data || []).map((r) => r.role as StaffRole);
  });

// 2. Obtener lista de solicitudes de soporte (bandeja)
export const getInboxRequests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    // Verificamos en el servidor si tiene rol
    const { data: roles } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);

    if (!roles || roles.length === 0) {
      throw new Error("No tienes permisos de staff para ver esta bandeja.");
    }

    const { data, error } = await context.supabase
      .from("support_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching support requests:", error);
      throw error;
    }

    return (data || []) as SupportRequestItem[];
  });

// 3. Obtener lista del equipo de staff (para poder asignar casos)
export type StaffMember = {
  user_id: string;
  email: string;
  role: StaffRole;
};

export const getStaffList = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Traer todos los roles
    const { data: roles, error } = await context.supabase
      .from("user_roles")
      .select("user_id, role");

    if (error || !roles) return [];

    // Traer correos de auth usando admin
    const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();

    if (usersError || !users) return [];

    const userMap = new Map(users.map((u) => [u.id, u.email || "Sin correo"]));

    const list: StaffMember[] = roles.map((r) => ({
      user_id: r.user_id,
      email: userMap.get(r.user_id) || r.user_id,
      role: r.role as StaffRole,
    }));

    return list;
  });

// 4. Actualizar urgencia
export const updateRequestUrgency = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        urgency: z.enum(["alta", "media", "baja"]),
      })
      .parse(data)
  )
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase
      .from("support_requests")
      .update({ urgency: data.urgency })
      .eq("id", data.id);

    if (error) throw error;
    return { ok: true };
  });

// 5. Actualizar estado
export const updateRequestStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["nuevo", "en_seguimiento", "cerrado"]),
      })
      .parse(data)
  )
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase
      .from("support_requests")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) throw error;
    return { ok: true };
  });

// 6. Asignar caso (tomar o asignar a alguien)
export const assignSupportRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        assigned_to: z.string().nullable(),
      })
      .parse(data)
  )
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase
      .from("support_requests")
      .update({ assigned_to: data.assigned_to })
      .eq("id", data.id);

    if (error) throw error;
    return { ok: true };
  });
