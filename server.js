const express = require('express');
const app = express();
const quotesRouter = require('./quotesRouter');
const biosRouter = require('./biosRouter');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use('/api/quotes', quotesRouter);
app.use('/api/bios', biosRouter);

app.listen(PORT);
