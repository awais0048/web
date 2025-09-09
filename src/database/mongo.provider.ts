import { MongoClient, Db } from 'mongodb';

export const databaseProviders = [
    {
        provide: 'MONGO_CONNECTION',
        useFactory: async (): Promise<Db> => {

            const client = new MongoClient(process.env.DB_URL!);
            await client.connect();
            return client.db(process.env.DB_NAME); // your database name
        },
    },
];
