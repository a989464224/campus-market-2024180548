# Day5 Evidence — 状态管理与用户中心

## 1. 今日完成内容

今天完成了"校园轻集市"的 Pinia 状态管理引入和用户中心功能实现，具体包括：

- 创建 `src/stores/user.ts`，管理当前用户信息（用户名、学院、年级、头像、登录状态），提供 `displayName`、`userDescription` 等 getter 和 `updateProfile`、`login`、`logout` 等 action；
- 创建 `src/stores/favorite.ts`，管理收藏状态（收藏列表），提供 `addFavorite`、`removeFavorite`、`toggleFavorite`、`isFavorite` 等 action；
- 在 AppHeader 导航栏中引入 `userStore`，将原来硬编码的"个人中心"按钮替换为动态显示的用户名称；
- 在 PublishView 发布页面中引入 `userStore`，将三处硬编码的 `publisher: '当前用户'` 替换为 `publisher: userStore.displayName`，建立发布数据与当前用户状态的关联；
- 在四个业务列表页面（TradeView、LostFoundView、GroupBuyView、ErrandView）中引入 `favoriteStore`，为每张卡片添加收藏/取消收藏按钮；
- 重写 ProfileView 个人中心页面，展示来自 `userStore` 的用户资料、来自 `favoriteStore` 的收藏列表、以及按发布人筛选的"我的发布"列表；
- 在 MessageView 消息中心页面顶部添加两条静态系统通知卡片。

## 2. Store 设计说明

| Store 文件 | 管理内容 | 主要状态 | 主要方法 |
|---|---|---|---|
| src/stores/user.ts | 当前用户信息 | isLoggedIn、currentUser（id、name、college、grade、avatar、bio） | updateProfile、login、logout |
| src/stores/favorite.ts | 收藏状态 | favorites（FavoriteItem[]） | addFavorite、removeFavorite、toggleFavorite、isFavorite |

### 2.1 userStore 设计

- **state**: `isLoggedIn`（登录状态）和 `currentUser`（用户对象，包含 id、name、college、grade、avatar、bio）
- **getters**: `displayName`（返回用户名）、`userDescription`（返回"学院 · 年级"格式的简介）
- **actions**: `updateProfile`（部分更新用户信息）、`login`（设置登录状态）、`logout`（清除登录状态）
- Day5 阶段使用模拟用户"张同学 · 计算机学院 · 2023级"，不接入真实登录接口

### 2.2 favoriteStore 设计

- **state**: `favorites`（FavoriteItem 数组，每项包含 id、type、title、description、location）
- **getters**: `favoriteCount`（收藏总数）
- **actions**: `isFavorite(type, id)`（判断是否已收藏）、`addFavorite(item)`（添加收藏，已存在则跳过）、`removeFavorite(type, id)`（移除收藏）、`toggleFavorite(item)`（切换收藏状态）
- 收藏数据暂存前端内存，刷新后丢失——Day5 可接受，后续可通过 localStorage 或后端接口持久化

## 3. 状态边界说明

引入 Pinia 后，一个重要原则是：**Store 不是用来存放所有数据的地方，而是用来存放多个页面或多个组件需要共享的状态**。以下是本项目的状态边界划分：

| 数据类型 | 是否放入 Store | 存放位置 | 原因 |
|---|---|---|---|
| 当前用户信息 | ✅ 放入 userStore | src/stores/user.ts | 导航栏（显示用户名）、发布页（作为发布人）、个人中心（展示用户资料）三个位置都需要使用 |
| 收藏列表 | ✅ 放入 favoriteStore | src/stores/favorite.ts | 列表页（收藏/取消收藏按钮）和个人中心（我的收藏列表）两个位置都需要使用 |
| API 返回的商品列表 | ❌ 不放入 Store | 各页面组件的 ref | 每个列表页独立请求和管理自己的数据，没有跨页面共享需求 |
| 发布表单输入内容 | ❌ 不放入 Store | PublishView.vue 的 reactive | 表单数据只属于当前页面，提交后即跳转，无需跨页面共享 |
| 表单校验错误信息 | ❌ 不放入 Store | PublishView.vue 的 errors reactive | 校验错误只与当前表单相关，不需要被其他组件读取 |
| 消息会话列表 | ❌ 不放入 Store | MessageView.vue 的 ref | 仅消息页面使用，暂无跨页面共享需求 |
| 筛选条件/标签页状态 | ❌ 不放入 Store | 各页面组件的 ref | 属于页面局部 UI 状态 |

