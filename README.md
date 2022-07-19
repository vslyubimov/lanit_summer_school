# lanit_summer_school

## Решение задания для отбора на трек Fullstack Ланит ЛШ 2022 - Teri.Cpa

Задание: 

Написать фронт и бэк приложения которое будет выводить таблицу с возможностью эту таблицу редактировать.
Таблица (в БД) должна отражать следующую сущность:
    
    User {

      id: number,

      name: string,

      surname: string,

      date_of_birth: Date,

      created_at: Date,

      updated_at: Date,

    }

Все елементы кроме id, created_at и updated_at должны быть редактируемы в таблице.

Стили таблицы на фронте и выбор фронтэнд фреймворка оставляем на ваше усмотрение.
Бэк необходимо реализовать с помощью фреймворка express.js


Для корректной работы необходимо дополнительно установить: 
----
        "express": "^4.17.0",

        "moment": "^2.29.4",
        
        "sequelize": "^6.21.3"
        
Для запуска необходимо выполнить: node app.js

Примечение: в данной сборке данные сохраняются в json. В коде есть наработки кода из пакета sequelize, но интеграция с БД будет добавлена позднее 
