var $=Object.defineProperty,K=Object.defineProperties;var v=Object.getOwnPropertyDescriptors;var g=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var y=(e,t,n)=>t in e?$(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,T=(e,t)=>{for(var n in t||(t={}))A.call(t,n)&&y(e,n,t[n]);if(g)for(var n of g(t))F.call(t,n)&&y(e,n,t[n]);return e},p=(e,t)=>K(e,v(t));import{j as L,a as S,F as x,p as O,l as D,S as G}from"./vendor.1681d769.js";const R=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}};R();function E(e){let t=e;return t=t^t<<13,t=t^t>>>17,t=t^t<<5,Math.abs(t)}function B(e){const t=parseInt(`${e.getFullYear()}${e.getMonth()}${e.getDate()}`);return E(t)}function M(){return B(new Date)}var j=[{name:"\u51FD\u9928",match:"\u51FD\u9928",word:"NITHC"},{name:"\u82EB\u5C0F\u7267",match:"\u82EB\u5C0F\u7267",word:"NITTC"},{name:"\u91E7\u8DEF",match:"\u91E7\u8DEF",word:"NITKC"},{name:"\u65ED\u5DDD",match:"\u65ED\u5DDD",word:"NITAC"},{name:"\u516B\u6238",match:"\u516B\u6238",word:"NITHC"},{name:"\u4E00\u95A2",match:"\u4E00\u95A2",word:"NITIC"},{name:"\u4ED9\u53F0",match:"\u4ED9\u53F0",word:"NITSC"},{name:"\u79CB\u7530",match:"\u79CB\u7530",word:"NITAC"},{name:"\u9DB4\u5CA1",match:"\u9DB4\u5CA1",word:"NITTC"},{name:"\u798F\u5CF6",match:"\u798F\u5CF6",word:"NITFC"},{name:"\u8328\u57CE",match:"\u8328\u57CE",word:"NITIC"},{name:"\u5C0F\u5C71",match:"\u5C0F\u5C71",word:"NITOC"},{name:"\u7FA4\u99AC",match:"\u7FA4\u99AC",word:"NITGC"},{name:"\u6728\u66F4\u6D25",match:"\u6728\u66F4\u6D25",word:"NITKC"},{name:"\u6771\u4EAC",match:"\u6771\u4EAC",word:"NITTC"},{name:"\u90FD\u7ACB\u7523\u6280",match:"\u6771\u4EAC\u90FD\u7ACB\u7523\u696D\u6280\u8853|\u90FD\u7ACB|\u90FD\u7ACB\u7523\u6280|\u7523\u6280",word:"TMCIT"},{name:"\u30B5\u30EC\u30B8\u30AA",match:"\u30B5\u30EC\u30B8\u30AA",word:"SALESIO",pos:-1},{name:"\u9577\u5CA1",match:"\u9577\u5CA1",word:"NITNC"},{name:"\u5BCC\u5C71",match:"\u5BCC\u5C71",word:"NITTC"},{name:"\u77F3\u5DDD",match:"\u77F3\u5DDD",word:"NITIC"},{name:"\u56FD\u969B",match:"\u56FD\u969B",word:"ICT",pos:1},{name:"\u798F\u4E95",match:"\u798F\u4E95",word:"NITFC"},{name:"\u9577\u91CE",match:"\u9577\u91CE",word:"NITNC"},{name:"\u5C90\u961C",match:"\u5C90\u961C",word:"NITGC"},{name:"\u6CBC\u6D25",match:"\u6CBC\u6D25",word:"NITNC"},{name:"\u8C4A\u7530",match:"\u8C4A\u7530",word:"NITTC"},{name:"\u9CE5\u7FBD\u5546\u8239",match:"\u9CE5\u7FBD\u5546\u8239",word:"NITTC"},{name:"\u9234\u9E7F",match:"\u9234\u9E7F",word:"NITSC"},{name:"\u8FD1\u5927",match:"\u8FD1\u757F\u5927\u5B66|\u8FD1\u5927",word:"KUTC"},{name:"\u821E\u9DB4",match:"\u821E\u9DB4",word:"NITMC"},{name:"\u5E9C\u5927",match:"\u5927\u962A\u5E9C\u7ACB\u5927\u5B66|\u5E9C\u5927",word:"OPUCT"},{name:"\u660E\u77F3",match:"\u660E\u77F3",word:"NITAC"},{name:"\u795E\u6238",match:"\u795E\u6238\u5E02\u7ACB|\u795E\u6238",word:"KCCT"},{name:"\u5948\u826F",match:"\u5948\u826F",word:"NITNC"},{name:"\u548C\u6B4C\u5C71",match:"\u548C\u6B4C\u5C71",word:"NITWC"},{name:"\u7C73\u5B50",match:"\u7C73\u5B50",word:"NITYC"},{name:"\u677E\u6C5F",match:"\u677E\u6C5F",word:"NITMC"},{name:"\u6D25\u5C71",match:"\u6D25\u5C71",word:"NITTC"},{name:"\u5E83\u5CF6\u5546\u8239",match:"\u5E83\u5CF6\u5546\u8239",word:"NITHC"},{name:"\u5449",match:"\u5449",word:"NITKC"},{name:"\u5FB3\u5C71",match:"\u5FB3\u5C71",word:"NITTC"},{name:"\u5B87\u90E8",match:"\u5B87\u90E8",word:"NITUC"},{name:"\u5927\u5CF6\u5546\u8239",match:"\u5927\u5CF6\u5546\u8239",word:"NITOC"},{name:"\u963F\u5357",match:"\u963F\u5357",word:"NITAC"},{name:"\u9999\u5DDD",match:"\u9999\u5DDD",word:"NITKC"},{name:"\u65B0\u5C45\u6D5C",match:"\u65B0\u5C45\u6D5C",word:"NITNC"},{name:"\u5F13\u524A\u5546\u8239",match:"\u5F13\u524A\u5546\u8239",word:"NITYC"},{name:"\u9AD8\u77E5",match:"\u9AD8\u77E5",word:"NITKC"},{name:"\u5317\u4E5D\u5DDE",match:"\u5317\u4E5D\u5DDE",word:"NITKIT"},{name:"\u4E45\u7559\u7C73",match:"\u4E45\u7559\u7C73",word:"NITKC"},{name:"\u6709\u660E",match:"\u6709\u660E",word:"NITAC"},{name:"\u4F50\u4E16\u4FDD",match:"\u4F50\u4E16\u4FDD",word:"NITSC"},{name:"\u718A\u672C",match:"\u718A\u672C",word:"NITKC"},{name:"\u5927\u5206",match:"\u5927\u5206",word:"NITOC"},{name:"\u90FD\u57CE",match:"\u90FD\u57CE",word:"NITMC"},{name:"\u9E7F\u5150\u5CF6",match:"\u9E7F\u5150\u5CF6",word:"NITKC"},{name:"\u6C96\u7E04",match:"\u6C96\u7E04",word:"NITOC"}];const a=L,h=S,i=x;function q(e){return h(i,{children:[a("header",{children:"Kosenle"}),a("main",{children:e.children})]})}const I=6,C=5;class k{constructor(t){this.str=t.str,this.pos=t.pos}equals(t){return this.str===t.str&&this.pos===t.pos}}const N=j.map(({name:e,match:t,word:n,pos:s=0})=>({name:`${e}\u9AD8\u5C02`,matches:r=>new RegExp(`^(${t})(|\u9AD8\u5C02)$`).test(r.trim()),word:new k({str:n,pos:s})}));function l({char:e,state:t}){return a("div",{class:`box ${t}`,children:t!="secret"&&a("span",{class:"char",children:e})})}function b(){const e=N[M()%N.length];return{status:"playing",result:null,ans:e.word,rows:[...Array(I)].fill(null),cur:0,input:""}}function U(e,t){switch(t.type){case"reset":return b();case"input":return p(T({},e),{status:e.status==="notInList"?"playing":e.status,input:t.payload});case"submit":{if(e.status==="end")return e;const n=N.find(s=>s.matches(e.input));if(n===void 0)return p(T({},e),{status:"notInList"});{const s=e.rows.slice();s[e.cur]=n.word;const r=n.word.equals(e.ans)||e.cur>=I-1?"end":e.status,o=r!=="end"?e.result:n.word.equals(e.ans)?"win":e.cur>=I-1?"lose":e.result;return p(T({},e),{status:r,result:o,rows:s,cur:e.cur+1,input:""})}}default:return e}}function _(){const[e,t]=O(U,b());return h(i,{children:[a("div",{class:"tab",children:e.rows.map(n=>h("div",{class:"row",children:[n===null?[...Array(C)].fill(a(l,{state:"secret"})):n.str.split("").map((s,r)=>{const o=e.ans,c=o.pos-n.pos;return c<=r&&r<o.str.length+c&&o.str[r-c]===s?a(l,{char:s,state:"correct"}):o.str.includes(s)?a(l,{char:s,state:"present"}):a(l,{char:s,state:"absent"})}),n===null||n.str.length%2?null:e.result==="win"&&e.ans.equals(n)?a(l,{state:"correct"}):a(l,{state:"blank"})]}))}),a("form",{onSubmit:n=>{n.preventDefault(),e.input!==""&&t({type:"submit"})},children:a("input",{class:`input ${e.status==="notInList"?"notInList":""}`,disabled:e.status==="end",placeholder:"hoge\u9AD8\u5C02",value:e.input,onChange:n=>{t({type:"input",payload:n.target.value})}})}),e.status==="end"&&a(H,{state:e})]})}function H({state:e}){const[t,n]=D(!0);let s="",r=0;e.rows.forEach(c=>{if(c!==null){let u=c.str.split("").map((d,m)=>{const w=e.ans,f=w.pos-c.pos;return f<=m&&m<w.str.length+f&&w.str[m-f]===d?"\u{1F7E9}":w.str.includes(d)?"\u{1F7E8}":"\u2B1B"}).join("");if(!(c.str.length%2))c.str===e.ans.str?u+="\u{1F7E9}":u+="\u2B1B";else if(c.str.length<C){let d="";for(let m=0;m<(C-c.str.length)/2;++m)d+="\u3000";u=d+u}s+=`${u}
`,++r}});const o=`Kosenle ${e.result==="lose"?"X":`${r}`}/${I}

${s}`;return a(i,{children:t&&a("div",{class:"overlay",children:h("div",{class:"result",children:[a("button",{class:"close",onClick:()=>{n(!1)},children:"x"}),e.result==="win"&&a(i,{children:a("h2",{children:"Win!!"})}),e.result==="lose"&&h(i,{children:[a("h2",{children:"Game Over"}),a("p",{children:"\u{1F62D}"})]}),a("pre",{children:s.replaceAll("\u3000","")}),a("a",{href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(o)}`,target:"_blank",children:"Tweet"})]})})})}function P(){return a(q,{children:a(_,{})})}G(a(P,{}),document.getElementById("app"));console.log("%c\u3053\u3093\u306B\u3061\u306F!","color: #FF0000; font-size: 8em; font-weight: bold;");
