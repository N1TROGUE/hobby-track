import { createActivity,getActivities } from "@/lib/activities/activityRepository";
import type { Activity } from "@/types/activity";

export async function GET() {
  return Response.json(getActivities());
}

export async function POST(request: Request) {
  const activity = (await request.json()) as Activity;
  const createdActivity = createActivity(activity);

  return Response.json(createdActivity, { status: 201 });
}
