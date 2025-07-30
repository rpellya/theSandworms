import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ErrorBoundary } from 'app/providers/error-boundary/ErrorBoundary';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import './app/styles/index.scss';
import { MusicProvider } from './app/providers/MusicProvider/MusicProvider';

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
                        '/bg/bg-001.webp',
                        '/bg/bg-002.webp',
                        '/bg/bg-003.webp',
                        '/bg/bg-004.webp',
                        '/bg/bg-005.webp',
                        '/bg/bg-006.webp',
                        '/bg/bg-007.webp',
                        '/bg/bg-008.webp',
                        '/faces/face-001.webp',
                        '/faces/face-002.webp',
                        '/faces/face-003.webp',
                        '/faces/face-004.webp',
                        '/faces/face-005.webp',
                        '/faces/face-006.webp',
                        '/faces/face-007.webp',
                        '/faces/face-008.webp',
                        '/faces/face-009.webp',
                        '/faces/face-010.webp',
                        '/faces/face-011.webp',
                        '/faces/face-012.webp',
                        '/faces/face-013.webp',
                        '/faces/face-014.webp',
                        '/src/assets/img/profileMockImg.webp',
                        '/music/bg1.mp3',
                        '/music/bg2.mp3',
                        '/music/bg3.mp3',
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

!__IS_DEV__ && startServiceWorker();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ErrorBoundary>
                    <ThemeProvider>
                        <MusicProvider>
                            <App />
                        </MusicProvider>
                    </ThemeProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
