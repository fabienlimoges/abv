import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Crown,
  Home,
  Lock,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  User,
  Users,
  Wine,
  X
} from "lucide-react";
import desertTale from "../content/events/desert-tale.md?raw";
import privateVault from "../content/events/private-vault.md?raw";
import veniceAtelier from "../content/events/venice-atelier.md?raw";
import brandMark from "../assets/abv-mark.png";
import dubaiHero from "../assets/dubai-hero.png";
import boardImage from "../assets/abv-ui-board.png";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import "./index.css";

const eventSources = [
  ["desert-tale", desertTale],
  ["private-vault", privateVault],
  ["venice-atelier", veniceAtelier]
];

const accentImages = [boardImage, dubaiHero];

const sales = [
  {
    id: "macallan-shadow-cask",
    section: "Exclusive Sales",
    title: "Macallan Shadow Cask Allocation",
    category: "Single Malt",
    availability: "12 bottles",
    price: "From AED 4,900",
    date: "Member window",
    location: "Concierge delivery",
    image: boardImage,
    summary: "A private allocation of sherry-seasoned oak casks selected for ABV members.",
    body: "Each bottle is reserved through concierge confirmation with provenance notes, cellar handling guidance, and optional tasting pairing."
  },
  {
    id: "bordeaux-private-parcel",
    section: "Exclusive Sales",
    title: "Bordeaux Private Parcel",
    category: "Fine Wine",
    availability: "Limited cases",
    price: "From AED 8,600",
    date: "48-hour access",
    location: "Temperature-controlled delivery",
    image: dubaiHero,
    summary: "A short access window for a classified-growth parcel held outside public retail.",
    body: "Members can request mixed-case recommendations, vintage notes, and cellar-ready delivery with a dedicated advisor."
  },
  {
    id: "agave-artist-series",
    section: "Exclusive Sales",
    title: "Agave Artist Series",
    category: "Limited Tequila",
    availability: "Numbered release",
    price: "From AED 1,750",
    date: "Opens tonight",
    location: "Downtown Dubai",
    image: boardImage,
    summary: "A hand-numbered tequila release bottled with a commissioned artist label.",
    body: "The allocation includes a hosted tasting note card, bottle authentication, and optional gift presentation."
  }
];

const masterclasses = [
  {
    id: "terroir-after-dark",
    section: "Masterclasses",
    title: "Terroir After Dark",
    category: "Wine technique",
    availability: "16 seats",
    price: "AED 950",
    date: "June 18, 2026",
    location: "Private salon",
    host: "Hosted by Clara Beaumont",
    image: boardImage,
    summary: "Learn how soil, altitude, and climate translate into texture and aroma.",
    body: "The session moves from guided tasting to blind comparison, helping members build a clear vocabulary for premium wine selection."
  },
  {
    id: "agave-production-lab",
    section: "Masterclasses",
    title: "Agave Production Lab",
    category: "Tequila craft",
    availability: "10 seats",
    price: "AED 1,250",
    date: "June 24, 2026",
    location: "ABV tasting room",
    host: "Hosted by Diego Salazar",
    image: dubaiHero,
    summary: "A production-led session covering agave maturity, roasting, fermentation, and barrel influence.",
    body: "Members compare blanco, reposado, and anejo profiles while learning how production decisions shape the final glass."
  },
  {
    id: "pairing-architecture",
    section: "Masterclasses",
    title: "Pairing Architecture",
    category: "Food and spirits",
    availability: "14 seats",
    price: "AED 1,100",
    date: "July 2, 2026",
    location: "Chef's counter",
    host: "Hosted by Mara Singh",
    image: boardImage,
    summary: "A practical class on building elegant pairings across smoke, spice, citrus, and texture.",
    body: "Expect small plates, premium spirits, and a clear method for choosing pairings in a restaurant or private setting."
  }
];

const takeaways = [
  {
    id: "desert-dinner-drop",
    section: "Exclusive Take aways",
    title: "Private Desert Dinner Kit",
    category: "At-home experience",
    availability: "8 kits",
    price: "AED 2,400",
    date: "Weekend delivery",
    location: "Dubai",
    image: dubaiHero,
    summary: "A chef-designed tasting kit with rare tequila, paired bites, and a guided digital ritual.",
    body: "The kit is designed for two guests and includes service cards, glassware recommendations, and optional concierge setup."
  },
  {
    id: "cellar-preview-box",
    section: "Exclusive Take aways",
    title: "Cellar Preview Box",
    category: "Curated bottles",
    availability: "Members only",
    price: "AED 3,200",
    date: "Monthly",
    location: "Concierge delivery",
    image: boardImage,
    summary: "A rotating set of bottles selected from upcoming allocations before public release.",
    body: "Members receive three premium selections with tasting notes, pairing ideas, and early access to full-bottle purchases."
  },
  {
    id: "sommelier-weekend",
    section: "Exclusive Take aways",
    title: "Sommelier Weekend Case",
    category: "Wine selection",
    availability: "24 cases",
    price: "AED 2,850",
    date: "Friday drop",
    location: "Dubai Marina",
    image: boardImage,
    summary: "A ready-to-host wine case built for a long dinner with sparkling, white, red, and digestif pairings.",
    body: "The selection balances crowd-pleasing labels with one conversation-piece bottle reserved for ABV members."
  }
];

