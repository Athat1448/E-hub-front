import React, { createContext, useContext, useState } from 'react';

const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const validateAuthorization = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/user/validate', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
            }
        } catch (error) {
            console.error('Error validating authorization:', error);
        }
    };

    return (
        <AuthorizationContext.Provider value={{ isAuthenticated, validateAuthorization }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export const useAuthorization = () => useContext(AuthorizationContext);