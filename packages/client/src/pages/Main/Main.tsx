import { memo, useState } from 'react';
import cls from './Main.module.scss';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import { AppLink } from 'components/Link/AppLink';
import logo from 'src/assets/img/logo.webp';
import { SnakeGame, SnakeGameMain } from './SnakeGame';
import { Button } from 'components/Button';
import { GameOver } from 'components/GameOver/GameOver';
import { useMusic } from 'app/providers/MusicProvider/MusicProvider';
import { BackgroundId } from 'consts/backgrounds';

export const Main = memo(() => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const [bg, setBg] = useState<BackgroundId>(BackgroundId.Sahara);
    const { playing, userMuted, play } = useMusic();

    // const score = 100500;

    const handlePlayClick = () => {
        console.log('Начинаем игру!');
        if (!playing && !userMuted) {
            play();
        }
        setIsOver(false);
        setIsPlaying(true);
    };

    const handleHome = () => {
        setIsOver(false);
        setIsPlaying(false);
    };

    if (isPlaying || isOver) {
        return (
            <SnakeGame
                onExit={handleHome}
                onGameOver={() => {
                    setIsPlaying(false);
                    setIsOver(true);
                }}
                backgroundUrl={bg}
            />
        );
    }
    /*
    if (isOver) {
        return (
            <GameOver
                score={score}
                restart={handlePlayClick}
                home={handleHome}
            />
        );
    }
    */

    const backgroundSelect = (
        <>
            <div className={cls.customSelectWrap}>
                <label
                    className={cls.customSelectLabel}
                    htmlFor="backgroundSelect"
                >
                    Локация:
                </label>
                <select
                    id="backgroundSelect"
                    className={cls.customSelect}
                    value={bg}
                    onChange={(e) => setBg(e.target.value as BackgroundId)}
                >
                    <option value={BackgroundId.Sahara}>Сахара</option>
                    <option value={BackgroundId.Atacama}>Атакама</option>
                    <option value={BackgroundId.BetpakDala}>Бетпак-Дала</option>
                    <option value={BackgroundId.Gobi}>Гоби</option>
                    <option value={BackgroundId.Namib}>Намиб</option>
                    <option value={BackgroundId.Kalahari}>Калахари</option>
                    <option value={BackgroundId.Karakum}>Каракумы</option>
                    <option value={BackgroundId.Kyzylkum}>Кызылкум</option>
                </select>
            </div>
        </>
    );

    return (
        <>
            <SnakeGameMain backgroundUrl={bg} />
            <div className={cls.Main}>
                <div className={cls.mainMenu}>
                    <img
                        className={cls.mainMenu_img}
                        src={logo}
                        alt="Логотип"
                    />
                    <nav className={cls.mainMenu_nav}>
                        <ul className={cls.mainMenu_ul}>
                            <li>{backgroundSelect}</li>
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
                <div className={cls.mainFooter}>created by PixelMasters</div>
            </div>
        </>
    );
});
