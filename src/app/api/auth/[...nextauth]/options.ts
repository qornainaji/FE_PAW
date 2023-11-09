import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoClient } from 'mongodb'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'teti-satu!' },
                password: { label: 'Password', type: 'password', placeholder: 'Hush, it\'s a secret!' },
            },
            async authorize(credentials) {
                const uri = process.env.MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true } as any);

                try {
                    console.log('Connecting to MongoDB...');
                    await client.connect();
                    console.log('Connected to MongoDB!');

                    // Use the appropriate collection and find query based on your MongoDB setup
                    const user = await client.db('PAW').collection('users').findOne({
                        username: credentials?.username,
                        password: credentials?.password,
                    });

                    if (user) {
                        return Promise.resolve(user);
                    } else {
                        return Promise.resolve(null);
                    }
                } finally {
                    await client.close();
                }
            },
        }),
    ],
}
