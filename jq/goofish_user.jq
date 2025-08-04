def reorder($order):
    add as $all_tools |
    [$order[] as $name | $all_tools[] | select(.exContent.title == $name)];
def templates_to_remove: ["my_fy25_slider","my_fy25_recycle","xianyu_home_fish_my_banner_card_2023"];

.data.container.sections |= map(
    if .template.name | IN(templates_to_remove[]) then
        empty
    elif .template.name == "my_fy25_community" then
        .item.bottom = {}
    elif .template.name == "my_fy25_tools" then
        .item.tool.exContent.tools |= [reorder(["宝贝上首页","简历认证","安全中心","我的帖子"])]
    elif .template.name == "my_fy25_user_info" then
        .item.level.exContent += {
            "tag": {"bgColor": "#00471E", "text": "瓏"},
            "tips": "𝓒𝓲𝓪𝓵𝓵𝓸～(∠・ω< )⌒☆ 每天都要开心呀～ ",
            "image": "https://gw.alicdn.com/imgextra/i1/O1CN01jZgEHi1HtJqPTQqj3_!!6000000000815-2-tps-264-264.png",
            "bubble": {},
            "swiper": []
        }
    else
        .
    end
)