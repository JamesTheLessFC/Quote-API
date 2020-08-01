const express = require('express');
const biosRouter = express.Router();

const { bios } = require('./data');
const { generateBioId } = require('./utils');

biosRouter.get('/:person', (req, res, next) => {
  const person = req.params.person;
  const personsBio = bios.find(bio => bio.person === person);
  res.send({"bio": personsBio});
});

biosRouter.post('/', (req, res, next) => {
  const bio = {
    id: `${generateBioId()}`,
    person: req.query.person,
    bio: req.query.bio
  };
  if (!bio.person || !bio.bio) {
    res.status(400).send();
  } else {
    bios.push(bio);
    res.status(201).send({"bio": bio});
  }
});

biosRouter.put('/:id', (req, res, next) => {
  const bio = bios.find(bio => bio.id === req.params.id);
  if (bio) {
    const index = bios.indexOf(bio);
    bio.person = req.query.person;
    bio.bio = req.query.bio;
    bios.splice(index, 1, bio);
    res.send({"bio": bio});
  } else {
    res.status(404).send();
  }
});

biosRouter.delete('/:id', (req, res, next) => {
  const bio = bios.find(bio => bio.id === req.params.id);
  if (bio) {
    const index = bios.indexOf(bio);
    bios.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = biosRouter;
