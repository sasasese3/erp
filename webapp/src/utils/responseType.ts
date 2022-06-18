export type UserResponse = {
    msg: string;
    data: {
        id: number;
        email: string;
        firstname: string;
        lastname: string;
        role: string;
    };
};

export type Employee = {
    id: number;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    verified: boolean;
};