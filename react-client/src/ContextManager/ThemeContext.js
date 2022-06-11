import React, {useState, createContext, useContext} from 'react';

export const ThemeContext = createContext();

export const ThemeContextProvider = props => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode(prevDarkMode => !prevDarkMode);
    }

    return (
        <ThemeContext.Provider 
        value={{
            isDarkMode,
            toggleDarkMode
        }}
        >
            {props.children}
        </ThemeContext.Provider>
    )
}