import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === "1";
}
