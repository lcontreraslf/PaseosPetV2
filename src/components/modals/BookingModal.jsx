import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function BookingModal({ walker, pets, onClose, onBook }) {
  const [formData, setFormData] = useState({
    petId: pets.length > 0 ? pets[0].id : '',
    date: '',
    time: '',
    service: walker.services.length > 0 ? walker.services[0] : '',
    duration: 1,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDurationChange = (e) => {
    setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.petId || !formData.date || !formData.time || !formData.service) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    const totalPrice = walker.price * formData.duration;
    onBook({
      ...formData,
      walkerId: walker.id,
      totalPrice
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <motion.div
        initial={{ scale: 0.95, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="bg-card rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-6">
          <img
            src={walker.avatar}
            alt={walker.name}
            className="w-12 h-12 rounded-full object-cover mr-4 border border-primary/30"
          />
          <div>
            <h3 id="booking-title" className="text-xl font-bold text-foreground">{walker.name}</h3>
            <p className="text-sm text-foreground/60">${walker.price}/hora</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pet selection */}
          <div>
            <label htmlFor="petId" className="block text-sm font-medium text-foreground mb-1">
              Mascota *
            </label>
            <select
              id="petId"
              name="petId"
              value={formData.petId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
              required
            >
              <option value="">Selecciona una mascota</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>{pet.name} ({pet.breed})</option>
              ))}
            </select>
          </div>

          {/* Service selection */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-foreground mb-1">
              Servicio *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
              required
            >
              <option value="">Selecciona un servicio</option>
              {walker.services.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">Fecha *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-foreground mb-1">Hora *</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-foreground mb-1">Duración (horas)</label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleDurationChange}
              className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary text-foreground"
            >
              {[1, 2, 3, 4, 5, 6].map(hour => (
                <option key={hour} value={hour}>{hour} hora{hour > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1">Notas adicionales</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              placeholder="Instrucciones especiales, ubicación de recogida, etc."
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          {/* Price summary */}
          {formData.duration > 0 && (
            <div className="bg-muted p-4 rounded-lg text-sm text-foreground/80">
              Total estimado: <span className="font-semibold text-foreground">${walker.price * formData.duration}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-green-600 to-primary text-white">
              Reservar
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