function parseMarkdown(id, source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = {};
  if (match) {
    match[1].split("\n").forEach((line) => {
      const separator = line.indexOf(":");
      if (separator === -1) return;
      const key = line.slice(0, separator).trim();
      const rawValue = line.slice(separator + 1).trim();
      meta[key] = rawValue.startsWith("[")
        ? rawValue
            .slice(1, -1)
            .split(",")
            .map((item) => item.trim().replace(/^"|"$/g, ""))
        : rawValue.replace(/^"|"$/g, "");
    });
  }

  return {
    id,
    section: "Events",
    title: meta.title,
    category: (meta.tags || ["Tasting"])[0],
    availability: `${meta.seats} seats`,
    price: meta.price,
    date: `${meta.day} ${meta.month} 2026`,
    location: meta.location,
    time: meta.time,
    badges: meta.badges || [],
    image: accentImages[id.length % accentImages.length],
    summary: meta.summary,
    body: match ? match[2].trim() : source,
    dressCode: meta.dressCode,
    included: meta.included,
    tags: meta.tags || []
  };
}

function bodyToBlocks(body) {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("## ")) return { type: "heading", text: line.replace("## ", "") };
      if (line.startsWith("- ")) return { type: "list", text: line.replace("- ", "") };
      return { type: "paragraph", text: line };
    });
}

function App() {
  const events = useMemo(() => eventSources.map(([id, source]) => parseMarkdown(id, source)), []);
  const collections = { Events: events };
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [view, setView] = useState({ name: "home" });
  const [eventFilter, setEventFilter] = useState("All");
  const [bookingItem, setBookingItem] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  function signIn(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "").trim();
    if (email !== "demo@abv.com" || password !== "abv") {
      setLoginError("Enter an email address and password to continue.");
      return;
    }
    setMemberEmail(email);
    setLoginError("");
    setAuthenticated(true);
    setView({ name: "home" });
  }

  function openItem(item) {
    setView({ name: "detail", item });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openSection(section) {
    setView({ name: "section", section });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reserve(item) {
    setConfirmed(false);
    setBookingItem(item);
  }

  if (!isAuthenticated) {
    return <LoginScreen loginError={loginError} onSubmit={signIn} />;
  }

  return (
    <div className="min-h-screen bg-[#0c0d0d] text-stone-100">
      <Header
        memberEmail={memberEmail}
        onHome={() => setView({ name: "home" })}
        onSignOut={() => {
          setAuthenticated(false);
          setMemberEmail("");
          setView({ name: "home" });
        }}
      />
      {view.name === "home" && (
        <HomeScreen collections={collections} eventFilter={eventFilter} setEventFilter={setEventFilter} onOpen={openItem} onSection={openSection} onReserve={reserve} />
      )}
      {view.name === "section" && (
        <SectionScreen title={view.section} items={collections[view.section]} onBack={() => setView({ name: "home" })} onOpen={openItem} onReserve={reserve} />
      )}
      {view.name === "detail" && <DetailScreen item={view.item} onBack={() => setView({ name: "home" })} onReserve={reserve} />}
      {bookingItem && <BookingModal item={bookingItem} confirmed={confirmed} onConfirm={() => setConfirmed(true)} onClose={() => setBookingItem(null)} />}
    </div>
  );
}

function LoginScreen({ loginError, onSubmit }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-6">
      <img src={dubaiHero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,13,13,.96),rgba(12,13,13,.52),rgba(12,13,13,.88))]" />
      <section className="relative mx-auto grid w-full max-w-5xl items-center gap-8 py-8 md:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12">
        <div className="mx-auto w-full max-w-xl pb-6 md:mx-0 md:pb-0">
          <img src={brandMark} alt="" className="mb-5 h-16 w-16 rounded-full border border-[#d6ad57]/25 object-cover shadow-[0_0_32px_rgba(214,173,87,.22)]" />
        
          <h1 className="mt-5 max-w-xl font-serif text-6xl leading-[.9] text-stone-50 md:text-8xl">ABV Club Reserve</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-stone-200">
            Private access to rare bottles, curated tastings, member-only masterclasses, and exclusive take away experiences across Dubai.
          </p>
        </div>
        <form onSubmit={onSubmit} className="mx-auto w-full max-w-96 rounded-lg border border-white/10 bg-[#10100f]/80 p-5 shadow-2xl backdrop-blur-2xl md:mx-0">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.16em] text-[#d6ad57]">Member sign in</p>
            </div>
            <ShieldCheck className="text-[#d6ad57]" />
          </div>
          <label className="mb-4 grid gap-2 text-xs uppercase tracking-[.14em] text-stone-300">
            Email address
              <Input name="email" type="email" placeholder="your email" />
          </label>
          <label className="mb-4 grid gap-2 text-xs uppercase tracking-[.14em] text-stone-300">
            Password
            <Input name="password" type="password" placeholder="your password" />
          </label>
          {loginError && <p className="mb-4 text-sm text-rose-200">{loginError}</p>}
          <Button className="w-full" type="submit">
            Sign in <ArrowRight size={16} />
          </Button>
        </form>
      </section>
    </main>
  );
}

