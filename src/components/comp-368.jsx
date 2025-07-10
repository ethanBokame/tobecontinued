import { Ellipsis, TrashIcon, CircleCheckBig, CircleX } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MenuCard({ changeDeleteCard, changeStatusCard, statusCard }) {
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
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                        confirm(
                            "Êtes-vous sûr de vouloir supprimer l'élément ?"
                        ) && changeDeleteCard()
                    }
                >
                    <TrashIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                    />
                    Supprimer
                </DropdownMenuItem>
                {statusCard === "not finished" && (
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => changeStatusCard()}
                    >
                        <CircleCheckBig size={16} className="text-green-500" />
                        Marquer comme terminé
                    </DropdownMenuItem>
                )}
                {statusCard === "finished" && (
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => changeStatusCard()}
                    >
                        <CircleX size={16} className="opacity-60" />
                        Marquer comme pas encore terminé
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
