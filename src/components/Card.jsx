import { Play, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function Card({
    nom,
    saison,
    episode,
    point_arret,
    url,
    image,
    domain,
    categorie,
}) {
    // const [isDeleted, setIsDeleted] = useState(false); // Pour la visibilité de la card

    // const [deleteStyle, setDeleteStyle] = useState(""); // Pour la visibilité de la card

    // useEffect(() => {
    //     if (isDeleted) {
    //         setDeleteStyle("hidden");
    //     }
    // }, [isDeleted]);

    // Fonction qui retourne un composant <p>
    const categorieStyle = (categorie) => {
        switch (categorie) {
            case "série":
                return (
                    <p className="text-[10px] text-green-500 rounded-xl bg-green-50 dark:bg-green-100 border border-green-500 self-start px-2 py-0.5">
                        série
                    </p>
                );
            case "film":
                return (
                    <p className="text-[10px] text-blue-500 rounded-xl bg-blue-50 dark:bg-blue-100 border border-blue-500 self-start px-2 py-0.5">
                        film
                    </p>
                );
            case "animé":
                return (
                    <p className="text-[10px] text-orange-500 rounded-xl bg-orange-50 dark:bg-orange-100 border border-orange-500 self-start px-2 py-0.5">
                        animé
                    </p>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className={
                "flex flex-col gap-2 rounded-md overflow-hidden shadow-md bg-white dark:bg-gray-800"
            }
        >
            <div className="relative">
                <img
                    src={image || "/logo.png"}
                    alt={nom}
                    className="w-full h-[140px] object-cover"
                />
                <img
                    src={`https://favicone.com/${domain}?s=256`}
                    alt=""
                    className="z-10 absolute bottom-0 left-0 w-5 h-5 ml-1 mb-1 rounded-sm"
                />
                <Ellipsis
                    strokeWidth={2}
                    size={30}
                    className="p-1.5 absolute top-1 right-1 z-20 text-white bg-black/20 rounded-full backdrop-blur cursor-pointer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
            <div className="flex flex-col gap-2 p-2 pt-0">
                <p className="text-lg color-white truncate whitespace-nowrap overflow-hidden text-ellipsis" title={nom}>
                    {nom}
                </p>
                {
                    categorieStyle(categorie)
                }
                <p className="text-sm text-gray-500 dark:text-white">
                    S{saison}:E{episode} 
                    {/* ({point_arret}) */}
                </p>
                <a
                    href={url}
                    target="_blank"
                    className="bg-tbc-primary flex text-white rounded-md px-4 py-2 items-center justify-center gap-2 hover:bg-tbc-primary/70 transition-all duration-200"
                >
                    <Play fill="white" size={18} />
                    <span className="font-medium text-sm">Continuer</span>
                </a>
            </div>
        </div>
    );
}

export default Card;
