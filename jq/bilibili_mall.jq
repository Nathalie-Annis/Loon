if .data.vo.list then
    .data.vo.list |= map(select(.type? == "mallitems" and .saleType? == 0))
elif .data.vo.itemList then
    .data.vo.itemList |= map(select(.feedTag | has("frontTag") | not))
else 
    if .data.vo.searchUrl.titleVoList then
        .data.vo.searchUrl.titleVoList = []
    end |
    if .data.vo.banners then
        .data.vo.banners = []
    end |
    if .data.vo.orderBlock then
        .data.vo.orderBlock = []
    end |
    if .data.vo.benefitVO.crazyNight8IconVO then
        .data.vo.benefitVO.crazyNight8IconVO = []
    end |
    if .data.vo.feeds.list then
        .data.vo.feeds.list |= map(select(.type? == "mallitems" and .saleType? == 0))
    end
end