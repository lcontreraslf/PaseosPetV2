import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Shield, MapPin, Heart } from "lucide-react";

const heroSlides = [
  {
    imgReplace: (
      <img
        className="w-full h-full object-cover"
        alt="Mascota feliz con su cuidador"
        src="https://images.unsplash.com/photo-1693615774176-a5560f55ac49"
      />
    ),
  },
  {
    imgReplace: (
      <img
        className="w-full h-full object-cover"
        alt="Perro paseando en un parque soleado"
        src="https://images.unsplash.com/photo-1633587376982-a9c3d1f4ce65"
      />
    ),
  },
  {
    imgReplace: (
      <img
        className="w-full h-full object-cover"
        alt="Mano acariciando a un gato"
        src="https://images.unsplash.com/photo-1516007049085-2a9077b4b512"
      />
    ),
  },
];

export default function HomeTab() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 7000);
    return () => clearInterval(slideInterval);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const features = [
    {
      icon: Shield,
      title: "Cuidadores Verificados",
      description:
        "Todos nuestros cuidadores pasan por un riguroso proceso de verificación",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: MapPin,
      title: "Seguimiento en Tiempo Real",
      description: "Monitorea los paseos de tu mascota con GPS en tiempo real",
      gradient: "from-primary to-green-600",
    },
    {
      icon: Heart,
      title: "Cuidado Personalizado",
      description:
        "Servicios adaptados a las necesidades específicas de tu mascota",
      gradient: "from-green-400 to-emerald-500",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Mascotas Felices" },
    { number: "500+", label: "Cuidadores Activos" },
    { number: "50,000+", label: "Paseos Realizados" },
    { number: "4.9★", label: "Calificación Promedio" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      {/* Carrusel con flechas y puntos */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden rounded-3xl">
        <AnimatePresence initial={false} custom={currentSlide}>
          <motion.div
            key={currentSlide}
            custom={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                nextSlide();
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide();
              }
            }}
            className="absolute inset-0 w-full h-full"
          >
            {heroSlides[currentSlide].imgReplace}
          </motion.div>
        </AnimatePresence>

        {/* Flechas */}
        <button
          onClick={prevSlide}
          className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
        >
          <ChevronRight size={28} />
        </button>

        {/* Puntos indicador */}
        <div className="absolute z-20 bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* Cards de características */}
      <section className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 pet-card-hover"
          >
            <div
              className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}
            >
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              {feature.title}
            </h3>
            <p className="text-foreground/80">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-gray-800 to-black rounded-3xl p-12 text-white">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
