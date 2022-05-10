require('dotenv').config();

function getEnv(varibale) {
  const value = process.env[varibale];
  if (typeof value === 'undefined') {
    console.warn(`Seems like the variable "${varibale}" is not set in the environment. 
    Did you forget to execute "cp .env.example .env" and adjust variables in the .env file to match your own environment ?`);
  }
  return value;
}

module.exports.SERVER_PORT = getEnv('SERVER_PORT');
module.exports.DB_HOST = getEnv('DB_HOST');
module.exports.DB_PORT = getEnv('DB_PORT');
module.exports.DB_USER = getEnv('DB_USER');
module.exports.DB_PASS = getEnv('DB_PASS');
module.exports.DB_NAME = getEnv('DB_NAME');
