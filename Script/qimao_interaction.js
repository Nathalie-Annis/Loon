if (!$response.body) {
    console.log('响应体为空');
    $done({});
}
let hideInteraction = $argument.hideInteraction;
let json = JSON.parse($response.body);
if (json?.data?.interaction && hideInteraction) {
    delete json.data.interaction;
}
if (json?.data.discussion_users && hideInteraction) {
    delete json.data.discussion_users;
}
if (json?.data?.activity) {
    delete json.data.activity;
}
$done({ body: JSON.stringify(json) });