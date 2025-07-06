import { classNames } from 'app/lib/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import LightIcon from 'assets/icons/theme-light.svg';
import DarkIcon from 'assets/icons/theme-dark.svg';
import { memo } from 'react';
import cls from './ThemeSwitcher.module.scss';
import { Button, ButtonVariant } from 'components/Button';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            onClick={toggleTheme}
            theme={ButtonVariant.CLEAR}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
        >
            {theme === Theme.LIGHT ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
});
