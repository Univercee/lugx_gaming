"use server"
import { Configuration, EmailsApi, EmailMessageData } from '@elasticemail/elasticemail-client-ts-axios';

const config = new Configuration({
    apiKey: process.env.ELASTIC_EMAIL_API_KEY
});
const emailsApi = new EmailsApi(config);

//
export async function sendVerificationEmail(email: string, token: string){
    const confirmLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`;
    const emailMessageData = {
        Recipients: [
          { 
            Email: email,
            Fields: {
              link: confirmLink
            }
          }
        ],
        Content: {
          Body: [
            {
              ContentType: "HTML",
              Charset: "utf-8",
              Content: "<p>Click <a href='{link}'>here</a> to verify email.</p>"
            }
          ],
          From: process.env.MAIL_FROM,
          Subject: "Your verification code"
        }
      } as EmailMessageData;
    emailsApi.emailsPost(emailMessageData).then((response) => {
        console.log('API called successfully.');
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    });
};

//
export async function sendResetPasswordEmail(email: string, token: string){
    const confirmLink = `${process.env.BASE_URL}/auth/new-password?token=${token}`;
    const emailMessageData = {
        Recipients: [
          { 
            Email: email,
            Fields: {
              link: confirmLink
            }
          }
        ],
        Content: {
          Body: [
            {
              ContentType: "HTML",
              Charset: "utf-8",
              Content: "<p>Click <a href='{confirmLink}'>here</a> to reset password.</p>"
            }
          ],
          From: process.env.MAIL_FROM,
          Subject: "Reset your password"
        }
      } as EmailMessageData;
    emailsApi.emailsPost(emailMessageData).then((response) => {
        console.log('API called successfully.');
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    });
};

//
export async function sendTwoFactorEmail(email: string, token: string){
    const emailMessageData = {
        Recipients: [
          { 
            Email: email,
            Fields: {
              token: token
            }
          }
        ],
        Content: {
          Body: [
            {
              ContentType: "HTML",
              Charset: "utf-8",
              Content: "<p>Your 2FA code: {token}</p>"
            }
          ],
          From: process.env.MAIL_FROM,
          Subject: "2FA code"
        }
      } as EmailMessageData;
    emailsApi.emailsPost(emailMessageData).then((response) => {
        console.log('API called successfully.');
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    });
};