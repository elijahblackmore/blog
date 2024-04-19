---
title: Formatting Markdown with Deno
date: 2024-04-19T20:00:00.000Z
---

At the school I attend, we have been leveraging GitHub within our workflow to
manage various areas.

If you are unfamiliar with GitHub, a very common method for formatting elements
is through the markup language [Markdown](https://www.markdownguide.org), which
can be used in
[README](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
files,
[GitHub Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues),
and much more.

I found this language to be really ergonomic, which sparked interest in using it
to write posts for this blog. After doing some research, I found it really
trivial to compile Markdown to HTML through the
[Unified.js](https://unifiedjs.com) toolchain.

---

Back to the topic of the post — I tend to do all of my Markdown editing locally,
unless it's a minor change and I want a preview. Using a formatter ensures more
consistent structure throughout the Markdown file **without** manual
intervention.

Elements like [tables](https://www.markdownguide.org/extended-syntax/#tables)
can be pretty painful without one. Assuming you have a valid Markdown table,
Deno will automatically add any necessary whitespace and hyphens to align each
column.

Let's look at this in a bit more detail:

```md
| Hello | World      |
| ---- | --- |
|Some text | Some other text|
```

Using `deno fmt` on this snippet yields the following result:

```md
| Hello     | World           |
| --------- | --------------- |
| Some text | Some other text |
```

> Deno can even format code used within
> [code blocks](https://www.markdownguide.org/extended-syntax/#fenced-code-blocks),
> assuming you have a language specified next to the backticks.

## Installing Deno

To install Deno, you can refer to the official installation documentation
[here](https://docs.deno.com/runtime/manual/getting_started/installation). As I
am on Apple Silicon with [Homebrew](https://brew.sh), I used the following
command to install the binary:

```fish
brew install deno
```

We can now use `deno fmt` to format various file types.

In this case, `deno fmt` will format all files in the current directory,
including those in subdirectories. To format a specific file, you can use
`deno fmt file.md`, but I advise looking at the
[documentation](https://docs.deno.com/runtime/manual/tools/formatter) for more
information.

## Using Deno with Helix

I use [Helix](https://github.com/helix-editor/helix) as my text editor of
choice, which supports using any external formatter so long as it can take the
original file as input from `stdin` and write the formatted file to `stdout`.

If you're also using Helix, you can add the following snippet to your
`languages.toml` file:

```toml
[[language]]
name = "markdown"
language-servers = ["deno"]
auto-format = true
```

The current Markdown file will now be formatted whenever we write to it.

## Using Deno with other editors

Deno can be used with a wide range of editors — you can see the full list
[here](https://docs.deno.com/runtime/manual/getting_started/setup_your_environment),
which includes setup guides for each one.
