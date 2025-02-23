import styles from "./post-body.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <article className={styles.article}>
        <div
          className="prose prose-lg dark:prose-invert prose-headings:text-gray-300 dark:prose-headings:text-gray-100 prose-p:text-gray-300 dark:prose-p:text-gray-100 prose-li:text-gray-300 dark:prose-li:text-gray-100 max-w-none font-mono "
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </div>
  );
}

export default PostBody;

