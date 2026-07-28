export function SectionHeading({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-border pb-2.5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
      <span>{title}</span>
      {note && <span className="text-[0.92em] tracking-wider">{note}</span>}
    </div>
  );
}
