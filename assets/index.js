

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

const rights = new Map();

rights.set(ACTION.CREATE, [ROLE.ADMIN, ROLE.USER]);
rights.set(ACTION.READ, [ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER]);
rights.set(ACTION.UPDATE, [ROLE.MODERATOR]);
rights.set(ACTION.DELETE, [ROLE.ADMIN]);


const CRUD2 = new Map();

const ADMIN = {
    ADMIN: [ACTION.READ,ACTION.UPDATE,ACTION.DELETE],
    MODERATOR:[ACTION.CREATE, ACTION.READ,ACTION.UPDATE,ACTION.DELETE],
    USER: [ACTION.CREATE, ACTION.READ,ACTION.UPDATE,ACTION.DELETE],
};

const MODERATOR = {
    ADMIN: [],
    MODERATOR: [ACTION.READ],
    USER: [ACTION.CREATE, ACTION.READ,ACTION.UPDATE],
}

const USER = {
        ADMIN: [],
        MODERATOR: [ACTION.READ],
        USER: [ACTION.READ],
    };

const SELF = {
        ADMIN: [ACTION.READ, ACTION.UPDATE],
        MODERATOR: [ACTION.READ, ACTION.UPDATE],
        USER: [ACTION.READ, ACTION.UPDATE, ACTION.DELETE],
    };



CRUD2.set(ROLE.ADMIN,ADMIN);
CRUD2.set(ROLE.MODERATOR,MODERATOR);
CRUD2.set(ROLE.USER, USER);
CRUD2.set("SELF", SELF);

const CRUD = {
    ADMIN: {
        ADMIN: [ACTION.READ,ACTION.UPDATE,ACTION.DELETE],
        MODERATOR:[ACTION.CREATE, ACTION.READ,ACTION.UPDATE,ACTION.DELETE],
        USER: [ACTION.CREATE, ACTION.READ,ACTION.UPDATE,ACTION.DELETE],
    },
    MODERATOR: {
        ADMIN: [],
        MODERATOR: [ACTION.READ],
        USER: [ACTION.CREATE, ACTION.READ,ACTION.UPDATE],
    },
    USER: {
        ADMIN: [],
        MODERATOR: [ACTION.READ],
        USER: [ACTION.READ],
    },
    SELF:{
      ADMIN: [ACTION.READ, ACTION.UPDATE],
      MODERATOR: [ACTION.READ, ACTION.UPDATE],
      USER: [ACTION.READ, ACTION.UPDATE, ACTION.DELETE],
    },
};



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

    static checkPermission(act,userMe, userChecked) {
        const role = (userMe.email === userChecked.email) ? "SELF" : userMe.role;

        if (rights.get(act).includes(userChecked.role)) {
            const me = CRUD2.get(role);

            return (CRUD2.get(role)[userChecked.role].includes(act));
        };
        return false;
    }
    /*static checkPermission(act,userMe, userChecked){
        const role = (userMe.email === userChecked.email) ? "SELF" : userMe.role;

         if (rights.get(act).includes(userChecked.role)){
             return (CRUD[role][userChecked.role].includes(act));
         };
         return false;
    };*/
}

const admin = new User("Admin", "Adminovich", "admin@gmail.com", ROLE.ADMIN);
const user = new User("User", "Userov", "user@gmail.com", ROLE.USER);
const moderator = new User("Moderator", "Moderatorov", "moder@gmail.com", ROLE.MODERATOR);

