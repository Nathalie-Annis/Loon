def reorder($order):
    [ $order[] as $name
        | .[]
        | select(.title == $name)
    ];
if .data.homeTopList[0].widgets[0].widgetDO.channelDOList
then
    .data.homeTopList[0].widgets[0].widgetDO.channelDOList |= (
        if any(.title == "鱼鲤鱼鲤") 
        then . 
        else . + [{
            "iconUrl": "https://gw.alicdn.com/imgextra/i1/O1CN01byzO4o1zDUhaw0f85_!!6000000006680-2-tps-144-144.png",
            "spm": "a2170.7897990.widgets.3",
            "title": "鱼鲤鱼鲤",
            "targetUrl": "https://ssr.m.goofish.com/wow/moyu/moyu-project/anime-app/pages/home?x-ssr=true&x-fcc=snapshot&api-info=W1siV1ZJZGxlRmlzaEFwaS5nZXRJbW1lcnNlU3RhdHVzQmFySGVpZ2h0Iix7fV1d&titleVisible=false&loadingVisible=false&useCusFont=true&fcc_match_query=stage&stage=discover&isHomeSource=true",
            "clickParam": {
                "arg1": "Regularentrance",
                "args": {
                "idleAdsTaskId": "50438",
                "location_id": "3",
                "spm": "a2170.7897990.0.0",
                "page": "Page_xyHome"
                }
            },
            "widgetId": "38113",
            "showDynamicIcon": "false"
            }]
        end |
        if any(.title == "小卖部") 
        then . 
        else . + [{
            "iconUrl": "https://img.alicdn.com/imgextra/i1/O1CN0100GzOQ1rTy5Gf3ju0_!!6000000005633-2-tps-144-144.png",
            "spm": "a2170.7897990.widgets.17",
            "title": "小卖部",
            "targetUrl": "https://h5.m.goofish.com/wow/moyu/moyu-project/mini-detail/pages/theme-new?kun=true&id=0&shoppingGuideThemeId=3585501&bizType=item&taskType=backstage",
            "clickParam": {
                "arg1": "Regularentrance",
                "args": {
                "idleAdsTaskId": "55038",
                "location_id": "17",
                "spm": "a2170.7897990.0.0",
                "page": "Page_xyHome"
                }
            },
            "widgetId": "",
            "showDynamicIcon": "false"
            }]
        end 
        ) |
    .data.homeTopList[0].widgets[0].widgetDO.channelDOList |= reorder(["特惠充值", "小卖部", "鱼鲤鱼鲤", "全部频道", "分类"])
else
    .
end |
del(.data.homeTopList[]? | select(.template.name | test("^idlefish_home_widget"))) |
.data.sections |= map(
    if .template.name | IN("fish_home_feeds_pager_banner","fish_home_advertise_card_d5","home_fish_real_live_d2","fish_home_content_card","fish_home_feeds_commodity_card_2","fish_home_yunying_card_d3") then 
        empty
    else
        del(.data.fishTags.r88)
    end
)