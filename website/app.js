// check if button is successfully updated
var isUpdated = false;

// const dummy_data ={
//     "Australia": [],
//     "NA": [
//         "RT @EcoInternetDrGB: Opinion: There's a way to fix the #HongKong crisis: Globe and Mail https://t.co/EcDHZyJpRc #HumanRights\n\nMORE w/ EcoSe…",
//         "RT @EcoInternetDrGB: Opinion: There's a way to fix the #HongKong crisis: Globe and Mail https://t.co/EcDHZyJpRc #HumanRights\n\nMORE w/ EcoSe…"
//     ],
//     "NY": [
//         "Opinion: There's a way to fix the #HongKong crisis: Globe and Mail https://t.co/EcDHZyJpRc #HumanRights\n\nMORE w/ Ec… https://t.co/Xq9UeTe0ch"
//     ],
//     "OH": [],
//     "USA": [
//         "Contrary to popular belief the Chinese government is not very smart. NBA nonsense is a great example. By overreacti… https://t.co/qTDAkGrZbL"
//     ]
// }
// current data
var data = null;
// const api_url = "http://localhost:3030";
const api_url = "http://52.246.249.29:3030"

$(document).ready(function() {
    // check the web parameter
    const current_url = window.location.href;
    const url = new URL(current_url);
    const query_text = url.searchParams.get("selectionText");

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
    //data = await getData(query);
    data = await getData(query)
    console.log("waiting")
    if (true){
        console.log("done")
        var countries = [];
        Object.entries(data).forEach(([key,value])=>{
            console.log(value)
            if (value.length != 0 && !hasNumber(key)){
                countries.push(key);
            }
        })
        var max = countries.length;
        if (countries.length > 3){
            max = 3;
        }
        update_button(countries,max);
        console.log(countries)
        // set button listener   
        onclicklistener(max)

        // update for the 1st button
        update_opinion(countries[0])
        return
    }
    for (i=1; i<=data.length; i++){
        add_opinion(i,data[i-1]);
    }
}

// request for the result of the api with parameter of the query
function getData(query){
    return new Promise((resolve,rej)=>{
    fetch(api_url+"?searchText="+query)
    .then(res=> {
        resolve(res.json());
    })
    .catch(err => {
        rej(err);
    })})
}

// Not using button anymore

function onclicklistener(num){
    if (1 <= num){
        console.log("button 1 is called")
        $("#country1").click(function (){
            var button =  $("#country1");
            button.removeClass( "btn-secondary" ).addClass( "btn-primary" );
            $("#country2").removeClass("btn-primary").addClass( "btn-secondary");
            $("#country3").removeClass("btn-primary").addClass( "btn-secondary");
            if (isUpdated){
                update_opinion(button.text())
            }
        })
    }
    if (2 <= num){
        console.log("button 2 is called")
        $("#country2").click(function (){
            var button =  $("#country2");
            button.removeClass( "btn-secondary" ).addClass( "btn-primary");
            $("#country1").removeClass("btn-primary").addClass( "btn-secondary");
            $("#country3").removeClass("btn-primary").addClass( "btn-secondary");
            if (isUpdated){
                update_opinion(button.text())
            }
        })
    }
    if (3 <= num){
        console.log("button 3 is called")
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
}

function update_button(array,max){
    for (i=1; i<=max;i++){
        add_button(i,array[i-1])
        $("#country"+i).html(array[i-1]);
    }
    isUpdated = true;
}

function update_opinion(country){
    // empty the body
    remove_opinion()
    if (true){
        array = data[country];
        console.log(array)
        for (i=1; i<=array.length; i++){
            add_opinion(i,array[i-1]);
        }
        return;
    }
    data.forEach((opinion)=>{
        add_opinion(opinion)
    })
}

function add_opinion(index,opinion){
    var parent = document.getElementById('opinion');
    parent.innerHTML+=
    `
    <div class="card" style="margin-bottom:20px">
        <div class="card-header">
            Opinion `+index+
        `</div>
        <div class="card-body">
            <blockquote id="body3" class="blockquote mb-0">`
                +opinion+
            `</blockquote>
        </div>
    </div>`
}

function remove_opinion(){
    $('#opinion').empty();
}

function add_button(index,country){
    var parent = document.getElementById('countries');
    var btn = "btn-secondary"
    if (index==1){btn = "btn-primary"}
    parent.innerHTML+=
    `
    <div class="col-sm-3">
    <button id="country`+index+`" type="button" class="btn `+btn+` btn-block">`
    +country+
    `</button>
    </div>
    `
}

function remove_button(){
    $('#countries').empty();
}

function hasNumber(myString) {
    return /\d/.test(myString);
  }