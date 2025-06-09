// src/components/tabs/WalkersTab.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import ProfessionalProfileCard from "@/components/common/ProfessionalProfileCard";

export default function WalkersTab({ pets, onSelectWalker, currentUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [walkers, setWalkers] = useState([]);

  useEffect(() => {
    const localStorageKey = "petcare_walkers_data";
    const savedWalkers = localStorage.getItem(localStorageKey);
    let initialWalkersData = [];

    if (savedWalkers) {
      initialWalkersData = JSON.parse(savedWalkers);
    } else {
      initialWalkersData = [
        {
          id: 101,
          name: "María González",
          rating: 4.9,
          experience: "3 años",
          price: 15,
          location: "Centro",
          services: ["Paseos", "Entrenamiento Básico"],
          avatar: "https://placekitten.com/151/151",
          reviews: 127,
          verified: true,
        },
        {
          id: 102,
          name: "Carlos Ruiz",
          rating: 4.8,
          experience: "5 años",
          price: 18,
          location: "Norte",
          services: ["Paseos", "Entrenamiento Avanzado"],
          avatar: "https://placekitten.com/152/152",
          reviews: 89,
          verified: true,
        },
        {
          id: 103,
          name: "Javier Soto",
          rating: 4.7,
          experience: "4 años",
          price: 16,
          location: "Este",
          services: ["Paseos", "Cuidado diurno"],
          avatar: "https://placekitten.com/153/153",
          reviews: 110,
          verified: false,
        },
      ];

      localStorage.setItem(localStorageKey, JSON.stringify(initialWalkersData));
    }

    setWalkers(initialWalkersData);
  }, []);

  const filteredWalkers = walkers.filter((walker) => {
    const matchesSearch =
      walker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      walker.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesLocation =
      !selectedLocation || walker.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const locations = [...new Set(walkers.map((w) => w.location))].sort();
  const tabTitle = "Paseadores Disponibles";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Encabezado y filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-foreground">{tabTitle}</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar paseadores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-border bg-card rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
              aria-label="Buscar paseadores por nombre o servicio"
            />
          </div>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-border bg-card rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
            aria-label="Filtrar por zona"
          >
            <option value="">Todas las zonas</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarjetas de paseadores usando ProfessionalProfileCard */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWalkers.map((walker) => (
          <ProfessionalProfileCard
            key={walker.id}
            person={walker}
            onActionClick={onSelectWalker}
            currentUser={currentUser}
            pets={pets}
            actionButtonText="Agendar Paseo"
            priceUnit="/hora"
          />
        ))}
      </div>
    </motion.div>
  );
}
