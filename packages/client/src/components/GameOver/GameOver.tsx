import { Button } from 'components/Button';
import { memo } from 'react';
import cls from './GameOver.module.scss';

/**
 * Оборачиваем в memo, чтобы при рендеринге этого компонента не перерисовывался весь дочерний контент
 */
export const GameOver: React.FC<{
    score: number;
    restart?: () => void;
    home?: () => void;
}> = memo(({ score, restart, home }) => {
    const handlePlayClick = () => {
        restart ? restart() : '';
    };

    const handleMainClick = () => {
        home ? home() : '';
    };

    return (
        <div className={cls.game_over}>
            <p className={cls.game_over__text}>Игра окончена</p>
            <p className={cls.game_over__counter}>Ваш счёт: {score}</p>
            <div className={cls.game_over__menu}>
                <Button
                    className={cls.game_over__menu__button}
                    onClick={handlePlayClick}
                >
                    Играть снова
                </Button>
                <Button
                    className={cls.game_over__menu__button}
                    onClick={handleMainClick}
                >
                    На главную
                </Button>
            </div>
        </div>
    );
});
