import { useLazyGetAuthUserQuery } from 'api/auth/authApi';
import { USER_LOCALSTORAGE_KEY } from 'app/providers/const/localStorage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { userActions } from 'store/userInfoSlice';

export const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [getUserInfo] = useLazyGetAuthUserQuery();
    const sendCodeToBff = async (code: string) => {
        try {
            let response: any = '';
            await fetch('https://ya-praktikum.tech/api/v2/oauth/yandex', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    code,
                    redirect_uri: window.location.origin,
                }),
            }).then(async (val) => (response = await val.text()));
            if (response) {
                getUserInfo().then((res) => {
                    dispatch(userActions.setUserInfo(res.data));
                    localStorage.setItem(
                        USER_LOCALSTORAGE_KEY,
                        JSON.stringify(res.data),
                    );
                    dispatch(userActions.initAuthData());
                });
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            sendCodeToBff(code);
        }
    }, []);
    return <></>;
};
