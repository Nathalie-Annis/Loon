def reorder($order):
[ $order[] as $name
    | add[]
    | select(.exContent.title == $name)
];
.data.container.sections |= map(
    if .template.name == "my_fy25_user_info" then
        .item.level.exContent += {
            "tag": {
                    "bgColor": "#00471E",
                    "text": "瓏"
                },
            "tips": "𝓒𝓲𝓪𝓵𝓵𝓸～(∠・ω< )⌒☆ 每天都要开心呀～ ",
            "image": "https://gw.alicdn.com/imgextra/i1/O1CN01jZgEHi1HtJqPTQqj3_!!6000000000815-2-tps-264-264.png",
            "bubble": {},
            "swiper": []
        }
    elif .template.name == "my_fy25_slider" then
        empty
    elif .template.name == "xianyu_home_fish_my_banner_card_2023" then
        empty
    elif .template.name == "my_fy25_tools" then
        .item.tool.exContent.tools |= [reorder(["宝贝上首页","简历认证","安全中心","我的帖子"])]
    elif .template.name == "my_fy25_community" then
        .item.bottom = {}
    else
        .
    end
)