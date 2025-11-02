export function calculateReadingTime(content: string): number {
  if (!content) return 0;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}
