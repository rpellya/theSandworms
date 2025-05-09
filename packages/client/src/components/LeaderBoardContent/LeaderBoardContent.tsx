import { memo } from 'react';

import './LeaderBoardContent.scss';

export interface IScoreData {
    login: string;
    highScore: number;
}

export interface ILeaders {
    list: Array<IScoreData>;
}

export const LeaderBoardContent = memo((leaders: ILeaders) => {
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
