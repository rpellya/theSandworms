import { ThemeSwitcher } from 'components/ThemeSwitcher';
import cls from './About.module.scss';
import { Link } from 'components/Link';
import { RoutePath } from 'app/providers/router/config/routeConfig';

const teamMembers = [
    {
        id: 1,
        name: 'Александр Тропинский',
        userName: 'atropinskiy',
    },
    {
        id: 2,
        name: 'Антон Дубовик',
        userName: 'dubovik02',
    },
    {
        id: 3,
        name: 'Антоний Гончаров',
        userName: 'GoncharovAntoniy',
    },
    {
        id: 4,
        name: 'Владислав Загвосткин',
        userName: 'HardSign28',
    },
    {
        id: 5,
        name: 'Роман Пелля',
        userName: 'rpellya',
    },
    {
        id: 6,
        name: 'Сергей Чернояров',
        userName: 'kuuusama',
    },
];

const BASE_URL_GITHUB = 'https://github.com/';

export const About = () => {
    return (
        <div className={cls.AboutPage}>
            <div className={cls.AboutPageContainer}>
                <section className={cls.ProjectInfo}>
                    <h1 className={cls.text}>Команда - Pixel Masters</h1>
                </section>

                <section className={cls.TeamMembers}>
                    <h2 className={cls.text}>Члены команды</h2>
                    <div className={cls.TeamGrid}>
                        {teamMembers.map((member) => (
                            <Link
                                target="_blank"
                                to={BASE_URL_GITHUB + member.userName}
                                key={member.id}
                                className={cls.TeamCard}
                            >
                                <h3>{member.name}</h3>
                                <p>@{member.userName}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
            <Link className={cls.backButton} to={RoutePath.main}>
                Вернуться на главную
            </Link>
            <ThemeSwitcher />
        </div>
    );
};
