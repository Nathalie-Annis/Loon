# ---------- 工具函数 ----------
def keep_titles($allowed):
    map(select(.title as $t | $allowed | index($t)));   # 留下白名单中的标题

def filter_section($allowed):
    if(.items | any(.title | IN($allowed[])))           # 循环遍历每个版块，判断其是否为待处理版块(包含至少一个白名单标题)
    then .items |= keep_titles($allowed)                # 命中相应版块，进行过滤处理
    else .                                              # 没有命中，不进行处理
    end;

# ---------- ① 全局去广告 ----------
del(.data.live_tip) 
| .data.sections_v2 |=
    [ .[]                                               # 遍历每个版块
    | .items |= map(select(.title != "音乐版权科普"))
    | select(.items | length > 0)                       # 若删空就丢弃版块
    ]

# ---------- ② 针对不同版块做白名单过滤 ----------

| .data.sections_v2 |=
    map(
        filter_section(["创作中心","稿件管理","主播中心","直播数据"])     # 保留稿件&直播相关
        | filter_section(["我的课程","个性装扮","我的钱包","会员购中心"]) # 保留个人服务相关
        | filter_section(["联系客服","设置"])                           # 保留客服&设置
    )


# ---------- ③ 其它自定义字段覆写 ----------
| .data.follower = 5200000                                                                                      # 伪装粉丝数
| .data.vip.label.image = "https://i0.hdslb.com/bfs/bangumi/kt/c43d9f30d0026fb3bba3d3823dd0f20c7ccc4f62.png"    # 伪装大会员标签
| .data.modular_vip_section.title += { text:"Ciallo～(∠・ω< )⌒★", url:"https://b23.tv/d9YZ8f1" }              # 会员中心标题&副标题&活动入口重定向
| .data.modular_vip_section.subtitle.text = "每天都要开心呀"