/********confirm passord with re-password *****/
document.querySelector('.btn').onclick = function(e){
  let pass = document.querySelector("#password").value;
  let re_pass = document.querySelector("#re-password").value;
  
  if(pass !== re_pass){
    e.preventDefault();
    alert("Password and Repeat Password Not Matching");
  }
  return true;
}
/************validation *******/
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", setUserInput);

function setUserInput(){
  const mail = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (mail && password) {
    localStorage.setItem("email", mail);
    localStorage.setItem("password", password);
  }
};
/**** prevent going back to pre page ****/
function preventBack()
{window.history.forward();}
setTimeout("preventBack()", 0);
window.onunload = function () {null};
