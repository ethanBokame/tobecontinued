import { ChevronDownIcon, PanelTop } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Platforms() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-4 h-[45px] sm:!rounded-md !rounded-full">
          <PanelTop />
          <span className="hidden sm:block">Plateformes prises en charge</span>
          <ChevronDownIcon className="-me-1 opacity-60" size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
        <DropdownMenuItem>
          <a href="https://anime-sama.fr/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
            <img
              src="https://favicone.com/anime-sama.fr?s=256"
              alt="Animesama"
              className="w-[19px] h-[19px] rounded-sm"
            />
            Anime sama
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="https://papadustream.cash/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
            <img
              src="https://favicone.com/papadustream.cash?s=256"
              alt="Papadustream"
              className="w-[19px] h-[19px] rounded-sm"
            />
            Papadustream
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="https://voiranime.com/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">

            <img
              src="https://favicone.com/voiranime.com?s=256"
              alt="Voiranime"
              className="w-[19px] h-[19px] rounded-sm"
            />
            Voiranime
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="https://voirdrama.org/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
            <img
              src="https://favicone.com/voirdrama.org?s=256"
              alt="Voirdrama"
              className="w-[19px] h-[19px] rounded-sm"  
            />
            Voirdrama
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>  
          <a href="https://empire-stream.shop/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
            <img
              src="https://favicone.com/empire-stream.shop?s=256"
              alt="Empirestream"
              className="w-[19px] h-[19px] rounded-sm"
            />
            Empire stream
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
