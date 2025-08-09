if .data.books then
    del(.data.books[].tag_type)
elif .data.list then
    del(.data.list[].tag_type,.data.list[].book_list[]?.tag_type)
elif .data.sections then
    .data.sections |= map(
        if .section_header.section_type | IN("1","3","5","6") then
            del(.books[].tag_type,.books[].book_list[]?.tag_type)
        elif .section_header.section_type == "4" then
            if .section_header.position == "rotation" then
                empty
            else 
                del(.books[].tag_type)
            end
        elif .section_header.section_title == "听书" then
            empty
        else .
        end
    ) | del(.data.banners)
else
    .
end