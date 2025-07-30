import React, { memo, useEffect, useState } from 'react';
import { TextLabel } from 'components/TextLabel';
import { ForumCell } from './ForumCell';
import cls from './Forum.module.scss';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal/Modal';
import { ForumTopicForm } from './ForumTopicForm';
import { AppLink } from 'components/Link/AppLink';

import { Topic, useGetTopicsMutation } from 'api/forumApi/forumApi';
import { RoutePath } from 'app/providers/router/config/routeConfig';

export const Forum = memo(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [getTopicsApi] = useGetTopicsMutation();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getTopics = async () => {
        try {
            const result = await getTopicsApi(null);
            setTopics(result.data.topics);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTopics();
    }, []);

    return (
        <div className={cls.Forum}>
            <div className={cls.forumOverlay}>
                <div className={cls.forumHeader}>
                    <AppLink
                        className={cls.topicCreateButton}
                        to={RoutePath.main}
                    >
                        Назад
                    </AppLink>
                    <TextLabel className={cls.forumTitle} text="Форум" />
                    <Button
                        onClick={openModal}
                        className={cls.topicCreateButton}
                    >
                        Создать
                    </Button>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        title="Создание топика"
                    >
                        <ForumTopicForm
                            closeModal={() => {
                                closeModal();
                                getTopics();
                            }}
                        />
                    </Modal>
                </div>
                <div className={cls.topicsOverlay}>
                    {topics?.map((topic) => (
                        <AppLink
                            key={topic.id}
                            to={`/forum/${topic.id}`}
                            className={cls.topicLink}
                        >
                            <ForumCell topic={topic} />
                        </AppLink>
                    ))}
                </div>
            </div>
        </div>
    );
});
