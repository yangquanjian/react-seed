## AMP 前端代码

### 启动环境

```sh

npm install
npm start

```

> 前端端口:8888   
> webpack-dev-server端口:3000

启动页面时加入?ed=1 启动mock数据

例如：http://nimei.baidu.com/?ed=1#/dashboard?_k=rcfa5f

## DllPlugin使用说明
1. 在webpack.dll.config.js里的vendors上写上要抽取出来的插件。
2. 在根目录运行 npm run dll，进行vendors的打包，打出来的文件在dist文件夹。
3. 在webpack.config.js里，把这个插件取消注释：
<code>
    plugins: [
        // new webpack.DllReferencePlugin({
        //       context: __dirname,
        //       manifest: require('./dist/manifest.json')
        // }),
</code>
4. 在对应的html里加上dist/vendor.js的引用,可以参考dashboard.html

5. 此功能仅用于dev模式，上线前如果要使用需要进行调整，例如给vendor.js加上hash等等。

## 如果你意图进一步加快DEV的打包速度？
请把webpack.config.js的entry里暂时不需要调试的模块注释掉即可。例如：
<code>
entry: {
        // editor: ['./src/js/pages/editor/index.js'],
        // render: ['./src/js/pages/editor/render.js'],
        dashboard: ['./src/js/pages/dashboard/index.js'],
        // login: ['./src/js/pages/login/index.js']
    },
</code>



