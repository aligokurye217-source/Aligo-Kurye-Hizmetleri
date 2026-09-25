import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bike,
  CarFront,
  Check,
  ChevronDown,
  CircleCheckBig,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Route,
  Send,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route as WouterRoute, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const whatsappBase = 'https://wa.me/905466907632';
const instagramUrl = 'https://www.instagram.com/aligokurye217/';

function whatsappUrl(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message: string) {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}

function Logo() {
  return (
    <a className="brand" href="#anasayfa" aria-label="ALIGO ana sayfa" data-testid="link-logo">
      <span className="brand-mark"><ArrowUpRight size={19} strokeWidth={2.6} /></span>
      <span className="brand-name">ALIGO</span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="section-wrap topbar-inner">
          <span className="topbar-note"><Clock3 size={13} /> İstanbul içi hızlı teslimat, gün boyu iletişim</span>
          <div className="topbar-contact">
            <span>Her gün açık</span>
            <span>+90 546 690 76 32</span>
          </div>
        </div>
      </div>
      <div className="section-wrap main-nav">
        <Logo />
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Ana menü">
          <a className="nav-link" href="#hizmetler" onClick={closeMenu} data-testid="link-services">Hizmetler</a>
          <a className="nav-link" href="#nasil-calisir" onClick={closeMenu} data-testid="link-process">Nasıl Çalışır?</a>
          <a className="nav-link" href="#bolge" onClick={closeMenu} data-testid="link-area">Hizmet Bölgesi</a>
          <a className="nav-link" href="#sss" onClick={closeMenu} data-testid="link-faq">SSS</a>
          <a
            className="nav-cta"
            href={whatsappUrl('Merhaba ALIGO, İstanbul içi kurye hizmeti hakkında bilgi almak istiyorum.')}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            data-testid="link-nav-whatsapp"
          >
            <MessageCircle size={15} /> WhatsApp&apos;tan Ulaş
          </a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <>
      <section className="hero" id="anasayfa">
        <div className="hero-image" aria-hidden="true" />
        <div className="section-wrap hero-inner">
          <div className="hero-copy reveal is-visible">
            <span className="eyebrow">İstanbul içi kurye operasyonu</span>
            <h1>İstanbul İçi Hızlı ve Güvenilir Kurye</h1>
            <p className="hero-lede">Belgelerinizi, paketlerinizi ve gönderilerinizi İstanbul&apos;un her noktasına hızlı ve güvenli şekilde ulaştırıyoruz.</p>
            <div className="hero-actions">
              <button className="button-primary" onClick={() => openWhatsApp('Merhaba ALIGO, kurye çağırmak istiyorum. Gönderi detaylarımı paylaşabilir miyim?')} data-testid="button-hero-order">
                Kurye Çağır <ArrowRight size={16} />
              </button>
              <a className="button-secondary" href={whatsappUrl('Merhaba ALIGO, İstanbul içi gönderim için bilgi almak istiyorum.')} target="_blank" rel="noreferrer" data-testid="link-hero-whatsapp">
                <MessageCircle size={16} /> WhatsApp&apos;tan Ulaş
              </a>
            </div>
            <div className="hero-foot">
              <span><MapPin size={15} /> Sadece İstanbul</span>
              <span><BadgeCheck size={15} /> Nakit veya Kart</span>
            </div>
          </div>
        </div>
        <span className="hero-scroll">Aşağı kaydır</span>
      </section>
      <div className="ticker">
        <div className="section-wrap ticker-inner">
          <span className="ticker-item"><span className="ticker-dot" /> Hızlı teslimat</span>
          <span className="ticker-item"><span className="ticker-dot" /> Güvenli taşıma</span>
          <span className="ticker-item"><span className="ticker-dot" /> İstanbul&apos;un her noktasına</span>
        </div>
      </div>
    </>
  );
}

type Service = {
  label: string;
  title: string;
  description: string;
  note: string;
  icon: ReactNode;
  image?: string;
  imageAlt?: string;
  className: string;
};

