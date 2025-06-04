import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function AddPetModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    weight: '',
    specialNeeds: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, breed, age, weight } = formData;

    if (!name || !breed || !age || !weight) {
      toast({
        title: 'Campos incompletos',
        description: 'Por favor completa todos los campos obligatorios.',
        variant: 'destructive'
      });
      return;
    }

    onAdd(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ scale: 0.95, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="bg-card rounded-2xl p-6 w-full max-w-md shadow-xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-foreground mb-6">Agregar Mascota</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary text-foreground"
              placeholder="Nombre de tu mascota"
              required
            />
          </div>

          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-foreground mb-1">Raza *</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary text-foreground"
              placeholder="Ej: Labrador, Persa, etc."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-foreground mb-1">Edad *</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                placeholder="Ej: 2 años"
                required
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-foreground mb-1">Peso *</label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                placeholder="Ej: 15 kg"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="specialNeeds" className="block text-sm font-medium text-foreground mb-1">Necesidades Especiales</label>
            <textarea
              id="specialNeeds"
              name="specialNeeds"
              rows="3"
              value={formData.specialNeeds}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary text-foreground"
              placeholder="Medicamentos, alergias, comportamiento especial..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-primary text-white"
            >
              Agregar
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
