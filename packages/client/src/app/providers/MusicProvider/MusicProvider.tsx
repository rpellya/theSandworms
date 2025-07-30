import { createContext, useContext, useEffect, useRef, useState } from 'react';

const MusicCtx = createContext<{
    playing: boolean;
    toggle: () => void;
} | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);

    // 1) создаём Audio только один раз
    useEffect(() => {
        audioRef.current = new Audio('/music/bg.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
    }, []);

    // 2) реагируем на переключение
    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;

        playing ? a.play().catch(console.error) : a.pause();
    }, [playing]);

    return (
        <MusicCtx.Provider
            value={{ playing, toggle: () => setPlaying((p) => !p) }}
        >
            {children}
        </MusicCtx.Provider>
    );
};

// удобный хук
export function useMusic() {
    const ctx = useContext(MusicCtx);
    if (!ctx) throw new Error('useMusic must be used inside <MusicProvider>');
    return ctx;
}
