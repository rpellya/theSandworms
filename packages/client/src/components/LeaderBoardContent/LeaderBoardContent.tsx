import { memo } from 'react';

import './LeaderBoardContent.scss';

export interface ScoreData {
    login: string;
    highScore: number;
}

export interface Leaders {
    list: Array<ScoreData>;
}

export const LeaderBoardContent = memo((leaders: Leaders) => {
    return (
        <div className="list">
            {leaders.list.map((leader) => (
                <div className="list_item">
                    <div className="list_item_name" title={leader.login}>
                        {leader.login}
                    </div>
                    <div>{leader.highScore}</div>
                </div>
            ))}
        </div>
    );
});
