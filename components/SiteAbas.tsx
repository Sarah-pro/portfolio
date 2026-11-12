'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Vista = 'inicio' | 'sobre' | 'projetos' | 'contato';

const abas: { id: Vista; rotulo: string }[] = [
  { id: 'inicio', rotulo: 'Início' },
  { id: 'sobre', rotulo: 'Sobre mim' },
  { id: 'projetos', rotulo: 'Projetos' },
  { id: 'contato', rotulo: 'Contato' },
];

function lerHash(): Vista {
  const h = window.location.hash.replace('#', '');
  if (h === 'sobre' || h === 'projetos' || h === 'contato') return h;
  return 'inicio';
}

type Props = {
  inicio: ReactNode;
  sobre: ReactNode;
  projetos: ReactNode;
  contato: ReactNode;
};

export default function SiteAbas({ inicio, sobre, projetos, contato }: Props) {
  const [vista, setVista] = useState<Vista>('inicio');
  const principal = useRef<HTMLElement>(null);

  useEffect(() => {
    setVista(lerHash());
    const aoMudar = () => {
      setVista(lerHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
      principal.current?.focus({ preventScroll: true });
    };
    window.addEventListener('hashchange', aoMudar);
    return () => window.removeEventListener('hashchange', aoMudar);
  }, []);

  const conteudo = { inicio, sobre, projetos, contato }[vista];

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <a href="#inicio" className="logo" aria-label="Lírea Design, página inicial">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Lírea Design" />
          </a>
          <nav aria-label="Principal">
            <ul>
              {abas.map((a) => (
                <li key={a.id}>
                  <a href={`#${a.id}`} aria-current={vista === a.id ? 'page' : undefined}>
                    {a.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main key={vista} ref={principal} tabIndex={-1} className="vista">
        {conteudo}
      </main>
    </>
  );
}