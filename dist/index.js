module.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/*! exports used: default, resolve */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("path")},
/*!******************************************!*\
  !*** external "mini-css-extract-plugin" ***!
  \******************************************/
/*! no static exports found */
/*! exports used: default, loader */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("mini-css-extract-plugin")},
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("os")},
/*!****************************************!*\
  !*** external "vue-loader/lib/plugin" ***!
  \****************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("vue-loader/lib/plugin")},
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("webpack-node-externals")},
/*!******************************************!*\
  !*** external "webpack-bundle-analyzer" ***!
  \******************************************/
/*! no static exports found */
/*! exports used: BundleAnalyzerPlugin */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("webpack-bundle-analyzer")},
/*!***************************************!*\
  !*** external "clean-webpack-plugin" ***!
  \***************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("clean-webpack-plugin")},
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("html-webpack-plugin")},
/*!***********************************************!*\
  !*** external "connect-history-api-fallback" ***!
  \***********************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("connect-history-api-fallback")},
/*!******************************!*\
  !*** external "koa-connect" ***!
  \******************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("koa-connect")},
/*!******************************************!*\
  !*** external "uglifyjs-webpack-plugin" ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t){e.exports=require("uglifyjs-webpack-plugin")},
/*!****************************************!*\
  !*** ./packages/index.ts + 13 modules ***!
  \****************************************/
