import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_URL = process.env.BACKEND_URL;

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "text", placeholder: "user@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          if (!credentials) return null;

          const response = await fetch(BACKEND_URL + "/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          })

          const json = await response.json();
    
          if (response.ok) {
            // Any object returned will be saved in `user` property of the JWT

            const meResponse = await fetch(BACKEND_URL + "/api/v1/auth/me", {
              headers: {
                Authorization: "Bearer " + json.token,
                "Content-Type": "application/json"
              }
            })
            const jsonResponse = await meResponse.json() as any;

            return {
              token: json.token,
              ...jsonResponse.data};
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            throw new Error(json.msg);
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      }),
      
    ],
    callbacks: {
      async jwt({token, user}) {
        return {...token, ...user}
      },
      async session({ session, token, user}) {
        session.user = token as any;
        return session;
      }
    },
    pages: {
      signIn: "/auth/login"
    },
    session: {strategy: 'jwt'}
}