import { getAllPosts } from "@/lib/mdx";

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

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-MY", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

export default async function Home() {
  const posts = await getAllPosts();

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

        <section className="mt-16" aria-labelledby="digital-garden-heading">
          <h2
            id="digital-garden-heading"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Digital Garden
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Recent notes from my learning and execution workflow.
          </p>

          <div className="mt-6 border border-border rounded-lg bg-surface">
            {posts.length === 0 ? (
              <p className="px-6 py-8 text-sm text-muted">No notes published yet.</p>
            ) : (
              <ol className="divide-y divide-border">
                {posts.map((post) => (
                  <li key={post.slug} className="px-6 py-5">
                    <article className="space-y-2">
                      <h3 className="text-base font-semibold tracking-tight text-foreground">
                        {post.title}
                      </h3>
                      <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                        <div className="flex items-center gap-2">
                          <dt className="sr-only">Date</dt>
                          <dd>{formatDate(post.date)}</dd>
                        </div>
                        <div className="flex items-center gap-2">
                          <dt className="sr-only">Status</dt>
                          <dd>{post.status ?? "Published"}</dd>
                        </div>
                      </dl>
                    </article>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
