import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug) {
  const postSlug = slug.replace(/\.md$/, "");
  const postPath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContents = fs.readFileSync(postPath, "utf-8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: postSlug, content };
}

export function getPosts() {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}
