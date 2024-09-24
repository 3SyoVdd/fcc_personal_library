/*
*
*
*       Complete the API routing below
*       
*       
*/

const Book = require("../models").Book;

'use strict';

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res)=>{
      //response will be array of book objects
     
/* HInweis: für nur 1 buch gibt es eine eigene route unten */


      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      let allBooks = await Book.find({});//alle Bücher finden

      /*challenge: Rückgabe soll so aussehen:
      title, _id, and commentcount
      deshalb nur die relevanten werte mit .map herausholen
      */
      //console.log ("return von allen büchern" +allBooks[0]);
      const returnArr = allBooks.map((onebook) => {
        return {
          _id: onebook._id,
          title: onebook.title,
          //comments: onebook.comments,
          commentcount: onebook.comments.length,
        };
      });
      console.log (returnArr)
      res.json(returnArr);

      //res.json(allBooks);
      return;
    })
    
    //neues Buch erstellen
    .post(async (req, res)=>{
      let newtitle = req.body.title;
      console.log ("ich bin post");
      //response will contain new book object including atleast _id and title
      if (!newtitle){//titel nicht gesetzt
        console.log ("titel fehlt");
        res.send("missing required field title");
        return;
      }else{
        //book model erstellen von Models.js
        neuesBuch = new Book({title:newtitle, comments:[], commentcount:0})
        await neuesBuch.save();
        console.log ("antwort auf post:" + neuesBuch._id, newtitle );
        res.json({ _id: neuesBuch._id, title: newtitle }); return;
        
      }


    })
    
    .delete(async(req, res)=>{
      //if successful response will be 'complete delete successful'
      console.log ("Delete aufforderung");
      await Book.deleteMany({});//alle löschen
     // await Book.save();
      res.send("complete delete successful");
    });



  app.route('/api/books/:id')
    .get(async (req, res)=>{
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      console.log ("suche nach buch" + bookid);
      const foundBook = await Book.findById(bookid);
      if (!foundBook){
        res.send("no book exists");
        return;
      }
      console.log ("4 get mit ID rueckgabe:");
      res.json({_id: foundBook._id, title: foundBook.title, comments: foundBook.comments})

    })
    
    .post(async(req, res)=>{
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      //kein kommentar oder kommentar leer
      if (!comment || comment == ""){
        res.send("missing required field comment");
        return;
      }

      let aktuellesBuch = await Book.findOne({_id:bookid})
      if (!aktuellesBuch){
        res.send( "no book exists");
        return;
      }
      console.log ("aktuellesBuch");
      console.log (aktuellesBuch);
      console.log (aktuellesBuch.comments);
      aktuellesBuch.comments.push(comment);
      await aktuellesBuch.save();
      res.json({_id: aktuellesBuch._id, title: aktuellesBuch.title, comments: aktuellesBuch.comments})

    })
    
    .delete(async(req, res)=>{
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      let loeschenErfolgreich = await Book.findByIdAndDelete(bookid);//suchen nach buch mit der id undlöschen
      console.log ("loeschenErfolgreich" + loeschenErfolgreich)
      if (!loeschenErfolgreich){
          res.send("no book exists");
          return;
      }
      res.send("delete successful");
      

    });
  
};
