# Implementação na Vercel

Este guia fornece instruções passo a passo para implementar o site "Fada da Pele" na plataforma Vercel.

## 1. Criar a estrutura do projeto com Vite

Primeiro, crie um novo projeto React usando o Vite:

```bash
npm create vite@latest fada-da-pele -- --template react
```

## 2. Entrar na pasta

Navegue até o diretório do projeto recém-criado:

```bash
cd fada-da-pele
```

## 3. Instalar as dependências necessárias

Instale as dependências do projeto, incluindo o Lucide React para os ícones:

```bash
npm install lucide-react
```

## 4. Instalar o Tailwind CSS

Instale as dependências do Tailwind CSS e suas ferramentas complementares:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 5. Configurar o Tailwind CSS

Atualize o arquivo `tailwind.config.js` para garantir que os caminhos estejam corretos para o Tailwind ler os arquivos:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 6. Adicionar as diretivas do Tailwind

No arquivo `src/index.css`, adicione as diretivas do Tailwind no topo do arquivo:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 7. Substituir o conteúdo do arquivo App.jsx

Substitua o conteúdo do arquivo `src/App.jsx` com o código abaixo:

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Gift, Send, X, MessageCircle, Check, Volume2, VolumeX } from 'lucide-react';

const App = () => {
  const [step, setStep] = useState('opening');
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

  // Configuração do YouTube Player via API Oficial
  useEffect(() => {
    // Carrega o script da API do YouTube se ainda não existir
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
          autoplay: 0, // Inicia pausado para não ser bloqueado pelo browser
          loop: 1,
          playlist: 'vB47pHbMpwQ',
          controls: 0,
          showinfo: 0,
          modestbranding: 1
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(40); // Volume ambiente suave
          }
        }
      });
    };
  }, []);

  // Função que inicia a transição e o áudio simultaneamente
  const startMagic = () => {
    setStep('content');
    // Inicia a música após o clique (interação obrigatória exigida pelos browsers)
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      playerRef.current.playVideo();
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
    const msg = `Olá! Sou a ${formData.nome}. Acabei de ler a minha carta mágica e quero garantir o meu presente para 2026. Gostaria de agendar o meu momento de autocuidado! ✨`;
    const encodedMsg = encodeURIComponent(msg);
    const waLink = `https://wa.me/5549988429631?text=${encodedMsg}`;
    setTimeout(() => {
      window.open(waLink, '_blank');
    }, 1500);
  };

  const FloatingSparkles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-40 animate-pulse"
          style={{
            width: Math.random() * 3 + 2 + 'px',
            height: Math.random() * 3 + 2 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDuration: Math.random() * 3 + 2 + 's',
            animationDelay: Math.random() * 2 + 's',
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF9F9] text-[#7A6B6B] font-serif selection:bg-[#E8D5D5] overflow-x-hidden relative">
      {/* Player de YouTube Escondido - Necessário para o áudio de fundo */}
      <div id="youtube-player" className="hidden"></div>
      
      <FloatingSparkles />

      {/* Cursor Customizado (Visível apenas em Desktop) */}
      <div 
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out hidden lg:block"
        style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
      >
        <Sparkles className="text-[#FFD1D1] w-6 h-6 animate-spin-slow" />
      </div>

      {/* Botão de Som Flutuante */}
      {step === 'content' && (
        <button 
          onClick={toggleMute}
          className="fixed top-6 right-6 z-[95] bg-white/30 backdrop-blur-md p-3 rounded-full border border-white/50 text-[#7A6B6B] hover:bg-white/50 transition-all active:scale-90"
          title={isMuted ? "Ativar som" : "Silenciar"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}

      {/* 1. Tela de Abertura */}
      {step === 'opening' && (
        <div className="h-screen flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-[#FFD1D1] blur-3xl opacity-20 rounded-full animate-pulse"></div>
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-[#B6D8F2] mx-auto mb-6 relative z-10" />
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light italic leading-relaxed mb-10 max-w-xl px-4">
            "Este é um abraço em forma de mensagem."
          </h1>
          <button 
            onClick={startMagic}
            className="group relative px-8 py-4 bg-white border border-[#FFD1D1] rounded-full text-[#9E8282] hover:bg-[#FFD1D1] hover:text-white transition-all duration-500 shadow-sm active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2 tracking-widest text-xs md:text-sm uppercase">
              Receber o meu presente <Sparkles className="w-4 h-4" />
            </span>
          </button>
        </div>
      )}

      {step === 'content' && (
        <main className="max-w-3xl mx-auto px-5 py-12 md:py-20 space-y-24 md:space-y-32 animate-fade-in-up">
          <section className="text-center space-y-6">
            <Heart className="w-8 h-8 text-[#FFD1D1] mx-auto opacity-60" />
            <h2 className="text-xl md:text-2xl italic font-light">Além do Espelho</h2>
            <p className="leading-relaxed text-base md:text-lg font-light opacity-90">
              Com o tempo, percebi que a nossa conexão foi muito além da pele. 
              Virou conversa leve, troca sincera, confiança... virou cuidado de verdade, 
              daquele que aquece o coração.
            </p>
          </section>

          <section className="bg-white/50 p-8 md:p-10 rounded-[32px] md:rounded-[40px] backdrop-blur-sm border border-white text-center space-y-6 shadow-sm">
            <div className="text-[#B6D8F2] text-2xl opacity-60">✧</div>
            <h2 className="text-xl md:text-2xl italic font-light">Cada Encontro é Único</h2>
            <p className="leading-relaxed text-base md:text-lg font-light italic">
              Cuidar de si nunca foi apenas um procedimento. Sempre foi um gesto de carinho, 
              respeito e amizade. Obrigada por se permitir pausar e se escolher.
            </p>
          </section>

          <section className="relative">
            <div className="absolute -left-2 md:-left-10 -top-6 text-[#FFD1D1] opacity-20 text-7xl md:text-9xl font-serif">"</div>
            <div className="space-y-8 relative z-10">
              <div className="text-lg md:text-xl leading-relaxed space-y-6">
                <span className="text-2xl md:text-3xl font-light block mb-4">Querida paciente,</span>
                <p>Leia esta carta com calma, como quem recebe um abraço apertado e cheio de carinho. Porque é exatamente isso que ela é.</p>
                <p>A cada vez que entrou aqui, trouxe a sua história, os seus dias bons, os seus dias cansados, os seus sonhos e até os seus silêncios. Obrigada por confiar em mim. Obrigada por se permitir olhar-se com mais gentileza, mesmo quando a vida pede tanto de si.</p>
                <p className="italic text-[#9E8282] bg-[#FFF5F5] p-4 rounded-2xl">
                  Que este final de ano seja um tempo de descanso para a alma, de acolhimento, de leveza, de amor-próprio e de orgulho por tudo o que você é.
                </p>
                <p>Preparei este presente com o coração de fada, para que em 2026 continue a escolher-se, a cuidar-se e a sentir-se bem na sua própria pele. Porque você merece. Sempre mereceu.</p>
              </div>

              <div className="pt-8 text-right">
                <p className="text-base md:text-lg italic font-light leading-relaxed">
                  Estarei aqui, do jeitinho de sempre:<br />
                  com atenção, escuta, cuidado verdadeiro<br />
                  e um toque de magia em cada detalhe.
                </p>
                <div className="mt-6 flex flex-col items-end">
                  <span className="text-[#FFD1D1] text-xl mb-1">✨</span>
                  <p className="font-semibold text-[#7A6B6B]">Fada da Pele</p>
                  <p className="text-xs italic opacity-70">A sua fada do autocuidado</p>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center space-y-10 pb-20">
            <div className="h-px w-16 bg-[#FFD1D1] mx-auto"></div>
            <h2 className="text-2xl md:text-3xl font-light italic px-4">O Seu Presente para 2026</h2>
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
              {vouchers.map((v) => (
                <div key={v.id} className="bg-white p-6 md:p-8 rounded-[24px] border border-[#F2F2F2] shadow-sm">
                  <div className="text-[#B6D8F2] mb-2 uppercase tracking-tighter text-[10px]">Presente Especial</div>
                  <div className="text-2xl md:text-3xl font-serif text-[#7A6B6B] mb-1">R$ {v.val}</div>
                  <div className="text-[11px] opacity-60 italic">Em tratamentos a partir de R$ {v.min}</div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="w-full md:w-auto bg-[#B6D8F2] text-white px-8 py-5 rounded-full hover:bg-[#A5C9E5] transition-all shadow-lg shadow-[#B6D8F2]/20 flex items-center justify-center gap-3 mx-auto active:scale-95"
            >
              Receber o meu presente encantado ✨
            </button>
            <div className="text-[10px] uppercase tracking-widest opacity-40 space-y-1 px-4">
              <p>Válido até 31/03/2026</p>
              <p>Um presente por CPF • Sujeito a disponibilidade</p>
            </div>
          </section>
        </main>
      )}

      {/* Modal de Registo */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-[#7A6B6B]/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-t-[32px] md:rounded-[40px] p-6 md:p-10 relative overflow-hidden shadow-2xl">
            <button 
              onClick={() => {setShowModal(false); setFormSubmitted(false);}}
              className="absolute top-5 right-5 text-[#7A6B6B] opacity-40 p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {!formSubmitted ? (
              <div className="animate-fade-in-up">
                <div className="text-center mb-6 md:mb-8">
                  <Gift className="w-8 h-8 text-[#FFD1D1] mx-auto mb-3" />
                  <h3 className="text-xl md:text-2xl italic font-light">Garanta o seu momento</h3>
                  <p className="text-xs md:text-sm opacity-60">Deixe o seu contacto para que possamos cuidar de si em 2026.</p>
                </div>
                <form onSubmit={handleVoucherRequest} className="space-y-4">
                  <div className="space-y-3">
                    <input required type="text" placeholder="Nome completo" className="w-full px-5 py-4 bg-[#FFF9F9] border-none rounded-xl focus:ring-2 focus:ring-[#FFD1D1] outline-none text-sm" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
                    <input required type="tel" placeholder="WhatsApp (com DDD)" className="w-full px-5 py-4 bg-[#FFF9F9] border-none rounded-xl focus:ring-2 focus:ring-[#FFD1D1] outline-none text-sm" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                  </div>
                  <button type="submit" className="w-full bg-[#FFD1D1] text-white py-4 md:py-5 rounded-2xl font-medium hover:bg-[#F8C4C4] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FFD1D1]/30 mt-4">
                    Confirmar o meu momento <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-[#81C784] fill-current" />
                </div>
                <h3 className="text-xl md:text-2xl italic font-light mb-4">Está guardado!</h3>
                <p className="text-sm md:text-base leading-relaxed opacity-70 mb-8 px-2">
                  Obrigada, {formData.nome.split(' ')[0]}! O seu pedido de presente foi registado.<br/>
                  Estamos a abrir o WhatsApp para agendar...
                </p>
                <div className="flex flex-col gap-4 items-center">
                  <div className="w-8 h-8 border-2 border-[#B6D8F2] border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Botão Flutuante WhatsApp Alternativo */}
      <a 
        href="https://wa.me/5549988429631?text=Olá!%20Recebi%20a%20minha%20carta%20mágica%20e%20quero%20agendar%20o%20meu%20momento%20de%20cuidado."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-lg active:scale-90 transition-transform flex items-center justify-center"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        
        @media (min-width: 1024px) {
          body { cursor: none; }
          button, a, input { cursor: none; }
        }
      `}</style>
    </div>
  );
};

export default App;
```

## 8. Publicar na Vercel

Agora, basta usar o comando da Vercel para colocar o site online:

### Instalar a CLI da Vercel globalmente (se ainda não tiver):

```bash
npm install -g vercel
```

### Fazer o login e deploy

```bash
vercel
```

Siga as instruções no terminal para completar o processo de deploy. O Vercel irá:

1. Detectar automaticamente que é um projeto React/Vite
2. Instalar as dependências
3. Compilar o projeto
4. Fazer o deploy para um URL único

Após o processo ser concluído, você receberá um URL para acessar o site online.

## Observações importantes

- Certifique-se de que todas as dependências foram instaladas corretamente antes de fazer o deploy
- O plano gratuito da Vercel funciona perfeitamente para este tipo de aplicação estática
- O site inclui funcionalidades como reprodução de áudio do YouTube e efeitos visuais que funcionarão corretamente após o deploy