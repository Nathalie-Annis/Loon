if (!$response.body) {
    console.log('响应体为空');
    $done({});
}

let json = JSON.parse($response.body);
let color = $argument.color;
let theme = $argument.theme;
if (!/^#[0-9A-F]{6}$/i.test(color)) {
    color = "#ff2d2d";
}

if (json?.status) {
    json.status.msg = "去开屏";
}
if (json?.result) {
    json.result.picUrl = "";
    if (json.result.theme) {
        json.result.theme.themeColor = color;
        if (theme === "蓝色(默认主题)") {
            json.result.theme.themeMainType = 0;
        }
        else if (theme === "橙色") {
            json.result.theme.themeMainType = 1;
        }
        else {
            json.result.theme.themeMainType = 2;
        }
    }
}