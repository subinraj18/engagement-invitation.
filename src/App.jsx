import { useEffect, useState } from "react";
import "./App.css";

const bride = "Swaliha Sulfi";
const groom = "Asif Ali";

// Wedding: Sunday, 3 January 2027.
// The invitation shows no time, so 11:00 AM IST is a placeholder for the countdown.
// Change the time here (and timeText below) once you know it. Set timeText = "" to hide it.
const weddingDate = new Date("2027-01-03T11:00:00+05:30");
const timeText = "";

const venueName = "Lalas Convention Centre, Kollam";
const venueAddress = [
  "Lalas Convention Centre,",
  "Chathannoor Road, Vailamon P.O,",
  "Kollam, Kerala 691010",
  "(Near Kollam Railway Station)",
];
const mapLink =
  "https://www.google.com/maps/search/?api=1&query=Lalas+Convention+Centre+Kollam";

function getTimeLeft() {
  const difference = weddingDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    ended: false,
  };
}

function Ornament({ heart = false }) {
  return (
    <div className="ornament" aria-hidden="true">
      <i />
      {heart ? (
        <b>♥</b>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <rect x="6" y="6" width="12" height="12" />
          <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
        </svg>
      )}
      <i />
    </div>
  );
}

function Petals() {
  const petals = Array.from({ length: 18 }, (_, index) => ({
    id: index,
    left: `${(index * 37 + 11) % 100}%`,
    delay: `${-((index * 3) % 16)}s`,
    duration: `${12 + (index % 9)}s`,
    size: `${10 + (index % 9)}px`,
  }));

  return (
    <div className="petal-layer" aria-hidden="true">
      {petals.map((petal) => (
        <span
          className="petal"
          key={petal.id}
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: `calc(${petal.size} * 1.45)`,
          }}
        />
      ))}
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (time.ended) {
    return (
      <p className="countdown-message">
        The celebration day is here! <span lang="ar">بارك الله لكما</span>
      </p>
    );
  }

  const units = [
    ["Days", "يوم", time.days],
    ["Hours", "ساعة", time.hours],
    ["Minutes", "دقيقة", time.minutes],
    ["Seconds", "ثانية", time.seconds],
  ];

  return (
    <div className="countdown" aria-label="Time until the wedding">
      {units.map(([label, arabic, value]) => (
        <div className="time-unit" key={label}>
          <span>{String(value).padStart(2, "0")}</span>
          <small>{label}</small>
          <em lang="ar">{arabic}</em>
        </div>
      ))}
    </div>
  );
}

const sprigPoints = [
  [0, 0], [5, -14], [9, -28], [10, -42], [8, -56],
];

function Sprig() {
  return (
    <g fill="url(#goldG)" stroke="none">
      <path
        d="M0 0 C6 -16 12 -36 7 -66"
        fill="none"
        stroke="url(#goldG)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {sprigPoints.map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x - 6} cy={y - 5} rx="3" ry="8" transform={`rotate(-48 ${x - 6} ${y - 5})`} opacity="0.9" />
          <ellipse cx={x + 6} cy={y - 8} rx="3" ry="8" transform={`rotate(48 ${x + 6} ${y - 8})`} opacity="0.75" />
        </g>
      ))}
      <ellipse cx="7" cy="-72" rx="3" ry="8" />
    </g>
  );
}

function Monogram() {
  const arch = "M26 276 V132 C26 84 84 56 120 18 C156 56 214 84 214 132 V276 Z";
  const arch2 = "M36 266 V132 C36 90 88 64 120 32 C152 64 204 90 204 132 V266 Z";
  const pearls = "M47 256 V134 C47 98 92 74 120 50 C148 74 193 98 193 134 V256";

  return (
    <svg className="monogram-svg" viewBox="0 0 240 300" aria-hidden="true">
      <defs>
        <linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3cf9f" />
          <stop offset="0.5" stopColor="#b18b50" />
          <stop offset="1" stopColor="#8a642c" />
        </linearGradient>
        <radialGradient id="glowG" cx="50%" cy="50%" r="55%">
          <stop offset="0" stopColor="#fffdf7" />
          <stop offset="1" stopColor="#f1e7d4" />
        </radialGradient>
      </defs>

      <path d={arch} fill="url(#glowG)" />
      <path className="draw" pathLength="1" d={arch} fill="none" stroke="url(#goldG)" strokeWidth="2.2" />
      <path className="draw d2" pathLength="1" d={arch2} fill="none" stroke="url(#goldG)" strokeWidth="0.8" />
      <path className="fade f1" d={pearls} fill="none" stroke="url(#goldG)" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.1 6" />

      <g className="fade f1" fill="none" stroke="#b18b50" strokeOpacity="0.4" strokeWidth="0.8">
        <rect x="72" y="102" width="96" height="96" />
        <rect x="72" y="102" width="96" height="96" transform="rotate(45 120 150)" />
        <circle cx="120" cy="150" r="52" strokeOpacity="0.3" />
        <circle cx="120" cy="150" r="64" strokeOpacity="0.18" />
      </g>

      <g className="fade f1" fill="url(#goldG)">
        <path d="M120 2 L125 10 L120 18 L115 10 Z" />
        <circle cx="120" cy="26" r="1.6" />
      </g>

      <g className="fade f2" textAnchor="middle" fontFamily="'Pinyon Script', cursive">
        <text className="m-bride" x="92" y="178" fontSize="96">S</text>
        <text className="m-groom" x="150" y="186" fontSize="96">A</text>
        <text className="m-amp" x="121" y="152" fontSize="30">&amp;</text>
      </g>

      <g className="fade f3">
        <path d="M80 222 H110 M130 222 H160" stroke="url(#goldG)" strokeWidth="1" />
        <text x="120" y="226" textAnchor="middle" fontSize="12" fill="#b18b50">♥</text>
      </g>

      <g className="fade f3">
        <g transform="translate(62 258) rotate(-6)"><Sprig /></g>
        <g transform="translate(178 258) rotate(6) scale(-1 1)"><Sprig /></g>
      </g>
    </svg>
  );
}

