import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Gift, Send, X, MessageCircle, ChevronRight, ChevronLeft, Volume2, VolumeX } from 'lucide-react';

/**
 * RESOLUÇÃO DE PROBLEMAS VITE/LOCAL:
 * 1. Limpe o arquivo App.css (deixe vazio).
 * 2. No index.css mantenha apenas:
 * @tailwind base; @tailwind components; @tailwind utilities;
 */

const App = () => {
  const [step, setStep] = useState('opening');
  const [storySubStep, setStorySubStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ nome: '', whatsapp: '' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef(null);

  const vouchers = [
    { id: '100', val: "100", min: "300" },
    { id: '200', val: "200", min: "500" },
    { id: '300', val: "300", min: "1.000" }
  ];

  const storyContent = [
    {
      title: "O Despertar",
      text: "Com o tempo, percebi que a nossa conexão foi muito além da pele. Virou conversa leve, troca sincera, confiança... virou cuidado de verdade, daquele que aquece o coração.",
      icon: <Heart className="w-8 h-8 text-[#FFD1D1]" />
    },
    {
      title: "Cada Encontro é Único",
      text: "Cuidar de si nunca foi apenas um procedimento. Sempre foi um gesto de carinho, respeito e amizade. Obrigada por se permitir pausar e se escolher.",
      icon: <Sparkles className="w-8 h-8 text-[#B6D8F2]" />
    },
    {
      title: "Uma Carta para Você",
      text: "A cada vez que entrou aqui, trouxe a sua história, os seus sonhos e até os seus silêncios. Que este final de ano seja um tempo de descanso para a alma e de orgulho por tudo o que você é.",
      icon: <Send className="w-8 h-8 text-[#FFD1D1]" />
    }
  ];

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'vB47pHbMpwQ',
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: 'vB47pHbMpwQ',
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          fs: 0,
          rel: 0,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(30);
            // Tentar tocar automaticamente (pode ser bloqueado no Safari)
            event.target.playVideo();
          },
          onError: (event) => {
            console.log('Erro ao carregar vídeo:', event.data);
          }
        }
      });
    };
  }, []);

  const startMagic = () => {
    setStep('story');
    // Tocar música quando usuário interage (bypass do Safari autoplay)
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      playerRef.current.playVideo();
    }
  };

  const nextStoryStep = () => {
    if (storySubStep < storyContent.length - 1) {
      setStorySubStep(storySubStep + 1);
    } else {
      setStep('gift');
    }
  };

  const prevStoryStep = () => {
    if (storySubStep > 0) {
      setStorySubStep(storySubStep - 1);
    } else {
      setStep('opening');
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleVoucherRequest = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const msg = `Olá! Sou a ${formData.nome}. Acabei de ler a minha carta mágica e quero garantir o meu presente para 2026. ✨`;
    const encodedMsg = encodeURIComponent(msg);
    const waLink = `https://wa.me/5549988429631?text=${encodedMsg}`;
    setTimeout(() => {
      window.open(waLink, '_blank');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF9F9] text-[#7A6B6B] selection:bg-[#E8D5D5] overflow-x-hidden relative flex flex-col items-center justify-center font-sans">
      {/* Container YouTube Invisível */}
      <div id="youtube-player" style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', opacity: 0 }}></div>
      
      {/* Estilos Globais de Reset para garantir igualdade com o Preview */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:italic,wght@400;500&family=Inter:wght@300;400;500&display=swap');
        
        :root { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }

        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        
        .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        
        /* Reset de CSS do Vite que costuma quebrar layouts */
        body { margin: 0; padding: 0; box-sizing: border-box; }
        #root { width: 100%; }

        @media (min-width: 1024px) {
          body { cursor: none !important; }
          button, a, input { cursor: none !important; }
        }
      `}</style>

      {/* Background Decorativo Estático e Brilhante */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,_#FFD1D1_0%,_transparent_70%)]"></div>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
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

      {/* Cursor Customizado (Só Desktop) */}
      <div 
        className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden lg:block"
        style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
      >
        <Sparkles className="text-[#FFD1D1] w-5 h-5 animate-spin-slow" />
      </div>

      {/* Som Flutuante */}
      {step !== 'opening' && (
        <button 
          onClick={toggleMute}
          className="fixed top-6 right-6 z-[95] bg-white/60 backdrop-blur-md p-3 rounded-full border border-white/50 text-[#7A6B6B] hover:bg-white transition-all active:scale-90 shadow-sm"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}

      {/* Conteúdo Centralizado */}
      <div className="w-full max-w-5xl px-6 relative z-10 flex flex-col items-center">
        
        {/* ETAPA 1: ABERTURA */}
        {step === 'opening' && (
          <div className="flex flex-col items-center text-center animate-fade-in max-w-2xl mx-auto py-10 sm:py-20">
            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-[#B6D8F2] mb-6 sm:mb-8 animate-bounce-slow" />
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic leading-tight mb-8 sm:mb-12 text-[#9E8282] px-4">
              Este é um abraço em forma de mensagem.
            </h1>
            <button 
              onClick={startMagic}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-white border border-[#FFD1D1] rounded-full text-[#9E8282] hover:bg-[#FFD1D1] hover:text-white transition-all duration-500 shadow-sm group"
            >
              <span className="flex items-center gap-2 sm:gap-3 tracking-[0.3em] text-[10px] md:text-xs uppercase font-semibold">
                Abrir Presente <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 text-[#8B7E7E] mt-6 sm:mt-8">Música será ativada ao entrar ✨</p>
          </div>
        )}

        {/* ETAPA 2: JORNADA (STEPS) */}
        {step === 'story' && (
          <div className="flex flex-col items-center animate-fade-in w-full max-w-3xl py-6 sm:py-10 min-h-[400px] sm:min-h-[500px] justify-between">
            <div className="flex gap-3 sm:gap-4 mb-10 sm:mb-16">
              {storyContent.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-700 ${i <= storySubStep ? 'w-8 sm:w-12 bg-[#FFD1D1]' : 'w-3 sm:w-4 bg-white/60'}`}></div>
              ))}
            </div>

            <div key={storySubStep} className="text-center space-y-6 sm:space-y-8 animate-fade-in-up w-full px-4">
              <div className="flex justify-center mb-4 sm:mb-6">{storyContent[storySubStep].icon}</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#9E8282]">{storyContent[storySubStep].title}</h2>
              <p className="text-base sm:text-xl md:text-2xl leading-relaxed font-light opacity-90 italic">
                "{storyContent[storySubStep].text}"
              </p>
            </div>

            <div className="flex items-center gap-6 sm:gap-8 md:gap-16 mt-10 sm:mt-16">
              <button 
                onClick={prevStoryStep} 
                className="p-3 sm:p-4 rounded-full bg-white/60 hover:bg-white text-[#7A6B6B] transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button 
                onClick={nextStoryStep}
                className="px-8 sm:px-14 py-4 sm:py-5 bg-[#FFD1D1] text-white rounded-full hover:bg-[#F8C4C4] transition-all shadow-xl shadow-[#FFD1D1]/30 flex items-center gap-2 sm:gap-3 font-medium active:scale-95 text-sm sm:text-base"
              >
                {storySubStep === storyContent.length - 1 ? "Ver meu Presente" : "Continuar"} <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 3: O PRESENTE */}
        {step === 'gift' && (
          <div className="animate-fade-in-up w-full max-w-4xl py-4 sm:py-6 space-y-6 sm:space-y-10 px-4">
            <div className="text-center space-y-2 sm:space-y-3">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFD1D1] mx-auto mb-2 sm:mb-3 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#9E8282]">O Seu Presente para 2026</h2>
              <p className="text-xs sm:text-sm opacity-60">Escolha um dos momentos abaixo para cuidarmos de você.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {vouchers.map((v) => (
                <div key={v.id} className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] border border-white text-center hover:-translate-y-2 transition-all duration-500 shadow-sm">
                  <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#B6D8F2] font-bold mb-2 sm:mb-3">Mimo Especial</div>
                  <div className="text-2xl sm:text-3xl font-serif text-[#7A6B6B] mb-1 sm:mb-2">R$ {v.val}</div>
                  <div className="text-[9px] sm:text-[10px] italic opacity-50">Válido em serviços acima de R$ {v.min}</div>
                </div>
              ))}
            </div>

            <div className="text-center space-y-4 sm:space-y-6">
              <button 
                onClick={() => setShowModal(true)}
                className="bg-[#B6D8F2] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-[#A5C9E5] transition-all shadow-2xl shadow-[#B6D8F2]/40 flex items-center gap-2 mx-auto text-sm sm:text-base font-medium active:scale-95"
              >
                Resgatar Presente Encantado <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] opacity-40 space-y-1">
                <p>Validade: 31 de Março de 2026</p>
                <p>Uso individual • Agendamento prévio</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DE REGISTRO */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#7A6B6B]/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[56px] p-10 md:p-14 relative shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 text-[#7A6B6B] opacity-20 hover:opacity-100 transition-opacity">
              <X className="w-6 h-6" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-24 h-24 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
                  <Heart className="w-12 h-12 text-[#81C784] fill-current" />
                </div>
                <h3 className="text-3xl font-serif italic text-[#9E8282] mb-4">Está guardado!</h3>
                <p className="text-base leading-relaxed opacity-70 mb-12">
                  Prepare o coração para 2026. Estamos te guiando para o WhatsApp agora...
                </p>
                <div className="w-10 h-10 border-2 border-[#B6D8F2] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <div className="animate-fade-in-up">
                <div className="text-center mb-10">
                  <Sparkles className="w-8 h-8 text-[#FFD1D1] mx-auto mb-4" />
                  <h3 className="text-3xl font-serif italic text-[#9E8282] mb-3">Quase lá...</h3>
                  <p className="text-sm opacity-60">Confirme seus dados para validar o presente.</p>
                </div>
                <form onSubmit={handleVoucherRequest} className="space-y-5">
                  <input required type="text" placeholder="Seu nome" className="w-full px-7 py-5 bg-[#FFF9F9] border-none rounded-2xl outline-none focus:ring-1 focus:ring-[#FFD1D1] text-sm" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
                  <input required type="tel" placeholder="Seu WhatsApp" className="w-full px-7 py-5 bg-[#FFF9F9] border-none rounded-2xl outline-none focus:ring-1 focus:ring-[#FFD1D1] text-sm" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                  <button type="submit" className="w-full bg-[#FFD1D1] text-white py-5 rounded-2xl font-semibold hover:bg-[#F8C4C4] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#FFD1D1]/20 mt-6">
                    Validar Presente <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WhatsApp Flutuante */}
      <a 
        href="https://wa.me/5549988429631"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 sm:bottom-10 right-6 sm:right-10 z-[90] bg-[#25D366] text-white p-4 sm:p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
      </a>
    </div>
  );
};

export default App;