import { memo } from 'react';
import cls from './ForumCell.module.scss';
import { TextLabel } from 'components/TextLabel';
import { TForumTopic } from '../types';

interface ForumCellProps {
    topic: TForumTopic;
}

export const ForumCell = memo(({ topic }: ForumCellProps) => {
    return (
        <div className={cls.ForumCell}>
            <TextLabel className={cls.title} text={topic.title} />
            <TextLabel
                className={cls.date}
                text={topic.dateTime.toLocaleDateString()}
            />
            <TextLabel
                className={cls.lastMessage}
                text={topic.lastMessage.message}
            />
            <TextLabel className={cls.author} text={topic.author.name} />
        </div>
    );
});
