import { memo } from 'react';
import cls from './ForumCell.module.scss';
import { TextLabel } from 'components/TextLabel';
import { Topic } from 'api/forumApi/forumApi';

interface ForumCellProps {
    topic: Topic;
}

export const ForumCell = memo(({ topic }: ForumCellProps) => {
    return (
        <div className={cls.ForumCell}>
            <div>
                <TextLabel className={cls.title} text={topic.title} />
            </div>

            <TextLabel
                className={cls.date}
                text={new Date(topic.updatedAt ?? '').toLocaleDateString()}
            />
            <TextLabel className={cls.lastMessage} text={topic.description} />
            <TextLabel
                className={cls.author}
                text={`${topic.user?.firstName} ${topic.user?.lastName}`}
            />
        </div>
    );
});
