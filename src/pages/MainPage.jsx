import { useEffect, useState, useRef, use } from "react";
import { HandHeart, Popcorn } from "lucide-react";
import { MotionEffect } from "../components/animate-ui/effects/motion-effect";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function MainPage() {
    // Utilisateur
    const [username, setUsername] = useState("");
    const [fullUsername, setFullUsername] = useState("");

    // Eléments
    const [elements, setElements] = useState([]);

    // Eléments filtrés
    const [elementsFiltered, setElementsFiltered] = useState([]);

    // Chargement
    const [isLoading, setIsLoading] = useState(true);
    // const [isLoading, setIsLoading] = useState(false);

    // Clé de filtrage
    const [filterKey, setFilterKey] = useState(
        localStorage.getItem("filterKey") || "all"
    );

    useEffect(() => {

        // Récupération des informations de base (utilisateur et éléments visionnés)
        const getUserAndElements = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error) {
                window.location.href = "/";
                return;
            }

            if (user) {
                // Récupération du nom d'utilisateur
                setFullUsername(user.user_metadata.name);
                const chaineDeCaracteres = user.user_metadata.name;
                const mots = chaineDeCaracteres.split(" ");
                const premierMot =
                    mots[0].charAt(0).toUpperCase() + mots[0].slice(1);
                setUsername(premierMot);

                console.log("Utilisateur :", user);
                window.postMessage(
                    { type: "FROM_WEB_APP", data: user.id },
                    "*"
                );

                const delay = new Promise((res) => setTimeout(res, 2000));

                // Appel ici, quand user est bien défini
                const { data, error: elementsError } = await supabase
                    .from("elements_visionnes")
                    .select("*")
                    .eq("id_user", user.id)
                    .order("date_maj", { ascending: false });

                if (elementsError) {
                    console.error(
                        "Erreur récupération éléments :",
                        elementsError
                    );
                    return;
                }

                // attendre à la fois le chargement de Supabase ET le délai visuel
                await delay;

                setElements(data);
                setElementsFiltered(() => {
                    if (filterKey === "all") {
                        return data;
                    } else {
                        return data.filter(
                            (element) => element.status === filterKey
                        );
                    }
                });
                setIsLoading(false);
                console.log("Éléments :", data);
            }
        };
        
        getUserAndElements();
    }, []);

    // Ajout de la consultation de la page en DB
    useEffect(() => {

        const addPageConsultation = async () => {
            if (!username) return; // attend que le nom soit défini

            const { error } = await supabase
                .from("page_visited")
                .insert([{ username }]);

            if (error) {
                console.error("Erreur insertion page_visited:", error.message);
            }
        };

        addPageConsultation();
    }, [fullUsername]);

    // Délai de l'animation
    const [delay, setDelay] = useState(0.5);

    // Filtrage des éléments
    useEffect(() => {
        // Délai de l'animation
        setDelay(0.1);

        // Sauvegarde la clé de filtrage dans le localStorage
        localStorage.setItem("filterKey", filterKey);

        if (filterKey === "all") {
            setElementsFiltered(elements);
        } else {
            setElementsFiltered(() => {
                const filteredElements = elements.filter(
                    (element) => element.status === filterKey
                );
                return filteredElements;
            });
        }
    }, [elements, filterKey]);

    // Modification du statut dans la vue
    const changeStatusInView = (id_ev, newStatus) => {

        setTimeout(() => {
            setElements(prev => 
                prev.map(el => 
                    el.id_ev === id_ev ? { ...el, status: newStatus } : el
                )
            );
        }, 1000);

    };

    const handleDelete = (id_ev) => {
        setElements(prev => 
            prev.filter(el => el.id_ev !== id_ev)
        );
    }

    return (
        <div>
            <Navbar />

            {/* Ecran de chargement */}

            {isLoading && (
                <div className="absolute inset-0 z-20 bg-white dark:bg-black flex flex-col justify-center items-center">
                    <img
                        src="luffy-gear-5.gif" // mets ici le bon chemin
                        alt="Chargement"
                        className="w-32 h-32 mb-4"
                    />
                    <p className="font-pixel text-lg text-gray-700 dark:text-white animate-pulse">
                        Chargement...
                    </p>
                </div>
            )}

            {!isLoading && elements.length === 0 && (
                <div>
                    <p className="text-xl px-4 text-gray-500 dark:text-white leading-relaxed">
                        Lorsque vous regardez du contenu sur l’une des
                        plateformes que nous prenons en charge, votre
                        progression est automatiquement sauvegardée ici lorsque
                        vous fermez l’onglet de la plateforme de streaming.
                        <br />
                        <span className="text-sm text-gray-400 dark:text-white mt-2 block">
                            Plateformes prises en charge :{" "}
                            <a
                                href="https://anime-sama.fr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary"
                            >
                                Anime-sama
                            </a>
                            ,{" "}
                            <a
                                href="https://papadustream.cash"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary"
                            >
                                Papadustream
                            </a>
                            ,{" "}
                            <a
                                href="https://v6.voiranime.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary"
                            >
                                Voiranime
                            </a>
                            ,{" "}
                            <a
                                href="https://voirdrama.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary"
                            >
                                Voirdrama
                            </a>
                            ,{" "}
                            <a
                                href="https://empire-stream.shop"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary"
                            >
                                Empire stream
                            </a>
                            ,{" "}
                            <a
                                href="https://hurawatch.cc/home"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary"
                            >
                                Hurawatch
                            </a>
                        </span>
                    </p>
                    <div className="flex flex-col justify-center items-center mt-8">
                        <Popcorn
                            size={140}
                            strokeWidth={0.5}
                            className="text-gray-500 dark:text-white"
                        />
                        <p className="font-medium text-gray-500 dark:text-white">
                            Bon visionnage !🍿
                        </p>
                    </div>
                </div>
            )}

            {!isLoading && elements.length != 0 && (
                <div className="flex flex-col gap-2 lg:gap-4 lg:flex-row lg:items-center justify-between">
                    <p className="text-xl px-4 text-gray-500 dark:text-white">
                        Reprenez où vous en étiez {username}
                    </p>
                    <div className="flex flex-row gap-2 px-4">
                        <button
                            className={`cursor-pointer px-2.5 py-1 lg:px-2 lg:py-0.5 rounded-full bg-tbc-primary text-white text-[11px] lg:hover:bg-tbc-primary/60 lg:transition-all lg:duration-100 ${
                                filterKey === "not finished"
                                    ? "bg-tbc-primary/60"
                                    : ""
                            }`}
                            onClick={() => setFilterKey("not finished")}
                        >
                            Pas encore terminés
                        </button>
                        <button
                            className={`cursor-pointer px-2.5 py-1 lg:px-2 lg:py-0.5 rounded-full bg-tbc-primary text-white text-[11px] lg:hover:bg-tbc-primary/60 lg:transition-all lg:duration-100 ${
                                filterKey === "finished"
                                    ? "bg-tbc-primary/60"
                                    : ""
                            }`}
                            onClick={() => setFilterKey("finished")}
                        >
                            Terminés
                        </button>
                        <button
                            className={`cursor-pointer px-2.5 py-1 lg:px-2 lg:py-0.5 rounded-full bg-tbc-primary text-white text-[11px] lg:hover:bg-tbc-primary/60 lg:transition-all lg:duration-100 ${
                                filterKey === "all" ? "bg-tbc-primary/60" : ""
                            }`}
                            onClick={() => setFilterKey("all")}
                        >
                            Tous
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {elementsFiltered.map((element, index) => (
                    <MotionEffect
                        key={`${filterKey}-${element.id_ev}`} // 👈 clé combinée pour forcer l’animation}
                        id={element.id_ev}
                        slide={{
                            direction: "down",
                        }}
                        fade
                        zoom
                        delay={delay + index * 0.1}
                    >
                        <Card key={element.id_ev} {...element} changeStatusInView={changeStatusInView} handleDelete={handleDelete} />
                    </MotionEffect>
                ))}
            </div>

            {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <Card
                id_ev={1}
                nom="Breaking Bad"
                saison={2}
                episode={5}
                point_arret="25:00"
                url="https://example.com/breakingbad"
                image="https://m.media-amazon.com/images/I/81r+LN-9u2L._AC_SY679_.jpg"
                domain="example.com"
                categorie="série"
                status="not finished"
            />
                        <Card
                id_ev={2}
                nom="Breaking Bad"
                saison={2}
                episode={5}
                point_arret="25:00"
                url="https://example.com/breakingbad"
                image="https://m.media-amazon.com/images/I/81r+LN-9u2L._AC_SY679_.jpg"
                domain="example.com"
                categorie="série"
                    status="finished"
            />
            </div> */}

            <p className="text-gray-500 text-sm dark:text-white text-center mb-4 px-4 mt-10">
                Si tu veux soutenir mon travail, boxe dans mon wave 👊🏽
                <br />
                Et n'hésite pas à partager l'app avec un de tes potes fan de pop
                culture comme toi🙌
            </p>

            <center>
                <a
                    href="https://pay.wave.com/m/M_ci_u9CNlp9iSkXF/c/ci/"
                    target="_blank"
                    className="inline-flex justify-center items-center gap-2 mb-10 border border-tbc-primary text-tbc-primary px-4 py-2 rounded-md text-center hover:bg-tbc-primary hover:text-white transition-all duration-300"
                >
                    <img
                        src="/wave.jpg"
                        alt=""
                        className="w-5 h-5 rounded-sm"
                    />
                    <span className="font-medium">Donner</span>
                    <HandHeart size={20} />
                </a>
            </center>
        </div>
    );
}

export default MainPage;