/*! exports provided: bob */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with external "clean-webpack-plugin" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "connect-history-api-fallback" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "html-webpack-plugin" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "koa-connect" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "mini-css-extract-plugin" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "os" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "path" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "vue-loader/lib/plugin" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "webpack-bundle-analyzer" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "webpack-node-externals" (<- Module is not an ECMAScript module) */function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o),s=n(2),i=n.n(s),u=n(0),a=n.n(u),l=n(3),p=n.n(l),c=n(4),h=n.n(c),f=n(5);var d=n(6),v=n.n(d);var g=n(7),m=n.n(g);var y=n(8),b=n.n(y),x=n(9),w=n.n(x);var _=n(10);n.d(t,"bob",function(){return j});var k=function(){function e(e,t,n){void 0===n&&(n="web");var o=process.env.BOB_ENV;this.target=n,this.production=null!=t&&"production"===t.mode||"production"===o,this.parallel=i.a.cpus().length>=2,this.serving=null!=process.env.WEBPACK_SERVE||null!=process.argv.find(function(e){return e.includes("webpack-dev-server")}),this.configuration={entry:{},externals:{},mode:this.production?"production":"development",module:{rules:[]},optimization:{noEmitOnErrors:!0},plugins:[],resolve:{alias:{}},target:n}}return e.prototype.serve=function(e,t,n){return this.configuration.serve=function(e,t,n){return{clipboard:!1,content:a.a.resolve("public"),devMiddleware:{index:"/assets/index.html",logLevel:"warn",publicPath:n},host:"0.0.0.0",hotClient:{host:{client:"127.0.0.1",server:"0.0.0.0"},https:!1,port:t},port:e,add:function(e,t,n){t.content(),t.webpack(),e.use(w()(b()({index:"/assets/index.html"})))}}}(e,t,n),this},e.prototype.devtool=function(e){return this.configuration.devtool="string"==typeof e?e:e(this.production),this},e.prototype.entry=function(e,t){return this.configuration.entry[e]="string"==typeof t?a.a.resolve(t):t.map(function(e){return a.a.resolve(e)}),this},e.prototype.external=function(e,t){return this.configuration.externals[e]=t,this},e.prototype.externals=function(e){var t=this;return Object.keys(e).forEach(function(n){t.external(n,e[n])}),this},e.prototype.modules=function(){for(var e=this,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var r=[],s=[".js"];return t.forEach(function(t){switch(t){case"css":r.push(function(e){var t=[];return e?t.push(o.loader,{loader:"css-loader",options:{minimize:!0}}):t.push("style-loader","css-loader"),{test:/\.css$/,use:t}}(e.production)),s.push(".css");break;case"handlebars":r.push({loader:"handlebars-loader",test:/\.hbs$/}),s.push(".hbs");break;case"pug":r.push({loader:"pug-plain-loader",test:/\.pug$/}),s.push(".pug");break;case"sass":r.push(function(e){var t=[];return e?t.push(o.loader,{loader:"css-loader",options:{minimize:!0}}):t.push("style-loader","css-loader"),t.push("sass-loader"),{test:/\.s[ac]ss$/,use:t}}(e.production)),s.push(".sass",".scss");break;case"stylus":r.push(function(e){var t=[];return e?t.push(o.loader,{loader:"css-loader",options:{minimize:!0}}):t.push("style-loader","css-loader"),t.push("stylus-loader"),{test:/\.(stylus|styl)$/,use:t}}(e.production)),s.push(".styl",".stylus");break;case"typescript":r.push(function(e){var t=[];return e&&t.push("thread-loader"),t.push({loader:"ts-loader",options:{appendTsSuffixTo:[/\.vue$/],experimentalWatchApi:!0,happyPackMode:e,onlyCompileBundledFiles:!0,reportFiles:[],silent:!0,transpileOnly:!0}}),{exclude:/node_modules/,test:/\.tsx?$/,use:t}}(e.parallel)),s.push(".ts",".tsx");break;case"vue":r.push({loader:"vue-loader",test:/\.vue$/}),s.push(".vue"),e.alias("vue$","vue/dist/vue.common.js"),e.configuration.plugins.push(new p.a)}}),this.configuration.module.rules=r,this.configuration.resolve.extensions=s,this},e.prototype.output=function(e,t){return this.configuration.output=function(e,t,n,o){return"web"===e?{filename:t?"[name].[chunkhash].js":"[name].js",path:a.a.resolve(n),publicPath:o}:{filename:"[name].js",path:a.a.resolve(n)}}(this.target,this.production,e,t),this},e.prototype.namespace=function(e,t){return this.configuration.resolve.alias[e]=a.a.resolve(t),this},e.prototype.resolve=function(e){return this.configuration.resolve.modules=[a.a.resolve("node_modules"),a.a.resolve(e)],this},e.prototype.alias=function(e,t){return this.configuration.resolve.alias[e]=t,this},e.prototype.aliases=function(e){var t=this;return Object.keys(e).forEach(function(n){t.alias(n,e[n])}),this},e.prototype.clean=function(e,t){return void 0===t&&(t=[]),this.configuration.plugins.push(function(e,t){return new v.a([a.a.resolve(e)],{exclude:t,root:process.cwd(),verbose:!1})}(e,t)),this},e.prototype.html=function(e){return this.configuration.plugins.push(function(e,t){return new m.a({filename:e?"index.html":"../index.html",inject:!0,template:a.a.resolve(t)})}(this.serving,e)),this},e.prototype.build=function(){return"node"===this.target&&(this.configuration.externals=[h()()]),this.production&&(this.configuration.optimization.minimizer=[new _({cache:u.resolve(".cache/uglify"),parallel:!0,sourceMap:!0,uglifyOptions:{compress:{arrows:!1,booleans:!1,collapse_vars:!1,comparisons:!1,computed_props:!1,conditionals:!0,dead_code:!0,evaluate:!0,hoist_funs:!1,hoist_props:!1,hoist_vars:!1,if_return:!1,inline:!1,join_vars:!1,keep_infinity:!0,loops:!1,negate_iife:!1,properties:!1,reduce_funcs:!1,reduce_vars:!1,sequences:!1,side_effects:!1,switches:!1,top_retain:!1,toplevel:!1,typeofs:!1,unused:!1},mangle:!0,output:{comments:!1}}})],"web"===this.target&&(this.configuration.optimization.runtimeChunk="single",this.configuration.optimization.splitChunks={chunks:"all",name:!0}),this.configuration.output.pathinfo=!0,this.configuration.plugins.push(new r.a({filename:"styles.[contenthash].css"}))),this.serving&&this.configuration.plugins.push(new f.BundleAnalyzerPlugin({analyzerHost:"0.0.0.0",logLevel:"error",openAnalyzer:!1})),this.configuration},e}();function j(e,t,n){return new k(e,t,n)}}]);
//# sourceMappingURL=index.js.map