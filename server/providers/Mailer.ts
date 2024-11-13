// server/providers/Mailer.ts

import sgMail from '@sendgrid/mail';
import type { MailDataRequired } from "@sendgrid/helpers/classes/mail";

class Mailer {
 defaults = {
  from: 'find_solo_authorized_account@mail.com', // 1
  subject: 'Find Solo - Email Verification'
 };
 
 sender: typeof sgMail;
 
 constructor() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  this.sender = sgMail;
 }
 
 async sendEmail(to: string, link: string) {
  const message: MailDataRequired = {
   ...this.defaults,
   to,
   html: `
        <div>
          <h3>Verify your email</h3>
          <p>
            Hello ${to} Please click the link below to verify your email.
          </p>
          <a href="${link}">Verify Email</a>
        </div>
      `,
  };
  return await this.sender.send(message);
 }
}
export const mailer = new Mailer();