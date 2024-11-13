// server/api/auth/login.post.ts

import {User} from "@prisma/client";
import {userRepository} from "~/server/repository/User";
import {PasswordHasher} from "~/server/providers/PasswordHasher";
import {tokenGenerator} from "~/server/providers/TokenGenerator";

export default defineEventHandler(async (event) => {
 
 const body = await readBody(event);
 
 // Validate user exists
 const user = await userRepository.getUserByEmail(body.email) as User;
 
 if( !user ) {
  return {
   status: 400,
   message: "Invalid credentials "
  }
 }
 
 // Validate user password
 const passwordHash = new PasswordHasher();
 const passwordIsValid = await passwordHash.compare_passwords(body.password, user.password);
 
 // Return if password is not valid 
 if( !passwordIsValid ) {
  return {
   status: 400,
   message: "Invalid credentials "
  }
 }
 
 // Generate token
 const token = await tokenGenerator.generate({email: user.email, id: user.id}, process.env.JWT_SECRET as string, { expiresIn: "1d"});
 
 // Setting Cookies
 event.node.res.setHeader('Set-Cookie', `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`);
 
 return {
  status: 200,
  message: "User logged in successfully"
 }
 
});