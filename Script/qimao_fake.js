if (!$response.body) {
    console.log('响应体为空');
    $done({});
}
let json = JSON.parse($response.body);
let hideCoin = $argument.hideCoin;
let hideMessage = $argument.hideMessage;
let nickname = $argument.nickname;
let avatarbox = $argument.avatarbox;

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
    json.data.user_area.base_info.avatar_box = avatarbox;
    json.data.user_area.base_info.vip_show_type = "1";
    if (json?.data.user_area.base_info.user_other_data?.length > 0) {
        json.data.user_area.base_info.user_other_data[0].num = "9999999";
    }
    json.data.user_area.base_info.level_text = "80";
    if (nickname !== "") {
        json.data.user_area.base_info.nickname = nickname;
    }
    json.data.user_area.base_info.is_vip = "ODYxNjU2NDI5OTM5MzU1NkgqHtLCbFbu2ZpYZWZju3vXXGg6+PwVxDNDBV14nQDA";
    json.data.user_area.base_info.level_icon = "https://cdn.wtzw.com/bookimg/free/images/app/1_0_0/level/level_icon_80.png";
}

// 修改用户我的金币/今日金币/今日听读信息
if (json?.data?.user_area?.grid_info && hideCoin) {
    json.data.user_area.grid_info[0].num = "∞";
    json.data.user_area.grid_info[1].num = "∞";
}
try {
    // 删除func_area中的特定元素
    if (json?.data?.func_area) {
        // 使用 filter 方法过滤出需要保留的元素
        json.data.func_area = json.data.func_area.filter(item => {
            if (item?.type === "core_func" && hideMessage) {
                item.list?.forEach(subItem => {
                    if (subItem?.first_title === "消息通知") {
                        subItem.red_point_show_type = "0";
                    }
                });
                return true;  // 保留当前 "core_func" 类型的元素
            }
            else if (item?.type === "banner") {
                return false;  // 删除类型为 "banner" 的元素
            }
            else if (item?.type === "ads") {
                if (hideCoin) {
                    return false;  // 如果 hideCoin 为 true，删除类型为 "ads" 的元素
                } else {
                    // 修改 item.list，保留包含抽奖的元素
                    item.list = item.list.filter(subItem =>
                        ["xingyunqi", "wode_faxian_shouji"].includes(subItem?.statistical_code)
                    );
                    return item.list.length > 0;  // 如果还有剩余子项就保留
                }
            }
            else if (item?.type === "other") {
                const otherItemOrder = ["下载管理", "我的评论", "我的等级", "阅读喜好", "设置", "我来推书", "必读票", "成为作家"]; // 白名单和排序顺序
                item.list = item.list
                    .filter(subItem =>
                        otherItemOrder.includes(subItem?.first_title)
                    )
                    .sort((a, b) =>
                        otherItemOrder.indexOf(a.first_title) - otherItemOrder.indexOf(b.first_title)
                    );
                // 过滤后如果为空，整个 item 被移除
                return item.list.length > 0;
            }
            else {
                return true;  // 保留其他类型的元素
            }
        });
    }
} catch (e) {
    console.log(e);
}

$done({ body: JSON.stringify(json) });
