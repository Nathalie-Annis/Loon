if (!$response.body) {
    console.log("响应体为空");
    $done({});
}

let json = JSON.parse($response.body);
if (json?.data?.search_hot_list) {
    const order = ["热搜书籍", "热门话题", "有声热播"];
    json.data.search_hot_list.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));
}

let searchOption = $argument.searchOption;
if (searchOption === "空白") {
    if (json?.data?.search_dispose?.content) {
        json.data.search_dispose.content = " ";
    }
    if (json?.data?.search_hot_tags) {
        delete json.data.search_hot_tags;
    }
    $done({ body: JSON.stringify(json) });
} else if (searchOption === "默认") {
    if (json?.data?.search_dispose?.content) {
        delete json.data.search_dispose;
    }
    if (json?.data?.search_hot_tags?.hot_words) {
        json.data.search_hot_tags.title = "搜索发现";
        json.data.search_hot_tags.hot_words = json.data.search_hot_tags.hot_words
            .filter(item => item.title === "更多分类>")
            .map(item => ({ ...item, title: "选择分类>" }));
    }
    $done({ body: JSON.stringify(json) });
} else {
    $done({});
}