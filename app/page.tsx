import { ActivityDashboard } from "@/components/activity/ActivityDashboard";
import { getActivities } from "@/lib/activities/activityRepository";
import { categories } from "@/lib/categories/categoryData";

export default function Home() {
  const activities = getActivities();
  
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
        <ActivityDashboard activities={activities} categories={categories} />
      </div>
    </main>
  );
}
