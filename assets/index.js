

const ROLE = Object.freeze({
    ADMIN: "ADMIN",
    MODERATOR: "MODERATOR",
    USER: "USER",
}
);

const ACTION = Object.freeze({
    CREATE: "CREATE",
    READ: "READ",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
}
);

let rights = new Map();

rights.set(ACTION.CREATE, [ROLE.ADMIN, ROLE.USER]);
rights.set(ACTION.READ, [ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER]);
rights.set(ACTION.UPDATE, [ROLE.MODERATOR]);
rights.set(ACTION.DELETE, [ROLE.ADMIN]);

/*
checkPermission(ACTION.CREATE, ROLE.ADMIN);
checkPermission(ACTION.DELETE, ROLE.USER);
checkPermission(ACTION.UPDATE, ROLE.MODERATOR);*/




class User{
    constructor(name, surname, email, role) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
    };

    static checkPermission(act, role){
        if (rights.get(act).includes(role)) console.log("YES");
        else console.log("NO");
    };
}

const admin = new User("Admin", "Adminovich", "admin@gmail.com", ROLE.ADMIN);
