// server/api/register.post.ts
import {validateRegisterUser} from "~/server/utils/validators";
import {userRepository} from "~/server/repository/User";
import { PasswordHasher } from "~/server/providers/PasswordHasher";

export default defineEventHandler(async (event) => {
 const bodyData = await readBody(event); // 1
 
 await validateRegisterUser(bodyData); // 2

 const passwordHash = new PasswordHasher(10);
 bodyData.password = await passwordHash.hash_password(bodyData.password);
// creating user
 await userRepository.createUser(bodyData); // 3

//  // Getting request object
// const req = event.node.req; // 1

// // Get the host URL
// const protocol = req.headers['x-forwarded-proto'] || 'http';
// const host = req.headers.host;
// const url = `${protocol}://${host}/auth/verify-email`;

// // Generating token
// const token = await tokenGenerator.generate(user, 
//                 process.env.JWT_SECRET as string, {expiresIn: '1d'}); // 3

// // Sending email verification
// await mailer.sendEmail(bodyData.email, `${url}?token=${token}` );
 
 return {
  status: 201,
  message: "User registered successfully"
 }
})