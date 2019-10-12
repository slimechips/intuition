// dummy data to test
// const data = {
//     "Singapore": ["The world is ending1","The world is ending2","The world is ending3"],
//     "India": ["The world is ending4","The world is ending5","The world is ending6"],
//     "Indonesia": ["The world is ending7","The world is ending8"]
// };

// check if button is successfully updated
var isUpdated = false;

// current data
var data = null;
const api_url = "http://localhost:3030";
$(document).ready(function() {
    // check the web parameter
    const current_url = window.location.href;
    const url = new URL(current_url);
    const query_text = url.searchParams.get("selectionText");

    // set button listener   
    onclicklistener()

    if (query_text!=null){
        // add the query text to the query container
        var text = document.createElement("h5");
        text.innerHTML = query_text;
        document.getElementById("query").appendChild(text);

        // fetch data and update
        update(query_text)
    }
    else{
        // no query is received and no country is there
        var query_doc = document.getElementById("query");
        var text = document.createElement("h5");
        text.innerHTML = "There is no query received";
        query_doc.appendChild(text);
    }
});

async function update(query){
    // fetch data
    data = await getData(query);

    var countries = [];
    Object.entries(data).forEach(([key,value])=>{
        countries.push(key);
    })

    update_button(countries);
    // update for the 1st button
    update_opinion(countries[0])
}

// request for the result of the api with parameter of the query
function getData(query){
    return new Promise((resolve,rej)=>{
    fetch(api_url)
    .then(res=> {
        resolve(res.json());
    })
    .catch(err => {
        rej(err);
    })})
}
function onclicklistener(){
    $("#country1").click(function (){
        var button =  $("#country1");
        button.removeClass( "btn-secondary" ).addClass( "btn-primary" );
        $("#country2").removeClass("btn-primary").addClass( "btn-secondary");
        $("#country3").removeClass("btn-primary").addClass( "btn-secondary");
        if (isUpdated){
            update_opinion(button.text())
        }
    })
    $("#country2").click(function (){
        var button =  $("#country2");
        button.removeClass( "btn-secondary" ).addClass( "btn-primary");
        $("#country1").removeClass("btn-primary").addClass( "btn-secondary");
        $("#country3").removeClass("btn-primary").addClass( "btn-secondary");
        if (isUpdated){
            update_opinion(button.text())
        }
    })
    $("#country3").click(function (){
        var button =  $("#country3");
        button.removeClass( "btn-secondary" ).addClass( "btn-primary");
        $("#country1").removeClass("btn-primary").addClass( "btn-secondary");
        $("#country2").removeClass("btn-primary").addClass( "btn-secondary");
        if (isUpdated){
            update_opinion(button.text())
        }
    })
}

function update_button(array){
    for (i=1; i<=3;i++){
        $("#country"+i).html(array[i-1]);
    }
    isUpdated = true;
}

function update_opinion(country){
    // empty the body
    array = data[country];
    for (i=1; i<=3;i++){
        if(array[i-1]!=undefined){
            $("#body"+i).html(array[i-1]);
        }
        else{
            $("#body"+i).html("");            
        }
    }
}