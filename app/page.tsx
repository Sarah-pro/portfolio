import { projetos } from "@/lib/projetos";
import { getArquivos } from "@/lib/arquivos";
import ProjetosCarrossel from "@/components/ProjetosCarrossel";
import CarrosselCelular from "@/components/CarrosselCelular";
import HeroCarrossel from "@/components/HeroCarrossel";
import BannerCarrossel from "@/components/BannerCarrossel";
import SiteAbas from "@/components/SiteAbas";

const servicos = [
  { t: "Identidade visual", d: "Logotipo, paleta, tipografia e padrões que dão rosto à sua marca." },
  { t: "Estratégia de marca", d: "Posicionamento e narrativa para crescer com autenticidade." },
  { t: "Design de conteúdo", d: "Peças e templates que mantêm sua marca consistente nas redes." },
];

export default function Home() {
  const inicio = (
    <>
      <div className="hero">
        <h1 className="so-leitor">Lírea Design: marcas autorais que unem estratégia, arte e sensibilidade.</h1>
        <HeroCarrossel />
      </div>

      <section className="servicos" aria-labelledby="titulo-servicos">
        <div className="wrap">
          <h2 className="titulo-secao" id="titulo-servicos">Serviços</h2>
          <div className="grade">
            {servicos.map((s) => (
              <div key={s.t}><h3>{s.t}</h3><p>{s.d}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const sobre = (
    <>
      <section className="manifesto" style={{ marginTop: 96 }}>
        <div className="wrap">
          <h2>Acreditamos que uma marca bonita nasce de uma marca verdadeira.</h2>
          <p>Cada projeto começa ouvindo a história de quem está por trás do negócio. Depois, transformamos essa história em identidade, linguagem e imagem.</p>
        </div>
      </section>

      <section className="sobre-secao" aria-labelledby="titulo-sobre">
        <h2 className="so-leitor" id="titulo-sobre">Sobre mim</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sobre-mim.jpg"
          alt="Criar é descobrir novas formas de ver o mundo. Olá, eu sou a Sarah, tenho 20 anos e estou me formando em produção multimídia, sou a fundadora da Lírea Design, empresa de design e marketing digital. Sou criativa, comunicativa e empática. Adoro ouvir histórias e conhecer cada pessoa. Desejo transmitir a essência de cada marca por meio do meu trabalho e trazer belas e memoráveis soluções visuais. Sou de São Paulo, tenho 3 gatas, sou fluente em inglês e adoro ouvir pop e rock. Minhas habilidades. Ferramentas: Illustrator, Photoshop, After Effects, Excel, Word, Premiere, InDesign, Figma, PowerPoint e Canva. Idiomas: português, inglês e espanhol. Áreas de atuação: design gráfico, branding design, design de conteúdo, social media, marketing digital e UX UI design."
        />
      </section>
    </>
  );

  const projetosVista = (
    <>
      <section aria-labelledby="titulo-projetos">
        <div className="wrap">
          <h2 className="titulo-secao" id="titulo-projetos">Projetos</h2>
          <ProjetosCarrossel
            itens={projetos.map((p) => {
              const a = getArquivos(p.slug);
              return {
                slug: p.slug,
                titulo: p.titulo,
                categoria: p.categoria,
                cor: p.cor,
                capa: a.imagens[0]?.url ?? null,
                capaPdf: a.pdfs[0]?.url ?? null,
                capaVideo: a.videos[0]?.url ?? null,
              };
            })}
          />
        </div>
      </section>

      <section className="cel-secao" aria-labelledby="titulo-carrosseis">
        <div className="wrap">
          <h2 className="titulo-secao" id="titulo-carrosseis">Design de Conteúdo</h2>
          <p className="cel-rotulo">Carrosséis</p>
          <div className="cel-grade">
            {getArquivos("carrosseis").imagens.map((img, n) => (
              <CarrosselCelular key={img.url} src={img.url} alt={`Carrossel ${n + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Mensagens da Lírea Design">
        <BannerCarrossel />
      </section>
    </>
  );

  const contato = (
    <>
      <div className="faixa" role="presentation" />

      <section className="contato" aria-labelledby="titulo-contato">
        <div className="wrap">
          <h2 id="titulo-contato">Vamos criar a sua marca?</h2>
          <p>Conte um pouco sobre o seu negócio e eu respondo em até 2 dias úteis.</p>
          <a className="botao" href="mailto:sarahhsantos2026@gmail.com">Enviar e-mail</a>
          <p className="redes">
            <a href="https://www.instagram.com/lirea.design/" target="_blank" rel="noopener noreferrer">Instagram</a>{" · "}
            <a href="https://www.linkedin.com/in/sarah-santossilva/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </div>
      </section>
    </>
  );

  return (
    <>
      <SiteAbas inicio={inicio} sobre={sobre} projetos={projetosVista} contato={contato} />

      <footer>
        <div className="wrap">
          <span>
            <a href="mailto:sarahhsantos2026@gmail.com">E-mail</a>{" · "}
            <a href="https://www.instagram.com/lirea.design/" target="_blank" rel="noopener noreferrer">Instagram</a>{" · "}
            <a href="https://www.linkedin.com/in/sarah-santossilva/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </span>
          <span>© 2026 Todos os direitos reservados</span>
        </div>
      </footer>
    </>
  );
}