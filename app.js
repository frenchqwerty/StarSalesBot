const http = require('http');
const Twit = require('twit');
const fs = require('fs');
const axios = require('axios').default;

const hostname = '127.0.0.1';
const port = 8888;

const T = new Twit({
    consumer_key:         '25i0IAmyqs7hAWhRhWG4TUAfZ',
    consumer_secret:      'Bcf2qtshrBHIhYuOD2cv5Wxp2jyBRFeb3UUawuWEy7fchP1HfH',
    access_token:         '1205197779276050432-d5H0C3EAMLryygnjebdopIeY96eRV6',
    access_token_secret:  'VAaNRSeVH2tSfsQs7FnTxyxwcwUUFLGa12nlEWuYJhHqi',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

let raw = fs.readFileSync('data.json');
let data = JSON.parse(raw);
function writeFile(newJson) {
    let newData = JSON.stringify(newJson, null, 2);
    fs.writeFileSync('data.json', newData);
}

axios.get('https://api.savoirutile.fr/funfact').then((response) => {
    const payload = response.data;
    T.post('statuses/update', { status: payload[data.index].text }, function(err, data, response) {
        console.log(data)
    });
    data.lastId = payload[data.index].id;
    data.index++;
    writeFile(data);
});

