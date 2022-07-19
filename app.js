const express = require("express");
const fs = require("fs");
const moment = require("moment")
const app = express();
const jsonParser = express.json();
const Sequelize = require("sequelize")

let currentDate = new Date();


const sequelize = new Sequelize(
    'db_name',
    'user',
    'password',
    {
      dialect: 'postgres',
    }
  )

sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))



app.use(express.static(__dirname + "/public"));

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.send();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


const filePath = "users.json";
app.get("/api/users", function(req, res){
       
    const content = fs.readFileSync(filePath,"utf8");
    const users = JSON.parse(content);
    res.send(users);
});


// получение одного пользователя по id
app.get("/api/users/:id", function(req, res){
       
    const id = req.params.id; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    let user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});


// создание новых записей
app.post("/api/users", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
      
    const userName = req.body.name;
    const userSurname = req.body.surname
    const userAge = req.body.age;
    const created_at = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
    const updated_at = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
    let user = {name: userName, surname: userSurname, age: userAge, created_at: created_at, updated_at: updated_at};
      
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);
      
    // находим максимальный id
    const id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    user.id = id+1;
    // добавляем пользователя в массив
    users.push(user);
    data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("users.json", data);
    res.send(user);
});


 // удаление пользователя по id
app.delete("/api/users/:id", function(req, res){
       
    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i < users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        const user = users.splice(index, 1)[0];
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});


// изменение пользователя
app.put("/api/users", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
      
    const userId = req.body.id;
    const userName = req.body.name;
    const userSurname = req.body.surname;
    const userAge = req.body.age;
    const updated_at = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
      
    let data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data);
    let user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        user.age = userAge;
        user.name = userName;
        user.surname = userSurname;
        user.updated_at = updated_at;
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});
   
app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});