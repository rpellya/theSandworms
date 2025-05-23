import { routeConfig } from '../config/routeConfig';
import { Suspense, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';

/**
 * AppRouter - главный роутер, который используется в приложении
 * renderWithWrapper - хелпер для оборачивания элемента в Suspense
 * и подготовки к дальнейшему использованию
 *
 * Все маршруты, которые будем использовать в приложении должны быть описаны в routeConfig
 */
const AppRouter = () => {
    const renderWithWrapper = useCallback((route: RouteProps) => {
        const element = (
            <Suspense fallback={<div>Loading...</div>}>
                {route.element}
            </Suspense>
        );
        return <Route key={route.path} path={route.path} element={element} />;
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
