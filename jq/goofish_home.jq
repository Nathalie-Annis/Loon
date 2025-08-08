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
        end |
        if any(.title == "分类") 
        then . 
        else . + [{
            "showDynamicIcon": "false",
            "clickParam": {
                "arg1": "Regularentrance",
                "args": {
                    "idleAdsTaskId": "all",
                    "location_id": "6",
                    "spm": "a2170.7897990.0.0",
                    "page": "Page_xyHome"
                }
            },
            "title": "分类",
            "iconUrl": "https://gw.alicdn.com/imgextra/i1/O1CN01zJIaWx1UvEWFAUu1c_!!6000000002579-2-tps-144-144.png",
            "spm": "a2170.7897990.widgets.6",
            "targetUrl": "fleamarket://categorypage"
            }]
        end
        ) |
    .data.homeTopList[0].widgets[0].widgetDO.channelDOList |= reorder(["特惠充值", "小卖部", "鱼鲤鱼鲤", "全部频道", "分类"])
else
    .
end |
del(.data.homeTopList[]? | select(.sectionType == "defaultDxDo")) |
del(.data.widgetReturnDO) |
.data.sections |= map(
    if .template.name | test("fish_home_(advertise_card|channel_standard_card|content_card|feeds_commodity_card|feeds_pager_banner|yunying_card)|home_fish_real_live|idlefish_aolai") then 
        empty
    else
        del(.data.fishTags.r88)
    end
)