const services: Service[] = [
  {
    label: '01 / ACİL GÖNDERİLER',
    title: 'MOTOR',
    description: 'Acil küçük paketler, evraklar ve gün içinde yetişmesi gereken gönderiler için çevik çözüm.',
    note: 'Küçük paketler için',
    icon: <Bike size={22} />,
    image: '/motor-scooter.png',
    imageAlt: 'Motor kurye hizmeti için beyaz scooter',
    className: 'featured',
  },
  {
    label: '02 / ORTA HACİM',
    title: 'ORTA ARAÇ',
    description: 'Orta ve büyük boyutlu teslimatlar için Fiat Doblo veya eşdeğeri araç seçeneği.',
    note: 'Orta ve büyük teslimatlar',
    icon: <CarFront size={22} />,
    image: '/orta-arac.png',
    imageAlt: 'Orta Araç teslimatları için kompakt kapalı kasa araç',
    className: 'light',
  },
  {
    label: '03 / YÜKSEK HACİM',
    title: 'BÜYÜK ARAÇ',
    description: 'Hacimli, çok parçalı veya özel dikkat isteyen gönderileriniz için geniş kapasite.',
    note: 'Hacimli gönderiler için',
    icon: <Truck size={22} />,
    image: '/buyuk-arac.png',
    imageAlt: 'Büyük hacimli gönderiler için geniş van',
    className: '',
  },
  {
    label: '04 / ÖNCELİKLİ TESLİMAT',
    title: 'VIP Kurye',
    description: 'Acil gönderiler için öncelikli kurye hizmeti. Ortalama teslimat süresi 60-90 dakikadır.',
    note: 'Ortalama 60-90 dakika',
    icon: <Bike size={22} />,
    image: '/vip-kurye.png',
    imageAlt: 'Öncelikli VIP teslimat için motosikletli kurye',
    className: 'vip',
  },
];

