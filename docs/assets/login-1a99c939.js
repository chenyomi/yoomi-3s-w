import{a as n,J as h,o as x,n as w,b as v,d as y,f as m,e,w as t,R as k,h as o,G as p,O as C,I}from"./index-a2eabe8b.js";import{b as S}from"./request-99d94a23.js";import{l as T,_ as B}from"./Message-4a89d849.js";import{u as M}from"./index-8609523b.js";import{V as R,d as j,e as F,b as c}from"./VCard-db09e018.js";import{V as N}from"./VImg-52e65ea0.js";import{V as U}from"./VForm-6a3daa5e.js";import{a as $,V as f}from"./VRow-36079f24.js";import{V as q}from"./VSelect-9029300f.js";import{V as A}from"./VTextField-dfe34a1b.js";import{V as E}from"./VCheckbox-38bd8e3e.js";import"./VOverlay-6b227702.js";import"./VInput-d192d255.js";import"./VAvatar-2b5e6595.js";/* empty css              */import"./VMenu-b0bfb582.js";import"./VDivider-f5717089.js";import"./VCheckboxBtn-eadfcaec.js";const G={login(i){return S("/login",i,"post")}};const J={class:"auth-wrapper d-flex align-center justify-center pa-4"},L=m("h5",{class:"text-h5 mb-1"}," 欢迎访问!👋🏻 ",-1),O=m("p",{class:"mb-0"}," 请登录您的账号！ ",-1),P={class:"d-flex align-center justify-space-between flex-wrap mt-1 mb-4"},ie={__name:"login",setup(i){const V=M(),d=n(),_=h(),a=n({username:"admin",password:"",remember:!1}),b=n([{title:"管理员",value:"admin"},{title:"访客",value:"common"}]);x(()=>{w(()=>{V.setMessage(d)})});const g=()=>{G.login(a.value).then(u=>{localStorage.setItem("token",u.token),localStorage.getItem("theme")||localStorage.setItem("theme","light"),_.push("/")})},r=n(!1);return(u,s)=>(v(),y(k,null,[m("div",J,[e(R,{class:"auth-card pa-4 pt-7","max-width":"448","min-width":"370"},{default:t(()=>[e(j,{class:"justify-center"},{prepend:t(()=>[e(N,{src:o(T),style:{width:"2rem",height:"2rem","border-radius":"3px"}},null,8,["src"])]),default:t(()=>[e(F,{class:"text-2xl font-weight-bold"},{default:t(()=>[p(" YooMi ")]),_:1})]),_:1}),e(c,{class:"pt-2"},{default:t(()=>[L,O]),_:1}),e(c,null,{default:t(()=>[e(U,{onSubmit:C(g,["prevent"])},{default:t(()=>[e($,null,{default:t(()=>[e(f,{cols:"12"},{default:t(()=>[e(q,{modelValue:o(a).username,"onUpdate:modelValue":s[0]||(s[0]=l=>o(a).username=l),items:o(b),label:"角色"},null,8,["modelValue","items"])]),_:1}),e(f,{cols:"12"},{default:t(()=>[e(A,{modelValue:o(a).password,"onUpdate:modelValue":s[1]||(s[1]=l=>o(a).password=l),label:"密码",placeholder:"············",type:o(r)?"text":"password",autocomplete:"","append-inner-icon":o(r)?"bx-hide":"bx-show","onClick:appendInner":s[2]||(s[2]=l=>r.value=!o(r))},null,8,["modelValue","type","append-inner-icon"]),m("div",P,[e(E,{modelValue:o(a).remember,"onUpdate:modelValue":s[3]||(s[3]=l=>o(a).remember=l),label:"记住密码"},null,8,["modelValue"])]),e(I,{block:"",type:"submit"},{default:t(()=>[p(" 登录 ")]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),e(B,{ref_key:"message",ref:d},null,512)],64))}};export{ie as default};
