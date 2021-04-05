const fs = require("fs");
const http = require("http");
const requests = require("requests");
const indexfile = fs.readFileSync("index.html", "utf-8");

const kelvintoc=(kelvin)=>{
    const celius=kelvin-273.15;
    return celius;
}
const replaceVal=(myhtml,actualval)=>{
    let a=myhtml.replace('{%temp%}',kelvintoc(actualval.main.temp));
    a=a.replace('{%maxtemp%}',kelvintoc(actualval.main.temp_max));
    a=a.replace('{%mintemp%}',kelvintoc(actualval.main.temp_min));
    a=a.replace('{%city%}',actualval.name);
    return a;
};

const server = http.createServer((req, res) => {
if(req.url=='/'){
    requests("http://api.openweathermap.org/data/2.5/weather?q=Jaipur&appid=bd8769fdf7edb4be48d499f59ec16117")
    .on('data', function (chunk) {
        const objdata=[JSON.parse(chunk)];
        const realtimedata=objdata.map((val)=>replaceVal(indexfile,val)).join("");
        console.log(realtimedata);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(realtimedata);
    })
    .on('end', function (err) {if (err) return console.log('connection closed due to errors', err); res.end();});
}

});

server.listen(8000,'127.0.0.1');