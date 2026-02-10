import { Reveal } from "./reveal";

export function SectionHeading({ title }: { title: string }) {
  return (
    <Reveal>
      <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight">
        {title}
      </h2>
    </Reveal>
  );
}
