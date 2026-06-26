import type { Activity } from "@/types/activity";

const activitiesEndpoint = "/api/activities";

async function assertSuccessfulResponse(response: Response) {
  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      errorText || `Request failed with status ${response.status}`,
    );
  }
}

export async function fetchActivities(): Promise<Activity[]> {
  const response = await fetch(activitiesEndpoint);

  await assertSuccessfulResponse(response);

  return response.json() as Promise<Activity[]>;
}

export async function createActivityRequest(
  activity: Activity,
): Promise<Activity> {
  const response = await fetch(activitiesEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });

  await assertSuccessfulResponse(response);

  return response.json() as Promise<Activity>;
}

export async function updateActivityRequest(
  activity: Activity,
): Promise<Activity> {
  const response = await fetch(`${activitiesEndpoint}/${activity.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });

  await assertSuccessfulResponse(response);

  return response.json() as Promise<Activity>;
}

export async function deleteActivityRequest(activityId: string) {
  const response = await fetch(`${activitiesEndpoint}/${activityId}`, {
    method: "DELETE",
  });

  await assertSuccessfulResponse(response);
}