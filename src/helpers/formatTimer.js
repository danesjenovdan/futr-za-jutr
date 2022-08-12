export function formatTimer(remainingMs) {
  const seconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds % 60).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}
