import{t as S}from"./task-d33bbe73.js";import{_ as A}from"./modal-55072e82.js";import{a as f,F as O,i as D,o as G,K as Z,b as d,q as x,w as m,e as o,h as e,L as j,P as V,p as W,j as Y,f as c,Z as M,_ as P,J as E,n as J,d as w,R as I,t as k,G as q,I as C,X as K,N as U,S as H,A as Q,M as ee}from"./index-a2eabe8b.js";import{d as te}from"./setting-drawer-svg-6defae7e.js";import{c as ae}from"./createMaterial-5bb52805.js";import{g as le}from"./utils-79b8b97a.js";import{l as oe}from"./lodash-d51f920f.js";import{_ as se}from"./_plugin-vue_export-helper-c27b6911.js";import{V as F,a as re}from"./VRow-36079f24.js";import{V as X}from"./VSelect-9029300f.js";import{V as _}from"./VTextField-dfe34a1b.js";import{V as N,b as ie}from"./VCard-db09e018.js";import{V as ne}from"./VMenu-b0bfb582.js";import{V as me}from"./VDialog-3e748fcf.js";import{V as de}from"./VDivider-f5717089.js";import{V as ue}from"./VTooltip-20f1ab89.js";import"./request-99d94a23.js";import"./index-8609523b.js";/* empty css              */import"./VAvatar-2b5e6595.js";import"./VImg-52e65ea0.js";import"./OrbitControls-6e5a6999.js";import"./VInput-d192d255.js";import"./VOverlay-6b227702.js";import"./VCheckboxBtn-eadfcaec.js";const pe=g=>(W("data-v-6d2bf977"),g=g(),Y(),g),ce=pe(()=>c("div",{id:"box",class:"w-100",style:{height:"21.5rem"}},null,-1)),fe={__name:"task-outbound-form",setup(g,{expose:T}){const u=f([]),s=f();O(()=>s.value,y=>{const l=u.value.filter(a=>a.id==y)[0];t.value=oe.cloneDeep(l),p.disWebGl(),setTimeout(()=>{p.updata(t.value)},0)}),S.taskStorageSelector().then(y=>{u.value=y.data});let p=null;const n=D("density"),t=f({materialTemplateShape:0,materialTemplateLengthX:0,materialTemplateLengthY:0,materialTemplateLengthZ:0,materialNumber:null,materialName:""}),L=le("sss_material_template_shape"),v=()=>{p.disWebGl(),setTimeout(()=>{p.updata(t.value)},0)};return G(()=>{setTimeout(()=>{p=new ae},0)}),Z(()=>{p.disWebGl()}),T({formData:t}),(y,l)=>(d(),x(re,{class:"pt-3"},{default:m(()=>[o(F,{cols:"3"},{default:m(()=>[o(X,{modelValue:e(s),"onUpdate:modelValue":l[0]||(l[0]=a=>j(s)?s.value=a:null),items:e(u),density:e(n),class:"mb-3",label:"模板","item-title":"materialName","item-value":"id"},null,8,["modelValue","items","density"]),o(X,{modelValue:e(t).materialTemplateShape,"onUpdate:modelValue":[l[1]||(l[1]=a=>e(t).materialTemplateShape=a),v],items:e(L),density:e(n),class:"mb-2",label:"物料形状"},null,8,["modelValue","items","density"]),o(_,{modelValue:e(t).materialName,"onUpdate:modelValue":l[2]||(l[2]=a=>e(t).materialName=a),label:"物料名称：",density:e(n),class:"mb-2"},null,8,["modelValue","density"]),e(t).materialTemplateShape===0?(d(),x(_,{key:0,modelValue:e(t).materialTemplateLengthX,"onUpdate:modelValue":[l[3]||(l[3]=a=>e(t).materialTemplateLengthX=a),v],label:"X轴长度：",density:e(n),class:"mb-2",suffix:"mm"},null,8,["modelValue","density"])):V("",!0),e(t).materialTemplateShape===0?(d(),x(_,{key:1,modelValue:e(t).materialTemplateLengthY,"onUpdate:modelValue":[l[4]||(l[4]=a=>e(t).materialTemplateLengthY=a),v],label:"Y轴长度：",density:e(n),class:"mb-2",suffix:"mm"},null,8,["modelValue","density"])):V("",!0),e(t).materialTemplateShape===1?(d(),x(_,{key:2,modelValue:e(t).materialTemplateLengthX,"onUpdate:modelValue":[l[5]||(l[5]=a=>e(t).materialTemplateLengthX=a),v],label:"半径：",density:e(n),class:"mb-2",suffix:"mm"},null,8,["modelValue","density"])):V("",!0),o(_,{modelValue:e(t).materialTemplateLengthZ,"onUpdate:modelValue":[l[6]||(l[6]=a=>e(t).materialTemplateLengthZ=a),v],label:"Z轴长度：",density:e(n),suffix:"mm",class:"mb-2"},null,8,["modelValue","density"]),o(_,{modelValue:e(t).materialNumber,"onUpdate:modelValue":l[7]||(l[7]=a=>e(t).materialNumber=a),label:"数量",density:e(n),class:"mb-2"},null,8,["modelValue","density"])]),_:1}),o(F,{cols:"9"},{default:m(()=>[ce]),_:1})]),_:1}))}},B=se(fe,[["__scopeId","data-v-6d2bf977"]]),be={class:"h-100 d-flex flex-column"},ve={class:"mx-3 px-3 mb-2 d-flex justify-space-between align-center"},ye={style:{display:"inline-block","vertical-align":"middle"}},_e={key:0,class:"d-flex align-center"},xe={class:"d-flex px-4 pt-5 pb-4 flex-wrap gap-3 text-center",style:{flex:"1","overflow-y":"scroll"}},Ve=["onClick"],ge={class:"position-absolute text-center w-100",style:{bottom:"0",left:"0",background:"rgba(33, 33, 33, 70%)"}},he={class:"pt-2"},ke={class:"px-6"},Ee={__name:"task-outbound",setup(g){const{mdAndDown:T}=M(),u=D("message"),s=P(),p=E(),n=f(),t=f(),L=f();S.taskStorage({id:s.query.id,type:`${s.query.type}_${s.query.process}`}).then(r=>{n.value=r.data});const v=D("btnList"),y=f(!1),l=f({}),a=f(null);O(()=>a.value,r=>{const b=n.value.filter(i=>i.id==r)[0];l.value=b});const R=()=>{L.value.open({formWidth:854,hideDiaName:!0,hideDiaOk:!0,hideDiaCancel:!0,slot:Q(te),slotData:n.value.filter(r=>r.id==a.value)[0].upper,before:({dialog:r,openLoading:b,close:i,dialogLoading:h,closeLoading:$,dialogLoadingText:z})=>{a.value?r.value=!0:u.value.open({text:"请选择料盘"})}})};return G(()=>{J(()=>{v.value=[{name:"完成",color:"#D32F2F",icon:"bxs-zap",size:"large",width:220,mark:"是否创建",before:({dialog:r,openLoading:b,close:i,dialogLoading:h,closeLoading:$,dialogLoadingText:z})=>{a.value?s.query.process==="IN"&&!t.value.formData.materialNumber?u.value.open({text:"请输入数量"}):r.value=!0:(console.log(11),u.value.open({text:"请选择一项"}))},fn:({close:r,openLoading:b,closeLoading:i})=>{b({text:"保存中"}),s.query.process==="IN"&&(t.value.formData.palletId=a.value,S.taskStorageIn(t.value.formData).then(h=>{u.value.open({text:"保存成功"})}).finally(()=>{r(),i(),p.push({path:"/tasklist"})})),s.query.process==="OUT"&&S.taskStorageOut({storagePalletId:a.value}).then(h=>{u.value.open({text:"保存成功"})}).finally(()=>{r(),i(),p.push({path:"/tasklist"})})}}]})}),(r,b)=>(d(),w(I,null,[c("div",be,[o(N,{class:"pt-2 pb-2 d-flex flex-column",style:{flex:"1"}},{default:m(()=>[c("h4",ve,[c("div",null,[c("span",ye,k(e(s).query.type=="BOX"?"料箱":"料盘")+"：",1),o(ne,{color:"#4CAF50",class:"mx-3 justify-center",style:{width:"8.125rem"}},{default:m(()=>[q(k(l.value.palletName||"未选择"),1)]),_:1})]),e(s).query.type!=="BOX"?(d(),w("div",_e,[o(C,{color:"blue-darken-1",variant:"tonal",onClick:R},{default:m(()=>[q(k(r.$t("查看料盘网格")),1)]),_:1})])):V("",!0),e(T)&&e(s).query.process==="IN"?(d(),x(me,{key:1,width:"800"},{activator:m(({props:i})=>[o(C,K({color:"primary"},i,{variant:"tonal"}),{default:m(()=>[o(U,{icon:"bxs-cube-alt"})]),_:2},1040)]),default:m(()=>[o(N,null,{default:m(()=>[o(ie,null,{default:m(()=>[o(B,{ref_key:"form",ref:t},null,512)]),_:1})]),_:1})]),_:1})):V("",!0)]),o(de),c("div",xe,[(d(!0),w(I,null,H(n.value,(i,h)=>(d(),w("div",{key:i,style:ee([{position:"relative",overflow:"hidden",width:"70px",height:"70px","border-radius":"6px",color:"#fff","font-size":"12px"},{background:"#435b63",border:a.value==i.id?"2px solid #FF80AB":"2px solid rgb(var(--v-theme-surface))"}]),onClick:()=>a.value=i.id},[o(U,{icon:e(s).query.type=="BOX"?"bx-archive":"bx-selection",color:"#bdbdbd",size:"30",class:"mt-3"},null,8,["icon"]),c("div",ge," 0"+k(h+1),1)],12,Ve))),128))]),o(ue,{modelValue:y.value,"onUpdate:modelValue":b[0]||(b[0]=i=>y.value=i),activator:"parent",location:"top","open-on-hover":!1},{default:m(()=>[c("span",he,k(l.value.name),1)]),_:1},8,["modelValue"])]),_:1}),!e(T)&&e(s).query.process==="IN"?(d(),x(N,{key:0,class:"mt-3 pt-2 pb-2"},{default:m(()=>[c("div",ke,[o(B,{ref_key:"form",ref:t},null,512)])]),_:1})):V("",!0)]),o(A,{ref_key:"modal",ref:L},null,512)],64))}};export{Ee as default};
