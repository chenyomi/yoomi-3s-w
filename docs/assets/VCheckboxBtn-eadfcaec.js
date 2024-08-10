import{s as I,aa as B,aR as L,Y as _,ab as W,aj as X,z as A,ax as g,aA as N,c as o,U as Y,b6 as J,W as K,T as i,D as F,e as d,at as Q,A as w,a as Z,aB as p,X as P,am as ee,av as le,R as ae,N as te,i as ne,ae as oe,aS as x,a9 as ue,ad as ie,ba as ce,n as re,az as se}from"./index-a2eabe8b.js";import{c as de}from"./VInput-d192d255.js";const j=Symbol.for("vuetify:selection-control-group"),z=I({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:B,trueIcon:B,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:L},..._(),...W(),...X()},"SelectionControlGroup"),ve=I({...z({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup"),Ve=A()({name:"VSelectionControlGroup",props:ve(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:r}=u;const l=g(e,"modelValue"),t=N(),v=o(()=>e.id||`v-selection-control-group-${t}`),c=o(()=>e.name||v.value),a=new Set;return Y(j,{modelValue:l,forceUpdate:()=>{a.forEach(n=>n())},onForceUpdate:n=>{a.add(n),J(()=>{a.delete(n)})}}),K({[e.defaultsTarget]:{color:i(e,"color"),disabled:i(e,"disabled"),density:i(e,"density"),error:i(e,"error"),inline:i(e,"inline"),modelValue:l,multiple:o(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),name:c,falseIcon:i(e,"falseIcon"),trueIcon:i(e,"trueIcon"),readonly:i(e,"readonly"),ripple:i(e,"ripple"),type:i(e,"type"),valueComparator:i(e,"valueComparator")}}),F(()=>{var n;return d("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(n=r.default)==null?void 0:n.call(r)])}),{}}}),E=I({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,..._(),...z()},"VSelectionControl");function fe(e){const u=ne(j,void 0),{densityClasses:r}=oe(e),l=g(e,"modelValue"),t=o(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),v=o(()=>e.falseValue!==void 0?e.falseValue:!1),c=o(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),a=o({get(){const m=u?u.modelValue.value:l.value;return c.value?x(m).some(s=>e.valueComparator(s,t.value)):e.valueComparator(m,t.value)},set(m){if(e.readonly)return;const s=m?t.value:v.value;let f=s;c.value&&(f=m?[...x(l.value),s]:x(l.value).filter(V=>!e.valueComparator(V,t.value))),u?u.modelValue.value=f:l.value=f}}),{textColorClasses:n,textColorStyles:y}=ue(o(()=>{if(!(e.error||e.disabled))return a.value?e.color:e.baseColor})),{backgroundColorClasses:b,backgroundColorStyles:S}=ie(o(()=>a.value&&!e.error&&!e.disabled?e.color:void 0)),h=o(()=>a.value?e.trueIcon:e.falseIcon);return{group:u,densityClasses:r,trueValue:t,falseValue:v,model:a,textColorClasses:n,textColorStyles:y,backgroundColorClasses:b,backgroundColorStyles:S,icon:h}}const R=A()({name:"VSelectionControl",directives:{Ripple:Q},inheritAttrs:!1,props:E(),emits:{"update:modelValue":e=>!0},setup(e,u){let{attrs:r,slots:l}=u;const{group:t,densityClasses:v,icon:c,model:a,textColorClasses:n,textColorStyles:y,backgroundColorClasses:b,backgroundColorStyles:S,trueValue:h}=fe(e),m=N(),s=o(()=>e.id||`input-${m}`),f=w(!1),V=w(!1),k=Z();t==null||t.onForceUpdate(()=>{k.value&&(k.value.checked=a.value)});function G(C){f.value=!0,ce(C.target,":focus-visible")!==!1&&(V.value=!0)}function D(){f.value=!1,V.value=!1}function M(C){e.readonly&&t&&re(()=>t.forceUpdate()),a.value=C.target.checked}return F(()=>{var U,$;const C=l.label?l.label({label:e.label,props:{for:s.value}}):e.label,[O,q]=p(r),T=d("input",P({ref:k,checked:a.value,disabled:!!(e.readonly||e.disabled),id:s.value,onBlur:D,onFocus:G,onInput:M,"aria-disabled":!!(e.readonly||e.disabled),type:e.type,value:h.value,name:e.name,"aria-checked":e.type==="checkbox"?a.value:void 0},q),null);return d("div",P({class:["v-selection-control",{"v-selection-control--dirty":a.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":f.value,"v-selection-control--focus-visible":V.value,"v-selection-control--inline":e.inline},v.value,e.class]},O,{style:e.style}),[d("div",{class:["v-selection-control__wrapper",n.value],style:y.value},[(U=l.default)==null?void 0:U.call(l,{backgroundColorClasses:b,backgroundColorStyles:S}),ee(d("div",{class:["v-selection-control__input"]},[(($=l.input)==null?void 0:$.call(l,{model:a,textColorClasses:n,textColorStyles:y,backgroundColorClasses:b,backgroundColorStyles:S,inputNode:T,icon:c.value,props:{onFocus:G,onBlur:D,id:s.value}}))??d(ae,null,[c.value&&d(te,{key:"icon",icon:c.value},null),T])]),[[le("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),C&&d(de,{for:s.value,clickable:!0,onClick:H=>H.stopPropagation()},{default:()=>[C]})])}),{isFocused:f,input:k}}}),me=I({indeterminate:Boolean,indeterminateIcon:{type:B,default:"$checkboxIndeterminate"},...E({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),be=A()({name:"VCheckboxBtn",props:me(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,u){let{slots:r}=u;const l=g(e,"indeterminate"),t=g(e,"modelValue");function v(n){l.value&&(l.value=!1)}const c=o(()=>l.value?e.indeterminateIcon:e.falseIcon),a=o(()=>l.value?e.indeterminateIcon:e.trueIcon);return F(()=>{const n=se(R.filterProps(e),["modelValue"]);return d(R,P(n,{modelValue:t.value,"onUpdate:modelValue":[y=>t.value=y,v],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:c.value,trueIcon:a.value,"aria-checked":l.value?"mixed":void 0}),r)}),{}}});export{R as V,z as a,Ve as b,be as c,me as d,E as m};
