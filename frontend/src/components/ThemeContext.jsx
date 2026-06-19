import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== undefined) {
            const storedTheme = localStorage.getItem('theme') || 'nord';
            window.document.documentElement.dataset.theme = storedTheme
            return storedTheme;
        }
        return 'nord';
    });

    const toggleTheme = () =>  {
        setTheme(theme === 'nord' ? 'dark' : 'nord');
    }

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={[theme, toggleTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);