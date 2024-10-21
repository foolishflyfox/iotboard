# leafer

## UI

UI 是所有元素和容器的基类。包含如下数据：

- id: UI id，默认为空字符串。理论上应该是唯一的，通过 findId 可以寻找容器中的 UI，`app.findId` 是在 app 下搜索指定 id 的 UI，`app.tree.findId` 仅在 tree 下搜索指定 id 的 UI；如果 id 不唯一，该函数只会返回一个 UI，因此尽量保持 id 唯一性；
- className: 分类名，默认为空字符串；
- name: 名称，默认为空字符串；
- app: 获取 app，如果没有创建 App，则返回的是对应 ui 所在的 Leafer；如果其自身就是一个 Leafer，并且没有对应的 app，则 `.app` 返回的是其自身，否则返回的是真实的 app；
- leafer: 所属 Leafer，一个 Leafer 的 `.leafer` 为其自身
- isLeafer: boolean 类型，表示 UI 元素是否为 Leafer 类型
- zIndex: 图层位置，zIndex 越大，越浮在上面。默认的 zIndex 为0，可将 zIndex 设为正数或负数，修改后，页面会响应式的重绘；
- tag: 标签名，只读，如 Rect，如果修改改 tag，也不会生效；
- innerId: 数字类型，临时创建的内部唯一id，用于快速识别元素，按创建顺序自增；
- innerName: 字符串类型，临时创建的内部唯一名称，用于快速识别元素，通常为 `${tag}${id}`，例如 App0, Leafer1, Rect4。

## 布局

## transform

- localTransform: 相对于父元素的变化矩阵，a、b、c、d、e、f 6个 number 类型属性
  - a: 水平缩放样子
  - b: 水平倾斜因子
  - c: 垂直倾斜因子
  - d: 垂直缩放因子
  - e: 横向(水平)平移
  - f: 纵向(垂直)平移
- setTransform(matrix): 设置本地变换矩阵，会自动分解为元素的布局属性 x,y,scaleX,scaleY,rotation,skewX,skewY
- getTransform(relative = 'local'): 获取变换矩阵，支持获取相对于任意父元素 relative 的相对矩阵
- worldTransform: 只读属性，相对于世界坐标的变换矩阵
- x: x 轴坐标
- y: y 轴坐标
- scaleX: x 轴缩放比例，为负数时表示镜像 X 轴
- scaleY: y 轴缩放比例，为负数时表示镜像 Y 轴
- rotate: 旋转角度，取值范围 -180 ~ 180
- skewX: x 轴倾斜角度
- skewY: y 轴倾斜角度
