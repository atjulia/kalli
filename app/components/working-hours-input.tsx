"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { Switch } from '@/app/components/ui/switch'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { DaySchedule } from '../types/user'

interface WorkingHoursInputProps {
  value: Record<string, DaySchedule>
  onChange: (value: Record<string, DaySchedule>) => void
}

const daysOfWeek = [
  { id: 'monday', label: 'Segunda' },
  { id: 'tuesday', label: 'Terça' },
  { id: 'wednesday', label: 'Quarta' },
  { id: 'thursday', label: 'Quinta' },
  { id: 'friday', label: 'Sexta' },
  { id: 'saturday', label: 'Sábado' },
  { id: 'sunday', label: 'Domingo' }
]

const generateTimeOptions = () => {
  const options = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      options.push(
        `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      )
    }
  }
  return options
}

const timeOptions = generateTimeOptions()

export function WorkingHoursInput({ value, onChange }: WorkingHoursInputProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  const [internalState, setInternalState] = useState<Record<string, DaySchedule>>(() => {
    const initialState: Record<string, DaySchedule> = {}
    daysOfWeek.forEach(day => {
      const dayValue = value[day.id]
  
      initialState[day.id] = {
        available: dayValue?.available ?? (day.id !== 'saturday' && day.id !== 'sunday'),
        slots: Array.isArray(dayValue?.slots) && dayValue.slots.length > 0
          ? dayValue.slots
          : []
      }
    })
  
    return initialState
  })
  
  useEffect(() => {
    setInternalState(prev => {
      const newState = { ...prev }
      let hasChanges = false
      
      daysOfWeek.forEach(day => {
        if (value[day.id] && JSON.stringify(value[day.id]) !== JSON.stringify(prev[day.id])) {
          newState[day.id] = value[day.id]
          hasChanges = true
        }
      })

      return hasChanges ? newState : prev
    })
  }, [value])

  const handleChange = (newState: Record<string, DaySchedule>) => {
    setInternalState(newState)
    onChange(newState)
  }

  const toggleDayAvailability = (dayId: string) => {
    const newState = {
      ...internalState,
      [dayId]: {
        ...internalState[dayId],
        available: !internalState[dayId].available,
        slots: internalState[dayId].available ? [] : [{ start: '08:00', end: '17:00' }]
      }
    }
    handleChange(newState)
  }

  const addTimeSlot = (dayId: string) => {
    const newState = {
      ...internalState,
      [dayId]: {
        ...internalState[dayId],
        slots: [
          ...internalState[dayId].slots,
          {
            start: '08:00',
            end: '12:00'
          }
        ]
      }
    }
    handleChange(newState)
  }

  const removeTimeSlot = (dayId: string, index: number) => {
    const newState = {
      ...internalState,
      [dayId]: {
        ...internalState[dayId],
        slots: internalState[dayId].slots.filter((_, i) => i !== index)
      }
    }
    handleChange(newState)
  }

  const updateTimeSlot = (
    dayId: string,
    slotIndex: number,
    field: 'start' | 'end',
    time: string
  ) => {
    const newSlots = [...internalState[dayId].slots]
    newSlots[slotIndex] = { ...newSlots[slotIndex], [field]: time }

    const newState = {
      ...internalState,
      [dayId]: {
        ...internalState[dayId],
        slots: newSlots
      }
    }
    handleChange(newState)
  }

  const applySlotToAll = (slot: { start: string; end: string }, replace = false) => {
    const newState = { ...internalState }
  
    daysOfWeek.forEach(day => {
      if (newState[day.id].available) {
        const existingSlots = newState[day.id].slots || []
  
        newState[day.id] = {
          ...newState[day.id],
          slots: replace
            ? [slot]
            : [...existingSlots, slot]
        }
      }
    })
  
    handleChange(newState)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => applySlotToAll({ start: '08:00', end: '12:00' })}
        >
          Manhã (8h-12h)
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => applySlotToAll({ start: '13:00', end: '18:00' })}
        >
          Tarde (13h-18h)
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => applySlotToAll({ start: '08:00', end: '18:00' }, true)}
        >
          Dia Inteiro (8h-18h)
        </Button>
      </div>

      <div className="space-y-2">
        {daysOfWeek.map(day => (
          <div
            key={day.id}
            className={cn(
              'border rounded-lg overflow-hidden transition-all',
              internalState[day.id].available
                ? 'border-primary/20 bg-primary/5'
                : 'border-muted'
            )}
          >
            <div className="flex items-center justify-between p-3" onClick={() =>
                    setExpandedDay(expandedDay === day.id ? null : day.id)
                  }>
              <div className="flex items-center space-x-3">
                <Switch
                  checked={internalState[day.id].available}
                  onCheckedChange={() => toggleDayAvailability(day.id)}
                />
                <Label className="font-medium">{day.label}</Label>
              </div>

              {internalState[day.id].available && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setExpandedDay(expandedDay === day.id ? null : day.id)
                  }
                >
                  {expandedDay === day.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            {internalState[day.id].available && expandedDay === day.id && (
              <div className="border-t p-3 space-y-3">
                {internalState[day.id].slots.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 flex-wrap"
                  >
                    <div className="flex-1 min-w-[150px]">
                      <Label>Início</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={slot.start}
                        onChange={e =>
                          updateTimeSlot(day.id, index, 'start', e.target.value)
                        }
                      >
                        {timeOptions.map(time => (
                          <option key={`${day.id}-start-${time}`} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1 min-w-[150px]">
                      <Label>Término</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={slot.end}
                        onChange={e =>
                          updateTimeSlot(day.id, index, 'end', e.target.value)
                        }
                      >
                        {timeOptions.map(time => (
                          <option key={`${day.id}-end-${time}`} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive mt-6"
                        onClick={() => removeTimeSlot(day.id, index)}
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTimeSlot(day.id)}
                >
                  + Adicionar horário
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}