import{_ as n,a as e,b as t,c as a,i as c,s as l,d as o,e as s,S as r,v as i,x as u,h as f,j as d,k as h,a8 as m,l as v,K as p,aa as b,L as $,C as k,D as x,U as g,V as y,X as C,Y as R,w as L,y as j,z as N,a5 as T,ab as w,ac as S,E,ad as M,a9 as _,ae as B,af as D,G as I,I as P,H as V,J as q,M as z,m as A}from"./client.f6710ab4.js";import{c as G,_ as H}from"./classes.f59ebf6e.js";import{g as J}from"./color-picker-styles.a2a9eff8.js";import{p as K}from"./plural-s.31bb9da9.js";import{C as O}from"./checkbox.43b8faed.js";function U(n){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}();return function(){var c,l=e(n);if(a){var o=e(this).constructor;c=Reflect.construct(l,arguments,o)}else c=l.apply(this,arguments);return t(this,c)}}function X(n,e,t){var a=n.slice();return a[14]=e[t],a[15]=e,a[16]=t,a}function Y(n){for(var e,t,a,c=[],l=new Map,o=n[0],s=function(n){return n[14].value},r=0;r<o.length;r+=1){var g=X(n,o,r),y=s(g);l.set(y,c[r]=nn(y,g))}return{c:function(){e=i("div");for(var n=0;n<c.length;n+=1)c[n].c();this.h()},l:function(n){e=u(n,"DIV",{class:!0,role:!0});for(var t=f(e),a=0;a<c.length;a+=1)c[a].l(t);t.forEach(d),this.h()},h:function(){h(e,"class",t=m(G(n[1]))+" svelte-6yyre0"),h(e,"role","group")},m:function(n,t){v(n,e,t);for(var l=0;l<c.length;l+=1)c[l].m(e,null);a=!0},p:function(n,r){2045&r&&(o=n[0],p(),c=b(c,r,s,1,n,o,l,e,M,nn,null,X),$()),(!a||2&r&&t!==(t=m(G(n[1]))+" svelte-6yyre0"))&&h(e,"class",t)},i:function(n){if(!a){for(var e=0;e<o.length;e+=1)k(c[e]);a=!0}},o:function(n){for(var e=0;e<c.length;e+=1)x(c[e]);a=!1},d:function(n){n&&d(e);for(var t=0;t<c.length;t+=1)c[t].d()}}}function F(n){var e;function t(n,e){return null!=n[3]?W:Q}var a=t(n),c=a(n);return{c:function(){c.c(),e=g()},l:function(n){c.l(n),e=g()},m:function(n,t){c.m(n,t),v(n,e,t)},p:function(n,l){a===(a=t(n))&&c?c.p(n,l):(c.d(1),(c=a(n))&&(c.c(),c.m(e.parentNode,e)))},d:function(n){c.d(n),n&&d(e)}}}function Q(n){var e,t=(n[14].label||n[14].value)+"";return{c:function(){e=V(t)},l:function(n){e=q(n,t)},m:function(n,t){v(n,e,t)},p:function(n,a){1&a&&t!==(t=(n[14].label||n[14].value)+"")&&z(e,t)},d:function(n){n&&d(e)}}}function W(n){var e,t,a,c=(n[14].label||n[14].value)+"";return{c:function(){e=i("span"),t=V(c),this.h()},l:function(n){e=u(n,"SPAN",{class:!0});var a=f(e);t=q(a,c),a.forEach(d),this.h()},h:function(){h(e,"class",a=G(n[3]))},m:function(n,a){v(n,e,a),A(e,t)},p:function(n,l){1&l&&c!==(c=(n[14].label||n[14].value)+"")&&z(t,c),8&l&&a!==(a=G(n[3]))&&h(e,"class",a)},d:function(n){n&&d(e)}}}function Z(n){var e,t=!n[4]&&F(n);return{c:function(){t&&t.c(),e=I()},l:function(n){t&&t.l(n),e=P(n)},m:function(n,a){t&&t.m(n,a),v(n,e,a)},p:function(n,a){n[4]?t&&(t.d(1),t=null):t?t.p(n,a):((t=F(n)).c(),t.m(e.parentNode,e))},d:function(n){t&&t.d(n),n&&d(e)}}}function nn(n,e){var t,a,c,l,o=[{name:e[5]},{slotLeft:e[6]},{selectorStyle:e[4]?J(e[14].value):null},{value:e[14].value},{disabled:e[14].disabled||!e[14].checked&&e[8]>=e[7]},{class:G(e[4]&&"colored",e[2])},{title:!e[14].disabled&&!e[14].checked&&e[8]>=e[7]?e[9]:null},e[10]];function s(n){e[12](n,e[14])}for(var r={$$slots:{default:[Z]},$$scope:{ctx:e}},i=0;i<o.length;i+=1)r=C(r,o[i]);return void 0!==e[14].checked&&(r.checked=e[14].checked),a=new O({props:r}),_.push((function(){return B(a,"checked",s)})),a.$on("change",e[13]),{key:n,first:null,c:function(){t=g(),L(a.$$.fragment),this.h()},l:function(n){t=g(),j(a.$$.fragment,n),this.h()},h:function(){this.first=t},m:function(n,e){v(n,t,e),N(a,n,e),l=!0},p:function(n,t){e=n;var l=2037&t?T(o,[32&t&&{name:e[5]},64&t&&{slotLeft:e[6]},17&t&&{selectorStyle:e[4]?J(e[14].value):null},1&t&&{value:e[14].value},385&t&&{disabled:e[14].disabled||!e[14].checked&&e[8]>=e[7]},20&t&&{class:G(e[4]&&"colored",e[2])},897&t&&{title:!e[14].disabled&&!e[14].checked&&e[8]>=e[7]?e[9]:null},1024&t&&w(e[10])]):{};131097&t&&(l.$$scope={dirty:t,ctx:e}),!c&&1&t&&(c=!0,l.checked=e[14].checked,S((function(){return c=!1}))),a.$set(l)},i:function(n){l||(k(a.$$.fragment,n),l=!0)},o:function(n){x(a.$$.fragment,n),l=!1},d:function(n){n&&d(t),E(a,n)}}}function en(n){var e,t,a=null!=n[0]&&0!==n[0].length&&Y(n);return{c:function(){a&&a.c(),e=g()},l:function(n){a&&a.l(n),e=g()},m:function(n,c){a&&a.m(n,c),v(n,e,c),t=!0},p:function(n,t){var c=H(t,1)[0];null!=n[0]&&0!==n[0].length?a?(a.p(n,c),1&c&&k(a,1)):((a=Y(n)).c(),k(a,1),a.m(e.parentNode,e)):a&&(p(),x(a,1,1,(function(){a=null})),$())},i:function(n){t||(k(a),t=!0)},o:function(n){x(a),t=!1},d:function(n){a&&a.d(n),n&&d(e)}}}function tn(n,e,t){var a,c,l=["class","checkboxClass","labelClass","color","items","name","labelsLeft","max","maxReachedTooltip"],o=y(e,l),s=e.class,r=void 0===s?null:s,i=e.checkboxClass,u=void 0===i?null:i,f=e.labelClass,d=void 0===f?null:f,h=e.color,m=void 0!==h&&h,v=e.items,p=e.name,b=e.labelsLeft,$=void 0!==b&&b,k=e.max,x=void 0===k?1/0:k,g=e.maxReachedTooltip,L=void 0===g?null:g;return v&&0!==v.length||console.error("Must have at least one item in the checkbox group"),m&&null!=d&&console.warn("labelClass has no effect: labels are not rendered for color checkbox groups"),n.$$set=function(n){e=C(C({},e),R(n)),t(10,o=y(e,l)),"class"in n&&t(1,r=n.class),"checkboxClass"in n&&t(2,u=n.checkboxClass),"labelClass"in n&&t(3,d=n.labelClass),"color"in n&&t(4,m=n.color),"items"in n&&t(0,v=n.items),"name"in n&&t(5,p=n.name),"labelsLeft"in n&&t(6,$=n.labelsLeft),"max"in n&&t(7,x=n.max),"maxReachedTooltip"in n&&t(11,L=n.maxReachedTooltip)},n.$$.update=function(){2176&n.$$.dirty&&t(9,a=L||"Can only select ".concat(x," value").concat(K(x),".")),1&n.$$.dirty&&t(8,c=v.reduce((function(n,e){return n+Number(e.checked||0)}),0))},[v,r,u,d,m,p,$,x,c,a,o,L,function(e,a){n.$$.not_equal(a.checked,e)&&(a.checked=e,t(0,v))},function(e){D.call(this,n,e)}]}var an=function(e){n(i,r);var t=U(i);function i(n){var e;return a(this,i),e=t.call(this),c(o(e),n,tn,en,l,{class:1,checkboxClass:2,labelClass:3,color:4,items:0,name:5,labelsLeft:6,max:7,maxReachedTooltip:11}),e}return s(i)}();export{an as C};