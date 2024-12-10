import MongoClient from 'mongodb';

class DBClient {
    constructor() {
        this.host = 'localhost';
        this.port = '27017';
        this.dbName = 'files_manager';
        this.url = `mongodb://${this.host}:${this.port}`;
        this.client = new MongoClient(url);

        this.client.connect();
    }
    isAlive() {
       if (this.client?.isConnected()){
        return true
       } else {
        return false
       }
    }
}