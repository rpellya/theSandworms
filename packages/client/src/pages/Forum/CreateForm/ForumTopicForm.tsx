import { useState } from 'react';
import { nanoid } from 'nanoid';
import { TForumTopic, TForumAuthor, TForumMessage } from '../types';
import { Button } from 'components/Button';

const mockAuthor: TForumAuthor = {
    id: nanoid(),
    name: 'John Doe',
    avatarUrl: '',
};

export const ForumTopicForm = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const topicId = nanoid();

        const newTopic: TForumTopic = {
            id: topicId,
            title,
            dateTime: new Date(),
            author: mockAuthor,
            lastMessage: {
                id: nanoid(),
                message: 'Пока нет сообщений',
                author: mockAuthor,
                dateTime: new Date(),
                topicId,
            },
        };

        console.log('Создан топик:', newTopic);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Название темы:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <Button type="submit">Создать тему</Button>
        </form>
    );
};
