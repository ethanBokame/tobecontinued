import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Advantage from "../components/Advantage";
import SmokeScreen from "../components/SmokeScreen";

function LandingPage() {
    // Middleware pour vérifier si l'utilisateur est connecté et le rediriger vers la page home si oui
    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                window.location.href = "/home";
            }
        });
    }, []);

    // Connexion avec Google
    async function loginWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:5173/home",
            },
        });
    }

    // Ouverture du bottom sheet
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    // Bloquer le scroll
    useEffect(() => {
        if (isBottomSheetOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });

    // Advantages
    const advantages = [
        {
            img: "/undraw_online-video_ecqg.svg",
            title: "Suivi précis",
            description:
                "Nous gardons automatiquement en mémoire la saison, l’épisode et même la minute précise où tu t’es arrêté.",
        },
        {
            img: "/undraw_devices_odm4.svg",
            title: "Multi-appareils",
            description:
                "Retrouve ta progression sur smartphone, tablette ou ordinateur.",
        },
        {
            img: "/undraw_video-streaming_cckz.svg",
            title: "Historique et reprise rapide",
            description:
                "Garder un historique clair pour reprendre tes visionnages même après longtemps.",
        },
    ];

    return (
        <div>
            {/* Smoke screen */}
            {isBottomSheetOpen && (
                <div
                    className="fixed inset-0 bg-black/50"
                    onClick={() => setIsBottomSheetOpen(false)}
                ></div>
            )}

            {/* Navbar */}
            <nav className="flex items-center lg:gap-3 p-6">
                <img src="/logo.png" alt="logo" className="w-12 h-12" />
                <p className="text-lg mt-2 lg:text-3xl font-bold text-gray-500">
                    ToBe<span className="text-tbc-primary">Continued</span>
                </p>
            </nav>

            {/* Hero */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between px-8 lg:px-24 pt-4 lg:pt-12 py-12 gap-6 lg:gap-12 bg-[whitesmoke]">
                <div className="flex flex-col gap-10 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-center lg:text-left text-gray-500 leading-tight">
                        Tu ne sais plus sur quel épisode tu t’étais{" "}
                        <span className="text-tbc-primary">arrêté</span> ?{" "}
                        <br />
                        Nous, <span className="text-tbc-primary">si.</span>
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-4 flex-wrap">
                        <button
                            className="bg-tbc-primary text-white text-lg md:text-xl font-semibold px-6 py-3 rounded-md hover:bg-blue-600 transition"
                            onClick={() => setIsBottomSheetOpen(true)}
                        >
                            Se connecter
                        </button>
                        <button className="bg-tbc-secondary text-white text-lg md:text-xl font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition">
                            Voir un exemple
                        </button>
                    </div>
                </div>

                {/* Image */}
                <div className="shrink-0">
                    <img
                        src="/logo.png"
                        alt="illustration"
                        className="w-52 md:w-64 h-auto"
                    />
                </div>
            </div>

            {/* Advantages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 px-8 lg:px-24 py-12 gap-12 text-center">
                {advantages.map((advantage, index) => (
                    <Advantage key={index} {...advantage} />
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-24 px-8 lg:px-24 py-12 bg-[whitesmoke]">
                <div className="flex flex-col gap-1 items-baseline">
                    <div className="relative flex items-center justify-center p-5 bg-tbc-primary rounded-full mx-auto">
                        <p className="absolute text-white font-medium">1</p>
                    </div>
                    <p className="text-center w-full">
                        Installer l'extension Chrome
                    </p>
                    <a
                        href=""
                        target="blank"
                        className="text-tbc-primary underline underline-offset-2 mx-auto"
                    >
                        Cliquer ici pour l'installer
                    </a>
                </div>

                <div className="flex flex-col gap-1 items-baseline">
                    <div className="relative flex items-center justify-center p-5 bg-tbc-primary rounded-full mx-auto">
                        <p className="absolute text-white font-medium">2</p>
                    </div>
                    <p className="text-center w-full">
                        Se connecter sur le site web
                    </p>
                </div>

                <div className="flex flex-col gap-2 items-baseline">
                    <div className="relative flex items-center justify-center p-5 bg-tbc-primary rounded-full mx-auto">
                        <p className="absolute text-white font-medium">3</p>
                    </div>
                    <p className="text-center w-full">
                        Profitez pleinement de votre expérience sur vos
                        différents sites de streaming :)
                    </p>
                </div>
            </div>

            <div className="flex flex-col px-8 gap-16 lg:px-24 py-12">
                <div>
                    <p className="text-3xl font-medium text-center text-gray-500">
                        Plateformes prises en charge
                    </p>
                    <div className="grid grid-cols-3 lg:grid-cols-5 gap-5 mt-12">
                        <div>
                            <img
                                src="https://favicone.com/anime-sama.fr?s=256"
                                alt=""
                                className="w-8 h-8 rounded-lg mb-2 mx-auto"
                            />
                            <p className="text-center font-medium">
                                Anime-sama
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://favicone.com/v6.voiranime.com?s=256"
                                alt=""
                                className="w-8 h-8 rounded-lg mb-2 mx-auto"
                            />
                            <p className="text-center font-medium">Voiranime</p>
                        </div>
                        <div>
                            <img
                                src="https://favicone.com/papadustream.cash?s=256"
                                alt=""
                                className="w-8 h-8 rounded-lg mb-2 mx-auto"
                            />
                            <p className="text-center font-medium">
                                Papadustream
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://favicone.com/xalaflix.io?s=256"
                                alt=""
                                className="w-8 h-8 rounded-lg mb-2 mx-auto"
                            />
                            <p className="text-center font-medium">Xalaflix</p>
                        </div>
                        <div>
                            <img
                                src="/neko-sama.png"
                                alt=""
                                className="w-8 h-8 rounded-lg mb-2 mx-auto"
                            />
                            <p className="text-center font-medium">Neko sama</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-3xl font-medium text-center text-gray-500">
                        Navigateurs compatibles
                    </p>

                    <div className="flex items-center justify-center gap-5 mt-8">
                        <img src="/chrome.png" className="h-12 w-12" alt="" />
                        <img src="/edge.png" className="h-12 w-12" alt="" />
                        <img src="/opera.png" className="h-12 w-12" alt="" />
                        <img src="/brave.png" className="h-12 w-12" alt="" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <p className="text-gray-500 text-center mb-12">
                Une réalisation de{" "}
                <a
                    href="https://www.linkedin.com/in/ethan-bokamé-0b59a430b"
                    target="_blank"
                    className="text-tbc-primary underline underline-offset-2"
                >
                    Ethan Bokamé
                </a>{" "}
                Production
            </p>

            {isBottomSheetOpen && (
                <div
                    className="fixed bottom-0 w-full flex flex-col items-baseline gap-2 p-4 bg-white rounded-t-lg shadow-lg"
                    onClick={() => loginWithGoogle()}
                >
                    <X
                        className="ml-auto"
                        onClick={() => setIsBottomSheetOpen(false)}
                    />
                    <div className="flex items-center gap-2 border rounded-lg p-3 mx-auto">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            version="1.1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 48 48"
                            enable-background="new 0 0 48 48"
                            height="1.5em"
                            width="1.5em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                            <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                            ></path>
                            <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                            ></path>
                            <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                        </svg>
                        <p>Continuer avec Google</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
