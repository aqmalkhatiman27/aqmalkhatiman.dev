const pillars = [
  {
    id: "pillar-technology",
    title: "IT / Technology",
    description:
      "System architecture, cloud, and applied AI—built for clarity and long-term maintainability.",
  },
  {
    id: "pillar-inclusivity",
    title: "Disability / Inclusivity",
    description:
      "Advocacy grounded in lived experience—design and communication that widen access.",
  },
  {
    id: "pillar-business",
    title: "Finance / Business",
    description:
      "Operational ventures and education—capital, operations, and sustainable growth.",
  },
] as const;

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-20 md:py-28">
        <p className="text-sm font-medium tracking-wide text-muted uppercase">
          Welcome
        </p>
        <h1 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Aqmal Khatiman (Solihin)
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
          A calm, high-contrast workspace for portfolio, notes, and teaching—
          anchored in three pillars that shape how I build and show up online.
        </p>

        <div className="mt-16 space-y-0 border border-border rounded-lg bg-surface md:grid md:grid-cols-3 md:divide-x md:divide-border md:rounded-lg md:space-y-0">
          {pillars.map((pillar) => (
            <section
              key={pillar.id}
              className="border-b border-border px-8 py-10 last:border-b-0 md:border-b-0 md:py-12"
              aria-labelledby={pillar.id}
            >
              <h2
                id={pillar.id}
                className="text-base font-semibold tracking-tight text-foreground"
              >
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-[0.9375rem]">
                {pillar.description}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