function Splash({ opened, onOpen, dateShort }) {
  return (
    <div
      className={`splash${opened ? " dissolve" : ""}`}
      role="button"
      tabIndex={opened ? -1 : 0}
      aria-label="Tap to open the invitation"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="splash-inner">
        <Monogram />
        <p className="splash-names">
          <span className="name-bride">{bride}</span>
          <span className="splash-and">&amp;</span>
          <span className="name-groom">{groom}</span>
        </p>
        <Ornament heart />
        <p className="splash-date">{dateShort}</p>
        <p className="splash-hint">Tap to open</p>
      </div>
    </div>
  );
}

function App() {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);

const openInvitation = () => {
    if (opened) return;
    setOpened(true);
    
    // Force the page to start at the top
    window.scrollTo(0, 0);
    
    window.setTimeout(() => setGone(true), 1600);
  };

  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const dateText = weddingDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const weekday = weddingDate.toLocaleDateString("en-IN", {
    weekday: "long",
    timeZone: "Asia/Kolkata",
  });

  const dateShort = weddingDate
    .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Kolkata" })
    .replaceAll("/", " – ");

  return (
    <div className={`page${opened ? " opened" : ""}`}>
      {!gone && (
        <Splash opened={opened} onOpen={openInvitation} dateShort={dateShort} />
      )}
      <Petals />

      <header className="hero" id="home">
        <nav className="nav">
          <a href="#home" className="brand">Swaliha &amp; Asif</a>
          <a href="#details" className="nav-link">The Wedding</a>
        </nav>

        <div className="hero-content">
          <div className="arch">
            <p className="arabic bismillah" lang="ar">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="arabic ayah" lang="ar">وَخَلَقْنَاكُمْ أَزْوَاجًا</p>
            <p className="eyebrow">And we created you in pairs · (Quran 78:8) </p>

            <Ornament />

            <p className="small-script">Together with our families</p>
            <p className="small-script">We joyfully invite you to the wedding of</p>

            <h1>
              <small className="role">Bride <span lang="ar">العروس</span></small>
              <span className="name-bride">{bride}</span>
              <span className="ampersand">&amp;</span>
              <small className="role">Groom <span lang="ar">العريس</span></small>
              <span className="name-groom">{groom}</span>
            </h1>

            <Ornament heart />

            <p className="hero-date">
              {weekday} · 03 – 01 – 2027
            </p>
            <p className="hero-subtitle">{venueName}</p>

            <a href="#countdown" className="primary-button">
              Join Our Celebration ↓
            </a>
          </div>
        </div>

        <div className="hero-bottom" lang="ar">
          بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
        </div>
      </header>

      <main>
        <section className="intro section reveal">
          <p className="eyebrow">Two hearts, one beautiful journey</p>
          <h2>We’re getting married!</h2>
          <p className="arabic dua" lang="ar">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="ref">( Quran 30:21 )</p>
          <p>
            With the love and blessings of our families, we would be
            delighted to have you with us as we begin this new chapter
            together.
          </p>
          <Ornament />
        </section>

        <section className="countdown-section section reveal" id="countdown">
          <p className="eyebrow">Save the date</p>
          <h2>Counting down to forever</h2>
          <p className="date-line">{dateText}</p>
          <Countdown />
        </section>

        <section className="gallery section reveal">
          <p className="eyebrow">Our favourite moments</p>
          <h2>A little glimpse of us</h2>

          <div className="photo-grid">
            <figure className="photo photo-main">
              <img
                src="/images/couple.jpg"
                alt={`${bride} and ${groom}`}
                fetchPriority="high"
              />
              <figcaption>A story written in the stars</figcaption>
            </figure>

            <figure className="photo">
              <img src="/images/photo1.jpg" alt="A special memory" loading="lazy" />
            </figure>

            <figure className="photo">
              <img
                src="/images/photo2.jpg"
                alt="Another favourite memory"
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        <section className="details section reveal" id="details">
          <p className="eyebrow">Please join us</p>
          <h2>The Wedding</h2>

          <div className="detail-card">
            <p className="role">Date <span lang="ar">التاريخ</span></p>
            <h3>{weekday}, {dateText}</h3>
            {timeText && <p>{timeText}</p>}

            <Ornament />

            <p className="role">Venue <span lang="ar">المكان</span></p>
            <h3>{venueName}</h3>
            {venueAddress.map((line) => (
              <p key={line}>{line}</p>
            ))}

            <a
              className="primary-button"
              href={mapLink}
              target="_blank"
              rel="noreferrer"
            >
              View Location ↗
            </a>
          </div>
        </section>

        <section className="closing section reveal">
          <p className="arabic dua" lang="ar">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="small-script">With love,</p>
          <h2>{bride} &amp; {groom}</h2>
          <p>We can’t wait to celebrate with you.</p>
          <Ornament heart />
          <p className="small-script">Best compliments from</p>
          <p className="compliments">Friends &amp; Families</p>
          <a href="#home" className="text-link">Back to the beginning ↑</a>
        </section>
      </main>

      <footer>
        Made with love · {bride} &amp; {groom}
      </footer>
    </div>
  );
}

export default App;