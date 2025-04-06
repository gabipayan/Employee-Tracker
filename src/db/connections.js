
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
// Verificar la conexión a la base de datos
pool.connect()
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err.stack);
        process.exit(1); // Salir del proceso en caso de error
    });
    
module.exports = pool; 
