(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"+6XX":function(t,e,n){var r=n("y1pI");t.exports=function(t){return r(this.__data__,t)>-1}},"1hJj":function(t,e,n){var r=n("e4Nc"),o=n("ftKO"),i=n("3A9y");function a(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new r;++e<n;)this.add(t[e])}a.prototype.add=a.prototype.push=o,a.prototype.has=i,t.exports=a},"3A9y":function(t,e){t.exports=function(t){return this.__data__.has(t)}},"4kuk":function(t,e,n){var r=n("SfRM"),o=n("Hvzi"),i=n("u8Dt"),a=n("ekgI"),c=n("JSQU");function u(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}u.prototype.clear=r,u.prototype.delete=o,u.prototype.get=i,u.prototype.has=a,u.prototype.set=c,t.exports=u},"7tbW":function(t,e,n){var r=n("LGYb");t.exports=function(t){return t&&t.length?r(t):[]}},EpBk:function(t,e){t.exports=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}},H8j4:function(t,e,n){var r=n("QkVE");t.exports=function(t,e){var n=r(this,t),o=n.size;return n.set(t,e),this.size+=n.size==o?0:1,this}},Hvzi:function(t,e){t.exports=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}},JHgL:function(t,e,n){var r=n("QkVE");t.exports=function(t){return r(this,t).get(t)}},JSQU:function(t,e,n){var r=n("YESw");t.exports=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=r&&void 0===e?"__lodash_hash_undefined__":e,this}},KMkd:function(t,e){t.exports=function(){this.__data__=[],this.size=0}},LGYb:function(t,e,n){var r=n("1hJj"),o=n("jbM+"),i=n("Xt/L"),a=n("xYSL"),c=n("dQpi"),u=n("rEGp");t.exports=function(t,e,n){var s=-1,f=o,l=t.length,p=!0,h=[],d=h;if(n)p=!1,f=i;else if(l>=200){var v=e?null:c(t);if(v)return u(v);p=!1,f=a,d=new r}else d=e?[]:h;t:for(;++s<l;){var _=t[s],y=e?e(_):_;if(_=n||0!==_?_:0,p&&y==y){for(var g=d.length;g--;)if(d[g]===y)continue t;e&&d.push(y),h.push(_)}else f(d,y,n)||(d!==h&&d.push(y),h.push(_))}return h}},O92f:function(t,e,n){},QkVE:function(t,e,n){var r=n("EpBk");t.exports=function(t,e){var n=t.__data__;return r(e)?n["string"==typeof e?"string":"hash"]:n.map}},RXBc:function(t,e,n){"use strict";n.r(e);var r=n("7tbW"),o=n.n(r),i=n("q1tI"),a=n.n(i),c=n("lbRd"),u=n("p3AD"),s=(n("O92f"),function(t){var e=t.title,n=t.selectedCategory,r=t.onClick,o=t.scrollToCenter,c=Object(i.useRef)(null),u=Object(i.useCallback)((function(){o(c),r(e)}),[c]);return Object(i.useEffect)((function(){n===e&&o(c)}),[n,c]),a.a.createElement("li",{ref:c,className:"item",role:"tab","aria-selected":n===e?"true":"false"},a.a.createElement("div",{onClick:u},e))}),f=function(t){var e=t.categories,n=t.category,r=t.selectCategory,o=Object(i.useRef)(null),c=Object(i.useCallback)((function(t){var e=t.current.offsetWidth,n=o.current,r=n.scrollLeft,i=n.offsetWidth,a=r+(t.current.getBoundingClientRect().left-o.current.getBoundingClientRect().left)-i/2+e/2;o.current.scroll({left:a,top:0,behavior:"smooth"})}),[o]);return a.a.createElement("ul",{ref:o,className:"category-container",role:"tablist",id:"category",style:{margin:"0 -"+Object(u.a)(3/4)}},a.a.createElement(s,{title:"All",selectedCategory:n,onClick:r,scrollToCenter:c}),e.map((function(t,e){return a.a.createElement(s,{key:e,title:t,selectedCategory:n,onClick:r,scrollToCenter:c})})))},l=n("hYyM"),p=n("CC2r"),h=n("WlAH"),d=n("cr+I"),v=n.n(d),_=n("EXIE");function y(){var t=Object(i.useState)(h.a.ALL),e=t[0],n=t[1],r=function(){window.scrollY>316&&_.b(316)},o=Object(i.useCallback)((function(t){n(t),r(),window.history.pushState({category:t},"",window.location.pathname+"?"+v.a.stringify({category:t}))}),[]),a=Object(i.useCallback)((function(t){void 0===t&&(t=!0);var e=v.a.parse(location.search).category,o=null==e?h.a.ALL:e;n(o),t&&r()}),[]);return Object(i.useEffect)((function(){return _.c(),function(){_.a()}}),[]),Object(i.useEffect)((function(){return window.addEventListener("popstate",a),function(){window.removeEventListener("popstate",a)}}),[]),Object(i.useEffect)((function(){a(!1)}),[]),[e,o]}var g=n("rY18");var w=n("2w9V");var b=n("hpys"),E=n("JqEL");e.default=function(t){var e,n=t.data,r=t.location,u=n.site.siteMetadata,s=u.configs.countOfInitialPost,d=n.allMarkdownRemark.edges,v=Object(i.useMemo)((function(){return o()(d.map((function(t){return t.node.frontmatter.category})))}),[]),_=function(){var t=w.a(1),e=Object(i.useState)(t),n=e[0],r=e[1],o=Object(i.useRef)(n);return Object(i.useEffect)((function(){o.current=n,w.c(n)}),[n]),[n,o,function(){return r((function(t){return t+1}))}]}(),x=_[0],k=_[1],m=_[2],O=y(),j=O[0],C=O[1];return Object(i.useEffect)((function(){return g.c(),function(){g.b()}}),[]),Object(i.useEffect)((function(){g.d()})),e=function(){var t=window.scrollY+window.innerHeight,e=function(){return function(t){return E.c()-t}(t)<80};return function(t,e){var n=e.dismissCondition,r=void 0===n?function(){return!1}:n,o=e.triggerCondition,i=void 0===o?function(){return!0}:o;if(!t)throw Error("Invalid required arguments");var a=!1;return function(){if(!a)return a=!0,requestAnimationFrame((function(){if(!r())return i()?(a=!1,t()):void 0;a=!1}))}}(m,{dismissCondition:function(){return!e()},triggerCondition:function(){return e()&&d.length>k.current*s}})()},Object(i.useEffect)((function(){return window.addEventListener("scroll",e,{passive:!1}),function(){window.removeEventListener("scroll",e,{passive:!1})}}),[]),a.a.createElement(b.a,{location:r,title:u.title},a.a.createElement(p.a,{title:h.c,keywords:u.keywords}),a.a.createElement(c.a,null),a.a.createElement(f,{categories:v,category:j,selectCategory:C}),a.a.createElement(l.a,{posts:d,countOfInitialPost:s,count:x,category:j}))}},SfRM:function(t,e,n){var r=n("YESw");t.exports=function(){this.__data__=r?r(null):{},this.size=0}},Xi7e:function(t,e,n){var r=n("KMkd"),o=n("adU4"),i=n("tMB7"),a=n("+6XX"),c=n("Z8oC");function u(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}u.prototype.clear=r,u.prototype.delete=o,u.prototype.get=i,u.prototype.has=a,u.prototype.set=c,t.exports=u},"Xt/L":function(t,e){t.exports=function(t,e,n){for(var r=-1,o=null==t?0:t.length;++r<o;)if(n(e,t[r]))return!0;return!1}},YESw:function(t,e,n){var r=n("Cwc5")(Object,"create");t.exports=r},Z8oC:function(t,e,n){var r=n("y1pI");t.exports=function(t,e){var n=this.__data__,o=r(n,t);return o<0?(++this.size,n.push([t,e])):n[o][1]=e,this}},adU4:function(t,e,n){var r=n("y1pI"),o=Array.prototype.splice;t.exports=function(t){var e=this.__data__,n=r(e,t);return!(n<0)&&(n==e.length-1?e.pop():o.call(e,n,1),--this.size,!0)}},dQpi:function(t,e,n){var r=n("yGk4"),o=n("vN+2"),i=n("rEGp"),a=r&&1/i(new r([,-0]))[1]==1/0?function(t){return new r(t)}:o;t.exports=a},e4Nc:function(t,e,n){var r=n("fGT3"),o=n("k+1r"),i=n("JHgL"),a=n("pSRY"),c=n("H8j4");function u(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}u.prototype.clear=r,u.prototype.delete=o,u.prototype.get=i,u.prototype.has=a,u.prototype.set=c,t.exports=u},ebwN:function(t,e,n){var r=n("Cwc5")(n("Kz5y"),"Map");t.exports=r},ekgI:function(t,e,n){var r=n("YESw"),o=Object.prototype.hasOwnProperty;t.exports=function(t){var e=this.__data__;return r?void 0!==e[t]:o.call(e,t)}},fGT3:function(t,e,n){var r=n("4kuk"),o=n("Xi7e"),i=n("ebwN");t.exports=function(){this.size=0,this.__data__={hash:new r,map:new(i||o),string:new r}}},ftKO:function(t,e){t.exports=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this}},"k+1r":function(t,e,n){var r=n("QkVE");t.exports=function(t){var e=r(this,t).delete(t);return this.size-=e?1:0,e}},ljhN:function(t,e){t.exports=function(t,e){return t===e||t!=t&&e!=e}},pSRY:function(t,e,n){var r=n("QkVE");t.exports=function(t){return r(this,t).has(t)}},rEGp:function(t,e){t.exports=function(t){var e=-1,n=Array(t.size);return t.forEach((function(t){n[++e]=t})),n}},tMB7:function(t,e,n){var r=n("y1pI");t.exports=function(t){var e=this.__data__,n=r(e,t);return n<0?void 0:e[n][1]}},u8Dt:function(t,e,n){var r=n("YESw"),o=Object.prototype.hasOwnProperty;t.exports=function(t){var e=this.__data__;if(r){var n=e[t];return"__lodash_hash_undefined__"===n?void 0:n}return o.call(e,t)?e[t]:void 0}},xYSL:function(t,e){t.exports=function(t,e){return t.has(e)}},y1pI:function(t,e,n){var r=n("ljhN");t.exports=function(t,e){for(var n=t.length;n--;)if(r(t[n][0],e))return n;return-1}},yGk4:function(t,e,n){var r=n("Cwc5")(n("Kz5y"),"Set");t.exports=r}}]);
//# sourceMappingURL=component---src-pages-index-js-a7301d95f5d222b14f15.js.map