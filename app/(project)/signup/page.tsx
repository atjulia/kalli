import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { handleAuth } from "@/app/actions/handle-auth"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/components/ui/card';
import { Calendar } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Calendar className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Faça login
            </Link>
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Cadastro</CardTitle>
            <CardDescription>
              Preencha seus dados ou cadastre-se com o Google
            </CardDescription>
          </CardHeader>
          
          <CardContent className="grid gap-4">
            <form action={handleAuth}>
              <Button variant="outline" className="w-full">
                <FcGoogle className="w-5 h-5 mr-2" />
                Cadastrar com Google
              </Button>
            </form>
            
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Ou cadastre-se com e-mail
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input 
                  id="firstName" 
                  placeholder="Seu nome" 
                  className="focus-visible:ring-indigo-600"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input 
                  id="lastName" 
                  placeholder="Seu sobrenome" 
                  className="focus-visible:ring-indigo-600"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                className="focus-visible:ring-indigo-600"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="focus-visible:ring-indigo-600"
              />
              <p className="text-xs text-gray-500">
                Mínimo de 8 caracteres, com letras e números
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirme sua senha</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                className="focus-visible:ring-indigo-600"
              />
            </div> */}
            
            {/* <div className="flex items-start space-x-2">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Concordo com os{' '}
                <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
                  Termos de Serviço
                </Link>{' '}
                e{' '}
                <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                  Política de Privacidade
                </Link>
              </label>
            </div> */}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Criar conta
            </Button>
            
            <p className="text-sm text-gray-600 text-center">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}