import { useAuth } from 'react-oidc-context'

export const useFetch = () => {
    const auth = useAuth();

    const authFetch = async (url, options = {}) => {
        const token = auth.user?.access_token;
        console.log('token being sent:', token);
        console.log('auth.user:', auth.user);
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });
    };

    return authFetch;
};