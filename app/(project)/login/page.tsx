import { handleAuth } from "@/app/actions/handle-auth"
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/app/components/ui/card';
import { Calendar } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Calendar className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Acesse sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              crie uma nova conta
            </Link>
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          
          <CardContent className="grid gap-4">
            <form action={handleAuth}>
              <Button type="submit" variant="outline" className="w-full">
                <FcGoogle className="w-5 h-5 mr-2" />
                Continuar com Google
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Entrar
            </Button>
            
            <p className="text-sm text-gray-600 text-center">
              Não tem uma conta?{' '}
              <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
