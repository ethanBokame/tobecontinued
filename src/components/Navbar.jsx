import { LogOut, Plus } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

function Navbar() {
    // Déconnexion
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            window.location.href = "/";
        }
    };
    return (
        <div className="flex justify-between items-center p-4">
            <div className="flex gap-2 items-center">
                <img src="/logo.png" alt="logo" className="w-16 h-16" />
                <p className="hidden sm:block text-2xl font-bold text-gray-500">
                    ToBe<span className="text-tbc-primary">Continued</span>
                </p>
            </div>

            {/* <div className="flex gap-2 items-center ml-auto bg-tbc-primary rounded-full lg:rounded-lg p-2 shadow-sm text-white hover:bg-tbc-primary/70 transition-all duration-200 ease-in-out transform active:scale-95 cursor-pointer">
                <Plus size={26} strokeWidth={2} />
                <span className="font-medium hidden lg:block">Ajouter</span>
            </div> */}

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
