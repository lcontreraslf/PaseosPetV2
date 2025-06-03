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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.petId || !formData.date || !formData.time || !formData.service) {
      toast({
        title: "Error",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDurationChange = (e) => {
     setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-6">
          <img
            src={walker.avatar}
            alt={walker.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{walker.name}</h3>
            <p className="text-sm text-gray-600">${walker.price}/hora</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="petId" className="block text-sm font-medium text-gray-700 mb-2">
              Mascota *
            </label>
            <select
              id="petId"
              name="petId"
              value={formData.petId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Selecciona una mascota</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} ({pet.breed})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
              Servicio *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Selecciona un servicio</option>
              {walker.services.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Fecha *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Hora *
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Duración (horas)
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleDurationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6].map((hour) => (
                <option key={hour} value={hour}>
                  {hour} hora{hour > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notas Adicionales
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="3"
              placeholder="Instrucciones especiales, ubicación de recogida, etc."
            />
          </div>

          {formData.duration > 0 && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Total:</span>
                <span className="text-xl font-bold text-purple-600">
                  ${walker.price * formData.duration}
                </span>
              </div>
            </div>
          )}

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
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Reservar
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}