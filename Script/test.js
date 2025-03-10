let body = $response.body;
if (body) {
    let obj = JSON.parse(body);
    if (obj?.result?.notice) {
        delete obj.result.notice;
    }
    $done({ body: JSON.stringify(obj) });
}
$done({});