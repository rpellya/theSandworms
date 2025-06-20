import { useLazyGetAuthUserQuery } from 'api/auth/authApi';
import { useSendYandexCodeMutation } from 'api/auth/oAuthApi';
import { USER_LOCALSTORAGE_KEY } from 'app/providers/const/localStorage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { userActions } from 'store/userInfoSlice';

export const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [getUserInfo] = useLazyGetAuthUserQuery();

    const [sendCode] = useSendYandexCodeMutation();

    const handleSendCode = async (code: string) => {
        try {
            const response = await sendCode({
                code,
                redirect_uri: window.location.origin,
            }).unwrap();
            console.log('response', response);
            if (response === 'OK') {
                await getUserInfo().then((res) => {
                    dispatch(userActions.setUserInfo(res.data));
                    localStorage.setItem(
                        USER_LOCALSTORAGE_KEY,
                        JSON.stringify(res.data),
                    );
                });
                navigate('/');
            }
        } catch (error) {
            const { reason } = JSON.parse((error as any)?.data || '{}');

            console.log('error', reason);
            if (reason === 'User already in system') {
                getUserInfo().then((res) => {
                    dispatch(userActions.setUserInfo(res.data));
                    localStorage.setItem(
                        USER_LOCALSTORAGE_KEY,
                        JSON.stringify(res.data),
                    );
                });
                navigate('/');
            } else {
                console.error(error);
            }
        }
    };
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            handleSendCode(code);
        }
    }, []);
    return <></>;
};
