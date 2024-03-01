import{S as e,i as l,s,h as a,k as t,b as c,d as n,e as o,W as i,f as r,y as h,Y as u,z as d,t as m,p as f,H as p,I as $,K as b,L as k,j as x,l as v,m as g,U as C,Z as y,_ as j,q as R,$ as T,X as N,a0 as w,a1 as q,u as A,w as E,v as I,x as M,A as S,g as _}from"./client.5ce57074.js";import{p as z}from"./plural-s.31bb9da9.js";import{c as D}from"./classes.2453fa25.js";import{C as H}from"./checkbox-chip.d1f32d92.js";function K(e,l,s){const a=e.slice();return a[12]=l[s],a[13]=l,a[14]=s,a}function L(e){let l,s,p,$=[],b=new Map,k=e[0];const x=e=>e[12].value;for(let l=0;l<k.length;l+=1){let s=K(e,k,l),a=x(s);b.set(a,$[l]=W(a,s))}return{c(){l=a("div");for(let e=0;e<$.length;e+=1)$[e].c();this.h()},l(e){l=t(e,"DIV",{class:!0,role:!0});var s=c(l);for(let e=0;e<$.length;e+=1)$[e].l(s);s.forEach(n),this.h()},h(){o(l,"class",s=i(D(e[1]))+" svelte-15v276f"),o(l,"role","group")},m(e,s){r(e,l,s);for(let e=0;e<$.length;e+=1)$[e].m(l,null);p=!0},p(e,a){509&a&&(k=e[0],h(),$=u($,a,x,1,e,k,b,l,T,W,null,K),d()),(!p||2&a&&s!==(s=i(D(e[1]))+" svelte-15v276f"))&&o(l,"class",s)},i(e){if(!p){for(let e=0;e<k.length;e+=1)m($[e]);p=!0}},o(e){for(let e=0;e<$.length;e+=1)f($[e]);p=!1},d(e){e&&n(l);for(let e=0;e<$.length;e+=1)$[e].d()}}}function P(e){let l,s=(e[12].label||e[12].value)+"";return{c(){l=I(s)},l(e){l=M(e,s)},m(e,s){r(e,l,s)},p(e,a){1&a&&s!==(s=(e[12].label||e[12].value)+"")&&S(l,s)},d(e){e&&n(l)}}}function U(e){let l,s,i,h=(e[12].label||e[12].value)+"";return{c(){l=a("span"),s=I(h),this.h()},l(e){l=t(e,"SPAN",{class:!0});var a=c(l);s=M(a,h),a.forEach(n),this.h()},h(){o(l,"class",i=D(e[3]))},m(e,a){r(e,l,a),_(l,s)},p(e,a){1&a&&h!==(h=(e[12].label||e[12].value)+"")&&S(s,h),8&a&&i!==(i=D(e[3]))&&o(l,"class",i)},d(e){e&&n(l)}}}function V(e){let l;function s(e,l){return null!=e[3]?U:P}let a=s(e),t=a(e);return{c(){t.c(),l=A()},l(e){t.l(e),l=E(e)},m(e,s){t.m(e,s),r(e,l,s)},p(e,c){a===(a=s(e))&&t?t.p(e,c):(t.d(1),t=a(e),t&&(t.c(),t.m(l.parentNode,l)))},d(e){t.d(e),e&&n(l)}}}function W(e,l){let s,a,t,c;const o=[{name:l[4]},{value:l[12].value},{disabled:l[12].disabled||!l[12].checked&&l[6]>=l[5]},{class:D(l[2])},{title:!l[12].disabled&&!l[12].checked&&l[6]>=l[5]?l[7]:null},l[8]];function i(e){l[10](e,l[12])}let h={$$slots:{default:[V]},$$scope:{ctx:l}};for(let e=0;e<o.length;e+=1)h=b(h,o[e]);return void 0!==l[12].checked&&(h.checked=l[12].checked),a=new H({props:h}),N.push((()=>w(a,"checked",i))),a.$on("change",l[11]),{key:e,first:null,c(){s=p(),x(a.$$.fragment),this.h()},l(e){s=p(),v(a.$$.fragment,e),this.h()},h(){this.first=s},m(e,l){r(e,s,l),g(a,e,l),c=!0},p(e,s){l=e;const c=501&s?C(o,[16&s&&{name:l[4]},1&s&&{value:l[12].value},97&s&&{disabled:l[12].disabled||!l[12].checked&&l[6]>=l[5]},4&s&&{class:D(l[2])},225&s&&{title:!l[12].disabled&&!l[12].checked&&l[6]>=l[5]?l[7]:null},256&s&&y(l[8])]):{};32777&s&&(c.$$scope={dirty:s,ctx:l}),!t&&1&s&&(t=!0,c.checked=l[12].checked,j((()=>t=!1))),a.$set(c)},i(e){c||(m(a.$$.fragment,e),c=!0)},o(e){f(a.$$.fragment,e),c=!1},d(e){e&&n(s),R(a,e)}}}function X(e){let l,s,a=null!=e[0]&&0!==e[0].length&&L(e);return{c(){a&&a.c(),l=p()},l(e){a&&a.l(e),l=p()},m(e,t){a&&a.m(e,t),r(e,l,t),s=!0},p(e,[s]){null!=e[0]&&0!==e[0].length?a?(a.p(e,s),1&s&&m(a,1)):(a=L(e),a.c(),m(a,1),a.m(l.parentNode,l)):a&&(h(),f(a,1,1,(()=>{a=null})),d())},i(e){s||(m(a),s=!0)},o(e){f(a),s=!1},d(e){a&&a.d(e),e&&n(l)}}}function Y(e,l,s){let a,t;const c=["class","checkboxClass","labelClass","items","name","max","maxReachedTooltip"];let n=$(l,c),{class:o=null}=l,{checkboxClass:i=null}=l,{labelClass:r=null}=l,{items:h}=l,{name:u}=l,{max:d=1/0}=l,{maxReachedTooltip:m=null}=l;return h&&0!==h.length||console.error("Must have at least one item in the checkbox chip group"),e.$$set=e=>{l=b(b({},l),k(e)),s(8,n=$(l,c)),"class"in e&&s(1,o=e.class),"checkboxClass"in e&&s(2,i=e.checkboxClass),"labelClass"in e&&s(3,r=e.labelClass),"items"in e&&s(0,h=e.items),"name"in e&&s(4,u=e.name),"max"in e&&s(5,d=e.max),"maxReachedTooltip"in e&&s(9,m=e.maxReachedTooltip)},e.$$.update=()=>{544&e.$$.dirty&&s(7,a=m||`Can only select ${d} value${z(d)}.`),1&e.$$.dirty&&s(6,t=h.reduce(((e,l)=>e+Number(l.checked||0)),0))},[h,o,i,r,u,d,t,a,n,m,function(l,a){e.$$.not_equal(a.checked,l)&&(a.checked=l,s(0,h))},function(l){q.call(this,e,l)}]}var Z=class extends e{constructor(e){super(),l(this,e,Y,X,s,{class:1,checkboxClass:2,labelClass:3,items:0,name:4,max:5,maxReachedTooltip:9})}};export{Z as C};