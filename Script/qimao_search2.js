if (!$response.body) {
    console.log("响应体为空");
    $done({});
}

let searchOption = $argument.searchOption;
if (searchOption === "空白") {
    let json = JSON.parse($response.body);
    if (json?.data?.search_dispose?.content) {
        json.data.search_dispose.content = " ";
    }
    $done({ body: JSON.stringify(json) });
} else if (searchOption === "默认") {
    let json = JSON.parse($response.body);
    if (json?.data?.search_dispose?.content) {
        json.data.search_dispose.content = "请输入书名、作者或主要人物";
    }
    $done({ body: JSON.stringify(json) });
} else {
    $done({});
}