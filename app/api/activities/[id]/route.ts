import { deleteActivity } from "@/lib/activities/activityRepository";

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