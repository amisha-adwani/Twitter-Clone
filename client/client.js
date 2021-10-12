console.log("hello world")

const form =document.getElementById("form")
const load=document.getElementById("loading")

const API_URL = "http://localhost:5000/posts"

load.style.display='none';


form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const named=document.getElementById("name").value
const content=document.getElementById("content").value


const post={
    named,
    content
}
form.style.display='none';
load.style.display='';

fetch(API_URL,{
    method:"POST",
    body: JSON.stringify(post),
    headers:{
        'content-type':'application/json'
    }
    
}).then(response => response.json())
.then(createdPost =>{
  console.log(createdPost);
  form.reset();
  form.style.display='';
load.style.display='none';
});
});