import Link from "next/link";

export default function Footer() {
  return (
    <div className="mb-6 mt-6 md:mb-12 md:mt-12">
      <footer className="flex justify-center md:block">
        <span className="text-light-body dark:text-dark-body">
          Source code is available on{" "}
          <Link
            href="https://github.com/elijahblackmore/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-medium text-light-body underline decoration-light-icon decoration-wavy underline-offset-4 dark:text-dark-heading dark:decoration-dark-icon"
          >
            GitHub
          </Link>
        </span>
      </footer>
    </div>
  );
}
