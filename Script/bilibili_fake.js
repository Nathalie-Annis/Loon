// 正则匹配URL,捕获组获取id
let idMatch = $request.url.match(/&vmid=(\d+)/);
let id = idMatch ? idMatch[1] : null;
console.log(id);
console.log($argument.uid);
// 如果 id 与 uid 匹配，则继续执行脚本逻辑
if (id && $argument.uid && id === $argument.uid) {
    console.log("正在访问启用伪装的用户的个人空间");
    // 伪装用户信息
    let obj = JSON.parse($response.body);
    if (obj.data.card.vip.label) {
        obj.data.card.vip.label.text = "百年大会员";
        obj.data.card.vip.label.image = "https://i0.hdslb.com/bfs/bangumi/kt/c43d9f30d0026fb3bba3d3823dd0f20c7ccc4f62.png";
        obj.data.card.vip.label.label_theme = "hundred_annual_vip";
    }
    if (obj.data.card.level_info.senior_inquiry){
        obj.data.card.level_info.senior_inquiry.inquiry_text = "硬核会员";
    }
    if (obj.data.images.collection_top_simple.top.result) {
        obj.data.images.collection_top_simple.top.result[0].digital_extra.region_subtitle = "CD.000001";
    }
    if (obj.data.card) {
        obj.data.card.fans = 5200000;
        obj.data.card.likes.like_num = 13140000;
        obj.data.card.achieve.image = "https://i2.hdslb.com/bfs/face/27a952195555e64508310e366b3e38bd4cd143fc.png";
        obj.data.card.live_fans_wearing={
            "medal_color_end": 15304379,
            "medal_color_start": 7996451,
            "medal_name": "彼岸花",
            "level": 66,
            "medal_jump_url": "https://live.bilibili.com/p/html/live-fansmedal-wall/index.html?is_live_webview=1&tId=${id}#/medal",
            "medal_color_border": 16771156,
            "guard_icon": "https://i0.hdslb.com/bfs/activity-plat/static/ce06d65bc0a8d8aa2a463747ce2a4752/FqYoOmgssP.png",
        };
    }
    $done({ body: JSON.stringify(obj) });
} else {
    $done({});
}