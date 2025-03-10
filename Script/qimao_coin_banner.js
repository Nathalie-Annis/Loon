if (!$response.body) {
    console.log("响应体为空");
    $done({});
}

let json = JSON.parse($response.body);
if (json?.data?.is_show) {
    json.data.is_show = "0";
}
$done({ body: JSON.stringify(json) });