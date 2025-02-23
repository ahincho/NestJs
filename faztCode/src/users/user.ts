export class User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  age: number;
  constructor(id: number, name: string, lastname: string, email: string, password: string, age: number) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.age = age;
  }
}