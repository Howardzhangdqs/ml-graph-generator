import{d as i,j as m,g as d,k as f,m as y,l as b,o as p,c as _,f as M,p as h,_ as v,h as R}from"./index-KutmUbA1.js";import{n as z,r as C,B as F,M as N,N as $}from"./NormalModule-CNffFcEc.js";const D=(...a)=>{},V=i({__name:"Functional",props:{name:{default:"\\mathcal{F}"},color:{default:"#fff"},math:{type:Boolean,default:!0}},setup(a,{expose:c}){m(o=>({eb89e8d0:e.color,c9ea3daa:`${s.value}px`}));const e=a,t=d(),s=d(1e3);f(()=>{var r,u;const o=new ResizeObserver(z(B=>{for(const g of B){const{width:k,height:x}=g.contentRect;s.value=Math.max(k,x),D(s.value)}}));s.value=Math.max(((r=t.value)==null?void 0:r.dom).offsetWidth??0,((u=t.value)==null?void 0:u.dom).offsetHeight??0)??0,o.observe(t.value.$el)});const n=d(),l=y([]);return f(()=>{b(C(n.value,()=>{const o=n.value.getBoundingClientRect();l.length=0,F(o,l)}))}),c({keypoints:l,el:n}),(o,r)=>(p(),_("div",null,[M("div",{class:"functional-module",ref_key:"self",ref:n},[h(N,{content:e.name,math:e.math,ref_key:"mathDisplay",ref:t},null,8,["content","math"])],512)]))}}),S=v(V,[["__scopeId","data-v-0d2f8e13"]]),w={class:"block-module"},E=i({__name:"Block",props:{color:{default:"#ff01"}},setup(a){m(e=>({de50b246:c.color}));const c=a;return(e,t)=>(p(),_("div",w,[R(e.$slots,"default",{},()=>[h($)],!0)]))}}),j=v(E,[["__scopeId","data-v-a399e0d9"]]);export{j as B,S as F,D as l};