if (!$response.body) {
    console.log("响应体为空");
    $done({});
}

let idMatch = $request.url.match(/&uid=(\d+)$/);
let id = idMatch ? idMatch[1] : null;
console.log("当前访问的用户ID:" + id);
let nickname = $argument.nickname;
let avatarbox = $argument.avatarbox;
let userID = $argument.userID;
console.log("我的用户ID:" + userID);

if (!(id == userID)) {
    console.log("正常访问");
    $done({});
}

console.log("启用伪装");
let json = JSON.parse($response.body);

if (json?.data?.extra_info_list?.length > 2) {
    json.data.extra_info_list[0].value = "9999999";
    json.data.extra_info_list[2].value = "1400000000";
}

if (json?.data) {
    json.data.avatar_box = avatarbox;
    json.data.level = "50";
    json.data.nickname = nickname;
    json.data.is_vip = "1";
    json.data.level_icon = "https://cdn.wtzw.com/bookimg/free/images/app/1_0_0/level/level_icon_50.png";
}

$done({ body: JSON.stringify(json) });