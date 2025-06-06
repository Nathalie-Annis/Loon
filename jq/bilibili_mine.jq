del(.data.live_tip) 

| .data.sections_v2 |=
    [ .[]                                                       
    | select(.style!=7 and .type!=3)                            # 去除音乐版权科普版块
    | (.title // .up_title // "") as $secTitle                  # 获取版块标题
    | .items |=                                                 # 根据标题过滤无用项
        (if  $secTitle == "创作中心"
        then map(select(.title | IN("创作中心","稿件管理","主播中心","直播数据")))
        elif $secTitle == "推荐服务"
        then map(select(.title | IN("我的课程","个性装扮","我的钱包","会员购中心")))
        elif $secTitle == "更多服务"
        then map(select(.title | IN("联系客服","设置")))
        else .
        end)
    | select(.items | length>0)                                 # 若被删空就丢弃
    ]

| .data.follower = 5200000                                                                                      # 伪装粉丝数
| .data.vip.label.image = "https://i0.hdslb.com/bfs/bangumi/kt/c43d9f30d0026fb3bba3d3823dd0f20c7ccc4f62.png"    # 伪装大会员标签
| .data.modular_vip_section.title += { text:"Ciallo～(∠・ω< )⌒★", url:"https://b23.tv/d9YZ8f1" }              # 会员中心标题&副标题&活动入口重定向
| .data.modular_vip_section.subtitle.text = "每天都要开心呀"
| .data.modular_vip_section.button.text = "会员中心"