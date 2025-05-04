def reorder($order):
[ $order[] as $name
    | .[]
    | select(.name == $name)
];
del(.result.banner[]) |
.result.searchBarText = ["Ciallo～(∠・ω< )⌒★"] |
.result.homeButton |= reorder(["畅游卡","单次票","查地铁","站点地图"])
