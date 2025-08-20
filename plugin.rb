# frozen_string_literal: true
# name: discourse-my-orders-menu-20250820-141818
# about: Adds a configurable "我的订单 / My Orders" menu item under the user menu or profile quick access
# version: 0.1
# authors: ChatGPT
# required_version: 3.0.0
# url: https://example.com/discourse-my-orders-menu-20250820-141818

enabled_site_setting :orders_menu_enabled

register_asset "javascripts/initializers/add-orders-menu.js", :client
