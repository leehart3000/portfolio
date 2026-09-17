// Converts a tech name like "Tailwind CSS" into a URL-safe slug like "tailwind-css".
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}