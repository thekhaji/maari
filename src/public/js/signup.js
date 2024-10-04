console.log("Signup frontend javascript file");

function validateSignupForm(){
    const memberNick = $(".member-nick").val(),
    memberPhone = $(".member-phone").val(),
    memberPassword = $(".member-password").val(),
    confirmPassword = $(".confirm-password").val();
    
    if (memberNick === "" || memberPhone === "" || memberPassword === "" || confirmPassword === ""){
        alert("Please insert all the required fields!");
        return false;
    }

    if(memberPassword !== confirmPassword){
        alert("Password differs, please check!");
        return false;  
    }   


}