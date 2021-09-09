const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes', (req, res, next) => {

    const personQuotes = [];
    const author = req.query;

    if(Object.keys(author).length > 0){
        quotes.forEach(item => {
            if(item.person == author.person) {
                console.log(item.quote);
                personQuotes.push({quote: item.quote, person: item.person});
            }
        });
        return res.send({
            quotes: personQuotes
        });
    } else {
        quotes.forEach(item => {
                personQuotes.push({quote: item.quote});
            });
            return res.send({
                quotes: personQuotes
            });
    }
});

app.get('/api/quotes/random', (req, res, next) => {
    const q = getRandomElement(quotes);
    // console.log(q['quote']);
    res.send({
        quote: q
    });
  });

app.post('/api/quotes', (req, res, next) => {
    const quoteRecieved = req.query.quote;
    const personRecieved = req.query.person;
    if(quoteRecieved && personRecieved) {
        quotes.append({
            quote:quoteRecieved,
            person:personRecieved
        });
        res.send({
            quote: { quote:quoteRecieved, person:personRecieved }
        });
    } else {
        res.status(400).send('error');
    }
});

app.listen(PORT, () => 
    console.log(`app listening on port ${PORT}`)
);