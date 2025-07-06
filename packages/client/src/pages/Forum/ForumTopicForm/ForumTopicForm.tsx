import { forwardRef, useState } from 'react';
import cls from './ForumTopicForm.module.scss';
import { Button } from 'components/Button';

import { Topic, useCreateTopicMutation } from 'api/forumApi/forumApi';
import { useAppSelector } from 'store/hooksStore';

export const ForumTopicForm = (props: { closeModal: () => void }) => {
    const [createTopicApi] = useCreateTopicMutation();

    const [title, setTitle] = useState('');

    const { userInfo } = useAppSelector((state) => {
        console.log(state);
        return state.userReducer;
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const message = e.currentTarget.elements.message;

        const newTopic: Topic = {
            title,
            description: message.value,
            userId: userInfo?.id ?? 0,
        };
        createTopic(newTopic);
    };

    const createTopic = async (data: Topic) => {
        try {
            const result = await createTopicApi(data);
            if (typeof props.closeModal === 'function') {
                props.closeModal();
            }
        } catch (error) {
            console.error(error);
        }
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
                    <label htmlFor="message">Описание</label>
                    <textarea id="message" name="message" />
                </div>
            </div>

            <Button className={cls.submitButton} type="submit">
                Создать топик
            </Button>
        </form>
    );
};
