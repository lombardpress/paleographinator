(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{108:function(e,t,a){e.exports=a(275)},113:function(e,t,a){},114:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},115:function(e,t,a){},275:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(17),s=a.n(i),c=(a(113),a(18)),o=a(19),l=a(22),u=a(20),h=a(21),d=a(9),p=(a(114),a(115),a(116),a(25)),f=a.n(p),m=a(26),v=a.n(m),b=a(107),g=a.n(b),x=a(60),E=a.n(x),y=a(44),S=a.n(y),j=a(61),O=a.n(j),k=a(59),C=a.n(k),w=a(35),I=a.n(w),T=a(36),P=a.n(T),N=a(43),L=a.n(N);function W(e,t){return{codex:e["@id"].split("codex=")[1],label:e.label,data:e.resources.constructor===Array?e.resources:[e.resources],next:e.next,prev:e.prev,total:e.within.total,first:e.within.first,last:e.within.last,index:e.startIndex,page:Math.ceil(e.startIndex/t)+1,totalPages:Math.ceil(e.within.total/t)}}var q=a(27),B=a.n(q),D=a(105),R=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={searchText:""},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.imageUrl+"/"+this.props.coords+"/"+this.props.displayWidth+",/0/default.jpg";return r.a.createElement("img",{src:e})}}]),t}(n.Component),F=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={searchText:""},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"text"},r.a.createElement("span",{dangerouslySetInnerHTML:{__html:this.props.text}}))}}]),t}(n.Component),U=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={searchText:""},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("p",{className:"label"},this.props.label,this.props.surfaceButton&&r.a.createElement(f.a,{onClick:function(){e.props.handleShowSurface(e.props.surfaceid,e.props.label)}},r.a.createElement(v.a,null,"pageview")))}}]),t}(n.Component),_=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={searchText:""},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",Object(D.a)({className:"ImageTextWrapper"},"className",function(){if(e.props.targetLabel===e.props.label)return"target"}()),r.a.createElement("div",{className:"labelImageWrapper"},r.a.createElement(U,{label:this.props.label,handleShowSurface:this.props.handleShowSurface,surfaceid:this.props.surfaceid,surfaceButton:this.props.surfaceButton}),r.a.createElement(R,{imageUrl:this.props.imageUrl,canvas:this.props.canvas,coords:this.props.coords,canvasShort:this.props.canvasShort,displayWidth:this.props.displayWidth})),r.a.createElement(F,{text:this.props.text}))}}]),t}(n.Component),A=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={data:[]},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t="https://exist.scta.info/exist/apps/scta-app/folio-annotaiton-list-from-simpleXmlCoordinates.xq?surfaceid="+this.props.surfaceid.split("/resource/")[1];B.a.get(t).then(function(t){var a=t.data;e.setState({data:a.resources})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"surface"},r.a.createElement("p",null,this.props.surfaceid),e.state.data.map(function(t,a){var n=t.resource.chars,i=t.on.split("#xywh=")[0],s=i.split("/")[i.split("/").length-1],c=t.on.split("#xywh=")[1],o=t.imageUrl,l=t.label;return r.a.createElement(_,{key:a,imageUrl:o,canvas:i,coords:c,canvasShort:s,text:n,label:l,targetLabel:e.props.targetLabel,surfaceButton:!1,displayWidth:"500"})}))}}]),t}(n.Component),M=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleChange=a.handleChange.bind(Object(d.a)(Object(d.a)(a))),a.handleChangeCodex=a.handleChangeCodex.bind(Object(d.a)(Object(d.a)(a))),a.handleChangeInstitution=a.handleChangeInstitution.bind(Object(d.a)(Object(d.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(Object(d.a)(a))),a.handleNext=a.handleNext.bind(Object(d.a)(Object(d.a)(a))),a.handlePrevious=a.handlePrevious.bind(Object(d.a)(Object(d.a)(a))),a.handleFirst=a.handleFirst.bind(Object(d.a)(Object(d.a)(a))),a.handleLast=a.handleLast.bind(Object(d.a)(Object(d.a)(a))),a.triggerSearch=a.triggerSearch.bind(Object(d.a)(Object(d.a)(a))),a.handleShowSurface=a.handleShowSurface.bind(Object(d.a)(Object(d.a)(a))),a.state={searchText:"",searchCodex:"",searchInstitution:"",data:[],surfaceid:"",targetLabel:"",itemsPerPage:5,institutions:[]},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleChange",value:function(e){var t=e.target.value;this.setState({searchText:t})}},{key:"handleChangeCodex",value:function(e){var t=e.target.value;this.setState({searchCodex:t})}},{key:"handleChangeInstitution",value:function(e){var t=e.target.value;this.setState({searchInstitution:t})}},{key:"triggerSearch",value:function(e){var t=this;B.a.get(e).then(function(e){var a=e.data,n=[];n=a.constructor===Array?a.map(function(e){return W(e,t.state.itemsPerPage)}):[W(a,t.state.itemsPerPage)],t.setState({data:n})}).catch(function(e){console.log(e)})}},{key:"updateSearch",value:function(e,t){var a=this;B.a.get(e).then(function(e){var n=W(e.data,a.state.itemsPerPage);a.setState(function(e){return{data:e.data.map(function(e){return e.codex===t?n:e})}})}).catch(function(e){console.log(e)})}},{key:"handleSubmit",value:function(e){e.preventDefault();var t="?page=1&q="+this.state.searchText;this.state.searchInstitution&&(t=t+"&institution="+this.state.searchInstitution),this.state.searchCodex&&(t=t+"&codex="+this.state.searchCodex);this.triggerSearch("https://exist.scta.info/exist/apps/scta-app/iiifsearch-with-paging-line-level-from-simpleXmlCoordinates2.xq"+t)}},{key:"handleNext",value:function(e){var t=this.state.data.find(function(t){return t.codex===e});this.updateSearch(t.next,e)}},{key:"handlePrevious",value:function(e){var t=this.state.data.find(function(t){return t.codex===e});this.updateSearch(t.prev,e)}},{key:"handleFirst",value:function(e){var t=this.state.data.find(function(t){return t.codex===e});this.updateSearch(t.first,e)}},{key:"handleLast",value:function(e){var t=this.state.data.find(function(t){return t.codex===e});this.updateSearch(t.last,e)}},{key:"handleShowSurface",value:function(e,t){this.setState({surfaceid:e,targetLabel:t})}},{key:"componentWillMount",value:function(){var e=this,t=["SELECT DISTINCT ?institution ?institutionTitle  ","WHERE { ","?institution a <http://scta.info/resource/institution> .","?institution <http://purl.org/dc/elements/1.1/title> ?institutionTitle .","}","ORDER BY ?institutionTitle"].join("");B.a.get("https://sparql-docker.scta.info/ds/query",{params:{query:t,output:"json"}}).then(function(t){var a=t.data.results.bindings.map(function(e){return{institutionShortId:e.institution.value.split("/resource/")[1],institutionTitle:e.institutionTitle.value}});e.setState({institutions:a})}).catch(function(e){console.log(e)});var a=["SELECT DISTINCT ?codex ?codexTitle  ","WHERE { ","?codex a <http://scta.info/resource/codex> .","?codex <http://purl.org/dc/elements/1.1/title> ?codexTitle .","}","ORDER BY ?codexTitle"].join("");B.a.get("https://sparql-docker.scta.info/ds/query",{params:{query:a,output:"json"}}).then(function(t){var a=t.data.results.bindings.map(function(e){return{codexShortId:e.codex.value.split("/resource/")[1],codexTitle:e.codexTitle.value}});e.setState({codices:a})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement(E.a,{position:"fixed",color:"primary"},r.a.createElement(O.a,null,r.a.createElement(C.a,{variant:"h6",color:"inherit"},"Paleographinator"),r.a.createElement("form",{onSubmit:this.handleSubmit,id:"input-form"},r.a.createElement(I.a,{htmlFor:"queryString"},"Search Term"),r.a.createElement(g.a,{id:"queryString",onChange:this.handleChange,value:this.state.searchText,placeholder:"search for word here"}),r.a.createElement(I.a,{htmlFor:"codices"},"Codices"),r.a.createElement(L.a,{value:this.state.searchCodex,onChange:this.handleChangeCodex,placeholder:"restrict to codex",inputProps:{codex:"codex",id:"codex"}},r.a.createElement(P.a,{key:"blankCodex",value:""},"Select"),function(){var t=["penn","svict","lon","reims","cod-yu78uh","cod-xowk10","penn855"];if(e.state.codices)return e.state.codices.map(function(e){if(t.includes(e.codexShortId))return r.a.createElement(P.a,{key:e.codexShortId,value:e.codexShortId},e.codexTitle)})}()),r.a.createElement(I.a,{htmlFor:"institutions"},"Institutions"),r.a.createElement(L.a,{value:this.state.searchInstitution,onChange:this.handleChangeInstitution,inputProps:{institution:"institution",id:"institution"}},r.a.createElement(P.a,{key:"blankInstitutions",value:""},"Select"),function(){var t=["I-i9ujd3","I-pdn3as"];if(e.state.institutions)return e.state.institutions.map(function(e){if(t.includes(e.institutionShortId))return r.a.createElement(P.a,{key:e.codexShortId,value:e.institutionShortId},e.institutionTitle)})}()),r.a.createElement(f.a,{onClick:this.handleSubmit,type:"submit"},r.a.createElement(v.a,{color:"secondary"},"send"))))),r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"searchResults"},e.state.data.map(function(t,a){var n=t.data.map(function(t,a){var n=t.resource.chars,i=t.on.split("#xywh=")[0],s=i.split("/")[i.split("/").length-1],c=t.on.split("#xywh=")[1],o=t.imageUrl,l=t.label,u=t.surfaceId;return r.a.createElement(_,{key:a,imageUrl:o,canvas:i,coords:c,canvasShort:s,text:n,label:l,surfaceid:u,handleShowSurface:e.handleShowSurface,surfaceButton:!0,displayWidth:"800"})});return r.a.createElement("div",{key:t.codex},r.a.createElement("div",{className:"paggerWrapper"},r.a.createElement("p",null,t.total," total results for codex ",t.label),t.page>2&&r.a.createElement(f.a,{onClick:function(){e.handleFirst(t.codex)}},r.a.createElement(v.a,{color:"secondary"},"first_page")),t.page>1&&r.a.createElement(f.a,{onClick:function(){e.handlePrevious(t.codex)}},r.a.createElement(v.a,{color:"secondary"},"navigate_before")),r.a.createElement("span",null,!!t.page&&t.page),t.page<t.totalPages&&r.a.createElement(f.a,{onClick:function(){e.handleNext(t.codex)},"aria-label":"Next"},r.a.createElement(v.a,{color:"secondary"},"navigate_next")),t.page<t.totalPages-1&&r.a.createElement(f.a,{onClick:function(){e.handleLast(t.codex)}},r.a.createElement(v.a,{color:"secondary"},"last_page"))),r.a.createElement("div",null,n))})),r.a.createElement("div",{className:"surfaceResults"},this.state.surfaceid&&r.a.createElement(A,{key:this.state.surfaceid,surfaceid:this.state.surfaceid,targetLabel:this.state.targetLabel}))),r.a.createElement(E.a,{position:"sticky",color:"primary"},r.a.createElement(O.a,{id:"footer-toolbar"},r.a.createElement(S.a,{href:"http://lombardpress.org",block:!1,color:"secondary"},"A LombardPress Publication"),r.a.createElement(S.a,{href:"https://scta.info",block:!1,color:"secondary"},"Powered by SCTA Data"),r.a.createElement(S.a,{href:"https://jeffreycwitt.com",block:!1,color:"secondary"},"Designed by Jeffrey C. Witt"))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[108,1,2]]]);
//# sourceMappingURL=main.f3cc62e3.chunk.js.map