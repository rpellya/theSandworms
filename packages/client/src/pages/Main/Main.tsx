import { memo } from 'react';
import s from './Main.module.scss';
import { Snake } from './Components/Snake/Snake';

export const Main = memo(() => {
    return (
        <div className={s.Main}>
            <div className={s.mainMenu}>
                <img width="500px" src="/src/assets/img/logo.webp" alt="" />
                <nav>
                    <ul>
                        <li>
                            <a href="#home">Играть</a>
                        </li>
                        <li>
                            <a href="#about">Настройки</a>
                        </li>
                        <li>
                            <a href="#services">Форум</a>
                        </li>
                        <li>
                            <a href="#contact">Лидеры</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <Snake className={s.snakeLayout} />
            <div className={s.mainFooter}>created by PixelMasters</div>
        </div>
    );
});
