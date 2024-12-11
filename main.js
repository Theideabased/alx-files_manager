import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await setTimeout(() => {
                i += 1;
                if (i >= 10) {
                    reject(new Error("Failed to connect to the database."));
                } else if (!dbClient.isAlive()) {
                    repeatFct();
                } else {
                    resolve();
                }
            }, 1000);
        };
        repeatFct();
    });
};

const seedData = async () => {
    const users = [
        { name: "User1", email: "user1@example.com" },
        { name: "User2", email: "user2@example.com" },
        { name: "User3", email: "user3@example.com" },
        { name: "User4", email: "user4@example.com" },
    ];
    const files = Array.from({ length: 30 }, (_, i) => ({
        filename: `file${i + 1}`,
        size: `${(i + 1) * 10}KB`,
    }));

    try {
        await dbClient.db.collection('users').insertMany(users);

        await dbClient.db.collection('files').insertMany(files);
    } catch (err) {
        console.error("Error seeding data:", err);
    }
};

(async () => {
    console.log(dbClient.isAlive());
    await waitConnection();
    await seedData(); // Seed the data before checking counts
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
})();