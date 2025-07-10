import { Button } from 'components/Button';
import cls from './FullScreenSwitcher.module.scss';
import { memo, useState } from 'react';

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
        return (
            <div className={cls.fullScreen__container}>
                <Button
                    className={cls.fullScreen__button}
                    onClick={() => {
                        if (typeof document === 'undefined') return;

                        toggleFullsrceen.call(this, rootElemClassName);
                        setFullScreen(
                            document.fullscreenElement ? true : false,
                        );
                    }}
                >
                    {isFullScreen ? 'Full screen' : 'Exit full screen mode'}
                </Button>
            </div>
        );
    },
);
