import { FullScreenSwitcher } from 'components/FullScreenSwitcher';
import { AppRouter } from './providers/router';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'store/hooksStore';
import { userActions } from 'store/userInfoSlice';
import { useSendCode } from 'hooks/useSendCode';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    useSendCode();

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
