import React, { useState } from 'react';
import cls from './EmojiButton.module.scss';
import { useCreateEmojiMutation } from 'api/forumApi/forumApi';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const EmojiButton: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [createEmoji, { isLoading }] = useCreateEmojiMutation();
    const [emojis, setEmojis] = useState<{ icon: string; count: number }[]>([]);
    const userId = useSelector(
        (state: RootState) => state.userReducer.userInfo?.id,
    );

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleSelect = (emoji: string) => {
        setEmojis((prev) => {
            const found = prev.find((e) => e.icon === emoji);
            if (found) {
                return prev.map((e) =>
                    e.icon === emoji ? { ...e, count: e.count + 1 } : e,
                );
            } else {
                return [...prev, { icon: emoji, count: 1 }];
            }
        });
        userId && createEmoji({ emoji: emoji, userId: userId });
        setMenuOpen(false);
    };

    const handleEmojiClick = (icon: string) => {
        setEmojis((prev) =>
            prev.map((e) =>
                e.icon === icon ? { ...e, count: e.count + 1 } : e,
            ),
        );
    };

    return (
        <div className={cls.EmojiButton}>
            <div className={cls.emojies}>
                {emojis.map((emo) => (
                    <button
                        key={emo.icon}
                        className={cls.emoDiv}
                        onClick={() => handleEmojiClick(emo.icon)}
                    >
                        <span>{emo.icon}</span>
                        <span>{emo.count}</span>
                    </button>
                ))}
            </div>
            <button className={cls.addEmoji} onClick={toggleMenu}>
                +
            </button>

            {menuOpen && (
                <div className={cls.popup}>
                    <button onClick={() => handleSelect('🔥')}>🔥</button>
                    <button onClick={() => handleSelect('👍')}>👍</button>
                    <button onClick={() => handleSelect('👎')}>👎</button>
                    <button onClick={() => handleSelect('❤️')}>❤️</button>
                </div>
            )}
        </div>
    );
};
