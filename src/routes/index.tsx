import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowDown, MapPin, Clock3, Menu, X, Play, Mail, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import heroImage from "@/assets/hero-porsche.jpg";
import workImage from "@/assets/kahvi.jpg";
import coatingImage from "@/assets/paint-protection.jpg";
import entranceImage from "@/assets/merihaka.jpg";
import brandLogo from "@/assets/premium-wash-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Premium Auto — Täyden palvelun autonhoito Helsingissä" },
    { name: "description", content: "Käsinpesut alkaen 29 €, pinnoitteet, rengastyöt ja autohuolto Helsingin Merihaassa. Haapaniemenkatu 7–9. Tutustu palveluihin ja ota yhteyttä." },
    { property: "og:title", content: "Premium Auto — Täyden palvelun autonhoito" },
    { property: "og:description", content: "Yksi osoite. Koko autolle. Käsinpesut, pinnoitteet ja autohuolto Helsingin Merihaassa." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const bookingUrl = "https://varaapalvelu.fi/premium-wash/ajanvaraus/";
const navigation = [ ["Palvelut", "palvelut"], ["Pinnoitteet", "pinnoitteet"], ["Renkaat", "renkaat"], ["Huolto", "huolto"], ["Yhteystiedot", "yhteystiedot"] ];
const services = [
  { name: "Pesut", description: "Huolellinen käsinpesu auton ulkopinnoille. Peruspesu 29 € ja Premiumpesu 34 € henkilöautolle." },
  { name: "Sisäpuhdistukset", description: "Raikas ja siisti sisätila. Kysy autollesi sopivasta sisäpuhdistuksesta ja sen hinnasta." },
  { name: "Vahaukset", description: "Nanovaha ja kovavaha antavat maalipinnalle kiiltoa ja suojaa. Kovavahan pohjatyöt sisältyvät palveluun." },
  { name: "Pinnoitteet", description: "Stardust PCS 2, Stardust PCS 5, lasipinnoite ja vanteiden pinnoitus. Valitaan autollesi sopiva suoja." },
  { name: "Rengastyöt", description: "Rengastyöt saman katon alta. Ota yhteyttä, niin sovitaan autollesi sopiva palvelu ja aika." },
  { name: "Tuulilasit", description: "Tuulilasipalvelut autosi tarpeisiin. Kysy lisää korjauksesta tai vaihdosta ja pyydä tarjous." },
  { name: "Huolto", description: "Autohuolto Helsingin Merihaassa. Kerro autosi tiedot ja huollon tarve, niin autamme eteenpäin." },
  { name: "Lasien tummennus", description: "Viimeistele autosi ilme lasien tummennuksella. Kysy vaihtoehdoista ja autokohtaisesta hinnasta." },
];

export const autumnOffers = [
  { number: "01", services: ["Rengashotelli", "Renkaidenvaihto", "Renkaidenpesu"], price: 99 },
  { number: "02", services: ["Tehopesu", "Kovavaha"], price: 99 },
  { number: "03", services: ["Tehopesu", "Kovavaha", "Täydellinen sisäpuhdistus"], price: 149 },
  { number: "04", services: ["Renkaidenvaihto", "Renkaidenpesu", "Ulko tehopesu"], price: 79 },
];

type PriceRow = { name: string; description: string; prices: (number | string)[] | null; time: string | null; top: boolean; badge?: string };
const priceRows: PriceRow[] = [
  { name: "Peruspesu", description: "Käsinpesu, ovienvälit ja kumimattojen pesu.", prices: [29, 34, 49], time: "25 min", top: false },
  { name: "Premiumpesu", description: "Peruspesu ja maalipinnan liuotinpesu.", prices: [39, 44, 52], time: "25 min", top: true },
  { name: "Nano Pesu", description: "Uusi palvelu!", prices: [39, 39, 59], time: null, top: false },
  { name: "Kevyt Sisäpuhdistus", description: "Lattian, penkkien ja mattojen imurointi sekä kojelaudan pyyhintäpalvelu", prices: [29, 29, 29], time: null, top: false },
  { name: "Täydellinen Sisäpuhdistus", description: "Perusteellinen sisäpuhdistus\nLemmikkieläinten karvojen poisto alk. 20€", prices: [49, 49, 69], time: "45 min", top: false },
  { name: "Total Sisäpuhdistus", description: "Perusteellinen sisäpuhdistus, istuimien märkäpesu", prices: [159, 159, 159], time: "60 min", top: false },
  { name: "NAHKAHOITO", description: "-", prices: ["89€", "89 €", "89 €"], time: "?", top: false },
];

export const waxPriceRows: PriceRow[] = [
  { name: "POLYMATRIX", description: "Kesto 3-5kk", prices: [85, "95€", 95], time: "25 min", top: false },
  { name: "KOVAVAHA", description: "Kesto 6kk vuosi", prices: [120, 140, 160], time: "60 min", top: true, badge: "SUOSITUIN" },
  { name: "NANO VAHA", description: "Kesto 12-18kk", prices: [150, 170, 190], time: null, top: false },
  { name: "MAALIPINNAN KIILLOTUS", description: "2 step kiillotus + käsinvahaus", prices: ["199€", "249€", "349€"], time: null, top: false },
  { name: "KERAAMINEN PIINOITE", description: "alk.", prices: ["499€", "499€", "599€"], time: "? min", top: false },
];

export const tirePriceRows: PriceRow[] = [
  { name: "RENKAIDEN ALLEVAIHTO", description: "-", prices: [30, 35, 40], time: "25 min", top: false },
  { name: "TUBELESS/RENGASPAIKKAUS", description: "-", prices: [35, 35, 35], time: "25 min", top: true, badge: "SUOSITUIN" },
  { name: "TASAPAINOTUS", description: "-", prices: [45, 45, 45], time: null, top: false },
  { name: "RENKAIDEN PESU", description: "-", prices: [15, 15, 15], time: null, top: false },
  { name: "VANNETYÖ", description: "Irtorenkaiden allevaihto + tasapainotus", prices: [99, 109, "119€"], time: "- min", top: false },
  { name: "RENGASHOTELLI/KAUSI", description: "-", prices: [69, 69, 69], time: "0 min", top: false },
];

export const otherPriceRows: PriceRow[] = [
  { name: "Tuulilasin korjaus", description: "12kk takuu", prices: [60, 60, 60], time: "? min", top: false },
  { name: "Otsonointi ja hajupoisto", description: "-", prices: [90, 90, 90], time: "? min", top: true },
  { name: "Tuulilasin vaihto", description: "alk.", prices: [200, 250, 300], time: null, top: false },
  { name: "Umpioiden korjaus", description: "-", prices: [60, 60, 60], time: null, top: false },
  { name: "Ilmastoinnin täyttöhuolto", description: "-", prices: [75, 80, 85], time: "? min", top: false },
];

function TikTokGlyph({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V9.77a5.66 5.66 0 0 0-.78-.05 5.66 5.66 0 1 0 5.66 5.66V8.87a7.35 7.35 0 0 0 4.29 1.38V7.16a4.28 4.28 0 0 1-3.21-1.34z" /></svg>;
}

export const socialLinks: { name: string; url: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { name: "Facebook", url: "https://facebook.com/121431994232898", icon: Facebook },
  { name: "Instagram", url: "https://www.instagram.com/premium.auto1", icon: Instagram },
  { name: "TikTok", url: "https://www.tiktok.com/@premiumauto1", icon: TikTokGlyph },
];

function SocialLinks() {
  const live = socialLinks.filter(link => link.url.length > 0);
  if (live.length === 0) return null;
  return <div className="social-links">{live.map(({ name, url, icon: Icon }) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Premium Auto ${name}`} title={`Premium Auto ${name}`}><Icon size={18} /></a>)}</div>;
}

function Brand() {
  return <a href="#" className="brand" aria-label="Premium Auto — etusivu"><img className="brand-logo" src={brandLogo} alt="Premium Auto" width={500} height={300} /></a>;
}
function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number} /</span>{children}</div>;
}
function PriceSection({ id, title = "HINNAT AUTON KOON MUKAAN.", rows = priceRows }: { id: string; title?: string; rows?: PriceRow[] }) {
  return <section className="section-wrap" id={id}><SectionLabel number="—">Hinnasto</SectionLabel><h2>{title}</h2><p className="section-copy">alk. 34 € · 25 min</p><div className="price-list">{rows.map((row, i) => <div className={`price-row${row.top ? " is-top" : ""}`} key={`${row.name}-${i}`}><div className="price-info"><h3>{row.name.toUpperCase()}{row.top ? <span className="price-badge">{row.badge ?? "Suosituin"}</span> : null}</h3><p>{row.description}</p>{row.time ? <span className="price-time">{row.time}</span> : null}</div>{row.prices ? <div className="price-sizes">{row.prices.map((v, i) => <div key={i}><small>{["Henkilöauto","SUV","Pakettiauto"][i]}</small><strong>{typeof v === "string" ? v : `${v} €`}</strong></div>)}</div> : <div className="price-sizes"><div className="price-ask"><small>Kesto ja hinta sovitaan</small><strong>Kysy hinta</strong></div></div>}<Button variant="premium" size="premium" asChild><a href={bookingUrl} target="_blank" rel="noopener noreferrer">Varaa <ArrowUpRight size={16} /></a></Button></div>)}</div></section>;
}


function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<(typeof services)[number] | null>(null);
  const bookButton = (dark = false) => <Button variant={dark ? "premiumDark" : "premium"} size="premium" asChild><a href={bookingUrl} target="_blank" rel="noopener noreferrer">Varaa aika <ArrowUpRight size={16} /></a></Button>;
  return <>
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Päävalikko">{navigation.map(([label, anchor]) => <a key={anchor} href={`#${anchor}`}>{label}</a>)}</nav>
      <div className="header-actions">{bookButton(true)}<Button className="mobile-toggle" variant="ghost" size="icon" aria-label={menuOpen ? "Sulje valikko" : "Avaa valikko"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobiilivalikko">{navigation.map(([label, anchor]) => <a key={anchor} href={`#${anchor}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
    </header>

    <main>
      <section className="hero">
        <img className="hero-image" src={heroImage} alt="Punainen Porsche Taycan vastapestynä autonhoitostudiossa" width={1920} height={1440} fetchPriority="high" />
        <div className="hero-content">
          <div className="eyebrow"><span className="status-dot" /> Premium Wash · Helsinki Merihaka</div>
          <h1>TÄYDEN PALVELUN<em>AUTONHOITO.</em></h1>
          <div className="hero-subtitle">HELSINGIN MERIHAASSA</div>
          <p className="hero-description">Käsinpesut, pinnoitteet, rengastyöt ja autohuolto saman katon alta.</p>
          <div className="hero-buttons">{bookButton()}<a className="text-link" href="#palvelut">Katso palvelut <ArrowDown size={14} /></a></div>
        </div>
        <div className="hero-bottom"><span><MapPin size={13} />Haapaniemenkatu 7–9, Helsinki</span><span><Clock3 size={13} />Ma–Pe 8–18 <span aria-hidden="true">|</span> La 10–17</span><span className="hero-index">01 / PREMIUM CARE</span></div>
      </section>

      <div className="ticker" aria-label="Käsinpesu, pinnoitteet, rengastyöt, autohuolto, lasien tummennus, tuulilasit"><div className="ticker-track">{[0, 1].map(copy => <div className="ticker-set" key={copy} aria-hidden="true">{["KÄSINPESU", "PINNOITTEET", "RENGASTYÖT", "AUTOHUOLTO", "LASIEN TUMMENNUS", "TUULILASIT"].map(text => <span key={text}>{text}</span>)}</div>)}</div></div>

      <section className="section-wrap offers-section" id="tarjoukset" aria-labelledby="offers-title">
        <SectionLabel number="—">Tarjoukset</SectionLabel>
        <div className="offers-heading"><h2 id="offers-title">SYKSY-TARJOUS.</h2><span>PREMIUM AUTO / MERIHAKA</span></div>
        <div className="offers-grid">{autumnOffers.map(offer => <article className="offer-card" key={offer.number}>
          <div className="offer-top"><h3>TARJOUS #{Number(offer.number)}</h3><span>{offer.number} /</span></div>
          <ul className="offer-services">{offer.services.map(service => <li key={service}>{service}</li>)}</ul>
          <div className="offer-bottom"><strong className="offer-price">{offer.price.toFixed(2)}<span>€</span></strong><Button variant="premium" size="premium" asChild><a href={bookingUrl} target="_blank" rel="noopener noreferrer" aria-label={`Varaa aika — tarjous ${Number(offer.number)}`}>Varaa aika <ArrowUpRight size={16} /></a></Button></div>
        </article>)}</div>
      </section>


      <section className="section-wrap value-section"><div><div className="section-label">ENEMMÄN KUIN AUTOPESU</div><h2>YKSI OSOITE.<br />KOKO AUTOLLE.</h2><p className="section-copy">Täyden palvelun autopesula Helsingin Merihaassa. Käsinpesusta maalipinnan suojaukseen, renkaista huoltoihin.</p></div><div className="value-list">{["Käsinpesu & autonhoito", "Rengastyöt & huolto", "Tuulilasit & lasien tummennus"].map((text, i) => <div className="value-item" key={text}><span>0{i + 1}</span>{text}<ArrowUpRight className="ml-auto" size={18} strokeWidth={1.2} /></div>)}</div></section>

      <section className="split-feature coatings" id="pinnoitteet">
        <div className="feature-image"><img src={coatingImage} alt="Valkoisen Mercedeksen viimeistelty ja suojattu maalipinta" loading="lazy" width={1200} height={1024} /><div className="image-quote">PINNAN ALLA<br />ON ASENNE.</div></div>
        <div className="feature-content"><SectionLabel number="03">Viimeistelty pinta</SectionLabel><h2>KIILTO NÄKYY.<br />SUOJA TUNTUU.</h2><div className="coating-subtitle">PINNOITTEET & MAALIPINNAN SUOJAUS</div><p className="section-copy">Kaunis pinta on vasta alku. Suojaa autosi maalipinta ja säilytä sen kiilto arjen jokaisella kilometrillä.</p><div className="coating-tags">{["Nanovaha", "Kovavaha", "Stardust PCS 2", "Stardust PCS 5", "Lasipinnoite", "Vanteiden pinnoitus"].map(tag => <span key={tag}>{tag}</span>)}</div><div className="coating-actions">{bookButton(true)}<a href="mailto:info@premiumwash.fi?subject=Pinnoitteet" className="text-link">Kysy lisää <ArrowUpRight size={15} /></a></div></div>
      </section>

      <section className="section-wrap" id="palvelut"><SectionLabel number="04">Kaikki palvelut</SectionLabel><h2>AUTOSI TARPEET.<br />MEIDÄN PALVELUMME.</h2><div className="directory">{services.map((service, i) => <Button variant="ghost" className="directory-item" id={i === 4 ? "renkaat" : i === 6 ? "huolto" : undefined} key={service.name} onClick={() => setSelectedService(service)}><span className="directory-number">0{i + 1}</span><span className="directory-title">{service.name}<ArrowUpRight size={20} strokeWidth={1.2} /></span></Button>)}</div></section>

      <PriceSection id="hinnasto" title="HINNAT PESUT." /><PriceSection id="hinnasto-2" title="HINNAT VAHAUKSET." rows={waxPriceRows} /><PriceSection id="hinnasto-3" title="HINNAT RENGASTYÖT." rows={tirePriceRows} /><PriceSection id="hinnasto-4" title="HINNAT MUUT." rows={otherPriceRows} />

      <section className="split-feature">
        <div className="feature-image"><img src={workImage} alt="Premium Auton vastaanotto- ja odotustila, jossa palveluiden hinnasto on seinällä" loading="lazy" width={1905} height={1072} /><Button className="video-pill" variant="ghost" asChild><a href="https://www.youtube.com/watch?v=lQsI5fR2dIU" target="_blank" rel="noopener noreferrer"><Play size={17} fill="currentColor" /><span>MEIDÄN TYÖT VIDEOLLA<small>Katso YouTubessa ↗</small></span></a></Button></div>
        <div className="feature-content"><SectionLabel number="02">Työn jälki</SectionLabel><h2>MEIDÄN TYÖMME<br />PUHUVAT<br />PUOLESTAAN.</h2><p className="section-copy">Huolellinen käsityö. Viimeistelty lopputulos. Meille jokainen auto ansaitsee saman huomion — merkistä ja mallista riippumatta.</p><div className="location-label"><MapPin size={13} /> PREMIUM AUTO / MERIHAKA, HELSINKI</div></div>
      </section>

      <section className="cta-banner"><div><h2>AUTOSI ANSAITSEE<br />PAREMPAA HUOLENPITOA.</h2><p>Valitse palvelu ja varaa aika muutamassa hetkessä.</p></div>{bookButton(true)}</section>

      <section className="section-wrap contact-section" id="yhteystiedot"><div><SectionLabel number="05">Löydät meidät täältä</SectionLabel><h2>NÄHDÄÄN<br />MERIHAASSA.</h2><div className="contact-details"><div><div className="detail-label">Tervetuloa meille</div><p>Haapaniemenkatu 7–9<br />00530 Helsinki</p><a href="tel:+358442400064">+358 44 240 00 64</a><br /><a href="mailto:info@premiumwash.fi">info@premiumwash.fi</a><SocialLinks /></div><div><div className="detail-label">Aukioloajat</div><div className="opening-row"><span>Ma–Pe</span><span>8:00–18:00</span></div><div className="opening-row"><span>La</span><span>10:00–17:00</span></div><div className="opening-row"><span>Su</span><span>12:00–17:00*</span></div><div className="season-note">* Rengassesongin aikana</div></div></div></div><div className="contact-image"><img src={entranceImage} alt="Ilmakuva Helsingin Meriahasta ja Sörnäisistä 1970-luvulta" loading="lazy" width={1500} height={1100} /><div className="map-panel"><div><span>HELSINKI / MERIHAKA</span><p>Haapaniemenkatu 7–9</p></div><Button variant="premium" size="premium" asChild><a href="https://www.google.com/maps/search/?api=1&query=Haapaniemenkatu+7-9+00530+Helsinki" target="_blank" rel="noopener noreferrer">Reittiohjeet <ArrowUpRight /></a></Button></div></div></section>
    </main>

     <footer className="site-footer"><div className="footer-main"><div><Brand /><p>Täyden palvelun autonhoito.<br />Helsingin Merihaassa.</p></div><div><h4>LÖYDÄ MEIDÄT</h4><p>Haapaniemenkatu 7–9<br />00530 Helsinki</p><a href="tel:+358442400064">+358 44 240 00 64</a><br /><a href="mailto:info@premiumwash.fi">info@premiumwash.fi</a></div><div><h4>AUKIOLOAJAT</h4><p>Ma–Pe 8:00–18:00<br />La 10:00–17:00<br />Su 12:00–17:00*</p><p>* Rengassesongin aikana</p></div><div><h4>PIKALINKIT</h4><div className="footer-links">{navigation.slice(0, 4).map(([label, anchor]) => <a href={`#${anchor}`} key={anchor}>{label}</a>)}</div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PREMIUM AUTO</span><span>Y-tunnus: 3349811-6</span><a href="https://premiumwash.fi" target="_blank" rel="noopener noreferrer">Alku ↗</a></div></footer>

    <Dialog open={selectedService !== null} onOpenChange={open => { if (!open) setSelectedService(null); }}><DialogContent className="booking-dialog"><DialogTitle>{selectedService?.name.toUpperCase()}</DialogTitle><DialogDescription>{selectedService?.description}</DialogDescription><div className="booking-options"><Button variant="premium" size="premium" asChild><a href={bookingUrl} target="_blank" rel="noopener noreferrer">Varaa aika <ArrowUpRight /></a></Button><Button variant="premiumOutline" size="premium" asChild><a href="mailto:info@premiumwash.fi">Kysy lisää <Mail /></a></Button></div></DialogContent></Dialog>
  </>;
}
