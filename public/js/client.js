    function ajaxGET(url, callback) {

    const xhr = new XMLHttpRequest();
    let value = null;

    xhr.onload = function () {
        value = this.responseText;
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            value = this.responseText;
            callback(this.responseText);
        } 
    }
    xhr.open("GET", url);
    xhr.send();

}

document.querySelectorAll(".collapse").forEach(function (currentElement, currentIndex, listObj) {

    currentElement.addEventListener("click", function (e) {
        for (let i = 0; i < this.parentNode.childNodes.length; i++) {
            if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                if (this.parentNode.childNodes[i].getAttribute("class") == "ajax-stuff") {
                    this.parentNode.childNodes[i].innerHTML = "";
                    break;
                }
            }
        }
    });
});

ajaxGET("/table-async", function (data) {
    document.getElementById("AJAXtables1").innerHTML = data;
});

ajaxGET("/table-join", function (data) {
    document.getElementById("AJAXtables2").innerHTML = data;
});

document.querySelector("#showmore3").addEventListener("click", function (e) {
    ajaxGET("/moreinfo?format=html", function (data) {
        document.getElementById("html3").innerHTML = data;
    });
});

document.querySelector("#showmore4").addEventListener("click", function (e) {
    ajaxGET("/moreinformation?format=html", function (data) {
        document.getElementById("html4").innerHTML = data;
    });
});


document.querySelector("#showmore1").addEventListener("click", function (e) {
    ajaxGET("/moreinfojs", function (data) {
        let parsedData = JSON.parse(data);
        let str = "<table>";
        for(let i = 0; i < parsedData.length; i++) {
            let item = parsedData[i];
            str += "<tr><td>" + item["1st"] + "</tr><td>" + item["2nd"] + "</tr><td>" + item["3rd"]
                + "</tr><td>" + item["4th"] + "</tr><td>" + item["5th"] + "</td></tr><tr>";
        }
        str += "</table>";
        document.getElementById("json1").innerHTML = str;
    });
});

document.querySelector("#showmore2").addEventListener("click", function (e) {
    ajaxGET("/moreinfojstoo", function (data) {
        let parsedData = JSON.parse(data);
        let str = "<table>";
        for(let i = 0; i < parsedData.length; i++) {
            let item = parsedData[i];
            str += "<tr><td>" + item["1st"] + "</tr><td>" + item["2nd"] + "</tr><td>" + item["3rd"]
                + "</tr><td>" + item["4th"] + "</tr><td>" + item["5th"] + "</td></tr><tr>";
        }
        str += "</table>";
        document.getElementById("json2").innerHTML = str;
    });
});