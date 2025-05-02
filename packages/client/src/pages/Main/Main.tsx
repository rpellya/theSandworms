import { memo } from 'react';
import cls from './Main.module.scss';
import { Snake } from './Components/Snake/Snake';
import { Link } from 'react-router-dom';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import logo from '/src/assets/img/logo.webp';

export const Main = memo(() => {
    return (
        <div className={cls.Main}>
            <div className={cls.mainMenu}>
                <img width="300px" src={logo} alt="Логотип" />
                <nav>
                    <ul>
                        <li>
                            <Link to="">Играть</Link>
                        </li>
                        <li>
                            <Link to={RoutePath.about}>Настройки</Link>
                        </li>
                        <li>
                            <Link to={RoutePath.forum}>Форум</Link>
                        </li>
                        <li>
                            <Link to={RoutePath.leaderboard}>Лидеры</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Snake className={cls.snakeLayout} />
            <div className={cls.mainFooter}>created by PixelMasters</div>
        </div>
    );
});
