import{_ as n,a as s,b as t,c as a,i as e,s as o,d as c,e as i,S as r,X as l,v as f,x as u,h as d,j as v,$ as h,a0 as m,l as p,a5 as g,n as y,V as j,Y as x}from"./client.f6710ab4.js";import{c as R,_ as b}from"./classes.f59ebf6e.js";function $(n){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}();return function(){var e,o=s(n);if(a){var c=s(this).constructor;e=Reflect.construct(o,arguments,c)}else e=o.apply(this,arguments);return t(this,e)}}function B(n){for(var s,t,a=[{class:t=R("dot",n[0])},n[6]],e={},o=0;o<a.length;o+=1)e=l(e,a[o]);return{c:function(){s=f("div"),this.h()},l:function(n){s=u(n,"DIV",{class:!0}),d(s).forEach(v),this.h()},h:function(){h(s,e),m(s,"info",n[1]),m(s,"attention",n[2]),m(s,"success",n[4]),m(s,"danger",n[3]),m(s,"small",n[5]),m(s,"svelte-1rux4jd",!0)},m:function(n,t){p(n,s,t)},p:function(n,o){var c=b(o,1)[0];h(s,e=g(a,[1&c&&t!==(t=R("dot",n[0]))&&{class:t},64&c&&n[6]])),m(s,"info",n[1]),m(s,"attention",n[2]),m(s,"success",n[4]),m(s,"danger",n[3]),m(s,"small",n[5]),m(s,"svelte-1rux4jd",!0)},i:y,o:y,d:function(n){n&&v(s)}}}function D(n,s,t){var a=["class","info","attention","danger","success","small"],e=j(s,a),o=s.class,c=void 0===o?null:o,i=s.info,r=void 0!==i&&i,f=s.attention,u=void 0!==f&&f,d=s.danger,v=void 0!==d&&d,h=s.success,m=void 0!==h&&h,p=s.small,g=void 0!==p&&p;return+r+ +u+ +v+ +m>1&&console.warn("A dot can either be info, attention, danger or success, not several of them"),n.$$set=function(n){s=l(l({},s),x(n)),t(6,e=j(s,a)),"class"in n&&t(0,c=n.class),"info"in n&&t(1,r=n.info),"attention"in n&&t(2,u=n.attention),"danger"in n&&t(3,v=n.danger),"success"in n&&t(4,m=n.success),"small"in n&&t(5,g=n.small)},[c,r,u,v,m,g,e]}var V=function(s){n(l,r);var t=$(l);function l(n){var s;return a(this,l),s=t.call(this),e(c(s),n,D,B,o,{class:0,info:1,attention:2,danger:3,success:4,small:5}),s}return i(l)}();export{V as D};
