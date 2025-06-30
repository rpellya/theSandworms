import { useLazyGetAuthUserQuery } from 'api/auth/authApi';
import { useSendYandexCodeMutation } from 'api/auth/oAuthApi';
import { USER_LOCALSTORAGE_KEY } from 'app/providers/const/localStorage';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooksStore';
import { userActions } from 'store/userInfoSlice';

export const useSendCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [getUserInfo] = useLazyGetAuthUserQuery();

    const [sendCode] = useSendYandexCodeMutation();

    const handleSendCode = async (code: string) => {
        const getUser = () => {
            getUserInfo().then((res) => {
                if (res.data) {
                    dispatch(userActions.setUserInfo(res.data));
                    localStorage.setItem(
                        USER_LOCALSTORAGE_KEY,
                        JSON.stringify(res.data),
                    );
                }
            });
        };
        try {
            const response = await sendCode({
                code,
                redirect_uri: window.location.origin,
            }).unwrap();
            if (response === 'OK') {
                setTimeout(getUser, 500);
                navigate('/');
            }
        } catch (error) {
            const { reason } = JSON.parse((error as any)?.data || '{}');

            if (reason === 'User already in system') {
                setTimeout(getUser, 500);
                navigate('/');
            } else {
                console.error(error);
            }
        }
    };
    useEffect(() => {
        if (location.pathname === '/oauth') {
            const code = new URLSearchParams(window.location.search).get(
                'code',
            );
            if (!code) {
                return;
            } else {
                handleSendCode(code);
            }
        }
    }, [location.pathname]);
    return null;
};
