import { LogOut, MoonIcon, SunIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Switch } from "../components/animate-ui/base/switch";
import Platforms from "./comp-367";
import Feedback from "./comp-388";
import { supabase } from "../lib/supabaseClient";

function Navbar() {
    // Déconnexion
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut({ scope: "local" });
        if (!error) {
            window.location.href = "/";
        }
    };

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
            localStorage.setItem("darkMode", "true");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
        }
    }, [isDarkMode]);

    return (
        <div className="flex justify-between items-center p-4">
            
            {/* Logo */}
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => window.location.href = "/home"}>
                <img src="/logo.png" alt="logo" className="w-16 h-16" />
                <p className="hidden sm:block text-2xl font-bold text-gray-500">
                    ToBe<span className="text-tbc-primary">Continued</span>
                </p>
            </div>
            
            {/* Dark mode */}
            <Switch
                className="ml-auto"
                checked={isDarkMode}
                leftIcon={<SunIcon />}
                rightIcon={<MoonIcon />}
                onCheckedChange={toggleDarkMode}
            />
            
            {/* Liste des plateforms prises en charge */}
            <Platforms />

            {/* Feedback */}
            <Feedback />
            
            {/* Déconnexion */}
            <div
                className="flex gap-2 items-center bg-tbc-primary rounded-full lg:rounded-lg p-2.5 shadow-sm text-white ml-4 hover:bg-tbc-primary/70 transition-all duration-200 ease-in-out transform active:scale-95 cursor-pointer"
                onClick={() => {
                    confirm("Êtes-vous sûr de vouloir vous déconnecter ?") &&
                        handleLogout();
                }}
            >
                <LogOut size={21} strokeWidth={2} />
                <span className="font-medium hidden lg:block">Déconnexion</span>
            </div>
        </div>
    );
}

export default Navbar;
