import { memo, useState } from 'react';
import cls from './Main.module.scss';
import { SnakeImage } from './SnakeImage/SnakeImage';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import { AppLink } from 'components/Link/AppLink';
import logo from '/src/assets/img/logo.webp';
import { SnakeGame } from './SnakeGame';
import { Button } from '../../components/Button';
import { GameOver } from 'components/GameOver/GameOver';

export const Main = memo(() => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isOver, setIsOver] = useState(false);

    const score = 100500;

    const handlePlayClick = () => {
        setIsOver(false);
        setIsPlaying(true);
    };

    const handleHome = () => {
        setIsOver(false);
        setIsPlaying(false);
    };

    if (isPlaying) {
        return <SnakeGame onExit={() => setIsPlaying(false)} />;
    }

    if (isOver) {
        return (
            <GameOver
                score={score}
                restart={handlePlayClick}
                home={handleHome}
            />
        );
    }

    return (
        <div className={cls.Main}>
            <div className={cls.mainMenu}>
                <img className={cls.mainMenu_img} src={logo} alt="Логотип" />
                <nav className={cls.mainMenu_nav}>
                    <ul className={cls.mainMenu_ul}>
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
                        <li>
                            <AppLink
                                className={cls.appLink}
                                to={RoutePath.profile}
                                text="Профиль"
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
