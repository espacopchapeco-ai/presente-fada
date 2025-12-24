import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Tag, Sparkles, ChevronRight, ChevronLeft, ArrowLeft, MessageCircle } from 'lucide-react';

const ProceduresPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedProcedure, setExpandedProcedure] = useState(null);

  // Dados de exemplo dos procedimentos - em uma aplicação real, isso poderia vir de um arquivo JSON
  const procedures = [
    {
      id: "1",
      name: "Limpeza de Pele Profunda",
      description: "Procedimento completo de limpeza, extração e hidratação.",
      fullDescription: "A limpeza de pele profunda é um procedimento essencial que remove impurezas, células mortas e excesso de oleosidade. Inclui esfoliação suave, extração de cravos e espinhas, e máscara hidratante personalizada para seu tipo de pele.",
      duration: "90 minutos",
      price: "R$ 180,00",
      benefits: [
        "Redução de cravos e espinhas",
        "Hidratação profunda",
        "Estimula renovação celular",
        "Melhora a textura da pele"
      ],
      category: "limpeza",
      categoryLabel: "Limpeza",
      image: "/src/assets/limpeza-pele.jpg",
      icon: <Sparkles className="w-6 h-6 text-[#B6D8F2]" />
    },
    {
      id: "2",
      name: "Botox Capilar",
      description: "Tratamento reconstrutor para fios danificados.",
      fullDescription: "O botox capilar é um tratamento intensivo de reconstrução que devolve a saúde e vitalidade aos fios. Utiliza ingredientes como queratina e aminoácidos para reparar a fibra capilar.",
      duration: "60 minutos",
      price: "R$ 120,00",
      benefits: [
        "Restauração da fibra capilar",
        "Redução do frizz",
        "Brilho intenso",
        "Maciez e sedosidade"
      ],
      category: "cabelos",
      categoryLabel: "Cabelos",
      image: "/src/assets/botox-capilar.jpg",
      icon: <Heart className="w-6 h-6 text-[#FFD1D1]" />
    },
    {
      id: "3",
      name: "Massagem Relaxante",
      description: "Massagem terapêutica para alívio do estresse.",
      fullDescription: "A massagem relaxante utiliza técnicas suaves e rítmicas para promover o relaxamento profundo, alívio da tensão muscular e melhoria da circulação sanguínea.",
      duration: "60 minutos",
      price: "R$ 150,00",
      benefits: [
        "Alívio do estresse e tensão",
        "Melhora a circulação",
        "Promove bem-estar",
        "Redução de dores musculares"
      ],
      category: "massagem",
      categoryLabel: "Massagem",
      image: "/src/assets/massagem.jpg",
      icon: <Heart className="w-6 h-6 text-[#FFD1D1]" />
    },
    {
      id: "4",
      name: "Design de Sobrancelhas",
      description: "Modelagem personalizada para harmonizar o rosto.",
      fullDescription: "O design de sobrancelhas é uma técnica especializada que considera as proporções faciais para criar um formato que valoriza os traços e expressão de cada pessoa.",
      duration: "30 minutos",
      price: "R$ 80,00",
      benefits: [
        "Formato harmonioso",
        "Valoriza os traços faciais",
        "Técnica personalizada",
        "Sobrancelhas mais expressivas"
      ],
      category: "sobrancelhas",
      categoryLabel: "Sobrancelhas",
      image: "/src/assets/sobrancelhas.jpg",
      icon: <Sparkles className="w-6 h-6 text-[#B6D8F2]" />
    },
    {
      id: "5",
      name: "Depilação com Cera",
      description: "Remoção de pelos com cera quente e fria.",
      fullDescription: "A depilação com cera é um método eficaz de remoção de pelos que garante pele lisa por mais tempo. Utilizamos ceras de alta qualidade, adequadas para diferentes tipos de pele.",
      duration: "45 minutos",
      price: "R$ 70,00",
      benefits: [
        "Pele lisa por mais tempo",
        "Redução do crescimento",
        "Técnica segura",
        "Resultados duradouros"
      ],
      category: "depilacao",
      categoryLabel: "Depilação",
      image: "/src/assets/depilacao.jpg",
      icon: <Sparkles className="w-6 h-6 text-[#B6D8F2]" />
    },
    {
      id: "6",
      name: "Tratamento para Acne",
      description: "Protocolo especializado para controle de acne.",
      fullDescription: "O tratamento para acne combina técnicas específicas de limpeza, extração e aplicação de produtos medicamentosos para controlar a oleosidade e reduzir inflamações.",
      duration: "75 minutos",
      price: "R$ 200,00",
      benefits: [
        "Controle da oleosidade",
        "Redução de inflamações",
        "Prevenção de novas lesões",
        "Cicatrização acelerada"
      ],
      category: "tratamentos",
      categoryLabel: "Tratamentos",
      image: "/src/assets/acne.jpg",
      icon: <Heart className="w-6 h-6 text-[#FFD1D1]" />
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'limpeza', label: 'Limpeza' },
    { id: 'cabelos', label: 'Cabelos' },
    { id: 'massagem', label: 'Massagem' },
    { id: 'sobrancelhas', label: 'Sobrancelhas' },
    { id: 'depilacao', label: 'Depilação' },
    { id: 'tratamentos', label: 'Tratamentos' }
  ];

  const filteredProcedures = selectedCategory === 'all' 
    ? procedures 
    : procedures.filter(proc => proc.category === selectedCategory);

  const toggleProcedure = (id) => {
    setExpandedProcedure(expandedProcedure === id ? null : id);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF9F9] text-[#7A6B6B] selection:bg-[#E8D5D5] overflow-x-hidden relative flex flex-col items-center justify-center font-sans">
      {/* Botão de voltar */}
      <nav className="fixed top-6 left-6 z-[95] bg-white/60 backdrop-blur-md p-3 rounded-full border border-white/50 text-[#7A6B6B] transition-all">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Início</span>
        </Link>
      </nav>

      {/* Background decorativo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,_#FFD1D1_0%,_transparent_70%)]"></div>
        {[...Array(15)].map((_, i) => (
          <div
            key={`bg-${i}`}
            className="absolute bg-white rounded-full opacity-30 animate-pulse"
            style={{
              width: (Math.random() * 3 + 2) + 'px',
              height: (Math.random() * 3 + 2) + 'px',
              top: (Math.random() * 100) + '%',
              left: (Math.random() * 100) + '%',
              animationDuration: (Math.random() * 3 + 2) + 's',
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="w-full max-w-6xl px-6 relative z-10 flex flex-col items-center pt-10 sm:pt-16 pb-20">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#B6D8F2] animate-bounce-slow" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif italic leading-tight mb-4 text-[#9E8282]">
            Procedimentos Estéticos
          </h1>
          <p className="text-sm sm:text-base opacity-70 max-w-2xl mx-auto">
            Descubra os tratamentos especiais que preparei para cuidar de você com carinho e atenção
          </p>
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 animate-fade-in-up">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#FFD1D1] text-white'
                  : 'bg-white border border-[#FFD1D1] text-[#9E8282] hover:bg-[#FFD1D1] hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid de procedimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
          {filteredProcedures.map((procedure) => (
            <div 
              key={procedure.id}
              className="bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-white shadow-sm hover:-translate-y-2 transition-all duration-500 animate-fade-in-up"
              style={{
                animationDelay: `${procedure.id * 0.1}s`
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  {procedure.icon}
                  <span className="text-xs sm:text-sm text-[#B6D8F2] uppercase tracking-wide font-semibold">
                    {procedure.categoryLabel}
                  </span>
                </div>
                <button 
                  onClick={() => toggleProcedure(procedure.id)}
                  className="text-[#7A6B6B] opacity-60 hover:opacity-100 transition-opacity"
                >
                  {expandedProcedure === procedure.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>
              </div>
              
              <h3 className="text-lg sm:text-xl font-serif text-[#7A6B6B] mb-2">{procedure.name}</h3>
              <p className="text-sm sm:text-base opacity-80 mb-4">{procedure.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{procedure.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4" />
                  <span className="font-semibold">{procedure.price}</span>
                </div>
              </div>
              
              {expandedProcedure === procedure.id && (
                <div className="animate-fade-in-up border-t border-[#FFD1D1]/30 pt-4 mt-4">
                  <p className="text-sm mb-4">{procedure.fullDescription}</p>
                  <ul className="text-xs space-y-1 mb-4">
                    {procedure.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Heart className="w-3 h-3 text-[#FFD1D1] mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <button className="w-full bg-[#B6D8F2] text-white py-3 rounded-full hover:bg-[#A5C9E5] transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                Agendar Consulta <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Seção de destaque */}
        <div className="mt-16 sm:mt-20 w-full max-w-4xl animate-fade-in-up">
          <div className="bg-white/60 backdrop-blur-md p-8 sm:p-10 rounded-[32px] border border-white text-center shadow-sm">
            <Heart className="w-8 h-8 text-[#FFD1D1] mx-auto mb-4 opacity-60" />
            <h2 className="text-xl sm:text-2xl font-serif italic text-[#9E8282] mb-4">
              Cuidado Personalizado
            </h2>
            <p className="text-base sm:text-lg leading-relaxed opacity-90 mb-6">
              Cada tratamento é pensado especialmente para você, considerando suas necessidades, 
              tipo de pele e objetivos. O meu compromisso é oferecer cuidados que vão além da estética, 
              promovendo bem-estar e autoestima.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-[#FFD1D1] text-white rounded-full hover:bg-[#F8C4C4] transition-all shadow-lg shadow-[#FFD1D1]/20 flex items-center justify-center gap-2">
                Agendar Avaliação <Sparkles className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-white border border-[#B6D8F2] text-[#7A6B6B] rounded-full hover:bg-[#B6D8F2] hover:text-white transition-all">
                Fale com a Fada
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos globais para animações */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        
        .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
      
      {/* Botão Flutuante WhatsApp */}
      <a 
        href="https://wa.me/5549988429631?text=Olá!%20Estou%20interessada%20em%20seus%20procedimentos%20estéticos.%20Poderia%20me%20ajudar?"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-lg active:scale-90 transition-transform flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

// Componentes de ícones para expansão/retração
const ChevronUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default ProceduresPage;