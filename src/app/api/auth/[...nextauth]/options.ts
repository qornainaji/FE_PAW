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
                let client: MongoClient | null = null;
                console.log('credentials', credentials);

                try {
                    console.log('Connecting to MongoDB');
                    // MONGO_URI in .env.local
                    const uri = process.env.MONGO_URI as string;
                    console.log('uri', uri);
                    const client = new MongoClient(uri, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    } as any);
                    console.log('client', client);

                    await client.connect();
                    console.log('Connected to MongoDB');
                    console.log('credentials', credentials);

                    const user = await client
                        .db('PAW')
                        .collection('users')
                        .findOne({
                            user_name: credentials.username,
                            user_password: credentials.password,
                        });
            
                    if (user) {
                        return Promise.resolve(user);
                    } else {
                        console.log('User not found');
                        return Promise.resolve(null);
                    }
                }   catch (error) {
                    return Promise.resolve(null);
                }   finally {
                    if (client) {
                        await client.close();
                    }
                }
              },
        }),
    ],
}
