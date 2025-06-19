import { useEffect, useState, useRef } from "react";
import { HandHeart, Popcorn } from "lucide-react";
import { MotionEffect } from "../components/animate-ui/effects/motion-effect";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function MainPage() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [elements, setElements] = useState([]);

    // Récupération des informations de base
    useEffect(() => {
        const getUserAndElements = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error) {
                console.error("Erreur Supabase :", error);
                return;
            }

            if (user) {
                setUser(user);

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

                setElements(data);
                console.log("Éléments :", data);
            }
        };

        getUserAndElements();
    }, []);

    return (
        <div>
            <Navbar />

            {elements.length === 0 && (
                <p className="text-xl px-4 text-gray-500 dark:text-white leading-relaxed">
                    Lorsque vous regarderez du contenu sur l'une des plateformes
                    que nous prenons en charge, votre progression sera
                    automatiquement sauvegardée ici.
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
                    </span>
                </p>
            )}

            {elements.length == 0 && (
                <div className="flex flex-col justify-center items-center mt-8">
                    <Popcorn size={140} strokeWidth={0.5} className="text-gray-500 dark:text-white" />
                    <p className="font-medium text-gray-500 dark:text-white">Bon visionnage !🍿</p>
                </div>
            )}

            {elements.length != 0 && (
                <p className="text-xl pl-4 text-gray-500 dark:text-white">
                    Reprenez où vous en étiez {username}
                </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {elements.map((element, index) => (
                    <MotionEffect
                        key={element.id_ev}
                        slide={{
                            direction: "down",
                        }}
                        fade
                        zoom
                        delay={0.5 + index * 0.1}
                    >
                        <Card key={element.id_ev} {...element} />
                    </MotionEffect>
                ))}
            </div>

            <p className="text-gray-500 dark:text-white text-center mb-4 px-4 mt-10">
                Si tu veux soutenir mon travail, boxe dans mon wave 👊🏽
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
