import './CodeError.scss';
import { memo } from 'react';
import { TextLabel } from 'components/TextLabel/TextLabel';
import { AppLink } from 'components/Link/AppLink';

interface CodeErrorProps {
    toPath: string;
    codeError: string;
    pageSubtitle: string;
    pageText: string;
    linkText: string;
}

export const CodeError: React.FC<CodeErrorProps> = memo(
    ({ toPath, codeError, pageSubtitle, pageText, linkText }) => {
        return (
            <div className="code-error-page">
                <TextLabel
                    className="textLabel textLabel_title"
                    text={codeError}
                />
                <TextLabel
                    className="textLabel textLabel_subtitle"
                    text={pageSubtitle}
                />
                <TextLabel
                    className="textLabel textLabel_text"
                    text={pageText}
                />
                <div className="code-error-page__button-container">
                    <AppLink
                        to={toPath}
                        className="app-link app-link_color-white"
                        text={linkText}
                    />
                </div>
            </div>
        );
    },
);