function Services() {
  return (
    <section className="light-section section-pad" id="hizmetler">
      <div className="section-wrap">
        <div className="section-heading reveal">
          <div>
            <div className="section-kicker">Doğru araç, doğru teslimat</div>
            <h2>Gönderinize uygun<br />hareket planı.</h2>
          </div>
          <p>İhtiyacınızı WhatsApp&apos;tan anlatın; gönderinizin boyutuna, aciliyetine ve rotasına en uygun aracı biz belirleyelim.</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className={`service-card ${service.className} reveal reveal-delay-${index + 1}`} key={service.title} data-testid={`card-service-${index}`}>
              <div className="service-card-head">
                <div>
                  <span className="service-label">{service.label}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <span className="service-icon">
                  {service.image
                    ? <img src={service.image} alt={service.imageAlt ?? ''} loading="lazy" decoding="async" />
                    : service.icon}
                </span>
              </div>
              <div className="service-card-foot">
                <span className="service-note">{service.note}</span>
                <button
                  className="service-arrow"
                  aria-label={`Kurye Çağır — ${service.title} için WhatsApp'tan bilgi al`}
                  onClick={() => openWhatsApp(service.title === 'VIP Kurye'
                    ? 'Merhaba ALIGO, VIP Kurye hizmetinden yararlanmak istiyorum. Gönderi detaylarını paylaşabilir miyim?'
                    : `Merhaba ALIGO, ${service.title} seçeneği için kurye hizmeti almak istiyorum. Gönderi detaylarımı paylaşabilir miyim?`)}
                  data-testid={`button-service-${index}`}
                >
                  <ArrowUpRight size={17} />
                  <span className="sr-only">Kurye Çağır</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const shipmentGroups = [
  {
    title: 'Taşıdığımız Gönderiler',
    className: 'accepted',
    items: [
      'Evrak ve belgeler',
      'Özel hediyeler',
      'Eczane ürünleri',
      'Elektronik ürünler',
      'Kişisel eşyalar',
    ],
  },
  {
    title: 'Taşımadığımız Gönderiler',
    className: 'prohibited',
    items: [
      'Alkol',
      'Sigara ve tütün ürünleri',
      'Uyuşturucu maddeler',
      'Silah ve mühimmat',
      'Tehlikeli kimyasallar',
    ],
  },
];

function ShipmentPolicy() {
  return (
    <section id="shipment-policy" className="shipment-section light-section section-pad" aria-label="Taşıma kapsamı">
      <div className="section-wrap shipment-grid">
        {shipmentGroups.map((group, groupIndex) => (
          <article
            className={`shipment-card ${group.className} reveal reveal-delay-${groupIndex + 1}`}
            key={group.title}
          >
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>
                  <span className="shipment-icon" aria-hidden="true">
                    {group.className === 'accepted' ? <Check size={15} strokeWidth={2.5} /> : <X size={15} strokeWidth={2.5} />}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

const trustItems = [
  { text: 'Hızlı Teslimat', icon: <Clock3 size={18} /> },
  { text: 'Güvenli Taşıma', icon: <ShieldCheck size={18} /> },
  { text: 'İstanbul İçi Hizmet', icon: <MapPin size={18} /> },
  { text: 'Profesyonel Kurye', icon: <BadgeCheck size={18} /> },
  { text: '7/24 İletişim', icon: <Phone size={18} /> },
  { text: 'Kolay WhatsApp Siparişi', icon: <MessageCircle size={18} /> },
];

function TrustBand() {
  return (
    <section className="trust-band" aria-label="ALIGO güvenceleri">
      <div className="section-wrap trust-grid">
        {trustItems.map((item) => <div className="trust-item" key={item.text}>{item.icon}<span>{item.text}</span></div>)}
      </div>
    </section>
  );
}

const processSteps = [
  { title: 'Bize Ulaşın', text: 'WhatsApp üzerinden bize yazın veya doğrudan arayın. Ekibimiz sizi hızlıca karşılar.', icon: <MessageCircle size={17} /> },
  { title: 'Gönderi Bilgilerini Paylaşın', text: 'Alınacak ve teslim edilecek adresi, gönderinizin detaylarını ve zaman beklentinizi iletin.', icon: <Send size={17} /> },
  { title: 'Fiyat ve Araç Belirlensin', text: 'Gönderiniz için en uygun aracı ve fiyatı netleştirelim. Sürpriz bırakmayalım.', icon: <Route size={17} /> },
  { title: 'Gönderiniz Teslim Edilsin', text: 'Kurye gönderinizi alır, güvenle ulaştırır. Ödemenizi teslimat sırasında Nakit veya Kart ile yapabilirsiniz.', icon: <CircleCheckBig size={17} /> },
];

function Process() {
  return (
    <section className="process-section section-pad" id="nasil-calisir">
      <div className="section-wrap process-layout">
        <div className="process-intro reveal">
          <div className="section-kicker">Basit, net, hızlı</div>
          <h2>Bir mesajla<br />başlar.</h2>
          <p>Kurye çağırmak için uzun formlara, üyeliklere veya beklemeye gerek yok. Detayları WhatsApp&apos;tan paylaşın, gerisini ALIGO halletsin.</p>
          <a className="text-link" href={whatsappUrl('Merhaba ALIGO, gönderim için iletişime geçiyorum.')} target="_blank" rel="noreferrer" data-testid="link-process-whatsapp">
            WhatsApp&apos;tan başla <ArrowRight size={16} />
          </a>
        </div>
        <div className="process-list">
          {processSteps.map((step, index) => (
            <div className={`process-step reveal reveal-delay-${index + 1}`} key={step.title} data-testid={`step-process-${index}`}>
              <span className="process-number">0{index + 1}</span>
              <div><h3>{step.title}</h3><p>{step.text}</p></div>
              {step.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story-section section-pad">
      <div className="section-wrap story-layout">
        <div className="story-image reveal" role="img" aria-label="Güvenli paket teslimatı yapan ALIGO kuryesi" />
        <div className="story-copy reveal reveal-delay-2">
          <div className="section-kicker">Operasyonun arkasındaki ekip</div>
          <h2>İstanbul&apos;un temposunu bilen bir ekip.</h2>
          <p>Bizim işimiz sadece bir paketi bir yerden bir yere götürmek değil. Zamanı doğru okumak, adresi doğru anlamak ve teslimatı başladığı andan sonuna kadar sahiplenmek.</p>
          <ul className="story-points">
            <li><Check size={17} /> Teslimat öncesi net iletişim</li>
            <li><Check size={17} /> İhtiyaca göre araç planlaması</li>
            <li><Check size={17} /> Teslimat anına kadar takip</li>
          </ul>
          <a className="text-link" href="#sss" data-testid="link-story-faq">Sık sorulanları incele <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

function Area() {
  return (
    <section className="area-section section-pad" id="bolge">
      <div className="section-wrap">
        <div className="area-card reveal">
          <div className="area-map-lines" aria-hidden="true" />
          <span className="area-pin" aria-hidden="true" />
          <div className="area-copy">
            <div className="section-kicker">Tek şehir, geniş erişim</div>
            <h2>İstanbul&apos;un<br />Her Noktasına</h2>
            <p>Anadolu Yakası&apos;ndan Avrupa Yakası&apos;na, İstanbul sınırları içindeki gönderilerinizi planlıyor ve güvenle teslim ediyoruz.</p>
            <a className="button-primary" href={whatsappUrl('Merhaba ALIGO, İstanbul içi gönderim için kurye çağırmak istiyorum.')} target="_blank" rel="noreferrer" data-testid="link-area-whatsapp">
              Rotanızı konuşalım <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: 'Kurye çağırmak için ne yapmalıyım?', a: 'WhatsApp üzerinden bize yazmanız yeterli. Alınacak ve teslim edilecek adresi, paket detayını ve varsa zaman beklentinizi paylaşın; ekibimiz sizi yönlendirsin.' },
  { q: 'Hangi araç gönderimim için uygun?', a: 'Gönderinizin boyutu, ağırlığı ve aciliyetine göre Motor, Orta Araç veya Büyük Araç seçeneğini biz belirleriz. Fiyatı ve aracı yola çıkmadan önce netleştiririz.' },
  { q: 'Ödeme nasıl yapılır?', a: 'Ödeme teslimat sırasında Nakit veya Kart ile yapılabilir. Online ödeme almaz, teslimat anında işlemi tamamlarız.' },
  { q: 'Hangi bölgelere hizmet veriyorsunuz?', a: 'ALIGO yalnızca İstanbul içinde hizmet verir. İstanbul’un Avrupa ve Anadolu Yakası’ndaki adresleriniz için bizimle iletişime geçebilirsiniz.' },
  { q: 'Gönderimi takip edebilir miyim?', a: 'Evet. Teslimat sürecinde WhatsApp üzerinden ekibimizle iletişimde kalabilir, gönderinizin durumu hakkında bilgi alabilirsiniz.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq-section section-pad" id="sss">
      <div className="section-wrap faq-layout">
        <div className="faq-intro reveal">
          <div className="section-kicker">Aklınızdaki sorular</div>
          <h2>Net cevaplar,<br />rahat teslimat.</h2>
          <p>Merak ettiğiniz başka bir konu varsa ekibimiz WhatsApp&apos;ta hazır.</p>
          <a className="text-link" href={whatsappUrl('Merhaba ALIGO, bir konuda bilgi almak istiyorum.')} target="_blank" rel="noreferrer" data-testid="link-faq-whatsapp">Bize sorun <ArrowRight size={16} /></a>
        </div>
        <div className="faq-list reveal reveal-delay-2">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={faq.q}>
                <button className="faq-question" onClick={() => setOpen(isOpen ? null : index)} aria-expanded={isOpen} data-testid={`button-faq-${index}`}>
                  <span>{faq.q}</span><ChevronDown size={18} />
                </button>
                <div className="faq-answer"><div>{faq.a}</div></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section section-pad">
      <div className="section-wrap contact-card reveal">
        <div>
          <div className="section-kicker">Gönderiniz hazırsa</div>
          <h2>Harekete<br />geçelim.</h2>
          <p>Kurye ihtiyacınızı anlatın. İstanbul içindeki en doğru çözümü birlikte planlayalım.</p>
        </div>
        <div className="contact-actions">
          <button className="button-primary" onClick={() => openWhatsApp('Merhaba ALIGO, kurye çağırmak istiyorum.')} data-testid="button-contact-order"><MessageCircle size={16} /> Kurye Çağır</button>
          <a className="button-secondary" href="tel:+905466907632" data-testid="link-contact-phone"><Phone size={16} /> +90 546 690 76 32</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>İstanbul içi hızlı, güvenli ve doğrudan kurye hizmeti. Gönderinizin her adımında yanınızdayız.</p>
            <div className="footer-socials">
              <a className="footer-social" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram'da @aligokurye217 hesabını ziyaret et" data-testid="link-footer-instagram"><Instagram size={17} /></a>
              <a className="footer-social" href={whatsappUrl('Merhaba ALIGO, kurye hizmeti için iletişime geçiyorum.')} target="_blank" rel="noreferrer" aria-label="ALIGO WhatsApp" data-testid="link-footer-whatsapp"><MessageCircle size={17} /></a>
            </div>
          </div>
          <div className="footer-col"><h3>Keşfet</h3><a href="#anasayfa">Ana Sayfa</a><a href="#hizmetler">Hizmetler</a><a href="#nasil-calisir">Nasıl Çalışır?</a><a href="#sss">SSS</a></div>
          <div className="footer-col"><h3>Hizmetler</h3><a href="#hizmetler">Motor</a><a href="#hizmetler">Orta Araç</a><a href="#hizmetler">Büyük Araç</a><a href="#hizmetler">VIP Kurye</a><a href="#bolge">İstanbul İçi</a></div>
          <div className="footer-col"><h3>İletişim</h3><a href="tel:+905466907632">+90 546 690 76 32</a><a href={whatsappUrl('Merhaba ALIGO, bilgi almak istiyorum.')} target="_blank" rel="noreferrer">WhatsApp&apos;tan yazın</a><a href={instagramUrl} target="_blank" rel="noreferrer">@aligokurye217</a><span>İstanbul, Türkiye</span></div>
        </div>
        <div className="footer-bottom"><span>© 2024 ALIGO. Tüm hakları saklıdır.</span><span>Yalnızca İstanbul içi hizmet</span></div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="floating-actions" aria-label="Hızlı iletişim">
      <a className="floating-action whatsapp" href={whatsappUrl('Merhaba ALIGO, kurye çağırmak istiyorum.')} target="_blank" rel="noreferrer" aria-label="WhatsApp üzerinden ALIGO'ya ulaş" data-testid="link-floating-whatsapp"><MessageCircle size={22} /></a>
      <a className="floating-action" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram'da @aligokurye217 hesabını ziyaret et" data-testid="link-floating-instagram"><Instagram size={20} /></a>
    </div>
  );
}

function Home() {
  const revealObserver = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    document.title = 'ALIGO Kurye | İstanbul İçi Motor, Araç ve VIP Kurye';
    document.documentElement.lang = 'tr';
    const description = 'ALIGO ile İstanbul içi hızlı, güvenli ve doğrudan kurye hizmeti. Motor, orta araç, büyük araç ve VIP Kurye seçenekleri için WhatsApp üzerinden ulaşın.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    let og = document.querySelector('meta[property="og:description"]');
    if (!og) { og = document.createElement('meta'); og.setAttribute('property', 'og:description'); document.head.appendChild(og); }
    og.setAttribute('content', description);
    const setOg = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    };
    setOg('og:title', 'ALIGO Kurye | İstanbul İçi Motor, Araç ve VIP Kurye');
    setOg('og:type', 'website');
    setOg('og:locale', 'tr_TR');
  }, []);
  useEffect(() => {
    revealObserver.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((element) => revealObserver.current?.observe(element));
    return () => revealObserver.current?.disconnect();
  }, []);
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <Services />
        <ShipmentPolicy />
        <TrustBand />
        <Process />
        <Story />
        <Area />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <WouterRoute path="/" component={Home} />
        <WouterRoute component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;