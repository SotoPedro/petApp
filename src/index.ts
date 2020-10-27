import Server from './server';
import database from './db';

const server = Server.instance;
const db = database.instance;

db.open();
server.start();

console.log('pedro puto')