这种边界划分避免了 Store 变成"全局垃圾桶"——如果所有数据都塞进 Store，反而会导致状态管理混乱、数据流难以追踪。

## 4. 页面使用记录

| 文件 | 使用的 Store | 使用方式 |
|---|---|---|
| src/components/AppHeader.vue | userStore | 引入 `useUserStore()`，在模板中显示 `userStore.displayName` 替代硬编码按钮 |
| src/views/PublishView.vue | userStore | 引入 `useUserStore()`，提交时将 `publisher: userStore.displayName` 写入 API |
| src/views/TradeView.vue | favoriteStore | 引入 `useFavoriteStore()`，为每张卡片添加收藏按钮，按钮文字根据 `isFavorite` 动态切换 |
| src/views/LostFoundView.vue | favoriteStore | 同上，type 为 `'lostFound'` |
| src/views/GroupBuyView.vue | favoriteStore | 同上，type 为 `'groupBuy'` |
| src/views/ErrandView.vue | favoriteStore | 同上，type 为 `'errand'`，location 拼接 `from → to` |
| src/views/ProfileView.vue | userStore + favoriteStore | 展示用户资料卡片（来自 userStore）、我的收藏列表（来自 favoriteStore，支持取消收藏）、我的发布列表（按 publisher 筛选） |

## 5. AI 协作记录

### 5.1 使用的 AI 工具
本次实训使用 Claude（DeepSeek v4pro 模型）辅助开发。

### 5.2 核心提示词
向 AI 输入了 Day5 实训文档全文，包含九个 Task 的详细说明和推荐代码片段，要求完成：
1. 确认 Pinia 已挂载
2. 创建用户状态 Store
3. 在导航栏显示用户信息
4. 在发布页面使用当前用户
5. 创建收藏状态 Store
6. 在列表页面添加收藏操作
7. 完善个人中心页面
8. 实现"我的发布"基础思路
9. 补充消息中心基础状态

### 5.3 AI 生成内容
| 文件 | AI 生成内容 |
|---|---|
| src/stores/user.ts | 完整的用户 Store 代码（state、getters、actions），用户信息与项目现有 ProfileView 中的"张同学"保持一致 |
| src/stores/favorite.ts | 完整的收藏 Store 代码（state、getters、actions），包含类型定义 FavoriteItem |
| src/components/AppHeader.vue | 引入 useUserStore，替换 header-actions 区域的硬编码按钮 |
| src/views/PublishView.vue | 引入 useUserStore，将三处 `'当前用户'` 替换为 `userStore.displayName` |
| src/views/TradeView.vue | 引入 useFavoriteStore，添加收藏按钮和样式 |
| src/views/LostFoundView.vue | 同上 |
| src/views/GroupBuyView.vue | 同上 |
| src/views/ErrandView.vue | 同上 |
| src/views/ProfileView.vue | 完整重写：用户资料卡片 + 收藏列表（ItemCard + EmptyState） + 我的发布（按 publisher 筛选四类数据） |
| src/views/MessageView.vue | 添加两条系统通知卡片（欢迎使用、功能提示） |

### 5.4 AI 生成内容的合理性评估
- **优点**：AI 能够按照实训文档中的代码模板生成符合 Pinia 规范的 Store 代码；能够理解跨文件修改的需求（在多个页面统一引入 Store）；生成的 TypeScript 接口定义准确。
- **不足**：AI 生成的 ProfileView 完全移除了原有的菜单卡片（"我的内容"、"账号管理"等）和最近动态区域，只保留了实训文档模板中的内容。这虽然符合 Day5 的教学重点（展示 Store 状态共享），但丢失了 Day4 积累的部分 UI 细节。考虑到 Day5 重点是 Pinia 状态管理而非 UI 完整性，这个取舍可以接受。

