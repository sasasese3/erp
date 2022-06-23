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
    verified?: boolean;
};

export type RegisterPayload = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    id: string;
    phone_no: string;
    ssn: string;
    birthdate: string;
    address: string;
    department: string;
    position: string;
};

export type POPayload = {
    date: string;
    create_name: string;
    employee_id: string;
    account_name: string;
    supplier_id: number;
    total_price: string | number;
};

export type Product = {
    id: number;
    name: number;
    amount: number;
    stock: number;
    per_amount: number;
    price: number;
};