import { memo } from 'react';
import {
    ILeaders,
    LeaderBoardContent,
} from 'components/LeaderBoardContent/LeaderBoardContent';

import './LeaderBoard.module.scss';

const mockLeaders: ILeaders = {
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
        <div className="leaderboard">
            <div className="leaderboard_content">
                <h1 className="leaderboard_content_title">Leader Board</h1>
                <LeaderBoardContent {...mockLeaders} />
            </div>
        </div>
    );
});