## 6. 人工调整内容

在 AI 生成的基础上，我做了以下审查和修改：

### 6.1 确认 Pinia 无需重复安装
项目在 Day1 脚手架阶段已安装 `pinia: ^3.0.4`，`src/main.ts` 已正确挂载。AI 生成的代码无需修改即可运行。

### 6.2 用户信息一致性确认
AI 生成的 userStore 中用户名为"张同学"、学院为"计算机学院"、年级为"2023级"，与 ProfileView 中原有的硬编码用户信息一致，保证了 Store 替换后的视觉连贯性。

### 6.3 四类页面统一添加收藏按钮
AI 为四个业务列表页面各生成了收藏按钮代码，人工检查确认：每个页面的 `type` 参数正确对应（trade/lostFound/groupBuy/errand），location 字段处理正确（特别是跑腿委托的 `from → to` 拼接），按钮样式在 GroupBuyView 中调整为更紧凑的尺寸（因 footer 已有进度条）。

### 6.4 ProfileView 的结构调整
AI 生成的 ProfileView 按照实训文档模板实现了三块内容（用户资料、我的收藏、我的发布）。人工确认了：EmptyState 组件在收藏为空时正确显示、"我的发布"的 computed 筛选逻辑正确、导航链接指向 `/user` 和 `/publish` 路径正确。

### 6.5 移除 .gitkeep
`src/stores/` 目录中原有的 `.gitkeep` 文件在创建实际 Store 文件后已无意义，人工删除。

## 7. 测试记录

### 测试一：收藏功能端到端测试

**测试步骤**：
1. 启动 JSON Server Mock 服务（`npm run mock`）和 Vite 开发服务器（`npm run dev`）
2. 访问二手交易页面（/trade），确认列表正常渲染
3. 点击第一条商品卡片上的"收藏"按钮
4. 观察按钮文字变化
5. 点击导航栏中的用户名"张同学"进入个人中心
6. 在"我的收藏"区域查看收藏内容
7. 点击"取消收藏"按钮
8. 返回二手交易页面，确认按钮恢复为"收藏"

**测试结果**：
- ✅ 步骤 3：按钮文字从"收藏"变为"已收藏"
- ✅ 步骤 4：按钮样式保持圆角灰色背景
- ✅ 步骤 6：个人中心"我的收藏"区域出现刚收藏的商品卡片，包含标题、描述、类型标签
- ✅ 步骤 7：点击"取消收藏"后，该卡片从个人中心消失
- ✅ 步骤 8：返回列表页，按钮恢复为"收藏"

**跨页面状态验证**：在二手交易页面收藏后，无需刷新即进入个人中心能看到收藏内容，证明 `favoriteStore` 的状态在路由切换时保持正确——这正是 Pinia 的核心价值。

### 测试二：发布人绑定用户状态测试

**测试步骤**：
1. 进入发布页面（/publish）
2. 选择"二手交易"，填写标题、分类、价格、成色、地点、描述
3. 点击"发布"
4. 进入个人中心（/profile）的"我的发布"区域

**测试结果**：
- ✅ 步骤 3：alert 提示"二手商品发布成功"，自动跳转到 /trade
- ✅ 步骤 4：个人中心出现刚发布的商品（因为 publisher 匹配 `userStore.displayName`）
- ✅ 发布页面不再使用硬编码 `'当前用户'`，而是从 Store 动态读取

## 8. 遇到的问题与解决方法

### 问题一：Store 文件创建后 TypeScript 类型检查报错

**现象**：创建 `src/stores/user.ts` 后，`vue-tsc` 报告 `CurrentUser` 接口中的 `avatar` 和 `bio` 字段在 state 初始化中使用 `as CurrentUser` 类型断言时兼容性问题。

**排查过程**：检查 Pinia 3.x 对 TypeScript 6.x 的类型推断支持。发现 Pinia 的 `defineStore` 在 state 函数返回对象时，如果使用 `as` 类型断言，需要确保 state 返回值的类型与接口完全匹配。

