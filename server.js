const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const  cors = require('cors')
const knex = require('knex');
const register = require('./controllers/register.controller');
const signin = require('./controllers/signin.controller');
const profile = require('./controllers/profile.controller');
const {handleImage, handleApiCall} = require('./controllers/image.controller');



process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
    client: 'pg',
    connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: true
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {
    res.send('success');
})

app.post('/signin',signin.handleSigin( db, bcrypt));

app.post('/register',register.handleRegister( db, bcrypt));

app.get('/profile/:id',profile.handleProfile(db));
app.put('/image',handleImage(db));
app.post('/imageurl',(req,res) => {handleApiCall(req, res)});


app.listen(process.env.PORT || 4000, () => {
    console.log(`app is runnin on port ${process.env.PORT}`);
})