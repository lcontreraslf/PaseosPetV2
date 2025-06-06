// src/components/modals/RegisterModal.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// === ELIMINAMOS EL COMPONENTE GoogleIcon ===
// Ya no es necesario definir GoogleIcon aquí.
// === FIN DE LA ELIMINACIÓN ===

export default function RegisterModal({ onClose, onRegister, onGoogleRegister, switchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, repeatPassword } = formData;

    if (!name || !email || !password || !repeatPassword) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos.",
        variant: "destructive"
      });
      return;
    }

    if (password !== repeatPassword) {
      toast({
        title: "Error de contraseña",
        description: "Las contraseñas no coinciden.",
        variant: "destructive"
      });
      return;
    }

    onRegister({ name, email, password });
  };

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
        className="relative bg-white rounded-2xl p-6 w-full max-w-md" // Asegúrate de que este tamaño sea consistente con LoginModal.jsx
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Crear cuenta
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repetir contraseña"
            value={formData.repeatPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          />

          <Button type="submit" className="w-full bg-green-600 text-white">
            Registrarse
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <button onClick={switchToLogin} className="text-blue-600 hover:underline">
            Iniciar Sesión
          </button>
        </div>

        <div className="mt-6">
          <div className="text-center text-sm mb-2 text-muted-foreground">o ingresa con</div>
          {/* **** LÍNEAS MODIFICADAS PARA EL BOTÓN DE GOOGLE **** */}
          <Button
            onClick={onGoogleRegister}
            // Mantenemos el className para el estilo blanco/gris y flexbox
            className="w-full bg-white border border-gray-300 text-black hover:bg-gray-100 flex items-center justify-center gap-2 rounded-lg shadow-sm hover:shadow-md"
          >
            {/* Usamos una etiqueta <img> para el ícono de Google */}
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png" // URL de un ícono de Google de alta calidad
              alt="Google"
              className="w-5 h-5" // Ajusta el tamaño de la imagen, sin mr-2 porque el gap lo maneja
            />
            Iniciar Sesión con Google
          </Button>
          {/* ************************************************** */}
        </div>
      </motion.div>
    </motion.div>
  );
}