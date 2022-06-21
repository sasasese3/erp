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
    seller_name: string;
    account_name: string;
    producer_name: string;
    total_price: string | number;
};

export type Product = {
    product_name: string;
    amount: number;
    stock: number;
    per_amount: number;
    price: number;
};