# ---------- 工具函数 ----------
# 按给定顺序保留 name 在 $order 里的元素
def reorder_by_names($order):
[ $order[] as $name         # 按顺序取出想要的名字
    | .[]                     # 在原数组里
    | select(.name == $name)  # 找到对应元素并输出
];

# ---------- 处理 ----------
.data.tab     |= reorder_by_names(["推荐","热门","动画","影视","直播"])     # 1. 频道顺序
| .data.top   |= map(select(.name != "游戏中心"))                          # 2. 删除游戏中心
| .data.bottom |= reorder_by_names(["首页","动态","我的"])                 # 3. 底栏顺序