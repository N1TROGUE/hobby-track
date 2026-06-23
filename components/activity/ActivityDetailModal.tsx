"use client";

import type { Activity } from "@/types/activity";
import { categoryDetails } from "@/lib/categories";

type ActivityDetailModalProps = {
  activity: Activity;
  onClose: () => void;
  onDelete: () => void;
};

export function ActivityDetailModal({
  activity,
  onClose,
  onDelete,
}: Readonly<ActivityDetailModalProps>) {
  return (
    <div className="fixed inset-0 z-20 flex items-end bg-black/60 px-5 py-6 backdrop-blur-sm sm:items-center sm:justify-center">
      <section
        aria-labelledby="activity-detail-title"
        className="w-full max-w-xl rounded-3xl border border-app-glass-border bg-app-surface p-6 shadow-xl"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${
                  categoryDetails[activity.category].accentClass
                }`}
              />
              <p className="text-sm font-semibold text-app-muted">
                {activity.category}
              </p>
            </div>
            <h2
              className="mt-3 text-2xl font-semibold tracking-tight"
              id="activity-detail-title"
            >
              {activity.title}
            </h2>
          </div>

          <button
            className="rounded-full bg-app-surface-soft px-4 py-2 text-sm font-semibold text-app-muted transition hover:bg-category-reading-soft hover:text-app-text"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-app-border bg-app-background p-4">
            <dt className="text-sm font-medium text-app-muted">Date</dt>
            <dd className="mt-1 font-semibold">{activity.date}</dd>
          </div>
          <div className="rounded-2xl border border-app-border bg-app-background p-4">
            <dt className="text-sm font-medium text-app-muted">Time</dt>
            <dd className="mt-1 font-semibold">{activity.time}</dd>
          </div>
        </dl>

        <div className="mt-4 rounded-2xl border border-app-border bg-app-background p-4">
          <p className="text-sm font-medium text-app-muted">Notes</p>
          <p className="mt-2 leading-6 text-app-text">
            {activity.note || "No notes added."}
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            className="rounded-full border border-category-friends bg-transparent px-4 py-2 text-sm font-semibold text-category-friends transition hover:bg-category-friends hover:text-app-text"
            onClick={onDelete}
            type="button"
          >
            Delete activity
          </button>
        </div>
      </section>
    </div>
  );
}
