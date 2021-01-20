function creatXMLHttpRequest() {

}

function usernameIsExist() {
    var username = document.getElementById('username').value();
    sendRequest("usernameIsExistServlet?username="+username);
}

function sendRequest(url) {

}

function processResponse() {
    if(xmlHttpRequest.redyState==4){

    }
}