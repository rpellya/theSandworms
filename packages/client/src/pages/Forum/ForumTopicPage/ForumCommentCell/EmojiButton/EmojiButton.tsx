import React, { useState } from 'react';
import cls from './EmojiButton.module.scss';

export const EmojiButton: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [emojis, setEmojis] = useState<{ icon: string; count: number }[]>([]);

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
