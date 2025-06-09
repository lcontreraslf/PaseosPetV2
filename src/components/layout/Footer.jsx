// src/components/layout/Footer.jsx

import React from 'react';
import { PawPrint } from 'lucide-react'; // Icono para el logo de PaseosPet
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'; // Iconos de redes sociales

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Columna 1: Logo y Descripción */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-green-600 rounded-full flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-green-700 bg-clip-text text-transparent">
                PaseosPet
              </span>
            </div>
            <p className="text-sm">
              Conectando dueños de mascotas con los mejores paseadores y cuidadores de tu ciudad.
              Tu tranquilidad, nuestra prioridad.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary transition-colors text-sm">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors text-sm">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes Sociales (AHORA SIN LA SECCIÓN DE CONTACTO) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            {/* Las siguientes líneas han sido eliminadas:
            <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
            <p className="text-sm">Email: info@paseospet.com</p>
            <p className="text-sm">Teléfono: +123 456 7890</p>
            */}
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">
          <p>&copy; {currentYear} PaseosPet. Todos los derechos reservados.</p>
          <p className="mt-2">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Política de Privacidad</a> |{' '}
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Términos de Servicio</a>
          </p>
        </div>
      </div>
    </footer>
  );
}