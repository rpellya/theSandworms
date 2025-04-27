import './textLabel.scss';
import { PureComponent } from 'react';

type TextLabelProps = {
    text: string;
    className?: string;
};

type Props = TextLabelProps;

export class TextLabel extends PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const { className, text } = this.props;
        return <p className={className}>{text}</p>;
    }
}
