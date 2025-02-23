import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getPostBySlug } from "../api/api";
import markdownToHtml from "../../lib/markdownToHtml";
import Container from "../../components/container";
import Header from "../../components/header";
import PostBody from "../../components/post-body";
import PostTitle from "../../components/post-title";
import CoverImage from "../../components/cover-image";
import { Post } from "../../interfaces/post";

type Props = {
  post: Post;
  content: string;
};

export default function PostPage({ post, content }: Props) {
  if (!post) {
    return (
      <main className="min-h-screen bg-background dark:bg-darkBg">
        <Container>
          <Header />
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              Post not found
            </h2>
            <a
              href="/"
              className="text-primary hover:text-primary-600 dark:text-primary-400 
                       dark:hover:text-primary-300 underline transition-colors duration-200"
            >
              Return to home
            </a>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <div>
      <main className="min-h-screen bg-background dark:bg-darkBg pb-16 flex-grow">
        &nbsp;
        <Container>
          <Header />
          <article className="mb-32">
            <div className="text-center mb-16 space-y-8">
              <PostTitle>{post.title}</PostTitle>
              <div className="flex items-center justify-center space-x-4">
                {/* Add author and date here if needed */}
              </div>
            </div>
            <div className="mb-16 w-full max-w-4xl mx-auto">
              <CoverImage title={post.title} src={post.coverImage} />
            </div>
            <PostBody content={content} />
          </article>
        </Container>

      </main>

    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  const content = await markdownToHtml(post?.content || "");

  return {
    props: {
      post,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
