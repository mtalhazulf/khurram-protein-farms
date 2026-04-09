import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Render markdown to HTML. Safe to use server-side; the output should still
 * be treated as trusted (admin-authored) content.
 */
export async function renderMarkdown(md: string): Promise<string> {
  if (!md) return "";
  return marked.parse(md) as string;
}
