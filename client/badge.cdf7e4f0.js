import{S as t,i as e,s as n,a as s,c as a,b as $,d as o,e as r,f as c,g as p,n as l,K as f,j as m,l as i,m as d,U as g,Z as u,t as h,p as x,q as k,L as w,u as y,h as v,v as b,w as E,k as D,x as T}from"./client.5ce57074.js";import{L as B,H as j,P as O}from"./layout.9d469ff1.js";import{B as C}from"./button.3e705dc2.js";import{B as S}from"./badge.3bbbe1f7.js";import{S as A}from"./showcase.01c91678.js";import{C as N}from"./color-preview.e8945033.js";import{S as R}from"./shadow-preview.74927e84.js";import{H}from"./h2.1f78cd1a.js";import{H as P}from"./h3.fe02d502.js";import{T as z,a as F,b as M,c as W}from"./table.0e0a2f34.js";import"./classes.2453fa25.js";import"./label.cf0a3e2f.js";import"./copyable-code.f74c2ea4.js";import"./popover.0a038323.js";function G(t){let e,n,f,m;return{c(){e=s("svg"),n=s("path"),f=s("path"),this.h()},l(t){e=a(t,"svg",{xmlns:!0,width:!0,height:!0,fill:!0,viewBox:!0,stroke:!0,"stroke-width":!0,"stroke-linecap":!0,"stroke-linejoin":!0,class:!0});var s=$(e);n=a(s,"path",{d:!0}),$(n).forEach(o),f=a(s,"path",{d:!0}),$(f).forEach(o),s.forEach(o),this.h()},h(){r(n,"d","M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"),r(f,"d","M13.73 21a2 2 0 0 1-3.46 0"),r(e,"xmlns","http://www.w3.org/2000/svg"),r(e,"width",t[0]),r(e,"height",t[0]),r(e,"fill","none"),r(e,"viewBox","0 0 24 24"),r(e,"stroke","currentColor"),r(e,"stroke-width",t[1]),r(e,"stroke-linecap","round"),r(e,"stroke-linejoin","round"),r(e,"class",m="feather feather-bell "+t[2])},m(t,s){c(t,e,s),p(e,n),p(e,f)},p(t,[n]){1&n&&r(e,"width",t[0]),1&n&&r(e,"height",t[0]),2&n&&r(e,"stroke-width",t[1]),4&n&&m!==(m="feather feather-bell "+t[2])&&r(e,"class",m)},i:l,o:l,d(t){t&&o(e)}}}function I(t,e,n){let{size:s="100%"}=e,{strokeWidth:a=2}=e,{class:$=""}=e;return"100%"!==s&&(s="x"===s.slice(-1)?s.slice(0,s.length-1)+"em":parseInt(s)+"px"),t.$$set=t=>{"size"in t&&n(0,s=t.size),"strokeWidth"in t&&n(1,a=t.strokeWidth),"class"in t&&n(2,$=t.class)},[s,a,$]}class V extends t{constructor(t){super(),e(this,t,I,G,n,{size:0,strokeWidth:1,class:2})}}function L(t){let e;return{c(){e=b("Badge")},l(t){e=T(t,"Badge")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function U(t){let e;return{c(){e=b("A distinctive colored circle to bring attention to an element.")},l(t){e=T(t,"A distinctive colored circle to bring attention to an element.")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function Y(t){let e;return{c(){e=b("used on some text")},l(t){e=T(t,"used on some text")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function K(t){let e,n;return e=new V({props:{size:"20",class:"icon"}}),{c(){m(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){d(e,t,s),n=!0},p:l,i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){x(e.$$.fragment,t),n=!1},d(t){k(e,t)}}}function q(t){let e,n;return e=new S({props:{hidden:t[0],$$slots:{default:[K]},$$scope:{ctx:t}}}),{c(){m(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){d(e,t,s),n=!0},p(t,n){const s={};1&n&&(s.hidden=t[0]),8&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){x(e.$$.fragment,t),n=!1},d(t){k(e,t)}}}function Z(t){let e,n,s,a,l;return n=new S({props:{$$slots:{default:[Y]},$$scope:{ctx:t}}}),a=new C({props:{round:!0,$$slots:{default:[q]},$$scope:{ctx:t}}}),a.$on("click",t[2]),{c(){e=v("div"),m(n.$$.fragment),s=y(),m(a.$$.fragment),this.h()},l(t){e=D(t,"DIV",{slot:!0,class:!0});var r=$(e);i(n.$$.fragment,r),s=E(r),i(a.$$.fragment,r),r.forEach(o),this.h()},h(){r(e,"slot","showcase"),r(e,"class","padded")},m(t,$){c(t,e,$),d(n,e,null),p(e,s),d(a,e,null),l=!0},p(t,e){const s={};8&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s);const $={};9&e&&($.$$scope={dirty:e,ctx:t}),a.$set($)},i(t){l||(h(n.$$.fragment,t),h(a.$$.fragment,t),l=!0)},o(t){x(n.$$.fragment,t),x(a.$$.fragment,t),l=!1},d(t){t&&o(e),k(n),k(a)}}}function J(t){let e,n;return{c(){e=v("div"),n=v("pre"),this.h()},l(t){e=D(t,"DIV",{slot:!0});var s=$(e);n=D(s,"PRE",{class:!0}),$(n).forEach(o),s.forEach(o),this.h()},h(){r(n,"class","language-svelte"),r(e,"slot","source")},m(t,s){c(t,e,s),p(e,n),n.innerHTML='<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n  <span class="token keyword">let</span> hidden <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Badge</span><span class="token punctuation">></span></span>used on some text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Badge</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Button</span> <span class="token attr-name">round</span> <span class="token attr-name"><span class="token namespace">on:</span>click=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> hidden <span class="token operator">=</span> <span class="token operator">!</span>hidden<span class="token punctuation">&#125;</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Badge</span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>hidden<span class="token punctuation">&#125;</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>BellIcon</span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>20<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Badge</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Button</span><span class="token punctuation">></span></span></code>'},p:l,d(t){t&&o(e)}}}function Q(t){let e;return{c(){e=b("Properties")},l(t){e=T(t,"Properties")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function X(t){let e;return{c(){e=b("Functional Properties")},l(t){e=T(t,"Functional Properties")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function _(t){let e;return{c(){e=b("Name")},l(t){e=T(t,"Name")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function tt(t){let e;return{c(){e=b("Default")},l(t){e=T(t,"Default")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function et(t){let e;return{c(){e=b("Type")},l(t){e=T(t,"Type")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function nt(t){let e;return{c(){e=b("Description")},l(t){e=T(t,"Description")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function st(t){let e,n,s,a,$,r,p,l;return e=new M({props:{$$slots:{default:[_]},$$scope:{ctx:t}}}),s=new M({props:{$$slots:{default:[tt]},$$scope:{ctx:t}}}),$=new M({props:{$$slots:{default:[et]},$$scope:{ctx:t}}}),p=new M({props:{$$slots:{default:[nt]},$$scope:{ctx:t}}}),{c(){m(e.$$.fragment),n=y(),m(s.$$.fragment),a=y(),m($.$$.fragment),r=y(),m(p.$$.fragment)},l(t){i(e.$$.fragment,t),n=E(t),i(s.$$.fragment,t),a=E(t),i($.$$.fragment,t),r=E(t),i(p.$$.fragment,t)},m(t,o){d(e,t,o),c(t,n,o),d(s,t,o),c(t,a,o),d($,t,o),c(t,r,o),d(p,t,o),l=!0},p(t,n){const a={};8&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a);const o={};8&n&&(o.$$scope={dirty:n,ctx:t}),s.$set(o);const r={};8&n&&(r.$$scope={dirty:n,ctx:t}),$.$set(r);const c={};8&n&&(c.$$scope={dirty:n,ctx:t}),p.$set(c)},i(t){l||(h(e.$$.fragment,t),h(s.$$.fragment,t),h($.$$.fragment,t),h(p.$$.fragment,t),l=!0)},o(t){x(e.$$.fragment,t),x(s.$$.fragment,t),x($.$$.fragment,t),x(p.$$.fragment,t),l=!1},d(t){k(e,t),t&&o(n),k(s,t),t&&o(a),k($,t),t&&o(r),k(p,t)}}}function at(t){let e,n,s;return{c(){e=v("strong"),n=v("code"),s=b("hidden")},l(t){e=D(t,"STRONG",{});var a=$(e);n=D(a,"CODE",{});var r=$(n);s=T(r,"hidden"),r.forEach(o),a.forEach(o)},m(t,a){c(t,e,a),p(e,n),p(n,s)},p:l,d(t){t&&o(e)}}}function $t(t){let e,n;return{c(){e=v("code"),n=b("false")},l(t){e=D(t,"CODE",{});var s=$(e);n=T(s,"false"),s.forEach(o)},m(t,s){c(t,e,s),p(e,n)},p:l,d(t){t&&o(e)}}}function ot(t){let e,n;return{c(){e=v("code"),n=b("boolean")},l(t){e=D(t,"CODE",{});var s=$(e);n=T(s,"boolean"),s.forEach(o)},m(t,s){c(t,e,s),p(e,n)},p:l,d(t){t&&o(e)}}}function rt(t){let e;return{c(){e=b("Whether the badge is shown or hidden. Useful for controlling its appearance without modifying the DOM tree.")},l(t){e=T(t,"Whether the badge is shown or hidden. Useful for controlling its appearance without modifying the DOM tree.")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function ct(t){let e,n,s,a,$,r,p,l;return e=new W({props:{$$slots:{default:[at]},$$scope:{ctx:t}}}),s=new W({props:{$$slots:{default:[$t]},$$scope:{ctx:t}}}),$=new W({props:{$$slots:{default:[ot]},$$scope:{ctx:t}}}),p=new W({props:{$$slots:{default:[rt]},$$scope:{ctx:t}}}),{c(){m(e.$$.fragment),n=y(),m(s.$$.fragment),a=y(),m($.$$.fragment),r=y(),m(p.$$.fragment)},l(t){i(e.$$.fragment,t),n=E(t),i(s.$$.fragment,t),a=E(t),i($.$$.fragment,t),r=E(t),i(p.$$.fragment,t)},m(t,o){d(e,t,o),c(t,n,o),d(s,t,o),c(t,a,o),d($,t,o),c(t,r,o),d(p,t,o),l=!0},p(t,n){const a={};8&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a);const o={};8&n&&(o.$$scope={dirty:n,ctx:t}),s.$set(o);const r={};8&n&&(r.$$scope={dirty:n,ctx:t}),$.$set(r);const c={};8&n&&(c.$$scope={dirty:n,ctx:t}),p.$set(c)},i(t){l||(h(e.$$.fragment,t),h(s.$$.fragment,t),h($.$$.fragment,t),h(p.$$.fragment,t),l=!0)},o(t){x(e.$$.fragment,t),x(s.$$.fragment,t),x($.$$.fragment,t),x(p.$$.fragment,t),l=!1},d(t){k(e,t),t&&o(n),k(s,t),t&&o(a),k($,t),t&&o(r),k(p,t)}}}function pt(t){let e,n,s,a,r,p;return n=new F({props:{$$slots:{default:[st]},$$scope:{ctx:t}}}),r=new F({props:{$$slots:{default:[ct]},$$scope:{ctx:t}}}),{c(){e=v("thead"),m(n.$$.fragment),s=y(),a=v("tbody"),m(r.$$.fragment)},l(t){e=D(t,"THEAD",{});var c=$(e);i(n.$$.fragment,c),c.forEach(o),s=E(t),a=D(t,"TBODY",{});var p=$(a);i(r.$$.fragment,p),p.forEach(o)},m(t,$){c(t,e,$),d(n,e,null),c(t,s,$),c(t,a,$),d(r,a,null),p=!0},p(t,e){const s={};8&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s);const a={};8&e&&(a.$$scope={dirty:e,ctx:t}),r.$set(a)},i(t){p||(h(n.$$.fragment,t),h(r.$$.fragment,t),p=!0)},o(t){x(n.$$.fragment,t),x(r.$$.fragment,t),p=!1},d(t){t&&o(e),k(n),t&&o(s),t&&o(a),k(r)}}}function lt(t){let e;return{c(){e=b("Class Properties")},l(t){e=T(t,"Class Properties")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function ft(t){let e,n,s,a,r,f,m;return{c(){e=b("All "),n=v("code"),s=b("<Badge>"),a=b(" components use the "),r=v("code"),f=b(".badge"),m=b(" class.")},l(t){e=T(t,"All "),n=D(t,"CODE",{});var c=$(n);s=T(c,"<Badge>"),c.forEach(o),a=T(t," components use the "),r=D(t,"CODE",{});var p=$(r);f=T(p,".badge"),p.forEach(o),m=T(t," class.")},m(t,$){c(t,e,$),c(t,n,$),p(n,s),c(t,a,$),c(t,r,$),p(r,f),c(t,m,$)},p:l,d(t){t&&o(e),t&&o(n),t&&o(a),t&&o(r),t&&o(m)}}}function mt(t){let e;return{c(){e=b("Falsy values passed to classes will be disregarded.")},l(t){e=T(t,"Falsy values passed to classes will be disregarded.")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function it(t){let e;return{c(){e=b("Name")},l(t){e=T(t,"Name")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function dt(t){let e;return{c(){e=b("Default")},l(t){e=T(t,"Default")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function gt(t){let e;return{c(){e=b("Type")},l(t){e=T(t,"Type")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function ut(t){let e;return{c(){e=b("Description")},l(t){e=T(t,"Description")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function ht(t){let e,n,s,a,$,r,p,l;return e=new M({props:{$$slots:{default:[it]},$$scope:{ctx:t}}}),s=new M({props:{$$slots:{default:[dt]},$$scope:{ctx:t}}}),$=new M({props:{$$slots:{default:[gt]},$$scope:{ctx:t}}}),p=new M({props:{$$slots:{default:[ut]},$$scope:{ctx:t}}}),{c(){m(e.$$.fragment),n=y(),m(s.$$.fragment),a=y(),m($.$$.fragment),r=y(),m(p.$$.fragment)},l(t){i(e.$$.fragment,t),n=E(t),i(s.$$.fragment,t),a=E(t),i($.$$.fragment,t),r=E(t),i(p.$$.fragment,t)},m(t,o){d(e,t,o),c(t,n,o),d(s,t,o),c(t,a,o),d($,t,o),c(t,r,o),d(p,t,o),l=!0},p(t,n){const a={};8&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a);const o={};8&n&&(o.$$scope={dirty:n,ctx:t}),s.$set(o);const r={};8&n&&(r.$$scope={dirty:n,ctx:t}),$.$set(r);const c={};8&n&&(c.$$scope={dirty:n,ctx:t}),p.$set(c)},i(t){l||(h(e.$$.fragment,t),h(s.$$.fragment,t),h($.$$.fragment,t),h(p.$$.fragment,t),l=!0)},o(t){x(e.$$.fragment,t),x(s.$$.fragment,t),x($.$$.fragment,t),x(p.$$.fragment,t),l=!1},d(t){k(e,t),t&&o(n),k(s,t),t&&o(a),k($,t),t&&o(r),k(p,t)}}}function xt(t){let e,n,s;return{c(){e=v("strong"),n=v("code"),s=b("class")},l(t){e=D(t,"STRONG",{});var a=$(e);n=D(a,"CODE",{});var r=$(n);s=T(r,"class"),r.forEach(o),a.forEach(o)},m(t,a){c(t,e,a),p(e,n),p(n,s)},p:l,d(t){t&&o(e)}}}function kt(t){let e,n;return{c(){e=v("code"),n=b("null")},l(t){e=D(t,"CODE",{});var s=$(e);n=T(s,"null"),s.forEach(o)},m(t,s){c(t,e,s),p(e,n)},p:l,d(t){t&&o(e)}}}function wt(t){let e,n;return{c(){e=v("code"),n=b("string")},l(t){e=D(t,"CODE",{});var s=$(e);n=T(s,"string"),s.forEach(o)},m(t,s){c(t,e,s),p(e,n)},p:l,d(t){t&&o(e)}}}function yt(t){let e;return{c(){e=b("A class string to add to the handle.")},l(t){e=T(t,"A class string to add to the handle.")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function vt(t){let e,n,s,a,$,r,p,l;return e=new W({props:{$$slots:{default:[xt]},$$scope:{ctx:t}}}),s=new W({props:{$$slots:{default:[kt]},$$scope:{ctx:t}}}),$=new W({props:{$$slots:{default:[wt]},$$scope:{ctx:t}}}),p=new W({props:{$$slots:{default:[yt]},$$scope:{ctx:t}}}),{c(){m(e.$$.fragment),n=y(),m(s.$$.fragment),a=y(),m($.$$.fragment),r=y(),m(p.$$.fragment)},l(t){i(e.$$.fragment,t),n=E(t),i(s.$$.fragment,t),a=E(t),i($.$$.fragment,t),r=E(t),i(p.$$.fragment,t)},m(t,o){d(e,t,o),c(t,n,o),d(s,t,o),c(t,a,o),d($,t,o),c(t,r,o),d(p,t,o),l=!0},p(t,n){const a={};8&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a);const o={};8&n&&(o.$$scope={dirty:n,ctx:t}),s.$set(o);const r={};8&n&&(r.$$scope={dirty:n,ctx:t}),$.$set(r);const c={};8&n&&(c.$$scope={dirty:n,ctx:t}),p.$set(c)},i(t){l||(h(e.$$.fragment,t),h(s.$$.fragment,t),h($.$$.fragment,t),h(p.$$.fragment,t),l=!0)},o(t){x(e.$$.fragment,t),x(s.$$.fragment,t),x($.$$.fragment,t),x(p.$$.fragment,t),l=!1},d(t){k(e,t),t&&o(n),k(s,t),t&&o(a),k($,t),t&&o(r),k(p,t)}}}function bt(t){let e,n,s,a,r,p;return n=new F({props:{$$slots:{default:[ht]},$$scope:{ctx:t}}}),r=new F({props:{$$slots:{default:[vt]},$$scope:{ctx:t}}}),{c(){e=v("thead"),m(n.$$.fragment),s=y(),a=v("tbody"),m(r.$$.fragment)},l(t){e=D(t,"THEAD",{});var c=$(e);i(n.$$.fragment,c),c.forEach(o),s=E(t),a=D(t,"TBODY",{});var p=$(a);i(r.$$.fragment,p),p.forEach(o)},m(t,$){c(t,e,$),d(n,e,null),c(t,s,$),c(t,a,$),d(r,a,null),p=!0},p(t,e){const s={};8&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s);const a={};8&e&&(a.$$scope={dirty:e,ctx:t}),r.$set(a)},i(t){p||(h(n.$$.fragment,t),h(r.$$.fragment,t),p=!0)},o(t){x(n.$$.fragment,t),x(r.$$.fragment,t),p=!1},d(t){t&&o(e),k(n),t&&o(s),t&&o(a),k(r)}}}function Et(t){let e;return{c(){e=b("Slots")},l(t){e=T(t,"Slots")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function Dt(t){let e;return{c(){e=b("Default slot")},l(t){e=T(t,"Default slot")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function Tt(t){let e;return{c(){e=b("The element to attach a badge to.")},l(t){e=T(t,"The element to attach a badge to.")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function Bt(t){let e;return{c(){e=b("SCSS Variables")},l(t){e=T(t,"SCSS Variables")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function jt(t){let e;return{c(){e=b("Name")},l(t){e=T(t,"Name")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function Ot(t){let e;return{c(){e=b("Description")},l(t){e=T(t,"Description")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function Ct(t){let e;return{c(){e=b("Default")},l(t){e=T(t,"Default")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function St(t){let e,n,s,a,$,r;return e=new M({props:{$$slots:{default:[jt]},$$scope:{ctx:t}}}),s=new M({props:{$$slots:{default:[Ot]},$$scope:{ctx:t}}}),$=new M({props:{$$slots:{default:[Ct]},$$scope:{ctx:t}}}),{c(){m(e.$$.fragment),n=y(),m(s.$$.fragment),a=y(),m($.$$.fragment)},l(t){i(e.$$.fragment,t),n=E(t),i(s.$$.fragment,t),a=E(t),i($.$$.fragment,t)},m(t,o){d(e,t,o),c(t,n,o),d(s,t,o),c(t,a,o),d($,t,o),r=!0},p(t,n){const a={};8&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a);const o={};8&n&&(o.$$scope={dirty:n,ctx:t}),s.$set(o);const r={};8&n&&(r.$$scope={dirty:n,ctx:t}),$.$set(r)},i(t){r||(h(e.$$.fragment,t),h(s.$$.fragment,t),h($.$$.fragment,t),r=!0)},o(t){x(e.$$.fragment,t),x(s.$$.fragment,t),x($.$$.fragment,t),r=!1},d(t){k(e,t),t&&o(n),k(s,t),t&&o(a),k($,t)}}}function At(t){let e,n,s;return{c(){e=v("strong"),n=v("code"),s=b("$shadow-raised")},l(t){e=D(t,"STRONG",{});var a=$(e);n=D(a,"CODE",{});var r=$(n);s=T(r,"$shadow-raised"),r.forEach(o),a.forEach(o)},m(t,a){c(t,e,a),p(e,n),p(n,s)},p:l,d(t){t&&o(e)}}}function Nt(t){let e;return{c(){e=b("The shadow of the badge.")},l(t){e=T(t,"The shadow of the badge.")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function Rt(t){let e,n;return e=new R({props:{value:Ut}}),{c(){m(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){d(e,t,s),n=!0},p:l,i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){x(e.$$.fragment,t),n=!1},d(t){k(e,t)}}}function Ht(t){let e,n,s,a,$,r;return e=new W({props:{$$slots:{default:[At]},$$scope:{ctx:t}}}),s=new W({props:{$$slots:{default:[Nt]},$$scope:{ctx:t}}}),$=new W({props:{$$slots:{default:[Rt]},$$scope:{ctx:t}}}),{c(){m(e.$$.fragment),n=y(),m(s.$$.fragment),a=y(),m($.$$.fragment)},l(t){i(e.$$.fragment,t),n=E(t),i(s.$$.fragment,t),a=E(t),i($.$$.fragment,t)},m(t,o){d(e,t,o),c(t,n,o),d(s,t,o),c(t,a,o),d($,t,o),r=!0},p(t,n){const a={};8&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a);const o={};8&n&&(o.$$scope={dirty:n,ctx:t}),s.$set(o);const r={};8&n&&(r.$$scope={dirty:n,ctx:t}),$.$set(r)},i(t){r||(h(e.$$.fragment,t),h(s.$$.fragment,t),h($.$$.fragment,t),r=!0)},o(t){x(e.$$.fragment,t),x(s.$$.fragment,t),x($.$$.fragment,t),r=!1},d(t){k(e,t),t&&o(n),k(s,t),t&&o(a),k($,t)}}}function Pt(t){let e,n,s;return{c(){e=v("strong"),n=v("code"),s=b("$badge-default")},l(t){e=D(t,"STRONG",{});var a=$(e);n=D(a,"CODE",{});var r=$(n);s=T(r,"$badge-default"),r.forEach(o),a.forEach(o)},m(t,a){c(t,e,a),p(e,n),p(n,s)},p:l,d(t){t&&o(e)}}}function zt(t){let e;return{c(){e=b("The default color of the badge.")},l(t){e=T(t,"The default color of the badge.")},m(t,n){c(t,e,n)},d(t){t&&o(e)}}}function Ft(t){let e,n;return e=new N({props:{value:"#FF5757"}}),{c(){m(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){d(e,t,s),n=!0},p:l,i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){x(e.$$.fragment,t),n=!1},d(t){k(e,t)}}}function Mt(t){let e,n,s,a,$,r;return e=new W({props:{$$slots:{default:[Pt]},$$scope:{ctx:t}}}),s=new W({props:{$$slots:{default:[zt]},$$scope:{ctx:t}}}),$=new W({props:{$$slots:{default:[Ft]},$$scope:{ctx:t}}}),{c(){m(e.$$.fragment),n=y(),m(s.$$.fragment),a=y(),m($.$$.fragment)},l(t){i(e.$$.fragment,t),n=E(t),i(s.$$.fragment,t),a=E(t),i($.$$.fragment,t)},m(t,o){d(e,t,o),c(t,n,o),d(s,t,o),c(t,a,o),d($,t,o),r=!0},p(t,n){const a={};8&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a);const o={};8&n&&(o.$$scope={dirty:n,ctx:t}),s.$set(o);const r={};8&n&&(r.$$scope={dirty:n,ctx:t}),$.$set(r)},i(t){r||(h(e.$$.fragment,t),h(s.$$.fragment,t),h($.$$.fragment,t),r=!0)},o(t){x(e.$$.fragment,t),x(s.$$.fragment,t),x($.$$.fragment,t),r=!1},d(t){k(e,t),t&&o(n),k(s,t),t&&o(a),k($,t)}}}function Wt(t){let e,n,s,a,r,l,f,g;return n=new F({props:{$$slots:{default:[St]},$$scope:{ctx:t}}}),r=new F({props:{$$slots:{default:[Ht]},$$scope:{ctx:t}}}),f=new F({props:{$$slots:{default:[Mt]},$$scope:{ctx:t}}}),{c(){e=v("thead"),m(n.$$.fragment),s=y(),a=v("tbody"),m(r.$$.fragment),l=y(),m(f.$$.fragment)},l(t){e=D(t,"THEAD",{});var c=$(e);i(n.$$.fragment,c),c.forEach(o),s=E(t),a=D(t,"TBODY",{});var p=$(a);i(r.$$.fragment,p),l=E(p),i(f.$$.fragment,p),p.forEach(o)},m(t,$){c(t,e,$),d(n,e,null),c(t,s,$),c(t,a,$),d(r,a,null),p(a,l),d(f,a,null),g=!0},p(t,e){const s={};8&e&&(s.$$scope={dirty:e,ctx:t}),n.$set(s);const a={};8&e&&(a.$$scope={dirty:e,ctx:t}),r.$set(a);const $={};8&e&&($.$$scope={dirty:e,ctx:t}),f.$set($)},i(t){g||(h(n.$$.fragment,t),h(r.$$.fragment,t),h(f.$$.fragment,t),g=!0)},o(t){x(n.$$.fragment,t),x(r.$$.fragment,t),x(f.$$.fragment,t),g=!1},d(t){t&&o(e),k(n),t&&o(s),t&&o(a),k(r),k(f)}}}function Gt(t){let e,n,s,a,r,l,f,g,u,w,B,C,S,N,R,F,M,W,G,I,V,Y,K,q,_,tt,et,nt,st,at,$t,ot,rt;return e=new j({props:{$$slots:{default:[L]},$$scope:{ctx:t}}}),s=new O({props:{$$slots:{default:[U]},$$scope:{ctx:t}}}),r=new A({props:{$$slots:{source:[J],showcase:[Z]},$$scope:{ctx:t}}}),f=new H({props:{id:"properties",$$slots:{default:[Q]},$$scope:{ctx:t}}}),u=new P({props:{$$slots:{default:[X]},$$scope:{ctx:t}}}),B=new z({props:{$$slots:{default:[pt]},$$scope:{ctx:t}}}),S=new P({props:{$$slots:{default:[lt]},$$scope:{ctx:t}}}),R=new O({props:{$$slots:{default:[ft]},$$scope:{ctx:t}}}),M=new O({props:{$$slots:{default:[mt]},$$scope:{ctx:t}}}),G=new z({props:{$$slots:{default:[bt]},$$scope:{ctx:t}}}),q=new H({props:{id:"slots",$$slots:{default:[Et]},$$scope:{ctx:t}}}),tt=new P({props:{$$slots:{default:[Dt]},$$scope:{ctx:t}}}),nt=new O({props:{$$slots:{default:[Tt]},$$scope:{ctx:t}}}),at=new H({props:{id:"scss-variables",$$slots:{default:[Bt]},$$scope:{ctx:t}}}),ot=new z({props:{$$slots:{default:[Wt]},$$scope:{ctx:t}}}),{c(){m(e.$$.fragment),n=y(),m(s.$$.fragment),a=y(),m(r.$$.fragment),l=y(),m(f.$$.fragment),g=y(),m(u.$$.fragment),w=y(),m(B.$$.fragment),C=y(),m(S.$$.fragment),N=y(),m(R.$$.fragment),F=y(),m(M.$$.fragment),W=y(),m(G.$$.fragment),I=y(),V=v("mark"),Y=b("Bonus"),K=b(": use the `.icon` class for the icons inside the badge to set `display: block` on them and avoid unexpected space at the bottom.\n"),m(q.$$.fragment),_=y(),m(tt.$$.fragment),et=y(),m(nt.$$.fragment),st=y(),m(at.$$.fragment),$t=y(),m(ot.$$.fragment)},l(t){i(e.$$.fragment,t),n=E(t),i(s.$$.fragment,t),a=E(t),i(r.$$.fragment,t),l=E(t),i(f.$$.fragment,t),g=E(t),i(u.$$.fragment,t),w=E(t),i(B.$$.fragment,t),C=E(t),i(S.$$.fragment,t),N=E(t),i(R.$$.fragment,t),F=E(t),i(M.$$.fragment,t),W=E(t),i(G.$$.fragment,t),I=E(t),V=D(t,"MARK",{});var c=$(V);Y=T(c,"Bonus"),c.forEach(o),K=T(t,": use the `.icon` class for the icons inside the badge to set `display: block` on them and avoid unexpected space at the bottom.\n"),i(q.$$.fragment,t),_=E(t),i(tt.$$.fragment,t),et=E(t),i(nt.$$.fragment,t),st=E(t),i(at.$$.fragment,t),$t=E(t),i(ot.$$.fragment,t)},m(t,$){d(e,t,$),c(t,n,$),d(s,t,$),c(t,a,$),d(r,t,$),c(t,l,$),d(f,t,$),c(t,g,$),d(u,t,$),c(t,w,$),d(B,t,$),c(t,C,$),d(S,t,$),c(t,N,$),d(R,t,$),c(t,F,$),d(M,t,$),c(t,W,$),d(G,t,$),c(t,I,$),c(t,V,$),p(V,Y),c(t,K,$),d(q,t,$),c(t,_,$),d(tt,t,$),c(t,et,$),d(nt,t,$),c(t,st,$),d(at,t,$),c(t,$t,$),d(ot,t,$),rt=!0},p(t,n){const a={};8&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a);const $={};8&n&&($.$$scope={dirty:n,ctx:t}),s.$set($);const o={};9&n&&(o.$$scope={dirty:n,ctx:t}),r.$set(o);const c={};8&n&&(c.$$scope={dirty:n,ctx:t}),f.$set(c);const p={};8&n&&(p.$$scope={dirty:n,ctx:t}),u.$set(p);const l={};8&n&&(l.$$scope={dirty:n,ctx:t}),B.$set(l);const m={};8&n&&(m.$$scope={dirty:n,ctx:t}),S.$set(m);const i={};8&n&&(i.$$scope={dirty:n,ctx:t}),R.$set(i);const d={};8&n&&(d.$$scope={dirty:n,ctx:t}),M.$set(d);const g={};8&n&&(g.$$scope={dirty:n,ctx:t}),G.$set(g);const h={};8&n&&(h.$$scope={dirty:n,ctx:t}),q.$set(h);const x={};8&n&&(x.$$scope={dirty:n,ctx:t}),tt.$set(x);const k={};8&n&&(k.$$scope={dirty:n,ctx:t}),nt.$set(k);const w={};8&n&&(w.$$scope={dirty:n,ctx:t}),at.$set(w);const y={};8&n&&(y.$$scope={dirty:n,ctx:t}),ot.$set(y)},i(t){rt||(h(e.$$.fragment,t),h(s.$$.fragment,t),h(r.$$.fragment,t),h(f.$$.fragment,t),h(u.$$.fragment,t),h(B.$$.fragment,t),h(S.$$.fragment,t),h(R.$$.fragment,t),h(M.$$.fragment,t),h(G.$$.fragment,t),h(q.$$.fragment,t),h(tt.$$.fragment,t),h(nt.$$.fragment,t),h(at.$$.fragment,t),h(ot.$$.fragment,t),rt=!0)},o(t){x(e.$$.fragment,t),x(s.$$.fragment,t),x(r.$$.fragment,t),x(f.$$.fragment,t),x(u.$$.fragment,t),x(B.$$.fragment,t),x(S.$$.fragment,t),x(R.$$.fragment,t),x(M.$$.fragment,t),x(G.$$.fragment,t),x(q.$$.fragment,t),x(tt.$$.fragment,t),x(nt.$$.fragment,t),x(at.$$.fragment,t),x(ot.$$.fragment,t),rt=!1},d(t){k(e,t),t&&o(n),k(s,t),t&&o(a),k(r,t),t&&o(l),k(f,t),t&&o(g),k(u,t),t&&o(w),k(B,t),t&&o(C),k(S,t),t&&o(N),k(R,t),t&&o(F),k(M,t),t&&o(W),k(G,t),t&&o(I),t&&o(V),t&&o(K),k(q,t),t&&o(_),k(tt,t),t&&o(et),k(nt,t),t&&o(st),k(at,t),t&&o($t),k(ot,t)}}}function It(t){let e,n;const s=[t[1],Vt];let a={$$slots:{default:[Gt]},$$scope:{ctx:t}};for(let t=0;t<s.length;t+=1)a=f(a,s[t]);return e=new B({props:a}),{c(){m(e.$$.fragment)},l(t){i(e.$$.fragment,t)},m(t,s){d(e,t,s),n=!0},p(t,[n]){const a=2&n?g(s,[2&n&&u(t[1]),0&n&&u(Vt)]):{};9&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){x(e.$$.fragment,t),n=!1},d(t){k(e,t)}}}const Vt={name:"Badge",shadowRaised:"0 2px 4px -1px rgba(0, 0, 0, .2), 0 3px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);"},{name:Lt,shadowRaised:Ut}=Vt;function Yt(t,e,n){let s=!1;return t.$$set=t=>{n(1,e=f(f({},e),w(t)))},e=w(e),[s,e,()=>n(0,s=!s)]}class Kt extends t{constructor(t){super(),e(this,t,Yt,It,n,{})}}export{Kt as default,Vt as metadata};