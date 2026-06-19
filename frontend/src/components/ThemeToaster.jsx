import React from 'react';
import toast, { Toaster, ToastBar } from 'react-hot-toast';

const ThemeToaster = () => {
    return (
        <Toaster toastOptions={{
            style: {
                background: "var(--color-base-100)",
                color: 'var(--color-netural-content)',
                border: '3px solid var(--color-base-300)'
            }
        }}>
        </Toaster>
    );
};


export default ThemeToaster