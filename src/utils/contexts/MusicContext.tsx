/**
 * Allows global access to the current music that is being played
 */
import React,{ createContext, useContext, useState } from "react";

type MusicContextType = {
    currentSong: string | null;
    setCurrentSong: (song: string | null) => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
    const [currentSong, setCurrentSong] = useState<string | null>(null);

    return (
        <MusicContext.Provider value={{ currentSong, setCurrentSong }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic(): MusicContextType {
    const context = useContext(MusicContext);

    if (!context) {
        throw new Error("useMusic must be used within MusicProvider");
    }

    return context;
}