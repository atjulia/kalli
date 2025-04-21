import { Calendar } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* <div className="grid md:grid-cols-4 gap-12 justify-items-center">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <Calendar className="h-6 w-6 text-indigo-600" />
              <span className="font-bold">Kalli</span>
            </div>
            <p className="text-gray-600">
              A solução completa para gestão de agendamentos para microempreendedores.
            </p>
          </div>
          
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-semibold">Produto</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="#features" className="hover:text-indigo-600">Funcionalidades</Link></li>
              <li><Link href="#pricing" className="hover:text-indigo-600">Planos</Link></li>
              <li><Link href="/integrations" className="hover:text-indigo-600">Integrações</Link></li>
              <li><Link href="/api" className="hover:text-indigo-600">API</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-semibold">Recursos</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/blog" className="hover:text-indigo-600">Blog</Link></li>
              <li><Link href="/tutorials" className="hover:text-indigo-600">Tutoriais</Link></li>
              <li><Link href="/support" className="hover:text-indigo-600">Suporte</Link></li>
              <li><Link href="/faq" className="hover:text-indigo-600">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-semibold">Empresa</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/about" className="hover:text-indigo-600">Sobre nós</Link></li>
              <li><Link href="/careers" className="hover:text-indigo-600">Carreiras</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600">Termos</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-600">Privacidade</Link></li>
            </ul>
          </div>
        </div> */}
        
        <div className="pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Kalli. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}