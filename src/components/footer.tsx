export function Footer() {
  return (
    <footer className="border-t-2 border-foreground px-8 py-5 font-mono text-[0.64rem] tracking-wide text-muted sm:px-14">
      <div className="flex flex-wrap justify-between gap-2">
        <span>Rifaie Wildani Bin Nazori</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
