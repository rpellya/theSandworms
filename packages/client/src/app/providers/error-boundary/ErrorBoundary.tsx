import React, { Component, ErrorInfo, ReactNode } from 'react';
import cls from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    errorMessage: string | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
    state: State = {
        hasError: false,
        errorMessage: null,
    };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Ошибка перехвачена ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={cls.errorBoundary}>
                    <h1>Что-то пошло не так.</h1>
                    <p>{this.state.errorMessage}</p>
                </div>
            );
        }

        return this.props.children;
    }
}
