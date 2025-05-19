def want: ["关注","推荐","新发","广场","鱼鲤次元","鱼鲤游戏"];
.data.circleList |= (
    map(.showInfo.titleImage = {url:"",lightUrl:""}) |
    sort_by(
        (
            .showInfo.title as $t |
            (want | index($t) // 114514)
        )
    )
)