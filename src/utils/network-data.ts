import type { ApiResponse, Note, UserProfile } from "./type";

const BASE_URL = 'https://notes-api.dicoding.dev/v1';

function getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken: string): void {
    return localStorage.setItem('accessToken', accessToken);
}

function removeAccessToken(): void {
    return localStorage.removeItem('accessToken');
}

async function fetchWithToken(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
}

async function login({ email, password }: { email: string, password: string }): Promise<ApiResponse<{ 'accessToken': string }>> {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null, message: responseJson.message };
    }

    return { error: false, data: responseJson.data, message:null };
}

async function register({ name, email, password }: { name: string, email: string, password: string }): Promise<ApiResponse<null>> {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null, message:responseJson.message };
    }

    return { error: false, data: null, message:null };
}

async function getUserLogged(): Promise<ApiResponse<UserProfile>> {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null , message:responseJson.message};
    }

    return { error: false, data: responseJson.data, message:null };
}

async function addNote({ title, body }: { title: string, body: string }): Promise<ApiResponse<Note>> {
    const response = await fetchWithToken(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null , message:responseJson.message};
    }

    return { error: false, data: responseJson.data , message:null};
}

async function getActiveNotes(): Promise<ApiResponse<Note[]>> {
    const response = await fetchWithToken(`${BASE_URL}/notes`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null, message:responseJson.message };
    }

    return { error: false, data: responseJson.data, message:null };
}

async function getArchivedNotes(): Promise<ApiResponse<Note[]>> {
    const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null, message:responseJson.message };
    }

    return { error: false, data: responseJson.data, message:null };
}

async function getNote(id: string): Promise<ApiResponse<Note>> {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null, message: responseJson.message };
    }

    return { error: false, data: responseJson.data, message:null };
}

async function archiveNote(id: string): Promise<ApiResponse<Note>> {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
        method: 'POST',
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null, message: responseJson.message };
    }

    return { error: false, data: responseJson.data, message: null };
}

async function unarchiveNote(id: string): Promise<ApiResponse<Note>> {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
        method: 'POST',
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null, message: responseJson.message };
    }

    return { error: false, data: responseJson.data, message: null };
}

async function deleteNote(id: string): Promise<ApiResponse<Note>> {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null, message: responseJson.message };
    }

    return { error: false, data: responseJson.data, message: null };
}

export {
    getAccessToken,
    putAccessToken,
    removeAccessToken,
    login,
    register,
    getUserLogged,
    addNote,
    getActiveNotes,
    getArchivedNotes,
    getNote,
    archiveNote,
    unarchiveNote,
    deleteNote,
};