// reveal modul patternnel!

//A verzió:
/*init() - //csak ez publikus
    getJsonContent()
        deleteDeadChar() 
        sortByname(); 
    generateGrid()
        addEventListenerForGridElement();
            writeCharData();
    searchByName() 
        writeCharData();

        //B. verzion--------------

    getJsonContent() // odaadja a getJsont // public
    sortByname(); // név szerint rendezi az adatokat //private
    deleteDeadChar(), // törli a halott karaktereket //private
    generateGrid() // legenerálja a 6*8-askarakter adathamazt // public
    addEventListenerForGridElement(); // az egyes képekhez eseménykezelőt ad //private
    writeCharData() // a kiválasztott karakter adatait jeleníti meg a jobb oldali sávba
    searchByName() // név szerint keres // public v init()
*/

var obj = (function () {
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


    return {
        getData: getData, // de lehetne u.a. a neve is pupblicProp: pupblicProp,
        successAjax: successAjax,
    }
})();

obj.getData('json/characters.json', obj.successAjax);










// Live servert használd mindig!!!!!