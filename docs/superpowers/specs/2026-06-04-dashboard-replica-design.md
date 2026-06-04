# Commodity Price Simulator — Vue 3 复刻设计

日期：2026-06-04
来源：https://rjfteacher.bigstocks.org/dashboard（原站为 Vue 3 + Vite + Tailwind + Chart.js，结构与逻辑从产物 `DashboardView-Cd1EAsZt.js` 等 chunk 中还原）

## 范围

仅复刻 `/dashboard` 页面（含顶部导航 AppNav 与页脚 PageFooter）；其余导航链接指向统一的占位页。

## 技术栈

Vite + Vue 3 (script setup) + Vue Router + Tailwind CSS v4 + chart.js + vue-chartjs + lucide-vue-next。

## 结构

- `src/App.vue` — AppNav + router-view，根背景 `#060914`
- `src/components/AppNav.vue` — 固定顶栏：Jeff Currie logo、8 个菜单（Home/About/Research/Simulator/Markets/Insights/Newsletter/Competition）、Contact 金色渐变按钮、移动端汉堡菜单
- `src/components/PageFooter.vue` — © 2024 Jeffrey Currie
- `src/components/VariableSlider.vue` — 标签 + 百分比值 + −/range/+ 控件；scoped CSS 金色填充轨道（`--val` 绑定实际百分比）与发光拇指
- `src/views/DashboardView.vue` — 标题区（Interactive Tool 徽章、双色大标题）、Variables 卡（4 滑块 + 重置）、12-Month Price Projection 图表卡、Current/Avg/Range 统计卡、Market Insights 动态文案
- `src/views/PlaceholderView.vue` — 其他路由占位

## 模拟算法（与原站一致）

- 变量：Oil Supply 100 (50–150)、Global Demand 100 (50–150)、Geopolitical Risk 50 (0–100)、Inventory Level 100 (50–150)，步进 5
- `combined = (200−supply)/100 × demand/100 × (1+(risk−50)/200) × (200−inventory)/100`
- 起始价 `82 × combined`，逐月叠加 `(seededRandom(i*17+3)−0.5)*4*0.3 + (combined−1)*0.5`，下限 20
- `seededRandom(s) = frac(sin(s)*1e4)`（确定性，保证图形稳定）
- 统计：Current = 12 月价；Avg = 均值；Range = min–max

## 视觉规范

背景 `#060914`，卡片渐变 `#0d1225 → #060914`，金色 `#C9A84C`（hover `#e8c96b`，按钮渐变至 `#B8860B`），Inter 字体，图表金色线 + `rgba(201,168,76,.3)→0` 垂直渐变填充，暗色网格 `rgba(255,255,255,.04)`。

## 验证

`npm run dev` 后用无头 Chrome 对 `localhost` 截图，与原站截图逐区对比。
