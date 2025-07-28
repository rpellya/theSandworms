import { memo, useState } from 'react';
import cls from './ForumCommentCell.module.scss';
import { TextLabel } from 'components/TextLabel';
import profileImgMock from '/src/assets/img/profileMockImg.webp';
import { EmojiButton } from './EmojiButton/EmojiButton';
import { Emoji, Message, useToggleEmojiMutation } from 'api/forumApi/forumApi';
import { baseUrl } from 'consts/baseUrl';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface ForumCommentCellProps {
    message: Message;
    emojies: { emoji: string; count: number }[];
}

export const ForumCommentCell = memo(
    ({ message, emojies }: ForumCommentCellProps) => {
        const [createEmoji, { isLoading }] = useToggleEmojiMutation();
        const userId = useSelector(
            (state: RootState) => state.userReducer.userInfo?.id,
        );
        const [avatarSrc, setAvatarSrc] = useState(
            `${baseUrl}/resources${message.user?.avatar}`,
        );
        const handleImgError = () => {
            setAvatarSrc(profileImgMock);
        };

        const handleCreateEmoji = (emo: string) => {
            const emoji: Emoji = {
                emoji: emo,
                messageId: message.id ?? '',
                userId: userId ?? 0,
            };
            createEmoji(emoji);
        };

        const commentDate = new Date(
            message.updatedAt ?? message.createdAt ?? '',
        );

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
                            text={`${message.user?.firstName ?? ''} ${
                                message.user?.lastName ?? ''
                            }`}
                            className={cls.authorName}
                        />
                        <TextLabel
                            text={commentDate.toLocaleString()}
                            className={cls.commentDate}
                        />
                    </div>
                </div>
                <div className={cls.commentBody}>
                    <TextLabel text={message.message} />
                    <div className={cls.emojies}>
                        {emojies.map((emo) => (
                            <button
                                key={emo.emoji}
                                className={cls.emoDiv}
                                onClick={(_) => {
                                    handleCreateEmoji(emo.emoji);
                                }}
                            >
                                <span>{emo.emoji}</span>
                                <span>{emo.count}</span>
                            </button>
                        ))}
                    </div>
                    <EmojiButton messageId={message.id} />
                </div>
            </div>
        );
    },
);
