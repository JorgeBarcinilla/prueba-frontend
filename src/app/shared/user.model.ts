export class User {
    id: number;
    name: string;
    surnames: string;
    identification: string;
    date_birth: string;
    country: {};
    city: {}; 
}

export class UserFilter {
    name: string;
    identification: string;
    date_birth: string;
    country: string;
    city: string; 
}

export class Country {
    id: number;
    name: string;
    cities: City[]; 
}

export class City {
    id: number;
    name: string;
}
