const BASE_URL = 'https://dev.codeleap.co.uk/careers/';

const requestAPI = async (endpoint: string, method = 'GET', body = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    try {
        const options: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (method !== 'GET' && method !== 'HEAD' && method !== 'DELETE') {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        if (method === 'DELETE') return response;
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
};

export default requestAPI;
