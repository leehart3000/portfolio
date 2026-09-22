import { getCollection } from 'astro:content';

export async function getTechCategoryMap(): Promise<Record<string, string>> {
  const entries = await getCollection('tech');
  const map: Record<string, string> = {};
  entries.forEach((e) => {
    if (e.data.category) map[e.data.name] = e.data.category;
  });
  return map;
}