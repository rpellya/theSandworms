import { memo, useState } from 'react';
import cls from './Main.module.scss';
import { SnakeImage } from './SnakeImage/SnakeImage';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import { AppLink } from 'components/Link/AppLink';
import logo from '/src/assets/img/logo.webp';
import { SnakeGame } from './SnakeGame';
import { Button } from 'components/Button';

export const Main = memo(() => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    if (isPlaying) {
        return <SnakeGame onExit={() => setIsPlaying(false)} />;
    }

    return (
        <div className={cls.Main}>
            <div className={cls.mainMenu}>
                <img width="300px" src={logo} alt="Логотип" />
                <nav>
                    <ul>
                        <li>
                            <Button
                                className={cls.appLink}
                                onClick={handlePlayClick}
                            >
                                Играть
                            </Button>
                        </li>
                        <li>
                            <AppLink
                                className={cls.appLink}
                                to={RoutePath.about}
                                text="О нас"
                            />
                        </li>
                        <li>
                            <AppLink
                                className={cls.appLink}
                                to={RoutePath.forum}
                                text="Форум"
                            />
                        </li>
                        <li>
                            <AppLink
                                className={cls.appLink}
                                to={RoutePath.leaderboard}
                                text="Лидеры"
                            />
                        </li>
                    </ul>
                </nav>
            </div>
            <SnakeImage className={cls.snakeLayout} />
            <div className={cls.mainFooter}>created by PixelMasters</div>
        </div>
    );
});
