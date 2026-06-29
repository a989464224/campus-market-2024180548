# Day3 Evidence - Mock 数据建模与列表渲染

## 1. 今日完成内容

今天完成了校园轻集市项目的 Mock 数据建模、API 接口封装和四个核心业务页面的列表渲染工作。具体包括：

- 在项目根目录创建了 `db.json`，定义了 trades（二手交易）、lostFounds（失物招领）、groupBuys（拼单搭子）、errands（跑腿委托）四个数据集合，每类各 7 条数据；
- 配置了 JSON Server 启动命令 `pnpm mock`，并在开发时同时运行前端服务（localhost:5173）和 Mock API 服务（localhost:3001）；
- 在 `src/api/` 目录下封装了 Axios 请求实例 `http.ts`，并创建了 trade、lostFound、groupBuy、errand 四个业务 API 模块，每个模块包含 TypeScript 接口定义和 get 请求方法；
- 在 `src/components/` 中创建了可复用的 `ItemCard.vue` 列表卡片组件和 `EmptyState.vue` 空状态组件；
- 完成了 TradeView、LostFoundView、GroupBuyView、ErrandView 四个页面的数据请求与列表渲染。

## 2. Mock 数据结构说明

| 数据集合 | 对应业务 | 主要字段 | 页面用途 |
|---|---|---|---|
| trades | 二手交易 | title、category、price、condition、location、publisher、publishTime、status、description | 展示二手商品列表，显示价格、成色和交易状态 |
| lostFounds | 失物招领 | title、type、itemName、location、eventTime、contact、status、description | 展示寻物和招领信息，区分丢失/拾获类型 |
| groupBuys | 拼单搭子 | title、type、targetCount、currentCount、deadline、location、publisher、status、description | 展示拼单信息，通过进度条展示当前参与人数占比 |
| errands | 跑腿委托 | title、taskType、reward、from、to、deadline、publisher、status、description | 展示跑腿任务，显示赏金和起止地点 |

## 3. 我的设计

在数据字段设计上，我根据四个业务场景的实际需求做了以下判断：

**二手交易（trades）为什么需要 price 和 condition？**
二手交易的核心是价格和商品成色。price 让买家一眼就能判断是否在预算范围内，condition（全新/九成新/八成新等）则帮助买家评估商品的折旧程度。这两个字段是二手交易区别于其他业务的关键特征。同时我保留了 status 字段（open/closed/done），用于区分在售、已下架和已售出三种状态，让列表页能够直观呈现交易进展。

**失物招领（lostFounds）为什么需要 type 字段？**
失物招领包含两种截然不同的信息：寻物（lost）和招领（found）。用一个 type 字段统一管理这两类信息，而不是分成两个独立集合，可以避免数据模型碎片化。页面渲染时通过 type 判断显示"寻物"还是"招领"标签，后续的匹配逻辑（失主匹配拾主）也可以在同一集合内完成。

**拼单搭子（groupBuys）为什么需要 targetCount 和 currentCount？**
拼单的核心逻辑是"人够就成团"。targetCount 是目标人数，currentCount 是当前已参与人数。我在列表渲染时计算 `currentCount / targetCount` 的百分比并用进度条展示，让用户对拼单进度一目了然。deadline 字段用于截止时间控制，超过截止时间的拼单会自动失效。

**跑腿委托（errands）为什么需要 from、to 和 reward？**
跑腿委托是任务型信息。from 和 to 分别表示任务起点和终点（如"菜鸟驿站 → 西区 5 栋"），帮助接单人判断是否顺路。reward 是酬劳金额，直接在卡片底部用红色加粗显示，吸引用户接单。相比其他三种业务，跑腿多了 taskType 字段（取快递/代买/代打印/搬运/代排队/代办事务/取外卖），因为跑腿的任务种类比二手交易更分散，需要类型标签帮助筛选。

**统一设计考量：** 四个集合都保留了 id、title、description、location、publisher、status 等通用字段，确保 ItemCard 组件可以通过插槽（slot）机制在不同页面间复用，同时每个页面在 footer 插槽中展示各自特有的字段。

## 4. AI 设计

在 Day3 实训中，我使用了 Claude 接入 DeepSeek v4pro 模型辅助开发。AI 协助完成了以下内容：

- **db.json 数据生成：** AI 帮我生成了四类 Mock 数据的初始版本。AI 能够理解校园场景，生成了诸如"九成新机械键盘"、"寻找黑色校园卡"、"周五晚火锅拼单"、"帮取快递到宿舍楼下"等贴合校园生活的数据条目，每条数据都包含了描述性文字，使列表渲染后看起来真实可信。

