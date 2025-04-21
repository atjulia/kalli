import Link from "next/link"
import { Calendar, Settings } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { handleAuth } from "../actions/handle-auth"

type HeaderProps = {
  isLoggedIn: boolean
  pathname: string
}

export function Header({ isLoggedIn, pathname }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-indigo-600" />
          <span className="font-bold text-lg">Kalli</span>
        </div>

        {isLoggedIn ? (
          <nav className="flex items-center space-x-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/settings">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Link>
            </Button>
            <form action={handleAuth} method="post">
              <Button type="submit" variant="outline" size="sm">Sair</Button>
            </form>
          </nav>
        ) : (
          <>
            {pathname === "/" && (
              <nav className="hidden md:flex items-center space-x-8 mx-auto">
                <Link href="#features" className="text-sm font-medium hover:text-indigo-600">Funcionalidades</Link>
                <Link href="#pricing" className="text-sm font-medium hover:text-indigo-600">Planos</Link>
                <Link href="#testimonials" className="text-sm font-medium hover:text-indigo-600">Depoimentos</Link>
              </nav>
            )}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Começar grátis</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
