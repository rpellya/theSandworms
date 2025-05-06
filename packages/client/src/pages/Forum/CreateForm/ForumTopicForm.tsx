import { useState } from 'react';
import { nanoid } from 'nanoid';
import { TForumTopic, TForumAuthor } from '../types';
import cls from './ForumTopicForm.module.scss';
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
    };

    return (
        <form className={cls.ForumTopicForm} onSubmit={handleSubmit}>
            <div className={cls.formContent}>
                <div className={cls.formGroup}>
                    <label htmlFor="title">Заголовок темы</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className={cls.formGroup}>
                    <label htmlFor="message">Сообщение</label>
                    <textarea id="message" name="message" />
                </div>
            </div>

            <Button className={cls.submitButton} type="submit">
                Создать топик
            </Button>
        </form>
    );
};
