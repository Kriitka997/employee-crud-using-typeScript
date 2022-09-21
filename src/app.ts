import express from 'express';
import './utils/db_connection';
import bodyParser from 'body-parser';
import route from './routes/routes';

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/', route);

app.listen(3000, () => {
    console.log("server running......")
})