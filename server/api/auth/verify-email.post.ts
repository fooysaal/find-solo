// server/api/auth/verifyEmail.post.ts

import {tokenGenerator} from "~/server/providers/TokenGeneraator";
import {userRepository} from "~/server/repository/User";

export default defineEventHandler(async (event) => {
 const query = getQuery(event)
 if( !query.token) {
  return {
   status: 400,
   body: { message: "Invalid token" }
  }
 }
 
 // Verify the email
 try {
  const result = await tokenGenerator.validate(query.token as string, process.env.JWT_SECRET as string) as {email: string}
  
  const user = await userRepository.getUserByEmail(result.email);
  
  if( !user ) {
   return {
    status: 400,
    body: { message: "User not found" }
   }
  }
  
  if( user && user.emailConfirmed ) {
   return {
    status: 400,
    body: { message: "User Email already confirmed." }
   }
  }
  
  await userRepository.confirmEmail(result.email as string, { emailConfirmed: true })
  
  return {
   status: 200,
   body: { message: "Email verified", email: result.email }
  }
 }catch (e) {
  return {
   status: 400,
   body: { message: "Invalid token" }
  }
 }
});