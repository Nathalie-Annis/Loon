let body = $response.body;
let json = JSON.parse(body);
if (body) {
    if (json?.data?.interaction) {
        delete json.data.interaction;
    }
    $done({ body: JSON.stringify(json) });
}
$done({});