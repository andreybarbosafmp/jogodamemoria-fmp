
import React from 'react';
import { Scale, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">Carvalho Xavier</h3>
                <p className="text-sm text-gray-400">Advocacia</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Mais de 20 anos defendendo seus direitos com excelência, ética e dedicação. 
              Somos especialistas em diversas áreas do direito.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Início</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">contato@cxadvocacia.com.br</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-gray-300">Av. Paulista, 1000<br />São Paulo/SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 Carvalho Xavier Advocacia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
