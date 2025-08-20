# discourse-my-orders-menu-20250820-141818

让 Discourse 在“我的帖子/个人资料”面板下方或用户头像下拉菜单里，新增一个“我的订单”入口，链接可自定义。

## 安装
1. 上传本插件到 Discourse 宿主机：
   ```bash
   cd /var/discourse
   ./launcher enter app bash -lc 'ls' # 可选
   ```
2. 将本插件目录放到容器内 `/var/www/discourse/plugins/` 下：
   ```bash
   # 在宿主机上
   cp -r discourse-my-orders-menu-20250820-141818 /var/discourse/plugins/
   ./launcher rebuild app
   ```

> 也可将仓库以 git 方式添加到 `app.yml` 的 plugins 列表后 `rebuild`。

## 配置
管理后台 → 设置 → 搜索「orders menu」：
- **orders_menu_enabled**：启用/禁用
- **orders_menu_url**：目标链接（支持占位符 `:username` 与 `:userid`）
- **orders_menu_label**：显示文案（默认“我的订单”）
- **orders_menu_icon**：图标（默认 `shopping-cart`）
- **orders_menu_position**：显示位置：`profile`（默认，出现在“我的帖子”所在面板）、`user_menu`（头像下拉）、`both`
- **orders_menu_open_in_new_tab**：是否新开标签页打开

例：
- `https://m.lebanx.com/orders?u=:username`
- `https://m.lebanx.com/orders?uid=:userid`

## 兼容性
- 需要 Discourse 3.0+（已在 3.x 上验证的 API）

## 许可证
MIT


---
**Note:** For Discourse 3.x+, JS under `assets/javascripts` is auto-bundled. No `register_asset` is used.
