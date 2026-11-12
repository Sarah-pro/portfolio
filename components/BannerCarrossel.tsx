'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Slide = {
  src: string;
  alt: string;
  link?: { href: string; label: string; left: number; top: number; width: number; height: number };
};

const slides: Slide[] = [
  {
    src: '/banner-criar.jpg',
    alt: 'Criar é o que me move. Eu amo criar, e cada projeto nasce com significado. Criatividade, ideias, comunicação, pessoas.',
  },
  {
    src: '/banner-conversar.jpg',
    alt: 'Vamos criar algo extraordinário? Sua marca tem uma essência. Vamos transformá-la em presença. Projetos singulares começam com boas ideias, conversas genuínas e o olhar certo para o que torna cada negócio único. Vamos construir juntos uma marca que comunique seu valor, expresse sua identidade e permaneça na memória.',
    link: { href: '#contato', label: 'Vamos conversar', left: 60, top: 63.9, width: 35.4, height: 12 },
  },
];

export default function BannerCarrossel() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [reduzir, setReduzir] = useState(false);
  const inicioX = useRef<number | null>(null);
  const total = slides.length;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduzir(mq.matches);
    const aoMudar = () => setReduzir(mq.matches);
    mq.addEventListener('change', aoMudar);
    return () => mq.removeEventListener('change', aoMudar);
  }, []);

  const ir = useCallback(
    (n: number) => setAtual(((n % total) + total) % total),
    [total]
  );

  useEffect(() => {
    if (pausado || reduzir) return;
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 6000);
    return () => clearInterval(id);
  }, [pausado, reduzir, total]);

  return (
    <div
      className="bn"
      role="group"
      aria-roledescription="carrossel"
      aria-label="Mensagens da Lírea Design"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') ir(atual - 1);
        if (e.key === 'ArrowRight') ir(atual + 1);
      }}
    >
      <div
        className="bn-janela"
        onTouchStart={(e) => {
          setPausado(true);
          inicioX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          setPausado(false);
          if (inicioX.current === null) return;
          const dx = e.changedTouches[0].clientX - inicioX.current;
          if (Math.abs(dx) > 40) ir(atual + (dx < 0 ? 1 : -1));
          inicioX.current = null;
        }}
      >
        <div
          className="bn-trilho"
          style={{
            width: `${total * 100}%`,
            transform: `translateX(-${(atual * 100) / total}%)`,
            transition: reduzir ? 'none' : 'transform 0.6s ease',
          }}
        >
          {slides.map((s, n) => (
            <div
              className="bn-slide"
              key={s.src}
              style={{ flex: `0 0 ${100 / total}%` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${n + 1} de ${total}`}
              aria-hidden={n !== atual}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="bn-img" src={s.src} alt={s.alt} loading="lazy" />
              {s.link ? (
                <a
                  className="bn-link"
                  href={s.link.href}
                  aria-label={s.link.label}
                  tabIndex={n === atual ? 0 : -1}
                  style={{
                    left: `${s.link.left}%`,
                    top: `${s.link.top}%`,
                    width: `${s.link.width}%`,
                    height: `${s.link.height}%`,
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>

        <button type="button" className="bn-seta bn-esq" onClick={() => ir(atual - 1)} aria-label="Slide anterior">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="bn-seta bn-dir" onClick={() => ir(atual + 1)} aria-label="Próximo slide">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="bn-bolinhas">
        {slides.map((s, n) => (
          <button
            key={s.src}
            type="button"
            className={n === atual ? 'on' : ''}
            onClick={() => ir(n)}
            aria-label={`Ir para o slide ${n + 1}`}
            aria-current={n === atual}
          />
        ))}
      </div>
    </div>
  );
}