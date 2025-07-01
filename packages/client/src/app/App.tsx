import { FullScreenSwitcher } from 'components/FullScreenSwitcher';
import { AppRouter } from './providers/router';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'store/hooksStore';
import { userActions } from 'store/userInfoSlice';
import { useSendCode } from 'hooks/useSendCode';
import { useLazySetUserQuery } from 'api/auth/oAuthApi';

const App = () => {
    const dispatch = useAppDispatch();
    const [sendUserToBff] = useLazySetUserQuery();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    useSendCode();
    useEffect(() => {
        const currentUser = localStorage.getItem('user');
        if (currentUser) {
            sendUserToBff(currentUser);
        }
    }, []);

    return (
        <div className="App">
            <Suspense fallback={<div>Loading...</div>}>
                <div className="content-page">
                    <FullScreenSwitcher rootElemClassName="content-page"></FullScreenSwitcher>
                    {/* <img width="250px" src={logo} alt="Логотип" />
                    {/* 
                        Заголовок просто для примера, так как выводится вне зависимости от AppRouter,
                        а значит будет всегда. В будущем вместо заголовка можно поставить любой компонент,
                        который будет отрисовываться вне зависимости от пути
                        и показываться всегда на всех страницах сайта.
                    */}
                    {/* 
                        Вся разработка идет в рамках компонента <AppRouter /> 
                        В который будем складывать все странциы нашего веб-приложения
                        */}
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
