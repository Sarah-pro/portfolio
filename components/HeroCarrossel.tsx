'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Slide = {
  src: string;
  alt: string;
  link?: { href: string; label: string; left: number; top: number; width: number; height: number };
};

const slides: Slide[] = [
  {
    src: '/hero/hero-1.jpg',
    alt: 'Seja bem-vindo(a) à Lírea Design.',
  },
  {
    src: '/hero/hero-2.jpg',
    alt: 'A Lírea Design nasceu do desejo de revelar a essência de cada negócio, transformando ideias, valores e propósitos em identidades que comunicam com clareza, despertam conexões e traduzem, em cada detalhe, aquilo que torna uma marca única.',
  },
  {
    src: '/hero/hero-3.jpg',
    alt: 'Sua essência merece ganhar forma. Vamos transformar o que torna seu negócio único em uma marca que conecta, comunica e encanta? Vamos criar juntos?',
    link: { href: '#contato', label: 'Entre em contato', left: 35.5, top: 67.8, width: 29, height: 10 },
  },
];

export default function HeroCarrossel() {
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
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 5000);
    return () => clearInterval(id);
  }, [pausado, reduzir, total]);

  return (
    <div
      className="hc"
      role="group"
      aria-roledescription="carrossel"
      aria-label="Destaques da Lírea Design"
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
        className="hc-janela"
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
          className="hc-trilho"
          style={{
            width: `${total * 100}%`,
            transform: `translateX(-${(atual * 100) / total}%)`,
            transition: reduzir ? 'none' : 'transform 0.6s ease',
          }}
        >
          {slides.map((s, n) => (
            <div
              className="hc-slide"
              key={s.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${n + 1} de ${total}`}
              aria-hidden={n !== atual}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hc-img" src={s.src} alt={s.alt} loading={n === 0 ? 'eager' : 'lazy'} />
              {s.link ? (
                <a
                  className="hc-link"
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

        <button type="button" className="hc-seta hc-esq" onClick={() => ir(atual - 1)} aria-label="Slide anterior">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="hc-seta hc-dir" onClick={() => ir(atual + 1)} aria-label="Próximo slide">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="hc-bolinhas">
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