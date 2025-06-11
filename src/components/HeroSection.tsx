
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';
import { Hero3D } from './Hero3D';

export const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-blue-800">Carvalho Xavier</span>
              <br />
              Advocacia
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Excelência jurídica com mais de 20 anos de experiência. 
              Defendemos seus direitos com dedicação, ética e resultados comprovados.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Consulta Gratuita</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              <motion.button
                className="border-2 border-blue-800 text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Nossos Serviços
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Shield, label: 'Segurança Jurídica', value: '100%' },
                { icon: Award, label: 'Casos Vencidos', value: '95%' },
                { icon: Users, label: 'Clientes Atendidos', value: '1000+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <stat.icon className="h-8 w-8 text-blue-800 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <Hero3D />
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-semibold text-sm rotate-12">
              ⚖️ Justiça Digital
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
