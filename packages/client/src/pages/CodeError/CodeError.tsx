import cls from './CodeError.module.scss';
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
            <div className={cls.codeErrorPage}>
                <TextLabel className={cls.textLabel_title} text={codeError} />
                <TextLabel
                    className={cls.textLabel_subtitle}
                    text={pageSubtitle}
                />
                <TextLabel className={cls.textLabel_text} text={pageText} />
                <div className={cls.codeErrorPage__buttonContainer}>
                    <AppLink
                        to={toPath}
                        className={cls.applink_colorWhite}
                        text={linkText}
                    />
                </div>
            </div>
        );
    },
);
