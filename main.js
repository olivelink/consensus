
function showAds() {
    return
    document.body.classList.add("ads-opt-in")
    var ad_el = document.getElementById("ad")
    ad_el.innerHTML = (
        '\
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-8311301439241235" data-ad-slot="4833581514" data-ad-format="auto" data-full-width-responsive="true"></ins> \
        '
    );
    (adsbygoogle = window.adsbygoogle || []).push({});
}

var chartCtx = null;
var myChart = null;

function loadCrypto() {
    document.body.classList.add("chart-loading");
    chartCtx = document.getElementById('myChart');
    if (myChart !== null) {
        myChart.destroy();
    }
    axios.get("/data/crypto.json").then(function (resp) {
        console.log(resp.data);
        myChart = new Chart(chartCtx, {
            type: "line",
            data: {
                labels: resp.data[0],
                datasets:[
                    {
                        label: "Crypto",
                        data: resp.data[1],
                        borderColor: 'rgb(75, 192, 192)',
                    },
                ],
            },
        });

        document.body.classList.remove("chart-loading");
    })
    modals.openModal( null, '#modal' );
    return false;
}

function loadTopic(title, file) {
    document.body.classList.add("chart-loading");
    chartCtx = document.getElementById('myChart');
    if (myChart !== null) {
        myChart.destroy();
    }
    axios.get("/data/" + file).then(function (resp) {
        console.log(resp.data);
        myChart = new Chart(chartCtx, {
            type: "line",
            data: {
                labels: resp.data[0],
                datasets:[
                    {
                        label: title,
                        data: resp.data[1],
                        borderColor: 'rgb(75, 192, 192)',
                    },
                ],
            },
        });

        document.body.classList.remove("chart-loading");
    })
    modals.openModal( null, '#modal' );
    return false;
}

function loadChart(stem, hash) {
    document.body.classList.add("chart-loading");
    chartCtx = document.getElementById('myChart');
    if (myChart !== null) {
        myChart.destroy();
    }
    axios.get("/data/" + hash + ".json").then(function (resp) {
        console.log(resp.data);
        myChart = new Chart(chartCtx, {
            type: "line",
            data: {
                labels: resp.data[0],
                datasets:[
                    {
                        label: stem,
                        data: resp.data[1],
                        borderColor: 'rgb(75, 192, 192)',
                    },
                ],
            },
        });

        document.body.classList.remove("chart-loading");
    })
    modals.openModal( null, '#modal' );
    return false;
}

function closeChart() {
    modals.closeModal();
}

function loadTopics() {
    axios.get("/data/topics.json").then(function (res) {
        console.log(res.data)

        var topicIndexEl = document.getElementById("topic-index");

        for(var i = 0; i < res.data.length; i++) {
            var row = res.data[i]

            var rowEl = document.createElement("div")
            rowEl.classList.add("topic-item")
            const title = row["title"]
            const file = row["file"]
            rowEl.onclick = function(ev) {
                loadTopic(title, file)
            }

            var titleEl = document.createElement("h3")
            titleEl.appendChild(
                document.createTextNode(row["title"])
            )
            rowEl.appendChild(titleEl)

            var descriptionEl = document.createElement("p")
            descriptionEl.appendChild(
                document.createTextNode(row["description"])
            )
            rowEl.appendChild(descriptionEl)

            topicIndexEl.appendChild(rowEl)

        }

    })

}

function loadMeta() {
    axios.get("/data/meta.json").then(function (res) {
        console.log(res.data)

        var stemsIndexEl = document.getElementById("stems-index")

        for(var i = 0; i < res.data.length; i++) {
            var row = res.data[i]
            var rowEl = document.createElement("tr")

            var labelEl = document.createElement("td", )
            labelEl.classList.add("stems-index-stem")
            labelEl.appendChild(
                document.createTextNode(row.stem)
            )
            const stem = row.stem;
            const hashed = row.hashed
            labelEl.onclick = function(ev) {
                loadChart(stem, hashed);
                return false;
            }

            var changeEl = document.createElement("td", )
            changeEl.classList.add("stems-index-change")
            changeEl.appendChild(
                document.createTextNode(row.change.toFixed(2))
            )

            var scoreTodayEl = document.createElement("td", )
            scoreTodayEl.classList.add("stems-index-score-today")
            scoreTodayEl.appendChild(
                document.createTextNode((row.score_today * 10000).toFixed(2))
            )

            rowEl.appendChild(labelEl)
            rowEl.appendChild(changeEl)
            rowEl.appendChild(scoreTodayEl)
            stemsIndexEl.appendChild(rowEl)
        }

    })

}

loadTopics()
loadMeta()