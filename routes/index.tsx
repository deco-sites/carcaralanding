import { defineRoute } from "$fresh/server.ts";
import Header from "../sections/Header.tsx";
import FooterSection, { SimpleBlogPost } from "../sections/FooterSection.tsx";
import ThemeProvider from "../components/ui/ThemeProvider.tsx";
import Layout from "../components/Layout.tsx";
import HeroSection from "../sections/HeroSection.tsx";
import TheFuture from "../sections/TheFuture.tsx";

interface BlogPost {
  slug?: string;
  title?: string;
  excerpt?: string;
  image?: string;
}

// Sample blog posts for demo purposes
const sampleBlogPosts: SimpleBlogPost[] = [
  {
    title: "Livemode cria seu próprio Photoshop com AI",
    slug: "livemode-ai-photoshop",
    excerpt: "Como a Livemode aumentou produtividade de design com AI",
    image: "https://placehold.co/600x400",
  },
  {
    title: "Leroy Merlin substitui 3 ferramentas por 1 com AI Agents",
    slug: "leroy-merlin-ai-tools",
    excerpt: "Case de consolidação de ferramentas com AI",
    image: "https://placehold.co/600x400",
  },
  {
    title: "Época Cosméticos gera relatórios 10x mais rápido",
    slug: "epoca-cosmeticos-relatorios",
    excerpt: "Automação de relatórios com AI",
    image: "https://placehold.co/600x400",
  },
  {
    title: "Casa & Video aumenta tráfego orgânico em 20x",
    slug: "casa-video-trafego-organico",
    excerpt: "Estratégia de SEO potencializada por AI",
    image: "https://placehold.co/600x400",
  },
  {
    title: "Miess reduz tempo de criação de campanhas em 80%",
    slug: "miess-criacao-campanhas",
    excerpt: "Otimização de campanhas com AI",
    image: "https://placehold.co/600x400",
  },
];

export default defineRoute(async (req, ctx) => {
  // Log sample blog posts to verify they have the expected structure
  console.log("Sample blog posts:", sampleBlogPosts);

  return (
    <ThemeProvider>
      <Header />
      <Layout>
        <HeroSection
          title="Aceleramos a <br/>adoção de AI<br/>na sua empresa"
          description="Nossos projetos fazem a ponte entre o desafio de negócio e um AI Agent que dá resultado."
          badge="Mais de 3k AI Apps e Agents criados"
          ctaText="Fale com um especialista"
          ctaHref="/contato"
        />
        <TheFuture />
        {/* Add other sections here */}
      </Layout>
      <FooterSection
        transformationStoriesColumn={{
          title: "Histórias de Transformação",
          links: undefined,
          posts: sampleBlogPosts,
        }}
      />
    </ThemeProvider>
  );
});
