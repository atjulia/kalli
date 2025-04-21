import { Header } from "./header"
import { auth } from "@/app/lib/auth"
import { cookies } from "next/headers"

export default async function HeaderWrapper() {
  const session = await auth()
  const path = await cookies()
  const pathName = path.get("pathname")?.value || "/"

  return <Header isLoggedIn={!!session} pathname={pathName} />
}
