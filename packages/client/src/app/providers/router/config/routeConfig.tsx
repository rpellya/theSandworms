import { Main } from 'pages/Main';
import { LeaderBoard } from 'pages/LeaderBoard';
import { Profile } from 'pages/Profile';
import { CodeError } from 'pages/CodeError';
import { RouteProps } from 'react-router-dom';
import { Login } from 'pages/Login';

enum AppRoutes {
    MAIN = 'main',
    REGISTER = 'register',
    LOGIN = 'login',
    ABOUT = 'about',
    PROFILE = 'profile',
    LEADERBOARD = 'leaderboard',
    FORUM = 'forum',
    SERVER_ERROR = 'server_error',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.LEADERBOARD]: '/leaderboard',
    [AppRoutes.FORUM]: '/forum',
    [AppRoutes.SERVER_ERROR]: '/error',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

// Здесь помещаем страницу и сам роутер, который будет использоваться в приложении
// Так же не забываем добавить маршрут в RoutePath, хотя ts подскажет :)
export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <Main />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: (
            <Login
                regPath={RoutePath.register}
                onSubmit={() => {
                    return true;
                }} //подключем авторизацию здесь
            />
        ),
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: 'Register (example)',
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: 'About page (example)',
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <Profile />,
    },
    [AppRoutes.LEADERBOARD]: {
        path: RoutePath.leaderboard,
        element: <LeaderBoard />,
    },
    [AppRoutes.FORUM]: {
        path: RoutePath.forum,
        element: 'Forum page (example)',
    },
    [AppRoutes.SERVER_ERROR]: {
        path: RoutePath.server_error,
        element: (
            <CodeError
                toPath={RoutePath.main}
                codeError="500"
                pageSubtitle="Что-то пошло не так..."
                pageText="Возникла непредвиденная ошибка. Мы уже занимаемся"
                linkText="На главную"
            />
        ),
    },

    // Все маршруты, которые не указаны в routeConfig будут перенаправлены на 404 страницу
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: (
            <CodeError
                toPath={RoutePath.main}
                codeError="404"
                pageSubtitle="Нет такого адреса..."
                pageText="Ресурс который был запрошен отсутствует на нашем сайте"
                linkText="На главную"
            />
        ),
    },
};
