import type { Activity } from "@/types/activity";
import { categoryDetails } from "@/lib/categories/categoryData";

type ActivityCalendarProps = {
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function parseActivityDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getWeekStart(date: Date) {
  const weekStart = new Date(date);
  const dayIndex = (weekStart.getDay() + 6) % 7;

  weekStart.setDate(weekStart.getDate() - dayIndex);

  return weekStart;
}

export function ActivityCalendar({
  activities,
  onSelectActivity,
}: Readonly<ActivityCalendarProps>) {
  const firstActivity = [...activities].sort((first, second) =>
    first.date.localeCompare(second.date),
  )[0];

  const referenceDate = firstActivity
    ? parseActivityDate(firstActivity.date)
    : new Date();

  const weekStart = getWeekStart(referenceDate);

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);

    date.setDate(weekStart.getDate() + index);

    return date;
  });

  const weekLabel = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
  }).formatRange(weekDates[0], weekDates[6]);

  return (
    <div className="mt-5 rounded-3xl border border-app-border bg-app-surface p-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight">
          Week of {weekLabel}
        </h3>
        <p className="text-sm font-medium text-app-muted">
          {activities.length} activities
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-7">
        {weekDates.map((date, index) => {
          const dateKey = toDateKey(date);
          const dayActivities = activities.filter(
            (activity) => activity.date === dateKey,
          );

          return (
            <section
              className="min-h-56 rounded-2xl border border-app-border bg-app-background p-3"
              key={dateKey}
            >
              <div>
                <p className="text-xs font-semibold uppercase text-app-muted">
                  {weekDays[index]}
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  {date.getDate()}
                </p>
              </div>

              <div className="mt-4 grid gap-2">
                {dayActivities.map((activity) => (
                  <button
                    className="rounded-xl bg-app-surface-soft px-3 py-2 text-left text-sm font-semibold text-app-text transition hover:bg-category-reading-soft"
                    key={activity.id}
                    onClick={() => onSelectActivity(activity)}
                    type="button"
                  >
                    <span
                      className={`mr-2 inline-block h-2 w-2 rounded-full ${
                        categoryDetails[activity.category].accentClass
                      }`}
                    />
                    {activity.title}
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}