import { useMusic } from 'app/providers/MusicProvider/MusicProvider';

export function MusicSwitcher() {
    const { playing, toggle } = useMusic();
    return (
        <button onClick={toggle}>
            {playing ? '🔊 Выключить музыку' : '🔈 Включить музыку'}
        </button>
    );
}
