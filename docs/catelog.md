## 文件目录结构

▸ build/						开发环境相关，一般不需要改动

▸ config/						开发环境配置，一般不需要改动

▸ dep/						外部依赖库，且不再npm源里管理的（比较少见），就放在这里

▸ doc/						各种文档，`开发指南` `接口文档` 等

▸ mockup/					mockup文件，模拟后端接口，

▸ node_modules/				npm依赖

▾ src/						开发目录，一般开发工作均在此目录下进行

      ▸ api/
      ▾ components/				所有应用组件
        ▸ common/				这里存放通用组件，比如Icon，Loading等antd-mobile没有覆盖的组件
        ▾ product/				这里是业务组件，一般一个大类别一个文件夹，比如`产品`、`客户`、`设置`等
            List.js				比如，这是一个产品列表组件，用于显示产品列表
            list.less			样式文件和组件放在一起，然后再组件中引用，参考List.js
            ListItem.js			组件尽量拆分成粒度更细的小组件，这里讲List中的一行拆成一个独立组件
            ListRedux.js		和List组件相关的`constants`、`action`、`reducer`,整合放在一起，避免创建多个文件
      ▸ config/					这里放一些通用的配置文件，如tabbar配置等
      ▸ css/						这里放通用的样式文件，比如`通用mixin` `全局调色板` `通用列表样式` 等	
      ▸ layouts/					布局文件，如TabBar、NavBar、Footer、Header等
      ▸ redux/					redux相关文件，如创建store、所有reducer汇总等
      ▸ routes/					路由配置
      ▸ sagas/					redux异步流处理，我们项目中的ajax请求均是通过saga监听到相应action后发起
      ▸ theme/					样式主题配置，主要是覆盖antd-mobile中的主题
      ▸ utils/						一些通用的工具类、方法
      ▾ views/					应用中某个页面的入口文件，一般均为路由组件
        ▸ customer/
        ▸ error/
        ▸ mission/
        ▾ product/
            Home.js
            HomeRedux.js
        ▸ profile/
      app.js
▸ static/						静态资源，如图片、字体文件等

  favicon.ico

  index.html					应用入口html

​	
  package.json

  README.md


