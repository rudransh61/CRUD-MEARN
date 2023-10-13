const mongoose = require('mongoose')
// const db = require('./connectdb.js')

const Schema = mongoose.Schema;

// List of columns for Employee schema
let List = new Schema({
  heading: {
    type: String
  },
  desc: {
    type: String
  }
}, {
  collection: 'list'
});

Lists = mongoose.model('list',List);
