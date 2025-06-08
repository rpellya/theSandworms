// client/src/entry-server.tsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './store';

export function render(url: string) {
    return renderToString(
        <Provider store={store}>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </Provider>,
    );
}
