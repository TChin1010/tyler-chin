const nameEle =  document.getElementsByName('name')[0];
const emailEle =  document.getElementsByName('email')[0];
const messageEle =  document.getElementsByName('message')[0];

function sendEmail() {
    const params =  {
        name : nameEle.value,
        email :  emailEle.value,
        message :  messageEle.value,
    }

    if (params.name == '' || params.email == '' || params.message == '') { return; }
    
    
    emailjs.send("service_w8gwo5b", "template_9bu13zc", params);
}
document.getElementById('emailSubmit').addEventListener('submit', (event) => { event.preventDefault();});