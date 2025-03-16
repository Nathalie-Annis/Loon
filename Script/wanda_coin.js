if (!$response.body) {
    console.log("响应体为空");
    $done({});
}

let json = JSON.parse($response.body);
if (json?.data) {
    json.data.expiredPointsRemindContent = "";
}
$done({ body: JSON.stringify(json) });