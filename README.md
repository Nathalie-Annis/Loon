# Nathalie's Loon Repo
## 1. 插件  
### 
本仓库提供的插件小部分引用自其他作者，并由我进一步增强其功能。其余大部分插件为我自己编写。引用的插件均保留了原作者署名信息，在此感谢各位原作者。请低调使用。
###
- <a href="https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Plugin/369cx.plugin">369出行去广告</a>
- <a href="https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Plugin/bahamut.plugin">动画疯增强</a>
- <a href="https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Plugin/baidumap.plugin">百度地图去广告</a>
- <a href="https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Plugin/bilibili.plugin">哔哩哔哩增强(粉&白通用版)</a>
- <a href="https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Plugin/github.plugin">GitHub增强</a>
- <a href="https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Plugin/qiekj.plugin">胖乖生活去广告</a>
- <a href="https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Plugin/qimao.plugin">七猫小说去广告</a>
- <a href="https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Plugin/tutusouti.plugin">考途去广告</a>
- <a href="https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Plugin/wandafilm.plugin">万达电影去广告</a>
- <a href="https://www.nsloon.com/openloon/import?plugin=https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/Plugin/youdaodict.plugin">有道词典去广告</a>
## 2. jq复写
###
符合我个人审美需求的一些精简。  
**🎯此类jq复写没有完整App去广告功能，请在复写功能中选择response-body-json-jq自行添加需要精简内容对应的正则表达式匹配URL，jq URL填入下方提供的链接地址，并与该App相关去广告插件配合使用。**   
⚠️若添加的正则表达式匹配与原插件中的对应功能的正则表达式匹配完全一致，则两个复写**同时作用**，先后执行两次过滤逻辑；  
⚠️若添加的正则表达式匹配与原插件中的对应功能的正则表达式匹配不一致，则**只会作用**你添加的本地jq复写，**建议通常采用此方法**,避免复写冲突以及不必要的精简。  
⚠️只要添加了相关功能的复写，原插件中的对应功能的脚本处理将**不再执行**。
###
- [哔哩哔哩我的精简](https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/jq/bilibili_mine.jq)
- [哔哩哔哩主页标签栏精简&重排序](https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/jq/bilibili_tab.jq)
- [哔哩哔哩动画/影视版块精简&重排序](https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/jq/bilibili_tabcontent.jq)
- [高德地图我的精简](https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/jq/amap_profile.jq)
- [闲鱼主页信息流](https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/jq/goofish_home.jq)
- [闲鱼主页tab栏](https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/jq/goofish_tab.jq)
- [闲鱼我的精简](https://raw.githubusercontent.com/Nathalie-Annis/Loon/refs/heads/main/jq/goofish_user.jq)