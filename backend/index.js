const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/crud-app', { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema, 'crud-app');

app.get('/items', (req, res) => {
  Item.find((err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
});

app.post('/items/add', (req, res) => {
  const newItem = new Item(req.body);
  newItem.save()
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      res.status(400).send('Adding new item failed');
    });
});

app.get('/items/:id', (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.json(item);
    }
  });
});

app.patch('/items/update/:id', (req, res) => {
  Item.findByIdAndUpdate(
    req.params.id,
    { description: req.body.description },
    { new: true },
    (err, item) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(item);
      }
    }
  );
});


app.delete('/items/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.json(item);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
