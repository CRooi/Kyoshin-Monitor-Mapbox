let stationList;
let colorList = {"a":"#010ed6","b":"#002ce7","c":"#0040f4","d":"#0070da","e":"#00a8af","f":"#06d481","g":"#1fe55e","h":"#36f63e","i":"#65fb28","j":"#88fc1f","k":"#beff0d","l":"#d7fe07","m":"#effe01","n":"#fef802","o":"#feea00","p":"#ffdc02","q":"#fcbd00","r":"#fc9e00","s":"#fc8100","t":"#fa6300","u":"#ff4400","v":"#fc2800","w":"#f60d00","x":"#e90000","y":"#ce0000", "z":"#b00201"};
$.getJSON("https://weather-kyoshin.east.edge.storage-yahoo.jp/SiteList/sitelist.json",(json)=>{
    stationList = json.items;
    for (let i=0; i < stationList.length; i++){
        let stationEl = document.createElement('div');
        stationEl.className = 'station' + i;
        new mapboxgl.Marker(stationEl).setLngLat([stationList[i][1],stationList[i][0]]).addTo(map);
    }
})

async function getData(){
    time = new Date().valueOf();
    time += 3598000; //del this line if your device timezone is set as UTC+9.
    today = new Date(time);
    year = today.getFullYear() ;
    month = today.getMonth() + 1;
    day = today.getDate() ;
    hour = today.getHours();
    minute = today.getMinutes();
    second = today.getSeconds();
    month = month < 10 ? "0" + month: month;
    day = day < 10 ? "0" + day: day;
    hour = hour < 10 ? "0" + hour: hour;
    minute = minute < 10 ? "0" + minute: minute;
    second = second < 10 ? "0" + second: second;
    tlTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" +second;
    document.getElementById("time").innerHTML = tlTime;
    let url = "https://weather-kyoshin.east.edge.storage-yahoo.jp/RealTimeData/" + year + month + day + "/" + year + month + day + hour + minute + second+".json";
    $.getJSON(url, (json)=>{
        stationData = json.realTimeData.intensity;
        stationData = stationData.split("");
        for (let i=0; i<stationData.length; i++){
            stationCh = stationData[i];
            $(".station"+i).css("background-color", colorList[stationCh]);
        }
    })
}

getData();
setInterval(getData, 1000);
