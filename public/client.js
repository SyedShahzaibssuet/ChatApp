
const socket =io();
// console.log(socket);

let username;
let textarea = document.querySelector('#textarea');
let messagediv=document.querySelector(".mesaage_area");

do {
    username =prompt("Enter You Name:");
} while (!username);

textarea.addEventListener('keyup',(e)=>{
    if(e.key==="Enter")
    {
        SendMessage(e.target.value);        
    }
})
function SendMessage(Message) 
{
    let Msg={
        user:username,
        message:Message.trim()
    }
    AppendMessage(Msg,"outgoing") ; 
    textarea.value='';
    Scrolldown();
    socket.emit("Message",Msg);
}
function AppendMessage(msg,type)
{
    let maindiv=document.createElement('div');
    console.log(msg);
    maindiv.classList.add(type,'message') ;
    let format =`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>`;

    maindiv.innerHTML = format;
    messagediv.appendChild(maindiv);  
}

socket.on("Message",(message)=>{
    AppendMessage(message,'incoming')
    Scrolldown();
})

function Scrolldown(params) {
    messagediv.scrollTop=messagediv.scrollHeight;
}