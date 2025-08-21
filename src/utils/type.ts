export type Note = {
    id: string,
    title: string,
    body: string,
    createdAt: string,
    archived: boolean,
    owner: string,
}

export type UserProfile = {
    id: string,
    name: string,
    email: string,
}

export type ApiResponse<T> = {
    error: boolean,
    data: T | null,
    message: string | null,
}
