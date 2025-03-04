// 正则匹配URL,捕获组获取id
let idMatch = $request.url.match(/&vmid=(\d+)/);
let id = idMatch ? idMatch[1] : null;
console.log(id);
let uids = $argument.uid ? $argument.uid.split(',') : [];
console.log(uids);
// 如果 id 与 uid 匹配，则继续执行脚本逻辑
if (id && uids.length > 0 && uids.includes(id)) {
    console.log("正在访问启用伪装的用户的个人空间");
    // 伪装用户信息
    let obj = JSON.parse($response.body);
    // 伪装会员卡片标识
    if(obj.data.card.vip){
        obj.data.card.vip.vipType = 2;
        obj.data.card.vip.vipStatus = 1;
        if (obj.data.card.vip.label) {
            obj.data.card.vip.label.text = "百年大会员";
            obj.data.card.vip.label.image = "https://i0.hdslb.com/bfs/bangumi/kt/c43d9f30d0026fb3bba3d3823dd0f20c7ccc4f62.png";
            obj.data.card.vip.label.label_theme = "hundred_annual_vip";
        }
    }
    // 硬核会员出题字段修改
    if (obj.data.card.level_info.senior_inquiry){
        obj.data.card.level_info.senior_inquiry.inquiry_text = "硬核会员";
    }
    // 若用户顶部展示装扮收藏,伪装装扮收藏编号
    if (Array.isArray(obj?.data?.images?.collection_top_simple?.top?.result)) {
        obj.data.images.collection_top_simple.top.result.forEach(item => {
            if (item.digital_extra) {
                item.digital_extra.region_subtitle = "CD.000001";
            }
        });
    }
    // 伪装会员头像标识
    const layers = obj?.data?.card?.avatar?.fallback_layers?.layers || [];
    const exists = layers.some(item => 
        item?.resource?.res_type === 3 &&
        item?.resource?.res_image?.image_src?.src_type === 1
    );
    if(exists){
        obj.data.card.avatar.fallback_layers.layers[4]={
        "resource": {
            "res_type": 3,
            "res_image": {
            "image_src": {
                "placeholder": 1,
                "src_type": 1,
                "remote": {
                "url": "https://i0.hdslb.com/bfs/bangumi/kt/d98acde01bacc0e1f04cac59e693f91a6f59b401.png",
                "bfs_style": "widget-layer-avatar"
                }
            }
            }
        },
        "general_spec": {
            "pos_spec": {
            "axis_x": 1.1199999999999999,
            "axis_y": 1.1366666666666665,
            "coordinate_pos": 1
            },
            "size_spec": {
            "width": 0.225,
            "height": 0.225
            },
            "render_spec": {
            "opacity": 1
            }
        },
        "layer_config": {
            "tags": {
            "ICON_LAYER": {}
            }
        },
        "visible": true
        };
        obj.data.card.avatar.fallback_layers.layers[6]={
        "resource": {
            "res_type": 4,
            "res_animation": {
            "webp_src": {
                "placeholder": 5,
                "src_type": 1,
                "remote": {
                "url": "https://i0.hdslb.com/bfs/activity-plat/static/20220506/334553dd7c506a92b88eaf4d59ac8b4d/j8AeXAkEul.gif",
                "bfs_style": "widget-layer-avatar"
                }
            }
            }
        },
        "general_spec": {
            "pos_spec": {
            "axis_x": 0.87,
            "axis_y": 1.1366666666666665,
            "coordinate_pos": 1
            },
            "size_spec": {
            "width": 0.225,
            "height": 0.225
            },
            "render_spec": {
            "opacity": 1
            }
        },
        "layer_config": {
            "tags": {
            "ICON_LAYER": {}
            }
        },
        "visible": true
        };
    }
    if (obj.data.card) {
        // 伪装粉丝数和点赞数
        obj.data.card.fans = 5200000;
        if(obj.data.card.likes){
            obj.data.card.likes.like_num = 13140000;
        }
        // 伪装成就勋章粉丝勋章
        obj.data.card.achieve={
            "is_default": false,
            "image": "https://i2.hdslb.com/bfs/face/27a952195555e64508310e366b3e38bd4cd143fc.png",
            "achieve_url": `https://www.bilibili.com/h5/achieve?navhide=1&mid=${id}`
        };
        // console.log(`https://www.bilibili.com/h5/achieve?navhide=1&mid=${id}`);
        obj.data.card.live_fans_wearing={
            "medal_color_end": 15304379,
            "medal_color_start": 7996451,
            "medal_name": "彼岸花",
            "level": 66,
            "medal_jump_url": `https://live.bilibili.com/p/html/live-fansmedal-wall/index.html?is_live_webview=1&tId=${id}#/medal`,
            "medal_color_border": 16771156,
            "guard_icon": "https://i0.hdslb.com/bfs/activity-plat/static/ce06d65bc0a8d8aa2a463747ce2a4752/FqYoOmgssP.png"
        };
        // console.log(`https://live.bilibili.com/p/html/live-fansmedal-wall/index.html?is_live_webview=1&tId=${id}#/medal`);
    }
    console.log("伪装完成");
    $done({ body: JSON.stringify(obj) });
} else {
    console.log("正在访问空间不在伪装范围内,正常访问");
    $done({});
}