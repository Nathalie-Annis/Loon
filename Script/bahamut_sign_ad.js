if (!$response.body) {
    console.log('响应体为空');
    $done({});
}
if ($persistentStore.read(["baha_sign_ad"]) == true) {
    console.log('已经在签到了');
    $done();
}
try {
    let json = JSON.parse($response.body);
    if (json?.data?.finished === 0) {
        console.log('开始广告签到');
        $persistentStore.write(true, ["baha_sign_ad"]);
        let attach = {
            "mediaUrl": "https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Icon/bahamut2.png",
        }
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
                        console.log('广告签到完成');
                        $notification.post("巴哈姆特", "广告签到完成", "今日已获得双倍巴币", attach);
                    }
                    else {
                        console.log('广告签到失败:\n' + data);
                        $notification.post("巴哈姆特", "广告签到失败", data, attach);
                    }
                }
                $persistentStore.write(false, ["baha_sign_ad"]);
                $done({ body: data });
            });
        }, 30000); // 等待30秒
    } else {
        if (json?.data?.finished === 1) {
            console.log('今日已领取过双倍签到奖励');
        }
        else {
            console.log('异常情况:\n' + JSON.stringify(json));
        }
        $done({});
    }
} catch (e) {
    console.log('解析响应体失败:\n' + e);
    $done({});
}
