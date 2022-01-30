export interface IUser{
    readonly  id?:number,
      name:string,
      email:string,
      password:string
  }
  
  export interface IUserDetail extends IUser{
      id?:number,
      name:string,
      email:string,
      password:string
  }
  
  export function createUser({ name , email, password}: any):IUser{
      return {
         name, email, password
      }
  }
  
  export function createUsers(data: any[]):IUser[]{
      return data.map(createUser)
  }
  
  
  export function createUserById({ name , email, password}:any):IUserDetail{
      return {
          name, email, password
       }
  }
  
  export function createUserByEmail({ name , email, password}:any): IUserDetail{
      return {
          name, email, password
       }
  }
  
  
  