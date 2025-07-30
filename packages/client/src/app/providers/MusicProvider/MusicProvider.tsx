import { createContext, useContext, useEffect, useRef, useState } from 'react';

const playlist = [
    '/music/bg1.mp3',
    '/music/bg2.mp3',
    '/music/bg3.mp3',
] as const;

type Ctx = {
    playing: boolean;
    play: () => void;
    toggle: () => void;
    next: () => void;
    prev: () => void;
};
const MusicCtx = createContext<Ctx | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio(playlist[0]);
        audioRef.current.volume = 0.5;
    }, []);

    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;

        a.src = playlist[index];
        if (playing) a.play().catch(console.error);

        const onEnded = () => setIndex((i) => (i + 1) % playlist.length);
        a.addEventListener('ended', onEnded);
        return () => a.removeEventListener('ended', onEnded);
    }, [index, playing]);

    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;
        playing ? a.play().catch(console.error) : a.pause();
    }, [playing]);

    const play = () => setPlaying(true);
    const toggle = () => setPlaying((p) => !p);
    const next = () => setIndex((i) => (i + 1) % playlist.length);
    const prev = () =>
        setIndex((i) => (i - 1 + playlist.length) % playlist.length);

    return (
        <MusicCtx.Provider value={{ playing, play, toggle, next, prev }}>
            {children}
        </MusicCtx.Provider>
    );
};

export const useMusic = () => {
    const ctx = useContext(MusicCtx);
    if (!ctx) throw new Error('useMusic must be inside <MusicProvider>');
    return ctx;
};
