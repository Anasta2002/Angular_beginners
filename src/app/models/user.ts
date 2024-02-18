// API
export interface RawUser {
  id: number;
  gender: string;
  date_of_birth: string;
  job: string;
  city: string;
  zipcode: string;
  latitude: number;
  profile_picture: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street: string;
  state: string;
  country: string;
  longitude: number;
}

export interface PaginatedUsers {
  limit: number;
  message: string;
  offset: number;
  success: boolean;
  total_users: number;
  users: RawUser[];
}

export class User {
  get name(): string {
    return `${this.rawUser.first_name} ${this.rawUser.last_name}`;
  }

  get from(): string {
    return `${this.rawUser.city}, ${this.rawUser.state}, ${this.rawUser.country}`;
  }

  get id(): number {
    return this.rawUser.id;
  }

  get avatar(): string {
    return this.rawUser.profile_picture;
  }

  get job(): string {
    return this.rawUser.job;
  }

  get phone(): string {
    return this.rawUser.phone;
  }

  get email(): string {
    return this.rawUser.email;
  }

  get fromSudan(): boolean {
    return this.rawUser.country === 'Sudan';
  }

  constructor(public rawUser: RawUser) {}
}
