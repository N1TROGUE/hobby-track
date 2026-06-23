"use client";

import { useState, type SubmitEvent } from "react";
import type { ActivityCategory } from "@/types/activity";

export type ActivityFormValues = {
  title: string;
  date: string;
  time: string;
  category: ActivityCategory;
  note: string;
};

type ActivityFormErrors = Partial<Record<keyof ActivityFormValues, string>>;

type ActivityFormProps = {
  categories: ActivityCategory[];
  onSubmit: (values: ActivityFormValues) => void;
};

const initialFormValues = (category: ActivityCategory): ActivityFormValues => ({
  title: "",
  date: "",
  time: "",
  category,
  note: "",
});

export function ActivityForm({ categories, onSubmit }: Readonly<ActivityFormProps>) {
  
  const [values, setValues] = useState<ActivityFormValues>(() => initialFormValues(categories[0]));
  
  const [errors, setErrors] = useState<ActivityFormErrors>({});

  function updateField<FieldName extends keyof ActivityFormValues>( fieldName: FieldName, value: ActivityFormValues[FieldName]) 
  {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));
  }

  function validateForm() {
    const nextErrors: ActivityFormErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!values.date) {
      nextErrors.date = "Date is required.";
    }

    if (!values.time) {
      nextErrors.time = "Time is required.";
    }

    if (!values.category) {
      nextErrors.category = "Category is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      ...values,
      title: values.title.trim(),
      note: values.note.trim(),
    });

    setValues(initialFormValues(categories[0]));
    setErrors({});
  }

  return (
    <form
      className="mt-5 rounded-3xl border border-app-border bg-app-surface p-5"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-app-muted">
          <span>Title</span>
          <input
            className="h-11 rounded-2xl border border-app-border bg-app-background px-4 text-app-text outline-none transition placeholder:text-app-muted focus:border-app-primary"
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Read a chapter"
            type="text"
            value={values.title}
          />
          {errors.title && (
            <span className="text-sm font-medium text-category-friends">
              {errors.title}
            </span>
          )}
        </label>

        <label className="grid gap-2 text-sm font-medium text-app-muted">
          <span>Category</span>
          <select
            className="h-11 rounded-2xl border border-app-border bg-app-background px-4 text-app-text outline-none transition focus:border-app-primary"
            onChange={(event) =>
              updateField("category", event.target.value as ActivityCategory)
            }
            value={values.category}
          >
            {categories.map((category) => (
              <option className="bg-app-background" key={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-sm font-medium text-category-friends">
              {errors.category}
            </span>
          )}
        </label>

        <label className="grid gap-2 text-sm font-medium text-app-muted">
          <span>Date</span>
          <input
            className="h-11 rounded-2xl border border-app-border bg-app-background px-4 text-app-text outline-none transition focus:border-app-primary"
            onChange={(event) => updateField("date", event.target.value)}
            type="date"
            value={values.date}
          />
          {errors.date && (
            <span className="text-sm font-medium text-category-friends">
              {errors.date}
            </span>
          )}
        </label>

        <label className="grid gap-2 text-sm font-medium text-app-muted">
          <span>Time</span>
          <input
            className="h-11 rounded-2xl border border-app-border bg-app-background px-4 text-app-text outline-none transition focus:border-app-primary"
            onChange={(event) => updateField("time", event.target.value)}
            type="time"
            value={values.time}
          />
          {errors.time && (
            <span className="text-sm font-medium text-category-friends">
              {errors.time}
            </span>
          )}
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-medium text-app-muted">
        <span>Notes</span>
        <textarea
          className="min-h-28 resize-none rounded-2xl border border-app-border bg-app-background px-4 py-3 text-app-text outline-none transition placeholder:text-app-muted focus:border-app-primary"
          onChange={(event) => updateField("note", event.target.value)}
          placeholder="Optional details"
          value={values.note}
        />
      </label>

      <div className="mt-5 flex justify-end">
        <button
          className="h-11 rounded-full bg-app-primary px-5 text-sm font-semibold text-app-background shadow-sm transition hover:bg-app-primary-hover"
          type="submit"
        >
          Add activity
        </button>
      </div>
    </form>
  );
}