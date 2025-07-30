import { FullScreenSwitcher } from 'components/FullScreenSwitcher';
import { AppRouter } from './providers/router';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'store/hooksStore';
import { userActions } from 'store/userInfoSlice';
import { useSendCode } from 'hooks/useSendCode';
import { useLazySetUserQuery } from 'api/auth/oAuthApi';
import { useLazyGetAuthUserQuery } from 'api/auth/authApi';
import { useTheme } from './providers/ThemeProvider';
import { MusicControls } from '../components/MusicControls/MusicControls';

const App = () => {
    const dispatch = useAppDispatch();
    const [sendUserToBff] = useLazySetUserQuery();
    const [getUserData] = useLazyGetAuthUserQuery();

    const { theme } = useTheme();

    if (typeof document !== 'undefined') {
        document.body.className = theme;
    }

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    useSendCode();
    useEffect(() => {
        const currentUser =
            typeof localStorage !== 'undefined'
                ? localStorage.getItem('user')
                : null;
        if (currentUser) {
            sendUserToBff(currentUser);
        } else {
            getUserData().then((res) => {
                dispatch(userActions.setUserInfo(res.data));
            });
        }
    }, []);

    return (
        <div className="App">
            <Suspense fallback={<div>Loading...</div>}>
                <div className="content-page">
                    <FullScreenSwitcher rootElemClassName="content-page" />
                    <MusicControls />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
