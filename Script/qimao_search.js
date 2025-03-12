let searchOption = $argument.searchOption;
let json = {};
switch (searchOption) {
    case "默认":
        $done({ body: JSON.stringify(json) });
    case "空白":
        json = {
            "data": {
                "search_dispose_list": [
                    {
                        "content": "",
                        "jump_tab": "",
                        "platform": "0",
                        "min_version": "",
                        "book_id": "",
                        "jump_url": "",
                        "type": "2",
                        "max_version": ""
                    }
                ]
            }
        }
        $done({ body: JSON.stringify(json) });
    default:
        $done({});
}