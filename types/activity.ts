export type ActivityCategory = 
    | "Movie Watching"
    | "Reading"
    | "Hanging Out With Friends";

export type Activity = {
    id: string;
    title: string;
    category: ActivityCategory;
    time: string;
    note: string;
    accent: string;
};