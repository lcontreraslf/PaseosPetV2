// src/components/common/ProfessionalProfileCard.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Star, MapPin, Award, DollarSign,
  Calendar, MessageCircle, CheckCircle
} from 'lucide-react';

// Este componente genérico renderiza una tarjeta de perfil para profesionales (paseadores o cuidadores).
// Recibe un objeto 'person' con sus datos y un 'actionButtonText' para personalizar el botón.
export default function ProfessionalProfileCard({ person, onActionClick, currentUser, pets, actionButtonText = "Ver Perfil", priceUnit = "/hora" }) {
  // Las 'props' que espera 'person' deben ser consistentes con tus datos de paseadores/cuidadores:
  // { id, name, rating, experience, price, location, services, avatar, reviews, verified }

  // Determinar si el botón de acción debe estar deshabilitado
  const isButtonDisabled = !currentUser || pets.length === 0;
  const alertMessage = !currentUser ? "Inicia sesión para poder reservar." : (pets.length === 0 ? "Agrega una mascota para poder reservar." : null);

  return (
    <motion.div
      key={person.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-300 pet-card-hover"
    >
      {/* Encabezado con foto */}
      <div className="flex items-center mb-4">
        <img
          src={person.avatar}
          alt={`Avatar de ${person.name}`}
          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary/30"
        />
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-lg font-bold text-foreground">{person.name}</h3>
            {person.verified && (
              <CheckCircle className="w-5 h-5 text-green-500 ml-2" title="Verificado" />
            )}
          </div>
          <div className="flex items-center text-sm text-foreground/70">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{person.rating}</span>
            <span className="mx-1">•</span>
            <span>{person.reviews} reseñas</span>
          </div>
        </div>
      </div>

      {/* Datos */}
      <div className="space-y-3 mb-4 text-sm text-foreground/80">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          <span>{person.location}</span>
        </div>
        <div className="flex items-center">
          <Award className="w-4 h-4 mr-2 text-primary" />
          <span>{person.experience} de experiencia</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-2 text-primary" />
          <span>${person.price}{priceUnit}</span> {/* Unidad de precio dinámica */}
        </div>
      </div>

      {/* Servicios */}
      <div className="mb-4">
        <p className="text-sm font-medium text-foreground/90 mb-2">Servicios:</p>
        <div className="flex flex-wrap gap-2">
          {person.services.map((service, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex gap-2">
        <Button
          className="flex-1 bg-gradient-to-r from-primary to-green-600 text-primary-foreground"
          onClick={() => onActionClick(person)} // Función de acción dinámica
          disabled={isButtonDisabled}
          aria-label={actionButtonText}
        >
          <Calendar className="w-4 h-4 mr-2" />
          {actionButtonText}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-border text-foreground/70 hover:bg-gray-700/10"
          aria-label="Enviar mensaje"
        >
          <MessageCircle className="w-4 h-4" />
        </Button>
      </div>

      {/* Alertas */}
      {alertMessage && (
        <p className="text-xs text-red-500 mt-2 text-center">
          {alertMessage}
        </p>
      )}
    </motion.div>
  );
}