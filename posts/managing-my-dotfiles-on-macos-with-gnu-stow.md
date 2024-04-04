---
title: Managing my dotfiles on macOS with GNU Stow
date: 2024-04-3T20:00:00.000Z
---

On Unix-like operating systems, your configuration files for various programs
are often referred to as `dotfiles` that will typically live inside a special
directory found at `~/.config`.

For example, my configuration files for
[Helix](https://github.com/helix-editor/helix) are located at `~/.config/helix`
with the following contents:

```
~/.config/helix
├── config.toml
├── languages.toml
└── themes
    └── theme.toml
```

## Why am I using GNU Stow?

[GNU Stow](https://www.gnu.org/software/stow/) is a symbolic link manager that
aids in the management of directories containing symbolic links to files located
elsewhere on the filesystem.

It allows me to easily manage a separate directory with a symlink to the
`.config` directory. This means I can turn it into a Git repository and host it
remotely on GitHub.

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
Following my convention, I would run the command
`mkdir -p ~/Documents/gh/dotfiles`.

`mkdir` creates the directory as you may already be familar with. The `-p` flag
recursively creates parent directories if they don't already exist.

Now we will be moving all of the configuration folders and files to our
newly-created `dotfiles` directory.

### Migrating our configuration files

Let's go to our `.config` directory to shorten the arguments passed to the `mv`
command with `cd ~/.config`. I will be moving my `helix` and `kitty`
configuration directories using `mv kitty helix ~/Documents/gh/dotfiles`.

Now we can navigate to the parent directory of `dotfiles` using
`cd ~/Documents/gh` and run the command `stow dotfiles` which will create
symlinks for us.

If we go back to `~/.config` and run the command `ls -l` we should see the
following output:

```
helix -> ../Documents/gh/dotfiles/helix
kitty -> ../Documents/gh/dotfiles/kitty
```

This tells us that these directories point to our `dotfiles` directory and the
symlink was successful. Any changes will automatically be synced between the two
locations.

> Please note that GNU Stow will ignore certain files by default.
>
> You can create a `.stow-local-ignore` file at the root of your package
> directory to override this behaviour just like a `.gitignore` file if you're
> familar with those.
>
> You can learn more about this
> [here](https://www.gnu.org/software/stow/manual/html_node/Types-And-Syntax-Of-Ignore-Lists.html).

## Summary

1. Install [GNU Stow](https://www.gnu.org/software/stow/) using
   `brew install stow`
2. Create a new directory that will house your dotfiles with
   `mkdir -p <dotfiles-directory>`
3. Optionally `cd` into the `~/.config` directory so the arguments passed to
   `mv` are shorter
4. Use `mv <directory/file> <dotfiles-directory` to move them your configuration
   files into `<dotfiles-directory>`
5. `cd` into the directory **above** your dotfiles directory and run the command
   `stow <dotfiles-directory>`
6. Verify that the symlink was successful by running `ls -l` inside the
   `~/.config` directory
