import Link from "next/link";

export default function Footer() {
  return (
    <div className="mb-6 mt-24 md:mb-12 md:mt-32">
      <footer className="flex justify-center md:block">
        <span className="text-light-body dark:text-dark-body">
          Source code is available on{" "}
          <Link
            href="https://github.com/elijahblackmore/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-light-heading underline decoration-light-underline underline-offset-[6px] dark:text-dark-heading dark:decoration-dark-underline"
          >
            GitHub
          </Link>
        </span>
      </footer>
    </div>
  );
}
