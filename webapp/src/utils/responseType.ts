export type UserResponse = {
    msg: string;
    data: Employee;
};

export type Employee = {
    id?: number;
    email?: string;
    username?: string;
    ssn?: string;
    firstname?: string;
    lastname?: string;
    position?: string;
    department?: string;
    birthdate?: string;
    address?: string;
    phono_no?: string;
    role?: string;
    verified?: string;
};