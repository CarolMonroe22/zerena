// Textos EXACTOS aprobados. No editar sin revisión.
// Validan en presente, no prometen el futuro.
export const LIGHT_MESSAGES: readonly string[] = [
  "No tienes que sentirte distinto a como te sientes hoy. Tu dolor tiene su tiempo.",
  "No estás solo en esto. Ahora mismo, muy cerca, hay gente cuidando de otra. Tú también mereces ese cuidado.",
  "Respiraste hoy. Llegaste hasta aquí. Eso ya es fuerza, aunque no lo sientas así.",
  "Está bien no estar bien. Date permiso de ir despacio.",
  "No tienes que poder con todo hoy. Por ahora, basta con respirar y seguir aquí.",
  "Pedir ayuda no es debilidad. Es de las cosas más valientes que puedes hacer hoy.",
] as const;

export function getTodayMessage(date = new Date()): string {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  return LIGHT_MESSAGES[dayOfYear % LIGHT_MESSAGES.length];
}
