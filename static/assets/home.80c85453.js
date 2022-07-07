import{_ as B,u as N,a as se}from"./index.4a9bdc9c.js";import{k as oe,d as S,o as _,f as g,m as n,u as e,J as ae,y as O,z as $,v as o,K as b,a as p,c as C,w as r,L as ne,N as R,F as I,O as T,P as H,Q as V,R as M,T as le,t as A,V as ue,W as re,X as ie,s as D,r as x,l as ce,Y as de,Z as _e,M as pe,_ as fe,$ as G,a0 as me,a1 as he,a2 as ve,b as z,a3 as ge,a4 as be,x as ye,a5 as Ce,a6 as ke,a7 as we}from"./vendor.69bb0da0.js";import{_ as Fe}from"./base-ant-drawer.41d9aad8.js";var j=(t=>(t.SIDEBAR="sidebar",t.MIX_SIDEBAR="mix-sidebar",t.MIX="mix",t.TOP_MENU="top-menu",t))(j||{}),X=(t=>(t.VERTICAL="vertical",t.HORIZONTAL="horizontal",t.VERTICAL_RIGHT="vertical-right",t.INLINE="inline",t))(X||{}),K=(t=>(t.HOVER="hover",t.CLICK="click",t))(K||{}),W=(t=>(t.FULL="full",t.FIXED="fixed",t))(W||{}),L=(t=>(t.DARK="dark",t.LIGHT="light",t))(L||{}),Z=(t=>(t.AUTO="auto",t.HEADER="header",t.FIXED="fixed",t))(Z||{}),q=(t=>(t.ZOOM_FADE="zoom-fade",t.ZOOM_OUT="zoom-out",t.FADE_SIDE="fade-slide",t.FADE="fade",t.FADE_BOTTOM="fade-bottom",t.FADE_SCALE="fade-scale",t))(q||{});L.LIGHT;const J=["#1951be","#1890ff","#151515","#ffffff","#009688","#5172DC","#e74c3c","#24292e","#394664","#001529","#383f45"],Q=["#2a50ec","#1890ff","#009688","#536dfe","#ff5c93","#ee4f12","#0096c7","#9c27b0","#ff9800"],Y=["#ffffff","#001529","#212121","#273352","#191b24","#191a23","#304156","#001628","#28333E","#344058","#383f45"],P=oe({id:"seetingState",state:()=>({showSettingButton:!0,showDarkModeToggle:!0,settingButtonPosition:Z.AUTO,themeColor:Q[0],grayMode:!1,colorWeak:!1,fullContent:!1,contentMode:W.FULL,showLogo:!0,showFooter:!1,headerSetting:{bgColor:J[2],fixed:!0,show:!0,theme:L.LIGHT,useLockPage:!0,showFullScreen:!0,showDoc:!0,showNotice:!0,showSearch:!0},menuSetting:{bgColor:Y[1],fixed:!0,collapsed:!1,menuWidth:200,mode:X.INLINE,type:j.MIX,theme:L.LIGHT,split:!0,mixSideTrigger:K.HOVER,mixSideFixed:!1},multiTabsSetting:{show:!0,iconShow:!0},transitionSetting:{enable:!0,basicTransition:q.FADE_SIDE,openPageLoading:!0,openNProgress:!1},openKeepAlive:!0,lockTime:0,showBreadCrumb:!0,showBreadCrumbIcon:!1,useErrorHandle:!1,canEmbedIFramePage:!0,closeMessageOnSwitch:!0,removeAllHttpPending:!1}),actions:{},persist:{enabled:!0,strategies:[{storage:localStorage}]}});const Ee={class:"menu-title-size"},Se=S({setup(t){const s=P();return(c,u)=>(_(),g("div",{class:"menu-title",style:b({color:e(s).menuSetting.bgColor==="#ffffff"?"rgba(0, 0, 0, 1)":"#FFF"})},[n(e(ae)),O(o("div",Ee,"\u4EA7\u54C1\u7BA1\u7406",512),[[$,!e(s).menuSetting.collapsed]])],4))}});var Be=B(Se,[["__scopeId","data-v-94a19070"]]);const De=S({setup(t){return(s,c)=>{const u=p("router-view");return _(),C(u,null,{default:r(({Component:a})=>[(_(),C(ne(a)))]),_:1})}}});const k=t=>(V("data-v-246fa315"),t=t(),M(),t),xe=k(()=>o("div",{class:"attribute-separator"},[o("span",{class:"attribute-separator-text"},"\u9876\u680F\u4E3B\u9898")],-1)),Ae={class:"theme-color-div"},Pe=["onClick"],Ie=k(()=>o("div",{class:"attribute-separator"},[o("span",{class:"attribute-separator-text"},"\u7CFB\u7EDF\u4E3B\u9898")],-1)),Oe={class:"theme-color-div"},$e=["onClick"],Te=k(()=>o("div",{class:"attribute-separator"},[o("span",{class:"attribute-separator-text"},"\u83DC\u5355\u4E3B\u9898")],-1)),Le={class:"theme-color-div"},Ue=["onClick"],He=k(()=>o("div",{class:"attribute-separator"},[o("span",{class:"attribute-separator-text"},"\u754C\u9762\u529F\u80FD")],-1)),Re={class:"attribute-switch-item"},Ne=k(()=>o("span",null,"\u6298\u53E0\u83DC\u5355",-1)),Ve={class:"attribute-switch-item"},Me=k(()=>o("span",null,"\u4FA7\u8FB9\u83DC\u5355\u624B\u98CE\u7434\u6A21\u5F0F",-1)),ze=k(()=>o("div",{class:"attribute-separator"},[o("span",{class:"attribute-separator-text"},"\u754C\u9762\u663E\u793A")],-1)),Ge={class:"attribute-switch-item"},je=k(()=>o("span",null,"\u6807\u7B7E\u9875",-1)),Xe={class:"attribute-switch-item"},Ke=k(()=>o("span",null,"\u6807\u7B7E\u9875\u56FE\u6807\u663E\u793A",-1)),We={class:"attribute-switch-item"},Ze=k(()=>o("span",null,"\u7070\u8272\u6A21\u5F0F",-1)),qe={class:"attribute-switch-item"},Je=k(()=>o("span",null,"\u8272\u5F31\u6A21\u5F0F",-1)),Qe=S({setup(t){R.config({prefixCls:"ant"});const s=P(),c=u=>{u.key=="themeColor"?(s.themeColor=u.value,R.config({theme:{primaryColor:u.value}})):s[u.key].bgColor=u.value};return(u,a)=>{const f=p("a-switch");return _(),g(I,null,[xe,o("div",Ae,[(_(!0),g(I,null,T(e(J),(l,h)=>(_(),g("span",{class:"theme-color-span theme-position-span",style:b({background:l}),onClick:v=>c({key:"headerSetting",value:l})},[O(n(e(H),{style:b({color:l=="#ffffff"?"#000":"#fff"})},null,8,["style"]),[[$,l==e(s).headerSetting.bgColor]])],12,Pe))),256))]),Ie,o("div",Oe,[(_(!0),g(I,null,T(e(Q),(l,h)=>(_(),g("span",{class:"theme-color-span theme-position-span",style:b({background:l}),onClick:v=>c({key:"themeColor",value:l})},[O(n(e(H),{style:b({color:l=="#ffffff"?"#000":"#fff"})},null,8,["style"]),[[$,l==e(s).themeColor]])],12,$e))),256))]),Te,o("div",Le,[(_(!0),g(I,null,T(e(Y),(l,h)=>(_(),g("span",{class:"theme-color-span theme-position-span",style:b({background:l}),onClick:v=>c({key:"menuSetting",value:l})},[O(n(e(H),{style:b({color:l=="#ffffff"?"#000":"#fff"})},null,8,["style"]),[[$,l==e(s).menuSetting.bgColor]])],12,Ue))),256))]),He,o("div",Re,[Ne,n(f,{"checked-children":"\u5F00","un-checked-children":"\u5173",checked:e(s).menuSetting.collapsed,"onUpdate:checked":a[0]||(a[0]=l=>e(s).menuSetting.collapsed=l)},null,8,["checked"])]),o("div",Ve,[Me,n(f,{"checked-children":"\u5F00","un-checked-children":"\u5173",checked:e(s).menuSetting.split,"onUpdate:checked":a[1]||(a[1]=l=>e(s).menuSetting.split=l)},null,8,["checked"])]),ze,o("div",Ge,[je,n(f,{"checked-children":"\u5F00","un-checked-children":"\u5173",checked:e(s).multiTabsSetting.show,"onUpdate:checked":a[2]||(a[2]=l=>e(s).multiTabsSetting.show=l)},null,8,["checked"])]),o("div",Xe,[Ke,n(f,{"checked-children":"\u5F00","un-checked-children":"\u5173",checked:e(s).multiTabsSetting.iconShow,"onUpdate:checked":a[3]||(a[3]=l=>e(s).multiTabsSetting.iconShow=l)},null,8,["checked"])]),o("div",We,[Ze,n(f,{"checked-children":"\u5F00","un-checked-children":"\u5173",checked:e(s).grayMode,"onUpdate:checked":a[4]||(a[4]=l=>e(s).grayMode=l)},null,8,["checked"])]),o("div",qe,[Je,n(f,{"checked-children":"\u5F00","un-checked-children":"\u5173",checked:e(s).colorWeak,"onUpdate:checked":a[5]||(a[5]=l=>e(s).colorWeak=l)},null,8,["checked"])])],64)}}});var Ye=B(Qe,[["__scopeId","data-v-246fa315"]]);const et=t=>(V("data-v-ba46b012"),t=t(),M(),t),tt={class:"app-container"},st=et(()=>o("div",{class:"text-center"},null,-1)),ot={class:"list-group list-group-striped ul-css"},at={class:"list-group-item"},nt={class:"user-label-style"},lt=D(" \u7528\u6237\u540D"),ut={class:"pull-right"},rt={class:"list-group-item"},it={class:"user-label-style"},ct=D("\u7528\u6237\u6635\u79F0"),dt={class:"pull-right"},_t={class:"list-group-item"},pt={class:"user-label-style"},ft=D("\u624B\u673A\u53F7\u7801"),mt={class:"pull-right"},ht={class:"list-group-item"},vt={class:"user-label-style"},gt=D("\u7528\u6237\u90AE\u7BB1"),bt={class:"pull-right"},yt=D("\u786E\u5B9A"),Ct=S({props:{userInfovisible:{type:Boolean}},emits:["cancel"],setup(t,{emit:s}){const c=t,u=()=>{s("cancel")},a=N();return(f,l)=>{const h=p("a-card"),v=p("a-col"),w=p("a-row"),d=p("a-button"),i=p("a-modal");return _(),C(i,{visible:c.userInfovisible,"onUpdate:visible":l[0]||(l[0]=m=>c.userInfovisible=m),destroyOnClose:!0,title:"\u4E2A\u4EBA\u4FE1\u606F",method:"info",onCancel:u},{footer:r(()=>[n(d,{key:"back",type:"primary",onClick:u},{default:r(()=>[yt]),_:1})]),default:r(()=>[o("div",tt,[n(w,{gutter:20},{default:r(()=>[n(v,{span:6,xs:24},{default:r(()=>[n(h,{class:"box-card"},{default:r(()=>[o("div",null,[st,o("ul",ot,[o("li",at,[o("span",nt,[n(e(le)),lt]),o("div",ut,A(e(a).account.userName),1)]),o("li",rt,[o("span",it,[n(e(ue)),ct]),o("div",dt,A(e(a).account.nickName),1)]),o("li",_t,[o("span",pt,[n(e(re)),ft]),o("div",mt,A(e(a).account.phoneNumber),1)]),o("li",ht,[o("span",vt,[n(e(ie)),gt]),o("div",bt,A(e(a).account.email),1)])])])]),_:1})]),_:1})]),_:1})])]),_:1},8,["visible"])}}});var kt=B(Ct,[["__scopeId","data-v-ba46b012"]]);const wt={class:"app-container"},Ft=S({props:{userPasswordvisible:{type:Boolean}},emits:["cancel"],setup(t,{emit:s}){const c=t,u=x(),a=ce({originalPassword:"",newPassword:"",confirmPassword:""}),h={originalPassword:[{required:!0,message:"\u539F\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],newPassword:[{required:!0,validator:async(d,i)=>i===""?Promise.reject("\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A\uFF01"):(a.confirmPassword!==""&&u.value.validateFields("confirmPassword"),Promise.resolve()),trigger:"blur"}],confirmPassword:[{required:!0,validator:async(d,i)=>i===""?Promise.reject("\u4E8C\u6B21\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A\uFF01"):i!==a.newPassword?Promise.reject("\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4E0D\u4E00\u81F4\uFF01"):Promise.resolve(),trigger:"blur"}]},v=()=>{s("cancel")},w=()=>{u.value.validate().then(()=>{console.log(a,"\u4FEE\u6539\u5BC6\u7801"),s("cancel")}).catch(()=>{console.log("error")})};return N(),(d,i)=>{const m=p("a-input-password"),y=p("a-form-item"),F=p("a-form"),U=p("a-modal");return _(),C(U,{visible:c.userPasswordvisible,"onUpdate:visible":i[3]||(i[3]=E=>c.userPasswordvisible=E),destroyOnClose:!0,title:"\u5BC6\u7801\u4FEE\u6539",method:"info","ok-text":"\u786E\u5B9A","cancel-text":"\u53D6\u6D88",onCancel:v,onOk:w},{default:r(()=>[o("div",wt,[n(F,{ref_key:"formRef",ref:u,model:e(a),style:{height:"243px"},rules:h,"label-width":"80px"},{default:r(()=>[n(y,{label:"\u539F\u5BC6\u7801",name:"originalPassword"},{default:r(()=>[n(m,{value:e(a).originalPassword,"onUpdate:value":i[0]||(i[0]=E=>e(a).originalPassword=E),placeholder:"\u8BF7\u8F93\u5165\u539F\u5BC6\u7801",type:"password","show-password":""},null,8,["value"])]),_:1}),n(y,{label:"\u65B0\u5BC6\u7801",name:"newPassword"},{default:r(()=>[n(m,{value:e(a).newPassword,"onUpdate:value":i[1]||(i[1]=E=>e(a).newPassword=E),placeholder:"\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",type:"password","show-password":""},null,8,["value"])]),_:1}),n(y,{label:"\u786E\u8BA4\u5BC6\u7801",name:"confirmPassword"},{default:r(()=>[n(m,{value:e(a).confirmPassword,"onUpdate:value":i[2]||(i[2]=E=>e(a).confirmPassword=E),placeholder:"\u8BF7\u786E\u8BA4\u5BC6\u7801",type:"password","show-password":""},null,8,["value"])]),_:1})]),_:1},8,["model"])])]),_:1},8,["visible"])}}});var Et=B(Ft,[["__scopeId","data-v-92fcaa0a"]]);const St=t=>(V("data-v-41124071"),t=t(),M(),t),Bt=St(()=>o("div",null,"\u5BC6\u7801\u91CD\u7F6E\u6210\u529F,\u8BF7\u91CD\u65B0\u767B\u5F55",-1)),Dt=D("\u786E\u5B9A"),xt=S({setup(t){const s=N(),c=P(),u=x(!1),a=x(!1),f=x(!1),l=()=>{a.value=!0},h=i=>{a.value=!1,f.value=!1,i.type=="loginOut"&&(u.value=!0)},v=()=>{f.value=!0},w=()=>{u.value=!1,s.loginOut()},d=()=>{pe.confirm({title:()=>"\u662F\u5426\u786E\u5B9A\u9000\u51FA\u7CFB\u7EDF?",icon:()=>n(fe),okText:"\u786E\u8BA4",cancelText:"\u53D6\u6D88",onOk(){s.loginOut()},class:"test"})};return(i,m)=>{const y=p("a-menu-item"),F=p("a-menu"),U=p("a-dropdown"),E=p("a-button"),ee=p("a-modal");return _(),g("div",null,[n(U,null,{overlay:r(()=>[n(F,null,{default:r(()=>[n(y,null,{default:r(()=>[o("span",{onClick:l},"\u4E2A\u4EBA\u4E2D\u5FC3")]),_:1}),n(y,null,{default:r(()=>[o("span",{onClick:v},"\u4FEE\u6539\u5BC6\u7801")]),_:1}),n(y,null,{default:r(()=>[o("span",{onClick:d},"\u9000\u51FA\u767B\u5F55")]),_:1})]),_:1})]),default:r(()=>[o("a",{class:"ant-dropdown-link",onClick:m[0]||(m[0]=_e(()=>{},["prevent"])),style:b({color:e(c).headerSetting.bgColor=="#ffffff"?"#000000":"#ffFfff"})},[D(A(e(s).account.nickName?e(s).account.nickName:"\u6E38\u5BA2")+" ",1),n(e(de))],4)]),_:1}),n(kt,{onCancel:h,userInfovisible:a.value},null,8,["userInfovisible"]),n(Et,{onCancel:h,userPasswordvisible:f.value},null,8,["userPasswordvisible"]),n(ee,{visible:u.value,"onUpdate:visible":m[1]||(m[1]=te=>u.value=te),closable:!1,title:"\u63D0\u793A"},{footer:r(()=>[n(E,{key:"submit",type:"primary",onClick:w},{default:r(()=>[Dt]),_:1})]),default:r(()=>[Bt]),_:1},8,["visible"])])}}});var At=B(xt,[["__scopeId","data-v-41124071"]]);const Pt={class:"user-information"},It={class:"user-information-title"},Ot=S({setup(t){const s=G(),c=P(),u=x(!1),a=()=>{s.push({name:"Home"})},f=()=>{u.value=!0},l=h=>{u.value=!1};return(h,v)=>(_(),g("div",Pt,[n(e(me),{title:"\u8FD4\u56DE\u9996\u9875",style:{"margin-right":"5px"},onClick:a}),n(e(he)),o("span",It,[n(At)]),e(c).showSettingButton?(_(),C(e(ve),{key:0,style:{"margin-left":"5px"},onClick:f})):z("",!0),n(Fe,{width:"330px",visible:u.value,drawerTitle:"\u5C5E\u6027\u914D\u7F6E",onDrawerFun:l},{drawerForm:r(()=>[n(Ye)]),_:1},8,["visible"])]))}});var $t=B(Ot,[["__scopeId","data-v-1df43927"]]);const Tt=S({setup(t){const s=P(),c=x([{title:"\u7CFB\u7EDF\u9762\u677F",key:"Home",icon:"icon-home",closable:!1}]),u=x("Home"),a=ge(),f=G();be(()=>a.path,(d,i)=>{l()});const l=()=>{let d=1;c.value.forEach(i=>{i.key==a.name&&(d=2)}),d==1&&c.value.push({title:a.meta.name,key:a.name,icon:a.meta.icon}),u.value=a.name?a.name:"Home"};l();const h=d=>{debugger;let i=0;c.value.forEach((m,y)=>{m.key===d&&(i=y-1)}),c.value=c.value.filter(m=>m.key!==d),c.value.length&&u.value===d&&(i>=0?u.value=c.value[i].key:u.value=c.value[0].key,f.push({name:u.value}))},v=d=>{a.name!=d&&f.push({name:d})},w=(d,i)=>{h(d)};return(d,i)=>{const m=p("a-tab-pane"),y=p("a-tabs");return _(),C(y,{activeKey:u.value,"onUpdate:activeKey":i[0]||(i[0]=F=>u.value=F),class:"product-tabs","hide-add":"",type:"editable-card",onEdit:w,onChange:v},{default:r(()=>[(_(!0),g(I,null,T(c.value,F=>(_(),C(m,{key:F.key,closable:F.closable},{tab:r(()=>[o("span",null,[e(s).multiTabsSetting.iconShow?(_(),g("i",{key:0,class:ye("iconfont "+F.icon)},null,2)):z("",!0),D(" "+A(F.title),1)])]),_:2},1032,["closable"]))),128))]),_:1},8,["activeKey"])}}});var Lt=B(Tt,[["__scopeId","data-v-b8feeab0"]]);const Ut=S({setup(t){const s=P(),c=Ce(()=>se(()=>import("./menu-bar.bbc1c37b.js"),["assets/menu-bar.bbc1c37b.js","assets/menu-bar.645958b9.css","assets/vendor.69bb0da0.js","assets/index.4a9bdc9c.js","assets/index.7af26206.css","assets/base-ant-drawer.41d9aad8.js","assets/base-ant-drawer.dd422aa0.css"]));return s.themeColor&&R.config({theme:{primaryColor:s.themeColor}}),(u,a)=>{const f=p("a-layout-sider"),l=p("a-button"),h=p("a-layout-header"),v=p("a-layout-content"),w=p("a-layout");return _(),C(w,{class:"layout"},{default:r(()=>[n(f,{style:b({background:e(s).menuSetting.bgColor,color:e(s).menuSetting.bgColor=="#ffffff"?"#000000":"#ffFfff"}),collapsed:e(s).menuSetting.collapsed,"onUpdate:collapsed":a[0]||(a[0]=d=>e(s).menuSetting.collapsed=d),trigger:null,collapsible:""},{default:r(()=>[n(Be,{collapsed:e(s).menuSetting.collapsed},null,8,["collapsed"]),n(e(c),{style:{"border-right":"none"},collapsed:e(s).menuSetting.collapsed},null,8,["collapsed"])]),_:1},8,["style","collapsed"]),n(w,null,{default:r(()=>[n(h,{style:b({background:e(s).headerSetting.bgColor,color:e(s).headerSetting.bgColor=="#ffffff"?"#000000":"#ffFfff"}),class:"layout-header"},{default:r(()=>[o("span",null,[n(l,{onClick:a[1]||(a[1]=d=>e(s).menuSetting.collapsed=!e(s).menuSetting.collapsed),style:b({background:e(s).themeColor,border:"none","margin-bottom":"16px",color:e(s).themeColor=="#ffffff"?"#000":"#fff"})},{default:r(()=>[e(s).menuSetting.collapsed?(_(),C(e(ke),{key:0})):(_(),C(e(we),{key:1}))]),_:1},8,["style"])]),n($t)]),_:1},8,["style"]),n(v,{style:{margin:"24px 16px",background:"#f0f2f5",minHeight:"280px",height:"100%"}},{default:r(()=>[e(s).multiTabsSetting.show?(_(),C(Lt,{key:0})):z("",!0),n(De,{style:b({height:e(s).multiTabsSetting.show?"calc(100% - 45px)":"100%"})},null,8,["style"])]),_:1})]),_:1})]),_:1})}}});var Ht=B(Ut,[["__scopeId","data-v-c51a498c"]]),Mt=Object.freeze(Object.defineProperty({__proto__:null,default:Ht},Symbol.toStringTag,{value:"Module"}));export{Mt as h,P as s};
