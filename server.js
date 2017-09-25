const http  = require('http');
const fs    = require('fs');
const url   = require('url');
const PORT  = process.env.PORT || 3000;
const IP    = '127.0.0.1';  
const server = http.createServer((req, res) => {
    const pathname = '.' + url.parse(req.url).pathname;
    console.log(pathname);
    console.log((pathname === './') || (pathname === './index.html'));
    if ((pathname === './') || (pathname === './index.html')) {
        fs.readFile(pathname, (error, data) => {
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
        res.end(params);
    }
});

server.listen(PORT, IP, () => {
    console.log(`The server has started and is running on http://localhost:${process.env.PORT}`);
});