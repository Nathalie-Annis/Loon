del(.data.live_tip) 

| .data.sections_v2 |=
    [ .[]                                                       
    | select(.style!=7 and .type!=3)                            # 去除音乐版权科普版块
    | (.title // .up_title // "") as $secTitle                  # 获取版块标题
    | .items |=                                                 # 根据标题过滤无用项
        (if  $secTitle == "创作中心"
        then map(select(.title | IN("创作中心","稿件管理","主播中心","直播数据")))
        elif $secTitle == "推荐服务" or $secTitle == "我的服务"
        then map (
            if (.title | IN("会员购中心","会员购")) and has("uri")
            then .uri = "bilibili://mall/home"
            else .
            end |
            select(.title | IN("我的课程","个性装扮","我的钱包","会员购中心","会员购"))
        )
        elif $secTitle == "更多服务"
        then map(select(.title | IN("联系客服","设置")))
        else .
        end)
    | select(.items | length>0)                                 # 若被删空就丢弃
    ]

| .data.follower = 5200000                                                                                        # 伪装粉丝数
# | .data.vip.label.image = ([
#     "https://i0.hdslb.com/bfs/bangumi/kt/c43d9f30d0026fb3bba3d3823dd0f20c7ccc4f62.png",                         # 番剧
#     "https://i0.hdslb.com/bfs/bangumi/kt/8da0131c523f715962cb9650c517d5fc8407a914.png",                         # 影视
#     "https://i0.hdslb.com/bfs/bangumi/kt/5d7b3ac0e8a01f85f09156954fda2c3517970923.png",                         # 像素
#     "https://i0.hdslb.com/bfs/bangumi/kt/9e267149f2eee1408cefc1c8643794eda5c7b9b2.png",                         # 大好人
#     "https://i0.hdslb.com/bfs/bangumi/kt/7652c837aac3c936ccb5813935473af0b66c3d06.png"                          # 萌节
# ] | .[now % length])                                                                                            # 随机选择大会员标签
| .data.modular_vip_section.title += { text:"Ciallo～(∠・ω< )⌒★", url:"https://www.bilibili.com/blackboard/era/kXP06cmqKtYULNL1.html?" }                   # 会员中心标题&副标题&活动入口重定向
| .data.modular_vip_section.subtitle.text = "每天都要开心呀"
| .data.modular_vip_section.button.text = "会员中心"
| .data.senior_gate = {"member_text":"硬核会员","identity":2,"birthday_conf":null,"bubble":""}