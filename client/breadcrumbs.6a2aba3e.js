import{S as t,i as s,s as e,u as n,w as r,f as a,Q as l,R as o,T as c,t as i,p as f,d as p,h,k as m,b as u,e as $,y as d,z as g,a7 as v,M as x,v as b,x as j,g as k,A,n as B,j as E,l as N,m as w,q as y}from"./client.5ce57074.js";import{B as S}from"./button.3e705dc2.js";function V(t,s,e){const n=t.slice();return n[4]=s[e],n[6]=e,n}const q=t=>({item:1&t}),z=t=>({item:t[4]}),D=t=>({}),I=t=>({});function M(t){let s;const e=t[2].separator,n=x(e,t,t[3],I),r=n||function(t){let s,e;return{c(){s=h("div"),e=b(t[1]),this.h()},l(n){s=m(n,"DIV",{class:!0});var r=u(s);e=j(r,t[1]),r.forEach(p),this.h()},h(){$(s,"class","node")},m(t,n){a(t,s,n),k(s,e)},p(t,s){2&s&&A(e,t[1])},d(t){t&&p(s)}}}(t);return{c(){r&&r.c()},l(t){r&&r.l(t)},m(t,e){r&&r.m(t,e),s=!0},p(t,a){n?n.p&&(!s||8&a)&&l(n,e,t,t[3],s?c(e,t[3],a,D):o(t[3]),I):r&&r.p&&(!s||2&a)&&r.p(t,s?a:-1)},i(t){s||(i(r,t),s=!0)},o(t){f(r,t),s=!1},d(t){r&&r.d(t)}}}function P(t){let s,e,n=t[4].text+"";return{c(){s=h("span"),e=b(n),this.h()},l(t){s=m(t,"SPAN",{class:!0});var r=u(s);e=j(r,n),r.forEach(p),this.h()},h(){$(s,"class","node")},m(t,n){a(t,s,n),k(s,e)},p(t,s){1&s&&n!==(n=t[4].text+"")&&A(e,n)},i:B,o:B,d(t){t&&p(s)}}}function Q(t){let s,e;return s=new S({props:{href:t[4].href,class:"node",small:!0,$$slots:{default:[R]},$$scope:{ctx:t}}}),{c(){E(s.$$.fragment)},l(t){N(s.$$.fragment,t)},m(t,n){w(s,t,n),e=!0},p(t,e){const n={};1&e&&(n.href=t[4].href),9&e&&(n.$$scope={dirty:e,ctx:t}),s.$set(n)},i(t){e||(i(s.$$.fragment,t),e=!0)},o(t){f(s.$$.fragment,t),e=!1},d(t){y(s,t)}}}function R(t){let s,e=t[4].text+"";return{c(){s=b(e)},l(t){s=j(t,e)},m(t,e){a(t,s,e)},p(t,n){1&n&&e!==(e=t[4].text+"")&&A(s,e)},d(t){t&&p(s)}}}function T(t){let s,e,h=t[6]>0&&M(t);const m=t[2].item,u=x(m,t,t[3],z),$=u||function(t){let s,e,l,o;const c=[Q,P],h=[];function m(t,s){return t[4].href?0:1}return s=m(t),e=h[s]=c[s](t),{c(){e.c(),l=n()},l(t){e.l(t),l=r(t)},m(t,e){h[s].m(t,e),a(t,l,e),o=!0},p(t,n){let r=s;s=m(t),s===r?h[s].p(t,n):(d(),f(h[r],1,1,(()=>{h[r]=null})),g(),e=h[s],e?e.p(t,n):(e=h[s]=c[s](t),e.c()),i(e,1),e.m(l.parentNode,l))},i(t){o||(i(e),o=!0)},o(t){f(e),o=!1},d(t){h[s].d(t),t&&p(l)}}}(t);return{c(){h&&h.c(),s=n(),$&&$.c()},l(t){h&&h.l(t),s=r(t),$&&$.l(t)},m(t,n){h&&h.m(t,n),a(t,s,n),$&&$.m(t,n),e=!0},p(t,s){t[6]>0&&h.p(t,s),u?u.p&&(!e||9&s)&&l(u,m,t,t[3],e?c(m,t[3],s,q):o(t[3]),z):$&&$.p&&(!e||1&s)&&$.p(t,e?s:-1)},i(t){e||(i(h),i($,t),e=!0)},o(t){f(h),f($,t),e=!1},d(t){h&&h.d(t),t&&p(s),$&&$.d(t)}}}function C(t){let s,e,n=t[0],r=[];for(let s=0;s<n.length;s+=1)r[s]=T(V(t,n,s));const l=t=>f(r[t],1,1,(()=>{r[t]=null}));return{c(){s=h("nav");for(let t=0;t<r.length;t+=1)r[t].c();this.h()},l(t){s=m(t,"NAV",{class:!0});var e=u(s);for(let t=0;t<r.length;t+=1)r[t].l(e);e.forEach(p),this.h()},h(){$(s,"class","breadcrumbs svelte-o18kkv")},m(t,n){a(t,s,n);for(let t=0;t<r.length;t+=1)r[t].m(s,null);e=!0},p(t,[e]){if(11&e){let a;for(n=t[0],a=0;a<n.length;a+=1){const l=V(t,n,a);r[a]?(r[a].p(l,e),i(r[a],1)):(r[a]=T(l),r[a].c(),i(r[a],1),r[a].m(s,null))}for(d(),a=n.length;a<r.length;a+=1)l(a);g()}},i(t){if(!e){for(let t=0;t<n.length;t+=1)i(r[t]);e=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)f(r[t]);e=!1},d(t){t&&p(s),v(r,t)}}}function F(t,s,e){let{$$slots:n={},$$scope:r}=s,{items:a=[]}=s,{separator:l="/"}=s;return t.$$set=t=>{"items"in t&&e(0,a=t.items),"separator"in t&&e(1,l=t.separator),"$$scope"in t&&e(3,r=t.$$scope)},[a,l,n,r]}var G=class extends t{constructor(t){super(),s(this,t,F,C,e,{items:0,separator:1})}};export{G as B};
