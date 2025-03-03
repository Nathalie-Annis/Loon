let body = $response.body;
if (body) {
    let obj = JSON.parse(body);
    if(obj.data && obj.data.announce){
        delete obj.data.announce;
    }
    $done({body: JSON.stringify(obj)});
}
$done({});