import { memo, useState } from 'react';
import cls from './ForumCommentCell.module.scss';
import { TextLabel } from 'components/TextLabel';
import { TForumMessage } from '../../types';
import profileImgMock from '/src/assets/img/profileMockImg.webp';

interface ForumCommentCellProps {
    message: TForumMessage;
}

export const ForumCommentCell = memo(({ message }: ForumCommentCellProps) => {
    const [avatarSrc, setAvatarSrc] = useState(message.author.avatarUrl);

    const handleImgError = () => {
        setAvatarSrc(profileImgMock);
    };

    return (
        <div className={cls.commentCell}>
            <div className={cls.commentHeader}>
                <img
                    src={avatarSrc}
                    alt={message.author.name}
                    className={cls.avatar}
                    onError={handleImgError}
                />
                <div className={cls.authorInfo}>
                    <TextLabel
                        text={message.author.name}
                        className={cls.authorName}
                    />
                    <TextLabel
                        text={message.dateTime.toLocaleString()}
                        className={cls.commentDate}
                    />
                </div>
            </div>
            <div className={cls.commentBody}>
                <TextLabel text={message.message} />
            </div>
        </div>
    );
});
