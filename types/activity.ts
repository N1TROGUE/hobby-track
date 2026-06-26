export type ActivityCategory = 
  | "Movie Watching"
  | "Reading"
  | "Hanging Out With Friends";

export type Activity = {
  id: string;
  title: string;
  category: ActivityCategory;
  date: string;
  time: string;
  note: string;
};