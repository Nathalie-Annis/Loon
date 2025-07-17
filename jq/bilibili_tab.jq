def reorder($order):
[ $order[] as $index
    | .[]
    | select(.name == $index)
];

.data.tab |= (
    if any(.name == "动画")
    then .
    else . + [
        {
            "id": 3502,
            "tab_id": "bangumi",
            "name": "动画",
            "uri": "bilibili://pgc/bangumi_v2",
            "pos": 4
        }
    ]
    end |
    if any(.name == "影视")
    then .
    else . + [
        {
            "id": 3503,
            "tab_id": "bilibili://pgc/cinema-tab",
            "name": "影视",
            "uri": "bilibili://pgc/cinema_v2",
            "pos": 5
        }
    ]
    end |
    reorder(["直播","热门","推荐","动画","影视"])
) |

.data.top_more |= (
    if any(.name == "搜索")
    then .
    else . + [
        {
            "id": 3196,
            "icon": "https://i0.hdslb.com/bfs/legacy/9bfee1c9b87e9172e3524a36eddd8a396facd253.png",
            "name": "搜索",
            "uri": "bilibili://search",
            "pos": 2
        }
    ]
    end
) | 

.data.top |= map(select(.name | IN("游戏中心") | not)) |

.data.bottom |= reorder(["首页","动态","我的"])