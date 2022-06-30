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
    createdAt: string;
    SupplierId: number;
    total_price: string | number;
};

export type AP3Payload = {
    createdAt: string;
    customerName: string,
    id: string,
    type: string,
    price: string | number,
    tax: string | number,
    priceWithTax: string | number,
};

export type RVPayload = {
    createdAt: string;
    SupplierId: string | number;
    total_price: string | number;
    customerName: string,
    id: string,
    detail: string,
};

export type Product = {
    id: number;
    name: number;
    amount: number;
    stock: number;
    per_amount: number;
    price: number;
};