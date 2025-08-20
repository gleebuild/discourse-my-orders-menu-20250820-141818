import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";

export default {
  name: "add-orders-menu",

  initialize() {
    withPluginApi("1.39.0", (api) => {
      const siteSettings = api.container.lookup("service:site-settings");
      if (!siteSettings.orders_menu_enabled) {
        return;
      }

      const url = siteSettings.orders_menu_url;
      if (!url) {
        // No URL configured, nothing to render.
        return;
      }

      const labelSetting = siteSettings.orders_menu_label?.trim();
      const label = labelSetting || I18n.t("orders_menu.label");
      const title = I18n.t("orders_menu.title");
      const icon = siteSettings.orders_menu_icon || "shopping-cart";
      const position = (siteSettings.orders_menu_position || "profile").toLowerCase();
      const openInNew = !!siteSettings.orders_menu_open_in_new_tab;

      const currentUser = api.getCurrentUser();
      const uname = currentUser?.username || currentUser?.username_lower || "";
      const uid = currentUser?.id || "";

      // Replace placeholders if used
      const href = url
        .replace(/:username/gi, encodeURIComponent(uname))
        .replace(/:userid/gi, encodeURIComponent(String(uid)));

      // Add to Profile quick access panel ("我的帖子"所在面板)
      if (position === "profile" || position === "both") {
        api.addQuickAccessProfileItem({
          icon,
          href,
          content: label,
          title
        });

        if (openInNew) {
          // Intercept clicks to open in new tab
          api.decorateWidget("quick-access-profile:after", (helper) => {
            // add a delegated click handler once
            requestAnimationFrame(() => {
              document.querySelectorAll('a[href="' + href + '"]').forEach((a) => {
                a.setAttribute("target", "_blank");
                a.setAttribute("rel", "noopener");
              });
            });
          });
        }
      }

      // Add to the avatar user menu (下拉用户菜单)
      if (position === "user_menu" || position === "both") {
        api.addUserMenuButton({
          name: "my-orders",
          icon,
          label,
          title,
          action: () => {
            if (openInNew) {
              window.open(href, "_blank", "noopener");
            } else {
              window.location.href = href;
            }
          },
        });
      }
    });
  },
};
