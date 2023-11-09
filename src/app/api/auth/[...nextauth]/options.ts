import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

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
                password: { label: 'Password', type: 'password', placeholder: 'teti-satu!' },
            },
            async authorize(credentials) {
                // Retrieve user data from MongoDB
                const user = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' },
                }).then((res) => res.json())

                if (credentials?.username === user.username && credentials?.password === user.password) {
                    return user
                }
                // If you return null or false then the credentials will be rejected
                return null
            },
        }),
    ],
}
