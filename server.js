import express, { application } from 'express'
import injectRoutes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

injectRoutes(app);

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
        console.log("Server listening on port", PORT);
});