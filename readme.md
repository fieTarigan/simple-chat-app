# Simple Real-time Chat Web App

This project uses the following tech stack:
* ExpressJs (Backend / server)
* ReactJs (Frontend / client)
* Socket.io (Real-time chat)
* Postgres (DB)
* Sequelize (ORM)

How to use this project:
1. Clone the repo
2. Enter the folder <br/>
`cd simple-chat-app`
3. Install all dependencies for the server and socket.io <br/>
`npm install`
4. Install postgres https://www.postgresql.org/download/, if you haven't installed it
5. Edit the development database configuration at `config/config.json`
6. Create development database <br/> `npx sequelize-cli db:create`
7. Migrate the model to database <br/> `npx sequelize-cli db:migrate`
8. Enter the frontend folder <br/>
`cd frontend`
9. Install all dependencies for the client <br/>
`npm install`
10. Open two terminals, in each of them run the following command
    * Run `npm run start:dev`
    * Open folder `frontend` and run `npm run start`
11. Open http://localhost:3000 on more than one browser page.

Note:
* If the browser page is refreshed (F5), the chat will disappear from the page. To restore it, click the `Reload` button.