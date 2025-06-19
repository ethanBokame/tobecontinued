import { useEffect, useState } from "react";
import { X, MoonIcon, SunIcon } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Advantage from "../components/Advantage";
import { Switch } from "../components/animate-ui/base/switch";
import Accordion from "../components/comp-334";

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
                redirectTo: import.meta.env.VITE_BASE_URL + "/home",
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

    // Aller vers l'installation
    const handleScrollToInstallation = () => {
        const installationSection = document.getElementById("installation");
        if (installationSection) {
            installationSection.scrollIntoView({ behavior: "smooth", block: "center"  });
        }
    };

    // Advantages
    const advantages = [
        {
            img: "/undraw_online-video_ecqg.svg",
            title: "Suivi précis",
            description:
                "Pas besoin de te souvenir de là où tu t’es arrêté : on enregistre automatiquement la saison et l’épisode pendant que tu regardes sur l’une des plateformes compatibles.",
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

    // Dark mode
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const darkMode = localStorage.getItem("darkMode");
        if (darkMode == "true") {
            return true;
        } else {
            return false;
        }
    });

    // Changer le thème
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Changer le thème du document
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "true")
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "false")
        }
    }, [isDarkMode]);

    return (
        <div>
            {/* Smoke screen */}
            {isBottomSheetOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black/50"
                    onClick={() => setIsBottomSheetOpen(false)}
                ></div>
            )}

            {/* Navbar */}
            <nav className="flex items-center justify-between lg:gap-3 p-6">
                <div className="flex items-center lg:gap-3">
                    <img src="/logo.png" alt="logo" className="w-12 h-12" />
                    <p className="text-lg mt-2 lg:text-3xl font-bold text-gray-500">
                        ToBe<span className="text-tbc-primary">Continued</span>
                    </p>
                </div>

                <Switch
                    className="ml-auto"
                    checked={isDarkMode}
                    leftIcon={<SunIcon />}
                    rightIcon={<MoonIcon />}
                    onCheckedChange={toggleDarkMode}
                />
            </nav>

            {/* Hero */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between px-8 lg:px-24 pt-4 lg:pt-12 py-12 gap-6 lg:gap-12 bg-[whitesmoke] dark:bg-gray-800">
                <div className="flex flex-col gap-10 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-center lg:text-left text-gray-500 dark:text-white leading-tight">
                        Tu ne sais plus sur quel épisode tu t’étais{" "}
                        <span className="text-tbc-primary">arrêté</span> ?{" "}
                        <br />
                        Nous, <span className="text-tbc-primary">si.</span>
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-4 flex-wrap">
                        <button
                            className="bg-tbc-primary text-white text-lg md:text-xl font-semibold px-6 py-3 rounded-md hover:bg-blue-600 transition"
                            onClick={() => handleScrollToInstallation()}
                        >
                            Commencer
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

            {/* Etapes */}
            <div
                id="installation"
                className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-24 px-8 lg:px-24 py-20 bg-[whitesmoke] dark:bg-gray-800"
            >
                <div className="flex flex-col gap-1 items-baseline">
                    <div className="relative flex items-center justify-center p-5 bg-tbc-primary rounded-full mx-auto">
                        <p className="absolute text-white font-medium">1</p>
                    </div>
                    <p className="text-center w-full">
                        Installer l'extension Chrome
                    </p>
                    <a
                        href="https://chromewebstore.google.com/detail/tobecontinued/ohhjkhjihafelghblpjaonahifiejbll"
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
                    <p 
                        className="text-tbc-primary underline underline-offset-2 mx-auto cursor-pointer"
                        onClick={() => setIsBottomSheetOpen(true)}
                    >
                        Cliquer ici pour vous connecter
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
                    <p className="text-3xl font-medium text-center text-gray-500 dark:text-white">
                        Plateformes prises en charge
                    </p>
                    <div className="flex gap-10 text-center mt-12 justify-center">
                        <div className="flex flex-col items-center">
                            <img
                                src="https://favicone.com/anime-sama.fr?s=256"
                                alt="Logo Anime-sama"
                                className="w-8 h-8 rounded-lg mb-2 mx-auto"
                            />
                            <a href="https://anime-sama.fr/" target="_blank" className="font-medium hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary">
                                Anime-sama
                            </a>
                        </div>
                        <div className="flex flex-col items-center">
                            <img
                                src="https://favicone.com/v6.voiranime.com?s=256"
                                alt="Logo Voiranime"
                                className="w-8 h-8 rounded-lg mb-2 mx-auto"
                            />
                            <a href="https://v6.voiranime.com/" target="_blank" className="font-medium hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary">
                                Voiranime
                            </a>
                        </div>
                        <div className="flex flex-col items-center">
                            <img
                                src="https://favicone.com/papadustream.cash?s=256"
                                alt="Logo Papadustream"
                                className="w-8 h-8 rounded-lg mb-2 mx-auto"
                            />
                            <a href="https://papadustream.cash/" target="_blank" className="font-medium hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary">
                                Papadustream
                            </a>
                        </div>
                        {/* <div className="flex flex-col items-center">
                            <img
                                src="https://favicone.com/xalaflix.io?s=256"
                                alt="Logo Xalaflix"
                                className="w-8 h-8 rounded-lg mb-2 mx-auto"
                            />
                            <a href="https://xalaflix.io/" target="_blank" className="font-medium hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary">
                                Xalaflix
                            </a>
                        </div> */}
                        {/* <div className="flex flex-col items-center">
                            <img
                                src="/neko-sama.png"
                                alt="Logo Neko sama"
                                className="w-8 h-8 rounded-lg mb-2 mx-auto"
                            />
                            <a href="https://neko-sama.fr/" target="_blank" className="font-medium hover:text-tbc-primary hover:underline hover:underline-offset-2 decoration-tbc-primary">
                                Neko sama
                            </a>
                        </div> */}
                    </div>
                </div>
                <div>
                    <p className="text-3xl font-medium text-center text-gray-500 dark:text-white">
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

            <div className="flex flex-col lg:flex-row px-8 lg:px-24 py-12 gap-12 justify-center items-center lg:items-start">
                <div>
                    <p className="text-4xl font-medium mb-3">
                        Questions{" "}
                        <span className="text-tbc-primary">
                            fréquemment posées
                        </span>
                    </p>
                    <p>
                        Des questions ? Tu peux me joindre sur{" "}
                        <a
                            href="https://www.linkedin.com/in/ethan-bokam%C3%A9-0b59a430b"
                            className="text-tbc-primary underline underline-offset-2"
                        >
                            mon linkedin
                        </a>{" "}
                        .
                    </p>
                </div>

                <Accordion />
            </div>

            {/* Footer */}
            <p className="text-gray-500 text-center mb-12 dark:text-white">
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
                    className="fixed bottom-0 z-20 w-full flex flex-col items-baseline gap-2 p-4 bg-white dark:bg-gray-800 rounded-t-lg shadow-lg cursor-pointer"
                    onClick={() => loginWithGoogle()}
                >
                    <X
                        className="ml-auto"
                        onClick={() => setIsBottomSheetOpen(false)}
                    />
                    <div className="flex items-center gap-2 border dark:border-white rounded-lg p-3 mx-auto">
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
