# Blog

This repository houses the source code for my personal blog, where I will
occasionally post some of my ramblings.

It's built with [Next.js](https://nextjs.org) and
[Tailwind CSS](https://tailwindcss.com), using the
[Unified.js](https://unifiedjs.com) ecosystem to assist in manipulating Markdown
content.

The blog posts are stored in the [`posts/`](posts) directory at the root of this
repository, where each post is a Markdown file using
[YAML front matter](https://jekyllrb.com/docs/front-matter/) as metadata that
can be parsed.

## Locally running the project

[Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
and install the dependencies:

```fish
pnpm i
```

Start the development server and go [localhost:3000](localhost:3000):

```fish
pnpm run dev
```

## License

The source code for this site is licensed under the [MIT License](LICENSE).

Any writing is licensed under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
