import type { Activity, ActivityCategory } from "@/types/activity";
import { ActivitySummary } from "./ActivitySummary";

type ActivityOverviewProps = {
  activities: Activity[];
  categories: ActivityCategory[];
};

export function ActivityOverview({
  activities,
  categories,
}: Readonly<ActivityOverviewProps>) {
  const activeDays = new Set(activities.map((activity) => activity.date)).size;

  return (
    <section className="grid items-stretch gap-8 py-10 lg:grid-cols-2 lg:py-14">
      <div className="flex h-full max-w-2xl flex-col">
        <p className="mb-5 inline-flex self-start rounded-full border border-app-primary bg-category-reading-soft px-4 py-2 text-sm font-medium text-category-reading shadow-sm backdrop-blur">
          Sunday, June 21
        </p>

        <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
          Your <span className="text-category-reading">hobby</span> agenda
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-app-muted">
          {activities.length} activities are planned across your hobbies.
        </p>

        <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-3">
          <div className="rounded-3xl border border-app-glass-border bg-app-surface-glass p-4 shadow-sm backdrop-blur">
            <p className="text-3xl font-semibold tracking-tight">
              {activities.length}
            </p>
            <p className="mt-1 text-sm font-medium text-app-muted">planned</p>
          </div>

          <div className="rounded-3xl border border-app-glass-border bg-app-surface-glass p-4 shadow-sm backdrop-blur">
            <p className="text-3xl font-semibold tracking-tight">
              {activeDays}
            </p>
            <p className="mt-1 text-sm font-medium text-app-muted">
              days active
            </p>
          </div>

          <div className="rounded-3xl border border-app-glass-border bg-app-surface-glass p-4 shadow-sm backdrop-blur">
            <p className="text-3xl font-semibold tracking-tight">
              {categories.length}
            </p>
            <p className="mt-1 text-sm font-medium text-app-muted">
              categories
            </p>
          </div>
        </div>
      </div>

      <ActivitySummary activities={activities} />
    </section>
  );
}