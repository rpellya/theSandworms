import { NavigateFunction } from 'react-router-dom';

export const logout = (
    logoutApi: () => Promise<string>,
    navigate: NavigateFunction,
) => {
    logoutApi()
        .then((res) => {
            if (res === 'OK') {
                navigate('/login');
            }
        })
        .catch((e) => console.error('Ошибка при выходе:', e));
};
