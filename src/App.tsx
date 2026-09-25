import { useState, useEffect } from 'react';
import { 
  Sparkle, 
  ShieldCheck, 
  Pulse, 
  Heart, 
  Stethoscope, 
  FirstAid, 
  Phone,
  CaretDown,
  Star,
  CheckCircle,
  CaretRight,
  User,
  Tooth,
  Smiley,
  Diamond,
  Crown,
  MagicWand,
  Sun,
  Drop,
  InstagramLogo,
  FacebookLogo,
  MapPin
} from '@phosphor-icons/react';
import { getUnitFromUrl, UNITS_DATA, UnitData } from './data/unitConfig';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function App() {
  const [unit, setUnit] = useState<UnitData>(getUnitFromUrl());
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [scrolled, setScrolled] = useState(false);
  
  // Lead Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [treatment, setTreatment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Footer multi-step Form state
  const [footerName, setFooterName] = useState('');
  const [footerPhone, setFooterPhone] = useState('');
  const [footerTreatment, setFooterTreatment] = useState('Implantes Dentários');
  const [footerFormStep, setFooterFormStep] = useState(1);

  // Sync unit with URL parameters & scroll handler
  useEffect(() => {
    const resolvedUnit = getUnitFromUrl();
    setUnit(resolvedUnit);
    document.title = `ODONTOCOMPANY ${resolvedUnit.name.toUpperCase()} - Agende sua Avaliação`;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icon resolver helper
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tooth':
        return <Tooth className="w-6 h-6 text-brand-emerald" />;
      case 'Smiley':
        return <Smiley className="w-6 h-6 text-brand-emerald" />;
      case 'Diamond':
        return <Diamond className="w-6 h-6 text-brand-emerald" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-brand-emerald" />;
      case 'MagicWand':
        return <MagicWand className="w-6 h-6 text-brand-emerald" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-brand-emerald" />;
      case 'Drop':
        return <Drop className="w-6 h-6 text-brand-emerald" />;
      case 'Sparkles':
        return <Sparkle className="w-6 h-6 text-brand-emerald" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-brand-emerald" />;
      case 'Activity':
        return <Pulse className="w-6 h-6 text-brand-emerald" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-brand-emerald" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-brand-emerald" />;
      case 'FirstAid':
        return <FirstAid className="w-6 h-6 text-brand-emerald" />;
      default:
        return <Stethoscope className="w-6 h-6 text-brand-emerald" />;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const formattedPhone = phone.replace(/\D/g, '');
    const cleanTreatmentName = treatment ? ` de interesse em ${treatment}` : '';
    const text = `Olá, meu nome é ${name}. Gostaria de agendar uma avaliação na ODONTOCOMPANY ${unit.name.toUpperCase()}${cleanTreatmentName}. Meu telefone é (${formattedPhone.substring(0, 2)}) ${formattedPhone.substring(2)}.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${unit.whatsapp}&text=${encodeURIComponent(text)}`;
    
    setFormSubmitted(true);
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setFormSubmitted(false);
      setName('');
      setPhone('');
      setTreatment('');
    }, 1000);
  };

  const handleFooterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (!footerName || !footerPhone) return;

    const formattedPhone = footerPhone.replace(/\D/g, '');
    const text = `Olá, meu nome é ${footerName}. Solicitei uma pré-reserva de avaliação para ${footerTreatment} na unidade ${unit.name}. Meu telefone é (${formattedPhone.substring(0, 2)}) ${formattedPhone.substring(2)}.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${unit.whatsapp}&text=${encodeURIComponent(text)}`;
    
    setFooterFormStep(3);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);
  };

  const faqs = [
    {
      q: "Como funciona a primeira consulta de avaliação?",
      a: "Na primeira consulta, nossos dentistas realizam um diagnóstico completo da sua saúde bucal, avaliando suas necessidades de forma personalizada e apresentando as opções de tratamento com as condições facilitadas da OdontoCompany."
    },
    {
      q: "Quais são as formas de pagamento disponíveis?",
      a: "Buscamos tornar o tratamento odontológico acessível a todos. Por isso, oferecemos diversas formas de pagamento: parcelamento no cartão de crédito, boleto bancário, PIX, e condições especiais facilitadas pela OdontoCompany."
    },
    {
      q: "A OdontoCompany atende convênios odontológicos?",
      a: `Nossos tratamentos são particulares com valores acessíveis e condições facilitadas. Na unidade ${unit.name}, consulte nossa recepção pelo WhatsApp para saber sobre parcerias locais e condições para empresas.`
    },
    {
      q: `Onde fica a clínica em ${unit.name} e como agendar?`,
      a: `Nossa clínica está localizada na ${unit.address.street}, nº ${unit.address.number}, no bairro ${unit.address.neighborhood} em ${unit.address.city}/${unit.address.state} (CEP ${unit.address.zipCode}). Você pode agendar seu horário clicando diretamente em qualquer botão de WhatsApp nesta página.`
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-base font-sans antialiased text-neutral-dark selection:bg-brand-lime selection:text-brand-green-dark">

      {/* Navigation Header */}
      <div className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 ${scrolled ? 'top-2' : 'top-6'}`}>
        <header className={`w-full transition-all duration-500 rounded-2xl md:rounded-full border border-white/20 shadow-lg transform ${
          scrolled 
            ? 'max-w-5xl bg-white/85 backdrop-blur-lg py-1 px-3 border-slate-200/50 shadow-md scale-95' 
            : 'max-w-7xl bg-white/95 backdrop-blur-md py-2.5 px-6 border-slate-100 scale-100'
        }`}>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <img 
                src="/images/logo.webp" 
                alt="OdontoCompany Logo" 
                width="160"
                height="36"
                className={`transition-all duration-500 ${scrolled ? 'h-7' : 'h-9'} w-auto`}
              />
              <span className="ml-3 pl-3 border-l border-slate-300 text-[11px] sm:text-xs font-bold text-brand-odc uppercase tracking-wider block">
                {unit.name}
              </span>
            </div>

            <nav className="hidden md:flex space-x-6 text-xs font-bold text-brand-odc">
              <a href="#tratamentos" className="hover:text-brand-green-primary transition-colors">Tratamentos</a>
              <a href="#video" className="hover:text-brand-green-primary transition-colors">Vídeo</a>
              <a href="#estrutura" className="hover:text-brand-green-primary transition-colors">Estrutura</a>
              <a href="#profissionais" className="hover:text-brand-green-primary transition-colors">Dentistas</a>
              <a href="#depoimentos" className="hover:text-brand-green-primary transition-colors">Depoimentos</a>
              <a href="#faq" className="hover:text-brand-green-primary transition-colors">Dúvidas</a>
              <a href="#localizacao" className="hover:text-brand-green-primary transition-colors">Contato</a>
            </nav>

            <div>
              <a 
                href={`https://api.whatsapp.com/send?phone=${unit.whatsapp}&text=${encodeURIComponent(unit.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-full bg-brand-emerald hover:bg-emerald-600 text-white font-bold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 ${
                  scrolled ? 'px-3.5 py-1.5 text-[11px]' : 'px-5 py-2.5 text-xs'
                }`}
              >
                <WhatsAppIcon className={`shrink-0 ${scrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
                <span className="whitespace-nowrap">Agendar Avaliação</span>
              </a>
            </div>
          </div>

          {/* Mobile navigation row */}
          <nav className="flex md:hidden overflow-x-auto whitespace-nowrap scrollbar-none py-2 mt-2 border-t border-slate-100/60 gap-5 text-[10px] font-bold text-brand-odc">
            <a href="#tratamentos" className="hover:text-brand-green-primary transition-colors">Tratamentos</a>
            <a href="#video" className="hover:text-brand-green-primary transition-colors">Vídeo</a>
            <a href="#estrutura" className="hover:text-brand-green-primary transition-colors">Estrutura</a>
            <a href="#profissionais" className="hover:text-brand-green-primary transition-colors">Dentistas</a>
            <a href="#depoimentos" className="hover:text-brand-green-primary transition-colors">Depoimentos</a>
            <a href="#faq" className="hover:text-brand-green-primary transition-colors">Dúvidas</a>
            <a href="#localizacao" className="hover:text-brand-green-primary transition-colors">Contato</a>
          </nav>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[95dvh] flex flex-col justify-between pt-28 overflow-hidden bg-brand-green-primary">
          {/* Background image */}
          <div className="absolute inset-x-0 top-0 h-[60vh] md:h-full z-0 overflow-hidden">
            <img 
              src="/images/hero-bg.webp" 
              alt={`OdontoCompany ${unit.name}`} 
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-right opacity-95 select-none pointer-events-none" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-green-primary/40 to-brand-green-primary md:hidden"></div>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-green-primary/20 via-brand-green-primary/10 via-40% to-transparent pointer-events-none z-10 md:bg-gradient-to-r md:from-brand-green-primary/90 md:via-brand-green-primary/70 md:via-35% md:to-transparent md:to-65%"></div>

          <div className="max-w-7xl mx-auto px-5 w-full relative z-20 my-auto py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Heading and Form */}
              <div className="lg:col-span-7 space-y-6 text-left max-w-2xl">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-brand-lime text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  Unidade {unit.name}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Sorria de verdade com a <span className="uppercase">OdontoCompany <span className="text-brand-lime">{unit.name}</span></span>
                </h1>
                
                <p className="text-base md:text-lg text-slate-200/90 leading-relaxed max-w-[55ch]">
                  Tratamentos odontológicos modernos e completos com parcelas que cabem perfeitamente no seu bolso. Agende sua avaliação hoje mesmo!
                </p>

                {/* Hero Form */}
                <div className="mt-8 bg-brand-green-primary/40 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-2xl relative overflow-hidden max-w-lg transition-all duration-300 hover:scale-[1.01] hover:border-white/25 hover:bg-brand-green-primary/50">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#39b54a]"></div>
                  
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-white">Agende sua avaliação gratuita</h3>
                    <p className="text-xs text-slate-300 mt-1">Preencha o formulário e fale no WhatsApp da nossa Unidade</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="form-name" className="text-xs font-semibold text-slate-200 block">Nome Completo</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          id="form-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Seu nome"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#39b54a] focus:border-transparent text-sm bg-white/5 text-white placeholder-slate-400 focus:bg-white/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="form-phone" className="text-xs font-semibold text-slate-200 block">WhatsApp com DDD</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          id="form-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ex: 11999999999"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#39b54a] focus:border-transparent text-sm bg-white/5 text-white placeholder-slate-400 focus:bg-white/10 transition-all"
                        />
                      </div>
                      <span className="text-[10px] text-slate-300/80 block">Digite DDD + número.</span>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="form-treatment" className="text-xs font-semibold text-slate-200 block">Tratamento de interesse (Opcional)</label>
                      <div className="relative">
                        <select
                          id="form-treatment"
                          value={treatment}
                          onChange={(e) => setTreatment(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#39b54a] focus:border-transparent text-sm bg-brand-green-deep text-white focus:bg-brand-green-primary transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="text-slate-900 bg-white">Selecione um procedimento...</option>
                          {unit.treatments.map((t) => (
                            <option key={t.id} value={t.title} className="text-slate-900 bg-white">{t.title}</option>
                          ))}
                        </select>
                        <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-300 pointer-events-none">
                          <CaretDown className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitted}
                      className="w-full py-4 px-6 rounded-xl bg-[#39b54a] hover:bg-[#2fa33e] text-white font-extrabold text-base shadow-md shadow-[#39b54a]/20 transition-all active:scale-[0.98] disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer mt-6"
                    >
                      {formSubmitted ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                          <span>Redirecionando ao WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <span>Iniciar Agendamento</span>
                          <CaretRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <p className="text-[10px] text-slate-300/70">
                      🔒 Seus dados estão seguros e protegidos em conformidade com a LGPD.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Benefits */}
              <div className="lg:col-span-5 flex flex-col justify-end gap-3.5 self-stretch lg:pb-2 pt-8 lg:pt-0">
                <div className="bg-brand-green-primary/30 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 flex items-center gap-3.5 hover:bg-brand-green-primary/45 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-full lg:w-[460px] lg:ml-auto shrink-0">
                  <CheckCircle className="w-5.5 h-5.5 text-brand-lime shrink-0" />
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Todas as especialidades odontológicas</span>
                </div>
                <div className="bg-brand-green-primary/30 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 flex items-center gap-3.5 hover:bg-brand-green-primary/45 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-full lg:w-[460px] lg:ml-auto shrink-0">
                  <CheckCircle className="w-5.5 h-5.5 text-brand-lime shrink-0" />
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Equipamentos de alta tecnologia</span>
                </div>
                <div className="bg-brand-green-primary/30 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 flex items-center gap-3.5 hover:bg-brand-green-primary/45 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-full lg:w-[460px] lg:ml-auto shrink-0">
                  <CheckCircle className="w-5.5 h-5.5 text-brand-lime shrink-0" />
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Atendimento humanizado e acolhedor</span>
                </div>
                <div className="bg-brand-green-primary/30 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 flex items-center gap-3.5 hover:bg-brand-green-primary/45 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-full lg:w-[460px] lg:ml-auto shrink-0">
                  <CheckCircle className="w-5.5 h-5.5 text-brand-lime shrink-0" />
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Condições e parcelamento facilitados</span>
                </div>
              </div>
            </div>
          </div>

          {/* HERO TRUST MARQUEE FOOTER */}
          <div className="w-full relative z-10 bg-brand-green-dark/60 backdrop-blur-md border-t border-white/10 py-3.5 mt-auto overflow-hidden">
            <div className="relative w-full overflow-hidden flex">
              <div className="animate-marquee flex gap-16 items-center whitespace-nowrap text-white/90 pr-16">
                <span className="text-xs md:text-sm font-bold tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-brand-lime" /> CFO - REGULAMENTADO
                </span>
                <span className="text-xs md:text-sm font-bold tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-brand-lime" /> SELO EXCELÊNCIA ABF
                </span>
                <span className="text-xs md:text-sm font-bold tracking-wider flex items-center gap-2">
                  <Star weight="fill" className="w-4.5 h-4.5 text-yellow-400" /> AVALIAÇÃO GOOGLE 4.9/5
                </span>
                <span className="text-xs md:text-sm font-bold tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-brand-lime" /> +25 MILHÕES DE SORRISOS
                </span>

                {/* Seamless loop repeat */}
                <span className="text-xs md:text-sm font-bold tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-brand-lime" /> CFO - REGULAMENTADO
                </span>
                <span className="text-xs md:text-sm font-bold tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-brand-lime" /> SELO EXCELÊNCIA ABF
                </span>
                <span className="text-xs md:text-sm font-bold tracking-wider flex items-center gap-2">
                  <Star weight="fill" className="w-4.5 h-4.5 text-yellow-400" /> AVALIAÇÃO GOOGLE 4.9/5
                </span>
                <span className="text-xs md:text-sm font-bold tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-brand-lime" /> +25 MILHÕES DE SORRISOS
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TREATMENTS SECTION */}
        <section id="tratamentos" className="py-20 bg-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-3xl mx-auto space-y-4 mb-16 flex flex-col items-center text-center">
              <div className="flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-green-primary tracking-tight">
                  Especialidades Odontológicas
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <span className="h-[2px] w-16 bg-gradient-to-r from-transparent to-brand-green-primary rounded-full"></span>
                  <span className="h-2.5 w-2.5 rotate-45 bg-brand-green-primary"></span>
                  <span className="h-[2px] w-16 bg-gradient-to-l from-transparent to-brand-green-primary rounded-full"></span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-brand-emerald">
                Tratamentos completos para você e sua família
              </h3>

              <p className="text-brand-emerald text-lg md:text-xl max-w-2xl mx-auto text-center font-medium">
                Dispomos de profissionais qualificados em todas as áreas da odontologia moderna para atender a qualquer necessidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {unit.treatments.map((t) => (
                <div 
                  key={t.id}
                  className="bg-white rounded-2xl border border-neutral-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left flex flex-col overflow-hidden"
                >
                  {t.imageUrl ? (
                    <div className="w-full h-48 bg-slate-100 overflow-hidden relative">
                      <img 
                        src={t.imageUrl} 
                        alt={t.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    </div>
                  ) : (
                    <div className="p-6 pb-0">
                      <div className="w-12 h-12 rounded-xl bg-brand-green-light flex items-center justify-center">
                        {renderIcon(t.iconName)}
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-brand-emerald">{t.title}</h3>
                      <p className="text-sm text-brand-emerald leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                    <div className="pt-6 mt-auto">
                      <a 
                        href={`https://api.whatsapp.com/send?phone=${unit.whatsapp}&text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o tratamento de ${t.title} na unidade OdontoCompany ${unit.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-emerald hover:text-emerald-700 transition-colors uppercase tracking-wider"
                      >
                        <span>Saber mais</span>
                        <CaretRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-12 flex justify-center relative z-10">
              <a 
                href={`https://api.whatsapp.com/send?phone=${unit.whatsapp}&text=${encodeURIComponent(`Olá! Gostaria de tirar dúvidas sobre tratamentos na OdontoCompany ${unit.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-emerald hover:bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="w-6 h-6 shrink-0" />
                <span>Consultar outros procedimentos</span>
              </a>
            </div>
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section id="video" className="py-20 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-3xl mx-auto space-y-4 mb-12 flex flex-col items-center text-center">
              <div className="flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-green-primary tracking-tight">
                  A marca que você conhece e confia na TV aberta
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <span className="h-[2px] w-16 bg-gradient-to-r from-transparent to-brand-green-primary rounded-full"></span>
                  <span className="h-2.5 w-2.5 rotate-45 bg-brand-green-primary"></span>
                  <span className="h-[2px] w-16 bg-gradient-to-l from-transparent to-brand-green-primary rounded-full"></span>
                </div>
              </div>
              <p className="text-brand-emerald text-lg md:text-xl max-w-3xl">
                Com presença diária nos maiores canais do país, trazemos a segurança e a credibilidade da maior rede de clínicas odontológicas do mundo diretamente para cuidar do seu sorriso.
              </p>
            </div>

            {/* Video Player */}
            <div className="max-w-4xl mx-auto px-4">
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-border bg-slate-900">
                <iframe 
                  src="https://www.youtube.com/embed/hLGCSvZ6bBQ" 
                  title="Campanha Nacional OdontoCompany" 
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-xs text-neutral-muted mt-4 italic font-medium">
                Campanha de Destaque Nacional OdontoCompany
              </p>
            </div>
          </div>
        </section>

        {/* CLINIC STRUCTURE GALLERY */}
        <section id="estrutura" className="py-20 bg-brand-odc relative overflow-hidden">
          {/* Decorative subtle ambient backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-3xl mx-auto space-y-4 mb-12 flex flex-col items-center text-center">
              <div className="flex flex-col items-center">
                <span className="text-brand-lime font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">Conheça Nossa Unidade</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                  Estrutura moderna planejada para o seu bem-estar
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <span className="h-[2px] w-16 bg-gradient-to-r from-transparent to-white rounded-full"></span>
                  <span className="h-2.5 w-2.5 rotate-45 bg-white"></span>
                  <span className="h-[2px] w-16 bg-gradient-to-l from-transparent to-white rounded-full"></span>
                </div>
              </div>
              <p className="text-white/90 text-base md:text-lg max-w-2xl font-light">
                Ambientes climatizados, salas esterilizadas e equipamentos de ponta para garantir a segurança e o conforto do seu atendimento em <strong className="font-semibold text-white">{unit.name}</strong>.
              </p>
            </div>

            {/* Visual Showcase Card with Ambient Blur Fill (Zero Crop, Zero Empty Borders) */}
            <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 backdrop-blur-md relative group">
              <div className="relative w-full flex items-center justify-center bg-black/20 overflow-hidden min-h-[320px] sm:min-h-[420px] md:min-h-[480px]">
                {/* Ambient blurred backdrop that naturally matches the photo */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none"
                  style={{ backgroundImage: `url(${unit.images.facade})` }}
                ></div>
                
                {/* Main crisp uncropped image */}
                <img 
                  src={unit.images.facade} 
                  alt={`Fachada Clínica OdontoCompany ${unit.name}`}
                  loading="lazy"
                  decoding="async"
                  className="relative z-10 w-auto max-w-full max-h-[520px] md:max-h-[580px] object-contain rounded-2xl transition-transform duration-700 group-hover:scale-[1.01] p-1 sm:p-2" 
                />
              </div>
              
              {/* Bottom Address & CTA Bar */}
              <div className="bg-brand-green-dark/95 border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-green-primary/30 border border-brand-lime/40 flex items-center justify-center text-brand-lime shrink-0">
                    <MapPin className="w-5 h-5" weight="fill" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wider font-semibold">Localização da Unidade</p>
                    <p className="text-sm sm:text-base font-bold text-white">{unit.address.street}, {unit.address.number} - {unit.address.neighborhood}</p>
                  </div>
                </div>
                
                <a 
                  href={`https://wa.me/${unit.whatsapp}?text=${encodeURIComponent(unit.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-lime text-brand-green-dark font-extrabold rounded-xl text-sm shadow-md hover:bg-white transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Visitar Unidade</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DENTISTS SECTION */}
        <section id="profissionais" className="py-20 bg-neutral-base">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4 mb-16 flex flex-col items-center text-center">
              <div className="flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-green-primary tracking-tight">
                  Responsável Técnica
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <span className="h-[2px] w-16 bg-gradient-to-r from-transparent to-brand-green-primary rounded-full"></span>
                  <span className="h-2.5 w-2.5 rotate-45 bg-brand-green-primary"></span>
                  <span className="h-[2px] w-16 bg-gradient-to-l from-transparent to-brand-green-primary rounded-full"></span>
                </div>
              </div>
              <p className="text-brand-emerald text-lg md:text-xl">
                Conheça a profissional responsável por cuidar da saúde e excelência no atendimento na unidade {unit.name}.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {unit.dentists.map((dentist, i) => (
                <div 
                  key={i}
                  className="bg-white rounded-3xl overflow-hidden border border-neutral-border shadow-lg max-w-sm w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left"
                >
                  <div className="h-80 overflow-hidden relative bg-slate-100">
                    <img 
                      src={dentist.photoUrl} 
                      alt={dentist.name} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-7 space-y-2.5">
                    <h3 className="text-xl font-bold text-brand-odc">{dentist.name}</h3>
                    <p className="text-xs font-bold text-brand-green-primary uppercase tracking-wider">{dentist.specialty}</p>
                    <p className="text-xs text-brand-emerald font-medium">{dentist.cro}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="depoimentos" className="py-20 bg-neutral-base">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4 mb-16 flex flex-col items-center text-center">
              <div className="flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-green-primary tracking-tight">
                  O que dizem nossos pacientes
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <span className="h-[2px] w-16 bg-gradient-to-r from-transparent to-brand-green-primary rounded-full"></span>
                  <span className="h-2.5 w-2.5 rotate-45 bg-brand-green-primary"></span>
                  <span className="h-[2px] w-16 bg-gradient-to-l from-transparent to-brand-green-primary rounded-full"></span>
                </div>
              </div>
              <p className="text-brand-emerald text-lg md:text-xl">
                A satisfação de quem confiou o sorriso à <strong className="uppercase font-extrabold">OdontoCompany {unit.name}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {unit.testimonials.map((t, i) => (
                <div 
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-neutral-border text-left flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex text-yellow-500">
                      {[...Array(t.rating)].map((_, index) => (
                        <Star key={index} weight="fill" className="w-4.5 h-4.5" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      "{t.text}"
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-brand-green-deep">{t.name}</h4>
                      <p className="text-[11px] text-neutral-muted">Paciente da Unidade</p>
                    </div>
                    <span className="text-[11px] font-semibold bg-brand-green-light text-brand-green-primary px-2.5 py-0.5 rounded-full">
                      {t.treatment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-4 mb-16 flex flex-col items-center text-center">
              <div className="flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-green-primary tracking-tight">
                  Dúvidas Frequentes
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <span className="h-[2px] w-16 bg-gradient-to-r from-transparent to-brand-green-primary rounded-full"></span>
                  <span className="h-2.5 w-2.5 rotate-45 bg-brand-green-primary"></span>
                  <span className="h-[2px] w-16 bg-gradient-to-l from-transparent to-brand-green-primary rounded-full"></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left items-start">
              {/* Left Column */}
              <div className="space-y-4">
                {faqs.slice(0, 2).map((faq, i) => {
                  const actualIndex = i;
                  const isOpen = openFaqs.includes(actualIndex);
                  return (
                    <div 
                      key={actualIndex}
                      className="bg-slate-50 border border-neutral-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaqs(prev => isOpen ? prev.filter(x => x !== actualIndex) : [...prev, actualIndex])}
                        className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-slate-100/50 transition-colors font-bold text-brand-odc text-sm md:text-base cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <CaretDown className={`w-5 h-5 text-brand-emerald transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4 bg-white">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {faqs.slice(2, 4).map((faq, i) => {
                  const actualIndex = i + 2;
                  const isOpen = openFaqs.includes(actualIndex);
                  return (
                    <div 
                      key={actualIndex}
                      className="bg-slate-50 border border-neutral-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaqs(prev => isOpen ? prev.filter(x => x !== actualIndex) : [...prev, actualIndex])}
                        className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-slate-100/50 transition-colors font-bold text-brand-odc text-sm md:text-base cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <CaretDown className={`w-5 h-5 text-brand-emerald transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4 bg-white">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* COMBINED BOOKING SECTION & FOOTER */}
        <div className="relative bg-slate-950 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/footer-bg.webp" 
              alt={`OdontoCompany ${unit.name}`} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-60 select-none pointer-events-none" 
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-green-dark/25 via-brand-green-dark/45 to-brand-green-dark/90"></div>
          </div>

          {/* Booking Form */}
          <section id="localizacao" className="relative py-20 z-10 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column */}
                <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left text-white space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                      Pronto para transformar o seu sorriso?
                    </h2>
                    <p className="text-slate-200 text-base md:text-lg font-medium leading-relaxed max-w-[55ch]">
                      Use o formulário ao lado para solicitar sua avaliação gratuita na OdontoCompany {unit.name}. Escolha o procedimento desejado e preencha seus dados para garantirmos o melhor horário para você.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-left w-full max-w-md">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-brand-lime shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-white">Endereço da Unidade:</p>
                        <p className="text-xs text-slate-300">{unit.address.street}, {unit.address.number} - {unit.address.neighborhood}</p>
                        <p className="text-xs text-slate-300">{unit.address.city} - {unit.address.state}, CEP {unit.address.zipCode}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                      <Phone className="w-5 h-5 text-brand-lime shrink-0" />
                      <p className="text-xs text-slate-300 font-mono">{unit.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Multi-step Form */}
                <div className="lg:col-span-6 bg-slate-950/60 border border-white/15 backdrop-blur-md rounded-3xl p-8 text-white flex flex-col justify-between shadow-2xl min-h-[480px]">
                  
                  <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
                    <span className="text-[10px] font-black tracking-wider text-brand-lime uppercase bg-brand-green-primary/50 px-3 py-1 rounded-full border border-brand-lime/20">
                      {footerFormStep === 3 ? 'Concluído' : `Passo ${footerFormStep} de 2`}
                    </span>
                    <span className="text-xs text-slate-400">Pré-Agendamento Online</span>
                  </div>

                  {footerFormStep === 1 && (
                    <div className="flex-1 flex flex-col justify-between min-h-[380px]">
                      <div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-2">
                          Qual é o seu objetivo?
                        </h3>
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                          Selecione o procedimento que deseja realizar para direcionarmos você ao especialista correto.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                          {unit.treatments.map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setFooterTreatment(t.title)}
                              className={`px-4 py-3.5 rounded-xl border text-xs font-bold text-center transition-all duration-200 cursor-pointer ${
                                footerTreatment === t.title
                                  ? 'bg-brand-emerald border-transparent text-white shadow-lg scale-[1.03]'
                                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                              }`}
                            >
                              {t.title}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.currentTarget.blur();
                            setFooterFormStep(2);
                          }}
                          className="px-6 py-3.5 bg-brand-emerald hover:bg-emerald-600 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 text-white cursor-pointer"
                        >
                          Próximo <CaretRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {footerFormStep === 2 && (
                    <div className="flex-1 flex flex-col justify-between min-h-[380px]">
                      <form onSubmit={handleFooterFormSubmit} className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-2">
                            Para quem confirmamos a avaliação?
                          </h3>
                          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
                            Informe seu nome e WhatsApp para nossa equipe entrar em contato e confirmar sua avaliação.
                          </p>

                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-300 block">Nome Completo</label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                                  <User className="w-4 h-4" />
                                </span>
                                <input
                                  type="text"
                                  required
                                  placeholder="Seu nome completo"
                                  value={footerName}
                                  onChange={(e) => setFooterName(e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#39b54a] focus:border-transparent text-sm bg-white/5 text-white placeholder-slate-400 focus:bg-white/10 transition-all"
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-300 block">WhatsApp com DDD</label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                                  <Phone className="w-4 h-4" />
                                </span>
                                <input
                                  type="tel"
                                  required
                                  placeholder="(11) 99999-9999"
                                  value={footerPhone}
                                  onChange={(e) => setFooterPhone(e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#39b54a] focus:border-transparent text-sm bg-white/5 text-white placeholder-slate-400 focus:bg-white/10 transition-all"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 flex justify-between gap-4 pt-4 border-t border-white/5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.currentTarget.blur();
                              setFooterFormStep(1);
                            }}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 font-bold rounded-xl text-xs uppercase tracking-wider text-slate-300 transition-all cursor-pointer"
                          >
                            Voltar
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-3.5 bg-brand-emerald hover:bg-emerald-600 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 text-white cursor-pointer"
                          >
                            Finalizar <CheckCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {footerFormStep === 3 && (
                    <div className="flex-grow flex flex-col justify-center items-center text-center py-6 min-h-[380px]">
                      <div className="w-16 h-16 rounded-full bg-brand-emerald/20 flex items-center justify-center mb-6 border border-brand-emerald/30 animate-bounce">
                        <Sparkle className="w-8 h-8 text-brand-lime" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-3">
                        Solicitação Enviada!
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-6">
                        Sua pré-reserva para <strong>{footerTreatment}</strong> na unidade <strong>{unit.name}</strong> foi registrada. Clique no botão abaixo para confirmar seu horário direto no WhatsApp da recepção.
                      </p>

                      <div className="w-full max-w-sm space-y-3">
                        <a
                          href={`https://api.whatsapp.com/send?phone=${unit.whatsapp}&text=${encodeURIComponent(`Olá! Meu nome é ${footerName}. Solicitei um agendamento para ${footerTreatment} na unidade OdontoCompany ${unit.name} e gostaria de confirmar meu horário.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-brand-emerald hover:bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-lg transition-all hover:scale-105 active:scale-95"
                        >
                          <WhatsAppIcon className="w-6 h-6 shrink-0" />
                          <span>Chamar no WhatsApp</span>
                        </a>
                        
                        <button
                          type="button"
                          onClick={() => {
                            setFooterFormStep(1);
                            setFooterName('');
                            setFooterPhone('');
                          }}
                          className="text-xs text-slate-400 hover:text-white transition-colors underline cursor-pointer"
                        >
                          Fazer outro agendamento
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Footer (Rodapé) */}
          <footer className="relative py-16 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 border-b border-white/10 pb-8">
                
                <div className="space-y-4 text-center md:text-left w-full md:w-auto">
                  <a 
                    href="https://www.op7franchising.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <img 
                      src="/images/logo-footer.svg" 
                      alt="OP7 Franchising Logo" 
                      width="180"
                      height="80"
                      loading="lazy"
                      decoding="async"
                      className="h-[80px] w-auto object-contain opacity-95 mx-auto md:mx-0" 
                    />
                  </a>
                  <div className="flex justify-center md:justify-start gap-4 pt-2">
                    <a 
                      href={unit.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white/70 hover:text-brand-lime transition-colors" 
                      aria-label={`Instagram OdontoCompany ${unit.name}`}
                    >
                      <InstagramLogo className="w-6 h-6" />
                    </a>
                    <a 
                      href={unit.facebookUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white/70 hover:text-brand-lime transition-colors" 
                      aria-label={`Facebook OdontoCompany ${unit.name}`}
                    >
                      <FacebookLogo className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-right">
                  <div className="text-[11px] uppercase tracking-wider text-white/80 space-y-1 font-medium text-center md:text-right">
                    <p className="font-bold text-white text-xs">OdontoCompany {unit.name}</p>
                    <p>{unit.address.street}, {unit.address.number} - {unit.address.neighborhood}</p>
                    <p>{unit.address.city} - {unit.address.state}, CEP {unit.address.zipCode}</p>
                    <p className="text-brand-lime font-semibold pt-1">
                      RT: {unit.clinicalDirector.name} | {unit.clinicalDirector.cro}
                    </p>
                    <p className="text-white/60">
                      {unit.croCl}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/50">
                <p>© {new Date().getFullYear()} OdontoCompany {unit.name}. Todos os direitos reservados.</p>
                <div className="flex gap-4">
                  <a href="#tratamentos" className="hover:text-brand-lime transition-colors">Tratamentos</a>
                  <span>·</span>
                  <a href="#estrutura" className="hover:text-brand-lime transition-colors">Estrutura</a>
                  <span>·</span>
                  <a href="#profissionais" className="hover:text-brand-lime transition-colors">Dentistas</a>
                </div>
              </div>
            </div>
          </footer>
        </div>

      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://api.whatsapp.com/send?phone=${unit.whatsapp}&text=${encodeURIComponent(unit.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#22c35e] transition-all hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-green-300/40"
        aria-label="Fale conosco no WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"></span>
        <WhatsAppIcon className="w-8 h-8 relative z-10" />
      </a>

    </div>
  );
}
