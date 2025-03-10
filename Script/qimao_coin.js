if (!$response.body) $done({});
let json = JSON.parse(body);

let hideCoin = $argument.hideCoin;
if (typeof hideCoin === 'string') {
    console.log('hideCoin 是字符串');
} else if (typeof hideCoin === 'boolean') {
    console.log('hideCoin 是布尔值');
} else {
    console.log('hideCoin 是其他类型');
}

// 修改VIP信息
if (json?.data?.user_area?.vip_info?.vip_open_info) {
    json?.data.user_area.vip_info.vip_open_info.text = "您已解锁永久vip";
}

// 修改用户基本信息
if (json?.data?.user_area?.base_info) {
    json?.data.user_area.base_info.avatar_box = "https://cdn.wtzw.com/bookimg/free/png/17198299375688291.png";
    json?.data.user_area.base_info.vip_show_type = "1";
    if (json?.data.user_area.base_info.user_other_data?.length > 0) {
        json?.data.user_area.base_info.user_other_data[0].num = "9999999";
    }
    json?.data.user_area.base_info.level_text = "50";
    json?.data.user_area.base_info.nickname = "我是昵称";
    json?.data.user_area.base_info.is_vip = "ODYxNjU2NDI5OTM5MzU1NkgqHtLCbFbu2ZpYZWZju3vXXGg6+PwVxDNDBV14nQDA";
    json?.data.user_area.base_info.level_icon = "https://cdn.wtzw.com/bookimg/free/images/app/1_0_0/level/level_icon_50.png";
}

// 删除活动信息
if (json?.data?.user_area?.vip_info?.activity_info) {
    delete json?.data.user_area.vip_info.activity_info;
}
try {
    // 删除func_area中的特定元素
    if (json?.data?.func_area) {
        json?.data.func_area = json?.data.func_area.filter(item => item?.type !== "banner" && item?.type !== "ads");
    }
    if (json?.data?.func_area?.length > 3 && json?.data.func_area[3]?.list) {
        let list = json?.data.func_area[3].list;
        json?.data.func_area[3].list = [list?.[0], list?.[3], list?.[5], list?.[6]].filter(Boolean);
    }
} catch (e) {
    console.log(e);
}

$done({ body: JSON.stringify(json) });
