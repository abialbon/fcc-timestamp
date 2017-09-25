const http  = require('http');
const fs    = require('fs');
const url   = require('url');
const PORT  = process.env.PORT || 3000;
const IP    = '127.0.0.1';  
const server = http.createServer((req, res) => {
    const pathname = '.' + url.parse(req.url).pathname;
    if ((pathname === './') || (pathname === './index.html')) {
        fs.readFile('./index.html', (error, data) => {
            if (error) {
                res.writeHead(404, { 'Content-Type' : 'text/html'});
                res.end("<h1>The page you are looking for is not found in the server</h1>");
            } else {
                res.writeHead(200, { 'Content-Type' : 'text/html'});
                res.end(data);
            }
        });
    } else {
        // Remove %20 and replace with " "
        let params = pathname.split('%20').join(" ");
        // Remove the initial two chars "./"
        params = params.split("").splice(2, pathname.length).join("");
        const dateObj = {};
        res.writeHead(200, { 'Content-Type' : 'application/json'}); 
        if (isNaN(params)) {
            // Date Stamp
            dateObj.unix    = Date.parse(params) / 1000;
            dateObj.natural = params;
            res.end(JSON.stringify(dateObj));
        } else {
            // Unix
            dateObj.unix = Number(params);
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let date = new Date(Number(params) * 1000);
            let month = months[date.getMonth()];
            let day = date.getDate();
            let year = date.getFullYear();
            dateObj.natural = `${month} ${day}, ${year}`;
            res.end(JSON.stringify(dateObj));
        }
    }
});

server.listen(PORT, IP, () => {
    console.log(`The server has started and is running on http://localhost:${process.env.PORT}`);
});