import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
const app = express();
import router from './router/router.js';
import middleware from './controllers/middleware.js'


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static('public'));
// on permet l'accès à public grâce à notre app.use avec express

app.use(middleware)
app.use('/', router)



const PORT = process.env.PORT || 9300;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
