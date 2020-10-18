# Дипломный Проект News-explorer. REST API приложения News-explorer

## Стек

* Node.js
* Express
* MongoDB

## Запуск проекта

* Установить зависимости npm install
* Запустить проект npm start

## Публичный IP-адрес

178.154.224.135

## Домен

https://www.news.sh.students.nomoreparties.xyz/

## Запросы

### Регистрация

  POST http://localhost:3000/signup 
  
   * Передать объект в теле запроса
   
    {
      "name": "Mr. Test",
      "email": "test@test.com",
      "password": "12345678",
    }
  
   * При успешном запросе приходит объект пользователя со статусом 200.
   
    {
      "name": "Mr. Test",
      "email": "test@test.com",
    }
        
   * Если пользователь уже есть в базе приходит объект
   
    {
      "message": "User with this email already exists"
    }
   * Если данные переданы с ошибкой
   
    {
      "name": "",
      "email": "test",
      "password": "",
      "mistake": "oops",
    }
    
   * приходит сообщение об ошибках

    {
      "message": "please enter valid email, name is not allowed to be empty, password is not allowed to be empty, mistake is redundant"
    }
          
### Авторизация

POST http://localhost:3000/signin

   * Передать объект в теле запроса

    {
      "email": "test@test.com",
      "password": "12345678",
    }
  
  
   * При успешном запросе приходит объект со статусом 200.

    {
      "message": "Authorization successful"
    }

   * При некорректных почте и/или пароле приходит ответ со статусом 401 и объектом
   
    {
      "message": "Authorization successful"
    }
    
### Получение информации о пользователе

GET http://localhost:3000/users/me

   * При успешном ответе приходит объект с email и name пользователя со статусом 200.


    {
      "email": "test1@email.com",
      "name": "test"
    }

### Добавление статьи
  
POST http://localhost:3000/articles

   * Передать объект в теле запроса

    {
      "keyword": "test", 
      "title": "test", 
      "text": "test", 
      "date":"28 ноября, 2022", 
      "source":"test.ru", 
      "link":"test.ru", 
      "image":"test.ru"
     }
  
   * При успешном запросе приходит объект статьи со статусом 200.
  
   * При попытке создать статью с некорректными данными приходит ответ со статусом 400 и ошибками валидации.
  
### Удаление статьи
  
DELETE http://localhost:3000/articles/:id
  
   * При успешном запросе в ответе приходит cообщение об успешном удалении статьи со статусом 200.
  
   * При попытке удалить чужую или несуществующую статью приходит ответ со статусом 404 и сообщением.
   
    {
      "message": "User doesn't have card with this id"
    }

   * При попытке удалить cтатью с некорректным id приходит ответ со статусом 400 и ошибками валидации.

### Получение статей пользователя
  
GET http://localhost:3000/articles/
  
   * При успешном запросе в ответе массив с объектами статей и со статусом 200.
