"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/app/components/ui/select';
import { CardContent, CardFooter } from './ui/card';
import { WorkingHoursInput } from './working-hours-input';
import { validateCNPJ } from '../lib/utils';

export function CompleteSignupForm({
  initialData,
  businessTypes
}: {
  initialData: any;
  businessTypes: string[];
}) {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleBusinessTypeChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, businessType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const newErrors: { [key: string]: string } = {};

    if (!formData.name) newErrors.name = 'Nome é obrigatório.';
    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório.';
    if (!formData.businessType) newErrors.businessType = 'Tipo de negócio é obrigatório.';
    if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/user/complete-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData }),
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
        <div className="flex gap-4">
          <div className="w-1/2 grid gap-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>

          <div className="w-1/2 grid gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2 grid gap-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj || ''}
              onChange={handleChange}
              required
            />
            {errors.cnpj && <span className="text-red-500 text-sm">{errors.cnpj}</span>}
          </div>

          <div className="w-1/2 grid gap-2">
            <Label htmlFor="businessType">Tipo de Negócio</Label>
            <Select
              onValueChange={handleBusinessTypeChange}
              value={formData.businessType}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu ramo" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.businessType && (
              <span className="text-red-500 text-sm">{errors.businessType}</span>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          <Label>Horários de Trabalho</Label>
          <WorkingHoursInput
            value={formData.workingHours}
            onChange={(hours) =>
              setFormData((prev: any) => ({ ...prev, workingHours: hours }))
            }
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button type="submit" className="w-full mt-3" disabled={isSubmitting}>
          {isSubmitting ? 'Processando...' : 'Completar Cadastro'}
        </Button>
      </CardFooter>
    </form>
  );
}
