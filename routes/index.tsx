import { defineRoute } from "$fresh/server.ts";
import Header from "../sections/Header.tsx";
import FooterSection from "../sections/FooterSection.tsx";
import ThemeProvider from "../components/ui/ThemeProvider.tsx";
import Layout from "../components/Layout.tsx";
import HeroSection from "../sections/HeroSection.tsx";

export default defineRoute(async (req, ctx) => {
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
        {/* Add other sections here */}
      </Layout>
      <FooterSection />
    </ThemeProvider>
  );
});
