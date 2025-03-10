if (!$response.body) {
    console.log('响应体为空');
    $done({});
}
let json = JSON.parse($response.body);
let hideCoin = $argument.hideCoin;
let nickname = $argument.nickname;

// 删除活动信息
if (json?.data?.user_area?.vip_info?.activity_info) {
    delete json.data.user_area.vip_info.activity_info;
}

// 修改VIP信息
if (json?.data?.user_area?.vip_info?.vip_open_info) {
    json.data.user_area.vip_info.vip_open_info.text = "您已解锁永久vip";
}

// 修改用户基本信息
if (json?.data?.user_area?.base_info) {
    json.data.user_area.base_info.avatar_box = "https://cdn.wtzw.com/bookimg/free/png/17198299375688291.png";
    json.data.user_area.base_info.vip_show_type = "1";
    if (json?.data.user_area.base_info.user_other_data?.length > 0) {
        json.data.user_area.base_info.user_other_data[0].num = "9999999";
    }
    json.data.user_area.base_info.level_text = "50";
    if (nickname !== "") {
        json.data.user_area.base_info.nickname = nickname;
    }
    json.data.user_area.base_info.is_vip = "ODYxNjU2NDI5OTM5MzU1NkgqHtLCbFbu2ZpYZWZju3vXXGg6+PwVxDNDBV14nQDA";
    json.data.user_area.base_info.level_icon = "https://cdn.wtzw.com/bookimg/free/images/app/1_0_0/level/level_icon_50.png";
}

// 修改用户我的金币/今日金币/今日听读信息
if (json?.data?.user_area?.grid_info && hideCoin) {
    json.data.user_area.grid_info[0].num = "9999999";
    json.data.user_area.grid_info[1].num = "9999999";
}
try {
    // 删除func_area中的特定元素
    if (json?.data?.func_area) {
        // 使用 filter 方法过滤出需要保留的元素
        json.data.func_area = json.data.func_area.filter(item => {
            if (item?.type === "banner") {
                return false;  // 删除类型为 "banner" 的元素
            }
            if (item?.type === "ads") {
                if (hideCoin) {
                    return false;  // 如果 hideCoin 为 true，删除类型为 "ads" 的元素
                } else {
                    // 修改 item.list，过滤出不包含 "防诈骗指南" 的元素
                    item.list = item.list.filter(subItem => subItem?.discover_name !== "防诈骗指南");
                    return true;  // 保留当前 "ads" 类型的元素
                }
            }
            if (item?.type === "other") {
                // 修改 item.list，保留特定 discover_name 的项
                item.list = item.list.filter(subItem =>
                    ["我的评论", "阅读喜好", "帮助与反馈", "设置"].includes(subItem?.first_title)
                );
                return true;  // 保留当前 "other" 类型的元素
            }
            return true;  // 保留其他类型的元素
        });
    }
} catch (e) {
    console.log(e);
}

$done({ body: JSON.stringify(json) });
