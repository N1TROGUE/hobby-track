"use client";

import { useState } from "react";
import { ActivityForm, ActivityFormValues } from "./ActivityForm";
import { ActivityDetailModal } from "./ActivityDetailModal";
import { ActivityOverview } from "./ActivityOverview";
import { ActivityCalendar } from "./ActivityCalendar";
import type { Activity, ActivityCategory } from "@/types/activity";
import { categoryDetails } from "@/lib/categories/categoryData";
import {
  createActivityRequest,
  deleteActivityRequest,
  updateActivityRequest,
} from "@/lib/api/activityClient";

type ActivityFilter = "All" | ActivityCategory;

type ActivityDashboardProps = {
  activities: Activity[];
  categories: ActivityCategory[];
};

type ActivityView = "agenda" | "calendar";

export function ActivityDashboard({
  activities,
  categories,
}: Readonly<ActivityDashboardProps>) {
  const [selectedCategory, setSelectedCategory] = useState<ActivityFilter>("All");
    
  const [activityItems, setActivityItems] = useState<Activity[]>(activities);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<ActivityView>("agenda");

  const visibleActivities =
    selectedCategory === "All"
      ? activityItems
      : activityItems.filter((activity) => activity.category === selectedCategory);

  async function handleAddActivity(formValues: ActivityFormValues) {
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      ...formValues,
    };

    try {
      const createdActivity = await createActivityRequest(newActivity);

      setActivityItems((currentItems) => [createdActivity, ...currentItems]);
      setSelectedCategory("All");
      setIsFormOpen(false);
      setErrorMessage(null);
    } catch {
      setErrorMessage("Could not add activity.");
    }
  }

  async function handleDeleteActivity(activityId: string) {
    try {
      await deleteActivityRequest(activityId);

      setActivityItems((currentItems) =>
        currentItems.filter((activity) => activity.id !== activityId),
      );
      setSelectedActivity(null);
      setErrorMessage(null);
    } catch {
      setErrorMessage("Could not delete activity.");
    }
  }

  async function handleUpdateActivity(
    activityId: string,
    formValues: ActivityFormValues,
  ) {
    const updatedActivity: Activity = {
      id: activityId,
      ...formValues,
    };

    try {
      const savedActivity = await updateActivityRequest(updatedActivity);

      setActivityItems((currentItems) =>
        currentItems.map((activity) =>
          activity.id === activityId ? savedActivity : activity,
        ),
      );
      setSelectedActivity(savedActivity);
      setErrorMessage(null);
    } catch {
      setErrorMessage("Could not update activity.");
    }
  }

  return (
    <>
      <ActivityOverview activities={activityItems} categories={categories} />

      <section
        className={`grid pb-10 ${
          selectedView === "calendar" ? "gap-y-6 lg:grid-cols-1" : "gap-x-6 lg:grid-cols-3"
        }`}
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
            {(["All", ...categories] as ActivityFilter[]).map((category) => (
              <button
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-app-primary text-app-background shadow-sm"
                    : "bg-app-surface text-app-muted hover:bg-category-reading-soft hover:text-app-text"
                }`}
                key={category}
                onClick={() => setSelectedCategory(category)}
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
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <div className="flex rounded-full border border-app-border bg-app-surface p-1">
                {(["agenda", "calendar"] as ActivityView[]).map((view) => (
                  <button
                    className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                      selectedView === view
                        ? "bg-app-primary text-app-background"
                        : "text-app-muted hover:text-app-text"
                    }`}
                    key={view}
                    onClick={() => setSelectedView(view)}
                    type="button"
                  >
                    {view}
                  </button>
                ))}
              </div>

              <button
                className="h-11 rounded-full border border-app-primary bg-app-primary px-5 text-sm font-semibold text-app-background shadow-sm transition hover:bg-app-primary-hover"
                id="add-activity"
                onClick={() => setIsFormOpen((currentValue) => !currentValue)}
                type="button"
              >
                {isFormOpen ? "Close form" : "New activity"}
              </button>
            </div>
          </div>

          {isFormOpen && (
            <ActivityForm
              categories={categories}
              onSubmit={handleAddActivity}
            />
          )}

          {errorMessage && (
            <p className="mt-5 rounded-2xl border border-category-friends bg-app-background p-4 text-sm font-medium text-category-friends">
              {errorMessage}
            </p>
          )}

          {selectedView === "agenda" ? (
            <div className="mt-5 grid gap-3">
              {visibleActivities.map((activity) => (
                <button
                  className="rounded-3xl border border-app-border bg-app-surface p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  key={activity.id}
                  onClick={() => setSelectedActivity(activity)}
                  type="button"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-3 w-3 rounded-full ${categoryDetails[activity.category].accentClass}`}
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
                      {activity.date} · {activity.time}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <ActivityCalendar
              activities={visibleActivities}
              onSelectActivity={setSelectedActivity}
            />
          )}
        </section>

        {selectedActivity && (
          <ActivityDetailModal
            activity={selectedActivity}
            categories={categories}
            onClose={() => setSelectedActivity(null)}
            onDelete={() => handleDeleteActivity(selectedActivity.id)}
            onUpdate={(values) =>
              handleUpdateActivity(selectedActivity.id, values)
            }
          />
        )}
      </section>
    </>
  );
}
