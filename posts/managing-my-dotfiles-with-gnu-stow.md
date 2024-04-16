---
title: Managing my dotfiles on macOS with GNU Stow
date: 2024-04-16T20:00:00.000Z
---

I recently made my dotfiles repository for common applications in my workflow
public — which you can find at
[this](https://github.com/elijahblackmore/dotfiles) repository.

I thought it would be a good opportunity to talk about how I'm managing it, and
the simple process for setting it up.

---

On Unix-like operating systems, your configuration files for various programs
are often referred to as `dotfiles` that will typically live inside a special
directory found at `$HOME/.config`.

An easier way of navigating to the home directory is by using a tilde. For
example, my configuration files for
[Helix](https://github.com/helix-editor/helix) are located at `~/.config/helix`
with the following contents:

```console
~/.config/helix
├── config.toml
├── languages.toml
└── themes
    └── theme.toml
```

## Why am I using GNU Stow?

[GNU Stow](https://www.gnu.org/software/stow/) is a symbolic link manager that
aids in the management of directories containing symbolic links to files located
elsewhere on the file system.

It allows me to easily manage a separate directory with a symlink to the
`.config` directory. This makes it trivial to turn it into a separate Git
repository and host it remotely on GitHub.

This is a great way to backup important configuration files so I never lose
them, and also allows me to easily share them with others.

At the moment, I have a `dotfiles` directory located under
`~/Documents/gh/dotfiles` which houses all of my configuration files. `gh` is
just a shorthand for GitHub, where I store all local instances of GitHub
repositories.

## Getting started

### Installing GNU Stow

These instructions will be for macOS running on Apple Silicon, but the only
difference between Linux or other Unix-like operating systems should be the
installation method. I am using [Homebrew](https://brew.sh) to install it using
`brew install stow`.

### Creating our dotfiles directory

Once installed, create a new directory that will store all of your dotfiles.
Following my convention, I would run the command:

```fish
mkdir -p ~/Documents/gh/dotfiles
```

`mkdir` creates the directory as you may already be familar with. The `-p` flag
recursively creates parent directories if they don't already exist.

Now we will be moving all the configuration folders and files to our
newly-created `dotfiles` directory.

### Migrating our configuration files

Let's go to our `.config` directory to shorten the arguments passed to the `mv`
command:

```fish
cd ~/.config
```

I will be moving my `helix` and `kitty` configuration directories using:

```fish
mv kitty helix ~/Documents/gh/dotfiles
```

Navigate to the parent directory of `dotfiles` with:

```fish
cd ~/Documents/gh
```

And run the command:

```fish
stow dotfiles
```

This will create symlinks for us. If we go back to `~/.config` and run the
command `ls -l` we should see the following output:

```console
helix -> ../Documents/gh/dotfiles/helix
kitty -> ../Documents/gh/dotfiles/kitty
```

This tells us that these directories point to our `dotfiles` directory and the
symlink was successful. Any changes will automatically be synced between the two
locations, making it easy to commit changes and push it to the remote
repository.

> Please note that GNU Stow will ignore certain files by default.
>
> You can create a `.stow-local-ignore` file at the root of your package
> directory to override this behaviour just like a `.gitignore` file, if you're
> familiar with those.
>
> You can learn more about this
> [here](https://www.gnu.org/software/stow/manual/html_node/Types-And-Syntax-Of-Ignore-Lists.html).

## Summary

1. Install [GNU Stow](https://www.gnu.org/software/stow/) using
   `brew install stow` or whichever platform-specific install method you prefer.
2. Create a new directory that will house your dotfiles with
   `mkdir -p <dotfiles-directory>`.
3. Optionally `cd` into the `~/.config` directory so the arguments passed to
   `mv` are shorter.
4. Use `mv <directory-or-file> <dotfiles-directory>` to migrate your
   configuration.
5. `cd` into the directory **one-level above** your dotfiles directory and run
   the command `stow <dotfiles-directory>`.
6. You can verify that the symlink was successful by running `ls -l` inside the
   `~/.config` directory.
