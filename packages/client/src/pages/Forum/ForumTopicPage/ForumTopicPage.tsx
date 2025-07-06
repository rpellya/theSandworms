import cls from './ForumTopicPage.module.scss';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ForumCommentCell } from './ForumCommentCell';
import { Button } from 'components/Button';

import {
    Topic,
    Message,
    useGetTopicMutation,
    useCreateMessageMutation,
} from 'api/forumApi/forumApi';
import { useAppSelector } from 'store/hooksStore';

export const ForumTopicPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [getTopicApi] = useGetTopicMutation();
    const [createMessageApi] = useCreateMessageMutation();
    const [topic, setTopic] = useState<Topic | null>(null);

    const { userInfo } = useAppSelector((state) => {
        return state.userReducer;
    });

    const getTopic = async () => {
        try {
            const result = await getTopicApi(id);
            setTopic(result.data.topic);
        } catch (error) {
            return <div>Тема не найдена</div>;
        }
    };

    useEffect(() => {
        getTopic();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newMessage: Message = {
            message: content.value,
            topicId: id ?? '',
            userId: userInfo?.id ?? 0,
        };
        createMessage(newMessage);
    };

    const createMessage = async (data: Message) => {
        try {
            const result = await createMessageApi(data);
            content.value = '';
            getTopic();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={cls.ForumTopicPage}>
            <div className={cls.forumPageOverlay}>
                <div className={cls.header}>
                    <div>
                        <div className={cls.header_title}>{topic?.title}</div>
                        <div className={cls.header_description}>
                            {topic?.description}
                        </div>
                    </div>
                    <div>
                        <Button
                            className={cls.backButton}
                            onClick={() => navigate(-1)}
                        >
                            Назад
                        </Button>
                    </div>
                </div>
                <div className={cls.commentsSection}>
                    {topic?.messages?.map((comment) => (
                        <ForumCommentCell key={comment.id} message={comment} />
                    ))}

                    <form onSubmit={handleSubmit}>
                        <div className={cls.comment}>
                            <textarea
                                className={cls.comment_textarea}
                                id="content"
                                name="content"
                                placeholder="Сообщение"
                            />

                            <Button
                                className={`${cls.backButton} ${cls.send}`}
                                type="submit"
                            >
                                Отправить
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
