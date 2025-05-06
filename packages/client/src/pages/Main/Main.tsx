import { memo } from 'react';
import cls from './Main.module.scss';
import { SnakeImage } from './SnakeImage/SnakeImage';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import { AppLink } from 'components/Link/AppLink';
import logo from '/src/assets/img/logo.webp';

export const Main = memo(() => {
    return (
        <div className={cls.Main}>
            <div className={cls.mainMenu}>
                <img width="300px" src={logo} alt="Логотип" />
                <nav>
                    <ul>
                        <li>
                            <AppLink
                                className={cls.appLink}
                                to="#"
                                text="Играть"
                            />
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
