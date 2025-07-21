import React, { useState } from 'react';
import cls from './EmojiButton.module.scss';
import { Emoji, useToggleEmojiMutation } from 'api/forumApi/forumApi';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface EmojiButtonProps {
    messageId?: string;
}

export const EmojiButton: React.FC<EmojiButtonProps> = ({ messageId }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [createEmoji, { isLoading }] = useToggleEmojiMutation();
    const userId = useSelector(
        (state: RootState) => state.userReducer.userInfo?.id,
    );

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleSelect = (emoji: string) => {
        const emo: Emoji = {
            emoji: emoji,
            userId: userId ?? 0,
            messageId: messageId ?? '',
        };
        console.log(emo);
        userId && messageId && createEmoji(emo);
        setMenuOpen(false);
    };

    return (
        <div className={cls.EmojiButton}>
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
