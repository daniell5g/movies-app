export function formatTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let result = '';

  if (hours > 0) {
    result += `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }

  if (minutes > 0) {
    if (hours > 0) {
      result += ' e ';
    }
    result += `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }

  return result;
}