**解决方法**：确认 state 中的 `currentUser` 对象字段与 `CurrentUser` 接口完全一致，包括 `avatar` 和 `bio` 字段都有默认值，类型检查通过。

### 问题二：ProfileView 重写后丢失了原有菜单卡片

**现象**：AI 生成的 ProfileView 按照实训文档的 UserCenterView 模板，只包含用户资料、我的收藏、我的发布三部分，移除了原有的"我的内容"菜单卡片（含我的发布、我的收藏、我的消息、浏览历史链接）、"账号管理"菜单卡片和"最近动态"区域。

**分析**：这不是 bug——实训文档明确要求 Day5 的 ProfileView 展示 Store 的使用（用户资料来自 userStore、收藏列表来自 favoriteStore）。原有的菜单卡片是 Day3/Day4 的纯静态 UI，虽然视觉效果更丰富，但不涉及 Store 状态。考虑到 Day5 的教学重点是 Pinia 状态共享而非 UI 完整性，我选择保留 AI 生成的精简版本，通过导航栏和页面底部的链接（"查看全部发布记录 →"、"发布新信息 →"）保持页面间的连通性。

### 问题三：收藏数据刷新后丢失

**现象**：收藏几条商品后刷新浏览器，所有收藏消失。

**原因分析**：favoriteStore 的状态存储在 Pinia 的内存中（JavaScript 运行时内存），浏览器刷新后整个 JS 上下文被销毁并重新初始化，内存中的状态自然丢失。

**这是预期行为**：实训文档明确指出"收藏状态暂时只保存在前端内存中；刷新页面后收藏会丢失，这是 Day5 可以接受的现象"。后续可通过 `pinia-plugin-persistedstate` 插件将状态同步到 localStorage，或通过后端 API 持久化。Day5 的重点是理解 Pinia 的跨组件状态共享机制，而非实现完整的持久化收藏系统。

## 9. 今日反思

**Pinia 状态管理**对多页面前端应用的核心价值在于解决了"跨组件跨页面数据共享"的难题。在 Day5 之前，项目的用户信息和收藏逻辑只能通过 props 层层传递或者在每个组件中重复定义——比如 AppHeader 写死"张同学"，PublishView 写死 `'当前用户'`，ProfileView 也写死"张同学"的学院年级。这三个地方的"用户"之间没有任何关联：如果用户信息变了，需要修改三处代码。引入 **Pinia** 后，`userStore` 成为用户信息的唯一数据源（single source of truth），AppHeader、PublishView、ProfileView 都从同一个 Store 读取——修改 `userStore.currentUser` 就会在所有使用处生效。

这种"单一数据源"的模式在**用户中心**等需要聚合多来源数据的页面中优势尤为明显。ProfileView 需要同时展示用户信息（来自 userStore）和收藏列表（来自 favoriteStore），还需要从 4 个 API 获取发布数据并按 publisher 筛选——如果没有 Store，这些数据要么通过复杂的父子组件通信传递，要么在每个组件中独立维护一份副本（导致数据不一致）。有了 Store，ProfileView 只需引入需要的 Store 实例并直接读取其响应式状态，代码逻辑清晰且数据流可追踪。

**状态边界**的设计同样重要。Day5 的一个关键收获是：不是所有数据都适合放 Store。表单输入内容、校验错误、列表页的筛选条件——这些都只属于特定页面，放入 Store 反而会让 Store 变得臃肿难维护。好的 Store 设计应该像图书馆的分类系统：只收录需要被多个读者（组件）查阅的书籍（状态），而不是把所有纸张都塞进书架。

总结来说，Pinia 为 Vue 应用提供了一层轻量但有效的全局状态管理能力——它不像 Vuex 那样笨重，也不像简单的 provide/inject 那样缺乏结构。对于"校园轻集市"这种多页面、多业务类型的应用，Pinia 在保持代码简洁的同时，为未来扩展（如真实登录、消息推送、通知系统）预留了清晰的状态管理架构。
