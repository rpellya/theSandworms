import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import { rootReducer } from 'store/rootReduser';
import { configureStore } from '@reduxjs/toolkit';
import { fetchUserThunk } from 'store/userInfoSlice';

export const render = async (url: string) => {
    const store = configureStore({
        reducer: rootReducer,
    });

    await store.dispatch(fetchUserThunk());

    return {
        html: renderToString(
            <Provider store={store}>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </Provider>,
        ),
        initialState: store.getState(),
    };
};
