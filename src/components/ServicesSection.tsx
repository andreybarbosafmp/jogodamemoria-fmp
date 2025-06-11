
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Home, 
  Heart, 
  Building, 
  Car, 
  FileText,
  Gavel,
  Users
} from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    {
      icon: Briefcase,
      title: 'Direito Trabalhista',
      description: 'Defesa de direitos trabalhistas, rescisões, FGTS, horas extras e muito mais.',
      color: 'bg-blue-500'
    },
    {
      icon: Home,
      title: 'Direito Imobiliário',
      description: 'Compra, venda, financiamentos, usucapião e questões condominiais.',
      color: 'bg-green-500'
    },
    {
      icon: Heart,
      title: 'Direito de Família',
      description: 'Divórcio, guarda, pensão alimentícia, inventário e sucessões.',
      color: 'bg-pink-500'
    },
    {
      icon: Building,
      title: 'Direito Empresarial',
      description: 'Constituição de empresas, contratos comerciais e consultoria jurídica.',
      color: 'bg-purple-500'
    },
    {
      icon: Car,
      title: 'Direito do Consumidor',
      description: 'Defesa contra práticas abusivas, produtos defeituosos e serviços inadequados.',
      color: 'bg-orange-500'
    },
    {
      icon: FileText,
      title: 'Direito Civil',
      description: 'Contratos, responsabilidade civil, danos morais e materiais.',
      color: 'bg-indigo-500'
    },
    {
      icon: Gavel,
      title: 'Direito Criminal',
      description: 'Defesa criminal, habeas corpus, recursos e acompanhamento processual.',
      color: 'bg-red-500'
    },
    {
      icon: Users,
      title: 'Direito Previdenciário',
      description: 'Aposentadorias, auxílios, pensões e revisões de benefícios.',
      color: 'bg-teal-500'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossas Áreas de Atuação
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções jurídicas completas com expertise em diversas áreas do direito,
            sempre focando no melhor resultado para nossos clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
