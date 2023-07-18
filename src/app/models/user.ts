export class User {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phone: string;
    token: string;
    isAdmin: boolean;
    id: string;

    constructor(init?: Partial<User>) {
        this.firstName = init.firstName;
        this.lastName = init.lastName;
        this.userName = init.userName;
        this.email = init.email;
        this.phone = init.phone;
        this.token = init.token;
        this.isAdmin = init.isAdmin;
        this.id = init.id;
    }
}

// @todo potentially move Register user to a new models file, or rename user.ts to have a more generalize name
export class RegisterUser {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phone: string;
    password: string;
    isAdmin: boolean;

    constructor(init?: Partial<RegisterUser>) {
        this.firstName = init.firstName;
        this.lastName = init.lastName;
        this.userName = init.userName;
        this.email = init.email;
        this.phone = init.phone;
        this.password = init.password;
        this.isAdmin = init.isAdmin;
    }
}

export class GetUsersOutput {
    users: User[] 

    constructor(init?: Partial<GetUsersOutput>) {
        this.users = init.users;
    }
}