import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

export type SocialNetwork = {
  label: string;
  handle: string;
  description: string;
  href: string;
  Icon: IconType;
  cta: string;
  theme: {
    iconBg: string;
    borderColor: string;
    shadowColor: string;
    ctaColor: string;
  };
};

export const SOCIAL_NETWORKS: SocialNetwork[] = [
  {
    label: "Instagram",
    handle: "@probuled.com.br",
    description: "Bastidores, projetos e conteúdo sobre produto e tecnologia.",
    href: "https://www.instagram.com/probuled.com.br/",
    Icon: FaInstagram,
    cta: "Seguir no Instagram",
    theme: {
      iconBg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      borderColor: "#cc2366",
      shadowColor: "rgba(220,39,67,0.14)",
      ctaColor: "#cc2366",
    },
  },
  {
    label: "X",
    handle: "@probuled",
    description: "Pensamentos rápidos sobre software, produto e processo.",
    href: "https://x.com/probuled",
    Icon: FaXTwitter,
    cta: "Seguir no X",
    theme: {
      iconBg: "#000000",
      borderColor: "#000000",
      shadowColor: "rgba(0,0,0,0.12)",
      ctaColor: "#000000",
    },
  },
  {
    label: "LinkedIn",
    handle: "@probuled",
    description: "Cases, artigos e novidades do estúdio.",
    href: "https://www.linkedin.com/in/probuled/",
    Icon: FaLinkedin,
    cta: "Conectar no LinkedIn",
    theme: {
      iconBg: "#0077B5",
      borderColor: "#0077B5",
      shadowColor: "rgba(0,119,181,0.14)",
      ctaColor: "#0077B5",
    },
  },
];
