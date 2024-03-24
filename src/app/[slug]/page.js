import rehypePrettyCode from "rehype-pretty-code";
import { compileMDX } from "next-mdx-remote/rsc";
import { formatDistanceStrict } from "date-fns";
import { getPosts, getPostBySlug } from "@/lib/posts";

export default async function Post({ params }) {
  const post = getPostBySlug(params.slug);

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [rehypePrettyCode],
      },
    },
  });

  return (
    <main>
      <time className="font-mono text-sm" dateTime={post.date}>
        {formatDistanceStrict(post.date, new Date(), {
          addSuffix: true,
        })}
      </time>
      <h1 className="mb-8 mt-1 text-2xl">{post.title}</h1>
      {content}
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
