import { Button } from 'components/Button';
import cls from './FullScreenSwitcher.module.scss';
import { memo, useState } from 'react';
import { MusicSwitcher } from '../MusicSwitcher/MusicSwitcher';

interface FSSwitcherProps {
    rootElemClassName: string;
}

function toggleFullsrceen(rootElemClassName: string) {
    if (typeof document === 'undefined') return;

    const rootElem = document.querySelector(`.${rootElemClassName}`);
    if (!document.fullscreenElement) {
        rootElem?.requestFullscreen?.();
    } else {
        document.exitFullscreen?.();
    }
}

export const FullScreenSwitcher: React.FC<FSSwitcherProps> = memo(
    ({ rootElemClassName }) => {
        const [isFullScreen, setFullScreen] = useState(false);

        const handleChangeScreen = () => {
            toggleFullsrceen.call(this, rootElemClassName);
            setFullScreen((prev) => !prev);
        };

        return (
            <div className={cls.fullScreen__container}>
                <Button
                    className={cls.fullScreen__button}
                    onClick={handleChangeScreen}
                >
                    {isFullScreen ? 'Exit full screen mode' : 'Full screen'}
                </Button>
                <MusicSwitcher />
            </div>
        );
    },
);
