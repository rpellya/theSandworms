import { Button } from 'components/Button';
import { memo } from 'react';

/**
 * Оборачиваем в memo, чтобы при рендеринге этого компонента не перерисовывался весь дочерний контент
 */
export const Profile = memo(() => {
    return (
        <div>
            Profile
            <Button>Hello world</Button>
        </div>
    );
});
