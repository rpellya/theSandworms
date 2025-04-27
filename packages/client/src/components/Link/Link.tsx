import './link.scss';
import { MouseEventHandler } from 'react';
import { PureComponent } from 'react';

type LinkProps = {
    handleClick: MouseEventHandler;
    text: string;
    className?: string;
};

type Props = LinkProps;

export class Link extends PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const { handleClick, className, text } = this.props;
        return (
            <a className={className} onClick={handleClick}>
                {text}
            </a>
        );
    }
}
