import { Check, Star, Calendar, Clock, MessageSquare, CreditCard, Users, Settings, Zap } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/components/ui/card';
import dashImg from "../assets/dash.png"
import Image from "next/image"

export default function HomePage() {
  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Agendamento Inteligente",
      description: "Seus clientes agendam horários 24/7 diretamente pelo seu link personalizado."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Controle de Horários",
      description: "Defina seus horários de trabalho, pausas e feriados com facilidade."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Lembretes Automáticos",
      description: "Reduza faltas com lembretes por SMS e e-mail para seus clientes."
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Pagamentos Online",
      description: "Aceite pagamentos no ato do agendamento com integração a principais gateways."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Gestão de Clientes",
      description: "Cadastro completo de clientes com histórico de agendamentos e preferências."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Personalização Total",
      description: "Branding completo com suas cores, logo e domínio personalizado."
    },
  ];

  const plans = [
    {
      name: "Básico",
      price: "R$49",
      period: "/mês",
      description: "Ideal para quem está começando",
      features: [
        "Até 50 agendamentos/mês",
        "1 profissional",
        "Lembretes por e-mail",
        "Link de agendamento personalizado",
        "Suporte por e-mail"
      ],
      cta: "Começar agora"
    },
    {
      name: "Profissional",
      price: "R$89",
      period: "/mês",
      description: "Para quem quer crescer",
      featured: true,
      features: [
        "Até 200 agendamentos/mês",
        "3 profissionais",
        "Lembretes por e-mail",
        "Integração com Google Calendar",
        "Pagamentos online integrados",
        "Relatórios básicos",
        "Suporte prioritário"
      ],
      cta: "Experimente grátis por 7 dias"
    }
  ];

  const testimonials = [
    {
      name: "Ana Silva",
      role: "Cabeleireira",
      content: "Depois que comecei a usar, minhas faltas caíram 70% e minha agenda está sempre organizada!",
      rating: 5
    },
    {
      name: "Carlos Mendes",
      role: "Personal Trainer",
      content: "A integração com pagamentos online mudou meu negócio, agora recebo adiantado por todas as sessões.",
      rating: 5
    },
    {
      name: "Juliana Costa",
      role: "Massoterapeuta",
      content: "Meus clientes adoram poder agendar fora do meu horário comercial. Muito prático!",
      rating: 4
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container py-16 md:py-24 mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Agendamento simplificado para o <span className="text-indigo-600">seu negócio</span>
            </h1>
            <p className="text-lg text-gray-600">
              Automatize seus agendamentos, reduza faltas e tenha mais tempo para focar nos seus clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto">
                Experimente grátis por 7 dias
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Ver demonstração
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-indigo-100/50 blur-lg"></div>
              <div className="relative rounded-xl border bg-white shadow-lg overflow-hidden">
                <Image
                  src={dashImg}
                  alt="Dashboard do Kalli"
                  className="w-full h-auto"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 md:py-24 mx-auto px-4">
        <div className="text-center space-y-6 mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold">Tudo o que você precisa em um só lugar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ferramentas poderosas para simplificar sua agenda e melhorar a experiência dos seus clientes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold">Planos que cabem no seu bolso</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha o plano perfeito para o tamanho do seu negócio. Sem surpresas, sem contratos longos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={plan.featured ? "border-indigo-600 shadow-lg relative" : ""}>
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle className={plan.featured ? "text-indigo-600" : ""}>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container py-16 md:py-24 mx-auto px-4">
        <div className="text-center space-y-6 mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold">O que nossos clientes dizem</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Microempreendedores que já transformaram seus negócios com o Kalli.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Pronto para transformar seu negócio?</h2>
            <p className="text-indigo-100">
              Comece hoje mesmo e experimente gratuitamente por 7 dias. Sem necessidade de cartão de crédito.
            </p>
            <div className="pt-4">
              <Button size="lg" variant="secondary" className="gap-2">
                <Zap className="w-4 h-4" />
                Comece agora
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}