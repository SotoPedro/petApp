import Server from './server';
import database from './db';

const server = Server.instance;
const db = database.instance;

db.open();
server.start();
<<<<<<< HEAD

console.log('pedro puto')

=======
>>>>>>> 39c9ce1d1e6d1e597c257a77413ff397b7468f33
