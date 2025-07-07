import { memo, useState } from 'react';
import cls from './ForumCommentCell.module.scss';
import { TextLabel } from 'components/TextLabel';
import profileImgMock from '/src/assets/img/profileMockImg.webp';
import { EmojiButton } from './EmojiButton';
import { Message } from 'api/forumApi/forumApi';
import { baseUrl } from 'consts/baseUrl';

interface ForumCommentCellProps {
    message: Message;
}

export const ForumCommentCell = memo(({ message }: ForumCommentCellProps) => {
    const [avatarSrc, setAvatarSrc] = useState(
        `${baseUrl}/resources${message.user?.avatar}`,
    );

    const handleImgError = () => {
        setAvatarSrc(profileImgMock);
    };

    const commentDate = new Date(message.updatedAt ?? message.createdAt ?? '');

    return (
        <div className={cls.commentCell}>
            <div className={cls.commentHeader}>
                <img
                    src={avatarSrc}
                    alt={message.user?.firstName}
                    className={cls.avatar}
                    onError={handleImgError}
                />
                <div className={cls.authorInfo}>
                    <TextLabel
                        text={`${message.user?.firstName} ${message.user?.lastName}`}
                        className={cls.authorName}
                    />
                    {
                        <TextLabel
                            text={commentDate.toLocaleString()}
                            className={cls.commentDate}
                        />
                    }
                </div>
            </div>
            <div className={cls.commentBody}>
                <TextLabel text={message.message} />
                <EmojiButton />
            </div>
        </div>
    );
});
