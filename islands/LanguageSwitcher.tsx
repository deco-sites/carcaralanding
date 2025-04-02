import { useEffect, useState } from "preact/hooks";
import Button from "../components/ui/Button.tsx";

export default function LanguageSwitcher() {
  // Estado para controlar o idioma atual
  const [currentLanguage, setCurrentLanguage] = useState<string>("pt");

  // Detectar o idioma baseado no path da URL ao carregar
  useEffect(() => {
    const path = globalThis.location.pathname;
    if (path.startsWith("/en")) {
      setCurrentLanguage("en");
    } else {
      setCurrentLanguage("pt");
    }
  }, []);

  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <Button
          variant="ghost"
          size="sm"
          href="/"
          class={`px-2 py-1 min-h-0 flex items-center ${
            currentLanguage === "pt"
              ? "text-black font-bold"
              : "text-ca-50 hover:text-ca-100"
          }`}
          aria-label="Mudar para Português"
        >
          {currentLanguage === "pt" && (
            <div className="w-2 h-2 bg-amarelo rounded-full mr-1.5"></div>
          )}
          PT
        </Button>
      </div>

      <span className="text-ca-50 mx-1">|</span>

      <div className="relative flex items-center">
        <Button
          variant="ghost"
          size="sm"
          href="/en"
          class={`px-2 py-1 min-h-0 flex items-center ${
            currentLanguage === "en"
              ? "text-black font-bold"
              : "text-ca-50 hover:text-ca-100"
          }`}
          aria-label="Change to English"
        >
          {currentLanguage === "en" && (
            <div className="w-2 h-2 bg-amarelo rounded-full mr-1.5"></div>
          )}
          EN
        </Button>
      </div>
    </div>
  );
}
