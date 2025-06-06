import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SnakeGame } from './SnakeGame';
import { Provider } from 'react-redux';
import { store } from 'store';

const resizeWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
    });
    window.dispatchEvent(new Event('resize'));
};

const resizeWindowHeight = (height: number) => {
    Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: height,
    });
    window.dispatchEvent(new Event('resize'));
};

const testWidth = 450;
const testHeight = 250;

describe('Game engine tests', () => {
    let canvas: HTMLCanvasElement;

    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SnakeGame
                        onExit={() => {
                            return '';
                        }}
                    />
                </BrowserRouter>
            </Provider>,
        );
        canvas = screen.getByTestId('canvas') as HTMLCanvasElement;
    });

    test('Should initial score view has to be zero', () => {
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('Should window-s resizing is correct', () => {
        resizeWindowWidth(testWidth);
        resizeWindowHeight(testHeight);

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        expect(canvasWidth).toBe(testWidth);
        expect(canvasHeight).toBe(testHeight);
    });

    test('Should update canvas due to mouse moves over', () => {
        const moveHandler = jest.fn();
        canvas.addEventListener('mousemove', moveHandler);

        const event = new MouseEvent('mousemove', {
            clientX: testHeight,
            clientY: testWidth,
        });
        canvas.dispatchEvent(event);

        expect(moveHandler).toHaveBeenCalled();
        expect(moveHandler).toHaveBeenCalledWith(event);
    });

    test('Should update canvas on mouse coordinates', () => {
        const context = canvas.getContext('2d');

        if (context) {
            const draw = (x: number, y: number) => {
                context.beginPath();
                context.arc(x, y, 10, 0, 2 * Math.PI);
                context.fill();
            };

            canvas.addEventListener('mousemove', (event) => {
                draw(event.clientX, event.clientY);
            });

            const event = new MouseEvent('mousemove', {
                clientX: testWidth,
                clientY: testHeight,
            });
            canvas.dispatchEvent(event);

            const mockBeginPath = jest.spyOn(context, 'beginPath');
            const mockArc = jest.spyOn(context, 'arc');
            const mockFill = jest.spyOn(context, 'fill');

            expect(mockBeginPath).toHaveBeenCalled();
            expect(mockArc).toHaveBeenCalledWith(500, 300, 10, 0, 2 * Math.PI);
            expect(mockFill).toHaveBeenCalled();
        }
    });

    afterEach(() => {
        cleanup();
    });
});
