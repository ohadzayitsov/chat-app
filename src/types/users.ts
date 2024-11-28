//comment why optional fields? also code can be called id
export interface User{
code: number,
password?:string,
user_name?: string,
image?:string
}