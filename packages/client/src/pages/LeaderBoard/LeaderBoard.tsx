import React, { memo, useEffect, useState } from 'react';
import {
    Leaders,
    LeaderBoardContent,
} from 'components/LeaderBoardContent/LeaderBoardContent';

import cls from './LeaderBoard.module.scss';
import { AppLink } from 'components/Link/AppLink';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import {
    LeaderBoardData,
    LeaderBoardDataRow,
    RATING_FIELD_NAME,
    useGetLeadersMutation,
} from 'api/leaderBoard/leaderBoardApi';
import { Button } from 'components/Button';

export const LeaderBoard: React.FC = memo(() => {
    const [page, setPage] = useState(0);
    const [leaders, setLeaders] = useState<Leaders>({
        list: [],
    });
    const [getLeadersApi] = useGetLeadersMutation();

    const getPage = async (cursor: number) => {
        const data = {
            cursor: cursor,
            limit: 10,
            ratingFieldName: RATING_FIELD_NAME,
        };

        try {
            const result = await getLeadersApi(data);

            const list = (result as LeaderBoardData).data.map(
                (row: LeaderBoardDataRow) => {
                    return {
                        login: row.data.login ?? 'Unknown User',
                        highScore: row.data[RATING_FIELD_NAME],
                    };
                },
            );

            setLeaders({ list: list });
        } catch (error) {
            console.error(error);
        }
    };

    const nextPage = () => {
        if (1 !== leaders.list.length) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(page - 1);
    };

    useEffect(() => {
        getPage(page);
    }, [page]);

    return (
        <div className={cls.leaderboard}>
            <div className={cls.leaderboard_overlay}>
                <div className={cls.leaderboard_header}>
                    <h1 className={cls.leaderboard_header_title}>Лидеры</h1>
                </div>
                <div className={cls.leaderboard_wrapper}>
                    <div className={cls.leaderboard_content}>
                        {<LeaderBoardContent {...leaders} />}
                    </div>
                </div>
                <div className={cls.leaderboard_links}>
                    <Button
                        className={cls.leaderboard_links__button}
                        onClick={prevPage}
                        disabled={0 === page}
                    >
                        &larr; Сюда
                    </Button>
                    <AppLink
                        className={cls.leaderboard_links__button}
                        to={RoutePath.main}
                    >
                        На главную
                    </AppLink>
                    <Button
                        className={cls.leaderboard_links__button}
                        onClick={nextPage}
                        disabled={1 === leaders.list.length}
                    >
                        Туда &rarr;
                    </Button>
                </div>
            </div>
        </div>
    );
});
