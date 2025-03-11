if (!$response.body) {
    console.log("响应体为空");
    $done({});
}

let json = JSON.parse($response.body);
let nickname = $argument.nickname;
let avatarbox = $argument.avatarbox;

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