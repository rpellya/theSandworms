import { memo } from 'react';
import { TextLabel } from 'components/TextLabel';
import { ForumCell } from './ForumCell';
import cls from './Forum.module.scss';
import { forumTopicsMock } from './mockData';
import { Button } from 'components/Button';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ForumTopicForm } from './CreateForm';
import { AppLink } from 'components/Link/AppLink';

export const Forum = memo(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={cls.Forum}>
            <div className={cls.forumOverlay}>
                <div className={cls.forumHeader}>
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
                        <ForumTopicForm />
                    </Modal>
                </div>
                <div className={cls.topicsOverlay}>
                    {forumTopicsMock.map((topic) => (
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
