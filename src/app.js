import {http} from './http';
import {ui} from './ui';

//Get Post on DOM load
document.addEventListener('DOMContentLoaded',getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click',submitPost);

//Get Posts
function getPosts(){
  http.get('http://localhost:3000/posts')
      .then(data => ui.showPosts(data))
      .catch(err => console.log(err));

}

//Add Posts
function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body,
  }

  if(title === '' && body === ''){
    document.querySelector('.form-end').innerHTML="<span class='text-danger'>Please fill in post and body..</span>";
    setTimeout(()=>{
      document.querySelector('.form-end').innerHTML='';
    },3000);
  }else{
    http.post('http://localhost:3000/posts',data)
        .then(data => {
          ui.showAlert('Post Added','alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
  }
}