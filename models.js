const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
  //_id: String, //test um casterror zu verhindern
  title: { type: String, required: true },
  comments: [String],
  commentcount: Number
});

const Book = mongoose.model("Book", BookSchema);

exports.Book = Book;