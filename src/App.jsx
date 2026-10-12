
import { useEffect, useState } from "react";
import "./App.css";

const bride = "Zendaya";
const groom = "Tom Holland";

// IMPORTANT: Change this to the actual engagement date.
// JavaScript months are zero-based: 0 = January, 9 = October.
// This example is 20 December 2026, at 6 PM IST.
const engagementDate = new Date("2026-12-20T18:00:00+05:30");

function getTimeLeft() {
  const difference = engagementDate.getTime() - Date.now();

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
    return <p className="countdown-message">The celebration day is here!</p>;
  }

  const units = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds],
  ];

  return (
    <div className="countdown" aria-label="Time until the engagement">
      {units.map(([label, value]) => (
        <div className="time-unit" key={label}>
          <span>{String(value).padStart(2, "0")}</span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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

  const dateText = engagementDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return (
    <>
      <Petals />

      <header className="hero" id="home">
        <nav className="nav">
          <a href="#home" className="brand">Our Beginning</a>
          <a href="#details" className="nav-link">The Celebration</a>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">A beautiful new chapter begins</p>
          <p className="small-script">Together with our families</p>

          <h1>
            {bride}
            <span className="ampersand">&amp;</span>
            {groom}
          </h1>

          <div className="floral-divider" aria-hidden="true">
            ✿ ❧ ✿
          </div>

          <p className="hero-date">{dateText}</p>
          <p className="hero-subtitle">
            Joyfully inviting you to celebrate our engagement
          </p>

          <a href="#countdown" className="primary-button">
            Join Our Celebration ↓
          </a>
        </div>

        <div className="hero-bottom">A promise of forever</div>
      </header>

      <main>
        <section className="intro section reveal">
          <p className="eyebrow">Two hearts, one beautiful journey</p>
          <h2>We’re getting engaged!</h2>
          <p>
            With the love and blessings of our families, we would be
            delighted to have you with us as we begin this new chapter
            together.
          </p>
          <div className="floral-divider" aria-hidden="true">❀</div>
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
              <img
                src="/images/photo1.jpg"
                alt="A special memory"
                loading="lazy"
              />
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
          <h2>The Engagement</h2>

          <div className="detail-card">
            <span className="detail-icon" aria-hidden="true">❀</span>
            <h3>{dateText}</h3>
            <p>6:00 PM onwards</p>
            <p>Replace this with your venue name</p>
            <p>Enter the full venue address here</p>

            <a
              className="primary-button"
              href="https://maps.google.com/"
              target="_blank"
              rel="noreferrer"
            >
              View Location ↗
            </a>
          </div>
        </section>

        <section className="closing section reveal">
          <p className="small-script">With love,</p>
          <h2>{bride} &amp; {groom}</h2>
          <p>We can’t wait to celebrate with you.</p>
          <a href="#home" className="text-link">Back to the beginning ↑</a>
        </section>
      </main>

      <footer>
        Made with love · {bride} &amp; {groom}
      </footer>
    </>
  );
}

export default App;
