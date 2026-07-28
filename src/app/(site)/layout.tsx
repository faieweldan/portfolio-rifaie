import { Rail } from "@/components/rail";

/**
 * Layout for the public portfolio only. The admin page sits outside this
 * group so it doesn't inherit the sidebar, whose links point at sections
 * that only exist on the portfolio page.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // min-h-screen keeps the sidebar filling the window even when a page is
    // shorter than the viewport.
    <div className="grid min-h-screen grid-cols-1 sm:grid-cols-[clamp(168px,23%,250px)_1fr]">
      <Rail />
      <main className="min-w-0">{children}</main>
    </div>
  );
}
