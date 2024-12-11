import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        // Retrieve environment variables with defaults
        this.host = process.env.DB_HOST || 'localhost';
        this.port = process.env.DB_PORT || '27017';
        this.dbName = process.env.DB_DATABASE || 'files_manager';
        this.url = `mongodb://${this.host}:${this.port}`;

        // Create a new MongoClient instance
        this.client = new MongoClient(this.url, { useUnifiedTopology: true });

        // Connect to MongoDB
        this.client.connect()
            .then(() => {
                this.db = this.client.db(this.dbName);
            })
            .catch((err) => {
                console.error('MongoDB connection error:', err);
                this.db = null; // Ensure db remains undefined if connection fails
            });
    }

    // Method to check if the client is connected
    isAlive() {
        return this.client?.topology?.isConnected() || false;
    }

    // Method to count the number of documents in the 'users' collection
    async nbUsers() {
        try {
            if (!this.db) throw new Error('Database not initialized');
            const collection = this.db.collection('users');
            return await collection.countDocuments({});
        } catch (err) {
            console.error('Error while counting users:', err);
            return 0; // Return 0 if there's an error
        }
    }

    // Method to count the number of documents in the 'files' collection
    async nbFiles() {
        try {
            if (!this.db) throw new Error('Database not initialized');
            const collection = this.db.collection('files');
            return await collection.countDocuments({});
        } catch (err) {
            console.error('Error while counting files:', err);
            return 0; // Return 0 if there's an error
        }
    }
}

// Export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
