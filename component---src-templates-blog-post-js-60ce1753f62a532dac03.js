(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"1QcF":function(e,t,n){},DMNx:function(e,t,n){},RPjP:function(e,t,n){"use strict";e.exports=n("SLms")},SLms:function(e,t,n){"use strict";n("E9XD"),Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=s(n("q1tI")),i=s(n("17x9"));function s(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var u=["shortname","identifier","title","url","category_id","onNewComment","language"],f=!1;function m(e,t){var n=t.onNewComment,r=t.language,a=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["onNewComment","language"]);for(var o in a)e.page[o]=a[o];e.language=r,n&&(e.callbacks={onNewComment:[n]})}var p=function(e){function t(){return c(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){this.loadDisqus()}},{key:"componentDidUpdate",value:function(){this.loadDisqus()}},{key:"shouldComponentUpdate",value:function(e,t){return e.identifier!==this.props.identifier}},{key:"render",value:function(){var e=this,t=Object.keys(this.props).reduce((function(t,n){return u.some((function(e){return e===n}))?t:r({},t,function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},n,e.props[n]))}),{});return o.default.createElement("div",t,o.default.createElement("div",{id:"disqus_thread"}))}},{key:"addDisqusScript",value:function(){if(!f){var e=this.disqus=document.createElement("script"),t=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];e.async=!0,e.type="text/javascript",e.src="//"+this.props.shortname+".disqus.com/embed.js",t.appendChild(e),f=!0}}},{key:"loadDisqus",value:function(){var e=this,t={};u.forEach((function(n){"shortname"!==n&&e.props[n]&&(t[n]=e.props[n])})),"undefined"!=typeof DISQUS?DISQUS.reset({reload:!0,config:function(){m(this,t),this.page.url=this.page.url.replace(/#/,"")+"#!newthread"}}):(window.disqus_config=function(){m(this,t)},this.addDisqusScript())}}]),t}(o.default.Component);p.displayName="DisqusThread",p.propTypes={id:i.default.string,shortname:i.default.string.isRequired,identifier:i.default.string,title:i.default.string,url:i.default.string,category_id:i.default.string,onNewComment:i.default.func,language:i.default.string},p.defaultProps={url:"undefined"==typeof window?null:window.location.href},t.default=p},ScDI:function(e,t,n){},TsVF:function(e,t,n){},hUWy:function(e,t,n){},jmfv:function(e,t,n){},"n1n/":function(e,t,n){},uhgt:function(e,t,n){},vg9a:function(e,t,n){},weRM:function(e,t,n){},yZlL:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n.n(r),o=(n("TsVF"),function(){return a.a.createElement("hr",{className:"custom-hr"})}),i=n("hpys"),s=n("CC2r"),c=function(e){var t=e.title;return a.a.createElement("h1",null,t)},l=n("Wbzz"),u=(n("ScDI"),function(e){var t=e.series;return a.a.createElement("div",null,a.a.createElement("div",{className:"post-series-info"},a.a.createElement("h3",null,"❗️ 이 포스트는 시리즈로 구성되었습니다."),a.a.createElement("ol",null,function(){for(var e=[],n=0;n<t.length;n++)e.push(a.a.createElement("li",{key:n,className:t[n].current?"current":""},a.a.createElement(l.Link,{to:t[n].link},t[n].title)));return e}())),a.a.createElement("hr",null)," ")}),f=(n("1QcF"),function(e){var t=e.date;return a.a.createElement("p",{className:"post-date"},t)}),m=function(e){var t=e.html;return a.a.createElement("div",{dangerouslySetInnerHTML:{__html:t}})},p=(n("weRM"),function(e){var t=e.onClick;return a.a.createElement("a",{className:"resp-sharing-button__link",href:"#",target:"_blank",rel:"noopener","aria-label":"Share on Facebook",onClick:t},a.a.createElement("div",{className:"resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"},a.a.createElement("div",{"aria-hidden":"true",className:"resp-sharing-button__icon resp-sharing-button__icon--solid"},a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},a.a.createElement("path",{d:"M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"}))),a.a.createElement("span",{className:"service-label"},"Share on Facebook")))}),d=(n("hUWy"),function(e){var t=e.onClick;return a.a.createElement("a",{className:"resp-sharing-button__link",href:"#",rel:"noopener","aria-label":"Share on Twitter",onClick:t},a.a.createElement("div",{className:"resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large"},a.a.createElement("div",{"aria-hidden":"true",className:"resp-sharing-button__icon resp-sharing-button__icon--solid"},a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},a.a.createElement("path",{d:"M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"}))),a.a.createElement("span",{className:"service-label"},"Share on Twitter")))}),h=(n("DMNx"),function(e){var t='Recommend on "'+e.title+'" written by @'+e.author;return a.a.createElement("div",{className:"social-share"},a.a.createElement(p,{onClick:function(e){return e.preventDefault(),function(e,t){window.FB.ui({method:"share",mobile_iframe:!0,href:e,quote:t})}(window.location.href,t)}}),a.a.createElement(d,{onClick:function(e){return e.preventDefault(),function(e,t){window.open("https://twitter.com/share?url="+encodeURI(encodeURI(e))+"&text="+t,"sharer","toolbar=0,status=0,width=626,height=436")}(window.location.href,t)}}))}),v=(n("jmfv"),function(e){var t=e.sponsorId;return a.a.createElement("div",{className:"sponsor-button"},a.a.createElement("a",{className:"bmc-button",target:"_blank",rel:"noopener noreferrer",href:"https://www.buymeacoffee.com/"+t},a.a.createElement("img",{src:"https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg",alt:"Buy me a coffee"}),a.a.createElement("span",null,"Buy me a coffee")))}),b=n("lbRd"),g=(n("n1n/"),function(e){var t=e.pageContext,n=t.previous,r=t.next;return a.a.createElement("ul",{className:"navigator"},a.a.createElement("li",null,n&&a.a.createElement(l.Link,{to:n.fields.slug,rel:"prev"},"← ",n.frontmatter.title)),a.a.createElement("li",null,r&&a.a.createElement(l.Link,{to:r.fields.slug,rel:"next"},r.frontmatter.title," →")))});function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var w=n("dI71"),y=n("RPjP"),k=n.n(y),_=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={toasts:[]},n.notifyAboutComment=n.notifyAboutComment.bind(E(n)),n.onSnackbarDismiss=n.onSnackbarDismiss.bind(E(n)),n}Object(w.a)(t,e);var n=t.prototype;return n.onSnackbarDismiss=function(){var e=this.state.toasts.slice(1);this.setState({toasts:e})},n.notifyAboutComment=function(){var e=this.state.toasts.slice();e.push({text:"New comment available!!"}),this.setState({toasts:e})},n.render=function(){var e=this.props,t=e.post,n=e.shortName,r=e.siteUrl+e.slug;return a.a.createElement(k.a,{shortname:n,identifier:t.frontmatter.title,title:t.frontmatter.title,url:r,category_id:t.frontmatter.category_id,onNewComment:this.notifyAboutComment})},t}(r.Component),C=n("JqEL"),N=n("WlAH"),j=function(e){var t=e.repo,n=a.a.createRef();return Object(r.useEffect)((function(){var e=C.f(N.d.DARK),r=document.createElement("script"),a={src:"https://utteranc.es/client.js",repo:t,branch:"master",theme:e?"photon-dark":"github-light",label:"comment",async:!0,"issue-term":"pathname",crossorigin:"anonymous"};Object.keys(a).forEach((function(e){r.setAttribute(e,a[e])})),n.current.appendChild(r)}),[]),a.a.createElement("div",{className:"utterances",ref:n})},S=n("EXIE");n("uhgt"),n("vg9a"),t.default=function(e){var t=e.data,n=e.pageContext,l=e.location;Object(r.useEffect)((function(){return S.c(),function(){return S.a()}}),[]);var p=t.markdownRemark,d=t.site.siteMetadata,E=d.title,w=d.comment,y=d.siteUrl,k=d.author,C=d.sponsor,N=w.disqusShortName,D=w.utterances,O=p.frontmatter,x=O.title,q=O.date,I=O.series,M=null!=I;return a.a.createElement(i.a,{location:l,title:E},a.a.createElement(s.a,{title:x,description:p.excerpt}),a.a.createElement(c,{title:x}),a.a.createElement(f,{date:q}),!!M&&a.a.createElement(u,{series:I}),a.a.createElement(m,{html:p.html}),a.a.createElement(h,{title:x,author:k}),!!C.buyMeACoffeeId&&a.a.createElement(v,{sponsorId:C.buyMeACoffeeId}),a.a.createElement(o,null),a.a.createElement(b.a,null),a.a.createElement(g,{pageContext:n}),!!N&&a.a.createElement(_,{post:p,shortName:N,siteUrl:y,slug:n.slug}),!!D&&a.a.createElement(j,{repo:D}))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-60ce1753f62a532dac03.js.map