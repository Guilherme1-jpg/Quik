import { Replace } from '../../../helpers/replace';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export class User {
  private _id: number;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: number) {
    this._id = id ?? null;
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
