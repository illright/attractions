import{o as n,p as t,q as o,r as a,i as s,s as e,t as c,u as r,S as u,w as i,y as f,z as l,B as v,C as p,D as h,E as m,Q as $,v as y,H as d,x as g,h as x,J as R,j as b,k as w,l as E,m as j,n as B,M as D,a9 as S}from"./client.f6710ab4.js";import{P as I,a as P}from"./popover.e4217401.js";function V(n){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}();return function(){var s,e=t(n);if(a){var c=t(this).constructor;s=Reflect.construct(e,arguments,c)}else s=e.apply(this,arguments);return o(this,s)}}function k(n){var t,o;return{c:function(){t=y("div"),o=d("hover me"),this.h()},l:function(n){t=g(n,"DIV",{class:!0});var a=x(t);o=R(a,"hover me"),a.forEach(b),this.h()},h:function(){w(t,"class","preview svelte-1y2m3b2")},m:function(a,s){E(a,t,s),j(t,o),n[2](t)},p:B,d:function(o){o&&b(t),n[2](null)}}}function q(n){var t,o,a=n[0].replace(/\), /g,"),\n")+"";return{c:function(){t=y("div"),o=d(a),this.h()},l:function(n){t=g(n,"DIV",{slot:!0,class:!0});var s=x(t);o=R(s,a),s.forEach(b),this.h()},h:function(){w(t,"slot","popover-content"),w(t,"class","value-popover svelte-1y2m3b2")},m:function(n,a){E(n,t,a),j(t,o)},p:function(n,t){1&t&&a!==(a=n[0].replace(/\), /g,"),\n")+"")&&D(o,a)},d:function(n){n&&b(t)}}}function z(n){var t,o;return t=new I({props:{position:P.LEFT,$$slots:{"popover-content":[q],default:[k]},$$scope:{ctx:n}}}),{c:function(){i(t.$$.fragment)},l:function(n){f(t.$$.fragment,n)},m:function(n,a){l(t,n,a),o=!0},p:function(n,o){var a=v(o,1)[0],s={};11&a&&(s.$$scope={dirty:a,ctx:n}),t.$set(s)},i:function(n){o||(p(t.$$.fragment,n),o=!0)},o:function(n){h(t.$$.fragment,n),o=!1},d:function(n){m(t,n)}}}function C(n,t,o){var a,s=t.value;return $((function(){o(1,a.style.boxShadow=s.slice(0,-1),a)})),n.$$set=function(n){"value"in n&&o(0,s=n.value)},[s,a,function(n){S[n?"unshift":"push"]((function(){o(1,a=n)}))}]}var F=function(t){n(i,u);var o=V(i);function i(n){var t;return a(this,i),t=o.call(this),s(c(t),n,C,z,e,{value:0}),t}return r(i)}();export{F as S};