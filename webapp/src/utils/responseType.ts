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