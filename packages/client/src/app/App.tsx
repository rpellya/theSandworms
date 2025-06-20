import { FullScreenSwitcher } from 'components/FullScreenSwitcher';
import { AppRouter } from './providers/router';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';
import { userActions } from 'store/userInfoSlice';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    useEffect(() => {
        // Пока оставляем здесь для примера. Будем работать в 7-8 спринте
        const fetchServerData = async () => {
            const url = `http://localhost:${3000}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        };

        fetchServerData();
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
