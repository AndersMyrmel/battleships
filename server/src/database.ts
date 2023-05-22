require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.productiondbLink || process.env.DBConnLink,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

client.connect();

const addUser = (username) => {
  const created_on = new Date();

  client.query(
    'insert into users (name, created_on) values ($1, $2) returning *',
    [username, created_on],
    (error, results) => {
      if (error) throw error;
    }
  );
};

const incrementVisits = () => {
  client.query(
    'update analytics set page_visits = page_visits + 1',
    (error, results) => {
      if (error) throw error;
    }
  );
};

const incrementGamesStarted = () => {
  client.query(
    'update analytics set games_started = games_started + 1',
    (error, results) => {
      if (error) throw error;
    }
  );
};

const incrementGamesCompleted = () => {
  client.query(
    'update analytics set games_completed = games_completed + 1',
    (error, results) => {
      if (error) throw error;
    }
  );
};

module.exports = {
  addUser,
  incrementVisits,
  incrementGamesStarted,
  incrementGamesCompleted,
};
