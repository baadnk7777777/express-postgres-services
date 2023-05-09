const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let { Client } = require('pg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to postgres
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 54320,
})
client.connect()

app.get('/', (req, res) => {
    res.send('Welcome to Tanakan API Services.');
});

app.get('/users/:userID', async (req, res) => {
    let userID = req.params.userID;
    let user_type = '';
    let phone_number = '';
    let pin = '';
    let display_name = '';
    let images_url = '';
    let create_at = '';
    let credit_amount = '';
    let expired_date = '';

    client.query(`SELECT * FROM chat_user WHERE user_id = ${userID}`, (err, result) => {

        const data = result.rows;


        data.forEach(element => {
            user_type = element[
                'user_type'];
            phone_number = element['phone_number'];
            pin = element['pin'];
            display_name = element['display_name'];
            images_url = element['images_url'];
            create_at = element['create_at'];
            credit_amount = element['credit_amount'];
            expired_date = element['expired_date'];
            
            return res.send({
                user_type: user_type, phone_number: phone_number,
                pin: pin,
                display_name: display_name, images_url: images_url, create_at: create_at,
                credit: { credit_amount: credit_amount, expired_date: expired_date }
            });
        });

    });


});

app.listen(3000, () => {
    console.log('Start server at port 3000.');
});

module.exports = app;