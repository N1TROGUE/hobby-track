import type { ActivityCategory } from "@/types/activity";

type CategoryDetails = {
  accentClass: string;
};

export const categories: ActivityCategory[] = [
  "Movie Watching",
  "Reading",
  "Hanging Out With Friends",
];

export const categoryDetails = {
  "Movie Watching": {
    accentClass: "bg-category-movie",
  },
  "Reading": {
    accentClass: "bg-category-reading",
  },
  "Hanging Out With Friends": {
    accentClass: "bg-category-friends",
  },
} satisfies Record<ActivityCategory, CategoryDetails>;