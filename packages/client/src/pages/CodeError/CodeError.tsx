import './CodeError.scss';
import { memo } from 'react';
import { TextLabel } from 'components/TextLabel/TextLabel';
import { Link } from 'components/Link/Link';

interface CodeErrorProps {
    codeError: string;
    pageSubtitle: string;
    pageText: string;
    linkText: string;
}

export const CodeError: React.FC<CodeErrorProps> = memo(
    ({ codeError, pageSubtitle, pageText, linkText }) => {
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
                    <Link
                        handleClick={() => {
                            alert('Go to the Main page');
                        }}
                        className="link link_color-white"
                        text={linkText}
                    />
                </div>
            </div>
        );
    },
);
