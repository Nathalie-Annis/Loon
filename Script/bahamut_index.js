let hideAnnounce = $argument.hideAnnounce;
let hidePromotion = $argument.hidePromotion;
if (!$response.body || !hideAnnounce && !hidePromotion) {
    console.log('无需脚本处理');
    $done({});
}

let json = JSON.parse($response.body);
if (hideAnnounce && json?.data?.announce) {
    console.log('隐藏公告:' + json.data.announce);
    delete json.data.announce;
}
if (hidePromotion && json?.data?.seasonalPromotion) {
    console.log('隐藏新番导视入口');
    delete json.data.seasonalPromotion;
}
$done({ body: JSON.stringify(json) });