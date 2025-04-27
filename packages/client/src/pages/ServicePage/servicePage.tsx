import './servicePage.scss';
import { PureComponent } from 'react';
import { TextLabel } from '../../components/TextLabel/TextLabel';
import { Link } from '../../components/Link/Link';

type ServicePageProps = {
    pageTitle: string;
    pageSubtitle: string;
    pageText: string;
    linkText: string;
};

type Props = ServicePageProps;

export class ServicePage extends PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    private redirectAction() {
        alert('Go to the Main page');
    }

    public render() {
        const { pageTitle, pageSubtitle, pageText, linkText } = this.props;

        return (
            <div className="service-page">
                <TextLabel
                    className="textLabel textLabel_title"
                    text={pageTitle}
                />
                <TextLabel
                    className="textLabel textLabel_subtitle"
                    text={pageSubtitle}
                />
                <TextLabel
                    className="textLabel textLabel_text"
                    text={pageText}
                />
                <div className="service-page__button-container">
                    <Link
                        handleClick={this.redirectAction}
                        className="link link_color-white"
                        text={linkText}
                    />
                </div>
            </div>
        );
    }
}
