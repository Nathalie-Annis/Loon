# 高德主页精简 @nathalie
# 用户个人信息
.data.memberInfo.memberLevelName        = "高德达人"       |
.data.memberInfo.level_name             = "Lv.8"          |
.data.followNum.items.follower_count    = "770880"        |
.data.followNum.items.following_count   = "520"           |
.data.totalContributeNum                = "1314"          |

# 足迹&贡献滚动展示信息
# 第一组:点亮城市 走过地区 浏览总量 获赞总数
.data.topMixedCard.cardData.data[0].rows[0][0].value.text = "9999"       |
.data.topMixedCard.cardData.data[0].rows[0][1].label.text = "走过地球"    |
.data.topMixedCard.cardData.data[0].rows[0][1].value.text = "100%"       |
.data.topMixedCard.cardData.data[1].rows[0][0].value.text = 666666       |
.data.topMixedCard.cardData.data[1].rows[0][1].value.text = 666666       |
# 第二组:打卡点 出行里程 贡献总数 帮助同行人
.data.topMixedCard.cardData.data[0].rows[1][0].value.text = "999999"     |
.data.topMixedCard.cardData.data[0].rows[1][1].value.text = "300000"     |
.data.topMixedCard.cardData.data[1].rows[1][0].value.text = 1314         |
.data.topMixedCard.cardData.data[1].rows[1][1].value.text = 521          |

# 无用的cardList
del(
    .data.cardList[] | select(
        (.content.title | IN("我的钱包", "互动专区", "语音和车标", "个性化导航"))
        or
        (.content.cardTitle | IN("数字资产上新", "出行黑科技", "限时优惠"))
        or
        (.content.more.title | IN("领五一红包"))
    )
) |

# 针对高德推荐&我的车辆的进一步精简与优化
.data.cardList |= map(
    if .content.title == "高德推荐" then
        .content.item |= map(select(.name | IN("语音包", "3D车标", "我的店铺", "我的车辆", "高德代驾", "高德油耗", "小德秒懂") | not)) as $items |
        ($items | [ .[] | select(.name == "更多工具") ]) as $one |
        if $one == [] then $items
        else
        ($items | [ .[] | select(.name != "更多工具") ]) as $other |
        ($other[0:4] + $one + $other[4:])
        end
    elif .content.name == "我的车辆" then
        .content.content.desc = " " |
        .content.servs |= map(select(.name | IN("租车", "我要卖车") | not))
    else
        .
    end
)