"use client"

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/components/ui/select';
import { useRouter } from 'next/navigation';
import { CardContent, CardFooter } from './ui/card';

export function CompleteSignupForm({ 
  initialData,
  businessTypes,
  userId
}: { 
  initialData: any,
  businessTypes: string[],
  userId?: string
}) {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = e.target;
  //   setFormData(prev => ({ ...prev, [id]: value }));
  // };
  
  // const handleBusinessTypeChange = (value: string) => {
  //   setFormData(prev => ({ ...prev, businessType: value }));
  // };

  // const handleTimezoneChange = (value: string) => {
  //   setFormData(prev => ({ ...prev, timezone: value }));
  // };

  // const handleWorkingHoursChange = (e: React.ChangeEvent<HTMLInputElement>, day: string) => {
  //   const { id, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     workingHours: {
  //       ...prev.workingHours,
  //       [day]: {
  //         ...prev.workingHours[day],
  //         [id]: value,
  //       }
  //     }
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/user/complete-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Erro ao completar cadastro');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao conectar com o servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="grid gap-4 mt-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input 
            id="name" 
            placeholder="Seu nome completo" 
            value={formData.name}
            // onChange={handleChange}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="(00) 00000-0000" 
            value={formData.phone}
            // onChange={handleChange}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="businessType">Tipo de Negócio</Label>
          <Select 
            // onValueChange={handleBusinessTypeChange} 
            value={formData.businessType}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu ramo" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="timezone">Fuso Horário</Label>
          <Select
            // onValueChange={handleTimezoneChange}
            value={formData.timezone}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu fuso horário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="America/Sao_Paulo">GMT-3 São Paulo</SelectItem>
              <SelectItem value="America/New_York">GMT-4 Nova Iorque</SelectItem>
              <SelectItem value="Europe/London">GMT London</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="workingHours.mondayStart">Segunda-feira - Horário de Início</Label>
          <Input
            id="mondayStart"
            type="time"
            value={formData.workingHours.monday.start}
            // onChange={(e) => handleWorkingHoursChange(e, 'monday')}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="workingHours.mondayEnd">Segunda-feira - Horário de Término</Label>
          <Input
            id="mondayEnd"
            type="time"
            value={formData.workingHours.monday.end}
            // onChange={(e) => handleWorkingHoursChange(e, 'monday')}
          />
        </div>

      </CardContent>
      
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full mt-3" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Completar Cadastro"}
        </Button>
      </CardFooter>
    </form>
  );
}
