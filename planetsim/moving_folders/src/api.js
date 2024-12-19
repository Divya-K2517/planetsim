const API_URL = 'http://localhost:3001/api';


    async function getMercury() {
        const response = await fetch(`${API_URL}/mercury_questions`);
        if (!response.ok) {
            throw new Error('Failed to fetch mercury_questions');
        }
        return response.text();
    };
    export {getMercury};

    async function getVenus() {
        const response = await fetch(`${API_URL}/venus_questions`);
        if (!response.ok) {
            throw new Error('Failed to fetch venus_questions');
        }
        return response.json();
    }
    export {getVenus};

    async function getEarth() {
        const response = await fetch(`${API_URL}/earth_questions`);
        if (!response.ok) {
            throw new Error('Failed to fetch earth_questions');
        }
        return response.json();
    }
    export {getEarth};

    async function getMars() {
        const response = await fetch(`${API_URL}/mars_questions`);
        if (!response.ok) {
            throw new Error('Failed to fetch mars_questions');
        }
        return response.json();
    }
    export {getMars};

    async function getJupiter() {
        const response = await fetch(`${API_URL}/jupiter_questions`);
        if (!response.ok) {
            throw new Error('Failed to fetch jupiter_questions');
        }
        return response.json();
    }
    export {getJupiter};

    async function getSaturn() {
        const response = await fetch(`${API_URL}/saturn_questions`);
        if (!response.ok) {
            throw new Error('Failed to fetch saturn_questions');
        }
        return response.json();
    }
    export {getSaturn};

    async function getUranus() {
        const response = await fetch(`${API_URL}/uranus_questions`);
        if (!response.ok) {
            throw new Error('Failed to fetch uranus_questions');
        }
        return response.json();
    }
    export {getUranus};

    async function getNeptune() {
        const response = await fetch(`${API_URL}/neptune_questions`);
        if (!response.ok) {
            throw new Error('Failed to fetch neptune_questions');
        }
        return response.json();
    }
    export {getNeptune};

