// 大会员标签选择
const vipImages = {
    "番剧": "https://i0.hdslb.com/bfs/bangumi/kt/c43d9f30d0026fb3bba3d3823dd0f20c7ccc4f62.png",
    "影视": "https://i0.hdslb.com/bfs/bangumi/kt/8da0131c523f715962cb9650c517d5fc8407a914.png",
    "像素": "https://i0.hdslb.com/bfs/bangumi/kt/5d7b3ac0e8a01f85f09156954fda2c3517970923.png",
    "大好人": "https://i0.hdslb.com/bfs/bangumi/kt/9e267149f2eee1408cefc1c8643794eda5c7b9b2.png"
};

// 正则匹配URL,捕获组获取id
let idMatch = $request.url.match(/&vmid=(\d+)/);
let id = idMatch ? idMatch[1] : null;
console.log(id);
let uids = $argument.uid ? $argument.uid.split(',') : [];
console.log(uids);
let vipLabel = $argument.vipLabel;

// 如果 id 与 uids 数组中任何一个uid匹配，则执行伪装逻辑
if (id && uids.length > 0 && uids.includes(id)) {
    console.log("正在访问启用伪装的用户的个人空间");
    let obj = JSON.parse($response.body);

    // 伪装会员卡片标识
    if (obj?.data?.card?.vip) {
        // 当且仅当vipType和vipStatus为以下字段时,才会显示会员标识
        obj.data.card.vip.vipType = 2;
        obj.data.card.vip.vipStatus = 1;
        if (obj.data.card.vip.label) {
            obj.data.card.vip.label.text = "百年大会员";
            obj.data.card.vip.label.label_theme = "hundred_annual_vip";
            // 百年大会员标签选择逻辑
            if (vipLabel === "随机") {
                // 从现有的图片中随机选择一个
                const imageUrls = Object.values(vipImages);
                const randomIndex = Math.floor(Math.random() * imageUrls.length);
                obj.data.card.vip.label.image = imageUrls[randomIndex];
            } else if (vipImages[vipLabel]) {
                // 使用指定类型的图片
                obj.data.card.vip.label.image = vipImages[vipLabel];
            } else {
                // 默认使用番剧图片
                obj.data.card.vip.label.image = vipImages["番剧"];
            }
        }
    }

    // 硬核会员出题字段修改
    if (obj?.data?.card?.level_info?.current_level === 6) {
        if (obj.data.card.level_info.senior_inquiry) {
            obj.data.card.level_info.senior_inquiry.inquiry_text = "硬核会员";
        }
        obj.data.card.level_info.identity = 2;
        obj.data.card.level_info.next_exp = null;
    }

    // 若用户顶部展示装扮收藏,伪装装扮收藏编号
    if (Array.isArray(obj?.data?.images?.collection_top_simple?.top?.result)) {
        obj.data.images.collection_top_simple.top.result.forEach(item => {
            if (item.digital_extra) {
                item.digital_extra.region_subtitle = "CD.000001";
            }
            if (item.title) {
                item.title.sub_title = "CD.000001";
            }
        });
    }

    if (obj?.data?.card) {
        // 伪装粉丝数和点赞数
        obj.data.card.fans = 5200000;
        if (obj.data.card.likes) {
            obj.data.card.likes.like_num = 13140000;
        }
        // 伪装成就勋章粉丝勋章
        obj.data.card.achieve = {
            "is_default": false,
            "image": "https://i0.hdslb.com/bfs/face/ddbc17ac28ac5f877783dddbfc8731fbdfb1e53e.png",
            "achieve_url": `https://www.bilibili.com/h5/achieve?navhide=1&mid=${id}`
        };
        // console.log(`https://www.bilibili.com/h5/achieve?navhide=1&mid=${id}`);
        obj.data.card.live_fans_wearing = {
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

    // 伪装会员头像标识(逻辑非常复杂,有bug/随着更新失效很正常,本人能力精力有限,请见谅)
    // 头像框的存在会导致头像大小位置不同,需要根据是否存在头像框修改不同的样式
    // 有头像框又分两种情况:静态头像框和动态头像框,两种头像框的特征为没有placeholder属性,src_type为1
    const layers = obj?.data?.card?.avatar?.fallback_layers?.layers || [];
    const exists = layers.some(item =>
        item?.resource?.res_type === 3 &&
        item?.resource?.res_image?.image_src && // 确保不是undefined
        item.resource.res_image.image_src.src_type === 1 &&
        !('placeholder' in item.resource.res_image.image_src) ||
        item?.resource?.res_type === 4 &&
        item?.resource?.res_animation?.webp_src && // 确保不是undefined
        item.resource.res_animation.webp_src.src_type === 1 &&
        !('placeholder' in item.resource.res_animation.webp_src)
    );

    // 如果存在头像框
    if (exists) {
        // 首先统一不同用户的头像样式,使得没有数字头像的用户头像大小位置与有数字头像的用户一致
        obj.data.card.avatar.container_size = { "width": 1.65, "height": 1.65 };
        obj.data.card.avatar.fallback_layers.layers[0].general_spec = {
            "pos_spec": {
                "axis_x": 0.825,
                "axis_y": 0.825,
                "coordinate_pos": 2
            },
            "size_spec": {
                "width": 0.99,
                "height": 0.99
            },
            "render_spec": {
                "opacity": 1
            }
        };
        obj.data.card.avatar.fallback_layers.layers[1].general_spec = {
            "pos_spec": {
                "axis_x": 0.825,
                "axis_y": 0.825,
                "coordinate_pos": 2
            },
            "size_spec": {
                "width": 0.94,
                "height": 0.94
            },
            "render_spec": {
                "opacity": 1
            }
        };
        obj.data.card.avatar.fallback_layers.layers[1].layer_config.layer_mask.general_spec = {
            "pos_spec": {
                "axis_x": 0.825,
                "axis_y": 0.825,
                "coordinate_pos": 2
            },
            "size_spec": {
                "width": 0.94,
                "height": 0.94
            },
            "render_spec": {
                "opacity": 1
            }
        };
        obj.data.card.avatar.fallback_layers.layers[2].general_spec = {
            "pos_spec": {
                "axis_x": 0.825,
                "axis_y": 0.825,
                "coordinate_pos": 2
            },
            "size_spec": {
                "width": 1.65,
                "height": 1.65
            },
            "render_spec": {
                "opacity": 1
            }
        };
        // 以上是所有用户都有的一些基本样式,再之后的样式会因为不同用户的会员/up主状态而有所不同,为了同一样式,需要将后面的样式全部删除，重新添加
        for (let i = 3; i < obj.data.card.avatar.fallback_layers.layers.length; i++) {
            delete obj.data.card.avatar.fallback_layers.layers[i];
        }
        //  统一所有用户的图标为数字藏品图标+超大会员图标
        obj.data.card.avatar.fallback_layers.layers[3] = {
            "resource": {
                "res_type": 5,
                "res_native_draw": {
                    "draw_src": {
                        "draw": {
                            "fill_mode": 1,
                            "draw_type": 1,
                            "color_config": {
                                "day": {
                                    "argb": "#FFFFFFFF"
                                },
                                "night": {
                                    "argb": "#FF17181A"
                                },
                                "is_dark_mode_aware": true
                            }
                        },
                        "src_type": 3
                    }
                }
            },
            "general_spec": {
                "pos_spec": {
                    "axis_x": 1.095,
                    "axis_y": 1.1116666666666666,
                    "coordinate_pos": 1
                },
                "size_spec": {
                    "width": 0.275,
                    "height": 0.275
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
        obj.data.card.avatar.fallback_layers.layers[4] = {
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
        obj.data.card.avatar.fallback_layers.layers[5] = {
            "resource": {
                "res_type": 5,
                "res_native_draw": {
                    "draw_src": {
                        "draw": {
                            "fill_mode": 1,
                            "draw_type": 1,
                            "color_config": {
                                "day": {
                                    "argb": "#FFFFFFFF"
                                },
                                "night": {
                                    "argb": "#FF17181A"
                                },
                                "is_dark_mode_aware": true
                            }
                        },
                        "src_type": 3
                    }
                }
            },
            "general_spec": {
                "pos_spec": {
                    "axis_x": 0.845,
                    "axis_y": 1.1116666666666666,
                    "coordinate_pos": 1
                },
                "size_spec": {
                    "width": 0.275,
                    "height": 0.275
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
        obj.data.card.avatar.fallback_layers.layers[6] = {
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

    // 如果不存在头像框,逻辑和上面的一样,只是样式不同
    else {
        obj.data.card.avatar.fallback_layers.layers[0].general_spec.size_spec = { "width": 1.25, "height": 1.25 };
        obj.data.card.avatar.fallback_layers.layers[1].general_spec.size_spec = { "width": 1.2, "height": 1.2 };
        obj.data.card.avatar.fallback_layers.layers[1].layer_config.layer_mask.general_spec.size_spec = { "width": 1.2, "height": 1.2 };
        for (let i = 2; i < obj.data.card.avatar.fallback_layers.layers.length; i++) {
            delete obj.data.card.avatar.fallback_layers.layers[i];
        }
        obj.data.card.avatar.fallback_layers.layers[2] = {
            "resource": {
                "res_type": 5,
                "res_native_draw": {
                    "draw_src": {
                        "draw": {
                            "fill_mode": 1,
                            "draw_type": 1,
                            "color_config": {
                                "day": {
                                    "argb": "#FFFFFFFF"
                                },
                                "night": {
                                    "argb": "#FF17181A"
                                },
                                "is_dark_mode_aware": true
                            }
                        },
                        "src_type": 3
                    }
                }
            },
            "general_spec": {
                "pos_spec": {
                    "axis_x": 1.095,
                    "axis_y": 1.1,
                    "coordinate_pos": 1
                },
                "size_spec": {
                    "width": 0.275,
                    "height": 0.275
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
        obj.data.card.avatar.fallback_layers.layers[3] = {
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
                    "axis_y": 1.125,
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
        obj.data.card.avatar.fallback_layers.layers[4] = {
            "resource": {
                "res_type": 5,
                "res_native_draw": {
                    "draw_src": {
                        "draw": {
                            "fill_mode": 1,
                            "draw_type": 1,
                            "color_config": {
                                "day": {
                                    "argb": "#FFFFFFFF"
                                },
                                "night": {
                                    "argb": "#FF17181A"
                                },
                                "is_dark_mode_aware": true
                            }
                        },
                        "src_type": 3
                    }
                }
            },
            "general_spec": {
                "pos_spec": {
                    "axis_x": 0.85,
                    "axis_y": 1.1,
                    "coordinate_pos": 1
                },
                "size_spec": {
                    "width": 0.275,
                    "height": 0.275
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
        obj.data.card.avatar.fallback_layers.layers[5] = {
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
                    "axis_x": 0.8750000000000001,
                    "axis_y": 1.125,
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

    console.log("伪装完成");
    $done({ body: JSON.stringify(obj) });
} else {
    console.log("正在访问空间不在伪装范围内,正常访问");
    $done({});
}