import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import './app/styles/index.scss';
import { Provider } from 'react-redux';
import { store } from 'store';

function startServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    let resources = [
                        ...performance
                            .getEntriesByType('resource')
                            .map((r) => r.name),
                    ];
                    const staticResources = [
                        '/src/assets/bg/bg-001.webp',
                        '/src/assets/bg/bg-002.webp',
                        '/src/assets/bg/bg-003.webp',
                        '/src/assets/bg/bg-004.webp',
                        '/src/assets/bg/bg-005.webp',
                        '/src/assets/bg/bg-006.webp',
                        '/src/assets/bg/bg-007.webp',
                        '/src/assets/bg/bg-008.webp',
                        '/src/assets/faces/face-001.webp',
                        '/src/assets/faces/face-002.webp',
                        '/src/assets/img/profileMockImg.webp',
                    ];

                    resources = resources.concat(staticResources);

                    const uniqueRes = [...new Set(resources)];

                    const data = {
                        type: 'CACHE_URLS',
                        payload: [location.href, ...uniqueRes],
                    };

                    registration.installing?.postMessage(data);
                    console.log(
                        'ServiceWorker registration successful with scope: ',
                        registration.scope,
                    );
                })
                .catch((error: string) => {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }
}

startServiceWorker();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
