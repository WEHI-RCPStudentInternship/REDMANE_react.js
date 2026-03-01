import { useAuth } from 'react-oidc-context'

export const useFetch = () => {
    const auth = useAuth();

    const authFetch = async (url, options = {}) => {
        const token = auth.user?.access_token;
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