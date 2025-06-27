import {
    Ellipsis,
    TrashIcon,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MenuCard({ changeStateCard }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Ellipsis
                    strokeWidth={2}
                    size={30}
                    className="p-1.5 absolute top-1 right-1 z-20 text-white bg-black/20 rounded-full backdrop-blur cursor-pointer"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer" onClick={() => confirm("Êtes-vous sûr de vouloir supprimer l'élément ?") && changeStateCard()}>
                    <TrashIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                    />
                    Supprimer
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
