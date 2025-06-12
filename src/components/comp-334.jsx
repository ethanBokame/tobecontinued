import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    id: "1",
    title: "Le suivi est-il possible sur toutes les plateformes de streaming ?",
    content:
      "Non, nous ne prenons en charge que les plateformes de streaming listées ci-dessus. Les plateformes comme Netflix, Amazon Prime Video ou encore Disney+ possèdent leurs propres systèmes de suivi. Nous nous concentrons sur celles qui n’en ont pas.",
  },
  {
    id: "2",
    title: "Le suivi fonctionne-t-il si je regarde mes séries sur mon téléphone ?",
    content:
      "Non, nous ne prenons pas en charge le suivi sur mobile, en raison de l’indisponibilité des extensions sur les navigateurs pour smartphones. Cependant, vous pouvez consulter la progression de vos contenus visionnés sur le site, même depuis votre téléphone.",
  },
  {
    id: "3",
    title: "Dois-je créer un compte pour suivre ma progression ?",
    content:
      "Oui, un compte est nécessaire afin de synchroniser votre progression entre vos différents appareils et assurer une sauvegarde fiable de vos données.",
  },
  {
    id: "4",
    title: "Que se passe-t-il si je change d'ordinateur ou de navigateur ?",
    content:
      "Tant que vous êtes connecté à votre compte, votre progression est automatiquement synchronisée. Vous pouvez reprendre là où vous vous êtes arrêté, sans rien perdre.",
  },
  {
    id: "5",
    title: "Comment détectez-vous les épisodes que je regarde ?",
    content:
      "L'extension analyse le contenu de la page de streaming pour identifier le nom de la série, la saison, l’épisode et le temps de visionnage. Cela se fait localement sans compromettre votre vie privée.",
  },
  {
    id: "6",
    title: "Ma progression est-elle enregistrée automatiquement ?",
    content:
      "Oui, dès que vous atteignez la fin d’un épisode ou que vous quittez la page, l’extension enregistre automatiquement votre progression.",
  },
  {
    id: "7",
    title: "Puis-je modifier manuellement ma progression ?",
    content:
      "Absolument. Une section dédiée sur votre compte vous permet de corriger ou mettre à jour manuellement l’épisode ou la saison en cours.",
  },
  {
    id: "8",
    title: "L’extension fonctionne-t-elle en navigation privée ?",
    content:
      "Non, les extensions ne sont pas actives par défaut en mode navigation privée. Vous pouvez l’activer manuellement dans les paramètres de votre navigateur, mais certaines fonctionnalités comme la sauvegarde automatique pourraient être limitées.",
  },
  
]

export default function Component() {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full sm:w-[550px]">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionTrigger className="py-2 text-lg font-semibold leading-6 hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-black text-base pb-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
