function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    var liveCharacters = dropDead(userDatas);
    sortByname(liveCharacters);
    generateDivChild(liveCharacters);

    document.getElementById("btn").addEventListener("click", function () {
        search(liveCharacters);
    });
}


function dropDead(data) {
    var liveCharacters = [];
    for (var i = 0; i < data.length; i++) {
        if (!data[i].dead) {
            liveCharacters.push(data[i]);
        }
    }
    console.log(liveCharacters);
    return liveCharacters;
}



function search(data) {
    var text = document.getElementById('search');
    var found = false;
    if (!text.value || text.value == ' ') {
        text.value = "Give me the name";
    } else {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name == text.value) {
                console.log(data[i].name);
                showDetail(i, data);
                found = true;
            }
        }
        if (!found) {
            text.value = "Character not found!";
        }
    }
}


function generateDivChild(data) {
    for (var i = 0; i < data.length; i++) {
        (function (e) {
            var div = document.createElement('div');
            var img = document.createElement('img');
            img.setAttribute("src", data[e].portrait);
            img.addEventListener('click', function () {
                showDetail(e, data);
            });
            div.appendChild(img);
            var pElem = document.createElement('p');
            pElem.innerHTML = data[i].name;
            div.appendChild(pElem);
            document.querySelector('.map').appendChild(div);
        })(i);
    }
}


function showDetail(e, data) {
    var pic = document.getElementById('detail-pic');
    var name = document.getElementById('name');
    var text = document.getElementById('detail-text');
    var house = document.getElementById('house');
    pic.setAttribute("src", data[e].picture);
    name.textContent = data[e].name;
    text.textContent = data[e].bio;
    house.setAttribute("src", `assets/houses/${data[e].house}.png`);
    //    console.log(data[e]);
}


function sortByname(data) {
    var temp;
    for (var i = 0; i < data.length - 1; i++) {
        for (var j = i + 1; j < data.length; j++) {
            if (data[i].name > data[j].name) {
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */