import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { CredentialsProvider } from 'next-auth/providers'
import Credentials from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'teti-satu!' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Retrieve user data from MongoDB
                const user = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' },
                }).then((res) => res.json())

                // Any object returned will be saved in `user` property of the JWT
                if (user) {
                    return user
                }
                // If you return null or false then the credentials will be rejected
                return null
            },
        }),
    ],
    
}
