// Textos EXACTOS aprobados. No editar sin revisión.
export const LIGHT_MESSAGES: readonly string[] = [
  "Lo que sientes hoy no es para siempre. El cuerpo y la mente sanan a su ritmo. No tienes que apurarte.",
  "No estás solo en esto. Ahora mismo, muy cerca, hay gente cuidando de otra. Tú también mereces ese cuidado.",
  "Respiraste hoy. Llegaste hasta aquí. Eso ya es fuerza, aunque no lo sientas así.",
  "Está bien no estar bien. Date permiso de ir despacio. Un día a la vez es suficiente.",
  "Después de las noches más oscuras, la calma vuelve poco a poco. A tu ritmo, también va a volver para ti.",
  "Pedir ayuda no es debilidad. Es de las cosas más valientes que puedes hacer hoy.",
] as const;

export function getTodayMessage(date = new Date()): string {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  return LIGHT_MESSAGES[dayOfYear % LIGHT_MESSAGES.length];
}
