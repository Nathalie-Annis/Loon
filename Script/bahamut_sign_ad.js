if (!$response.body) {
    console.log('响应体为空');
    $done({});
}

let json = JSON.parse($response.body);
let attach = {
    "mediaUrl": "https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Icon/bahamut2.png",
}
if (json?.data?.finished === 0) {
    console.log('开始广告签到');
    $notification.post("巴哈姆特", "开始广告签到", "等待30秒后完成签到", attach);

    let url = $request.url.replace("start", "finished");
    let headers = $request.headers;
    var params = {
        url: url,
        timeout: 5000,
        headers: headers,
        alpn: 'h2',
    };

    // 延迟30秒后发起请求，并在请求完成后调用 $done()
    setTimeout(() => {
        $httpClient.get(params, function (error, _, data) {
            if (error) {
                console.log('广告签到失败:\n' + error);
                $notification.post("巴哈姆特", "广告签到失败", error, attach);
            } else {
                json = JSON.parse(data);
                if (json?.data?.finished === 1) {
                    console.log(json);
                    console.log('广告签到完成');
                    $notification.post("巴哈姆特", "广告签到完成", "今日获得双倍巴币", attach);
                }
                else {
                    console.log('广告签到失败:\n' + data);
                    $notification.post("巴哈姆特", "广告签到失败", data, attach);
                }
                $done({ body: data }); // 延迟结束脚本
            }
        });
    }, 30000); // 等待30秒
} else {
    if (json?.data?.finished === 1) {
        console.log('今日已领取过双倍签到奖励');
    }
    else {
        console.log(json);
    }
    $done({});
}