function Header({ memberEmail, onHome, onSignOut }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0d0d]/85 px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <button onClick={onHome} className="grid h-11 w-11 place-items-center rounded-full border border-[#d6ad57]/25 bg-black/45 shadow-[0_0_24px_rgba(214,173,87,.12)]" aria-label="ABV Club Reserve home">
          <img src={brandMark} alt="" className="h-9 w-9 rounded-full object-cover" />
        </button>
        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden min-h-10 max-w-56 items-center gap-2 truncate rounded-lg border border-white/10 bg-white/[.035] px-3 text-xs text-stone-300 sm:inline-flex">
            <User size={14} />
            {memberEmail}
          </span>
          <Button variant="outline" className="aspect-square px-0" aria-label="Search">
            <Search size={16} />
          </Button>
          <Button variant="outline" onClick={onSignOut}>
            <Lock size={15} />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

function HomeScreen({ collections, eventFilter, setEventFilter, onOpen, onSection, onReserve }) {
  const eventTags = ["All", ...new Set(collections.Events.flatMap((event) => event.tags))];
  const filteredEvents = eventFilter === "All" ? collections.Events : collections.Events.filter((event) => event.tags.includes(eventFilter));

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      

      <section className="mt-6 flex flex-wrap gap-2">
        {eventTags.map((tag) => (
          <Badge key={tag} active={eventFilter === tag} onClick={() => setEventFilter(tag)}>
            {tag}
          </Badge>
        ))}
      </section>

      <CollectionRail title="Events" items={filteredEvents} onOpen={onOpen} onSection={onSection} onReserve={onReserve} />
    </main>
  );
}

function CollectionRail({ title, items, onOpen, onSection, onReserve }) {
  return (
    <section className="mt-9">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[.18em] text-[#d6ad57]">{title}</p>
          <h2 className="mt-1 font-serif text-3xl text-stone-50">Upcoming member events</h2>
        </div>
        <Button variant="ghost" onClick={() => onSection(title)}>
          View all <ChevronRight size={16} />
        </Button>
      </div>
      <div className="flex snap-x gap-4 overflow-x-auto pb-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onOpen={onOpen} onReserve={onReserve} className="w-[20rem] shrink-0 snap-start" />
        ))}
      </div>
    </section>
  );
}

function SectionScreen({ title, items, onBack, onOpen, onReserve }) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft size={16} />
        Home
      </Button>
      <section className="my-6">
        <p className="text-xs uppercase tracking-[.18em] text-[#d6ad57]">{title}</p>
        <h1 className="mt-2 font-serif text-5xl">Full selection</h1>
        <p className="mt-3 max-w-2xl leading-7 text-stone-300">Browse every currently available member opportunity in this category.</p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onOpen={onOpen} onReserve={onReserve} />
        ))}
      </section>
    </main>
  );
}

