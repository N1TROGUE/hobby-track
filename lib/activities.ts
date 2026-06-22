import type { Activity, ActivityCategory } from "@/types/activity";

export const categories: ActivityCategory[] = [
  "Movie Watching",
  "Reading",
  "Hanging Out With Friends",
];

export const activities: Activity[] = [
  {
    id: "grand-budapest-hotel",
    title: "Watch The Grand Budapest Hotel",
    category: "Movie Watching",
    date: "2026-06-22",
    time: "20:00",
    note: "Pick snacks before starting.",
    accent: "bg-category-movie",
  },
  {
    id: "read-two-chapters",
    title: "Read two chapters",
    category: "Reading",
    date: "2026-06-23",
    time: "09:30",
    note: "Continue the current novel over coffee.",
    accent: "bg-category-reading",
  },
  {
    id: "dinner-with-friends",
    title: "Dinner with friends",
    category: "Hanging Out With Friends",
    date: "2026-06-26",
    time: "18:45",
    note: "Confirm the reservation in the afternoon.",
    accent: "bg-category-friends",
  },
];