import { useEffect, useState, useRef } from "react";
import { HandHeart, Plus, Minus, Upload } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function MainPage() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState([]);

    useEffect(() => {
        // Récupération de l'utilisateur
        const getUser = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();
            if (user) {
                setUser(user);

                const chaineDeCaracteres = user.user_metadata.name;
                const mots = chaineDeCaracteres.split(" ");
                const premierMot =
                    mots[0].charAt(0).toUpperCase() + mots[0].slice(1);

                setUsername(premierMot);
                console.log("Utilisateur :", user.user_metadata); // ✅ ici, user est bien défini
                window.postMessage({ type: "FROM_WEB_APP", data: user.user_metadata.email }, "*");

            }
            if (error) {
                console.error("Erreur Supabase :", error);
            }
        };
        getUser();

        const getElements = async () => {
            const { data, error } = await supabase
                .from("elements_visionnes")
                .select("*")
                .eq("id_user", user.id);

            if (data) {
                setElements(data);
                console.log("Éléments :", data); // ✅ ici, data est bien défini
            }
        };

        getElements();
    }, []);

    return (
        <div>
            <Navbar />
            <p className="text-xl pl-4 text-gray-500">
                Reprenez où vous en étiez {username}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>

            <p className="text-gray-500 text-center mb-4 px-4 mt-10">
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
