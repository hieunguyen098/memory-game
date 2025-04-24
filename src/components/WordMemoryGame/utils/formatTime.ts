/**
 * Formats seconds into a MM:SS time string
 * @param seconds Number of seconds to format
 * @returns Formatted time string (e.g. "05:32")
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}
