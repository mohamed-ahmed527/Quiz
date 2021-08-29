document.querySelector('.btn').onclick = function(e){
   var email = document.getElementById("email").value;
   var password = document.getElementById("password").value;
   var emailold = localStorage.getItem("email");
   var passold = localStorage.getItem("password");
    if((email !== emailold) || (password !== passold)){
      e.preventDefault();
      alert("Password and Email Are Not Matching");
    }
    return true;
  }