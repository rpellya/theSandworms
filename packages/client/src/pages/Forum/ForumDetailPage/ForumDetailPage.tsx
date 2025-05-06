import { memo } from 'react';
import cls from './Forum.module.scss';

export const Forum = memo(() => {
    return (
        <div className={cls.Forum}>
            <div className={cls.forumOverlay}></div>
        </div>
    );
});
