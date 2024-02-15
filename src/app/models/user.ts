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

export interface PaginatedUser {
  limit: number;
  message: string;
  offset: number;
  success: boolean;
  total_users: number;
  users: RawUser[];
}

export class User {
  get name(): string {
    return `${this.user.first_name} ${this.user.last_name}`;
  }

  get from(): string {
    return `${this.user.city}, ${this.user.state}, ${this.user.country}`;
  }

  get id(): number {
    return this.user.id;
  }
  get avatar(): string {
    return this.user.profile_picture;
  }

  get job(): string {
    return this.user.job;
  }

  constructor(private user: RawUser) {}
}
