const express = require('express');
const quotesRouter = express.Router();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');
const { generateId } = require('./utils');

quotesRouter.get('/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({"quote": randomQuote});
});

quotesRouter.get('/', (req, res, next) => {
  const person = req.query.person;
  const personsQuotes = quotes.filter(quote => quote.person === person);
  if (!person) {
    res.send({"quotes": quotes});
  } else if (personsQuotes) {
    res.send({"quotes": personsQuotes});
  } else {
    res.send({"quotes": []});
  }
});

quotesRouter.post('/', (req, res, next) => {
  const quote = {
    id: `${generateId()}`,
    quote: req.query.quote,
    person: req.query.person,
    year: req.query.year
  };
  if (!quote.quote || !quote.person || !quote.year) {
    res.status(400).send();
  } else {
    quotes.push(quote);
    res.status(201).send({"quote": quote});
  }
});

quotesRouter.put('/:id', (req, res, next) => {
  const quote = quotes.find(quote => quote.id === req.params.id);
  if (quote) {
    const index = quotes.indexOf(quote);
    quote.quote = req.query.quote;
    quote.person = req.query.person;
    quotes.splice(index, 1, quote);
    res.send({"quote": quote});
  } else {
    res.status(404).send();
  }
});

quotesRouter.delete('/:id', (req, res, next) => {
  const quote = quotes.find(quote => quote.id === req.params.id);
  if (quote) {
    const index = quotes.indexOf(quote);
    quotes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = quotesRouter;
