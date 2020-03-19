
console.log('Client site javascript file loaded!')
const weatherform= document.querySelector('form')
const search= document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent= 'From JavaScript '  // will show live in the file, also we use textcontent to change what showsup


fetch('http://puzzle.mead.io/puzzle').then((response)=>{
   response.json().then((data)=>{
       console.log(data);
   })   
})

// fetch('http://localhost:3000/weather?address!').then((response)=>{
//     response.json().then((data)=>{
//         if (data.error){
//             console.log(data.error);

//         }
//         else{

//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault( )                      // prevent from the default behaviour to reload. 
    const location = search.value
    console.log(location);

messageOne.textContent='Loading...'
messageTwo.textContent=''


    
    //fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
           // console.log(data.error);

           messageOne.textContent=data.error
        }
        else{

           // console.log(data.location)
            messageOne.textContent=data.location;
           // console.log(data.forecast)
            messageTwo.textContent=data.forecast;
        }
    })
})
})

