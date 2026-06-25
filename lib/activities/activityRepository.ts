import { database } from "@/lib/db";
import { activities } from "@/lib/activities/activityData";
import type { Activity } from "@/types/activity";

seedDatabase();

function seedDatabase() {
  const activityCount = database
    .prepare("SELECT COUNT(*) as count FROM activities")
    .get() as { count: number };

  if (activityCount.count > 0) {
    return;
  }

  const insertActivity = database.prepare(
    `
    INSERT INTO activities (id, title, category, date, time, note)
    VALUES (@id, @title, @category, @date, @time, @note)
    `,
  );

  const insertSeedActivities = database.transaction((activities: Activity[]) => {
    for (const activity of activities) {
      insertActivity.run(activity);
    }
  });

  insertSeedActivities(activities);
}

export function getActivities(): Activity[] {
  return database
    .prepare(
      `
      SELECT id, title, category, date, time, note
      FROM activities
      ORDER BY date ASC, time ASC
      `,
    )
    .all() as Activity[];
}

export function createActivity(activity: Activity): Activity {
  database
    .prepare(
      `
      INSERT INTO activities (id, title, category, date, time, note)
      VALUES (@id, @title, @category, @date, @time, @note)
      `,
    )
    .run(activity);

  return activity;
}

export function updateActivity(activity: Activity): Activity | null {
  const result = database
    .prepare(
      `
      UPDATE activities
      SET title = @title,
          category = @category,
          date = @date,
          time = @time,
          note = @note
      WHERE id = @id
      `,
    )
    .run(activity);

  if (result.changes === 0) {
    return null;
  }

  return activity;
}

export function deleteActivity(activityId: string): boolean {
  const result = database
    .prepare("DELETE FROM activities WHERE id = ?")
    .run(activityId);

  return result.changes > 0;
}