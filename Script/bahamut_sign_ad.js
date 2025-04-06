if (!$response.body) {
    console.log('响应体为空');
    $done({});
}

let json = JSON.parse($response.body);
if (json?.data?.finished === 0) {
    console.log('开始广告签到');
    $notification.post("動畫瘋", "开始广告签到", "等待30秒后完成签到", "crazyanime://", 0);

    // 原始请求信息
    let url = $request.url.replace("start", "finished"); // 替换start为finished
    let headers = $request.headers;
    var params = {
        url: url,
        timeout: 5000,
        headers: headers,
        alpn: 'h2',
    };

    // 延迟30秒后发起请求
    setTimeout(() => {
        $httpClient.get(params, function (error, response, data) {
            if (error) {
                console.log('广告签到失败:' + error);
                $notification.post("動畫瘋", "广告签到失败", error, "crazyanime://", 0);
            } else {
                console.log('广告签到成功:' + data);
                $notification.post("動畫瘋", "广告签到完成", "今日获得双倍巴币", "crazyanime://", 0);
            }
        });
    }, 30000); // 30秒 = 30000 毫秒

    $done({});
} else {
    $done({});
}
