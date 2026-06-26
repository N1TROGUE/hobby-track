import type { Activity } from "@/types/activity";
import { categoryDetails } from "@/lib/categories/categoryData";

type ActivitySummaryProps = {
  activities: Activity[];
};

export function ActivitySummary({
  activities,
}: Readonly<ActivitySummaryProps>) {
  return (
    <section
      aria-label="This week summary"
      className="rounded-3xl border border-app-primary bg-category-reading-soft p-4 shadow-xl backdrop-blur-xl sm:p-5"
    >
      <div className="rounded-2xl bg-app-surface p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-app-muted">This week</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              {activities.length} planned activities
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
                  className={`mt-1 h-3 w-3 rounded-full ${categoryDetails[activity.category].accentClass}`}
                />

                <div>
                  <h3 className="font-semibold tracking-tight">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm text-app-muted">
                    {activity.date} · {activity.time} · {activity.category}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}