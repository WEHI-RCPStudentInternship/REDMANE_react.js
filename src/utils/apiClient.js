import { useAuth0 } from '@auth0/auth0-react';

export const useFetch = () => {
    const { getAccessTokenSilently } = useAuth0();

    const authFetch = async (url, options = {}) => {
        const token = await getAccessTokenSilently({
            authorizationParams: {
                audience: 'redmane',
            }
        });
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