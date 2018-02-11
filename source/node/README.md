# ABS
Appointment Booking System.

### Instruction
- Install Mongo DB
- Install Robomongo
- Install Node
- Fork this branch
- If you are first time here then run (npm install)
- Start mongodb ( mongod.exe --dbpath <<above path where you have extracted your data file>>
- Import/export data ( See data/command.shl for import or export)

```sh
#Export Data
#=====================================================================
mongoexport -d abs -c users -o D:\GitHub\abs\source\node\data\user-bk.json
mongoexport -d abs -c drs -o D:\GitHub\abs\source\node\data\dr-bk.json

#Import Data
#=====================================================================
mongoimport -d abs -c users --file D:\GitHub\abs\source\node\data\user-bk.json
mongoexport -d abs -c drs -o D:\GitHub\abs\source\node\data\dr-bk.json
```

### Server setup and execute
```sh
cd source/node/
npm install
nodemon index.js 
#OR
node index.js
```
- it should prompt you as below,
        Server listening to port : 3060
	
#### Execution
Home location : http://localhost:3060
- Register user first 
- and then login 
- you can view dashboard and profile

| F | URL |
| ------ | ------ |
| Home | [http://localhost:3060] |
| User | [http://localhost:3060/users] |

### Client Setup and Execution

```sh
cd source/client/ABS
npm install
`ng serve --o`     -- For run locally
#OR
`ng build`          -- to make file for server (above)
```
Note : If your application is not starting and giving async error then either your node and npm is latest (Resolution below)

| Sl.No  | Solution                              |
| ------ | ------                                |
| 1      | Install latest node and npm           |
| 2      | Remove async and await from all files |


