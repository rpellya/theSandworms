import { FullScreenSwitcher } from 'components/FullScreenSwitcher';
import { AppRouter } from './providers/router';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'store/hooksStore';
import { userActions } from 'store/userInfoSlice';
import { useSendCode } from 'hooks/useSendCode';
import { useLazySetUserQuery } from 'api/auth/oAuthApi';
import { useTheme } from './providers/ThemeProvider';

const App = () => {
    const dispatch = useAppDispatch();
    const [sendUserToBff] = useLazySetUserQuery();
    const { theme } = useTheme();
    document.body.className = theme;
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
                    <FullScreenSwitcher rootElemClassName="content-page" />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
