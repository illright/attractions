import{_ as s,a,b as t,c as n,i as c,s as l,d as e,e as u,S as i,a2 as o,a3 as r,a4 as f,C as v,D as d,X as h,v as p,G as m,x as b,h as C,I as k,j as $,$ as y,a0 as L,k as g,a8 as x,l as E,m as R,A as I,K as j,L as B,a5 as D,F as V,V as w,W as A,Y as P,Z as S}from"./client.f6710ab4.js";import{c as T,_}from"./classes.f59ebf6e.js";function F(s){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(s){return!1}}();return function(){var c,l=a(s);if(n){var e=a(this).constructor;c=Reflect.construct(l,arguments,e)}else c=l.apply(this,arguments);return t(this,c)}}function G(s){var a,t=s[10].default,n=S(t,s,s[9],null);return{c:function(){n&&n.c()},l:function(s){n&&n.l(s)},m:function(s,t){n&&n.m(s,t),a=!0},p:function(s,c){n&&n.p&&(!a||512&c)&&o(n,t,s,s[9],a?f(t,s[9],c,null):r(s[9]),null)},i:function(s){a||(v(n,s),a=!0)},o:function(s){d(n,s),a=!1},d:function(s){n&&n.d(s)}}}function K(s){var a,t=s[10].default,n=S(t,s,s[9],null);return{c:function(){n&&n.c()},l:function(s){n&&n.l(s)},m:function(s,t){n&&n.m(s,t),a=!0},p:function(s,c){n&&n.p&&(!a||512&c)&&o(n,t,s,s[9],a?f(t,s[9],c,null):r(s[9]),null)},i:function(s){a||(v(n,s),a=!0)},o:function(s){d(n,s),a=!1},d:function(s){n&&n.d(s)}}}function N(s){for(var a,t,n,c,l,e,u,i,o,r,f,w,A,P,S=s[6]&&G(s),F=[{type:"checkbox"},{class:c=T(s[2])},{disabled:s[5]},s[8]],N={},O=0;O<F.length;O+=1)N=h(N,F[O]);var U=!s[6]&&K(s);return{c:function(){a=p("label"),S&&S.c(),t=m(),n=p("input"),l=m(),e=p("div"),u=p("div"),r=m(),U&&U.c(),this.h()},l:function(s){a=b(s,"LABEL",{class:!0});var c=C(a);S&&S.l(c),t=k(c),n=b(c,"INPUT",{type:!0,class:!0}),l=k(c),e=b(c,"DIV",{class:!0});var i=C(e);u=b(i,"DIV",{class:!0}),C(u).forEach($),i.forEach($),r=k(c),U&&U.l(c),c.forEach($),this.h()},h:function(){y(n,N),L(n,"svelte-aapm94",!0),g(u,"class",i=x(T("thumb",s[4]))+" svelte-aapm94"),g(e,"class",o=x(T("track",s[3]))+" svelte-aapm94"),g(a,"class",f=x(T("switch",s[1]))+" svelte-aapm94")},m:function(c,i){E(c,a,i),S&&S.m(a,null),R(a,t),R(a,n),n.autofocus&&n.focus(),n.checked=s[0],R(a,l),R(a,e),R(e,u),R(a,r),U&&U.m(a,null),w=!0,A||(P=[I(n,"change",s[11]),I(n,"change",s[12])],A=!0)},p:function(s,l){var r=_(l,1)[0];s[6]?S?(S.p(s,r),64&r&&v(S,1)):((S=G(s)).c(),v(S,1),S.m(a,t)):S&&(j(),d(S,1,1,(function(){S=null})),B()),y(n,N=D(F,[{type:"checkbox"},(!w||4&r&&c!==(c=T(s[2])))&&{class:c},(!w||32&r)&&{disabled:s[5]},256&r&&s[8]])),1&r&&(n.checked=s[0]),L(n,"svelte-aapm94",!0),(!w||16&r&&i!==(i=x(T("thumb",s[4]))+" svelte-aapm94"))&&g(u,"class",i),(!w||8&r&&o!==(o=x(T("track",s[3]))+" svelte-aapm94"))&&g(e,"class",o),s[6]?U&&(j(),d(U,1,1,(function(){U=null})),B()):U?(U.p(s,r),64&r&&v(U,1)):((U=K(s)).c(),v(U,1),U.m(a,null)),(!w||2&r&&f!==(f=x(T("switch",s[1]))+" svelte-aapm94"))&&g(a,"class",f)},i:function(s){w||(v(S),v(U),w=!0)},o:function(s){d(S),d(U),w=!1},d:function(s){s&&$(a),S&&S.d(),U&&U.d(),A=!1,V(P)}}}function O(s,a,t){var n=["class","inputClass","trackClass","thumbClass","value","disabled","slotLeft"],c=w(a,n),l=a,e=l.$$slots,u=void 0===e?{}:e,i=l.$$scope,o=a.class,r=void 0===o?null:o,f=a.inputClass,v=void 0===f?null:f,d=a.trackClass,p=void 0===d?null:d,m=a.thumbClass,b=void 0===m?null:m,C=a.value,k=void 0!==C&&C,$=a.disabled,y=void 0!==$&&$,L=a.slotLeft,g=void 0!==L&&L,x=A();return s.$$set=function(s){a=h(h({},a),P(s)),t(8,c=w(a,n)),"class"in s&&t(1,r=s.class),"inputClass"in s&&t(2,v=s.inputClass),"trackClass"in s&&t(3,p=s.trackClass),"thumbClass"in s&&t(4,b=s.thumbClass),"value"in s&&t(0,k=s.value),"disabled"in s&&t(5,y=s.disabled),"slotLeft"in s&&t(6,g=s.slotLeft),"$$scope"in s&&t(9,i=s.$$scope)},[k,r,v,p,b,y,g,x,c,i,u,function(){k=this.checked,t(0,k)},function(s){return x("change",{value:s.currentTarget.checked,nativeEvent:s})}]}var U=function(a){s(o,i);var t=F(o);function o(s){var a;return n(this,o),a=t.call(this),c(e(a),s,O,N,l,{class:1,inputClass:2,trackClass:3,thumbClass:4,value:0,disabled:5,slotLeft:6}),a}return u(o)}();export{U as S};
