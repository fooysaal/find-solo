// server/api/register.post.ts
import { userRepository } from "~/server/repository/user";

export default defineEventHandler(async (event) => {
 
 const userData: any = {
  email: "jonh.doe@gmail.com",
  password: "12344",
  name: "Jonh Doe",
 }
 
 const result = userRepository.createUser(userData);

 return {
  data: result
 }
})