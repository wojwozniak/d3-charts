let request = new XMLHttpRequest();
let data = {};

function requestListener() {
    data = this.responseText;
    console.log(data);
}

request.addEventListener("load", requestListener);
request.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json");
request.send();

