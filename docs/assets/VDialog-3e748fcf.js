import{m as D,a as b,u as y,V as f}from"./VOverlay-6b227702.js";import{f as h}from"./VInput-d192d255.js";import{s as x,z as F,ax as S,a as w,aE as B,F as v,n as I,c as R,D as T,e as m,ag as O,X as g,aF as z}from"./index-a2eabe8b.js";const A=x({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...D({origin:"center center",scrollStrategy:"block",transition:{component:b},zIndex:2400})},"VDialog"),k=F()({name:"VDialog",props:A(),emits:{"update:modelValue":a=>!0},setup(a,p){let{slots:c}=p;const n=S(a,"modelValue"),{scopeId:V}=y(),o=w();function i(l){var r,s;const e=l.relatedTarget,t=l.target;if(e!==t&&((r=o.value)!=null&&r.contentEl)&&((s=o.value)!=null&&s.globalTop)&&![document,o.value.contentEl].includes(t)&&!o.value.contentEl.contains(t)){const u=z(o.value.contentEl);if(!u.length)return;const d=u[0],P=u[u.length-1];e===d?P.focus():d.focus()}}B&&v(()=>n.value&&a.retainFocus,l=>{l?document.addEventListener("focusin",i):document.removeEventListener("focusin",i)},{immediate:!0}),v(n,async l=>{var e,t;await I(),l?(e=o.value.contentEl)==null||e.focus({preventScroll:!0}):(t=o.value.activatorEl)==null||t.focus({preventScroll:!0})});const E=R(()=>g({"aria-haspopup":"dialog","aria-expanded":String(n.value)},a.activatorProps));return T(()=>{const l=f.filterProps(a);return m(f,g({ref:o,class:["v-dialog",{"v-dialog--fullscreen":a.fullscreen,"v-dialog--scrollable":a.scrollable},a.class],style:a.style},l,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,"aria-modal":"true",activatorProps:E.value,role:"dialog"},V),{activator:c.activator,default:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return m(O,{root:"VDialog"},{default:()=>{var s;return[(s=c.default)==null?void 0:s.call(c,...t)]}})}})}),h({},o)}});export{k as V};
