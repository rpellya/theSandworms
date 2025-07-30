import { useMusic } from 'app/providers/MusicProvider/MusicProvider';
import cls from './MusicControls.module.scss';
export const MusicControls = () => {
    const { playing, toggle, next, prev } = useMusic();
    return (
        <div className={cls.musicControls__container}>
            <div className={cls.musicControls__title}>♫ Музыка</div>
            <button className={cls.musicControls__button} onClick={prev}>
                ⏮
            </button>
            <button className={cls.musicControls__button} onClick={toggle}>
                {playing ? '⏹' : '▶'}
            </button>
            <button className={cls.musicControls__button} onClick={next}>
                ⏭
            </button>
        </div>
    );
};
