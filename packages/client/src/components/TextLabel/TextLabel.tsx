import './TextLabel.scss';
import { memo } from 'react';

interface TextLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
    text: string;
    className?: string;
}

export const TextLabel: React.FC<TextLabelProps> = memo(
    ({ className, text }) => {
        return <p className={className}>{text}</p>;
    },
);
