# ---------- 过滤工具 ----------
def keep_titles($allowed):
map(select(.title                # 把 items 里
            as $t                # 每项标题取出
            | $allowed           # 看看是否在允许列表里
            | index($t)          # 找到就保留
            ));                  # 否则被过滤掉

# ---------- 删除 ----------
del(
    .data.live_tip, 
    .data.sections_v2[] | select(.title | IN ("音乐版权科普"))
)                                                             # 1. 去掉活动提示条&音乐版权科普
| .data.sections_v2[1].items |=                               # 2-① 保留稿件/直播相关
    keep_titles(["创作中心","稿件管理","主播中心","直播数据"])
| .data.sections_v2[2].items |=                               # 2-② 保留个人服务相关
    keep_titles(["我的课程","个性装扮","我的钱包","会员购中心"])
| .data.sections_v2[3].items |=                               # 2-③ 保留客服&设置
    keep_titles(["联系客服","设置"])

# ---------- 覆盖 ----------
| .data.follower = 5200000                                    # 3. 伪装粉丝数
| .data.vip.label.image = "https://i0.hdslb.com/bfs/bangumi/kt/c43d9f30d0026fb3bba3d3823dd0f20c7ccc4f62.png"    # 4. 伪装大会员标签
| .data.modular_vip_section.title += { text:"Ciallo～(∠・ω< )⌒★", url:"https://b23.tv/d9YZ8f1" }              # 5. 会员中心标题&副标题&活动入口
| .data.modular_vip_section.subtitle.text = "每天都要开心呀"