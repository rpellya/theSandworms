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
            const url = `http://localhost:${__SERVER_PORT__}`;
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
                    <FullScreenSwitcher rootElemClassName="content-page" />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
