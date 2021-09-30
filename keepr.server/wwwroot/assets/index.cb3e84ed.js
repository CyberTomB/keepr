import{r as e,a as t,c as a,o,b as s,d as l,F as r,e as n,w as i,v as c,f as d,S as u,C as p,$ as m,g as v,p as g,h as f,i as b,j as k,t as h,k as y,l as w,m as _,n as V,q as C,s as x,u as S,x as P,y as T,z as A,A as K,B as z}from"./vendor.9dd95e55.js";const O=e(!1),M=e(window.innerWidth);window.onresize=function(){M.value=window.innerWidth,O.value=M.value<764};const I=t({user:{},account:{},keeps:[],profile:{},vaults:[],activeVault:{},yourVaults:[],activeKeep:{},github:{},screenSize:M,isMobile:O});const j={name:"App",setup:()=>({appState:a((()=>I))})},E=l("footer",null,[l("div",{class:"bg-dark text-light text-center p-4"}," Made with 🍕 by Tom Bowers ")],-1);j.render=function(e,t,a,i,c,d){const u=n("Navbar"),p=n("router-view");return o(),s(r,null,[l("header",null,[l(u)]),l("main",null,[l(p)]),E],64)};const L={},D={class:"container"},U=l("div",{class:"row h-100 align-items-center"},[l("div",{class:"col text-center"},[l("img",{src:"/assets/bean-eater.97f65856.svg",alt:"loading..."}),l("h2",null,"Loading...")])],-1);L.render=function(e,t){return o(),s("div",D,[U])};var R=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:L});const $={},B={class:"modal-body"},q={class:"form-group"},H=l("label",{for:"keep-name"},"Name:",-1),N={class:"form-group"},F=l("label",{for:"keep-img"},"Image URL:",-1),W={class:"form-group"},Y=l("label",{for:"keep-description"},"Description:",-1),G=l("div",{class:"modal-footer"},[l("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal","aria-label":"Close",title:"Close"}," Close "),l("button",{type:"submit",class:"btn btn-primary"}," Create Keep ")],-1);$.render=function(e,t){return o(),s("form",{onSubmit:t[4]||(t[4]=d((t=>e.emit$("create")),["prevent"]))},[l("div",B,[l("div",q,[H,i(l("input",{type:"text",name:"keep-name",id:"keep-name",maxlength:"80",placeholder:"New keep",class:"form-control","onUpdate:modelValue":t[1]||(t[1]=t=>e.state.keep.name=t),required:""},null,512),[[c,e.state.keep.name]])]),l("div",N,[F,i(l("input",{type:"text",name:"keep-img",id:"keep-img",placeholder:"http//www.newimage.com",class:"form-control","onUpdate:modelValue":t[2]||(t[2]=t=>e.state.keep.img=t),required:""},null,512),[[c,e.state.keep.img]])]),l("div",W,[Y,i(l("textarea",{name:"keep-description",id:"keep-description",minlength:"3",placeholder:"Tell us about it...",class:"form-control","onUpdate:modelValue":t[3]||(t[3]=t=>e.state.keep.description=t)},"\r\n              ",512),[[c,e.state.keep.description]])])]),G],32)};var X=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:$});const J=window.location.origin.includes("localhost"),Q=J?"https://localhost:5001":"";function Z(e,t){if(J)console[e](`[${e}] :: ${(new Date).toLocaleTimeString()} :: `,...t);else{switch(e){case"log":case"assert":return}console[e](`[${e}] :: ${(new Date).toLocaleTimeString()} :: `,...t)}}const ee={log(){Z("log",arguments)},error(){Z("error",arguments)},warn(){Z("warn",arguments)},assert(){Z("assert",arguments)},trace(){Z("trace",arguments)}};class te{static async confirm(e="Are you sure?",t="You won't be able to revert this!",a="warning",o="Yes, delete it!"){try{return!!(await u.fire({title:e,text:t,icon:a,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:o})).isConfirmed}catch(s){return!1}}static toast(e="Warning!",t="warning",a="top-end",o=3e3,s=!0){u.fire({title:e,icon:t,position:a,timer:o,timerProgressBar:s,toast:!0,showConfirmButton:!1})}}const ae=p.create({baseURL:Q,timeout:8e3}),oe=p.create({baseURL:"https://api.github.com",timeout:8e3});const se=new class{async getAll(){try{const e=await ae.get("/api/keeps");ee.log(e.data),I.keeps=e.data,I.activeKeep=e.data[0]}catch(e){ee.error("Keeps Service GetAll",e),te.toast(e,"error")}}async getAllByProfile(e){try{const t=await ae.get(`/api/profiles/${e}/keeps`);ee.log(t.data),I.keeps=t.data}catch(t){ee.error("Keeps",t),te.toast(t,"error")}}async getAllByVault(e){try{const t=await ae.get(`/api/vaults/${e}/keeps`);ee.log(t.data),I.keeps=t.data}catch(t){ee.error("Vaults",t),te.toast(t,"error")}}async getOne(e){try{const t=await ae.get("/api/keeps/"+e);ee.log(t.data),I.activeKeep=t.data}catch(t){ee.error("Keeps Service GetOne",t),te.toast(t,"error")}}async addToVault(e,t){try{const a={CreatorId:I.account.id,VaultId:e,KeepId:t},o=await ae.post("/api/vaultkeeps",a);return ee.log(o.data),!0}catch(a){return ee.error("Keeps Add Vault",a),te.toast(a,"error"),!1}}async removeFromVault(e){try{const t=await ae.delete("/api/vaultkeeps/"+e);ee.log("remove keep:",t.data),I.keeps=I.keeps.filter((t=>t.vaultKeepId!==e))}catch(t){ee.error("Keeps Remove Vault",t),te.toast(t,"error")}}async create(e){try{const t=await ae.post("api/keeps/",e);ee.log(t.data),I.keeps.push(t.data)}catch(t){te.toast(t,"error")}}async delete(e){try{const t=await ae.delete("/api/keeps/"+e);te.toast("Deleted","success","bottom-end"),ee.log("delete keep: "+e,t.data),I.keeps=I.keeps.filter((t=>t.id!==e))}catch(t){ee.error("Keep Delete"+e,t),te.toast(t,"error")}}};const le=new class{close(e){m(e).modal("hide"),m("body").removeClass("modal-open"),m(".modal-backdrop").remove()}},re={setup(){const e=t({keep:{name:"",img:"",description:""}});return{state:e,closeModal:le.close("#createKeep"),async createKeep(){try{await se.create(e.keep),te.toast("Created Keep","success","bottom-end"),e.keep={name:"",img:"",description:""}}catch(t){te.toast(t,"error")}le.close("#createKeep")}}}},ne={class:"modal fade",id:"createKeep",tabindex:"-1",role:"dialog","aria-labelledby":"Create Keep","aria-hidden":"true"},ie={class:"modal-dialog",role:"form"},ce={class:"modal-content"},de=l("div",{class:"modal-header"},[l("h5",{class:"modal-title"}," Create Keep "),l("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close",title:"Close"},[l("span",{"aria-hidden":"true"},"×")])],-1),ue={class:"modal-body"},pe={class:"form-group"},me=l("label",{for:"keep-name"},"Name:",-1),ve={class:"form-group"},ge=l("label",{for:"keep-img"},"Image URL:",-1),fe={class:"form-group"},be=l("label",{for:"keep-description"},"Description:",-1),ke=l("div",{class:"modal-footer"},[l("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal","aria-label":"Close",title:"Close"}," Close "),l("button",{type:"submit",class:"btn btn-success"}," Create Keep ")],-1);re.render=function(e,t,a,r,n,u){return o(),s("div",ne,[l("div",ie,[l("div",ce,[de,l("form",{onSubmit:t[4]||(t[4]=d(((...e)=>r.createKeep&&r.createKeep(...e)),["prevent"]))},[l("div",ue,[l("div",pe,[me,i(l("input",{type:"text",name:"keep-name",id:"keep-name",maxlength:"80",placeholder:"New keep",class:"form-control","onUpdate:modelValue":t[1]||(t[1]=e=>r.state.keep.name=e),required:""},null,512),[[c,r.state.keep.name]])]),l("div",ve,[ge,i(l("input",{type:"text",name:"keep-img",id:"keep-img",placeholder:"http//www.newimage.com",class:"form-control","onUpdate:modelValue":t[2]||(t[2]=e=>r.state.keep.img=e),required:""},null,512),[[c,r.state.keep.img]])]),l("div",fe,[be,i(l("textarea",{name:"keep-description",id:"keep-description",minlength:"3",placeholder:"Tell us about it...",class:"form-control","onUpdate:modelValue":t[3]||(t[3]=e=>r.state.keep.description=e)},"\r\n              ",512),[[c,r.state.keep.description]])])]),ke],32)])])])};var he=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:re});var ye=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:{}});const we=new class{async getAllByProfile(e,t=!1){ee.log("vaultservice",e);try{const a=await ae.get(`/api/profiles/${e}/vaults`);ee.log(a.data),t&&(I.yourVaults=a.data),I.vaults=a.data}catch(a){ee.error("Vaults",a),te.toast(a,"error")}}async getOne(e){const t={isValid:!0,isPrivate:!1};try{const a=await ae.get("/api/vaults/"+e);return ee.log(a.data),I.activeVault=a.data,t.isPrivate=a.data.isPrivate,t}catch(a){return ee.error("Vaults",a),te.toast(a,"error"),t.isValid=!1,t}}async create(e){try{const t=await ae.post("/api/vaults",e);ee.log(t.data),I.yourVaults.push(t.data)}catch(t){te.toast(t,"error")}}async delete(e){try{const t=await ae.delete("/api/vaults/"+e);ee.log(t.data),te.toast("Deleted "+t.data.name,"success","bottom-end"),I.vaults=I.vaults.filter((e=>e.id!==t.data.id))}catch(t){te.toast(t,"error")}}async edit(e){try{const t=await ae.put("/api/vaults/"+e.id,e);return te.toast("Updated","success","bottom-end",2e3),ee.log(t.data),I.activeVault=t.data,t.data}catch(t){ee.error("Vault update",t),te.toast(t,"error")}}},_e={setup(){const e=t({vault:{name:"",description:"",isPrivate:!1}});return{state:e,closeModal:le.close("#createVault"),async createVault(){try{await we.create(e.vault),te.toast("Created Vault","success","bottom-end"),e.vault={name:"",description:"",isPrivate:!1}}catch(t){te.toast(t,"error")}le.close("#createVault")}}}},Ve={class:"modal fade",id:"createVault",tabindex:"-1",role:"dialog","aria-labelledby":"Create vault","aria-hidden":"true"},Ce={class:"modal-dialog",role:"form"},xe={class:"modal-content"},Se=l("div",{class:"modal-header"},[l("h5",{class:"modal-title"}," Create Vault "),l("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close",title:"Close"},[l("span",{"aria-hidden":"true"},"×")])],-1),Pe={class:"modal-body"},Te={class:"form-group"},Ae=l("label",{for:"vault-name"},"Name:",-1),Ke={class:"form-group"},ze=l("label",{for:"vault-description"},"Description:",-1),Oe={class:"form-check"},Me=l("label",{for:"isPrivate",class:"form-check-label"},"Private?",-1),Ie=l("div",{class:"modal-footer"},[l("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal","aria-label":"Close",title:"Close"}," Close "),l("button",{type:"submit",class:"btn btn-success"}," Create Vault ")],-1);_e.render=function(e,t,a,r,n,u){return o(),s("div",Ve,[l("div",Ce,[l("div",xe,[Se,l("form",{onSubmit:t[4]||(t[4]=d(((...e)=>r.createVault&&r.createVault(...e)),["prevent"]))},[l("div",Pe,[l("div",Te,[Ae,i(l("input",{type:"text",name:"vault-name",id:"vault-name",maxlength:"80",placeholder:"New vault",class:"form-control","onUpdate:modelValue":t[1]||(t[1]=e=>r.state.vault.name=e),required:""},null,512),[[c,r.state.vault.name]])]),l("div",Ke,[ze,i(l("textarea",{name:"vault-description",id:"vault-description",minlength:"3",placeholder:"Tell us about it...",class:"form-control","onUpdate:modelValue":t[2]||(t[2]=e=>r.state.vault.description=e)},"\r\n              ",512),[[c,r.state.vault.description]])]),l("div",Oe,[i(l("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":t[3]||(t[3]=e=>r.state.vault.isPrivate=e),id:"isPrivate"},null,512),[[v,r.state.vault.isPrivate]]),Me])]),Ie],32)])])])};var je=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:_e});const Ee={};Ee.render=function(e,t){return o(),s("span",{class:"mdi mdi-delete-outline action text-danger",title:"delete",onClick:t[1]||(t[1]=d((t=>e.$emit("delete")),["stop"]))})};var Le=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Ee});const De={props:{mdi:{type:String,required:!0},iconSize:{type:String,default:"24px"},wrapSize:{type:String,default:"32px"},size:{type:String,default:"24px"},closed:{type:String,default:"text-dark"},open:{type:String,default:"bg-info"}},setup:e=>({state:t({hover:!1,closedClass:e.closed,openClass:e.open+" rounded"}),fontSize:e.size,iconSize:e.iconSize,wrapSize:e.wrapSize}),computed:{cssProps(){return{"--font-size":this.fontSize,"--icon-size":this.iconSize,"--wrap-size":this.wrapSize}}}},Ue=k("data-v-1371740d");g("data-v-1371740d");const Re={class:"inner-text"};f();const $e=Ue(((e,t,a,r,n,i)=>(o(),s("a",{style:i.cssProps,class:["align-items-center holder mdi px-2 action",[`mdi-${a.mdi}`,r.state.hover?r.state.openClass:r.state.closedClass]],onMouseover:t[1]||(t[1]=e=>r.state.hover=!0),onMouseleave:t[2]||(t[2]=e=>r.state.hover=!1)},[l("span",Re,[b(e.$slots,"default",{},void 0,!0)])],38))));De.render=$e,De.__scopeId="data-v-1371740d";var Be=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:De});const qe={props:{keep:{type:Object,required:!0},vaultView:{type:Boolean,default:!1}},setup:()=>({state:t({mouseOver:!1}),activeKeep:a((()=>I.activeKeep)),async getModal(e){try{m(`#keepModal${e}`).modal("toggle"),await se.getOne(e)}catch(t){te.toast(t,"error")}},async removeFromVault(e){try{await se.removeFromVault(e),te.toast("Removed","success","bottom-end",1e3)}catch(t){ee.error(t),te.toast(t,"error")}}})},He={class:"keep-name f-16 text-light"},Ne=_("  Remove? ");qe.render=function(e,t,a,i,c,u){const p=n("KeepDetailsModal"),m=n("IconLink");return o(),s(r,null,[l(p,{keep:a.keep},null,8,["keep"]),l("div",{class:"keep-card card my-2 shadow selectable",onClick:t[2]||(t[2]=e=>i.getModal(a.keep.id))},[l("img",{class:"keep-img action rounded",src:a.keep.img||"../assets/img/keep-placeholder.png",alt:"This image did not load."},null,8,["src"]),l("span",He,h(a.keep.name),1),l("img",{class:"keep-creator-img img-fluid",src:a.keep.creator.picture,alt:a.keep.creator.name},null,8,["src","alt"]),a.vaultView?(o(),s(m,{key:0,title:"Remove from Vault",onClick:t[1]||(t[1]=d((e=>i.removeFromVault(a.keep.vaultKeepId)),["stop"])),class:"keep-remove",mdi:"sticker-remove",closed:"text-danger",open:"bg-danger",size:"16px"},{default:y((()=>[Ne])),_:1})):w("",!0)])],64)};var Fe=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:qe});const We={components:{IconLink:De},props:{keep:{type:Object,required:!0}},setup(e){const o=t({vaultId:0});return{state:o,closeModal(){le.close(`#keepModal${e.keep.id}`)},activeKeep:a((()=>I.activeKeep.id?I.activeKeep:e.keep)),yourVaults:a((()=>I.yourVaults)),creatorMatch:a((()=>I.activeKeep.creatorId===I.account.id)),async deleteKeep(){try{await te.confirm("Are you sure about that?")&&(await se.delete(e.keep.id),le.close(`#keepModal${e.keep.id}`))}catch(t){te.toast(t,"error")}},async addToVault(){try{const t=await se.addToVault(o.vaultId,e.keep.id);ee.log(t),t?await te.toast("Added","success","bottom-end",1e3,!1):te.toast("Something went wrong","error","bottom-end",2e3)}catch(t){ee.error(t),te.toast(t,"error")}}}}},Ye=k("data-v-2e459356");g("data-v-2e459356");const Ge={class:"modal-dialog modal-xl"},Xe={class:"modal-content"},Je={class:"modal-body"},Qe={class:"container-fluid"},Ze={class:"row"},et=l("div",{class:"col-12 text-right m-0"},[l("span",{class:"action","data-dismiss":"modal",title:"close"},"X")],-1),tt={class:"col-md-6"},at={class:"col-md-6 d-flex flex-column justify-content-between"},ot={class:"row py-2 justify-content-around f-16"},st={class:"col-4 text-right"},lt={class:"mdi mdi-eye",title:"Views"},rt={class:"col-4 text-center"},nt={class:"mdi mdi-safe",title:"Keeps"},it={class:"col-4",title:"Shares (Coming Soon!)"},ct={class:"mdi mdi-share-variant"},dt={class:"row flex-grow-1 align-content-around justify-content-center"},ut={class:"col-12"},pt={class:"text-center"},mt=l("div",{class:"line-break col-8 my-4"},null,-1),vt={class:"row justify-content-around align-items-end"},gt={class:"col-5"},ft={class:"text-center"},bt=_(" Add to Vault: "),kt={key:0,class:"col-2 p-0"},ht={class:"profile-name ml-2"};f();const yt=Ye(((e,t,a,c,u,p)=>{const m=n("IconLink"),v=n("router-link");return o(),s("div",{class:"modal fade",id:`keepModal${a.keep.id}`,"aria-labelledby":"keepModalLabel","aria-hidden":"true"},[l("div",Ge,[l("div",Xe,[l("div",Je,[l("div",Qe,[l("div",Ze,[et,l("div",tt,[l("img",{src:a.keep.img,alt:"This image did not load.",class:"img-fluid rounded"},null,8,["src"])]),l("div",at,[l("div",ot,[l("div",st,[l("span",lt,h(" "+c.activeKeep.views),1)]),l("div",rt,[l("span",nt,h(" "+c.activeKeep.keeps),1)]),l("div",it,[l("span",ct,h(" "+c.activeKeep.shares),1)])]),l("div",dt,[l("div",ut,[l("h3",pt,[l("b",null,h(a.keep.name),1)]),l("p",null,h(a.keep.description),1)]),mt]),l("div",vt,[l("div",gt,[i(l("div",ft,[bt,i(l("select",{class:"action vault-selector form-select bg-gray","aria-label":"Add to Vault","onUpdate:modelValue":t[1]||(t[1]=e=>c.state.vaultId=e),onChange:t[2]||(t[2]=(...e)=>c.addToVault&&c.addToVault(...e)),title:"Add to Vault"},[(o(!0),s(r,null,C(c.yourVaults,(e=>(o(),s("option",{key:e.id,value:e.id},h(e.name),9,["value"])))),128))],544),[[x,c.state.vaultId]])],512),[[V,c.yourVaults.length>0]])]),c.creatorMatch?(o(),s("div",kt,[l(m,{mdi:"delete",closed:"text-danger",open:"bg-danger","icon-size":"1.5rem",onClick:d(c.deleteKeep,["stop"]),title:"Delete"},null,8,["icon-size","onClick"])])):w("",!0),l(v,{to:{name:"Profile",params:{id:a.keep.creator.id}},class:[c.creatorMatch?"col-4 pl-0":"col-5","action profile-info d-flex align-items-center"],onClick:c.closeModal,title:c.activeKeep.creator.name+" profile"},{default:Ye((()=>[l("img",{src:c.activeKeep.creator.picture,class:"profile-img",alt:"This image did not load."},null,8,["src"]),l("span",ht,h(c.activeKeep.creator.name),1)])),_:1},8,["to","class","onClick","title"])])])])])])])])],8,["id"])}));We.render=yt,We.__scopeId="data-v-2e459356";var wt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:We});let _t;const Vt={},Ct=function(e,t){if(!t||0===t.length)return e();if(void 0===_t){const e=document.createElement("link").relList;_t=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in Vt)return;Vt[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":_t,t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e()))};function xt(e){return()=>function(e){switch(e){case"./pages/AboutPage.vue":return Ct((()=>import("./AboutPage.68664cb8.js")),["/assets/AboutPage.68664cb8.js","/assets/AboutPage.d075ae00.css","/assets/vendor.9dd95e55.js"]);case"./pages/AccountPage.vue":return Ct((()=>import("./AccountPage.f3b6e998.js")),["/assets/AccountPage.f3b6e998.js","/assets/AccountPage.d0d20bc5.css","/assets/vendor.9dd95e55.js"]);case"./pages/HomePage.vue":return Ct((()=>import("./HomePage.540d1b61.js")),["/assets/HomePage.540d1b61.js","/assets/HomePage.af016ed9.css","/assets/vendor.9dd95e55.js"]);case"./pages/ProfilePage.vue":return Ct((()=>import("./ProfilePage.e0bc4520.js")),["/assets/ProfilePage.e0bc4520.js","/assets/ProfilePage.2590d278.css","/assets/vendor.9dd95e55.js"]);case"./pages/VaultPage.vue":return Ct((()=>import("./VaultPage.a2dc61d5.js")),["/assets/VaultPage.a2dc61d5.js","/assets/VaultPage.924ae363.css","/assets/vendor.9dd95e55.js"]);default:return Promise.reject(new Error("Unknown variable dynamic import: "+e))}}(`./pages/${e}.vue`)}const St=[{path:"/",name:"Home",component:xt("HomePage")},{path:"/about",name:"About",component:xt("AboutPage")},{path:"/account",name:"Account",component:xt("AccountPage"),beforeEnter:T},{path:"/profile/:id",name:"Profile",component:xt("ProfilePage")},{path:"/vaults/:id",name:"Vault",component:xt("VaultPage"),beforeEnter:A}],Pt=S({linkActiveClass:"router-link-active",linkExactActiveClass:"router-link-exact-active",history:P(),routes:St});const Tt=new class{async getAccount(){try{const e=await ae.get("/account");return I.account=e.data,e.data.id}catch(e){ee.error("HAVE YOU STARTED YOUR SERVER YET???",e)}}},At=K({domain:"cyberdack.us.auth0.com",clientId:"7YojWvwykIahhPChDzqAlv9Yjct9NEnz",audience:"https://keepr.com/",useRefreshTokens:!0,onRedirectCallback:e=>{Pt.push(e&&e.targetUrl?e.targetUrl:window.location.pathname)}});async function Kt(e){if(!At.isAuthenticated)return e;const t=1e3*At.identity.exp,a=t<Date.now(),o=t<Date.now()+432e5;return a?await At.loginWithPopup():o&&(await At.getTokenSilently(),ae.defaults.headers.authorization=At.bearer),e}At.on(At.AUTH_EVENTS.AUTHENTICATED,(async function(){ae.defaults.headers.authorization=At.bearer,ae.interceptors.request.use(Kt),I.user=At.user;const e=await Tt.getAccount();await we.getAllByProfile(e,!0)}));const zt={setup:()=>({state:t({dropOpen:!1}),user:a((()=>I.user)),account:a((()=>I.account)),async login(){At.loginWithPopup()},async logout(){At.logout({returnTo:window.location.origin})}})},Ot=k("data-v-43d5f461");g("data-v-43d5f461");const Mt={class:"navbar navbar-expand-lg navbar-dark bg-dark"},It=l("div",{class:"d-flex flex-column align-items-center"},[l("img",{class:"bg-primary rounded",alt:"logo",src:"/assets/vaultlogo.e7d9776e.png",height:"45"})],-1),jt=l("h3",{class:"text-light darken-10"},"  Keepr ",-1),Et=l("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[l("span",{class:"navbar-toggler-icon"})],-1),Lt={class:"collapse navbar-collapse",id:"navbarText"},Dt={class:"navbar-nav mr-auto"},Ut={class:"nav-item"},Rt=_(" Home "),$t={class:"nav-item"},Bt=_(" About "),qt={class:"navbar-text"},Ht={key:1,class:"dropdown"},Nt={class:"mx-3"},Ft=l("div",{class:"list-group-item list-group-item-action hoverable"}," Account ",-1);f();const Wt=Ot(((e,t,a,r,i,c)=>{const d=n("router-link");return o(),s("nav",Mt,[l(d,{class:"navbar-brand d-flex align-items-center",to:{name:"Home"},title:"Keepr"},{default:Ot((()=>[It,jt])),_:1}),Et,l("div",Lt,[l("ul",Dt,[l("li",Ut,[l(d,{to:{name:"Home"},class:"nav-link",title:"Home"},{default:Ot((()=>[Rt])),_:1})]),l("li",$t,[l(d,{to:{name:"About"},class:"nav-link",title:"About"},{default:Ot((()=>[Bt])),_:1})])]),l("span",qt,[r.user.isAuthenticated?(o(),s("div",Ht,[l("div",{class:"dropdown-toggle",onClick:t[2]||(t[2]=e=>r.state.dropOpen=!r.state.dropOpen)},[l("img",{src:r.user.picture,alt:"user photo",height:"40",class:"rounded"},null,8,["src"]),l("span",Nt,h(r.user.name),1)]),l("div",{class:["dropdown-menu p-0 list-group w-100",{show:r.state.dropOpen}],onClick:t[4]||(t[4]=e=>r.state.dropOpen=!1)},[l(d,{to:{name:"Profile",params:{id:r.account.id}},title:"Account"},{default:Ot((()=>[Ft])),_:1},8,["to"]),l("div",{title:"Logout",class:"list-group-item list-group-item-action hoverable",onClick:t[3]||(t[3]=(...e)=>r.logout&&r.logout(...e))}," Logout ")],2)])):(o(),s("button",{key:0,class:"btn btn-outline-primary text-uppercase",onClick:t[1]||(t[1]=(...e)=>r.login&&r.login(...e)),title:"Login"}," Login "))])])])}));zt.render=Wt,zt.__scopeId="data-v-43d5f461";var Yt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:zt});const Gt={props:{isPrivate:{type:Boolean,default:!0}},setup:()=>({state:t({privateClass:"mdi-lock",publicClass:"mdi-lock-open-variant"})})},Xt=k("data-v-2fd09b27")(((e,t,a,l,r,n)=>(o(),s("i",{class:["privacy-indicator mdi",a.isPrivate?l.state.privateClass:l.state.publicClass]},null,2))));Gt.render=Xt,Gt.__scopeId="data-v-2fd09b27";var Jt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Gt});const Qt={props:{vault:{type:Object,required:!0}}},Zt=k("data-v-10562afe");g("data-v-10562afe");const ea={class:"card-title"},ta={class:"f-18 text-wrap"};f();const aa=Zt(((e,t,a,r,i,c)=>{const d=n("PrivacyIndicator"),u=n("router-link");return o(),s(u,{class:"card rounded shadow p-2 selectable vault",to:{name:"Vault",params:{id:a.vault.id}}},{default:Zt((()=>[l("div",ea,[l("span",ta,[_(h(a.vault.name)+" ",1),a.vault.isPrivate?(o(),s(d,{key:0})):w("",!0)])])])),_:1},8,["to"])}));Qt.render=aa,Qt.__scopeId="data-v-10562afe";var oa=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Qt});const sa=z(j);!function(e){const t={"./components/BeanEaterLoader.vue":R,"./components/CreateKeepForm.vue":X,"./components/CreateKeepModal.vue":he,"./components/CreateVaultForm.vue":ye,"./components/CreateVaultModal.vue":je,"./components/DeleteBtn.vue":Le,"./components/IconLink.vue":Be,"./components/KeepCard.vue":Fe,"./components/KeepDetailsModal.vue":wt,"./components/Navbar.vue":Yt,"./components/PrivacyIndicator.vue":Jt,"./components/VaultPreviewCard.vue":oa};Object.entries(t).forEach((([t,a])=>{const o=a.name||t.substr(t.lastIndexOf("/")+1).replace(/\.\w+$/,"");e.component(o,a.default)}))}(sa),sa.use(Pt).mount("#app");export{I as A,te as P,ae as a,oe as g,se as k,ee as l,we as v};