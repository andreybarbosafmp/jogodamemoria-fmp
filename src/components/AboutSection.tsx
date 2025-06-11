
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Users, Target } from 'lucide-react';

export const AboutSection = () => {
  const achievements = [
    {
      icon: Clock,
      title: '20+ Anos',
      subtitle: 'de Experiência'
    },
    {
      icon: Users,
      title: '1000+',
      subtitle: 'Clientes Atendidos'
    },
    {
      icon: Award,
      title: '95%',
      subtitle: 'Taxa de Sucesso'
    },
    {
      icon: Target,
      title: '24h',
      subtitle: 'Tempo de Resposta'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Sobre o Escritório
              <span className="text-blue-800"> Carvalho Xavier</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Fundado com o compromisso de oferecer excelência em serviços jurídicos, 
              o escritório Carvalho Xavier Advocacia atua há mais de duas décadas no 
              mercado, construindo uma sólida reputação baseada na ética, competência 
              e dedicação aos nossos clientes.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nossa equipe de advogados especializados está sempre atualizada com as 
              mais recentes mudanças na legislação, garantindo que nossos clientes 
              recebam o melhor assessoramento jurídico possível.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="text-center p-4 bg-white rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <achievement.icon className="h-8 w-8 text-blue-800 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{achievement.title}</div>
                  <div className="text-sm text-gray-600">{achievement.subtitle}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚖️</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Missão</h3>
                  <p className="text-gray-600">
                    Defender os direitos dos nossos clientes com excelência, 
                    ética e dedicação, buscando sempre a justiça.
                  </p>
                </div>
              </div>
            </div>
            
            <motion.div
              className="absolute -bottom-4 -right-4 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full font-semibold rotate-12"
              animate={{ 
                rotate: [12, 8, 12],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🏆 Excelência Jurídica
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
