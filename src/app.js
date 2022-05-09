/* eslint-disable curly */
const express = require('express');
const connection = require('./db-config');
const db = require('./db-config');
const Joi = require('joi');
const app = express();

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});

app.use(express.json());

// Afficher les disponibilités
app.get('/availabilities', async (req, res) => {
  try {
    const [availabilities] = await db
      .promise()
      .query('SELECT * FROM availabilities ORDER BY `date` ASC');
    res.send(availabilities);
  } catch (err) {
    console.error(err);
    res.status(500).send('something wrong happened');
  }
});

app.get('/availabilities/:id', (req, res) => {
  const availabilitiesId = req.params.id;
  connection.query(
    'SELECT * FROM availabilities WHERE id = ?',
    [availabilitiesId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving availabilities from database');
      } else if (result.length === 0) {
        res.status(404).send('Availabilities not found');
      } else {
        res.json(result[0]);
      }
    }
  );
});
// Poster une disponibilité.
app.post('/availabilities', async (req, res) => {
  try {
    const { userName, movieName, location, date } = req.body;
    const { error: validationErrors } = Joi.object({
      userName: Joi.string().max(50).required(),
      movieName: Joi.string().max(50).required(),
      location: Joi.string().max(50).required(),
      date: Joi.string().max(50).required(),
    }).validate({ userName, movieName, location, date }, { abortEarly: false });

    if (validationErrors) {
      return res.status(422).json({ errors: validationErrors.details });
    }
    const [{ insertId }] = await db
      .promise()
      .query(
        'INSERT INTO availabilities (userName, movieName, location, date ) VALUES (?, ?, ?, ?)',
        [userName, movieName, location, date]
      );

    res.status(201).send({ id: insertId, userName, movieName, location, date });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
db.connect((err) => {
  if (err) console.error('error connecting to db');
});

// Pour supprimer une disponibilité
app.delete('/availabilities/:id', (req, res) => {
  connection.query(
    'DELETE FROM availabilities WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an availabilities');
      } else {
        if (result.affectedRows)
          res.status(200).send('🎉 availabilities deleted!');
        else res.status(404).send('Availabilities not found.');
      }
    }
  );
});

module.exports.app = app;
