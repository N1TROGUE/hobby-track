import { activities, categories } from "@/lib/activities";

export default function Home() {
  return (
    <main className="min-h-screen bg-app-background text-app-text">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="sticky top-4 z-10 flex items-center justify-between rounded-full border border-app-nav-border bg-app-nav-glass px-5 py-3 shadow-lg backdrop-blur-2xl">
          <a className="text-base font-semibold tracking-tight text-category-reading" href="#">
            HobbyTrack
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex">
            <a
              className="rounded-full px-4 py-2 text-sm font-medium text-app-muted transition hover:bg-category-reading-soft hover:text-app-text"
              href="#agenda"
            >
              Agenda
            </a>
            <a
              className="rounded-full px-4 py-2 text-sm font-medium text-app-muted transition hover:bg-category-reading-soft hover:text-app-text"
              href="#categories"
            >
              Categories
            </a>
          </nav>

          <a
            className="rounded-full bg-app-primary px-4 py-2 text-sm font-semibold text-app-background shadow-sm transition hover:bg-app-primary-hover"
            href="#add-activity"
          >
            Add activity
          </a>
        </header>

        <section className="grid items-stretch gap-8 py-10 lg:grid-cols-2 lg:py-14">
          <div className="flex h-full max-w-2xl flex-col">
            <p className="mb-5 inline-flex self-start rounded-full border border-app-primary bg-category-reading-soft px-4 py-2 text-sm font-medium text-category-reading shadow-sm backdrop-blur">
              Sunday, June 21
            </p>

            <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              Your <span className="text-category-reading">hobby</span> agenda
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-app-muted">
              Three activities are planned this week across movies, reading,
              and time with friends.
            </p>

            <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-3">
              <div className="rounded-3xl border border-app-glass-border bg-app-surface-glass p-4 shadow-sm backdrop-blur">
                <p className="text-3xl font-semibold tracking-tight">3</p>
                <p className="mt-1 text-sm font-medium text-app-muted">
                  planned
                </p>
              </div>
              <div className="rounded-3xl border border-app-glass-border bg-app-surface-glass p-4 shadow-sm backdrop-blur">
                <p className="text-3xl font-semibold tracking-tight">2</p>
                <p className="mt-1 text-sm font-medium text-app-muted">
                  days active
                </p>
              </div>
              <div className="rounded-3xl border border-app-glass-border bg-app-surface-glass p-4 shadow-sm backdrop-blur">
                <p className="text-3xl font-semibold tracking-tight">3</p>
                <p className="mt-1 text-sm font-medium text-app-muted">
                  categories
                </p>
              </div>
            </div>
          </div>

          <section
            aria-label="This week summary"
            className="rounded-3xl border border-app-primary bg-category-reading-soft p-4 shadow-xl backdrop-blur-xl sm:p-5"
          >
            <div className="rounded-2xl bg-app-surface p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-app-muted">This week</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                    3 planned activities
                  </h2>
                </div>
                <span className="rounded-full bg-category-reading-soft px-3 py-1 text-sm font-semibold text-category-reading">
                  Balanced
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {activities.map((activity) => (
                  <article
                    className="rounded-3xl border border-app-border bg-app-surface p-4 shadow-sm"
                    key={activity.id}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-1 h-3 w-3 rounded-full ${activity.accent}`}
                      />
                      <div>
                        <h3 className="font-semibold tracking-tight">
                          {activity.title}
                        </h3>
                        <p className="mt-1 text-sm text-app-muted">
                          {activity.time} · {activity.category}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </section>

        <section
          className="grid gap-6 pb-10 lg:grid-cols-3"
          id="agenda"
        >
          <aside
            className="rounded-3xl border border-app-glass-border bg-app-surface-glass-soft p-5 shadow-sm backdrop-blur"
            id="categories"
          >
            <p className="text-sm font-medium text-app-muted">Filters</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Choose a hobby
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {["All", ...categories].map((category, index) => (
                <button
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    index === 0
                      ? "bg-app-primary text-app-background shadow-sm"
                      : "bg-app-surface text-app-muted hover:bg-category-reading-soft hover:text-app-text"
                  }`}
                  key={category}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          <section className="rounded-3xl border border-app-glass-border bg-app-surface-glass p-5 shadow-sm backdrop-blur lg:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-app-muted">
                  Upcoming activities
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Your next plans
                </h2>
              </div>
              <button
                className="h-11 rounded-full border border-app-primary bg-app-primary px-5 text-sm font-semibold text-app-background shadow-sm transition hover:bg-app-primary-hover"
                id="add-activity"
                type="button"
              >
                New activity
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              {activities.map((activity) => (
                <article
                  className="rounded-3xl border border-app-border bg-app-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  key={activity.id}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-3 w-3 rounded-full ${activity.accent}`}
                        />
                        <p className="text-sm font-semibold text-app-muted">
                          {activity.category}
                        </p>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight">
                        {activity.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-app-muted">
                        {activity.note}
                      </p>
                    </div>
                    <p className="rounded-full bg-app-surface-soft px-4 py-2 text-sm font-semibold text-app-muted">
                      {activity.time}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
