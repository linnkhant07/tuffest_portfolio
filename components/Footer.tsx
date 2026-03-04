import { siteData } from "@/content/siteData";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-4 py-8 text-sm text-[var(--text-dim)] sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>
          {new Date().getFullYear()} {siteData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