function ItemCard({ item, onOpen, onReserve, className = "" }) {
  return (
    <Card className={className} data-testid={`item-card-${item.id}`}>
      <button onClick={() => onOpen(item)} className="relative block h-44 w-full overflow-hidden text-left">
        <img src={item.image} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,13,13,.88),rgba(12,13,13,.08))]" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-xs text-stone-100 backdrop-blur">{item.location}</span>
      </button>
      <div className="grid gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          <Badge>
            <Star size={13} />
            {item.category}
          </Badge>
          <Badge>{item.availability}</Badge>
        </div>
        <div>
          <h3 className="font-serif text-2xl leading-tight">{item.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-400">{item.summary}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-300">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={15} />
            {item.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ticket size={15} />
            {item.price}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button variant="ghost" className="px-0" data-testid={`item-details-${item.id}`} onClick={() => onOpen(item)}>
            Details <ArrowRight size={15} />
          </Button>
          <Button className="min-h-10 px-3" data-testid={`item-reserve-${item.id}`} onClick={() => onReserve(item)}>
            Reserve
          </Button>
        </div>
      </div>
    </Card>
  );
}

function DetailScreen({ item, onBack, onReserve }) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft size={16} />
        Home
      </Button>
      <section className="mt-5 grid overflow-hidden rounded-lg border border-white/10 bg-[#161411] lg:grid-cols-[1.1fr_.9fr]">
        <div className="relative min-h-[24rem]">
          <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,13,13,.9),rgba(12,13,13,.14))]" />
        </div>
        <div className="grid content-center gap-5 p-5 md:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge>{item.section}</Badge>
            <Badge>{item.availability}</Badge>
          </div>
          <h1 className="font-serif text-5xl leading-[.95] md:text-6xl">{item.title}</h1>
          <p className="text-lg leading-8 text-stone-300">{item.summary}</p>
          <div className="grid gap-3 text-sm text-stone-300 sm:grid-cols-2">
            <Fact icon={Calendar} label={item.date} />
            <Fact icon={MapPin} label={item.location} />
            <Fact icon={Wine} label={item.category} />
            <Fact icon={Users} label={item.host || item.dressCode || item.price} />
          </div>
          <Button onClick={() => onReserve(item)} className="w-full sm:w-fit">
            Reserve access <ArrowRight size={16} />
          </Button>
        </div>
      </section>
      <section className="mt-5 grid gap-4 lg:grid-cols-[1fr_20rem]">
        <Card className="p-5 md:p-7">
          <div className="prose prose-invert max-w-none">
            {bodyToBlocks(item.body).map((block, index) => {
              if (block.type === "heading") return <h2 key={index} className="font-serif text-3xl">{block.text}</h2>;
              if (block.type === "list") return <p key={index} className="text-stone-300">- {block.text}</p>;
              return <p key={index} className="leading-8 text-stone-300">{block.text}</p>;
            })}
          </div>
        </Card>
        <Card className="grid content-start gap-4 p-5">
          <p className="text-xs uppercase tracking-[.18em] text-[#d6ad57]">Booking snapshot</p>
          <strong className="text-3xl">{item.price}</strong>
          <p className="leading-7 text-stone-400">{item.included || "Concierge confirmation, member access validation, and premium handling are included."}</p>
          <Button onClick={() => onReserve(item)}>
            Book now <Ticket size={16} />
          </Button>
        </Card>
      </section>
    </main>
  );
}

function Fact({ icon: Icon, label }) {
  return (
    <span className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/[.035] px-3">
      <Icon size={16} className="text-[#d6ad57]" />
      {label}
    </span>
  );
}

function BookingModal({ item, confirmed, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <section className="relative w-full max-w-lg rounded-lg border border-white/10 bg-[#11100f] p-5 shadow-2xl">
        <button onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[.04]" aria-label="Close">
          <X size={17} />
        </button>
        {confirmed ? (
          <div className="grid gap-4 py-8 text-center">
            <ShieldCheck className="mx-auto text-[#d6ad57]" size={42} />
            <h2 className="font-serif text-4xl">Reservation held</h2>
            <p className="mx-auto max-w-sm leading-7 text-stone-300">Your request is being held. The ABV concierge will finalize access, payment, and guest preferences.</p>
            <Button onClick={onClose} className="mx-auto">Back to experiences</Button>
          </div>
        ) : (
          <div className="grid gap-4 pt-8">
            <p className="text-xs uppercase tracking-[.18em] text-[#d6ad57]">Book your experience</p>
            <h2 className="font-serif text-4xl">{item.title}</h2>
            <label className="grid gap-2 text-xs uppercase tracking-[.14em] text-stone-300">
              Full name
              <Input placeholder="Alex Laurent" />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[.14em] text-stone-300">
              Email address
              <Input placeholder="member@abv.reserve" />
            </label>
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[.035] p-4">
              <span className="text-stone-400">Total estimate</span>
              <strong>{item.price}</strong>
            </div>
            <Button onClick={onConfirm}>
              Proceed to reserve <Lock size={16} />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
