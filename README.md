# dropMenu 简单实用的下拉菜单

### usage
```
new DropMeun(option)
```

### option

- **id**：`String` 必选，触发dropMenu的节点。
- **data**：`Array` 必选，支持两种格式`[d1,d2,d3,]` 和`[{},{},{},]`。
- **dataSrc**：`String` data为上述第二种格式时，dataSrc表示需要的字段名。
- **ableSearch**：`Boolean` 是否需要搜索功能。`default: false`
- **style**：可选
```
 {
    // String或Int，parseInt()处理 单位px
    "width": 240,
    "maxHeight": 280,
    "left": 0,
    "top": 5,              // left, top 表示相对起始位置的偏移量
    "initPos": "right",    // 起始位置相对picker的对齐方式 default left
},
```
- **item**：可选
```
{
    "className": "itemName",   // 下拉列表中的选项添加className
    "render": function(data, full)  {
      // 对数据格式化
    },
    "callbakc": function(dataSrc, picker, full, all)  {
      // item点击之后的回调函数
    }
}
```

### notes
- 当picker为`input[type=text]`时，点击item自动将item的`innerText`写入`input[type=text]`的`value`中。
