import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { handleAuth } from "@/app/actions/handle-auth"
import Link from "next/link";

export default async function Dashboard() {
	const session = await auth();

	console.log(session)
	if (!session) {
		redirect("/login");
	}
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold">Protected dashboard</h1>
			<p>{session?.user?.email ? session?.user?.email : "Usuário não está logado"}</p>
			{session?.user?.email && (
				<form action={handleAuth}>
					<button type="submit" className="border rounded-md px-3 cursor-pointer">Logout</button>
				</form>
			)}
			<Link href="/pagamentos" className="border rounded-md px-3 cursor-pointer mt-4">Pagamentos</Link>
		</div>
	);
}
  