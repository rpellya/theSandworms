import { Profile } from 'pages/Profile';
import Register from 'pages/Register/Register';
import { RouteProps } from 'react-router-dom';

enum AppRoutes {
    MAIN = 'main',
    REGISTER = 'register',
    LOGIN = 'login',
    ABOUT = 'about',
    PROFILE = 'profile',
    LEADERBOARD = 'leaderboard',
    FORUM = 'forum',

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

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

// Здесь помещаем страницу и сам роутер, который будет использоваться в приложении
// Так же не забываем добавить маршрут в RoutePath, хотя ts подскажет :)
export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: 'Play (example)',
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: 'Login (example)',
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <Register />,
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
        element: 'Leaderboard (example)',
    },
    [AppRoutes.FORUM]: {
        path: RoutePath.forum,
        element: 'Forum page (example)',
    },

    // Все маршруты, которые не указаны в routeConfig будут перенаправлены на 404 страницу
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: 'Not found page (example)',
    },
};
