if (!$response.body) {
    console.log('响应体为空');
    $done({});
}

let json = JSON.parse($response.body);
if (json?.data?.finished === 0) {
    console.log('开始广告签到');
    $notification.post("巴哈姆特", "开始广告签到", "等待30秒后完成签到", "crazyanime://", 0);

    let url = $request.url.replace("start", "finished");
    console.log(url);
    let headers = $request.headers;
    console.log(headers);
    var params = {
        url: url,
        timeout: 5000,
        headers: headers,
        alpn: 'h2',
    };

    // 延迟30秒后发起请求，并在请求完成后调用 $done()
    setTimeout(() => {
        $httpClient.get(params, function (error, response, data) {
            if (error) {
                console.log('广告签到失败:' + error);
                $notification.post("巴哈姆特", "广告签到失败", error, "crazyanime://", 0);
            } else {
                console.log('广告签到成功:' + data);
                $notification.post("巴哈姆特", "广告签到完成", "今日获得双倍巴币", "crazyanime://", 0);
            }
            $done({}); // 延迟结束脚本
        });
    }, 30000); // 等待30秒
} else {
    $done({});
}
