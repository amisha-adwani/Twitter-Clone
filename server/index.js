const express = require('express');
const cors = require('cors');
const mongo = require('mongodb')
const monk=require('monk')
const app = express();

const db = monk('localhost/poster') //connect mongodb to local machine
const posts = db.get('posts'); //posts are collection in db


app.use(cors({
  origin:"*",
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
      message:" TA-DA POSTED"
    });
});

// app.get('/about', (req, res) => {
//   res.send('grrr')
// })

function isValidPost(post){
  return post.named && post.named.toString().trim()!=='' && post.content && post.content.toString().trim()!==''

}
app.post('/posts', (req, res) => {

  if(isValidPost(req.body)){                            //validating data before inserting into db
   const post= {
     named:req.body.named.toString(),
     content:req.body.content.toString(),
     created: new Date()
   }
console.log(post)

   posts
   .insert(post)
   .then(createdPost=>{
     res.json(createdPost)
     //console.log(createdPost)
   })
  }
  else{
    res.status(422).json({
      message:"Ensure both fields are filled"
    })
  }
})

app.listen(5000, () => {
  console.log(`Example app listening at http://localhost:5000`);
})