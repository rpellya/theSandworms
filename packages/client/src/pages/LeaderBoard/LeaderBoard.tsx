import { memo } from 'react';
import {
    Leaders,
    LeaderBoardContent,
} from 'components/LeaderBoardContent/LeaderBoardContent';

import cls from './LeaderBoard.module.scss';

const mockLeaders: Leaders = {
    list: [
        { login: 'user A', highScore: 100500900 },
        { login: 'user B', highScore: 100508 },
        { login: 'user C', highScore: 100507 },
        { login: 'user D', highScore: 100506 },
        { login: 'user E', highScore: 100505 },
        { login: 'user with a long, very long name', highScore: 100504 },
        { login: 'user G', highScore: 100503 },
        { login: 'user H', highScore: 100502 },
        { login: 'user I', highScore: 100501 },
        { login: 'user J', highScore: 100500 },
    ],
};

export const LeaderBoard = memo(() => {
    return (
        <div className={cls.leaderboard}>
            <div className={cls.leaderboard_overlay}>
                <div className={cls.leaderboard_header}>
                    <h1 className={cls.leaderboard_header_title}>Лидеры</h1>
                </div>
                <div className={cls.leaderboard_wrapper}>
                    <div className={cls.leaderboard_content}>
                        {<LeaderBoardContent {...mockLeaders} />}
                    </div>
                </div>
            </div>
            <a href="/">На главную</a>
        </div>
    );
});
