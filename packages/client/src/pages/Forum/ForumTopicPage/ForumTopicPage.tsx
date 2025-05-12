import cls from './ForumTopicPage.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { forumTopicsMock, forumMessagesMock } from '../mockData';
import { ForumCommentCell } from './ForumCommentCell';
import { Button } from 'components/Button';

export const ForumTopicPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const topic = forumTopicsMock.find((t) => t.id === id);
    if (!topic) return <div>Тема не найдена</div>;

    const comments = forumMessagesMock.filter((m) => m.topicId === topic.id);

    return (
        <div className={cls.ForumTopicPage}>
            <div className={cls.forumPageOverlay}>
                <div className={cls.header}>
                    <div>{topic.title}</div>
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
                    {comments.map((comment) => (
                        <ForumCommentCell key={comment.id} message={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
};