- **API 模块代码生成：** AI 帮我生成了 `http.ts` 的 Axios 实例封装代码，以及 `trade.ts`、`lostFound.ts`、`groupBuy.ts`、`errand.ts` 四个业务 API 模块。每个模块都包含了 TypeScript 接口定义和对应的 get 请求函数，结构清晰统一。

- **页面列表渲染代码：** AI 帮我生成了 TradeView、LostFoundView、GroupBuyView、ErrandView 四个页面的完整代码，包括 `onMounted` 生命周期中发起 API 请求、响应式数据绑定、`v-for` 循环渲染以及错误处理逻辑。

- **ItemCard 和 EmptyState 组件：** AI 生成了这两个通用组件，通过具名插槽 `#footer` 实现卡片底部区域的差异化渲染。

**AI 生成内容中的不合理之处：**
- AI 最初生成的 db.json 中，部分数据的 status 值过于单一（几乎全是 open），缺少 closed 和 done 状态的数据，导致列表页的状态标签无法展示完整的样式效果。我在其中手动混入了不同状态的数据，比如在 trades 中加入了 closed（LED护眼台灯）和 done（Nike跑鞋）状态的条目。
- AI 生成的 GroupBuyView 中，初始版本的拼单进度计算没有做百分比取整处理，导致进度条宽度出现小数，我补充了 `Math.round()` 对百分比做了四舍五入。
- AI 生成的 ErrandView 中，status 的状态映射最初只有 open 和 done 两种，但实际数据中存在 taken（已接单）状态，我补充了对应的中文映射和样式。

## 5. 最终调整

在 AI 生成的基础上，我做了以下人工修改：

- **补充多样化的 status 数据：** 在每个数据集合中混入不同状态（open、closed、done、taken）的数据，确保列表渲染后各状态标签的样式都能得到验证；
- **调整部分数据使其更贴合校园场景：** 例如将跑腿委托中的地点具体化为"菜鸟驿站"、"西区 5 栋"、"图书馆三楼自习室"等真实校园地标，避免使用"地点A"、"地点B"这类泛化名称；
- **统一进度条百分比计算：** 在 GroupBuyView.vue 中添加 `progressPercent()` 函数，使用 `Math.round()` 对百分比取整，避免进度条宽度出现过长的小数；
- **补充跑腿委托的 taken 状态：** 在 ErrandView.vue 中为 `taken` 状态（已接单）添加了中文映射和蓝色标签样式，使状态展示更完整；
- **调整 ItemCard 组件的插槽设计：** 确认使用具名插槽 `#footer` 而不是默认插槽，确保各页面的自定义底部内容与组件本身的结构清晰分离；
- **确认 package.json 中 mock 脚本配置：** 检查 `"mock": "json-server --watch db.json --port 3001"` 命令是否正确，确保端口 3001 不与前端端口 5173 冲突。

## 6. 遇到的问题与解决方法

**问题一：JSON Server 无法启动，报错 "Cannot find module"**

在首次运行 `pnpm mock` 时，终端报错提示找不到 json-server 模块。排查后发现 json-server 虽然已写入 package.json 的 devDependencies，但因为之前没有运行过 `pnpm install`，该依赖尚未下载到 node_modules 中。执行 `pnpm install` 后重新运行 `pnpm mock`，JSON Server 成功启动并监听 3001 端口。

**问题二：前端页面没有渲染数据，列表为空**

前端服务启动后，访问 TradeView 页面时列表区域一直显示"暂无二手交易信息"的空状态。打开浏览器开发者工具的 Network 面板发现 API 请求状态为 `(failed)`，原因是只启动了前端服务（`pnpm dev`），忘记同时启动 JSON Server（`pnpm mock`）。新开一个终端窗口启动 Mock 服务后，页面数据正常渲染。

## 7. 今日反思

Mock 数据建模、API 接口封装和列表渲染是前端项目从"静态页面"迈向"数据驱动应用"的关键一步。JSON Server 让我们在不依赖真实后端的情况下，就能模拟完整的 HTTP 请求-响应流程，提前验证前端的数据获取和渲染逻辑；Mock 数据的设计决定了后续所有页面的数据结构和展示方式，好的数据建模能减少后期的重构成本；列表渲染则是前端最基础也最高频的操作，通过统一的 ItemCard 组件和插槽机制实现四个业务页面的差异化展示，让"复用"和"灵活"不再矛盾。这三者的打通，让我真正理解了前端项目中"数据从哪里来、怎么请求、如何展示"的完整链路，为 Day4 的交互功能（发布、编辑、删除）打下了坚实基础。
