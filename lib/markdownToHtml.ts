import { remark } from "remark";
import html from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, {
      sanitize: false, // This allows us to add classes to the generated HTML
      prefix: 'prose prose-slate dark:prose-invert ' // Add base classes to all content
    })
    .process(markdown);
  return result.toString();
}