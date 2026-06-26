import { deleteActivity, updateActivity } from "@/lib/activities/activityRepository";
import type { Activity } from "@/types/activity";

export async function PUT(
  request: Request,
  context: RouteContext<"/api/activities/[id]">,
) {
  const { id } = await context.params;
  const activity = (await request.json()) as Activity;

  const updatedActivity = updateActivity({
    ...activity,
    id,
  });

  if (!updatedActivity) {
    return Response.json({ message: "Activity not found." }, { status: 404 });
  }

  return Response.json(updatedActivity);
}

export async function DELETE(
  _request: Request,
  context: RouteContext<"/api/activities/[id]">,
) {
  const { id } = await context.params;
  const wasDeleted = deleteActivity(id);

  if (!wasDeleted) {
    return Response.json({ message: "Activity not found." }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}