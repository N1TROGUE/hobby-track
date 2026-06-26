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

          <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex"></nav>
        </header>
        <ActivityDashboard activities={activities} categories={categories} />
      </div>
    </main>
  );
}
