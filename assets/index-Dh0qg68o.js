(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const Ze=new Map;function Qo(){Ze.forEach(e=>{e.stopAnimation()}),Ze.clear(),document.querySelectorAll(".boot-overlay").forEach(e=>{e.remove()})}function fr(o){o.style.animation="boot-overlay-fade 0.3s ease forwards",o.addEventListener("animationend",()=>{o.remove()},{once:!0}),setTimeout(()=>{o.parentNode&&o.remove()},500)}function gn(o){Qo();const e=o.dataset.bootType??"boot";e==="boot"&&document.querySelectorAll(".boot-overlay").forEach(r=>{fr(r)});const t={element:o,bootType:e,overlay:null,cleanupFns:[],stopAnimation:()=>{t.cleanupFns.forEach(n=>n()),t.cleanupFns=[],t.overlay?.parentNode&&(fr(t.overlay),t.overlay=null),Ze.delete(o)}};if(Ze.set(o,t),e==="shutdown"||e==="reboot"){const n=o.querySelector("[data-boot-overlay]");if(n){t.overlay=n;const i=getComputedStyle(n).animationDelay,s=parseFloat(i)*(i.includes("ms")?1:1e3);setTimeout(()=>{Ze.has(o)&&n.parentNode&&document.body.appendChild(n)},s)}}ei(o,t)}function ei(o,e){const t=document.getElementById("terminal-output");if(t){const l=()=>{e.stopAnimation()};t.addEventListener("scroll",l,{once:!0}),e.cleanupFns.push(()=>{t.removeEventListener("scroll",l)})}const n=l=>{l.key==="Shift"||l.key==="Control"||l.key==="Alt"||l.key==="Meta"||e.stopAnimation()};setTimeout(()=>{Ze.has(o)&&(document.addEventListener("keydown",n,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("keydown",n)}))},100);const r=()=>{e.stopAnimation()};setTimeout(()=>{Ze.has(o)&&(document.addEventListener("click",r,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("click",r)}))},100);const i=new MutationObserver(()=>{o.nextElementSibling&&(e.stopAnimation(),i.disconnect())});t&&(i.observe(t,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{i.disconnect()}));const s=new MutationObserver(()=>{document.body.contains(o)||(e.stopAnimation(),s.disconnect())});s.observe(document.body,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{s.disconnect()})}function ti(){const o=new MutationObserver(n=>{n.forEach(r=>{r.addedNodes.forEach(i=>{if(i.nodeType===Node.ELEMENT_NODE){const s=i;s.classList.contains("boot-sequence")&&gn(s),s.querySelectorAll(".boot-sequence").forEach(a=>{gn(a)})}})})}),e=document.getElementById("terminal-output");e&&o.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll(".boot-sequence").forEach(n=>{gn(n)})}const Ge=new Map;function ni(){Ge.forEach(e=>{e.stopAnimation()}),Ge.clear(),document.querySelectorAll(".bsod-overlay").forEach(e=>{e.remove()})}function ri(o){o.style.animation="bsod-fade-out 0.3s ease forwards",o.addEventListener("animationend",()=>{o.remove()},{once:!0}),setTimeout(()=>{o.parentNode&&o.remove()},500)}function oi(o,e){const t=o.querySelector("[data-bsod-progress]");if(!t)return;let n=0;const r=setInterval(()=>{if(!Ge.has(o)){clearInterval(r);return}n=(n+1)%101,t.textContent=String(n)},100);e.cleanupFns.push(()=>{clearInterval(r)})}function ii(o,e){const t=o.querySelector("[data-bsod-cursor]");if(!t)return;let n=!0;const r=setInterval(()=>{if(!Ge.has(o)){clearInterval(r);return}n=!n,t.style.visibility=n?"visible":"hidden"},530);e.cleanupFns.push(()=>{clearInterval(r)})}function $n(o){ni();const e=o.dataset.bsodStyle??"modern",t={element:o,style:e,cleanupFns:[],stopAnimation:()=>{t.cleanupFns.forEach(n=>n()),t.cleanupFns=[],o.parentNode&&ri(o),Ge.delete(o)}};Ge.set(o,t),document.body.appendChild(o),e==="modern"?oi(o,t):ii(o,t),si(o,t)}function si(o,e){const t=document.getElementById("terminal-output"),n=l=>{l.key==="Shift"||l.key==="Control"||l.key==="Alt"||l.key==="Meta"||e.stopAnimation()};setTimeout(()=>{Ge.has(o)&&(document.addEventListener("keydown",n,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("keydown",n)}))},100);const r=()=>{e.stopAnimation()};setTimeout(()=>{Ge.has(o)&&(document.addEventListener("click",r,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("click",r)}))},100);const i=new MutationObserver(l=>{for(const a of l)for(const d of a.addedNodes)if(d!==o&&d.nodeType===Node.ELEMENT_NODE){e.stopAnimation(),i.disconnect();return}});t&&(i.observe(t,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{i.disconnect()}));const s=new MutationObserver(()=>{document.body.contains(o)||(e.stopAnimation(),s.disconnect())});s.observe(document.body,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{s.disconnect()})}function ai(){const o=new MutationObserver(n=>{n.forEach(r=>{r.addedNodes.forEach(i=>{if(i.nodeType===Node.ELEMENT_NODE){const s=i;s.hasAttribute("data-bsod")&&$n(s),s.querySelectorAll("[data-bsod]").forEach(a=>{$n(a)})}})})}),e=document.getElementById("terminal-output");e&&o.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll("[data-bsod]").forEach(n=>{$n(n)})}const jt=new Map;function ro(o,e){return{width:o,height:e,cells:new Uint8Array(o*e),generation:0}}function Hn(o,e,t){return o.cells[t*o.width+e]}function se(o,e,t,n){o.cells[t*o.width+e]=n}function gr(o,e){return(o%e+e)%e}function li(o,e,t){let n=0;for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){if(i===0&&r===0)continue;const s=gr(e+i,o.width),l=gr(t+r,o.height);Hn(o,s,l)>0&&n++}return n}function ci(o){const e=ro(o.width,o.height);e.generation=o.generation+1;for(let t=0;t<o.height;t++)for(let n=0;n<o.width;n++){const r=li(o,n,t);Hn(o,n,t)>0?se(e,n,t,r===2||r===3?1:0):se(e,n,t,r===3?2:0)}return e}function oo(o,e){for(let t=0;t<o.cells.length;t++)o.cells[t]=Math.random()<e?1:0}function di(o,e){const t=Math.floor(o.width/2),n=Math.floor(o.height/2);switch(e){case"acorn":se(o,t+1,n-1,1),se(o,t+3,n,1),se(o,t,n+1,1),se(o,t+1,n+1,1),se(o,t+4,n+1,1),se(o,t+5,n+1,1),se(o,t+6,n+1,1);break;case"glider":se(o,t+1,n-1,1),se(o,t-1,n,1),se(o,t+1,n,1),se(o,t,n+1,1),se(o,t+1,n+1,1);break;case"blinker":se(o,t-1,n,1),se(o,t,n,1),se(o,t+1,n,1);break;default:oo(o,.3)}}function $r(){const o=getComputedStyle(document.documentElement);return{accent:o.getPropertyValue("--terminal-accent").trim(),dim:o.getPropertyValue("--terminal-dim").trim(),bg:o.getPropertyValue("--terminal-bg").trim()}}function Tr(o,e,t,n,r){o.fillStyle=t.bg,o.fillRect(0,0,o.canvas.width,o.canvas.height);for(let i=0;i<e.height;i++)for(let s=0;s<e.width;s++){const l=Hn(e,s,i);l!==0&&(o.fillStyle=l===2?t.accent:t.dim,o.globalAlpha=l===2?1:.7,o.fillRect(s*n,i*r,n,r))}o.globalAlpha=1}function io(){jt.forEach(o=>{o.stopAnimation()}),jt.clear()}function ui(o,e){const t=()=>{e.stopAnimation()};window.addEventListener("scroll",t,{once:!0});const n=new MutationObserver(l=>{for(const a of l)if(a.type==="childList"&&a.addedNodes.length>0){for(const d of a.addedNodes)if(d instanceof HTMLElement&&d.classList.contains("output-line")){e.stopAnimation(),n.disconnect();return}}}),r=document.querySelector(".terminal-output");r&&n.observe(r,{childList:!0});const i=new MutationObserver(()=>{document.body.contains(o)||(e.stopAnimation(),i.disconnect())});i.observe(document.body,{childList:!0,subtree:!0});const s=e.stopAnimation;e.stopAnimation=()=>{window.removeEventListener("scroll",t),n.disconnect(),i.disconnect(),s()}}function Ar(o,e,t,n){io();const r=o.getContext("2d");if(!r)return;const i=o.dataset.speed,s=o.dataset.density,l=o.dataset.pattern,a=i?parseFloat(i):e,d=s?parseFloat(s):t,_=l??n,$=10,g=Math.floor(o.width/$),E=Math.floor(o.height/$),y=o.width/g,D=o.height/E,b=ro(g,E);_&&_!=="random"?di(b,_):oo(b,d);const T={animationId:null,grid:b,canvas:o,speed:a,lastUpdate:performance.now(),cellWidth:y,cellHeight:D,stopAnimation:()=>{T.animationId!==null&&(cancelAnimationFrame(T.animationId),T.animationId=null),jt.delete(o)}};jt.set(o,T);const P=$r();Tr(r,T.grid,P,T.cellWidth,T.cellHeight);function M(O){if(!T.animationId)return;const F=1e3/T.speed;if(O-T.lastUpdate>=F){T.grid=ci(T.grid);const z=$r();r&&Tr(r,T.grid,z,T.cellWidth,T.cellHeight),T.lastUpdate=O}T.animationId=requestAnimationFrame(M)}T.animationId=requestAnimationFrame(M),ui(o,T)}function _i(){new MutationObserver(e=>{for(const t of e)if(t.type==="childList"){for(const n of t.addedNodes)if(n instanceof HTMLElement){n.classList.contains("life-grid")&&n instanceof HTMLCanvasElement&&Ar(n,2,.3);const r=n.querySelectorAll(".life-grid");r.length>0&&requestAnimationFrame(()=>{r.forEach(i=>{Ar(i,2,.3)})})}}}).observe(document.body,{childList:!0,subtree:!0})}function so(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}const dt=new Map;function mi(){dt.forEach(e=>{e.stopAnimation()}),dt.clear(),document.querySelectorAll(".matrix-rain").forEach(e=>{e.querySelectorAll(".matrix-column").forEach(n=>{n.style.animationPlayState="paused"})})}function Tn(o){dt.forEach((i,s)=>{i.stopAnimation(),s.querySelectorAll(".matrix-column").forEach(a=>{a.style.animationPlayState="paused"})}),dt.clear();const e=o.dataset.matrixChars??"";if(!e){console.warn("[Matrix] No character set found in data-matrix-chars");return}if(so())return;const t={animationId:null,frameCount:0,matrixChars:e,rainElement:o,stopAnimation:()=>{t.animationId&&(cancelAnimationFrame(t.animationId),t.animationId=null),dt.delete(o)}};dt.set(o,t);function n(){return e[Math.floor(Math.random()*e.length)]}function r(){t.frameCount++,o.querySelectorAll(".matrix-column").forEach(s=>{const l=s.querySelectorAll(".matrix-char"),a=parseInt(s.dataset.trailLength??"20");l.forEach((d,_)=>{if(d.classList.contains("matrix-char-bright"))(t.frameCount%45===0||t.frameCount%60===0&&Math.random()<.5)&&(d.textContent=n());else{const g=a-_-1,E=Math.max(8,Math.floor(g/2));t.frameCount%E===0&&Math.random()<.3&&(d.textContent=n())}})}),t.animationId=requestAnimationFrame(r)}t.animationId=requestAnimationFrame(r),hi(o,t)}function hi(o,e){const t=document.getElementById("terminal-output");if(t){const i=()=>{e.stopAnimation()};t.addEventListener("scroll",i,{once:!0})}const n=new MutationObserver(()=>{o.nextElementSibling&&(e.stopAnimation(),n.disconnect())});t&&n.observe(t,{childList:!0,subtree:!0});const r=new MutationObserver(()=>{document.body.contains(o)||(e.stopAnimation(),r.disconnect())});r.observe(document.body,{childList:!0,subtree:!0})}function pi(){const o=new MutationObserver(n=>{n.forEach(r=>{r.addedNodes.forEach(i=>{if(i.nodeType===Node.ELEMENT_NODE){const s=i;s.classList.contains("matrix-rain")&&Tn(s),s.querySelectorAll(".matrix-rain").forEach(a=>{Tn(a)})}})})}),e=document.getElementById("terminal-output");e&&o.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll(".matrix-rain").forEach(n=>{Tn(n)})}const St=new Map;function fi(o){return()=>(o=o*1103515245+12345&2147483647,o/2147483647)}function An(){St.forEach(t=>{t.cleanupFns.forEach(n=>n()),t.styleElement.remove(),t.container.remove()}),St.clear(),document.querySelectorAll(".melt-container").forEach(t=>t.remove()),document.querySelectorAll("style[data-melt-styles]").forEach(t=>t.remove())}function gi(o,e,t){const n=/linear-gradient\(\s*(\d+)deg\s*,\s*(.+)\)/.exec(e);if(!n)return null;const r=parseInt(n[1]),i=n[2];let s,l,a,d;s=t.left,l=t.top,a=t.right,d=t.top;const _=o.createLinearGradient(s,l,a,d),$=i.matchAll(/(#[0-9a-fA-F]{6}|rgb[a]?\([^)]+\))\s*(\d+)?%?/g);for(const g of $){const E=g[1],y=g[2]?parseInt(g[2])/100:0;try{_.addColorStop(y,E)}catch{}}return _}function yn(o,e,t,n){try{const r=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null);let i;for(;i=r.nextNode();){const s=i.textContent||"";if(!s.trim())continue;const l=i.parentElement;if(!l)continue;const a=getComputedStyle(l),d=a.fontSize,_=a.fontFamily,$=a.fontWeight,g=document.createRange();if(g.selectNodeContents(i),typeof g.getClientRects!="function")continue;const E=g.getClientRects();if(E.length===0)continue;const D=(a.getPropertyValue("-webkit-background-clip")||a.backgroundClip)==="text";let b=a.color||n;if(D){const P=l.getBoundingClientRect(),M=a.backgroundImage;if(M?.includes("linear-gradient")){const O=gi(o,M,P);O&&(b=O)}}o.fillStyle=b;const T=parseInt($)>=600?"bold ":"";o.font=`${T}${d} ${_||t}`;for(const P of E)P.width>0&&P.height>0&&o.fillText(s,P.left,P.top+P.height*.85)}}catch{}}function $i(){const o=window.innerWidth,e=window.innerHeight,t=document.createElement("canvas");t.width=o,t.height=e;const n=t.getContext("2d"),r=getComputedStyle(document.documentElement),i=r.getPropertyValue("--terminal-bg").trim()||"#0a0a0a",s=r.getPropertyValue("--terminal-fg").trim()||"#00ff00",l=r.getPropertyValue("--terminal-font-family")||"monospace";n.fillStyle=i,n.fillRect(0,0,o,e);const a=document.querySelector("header");a&&yn(n,a,l,s);const d=document.getElementById("terminal-output");d&&yn(n,d,l,s);const _=document.querySelector(".terminal-input-container");return _&&yn(n,_,l,s),t}function yr(o){An();const e=window.innerWidth,t=window.innerHeight,n=document.createElement("style");n.setAttribute("data-melt-styles",""),n.textContent=`
    @keyframes melt-drop {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      100% {
        transform: translateY(${t*1.5}px);
        opacity: 0.4;
      }
    }
    @keyframes melt-message-fade {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `,document.head.appendChild(n);const r=document.createElement("div");r.className="melt-container";const s=$i().toDataURL("image/png"),l=12,a=Math.ceil(e/l),d=fi(Date.now());for(let E=0;E<a;E++){const y=document.createElement("div");y.className="melt-column",y.style.left=`${E*l}px`,y.style.width=`${l}px`,y.style.height=`${t}px`,y.style.backgroundImage=`url(${s})`,y.style.backgroundPosition=`-${E*l}px 0`,y.style.backgroundSize=`${e}px ${t}px`;const b=Math.abs(E-a/2)/(a/2)*.4+d()*.3,T=2.5+d()*1.5;y.style.animation=`melt-drop ${T}s ease-in ${b}s forwards`,r.appendChild(y)}const _=document.createElement("div");_.className="melt-message",_.textContent="yeah, you probably shouldn't do that",_.style.animation="melt-message-fade 0.5s ease-out 2s forwards",r.appendChild(_),document.body.appendChild(r);const $={container:r,styleElement:n,cleanupFns:[]};St.set(o,$);const g=setTimeout(()=>{St.has(o)&&An()},6500);$.cleanupFns.push(()=>clearTimeout(g)),setTimeout(()=>{if(!St.has(o))return;const E=()=>An(),y=b=>{["Shift","Control","Alt","Meta"].includes(b.key)||E()},D=()=>E();document.addEventListener("keydown",y,{once:!0}),document.addEventListener("click",D,{once:!0}),$.cleanupFns.push(()=>{document.removeEventListener("keydown",y),document.removeEventListener("click",D)})},500)}function Ti(){const o=new MutationObserver(t=>{t.forEach(n=>{n.addedNodes.forEach(r=>{if(r.nodeType===Node.ELEMENT_NODE){const i=r;i.hasAttribute("data-melt")&&yr(i),i.querySelectorAll("[data-melt]").forEach(l=>{yr(l)})}})})}),e=document.getElementById("terminal-output");e&&o.observe(e,{childList:!0,subtree:!0}),o.observe(document.body,{childList:!0,subtree:!0})}class B{flags=new Map;positionals=[];static VALUE_FLAGS=new Set(["f","L","w"]);constructor(e){const t=[];for(const n of e)if(n.startsWith("-")&&!n.startsWith("--")&&n.length>2)for(let r=1;r<n.length;r++)t.push(`-${n[r]}`);else t.push(n);for(let n=0;n<t.length;n++){const r=t[n];if(r.startsWith("--")){const i=r.substring(2),s=t[n+1];s!==void 0&&!s.startsWith("--")&&!s.startsWith("-")?(this.flags.set(i,s),n++):this.flags.set(i,!0)}else if(r.startsWith("-")&&r.length===2){const i=r.substring(1),s=t[n+1];s!==void 0&&!s.startsWith("-")&&(B.VALUE_FLAGS.has(i)||/^\d+$/.test(s))?(this.flags.set(i,s),n++):this.flags.set(i,!0)}else this.positionals.push(r)}}getFlag(e){return this.flags.get(e)}hasFlag(e){return this.flags.has(e)}getPositional(e){return this.positionals[e]}getAllFlags(){return new Map(this.flags)}getAllPositionals(){return[...this.positionals]}get positionalCount(){return this.positionals.length}}function Ai(o){return{name:"alias",description:"Create or display command aliases",execute:(e,t)=>{if(new B(e).hasFlag("help"))return{output:`Usage: alias [name='command']

Description:
  Create or display command aliases for shortening commands
  Note: 'll' is aliased to 'ls -alh' by default

Options:
  (no args)            List all defined aliases

Examples:
  alias                # List all aliases
  alias la='ls -a'     # Create an alias
  alias blog-ai='blog --tags ai'  # Alias with flags`};if(e.length===0){const a=o.getAllAliases();return a.size===0?{output:"No aliases defined."}:{output:Array.from(a.entries()).sort((_,$)=>_[0].localeCompare($[0])).map(([_,$])=>{const g=o.isDefaultAlias(_);return`alias ${_}='${$}'${g?" (default)":""}`}).join(`
`)}}const r=e.join(" "),i=/^(\S+)=(.+)$/.exec(r);if(!i)return{output:`Usage: alias name='command'
       alias (to list all aliases)`,error:!0};const[,s,l]=i;try{return o.setAlias(s,l),{output:`Alias created: ${s}='${l}'`}}catch(a){return{output:a instanceof Error?a.message:String(a),error:!0}}}}}const yi={name:"date",description:"Display current date and time",execute:(o,e)=>new B(o).hasFlag("help")?{output:`Usage: date

Description:
  Display the current date and time in the system's default format

Examples:
  date                 # Show current date and time`}:{output:new Date().toString()}},Ei={name:"echo",description:"Display a line of text",execute:(o,e)=>{if(new B(o).hasFlag("help"))return{output:`Usage: echo [options] [text...]

Description:
  Display a line of text or pass through stdin content

Options:
  -e                   Enable interpretation of escape sequences

Examples:
  echo "Hello World"   # Display text
  echo -e "Line1\\nLine2"  # Use escape sequences
  cat file.txt | echo  # Pass through stdin`};let n=!1;const r=[];for(const s of o)s==="-e"?n=!0:r.push(s);let i;return r.length===0&&e?(i=e,i.endsWith(`
`)&&(i=i.slice(0,-1))):i=r.join(" "),n&&(i=i.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\\\/g,"\\")),{output:i}}};function Li(o){return{name:"env",description:"Display all environment variables",execute:(e,t)=>{if(new B(e).hasFlag("help"))return{output:`Usage: env

Description:
  Display all environment variables

Examples:
  env                  # List all variables
  env | grep PATH      # Filter variables`};try{const r=o.getAllVariables();return r.size===0?{output:""}:{output:Array.from(r.entries()).sort((l,a)=>l[0].localeCompare(a[0])).map(([l,a])=>`${l}=${a}`).join(`
`)}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}const Er=["There is no escape.","You can check out any time you like, but you can never leave.","no","no thank you","nope","exit: permission denied: too interesting to leave",`logout
Connection to darinchambers.com closed.

...just kidding. Welcome back.`];function Ii(o,e,t,n){return{name:"exit",description:"Exit the current session",aliases:["logout"],execute:(r,i)=>{if(new B(r).hasFlag("help"))return{output:`Usage: exit

Description:
  Exit the current session. If logged in as root (via sudo su),
  returns to the regular user. Otherwise, displays a message.

Aliases:
  logout

Examples:
  exit                 # Exit root session or display message
  logout               # Same as exit`};if(o.getUsername()==="root")return o.setUsername("darin"),e.setVariable("HOME","/home/darin"),e.setVariable("USER","darin"),e.setVariable("PWD","/home/darin"),t.changeDirectory("/home/darin"),n(t.getShortPath()),{output:""};const l=Math.floor(Math.random()*Er.length);return{output:Er[l]}}}}function bi(o){return{name:"export",description:"Set or display environment variables",execute:(e,t)=>{if(new B(e).hasFlag("help"))return{output:`Usage: export [VAR=value] [VAR]

Description:
  Set or display environment variables

Examples:
  export               # List all variables
  export PATH=/bin     # Set variable
  export USER          # Display single variable`};try{if(e.length===0){const i=o.getAllVariables();return i.size===0?{output:""}:{output:Array.from(i.entries()).sort((a,d)=>a[0].localeCompare(d[0])).map(([a,d])=>`${a}=${d}`).join(`
`)}}const r=[];for(const i of e){const s=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(i);if(s){const[,l,a]=s;o.setVariable(l,a)}else{const l=o.getVariable(i);l!==void 0?r.push(`${i}=${l}`):r.push(`export: ${i}: not found`)}}return{output:r.join(`
`)}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function wi(o){return{name:"history",description:"Display command history",execute:(e,t)=>{if(new B(e).hasFlag("help"))return{output:`Usage: history

Description:
  Display command history with line numbers

Examples:
  history              # Show all commands`};const r=o.getHistory();return r.length===0?{output:"No commands in history."}:{output:r.map((s,l)=>`${(l+1).toString().padStart(5," ")}  ${s}`).join(`
`)}}}}function Si(o){return{name:"man",description:"Display manual pages for commands",execute:async(e,t)=>{const n=new B(e);if(n.hasFlag("help"))return{output:`Usage: man <command>

Description:
  Display manual pages for commands

Options:
  --help           Show this help message

Examples:
  man ls           # Show manual page for ls
  man help         # Show manual page for help`};const r=n.getAllPositionals();if(r.length===0)return{output:`What manual page do you want?
For example, try 'man help'.`,error:!0};const i=r[0].toLowerCase();if(!o.getCommandNames().includes(i))return{output:`No manual entry for ${r[0]}`,error:!0};const a=o.getCommands().find(P=>P.name===i),d=a?a.description:i,$=(await o.dispatch(`${i} --help`)).output,g=`${i}(1)`,E="User Commands",y=Math.max(0,60-g.length*2-E.length),D=`${g}${" ".repeat(Math.floor(y/2))}${E}${" ".repeat(Math.ceil(y/2))}${g}`,b=["help","which"].filter(P=>P!==i).map(P=>`${P}(1)`).join(", ");return{output:[D,"","NAME",`    ${i} - ${d}`,"",$,"","SEE ALSO",`    ${b}`].join(`
`)}}}}function De(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}class Lr{static parse(e){if(!e.trim().startsWith("---"))return{frontmatter:null,content:e};const t=e.split(`
`),n=this.findFrontmatterEnd(t);if(n===-1)return{frontmatter:null,content:e};const r=t.slice(1,n),i=t.slice(n+1);return{frontmatter:this.parseFrontmatterLines(r),content:i.join(`
`)}}static findFrontmatterEnd(e){for(let t=1;t<e.length;t++)if(e[t].trim()==="---")return t;return-1}static parseFrontmatterLines(e){const t={};for(const n of e){const r=n.indexOf(":");if(r===-1)continue;const i=n.substring(0,r).trim(),s=n.substring(r+1).trim();if(s.startsWith("[")&&s.endsWith("]")){const l=s.substring(1,s.length-1);t[i]=l.split(",").map(a=>a.trim().replace(/^["']|["']$/g,"")).filter(a=>a.length>0)}else t[i]=s.replace(/^["']|["']$/g,"")}return t}static renderFrontmatter(e){const t=[];e.title&&typeof e.title=="string"&&t.push(`<h1 class="fm-title">${De(e.title)}</h1>`);const n=[];if(e.date&&typeof e.date=="string"&&n.push(`<span class="fm-date">${De(e.date)}</span>`),e.tags&&Array.isArray(e.tags)){const r=e.tags.map(i=>`<span class="fm-tag">${De(i)}</span>`).join(" ");n.push(`<span class="fm-tags">${r}</span>`)}return n.length>0&&t.push(`<div class="fm-meta">${n.join(" • ")}</div>`),e.summary&&typeof e.summary=="string"&&t.push(`<p class="fm-summary">${De(e.summary)}</p>`),t.length>0&&t.push('<hr class="fm-divider">'),t.join(`
`)}}function Un(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var et=Un();function ao(o){et=o}var Ke={exec:()=>null};function j(o,e=""){let t=typeof o=="string"?o:o.source,n={replace:(r,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(ge.caret,"$1"),t=t.replace(r,s),n},getRegex:()=>new RegExp(t,e)};return n}var Ci=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ge={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:o=>new RegExp(`^( {0,3}${o})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}#`),htmlBeginRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}>`)},vi=/^(?:[ \t]*(?:\n|$))+/,Ri=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,xi=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,vt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ni=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Bn=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,lo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,co=j(lo).replace(/bull/g,Bn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ki=j(lo).replace(/bull/g,Bn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Wn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Oi=/^[^\n]+/,Gn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Mi=j(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Gn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Di=j(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Bn).getRegex(),Jt="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",zn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Pi=j("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",zn).replace("tag",Jt).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),uo=j(Wn).replace("hr",vt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jt).getRegex(),Fi=j(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",uo).getRegex(),Vn={blockquote:Fi,code:Ri,def:Mi,fences:xi,heading:Ni,hr:vt,html:Pi,lheading:co,list:Di,newline:vi,paragraph:uo,table:Ke,text:Oi},Ir=j("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",vt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jt).getRegex(),Hi={...Vn,lheading:ki,table:Ir,paragraph:j(Wn).replace("hr",vt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ir).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jt).getRegex()},Ui={...Vn,html:j(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",zn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ke,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:j(Wn).replace("hr",vt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",co).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Bi=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Wi=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,_o=/^( {2,}|\\)\n(?!\s*$)/,Gi=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ut=/[\p{P}\p{S}]/u,Qt=/[\s\p{P}\p{S}]/u,jn=/[^\s\p{P}\p{S}]/u,zi=j(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Qt).getRegex(),mo=/(?!~)[\p{P}\p{S}]/u,Vi=/(?!~)[\s\p{P}\p{S}]/u,ji=/(?:[^\s\p{P}\p{S}]|~)/u,Yi=j(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ci?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ho=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,qi=j(ho,"u").replace(/punct/g,ut).getRegex(),Xi=j(ho,"u").replace(/punct/g,mo).getRegex(),po="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ki=j(po,"gu").replace(/notPunctSpace/g,jn).replace(/punctSpace/g,Qt).replace(/punct/g,ut).getRegex(),Zi=j(po,"gu").replace(/notPunctSpace/g,ji).replace(/punctSpace/g,Vi).replace(/punct/g,mo).getRegex(),Ji=j("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,jn).replace(/punctSpace/g,Qt).replace(/punct/g,ut).getRegex(),Qi=j(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,ut).getRegex(),es="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",ts=j(es,"gu").replace(/notPunctSpace/g,jn).replace(/punctSpace/g,Qt).replace(/punct/g,ut).getRegex(),ns=j(/\\(punct)/,"gu").replace(/punct/g,ut).getRegex(),rs=j(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),os=j(zn).replace("(?:-->|$)","-->").getRegex(),is=j("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",os).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Yt=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,ss=j(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",Yt).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),fo=j(/^!?\[(label)\]\[(ref)\]/).replace("label",Yt).replace("ref",Gn).getRegex(),go=j(/^!?\[(ref)\](?:\[\])?/).replace("ref",Gn).getRegex(),as=j("reflink|nolink(?!\\()","g").replace("reflink",fo).replace("nolink",go).getRegex(),br=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Yn={_backpedal:Ke,anyPunctuation:ns,autolink:rs,blockSkip:Yi,br:_o,code:Wi,del:Ke,delLDelim:Ke,delRDelim:Ke,emStrongLDelim:qi,emStrongRDelimAst:Ki,emStrongRDelimUnd:Ji,escape:Bi,link:ss,nolink:go,punctuation:zi,reflink:fo,reflinkSearch:as,tag:is,text:Gi,url:Ke},ls={...Yn,link:j(/^!?\[(label)\]\((.*?)\)/).replace("label",Yt).getRegex(),reflink:j(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Yt).getRegex()},Cn={...Yn,emStrongRDelimAst:Zi,emStrongLDelim:Xi,delLDelim:Qi,delRDelim:ts,url:j(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",br).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:j(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",br).getRegex()},cs={...Cn,br:j(_o).replace("{2,}","*").getRegex(),text:j(Cn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Gt={normal:Vn,gfm:Hi,pedantic:Ui},gt={normal:Yn,gfm:Cn,breaks:cs,pedantic:ls},ds={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},wr=o=>ds[o];function ke(o,e){if(e){if(ge.escapeTest.test(o))return o.replace(ge.escapeReplace,wr)}else if(ge.escapeTestNoEncode.test(o))return o.replace(ge.escapeReplaceNoEncode,wr);return o}function Sr(o){try{o=encodeURI(o).replace(ge.percentDecode,"%")}catch{return null}return o}function Cr(o,e){let t=o.replace(ge.findPipe,(i,s,l)=>{let a=!1,d=s;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=t.split(ge.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(ge.slashPipe,"|");return n}function $t(o,e,t){let n=o.length;if(n===0)return"";let r=0;for(;r<n&&o.charAt(n-r-1)===e;)r++;return o.slice(0,n-r)}function us(o,e){if(o.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<o.length;n++)if(o[n]==="\\")n++;else if(o[n]===e[0])t++;else if(o[n]===e[1]&&(t--,t<0))return n;return t>0?-2:-1}function _s(o,e=0){let t=e,n="";for(let r of o)if(r==="	"){let i=4-t%4;n+=" ".repeat(i),t+=i}else n+=r,t++;return n}function vr(o,e,t,n,r){let i=e.href,s=e.title||null,l=o[1].replace(r.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:o[0].charAt(0)==="!"?"image":"link",raw:t,href:i,title:s,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function ms(o,e,t){let n=o.match(t.other.indentCodeCompensation);if(n===null)return e;let r=n[1];return e.split(`
`).map(i=>{let s=i.match(t.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=r.length?i.slice(r.length):i}).join(`
`)}var qt=class{options;rules;lexer;constructor(o){this.options=o||et}space(o){let e=this.rules.block.newline.exec(o);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(o){let e=this.rules.block.code.exec(o);if(e){let t=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:$t(t,`
`)}}}fences(o){let e=this.rules.block.fences.exec(o);if(e){let t=e[0],n=ms(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(o){let e=this.rules.block.heading.exec(o);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let n=$t(t,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(t=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(o){let e=this.rules.block.hr.exec(o);if(e)return{type:"hr",raw:$t(e[0],`
`)}}blockquote(o){let e=this.rules.block.blockquote.exec(o);if(e){let t=$t(e[0],`
`).split(`
`),n="",r="",i=[];for(;t.length>0;){let s=!1,l=[],a;for(a=0;a<t.length;a++)if(this.rules.other.blockquoteStart.test(t[a]))l.push(t[a]),s=!0;else if(!s)l.push(t[a]);else break;t=t.slice(a);let d=l.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,r=r?`${r}
${_}`:_;let $=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,i,!0),this.lexer.state.top=$,t.length===0)break;let g=i.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let E=g,y=E.raw+`
`+t.join(`
`),D=this.blockquote(y);i[i.length-1]=D,n=n.substring(0,n.length-E.raw.length)+D.raw,r=r.substring(0,r.length-E.text.length)+D.text;break}else if(g?.type==="list"){let E=g,y=E.raw+`
`+t.join(`
`),D=this.list(y);i[i.length-1]=D,n=n.substring(0,n.length-g.raw.length)+D.raw,r=r.substring(0,r.length-E.raw.length)+D.raw,t=y.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:i,text:r}}}list(o){let e=this.rules.block.list.exec(o);if(e){let t=e[1].trim(),n=t.length>1,r={type:"list",raw:"",ordered:n,start:n?+t.slice(0,-1):"",loose:!1,items:[]};t=n?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=n?t:"[*+-]");let i=this.rules.other.listItemRegex(t),s=!1;for(;o;){let a=!1,d="",_="";if(!(e=i.exec(o))||this.rules.block.hr.test(o))break;d=e[0],o=o.substring(d.length);let $=_s(e[2].split(`
`,1)[0],e[1].length),g=o.split(`
`,1)[0],E=!$.trim(),y=0;if(this.options.pedantic?(y=2,_=$.trimStart()):E?y=e[1].length+1:(y=$.search(this.rules.other.nonSpaceChar),y=y>4?1:y,_=$.slice(y),y+=e[1].length),E&&this.rules.other.blankLine.test(g)&&(d+=g+`
`,o=o.substring(g.length+1),a=!0),!a){let D=this.rules.other.nextBulletRegex(y),b=this.rules.other.hrRegex(y),T=this.rules.other.fencesBeginRegex(y),P=this.rules.other.headingBeginRegex(y),M=this.rules.other.htmlBeginRegex(y),O=this.rules.other.blockquoteBeginRegex(y);for(;o;){let F=o.split(`
`,1)[0],z;if(g=F,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),z=g):z=g.replace(this.rules.other.tabCharGlobal,"    "),T.test(g)||P.test(g)||M.test(g)||O.test(g)||D.test(g)||b.test(g))break;if(z.search(this.rules.other.nonSpaceChar)>=y||!g.trim())_+=`
`+z.slice(y);else{if(E||$.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||T.test($)||P.test($)||b.test($))break;_+=`
`+g}E=!g.trim(),d+=F+`
`,o=o.substring(F.length+1),$=z.slice(y)}}r.loose||(s?r.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(s=!0)),r.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),r.raw+=d}let l=r.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let a of r.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=_.checked,r.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=_.raw+a.tokens[0].raw,a.tokens[0].text=_.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(_)):a.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):a.tokens.unshift(_)}}if(!r.loose){let d=a.tokens.filter($=>$.type==="space"),_=d.length>0&&d.some($=>this.rules.other.anyLine.test($.raw));r.loose=_}}if(r.loose)for(let a of r.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return r}}html(o){let e=this.rules.block.html.exec(o);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(o){let e=this.rules.block.def.exec(o);if(e){let t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:e[0],href:n,title:r}}}table(o){let e=this.rules.block.table.exec(o);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let t=Cr(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(t.length===n.length){for(let s of n)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<t.length;s++)i.header.push({text:t[s],tokens:this.lexer.inline(t[s]),header:!0,align:i.align[s]});for(let s of r)i.rows.push(Cr(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(o){let e=this.rules.block.lheading.exec(o);if(e){let t=e[1].trim();return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:t,tokens:this.lexer.inline(t)}}}paragraph(o){let e=this.rules.block.paragraph.exec(o);if(e){let t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(o){let e=this.rules.block.text.exec(o);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(o){let e=this.rules.inline.escape.exec(o);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(o){let e=this.rules.inline.tag.exec(o);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(o){let e=this.rules.inline.link.exec(o);if(e){let t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let i=$t(t.slice(0,-1),"\\");if((t.length-i.length)%2===0)return}else{let i=us(e[2],"()");if(i===-2)return;if(i>-1){let s=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,s).trim(),e[3]=""}}let n=e[2],r="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(n);i&&(n=i[1],r=i[3])}else r=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?n=n.slice(1):n=n.slice(1,-1)),vr(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(o,e){let t;if((t=this.rules.inline.reflink.exec(o))||(t=this.rules.inline.nolink.exec(o))){let n=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=e[n.toLowerCase()];if(!r){let i=t[0].charAt(0);return{type:"text",raw:i,text:i}}return vr(t,r,t[0],this.lexer,this.rules)}}emStrong(o,e,t=""){let n=this.rules.inline.emStrongLDelim.exec(o);if(!(!n||!n[1]&&!n[2]&&!n[3]&&!n[4]||n[4]&&t.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[3])||!t||this.rules.inline.punctuation.exec(t))){let r=[...n[0]].length-1,i,s,l=r,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*o.length+r);(n=d.exec(e))!==null;){if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!i)continue;if(s=[...i].length,n[3]||n[4]){l+=s;continue}else if((n[5]||n[6])&&r%3&&!((r+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let _=[...n[0]][0].length,$=o.slice(0,r+n.index+_+s);if(Math.min(r,s)%2){let E=$.slice(1,-1);return{type:"em",raw:$,text:E,tokens:this.lexer.inlineTokens(E)}}let g=$.slice(2,-2);return{type:"strong",raw:$,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(o){let e=this.rules.inline.code.exec(o);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(t),r=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return n&&r&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(o){let e=this.rules.inline.br.exec(o);if(e)return{type:"br",raw:e[0]}}del(o,e,t=""){let n=this.rules.inline.delLDelim.exec(o);if(n&&(!n[1]||!t||this.rules.inline.punctuation.exec(t))){let r=[...n[0]].length-1,i,s,l=r,a=this.rules.inline.delRDelim;for(a.lastIndex=0,e=e.slice(-1*o.length+r);(n=a.exec(e))!==null;){if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!i||(s=[...i].length,s!==r))continue;if(n[3]||n[4]){l+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l);let d=[...n[0]][0].length,_=o.slice(0,r+n.index+d+s),$=_.slice(r,-r);return{type:"del",raw:_,text:$,tokens:this.lexer.inlineTokens($)}}}}autolink(o){let e=this.rules.inline.autolink.exec(o);if(e){let t,n;return e[2]==="@"?(t=e[1],n="mailto:"+t):(t=e[1],n=t),{type:"link",raw:e[0],text:t,href:n,tokens:[{type:"text",raw:t,text:t}]}}}url(o){let e;if(e=this.rules.inline.url.exec(o)){let t,n;if(e[2]==="@")t=e[0],n="mailto:"+t;else{let r;do r=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(r!==e[0]);t=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:t,href:n,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(o){let e=this.rules.inline.text.exec(o);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},be=class vn{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||et,this.options.tokenizer=this.options.tokenizer||new qt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:ge,block:Gt.normal,inline:gt.normal};this.options.pedantic?(t.block=Gt.pedantic,t.inline=gt.pedantic):this.options.gfm&&(t.block=Gt.gfm,this.options.breaks?t.inline=gt.breaks:t.inline=gt.gfm),this.tokenizer.rules=t}static get rules(){return{block:Gt,inline:gt}}static lex(e,t){return new vn(t).lex(e)}static lexInline(e,t){return new vn(t).inlineTokens(e)}lex(e){e=e.replace(ge.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){for(this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(ge.tabCharGlobal,"    ").replace(ge.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(s=>(r=s.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let s=t.at(-1);r.raw.length===1&&s!==void 0?s.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.at(-1).src=s.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startBlock){let s=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},l),typeof a=="number"&&a>=0&&(s=Math.min(s,a))}),s<1/0&&s>=0&&(i=e.substring(0,s+1))}if(this.state.top&&(r=this.tokenizer.paragraph(i))){let s=t.at(-1);n&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):t.push(r),n=i.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):t.push(r);continue}if(e){let s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e,r=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!==null;)a.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!==null;)n=n.slice(0,r.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!==null;)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+"["+"a".repeat(r[0].length-i-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let s=!1,l="";for(;e;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(_=>(a=_.call({lexer:this},e,t))?(e=e.substring(a.raw.length),t.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let _=t.at(-1);a.type==="text"&&_?.type==="text"?(_.raw+=a.raw,_.text+=a.text):t.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.del(e,n,l)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),t.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),t.push(a);continue}let d=e;if(this.options.extensions?.startInline){let _=1/0,$=e.slice(1),g;this.options.extensions.startInline.forEach(E=>{g=E.call({lexer:this},$),typeof g=="number"&&g>=0&&(_=Math.min(_,g))}),_<1/0&&_>=0&&(d=e.substring(0,_+1))}if(a=this.tokenizer.inlineText(d)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let _=t.at(-1);_?.type==="text"?(_.raw+=a.raw,_.text+=a.text):t.push(a);continue}if(e){let _="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return t}},Xt=class{options;parser;constructor(o){this.options=o||et}space(o){return""}code({text:o,lang:e,escaped:t}){let n=(e||"").match(ge.notSpaceStart)?.[0],r=o.replace(ge.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ke(n)+'">'+(t?r:ke(r,!0))+`</code></pre>
`:"<pre><code>"+(t?r:ke(r,!0))+`</code></pre>
`}blockquote({tokens:o}){return`<blockquote>
${this.parser.parse(o)}</blockquote>
`}html({text:o}){return o}def(o){return""}heading({tokens:o,depth:e}){return`<h${e}>${this.parser.parseInline(o)}</h${e}>
`}hr(o){return`<hr>
`}list(o){let e=o.ordered,t=o.start,n="";for(let s=0;s<o.items.length;s++){let l=o.items[s];n+=this.listitem(l)}let r=e?"ol":"ul",i=e&&t!==1?' start="'+t+'"':"";return"<"+r+i+`>
`+n+"</"+r+`>
`}listitem(o){return`<li>${this.parser.parse(o.tokens)}</li>
`}checkbox({checked:o}){return"<input "+(o?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:o}){return`<p>${this.parser.parseInline(o)}</p>
`}table(o){let e="",t="";for(let r=0;r<o.header.length;r++)t+=this.tablecell(o.header[r]);e+=this.tablerow({text:t});let n="";for(let r=0;r<o.rows.length;r++){let i=o.rows[r];t="";for(let s=0;s<i.length;s++)t+=this.tablecell(i[s]);n+=this.tablerow({text:t})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:o}){return`<tr>
${o}</tr>
`}tablecell(o){let e=this.parser.parseInline(o.tokens),t=o.header?"th":"td";return(o.align?`<${t} align="${o.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:o}){return`<strong>${this.parser.parseInline(o)}</strong>`}em({tokens:o}){return`<em>${this.parser.parseInline(o)}</em>`}codespan({text:o}){return`<code>${ke(o,!0)}</code>`}br(o){return"<br>"}del({tokens:o}){return`<del>${this.parser.parseInline(o)}</del>`}link({href:o,title:e,tokens:t}){let n=this.parser.parseInline(t),r=Sr(o);if(r===null)return n;o=r;let i='<a href="'+o+'"';return e&&(i+=' title="'+ke(e)+'"'),i+=">"+n+"</a>",i}image({href:o,title:e,text:t,tokens:n}){n&&(t=this.parser.parseInline(n,this.parser.textRenderer));let r=Sr(o);if(r===null)return ke(t);o=r;let i=`<img src="${o}" alt="${ke(t)}"`;return e&&(i+=` title="${ke(e)}"`),i+=">",i}text(o){return"tokens"in o&&o.tokens?this.parser.parseInline(o.tokens):"escaped"in o&&o.escaped?o.text:ke(o.text)}},qn=class{strong({text:o}){return o}em({text:o}){return o}codespan({text:o}){return o}del({text:o}){return o}html({text:o}){return o}text({text:o}){return o}link({text:o}){return""+o}image({text:o}){return""+o}br(){return""}checkbox({raw:o}){return o}},we=class Rn{options;renderer;textRenderer;constructor(e){this.options=e||et,this.options.renderer=this.options.renderer||new Xt,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new qn}static parse(e,t){return new Rn(t).parse(e)}static parseInline(e,t){return new Rn(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let s=r,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){t+=l||"";continue}}let i=r;switch(i.type){case"space":{t+=this.renderer.space(i);break}case"hr":{t+=this.renderer.hr(i);break}case"heading":{t+=this.renderer.heading(i);break}case"code":{t+=this.renderer.code(i);break}case"table":{t+=this.renderer.table(i);break}case"blockquote":{t+=this.renderer.blockquote(i);break}case"list":{t+=this.renderer.list(i);break}case"checkbox":{t+=this.renderer.checkbox(i);break}case"html":{t+=this.renderer.html(i);break}case"def":{t+=this.renderer.def(i);break}case"paragraph":{t+=this.renderer.paragraph(i);break}case"text":{t+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n="";for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=l||"";continue}}let s=i;switch(s.type){case"escape":{n+=t.text(s);break}case"html":{n+=t.html(s);break}case"link":{n+=t.link(s);break}case"image":{n+=t.image(s);break}case"checkbox":{n+=t.checkbox(s);break}case"strong":{n+=t.strong(s);break}case"em":{n+=t.em(s);break}case"codespan":{n+=t.codespan(s);break}case"br":{n+=t.br(s);break}case"del":{n+=t.del(s);break}case"text":{n+=t.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},It=class{options;block;constructor(o){this.options=o||et}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(o){return o}postprocess(o){return o}processAllTokens(o){return o}emStrongMask(o){return o}provideLexer(o=this.block){return o?be.lex:be.lexInline}provideParser(o=this.block){return o?we.parse:we.parseInline}},hs=class{defaults=Un();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=we;Renderer=Xt;TextRenderer=qn;Lexer=be;Tokenizer=qt;Hooks=It;constructor(...o){this.use(...o)}walkTokens(o,e){let t=[];for(let n of o)switch(t=t.concat(e.call(this,n)),n.type){case"table":{let r=n;for(let i of r.header)t=t.concat(this.walkTokens(i.tokens,e));for(let i of r.rows)for(let s of i)t=t.concat(this.walkTokens(s.tokens,e));break}case"list":{let r=n;t=t.concat(this.walkTokens(r.items,e));break}default:{let r=n;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(i=>{let s=r[i].flat(1/0);t=t.concat(this.walkTokens(s,e))}):r.tokens&&(t=t.concat(this.walkTokens(r.tokens,e)))}}return t}use(...o){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return o.forEach(t=>{let n={...t};if(n.async=this.defaults.async||n.async||!1,t.extensions&&(t.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let i=e.renderers[r.name];i?e.renderers[r.name]=function(...s){let l=r.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:e.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[r.level];i?i.unshift(r.tokenizer):e[r.level]=[r.tokenizer],r.start&&(r.level==="block"?e.startBlock?e.startBlock.push(r.start):e.startBlock=[r.start]:r.level==="inline"&&(e.startInline?e.startInline.push(r.start):e.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(e.childTokens[r.name]=r.childTokens)}),n.extensions=e),t.renderer){let r=this.defaults.renderer||new Xt(this.defaults);for(let i in t.renderer){if(!(i in r))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=t.renderer[s],a=r[s];r[s]=(...d)=>{let _=l.apply(r,d);return _===!1&&(_=a.apply(r,d)),_||""}}n.renderer=r}if(t.tokenizer){let r=this.defaults.tokenizer||new qt(this.defaults);for(let i in t.tokenizer){if(!(i in r))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=t.tokenizer[s],a=r[s];r[s]=(...d)=>{let _=l.apply(r,d);return _===!1&&(_=a.apply(r,d)),_}}n.tokenizer=r}if(t.hooks){let r=this.defaults.hooks||new It;for(let i in t.hooks){if(!(i in r))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=t.hooks[s],a=r[s];It.passThroughHooks.has(i)?r[s]=d=>{if(this.defaults.async&&It.passThroughHooksRespectAsync.has(i))return(async()=>{let $=await l.call(r,d);return a.call(r,$)})();let _=l.call(r,d);return a.call(r,_)}:r[s]=(...d)=>{if(this.defaults.async)return(async()=>{let $=await l.apply(r,d);return $===!1&&($=await a.apply(r,d)),$})();let _=l.apply(r,d);return _===!1&&(_=a.apply(r,d)),_}}n.hooks=r}if(t.walkTokens){let r=this.defaults.walkTokens,i=t.walkTokens;n.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),r&&(l=l.concat(r.call(this,s))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(o){return this.defaults={...this.defaults,...o},this}lexer(o,e){return be.lex(o,e??this.defaults)}parser(o,e){return we.parse(o,e??this.defaults)}parseMarkdown(o){return(e,t)=>{let n={...t},r={...this.defaults,...n},i=this.onError(!!r.silent,!!r.async);if(this.defaults.async===!0&&n.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=o),r.async)return(async()=>{let s=r.hooks?await r.hooks.preprocess(e):e,l=await(r.hooks?await r.hooks.provideLexer(o):o?be.lex:be.lexInline)(s,r),a=r.hooks?await r.hooks.processAllTokens(l):l;r.walkTokens&&await Promise.all(this.walkTokens(a,r.walkTokens));let d=await(r.hooks?await r.hooks.provideParser(o):o?we.parse:we.parseInline)(a,r);return r.hooks?await r.hooks.postprocess(d):d})().catch(i);try{r.hooks&&(e=r.hooks.preprocess(e));let s=(r.hooks?r.hooks.provideLexer(o):o?be.lex:be.lexInline)(e,r);r.hooks&&(s=r.hooks.processAllTokens(s)),r.walkTokens&&this.walkTokens(s,r.walkTokens);let l=(r.hooks?r.hooks.provideParser(o):o?we.parse:we.parseInline)(s,r);return r.hooks&&(l=r.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(o,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,o){let n="<p>An error occurred:</p><pre>"+ke(t.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(t);throw t}}},Je=new hs;function q(o,e){return Je.parse(o,e)}q.options=q.setOptions=function(o){return Je.setOptions(o),q.defaults=Je.defaults,ao(q.defaults),q};q.getDefaults=Un;q.defaults=et;q.use=function(...o){return Je.use(...o),q.defaults=Je.defaults,ao(q.defaults),q};q.walkTokens=function(o,e){return Je.walkTokens(o,e)};q.parseInline=Je.parseInline;q.Parser=we;q.parser=we.parse;q.Renderer=Xt;q.TextRenderer=qn;q.Lexer=be;q.lexer=be.lex;q.Tokenizer=qt;q.Hooks=It;q.parse=q;q.options;q.setOptions;q.use;q.walkTokens;q.parseInline;we.parse;be.lex;class ps{static render(e,t=!1){let n=e,r="";if(t){const s=Lr.parse(e);n=s.content,s.frontmatter&&(r=Lr.renderFrontmatter(s.frontmatter))}const i=q.parse(n);return`<div class="markdown-output">${r}${i}</div>`}}class fe{static render(e,t=!1){return ps.render(e,t)}}function fs(o){return{name:"render",description:"Render markdown file with formatting",execute:(e,t)=>{if(new B(e).hasFlag("help"))return{output:`Usage: render <file>
Or: <command> | render

Description:
  Render markdown with formatting and YAML frontmatter

Examples:
  render ~/blog/post.md   # Render file
  cat file.md | render    # Render from stdin`};let r;if(t)r=t;else if(e.length>0){const l=e[0];try{if(!o.exists(l))return{output:`render: ${l}: No such file or directory`,error:!0};if(!o.isFile(l))return{output:`render: ${l}: Is a directory`,error:!0};r=o.readFile(l)}catch(a){return{output:a instanceof Error?a.message:String(a),error:!0}}}else return{output:`render: missing file operand
Try 'render --help' for more information`,error:!0};const i=r.trim().startsWith("---");return{output:fe.render(r,i),html:!0}}}}const gs="hunter2",$s=300*1e3;function Ts(o,e){let t=null,n=3,r=null,i=null;function s(){return t===null?!1:Date.now()-t<$s}function l(){n=3}function a(){o.setUsername("root"),e.execute("export HOME=/root"),e.execute("export USER=root"),o.executeCommand("cd /root")}function d(){const g=`[sudo] password for ${o.getUsername()}: `;o.getInput().setInputType("password"),o.getInput().setPrompt(g),o.setInputInterceptor($)}function _(){o.getInput().setInputType("text"),o.setUsername(o.getUsername())}function $(g){if(g===gs){if(t=Date.now(),l(),_(),i&&r){const E=i,y=r;i=null,r=null,E==="su"||E==="su -"?(a(),y({output:""})):e.execute(E).then(D=>y(D))}}else n--,n<=0?(_(),r&&(r({output:"sudo: 3 incorrect password attempts",error:!0}),r=null,i=null),l()):(o.writeError("Sorry, try again."),d())}return{name:"sudo",description:"Execute a command as superuser",execute:(g,E)=>{if(new B(g).hasFlag("help"))return{output:`Usage: sudo <command>

Description:
  Execute a command as the superuser (root).
  Requires authentication via password.
  Authentication is cached for 5 minutes.

Options:
  --help               Show this help message

Examples:
  sudo ls /root        # List root's home directory as root
  sudo su              # Switch to root user
  sudo su -            # Switch to root user (login shell)`};if(g.length===0)return{output:"usage: sudo <command>",error:!0};const D=g.join(" ");if(D==="make me a sandwich")return{output:"Okay."};if(s()){const b=D.trim();return b==="su"||b==="su -"?(a(),{output:""}):e.execute(D)}return l(),new Promise(b=>{r=b,i=D,d()})}}}function As(o){return{name:"unalias",description:"Remove command aliases",execute:(e,t)=>{if(new B(e).hasFlag("help"))return{output:`Usage: unalias <name>

Description:
  Remove a command alias

Examples:
  unalias ll           # Remove the 'll' alias`};if(e.length===0)return{output:`Usage: unalias name
Try 'unalias --help' for more information.`,error:!0};const r=e[0];return o.removeAlias(r)?{output:`Alias removed: ${r}`}:{output:`unalias: ${r}: not found`,error:!0}}}}const ys=new Set(["about","portfolio","blog","contact","settings"]);function Es(o,e){return{name:"which",description:"Locate a command and display its path",execute:(t,n)=>{const r=new B(t);if(r.hasFlag("help"))return{output:`Usage: which [-a] <command> [command ...]

Description:
  Locate a command and display its path

Options:
  -a               Show all matching paths
  --help           Show this help message

Examples:
  which ls         # /usr/bin/ls
  which about      # /usr/local/bin/about
  which ll         # ll: aliased to ls -alh
  which ls cat     # Check multiple commands`};const i=r.getAllPositionals();if(i.length===0)return{output:`which: missing command argument
Usage: which [-a] <command> [command ...]`,error:!0};const s=r.hasFlag("a"),l=[];let a=!1;for(const _ of i){const $=Ls(_,o,e,s);$.error&&(a=!0),l.push($.output)}const d={output:l.join(`
`)};return a&&(d.error=!0),d}}}function Ls(o,e,t,n){const r=[],i=t.getAlias(o);if(i&&(r.push(`${o}: aliased to ${i}`),!n))return{output:r.join(`
`)};if(e.getCommandNames().includes(o.toLowerCase())){const a=ys.has(o.toLowerCase())?`/usr/local/bin/${o}`:`/usr/bin/${o}`;r.push(a)}return r.length===0?{output:`which: ${o}: command not found`,error:!0}:{output:r.join(`
`)}}function Is(o){return{name:"whoami",description:"Display current username",execute:(e,t)=>new B(e).hasFlag("help")?{output:`Usage: whoami

Description:
  Display the current username

Examples:
  whoami               # Show current user`}:{output:o.getUsername()}}}function bs(o){return{name:"cat",description:"Display file contents",execute:(e,t)=>{if(new B(e).hasFlag("help"))return{output:`Usage: cat <file>

Description:
  Display file contents

Examples:
  cat file.txt         # Display file
  cat ~/blog/post.md   # Display from path
  cat file.txt | grep hello  # Use in pipeline
  echo "data" | cat    # Read from stdin`};if(e.length===0)return t!==void 0?{output:t}:{output:`cat: missing file operand
Try 'cat --help' for more information`,error:!0};try{return{output:o.readFile(e[0])}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function ws(o,e,t){return{name:"cd",description:"Change directory (supports - for previous directory)",execute:(n,r)=>{if(new B(n).hasFlag("help"))return{output:`Usage: cd [directory]

Description:
  Change current working directory

Examples:
  cd                   # Go to home directory
  cd ~/blog            # Change to blog directory
  cd -                 # Go to previous directory`};try{let s=n[0]||"~";if(s==="-"&&t){const l=t.getVariable("OLDPWD");if(!l)return{output:"cd: OLDPWD not set",error:!0};s=l}if(t){const l=t.getVariable("PWD")??o.getCurrentPath();t.setVariable("OLDPWD",l)}return o.changeDirectory(s),t&&t.setVariable("PWD",o.getCurrentPath()),e(o.getShortPath()),{output:""}}catch(s){return{output:s instanceof Error?s.message:String(s),error:!0}}}}}function Ss(o,e){if(!e)return o.toString();const t=["B","K","M","G","T"];let n=o,r=0;for(;n>=1024&&r<t.length-1;)n/=1024,r++;return`${r===0?n.toString():n.toFixed(1)}${t[r]}`}function Cs(o){const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][o.getMonth()],n=o.getDate().toString().padStart(2," "),r=o.getHours().toString().padStart(2,"0"),i=o.getMinutes().toString().padStart(2,"0");return`${t} ${n} ${r}:${i}`}function Rr(o,e){const t=o.permissions??"-rw-r--r--",n="1",r=o.owner??"darin",i="staff",s=Ss(o.size??0,e),l=Cs(o.modifiedTime??new Date),a=o.name,d=s.padStart(6," ");return`${t}  ${n} ${r}  ${i}  ${d} ${l} ${a}`}function vs(o){const e=o.reduce((t,n)=>t+(n.size??0),0);return Math.ceil(e/512)}function Rs(o){return{name:"ls",description:"List directory contents",execute:(e,t)=>{try{const n=new B(e);if(n.hasFlag("help"))return{output:`Usage: ls [options] [path]

Description:
  List directory contents

Options:
  -a                   Show hidden files
  -l                   Long format with details
  -h                   Human-readable sizes

Examples:
  ls                   # List current directory
  ls -la               # List all files with details
  ls ~/blog            # List specific directory`};const r=n.getPositional(0)??".",i=n.hasFlag("a"),s=n.hasFlag("l"),l=n.hasFlag("h"),a=o.getNode(r);if(!a)return{output:`ls: cannot access '${r}': No such file or directory
Try 'ls --help' for more information`,error:!0};if(a.type==="file")return s?{output:Rr(a,l)}:{output:a.name};if(!a.children)return{output:""};let d=Array.from(a.children.values());return i||(d=d.filter(_=>!_.isHidden)),d.length===0?{output:""}:(d.sort((_,$)=>_.name.localeCompare($.name)),s?{output:[`total ${vs(d)}`,...d.map(g=>Rr(g,l))].join(`
`)}:{output:d.map($=>$.name).join("  ")})}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}const xs=`Usage: mkdir [OPTION]... DIRECTORY...

Description:
  Create directories in the filesystem

Options:
  -p                   Create parent directories as needed
  --help               Display this help and exit

Examples:
  mkdir mydir          # Create a directory
  mkdir -p a/b/c       # Create nested directories
  mkdir dir1 dir2      # Create multiple directories`;function Ns(o){return{name:"mkdir",description:"Create directories",execute:(e,t)=>{const n=new B(e);if(n.hasFlag("help"))return{output:xs};const r=n.hasFlag("p"),i=n.getAllPositionals();if(i.length===0)return{output:`mkdir: missing operand
Try 'mkdir --help' for more information`,error:!0};const s=[];let l=!1;for(const a of i)try{if(o.exists(a)&&o.isDirectory(a)){if(r)continue;s.push(`mkdir: cannot create directory '${a}': File exists`),l=!0;continue}if(!r){const d=a.replace(/\/+$/,"").split("/");if(d.length>1){const _=d.slice(0,-1).join("/")||"/";if(!o.exists(_)||!o.isDirectory(_)){s.push(`mkdir: cannot create directory '${a}': No such file or directory`),l=!0;continue}}}o.createDirectory(a)}catch(d){s.push(d instanceof Error?d.message:String(d)),l=!0}return{output:s.join(`
`),error:l}}}}function ks(o){return{name:"pwd",description:"Print working directory",execute:(e,t)=>new B(e).hasFlag("help")?{output:`Usage: pwd

Description:
  Print current working directory path

Examples:
  pwd                  # Show current directory`}:{output:o.getCurrentPath()}}}const Os=`Usage: rm [OPTION]... FILE...

Description:
  Remove files or directories from the filesystem

Options:
  -r, -R, --recursive  Remove directories and their contents recursively
  -f, --force          Ignore nonexistent files, never prompt
  --help               Display this help and exit

Examples:
  rm file.txt          # Remove a file
  rm -r mydir          # Remove a directory and its contents
  rm -f missing.txt    # No error if file doesn't exist
  rm -rf /             # Don't try this at home`;function Ms(){return'<div data-melt class="melt-trigger"></div>'}function Ds(o,e){return{name:"rm",description:"Remove files or directories",execute:(t,n)=>{const r=new B(t);if(r.hasFlag("help"))return{output:Os};const i=r.getFlag("recursive"),s=r.getFlag("force"),l=r.getFlag("f"),a=r.hasFlag("r")||r.hasFlag("R")||i!==void 0,d=r.hasFlag("f")||s!==void 0,_=[...r.getAllPositionals()];if(typeof i=="string"&&_.push(i),typeof s=="string"&&_.push(s),typeof l=="string"&&_.push(l),_.length===0)return{output:`rm: missing operand
Try 'rm --help' for more information`,error:!0};if(a&&d&&_.some(y=>y==="/"||y==="/*"))return{output:Ms(),html:!0};const $=[];let g=!1;for(const E of _)try{if(!o.exists(E)){d||($.push(`rm: cannot remove '${E}': No such file or directory`),g=!0);continue}if(o.isDirectory(E)){if(!a){$.push(`rm: cannot remove '${E}': Is a directory`),g=!0;continue}o.deleteDirectory(E,!0)}else{const b=E.startsWith("/")?E:`${o.getCurrentPath()}/${E}`.replace(/\/+/g,"/");if(b.startsWith("/usr/bin/")||b.startsWith("/usr/local/bin/")){const T=b.split("/").pop();T&&e.unregisterCommand(T)}o.deleteFile(E)}}catch(y){d||($.push(y instanceof Error?y.message:String(y)),g=!0)}return d?{output:"",error:!1}:{output:$.join(`
`),error:g}}}}const Ps=`Usage: rmdir DIRECTORY...

Description:
  Remove empty directories from the filesystem

Options:
  --help               Display this help and exit

Examples:
  rmdir mydir          # Remove an empty directory
  rmdir dir1 dir2      # Remove multiple empty directories`;function Fs(o){return{name:"rmdir",description:"Remove empty directories",execute:(e,t)=>{const n=new B(e);if(n.hasFlag("help"))return{output:Ps};const r=n.getAllPositionals();if(r.length===0)return{output:`rmdir: missing operand
Try 'rmdir --help' for more information`,error:!0};const i=[];let s=!1;for(const l of r)try{if(!o.exists(l)){i.push(`rmdir: failed to remove '${l}': No such file or directory`),s=!0;continue}if(!o.isDirectory(l)){i.push(`rmdir: failed to remove '${l}': Not a directory`),s=!0;continue}o.deleteDirectory(l)}catch(a){const d=a instanceof Error?a.message:String(a);i.push(d.replace(/^rm:/,"rmdir:")),s=!0}return{output:i.join(`
`),error:s}}}}function Hs(o){return{name:"tree",description:"Display directory tree structure",execute:(e,t)=>{try{const n=new B(e);if(n.hasFlag("help"))return{output:`Usage: tree [options] [path]

Description:
  Display directory tree structure

Options:
  -L <depth>           Limit tree depth (default: 4)

Examples:
  tree                 # Show tree of current directory
  tree ~/blog          # Show tree of specific directory
  tree -L 2            # Limit depth to 2 levels`};const r=n.getPositional(0)??".";let i=4;const s=n.getFlag("L");if(s!==void 0){if(typeof s=="boolean")return{output:`tree: -L flag requires a depth value
Try 'tree --help' for more information`,error:!0};const d=parseInt(s,10);if(isNaN(d)||d<1)return{output:`tree: invalid level, must be a positive integer
Try 'tree --help' for more information`,error:!0};i=d}return{output:o.getTree(r,i).join(`
`),scrollBehavior:"top"}}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}const Ee={HOME_DARIN:"/home/darin",HOME_GUEST:"/home/guest",CONTENT_BLOG:"/home/darin/blog",CONTENT_PORTFOLIO:"/home/darin/portfolio",CONTENT_POSTS:"/home/darin/posts",CONTENT_HELP:"/home/darin/content/help.md",CONTENT_ABOUT:"/home/darin/content/about.md",CONTENT_CONTACT:"/home/darin/content/contact.md",CONFIG_ALIASES:"/home/guest/.alias",CONFIG_SETTINGS:"/home/darin/.settings",CONFIG_ENV:"/home/darin/.env"},$o={CLEAR_SCREEN:"__CLEAR__"},xn={SETTINGS:"terminal_settings",ENVIRONMENT:"terminal_env_vars"},Ct={EMPTY_PORTFOLIO:"No portfolio projects yet. Check back soon!",EMPTY_BLOG:"No blog posts yet. Check back soon!",EMPTY_POSTS:"No notes yet. Check back soon!",NO_TAGS_AVAILABLE:"No tags available yet."},xr={theme:{preset:"dc",customColors:void 0},font:{size:16,family:"Fira Code"},effects:{scanLines:!1,glow:!1,border:!0,animationSpeed:1,soundEffects:!1,autoScrollBehavior:!0},prompt:{format:"\\W \\$ "},screensaver:{enabled:!0,timeoutMinutes:5,activeScreensaver:"matrix"}},bt={MIN_TIMEOUT_MINUTES:1,MAX_TIMEOUT_MINUTES:60,ACTIVITY_DEBOUNCE_MS:100};class ze{static makeCommandsClickable(e,t){const n=new Set(t);return e.replace(/<code>([^<]+)<\/code>/g,(r,i)=>{const s=i.trim();return n.has(s)?`<a data-command="${s}" class="command-link"><code>${s}</code></a>`:r})}static formatClickableTag(e,t){return`<button data-command="${`${t} --tags ${e}`}" class="tag-link">${e}</button>`}static formatPortfolioList(e,t){const n=t?`# Portfolio - Tag: ${t}`:"# Portfolio",r=e.map((s,l)=>{const a=s.tags?.map(_=>this.formatClickableTag(_,"portfolio")).join(" ")??"",d=a?`

**Tags:** ${a}`:"";return`### <a href="/portfolio/${s.id}" data-command="portfolio ${s.id}">${l+1}. ${s.title} (${s.year})</a>

${s.summary}${d}
`}).join(`

---

`);return`${n}

${r}${t?`

---

<a href="/portfolio" data-command="portfolio">← Back to All Projects</a>`:"\n\n---\n\n**Filter by tag:** Type `portfolio --tags <tag>` or `portfolio --tags` to list all tags"}`}static formatPortfolioDetail(e){const t=e.technologies.join(", "),n=e.impact?`**Impact:** ${e.impact}

`:"",r=e.tags?.map(s=>this.formatClickableTag(s,"portfolio")).join(" ")??"",i=r?`**Tags:** ${r}

`:"";return`# ${e.title}

**Year:** ${e.year}

${e.description}

**Technologies:** ${t}

${n}${i}---

<a href="/portfolio" data-command="portfolio">← Back to Portfolio</a>`}static formatBlogList(e,t){const n=t?`# Blog Posts - Tag: ${t}`:"# Blog Posts",r=e.map((s,l)=>{const a=s.tags.map(_=>this.formatClickableTag(_,"blog")).join(" "),d=e.length-l;return`### <a href="/blog/${s.id}" data-command="blog ${s.id}">${d}. ${s.title}</a>

**Date:** ${s.date}

${s.summary}

**Tags:** ${a}
`}).join(`

---

`);return`${n}

${r}${t?`

---

<a href="/blog" data-command="blog">← Back to All Posts</a>`:"\n\n---\n\n**Filter by tag:** Type `blog --tags <tag>` or `blog --tags` to list all tags"}`}static formatBlogPost(e){const t=e.tags.map(n=>this.formatClickableTag(n,"blog")).join(" ");return`# ${e.title}

**Date:** ${e.date}

---

${e.content}

---

**Tags:** ${t}

<a href="/blog" data-command="blog">← Back to Blog</a>`}static formatPostedLinks(e){if(!e||e.length===0)return{badges:"",links:""};const t=e.map(r=>r.platform).join(" · "),n=e.map(r=>`<a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.platform} →</a>`).join(" · ");return{badges:` · ${t}`,links:`

**Posted on:** ${n}`}}static formatPostList(e,t){const n=t?`# Notes - Tag: ${t}`:"# Notes",r=e.map((s,l)=>{const a=s.tags.map(g=>this.formatClickableTag(g,"notes")).join(" "),d=e.length-l,{badges:_,links:$}=this.formatPostedLinks(s.posted);return`### <a href="/notes/${s.id}" data-command="notes ${s.id}">${d}. ${s.title}</a>

**${s.date}**${_}

${s.content}${$}

**Tags:** ${a}
`}).join(`

---

`);return`${n}

${r}${t?`

---

<a href="/notes" data-command="notes">← Back to All Notes</a>`:"\n\n---\n\n**Filter by tag:** Type `notes --tags <tag>` or `notes --tags` to list all tags"}`}static formatPostDetail(e){const t=e.tags.map(i=>this.formatClickableTag(i,"notes")).join(" "),{badges:n,links:r}=this.formatPostedLinks(e.posted);return`# ${e.title}

**${e.date}**${n}

---

${e.content}${r}

---

**Tags:** ${t}

<a href="/notes" data-command="notes">← Back to Notes</a>`}}function Us(o,e=[]){return{name:"about",description:"Display bio and expertise overview",execute:(t,n)=>{if(new B(t).hasFlag("help"))return{output:`Usage: about

Description:
  Display professional bio and expertise overview

Examples:
  about                # Show bio and background`};try{const i=o.readFile(Ee.CONTENT_ABOUT),s=fe.render(i);return{output:ze.makeCommandsClickable(s,e),html:!0,scrollBehavior:"top"}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}}}function Xn(o){const e=o.split(`
`);if(e[0]?.trim()!=="---")throw new Error("Invalid frontmatter: must start with ---");let t=-1;for(let n=1;n<e.length;n++)if(e[n].trim()==="---"){t=n;break}if(t===-1)throw new Error("Invalid frontmatter: no closing ---");return{frontmatterLines:e.slice(1,t),markdown:e.slice(t+1).join(`
`).trim()}}function Nr(o){return o.replace(/^["']|["']$/g,"")}function To(o){return o.startsWith("[")&&o.endsWith("]")?o.substring(1,o.length-1).split(",").map(e=>Nr(e.trim())).filter(e=>e.length>0):Nr(o)}function Ao(o){const e={};for(const t of o){const n=t.indexOf(":");if(n===-1)continue;const r=t.substring(0,n).trim();e[r]=To(t.substring(n+1).trim())}return e}function Nn(o){return o.replace(/^\d{4}-\d{2}-\d{2}-(\d{2}-)?/,"").replace(/\.md$/,"")}function Bs(o){if(typeof o!="object"||o===null)return!1;const e=o;return typeof e.title=="string"&&typeof e.date=="string"&&typeof e.summary=="string"&&Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string")}class yo{static parseFrontmatter(e){const{frontmatterLines:t,markdown:n}=Xn(e),r=Ao(t);if(!Bs(r)){const i=[];throw r.title||i.push("title"),r.date||i.push("date"),r.summary||i.push("summary"),Array.isArray(r.tags)||i.push("tags"),new Error(`Invalid blog frontmatter: missing or invalid fields: ${i.join(", ")}`)}return{frontmatter:r,markdown:n}}static parseBlogPost(e,t){const{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:Nn(e),title:n.title,date:n.date,summary:n.summary,content:r,tags:n.tags}}static getIdFromFilename(e){return Nn(e)}}function Tt(o){return{output:fe.render(o),html:!0,scrollBehavior:"top"}}function Eo(o,e){const{name:t,pluralNoun:n}=e;return{name:t,description:e.description,execute:(r,i)=>{const s=new B(r);if(s.hasFlag("help"))return{output:e.help};try{const l=o.list(e.dir).filter(y=>y.endsWith(".md")).sort().reverse(),a=s.getFlag("tags"),d=s.hasFlag("tags"),_=s.getPositional(0),$=l.map(y=>e.parse(y,o.readFile(`${e.dir}/${y}`)));if($.length===0&&!d&&!_)return Tt(`# ${e.heading}

${e.emptyMessage}`);if(d&&(typeof a=="boolean"||!a)){const y=new Map;$.forEach(T=>T.tags?.forEach(P=>y.set(P,(y.get(P)??0)+1)));const D=Array.from(y.keys()).sort();if(D.length===0)return Tt(`# ${e.tagsHeading}

${Ct.NO_TAGS_AVAILABLE}`);const b=D.map(T=>{const P=y.get(T)??0;return`- <button data-command="${t} --tags ${T}" class="tag-link">${T}</button> (${P} ${e.countNoun}${P!==1?"s":""})`}).join(`
`);return Tt(`# ${e.tagsHeading}

${b}

---

**Usage:** Type \`${t} --tags <tag>\` to filter ${n}`)}if(_){const y=parseInt(_,10),D=!isNaN(y)&&y>0&&y<=$.length?$[$.length-y]:$.find(b=>b.id===_);return D?Tt(e.formatDetail(D)):{output:`${e.notFoundLabel} '${_}' not found.
Use '${t}' to list all ${n}.
Try '${t} --help' for more information`,error:!0}}let g=$;const E=typeof a=="string"?a:void 0;if(E&&(g=$.filter(y=>y.tags.some(D=>D.toLowerCase()===E.toLowerCase())),g.length===0)){const y=Array.from($.flatMap(b=>b.tags??[]).reduce((b,T)=>b.set(T,(b.get(T)??0)+1),new Map).entries()).sort((b,T)=>T[1]-b[1]).slice(0,5).map(([b])=>b),D=y.length>0?`
Try one of these tags: ${y.join(", ")}`:"";return{output:`No ${e.filterMissLabel} found with tag '${E}'.${D}
Use '${t}' to see all ${n}.`,error:!1}}return Tt(e.formatList(g,E))}catch(l){return{output:l instanceof Error?l.message:String(l),error:!0}}}}}function Ws(o){return Eo(o,{name:"blog",description:"List and read blog posts",help:`Usage: blog [options] [post-id|number]

Description:
  List and read blog posts

Options:
  --tags               List all available tags
  --tags <tag>         Filter posts by tag

Examples:
  blog                          # List all posts
  blog 1                        # Read post #1
  blog --tags                   # List all tags
  blog --tags AI                # Filter by single-word tag
  blog --tags Web-Development   # Filter by hyphenated tag
  blog --tags "Web Development" # Filter by quoted multi-word tag
  blog post-id                  # Read specific post by ID`,dir:Ee.CONTENT_BLOG,emptyMessage:Ct.EMPTY_BLOG,heading:"Blog",tagsHeading:"Blog Tags",countNoun:"post",pluralNoun:"posts",notFoundLabel:"Blog post",filterMissLabel:"blog posts",parse:(e,t)=>yo.parseBlogPost(e,t),formatList:(e,t)=>ze.formatBlogList(e,t),formatDetail:e=>ze.formatBlogPost(e)})}class qe{static parse(e){const t=[],n=e.split(`
`);let r=null,i=null,s=[];const l=/^## \[([^\]]+)\] - (\d{4}-\d{2}-\d{2})/,a=/^### (\w+)/,d=/^- (.+)/;for(const _ of n){const $=l.exec(_);if($){r&&(r.rawContent=s.join(`
`).trim(),t.push(r)),r={version:$[1],date:$[2],sections:{},rawContent:""},i=null,s=[_];continue}r&&s.push(_);const g=a.exec(_);if(g&&r){i=g[1],r.sections[i]=[];continue}const E=d.exec(_);E&&r&&i&&r.sections[i].push(E[1])}return r&&(r.rawContent=s.join(`
`).trim(),t.push(r)),t}static getVersion(e,t){return e.find(n=>n.version===t)}static getByIndex(e,t){if(!(t<1||t>e.length))return e[t-1]}static formatEntry(e){const t=[];t.push(`## Version ${e.version}`),t.push(`*Released: ${e.date}*`),t.push("");for(const[n,r]of Object.entries(e.sections)){t.push(`### ${n}`);for(const i of r)t.push(`- ${i}`);t.push("")}return t.join(`
`)}static formatEntries(e){const t=`# Changelog

All notable changes to this project are documented here.

---

`,n=e.map(r=>this.formatEntry(r)).join(`
---

`);return t+n}}function Gs(o){return{name:"changelog",description:"View project version history",execute:(e,t)=>{const n=new B(e);if(n.hasFlag("help"))return{output:`Usage: changelog [options] [version|number]

Description:
  View the project's version history and release notes

Arguments:
  <version>            Show a specific version (e.g., 0.22.0)
  <number>             Show Nth most recent version (e.g., 1 = latest)
  latest               Alias for 1 (show most recent)

Options:
  --help               Show this help message

Examples:
  changelog                  # Show all versions
  changelog latest           # Show latest version
  changelog 1                # Show latest version
  changelog 3                # Show 3rd most recent version
  changelog 0.22.0           # Show specific version`};try{const r=qe.parse(o);if(r.length===0)return{output:"No changelog entries found.",error:!0};const i=n.getPositional(0);if(i){if(i.toLowerCase()==="latest"){const g=r[0],E=qe.formatEntry(g);return{output:fe.render(E),html:!0,scrollBehavior:"top"}}if(/^\d+$/.test(i)){const g=parseInt(i,10);if(g>0){const E=qe.getByIndex(r,g);if(!E)return{output:`Version at position ${g} not found. There are ${r.length} versions available.
Try 'changelog --help' for more information.`,error:!0};const y=qe.formatEntry(E);return{output:fe.render(y),html:!0,scrollBehavior:"top"}}}const d=qe.getVersion(r,i);if(!d){const g=r.slice(0,5).map(E=>E.version).join(", ");return{output:`Version '${i}' not found.
Recent versions: ${g}
Try 'changelog --help' for more information.`,error:!0}}const _=qe.formatEntry(d);return{output:fe.render(_),html:!0,scrollBehavior:"top"}}const s=qe.formatEntries(r);return{output:fe.render(s),html:!0,scrollBehavior:"top"}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function zs(o){return{name:"contact",description:"Display contact information",execute:(e,t)=>{if(new B(e).hasFlag("help"))return{output:`Usage: contact

Description:
  Display contact information and professional links

Examples:
  contact              # Show contact details`};try{const r=o.readFile(Ee.CONTENT_CONTACT);return{output:fe.render(r),html:!0}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Vs(o){if(typeof o!="object"||o===null)return!1;const e=o;return typeof e.title=="string"&&typeof e.date=="string"&&Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string")}function js(o){const e=[];let t=null;for(const n of o){const r=n.trim();if(r.startsWith("- ")){t?.platform&&t?.url&&e.push({platform:t.platform,url:t.url}),t={};const i=r.substring(2).trim(),s=i.indexOf(":");if(s!==-1){const l=i.substring(0,s).trim(),a=i.substring(s+1).trim().replace(/^["']|["']$/g,"");l==="platform"&&(t.platform=a),l==="url"&&(t.url=a)}}else if(t){const i=r.indexOf(":");if(i!==-1){const s=r.substring(0,i).trim(),l=r.substring(i+1).trim().replace(/^["']|["']$/g,"");s==="platform"&&(t.platform=l),s==="url"&&(t.url=l)}}}return t?.platform&&t?.url&&e.push({platform:t.platform,url:t.url}),e}class Lo{static parseFrontmatter(e){const{frontmatterLines:t,markdown:n}=Xn(e),r={};let i=0;for(;i<t.length;){const s=t[i],l=s.indexOf(":");if(l===-1){i++;continue}const a=s.substring(0,l).trim(),d=s.substring(l+1).trim();if(a==="posted"&&d===""){const _=[];for(i++;i<t.length;){const $=t[i];if(/^\s+(- |[\w])/.exec($))_.push($),i++;else break}r[a]=js(_);continue}r[a]=To(d),i++}if(!Vs(r)){const s=[];throw r.title||s.push("title"),r.date||s.push("date"),Array.isArray(r.tags)||s.push("tags"),new Error(`Invalid post frontmatter: missing or invalid fields: ${s.join(", ")}`)}return{frontmatter:r,markdown:n}}static parsePost(e,t){const{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:this.getIdFromFilename(e),title:n.title,date:n.date,content:r,tags:n.tags,...n.posted&&n.posted.length>0&&{posted:n.posted}}}static getIdFromFilename(e){return Nn(e)}}function Ys(o){return Eo(o,{name:"notes",description:"List and read short-form notes",help:`Usage: notes [options] [note-id|number]

Description:
  List and read short-form notes

Options:
  --tags               List all available tags
  --tags <tag>         Filter notes by tag

Examples:
  notes                         # List all notes
  notes 1                       # Read note #1
  notes --tags                  # List all tags
  notes --tags AI               # Filter by single-word tag
  notes --tags Web-Development  # Filter by hyphenated tag
  notes note-id                 # Read specific note by ID`,dir:Ee.CONTENT_POSTS,emptyMessage:Ct.EMPTY_POSTS,heading:"Notes",tagsHeading:"Note Tags",countNoun:"note",pluralNoun:"notes",notFoundLabel:"Note",filterMissLabel:"notes",parse:(e,t)=>Lo.parsePost(e,t),formatList:(e,t)=>ze.formatPostList(e,t),formatDetail:e=>ze.formatPostDetail(e)})}function qs(o){if(typeof o!="object"||o===null)return!1;const e=o;return typeof e.id=="string"&&typeof e.title=="string"&&typeof e.summary=="string"&&typeof e.year=="string"&&typeof e.order=="number"&&Array.isArray(e.technologies)&&e.technologies.every(t=>typeof t=="string")&&(e.impact===void 0||typeof e.impact=="string")&&(e.tags===void 0||Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string"))}class Xs{static parseFrontmatter(e){const{frontmatterLines:t,markdown:n}=Xn(e),r=Ao(t);if(typeof r.order=="string"){const i=Number(r.order);isNaN(i)||(r.order=i)}if(!qs(r)){const i=[];throw r.id||i.push("id"),r.title||i.push("title"),r.summary||i.push("summary"),r.year||i.push("year"),typeof r.order!="number"&&i.push("order"),Array.isArray(r.technologies)||i.push("technologies"),new Error(`Invalid portfolio frontmatter: missing or invalid fields: ${i.join(", ")}`)}return{frontmatter:r,markdown:n}}static parseProject(e,t){const{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:n.id||e.replace(/\.md$/,""),title:n.title,summary:n.summary,description:r,technologies:n.technologies,impact:n.impact,year:n.year,order:n.order,tags:n.tags}}static getIdFromFilename(e){return e.replace(/\.md$/,"")}}function Ks(o){return{name:"portfolio",description:"Showcase projects and accomplishments",execute:(e,t)=>{const n=new B(e);if(n.hasFlag("help"))return{output:`Usage: portfolio [options] [project-id|number]

Description:
  Showcase projects and accomplishments

Options:
  --tags               List all available tags
  --tags <tag>         Filter projects by tag
  --tags <tag1,tag2>   Filter by multiple tags (shows projects with ANY tag)

Examples:
  portfolio                     # List all projects
  portfolio 1                   # View project #1
  portfolio --tags              # Show available tags
  portfolio --tags major        # Filter by single tag
  portfolio --tags major,patents  # Filter by multiple tags
  portfolio proj-id             # View specific project by ID`};const r=Ee.CONTENT_PORTFOLIO;try{const s=o.list(r).filter(b=>b.endsWith(".md")),l=n.getFlag("tags"),a=n.hasFlag("tags"),d=n.getPositional(0),_=[];for(const b of s){const T=o.readFile(`${r}/${b}`);if(T)try{const P=Xs.parseProject(b,T);_.push(P)}catch(P){console.error(`Error parsing ${b}:`,P)}}if(_.sort((b,T)=>b.order!==T.order?b.order-T.order:b.title.localeCompare(T.title)),_.length===0&&!a&&!d){const b=`# Portfolio

${Ct.EMPTY_PORTFOLIO}`;return{output:fe.render(b),html:!0,scrollBehavior:"top"}}if(a&&(typeof l=="boolean"||!l)){const b=new Set,T=new Map;_.forEach(z=>{z.tags?.forEach(K=>{b.add(K),T.set(K,(T.get(K)??0)+1)})});const P=Array.from(b).sort();if(P.length===0){const z=`# Portfolio Tags

${Ct.NO_TAGS_AVAILABLE}`;return{output:fe.render(z),html:!0,scrollBehavior:"top"}}const O=`# Portfolio Tags

${P.map(z=>{const K=T.get(z)??0;return`- <button data-command="portfolio --tags ${z}" class="tag-link">${z}</button> (${K} project${K!==1?"s":""})`}).join(`
`)}

---

**Usage:** Type \`portfolio --tags <tag>\` to filter projects`;return{output:fe.render(O),html:!0,scrollBehavior:"top"}}if(d){let b;const T=parseInt(d,10);if(!isNaN(T)&&T>0&&T<=_.length){const O=T-1;b=_[O]}else b=_.find(O=>O.id===d);if(!b)return{output:`Project '${d}' not found.
Use 'portfolio' to list all projects.
Try 'portfolio --help' for more information`,error:!0};const P=ze.formatPortfolioDetail(b);return{output:fe.render(P),html:!0,scrollBehavior:"top"}}let $=_,g=[];if(a&&typeof l=="string"&&(g=l.split(",").map(b=>b.trim().toLowerCase()),$=_.filter(b=>b.tags?.some(T=>g.includes(T.toLowerCase()))),$.length===0)){const b=g.map(O=>`'${O}'`).join(", "),T=new Map;_.forEach(O=>{O.tags?.forEach(F=>{T.set(F,(T.get(F)??0)+1)})});const P=Array.from(T.entries()).sort((O,F)=>F[1]-O[1]).slice(0,5).map(([O])=>O),M=P.length>0?`
Try one of these tags: ${P.join(", ")}`:"";return{output:`No projects found with tag${g.length>1?"s":""} ${b}.${M}
Use 'portfolio' to see all projects.`,error:!1}}const E=g.length>0?g.join(", "):void 0,y=ze.formatPortfolioList($,E);return{output:fe.render(y),html:!0,scrollBehavior:"top"}}catch(i){return{output:`Error loading portfolio: ${String(i)}`,error:!0}}}}}function Io(o,e){const t=o.loadSettings(),n=e.getPresets();return`<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true"><h2>Terminal Settings</h2><section class="settings-section"><h3>Color Theme</h3>${Zs(n,t.theme.preset)}</section><section class="settings-section"><details ${t.theme.preset==="custom"?"open":""}><summary>Advanced: Custom Colors</summary>${Js(t.theme.customColors)}</details></section><section class="settings-section"><h3>Font</h3>${Qs(t.font)}</section><section class="settings-section"><h3>Effects</h3>${ea(t.effects)}</section><section class="settings-section"><h3>Screensaver</h3>${ta(t.screensaver)}</section><div class="settings-actions"><button data-command="settings reset" class="btn-reset">Reset to Defaults</button></div></aside>`}function Zs(o,e){return'<div class="theme-buttons-container">'+o.map(t=>`<button class="theme-button ${t.name===e?"active":""}" data-command="settings set theme ${t.name}" data-theme="${t.name}" style="background: ${t.colors["--terminal-bg"]}; color: ${t.colors["--terminal-accent"]}; border-color: ${t.colors["--terminal-accent"]};"><span class="theme-preview" style="background: ${t.colors["--terminal-accent"]}"></span>${t.displayName}</button>`).join("")+"</div>"}function Js(o){return[{key:"--terminal-bg",label:"Background",prop:"background"},{key:"--terminal-bg-secondary",label:"BG (Secondary)",prop:"backgroundSecondary"},{key:"--terminal-fg",label:"Foreground",prop:"foreground"},{key:"--terminal-accent",label:"Accent",prop:"accent"},{key:"--terminal-dim",label:"Dim",prop:"dim"},{key:"--terminal-error",label:"Error",prop:"error"},{key:"--terminal-cursor",label:"Cursor",prop:"cursor"}].map(t=>{const n=o?.[t.prop]??(typeof window<"u"?getComputedStyle(document.documentElement).getPropertyValue(t.key).trim():"#000000");return`<div class="color-picker-group"><label>${t.label}</label><input type="color" value="${n}" data-command-template="settings set color ${t.key}" data-color-var="${t.key}"/><span class="color-value">${o?.[t.prop]??"default"}</span></div>`}).join("")}function Qs(o){const e=["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"];return`<div class="setting-group"><label>Font Size: <span id="font-size-value">${o.size}px</span></label><input type="range" min="8" max="24" step="1" value="${o.size}" aria-label="Font size" aria-valuemin="8" aria-valuemax="24" aria-valuenow="${o.size}" aria-valuetext="${o.size} pixels" data-command-template="settings set font-size" data-setting-type="font-size"/></div><div class="setting-group"><label>Font Family</label><select aria-label="Font family" data-command-template="settings set font-family" data-setting-type="font-family">${e.map(t=>`<option value="${t}" ${t===o.family?"selected":""}>${t}</option>`).join("")}</select></div>`}function ea(o){return`<div class="setting-group"><label><input type="checkbox" ${o.scanLines?"checked":""} data-command-template="settings set scan-lines" data-setting-type="scan-lines"/>Scan Lines</label></div><div class="setting-group"><label><input type="checkbox" ${o.glow?"checked":""} data-command-template="settings set glow" data-setting-type="glow"/>Glow Effect</label></div><div class="setting-group"><label><input type="checkbox" ${o.border?"checked":""} data-command-template="settings set border" data-setting-type="border"/>Page Border</label></div><div class="setting-group"><label>Animation Speed: <span id="animation-speed-value">${o.animationSpeed}x</span></label><input type="range" min="0.5" max="2.0" step="0.1" value="${o.animationSpeed}" aria-label="Animation speed" aria-valuemin="0.5" aria-valuemax="2" aria-valuenow="${o.animationSpeed}" aria-valuetext="${o.animationSpeed} times speed" data-command-template="settings set animation-speed" data-setting-type="animation-speed"/></div><div class="setting-group"><label><input type="checkbox" ${o.soundEffects?"checked":""} data-command-template="settings set sound-effects" data-setting-type="sound-effects"/>Sound Effects (future feature)</label></div>`}function ta(o){const e=[{value:"matrix",label:"Matrix Digital Rain"},{value:"life",label:"Conway's Game of Life"}];return`<div class="setting-group"><label><input type="checkbox" ${o.enabled?"checked":""} data-command-template="settings set screensaver-enabled" data-setting-type="screensaver-enabled"/>Enable Screensaver</label></div><div class="setting-group"><label>Timeout: <span id="screensaver-timeout-value">${o.timeoutMinutes}min</span></label><input type="range" min="1" max="60" step="1" value="${o.timeoutMinutes}" aria-label="Screensaver timeout" aria-valuemin="1" aria-valuemax="60" aria-valuenow="${o.timeoutMinutes}" aria-valuetext="${o.timeoutMinutes} minutes" data-command-template="settings set screensaver-timeout" data-setting-type="screensaver-timeout"/></div><div class="setting-group"><label>Screensaver Type</label><select aria-label="Screensaver type" data-command-template="settings set screensaver-type" data-setting-type="screensaver-type">${e.map(t=>`<option value="${t.value}" ${t.value===o.activeScreensaver?"selected":""}>${t.label}</option>`).join("")}</select></div>`}function na(o,e,t){return{name:"settings",description:"Manage terminal settings and preferences",aliases:["preferences","config"],execute:(n,r)=>{const i=new B(n);if(i.hasFlag("help"))return{output:`Usage: settings [subcommand] [options]

Description:
  Manage terminal settings and preferences

Subcommands:
  (no args)            Show interactive settings UI
  list                 Display current settings
  set <setting> <val>  Change a setting
  reset                Reset to defaults

Examples:
  settings             # Interactive UI
  settings list        # Show all settings
  settings set theme green  # Change theme
  settings set font-size 16  # Set font size
  settings reset       # Reset all settings`};if(n.length===0)return{output:Io(e,t),html:!0};const s=i.getPositional(0);switch(s){case"list":return ra(e,t);case"set":return kr(i,e,t);case"reset":return oa(e,t);case"theme":case"font-size":case"font-family":case"fontSize":case"fontFamily":case"scan-lines":case"scanLines":case"glow":case"border":case"animation-speed":case"animationSpeed":case"sound":case"auto-scroll":case"autoScroll":case"prompt":case"screensaver-enabled":case"screensaverEnabled":case"screensaver-timeout":case"screensaverTimeout":case"screensaver-type":case"screensaverType":return kr(new B(["set",s,...n.slice(1)]),e,t);default:return{output:`Unknown subcommand: ${s}.
Try 'settings --help' for more information`,error:!0}}}}}function ra(o,e){const t=ia(o,e);return{output:fe.render(t),html:!0}}function kr(o,e,t){const n=o.getPositional(1),r=o.getPositional(2);if(!n)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};if(n!=="color"&&!r)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};try{switch(n){case"theme":{const i=["green","yellow","white","light-blue","paper","dc"];return i.includes(r)?(e.setSetting("theme",{preset:r}),t.applyTheme(r),me(),{output:`Theme changed to: ${r}`}):{output:`Invalid theme: ${r}. Available: ${i.join(", ")}`,error:!0}}case"color":{const i=["terminal-bg","terminal-fg","terminal-accent","terminal-dim","terminal-error","terminal-cursor","terminal-bg-secondary"];let s,l;for(const d of i){const _=o.getFlag(d);if(_&&typeof _=="string"){s="--"+d,l=_;break}}if(!s||!l)return{output:`Usage: settings set color <variable> <value>
Example: settings set color --terminal-accent #ff0000`,error:!0};const a={[s]:l};return t.applyCustomColors(a),me(),{output:`Color ${s} set to ${l}`}}case"font-size":case"fontSize":{if(!r)return{output:"Font size value required",error:!0};const i=parseInt(r,10);return isNaN(i)?{output:"Font size must be a number (8-24)",error:!0}:(e.setFontSize(i),kn(e),me(),{output:`Font size set to: ${i}px`})}case"font-family":case"fontFamily":{if(!r)return{output:"Font family value required",error:!0};const i=["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"];return i.includes(r)?(e.setFontFamily(r),kn(e),me(),{output:`Font family set to: ${r}`}):{output:`Invalid font family: ${r}. Available: ${i.join(", ")}`,error:!0}}case"scan-lines":case"scanLines":{if(!r)return{output:"Scan lines value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Scan lines must be "on" or "off"',error:!0};const i=r==="on";return e.setScanLines(i),bo(i),me(),{output:`Scan lines: ${r}`}}case"glow":{if(!r)return{output:"Glow value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Glow must be "on" or "off"',error:!0};const i=r==="on";return e.setGlow(i),wo(i),me(),{output:`Glow: ${r}`}}case"border":{if(!r)return{output:"Border value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Border must be "on" or "off"',error:!0};const i=r==="on";return e.setBorder(i),So(i),me(),{output:`Border: ${r}`}}case"animation-speed":case"animationSpeed":{if(!r)return{output:"Animation speed value required",error:!0};const i=parseFloat(r);return isNaN(i)?{output:"Animation speed must be a number (0.5-2.0)",error:!0}:(e.setAnimationSpeed(i),Co(i),me(),{output:`Animation speed set to: ${i}x`})}case"sound-effects":case"sound":{if(!r)return{output:"Sound effects value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Sound effects must be "on" or "off"',error:!0};const i=r==="on";return e.setSoundEffects(i),me(),{output:`Sound effects: ${r}`}}case"autoscroll":case"auto-scroll":case"autoScroll":{if(!r)return{output:"Autoscroll value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Autoscroll must be "on" or "off"',error:!0};const i=r==="on";return e.setAutoScrollBehavior(i),me(),{output:`Autoscroll: ${r} - ${i?"Long content (>50 lines) scrolls to command line":"All content scrolls to bottom"}`}}case"prompt":return r?(e.setPromptFormat(r),me(),{output:`Prompt format set to: ${r}`}):{output:"Prompt format value required",error:!0};case"screensaver-enabled":case"screensaverEnabled":{if(!r)return{output:"Screensaver enabled value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Screensaver enabled must be "on" or "off"',error:!0};const i=r==="on";return e.setScreensaverEnabled(i),me(),{output:`Screensaver: ${r}`}}case"screensaver-timeout":case"screensaverTimeout":{if(!r)return{output:"Screensaver timeout value required (1-60 minutes)",error:!0};const i=parseInt(r,10);return isNaN(i)||i<1||i>60?{output:"Screensaver timeout must be between 1 and 60 minutes",error:!0}:(e.setScreensaverTimeout(i),me(),{output:`Screensaver timeout set to: ${i} minutes`})}case"screensaver-type":case"screensaverType":{if(!r)return{output:"Screensaver type value required",error:!0};const i=["matrix","life"];return i.includes(r)?(e.setActiveScreensaver(r),me(),{output:`Screensaver type set to: ${r}`}):{output:`Invalid screensaver type: ${r}. Available: ${i.join(", ")}`,error:!0}}default:return{output:`Unknown setting: ${n}. Available: theme, color, font-size, font-family, scan-lines, glow, border, animation-speed, sound-effects, autoscroll, prompt, screensaver-enabled, screensaver-timeout, screensaver-type`,error:!0}}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}function oa(o,e){return o.reset(),e.applyCurrentTheme(),kn(o),bo(o.getScanLines()),wo(o.getGlow()),So(o.getBorder()),Co(o.getAnimationSpeed()),me(),{output:"Settings reset to defaults."}}function ia(o,e){const t=o.loadSettings(),n=e.getPresets();return`# Terminal Settings

## Current Configuration

### Theme
**${t.theme.preset==="custom"?"Custom":n.find(i=>i.name===t.theme.preset)?.displayName??t.theme.preset}**

### Font
- **Size:** ${t.font.size}px
- **Family:** ${t.font.family}

### Prompt
- **Format:** \`${t.prompt.format}\`

### Effects
- **Scan Lines:** ${t.effects.scanLines?"Enabled":"Disabled"}
- **Glow:** ${t.effects.glow?"Enabled":"Disabled"}
- **Border:** ${t.effects.border?"Enabled":"Disabled"}
- **Animation Speed:** ${t.effects.animationSpeed}x
- **Sound Effects:** ${t.effects.soundEffects?"Enabled":"Disabled"}
- **Autoscroll:** ${t.effects.autoScrollBehavior?"Enabled (smart)":"Disabled (classic)"}

## Available Themes

${n.map(i=>`- **${i.name}**: ${i.displayName}`).join(`
`)}

## Usage Examples

\`\`\`bash
settings set theme green            # Change to green theme
settings set theme yellow           # Change to yellow theme
settings set font-size 16           # Set font to 16px
settings set font-family Monaco     # Change font family
settings set scan-lines off         # Disable scan lines
settings set glow off               # Disable glow effect
settings set border on              # Enable page border
settings set animation-speed 1.5    # Speed up animations
settings set autoscroll on          # Smart scroll for long content
settings set autoscroll off         # Classic scroll to bottom
settings reset                      # Reset all to defaults
\`\`\`

For custom colors:
\`\`\`bash
settings set color --terminal-accent #ff0000
\`\`\`

For custom prompt (bash-style escapes supported):
\`\`\`bash
settings set prompt "\\\\u@\\\\h:\\\\W\\\\$ "    # user@host:lastdir$
settings set prompt "\\\\W\\\\$ "              # lastdir$ (minimal)
settings set prompt "[\\\\u] \\\\W> "          # [user] lastdir>
\`\`\`

Available prompt escapes:
- \\\\u = username
- \\\\h = hostname
- \\\\w = full working directory
- \\\\W = last directory name only
- \\\\$ = $ (or # if root)
- \\\\t = current time (24-hour HH:MM:SS)
- \\\\d = current date
`}function kn(o){const e=o.getSetting("font");typeof document<"u"&&(document.documentElement.style.setProperty("--terminal-font-size",`${e.size}px`),document.documentElement.style.setProperty("--terminal-font-family",e.family))}function bo(o){typeof document<"u"&&(o?document.body.classList.remove("no-scan-lines"):document.body.classList.add("no-scan-lines"))}function wo(o){typeof document<"u"&&(o?document.body.classList.remove("no-glow"):document.body.classList.add("no-glow"))}function So(o){typeof document<"u"&&(o?document.body.classList.add("border-enabled"):document.body.classList.remove("border-enabled"))}function Co(o){typeof document<"u"&&document.documentElement.style.setProperty("--terminal-animation-speed",o.toString())}function me(){if(typeof document<"u"){const o=new CustomEvent("settings-changed");document.dispatchEvent(o)}}function sa(o){const e=[{type:"bios",text:"PHOENIX BIOS v4.0 Release 6.0"},{type:"bios",text:"Copyright 1985-2025 Phoenix Technologies Ltd."},{type:"bios",text:"CPU: JavaScript V8 Engine @ ∞ GHz"},{type:"bios",text:"Memory Test: 16384 MB OK"},{type:"bios",text:"Detecting IDE drives..."},{type:"bios",text:"  Primary Master: Virtual SSD 256GB"},{type:"kernel",text:"Loading kernel..."},{type:"kernel",text:"[    0.000000] Linux version 6.8.0-darin (darin@darinchambers.com)"},{type:"kernel",text:"[    0.000001] Command line: BOOT_IMAGE=/vmlinuz-6.8.0-darin root=/dev/sda1"},{type:"kernel",text:"[    0.123456] Calibrating delay loop... 7999.99 BogoMIPS (lpj=15999984)"},{type:"kernel",text:"[    0.234567] Memory: 16384MB available"},{type:"kernel",text:"[    0.345678] CPU: JavaScript Virtual CPU"},{type:"kernel",text:"[    0.456789] Mounting root filesystem..."},{type:"ok",text:"Started System Logging Service"},{type:"ok",text:"Started Journal Service"},{type:"ok",text:"Started D-Bus System Message Bus"},{type:"ok",text:"Reached target Local File Systems"},{type:"ok",text:"Started Network Manager"},{type:"failed",text:"Started Bluetooth Service (no adapter found)"},{type:"ok",text:"Started Login Service"},{type:"ok",text:"Started OpenSSH Server"},{type:"ok",text:"Started Docker Container Runtime"},{type:"ok",text:"Started Code Editor Process"},{type:"ok",text:"Started Terminal Emulator"},{type:"ok",text:"Reached target Multi-User System"},{type:"info",text:"darinchambers.com login: darin"},{type:"info",text:"Password: ********"},{type:"welcome",text:"Welcome to darinchambers.com!"},{type:"info",text:"Type 'help' for available commands."}];return o?[{type:"bios",text:"PHOENIX BIOS v4.0"},{type:"bios",text:"Memory Test: 16384 MB OK"},{type:"kernel",text:"Loading kernel..."},{type:"kernel",text:"[    0.000000] Linux version 6.8.0-darin"},{type:"ok",text:"Started System Logging Service"},{type:"ok",text:"Started Network Manager"},{type:"ok",text:"Started Terminal Emulator"},{type:"ok",text:"Reached target Multi-User System"},{type:"welcome",text:"Welcome to darinchambers.com!"}]:e}function aa(o,e=0){const t=sa(o),n=o?80:120;let r=0;return{html:t.map((s,l)=>{const a=e+l*n,d=`boot-line boot-line-${s.type}`,_=s.text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return s.type==="welcome"&&(r=a),`<div class="${d}" style="animation-delay: ${a}ms;">${_}</div>`}).join(`
`),welcomeDelay:r}}const la={name:"boot",description:"Display simulated Linux boot sequence",execute:(o,e)=>{const t=new B(o);if(t.hasFlag("help"))return{output:`Usage: boot [options]

Display a simulated Linux boot sequence with BIOS POST,
kernel loading, and service startup messages.

Options:
  --fast     Show abbreviated boot sequence
  --help     Display this help message

Examples:
  boot           # Show full boot sequence
  boot --fast    # Show quick boot sequence

Note: Messages appear with timed animation. Scroll or type to stop.`};const n=t.hasFlag("fast"),{html:r,welcomeDelay:i}=aa(n);return{output:`<div class="boot-sequence boot-startup" data-boot-type="boot">
${r}
</div>`,html:!0,clearBefore:!0,fullscreen:!0,fullscreenDuration:i,scrollBehavior:"top"}}},at=[{code:"SYSTEM_THREAD_EXCEPTION_NOT_HANDLED",description:"A system thread generated an exception that was not handled."},{code:"DRIVER_IRQL_NOT_LESS_OR_EQUAL",description:"A driver attempted to access a pageable memory at an inappropriate IRQL."},{code:"KERNEL_DATA_INPAGE_ERROR",description:"The requested page of kernel data from the paging file could not be read."},{code:"PAGE_FAULT_IN_NONPAGED_AREA",description:"Invalid system memory has been referenced."},{code:"CRITICAL_PROCESS_DIED",description:"A critical system process died unexpectedly."}];function ca(o,e){return`<div class="bsod-overlay bsod-modern" data-bsod="true" data-bsod-style="modern">
  <div class="bsod-content">
    <div class="bsod-emoticon">:(</div>
    <div class="bsod-message">
      Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
    </div>
    <div class="bsod-progress">
      <span class="bsod-progress-value" data-bsod-progress>0</span>% complete
    </div>
    <div class="bsod-qr-section">
      <div class="bsod-qr"></div>
      <div class="bsod-qr-info">
        <p>For more information about this issue and possible fixes, visit https://www.windows.com/stopcode</p>
        <p class="bsod-technical">If you call a support person, give them this info:</p>
        <p class="bsod-stop-code">Stop code: ${De(o)}</p>
        <p class="bsod-description">${De(e)}</p>
      </div>
    </div>
  </div>
</div>`}function da(o,e){const t=["0x0000007E","0xC0000005","0xBF8B4C62","0x00000000","0xBF8B4C62"];return`<div class="bsod-overlay bsod-classic" data-bsod="true" data-bsod-style="classic">
  <div class="bsod-classic-content">
    <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
    <br>
    <p>${De(o)}</p>
    <br>
    <p>${De(e)}</p>
    <br>
    <p>If this is the first time you've seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:</p>
    <br>
    <p>Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.</p>
    <br>
    <p>If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.</p>
    <br>
    <p>Technical information:</p>
    <br>
    <p>*** STOP: ${t[0]} (${t[1]}, ${t[2]}, ${t[3]}, ${t[4]})</p>
    <br>
    <br>
    <p>*** DARINCHAMBERS.SYS - Address ${t[2]} base at BF800000, DateStamp 4802539d</p>
    <br>
    <p>Beginning dump of physical memory</p>
    <p>Physical memory dump complete.</p>
    <p>Contact your system administrator or technical support group for further assistance.</p>
    <br>
    <p class="bsod-classic-cursor" data-bsod-cursor>_</p>
  </div>
</div>`}const ua={name:"bsod",description:"Display a fake Windows Blue Screen of Death",execute:(o,e)=>{const t=new B(o);if(t.hasFlag("help")||t.hasFlag("h"))return{output:`Usage: bsod [options]

Display a fake Windows Blue Screen of Death. Supports two styles:
- Modern (default): Windows 10/11 style with animated progress counter
- Classic: Windows XP/NT style with technical text and blinking cursor

Options:
  --classic         Use Windows XP/NT style BSOD
  --reason <text>   Custom error description
  --error <index>   Select specific error code (0-${at.length-1})
  --help, -h        Display this help message

Error codes:
${at.map((d,_)=>`  ${_}: ${d.code}`).join(`
`)}

Examples:
  bsod                     # Modern style with random error
  bsod --classic           # Classic style with random error
  bsod --error 2           # Use specific error code
  bsod --reason "Custom"   # Custom error description

Note: Click anywhere or press any key to dismiss the BSOD.`};const n=t.hasFlag("classic"),r=t.getFlag("reason"),i=t.getFlag("error");let s=at[Math.floor(Math.random()*at.length)];if(i!==void 0&&i!==!0){const d=parseInt(String(i),10);!isNaN(d)&&d>=0&&d<at.length&&(s=at[d])}const l=typeof r=="string"?r:s.description;return{output:n?da(s.code,l):ca(s.code,l),html:!0,clearBefore:!0,scrollBehavior:"top"}}},_a=["Chaos","Discord","Confusion","Bureaucracy","The Aftermath"],ma=["Sweetmorn","Boomtime","Pungenday","Prickle-Prickle","Setting Orange"],ha=["Mungday","Mojoday","Syadday","Zaraday","Malbowday"],Or=73,pa=1166;function On(o){return o%4===0&&o%100!==0||o%400===0}function fa(o,e,t){const n=[31,28,31,30,31,30,31,31,30,31,30,31];On(o)&&(n[1]=29);let r=t;for(let i=0;i<e-1;i++)r+=n[i];return r}function ga(o){const e=o.getFullYear(),t=o.getMonth()+1,n=o.getDate(),r=e+pa,i=fa(e,t,n);if(On(e)&&t===2&&n===29)return{weekday:"",season:"",dayOfSeason:0,yold:r,isStTibsDay:!0};let s=i;On(e)&&i>60&&(s=i-1);const l=Math.floor((s-1)/Or),a=_a[l],d=(s-1)%Or+1,_=(s-1)%5,$=ma[_],g=d===5?ha[l]:void 0;return{weekday:$,season:a,dayOfSeason:d,yold:r,isStTibsDay:!1,apostleDay:g}}function $a(o){return o.isStTibsDay?`St. Tib's Day, ${o.yold} YOLD`:o.apostleDay?`${o.weekday}, ${o.apostleDay}, day ${o.dayOfSeason} of ${o.season}, ${o.yold} YOLD`:`${o.weekday}, ${o.season} ${o.dayOfSeason}, ${o.yold} YOLD`}function Ta(o){if(/^\d{4}-\d{2}-\d{2}$/.test(o)){const e=new Date(o);if(!isNaN(e.getTime()))return e}if(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(o)){const e=new Date(o);if(!isNaN(e.getTime()))return e}return null}function Aa(o,e,t){if(o<1||o>31||e<1||e>12||t<1)return null;const n=new Date(t,e-1,o);return isNaN(n.getTime())?null:n}const ya={name:"ddate",description:"Display date in Discordian calendar",execute:(o,e)=>{const t=new B(o);if(t.hasFlag("help"))return{output:`Usage: ddate [DATE]

Display the current date (or specified date) in Discordian calendar format.

The Discordian calendar has 5 seasons of 73 days each:
  Chaos, Discord, Confusion, Bureaucracy, The Aftermath

Special days:
  - St. Tib's Day: February 29 in leap years (outside normal calendar)
  - Apostle Days: Day 5 of each season

Examples:
  ddate                    Show current date
  ddate "2025-01-01"       Show specific date (YYYY-MM-DD format)
  ddate "1/1/2025"         Show specific date (MM/DD/YYYY format)
  ddate 12 21 2025         Show specific date (month day year)

Options:
  --help                   Display this help message`};let n;if(t.positionalCount===0)n=new Date;else if(t.positionalCount===1){const s=t.getPositional(0),l=Ta(s);if(!l)return{output:`ddate: invalid date '${s}'`,error:!0};n=l}else if(t.positionalCount===3){const s=parseInt(t.getPositional(0),10),l=parseInt(t.getPositional(1),10),a=parseInt(t.getPositional(2),10);if(isNaN(l)||isNaN(s)||isNaN(a))return{output:"ddate: invalid numeric date arguments",error:!0};const d=Aa(l,s,a);if(!d)return{output:`ddate: invalid date ${s}/${l}/${a}`,error:!0};n=d}else return{output:`ddate: invalid arguments
Try 'ddate --help' for more information.`,error:!0};const r=ga(n);return{output:$a(r)}}},Ea={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3};class La{constructor(){this.comment="",this.numChars=0,this.options={}}}const En=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Compact","ANSI Regular","ANSI Shadow","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Classy","Coder Mini","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Font Font","Four Tops","Fraktur","Fun Face","Fun Faces","Future Smooth","Future Thin","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"],Mr={"ANSI-Compact":"ANSI Compact"},At=o=>Mr[o]?Mr[o]:o;function Ia(o){return/[.*+?^${}()|[\]\\]/.test(o)?"\\"+o:o}const Rt=(()=>{const{FULL_WIDTH:o=0,FITTING:e,SMUSHING:t,CONTROLLED_SMUSHING:n}=Ea,r={},i={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function s(p,f,u){const m=Ia(p.trim().slice(-1))||"@",A=f===u-1?new RegExp(m+m+"?\\s*$"):new RegExp(m+"\\s*$");return p.replace(A,"")}function l(p=-1,f=null){let u={},m,A=[[16384,"vLayout",t],[8192,"vLayout",e],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",t],[64,"hLayout",e],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];m=f!==null?f:p;for(const[L,w,S]of A)m>=L?(m-=L,u[w]===void 0&&(u[w]=S)):w!=="vLayout"&&w!=="hLayout"&&(u[w]=!1);return typeof u.hLayout>"u"?p===0?u.hLayout=e:p===-1?u.hLayout=o:u.hRule1||u.hRule2||u.hRule3||u.hRule4||u.hRule5||u.hRule6?u.hLayout=n:u.hLayout=t:u.hLayout===t&&(u.hRule1||u.hRule2||u.hRule3||u.hRule4||u.hRule5||u.hRule6)&&(u.hLayout=n),typeof u.vLayout>"u"?u.vRule1||u.vRule2||u.vRule3||u.vRule4||u.vRule5?u.vLayout=n:u.vLayout=o:u.vLayout===t&&(u.vRule1||u.vRule2||u.vRule3||u.vRule4||u.vRule5)&&(u.vLayout=n),u}function a(p,f,u=""){return p===f&&p!==u?p:!1}function d(p,f){let u="|/\\[]{}()<>";if(p==="_"){if(u.indexOf(f)!==-1)return f}else if(f==="_"&&u.indexOf(p)!==-1)return p;return!1}function _(p,f){let u="| /\\ [] {} () <>",m=u.indexOf(p),A=u.indexOf(f);if(m!==-1&&A!==-1&&m!==A&&Math.abs(m-A)!==1){const L=Math.max(m,A),w=L+1;return u.substring(L,w)}return!1}function $(p,f){let u="[] {} ()",m=u.indexOf(p),A=u.indexOf(f);return m!==-1&&A!==-1&&Math.abs(m-A)<=1?"|":!1}function g(p,f){return{"/\\":"|","\\/":"Y","><":"X"}[p+f]||!1}function E(p,f,u=""){return p===u&&f===u?u:!1}function y(p,f){return p===f?p:!1}function D(p,f){return d(p,f)}function b(p,f){return _(p,f)}function T(p,f){return p==="-"&&f==="_"||p==="_"&&f==="-"?"=":!1}function P(p,f){return p==="|"&&f==="|"?"|":!1}function M(p,f,u){return f===" "||f===""||f===u&&p!==" "?p:f}function O(p,f,u){if(u.fittingRules&&u.fittingRules.vLayout===o)return"invalid";let m,A=Math.min(p.length,f.length),L,w,S=!1,v;if(A===0)return"invalid";for(m=0;m<A;m++)if(L=p.substring(m,m+1),w=f.substring(m,m+1),L!==" "&&w!==" "){if(u.fittingRules&&u.fittingRules.vLayout===e)return"invalid";if(u.fittingRules&&u.fittingRules.vLayout===t)return"end";if(P(L,w)){S=S||!1;continue}if(v=!1,v=u.fittingRules&&u.fittingRules.vRule1?y(L,w):v,v=!v&&u.fittingRules&&u.fittingRules.vRule2?D(L,w):v,v=!v&&u.fittingRules&&u.fittingRules.vRule3?b(L,w):v,v=!v&&u.fittingRules&&u.fittingRules.vRule4?T(L,w):v,S=!0,!v)return"invalid"}return S?"end":"valid"}function F(p,f,u){let m=p.length,A=p.length,L,w,S,v=1,R,H,x;for(;v<=m;){for(L=p.slice(Math.max(0,A-v),A),w=f.slice(0,Math.min(m,v)),S=w.length,x="",R=0;R<S;R++)if(H=O(L[R],w[R],u),H==="end")x=H;else if(H==="invalid"){x=H;break}else x===""&&(x="valid");if(x==="invalid"){v--;break}if(x==="end")break;x==="valid"&&v++}return Math.min(m,v)}function z(p,f,u){let m,A=Math.min(p.length,f.length),L,w,S="",v;const R=u.fittingRules||{};for(m=0;m<A;m++)L=p.substring(m,m+1),w=f.substring(m,m+1),L!==" "&&w!==" "?R.vLayout===e||R.vLayout===t?S+=M(L,w):(v=!1,v=R.vRule5?P(L,w):v,v=!v&&R.vRule1?y(L,w):v,v=!v&&R.vRule2?D(L,w):v,v=!v&&R.vRule3?b(L,w):v,v=!v&&R.vRule4?T(L,w):v,S+=v):S+=M(L,w);return S}function K(p,f,u,m){let A=p.length,L=f.length,w=p.slice(0,Math.max(0,A-u)),S=p.slice(Math.max(0,A-u),A),v=f.slice(0,Math.min(u,L)),R,H,x,U=[],k;for(H=S.length,R=0;R<H;R++)R>=L?x=S[R]:x=z(S[R],v[R],m),U.push(x);return k=f.slice(Math.min(u,L),L),[...w,...U,...k]}function Fe(p,f){const u=" ".repeat(f);return p.map(m=>m+u)}function Ve(p,f,u){let m=p[0].length,A=f[0].length,L;return m>A?f=Fe(f,m-A):A>m&&(p=Fe(p,A-m)),L=F(p,f,u),K(p,f,L,u)}function Ae(p,f,u){const m=u.fittingRules||{};if(m.hLayout===o)return 0;let A,L=p.length,w=f.length,S=L,v=1,R=!1,H,x,U,k;if(L===0)return 0;e:for(;v<=S;){const ne=L-v;for(H=p.substring(ne,ne+v),x=f.substring(0,Math.min(v,w)),A=0;A<Math.min(v,w);A++)if(U=H.substring(A,A+1),k=x.substring(A,A+1),U!==" "&&k!==" "){if(m.hLayout===e){v=v-1;break e}else if(m.hLayout===t){(U===u.hardBlank||k===u.hardBlank)&&(v=v-1);break e}else if(R=!0,!(m.hRule1&&a(U,k,u.hardBlank)||m.hRule2&&d(U,k)||m.hRule3&&_(U,k)||m.hRule4&&$(U,k)||m.hRule5&&g(U,k)||m.hRule6&&E(U,k,u.hardBlank))){v=v-1;break e}}if(R)break;v++}return Math.min(S,v)}function He(p,f,u,m){let A,L,w=[],S,v,R,H,x,U,k,ne;const re=m.fittingRules||{};if(typeof m.height!="number")throw new Error("height is not defined.");for(A=0;A<m.height;A++){k=p[A],ne=f[A],x=k.length,U=ne.length,S=x-u,v=k.slice(0,Math.max(0,S)),R="";const $e=Math.max(0,x-u);let Te=k.substring($e,$e+u),Le=ne.substring(0,Math.min(u,U));for(L=0;L<u;L++){let ue=L<x?Te.substring(L,L+1):" ",oe=L<U?Le.substring(L,L+1):" ";if(ue!==" "&&oe!==" ")if(re.hLayout===e||re.hLayout===t)R+=M(ue,oe,m.hardBlank);else{const ve=re.hRule1&&a(ue,oe,m.hardBlank)||re.hRule2&&d(ue,oe)||re.hRule3&&_(ue,oe)||re.hRule4&&$(ue,oe)||re.hRule5&&g(ue,oe)||re.hRule6&&E(ue,oe,m.hardBlank)||M(ue,oe,m.hardBlank);R+=ve}else R+=M(ue,oe,m.hardBlank)}u>=U?H="":H=ne.substring(u,u+Math.max(0,U-u)),w[A]=v+R+H}return w}function de(p){return new Array(p).fill("")}const Se=function(p){return Math.max(...p.map(f=>f.length))};function Ce(p,f,u){return p.reduce(function(m,A){return He(m,A.fig,A.overlap||0,u)},de(f))}function tt(p,f,u){for(let m=p.length-1;m>0;m--){const A=Ce(p.slice(0,m),f,u);if(Se(A)<=u.width)return{outputFigText:A,chars:p.slice(m)}}return{outputFigText:de(f),chars:p}}function mt(p,f,u){let m,A,L=0,w,S,v,R=u.height,H=[],x,U={chars:[],overlap:L},k=[],ne,re,$e,Te,Le;if(typeof R!="number")throw new Error("height is not defined.");S=de(R);const ue=u.fittingRules||{};for(u.printDirection===1&&(p=p.split("").reverse().join("")),v=p.length,m=0;m<v;m++)if(ne=p.substring(m,m+1),re=ne.match(/\s/),A=f[ne.charCodeAt(0)],Te=null,A){if(ue.hLayout!==o){for(L=1e4,w=0;w<R;w++)L=Math.min(L,Ae(S[w],A[w],u));L=L===1e4?0:L}if(u.width>0&&(u.whitespaceBreak?($e=Ce(U.chars.concat([{fig:A,overlap:L}]),R,u),Te=Ce(k.concat([{fig:$e,overlap:U.overlap}]),R,u),x=Se(Te)):(Te=He(S,A,L,u),x=Se(Te)),x>=u.width&&m>0&&(u.whitespaceBreak?(S=Ce(k.slice(0,-1),R,u),k.length>1&&(H.push(S),S=de(R)),k=[]):(H.push(S),S=de(R)))),u.width>0&&u.whitespaceBreak&&((!re||m===v-1)&&U.chars.push({fig:A,overlap:L}),re||m===v-1)){for(Le=null;Te=Ce(U.chars,R,u),x=Se(Te),x>=u.width;)Le=tt(U.chars,R,u),U={chars:Le.chars},H.push(Le.outputFigText);x>0&&(Le?k.push({fig:Te,overlap:1}):k.push({fig:Te,overlap:U.overlap})),re&&(k.push({fig:A,overlap:L}),S=de(R)),m===v-1&&(S=Ce(k,R,u)),U={chars:[],overlap:L};continue}S=He(S,A,L,u)}return Se(S)>0&&H.push(S),u.showHardBlanks||H.forEach(function(oe){for(v=oe.length,w=0;w<v;w++)oe[w]=oe[w].replace(new RegExp("\\"+u.hardBlank,"g")," ")}),p===""&&H.length===0&&H.push(new Array(R).fill("")),H}const kt=function(p,f){let u;const m=f.fittingRules||{};if(p==="default")u={hLayout:m.hLayout,hRule1:m.hRule1,hRule2:m.hRule2,hRule3:m.hRule3,hRule4:m.hRule4,hRule5:m.hRule5,hRule6:m.hRule6};else if(p==="full")u={hLayout:o,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(p==="fitted")u={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(p==="controlled smushing")u={hLayout:n,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(p==="universal smushing")u={hLayout:t,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return u},tn=function(p,f){let u={};const m=f.fittingRules||{};if(p==="default")u={vLayout:m.vLayout,vRule1:m.vRule1,vRule2:m.vRule2,vRule3:m.vRule3,vRule4:m.vRule4,vRule5:m.vRule5};else if(p==="full")u={vLayout:o,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(p==="fitted")u={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(p==="controlled smushing")u={vLayout:n,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(p==="universal smushing")u={vLayout:t,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return u},Ot=function(p,f,u){u=u.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const m=At(p);let A=u.split(`
`),L=[],w,S,v;for(S=A.length,w=0;w<S;w++)L=L.concat(mt(A[w],r[m],f));for(S=L.length,v=L[0],w=1;w<S;w++)v=Ve(v,L[w],f);return v?v.join(`
`):""};function Mt(p,f){let u;if(typeof structuredClone<"u"?u=structuredClone(p):u=JSON.parse(JSON.stringify(p)),u.showHardBlanks=f.showHardBlanks||!1,u.width=f.width||-1,u.whitespaceBreak=f.whitespaceBreak||!1,f.horizontalLayout){const m=kt(f.horizontalLayout,p);m&&Object.assign(u.fittingRules,m)}if(f.verticalLayout){const m=tn(f.verticalLayout,p);m&&Object.assign(u.fittingRules,m)}return u.printDirection=f.printDirection!==null&&f.printDirection!==void 0?f.printDirection:p.printDirection,u}const W=async function(p,f,u){return W.text(p,f,u)};return W.text=async function(p,f,u){p=p+"";let m,A;typeof f=="function"?(A=f,m={font:i.font}):typeof f=="string"?(m={font:f},A=u):f?(m=f,A=u):(m={font:i.font},A=u);const L=m.font||i.font;try{const w=await W.loadFont(L),S=w?Ot(L,Mt(w,m),p):"";return A&&A(null,S),S}catch(w){const S=w instanceof Error?w:new Error(String(w));if(A)return A(S),"";throw S}},W.textSync=function(p,f){p=p+"",typeof f=="string"?f={font:f}:f=f||{};const u=f.font||i.font;let m=Mt(W.loadFontSync(u),f);return Ot(u,m,p)},W.metadata=async function(p,f){p=p+"";try{const u=await W.loadFont(p);if(!u)throw new Error("Error loading font.");const m=At(p),A=r[m]||{},L=[u,A.comment||""];return f&&f(null,u,A.comment),L}catch(u){const m=u instanceof Error?u:new Error(String(u));if(f)return f(m),null;throw m}},W.defaults=function(p){return p&&typeof p=="object"&&Object.assign(i,p),typeof structuredClone<"u"?structuredClone(i):JSON.parse(JSON.stringify(i))},W.parseFont=function(p,f,u=!0){if(r[p]&&!u)return r[p].options;f=f.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const m=new La,A=f.split(`
`),L=A.shift();if(!L)throw new Error("Invalid font file: missing header");const w=L.split(" "),S={hardBlank:w[0].substring(5,6),height:parseInt(w[1],10),baseline:parseInt(w[2],10),maxLength:parseInt(w[3],10),oldLayout:parseInt(w[4],10),numCommentLines:parseInt(w[5],10),printDirection:w[6]?parseInt(w[6],10):0,fullLayout:w[7]?parseInt(w[7],10):null,codeTagCount:w[8]?parseInt(w[8],10):null};if((S.hardBlank||"").length!==1||[S.height,S.baseline,S.maxLength,S.oldLayout,S.numCommentLines].some(H=>H==null||isNaN(H)))throw new Error("FIGlet header contains invalid values.");if(S.height==null||S.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");S.fittingRules=l(S.oldLayout,S.fullLayout),m.options=S;const R=[];for(let H=32;H<=126;H++)R.push(H);if(R.push(196,214,220,228,246,252,223),A.length<S.numCommentLines+S.height*R.length)throw new Error(`FIGlet file is missing data. Line length: ${A.length}. Comment lines: ${S.numCommentLines}. Height: ${S.height}. Num chars: ${R.length}.`);for(m.comment=A.splice(0,S.numCommentLines).join(`
`),m.numChars=0;A.length>0&&m.numChars<R.length;){const H=R[m.numChars];m[H]=A.splice(0,S.height);for(let x=0;x<S.height;x++)typeof m[H][x]>"u"?m[H][x]="":m[H][x]=s(m[H][x],x,S.height);m.numChars++}for(;A.length>0;){const H=A.shift();if(!H||H.trim()==="")break;let x=H.split(" ")[0],U;if(/^-?0[xX][0-9a-fA-F]+$/.test(x))U=parseInt(x,16);else if(/^-?0[0-7]+$/.test(x))U=parseInt(x,8);else if(/^-?[0-9]+$/.test(x))U=parseInt(x,10);else throw new Error(`Error parsing data. Invalid data: ${x}`);if(U===-1||U<-2147483648||U>2147483647){const k=U===-1?"The char code -1 is not permitted.":`The char code cannot be ${U<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${k}`)}m[U]=A.splice(0,S.height);for(let k=0;k<S.height;k++)typeof m[U][k]>"u"?m[U][k]="":m[U][k]=s(m[U][k],k,S.height);m.numChars++}return r[p]=m,S},W.loadedFonts=()=>Object.keys(r),W.clearLoadedFonts=()=>{Object.keys(r).forEach(p=>{delete r[p]})},W.loadFont=async function(p,f){const u=At(p);if(r[u]){const m=r[u].options;return f&&f(null,m),Promise.resolve(m)}try{if(!i.fetchFontIfMissing)throw new Error(`Font is not loaded: ${u}`);const m=await fetch(`${i.fontPath}/${u}.flf`);if(!m.ok)throw new Error(`Network response was not ok: ${m.status}`);const A=await m.text(),L=W.parseFont(u,A);return f&&f(null,L),L}catch(m){const A=m instanceof Error?m:new Error(String(m));if(f)return f(A),null;throw A}},W.loadFontSync=function(p){const f=At(p);if(r[f])return r[f].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},W.preloadFonts=async function(p,f){try{for(const u of p){const m=At(u),A=await fetch(`${i.fontPath}/${m}.flf`);if(!A.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${m}, status code: ${A.statusText}`);const L=await A.text();W.parseFont(m,L)}f&&f()}catch(u){const m=u instanceof Error?u:new Error(String(u));if(f){f(m);return}throw u}},W.fonts=function(p){return new Promise(function(f,u){f(En),p&&p(null,En)})},W.fontsSync=function(){return En},W.figFonts=r,W})(),ba=`flf2a$ 8 7 54 0 12 0 64 185
banner.flf version 2 by Ryan Youck (youck@cs.uregina.ca)
(From a unix program called banner)
I am not responsible for use of this font  
Thanks to Glenn Chappell for his help
Katakana characters by Vinney Thai <ssfiit@eris.cs.umb.edu>
Cyrillic characters from "koi8x8" BDF font.
Date: August 11, 1994

Merged by John Cowan <cowan@ccil.org>
Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.
 $ $@
 $ $@
 $ $@
 $ $@
 $ $@
 $ $@
 $ $@
 $ $@@
 ###$@
 ###$@
 ###$@
  # $@
    $@
 ###$@
 ###$@
    $@@
 ### ###$@
 ### ###$@
  #   # $@
 $      $@
 $      $@
        $@
        $@
        $@@
   # #  $@
   # #  $@
 #######$@
   # #  $@
 #######$@
   # #  $@
   # #  $@
        $@@
  ##### $@
 #  #  #$@
 #  #   $@
  ##### $@
    #  #$@
 #  #  #$@
  ##### $@
        $@@
 ###   #$@
 # #  # $@
 ### #  $@
    #   $@
   # ###$@
  #  # #$@
 #   ###$@
        $@@
   ##   $@
  #  #  $@
   ##   $@
  ###   $@
 #   # #$@
 #    # $@
  ###  #$@
        $@@
 ###$@
 ###$@
  # $@
 #  $@
    $@
    $@
    $@
    $@@
   ##$@
  #  $@
 #   $@
 #   $@
 #   $@
  #  $@
   ##$@
     $@@
 ##  $@
   # $@
    #$@
    #$@
    #$@
   # $@
 ##  $@
     $@@
        $@
  #   # $@
   # #  $@
 #######$@
   # #  $@
  #   # $@
        $@
        $@@
      $@
   #  $@
   #  $@
 #####$@
   #  $@
   #  $@
      $@
      $@@
    $@
    $@
    $@
    $@
 ###$@
 ###$@
  # $@
 #  $@@
      $@
      $@
      $@
 #####$@
      $@
      $@
      $@
      $@@
    $@
    $@
    $@
    $@
 ###$@
 ###$@
 ###$@
    $@@
       #$@
      # $@
     #  $@
    #   $@
   #    $@
  #     $@
 #      $@
        $@@
   ###  $@
  #   # $@
 #     #$@
 #     #$@
 #     #$@
  #   # $@
   ###  $@
        $@@
   #  $@
  ##  $@
 # #  $@
   #  $@
   #  $@
   #  $@
 #####$@
      $@@
  ##### $@
 #     #$@
       #$@
  ##### $@
 #      $@
 #      $@
 #######$@
        $@@
  ##### $@
 #     #$@
       #$@
  ##### $@
       #$@
 #     #$@
  ##### $@
        $@@
 #      $@
 #    # $@
 #    # $@
 #    # $@
 #######$@
      # $@
      # $@
        $@@
 #######$@
 #      $@
 #      $@
 ###### $@
       #$@
 #     #$@
  ##### $@
        $@@
  ##### $@
 #     #$@
 #      $@
 ###### $@
 #     #$@
 #     #$@
  ##### $@
        $@@
 #######$@
 #    # $@
     #  $@
    #   $@
   #    $@
   #    $@
   #    $@
        $@@
  ##### $@
 #     #$@
 #     #$@
  ##### $@
 #     #$@
 #     #$@
  ##### $@
        $@@
  ##### $@
 #     #$@
 #     #$@
  ######$@
       #$@
 #     #$@
  ##### $@
        $@@
  # $@
 ###$@
  # $@
    $@
  # $@
 ###$@
  # $@
    $@@
    $@
 ###$@
 ###$@
    $@
 ###$@
 ###$@
  # $@
 #  $@@
    #$@
   # $@
  #  $@
 #   $@
  #  $@
   # $@
    #$@
     $@@
      $@
      $@
 #####$@
      $@
 #####$@
      $@
      $@
      $@@
 #   $@
  #  $@
   # $@
    #$@
   # $@
  #  $@
 #   $@
     $@@
  ##### $@
 #     #$@
       #$@
    ### $@
    #   $@
        $@
    #   $@
        $@@
  ##### $@
 #     #$@
 # ### #$@
 # ### #$@
 # #### $@
 #      $@
  ##### $@
        $@@
    #   $@
   # #  $@
  #   # $@
 #     #$@
 #######$@
 #     #$@
 #     #$@
        $@@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
        $@@
  ##### $@
 #     #$@
 #      $@
 #      $@
 #      $@
 #     #$@
  ##### $@
        $@@
 ###### $@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 ###### $@
        $@@
 #######$@
 #      $@
 #      $@
 #####  $@
 #      $@
 #      $@
 #######$@
        $@@
 #######$@
 #      $@
 #      $@
 #####  $@
 #      $@
 #      $@
 #      $@
        $@@
  ##### $@
 #     #$@
 #      $@
 #  ####$@
 #     #$@
 #     #$@
  ##### $@
        $@@
 #     #$@
 #     #$@
 #     #$@
 #######$@
 #     #$@
 #     #$@
 #     #$@
        $@@
 ###$@
  # $@
  # $@
  # $@
  # $@
  # $@
 ###$@
    $@@
       #$@
       #$@
       #$@
       #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
 #    #$@
 #   # $@
 #  #  $@
 ###   $@
 #  #  $@
 #   # $@
 #    #$@
       $@@
 #      $@
 #      $@
 #      $@
 #      $@
 #      $@
 #      $@
 #######$@
        $@@
 #     #$@
 ##   ##$@
 # # # #$@
 #  #  #$@
 #     #$@
 #     #$@
 #     #$@
        $@@
 #     #$@
 ##    #$@
 # #   #$@
 #  #  #$@
 #   # #$@
 #    ##$@
 #     #$@
        $@@
 #######$@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 #######$@
        $@@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #      $@
 #      $@
 #      $@
        $@@
  ##### $@
 #     #$@
 #     #$@
 #     #$@
 #   # #$@
 #    # $@
  #### #$@
        $@@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #   #  $@
 #    # $@
 #     #$@
        $@@
  ##### $@
 #     #$@
 #      $@
  ##### $@
       #$@
 #     #$@
  ##### $@
        $@@
 #######$@
    #   $@
    #   $@
    #   $@
    #   $@
    #   $@
    #   $@
        $@@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  #   # $@
   # #  $@
    #   $@
        $@@
 #     #$@
 #  #  #$@
 #  #  #$@
 #  #  #$@
 #  #  #$@
 #  #  #$@
  ## ## $@
        $@@
 #     #$@
  #   # $@
   # #  $@
    #   $@
   # #  $@
  #   # $@
 #     #$@
        $@@
 #     #$@
  #   # $@
   # #  $@
    #   $@
    #   $@
    #   $@
    #   $@
        $@@
 #######$@
      # $@
     #  $@
    #   $@
   #    $@
  #     $@
 #######$@
        $@@
 #####$@
 #    $@
 #    $@
 #    $@
 #    $@
 #    $@
 #####$@
      $@@
 #      $@
  #     $@
   #    $@
    #   $@
     #  $@
      # $@
       #$@
        $@@
 #####$@
     #$@
     #$@
     #$@
     #$@
     #$@
 #####$@
      $@@
   #  $@
  # # $@
 #   #$@
      $@
      $@
      $@
      $@
      $@@
        $@
        $@
        $@
        $@
        $@
        $@
        $@
 #######$@@
 ###$@
 ###$@
  # $@
   #$@
    $@
    $@
    $@
    $@@
       $@
   ##  $@
  #  # $@
 #    #$@
 ######$@
 #    #$@
 #    #$@
       $@@
       $@
 ##### $@
 #    #$@
 ##### $@
 #    #$@
 #    #$@
 ##### $@
       $@@
       $@
  #### $@
 #    #$@
 #     $@
 #     $@
 #    #$@
  #### $@
       $@@
       $@
 ##### $@
 #    #$@
 #    #$@
 #    #$@
 #    #$@
 ##### $@
       $@@
       $@
 ######$@
 #     $@
 ##### $@
 #     $@
 #     $@
 ######$@
       $@@
       $@
 ######$@
 #     $@
 ##### $@
 #     $@
 #     $@
 #     $@
       $@@
       $@
  #### $@
 #    #$@
 #     $@
 #  ###$@
 #    #$@
  #### $@
       $@@
       $@
 #    #$@
 #    #$@
 ######$@
 #    #$@
 #    #$@
 #    #$@
       $@@
  $@
 #$@
 #$@
 #$@
 #$@
 #$@
 #$@
  $@@
       $@
      #$@
      #$@
      #$@
      #$@
 #    #$@
  #### $@
       $@@
       $@
 #    #$@
 #   # $@
 ####  $@
 #  #  $@
 #   # $@
 #    #$@
       $@@
       $@
 #     $@
 #     $@
 #     $@
 #     $@
 #     $@
 ######$@
       $@@
       $@
 #    #$@
 ##  ##$@
 # ## #$@
 #    #$@
 #    #$@
 #    #$@
       $@@
       $@
 #    #$@
 ##   #$@
 # #  #$@
 #  # #$@
 #   ##$@
 #    #$@
       $@@
       $@
  #### $@
 #    #$@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
       $@
 ##### $@
 #    #$@
 #    #$@
 ##### $@
 #     $@
 #     $@
       $@@
       $@
  #### $@
 #    #$@
 #    #$@
 #  # #$@
 #   # $@
  ### #$@
       $@@
       $@
 ##### $@
 #    #$@
 #    #$@
 ##### $@
 #   # $@
 #    #$@
       $@@
       $@
  #### $@
 #     $@
  #### $@
      #$@
 #    #$@
  #### $@
       $@@
      $@
 #####$@
   #  $@
   #  $@
   #  $@
   #  $@
   #  $@
      $@@
       $@
 #    #$@
 #    #$@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
       $@
 #    #$@
 #    #$@
 #    #$@
 #    #$@
  #  # $@
   ##  $@
       $@@
       $@
 #    #$@
 #    #$@
 #    #$@
 # ## #$@
 ##  ##$@
 #    #$@
       $@@
       $@
 #    #$@
  #  # $@
   ##  $@
   ##  $@
  #  # $@
 #    #$@
       $@@
      $@
 #   #$@
  # # $@
   #  $@
   #  $@
   #  $@
   #  $@
      $@@
       $@
 ######$@
     # $@
    #  $@
   #   $@
  #    $@
 ######$@
       $@@
   ###$@
  #   $@
  #   $@
 ##   $@
  #   $@
  #   $@
   ###$@
      $@@
 #$@
 #$@
 #$@
  $@
 #$@
 #$@
 #$@
  $@@
 ###  $@
    # $@
    # $@
    ##$@
    # $@
    # $@
 ###  $@
      $@@
  ##    $@
 #  #  #$@
     ## $@
        $@
        $@
        $@
        $@
        $@@
 #  #  #$@
   # #  $@
  #   # $@
 #     #$@
 #######$@
 #     #$@
 #     #$@
        $@@
 #     #$@
  ##### $@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
 #     #$@
        $@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
       $@
 #    #$@
  #### $@
 #    #$@
 ######$@
 #    #$@
 #    #$@
       $@@
       $@
 #    #$@
  #### $@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
       $@
 #    #$@
       $@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #      $@@
160  NO-BREAK SPACE
         $@
         $@
         $@
         $@
 ########$@
    ##   $@
    ##   $@
    ##   $@@
169  COPYRIGHT SIGN
 $@
 $@
 $@
 $@
 $@
 $@
 $@
 $@@
176  DEGREE SIGN
         $@
         $@
         $@
         $@
 ########$@
         $@
         $@
         $@@
178  SUPERSCRIPT TWO
    ##   $@
    ##   $@
    ##   $@
    ##   $@
 ########$@
    ##   $@
    ##   $@
    ##   $@@
183  MIDDLE DOT
 ##   $@
 ##   $@
 #####$@
 ##   $@
 #####$@
 ##   $@
 ##   $@
 ##   $@@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
 #  #  #$@
   # #  $@
  #   # $@
 #     #$@
 #######$@
 #     #$@
 #     #$@
        $@@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
 #     #$@
  ##### $@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
 #     #$@
        $@
 #     #$@
 #     #$@
 #     #$@
 #     #$@
  ##### $@
        $@@
223  LATIN SMALL LETTER SHARP S
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #     #$@
 #     #$@
 ###### $@
 #      $@@
228  LATIN SMALL LETTER A WITH DIAERESIS
       $@
 #    #$@
  #### $@
 #    #$@
 ######$@
 #    #$@
 #    #$@
       $@@
246  LATIN SMALL LETTER O WITH DIAERESIS
       $@
 #    #$@
  #### $@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
247  DIVISION SIGN
 #### $@
 #### $@
 #### $@
 #### $@
 #####$@
 #### $@
 #### $@
 #### $@@
252  LATIN SMALL LETTER U WITH DIAERESIS
       $@
 #    #$@
       $@
 #    #$@
 #    #$@
 #    #$@
  #### $@
       $@@
0x0401  CYRILLIC CAPITAL LETTER IO
 ########$@
 ########$@
 ########$@
 ########$@
 ########$@
 ########$@
 ########$@
 ########$@@
0x0410  CYRILLIC CAPITAL LETTER A
    ####$@
   ## ##$@
  ##  ##$@
 ##   ##$@
 #######$@
 ##   ##$@
 ##   ##$@
        $@@
0x0411  CYRILLIC CAPITAL LETTER BE
 #######$@
 ##     $@
 ##     $@
 ###### $@
 ##   ##$@
 ##   ##$@
 ###### $@
        $@@
0x0412  CYRILLIC CAPITAL LETTER VE
 ###### $@
 ##   ##$@
 ##   ##$@
 ###### $@
 ##   ##$@
 ##   ##$@
 ###### $@
        $@@
0x0413  CYRILLIC CAPITAL LETTER GHE
 #######$@
 ##     $@
 ##     $@
 ##     $@
 ##     $@
 ##     $@
 ##     $@
        $@@
0x0414  CYRILLIC CAPITAL LETTER DE
   #### $@
  ## ## $@
  ## ## $@
  ## ## $@
  ## ## $@
 #######$@
 ##   ##$@
        $@@
0x0415  CYRILLIC CAPITAL LETTER IE
 #######$@
 ##     $@
 ##     $@
 ###### $@
 ##     $@
 ##     $@
 #######$@
        $@@
0x0416  CYRILLIC CAPITAL LETTER ZHE
 ## # ##$@
  # # # $@
   ###  $@
   ###  $@
  # # # $@
  # # # $@
 ## # ##$@
        $@@
0x0417  CYRILLIC CAPITAL LETTER ZE
  ##### $@
 ##   ##$@
      ##$@
    ##  $@
      ##$@
 ##   ##$@
  ##### $@
        $@@
0x0418  CYRILLIC CAPITAL LETTER I
 ##   ##$@
 ##  ###$@
 ##  ###$@
 ## # ##$@
 ###  ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x0419  CYRILLIC CAPITAL LETTER SHORT I
 ## ## #$@
 ##   ##$@
 ##  ###$@
 ## # ##$@
 ###  ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x041A  CYRILLIC CAPITAL LETTER KA
 ##   ##$@
 ##  ## $@
 ## ##  $@
 #####  $@
 ##  ## $@
 ##   ##$@
 ##   ##$@
        $@@
0x041B  CYRILLIC CAPITAL LETTER EL
   #####$@
  ##  ##$@
  ##  ##$@
  ##  ##$@
  ##  ##$@
  ##  ##$@
 ##   ##$@
        $@@
0x041C  CYRILLIC CAPITAL LETTER EM
 ##   ##$@
 ##   ##$@
 ### ###$@
 ## # ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x041D  CYRILLIC CAPITAL LETTER EN
 ##   ##$@
 ##   ##$@
 ##   ##$@
 #######$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x041E  CYRILLIC CAPITAL LETTER O
  ##### $@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
  ##### $@
        $@@
0x041F  CYRILLIC CAPITAL LETTER PE
 #######$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x0420  CYRILLIC CAPITAL LETTER ER
 ###### $@
 ##   ##$@
 ##   ##$@
 ###### $@
 ##     $@
 ##     $@
 ##     $@
        $@@
0x0421  CYRILLIC CAPITAL LETTER ES
  ##### $@
 ##   ##$@
 ##     $@
 ##     $@
 ##     $@
 ##   ##$@
  ##### $@
        $@@
0x0422  CYRILLIC CAPITAL LETTER TE
 ###### $@
   ##   $@
   ##   $@
   ##   $@
   ##   $@
   ##   $@
   ##   $@
        $@@
0x0423  CYRILLIC CAPITAL LETTER U
 ##   ##$@
 ##   ##$@
 ##   ##$@
  ######$@
      ##$@
 ##   ##$@
  ##### $@
        $@@
0x0424  CYRILLIC CAPITAL LETTER EF
    #   $@
  ##### $@
 ## # ##$@
 ## # ##$@
 ## # ##$@
  ##### $@
    #   $@
        $@@
0x0425  CYRILLIC CAPITAL LETTER HA
 ##   ##$@
  ## ## $@
   ###  $@
   ###  $@
   ###  $@
  ## ## $@
 ##   ##$@
        $@@
0x0426  CYRILLIC CAPITAL LETTER TSE
 ##  ## $@
 ##  ## $@
 ##  ## $@
 ##  ## $@
 ##  ## $@
 ##  ## $@
 #######$@
       #$@@
0x0427  CYRILLIC CAPITAL LETTER CHE
 ##   ##$@
 ##   ##$@
 ##   ##$@
  ######$@
      ##$@
      ##$@
      ##$@
        $@@
0x0428  CYRILLIC CAPITAL LETTER SHA
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 #######$@
        $@@
0x0429  CYRILLIC CAPITAL LETTER SHCHA
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 #######$@
       #$@@
0x042A  CYRILLIC CAPITAL LETTER HARD SIGN
 ###    $@
 ###    $@
  ##    $@
  ##### $@
  ##  ##$@
  ##  ##$@
  ##### $@
        $@@
0x042B  CYRILLIC CAPITAL LETTER YERU
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ####  #$@
 ##  # #$@
 ##  # #$@
 ####  #$@
        $@@
0x042C  CYRILLIC CAPITAL LETTER SOFT SIGN
 ##     $@
 ##     $@
 ##     $@
 ###### $@
 ##   ##$@
 ##   ##$@
 ###### $@
        $@@
0x042D  CYRILLIC CAPITAL LETTER E
  ##### $@
 ##   ##$@
      ##$@
   #####$@
      ##$@
 ##   ##$@
  ##### $@
        $@@
0x042E  CYRILLIC CAPITAL LETTER YU
 ##  ## $@
 ## # ##$@
 ## # ##$@
 #### ##$@
 ## # ##$@
 ## # ##$@
 ##  ## $@
        $@@
0x042F  CYRILLIC CAPITAL LETTER YA
   #####$@
  ##  ##$@
  ##  ##$@
   #####$@
   ## ##$@
  ##  ##$@
 ##   ##$@
        $@@
0x0430  CYRILLIC SMALL LETTER A
        $@
        $@
  ####  $@
     ## $@
  ##### $@
 ##  ## $@
  ######$@
        $@@
0x0431  CYRILLIC SMALL LETTER BE
        $@
     ## $@
  ####  $@
 ##     $@
 ###### $@
 ##   ##$@
  ##### $@
        $@@
0x0432  CYRILLIC SMALL LETTER VE
        $@
        $@
 #####  $@
 ##  ## $@
 ###### $@
 ##   ##$@
 ###### $@
        $@@
0x0433  CYRILLIC SMALL LETTER GHE
        $@
        $@
  ##### $@
      ##$@
  ##### $@
 ##     $@
  ######$@
        $@@
0x0434  CYRILLIC SMALL LETTER DE
        $@
   #### $@
      ##$@
   #####$@
  ##  ##$@
 ##   ##$@
  ##### $@
        $@@
0x0435  CYRILLIC SMALL LETTER IE
        $@
        $@
  ##### $@
 ##   ##$@
 ###### $@
 ##     $@
  ##### $@
        $@@
0x0436  CYRILLIC SMALL LETTER ZHE
        $@
        $@
 ## # ##$@
  # # # $@
   ###  $@
  # # # $@
 ## # ##$@
        $@@
0x0437  CYRILLIC SMALL LETTER ZE
        $@
        $@
  ##### $@
 ##   ##$@
    ### $@
 ##   ##$@
  ##### $@
        $@@
0x0438  CYRILLIC SMALL LETTER I
        $@
        $@
 ##   ##$@
 ##  ###$@
 ## # ##$@
 ###  ##$@
 ##   ##$@
        $@@
0x0439  CYRILLIC SMALL LETTER SHORT I
        $@
    ##  $@
 ##   ##$@
 ##  ###$@
 ## # ##$@
 ###  ##$@
 ##   ##$@
        $@@
0x043A  CYRILLIC SMALL LETTER KA
        $@
        $@
 ##   ##$@
 ##  ## $@
 #####  $@
 ##  ## $@
 ##   ##$@
        $@@
0x043B  CYRILLIC SMALL LETTER EL
        $@
        $@
   #####$@
  ##  ##$@
  ##  ##$@
  ##  ##$@
 ##   ##$@
        $@@
0x043C  CYRILLIC SMALL LETTER EM
        $@
        $@
 ##   ##$@
 ### ###$@
 ## # ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x043D  CYRILLIC SMALL LETTER EN
        $@
        $@
 ##   ##$@
 ##   ##$@
 #######$@
 ##   ##$@
 ##   ##$@
        $@@
0x043E  CYRILLIC SMALL LETTER O
        $@
        $@
  ##### $@
 ##   ##$@
 ##   ##$@
 ##   ##$@
  ##### $@
        $@@
0x043F  CYRILLIC SMALL LETTER PE
        $@
        $@
 ###### $@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##   ##$@
        $@@
0x0440  CYRILLIC SMALL LETTER ER
        $@
        $@
 ###### $@
 ##   ##$@
 ###### $@
 ##     $@
 ##     $@
        $@@
0x0441  CYRILLIC SMALL LETTER ES
        $@
        $@
  ##### $@
 ##     $@
 ##     $@
 ##     $@
  ##### $@
        $@@
0x0442  CYRILLIC SMALL LETTER TE
        $@
        $@
 ###### $@
   ##   $@
   ##   $@
   ##   $@
   ##   $@
        $@@
0x0443  CYRILLIC SMALL LETTER U
        $@
        $@
 ##   ##$@
 ##   ##$@
 ##   ##$@
  ######$@
      ##$@
  ##### $@@
0x0444  CYRILLIC SMALL LETTER EF
        $@
    #   $@
  ##### $@
 ## # ##$@
 ## # ##$@
  ##### $@
    #   $@
        $@@
0x0445  CYRILLIC SMALL LETTER HA
        $@
        $@
 ##   ##$@
  ## ## $@
   ###  $@
  ## ## $@
 ##   ##$@
        $@@
0x0446  CYRILLIC SMALL LETTER TSE
        $@
        $@
 ##   ##$@
 ##   ##$@
 ##   ##$@
 ##  ## $@
  ### ##$@
       #$@@
0x0447  CYRILLIC SMALL LETTER CHE
        $@
        $@
 ##   ##$@
 ##   ##$@
  ######$@
      ##$@
      ##$@
        $@@
0x0448  CYRILLIC SMALL LETTER SHA
        $@
        $@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 #######$@
        $@@
0x0449  CYRILLIC SMALL LETTER SHCHA
        $@
        $@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 ## # ##$@
 #######$@
       #$@@
0x044A  CYRILLIC SMALL LETTER HARD SIGN
        $@
        $@
 ###    $@
  ##    $@
  ##### $@
  ##  ##$@
  ##### $@
        $@@
0x044B  CYRILLIC SMALL LETTER YERU
        $@
        $@
 ##   ##$@
 ##   ##$@
 ####  #$@
 ##  # #$@
 ####  #$@
        $@@
0x044C  CYRILLIC SMALL LETTER SOFT SIGN
        $@
        $@
 ##     $@
 ##     $@
 ###### $@
 ##   ##$@
 ###### $@
        $@@
0x044D  CYRILLIC SMALL LETTER E
        $@
        $@
 ###### $@
      ##$@
   #####$@
      ##$@
 ###### $@
        $@@
0x044E  CYRILLIC SMALL LETTER YU
        $@
        $@
 #  ### $@
 # ## ##$@
 #### ##$@
 # ## ##$@
 #  ### $@
        $@@
0x044F  CYRILLIC SMALL LETTER YA
        $@
        $@
   #####$@
  ##  ##$@
   #####$@
  ##  ##$@
 ##   ##$@
        $@@
0x0451  CYRILLIC SMALL LETTER IO
         $@
         $@
 ########$@
         $@
 #### ###$@
   ## ## $@
   ## ## $@
   ## ## $@@
0x2219  BULLET OPERATOR
   ## ##$@
   ## ##$@
   ## ##$@
   ## ##$@
 #######$@
        $@
        $@
        $@@
0x221A  SQUARE ROOT
    ## $@
    ## $@
 ##### $@
    ## $@
 ##### $@
       $@
       $@
       $@@
0x2248  ALMOST EQUAL TO
       $@
       $@
       $@
       $@
 ##### $@
    ## $@
    ## $@
    ## $@@
0x2264  LESS-THAN OR EQUAL TO
 ##   $@
 ##   $@
 ##   $@
 ##   $@
 #####$@
      $@
      $@
      $@@
0x2265  GREATER-THAN OR EQUAL TO
    ##   $@
    ##   $@
    ##   $@
    ##   $@
 ########$@
         $@
         $@
         $@@
0x2320  TOP HALF INTEGRAL
        $@
        $@
 #######$@
      ##$@
 #### ##$@
   ## ##$@
   ## ##$@
   ## ##$@@
0x2321  BOTTOM HALF INTEGRAL
 ##   $@
 ##   $@
 ##   $@
 ##   $@
 #####$@
 ##   $@
 ##   $@
 ##   $@@
0x2500  BOX DRAWINGS LIGHT HORIZONTAL
   ##  $@
       $@
   ##  $@
  ##   $@
 ##    $@
 ##  ##$@
  #### $@
       $@@
0x2502  BOX DRAWINGS LIGHT VERTICAL
       $@
       $@
       $@
 ######$@
 ##    $@
 ##    $@
       $@
       $@@
0x250C  BOX DRAWINGS LIGHT DOWN AND RIGHT
       $@
       $@
       $@
 ######$@
     ##$@
     ##$@
       $@
       $@@
0x2510  BOX DRAWINGS LIGHT DOWN AND LEFT
 ##    ##$@
 ##   ## $@
 ##  ##  $@
 ## #### $@
   ##  ##$@
  ##  ## $@
 ##  ##  $@
     ####$@@
0x2514  BOX DRAWINGS LIGHT UP AND RIGHT
 ##    ##$@
 ##   ## $@
 ##  ##  $@
 ## ## ##$@
   ## ###$@
  ## ####$@
 ##  ####$@
       ##$@@
0x2518  BOX DRAWINGS LIGHT UP AND LEFT
 ## $@
 ## $@
    $@
 ## $@
 ## $@
 ## $@
 ## $@
    $@@
0x251C  BOX DRAWINGS LIGHT VERTICAL AND RIGHT
         $@
   ##  ##$@
  ##  ## $@
 ##  ##  $@
  ##  ## $@
   ##  ##$@
         $@
         $@@
0x2524  BOX DRAWINGS LIGHT VERTICAL AND LEFT
         $@
 ##  ##  $@
  ##  ## $@
   ##  ##$@
  ##  ## $@
 ##  ##  $@
         $@
         $@@
0x252C  BOX DRAWINGS LIGHT DOWN AND HORIZONTAL
  # #$@
 # # $@
  # #$@
 # # $@
  # #$@
 # # $@
  # #$@
 # # $@@
0x2534  BOX DRAWINGS LIGHT UP AND HORIZONTAL
  # # # #$@
 # # # # $@
  # # # #$@
 # # # # $@
  # # # #$@
 # # # # $@
  # # # #$@
 # # # # $@@
0x253C  BOX DRAWINGS LIGHT VERTICAL AND HORIZONTAL
 ## ## ##$@
  ### ###$@
 ## ## ##$@
 ### ### $@
 ## ## ##$@
  ### ###$@
 ## ## ##$@
 ### ### $@@
0x2550  BOX DRAWINGS DOUBLE HORIZONTAL
 ## ## $@
 ## ## $@
 ## ###$@
 ##    $@
 ######$@
       $@
       $@
       $@@
0x2551  BOX DRAWINGS DOUBLE VERTICAL
       $@
       $@
 ######$@
 ##    $@
 ## ###$@
 ## ## $@
 ## ## $@
 ## ## $@@
0x2552  BOX DRAWINGS DOWN SINGLE AND RIGHT DOUBLE
   ## ## $@
   ## ## $@
 #### ###$@
         $@
 ########$@
         $@
         $@
         $@@
0x2553  BOX DRAWINGS DOWN DOUBLE AND RIGHT SINGLE
 #### $@
 #### $@
 #####$@
 ##   $@
 #####$@
 #### $@
 #### $@
 #### $@@
0x2554  BOX DRAWINGS DOUBLE DOWN AND RIGHT
         $@
         $@
 ########$@
         $@
 ########$@
         $@
         $@
         $@@
0x2555  BOX DRAWINGS DOWN SINGLE AND LEFT DOUBLE
   #### $@
   #### $@
 #######$@
        $@
 #######$@
   #### $@
   #### $@
   #### $@@
0x2556  BOX DRAWINGS DOWN DOUBLE AND LEFT SINGLE
    ##   $@
    ##   $@
 ########$@
         $@
 ########$@
         $@
         $@
         $@@
0x2557  BOX DRAWINGS DOUBLE DOWN AND LEFT
   ## ## $@
   ## ## $@
   ## ## $@
   ## ## $@
 ########$@
         $@
         $@
         $@@
0x2558  BOX DRAWINGS UP SINGLE AND RIGHT DOUBLE
         $@
         $@
 ########$@
         $@
 ########$@
    ##   $@
    ##   $@
    ##   $@@
0x2559  BOX DRAWINGS UP DOUBLE AND RIGHT SINGLE
         $@
         $@
         $@
         $@
 ########$@
   ## ## $@
   ## ## $@
   ## ## $@@
0x255A  BOX DRAWINGS DOUBLE UP AND RIGHT
 ## ## $@
 ## ## $@
 ## ## $@
 ## ## $@
 ######$@
       $@
       $@
       $@@
0x255B  BOX DRAWINGS UP SINGLE AND LEFT DOUBLE
 ##   $@
 ##   $@
 #####$@
 ##   $@
 #####$@
      $@
      $@
      $@@
0x255C  BOX DRAWINGS UP DOUBLE AND LEFT SINGLE
      $@
      $@
 #####$@
 ##   $@
 #####$@
 ##   $@
 ##   $@
 ##   $@@
0x255D  BOX DRAWINGS DOUBLE UP AND LEFT
       $@
       $@
       $@
       $@
 ######$@
 ## ## $@
 ## ## $@
 ## ## $@@
0x255E  BOX DRAWINGS VERTICAL SINGLE AND RIGHT DOUBLE
   ## ## $@
   ## ## $@
   ## ## $@
   ## ## $@
 ########$@
   ## ## $@
   ## ## $@
   ## ## $@@
0x255F  BOX DRAWINGS VERTICAL DOUBLE AND RIGHT SINGLE
    ##   $@
    ##   $@
 ########$@
    ##   $@
 ########$@
    ##   $@
    ##   $@
    ##   $@@
0x2560  BOX DRAWINGS DOUBLE VERTICAL AND RIGHT
    ## $@
    ## $@
    ## $@
    ## $@
 ##### $@
       $@
       $@
       $@@
0x2561  BOX DRAWINGS VERTICAL SINGLE AND LEFT DOUBLE
      $@
      $@
      $@
      $@
 #####$@
 ##   $@
 ##   $@
 ##   $@@
0x2562  BOX DRAWINGS VERTICAL DOUBLE AND LEFT SINGLE
         $@
         $@
         $@
         $@
 ########$@
 ########$@
 ########$@
 ########$@@
0x2563  BOX DRAWINGS DOUBLE VERTICAL AND LEFT
 ####  $@
 ####  $@
 ####  $@
 ####  $@
 ####  $@
 ####  $@
 ####  $@
 ####  $@@
0x2564  BOX DRAWINGS DOWN SINGLE AND HORIZONTAL DOUBLE
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@@
0x2565  BOX DRAWINGS DOWN DOUBLE AND HORIZONTAL SINGLE
 ########$@
 ########$@
 ########$@
 ########$@
         $@
         $@
         $@
         $@@
0x2566  BOX DRAWINGS DOUBLE DOWN AND HORIZONTAL
  ###  $@
 ## ## $@
 ## ## $@
  ###  $@
       $@
       $@
       $@
       $@@
0x2567  BOX DRAWINGS UP SINGLE AND HORIZONTAL DOUBLE
    $@
    $@
    $@
 ## $@
 ## $@
    $@
    $@
    $@@
0x2568  BOX DRAWINGS UP DOUBLE AND HORIZONTAL SINGLE
    $@
    $@
    $@
    $@
 ## $@
    $@
    $@
    $@@
0x2569  BOX DRAWINGS DOUBLE UP AND HORIZONTAL
     ####$@
     ##  $@
     ##  $@
     ##  $@
 ### ##  $@
  ## ##  $@
   ####  $@
    ###  $@@
0x256A  BOX DRAWINGS VERTICAL SINGLE AND HORIZONTAL DOUBLE
 ####  $@
 ## ## $@
 ## ## $@
 ## ## $@
 ## ## $@
       $@
       $@
       $@@
0x256B  BOX DRAWINGS VERTICAL DOUBLE AND HORIZONTAL SINGLE
 ###  $@
   ## $@
  ##  $@
 ##   $@
 #### $@
      $@
      $@
      $@@
0x256C  BOX DRAWINGS DOUBLE VERTICAL AND HORIZONTAL
      $@
      $@
 #### $@
 #### $@
 #### $@
 #### $@
      $@
      $@@
0x2580  UPPER HALF BLOCK
 ## $@
 ## $@
 ## $@
 ## $@
 ## $@
 ## $@
 ## $@
 ## $@@
0x2584  LOWER HALF BLOCK
    ## $@
    ## $@
    ## $@
    ## $@
 ##### $@
    ## $@
    ## $@
    ## $@@
0x2588  FULL BLOCK
    ## $@
    ## $@
 ##### $@
    ## $@
 ##### $@
    ## $@
    ## $@
    ## $@@
0x258C  LEFT HALF BLOCK
   ####$@
   ####$@
   ####$@
   ####$@
 ######$@
   ####$@
   ####$@
   ####$@@
0x2590  RIGHT HALF BLOCK
        $@
        $@
        $@
        $@
 #######$@
   ## ##$@
   ## ##$@
   ## ##$@@
0x2591  LIGHT SHADE
       $@
       $@
 ##### $@
    ## $@
 ##### $@
    ## $@
    ## $@
    ## $@@
0x2592  MEDIUM SHADE
   ####$@
   ####$@
 ######$@
     ##$@
 ######$@
   ####$@
   ####$@
   ####$@@
0x2593  DARK SHADE
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@
 ####$@@
0x25A0  BLACK SQUARE
   ## ##$@
   ## ##$@
 #### ##$@
      ##$@
 #######$@
        $@
        $@
        $@@
0x30A2  A
 ##########$@
       ### $@
      #    $@
     #     $@
    #      $@
   #       $@
  #        $@
           $@@
0x30A4  I
       ##$@
     ##  $@
   ## #  $@
 ##   #  $@
      #  $@
      #  $@
      #  $@
         $@@
0x30A6  U
     #     $@
 ##########$@
 #        #$@
        ## $@
      ##   $@
    ##     $@
  ##       $@
           $@@
0x30A8  E
           $@
   ####### $@
      #    $@
      #    $@
      #    $@
      #    $@
 ##########$@
           $@@
0x30AA  O
        #  $@
 ##########$@
       ##  $@
     ## #  $@
   ##   #  $@
 ##    ##  $@
        #  $@
           $@@
0x30AB  KA
      #    $@
 ##########$@
     #    #$@
     #    #$@
    #     #$@
   #   # # $@
  #     #  $@
           $@@
0x30AD  KI
 # #    $@
  #   # $@
 # # #  $@
    #   $@
   # #  $@
  #   # $@
       #$@
        $@@
0x30AF  KU
    #      $@
   ########$@
  #       #$@
 #      ## $@
      ##   $@
    ##     $@
  ##       $@
           $@@
0x30B1  KE
    #      $@
   ########$@
  #    #   $@
 #    #    $@
     #     $@
    #      $@
   #       $@
           $@@
0x30B3  KO
           $@
 ##########$@
          #$@
          #$@
          #$@
          #$@
 ######### $@
           $@@
0x30B5  SA
   #    #  $@
 ##########$@
   #    #  $@
        #  $@
       #   $@
      #    $@
    #      $@
           $@@
0x30B7  SI (SHI)
   #       #$@
 #  #     # $@
  #      #  $@
       ##   $@
     ##     $@
   ##       $@
 ##         $@
            $@@
0x30B9  SU
 ########$@
        #$@
       # $@
     ##  $@
   ## #  $@
  ##   # $@
 #      #$@
         $@@
0x30BB  SE
   #       $@
   #       $@
 ##########$@
   #     # $@
   #       $@
   #       $@
    ###### $@
           $@@
0x30BD  SO
 #       #$@
 #       #$@
        # $@
       #  $@
     ##   $@
   ##     $@
 ##       $@
          $@@
0x30BF  TA
    #     $@
   #######$@
  #     # $@
 # #   #  $@
    ###   $@
   ##     $@
 ##       $@
          $@@
0x30C1  TI (CHI)
        ## $@
  ######   $@
      #    $@
 ##########$@
      #    $@
      #    $@
    ##     $@
           $@@
0x30C4  TU (TSU)
 # #     #$@
 # #     #$@
        # $@
       #  $@
     ##   $@
   ##     $@
 ##       $@
          $@@
0x30C6  TE
   ######  $@
           $@
 ##########$@
      #    $@
      #    $@
     #     $@
   ##      $@
           $@@
0x30C8  TO
 #   $@
 #   $@
 ##  $@
 # # $@
 #  #$@
 #   $@
 #   $@
     $@@
0x30CA  NA
      #    $@
 ##########$@
      #    $@
      #    $@
     #     $@
    #      $@
  ##       $@
           $@@
0x30CB  NI
           $@
           $@
   ######  $@
           $@
           $@
 ##########$@
           $@
           $@@
0x30CC  NU
 ##########$@
          #$@
    #    # $@
     # ##  $@
     ##    $@
   ##  #   $@
 ##     #  $@
           $@@
0x30CD  NE
      #    $@
 ##########$@
         # $@
      ###  $@
   ######  $@
 ##   #  ##$@
      #    $@
           $@@
0x30CE  NO
         #$@
         #$@
        # $@
       #  $@
     ##   $@
   ##     $@
 ##       $@
          $@@
0x30CF  HA
          $@
          $@
    #  #  $@
   #    # $@
  #      #$@
 #        $@
          $@
          $@@
0x30D2  HI
 #       $@
 #   ### $@
 ####    $@
 #       $@
 #       $@
 #       $@
  #######$@
         $@@
0x30D5  HU (FU)
 ########$@
        #$@
        #$@
       # $@
     ##  $@
   ##    $@
 ##      $@
         $@@
0x30D8  HE
           $@
           $@
   ##      $@
  #  ##    $@
 #     ##  $@
         ##$@
           $@
           $@@
0x30DB  HO
      #    $@
 ##########$@
      #    $@
   #  # #  $@
  #   #  # $@
 #   ##   #$@
      #    $@
           $@@
0x30DE  MA
           $@
 ##########$@
         # $@
        #  $@
     # #   $@
      #    $@
       #   $@
           $@@
0x30DF  MI
 ####  $@
     ##$@
 ###   $@
    ###$@
       $@
 ###   $@
    ###$@
       $@@
0x30E0  MU
      #    $@
     #     $@
    #      $@
   #       $@
  #     #  $@
 ######### $@
          #$@
           $@@
0x30E1  ME
         #$@
        # $@
   #   #  $@
    # #   $@
     #    $@
   ## #   $@
 ##    #  $@
          $@@
0x30E2  MO
   ######  $@
     #     $@
 ##########$@
     #     $@
     #     $@
     #     $@
      #### $@
           $@@
0x30E4  YA
 #     ##  $@
  #  ## #  $@
  ###      $@
 #  #      $@
     #     $@
      #    $@
       #   $@
           $@@
0x30E6  YU
           $@
   ######  $@
        #  $@
        #  $@
        #  $@
 ##########$@
           $@
           $@@
0x30E8  YO
           $@
   ######  $@
       #   $@
      #    $@
      #    $@
 ##########$@
           $@
           $@@
0x30E9  RA
   ######  $@
           $@
 ##########$@
 #        #$@
        ## $@
      ##   $@
    ##     $@
           $@@
0x30EA  RI
 #   #$@
 #   #$@
 #   #$@
 #   #$@
    # $@
   #  $@
 ##   $@
      $@@
0x30EB  RU
    # #    $@
    # #    $@
    # #    $@
    # #   #$@
   #  #  # $@
  #   # #  $@
 #    ##   $@
           $@@
0x30EC  RE
 #       $@
 #       $@
 #       $@
 #     ##$@
 #   ##  $@
 # ##    $@
 ##      $@
         $@@
0x30ED  RO
          $@
 #########$@
 #       #$@
 #       #$@
 #       #$@
 #########$@
          $@
          $@@
0x30EF  WA
 ##########$@
 #        #$@
         # $@
        #  $@
       #   $@
     ##    $@
   ##      $@
           $@@
0x30F0  WI
      #    $@
   ####### $@
    # #    $@
    # #    $@
 ##########$@
      #    $@
      #    $@
           $@@
0x30F1  WE
 #########$@
         #$@
         #$@
 ######## $@
        # $@
        # $@
 ######## $@
          $@@
0x30F2  WO
 ##########$@
          #$@
         # $@
 ########  $@
     ##    $@
   ##      $@
 ##        $@
           $@@
0x30F3  N
         #$@
 #       #$@
  #     # $@
       #  $@
     ##   $@
   ##     $@
 ##       $@
          $@@
-0x0004  KATAMAP
                                                    @
a-A i-B u-C e-D o-E ka-F ki-G ku-H ke-I ko-J        @
sa-K shi-L su-M se-N so-O ta-P chi-Q tsu-R te-S to-T@
na-U ni-V nu-W ne-X no-Y ha-Z hi-a fu-b he-c ho-d   @
ma-e mi-f mu-g me-h mo-i ya-j yu-k we-l yo-m        @
ra-n ri-o ru-p re-q ro-r wa-s wi-t wo-u             @
n-v                                                 @
                                                    @@
-0x0006  MOSCOWMAP
a-a, b-b, v-v, g-g, d-d, e-e, zh-j, z-z, i-i@
short i->, k-k, l-l, m-m, n-n, o-o, p-p, r-r@
s-s, t-t, u-u, f-f, kh-h, ts-q, ch-c, sh-w  @
shch-x, hard-\\, yeru-|, soft-/, reverse e-~ @
yu-\`, ya-y                                  @
Capitals use Latin capital letters, except: @
Reverse E-<, Yu-@                           @
No caps for short i, hard, yeru, soft.      @@
`,wa=`flf2a$ 6 5 16 15 10 0 18319
Slant by Glenn Chappell 3/93 -- based on Standard
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

     $$@
    $$ @
   $$  @
  $$   @
 $$    @
$$     @@
    __@
   / /@
  / / @
 /_/  @
(_)   @
      @@
 _ _ @
( | )@
|/|/ @
 $   @
$    @
     @@
     __ __ @
  __/ // /_@
 /_  _  __/@
/_  _  __/ @
 /_//_/    @
           @@
     __@
   _/ /@
  / __/@
 (_  ) @
/  _/  @
/_/    @@
   _   __@
  (_)_/_/@
   _/_/  @
 _/_/_   @
/_/ (_)  @
         @@
   ___   @
  ( _ )  @
 / __ \\/|@
/ /_/  < @
\\____/\\/ @
         @@
  _ @
 ( )@
 |/ @
 $  @
$   @
    @@
     __@
   _/_/@
  / /  @
 / /   @
/ /    @
|_|    @@
     _ @
    | |@
    / /@
   / / @
 _/_/  @
/_/    @@
       @
  __/|_@
 |    /@
/_ __| @
 |/    @
       @@
       @
    __ @
 __/ /_@
/_  __/@
 /_/   @
       @@
   @
   @
   @
 _ @
( )@
|/ @@
       @
       @
 ______@
/_____/@
  $    @
       @@
   @
   @
   @
 _ @
(_)@
   @@
       __@
     _/_/@
   _/_/  @
 _/_/    @
/_/      @
         @@
   ____ @
  / __ \\@
 / / / /@
/ /_/ / @
\\____/  @
        @@
   ___@
  <  /@
  / / @
 / /  @
/_/   @
      @@
   ___ @
  |__ \\@
  __/ /@
 / __/ @
/____/ @
       @@
   _____@
  |__  /@
   /_ < @
 ___/ / @
/____/  @
        @@
   __ __@
  / // /@
 / // /_@
/__  __/@
  /_/   @
        @@
    ______@
   / ____/@
  /___ \\  @
 ____/ /  @
/_____/   @
          @@
   _____@
  / ___/@
 / __ \\ @
/ /_/ / @
\\____/  @
        @@
 _____@
/__  /@
  / / @
 / /  @
/_/   @
      @@
   ____ @
  ( __ )@
 / __  |@
/ /_/ / @
\\____/  @
        @@
   ____ @
  / __ \\@
 / /_/ /@
 \\__, / @
/____/  @
        @@
     @
   _ @
  (_)@
 _   @
(_)  @
     @@
     @
   _ @
  (_)@
 _   @
( )  @
|/   @@
  __@
 / /@
/ / @
\\ \\ @
 \\_\\@
    @@
       @
  _____@
 /____/@
/____/ @
  $    @
       @@
__  @
\\ \\ @
 \\ \\@
 / /@
/_/ @
    @@
  ___ @
 /__ \\@
  / _/@
 /_/  @
(_)   @
      @@
   ______ @
  / ____ \\@
 / / __ \`/@
/ / /_/ / @
\\ \\__,_/  @
 \\____/   @@
    ___ @
   /   |@
  / /| |@
 / ___ |@
/_/  |_|@
        @@
    ____ @
   / __ )@
  / __  |@
 / /_/ / @
/_____/  @
         @@
   ______@
  / ____/@
 / /     @
/ /___   @
\\____/   @
         @@
    ____ @
   / __ \\@
  / / / /@
 / /_/ / @
/_____/  @
         @@
    ______@
   / ____/@
  / __/   @
 / /___   @
/_____/   @
          @@
    ______@
   / ____/@
  / /_    @
 / __/    @
/_/       @
          @@
   ______@
  / ____/@
 / / __  @
/ /_/ /  @
\\____/   @
         @@
    __  __@
   / / / /@
  / /_/ / @
 / __  /  @
/_/ /_/   @
          @@
    ____@
   /  _/@
   / /  @
 _/ /   @
/___/   @
        @@
       __@
      / /@
 __  / / @
/ /_/ /  @
\\____/   @
         @@
    __ __@
   / //_/@
  / ,<   @
 / /| |  @
/_/ |_|  @
         @@
    __ @
   / / @
  / /  @
 / /___@
/_____/@
       @@
    __  ___@
   /  |/  /@
  / /|_/ / @
 / /  / /  @
/_/  /_/   @
           @@
    _   __@
   / | / /@
  /  |/ / @
 / /|  /  @
/_/ |_/   @
          @@
   ____ @
  / __ \\@
 / / / /@
/ /_/ / @
\\____/  @
        @@
    ____ @
   / __ \\@
  / /_/ /@
 / ____/ @
/_/      @
         @@
   ____ @
  / __ \\@
 / / / /@
/ /_/ / @
\\___\\_\\ @
        @@
    ____ @
   / __ \\@
  / /_/ /@
 / _, _/ @
/_/ |_|  @
         @@
   _____@
  / ___/@
  \\__ \\ @
 ___/ / @
/____/  @
        @@
  ______@
 /_  __/@
  / /   @
 / /    @
/_/     @
        @@
   __  __@
  / / / /@
 / / / / @
/ /_/ /  @
\\____/   @
         @@
 _    __@
| |  / /@
| | / / @
| |/ /  @
|___/   @
        @@
 _       __@
| |     / /@
| | /| / / @
| |/ |/ /  @
|__/|__/   @
           @@
   _  __@
  | |/ /@
  |   / @
 /   |  @
/_/|_|  @
        @@
__  __@
\\ \\/ /@
 \\  / @
 / /  @
/_/   @
      @@
 _____@
/__  /@
  / / @
 / /__@
/____/@
      @@
     ___@
    / _/@
   / /  @
  / /   @
 / /    @
/__/    @@
__    @
\\ \\   @
 \\ \\  @
  \\ \\ @
   \\_\\@
      @@
     ___@
    /  /@
    / / @
   / /  @
 _/ /   @
/__/    @@
  //|@
 |/||@
  $  @
 $   @
$    @
     @@
       @
       @
       @
       @
 ______@
/_____/@@
  _ @
 ( )@
  V @
 $  @
$   @
    @@
        @
  ____ _@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
    __  @
   / /_ @
  / __ \\@
 / /_/ /@
/_.___/ @
        @@
       @
  _____@
 / ___/@
/ /__  @
\\___/  @
       @@
       __@
  ____/ /@
 / __  / @
/ /_/ /  @
\\__,_/   @
         @@
      @
  ___ @
 / _ \\@
/  __/@
\\___/ @
      @@
    ____@
   / __/@
  / /_  @
 / __/  @
/_/     @
        @@
         @
   ____ _@
  / __ \`/@
 / /_/ / @
 \\__, /  @
/____/   @@
    __  @
   / /_ @
  / __ \\@
 / / / /@
/_/ /_/ @
        @@
    _ @
   (_)@
  / / @
 / /  @
/_/   @
      @@
       _ @
      (_)@
     / / @
    / /  @
 __/ /   @
/___/    @@
    __  @
   / /__@
  / //_/@
 / ,<   @
/_/|_|  @
        @@
    __@
   / /@
  / / @
 / /  @
/_/   @
      @@
            @
   ____ ___ @
  / __ \`__ \\@
 / / / / / /@
/_/ /_/ /_/ @
            @@
        @
   ____ @
  / __ \\@
 / / / /@
/_/ /_/ @
        @@
       @
  ____ @
 / __ \\@
/ /_/ /@
\\____/ @
       @@
         @
    ____ @
   / __ \\@
  / /_/ /@
 / .___/ @
/_/      @@
        @
  ____ _@
 / __ \`/@
/ /_/ / @
\\__, /  @
  /_/   @@
        @
   _____@
  / ___/@
 / /    @
/_/     @
        @@
        @
   _____@
  / ___/@
 (__  ) @
/____/  @
        @@
   __ @
  / /_@
 / __/@
/ /_  @
\\__/  @
      @@
        @
  __  __@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
       @
 _   __@
| | / /@
| |/ / @
|___/  @
       @@
          @
 _      __@
| | /| / /@
| |/ |/ / @
|__/|__/  @
          @@
        @
   _  __@
  | |/_/@
 _>  <  @
/_/|_|  @
        @@
         @
   __  __@
  / / / /@
 / /_/ / @
 \\__, /  @
/____/   @@
     @
 ____@
/_  /@
 / /_@
/___/@
     @@
     __@
   _/_/@
 _/_/  @
< <    @
/ /    @
\\_\\    @@
     __@
    / /@
   / / @
  / /  @
 / /   @
/_/    @@
     _ @
    | |@
    / /@
   _>_>@
 _/_/  @
/_/    @@
  /\\//@
 //\\/ @
  $   @
 $    @
$     @
      @@
    _  _ @
   (_)(_)@
  / _ |  @
 / __ |  @
/_/ |_|  @
         @@
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\____/   @
         @@
   _   _ @
  (_)_(_)@
 / __ \`/ @
/ /_/ /  @
\\__,_/   @
         @@
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\__,_/   @
         @@
     ____ @
    / __ \\@
   / / / /@
  / /_| | @
 / //__/  @
/_/       @@
160  NO-BREAK SPACE
     $$@
    $$ @
   $$  @
  $$   @
 $$    @
$$     @@
161  INVERTED EXCLAMATION MARK
    _ @
   (_)@
  / / @
 / /  @
/_/   @
      @@
162  CENT SIGN
     __@
  __/ /@
 / ___/@
/ /__  @
\\  _/  @
/_/    @@
163  POUND SIGN
     ____ @
    / ,__\\@
 __/ /_   @
 _/ /___  @
(_,____/  @
          @@
164  CURRENCY SIGN
    /|___/|@
   | __  / @
  / /_/ /  @
 /___  |   @
|/   |/    @
           @@
165  YEN SIGN
    ____@
  _| / /@
 /_  __/@
/_  __/ @
 /_/    @
        @@
166  BROKEN BAR
     __@
    / /@
   /_/ @
  __   @
 / /   @
/_/    @@
167  SECTION SIGN
     __ @
   _/ _)@
  / | | @
 | || | @
 | |_/  @
(__/    @@
168  DIAERESIS
  _   _ @
 (_) (_)@
  $   $ @
 $   $  @
$   $   @
        @@
169  COPYRIGHT SIGN
    ______  @
   / _____\\ @
  / / ___/ |@
 / / /__  / @
|  \\___/ /  @
 \\______/   @@
170  FEMININE ORDINAL INDICATOR
   ___ _@
  / _ \`/@
 _\\_,_/ @
/____/  @
 $      @
        @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
  ____@
 / / /@
/ / / @
\\ \\ \\ @
 \\_\\_\\@
      @@
172  NOT SIGN
       @
 ______@
/___  /@
   /_/ @
 $     @
       @@
173  SOFT HYPHEN
      @
      @
 _____@
/____/@
  $   @
      @@
174  REGISTERED SIGN
    ______  @
   / ___  \\ @
  / / _ \\  |@
 / / , _/ / @
| /_/|_| /  @
 \\______/   @@
175  MACRON
 ______@
/_____/@
  $    @
 $     @
$      @
       @@
176  DEGREE SIGN
  ___ @
 / _ \\@
/ // /@
\\___/ @
 $    @
      @@
177  PLUS-MINUS SIGN
      __ @
   __/ /_@
  /_  __/@
 __/_/_  @
/_____/  @
         @@
178  SUPERSCRIPT TWO
   ___ @
  |_  |@
 / __/ @
/____/ @
 $     @
       @@
179  SUPERSCRIPT THREE
   ____@
  |_  /@
 _/_ < @
/____/ @
 $     @
       @@
180  ACUTE ACCENT
  __@
 /_/@
  $ @
 $  @
$   @
    @@
181  MICRO SIGN
          @
    __  __@
   / / / /@
  / /_/ / @
 / ._,_/  @
/_/       @@
182  PILCROW SIGN
  _______@
 / _    /@
/ (/ / / @
\\_  / /  @
 /_/_/   @
         @@
183  MIDDLE DOT
   @
 _ @
(_)@
 $ @
$  @
   @@
184  CEDILLA
   @
   @
   @
   @
 _ @
/_)@@
185  SUPERSCRIPT ONE
  ___@
 <  /@
 / / @
/_/  @
$    @
     @@
186  MASCULINE ORDINAL INDICATOR
   ___ @
  / _ \\@
 _\\___/@
/____/ @
 $     @
       @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
____  @
\\ \\ \\ @
 \\ \\ \\@
 / / /@
/_/_/ @
      @@
188  VULGAR FRACTION ONE QUARTER
  ___   __ @
 <  / _/_/ @
 / /_/_/___@
/_//_// / /@
 /_/ /_  _/@
      /_/  @@
189  VULGAR FRACTION ONE HALF
  ___   __   @
 <  / _/_/__ @
 / /_/_/|_  |@
/_//_/ / __/ @
 /_/  /____/ @
             @@
190  VULGAR FRACTION THREE QUARTERS
   ____    __ @
  |_  /  _/_/ @
 _/_ < _/_/___@
/____//_// / /@
    /_/ /_  _/@
         /_/  @@
191  INVERTED QUESTION MARK
    _ @
   (_)@
 _/ / @
/ _/_ @
\\___/ @
      @@
192  LATIN CAPITAL LETTER A WITH GRAVE
    __ @
   _\\_\\@
  / _ |@
 / __ |@
/_/ |_|@
       @@
193  LATIN CAPITAL LETTER A WITH ACUTE
     __@
   _/_/@
  / _ |@
 / __ |@
/_/ |_|@
       @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
     //|@
   _|/||@
  / _ | @
 / __ | @
/_/ |_| @
        @@
195  LATIN CAPITAL LETTER A WITH TILDE
     /\\//@
   _//\\/ @
  / _ |  @
 / __ |  @
/_/ |_|  @
         @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
    _  _ @
   (_)(_)@
  / _ |  @
 / __ |  @
/_/ |_|  @
         @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    (())@
   /   |@
  / /| |@
 / ___ |@
/_/  |_|@
        @@
198  LATIN CAPITAL LETTER AE
    __________@
   /     ____/@
  / /|  __/   @
 / __  /___   @
/_/ /_____/   @
              @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ______@
  / ____/@
 / /     @
/ /___   @
\\____/   @
 /_)     @@
200  LATIN CAPITAL LETTER E WITH GRAVE
    __ @
   _\\_\\@
  / __/@
 / _/  @
/___/  @
       @@
201  LATIN CAPITAL LETTER E WITH ACUTE
     __@
   _/_/@
  / __/@
 / _/  @
/___/  @
       @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
     //|@
   _|/||@
  / __/ @
 / _/   @
/___/   @
        @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
    _  _ @
   (_)(_)@
  / __/  @
 / _/    @
/___/    @
         @@
204  LATIN CAPITAL LETTER I WITH GRAVE
    __ @
   _\\_\\@
  /  _/@
 _/ /  @
/___/  @
       @@
205  LATIN CAPITAL LETTER I WITH ACUTE
     __@
   _/_/@
  /  _/@
 _/ /  @
/___/  @
       @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
     //|@
   _|/||@
  /  _/ @
 _/ /   @
/___/   @
        @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
    _  _ @
   (_)(_)@
  /  _/  @
 _/ /    @
/___/    @
         @@
208  LATIN CAPITAL LETTER ETH
     ____ @
    / __ \\@
 __/ /_/ /@
/_  __/ / @
 /_____/  @
          @@
209  LATIN CAPITAL LETTER N WITH TILDE
     /\\//@
   _//\\/ @
  / |/ / @
 /    /  @
/_/|_/   @
         @@
210  LATIN CAPITAL LETTER O WITH GRAVE
    __ @
  __\\_\\@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
211  LATIN CAPITAL LETTER O WITH ACUTE
     __@
  __/_/@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
    //|@
  _|/||@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
213  LATIN CAPITAL LETTER O WITH TILDE
    /\\//@
  _//\\/ @
 / __ \\ @
/ /_/ / @
\\____/  @
        @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
215  MULTIPLICATION SIGN
     @
     @
 /|/|@
 > < @
|/|/ @
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   _____ @
  / _// \\@
 / //// /@
/ //// / @
\\_//__/  @
         @@
217  LATIN CAPITAL LETTER U WITH GRAVE
    __  @
  __\\_\\_@
 / / / /@
/ /_/ / @
\\____/  @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
     __ @
  __/_/_@
 / / / /@
/ /_/ / @
\\____/  @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
    //| @
  _|/||_@
 / / / /@
/ /_/ / @
\\____/  @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\____/   @
         @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
   __ @
__/_/_@
\\ \\/ /@
 \\  / @
 /_/  @
      @@
222  LATIN CAPITAL LETTER THORN
    __  @
   / /_ @
  / __ \\@
 / ____/@
/_/     @
        @@
223  LATIN SMALL LETTER SHARP S
     ____ @
    / __ \\@
   / / / /@
  / /_| | @
 / //__/  @
/_/       @@
224  LATIN SMALL LETTER A WITH GRAVE
    __  @
  __\\_\\_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
225  LATIN SMALL LETTER A WITH ACUTE
     __ @
  __/_/_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
    //| @
  _|/||_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
227  LATIN SMALL LETTER A WITH TILDE
    /\\//@
  _//\\/_@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
228  LATIN SMALL LETTER A WITH DIAERESIS
   _   _ @
  (_)_(_)@
 / __ \`/ @
/ /_/ /  @
\\__,_/   @
         @@
229  LATIN SMALL LETTER A WITH RING ABOVE
     __ @
  __(())@
 / __ \`/@
/ /_/ / @
\\__,_/  @
        @@
230  LATIN SMALL LETTER AE
           @
  ____ ___ @
 / __ \` _ \\@
/ /_/   __/@
\\__,_____/ @
           @@
231  LATIN SMALL LETTER C WITH CEDILLA
       @
  _____@
 / ___/@
/ /__  @
\\___/  @
/_)    @@
232  LATIN SMALL LETTER E WITH GRAVE
   __ @
  _\\_\\@
 / _ \\@
/  __/@
\\___/ @
      @@
233  LATIN SMALL LETTER E WITH ACUTE
    __@
  _/_/@
 / _ \\@
/  __/@
\\___/ @
      @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
    //|@
  _|/||@
 / _ \\ @
/  __/ @
\\___/  @
       @@
235  LATIN SMALL LETTER E WITH DIAERESIS
   _  _ @
  (_)(_)@
 / _ \\  @
/  __/  @
\\___/   @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
   __ @
   \\_\\@
  / / @
 / /  @
/_/   @
      @@
237  LATIN SMALL LETTER I WITH ACUTE
    __@
   /_/@
  / / @
 / /  @
/_/   @
      @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
    //|@
   |/||@
  / /  @
 / /   @
/_/    @
       @@
239  LATIN SMALL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / /   @
 / /    @
/_/     @
        @@
240  LATIN SMALL LETTER ETH
     || @
    =||=@
 ___ || @
/ __\` | @
\\____/  @
        @@
241  LATIN SMALL LETTER N WITH TILDE
     /\\//@
   _//\\/ @
  / __ \\ @
 / / / / @
/_/ /_/  @
         @@
242  LATIN SMALL LETTER O WITH GRAVE
    __ @
  __\\_\\@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
243  LATIN SMALL LETTER O WITH ACUTE
     __@
  __/_/@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
    //|@
  _|/||@
 / __ \\@
/ /_/ /@
\\____/ @
       @@
245  LATIN SMALL LETTER O WITH TILDE
    /\\//@
  _//\\/ @
 / __ \\ @
/ /_/ / @
\\____/  @
        @@
246  LATIN SMALL LETTER O WITH DIAERESIS
   _   _ @
  (_)_(_)@
 / __ \\  @
/ /_/ /  @
\\____/   @
         @@
247  DIVISION SIGN
       @
    _  @
 __(_)_@
/_____/@
 (_)   @
       @@
248  LATIN SMALL LETTER O WITH STROKE
        @
  _____ @
 / _// \\@
/ //// /@
\\_//__/ @
        @@
249  LATIN SMALL LETTER U WITH GRAVE
    __  @
  __\\_\\_@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
250  LATIN SMALL LETTER U WITH ACUTE
     __ @
  __/_/_@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
    //| @
  _|/||_@
 / / / /@
/ /_/ / @
\\__,_/  @
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
   _   _ @
  (_) (_)@
 / / / / @
/ /_/ /  @
\\__,_/   @
         @@
253  LATIN SMALL LETTER Y WITH ACUTE
      __ @
   __/_/_@
  / / / /@
 / /_/ / @
 \\__, /  @
/____/   @@
254  LATIN SMALL LETTER THORN
     __  @
    / /_ @
   / __ \\@
  / /_/ /@
 / .___/ @
/_/      @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
    _   _ @
   (_) (_)@
  / / / / @
 / /_/ /  @
 \\__, /   @
/____/    @@
`,Sa=`flf2a$ 5 4 13 15 10 0 22415
Small by Glenn Chappell 4/93 -- based on Standard
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

 $@
 $@
 $@
 $@
 $@@
  _ @
 | |@
 |_|@
 (_)@
    @@
  _ _ @
 ( | )@
  V V @
   $  @
      @@
    _ _   @
  _| | |_ @
 |_  .  _|@
 |_     _|@
   |_|_|  @@
     @
  ||_@
 (_-<@
 / _/@
  || @@
  _  __ @
 (_)/ / @
   / /_ @
  /_/(_)@
        @@
  __     @
 / _|___ @
 > _|_ _|@
 \\_____| @
         @@
  _ @
 ( )@
 |/ @
  $ @
    @@
   __@
  / /@
 | | @
 | | @
  \\_\\@@
 __  @
 \\ \\ @
  | |@
  | |@
 /_/ @@
     @
 _/\\_@
 >  <@
  \\/ @
     @@
    _   @
  _| |_ @
 |_   _|@
   |_|  @
        @@
    @
    @
  _ @
 ( )@
 |/ @@
      @
  ___ @
 |___|@
   $  @
      @@
    @
    @
  _ @
 (_)@
    @@
    __@
   / /@
  / / @
 /_/  @
      @@
   __  @
  /  \\ @
 | () |@
  \\__/ @
       @@
  _ @
 / |@
 | |@
 |_|@
    @@
  ___ @
 |_  )@
  / / @
 /___|@
      @@
  ____@
 |__ /@
  |_ \\@
 |___/@
      @@
  _ _  @
 | | | @
 |_  _|@
   |_| @
       @@
  ___ @
 | __|@
 |__ \\@
 |___/@
      @@
   __ @
  / / @
 / _ \\@
 \\___/@
      @@
  ____ @
 |__  |@
   / / @
  /_/  @
       @@
  ___ @
 ( _ )@
 / _ \\@
 \\___/@
      @@
  ___ @
 / _ \\@
 \\_, /@
  /_/ @
      @@
  _ @
 (_)@
  _ @
 (_)@
    @@
  _ @
 (_)@
  _ @
 ( )@
 |/ @@
   __@
  / /@
 < < @
  \\_\\@
     @@
      @
  ___ @
 |___|@
 |___|@
      @@
 __  @
 \\ \\ @
  > >@
 /_/ @
     @@
  ___ @
 |__ \\@
   /_/@
  (_) @
      @@
   ____  @
  / __ \\ @
 / / _\` |@
 \\ \\__,_|@
  \\____/ @@
    _   @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
  ___ @
 | _ )@
 | _ \\@
 |___/@
      @@
   ___ @
  / __|@
 | (__ @
  \\___|@
       @@
  ___  @
 |   \\ @
 | |) |@
 |___/ @
       @@
  ___ @
 | __|@
 | _| @
 |___|@
      @@
  ___ @
 | __|@
 | _| @
 |_|  @
      @@
   ___ @
  / __|@
 | (_ |@
  \\___|@
       @@
  _  _ @
 | || |@
 | __ |@
 |_||_|@
       @@
  ___ @
 |_ _|@
  | | @
 |___|@
      @@
     _ @
  _ | |@
 | || |@
  \\__/ @
       @@
  _  __@
 | |/ /@
 | ' < @
 |_|\\_\\@
       @@
  _    @
 | |   @
 | |__ @
 |____|@
       @@
  __  __ @
 |  \\/  |@
 | |\\/| |@
 |_|  |_|@
         @@
  _  _ @
 | \\| |@
 | .\` |@
 |_|\\_|@
       @@
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
  ___ @
 | _ \\@
 |  _/@
 |_|  @
      @@
   ___  @
  / _ \\ @
 | (_) |@
  \\__\\_\\@
        @@
  ___ @
 | _ \\@
 |   /@
 |_|_\\@
      @@
  ___ @
 / __|@
 \\__ \\@
 |___/@
      @@
  _____ @
 |_   _|@
   | |  @
   |_|  @
        @@
  _   _ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
 __   __@
 \\ \\ / /@
  \\ V / @
   \\_/  @
        @@
 __      __@
 \\ \\    / /@
  \\ \\/\\/ / @
   \\_/\\_/  @
           @@
 __  __@
 \\ \\/ /@
  >  < @
 /_/\\_\\@
       @@
 __   __@
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
  ____@
 |_  /@
  / / @
 /___|@
      @@
  __ @
 | _|@
 | | @
 | | @
 |__|@@
 __   @
 \\ \\  @
  \\ \\ @
   \\_\\@
      @@
  __ @
 |_ |@
  | |@
  | |@
 |__|@@
  /\\ @
 |/\\|@
   $ @
   $ @
     @@
      @
      @
      @
  ___ @
 |___|@@
  _ @
 ( )@
  \\|@
  $ @
    @@
       @
  __ _ @
 / _\` |@
 \\__,_|@
       @@
  _    @
 | |__ @
 | '_ \\@
 |_.__/@
       @@
     @
  __ @
 / _|@
 \\__|@
     @@
     _ @
  __| |@
 / _\` |@
 \\__,_|@
       @@
      @
  ___ @
 / -_)@
 \\___|@
      @@
   __ @
  / _|@
 |  _|@
 |_|  @
      @@
       @
  __ _ @
 / _\` |@
 \\__, |@
 |___/ @@
  _    @
 | |_  @
 | ' \\ @
 |_||_|@
       @@
  _ @
 (_)@
 | |@
 |_|@
    @@
    _ @
   (_)@
   | |@
  _/ |@
 |__/ @@
  _   @
 | |__@
 | / /@
 |_\\_\\@
      @@
  _ @
 | |@
 | |@
 |_|@
    @@
        @
  _ __  @
 | '  \\ @
 |_|_|_|@
        @@
       @
  _ _  @
 | ' \\ @
 |_||_|@
       @@
      @
  ___ @
 / _ \\@
 \\___/@
      @@
       @
  _ __ @
 | '_ \\@
 | .__/@
 |_|   @@
       @
  __ _ @
 / _\` |@
 \\__, |@
    |_|@@
      @
  _ _ @
 | '_|@
 |_|  @
      @@
     @
  ___@
 (_-<@
 /__/@
     @@
  _   @
 | |_ @
 |  _|@
  \\__|@
      @@
       @
  _  _ @
 | || |@
  \\_,_|@
       @@
      @
 __ __@
 \\ V /@
  \\_/ @
      @@
         @
 __ __ __@
 \\ V  V /@
  \\_/\\_/ @
         @@
      @
 __ __@
 \\ \\ /@
 /_\\_\\@
      @@
       @
  _  _ @
 | || |@
  \\_, |@
  |__/ @@
     @
  ___@
 |_ /@
 /__|@
     @@
    __@
   / /@
 _| | @
  | | @
   \\_\\@@
  _ @
 | |@
 | |@
 | |@
 |_|@@
 __   @
 \\ \\  @
  | |_@
  | | @
 /_/  @@
  /\\/|@
 |/\\/ @
   $  @
   $  @
      @@
  _  _ @
 (_)(_)@
  /--\\ @
 /_/\\_\\@
       @@
  _  _ @
 (_)(_)@
 / __ \\@
 \\____/@
       @@
  _   _ @
 (_) (_)@
 | |_| |@
  \\___/ @
        @@
  _  _ @
 (_)(_)@
 / _\` |@
 \\__,_|@
       @@
  _   _ @
 (_)_(_)@
  / _ \\ @
  \\___/ @
        @@
  _  _ @
 (_)(_)@
 | || |@
  \\_,_|@
       @@
   ___ @
  / _ \\@
 | |< <@
 | ||_/@
 |_|   @@
160  NO-BREAK SPACE
 $@
 $@
 $@
 $@
 $@@
161  INVERTED EXCLAMATION MARK
  _ @
 (_)@
 | |@
 |_|@
    @@
162  CENT SIGN
     @
  || @
 / _)@
 \\ _)@
  || @@
163  POUND SIGN
    __  @
  _/ _\\ @
 |_ _|_ @
 (_,___|@
        @@
164  CURRENCY SIGN
 /\\_/\\@
 \\ . /@
 / _ \\@
 \\/ \\/@
      @@
165  YEN SIGN
  __ __ @
  \\ V / @
 |__ __|@
 |__ __|@
   |_|  @@
166  BROKEN BAR
  _ @
 | |@
 |_|@
 | |@
 |_|@@
167  SECTION SIGN
    __ @
   / _)@
  /\\ \\ @
  \\ \\/ @
 (__/  @@
168  DIAERESIS
  _  _ @
 (_)(_)@
  $  $ @
  $  $ @
       @@
169  COPYRIGHT SIGN
   ____  @
  / __ \\ @
 / / _| \\@
 \\ \\__| /@
  \\____/ @@
170  FEMININE ORDINAL INDICATOR
  __ _ @
 / _\` |@
 \\__,_|@
 |____|@
       @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
   ____@
  / / /@
 < < < @
  \\_\\_\\@
       @@
172  NOT SIGN
  ____ @
 |__  |@
    |_|@
   $   @
       @@
173  SOFT HYPHEN
     @
  __ @
 |__|@
   $ @
     @@
174  REGISTERED SIGN
   ____  @
  / __ \\ @
 / | -) \\@
 \\ ||\\\\ /@
  \\____/ @@
175  MACRON
  ___ @
 |___|@
   $  @
   $  @
      @@
176  DEGREE SIGN
  _ @
 /.\\@
 \\_/@
  $ @
    @@
177  PLUS-MINUS SIGN
    _   @
  _| |_ @
 |_   _|@
  _|_|_ @
 |_____|@@
178  SUPERSCRIPT TWO
  __ @
 |_ )@
 /__|@
   $ @
     @@
179  SUPERSCRIPT THREE
  ___@
 |_ /@
 |__)@
   $ @
     @@
180  ACUTE ACCENT
  __@
 /_/@
  $ @
  $ @
    @@
181  MICRO SIGN
       @
  _  _ @
 | || |@
 | .,_|@
 |_|   @@
182  PILCROW SIGN
  ____ @
 /    |@
 \\_ | |@
  |_|_|@
       @@
183  MIDDLE DOT
    @
  _ @
 (_)@
  $ @
    @@
184  CEDILLA
    @
    @
    @
  _ @
 )_)@@
185  SUPERSCRIPT ONE
  _ @
 / |@
 |_|@
  $ @
    @@
186  MASCULINE ORDINAL INDICATOR
  ___ @
 / _ \\@
 \\___/@
 |___|@
      @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
 ____  @
 \\ \\ \\ @
  > > >@
 /_/_/ @
       @@
188  VULGAR FRACTION ONE QUARTER
  _  __   @
 / |/ /__ @
 |_/ /_' |@
  /_/  |_|@
          @@
189  VULGAR FRACTION ONE HALF
  _  __  @
 / |/ /_ @
 |_/ /_ )@
  /_//__|@
         @@
190  VULGAR FRACTION THREE QUARTERS
  ___ __   @
 |_ // /__ @
 |__) /_' |@
   /_/  |_|@
           @@
191  INVERTED QUESTION MARK
   _  @
  (_) @
 / /_ @
 \\___|@
      @@
192  LATIN CAPITAL LETTER A WITH GRAVE
  __   @
  \\_\\  @
  /--\\ @
 /_/\\_\\@
       @@
193  LATIN CAPITAL LETTER A WITH ACUTE
    __ @
   /_/ @
  /--\\ @
 /_/\\_\\@
       @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   /\\  @
  |/\\| @
  /--\\ @
 /_/\\_\\@
       @@
195  LATIN CAPITAL LETTER A WITH TILDE
   /\\/|@
  |/\\/ @
  /--\\ @
 /_/\\_\\@
       @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
  _  _ @
 (_)(_)@
  /--\\ @
 /_/\\_\\@
       @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
   __  @
  (()) @
  /--\\ @
 /_/\\_\\@
       @@
198  LATIN CAPITAL LETTER AE
    ____ @
   /, __|@
  / _ _| @
 /_/|___|@
         @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ___ @
  / __|@
 | (__ @
  \\___|@
   )_) @@
200  LATIN CAPITAL LETTER E WITH GRAVE
  __ @
  \\_\\@
 | -<@
 |__<@
     @@
201  LATIN CAPITAL LETTER E WITH ACUTE
   __@
  /_/@
 | -<@
 |__<@
     @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
  /\\ @
 |/\\|@
 | -<@
 |__<@
     @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
  _  _ @
 (_)(_)@
  | -< @
  |__< @
       @@
204  LATIN CAPITAL LETTER I WITH GRAVE
  __  @
  \\_\\ @
 |_ _|@
 |___|@
      @@
205  LATIN CAPITAL LETTER I WITH ACUTE
   __ @
  /_/ @
 |_ _|@
 |___|@
      @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 |_ _|@
 |___|@
      @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
  |_ _| @
  |___| @
        @@
208  LATIN CAPITAL LETTER ETH
   ____  @
  | __ \\ @
 |_ _|) |@
  |____/ @
         @@
209  LATIN CAPITAL LETTER N WITH TILDE
   /\\/|@
  |/\\/ @
 | \\| |@
 |_|\\_|@
       @@
210  LATIN CAPITAL LETTER O WITH GRAVE
  __   @
  \\_\\_ @
 / __ \\@
 \\____/@
       @@
211  LATIN CAPITAL LETTER O WITH ACUTE
    __ @
  _/_/ @
 / __ \\@
 \\____/@
       @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   /\\  @
  |/\\| @
 / __ \\@
 \\____/@
       @@
213  LATIN CAPITAL LETTER O WITH TILDE
   /\\/|@
  |/\\/ @
 / __ \\@
 \\____/@
       @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
  _  _ @
 (_)(_)@
 / __ \\@
 \\____/@
       @@
215  MULTIPLICATION SIGN
     @
 /\\/\\@
 >  <@
 \\/\\/@
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   ____  @
  / _//\\ @
 | (//) |@
  \\//__/ @
         @@
217  LATIN CAPITAL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | |_| |@
  \\___/ @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | |_| |@
  \\___/ @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | |_| |@
  \\___/ @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | |_| |@
  \\___/ @
        @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
   __ @
 _/_/_@
 \\ V /@
  |_| @
      @@
222  LATIN CAPITAL LETTER THORN
  _   @
 | |_ @
 | -_)@
 |_|  @
      @@
223  LATIN SMALL LETTER SHARP S
   ___ @
  / _ \\@
 | |< <@
 | ||_/@
 |_|   @@
224  LATIN SMALL LETTER A WITH GRAVE
  __   @
  \\_\\_ @
 / _\` |@
 \\__,_|@
       @@
225  LATIN SMALL LETTER A WITH ACUTE
    __ @
  _/_/ @
 / _\` |@
 \\__,_|@
       @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
   /\\  @
  |/\\| @
 / _\` |@
 \\__,_|@
       @@
227  LATIN SMALL LETTER A WITH TILDE
   /\\/|@
  |/\\/ @
 / _\` |@
 \\__,_|@
       @@
228  LATIN SMALL LETTER A WITH DIAERESIS
  _  _ @
 (_)(_)@
 / _\` |@
 \\__,_|@
       @@
229  LATIN SMALL LETTER A WITH RING ABOVE
   __  @
  (()) @
 / _\` |@
 \\__,_|@
       @@
230  LATIN SMALL LETTER AE
         @
  __ ___ @
 / _\` -_)@
 \\__,___|@
         @@
231  LATIN SMALL LETTER C WITH CEDILLA
     @
  __ @
 / _|@
 \\__|@
  )_)@@
232  LATIN SMALL LETTER E WITH GRAVE
  __  @
  \\_\\ @
 / -_)@
 \\___|@
      @@
233  LATIN SMALL LETTER E WITH ACUTE
   __ @
  /_/ @
 / -_)@
 \\___|@
      @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 / -_)@
 \\___|@
      @@
235  LATIN SMALL LETTER E WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / -_) @
  \\___| @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
 __ @
 \\_\\@
 | |@
 |_|@
    @@
237  LATIN SMALL LETTER I WITH ACUTE
  __@
 /_/@
 | |@
 |_|@
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
  | | @
  |_| @
      @@
239  LATIN SMALL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
   | |  @
   |_|  @
        @@
240  LATIN SMALL LETTER ETH
  \\\\/\\ @
  \\/\\\\ @
 / _\` |@
 \\___/ @
       @@
241  LATIN SMALL LETTER N WITH TILDE
  /\\/| @
 |/\\/  @
 | ' \\ @
 |_||_|@
       @@
242  LATIN SMALL LETTER O WITH GRAVE
  __  @
  \\_\\ @
 / _ \\@
 \\___/@
      @@
243  LATIN SMALL LETTER O WITH ACUTE
   __ @
  /_/ @
 / _ \\@
 \\___/@
      @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 / _ \\@
 \\___/@
      @@
245  LATIN SMALL LETTER O WITH TILDE
  /\\/|@
 |/\\/ @
 / _ \\@
 \\___/@
      @@
246  LATIN SMALL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
  \\___/ @
        @@
247  DIVISION SIGN
   _  @
  (_) @
 |___|@
  (_) @
      @@
248  LATIN SMALL LETTER O WITH STROKE
      @
  ___ @
 / //\\@
 \\//_/@
      @@
249  LATIN SMALL LETTER U WITH GRAVE
  __   @
  \\_\\_ @
 | || |@
  \\_,_|@
       @@
250  LATIN SMALL LETTER U WITH ACUTE
    __ @
  _/_/ @
 | || |@
  \\_,_|@
       @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   /\\  @
  |/\\| @
 | || |@
  \\_,_|@
       @@
252  LATIN SMALL LETTER U WITH DIAERESIS
  _  _ @
 (_)(_)@
 | || |@
  \\_,_|@
       @@
253  LATIN SMALL LETTER Y WITH ACUTE
    __ @
  _/_/ @
 | || |@
  \\_, |@
  |__/ @@
254  LATIN SMALL LETTER THORN
  _    @
 | |__ @
 | '_ \\@
 | .__/@
 |_|   @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
  _  _ @
 (_)(_)@
 | || |@
  \\_, |@
  |__/ @@
`,Ca=`flf2a$ 6 5 16 15 13 0 24463 229
Standard by Glenn Chappell & Ian Chai 3/93 -- based on Frank's .sig
Includes ISO Latin-1
figlet release 2.1 -- 12 Aug 1994
Modified for figlet 2.2 by John Cowan <cowan@ccil.org>
  to add Latin-{2,3,4,5} support (Unicode U+0100-017F).
Permission is hereby given to modify this font, as long as the
modifier's name is placed on a comment line.

Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter
supported by FIGlet and FIGWin.  May also be slightly modified for better use
of new full-width/kern/smush alternatives, but default output is NOT changed.

Font modified May 20, 2012 by patorjk to add the 0xCA0 character
 $@
 $@
 $@
 $@
 $@
 $@@
  _ @
 | |@
 | |@
 |_|@
 (_)@
    @@
  _ _ @
 ( | )@
  V V @
   $  @
   $  @
      @@
    _  _   @
  _| || |_ @
 |_  ..  _|@
 |_      _|@
   |_||_|  @
           @@
   _  @
  | | @
 / __)@
 \\__ \\@
 (   /@
  |_| @@
  _  __@
 (_)/ /@
   / / @
  / /_ @
 /_/(_)@
       @@
   ___   @
  ( _ )  @
  / _ \\/\\@
 | (_>  <@
  \\___/\\/@
         @@
  _ @
 ( )@
 |/ @
  $ @
  $ @
    @@
   __@
  / /@
 | | @
 | | @
 | | @
  \\_\\@@
 __  @
 \\ \\ @
  | |@
  | |@
  | |@
 /_/ @@
       @
 __/\\__@
 \\    /@
 /_  _\\@
   \\/  @
       @@
        @
    _   @
  _| |_ @
 |_   _|@
   |_|  @
        @@
    @
    @
    @
  _ @
 ( )@
 |/ @@
        @
        @
  _____ @
 |_____|@
    $   @
        @@
    @
    @
    @
  _ @
 (_)@
    @@
     __@
    / /@
   / / @
  / /  @
 /_/   @
       @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
  _ @
 / |@
 | |@
 | |@
 |_|@
    @@
  ____  @
 |___ \\ @
   __) |@
  / __/ @
 |_____|@
        @@
  _____ @
 |___ / @
   |_ \\ @
  ___) |@
 |____/ @
        @@
  _  _   @
 | || |  @
 | || |_ @
 |__   _|@
    |_|  @
         @@
  ____  @
 | ___| @
 |___ \\ @
  ___) |@
 |____/ @
        @@
   __   @
  / /_  @
 | '_ \\ @
 | (_) |@
  \\___/ @
        @@
  _____ @
 |___  |@
    / / @
   / /  @
  /_/   @
        @@
   ___  @
  ( _ ) @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
   ___  @
  / _ \\ @
 | (_) |@
  \\__, |@
    /_/ @
        @@
    @
  _ @
 (_)@
  _ @
 (_)@
    @@
    @
  _ @
 (_)@
  _ @
 ( )@
 |/ @@
   __@
  / /@
 / / @
 \\ \\ @
  \\_\\@
     @@
        @
  _____ @
 |_____|@
 |_____|@
    $   @
        @@
 __  @
 \\ \\ @
  \\ \\@
  / /@
 /_/ @
     @@
  ___ @
 |__ \\@
   / /@
  |_| @
  (_) @
      @@
    ____  @
   / __ \\ @
  / / _\` |@
 | | (_| |@
  \\ \\__,_|@
   \\____/ @@
     _    @
    / \\   @
   / _ \\  @
  / ___ \\ @
 /_/   \\_\\@
          @@
  ____  @
 | __ ) @
 |  _ \\ @
 | |_) |@
 |____/ @
        @@
   ____ @
  / ___|@
 | |    @
 | |___ @
  \\____|@
        @@
  ____  @
 |  _ \\ @
 | | | |@
 | |_| |@
 |____/ @
        @@
  _____ @
 | ____|@
 |  _|  @
 | |___ @
 |_____|@
        @@
  _____ @
 |  ___|@
 | |_   @
 |  _|  @
 |_|    @
        @@
   ____ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
  _   _ @
 | | | |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
  ___ @
 |_ _|@
  | | @
  | | @
 |___|@
      @@
      _ @
     | |@
  _  | |@
 | |_| |@
  \\___/ @
        @@
  _  __@
 | |/ /@
 | ' / @
 | . \\ @
 |_|\\_\\@
       @@
  _     @
 | |    @
 | |    @
 | |___ @
 |_____|@
        @@
  __  __ @
 |  \\/  |@
 | |\\/| |@
 | |  | |@
 |_|  |_|@
         @@
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
  ____  @
 |  _ \\ @
 | |_) |@
 |  __/ @
 |_|    @
        @@
   ___  @
  / _ \\ @
 | | | |@
 | |_| |@
  \\__\\_\\@
        @@
  ____  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
  ____  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
        @@
  _   _ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
        @@
 __     __@
 \\ \\   / /@
  \\ \\ / / @
   \\ V /  @
    \\_/   @
          @@
 __        __@
 \\ \\      / /@
  \\ \\ /\\ / / @
   \\ V  V /  @
    \\_/\\_/   @
             @@
 __  __@
 \\ \\/ /@
  \\  / @
  /  \\ @
 /_/\\_\\@
       @@
 __   __@
 \\ \\ / /@
  \\ V / @
   | |  @
   |_|  @
        @@
  _____@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
  __ @
 | _|@
 | | @
 | | @
 | | @
 |__|@@
 __    @
 \\ \\   @
  \\ \\  @
   \\ \\ @
    \\_\\@
       @@
  __ @
 |_ |@
  | |@
  | |@
  | |@
 |__|@@
  /\\ @
 |/\\|@
   $ @
   $ @
   $ @
     @@
        @
        @
        @
        @
  _____ @
 |_____|@@
  _ @
 ( )@
  \\|@
  $ @
  $ @
    @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
  _     @
 | |__  @
 | '_ \\ @
 | |_) |@
 |_.__/ @
        @@
       @
   ___ @
  / __|@
 | (__ @
  \\___|@
       @@
      _ @
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
       @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
       @@
   __ @
  / _|@
 | |_ @
 |  _|@
 |_|  @
      @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
  _     @
 | |__  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
  _ @
 (_)@
 | |@
 | |@
 |_|@
    @@
    _ @
   (_)@
   | |@
   | |@
  _/ |@
 |__/ @@
  _    @
 | | __@
 | |/ /@
 |   < @
 |_|\\_\\@
       @@
  _ @
 | |@
 | |@
 | |@
 |_|@
    @@
            @
  _ __ ___  @
 | '_ \` _ \\ @
 | | | | | |@
 |_| |_| |_|@
            @@
        @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
        @
   ___  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
        @
  _ __  @
 | '_ \\ @
 | |_) |@
 | .__/ @
 |_|    @@
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
     |_|@@
       @
  _ __ @
 | '__|@
 | |   @
 |_|   @
       @@
      @
  ___ @
 / __|@
 \\__ \\@
 |___/@
      @@
  _   @
 | |_ @
 | __|@
 | |_ @
  \\__|@
      @@
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
        @
 __   __@
 \\ \\ / /@
  \\ V / @
   \\_/  @
        @@
           @
 __      __@
 \\ \\ /\\ / /@
  \\ V  V / @
   \\_/\\_/  @
           @@
       @
 __  __@
 \\ \\/ /@
  >  < @
 /_/\\_\\@
       @@
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
      @
  ____@
 |_  /@
  / / @
 /___|@
      @@
    __@
   / /@
  | | @
 < <  @
  | | @
   \\_\\@@
  _ @
 | |@
 | |@
 | |@
 | |@
 |_|@@
 __   @
 \\ \\  @
  | | @
   > >@
  | | @
 /_/  @@
  /\\/|@
 |/\\/ @
   $  @
   $  @
   $  @
      @@
  _   _ @
 (_)_(_)@
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
  _   _ @
 (_)_(_)@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\___/ @
        @@
  _   _ @
 (_)_(_)@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
  _   _ @
 (_)_(_)@
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
   ___ @
  / _ \\@
 | |/ /@
 | |\\ \\@
 | ||_/@
 |_|   @@
160  NO-BREAK SPACE
 $@
 $@
 $@
 $@
 $@
 $@@
161  INVERTED EXCLAMATION MARK
  _ @
 (_)@
 | |@
 | |@
 |_|@
    @@
162  CENT SIGN
    _  @
   | | @
  / __)@
 | (__ @
  \\   )@
   |_| @@
163  POUND SIGN
    ___  @
   / ,_\\ @
 _| |_   @
  | |___ @
 (_,____|@
         @@
164  CURRENCY SIGN
 /\\___/\\@
 \\  _  /@
 | (_) |@
 / ___ \\@
 \\/   \\/@
        @@
165  YEN SIGN
  __ __ @
  \\ V / @
 |__ __|@
 |__ __|@
   |_|  @
        @@
166  BROKEN BAR
  _ @
 | |@
 |_|@
  _ @
 | |@
 |_|@@
167  SECTION SIGN
    __ @
  _/ _)@
 / \\ \\ @
 \\ \\\\ \\@
  \\ \\_/@
 (__/  @@
168  DIAERESIS
  _   _ @
 (_) (_)@
  $   $ @
  $   $ @
  $   $ @
        @@
169  COPYRIGHT SIGN
    _____   @
   / ___ \\  @
  / / __| \\ @
 | | (__   |@
  \\ \\___| / @
   \\_____/  @@
170  FEMININE ORDINAL INDICATOR
  __ _ @
 / _\` |@
 \\__,_|@
 |____|@
    $  @
       @@
171  LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
   ____@
  / / /@
 / / / @
 \\ \\ \\ @
  \\_\\_\\@
       @@
172  NOT SIGN
        @
  _____ @
 |___  |@
     |_|@
    $   @
        @@
173  SOFT HYPHEN
       @
       @
  ____ @
 |____|@
    $  @
       @@
174  REGISTERED SIGN
    _____   @
   / ___ \\  @
  / | _ \\ \\ @
 |  |   /  |@
  \\ |_|_\\ / @
   \\_____/  @@
175  MACRON
  _____ @
 |_____|@
    $   @
    $   @
    $   @
        @@
176  DEGREE SIGN
   __  @
  /  \\ @
 | () |@
  \\__/ @
    $  @
       @@
177  PLUS-MINUS SIGN
    _   @
  _| |_ @
 |_   _|@
  _|_|_ @
 |_____|@
        @@
178  SUPERSCRIPT TWO
  ___ @
 |_  )@
  / / @
 /___|@
   $  @
      @@
179  SUPERSCRIPT THREE
  ____@
 |__ /@
  |_ \\@
 |___/@
   $  @
      @@
180  ACUTE ACCENT
  __@
 /_/@
  $ @
  $ @
  $ @
    @@
181  MICRO SIGN
        @
  _   _ @
 | | | |@
 | |_| |@
 | ._,_|@
 |_|    @@
182  PILCROW SIGN
   _____ @
  /     |@
 | (| | |@
  \\__ | |@
    |_|_|@
         @@
183  MIDDLE DOT
    @
  _ @
 (_)@
  $ @
  $ @
    @@
184  CEDILLA
    @
    @
    @
    @
  _ @
 )_)@@
185  SUPERSCRIPT ONE
  _ @
 / |@
 | |@
 |_|@
  $ @
    @@
186  MASCULINE ORDINAL INDICATOR
  ___ @
 / _ \\@
 \\___/@
 |___|@
   $  @
      @@
187  RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
 ____  @
 \\ \\ \\ @
  \\ \\ \\@
  / / /@
 /_/_/ @
       @@
188  VULGAR FRACTION ONE QUARTER
  _   __    @
 / | / / _  @
 | |/ / | | @
 |_/ /|_  _|@
  /_/   |_| @
            @@
189  VULGAR FRACTION ONE HALF
  _   __   @
 / | / /__ @
 | |/ /_  )@
 |_/ / / / @
  /_/ /___|@
           @@
190  VULGAR FRACTION THREE QUARTERS
  ____  __    @
 |__ / / / _  @
  |_ \\/ / | | @
 |___/ /|_  _|@
    /_/   |_| @
              @@
191  INVERTED QUESTION MARK
   _  @
  (_) @
  | | @
 / /_ @
 \\___|@
      @@
192  LATIN CAPITAL LETTER A WITH GRAVE
   __   @
   \\_\\  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
193  LATIN CAPITAL LETTER A WITH ACUTE
    __  @
   /_/  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
194  LATIN CAPITAL LETTER A WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
195  LATIN CAPITAL LETTER A WITH TILDE
   /\\/| @
  |/\\/  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
196  LATIN CAPITAL LETTER A WITH DIAERESIS
  _   _ @
 (_)_(_)@
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
197  LATIN CAPITAL LETTER A WITH RING ABOVE
    _   @
   (o)  @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
198  LATIN CAPITAL LETTER AE
     ______ @
    /  ____|@
   / _  _|  @
  / __ |___ @
 /_/ |_____|@
            @@
199  LATIN CAPITAL LETTER C WITH CEDILLA
   ____ @
  / ___|@
 | |    @
 | |___ @
  \\____|@
    )_) @@
200  LATIN CAPITAL LETTER E WITH GRAVE
   __   @
  _\\_\\_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
201  LATIN CAPITAL LETTER E WITH ACUTE
    __  @
  _/_/_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
202  LATIN CAPITAL LETTER E WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
 | ____|@
 |  _|_ @
 |_____|@
        @@
203  LATIN CAPITAL LETTER E WITH DIAERESIS
  _   _ @
 (_)_(_)@
 | ____|@
 |  _|_ @
 |_____|@
        @@
204  LATIN CAPITAL LETTER I WITH GRAVE
  __  @
  \\_\\ @
 |_ _|@
  | | @
 |___|@
      @@
205  LATIN CAPITAL LETTER I WITH ACUTE
   __ @
  /_/ @
 |_ _|@
  | | @
 |___|@
      @@
206  LATIN CAPITAL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
 |_ _|@
  | | @
 |___|@
      @@
207  LATIN CAPITAL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
  |_ _| @
   | |  @
  |___| @
        @@
208  LATIN CAPITAL LETTER ETH
    ____  @
   |  _ \\ @
  _| |_| |@
 |__ __| |@
   |____/ @
          @@
209  LATIN CAPITAL LETTER N WITH TILDE
   /\\/|@
  |/\\/ @
 | \\| |@
 | .\` |@
 |_|\\_|@
       @@
210  LATIN CAPITAL LETTER O WITH GRAVE
   __   @
   \\_\\  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
211  LATIN CAPITAL LETTER O WITH ACUTE
    __  @
   /_/  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
212  LATIN CAPITAL LETTER O WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
213  LATIN CAPITAL LETTER O WITH TILDE
   /\\/| @
  |/\\/  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
214  LATIN CAPITAL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
215  MULTIPLICATION SIGN
     @
     @
 /\\/\\@
 >  <@
 \\/\\/@
     @@
216  LATIN CAPITAL LETTER O WITH STROKE
   ____ @
  / _// @
 | |// |@
 | //| |@
  //__/ @
        @@
217  LATIN CAPITAL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
218  LATIN CAPITAL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
219  LATIN CAPITAL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | | | |@
 | |_| |@
  \\___/ @
        @@
220  LATIN CAPITAL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\___/ @
        @@
221  LATIN CAPITAL LETTER Y WITH ACUTE
    __  @
 __/_/__@
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
222  LATIN CAPITAL LETTER THORN
  _     @
 | |___ @
 |  __ \\@
 |  ___/@
 |_|    @
        @@
223  LATIN SMALL LETTER SHARP S
   ___ @
  / _ \\@
 | |/ /@
 | |\\ \\@
 | ||_/@
 |_|   @@
224  LATIN SMALL LETTER A WITH GRAVE
   __   @
   \\_\\_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
225  LATIN SMALL LETTER A WITH ACUTE
    __  @
   /_/_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
226  LATIN SMALL LETTER A WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
227  LATIN SMALL LETTER A WITH TILDE
   /\\/| @
  |/\\/_ @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
228  LATIN SMALL LETTER A WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
229  LATIN SMALL LETTER A WITH RING ABOVE
    __  @
   (()) @
  / _ '|@
 | (_| |@
  \\__,_|@
        @@
230  LATIN SMALL LETTER AE
           @
   __ ____ @
  / _\`  _ \\@
 | (_|  __/@
  \\__,____|@
           @@
231  LATIN SMALL LETTER C WITH CEDILLA
       @
   ___ @
  / __|@
 | (__ @
  \\___|@
   )_) @@
232  LATIN SMALL LETTER E WITH GRAVE
   __  @
   \\_\\ @
  / _ \\@
 |  __/@
  \\___|@
       @@
233  LATIN SMALL LETTER E WITH ACUTE
    __ @
   /_/ @
  / _ \\@
 |  __/@
  \\___|@
       @@
234  LATIN SMALL LETTER E WITH CIRCUMFLEX
   //\\ @
  |/_\\|@
  / _ \\@
 |  __/@
  \\___|@
       @@
235  LATIN SMALL LETTER E WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 |  __/ @
  \\___| @
        @@
236  LATIN SMALL LETTER I WITH GRAVE
 __ @
 \\_\\@
 | |@
 | |@
 |_|@
    @@
237  LATIN SMALL LETTER I WITH ACUTE
  __@
 /_/@
 | |@
 | |@
 |_|@
    @@
238  LATIN SMALL LETTER I WITH CIRCUMFLEX
  //\\ @
 |/_\\|@
  | | @
  | | @
  |_| @
      @@
239  LATIN SMALL LETTER I WITH DIAERESIS
  _   _ @
 (_)_(_)@
   | |  @
   | |  @
   |_|  @
        @@
240  LATIN SMALL LETTER ETH
   /\\/\\ @
   >  < @
  _\\/\\ |@
 / __\` |@
 \\____/ @
        @@
241  LATIN SMALL LETTER N WITH TILDE
   /\\/| @
  |/\\/  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
242  LATIN SMALL LETTER O WITH GRAVE
   __   @
   \\_\\  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
243  LATIN SMALL LETTER O WITH ACUTE
    __  @
   /_/  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
244  LATIN SMALL LETTER O WITH CIRCUMFLEX
   //\\  @
  |/_\\| @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
245  LATIN SMALL LETTER O WITH TILDE
   /\\/| @
  |/\\/  @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
246  LATIN SMALL LETTER O WITH DIAERESIS
  _   _ @
 (_)_(_)@
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
247  DIVISION SIGN
        @
    _   @
  _(_)_ @
 |_____|@
   (_)  @
        @@
248  LATIN SMALL LETTER O WITH STROKE
         @
   ____  @
  / _//\\ @
 | (//) |@
  \\//__/ @
         @@
249  LATIN SMALL LETTER U WITH GRAVE
   __   @
  _\\_\\_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
250  LATIN SMALL LETTER U WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
251  LATIN SMALL LETTER U WITH CIRCUMFLEX
   //\\  @
  |/ \\| @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
252  LATIN SMALL LETTER U WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
253  LATIN SMALL LETTER Y WITH ACUTE
    __  @
  _/_/_ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
254  LATIN SMALL LETTER THORN
  _     @
 | |__  @
 | '_ \\ @
 | |_) |@
 | .__/ @
 |_|    @@
255  LATIN SMALL LETTER Y WITH DIAERESIS
  _   _ @
 (_) (_)@
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
0x0100  LATIN CAPITAL LETTER A WITH MACRON
   ____ @
  /___/ @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
0x0101  LATIN SMALL LETTER A WITH MACRON
    ___ @
   /_ _/@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0102  LATIN CAPITAL LETTER A WITH BREVE
  _   _ @
  \\\\_// @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
        @@
0x0103  LATIN SMALL LETTER A WITH BREVE
   \\_/  @
   ___  @
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0104  LATIN CAPITAL LETTER A WITH OGONEK
        @
    _   @
   /_\\  @
  / _ \\ @
 /_/ \\_\\@
     (_(@@
0x0105  LATIN SMALL LETTER A WITH OGONEK
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__,_|@
     (_(@@
0x0106  LATIN CAPITAL LETTER C WITH ACUTE
     __ @
   _/_/ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x0107  LATIN SMALL LETTER C WITH ACUTE
    __ @
   /__/@
  / __|@
 | (__ @
  \\___|@
       @@
0x0108  LATIN CAPITAL LETTER C WITH CIRCUMFLEX
     /\\ @
   _//\\\\@
  / ___|@
 | |___ @
  \\____|@
        @@
0x0109  LATIN SMALL LETTER C WITH CIRCUMFLEX
    /\\ @
   /_\\ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010A  LATIN CAPITAL LETTER C WITH DOT ABOVE
    []  @
   ____ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x010B  LATIN SMALL LETTER C WITH DOT ABOVE
   []  @
   ___ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010C  LATIN CAPITAL LETTER C WITH CARON
   \\\\// @
   _\\/_ @
  / ___|@
 | |___ @
  \\____|@
        @@
0x010D  LATIN SMALL LETTER C WITH CARON
   \\\\//@
   _\\/ @
  / __|@
 | (__ @
  \\___|@
       @@
0x010E  LATIN CAPITAL LETTER D WITH CARON
   \\\\// @
  __\\/  @
 |  _ \\ @
 | |_| |@
 |____/ @
        @@
0x010F  LATIN SMALL LETTER D WITH CARON
  \\/  _ @
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0110  LATIN CAPITAL LETTER D WITH STROKE
   ____   @
  |_ __ \\ @
 /| |/ | |@
 /|_|/_| |@
  |_____/ @
          @@
0x0111  LATIN SMALL LETTER D WITH STROKE
    ---|@
   __| |@
  / _\` |@
 | (_| |@
  \\__,_|@
        @@
0x0112  LATIN CAPITAL LETTER E WITH MACRON
   ____ @
  /___/ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0113  LATIN SMALL LETTER E WITH MACRON
    ____@
   /_ _/@
  / _ \\ @
 |  __/ @
  \\___| @
        @@
0x0114  LATIN CAPITAL LETTER E WITH BREVE
  _   _ @
  \\\\_// @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0115  LATIN SMALL LETTER E WITH BREVE
  \\\\  //@
    --  @
  / _ \\ @
 |  __/ @
  \\___| @
        @@
0x0116  LATIN CAPITAL LETTER E WITH DOT ABOVE
    []  @
  _____ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x0117  LATIN SMALL LETTER E WITH DOT ABOVE
    [] @
    __ @
  / _ \\@
 |  __/@
  \\___|@
       @@
0x0118  LATIN CAPITAL LETTER E WITH OGONEK
        @
  _____ @
 | ____|@
 |  _|_ @
 |_____|@
    (__(@@
0x0119  LATIN SMALL LETTER E WITH OGONEK
       @
   ___ @
  / _ \\@
 |  __/@
  \\___|@
    (_(@@
0x011A  LATIN CAPITAL LETTER E WITH CARON
   \\\\// @
  __\\/_ @
 | ____|@
 |  _|_ @
 |_____|@
        @@
0x011B  LATIN SMALL LETTER E WITH CARON
   \\\\//@
    \\/ @
  / _ \\@
 |  __/@
  \\___|@
       @@
0x011C  LATIN CAPITAL LETTER G WITH CIRCUMFLEX
   _/\\_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x011D  LATIN SMALL LETTER G WITH CIRCUMFLEX
     /\\ @
   _/_ \\@
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x011E  LATIN CAPITAL LETTER G WITH BREVE
   _\\/_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x011F  LATIN SMALL LETTER G WITH BREVE
  \\___/ @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x0120  LATIN CAPITAL LETTER G WITH DOT ABOVE
   _[]_ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
        @@
0x0121  LATIN SMALL LETTER G WITH DOT ABOVE
   []   @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |___/ @@
0x0122  LATIN CAPITAL LETTER G WITH CEDILLA
   ____ @
  / ___|@
 | |  _ @
 | |_| |@
  \\____|@
   )__) @@
0x0123  LATIN SMALL LETTER G WITH CEDILLA
        @
   __ _ @
  / _\` |@
 | (_| |@
  \\__, |@
  |_))))@@
0x0124  LATIN CAPITAL LETTER H WITH CIRCUMFLEX
  _/ \\_ @
 | / \\ |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
0x0125  LATIN SMALL LETTER H WITH CIRCUMFLEX
  _  /\\ @
 | |//\\ @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0126  LATIN CAPITAL LETTER H WITH STROKE
  _   _ @
 | |=| |@
 | |_| |@
 |  _  |@
 |_| |_|@
        @@
0x0127  LATIN SMALL LETTER H WITH STROKE
  _     @
 |=|__  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0128  LATIN CAPITAL LETTER I WITH TILDE
  /\\//@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x0129  LATIN SMALL LETTER I WITH TILDE
    @
 /\\/@
 | |@
 | |@
 |_|@
    @@
0x012A  LATIN CAPITAL LETTER I WITH MACRON
 /___/@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x012B  LATIN SMALL LETTER I WITH MACRON
  ____@
 /___/@
  | | @
  | | @
  |_| @
      @@
0x012C  LATIN CAPITAL LETTER I WITH BREVE
  \\__/@
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x012D  LATIN SMALL LETTER I WITH BREVE
    @
 \\_/@
 | |@
 | |@
 |_|@
    @@
0x012E  LATIN CAPITAL LETTER I WITH OGONEK
  ___ @
 |_ _|@
  | | @
  | | @
 |___|@
  (__(@@
0x012F  LATIN SMALL LETTER I WITH OGONEK
  _  @
 (_) @
 | | @
 | | @
 |_|_@
  (_(@@
0x0130  LATIN CAPITAL LETTER I WITH DOT ABOVE
  _[] @
 |_ _|@
  | | @
  | | @
 |___|@
      @@
0x0131  LATIN SMALL LETTER DOTLESS I
    @
  _ @
 | |@
 | |@
 |_|@
    @@
0x0132  LATIN CAPITAL LIGATURE IJ
  ___  _ @
 |_ _|| |@
  | | | |@
  | |_| |@
 |__|__/ @
         @@
0x0133  LATIN SMALL LIGATURE IJ
  _   _ @
 (_) (_)@
 | | | |@
 | | | |@
 |_|_/ |@
   |__/ @@
0x0134  LATIN CAPITAL LETTER J WITH CIRCUMFLEX
      /\\ @
     /_\\|@
  _  | | @
 | |_| | @
  \\___/  @
         @@
0x0135  LATIN SMALL LETTER J WITH CIRCUMFLEX
    /\\@
   /_\\@
   | |@
   | |@
  _/ |@
 |__/ @@
0x0136  LATIN CAPITAL LETTER K WITH CEDILLA
  _  _  @
 | |/ / @
 | ' /  @
 | . \\  @
 |_|\\_\\ @
    )__)@@
0x0137  LATIN SMALL LETTER K WITH CEDILLA
  _    @
 | | __@
 | |/ /@
 |   < @
 |_|\\_\\@
    )_)@@
0x0138  LATIN SMALL LETTER KRA
       @
  _ __ @
 | |/ \\@
 |   < @
 |_|\\_\\@
       @@
0x0139  LATIN CAPITAL LETTER L WITH ACUTE
  _   //@
 | | // @
 | |    @
 | |___ @
 |_____|@
        @@
0x013A  LATIN SMALL LETTER L WITH ACUTE
  //@
 | |@
 | |@
 | |@
 |_|@
    @@
0x013B  LATIN CAPITAL LETTER L WITH CEDILLA
  _     @
 | |    @
 | |    @
 | |___ @
 |_____|@
    )__)@@
0x013C  LATIN SMALL LETTER L WITH CEDILLA
  _   @
 | |  @
 | |  @
 | |  @
 |_|  @
   )_)@@
0x013D  LATIN CAPITAL LETTER L WITH CARON
  _ \\\\//@
 | | \\/ @
 | |    @
 | |___ @
 |_____|@
        @@
0x013E  LATIN SMALL LETTER L WITH CARON
  _ \\\\//@
 | | \\/ @
 | |    @
 | |    @
 |_|    @
        @@
0x013F  LATIN CAPITAL LETTER L WITH MIDDLE DOT
  _     @
 | |    @
 | | [] @
 | |___ @
 |_____|@
        @@
0x0140  LATIN SMALL LETTER L WITH MIDDLE DOT
  _    @
 | |   @
 | | []@
 | |   @
 |_|   @
       @@
0x0141  LATIN CAPITAL LETTER L WITH STROKE
  __    @
 | //   @
 |//|   @
 // |__ @
 |_____|@
        @@
0x0142  LATIN SMALL LETTER L WITH STROKE
  _ @
 | |@
 |//@
 //|@
 |_|@
    @@
0x0143  LATIN CAPITAL LETTER N WITH ACUTE
  _/ /_ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
0x0144  LATIN SMALL LETTER N WITH ACUTE
     _  @
  _ /_/ @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0145  LATIN CAPITAL LETTER N WITH CEDILLA
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
 )_)    @@
0x0146  LATIN SMALL LETTER N WITH CEDILLA
        @
  _ __  @
 | '_ \\ @
 | | | |@
 |_| |_|@
 )_)    @@
0x0147  LATIN CAPITAL LETTER N WITH CARON
  _\\/ _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\_|@
        @@
0x0148  LATIN SMALL LETTER N WITH CARON
  \\\\//  @
  _\\/_  @
 | '_ \\ @
 | | | |@
 |_| |_|@
        @@
0x0149  LATIN SMALL LETTER N PRECEDED BY APOSTROPHE
          @
  _  __   @
 ( )| '_\\ @
 |/| | | |@
   |_| |_|@
          @@
0x014A  LATIN CAPITAL LETTER ENG
  _   _ @
 | \\ | |@
 |  \\| |@
 | |\\  |@
 |_| \\ |@
     )_)@@
0x014B  LATIN SMALL LETTER ENG
  _ __  @
 | '_ \\ @
 | | | |@
 |_| | |@
     | |@
    |__ @@
0x014C  LATIN CAPITAL LETTER O WITH MACRON
   ____ @
  /_ _/ @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
0x014D  LATIN SMALL LETTER O WITH MACRON
   ____ @
  /_ _/ @
  / _ \\ @
 | (_) |@
  \\___/ @
        @@
0x014E  LATIN CAPITAL LETTER O WITH BREVE
  \\   / @
   _-_  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x014F  LATIN SMALL LETTER O WITH BREVE
  \\   / @
   _-_  @
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0150  LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
    ___ @
   /_/_/@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0151  LATIN SMALL LETTER O WITH DOUBLE ACUTE
    ___ @
   /_/_/@
  / _ \\ @
 | |_| |@
  \\___/ @
        @@
0x0152  LATIN CAPITAL LIGATURE OE
   ___  ___ @
  / _ \\| __|@
 | | | |  | @
 | |_| | |__@
  \\___/|____@
            @@
0x0153  LATIN SMALL LIGATURE OE
             @
   ___   ___ @
  / _ \\ / _ \\@
 | (_) |  __/@
  \\___/ \\___|@
             @@
0x0154  LATIN CAPITAL LETTER R WITH ACUTE
  _/_/  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
0x0155  LATIN SMALL LETTER R WITH ACUTE
     __@
  _ /_/@
 | '__|@
 | |   @
 |_|   @
       @@
0x0156  LATIN CAPITAL LETTER R WITH CEDILLA
  ____  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
 )_)    @@
0x0157  LATIN SMALL LETTER R WITH CEDILLA
       @
  _ __ @
 | '__|@
 | |   @
 |_|   @
   )_) @@
0x0158  LATIN CAPITAL LETTER R WITH CARON
  _\\_/  @
 |  _ \\ @
 | |_) |@
 |  _ < @
 |_| \\_\\@
        @@
0x0159  LATIN SMALL LETTER R WITH CARON
  \\\\// @
  _\\/_ @
 | '__|@
 | |   @
 |_|   @
       @@
0x015A  LATIN CAPITAL LETTER S WITH ACUTE
  _/_/  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x015B  LATIN SMALL LETTER S WITH ACUTE
    __@
  _/_/@
 / __|@
 \\__ \\@
 |___/@
      @@
0x015C  LATIN CAPITAL LETTER S WITH CIRCUMFLEX
  _/\\_  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x015D  LATIN SMALL LETTER S WITH CIRCUMFLEX
      @
  /_\\_@
 / __|@
 \\__ \\@
 |___/@
      @@
0x015E  LATIN CAPITAL LETTER S WITH CEDILLA
  ____  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
    )__)@@
0x015F  LATIN SMALL LETTER S WITH CEDILLA
      @
  ___ @
 / __|@
 \\__ \\@
 |___/@
   )_)@@
0x0160  LATIN CAPITAL LETTER S WITH CARON
  _\\_/  @
 / ___| @
 \\___ \\ @
  ___) |@
 |____/ @
        @@
0x0161  LATIN SMALL LETTER S WITH CARON
  \\\\//@
  _\\/ @
 / __|@
 \\__ \\@
 |___/@
      @@
0x0162  LATIN CAPITAL LETTER T WITH CEDILLA
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
    )__)@@
0x0163  LATIN SMALL LETTER T WITH CEDILLA
  _   @
 | |_ @
 | __|@
 | |_ @
  \\__|@
   )_)@@
0x0164  LATIN CAPITAL LETTER T WITH CARON
  _____ @
 |_   _|@
   | |  @
   | |  @
   |_|  @
        @@
0x0165  LATIN SMALL LETTER T WITH CARON
  \\/  @
 | |_ @
 | __|@
 | |_ @
  \\__|@
      @@
0x0166  LATIN CAPITAL LETTER T WITH STROKE
  _____ @
 |_   _|@
   | |  @
  -|-|- @
   |_|  @
        @@
0x0167  LATIN SMALL LETTER T WITH STROKE
  _   @
 | |_ @
 | __|@
 |-|_ @
  \\__|@
      @@
0x0168  LATIN CAPITAL LETTER U WITH TILDE
        @
  _/\\/_ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x0169  LATIN SMALL LETTER U WITH TILDE
        @
  _/\\/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016A  LATIN CAPITAL LETTER U WITH MACRON
   ____ @
  /__ _/@
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x016B  LATIN SMALL LETTER U WITH MACRON
   ____ @
  / _  /@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016C  LATIN CAPITAL LETTER U WITH BREVE
        @
   \\_/_ @
 | | | |@
 | |_| |@
  \\____|@
        @@
0x016D  LATIN SMALL LETTER U WITH BREVE
        @
   \\_/_ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x016E  LATIN CAPITAL LETTER U WITH RING ABOVE
    O   @
  __  _ @
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x016F  LATIN SMALL LETTER U WITH RING ABOVE
    O   @
  __ __ @
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x0170  LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
   -- --@
  /_//_/@
 | | | |@
 | |_| |@
  \\___/ @
        @@
0x0171  LATIN SMALL LETTER U WITH DOUBLE ACUTE
    ____@
  _/_/_/@
 | | | |@
 | |_| |@
  \\__,_|@
        @@
0x0172  LATIN CAPITAL LETTER U WITH OGONEK
  _   _ @
 | | | |@
 | | | |@
 | |_| |@
  \\___/ @
    (__(@@
0x0173  LATIN SMALL LETTER U WITH OGONEK
        @
  _   _ @
 | | | |@
 | |_| |@
  \\__,_|@
     (_(@@
0x0174  LATIN CAPITAL LETTER W WITH CIRCUMFLEX
 __    /\\  __@
 \\ \\  //\\\\/ /@
  \\ \\ /\\ / / @
   \\ V  V /  @
    \\_/\\_/   @
             @@
0x0175  LATIN SMALL LETTER W WITH CIRCUMFLEX
      /\\   @
 __  //\\\\__@
 \\ \\ /\\ / /@
  \\ V  V / @
   \\_/\\_/  @
           @@
0x0176  LATIN CAPITAL LETTER Y WITH CIRCUMFLEX
    /\\  @
 __//\\\\ @
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
0x0177  LATIN SMALL LETTER Y WITH CIRCUMFLEX
    /\\  @
   //\\\\ @
 | | | |@
 | |_| |@
  \\__, |@
  |___/ @@
0x0178  LATIN CAPITAL LETTER Y WITH DIAERESIS
  []  []@
 __    _@
 \\ \\ / /@
  \\ V / @
   |_|  @
        @@
0x0179  LATIN CAPITAL LETTER Z WITH ACUTE
  __/_/@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017A  LATIN SMALL LETTER Z WITH ACUTE
    _ @
  _/_/@
 |_  /@
  / / @
 /___|@
      @@
0x017B  LATIN CAPITAL LETTER Z WITH DOT ABOVE
  __[]_@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017C  LATIN SMALL LETTER Z WITH DOT ABOVE
   [] @
  ____@
 |_  /@
  / / @
 /___|@
      @@
0x017D  LATIN CAPITAL LETTER Z WITH CARON
  _\\_/_@
 |__  /@
   / / @
  / /_ @
 /____|@
       @@
0x017E  LATIN SMALL LETTER Z WITH CARON
  \\\\//@
  _\\/_@
 |_  /@
  / / @
 /___|@
      @@
0x017F  LATIN SMALL LETTER LONG S
     __ @
    / _|@
 |-| |  @
 |-| |  @
   |_|  @
        @@
0x02C7  CARON
 \\\\//@
  \\/ @
    $@
    $@
    $@
    $@@
0x02D8  BREVE
 \\\\_//@
  \\_/ @
     $@
     $@
     $@
     $@@
0x02D9  DOT ABOVE
 []@
  $@
  $@
  $@
  $@
  $@@
0x02DB  OGONEK
    $@
    $@
    $@
    $@
    $@
 )_) @@
0x02DD  DOUBLE ACUTE ACCENT
  _ _ @
 /_/_/@
     $@
     $@
     $@
     $@@
0xCA0  KANNADA LETTER TTHA
   _____)@
  /_ ___/@
  / _ \\  @
 | (_) | @
 $\\___/$ @
         @@
         `;Rt.parseFont("Standard",Ca);Rt.parseFont("Slant",wa);Rt.parseFont("Banner",ba);Rt.parseFont("Small",Sa);const va={name:"figlet",description:"Convert text to ASCII art",execute:(o,e)=>{const t=new B(o);if(t.hasFlag("help"))return{output:`Usage: figlet [options] <text>

Convert text into ASCII art banners using various fonts.

Options:
  -f <font>    Specify font (standard, slant, banner, small)
  -c           Center the output
  -l           Left-align the output (default)
  -r           Right-align the output
  --help       Display this help message

Examples:
  figlet "Hello"              Show "Hello" in ASCII art
  figlet -f banner "World"    Use banner font
  figlet -c "Centered"        Center the output
  echo "Hello" | figlet       Use piped input

Available fonts:
  standard   - Default font (recommended)
  slant      - Slanted/italicized style
  banner     - Large banner style
  small      - Compact font`};let n;if(e)n=e.trim();else if(t.positionalCount>0)n=t.getAllPositionals().join(" ");else return{output:`figlet: missing text argument
Try 'figlet --help' for more information.`,error:!0};const r=t.getFlag("f"),i=typeof r=="string"?r:"Standard",s=i.charAt(0).toUpperCase()+i.slice(1).toLowerCase();let l="default";t.hasFlag("c")?l="full":t.hasFlag("r")&&(l="fitted");try{return{output:Rt.textSync(n,{font:s,horizontalLayout:l})}}catch(a){return a instanceof Error?a.message.includes("font")||a.message.includes("Font")||a.message.includes("FIGlet")?{output:`figlet: font '${s}' not found or invalid
Available fonts: standard, slant, banner, small`,error:!0}:{output:`figlet: ${a.message}`,error:!0}:{output:"figlet: unknown error occurred",error:!0}}}};function Ra(){const o=window.innerWidth,e=window.innerHeight,t=document.querySelector("header"),n=t?t.getBoundingClientRect().height:60,r=Math.max(400,Math.floor(o*.95)),i=Math.max(300,Math.floor(e-n));return{width:r,height:i}}function xa(o){return{name:"life",description:"Conway's Game of Life cellular automaton",execute:(e,t)=>{const n=new B(e);if(n.hasFlag("help"))return{output:`Usage: life [options]

Display Conway's Game of Life - a cellular automaton simulation.
Cells evolve following simple rules: survive with 2-3 neighbors,
birth with exactly 3 neighbors, otherwise die.

Options:
  --speed <number>    Generations per second (0.5-10, default: 2)
                      Controls how fast the simulation evolves
  --density <number>  Initial cell density 0.0-1.0 (default: 0.3)
                      Higher values create denser starting patterns
  --pattern <name>    Start pattern: random, acorn, glider, blinker
                      (default: random)
                      - acorn: Evolves for 5000+ generations
                      - glider: Classic spaceship that moves
                      - blinker: Simple oscillator
  --theme <name>      Override current theme (green, yellow, white,
                      light-blue, paper, dc, custom)
  --help              Display this help message

Examples:
  life                    # Random pattern, default speed
  life --speed 5          # Fast evolution (5 gen/sec)
  life --pattern acorn    # Classic acorn pattern
  life --density 0.5      # Dense initial population

Note: Animation continues until you scroll, type, or run 'clear'`};let r=2;const i=n.getFlag("speed");if(i!==void 0){const M=parseFloat(String(i));if(isNaN(M)||M<.5||M>10)return{output:`life: invalid speed '${i}'
Speed must be between 0.5 and 10.0`,error:!0};r=M}let s=.3;const l=n.getFlag("density");if(l!==void 0){const M=parseFloat(String(l));if(isNaN(M)||M<0||M>1)return{output:`life: invalid density '${l}'
Density must be between 0.0 and 1.0`,error:!0};s=M}const a=n.getFlag("pattern");let d="random";if(a!==void 0){const M=String(a),O=["random","acorn","glider","blinker"];if(!O.includes(M))return{output:`life: invalid pattern '${M}'
Valid patterns: ${O.join(", ")}`,error:!0};d=M}const _=n.getFlag("theme");let $=o.getCurrentColors();if(_!==void 0){const M=String(_),O=["green","yellow","white","light-blue","paper","dc","custom"];if(!O.includes(M))return{output:`life: invalid theme '${M}'
Valid themes: ${O.join(", ")}`,error:!0};if(M!=="custom"){const F=o.getPreset(M);F&&($=F.colors)}}const{width:g,height:E}=Ra(),y=Math.floor(E*.8),D=$["--terminal-accent"],b=$["--terminal-dim"];return{output:`
<div class="life-container" style="background-color: ${$["--terminal-bg"]}; min-height: ${y}px;">
  <canvas id="life-canvas" class="life-grid"
          width="${g}"
          height="${E}"
          data-speed="${r}"
          data-density="${s}"
          data-pattern="${d}"
          data-accent-color="${D}"
          data-dim-color="${b}"
          style="width: 100%; height: ${y}px; display: block;">
  </canvas>
</div>
`,html:!0}}}}const Dr=["#ff6b35","#ff8c42","#ffaa4f","#ffc85c","#e6e669","#c4e676","#9fe683","#7ae690","#5ad69d","#3ac6aa","#1bb6b7","#00a6c4","#0096d1","#0086de"];function Mn(o,e,t,n){const r=o/t+e*n;return Dr[Math.floor(Math.abs(r))%Dr.length]}function Na(o){return/<(div|span|pre)\s+(class|style)=/i.test(o)}function ka(o,e,t){return o.split(`
`).map((n,r)=>{let i=0;return[...n].map(s=>s===" "||s==="	"?s:`<span style="color: ${Mn(i++,r,e,t)}">${De(s)}</span>`).join("")}).join(`
`)}function Oa(o,e,t){let n=0,r=0,i="",s=!1,l=!1,a="";for(const d of o)if(d==="<")s=!0,i+=d;else if(d===">")s=!1,i+=d;else if(s)i+=d;else if(d==="&")l=!0,a=d;else if(l){if(a+=d,d===";"){l=!1;const _=Mn(r++,n,e,t);i+=`<span style="color: ${_}">${a}</span>`,a=""}}else if(d===`
`)i+=d,n++,r=0;else if(d===" "||d==="	")i+=d;else{const _=Mn(r++,n,e,t);i+=`<span style="color: ${_}">${d}</span>`}return i}const Ma={name:"lolcat",description:"Rainbow-colorize text output",execute:(o,e)=>{const t=new B(o);if(t.hasFlag("help"))return{output:`Usage: lolcat [options] [text...]

Rainbow-colorize text output with cycling spectrum colors.

Options:
  --spread <1-10>     Color spread (lower = faster cycling). Default: 3
  --freq <0.1-2.0>    Vertical frequency between lines. Default: 0.3
  --help              Display this help message

Examples:
  lolcat "Hello World"           Colorize text argument
  echo "Rainbow" | lolcat        Colorize piped input
  figlet "Hi" | lolcat           Colorize ASCII art
  lolcat --spread 1 "Fast!"      Faster color cycling
  lolcat --freq 1.0 "Lines"      More variation between lines`};const n=t.getFlag("spread");let r=3;if(typeof n=="string"){const a=parseFloat(n);if(isNaN(a)||a<1||a>10)return{output:`lolcat: invalid spread '${n}'
Spread must be between 1 and 10.`,error:!0};r=a}const i=t.getFlag("freq");let s=.3;if(typeof i=="string"){const a=parseFloat(i);if(isNaN(a)||a<.1||a>2)return{output:`lolcat: invalid freq '${i}'
Frequency must be between 0.1 and 2.0.`,error:!0};s=a}let l;if(e)l=e;else if(t.positionalCount>0)l=t.getAllPositionals().join(" ");else return{output:`lolcat: missing text input
Try 'lolcat --help' for more information.`,error:!0};return Na(l)?{output:Oa(l,r,s),html:!0}:{output:`<pre class="lolcat-output">${ka(l,r,s)}</pre>`,html:!0}}},Da=3600;function Pa(o){return{name:"make",description:"Build targets from a Makefile",execute:(e,t)=>{if(new B(e).hasFlag("help"))return{output:`Usage: make [target...]

Description:
  Build targets specified in the Makefile. If no target is specified,
  the default target is used.

Options:
  --help               Show this help message

Examples:
  make                 # Build default target
  make coffee          # Build the coffee target
  make me a sandwich   # Try it and see`};const r=e.join(" ");if(r==="me a sandwich")return{output:"What? Make it yourself."};if(r==="coffee"){const i=[{text:"Grinding beans...",delay:0},{text:"Compiling bean.c...",delay:400},{text:"Linking libcaffeine.so...",delay:800}],s=1200,l=s+2200,a='<div class="make-container">'+i.map(d=>`<div class="make-line" style="animation-delay: ${d.delay}ms;">${d.text}</div>`).join("")+`<div class="make-line" style="animation-delay: ${s}ms;">Brewing dark roast <span class="make-progress-track"><span class="make-progress-bar" style="animation-delay: ${s}ms;"></span></span> 100%</div><div class="make-line" style="animation-delay: ${l}ms;">make: Ready. Careful, it's hot.</div></div>`;return o.setInputLineVisible(!1),setTimeout(()=>{o.setInputLineVisible(!0),o.focus(!0)},Da),{output:a,html:!0}}return e.length===0?{output:"make: *** No targets specified. Stop.",error:!0}:{output:`make: *** No rule to make target '${e[0]}'. Stop.`,error:!0}}}}const Dn="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";function Fa(){const o=document.getElementById("terminal-output");if(!o)return{cols:80,rows:24};const e=o.getBoundingClientRect(),t=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--terminal-font-size")||"16"),n=t*.6,r=t*1.5,i=Math.floor(e.width/n),s=Math.floor(e.height/r);return{cols:Math.max(i,20),rows:Math.max(s,10)}}function Ha(){return Dn[Math.floor(Math.random()*Dn.length)]}function Ua(o){return{name:"matrix",description:"Display Matrix digital rain animation",execute:(e,t)=>{const n=new B(e);if(n.hasFlag("help"))return{output:`Usage: matrix [options]

Display the iconic Matrix-style "digital rain" animation in your terminal.
The animation auto-detects terminal dimensions and matches your current theme.

Options:
  --speed <number>    Animation speed multiplier (0.1-5.0, default: 1.0)
                      Lower is slower, higher is faster
  --theme <name>      Override current theme (green, yellow, white,
                      light-blue, paper, dc, custom)
  --help              Display this help message

Examples:
  matrix                    # Run with current theme at default speed
  matrix --speed 2.0        # Run at 2x speed
  matrix --theme green      # Force classic green theme
  matrix --speed 0.5        # Run at half speed for a slower effect

Note: Animation continues until you scroll, type, or run 'clear'`};let r=1;const i=n.getFlag("speed");if(i!==void 0){const F=parseFloat(String(i));if(isNaN(F)||F<.1||F>5)return{output:`matrix: invalid speed value '${i}'
Speed must be between 0.1 and 5.0`,error:!0};r=F}const s=n.getFlag("theme");let l=o.getCurrentColors();if(s!==void 0){const F=String(s),z=["green","yellow","white","light-blue","paper","dc","custom"];if(!z.includes(F))return{output:`matrix: invalid theme '${F}'
Valid themes: ${z.join(", ")}`,error:!0};if(F!=="custom"){const K=o.getPreset(F);K&&(l=K.colors)}}const{cols:a,rows:d}=Fa(),_=1.2,$=Math.floor(a/_)+5,g=Math.min(d,20),E=l["--terminal-accent"],y=l["--terminal-dim"],D=l["--terminal-bg"],b=d*1.5,T=-g*1.5,P=b,M=[];for(let F=0;F<$;F++){const z=-Math.random()*5,K=(5+Math.random()*5)/r,Fe=F*_,Ve=[];for(let Ae=0;Ae<g;Ae++){const He=Ae/g,de=Math.pow(He,2),Se=Ae===g-1,Ce=Ha();Ve.push(`<span class="matrix-char${Se?" matrix-char-bright":""}" data-char-index="${Ae}" style="color: ${Se?E:y}; opacity: ${de};">${Ce}</span>`)}M.push(`
  <div class="matrix-column" data-column-index="${F}" data-trail-length="${g}" style="
    left: ${Fe}em;
    animation: matrix-fall ${K}s linear ${z}s infinite;
    --matrix-start: ${T}em;
    --matrix-end: ${P}em;
  ">${Ve.join("")}</div>`)}return{output:`
<div class="matrix-rain" data-matrix-chars="${Dn}" style="height: ${b}em; background-color: ${D};">
${M.join("")}
</div>
`,html:!0}}}}function Ba(){return[{type:"info",text:"Broadcast message from root@darinchambers.com:"},{type:"info",text:"The system is going down for poweroff NOW!"},{type:"ok",text:"Stopped Session c1 of user darin"},{type:"ok",text:"Stopped Target - Graphical Interface"},{type:"ok",text:"Stopped Code Editor Process"},{type:"ok",text:"Stopped Docker Container Runtime"},{type:"ok",text:"Stopped OpenSSH Server"},{type:"failed",text:"Stopped Bluetooth Service (timeout)"},{type:"ok",text:"Stopped Network Manager"},{type:"ok",text:"Stopped D-Bus System Message Bus"},{type:"ok",text:"Stopped Journal Service"},{type:"ok",text:"Stopped System Logging Service"},{type:"info",text:"Sending SIGTERM to remaining processes..."},{type:"info",text:"Sending SIGKILL to remaining processes..."},{type:"ok",text:"Unmounted /home"},{type:"ok",text:"Unmounted /var"},{type:"ok",text:"Unmounted /tmp"},{type:"info",text:"All filesystems unmounted."},{type:"ok",text:"Reached target - Power-Off"}]}function vo(o){const e=Ba(),t=150,n=e.map((l,a)=>{const d=a*t,_=`boot-line boot-line-${l.type}`,$=l.text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`<div class="${_}" style="animation-delay: ${d}ms;">${$}</div>`}),r=e.length*t,i=o?"System halted.":"Power off.";n.push(`<div class="boot-line boot-line-info" style="animation-delay: ${r}ms;">${i}</div>`);const s=r+500;return n.push(`<div class="boot-overlay" style="animation-delay: ${s}ms;" data-boot-overlay="true"><span class="boot-overlay-text">Screen off</span></div>`),n.join(`
`)}const Wa={name:"shutdown",description:"Display simulated Linux shutdown sequence",execute:(o,e)=>{const t=new B(o);if(t.hasFlag("help"))return{output:`Usage: shutdown [options]

Display a simulated Linux shutdown sequence with services stopping,
filesystems unmounting, and a power-off screen.

Options:
  --halt     Show "System halted" instead of "Power off"
  --help     Display this help message

Examples:
  shutdown          # Show shutdown with power off
  shutdown --halt   # Show shutdown with system halt

Note: The screen goes black after shutdown. Scroll or type to dismiss.`};const n=t.hasFlag("halt");return{output:`<div class="boot-sequence shutdown-sequence" data-boot-type="shutdown">
${vo(n)}
</div>`,html:!0,clearBefore:!0,fullscreen:!0,fullscreenExitCommand:"boot",scrollBehavior:"top"}}},Ga={name:"reboot",description:"Display simulated system reboot sequence",execute:(o,e)=>{const t=new B(o);if(t.hasFlag("help"))return{output:`Usage: reboot [options]

Display a simulated system reboot sequence combining
shutdown and boot animations.

Options:
  --fast     Show abbreviated sequences
  --help     Display this help message

Examples:
  reboot          # Show full reboot sequence
  reboot --fast   # Show quick reboot sequence

Note: The full sequence takes about 10 seconds. Scroll or type to stop.`};const n=t.hasFlag("fast"),i=vo(!1).split(`
`).filter(g=>!g.includes("data-boot-overlay")).join(`
`),d=20*150,_=d+4e3;return{output:`<div class="boot-sequence reboot-sequence" data-boot-type="reboot">
${i}
<div class="boot-line boot-line-info" style="animation-delay: ${d}ms;">Rebooting...</div>
</div>`,html:!0,clearBefore:!0,fullscreen:!0,scrollBehavior:"top",scheduledCommand:{command:n?"boot --fast":"boot",delayMs:_,clearBefore:!0}}}};class Pr{static generateHeader(){return`
 ██████╗  █████╗ ██████╗ ██╗███╗   ██╗     ██████╗██╗  ██╗ █████╗ ███╗   ███╗██████╗ ███████╗██████╗ ███████╗
 ██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║    ██╔════╝██║  ██║██╔══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔════╝
 ██║  ██║███████║██████╔╝██║██╔██╗ ██║    ██║     ███████║███████║██╔████╔██║██████╔╝█████╗  ██████╔╝███████╗
 ██║  ██║██╔══██║██╔══██╗██║██║╚██╗██║    ██║     ██╔══██║██╔══██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗╚════██║
 ██████╔╝██║  ██║██║  ██║██║██║ ╚████║    ╚██████╗██║  ██║██║  ██║██║ ╚═╝ ██║██████╔╝███████╗██║  ██║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
`}static getTagline(){return"Technologist, Inventor | Building What's Next on Rock-Solid Foundations"}}function Fr(o,e){(e==null||e>o.length)&&(e=o.length);for(var t=0,n=Array(e);t<e;t++)n[t]=o[t];return n}function za(o){if(Array.isArray(o))return o}function Va(o,e){var t=o==null?null:typeof Symbol<"u"&&o[Symbol.iterator]||o["@@iterator"];if(t!=null){var n,r,i,s,l=[],a=!0,d=!1;try{if(i=(t=t.call(o)).next,e!==0)for(;!(a=(n=i.call(t)).done)&&(l.push(n.value),l.length!==e);a=!0);}catch(_){d=!0,r=_}finally{try{if(!a&&t.return!=null&&(s=t.return(),Object(s)!==s))return}finally{if(d)throw r}}return l}}function ja(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ya(o,e){return za(o)||Va(o,e)||qa(o,e)||ja()}function qa(o,e){if(o){if(typeof o=="string")return Fr(o,e);var t={}.toString.call(o).slice(8,-1);return t==="Object"&&o.constructor&&(t=o.constructor.name),t==="Map"||t==="Set"?Array.from(o):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Fr(o,e):void 0}}const Ro=Object.entries,Hr=Object.setPrototypeOf,Xa=Object.isFrozen,Ka=Object.getPrototypeOf,Za=Object.getOwnPropertyDescriptor;let ae=Object.freeze,le=Object.seal,ct=Object.create,xo=typeof Reflect<"u"&&Reflect,Pn=xo.apply,Fn=xo.construct;ae||(ae=function(e){return e});le||(le=function(e){return e});Pn||(Pn=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];return e.apply(t,r)});Fn||(Fn=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new e(...n)});const yt=Q(Array.prototype.forEach),Ja=Q(Array.prototype.lastIndexOf),Ur=Q(Array.prototype.pop),lt=Q(Array.prototype.push),Qa=Q(Array.prototype.splice),We=Array.isArray,wt=Q(String.prototype.toLowerCase),Ln=Q(String.prototype.toString),Br=Q(String.prototype.match),Et=Q(String.prototype.replace),Wr=Q(String.prototype.indexOf),el=Q(String.prototype.trim),tl=Q(Number.prototype.toString),nl=Q(Boolean.prototype.toString),Gr=typeof BigInt>"u"?null:Q(BigInt.prototype.toString),zr=typeof Symbol>"u"?null:Q(Symbol.prototype.toString),pe=Q(Object.prototype.hasOwnProperty),Lt=Q(Object.prototype.toString),ie=Q(RegExp.prototype.test),Xe=rl(TypeError);function Q(o){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return Pn(o,e,n)}}function rl(o){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Fn(o,t)}}function V(o,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:wt;if(Hr&&Hr(o,null),!We(e))return o;let n=e.length;for(;n--;){let r=e[n];if(typeof r=="string"){const i=t(r);i!==r&&(Xa(e)||(e[n]=i),r=i)}o[r]=!0}return o}function ol(o){for(let e=0;e<o.length;e++)pe(o,e)||(o[e]=null);return o}function he(o){const e=ct(null);for(const n of Ro(o)){var t=Ya(n,2);const r=t[0],i=t[1];pe(o,r)&&(We(i)?e[r]=ol(i):i&&typeof i=="object"&&i.constructor===Object?e[r]=he(i):e[r]=i)}return e}function il(o){switch(typeof o){case"string":return o;case"number":return tl(o);case"boolean":return nl(o);case"bigint":return Gr?Gr(o):"0";case"symbol":return zr?zr(o):"Symbol()";case"undefined":return Lt(o);case"function":case"object":{if(o===null)return Lt(o);const e=o,t=Oe(e,"toString");if(typeof t=="function"){const n=t(e);return typeof n=="string"?n:Lt(n)}return Lt(o)}default:return Lt(o)}}function Oe(o,e){for(;o!==null;){const n=Za(o,e);if(n){if(n.get)return Q(n.get);if(typeof n.value=="function")return Q(n.value)}o=Ka(o)}function t(){return null}return t}function sl(o){try{return ie(o,""),!0}catch{return!1}}const Vr=ae(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),In=ae(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),bn=ae(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),al=ae(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),wn=ae(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ll=ae(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),jr=ae(["#text"]),Yr=ae(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Sn=ae(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qr=ae(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),zt=ae(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),cl=le(/{{[\w\W]*|^[\w\W]*}}/g),dl=le(/<%[\w\W]*|^[\w\W]*%>/g),ul=le(/\${[\w\W]*/g),_l=le(/^data-[\-\w.\u00B7-\uFFFF]+$/),ml=le(/^aria-[\-\w]+$/),Xr=le(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),hl=le(/^(?:\w+script|data):/i),pl=le(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),fl=le(/^html$/i),gl=le(/^[a-z][.\w]*(-[.\w]+)+$/i),Kr=le(/<[/\w!]/g),$l=le(/<[/\w]/g),Tl=le(/<\/no(script|embed|frames)/i),Al=le(/\/>/i),Ne={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},yl=function(){return typeof window>"u"?null:window},El=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const i="dompurify"+(n?"#"+n:"");try{return e.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Zr=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Be=function(e,t,n,r){return pe(e,t)&&We(e[t])?V(r.base?he(r.base):{},e[t],r.transform):n};function No(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:yl();const e=C=>No(C);if(e.version="3.4.10",e.removed=[],!o||!o.document||o.document.nodeType!==Ne.document||!o.Element)return e.isSupported=!1,e;let t=o.document;const n=t,r=n.currentScript;o.DocumentFragment;const i=o.HTMLTemplateElement,s=o.Node,l=o.Element,a=o.NodeFilter,d=o.NamedNodeMap;d===void 0&&(o.NamedNodeMap||o.MozNamedAttrMap),o.HTMLFormElement;const _=o.DOMParser,$=o.trustedTypes,g=l.prototype,E=Oe(g,"cloneNode"),y=Oe(g,"remove"),D=Oe(g,"nextSibling"),b=Oe(g,"childNodes"),T=Oe(g,"parentNode"),P=Oe(g,"shadowRoot"),M=Oe(g,"attributes"),O=s&&s.prototype?Oe(s.prototype,"nodeType"):null,F=s&&s.prototype?Oe(s.prototype,"nodeName"):null;if(typeof i=="function"){const C=t.createElement("template");C.content&&C.content.ownerDocument&&(t=C.content.ownerDocument)}let z,K="",Fe,Ve=!1,Ae=0;const He=function(){if(Ae>0)throw Xe('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},de=function(c){He(),Ae++;try{return z.createHTML(c)}finally{Ae--}},Se=function(c){He(),Ae++;try{return z.createScriptURL(c)}finally{Ae--}},Ce=function(){return Ve||(Fe=El($,r),Ve=!0),Fe},tt=t,mt=tt.implementation,kt=tt.createNodeIterator,tn=tt.createDocumentFragment,Ot=tt.getElementsByTagName,Mt=n.importNode;let W=Zr();e.isSupported=typeof Ro=="function"&&typeof T=="function"&&mt&&mt.createHTMLDocument!==void 0;const p=cl,f=dl,u=ul,m=_l,A=ml,L=hl,w=pl,S=gl;let v=Xr,R=null;const H=V({},[...Vr,...In,...bn,...wn,...jr]);let x=null;const U=V({},[...Yr,...Sn,...qr,...zt]);let k=Object.seal(ct(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ne=null,re=null;const $e=Object.seal(ct(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Te=!0,Le=!0,ue=!1,oe=!0,ve=!1,ht=!0,je=!1,nn=!1,rn=!1,nt=!1,Dt=!1,Pt=!1,Jn=!0,Qn=!1;const er="user-content-";let on=!0,sn=!1,rt={},Re=null;const an=V({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let tr=null;const nr=V({},["audio","video","img","source","image","track"]);let ln=null;const rr=V({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ft="http://www.w3.org/1998/Math/MathML",Ht="http://www.w3.org/2000/svg",xe="http://www.w3.org/1999/xhtml";let ot=xe,cn=!1,dn=null;const Po=V({},[Ft,Ht,xe],Ln),or=ae(["mi","mo","mn","ms","mtext"]);let un=V({},or);const ir=ae(["annotation-xml"]);let _n=V({},ir);const Fo=V({},["title","style","font","a","script"]);let pt=null;const Ho=["application/xhtml+xml","text/html"],Uo="text/html";let Z=null,it=null;const Bo=t.createElement("form"),sr=function(c){return c instanceof RegExp||c instanceof Function},mn=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(it&&it===c)return;(!c||typeof c!="object")&&(c={}),c=he(c),pt=Ho.indexOf(c.PARSER_MEDIA_TYPE)===-1?Uo:c.PARSER_MEDIA_TYPE,Z=pt==="application/xhtml+xml"?Ln:wt,R=Be(c,"ALLOWED_TAGS",H,{transform:Z}),x=Be(c,"ALLOWED_ATTR",U,{transform:Z}),dn=Be(c,"ALLOWED_NAMESPACES",Po,{transform:Ln}),ln=Be(c,"ADD_URI_SAFE_ATTR",rr,{transform:Z,base:rr}),tr=Be(c,"ADD_DATA_URI_TAGS",nr,{transform:Z,base:nr}),Re=Be(c,"FORBID_CONTENTS",an,{transform:Z}),ne=Be(c,"FORBID_TAGS",he({}),{transform:Z}),re=Be(c,"FORBID_ATTR",he({}),{transform:Z}),rt=pe(c,"USE_PROFILES")?c.USE_PROFILES&&typeof c.USE_PROFILES=="object"?he(c.USE_PROFILES):c.USE_PROFILES:!1,Te=c.ALLOW_ARIA_ATTR!==!1,Le=c.ALLOW_DATA_ATTR!==!1,ue=c.ALLOW_UNKNOWN_PROTOCOLS||!1,oe=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ve=c.SAFE_FOR_TEMPLATES||!1,ht=c.SAFE_FOR_XML!==!1,je=c.WHOLE_DOCUMENT||!1,nt=c.RETURN_DOM||!1,Dt=c.RETURN_DOM_FRAGMENT||!1,Pt=c.RETURN_TRUSTED_TYPE||!1,rn=c.FORCE_BODY||!1,Jn=c.SANITIZE_DOM!==!1,Qn=c.SANITIZE_NAMED_PROPS||!1,on=c.KEEP_CONTENT!==!1,sn=c.IN_PLACE||!1,v=sl(c.ALLOWED_URI_REGEXP)?c.ALLOWED_URI_REGEXP:Xr,ot=typeof c.NAMESPACE=="string"?c.NAMESPACE:xe,un=pe(c,"MATHML_TEXT_INTEGRATION_POINTS")&&c.MATHML_TEXT_INTEGRATION_POINTS&&typeof c.MATHML_TEXT_INTEGRATION_POINTS=="object"?he(c.MATHML_TEXT_INTEGRATION_POINTS):V({},or),_n=pe(c,"HTML_INTEGRATION_POINTS")&&c.HTML_INTEGRATION_POINTS&&typeof c.HTML_INTEGRATION_POINTS=="object"?he(c.HTML_INTEGRATION_POINTS):V({},ir);const h=pe(c,"CUSTOM_ELEMENT_HANDLING")&&c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING=="object"?he(c.CUSTOM_ELEMENT_HANDLING):ct(null);if(k=ct(null),pe(h,"tagNameCheck")&&sr(h.tagNameCheck)&&(k.tagNameCheck=h.tagNameCheck),pe(h,"attributeNameCheck")&&sr(h.attributeNameCheck)&&(k.attributeNameCheck=h.attributeNameCheck),pe(h,"allowCustomizedBuiltInElements")&&typeof h.allowCustomizedBuiltInElements=="boolean"&&(k.allowCustomizedBuiltInElements=h.allowCustomizedBuiltInElements),le(k),ve&&(Le=!1),Dt&&(nt=!0),rt&&(R=V({},jr),x=ct(null),rt.html===!0&&(V(R,Vr),V(x,Yr)),rt.svg===!0&&(V(R,In),V(x,Sn),V(x,zt)),rt.svgFilters===!0&&(V(R,bn),V(x,Sn),V(x,zt)),rt.mathMl===!0&&(V(R,wn),V(x,qr),V(x,zt))),$e.tagCheck=null,$e.attributeCheck=null,pe(c,"ADD_TAGS")&&(typeof c.ADD_TAGS=="function"?$e.tagCheck=c.ADD_TAGS:We(c.ADD_TAGS)&&(R===H&&(R=he(R)),V(R,c.ADD_TAGS,Z))),pe(c,"ADD_ATTR")&&(typeof c.ADD_ATTR=="function"?$e.attributeCheck=c.ADD_ATTR:We(c.ADD_ATTR)&&(x===U&&(x=he(x)),V(x,c.ADD_ATTR,Z))),pe(c,"ADD_URI_SAFE_ATTR")&&We(c.ADD_URI_SAFE_ATTR)&&V(ln,c.ADD_URI_SAFE_ATTR,Z),pe(c,"FORBID_CONTENTS")&&We(c.FORBID_CONTENTS)&&(Re===an&&(Re=he(Re)),V(Re,c.FORBID_CONTENTS,Z)),pe(c,"ADD_FORBID_CONTENTS")&&We(c.ADD_FORBID_CONTENTS)&&(Re===an&&(Re=he(Re)),V(Re,c.ADD_FORBID_CONTENTS,Z)),on&&(R["#text"]=!0),je&&V(R,["html","head","body"]),R.table&&(V(R,["tbody"]),delete ne.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw Xe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Xe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const I=z;z=c.TRUSTED_TYPES_POLICY;try{K=de("")}catch(N){throw z=I,N}}else c.TRUSTED_TYPES_POLICY===null?(z=void 0,K=""):(z===void 0&&(z=Ce()),z&&typeof K=="string"&&(K=de("")));(W.uponSanitizeElement.length>0||W.uponSanitizeAttribute.length>0)&&R===H&&(R=he(R)),W.uponSanitizeAttribute.length>0&&x===U&&(x=he(x)),ae&&ae(c),it=c},ar=V({},[...In,...bn,...al]),lr=V({},[...wn,...ll]),Wo=function(c,h,I){return h.namespaceURI===xe?c==="svg":h.namespaceURI===Ft?c==="svg"&&(I==="annotation-xml"||un[I]):!!ar[c]},Go=function(c,h,I){return h.namespaceURI===xe?c==="math":h.namespaceURI===Ht?c==="math"&&_n[I]:!!lr[c]},zo=function(c,h,I){return h.namespaceURI===Ht&&!_n[I]||h.namespaceURI===Ft&&!un[I]?!1:!lr[c]&&(Fo[c]||!ar[c])},Vo=function(c){let h=T(c);(!h||!h.tagName)&&(h={namespaceURI:ot,tagName:"template"});const I=wt(c.tagName),N=wt(h.tagName);return dn[c.namespaceURI]?c.namespaceURI===Ht?Wo(I,h,N):c.namespaceURI===Ft?Go(I,h,N):c.namespaceURI===xe?zo(I,h,N):!!(pt==="application/xhtml+xml"&&dn[c.namespaceURI]):!1},Ue=function(c){lt(e.removed,{element:c});try{T(c).removeChild(c)}catch{if(y(c),!T(c))throw Xe("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},cr=function(c){const h=b(c);if(h){const N=[];yt(h,G=>{lt(N,G)}),yt(N,G=>{try{y(G)}catch{}})}const I=M(c);if(I)for(let N=I.length-1;N>=0;--N){const G=I[N],Y=G&&G.name;if(typeof Y=="string")try{c.removeAttribute(Y)}catch{}}},Ye=function(c,h){try{lt(e.removed,{attribute:h.getAttributeNode(c),from:h})}catch{lt(e.removed,{attribute:null,from:h})}if(h.removeAttribute(c),c==="is")if(nt||Dt)try{Ue(h)}catch{}else try{h.setAttribute(c,"")}catch{}},jo=function(c){const h=M(c);if(h)for(let I=h.length-1;I>=0;--I){const N=h[I],G=N&&N.name;if(!(typeof G!="string"||x[Z(G)]))try{c.removeAttribute(G)}catch{}}},Yo=function(c){const h=[c];for(;h.length>0;){const I=h.pop();(O?O(I):I.nodeType)===Ne.element&&jo(I);const G=b(I);if(G)for(let Y=G.length-1;Y>=0;--Y)h.push(G[Y])}},dr=function(c){let h=null,I=null;if(rn)c="<remove></remove>"+c;else{const Y=Br(c,/^[\r\n\t ]+/);I=Y&&Y[0]}pt==="application/xhtml+xml"&&ot===xe&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const N=z?de(c):c;if(ot===xe)try{h=new _().parseFromString(N,pt)}catch{}if(!h||!h.documentElement){h=mt.createDocument(ot,"template",null);try{h.documentElement.innerHTML=cn?K:N}catch{}}const G=h.body||h.documentElement;return c&&I&&G.insertBefore(t.createTextNode(I),G.childNodes[0]||null),ot===xe?Ot.call(h,je?"html":"body")[0]:je?h.documentElement:G},ur=function(c){return kt.call(c.ownerDocument||c,c,a.SHOW_ELEMENT|a.SHOW_COMMENT|a.SHOW_TEXT|a.SHOW_PROCESSING_INSTRUCTION|a.SHOW_CDATA_SECTION,null)},Ut=function(c){return c=Et(c,p," "),c=Et(c,f," "),c=Et(c,u," "),c},hn=function(c){var h;c.normalize();const I=kt.call(c.ownerDocument||c,c,a.SHOW_TEXT|a.SHOW_COMMENT|a.SHOW_CDATA_SECTION|a.SHOW_PROCESSING_INSTRUCTION,null);let N=I.nextNode();for(;N;)N.data=Ut(N.data),N=I.nextNode();const G=(h=c.querySelectorAll)===null||h===void 0?void 0:h.call(c,"template");G&&yt(G,Y=>{st(Y.content)&&hn(Y.content)})},Bt=function(c){const h=F?F(c):null;return typeof h!="string"||Z(h)!=="form"?!1:typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||c.attributes!==M(c)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function"||c.nodeType!==O(c)||c.childNodes!==b(c)},st=function(c){if(!O||typeof c!="object"||c===null)return!1;try{return O(c)===Ne.documentFragment}catch{return!1}},ft=function(c){if(!O||typeof c!="object"||c===null)return!1;try{return typeof O(c)=="number"}catch{return!1}};function Me(C,c,h){C.length!==0&&yt(C,I=>{I.call(e,c,h,it)})}const qo=function(c,h){return!!(ht&&c.hasChildNodes()&&!ft(c.firstElementChild)&&ie(Kr,c.textContent)&&ie(Kr,c.innerHTML)||ht&&c.namespaceURI===xe&&h==="style"&&ft(c.firstElementChild)||c.nodeType===Ne.processingInstruction||ht&&c.nodeType===Ne.comment&&ie($l,c.data))},Xo=function(c,h){if(!ne[h]&&hr(h)&&(k.tagNameCheck instanceof RegExp&&ie(k.tagNameCheck,h)||k.tagNameCheck instanceof Function&&k.tagNameCheck(h)))return!1;if(on&&!Re[h]){const I=T(c),N=b(c);if(N&&I){const G=N.length;for(let Y=G-1;Y>=0;--Y){const te=sn?N[Y]:E(N[Y],!0);I.insertBefore(te,D(c))}}}return Ue(c),!0},_r=function(c){if(Me(W.beforeSanitizeElements,c,null),Bt(c))return Ue(c),!0;const h=Z(F?F(c):c.nodeName);if(Me(W.uponSanitizeElement,c,{tagName:h,allowedTags:R}),qo(c,h))return Ue(c),!0;if(ne[h]||!($e.tagCheck instanceof Function&&$e.tagCheck(h))&&!R[h])return Xo(c,h);if((O?O(c):c.nodeType)===Ne.element&&!Vo(c)||(h==="noscript"||h==="noembed"||h==="noframes")&&ie(Tl,c.innerHTML))return Ue(c),!0;if(ve&&c.nodeType===Ne.text){const N=Ut(c.textContent);c.textContent!==N&&(lt(e.removed,{element:c.cloneNode()}),c.textContent=N)}return Me(W.afterSanitizeElements,c,null),!1},mr=function(c,h,I){if(re[h]||Jn&&(h==="id"||h==="name")&&(I in t||I in Bo))return!1;const N=x[h]||$e.attributeCheck instanceof Function&&$e.attributeCheck(h,c);if(!(Le&&ie(m,h))){if(!(Te&&ie(A,h))){if(N){if(!ln[h]){if(!ie(v,Et(I,w,""))){if(!((h==="src"||h==="xlink:href"||h==="href")&&c!=="script"&&Wr(I,"data:")===0&&tr[c])){if(!(ue&&!ie(L,Et(I,w,"")))){if(I)return!1}}}}}else if(!(hr(c)&&(k.tagNameCheck instanceof RegExp&&ie(k.tagNameCheck,c)||k.tagNameCheck instanceof Function&&k.tagNameCheck(c))&&(k.attributeNameCheck instanceof RegExp&&ie(k.attributeNameCheck,h)||k.attributeNameCheck instanceof Function&&k.attributeNameCheck(h,c))||h==="is"&&k.allowCustomizedBuiltInElements&&(k.tagNameCheck instanceof RegExp&&ie(k.tagNameCheck,I)||k.tagNameCheck instanceof Function&&k.tagNameCheck(I))))return!1}}return!0},Ko=V({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),hr=function(c){return!Ko[wt(c)]&&ie(S,c)},Zo=function(c,h,I,N){if(z&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!I)switch($.getAttributeType(c,h)){case"TrustedHTML":return de(N);case"TrustedScriptURL":return Se(N)}return N},Jo=function(c,h,I,N){try{I?c.setAttributeNS(I,h,N):c.setAttribute(h,N),Bt(c)?Ue(c):Ur(e.removed)}catch{Ye(h,c)}},pr=function(c){Me(W.beforeSanitizeAttributes,c,null);const h=c.attributes;if(!h||Bt(c))return;const I={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:x,forceKeepAttr:void 0};let N=h.length;const G=Z(c.nodeName);for(;N--;){const Y=h[N],te=Y.name,J=Y.namespaceURI,ye=Y.value,Ie=Z(te),fn=ye;let _e=te==="value"?fn:el(fn);if(I.attrName=Ie,I.attrValue=_e,I.keepAttr=!0,I.forceKeepAttr=void 0,Me(W.uponSanitizeAttribute,c,I),_e=I.attrValue,Qn&&(Ie==="id"||Ie==="name")&&Wr(_e,er)!==0&&(Ye(te,c),_e=er+_e),ht&&ie(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,_e)){Ye(te,c);continue}if(Ie==="attributename"&&Br(_e,"href")){Ye(te,c);continue}if(!I.forceKeepAttr){if(!I.keepAttr){Ye(te,c);continue}if(!oe&&ie(Al,_e)){Ye(te,c);continue}if(ve&&(_e=Ut(_e)),!mr(G,Ie,_e)){Ye(te,c);continue}_e=Zo(G,Ie,J,_e),_e!==fn&&Jo(c,te,J,_e)}}Me(W.afterSanitizeAttributes,c,null)},Wt=function(c){let h=null;const I=ur(c);for(Me(W.beforeSanitizeShadowDOM,c,null);h=I.nextNode();)if(Me(W.uponSanitizeShadowNode,h,null),_r(h),pr(h),st(h.content)&&Wt(h.content),(O?O(h):h.nodeType)===Ne.element){const G=P(h);st(G)&&(pn(G),Wt(G))}Me(W.afterSanitizeShadowDOM,c,null)},pn=function(c){const h=[{node:c,shadow:null}];for(;h.length>0;){const I=h.pop();if(I.shadow){Wt(I.shadow);continue}const N=I.node,Y=(O?O(N):N.nodeType)===Ne.element,te=b(N);if(te)for(let J=te.length-1;J>=0;--J)h.push({node:te[J],shadow:null});if(Y){const J=F?F(N):null;if(typeof J=="string"&&Z(J)==="template"){const ye=N.content;st(ye)&&h.push({node:ye,shadow:null})}}if(Y){const J=P(N);st(J)&&h.push({node:null,shadow:J},{node:J,shadow:null})}}};return e.sanitize=function(C){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},h=null,I=null,N=null,G=null;if(cn=!C,cn&&(C="<!-->"),typeof C!="string"&&!ft(C)&&(C=il(C),typeof C!="string"))throw Xe("dirty is not a string, aborting");if(!e.isSupported)return C;nn||mn(c),e.removed=[];const Y=sn&&typeof C!="string"&&ft(C);if(Y){const ye=F?F(C):C.nodeName;if(typeof ye=="string"){const Ie=Z(ye);if(!R[Ie]||ne[Ie])throw Xe("root node is forbidden and cannot be sanitized in-place")}if(Bt(C))throw Xe("root node is clobbered and cannot be sanitized in-place");try{pn(C)}catch(Ie){throw cr(C),Ie}}else if(ft(C))h=dr("<!---->"),I=h.ownerDocument.importNode(C,!0),I.nodeType===Ne.element&&I.nodeName==="BODY"||I.nodeName==="HTML"?h=I:h.appendChild(I),pn(I);else{if(!nt&&!ve&&!je&&C.indexOf("<")===-1)return z&&Pt?de(C):C;if(h=dr(C),!h)return nt?null:Pt?K:""}h&&rn&&Ue(h.firstChild);const te=ur(Y?C:h);try{for(;N=te.nextNode();)_r(N),pr(N),st(N.content)&&Wt(N.content)}catch(ye){throw Y&&cr(C),ye}if(Y)return yt(e.removed,ye=>{ye.element&&Yo(ye.element)}),ve&&hn(C),C;if(nt){if(ve&&hn(h),Dt)for(G=tn.call(h.ownerDocument);h.firstChild;)G.appendChild(h.firstChild);else G=h;return(x.shadowroot||x.shadowrootmode)&&(G=Mt.call(n,G,!0)),G}let J=je?h.outerHTML:h.innerHTML;return je&&R["!doctype"]&&h.ownerDocument&&h.ownerDocument.doctype&&h.ownerDocument.doctype.name&&ie(fl,h.ownerDocument.doctype.name)&&(J="<!DOCTYPE "+h.ownerDocument.doctype.name+`>
`+J),ve&&(J=Ut(J)),z&&Pt?de(J):J},e.setConfig=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};mn(C),nn=!0},e.clearConfig=function(){it=null,nn=!1,z=Fe,K=""},e.isValidAttribute=function(C,c,h){it||mn({});const I=Z(C),N=Z(c);return mr(I,N,h)},e.addHook=function(C,c){typeof c=="function"&&lt(W[C],c)},e.removeHook=function(C,c){if(c!==void 0){const h=Ja(W[C],c);return h===-1?void 0:Qa(W[C],h,1)[0]}return Ur(W[C])},e.removeHooks=function(C){W[C]=[]},e.removeAllHooks=function(){W=Zr()},e}var Ll=No();function Kn(o){return Ll.sanitize(o,{ALLOWED_TAGS:["p","div","span","br","strong","b","em","i","u","s","a","code","pre","h1","h2","h3","h4","h5","h6","ul","ol","li","blockquote","table","thead","tbody","tr","th","td","img","canvas","button","input","select","option","label","aside","section","details","summary"],ALLOWED_ATTR:["class","id","href","target","rel","src","alt","title","width","height","type","value","checked","selected","disabled","min","max","step","placeholder","data-command","data-command-template","data-setting-type","data-color-var","data-theme","data-settings-panel","data-graph","data-graph-src","data-graph-theme","data-graph-initialized","data-graph-error","data-speed","data-density","data-pattern","data-accent-color","data-dim-color","style","open","role","aria-label","aria-labelledby","aria-describedby","aria-valuemin","aria-valuemax","aria-valuenow","aria-valuetext","aria-live","aria-atomic","aria-current"],RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1})}class Il{headerElement;constructor(e){this.headerElement=e,this.render(),this.setupClickHandler()}render(){const e=Pr.generateHeader(),t=Pr.getTagline();this.headerElement.innerHTML=Kn(`
      <div class="header-prompt">$ whoami | figlet | lolcat</div>
      <div class="header-ascii">
        <pre class="header-ascii-text header-clickable">${e}</pre>
      </div>
      <p class="header-tagline">${t}</p>
    `)}setupClickHandler(){this.headerElement.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("header-clickable")||t.closest(".header-clickable")){const n=new CustomEvent("terminal-command",{detail:"clear",bubbles:!0});document.dispatchEvent(n)}})}}class bl{navLinksElement;onCommandClick;activeCommand=null;constructor(e,t){this.navLinksElement=e,this.onCommandClick=t}setItems(e){this.navLinksElement.innerHTML="",e.forEach(t=>{const n=document.createElement("button");n.className="nav-link",n.type="button",n.textContent=t.label,n.setAttribute("data-command",t.command),n.setAttribute("aria-label",`Navigate to ${t.label}`),n.addEventListener("click",()=>{this.onCommandClick(t.command)}),this.navLinksElement.appendChild(n)})}addItem(e){const t=document.createElement("button");t.className="nav-link",t.type="button",t.textContent=e.label,t.setAttribute("data-command",e.command),t.setAttribute("aria-label",`Navigate to ${e.label}`),t.addEventListener("click",()=>{this.onCommandClick(e.command)}),this.navLinksElement.appendChild(t)}clear(){this.navLinksElement.innerHTML=""}setActiveItem(e){this.activeCommand=e,this.navLinksElement.querySelectorAll("button[data-command]").forEach(r=>{r.removeAttribute("aria-current")});const n=this.navLinksElement.querySelector(`button[data-command="${e}"]`);n&&n.setAttribute("aria-current","page")}getActiveCommand(){return this.activeCommand}}function wl(){document.querySelectorAll("a.email-protected").forEach(e=>{if(e.dataset.protected==="true")return;const t=e.dataset.user,n=e.dataset.domain;if(!t||!n){console.warn("Email link missing data-user or data-domain attributes",e);return}e.dataset.protected="true",e.addEventListener("click",r=>{r.preventDefault();const s=`mailto:${`${t}@${n}`}`;window.location.href=s}),e.addEventListener("keydown",r=>{if(r.key==="Enter"||r.key===" "){r.preventDefault();const s=`mailto:${`${t}@${n}`}`;window.location.href=s}}),e.hasAttribute("tabindex")||e.setAttribute("tabindex","0")})}class Jr{envVarManager;constructor(e){this.envVarManager=e}format(e,t){let n=e;return this.envVarManager&&(n=this.envVarManager.expandVariables(n)),n=this.expandBashEscapes(n,t),n=this.expandCustomTokens(n,t),n}expandBashEscapes(e,t){let n=e;return n=n.replace(/\\u/g,t.user),n=n.replace(/\\h/g,this.getShortHostname(t.hostname)),n=n.replace(/\\H/g,t.hostname),n=n.replace(/\\w/g,t.shortPwd),n=n.replace(/\\W/g,t.lastDir),n=n.replace(/\\\$/g,t.isRoot?"#":"$"),n=n.replace(/\\d/g,this.getDate()),n=n.replace(/\\t/g,this.getTime24()),n=n.replace(/\\T/g,this.getTime12()),n=n.replace(/\\A/g,this.getTimeShort()),n=n.replace(/\\@/g,this.getTimeAMPM()),t.historyNumber!==void 0&&(n=n.replace(/\\!/g,String(t.historyNumber))),t.commandNumber!==void 0&&(n=n.replace(/\\#/g,String(t.commandNumber))),n=n.replace(/\\\\/g,"\\"),n=n.replace(/\\n/g,`
`),n}expandCustomTokens(e,t){let n=e;return n=n.replace(/\{user\}/g,t.user),n=n.replace(/\{hostname\}/g,t.hostname),n=n.replace(/\{path\}/g,t.shortPwd),n=n.replace(/\{lastdir\}/g,t.lastDir),n=n.replace(/\{pwd\}/g,t.pwd),n}getShortHostname(e){const t=e.indexOf(".");return t>0?e.substring(0,t):e}getDate(){const e=new Date,t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r=t[e.getDay()],i=n[e.getMonth()],s=String(e.getDate()).padStart(2,"0");return`${r} ${i} ${s}`}getTime24(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}getTime12(){const e=new Date;let t=e.getHours();const n=t>=12?"PM":"AM";t=t%12||12;const r=String(t).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0"),s=String(e.getSeconds()).padStart(2,"0");return`${r}:${i}:${s} ${n}`}getTimeShort(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${t}:${n}`}getTimeAMPM(){const e=new Date;let t=e.getHours();const n=t>=12?"PM":"AM";t=t%12||12;const r=String(t).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0");return`${r}:${i} ${n}`}static getLastDir(e){if(e==="/")return"/";if(e==="~"||e==="")return"~";const t=e.split("/").filter(n=>n&&n!=="~");return t.length>0?t[t.length-1]:"~"}}const Sl=["terminal-header","terminal-nav","terminal-input-line"],Qr=["keydown","click","touchstart","wheel"];class Cl{constructor(e){this.runExitCommand=e}runExitCommand;active=!1;exitHandler=null;exitCommand=null;enter(e,t){this.active||(this.active=!0,this.exitCommand=e??null,this.setChromeHidden(!0),this.exitHandler=()=>this.exit(),setTimeout(()=>{if(!(!this.active||!this.exitHandler))for(const n of Qr)document.addEventListener(n,this.exitHandler,{once:!0})},100),t!==void 0&&setTimeout(()=>this.exit(),t))}reset(){this.active=!1,this.exitCommand=null,this.removeListeners()}exit(){if(!this.active)return;this.active=!1;const e=this.exitCommand;this.exitCommand=null,this.setChromeHidden(!1),this.removeListeners(),e&&setTimeout(()=>this.runExitCommand(e),100)}removeListeners(){if(this.exitHandler){for(const e of Qr)document.removeEventListener(e,this.exitHandler);this.exitHandler=null}}setChromeHidden(e){for(const t of Sl)document.getElementById(t)?.classList.toggle("fullscreen-hidden",e)}}class vl{constructor(e){this.deps=e,document.addEventListener("terminal-command",t=>{const n=t;this.deps.executeCommand(n.detail)}),document.addEventListener("click",t=>this.handleClick(t)),document.addEventListener("change",t=>this.handleChange(t)),document.addEventListener("input",t=>this.handleInput(t)),document.addEventListener("settings-changed",()=>{this.refreshPanels(),this.deps.onSettingsChanged()})}deps;handleClick(e){const t=e.target;if(t.closest("[data-command]")&&!t.closest(".nav-link")){const n=t.closest("[data-command]"),r=n.getAttribute("data-command");if(!r)return;n.tagName==="A"&&e.preventDefault();const i=this.deps.getRouter();if(i){const s=i.getPathForCommand(r);if(s){i.navigate(s,!1);return}}this.deps.executeCommand(r)}}handleChange(e){const t=e.target,n=t.getAttribute("data-command-template"),r=t.getAttribute("data-setting-type");if(!n)return;let i="";t instanceof HTMLInputElement&&t.type==="checkbox"?i=`${n} ${t.checked?"on":"off"}`:t instanceof HTMLInputElement&&t.type==="color"?i=`${n} ${t.value}`:t instanceof HTMLInputElement&&t.type==="range"?i=`${n} ${t.value}`:t instanceof HTMLSelectElement&&(i=r==="font-family"?`${n} "${t.value}"`:`${n} ${t.value}`),i&&this.deps.executeCommand(i)}handleInput(e){const t=e.target;if(t.type!=="range")return;const n=t.getAttribute("data-setting-type");if(n==="font-size"){const r=document.getElementById("font-size-value");r&&(r.textContent=`${t.value}px`)}else if(n==="animation-speed"){const r=document.getElementById("animation-speed-value");r&&(r.textContent=`${t.value}x`)}}refreshPanels(){const{settingsManager:e,themeManager:t}=this.deps;if(!e||!t)return;const n=document.querySelectorAll("[data-settings-panel]");if(n.length===0)return;const r=Array.from(n).some(s=>s.contains(document.activeElement)),i=Io(e,t);n.forEach(s=>{const l=i.replace('<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true">',"").replace(/<\/aside>$/,"");s.innerHTML=Kn(l)}),r&&n[0].querySelector("button, input, select")?.focus()}focusPanelIfPresent(){setTimeout(()=>{document.querySelector("[data-settings-panel]")?.querySelector("button, input, select")?.focus()},0)}}class Rl{inputElement;promptElement;history=[];historyIndex=-1;currentInput="";availableCommands=[];fileSystem;constructor(e,t){this.inputElement=e,this.promptElement=t,this.setupEventListeners()}setupEventListeners(){this.inputElement.addEventListener("keydown",e=>this.handleKeyDown(e))}handleKeyDown(e){switch(e.key){case"ArrowUp":e.preventDefault(),this.navigateHistory("up");break;case"ArrowDown":e.preventDefault(),this.navigateHistory("down");break;case"Tab":if(e.shiftKey||this.inputElement.value.trim()==="")return;e.preventDefault(),this.handleTabCompletion();break}}navigateHistory(e){this.history.length!==0&&(this.historyIndex===-1&&(this.currentInput=this.inputElement.value),e==="up"?this.historyIndex<this.history.length-1&&(this.historyIndex++,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex>0?(this.historyIndex--,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex===0&&(this.historyIndex=-1,this.inputElement.value=this.currentInput))}handleTabCompletion(){const e=this.inputElement.value;if(!e)return;const t=e.split(/\s+/);t.length===1?this.completeCommand(e.trim()):this.completeFilePath(t)}completeCommand(e){const t=this.availableCommands.filter(n=>n.startsWith(e.toLowerCase()));if(t.length===1)this.inputElement.value=t[0];else if(t.length>1){const n=this.findCommonPrefix(t);n.length>e.length&&(this.inputElement.value=n)}}completeFilePath(e){if(!this.fileSystem)return;const t=e[e.length-1],n=e.slice(0,-1).join(" ");let r=this.fileSystem.getCurrentPath(),i=t;const s=t.lastIndexOf("/");if(s!==-1){const l=t.substring(0,s+1);i=t.substring(s+1),l.startsWith("/")?r=l:r=this.resolvePath(this.fileSystem.getCurrentPath(),l)}try{if(!this.fileSystem.exists(r)||!this.fileSystem.isDirectory(r))return;const a=this.fileSystem.list(r).filter($=>$.toLowerCase().startsWith(i.toLowerCase()));if(a.length===0)return;const d=this.findCommonPrefix(a);let _;if(s!==-1?_=t.substring(0,s+1)+d:_=d,a.length===1){const $=this.resolvePath(r,a[0]);this.fileSystem.isDirectory($)&&(_+="/")}this.inputElement.value=n+(n?" ":"")+_}catch{return}}resolvePath(e,t){if(t.startsWith("/"))return t;const n=e.split("/").filter(i=>i),r=t.split("/").filter(i=>i);for(const i of r)i===".."?n.pop():i!=="."&&n.push(i);return"/"+n.join("/")}findCommonPrefix(e){if(e.length===0)return"";if(e.length===1)return e[0];let t=e[0];for(let n=1;n<e.length;n++)for(;!e[n].startsWith(t);)if(t=t.substring(0,t.length-1),t==="")return"";return t}addToHistory(e){e.trim()&&(this.history.push(e),this.historyIndex=-1,this.currentInput="")}getValue(){return this.inputElement.value}clear(){this.inputElement.value="",this.currentInput="",this.historyIndex=-1}focus(e=!1){!e&&this.isMobileDevice()||this.inputElement.focus({preventScroll:!0})}isMobileDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0||window.matchMedia("(max-width: 768px)").matches}setPrompt(e){this.promptElement.textContent=e}setAvailableCommands(e){this.availableCommands=e}setFileSystem(e){this.fileSystem=e}setInputType(e){this.inputElement.type=e}getHistory(){return[...this.history]}onSubmit(e){this.inputElement.addEventListener("keydown",t=>{if(t.key==="Enter"){const n=this.getValue();e(n)}})}}class xl{outputElement;inputLineElement;screensaverElements=[];isScreensaverOutput=!1;constructor(e){this.outputElement=e,this.inputLineElement=document.getElementById("terminal-input-line")}startScreensaverOutput(){this.screensaverElements=[],this.isScreensaverOutput=!0}writeLine(e,t,n){const r=document.createElement("div");r.className="output-line"+(t?` ${t}`:""),r.textContent=e,this.inputLineElement?.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),n&&n()}write(e,t,n){const r=e.split(`
`);r.forEach((i,s)=>{(s<r.length-1||i)&&this.writeLine(i,t)}),n&&n()}writeHTML(e,t){const n=document.createElement("div");n.className="output-line",n.innerHTML=Kn(e),this.isScreensaverOutput&&(this.screensaverElements.push(n),this.isScreensaverOutput=!1),this.inputLineElement?.parentElement===this.outputElement?this.outputElement.insertBefore(n,this.inputLineElement):this.outputElement.appendChild(n),t&&t()}writeError(e,t){const n=e.split(`
`);n.forEach((r,i)=>{if(i<n.length-1||r){const s=document.createElement("div");s.className="output-line output-error",s.textContent=r;const l=`error-${Date.now()}-${i}`;if(s.id=l,s.setAttribute("role","alert"),t&&i===0){const a=document.getElementById(t);if(a){const d=a.getAttribute("aria-describedby");d?a.setAttribute("aria-describedby",`${d} ${l}`):a.setAttribute("aria-describedby",l)}}this.inputLineElement?.parentElement===this.outputElement?this.outputElement.insertBefore(s,this.inputLineElement):this.outputElement.appendChild(s)}}),this.scrollToBottom()}writeCommand(e,t,n){const r=document.createElement("div");r.className="output-line";const i=document.createElement("span");i.style.color="var(--terminal-accent)",i.textContent=e;const s=document.createElement("span");s.textContent=t,r.appendChild(i),r.appendChild(s),this.isScreensaverOutput&&this.screensaverElements.push(r),this.inputLineElement?.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),n&&n()}clear(){Array.from(this.outputElement.children).forEach(t=>{t.id!=="terminal-input-line"&&t.remove()})}clearScreensaverOutput(){this.screensaverElements.forEach(e=>{e.parentElement&&e.remove()}),this.screensaverElements=[],this.isScreensaverOutput=!1}scrollToBottom(){const e=this.outputElement.parentElement;e&&(e.scrollTop=e.scrollHeight)}scrollToCommand(){const e=this.outputElement.querySelectorAll(".output-line");e.length>=2?e[e.length-2].scrollIntoView({behavior:"instant",block:"start"}):e.length===1?e[0].scrollIntoView({behavior:"instant",block:"start"}):this.scrollToBottom()}performScrollBehavior(e){requestAnimationFrame(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{setTimeout(()=>{e==="top"?this.scrollToCommand():this.scrollToBottom()},50)})})})}}class Nl{constructor(e,t,n,r,i){this.dispatcher=e,this.executor=t,this.settingsManager=n,this.themeManager=r,this.envVarManager=i;const s=document.getElementById("terminal-output"),l=document.getElementById("terminal-input"),a=document.getElementById("terminal-prompt");if(!s||!l||!a)throw new Error("Required terminal elements not found");this.output=new xl(s),this.input=new Rl(l,a),this.promptFormatter=new Jr(i),this.fullscreen=new Cl(d=>{this.executeCommand(d,!0)}),this.settingsUI=new vl({settingsManager:this.settingsManager,themeManager:this.themeManager,executeCommand:d=>{this.executeCommand(d,!1)},getRouter:()=>this.router,onSettingsChanged:()=>{this.updatePrompt(),this.screensaverManager?.handleSettingsChange()}}),this.setupInputHandler(),this.setupClickHandler(s),this.setupKeyboardHandlers(),this.setupMobileViewportHandler(),this.updatePrompt()}dispatcher;executor;settingsManager;themeManager;envVarManager;input;output;username="darin";hostname="darinchambers.com";currentPath="~";promptFormatter;router;screensaverManager;inputInterceptor=null;fullscreen;settingsUI;setupClickHandler(e){e.addEventListener("click",t=>{const n=window.getSelection();if(n&&n.toString().length>0)return;const r=t.target,i=["svg","button","a","input","select","textarea","[data-graph]","[data-graph-src]",".graph-container"].join(", ");r.closest(i)||this.input.focus(!0)})}setupKeyboardHandlers(){document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelectorAll("[data-settings-panel]");if(t.length>0){const n=document.activeElement;n&&t[0].contains(n)&&(e.preventDefault(),this.input.focus(!0))}}})}setupMobileViewportHandler(){if(!window.visualViewport)return;let e=window.visualViewport.height;window.visualViewport.addEventListener("resize",()=>{const t=window.visualViewport.height;t>e&&this.scrollToHeader(),e=t})}scrollToHeader(){requestAnimationFrame(()=>{const e=document.getElementById("terminal-header");e?e.scrollIntoView({behavior:"smooth",block:"start"}):window.scrollTo({top:0,behavior:"smooth"})})}setupInputHandler(){this.input.onSubmit(async e=>{if(this.inputInterceptor){const n=this.inputInterceptor;this.inputInterceptor=null,this.input.clear(),await n(e.trim()),setTimeout(()=>this.input.focus(!0),100);return}const t=e.trim();if(this.input.clear(),this.output.writeCommand(this.getPromptString(),t),this.input.addToHistory(t),t){const n=await this.executor.execute(t);this.displayResult(n),this.router&&this.router.syncUrlToCommand(t)}setTimeout(()=>{this.input.focus(!0)},100)})}displayResult(e){if(e.clearBefore&&this.output.clear(),e.fullscreen&&this.fullscreen.enter(e.fullscreenExitCommand,e.fullscreenDuration),e.output===$o.CLEAR_SCREEN?(this.output.clear(),this.router&&window.location.pathname!=="/"&&window.history.pushState({},"","/")):e.output&&!e.raw&&(e.error?this.output.writeError(e.output):e.html?(this.output.writeHTML(e.output,()=>{typeof window.initializeGraphs=="function"&&window.initializeGraphs(),wl(),this.output.performScrollBehavior(e.scrollBehavior)}),this.settingsUI.focusPanelIfPresent()):this.output.write(e.output,void 0,()=>{this.output.performScrollBehavior(e.scrollBehavior)})),e.scheduledCommand){const{command:t,delayMs:n,clearBefore:r}=e.scheduledCommand;setTimeout(()=>{this.fullscreen.reset(),r&&this.output.clear(),this.executeCommand(t,!0)},n)}}getPromptString(){const e={user:this.username,hostname:this.hostname,pwd:this.envVarManager?.getVariable("PWD")??this.currentPath,shortPwd:this.currentPath,lastDir:Jr.getLastDir(this.currentPath),isRoot:this.username==="root"},t=this.settingsManager?.getSetting("prompt")?.format??"\\u@\\h:\\W\\$ ";return this.promptFormatter.format(t,e)}updatePrompt(){this.input.setPrompt(this.getPromptString())}registerCommand(e){this.dispatcher.registerCommand(e),this.input.setAvailableCommands(this.dispatcher.getCommandNames())}registerCommands(e){e.forEach(t=>this.registerCommand(t))}setFileSystem(e){this.input.setFileSystem(e)}writeWelcome(e){this.output.write(e,void 0,()=>{this.output.performScrollBehavior()})}setUsername(e){this.username=e,this.updatePrompt()}getUsername(){return this.username}setCurrentPath(e){this.currentPath=e,this.updatePrompt()}setInputInterceptor(e){this.inputInterceptor=e}writeOutput(e){this.output.write(e)}writeError(e){this.output.writeError(e)}showResult(e){this.displayResult(e)}setInputLineVisible(e){const t=document.getElementById("terminal-input-line");t&&(t.style.display=e?"":"none")}focus(e=!1){this.input.focus(e)}getInput(){return this.input}getOutput(){return this.output}stopScreensaverAnimations(){mi(),io()}clearScreensaver(){this.stopScreensaverAnimations(),this.output.clearScreensaverOutput()}setRouter(e){this.router=e}setScreensaverManager(e){this.screensaverManager=e}async executeCommand(e,t=!1){if(t&&this.output.clear(),this.output.writeCommand(this.getPromptString(),e),this.input.addToHistory(e),e.trim()){const n=await this.executor.execute(e);this.displayResult(n)}this.input.clear(),this.input.focus()}}class kl{aliases=new Map;fileSystem;aliasFilePath=Ee.CONFIG_ALIASES;defaultAliases=new Map([["ll","ls -alh"]]);constructor(e){this.fileSystem=e,this.loadDefaultAliases(),this.loadAliases()}loadDefaultAliases(){this.defaultAliases.forEach((e,t)=>{this.aliases.set(t,e)})}loadAliases(){try{this.fileSystem.exists(this.aliasFilePath)&&this.fileSystem.isFile(this.aliasFilePath)&&this.fileSystem.readFile(this.aliasFilePath).split(`
`).filter(n=>n.trim()).forEach(n=>{const r=/^alias\s+(\S+)='(.+)'$/.exec(n);r&&this.aliases.set(r[1],r[2])})}catch{}}saveAliases(){const e=Array.from(this.aliases.entries()).map(([n,r])=>`alias ${n}='${r}'`),t=e.join(`
`)+(e.length>0?`
`:"");try{this.fileSystem.writeFile(this.aliasFilePath,t)}catch(n){throw new Error(`Failed to save aliases: ${n instanceof Error?n.message:String(n)}`)}}setAlias(e,t){if(!/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(e))throw new Error(`Invalid alias name: ${e}`);this.aliases.set(e,t),this.saveAliases()}removeAlias(e){const t=this.aliases.has(e);return t&&(this.aliases.delete(e),this.saveAliases()),t}getAlias(e){return this.aliases.get(e)}getAllAliases(){return new Map(this.aliases)}isDefaultAlias(e){return this.defaultAliases.has(e)}resolve(e){const t=/^(\S+)/.exec(e);if(!t)return e;const n=t[1],r=this.aliases.get(n);if(r){const i=e.replace(/^(\S+)/,r);return this.resolveRecursive(i,10)}return e}resolveRecursive(e,t){if(t<=0)return e;const n=/^(\S+)/.exec(e);if(!n)return e;const r=n[1],i=this.aliases.get(r);if(i){const s=e.replace(/^(\S+)/,i);return this.resolveRecursive(s,t-1)}return e}}class eo{static parse(e){const t=e.trim();if(!t)return{command:"",args:[],raw:e};const n=this.splitCommand(t),r=n[0]?.toLowerCase()||"",i=n.slice(1);return{command:r,args:i,raw:e}}static splitCommand(e){const t=[];let n="",r=!1,i="",s=!1;for(const l of e){if(l==="\\"&&!s){s=!0;continue}if(s){n+=l,s=!1;continue}(l==='"'||l==="'")&&!r?(r=!0,i=l):l===i&&r?(r=!1,i=""):l===" "&&!r?n&&(t.push(n),n=""):n+=l}return n&&t.push(n),t}}class Kt extends Error{constructor(e){super(e),this.name="AppError",Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}}class ee extends Kt{constructor(e){super(e),this.name="FileSystemError"}}class Ol extends Kt{constructor(e){super(`Command not found: ${e}`),this.name="CommandNotFoundError"}}class Vt{static parse(e){const t=[];let n="",r=!1,i="";for(let l=0;l<e.length;l++){const a=e[l],d=l>0?e[l-1]:"";if((a==='"'||a==="'")&&d!=="\\")r?a===i&&(r=!1,i=""):(r=!0,i=a),n+=a;else if(a==="|"&&!r){const _=n.trim();_&&t.push(_),n=""}else n+=a}const s=n.trim();return s&&t.push(s),t}static hasPipe(e){let t=!1,n="";for(let r=0;r<e.length;r++){const i=e[r],s=r>0?e[r-1]:"";if((i==='"'||i==="'")&&s!=="\\")t?i===n&&(t=!1,n=""):(t=!0,n=i);else if(i==="|"&&!t)return!0}return!1}}class Ml{commands=new Map;registerCommand(e){this.commands.set(e.name.toLowerCase(),e),e.aliases&&e.aliases.forEach(t=>{this.commands.set(t.toLowerCase(),e)})}unregisterCommand(e){const t=e.toLowerCase(),n=this.commands.get(t);return n?(this.commands.delete(n.name.toLowerCase()),this.commands.forEach((r,i)=>{r===n&&this.commands.delete(i)}),!0):!1}async dispatch(e){const t=eo.parse(e);if(!t.command)return{output:""};const n=this.commands.get(t.command);if(!n)return{output:`${new Ol(t.command).message}
Type 'help' for available commands.`,error:!0};try{return await n.execute(t.args)}catch(r){return r instanceof Kt?{output:r.message,error:!0}:r instanceof Error?{output:`Error: ${r.message}`,error:!0}:{output:"An unknown error occurred.",error:!0}}}async dispatchPipeline(e){const t=Vt.parse(e);if(t.length===0)return{output:""};let n={output:""};for(let r=0;r<t.length;r++){const i=t[r],s=r===0?void 0:n.output,l=eo.parse(i);if(!l.command)return{output:""};const a=this.commands.get(l.command);if(!a)return{output:`Command not found: ${l.command}
Type 'help' for available commands.`,error:!0};try{if(n=await a.execute(l.args,s),n.error)return n}catch(d){return d instanceof Kt?{output:d.message,error:!0}:d instanceof Error?{output:`Error: ${d.message}`,error:!0}:{output:"An unknown error occurred.",error:!0}}}return n}getCommands(){const e=new Map;return this.commands.forEach((t,n)=>{t.name===n&&e.set(n,t)}),Array.from(e.values())}getCommandNames(){return Array.from(this.commands.keys())}}class Dl{constructor(e,t,n){this.dispatcher=e,this.aliasManager=t,this.envVarManager=n}dispatcher;aliasManager;envVarManager;async execute(e){const t=e.trim();if(!t)return{output:""};let n;Vt.hasPipe(t)?n=Vt.parse(t).map(d=>this.aliasManager.resolve(d.trim())).join(" | "):n=this.aliasManager.resolve(t);const r=this.envVarManager?this.envVarManager.expandVariables(n):n;return Vt.hasPipe(r)?await this.dispatcher.dispatchPipeline(r):await this.dispatcher.dispatch(r)}}class Pl{platformVars=new Map;userVars=new Map;fileSystem;constructor(e,t,n){this.fileSystem=e,this.initializePlatformVariables(t,n),this.loadUserVariables()}initializePlatformVariables(e,t){const n=`/home/${e}`;this.platformVars.set("HOME",n),this.platformVars.set("USER",e),this.platformVars.set("LOGNAME",e),this.platformVars.set("HOSTNAME",t),this.platformVars.set("PWD",n),this.platformVars.set("OLDPWD",""),this.platformVars.set("SHELL","/bin/dcsh"),this.platformVars.set("PATH","/usr/local/bin:/usr/bin:/bin"),this.platformVars.set("TERM","xterm-256color")}loadUserVariables(){try{const e=localStorage.getItem(xn.ENVIRONMENT);if(e){const t=JSON.parse(e);Object.entries(t).forEach(([n,r])=>{this.userVars.set(n,r)})}this.syncToFileSystem()}catch(e){console.warn("Failed to load environment variables from localStorage:",e)}}saveUserVariables(){try{const e={};this.userVars.forEach((t,n)=>{e[n]=t}),localStorage.setItem(xn.ENVIRONMENT,JSON.stringify(e)),this.syncToFileSystem()}catch(e){console.warn("Failed to save environment variables to localStorage:",e)}}syncToFileSystem(){try{const e=[];e.push("# Environment Variables"),e.push("# Platform variables (read-only):"),this.platformVars.forEach((n,r)=>{e.push(`${r}=${n}`)}),this.userVars.size>0&&(e.push(""),e.push("# User variables:"),this.userVars.forEach((n,r)=>{e.push(`export ${r}=${n}`)}));const t=e.join(`
`);this.fileSystem.writeFile(Ee.CONFIG_ENV,t)}catch(e){console.warn("Failed to sync environment variables to filesystem:",e)}}getVariable(e){return this.userVars.get(e)??this.platformVars.get(e)}setVariable(e,t){if(!/^[A-Z_][A-Z0-9_]*$/i.test(e))throw new Error(`Invalid variable name: ${e}`);this.userVars.set(e,t),this.saveUserVariables()}updatePlatformVariable(e,t){this.platformVars.has(e)&&this.platformVars.set(e,t)}unsetVariable(e){this.userVars.delete(e)&&this.saveUserVariables()}getPlatformVariables(){return new Map(this.platformVars)}getUserVariables(){return new Map(this.userVars)}getAllVariables(){const e=new Map;return this.platformVars.forEach((t,n)=>{e.set(n,t)}),this.userVars.forEach((t,n)=>{e.set(n,t)}),e}expandVariables(e){let t=e;return t=t.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/gi,(n,r)=>this.getVariable(r)??n),t=t.replace(new RegExp("(?<!\\\\)\\$([A-Z_][A-Z0-9_]*)","gi"),(n,r)=>this.getVariable(r)??n),t=t.replace(/\\\$/g,"$"),t}exportFormat(){const e=[];return this.getAllVariables().forEach((t,n)=>{e.push(`${n}=${t}`)}),e.sort()}}const Fl=`---
title: 'Building the Exact Graph Library I Needed'
date: '2025-09-20'
tags: ['open-source', 'visualization', 'typescript', 'ai-engineering', 'claude-code']
summary: 'Every graph library is either a massive toolkit or a heavyweight framework. I needed something specific: zero-dependency, SVG-based, force-directed, mobile-ready, under 30KB. So Claude Code and I built it in a week.'
---

Every graph visualization library makes the same trade-off. D3 (~90KB) gives you raw primitives and expects you to build everything yourself. Cytoscape (~170KB) gives you everything and expects you to carry the weight. I needed neither. I needed a focused, opinionated library that renders force-directed SVG graphs with touch support, dark mode, and nothing else. 28KB gzipped. Zero dependencies.

So I built <a href="https://github.com/darinc/svgnet" target="_blank" rel="noopener noreferrer">svgnet</a>. Check out the <a href="https://darinc.github.io/svgnet" target="_blank" rel="noopener noreferrer">project page</a>.

<div class="side-by-side-layout">
<div class="content-column">

## The Starting Point

A lunchtime prompt to Gemini Pro 2.5 produced a working prototype. SVG rendering, basic force-directed layout, functional but monolithic. It proved the concept: you don't need D3's entire ecosystem to draw nodes and edges.

That prototype became the specification. Over the next week, Claude Code and I rebuilt it into a production library through a series of deliberate engineering sprints. Not exploratory — directed. I made the architectural decisions, Claude handled the volume.

</div>
<div class="graph-column">

<div id="blog-graph-demo" class="graph-container" data-graph-src="/data/blog-graph-demo.json" style="width: 100%; height: 350px; border: 1px solid #333;"></div>

</div>
</div>

## Architecture Over Iteration

The prototype was a 1,500-line God Object. That's fine for a proof of concept. It's not fine for a library other people might use.

We broke it into a modular system: a physics engine, a renderer, an event bus, and a UI manager. Each component owns one concern. Dependency injection wires them together. The main class dropped by 70%.

Then we migrated the entire codebase to strict TypeScript, writing tests at every step. By the end of the first 24 hours of real work, we had 92 unit tests and a CI/CD pipeline.

## Hunting God Objects

AI-generated code has a specific failure mode: it loves God Objects. Claude Code built clean modules, but under pressure to ship features, several components bloated past 1,000 lines.

An audit prompt caught them all. We spent a full day on targeted decomposition:

- **3,300-line core class** → EventBus + dependency injection. 91% complexity reduction.
- **900-line renderer** → focused rendering managers. 78% reduction.
- **1,000-line event manager** → split by concern. 80% reduction.
- **800-line UI manager** → five focused components. 76% reduction.

The result: 466 passing tests across 38 modules. Every component testable in isolation.

## What You Get

svgnet does exactly what it's designed to do:

- **Force-directed layout** with configurable physics (damping, repulsion, attraction)
- **Multiple node shapes** — circle, rectangle, triangle, plus a factory pattern for custom shapes
- **Mobile-native** — pinch-zoom, drag, double-tap filtering. Not bolted on, built in.
- **Dark/light theming** via CSS custom properties
- **Layout persistence** — \`exportState()\` / \`importState()\` to save user arrangements
- **Directed and undirected edges** in the same graph, with optional arrowheads
- **28KB gzipped. Zero dependencies.**

If you need a general-purpose visualization toolkit, use D3. If you need a full graph analysis framework, use Cytoscape. If you need an opinionated, lightweight graph renderer that works on mobile — this is it.

## What AI-Assisted Engineering Actually Looks Like

There's no magic here. The week broke down into a pattern: I set the architectural direction, Claude Code executed at volume, I audited the output, we iterated.

The useful parts: TypeScript migration with tests at every step. Bulk API implementation. Consistent code style across 38 modules. The dangerous parts: God Objects, over-abstraction, feature creep. Every one of those required a human to catch and correct.

AI didn't replace the engineering. It compressed the timeline. A week of spare-time work, ~100 commits, and a library that does exactly one thing well.
`,Hl=Object.freeze(Object.defineProperty({__proto__:null,default:Fl},Symbol.toStringTag,{value:"Module"})),Ul=`---
title: 'A Love Letter to Developers (and the terminal)'
date: '2025-11-14'
tags: ['ai', 'claude-code', 'web-development', 'developers', 'terminal', 'craftsmanship', 'invention']
summary: "I'm an inventor and infra guy, not a front end developer. This is the story of how I built this complex terminal site by delegating the grunt work to an AI assistant.  It's a love letter to the global developer community whose collective code makes these new tools possible.  As of writing this blog post, this personal portfolio website has 1,218 unit tests which became the safety net for pure, creative speed."
---

Let's be clear: I build teams, infrastructure, and scale systems. I am _not_ a front end web developer. My days are spent on architecture and infrastructure, not CSS and DOM manipulation.

But I had this vision for my site: a perfect hommage to the terminal. A dual interface website that is both clickable _and also_ an emulated terminal with functioning command line.

In the past, a project like this would have died incomplete. I'd have gotten bogged down in a domain that isn't my specialty, and my vision would have stayed just a vision.

The fact that this site _exists_ is a testament to a new workflow. But more than that, this post is a love letter. **It's a love letter to all software developers**.

Why? Because these new AI coding assistants aren't magic. They are the distilled, collective knowledge of millions of the written human word and code written by developers. These models are trained on _our_ code, _our_ Stack Overflow answers, _our_ open source repositories, and _our_ best practices.

When I'm "pair programming" with an AI, I'm collaborating with a proxy for all developers and all of humanity. It's really incredible.

### Delegating the Grunt Work

I had the vision, but not the desire to spend weeks wrestling with DOM manipulation, CSS, and event listeners. This is the "grunt work" that, for me, can kill creative projects.

This is what I delegated to AI. I did not delegate the things I loved. I did not automate my job. I delegated the things that slow me down. I delegated the things that traditionally would have killed a side project like this.

My workflow became a high speed conversation. I spent my time on the _architecture_ and _invention_, while the AI handled the tedious implementation.

- **Me:** "I need a command parser and a virtual file system that can be hydrated from a JSON object."
- **AI:** _Generates the boilerplate and initial class structure in seconds._
- **Me:** "Great, works well. Now, write the \`ls\` command. Support flags like \`ls -al\`. Also add the \`tree\` command.
- **AI:** _Handles the implementation, including the async/await logic._
- **Me:** "Bug report: The command line flags can be together, seperate, or in any order."
- **AI:** _Goes about refactoring._
- **Me:** "Add comprehensive unit tests for the new features we just added."
- **AI:** _Writes a lot of unit tests._

I was able to stay in a state of pure creative flow, acting as the architect, while my "teammate", powered by all of you, did the work of a fast, expert front end developer.

### The 1,218-Test Safety Net

Now, let's talk about the **1,218 passing tests**. For a portfolio site, that's wonderfully absurd.

But here's the magic: _I didn't write any of them._ AI wrote the tests, I just guided and reviewed them. This was the second half of the "grunt work" delegation. My AI teammate, directed by me, built the safety net _while_ it built the features.

This changes _everything_ about the creative process. The 1,218 tests aren't a chore; they are the **engine of my creativity**. They give me a real time, instantaneous feedback loop.

I can try a crazy new feature, run \`npm test\`, and know _immediately_ if this latest change broke a core function. I can be an inventor because the AI is being the QA engineer. It's a high speed, high confidence workflow that I've never experienced before.

### A New Baseline for Creation

This workflow is what I'm truly excited about. It's a new baseline where:

- **Quality becomes the default**, not the aspiration.
- **Best practices are accessible** to everyone, not just senior engineers.
- **Iteration speed** increases without sacrificing craftsmanship.
- **Learning never stops** because every project teaches you something new.

This is my love letter to this new way of working. But really, it's a thank you note to the entire developer community. It's _your_ collective work that powers these tools.

You gave me the freedom to be a creator, an architect, and an inventor, even in a domain that isn't my specialty, all while ensuring the final product is built on a rock solid foundation.

Welcome to my terminal.

---

_Want to explore? Try typing \`help\` in the terminal above to see what this site can do._

_Want to really use AI? Ask it questions, ask it to review code and ask "What questions should I ask myself? What can I do to make this code better?"_
`,Bl=Object.freeze(Object.defineProperty({__proto__:null,default:Ul},Symbol.toStringTag,{value:"Module"})),Wl=`---
title: 'How We Trick Rocks Into Thinking'
date: '2025-11-15'
tags: ['computers', 'musings', 'memes', 'invention']
summary: 'A short meditation on the absurd marvel that is computing.  Tricking rocks to think by flattening them and adding lightning.  Exploring the tower of abstractions from physics to code.'
---

There's a meme that's been bouncing around the internet for years:

> "If you ever code something that feels like a hack but it works, just remember that a CPU is literally a rock that we tricked into thinking."

And then the follow-up:

> "Not to oversimplify: first you have to flatten the rock and put lightning inside it."

## The Marvel We Take for Granted

We take beach sand, purify it, flatten it into wafers, etch microscopic patterns onto it with light, dope it with impurities, and then run electricity through it in very specific patterns.

And, almost magically, this creates circuits that:

- Run programs, apps, cars, elevators, planes, rockets, and power plants.
- Encapsulate data into packets and send them across radio waves
- Connect billions of people across the planet
- Augment our abilities
- Store our memories
- Simulate entire universes
- Generate art, music, and conversations
- Help us land robots on other planets

## The Stack of Marvels

Every time you write code, you're standing on top of the most ridiculous tower of abstractions:

1. **Physics** - electrons moving through silicon
2. **Transistors** - switches made from semiconductor magic
3. **Logic gates** - AND, OR, NOT built from transistors
4. **CPU instructions** - arithmetic and memory operations
5. **Assembly** - human-readable machine code
6. **Operating systems** - managing the chaos
7. **High-level languages** - C, Java, Go, Python, Javascript, TypeScript, Rust
8. **Frameworks** - abstractions on abstractions
9. **Your code** - solving real problems

And at the very bottom? Rocks with lightning in them.

## Why This Still Matters

In our day-to-day work, we deal with bugs, deadlines, technical debt, and production incidents. We can get frustrated when things don't work. We can take for granted the commands and code we type onto our keyboards somehow influences this entire stack of "turtles all the way to down" make pixels appear on a screen and for machines to follow our instructions.

But sometimes it's worth stepping back and appreciating the sheer _impossibility_ of what we do.

The next time you're dealing with a production incident, or debugging a gnarly issue at 11 PM, or refactoring legacy code, or wrestling with a complex algorithm, remember:

You're not just pushing electrons around.

You're instructing thinking rocks to do work.

And that's pretty damn magical.

---

_P.S. Yes, modern CPUs are made from highly purified silicon with intricate manufacturing processes involving photolithography, chemical vapor deposition, ion implantation, and other incredibly sophisticated techniques. Check out this video! <a href="https://www.youtube.com/watch?v=9RZreu5z_Gc" target="_blank" rel="noopener noreferrer">ASML lithography</a>. At the end of the day? We flattened some rocks and put lightning in them. And they think._
`,Gl=Object.freeze(Object.defineProperty({__proto__:null,default:Wl},Symbol.toStringTag,{value:"Module"})),zl=`---
title: '1337 Unit Tests: Leet Status Unlocked'
date: '2025-11-23'
tags: ['testing', 'claude-code', 'craftsmanship', 'fun', 'developer-experience']
summary: 'I had 1,333 unit tests. I needed exactly 4 more to achieve leet status. Claude Code delivered with surgical precision.'
---

I have a problem. I have an absurd number of unit tests. **1,333**, to be precise.

![Starting from 1,333 unit tests](/images/blog/add-exactly-4-more-unit-tests/1333-unit-tests.png)

But this is an 'off by 4 error'. The opportunity to reach 'leet' tester status is just 4 unit tests away

## The Ask

Time to task Claude Code to write exactly 4 more unit tests. No less, no more. (It would have been epic if the number of the counting shall be three... but I can only ask the universe for so much nerd convergence.)

I gave Claude Code a very specific mission: add exactly 4 unit tests. No more, no less.

![Asking Claude Code to add exactly 4 unit tests](/images/blog/add-exactly-4-more-unit-tests/claude-add-exactly-4-unit-tests.png)

## Achievement Unlocked

![Exactly 1,337 unit tests achieved](/images/blog/add-exactly-4-more-unit-tests/1337-unit-tests.png)

**1,337 passing tests.**

Leet status: achieved.

## Why This Matters

Is this absurd? Absolutely.

Is it unnecessary? Completely.

In my [love letter to developers](/blog/2025-11-14-a-love-letter-to-developers-and-the-terminal), I talked about how AI gives us a safety net that enables pure creative speed. This is the flip side: it also enables pure creative _joy_.

I can ask for exactly 4 tests, and get exactly 4 tests. I can pursue absurd goals just for the craft of it. I can celebrate hitting 1,337 because it makes me happy.

---

_P.S. Yes, I know 1,337 tests for a portfolio site is wonderfully absurd. But if you're going to be absurd, you might as well be precise about it._
`,Vl=Object.freeze(Object.defineProperty({__proto__:null,default:zl},Symbol.toStringTag,{value:"Module"})),jl=`---
id: hypergrowing-a-unicorn
title: 'Scaling a Unicorn: Infrastructure, Culture, and the IPO Journey'
summary: 'The challenge: maintaining engineering culture while rocketing from startup to IPO. This is how I built the core infrastructure teams that supported growth from 30 to 350+ engineers, drove a $3B+ valuation, and saved millions through architectural optimization.'
technologies: ['Kubernetes', 'AWS', 'DevOps', 'Automation', 'SRE']
impact: 'Scaled engineering org 10x through IPO. Reduced cloud spend by 40% during COVID lock downs. Established lasting culture pillars including biweekly tech talks and hackathons.'
year: '2018-2022'
order: 1
tags: ['unicorn', 'infrastructure', 'leadership', 'scaling', 'kubernetes', 'mentoring', 'culture']
---

## IPO Growth Journey

I built and led the Infrastructure and Data Infrastructure teams through a period of explosive hypergrowth: 400→4,000+ employees and **30→350+ engineers**. We took the company from a $191M valuation through an IPO to a $3B+ public entity. To support this, I helped architect a production Kubernetes platform from scratch, ensuring infrastructure was an enabler, not a bottleneck.

## Culture at Scale

Hypergrowth often kills culture. To prevent this, I launched **ACV Tech Talks**: a biweekly learning program by engineers, for engineers. Over three years, **75 different engineers gave 128+ talks** on topics ranging from Vim to Machine Learning. I personally presented 12 talks (including K8s autoscaling and blameless postmortems) and served as a pivotal sponsor for our 24-hour internal hackathons. These initiatives ensured we remained a learning organization even at scale.

## Cost Optimization & Migration

When COVID-19 impacted the auto industry, swift fiscal action was required. I led the infrastructure team to **reduce our multi-cloud spend by 40%** through aggressive resource optimization and autoscaling logic. Simultaneously, we internalized a massive migration of an acquired company's on-prem stack to the cloud. Originally scoped for an outsourced firm at >$1M, my team completed the migration with **half the headcount and one-third of the budget**, moving the entire stack to AWS with zero downtime.

## Infrastructure Platform

We didn't just run servers; we built a product for our developers. I oversaw the creation of a comprehensive K8s platform featuring Jenkins CI/CD automation, infrastructure-as-code, and scale-ready monitoring. This multi-tenant system allowed 350+ engineers to ship continuously, effectively decoupling deployment speed from infrastructure complexity.
`,Yl=Object.freeze(Object.defineProperty({__proto__:null,default:jl},Symbol.toStringTag,{value:"Module"})),ql=`# Darin Chambers

**Technologist, Inventor | Building What's Next on Rock-Solid Foundations**

---

With 30+ years of experience in the technology industry, I specialize in building innovative solutions that push the boundaries of what's possible while maintaining the reliability and robustness that enterprise systems demand.

## Expertise

- Software Engineering & Development
- Technical Leadership & Innovation
- Artificial Intelligence & Machine Learning
- Distributed Systems Architecture
- Developer Tools & Platforms

## Experience

Throughout my career, I've led teams, architected complex systems, and built products that have impacted millions of users. My work spans from cutting-edge AI/ML applications to rock-solid infrastructure that powers critical business operations.

## Philosophy

I focus on the bridge between "what's possible" and "what's practical," ensuring that visionary concepts are realized as dependable, real-world solutions. The future is built by those who understand both the art of the possible and the science of the reliable.

---

**Next Steps:** Type \`portfolio\`, \`blog\`, or \`notes\` to see more information or \`contact\` to get in touch.
`,Xl=Object.freeze(Object.defineProperty({__proto__:null,default:ql},Symbol.toStringTag,{value:"Module"})),Kl=`# Contact Information

## Get in Touch

- Email: <a href="#" class="email-protected" data-user="hello" data-domain="darinchambers.com">hello@darinchambers.com</a>
- LinkedIn: [linkedin.com/in/darinchambers](https://www.linkedin.com/in/darinchambers)
- GitHub: [github.com/darinc](https://github.com/darinc)
- Blog: [darinchambers.com/blog](https://darinchambers.com/blog)

Location: United States / Eastern Time

---

## Availability

I love working with people on bold projects and quirky ideas. Feel free to reach out and tell me about yourself and what you are working on!

## Preferred Contact Method

Email or LinkedIn is the best first contact method.
`,Zl=Object.freeze(Object.defineProperty({__proto__:null,default:Kl},Symbol.toStringTag,{value:"Module"})),Jl='# Terminal Help\n\nWelcome to my interactive terminal! This is a Unix-like command-line interface where you can explore my work and read my blog.\n\n## Getting Help\n\n- **`help`** - Show this help message\n- **`help <command>`** - Show detailed help for a specific command\n- **`man`** - Display manual pages for commands\n- **`<command> --help`** - Show detailed help for any command\n\n**Example:** `help ls` or `ls --help`\n\n## Available Commands\n\n### Content & Navigation\n\n- **`about`** - Learn about my background and expertise\n- **`portfolio`** - View my projects and accomplishments\n- **`blog`** - Read my blog posts and articles\n- **`notes`** - Short-form notes and thoughts\n- **`contact`** - Get in touch with me\n- **`changelog`** - View project version history\n\n### File System\n\n- **`ls`** - List directory contents\n- **`cd`** - Change directory\n- **`pwd`** - Print working directory\n- **`cat`** - Display file contents\n- **`tree`** - Show directory structure\n- **`mkdir`** - Create directories\n- **`rm`** - Remove files or directories\n- **`rmdir`** - Remove empty directories\n- **`render`** - Render markdown files\n\n### Core Utilities\n\n- **`echo`** - Display text\n- **`date`** - Show current date/time\n- **`clear`** - Clear the screen\n- **`history`** - Show command history\n- **`alias`** - Create command shortcuts\n- **`whoami`** - Display current user\n- **`which`** - Show path of commands\n\n### Novelty\n\n- **`figlet`** - ASCII art text banners\n- **`lolcat`** - Rainbow-colorize text output\n- **`ddate`** - Discordian calendar date\n- **`matrix`** - Matrix digital rain animation\n- **`life`** - Conway\'s Game of Life\n- **`boot`** - Simulated Linux boot sequence\n- **`shutdown`** - Simulated Linux shutdown\n- **`reboot`** - Full reboot animation\n- **`bsod`** - Fake Windows Blue Screen of Death\n\n## Quick Start\n\nTry these commands to explore:\n\n```\nabout           # Learn about me\nportfolio       # See my work\nblog            # Read my posts\nnotes           # Short-form thoughts\ntree            # Explore the file structure\nls ~            # List home directory\n```\n\n## Advanced Features\n\n**Command Piping:** Chain commands with `|`\n\n```\ncat ~/blog/post.md | render\necho "Hello" | figlet\nfiglet "Hi" | lolcat\n```\n\n**Navigation:** Use arrow keys for command history, Tab for auto-complete\n\n**Aliases:** Create shortcuts with `alias ll=\'ls -la\'`\n\n---\n\n**Tip:** For detailed help on any command, use `<command> --help` or `help <command>`\n',Ql=Object.freeze(Object.defineProperty({__proto__:null,default:Jl},Symbol.toStringTag,{value:"Module"})),ec=`# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.27.3] - 2026-06-13

### Changed
- Blog post URLs no longer carry the numeric sequence prefix (e.g. \`/blog/01-foo\` is now \`/blog/foo\`)

### Fixed
- Prerendering fails the build loudly when an HTML injection marker is missing, instead of silently shipping pages without meta tags or SEO content
- A single malformed content file is now skipped with a warning rather than aborting the whole prerender build
- The empty \`/notes\` section is no longer prerendered or listed in the sitemap until a note exists

### Removed
- Unused \`sanitizeHtmlCustom\` helper

## [0.27.2] - 2026-06-13

### Accessibility
- Honor the \`prefers-reduced-motion\` setting: the auto-firing screensaver is suppressed, the matrix rain renders a static frame, and non-essential CSS animations/transitions are neutralized
- Tab and Shift+Tab can now move focus out of the command input instead of being trapped (Tab is only captured for completion when there is text to complete)
- Added visible keyboard focus indicators to all interactive settings controls (theme buttons, sliders, checkboxes, selects, color pickers, reset button, and collapsible sections)

## [0.27.1] - 2026-06-13

### Fixed
- GitHub Pages deploy now runs only after CI succeeds, so production no longer ships from a failing build
- Restored the 80% branch-coverage gate with added tests for content formatting, prompt formatting, the virtual filesystem, and routing

### Security
- Content-Security-Policy is now delivered to production via a build-time meta tag (GitHub Pages does not honor \`_headers\`)
- Updated dompurify from 3.3.0 to 3.4.10 to patch a known mXSS advisory

## [0.27.0] - 2026-03-21

### Added
- Build-time prerendering for SEO and AI crawler access — generates static HTML pages with semantic content, per-page meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- Auto-generated sitemap.xml from discovered content at build time
- Hidden semantic HTML (\`seo-content\` class) so crawlers get real content while humans get the terminal experience

### Removed
- Static \`public/sitemap.xml\` replaced by auto-generated version

## [0.26.5] - 2026-03-21

### Changed
- Default dev server port changed from 5173 to 5175 to avoid port conflicts

## [0.26.4] - 2026-03-21

### Fixed
- \`sudo <cmd> | render\` now works when unauthenticated — pipeline waits for password flow to complete
- Sudo command returns proper \`CommandResult\` through normal rendering pipeline instead of calling \`showResult\` directly

## [0.26.3] - 2026-03-21

### Fixed
- \`.settings\` and \`.env\` files now show correct file sizes in \`ls -la\` instead of 0B
- \`writeFile()\` now sets size, permissions, owner, and modifiedTime metadata on file nodes

## [0.26.2] - 2026-03-06

### Fixed
- Empty notes message now says "No notes yet" instead of "No posts yet"

## [0.26.1] - 2026-03-06

### Changed
- Rename \`posts\` command to \`notes\` for clarity (avoids verb/noun ambiguity)
- Update routes from \`/post\` to \`/notes\`, navigation labels, and all user-facing text

## [0.26.0] - 2026-03-06

### Added
- Clickable command names in help and about pages via \`data-command\` links
- \`ContentFormatter.makeCommandsClickable()\` for post-processing rendered HTML
- Hover glow effect on clickable command code spans

## [0.25.0] - 2026-03-06

### Added
- \`notes\` command for short-form content with tag filtering, list/detail views
- Multi-platform \`posted\` links (LinkedIn, X, etc.) with external link rendering
- Posts integrated into navigation, routing, help, and virtual filesystem

## [0.24.0] - 2026-03-06

### Added
- Fullscreen mode for boot, shutdown, and reboot sequences (hides header, nav, and input)
- Scheduled command support for chaining commands with delays (used by reboot → boot)
- Auto-exit fullscreen when boot sequence reaches welcome message

### Changed
- Reboot now runs as two-phase sequence: shutdown with pause, then clear and boot from clean screen

## [0.23.0] - 2026-01-22

### Added
- changelog command to view project version history with version lookup and filtering
- CHANGELOG.md accessible in virtual filesystem at ~/CHANGELOG.md
- ChangelogParser utility for Keep a Changelog format parsing

## [0.22.1] - 2026-01-21

### Fixed
- Consistent font weight between command history and live input
- Input focus maintained after piped commands complete
- Scroll jump on piped commands prevented via overflow-anchor

## [0.22.0] - 2026-01-21

### Added
- rm command for removing files and directories with -r and -f flags
- Melt screen effect easter egg triggered by \`rm -rf /\`
- Command unregistration when deleting files from /usr/bin or /usr/local/bin

### Fixed
- Command history prompt alignment (removed extra space after prompt)

## [0.21.0] - 2026-01-20

### Added
- boot, shutdown, and reboot commands for nostalgic system simulation
- BSOD command with modern Windows 10/11 and classic XP/NT styles
- Animated boot sequences with BIOS POST, kernel messages, and service initialization

## [0.19.0] - 2026-01-20

### Added
- lolcat command for rainbow-colorizing text output
- Support for piping (e.g., \`figlet "Hi" | lolcat\`)
- Configurable spread and frequency options for color cycling

## [0.18.1] - 2026-01-20

### Changed
- Unified documentation metrics (test coverage, bundle size, file counts)
- Synchronized CLAUDE.md with automated update-docs script

## [0.18.0] - 2025-12-09

### Added
- Automatic screensaver content clearing on user interaction
- Screensaver output tracking in TerminalOutput component
- Animation cleanup when screensaver is dismissed

### Changed
- Screensaver now clears immediately on key press or mouse click

## [0.17.0] - 2025-12-08

### Added
- Conway's Game of Life screensaver with configurable speed, density, and patterns
- URL route support for /life command
- Viewport-based canvas sizing for full-screen animations

### Fixed
- Canvas element sanitization in HTML output
- Screensaver type validation to include life option

## [0.16.0] - 2025-12-07

### Added
- Test coverage percentage tracking in documentation update script
- Screensaver constants tracking from source code
- Gzipped bundle size notation in documentation metrics

### Changed
- Enhanced update-docs.js with automatic CLAUDE.md synchronization

## [0.15.0] - 2025-12-07

### Added
- Screensaver system with configurable inactivity timeout (default 5 minutes)
- Matrix digital rain as first screensaver with automatic activation after idle period
- Activity monitoring for keyboard, mouse, and touch events with smart debouncing
- Screensaver settings in settings UI and CLI (enable/disable, timeout 1-60 minutes, type selection)
- Page Visibility API integration to pause screensaver when tab is hidden

## [0.14.3] - 2025-12-07

### Fixed
- ESLint configuration for scripts directory to lint as Node.js JavaScript without TypeScript type-checking errors

## [0.14.2] - 2025-12-07

### Added
- Automated documentation update script to sync metrics across README, ARCHITECTURE, and CLAUDE documentation files
- New \`pnpm update-docs\` command for on-demand documentation synchronization

### Changed
- Integrated documentation updates into \`/finalize\` workflow as automatic first step
- Corrected documentation metrics (command count 22→25, bundle size ~120KB→~82KB)

## [0.14.1] - 2025-12-07

### Changed
- Refactored CSS to use CSS variables for spacing and line-height values
- Replaced hardcoded pixel values with semantic spacing tokens (--spacing-xs through --spacing-2xl)
- Improved responsive design consistency across mobile and desktop viewports

## [0.14.0] - 2025-11-25

### Added
- New \`which\` command to locate commands and display their virtual filesystem paths
- Support for \`-a\` flag to show all matching paths including aliases
- Alias resolution showing shell-style output (e.g., \`ll: aliased to ls -alh\`)

## [0.13.5] - 2025-11-24

### Changed
- Standardized documentation to use approximate metrics instead of exact counts
- Updated all .md files to use ranges (1,000+ tests, 50+ files, 80%+ coverage) to reduce maintenance burden

### Added
- Added echo and matrix commands to virtual filesystem for better discoverability

## [0.13.4] - 2025-11-23

### Fixed
- Mobile viewport handling to prevent header from staying hidden after keyboard dismissal
- iOS Safari auto-zoom when focusing terminal input by enforcing 16px minimum font size
- Terminal input not receiving focus on mobile when clicking navigation links

### Changed
- Updated CSS to use dynamic viewport height (100dvh) for better mobile keyboard support
- Added Visual Viewport API listener to restore scroll position after mobile keyboard dismissal

## [0.13.3] - 2025-11-23

### Fixed
- Matrix command animation accelerating with repeated executions

## [0.13.2] - 2025-11-23

### Fixed
- Corrected typo in "A Love Letter to Developers and the Terminal" blog post

## [0.13.1] - 2025-11-23

### Fixed
- Prettier configuration now preserves frontmatter formatting in markdown files
- Blog post tags arrays no longer wrap to multiple lines

## [0.13.0] - 2025-11-23

### Added
- New blog post: "1337 Unit Tests: Leet Status Unlocked"
- Blog post images directory structure (\`public/images/blog/\`)
- Responsive image CSS rules for markdown content
- \`width\` and \`height\` attributes to sanitizer allowlist

## [0.12.5] - 2025-11-23

### Fixed
- Removed unused \`header\` variable in Header component tests

## [0.12.4] - 2025-11-23

### Added
- Unit tests for Header component covering rendering, sanitization, and event handling

### Changed
- Header component now has 100% test coverage

## [0.12.3] - 2025-11-23

### Fixed
- GitHub Actions workflows now use pnpm instead of npm
- Package.json scripts now use pnpm commands

## [0.12.2] - 2025-11-23

### Changed
- Exclude novelty commands (ddate, discordian) from test coverage requirements

## [0.12.1] - 2025-11-23

### Fixed
- Portfolio command now accepts numeric indices (e.g., \`portfolio 1\`)
- Updated portfolio help text to document numeric access

## [0.12.0] - 2025-11-23

### Added
- @eslint/js dependency for ESLint configuration

### Changed
- Migrated package manager from npm to pnpm
- Updated all documentation to reflect pnpm usage

### Removed
- @types/dompurify dependency (dompurify provides its own types)
- @types/marked dependency (marked provides its own types)

### Fixed
- Linting warnings in Terminal component tests

## [0.11.5] - 2025-11-23

### Added
- GitHub Pages deployment configuration with automatic CI/CD
- SPA routing support via 404.html redirect workaround
- Manual deployment script using gh-pages package

### Changed
- Switched deployment platform from Cloudflare Pages to GitHub Pages
- Updated documentation to reflect GitHub Pages setup and configuration

## [0.11.4] - 2025-11-23

### Added
- Portfolio entry for scaling infrastructure at unicorn startup through IPO journey

### Changed
- Blog post frontmatter formatting to single-line tags array

## [0.11.3] - 2025-11-23

### Added
- Comprehensive test coverage for Terminal component
- Comprehensive test coverage for EnvVarManager utility
- Comprehensive test coverage for contact command

### Changed
- Branch coverage improved from 70.33% to 74.53%
- Overall test suite expanded from 1,248 to 1,326 tests

## [0.11.2] - 2025-11-22

### Fixed
- Updated js-yaml dependency to fix prototype pollution vulnerability
- Consolidated AUDIT.md to focus on current status and actionable items

### Changed
- Streamlined audit report from detailed implementation history to concise summary

## [0.11.1] - 2025-11-22

### Changed
- Updated API.md with current interface signatures and type definitions
- Updated ARCHITECTURE.md with accurate statistics and component documentation
- Updated SECURITY.md with correct security layer descriptions

### Removed
- Removed TEST.md (testing plan complete, all goals achieved)

## [0.11.0] - 2025-11-22

### Added
- JavaScript-based email obfuscation to protect contact email from bots
- EmailProtection utility with click handler and keyboard accessibility
- Comprehensive test suite for email protection functionality

## [0.10.21] - 2025-11-22

### Changed
- Updated CSP header to allow mailto links in form-action directive
- Improved contact page formatting with proper markdown list syntax
- Fixed navigation text in about page to reference blog

## [0.10.20] - 2025-11-22

### Changed
- Enhanced static asset routing in redirects configuration
- Updated repository URLs in documentation

### Removed
- Removed placeholder portfolio content files

## [0.10.19] - 2025-11-21

### Changed
- Simplified README from 285 to 114 lines
- Removed all emojis from README headers
- Fixed inaccuracies in test counts and flag names

## [0.10.18] - 2025-11-21

### Added
- SEO: robots.txt and sitemap.xml for search engine crawling
- Social sharing: Open Graph and Twitter Card meta tags

### Fixed
- README version badge now matches package.json

## [0.10.17] - 2025-11-21

### Added
- Friendly empty state messages for portfolio and blog commands
- Tag filter suggestions showing top 5 popular tags when no results found
- Unit tests for portfolio and blog empty state handling

### Changed
- Centralized user-facing messages in constants for consistency

## [0.10.16] - 2025-11-18

### Fixed
- Blog command now uses \`--tags\` flag (plural) to match portfolio command
- Fixed type handling bug that caused error when calling \`blog --tags\` without a value
- Tag listing now displays all blog tags with counts when using \`blog --tags\`

### Changed
- Updated all documentation and examples to use \`blog --tags\` instead of \`blog --tag\`

## [0.10.15] - 2025-11-18

### Changed
- Improved blog post content and grammar
- Enhanced clarity in technical writing

## [0.10.14] - 2025-11-18

### Added
- SVG Graph Network library integration for blog post demos
- Demo graph data files for command tree and library features visualization

## [0.10.13] - 2025-11-16

### Fixed
- Blog post URLs now update correctly when typing commands like "blog we-trick-rocks-into-thinking"
- Clicking blog links in content now updates URL and navigation state
- Improved scroll-to-top reliability for direct URL navigation to blog posts

### Changed
- Router now validates blog post existence before generating URLs
- Terminal click handler integrates with router for proper navigation

## [0.10.12] - 2025-11-16

### Added
- Portfolio summary field for concise project descriptions
- Portfolio order field for manual sorting control
- Auto-import blog, portfolio, and content files using Vite's import.meta.glob()
- Comprehensive unit tests for dynamic file loading methods

### Changed
- Portfolio entries now display with summary instead of full description in list view
- Portfolio sorted by order field (ascending) instead of alphabetically
- Blog post summaries expanded by 50%
- FileSystemInitializer now discovers markdown files dynamically instead of hardcoded imports
- Added vite/client, node, and figlet types to tsconfig.json

## [0.10.11] - 2025-11-11

### Fixed
- Portfolio metadata (Technologies, Impact, Tags) now properly separated on individual lines
- Updated test to reference correct blog post filename with numeric prefix

## [0.10.10] - 2025-11-11

### Changed
- Added consistent indentation to detail pages (blog posts, portfolio items, about page)
- Portfolio titles now clickable without separate "View Details" link
- Fixed tag paragraphs to not be indented

## [0.10.9] - 2025-11-11

### Changed
- Blog post filenames now use numeric prefixes for same-day ordering
- Blog tags use hyphens for multi-word tags
- DC theme colors updated for WCAG AA accessibility compliance
- Green and White themes now have distinct accent colors
- Improved spacing and indentation in blog list view

## [0.10.8] - 2025-11-11

### Changed
- Increased vertical spacing between blog posts in list view

## [0.10.7] - 2025-11-11

### Added
- Recursive alias resolution with maximum depth protection
- Per-stage alias resolution in command pipelines

### Fixed
- Pipeline detection now occurs after alias expansion
- Tree command test assertions to check all output lines
- Missing helper function imports in integration tests

## [0.10.6] - 2025-11-11

### Fixed
- Alias resolution now occurs before environment variable expansion
- Escaped quotes in command parser now handled correctly
- Settings persistence to localStorage when changing theme
- Mock filesystem now includes readme.md in home directory

### Added
- createDirectory method to IFileSystem interface and FileSystemService

## [0.10.5] - 2025-11-11

### Fixed
- Settings command now accepts both camelCase and hyphenated syntax
- Test expectations aligned with actual settings structure
- Theme names updated to valid values in tests
- Settings file path references corrected across tests

## [0.10.4] - 2025-11-10

### Fixed
- Settings command registration with correct parameters in integration tests
- Pipeline execution error message patterns to match actual implementation
- History command tests to check all output lines instead of just last line
- localStorage mock to prevent double initialization
- Storage keys changed to use underscores for consistency with tests

## [0.10.3] - 2025-11-10

### Fixed
- Integration test cd command registration to properly update PWD environment variable
- Mock filesystem now includes content directory with about, contact, and help files
- Integration tests now use Terminal's internal TerminalInput for proper history tracking

### Changed
- Removed target="_blank" attribute from markdown link rendering

## [0.10.2] - 2025-11-10

### Fixed
- Integration test environment setup with scrollIntoView mock for jsdom
- Terminal input now clears after command execution in programmatic calls
- Settings command shorthand syntax now accepts direct setting names
- Mock filesystem includes blog and portfolio directories

### Added
- Target blank attribute to markdown links for external navigation

## [0.10.1] - 2025-11-10

### Fixed
- Alias manager unit tests to account for default alias
- Router URL mocking in jsdom for navigation tests
- Cat command now reads from stdin in pipelines

### Added
- Integration test helpers with complete terminal setup
- Mock filesystem with /home/guest directory for alias storage

## [0.10.0] - 2025-11-10

### Added
- Tab completion for file paths in commands like cat, cd, and ls
- Default alias ll for ls -alh command

### Changed
- Settings label shortened from "Background (Secondary)" to "BG (Secondary)"

## [0.9.0] - 2025-11-10

### Added
- Clickable header ASCII art that clears terminal when clicked
- Visual hover and active states for header interaction

## [0.8.1] - 2025-11-10

### Fixed
- Scroll behavior now works correctly for long content by using double requestAnimationFrame
- Replaced manual scroll calculations with browser-native scrollIntoView for reliability
- Removed complex auto-detection logic in favor of explicit scrollBehavior flags

## [0.8.0] - 2025-11-10

### Added
- Smart scroll behavior for long content with auto-detect feature flag
- Autoscroll setting to toggle between smart mode and classic scroll-to-bottom
- Commands with explicit scrollBehavior control (blog, portfolio, about, tree)

### Changed
- Long content now scrolls to command line instead of bottom for natural reading flow
- Short content continues using classic scroll-to-bottom behavior

## [0.7.0] - 2025-11-10

### Added
- Google Fonts loading for Fira Code and JetBrains Mono for universal coverage
- Updated CSP to allow fonts.googleapis.com and fonts.gstatic.com

### Changed
- Font stack now prioritizes Fira Code and JetBrains Mono for better readability
- Default font changed from Courier New to Fira Code
- Removed SF Mono and Consolas from font options

## [0.6.1] - 2025-11-09

### Fixed
- Matrix animation no longer speeds up when running the command multiple times
- Previous matrix animations are now properly stopped (both JavaScript and CSS)

## [0.6.0] - 2025-11-09

### Added
- URL-based tag filtering with query parameters for portfolio command
- Clickable tag buttons throughout portfolio and blog displays
- Clickable navigation links for all "Read Post" and "View Details" actions

### Changed
- Router now supports query parameter parsing for enhanced navigation
- All back navigation links converted to proper clickable hyperlinks

## [0.5.0] - 2025-11-09

### Added
- Matrix command now updates browser URL and history
- Direct URL access support for matrix command (/matrix)

## [0.4.1] - 2025-11-09

### Removed
- Outdated audit documentation files
- Duplicate test plan file (test-md.md)
- Incorrect project template (.CLAUDE.md)

### Fixed
- ESLint warnings for nullish coalescing in matrix animation

## [0.4.0] - 2025-11-07

### Added
- Matrix digital rain animation command with CSS-based animations
- Support for --speed flag to control animation speed (0.1-5.0x)
- Support for --theme flag to override current terminal theme
- Auto-detection of terminal dimensions for responsive display

## [0.3.1] - 2025-11-07

### Fixed
- Text selection now persists when copying content from terminal output
- Click handler no longer clears selection when user finishes selecting text

## [0.3.0] - 2025-11-07

### Added
- Universal --help flag support across all 24 commands
- help command now supports 'help <command>' syntax

### Changed
- Redesigned help.md to focus on command discovery (reduced from 142 to 69 lines)
- All error messages now include helpful "Try '<command> --help'" hints
- Standardized help output format across all commands

## [0.2.1] - 2025-11-06

### Fixed
- All ESLint errors and warnings in codebase
- Type safety issues with unsafe assignments and template expressions
- Floating promises in event handlers and async callbacks
- Import ordering and code style inconsistencies

## [0.2.0] - 2025-11-06

### Added
- ESLint with TypeScript support for code quality enforcement
- Prettier for automatic code formatting
- Husky pre-commit hooks with lint-staged for automated checks
- GitHub Actions CI/CD workflows for testing, building, and deployment

### Changed
- Formatted entire codebase with Prettier
- Created separate tsconfig.build.json for production builds

### Fixed
- TypeScript focus() errors in Terminal component

## [0.1.4] - 2025-11-06

### Changed
- Added comprehensive header comments to all 22 command files
- Updated AUDIT.md to reflect complete command documentation coverage

## [0.1.3] - 2025-11-06

### Fixed
- Navigation buttons now properly clear terminal scrollback history when clicked

## [0.1.2] - 2025-11-06

### Changed
- Upgraded @types/node from 22.19.0 to 24.10.0
- Verified compatibility with Node.js 24.x type definitions

## [0.1.1] - 2025-11-06

### Fixed
- Settings UI now displays interactive controls properly after DOMPurify sanitization
- Added form elements and semantic HTML tags to sanitizer allowlist
- Added data-* and aria-* attributes to maintain CSP-compliant event delegation

## [0.1.0] - 2025-11-06

### Changed
- Upgraded Vite from 6.0.11 to 7.2.1
- Updated build target from es2015 to baseline-widely-available for modern browsers
- Build now targets Chrome 107+, Firefox 104+, Safari 16+

## [0.0.61] - 2025-11-06

### Changed
- Updated vitest, @vitest/coverage-v8, @vitest/ui from 4.0.4 to 4.0.7
- Updated jsdom from 27.0.1 to 27.1.0
- Updated @types/node from 22.18.12 to 22.19.0
- Deferred Vite 7 and @types/node 24 major updates to dedicated upgrade cycle

## [0.0.60] - 2025-11-06

### Added
- Complete documentation suite including README.md, ARCHITECTURE.md, API.md, CONTRIBUTING.md, DEPLOYMENT.md, and SECURITY.md
- Comprehensive project overview with installation, commands, and development workflow
- System architecture documentation with design patterns and data flow diagrams
- API reference with examples for extending commands and features

### Changed
- Updated AUDIT.md to reflect Cloudflare Pages deployment platform
- Documentation status upgraded from missing to comprehensive

## [0.0.59] - 2025-11-06

### Added
- Theme-adaptive CSS variables for transparent accent colors (5%, 10%, 15%, 30% opacity)

### Fixed
- Paper theme color contrast to meet WCAG AA standards (dim: #666666, accent: #007298)
- Hardcoded green rgba colors replaced with theme-adaptive variables across all CSS files

### Changed
- All background highlights now automatically adapt to active theme

## [0.0.58] - 2025-11-06

### Added
- Comprehensive ARIA attributes for terminal input, navigation, and form controls
- Dynamic aria-current support for active navigation state with Router integration
- Error messages with role="alert" and aria-describedby linking
- Automatic focus management for settings panel with Escape key support

### Changed
- Navigation now uses aria-current to indicate active page
- Range sliders announce current values with aria-value attributes
- Accessibility risk reduced from MEDIUM to LOW in audit

## [0.0.57] - 2025-11-06

### Added
- Comprehensive test suite with 412 new tests across utilities, components, and commands

### Changed
- Test coverage improved from 44.99% to 70.14%
- CSP moved to _headers file for production deployments

### Fixed
- CSP meta tag blocking Vite dev server functionality

## [0.0.56] - 2025-11-05

### Changed
- Eliminated all unsafe any type usage across codebase
- Added type guards for frontmatter validation in BlogParser and PortfolioParser
- Replaced any types with proper interfaces in ContentFormatter

### Fixed
- Runtime validation now catches invalid frontmatter before processing
- Better error messages for missing or malformed content fields

## [0.0.55] - 2025-11-05

### Added
- DOMPurify sanitization for all innerHTML usage to prevent XSS attacks
- Strict Content Security Policy in index.html and Cloudflare Pages headers
- Comprehensive security test suite with XSS and CSP compliance tests

### Changed
- Refactored settings UI to use event delegation instead of inline handlers
- Removed global window.executeCommand exposure for improved security

## [0.0.54] - 2025-11-05

### Fixed
- TypeScript build errors for figlet font imports
- Added @types/figlet package for proper type definitions
- Updated font imports to use .js extensions for bundler module resolution

## [0.0.53] - 2025-11-05

### Changed
- Unified all content to markdown-first approach with YAML frontmatter
- Reorganized content structure: blog and portfolio now in src/content/ subdirectories
- Portfolio command now reads from markdown files instead of TypeScript data

### Removed
- Unused TypeScript data files (about.ts, contact.ts, skills.ts)
- src/data/ and src/blog/ directories replaced by src/content/ and src/types/

## [0.0.52] - 2025-11-05

### Changed
- H1 and H2 headings now use cyan color via hue-rotate filter for better visual hierarchy
- H1 headings styled with background tint and bottom border instead of glow effect

## [0.0.51] - 2025-11-04

### Fixed
- CommandArgs now properly handles string-value flags like \`-f\` for figlet
- figlet \`-f\` flag now correctly accepts font names (banner, slant, small, standard)

## [0.0.50] - 2025-11-03

### Added
- figlet command for converting text to ASCII art banners
- Support for multiple fonts (standard, slant, banner, small)
- Text alignment options (center, left, right)
- Stdin support for piping text to figlet

## [0.0.49] - 2025-11-03

### Fixed
- ddate command numeric argument order now correctly uses month-day-year format

## [0.0.48] - 2025-11-03

### Added
- ddate command for displaying dates in Discordian calendar format
- Discordian calendar utility with full conversion logic
- New NOVELTY COMMANDS category in help documentation
- Support for St. Tib's Day (Feb 29) and Apostle Day detection
- Created /src/commands/novelty/ directory for esoteric commands

## [0.0.47] - 2025-11-03

### Added
- Secondary background color customization in settings CLI and UI
- Background (Secondary) color picker in settings advanced section

### Changed
- Amber theme secondary background color darkened from #241c14 to #0f0b08 for better contrast

## [0.0.46] - 2025-11-03

### Fixed
- CommandArgs flag parsing now correctly handles positional arguments after combined flags
- ls command with flags and file argument now works in any order (e.g., \`ls -alh .secret\`)

## [0.0.45] - 2025-11-03

### Added
- ls command now supports -a, -l, and -h flags for enhanced directory listing
- Long format listing with permissions, owner, size, date, and filename
- Human-readable file sizes (e.g., 1.1K, 2.4M) with -h flag
- Show hidden files (starting with .) with -a flag

### Changed
- CommandArgs now expands combined short flags (e.g., -alh → -a -l -h)
- FileSystemNode interface extended with metadata fields (permissions, owner, size, modifiedTime, isHidden)

## [0.0.44] - 2025-11-03

### Added
- URL routing system with History API for shareable deep links
- Support for direct navigation to blog posts and pages via URLs
- Automatic URL sync when typing commands in terminal

### Changed
- Clear command now resets URL to home route

### Fixed
- Updated all tests to reflect default theme change to Amber

## [0.0.43] - 2025-11-03

### Added
- Automatically execute about command on page load for better first impression

### Changed
- Default theme changed from Green to Amber
- Header prompt font size reduced from 16px to 14px

### Fixed
- Header tagline now uses theme-aware color for proper contrast on Paper theme

## [0.0.42] - 2025-11-03

### Added
- Environment variable system with platform variables (HOME, USER, PWD, OLDPWD, HOSTNAME)
- Variable expansion in commands using $VAR and \${VAR} syntax
- env and export commands for managing environment variables
- Customizable prompt format with bash-style escape sequences

### Changed
- Default prompt format simplified to "\\W \\$ " showing only last directory
- Prompt updates immediately when changed via settings command

### Fixed
- Root directory now correctly displays as "/" instead of "~" in prompt
- Custom colors properly cleared when switching to preset themes
- cd command now supports "cd -" to return to previous directory

## [0.0.41] - 2025-11-02

### Added
- Settings command to virtual filesystem at /usr/local/bin/settings

### Fixed
- cd command no longer changes username based on directory navigation
- User remains consistent when navigating to different home directories

## [0.0.40] - 2025-11-02

### Added
- TODO.md with prioritized backlog for settings enhancements

### Removed
- SETTINGS.md implementation plan (replaced by TODO.md)

## [0.0.39] - 2025-11-02

### Added
- Comprehensive unit tests for settings command
- Test coverage for all settings subcommands and error handling
- Validation tests for theme switching, fonts, and effects

## [0.0.38] - 2025-11-02

### Added
- Paper theme with teal accent and light backgrounds for panels
- Secondary background color system for theme-aware panels and headers

### Changed
- Theme buttons now display with their actual theme background colors
- Simplified theme labels: Green, Amber, White, Cyan, Paper
- Default settings: scan lines off, glow off, border on

### Fixed
- Page border now properly visible around header and navigation
- Glow effect now uses theme accent color instead of hardcoded green

## [0.0.37] - 2025-11-02

### Fixed
- Updated SettingsManager test suite to align with refactored effects architecture
- Replaced deprecated CRT effect references with granular scanLines, glow, and border controls

## [0.0.36] - 2025-11-01

### Added
- Page border setting with theme-aware styling
- Live updates for all visible settings panels when settings change
- Responsive button wrapping for theme selection buttons

## [0.0.35] - 2025-11-01

### Changed
- Split CRT effects into separate scan lines and glow controls
- Theme buttons now display in their respective theme colors
- Improved slider track visibility with theme-aware styling

### Fixed
- Slider thumb now properly centered on track with rounded rectangle shape
- Settings panel spacing adjusted for better visual hierarchy

## [0.0.34] - 2025-11-01

### Added
- Interactive settings UI with clickable controls for managing preferences
- Theme selection buttons with color preview circles
- Font size slider and family dropdown controls
- Collapsible advanced section for custom color picking
- Real-time CSS updates via custom event system

## [0.0.33] - 2025-11-01

### Added
- Settings command with CLI interface for managing terminal preferences
- Theme switching via command line with four preset themes
- Font size and family configuration commands
- CRT effects and animation speed toggle commands

## [0.0.32] - 2025-11-01

### Added
- ThemeManager service for applying color themes to terminal interface
- Four preset themes: Green, Yellow, White, and Light Blue
- Custom color support with hex color validation

## [0.0.31] - 2025-11-01

### Added
- SettingsManager service for managing user-configurable terminal preferences
- Settings type definitions with theme, font, and effects configuration
- Dual storage system using localStorage and virtual filesystem

## [0.0.30] - 2025-10-31

### Changed
- Refactored MarkdownRenderer to use marked library for improved markdown parsing
- Renamed MarkdownRenderer to MarkdownService for clarity

### Added
- MarkedAdapter module to integrate marked library with application
- Test suites for MarkdownService and MarkedAdapter

## [0.0.29] - 2025-10-30

### Added
- Comprehensive test suite for markdown core modules (ParseContext, InlineRenderer, FrontmatterParser)
- Test fixture infrastructure with markdown samples and loader utilities

### Changed
- Extracted HTML escaping logic to shared utility module to eliminate duplication

## [0.0.28] - 2025-10-29

### Fixed
- Excessive whitespace between list items in markdown rendering

## [0.0.27] - 2025-10-29

### Fixed
- Cat command now displays file contents when run standalone

## [0.0.26] - 2025-10-29

### Added
- CommandExecutor class to handle command execution logic separately from UI

### Changed
- Refactored Terminal component to extract execution logic into CommandExecutor
- Terminal constructor now uses dependency injection for dispatcher and executor

### Fixed
- Navigation clicks now support piped commands
- Fixed missing raw flag check in executeCommand method

## [0.0.25] - 2025-10-29

### Changed
- Updated blog and tree commands to use CommandArgs for consistent argument parsing
- Fixed TypeScript unused parameter warnings across all command files

## [0.0.24] - 2025-10-29

### Added
- Centralized constants module for paths and command signals
- Custom error class hierarchy with AppError, FileSystemError, and CommandNotFoundError
- CommandArgs class for typed argument parsing with flag and positional support

### Changed
- Standardized error handling across FileSystemService and CommandDispatcher
- Eliminated magic strings by consolidating paths and signals into constants

## [0.0.23] - 2025-10-29

### Changed
- Refactored FileSystem into modular architecture with separated concerns
- Split monolithic FileSystem class into IFileSystem interface, FileSystemService implementation, and FileSystemInitializer
- Updated all commands to depend on IFileSystem interface for improved testability
- Added comprehensive FileSystem test suite with 41 new tests

## [0.0.22] - 2025-10-29

### Added
- Complete test suite for Command Parsing System with 81 tests
- CommandParser tests with 100% statement coverage
- PipelineParser tests with 100% statement coverage
- CommandDispatcher tests with 97.5% statement coverage

## [0.0.21] - 2025-10-29

### Added
- Vitest testing framework with jsdom environment and coverage reporting
- Test infrastructure with organized directory structure for unit, integration, and E2E tests
- Testing utilities including @testing-library/dom and @testing-library/user-event
- Initial test suite with CommandParser and PipelineParser example tests (43 tests passing)
- Test scripts for running, watching, and generating coverage reports (test, test:ui, test:coverage, test:watch, test:run)
- Vitest configuration with coverage thresholds set to 80% for lines, functions, branches, and statements

## [0.0.20] - 2025-10-28

### Changed
- Refactored MarkdownRenderer to reduce cyclomatic complexity from ~18 to <5 per method
- Restructured markdown parsing using Chain of Responsibility pattern with dedicated handlers
- Split monolithic 269-line MarkdownRenderer into modular components for better maintainability

### Added
- ParseContext class for managing markdown parsing state
- LineHandler interface for extensible markdown element processing
- InlineRenderer utility for processing inline markdown (bold, italic, code, links)
- Specialized handlers: CodeBlockHandler, HeaderHandler, ListHandler, EmptyLineHandler, ParagraphHandler
- MarkdownParser orchestrator for coordinating handler chain execution
- FrontmatterParser for YAML frontmatter extraction and rendering
- Comprehensive code complexity analysis report in audits/ directory
- Detailed refactoring plan documentation for markdown renderer improvements

### Technical
- Reduced average method complexity by 83% in markdown rendering system
- Improved code maintainability and testability through separation of concerns
- Maintained backward compatibility - no breaking changes to public API
- MarkdownRenderer facade preserves existing interface while delegating to new architecture

## [0.0.19] - 2025-10-27

### Changed
- Enhanced all command outputs with rich markdown rendering for improved readability
- Converted static content commands (about, contact, skills, help) to markdown format
- Implemented dynamic markdown generation for portfolio and blog list views
- Added ContentFormatter utility for consistent markdown generation
- All commands now use MarkdownRenderer with styled HTML output

### Added
- Created markdown content files in /home/darin/content/ directory
- Added about.md, contact.md, skills.md, and help.md content files

## [0.0.18] - 2025-10-27

### Changed
- Refactored monolithic CSS file into modular components for better maintainability
- Split terminal.css (520 lines) into 10 focused stylesheet modules
- Organized styles by component: variables, base, header, navigation, container, io, scrollbar, markdown, and responsive

## [0.0.17] - 2025-10-26

### Added
- Navigation links now automatically clear terminal before executing clicked command for cleaner UX
- Navigation responsive breakpoints at 480px and 375px for better mobile display

### Fixed
- Fixed horizontal scrolling on mobile devices (iPhone) in terminal window
- Navigation links no longer wrap to multiple lines on small mobile devices
- Added overflow-x: hidden to body, terminal-container, and header-ascii
- Added max-width constraints (100vw, 100%) to prevent horizontal overflow
- Progressively reduced font size, padding, and gap spacing to fit all navigation items on one line

### Changed
- Navigation links scale down to 11px font on screens ≤ 480px
- Navigation links scale down to 10px font on screens ≤ 375px
- Reduced gap spacing between navigation items on smaller screens (6px at 480px, 5px at 375px)
- Adjusted padding to 2px 5px at 480px and 2px 4px at 375px for compact layout
- Terminal.executeCommand() now accepts optional clearFirst parameter to clear terminal before command execution
- Note: Did not add overflow-x: hidden to #terminal-output as it breaks scroll-to-bottom behavior

## [0.0.16] - 2025-10-26

### Added
- Rainbow gradient ASCII art header displaying "DARIN CHAMBERS" in large block letters
- Header component with colorful gradient styling inspired by figlet and lolcat
- AsciiArt utility for generating ASCII art text
- Command prompt reference "$ whoami | figlet | lolcat" displayed in header
- Fully responsive header with progressive scaling across all screen sizes
- Multiple responsive breakpoints (1169px, 1024px, 768px, 640px, 480px, 375px)
- Z-index layering to handle header/prompt overlap gracefully

### Changed
- Replaced "dc.com" navigation brand with prominent ASCII art header
- Navigation bar now centers command links without brand text
- Welcome message simplified to remove redundant branding text (now shown in header)
- Enhanced visual hierarchy with gradient-styled branding at page top
- Tagline styled in grey for better visual contrast
- Header prompt positioned on same line as ASCII art on large screens
- Header prompt automatically hidden on screens below 1169px width
- Progressive font scaling ensures header fits on mobile devices down to 375px

## [0.0.15] - 2025-10-26

### Added
- echo command for displaying text output with full pipe support
- Support for -e flag in echo to interpret escape sequences (\\n, \\t, \\\\, etc.)
- Stdin passthrough in echo when no arguments provided (useful in pipelines)

### Changed
- Help command updated to include echo in CORE COMMANDS section

## [0.0.14] - 2025-10-26

### Added
- Command piping support with Unix-style pipe operator (|) for chaining commands
- PipelineParser utility for parsing pipe syntax while respecting quoted strings
- stdin parameter to Command interface for receiving piped input
- raw flag in CommandResult interface to prevent double-display during piping
- dispatchPipeline method in CommandDispatcher for sequential command execution
- Pipe detection logic in Terminal component routing to appropriate dispatcher

### Changed
- cat command now sets raw flag for seamless piping integration
- render command accepts stdin as alternative to file argument for pipe support
- All command execute signatures updated with optional stdin parameter
- Terminal output logic skips display when raw flag is set
- Pipeline stops execution on first error for clear error reporting

## [0.0.13] - 2025-10-26

### Added
- Markdown rendering command (render) to display formatted markdown with rich styling
- MarkdownRenderer utility with support for headers, bold, italic, code blocks, lists, and links
- HTML output support in command system via html flag in CommandResult interface
- CSS styles for markdown rendering with proper typography, colors, and spacing
- writeHTML method in TerminalOutput component for rendering formatted HTML content
- render command in /usr/bin for converting markdown files to formatted display

### Changed
- CommandResult interface now supports optional html flag to indicate HTML output
- Terminal output system can now display both plain text and formatted HTML content
- Blog posts and markdown files can now be beautifully rendered with the render command

## [0.0.12] - 2025-10-26

### Added
- Blog posts stored as individual markdown files with YAML frontmatter
- BlogParser utility for parsing frontmatter and markdown content
- /home/darin/blog/ directory in virtual filesystem with blog post files
- Tag filtering support in blog command (blog --tags <tag>)
- Blog posts accessible via cat command (e.g., cat /home/darin/blog/2024-09-15-ai-production-lessons.md)

### Changed
- Blog command now reads from filesystem instead of static TypeScript data
- Blog posts are individual .md files in src/blog/ directory
- Blog data structure uses YAML frontmatter for metadata (title, date, tags, summary)
- Removed static blogData array from src/data/blog.ts (kept BlogPost interface)

## [0.0.11] - 2025-10-26

### Changed
- Reorganized command source code into semantic categories (core, fs, local)
- Moved content commands (about, portfolio, blog, contact, skills) from /usr/bin to /usr/local/bin in virtual filesystem
- Core system commands remain in /usr/bin (help, clear, history, date, whoami, alias, unalias)
- Filesystem commands remain in /usr/bin (ls, cd, pwd, cat, tree)
- Updated command file structure: src/commands/core/, src/commands/fs/, src/commands/local/
- No functional changes to command behavior, purely organizational improvements

## [0.0.10] - 2025-10-26

### Added
- Implemented whoami command to display current username
- Added getUsername() method to Terminal component for querying current user

### Changed
- Changed default logged-in user from 'guest' to 'darin'
- Updated home directory from /home/guest to /home/darin
- Updated terminal prompt to display darin@darinchambers.com:~/path$
- Updated FileSystem path shortening to treat /home/darin as ~ (tilde)
- Kept /home/guest directory intact in virtual filesystem for future user switching

## [0.0.9] - 2025-10-25

### Added
- Implemented alias command for creating and displaying command aliases
- Implemented unalias command for removing command aliases
- Implemented date command to display current date and time
- Created AliasManager utility class for managing user-defined command aliases
- Added alias persistence to virtual file system in .alias file at /home/guest/.alias
- Added writeFile() method to FileSystem for creating and updating files
- Integrated alias resolution into Terminal command execution flow
- Added setAliasManager() method to Terminal component
- Updated help command documentation to include alias, unalias, and date commands
- Added new commands to /usr/bin in virtual file system

## [0.0.8] - 2025-10-25

### Added
- Implemented history command to display command history with numbered entries
- Added getHistory() method to TerminalInput component for accessing command history
- Added getInput() method to Terminal component to expose TerminalInput instance
- Added history command to /usr/bin in virtual file system
- Updated help command documentation to include history command

### Fixed
- Fixed terminal font rendering for tree command output by adjusting line-height to 1.0
- Eliminated gaps in vertical box-drawing characters by removing line margins
- Improved monospace font rendering with Courier New for consistent character spacing
- Changed white-space from pre-wrap to pre for better tree visualization

## [0.0.7] - 2025-10-25

### Added
- Implemented tree command for visualizing directory structure with hierarchical ASCII output
- Added getTree() method to FileSystem utility for generating directory tree visualization
- Added buildTree() helper method with support for customizable depth limits
- Tree command supports -L flag for specifying maximum depth (default: 3 levels)
- Tree output uses ASCII box-drawing characters (├──, └──, │) for visual hierarchy
- Directories are sorted before files in tree output for better organization
- Added tree command to /usr/bin in virtual file system
- Updated help command documentation to include tree command

## [0.0.6] - 2025-10-25

### Changed
- Repositioned terminal prompt and input field to flow naturally within terminal output area
- Terminal input now appears as the last line in the output, scrolling with content like a real terminal
- Updated TerminalOutput component to insert content before the input line
- Modified clear command to preserve input line while clearing output
- Improved terminal scrolling behavior to keep input visible

## [0.0.5] - 2025-10-25

### Added
- Implemented core content commands (about, portfolio, blog, contact, skills) with professional information and interactive displays
- Created about command displaying bio, expertise, experience, and philosophy
- Created portfolio command showcasing 4 major projects with detailed views
- Created blog command with 3 blog posts covering AI/ML, distributed systems, and developer experience
- Created contact command with email, LinkedIn, GitHub, Twitter, and availability information
- Created skills command displaying technical skills organized by category (AI/ML, Languages, Cloud, Frameworks, Architecture, Leadership)
- Added comprehensive content data files for all commands
- Updated file system with additional files in /home/darin (contact.txt, blog.txt)
- Updated /usr/bin with all new command references
- Redesigned navigation bar to feature core content commands
- Enhanced help command with organized command categories
- Updated welcome message to highlight core features

## [0.0.4] - 2025-10-25

### Added
- Implemented virtual Linux-like file system with navigation commands (ls, cd, pwd, cat) and directory structure
- Created FileSystem utility class with support for directories, files, and path resolution
- Added directory structure: /root, /home/guest, /home/darin, /usr/bin, /usr/local/bin
- Implemented ls command for listing directory contents
- Implemented cd command for changing directories with prompt updates
- Implemented pwd command for displaying current working directory
- Implemented cat command for reading file contents
- Added easter egg content in /home/darin directory (.secret file)
- Created informational files: README.txt, about.txt, projects.txt
- Terminal prompt now reflects current directory location
- Updated navigation bar with file system commands
- Updated help command with file system command documentation

## [0.0.3] - 2025-10-25

### Added
- Added hybrid UI navigation with clickable command shortcuts that integrate seamlessly with terminal input
- Created Navigation component for managing clickable command links
- Implemented programmatic command execution from navigation clicks
- Added navigation bar with retro terminal styling and hover effects
- Navigation items automatically execute commands when clicked
- Integrated navigation with command history tracking
- Added mobile-responsive navigation layout

## [0.0.2] - 2025-10-25

### Added
- Implemented interactive terminal UI with command parser, input/output system, command history navigation, and tab completion
- Created Terminal component for managing terminal state and interactions
- Built TerminalInput component with arrow key history navigation and tab completion
- Built TerminalOutput component for rendering command output with styling
- Implemented CommandParser utility for parsing command strings with quoted argument support
- Implemented CommandDispatcher utility for routing commands with alias support
- Added Command interface for type-safe command implementations
- Created retro terminal aesthetics with CRT effects, scan lines, and green monospace styling
- Added basic commands: help and clear
- Implemented welcome message displaying tagline

## [0.0.1] - 2025-10-25

### Added
- Initial project setup with TypeScript, Vite build system, and base directory structure for terminal-inspired personal website
- Package configuration with development scripts
- TypeScript configuration optimized for modern browser targets
- Git repository initialization with comprehensive .gitignore
- Organized source directory structure (components, commands, styles, utils, data)
- Public assets directory for static resources
`,tc=Object.freeze(Object.defineProperty({__proto__:null,default:ec},Symbol.toStringTag,{value:"Module"}));class nc{static createDirectoryNode(e){const t=e.startsWith(".");return{name:e,type:"directory",children:new Map,permissions:"drwxr-xr-x",owner:"darin",size:4096,modifiedTime:new Date,isHidden:t}}static createFileNode(e,t){const n=e.startsWith(".");return{name:e,type:"file",content:t,permissions:"-rw-r--r--",owner:"darin",size:t.length,modifiedTime:new Date,isHidden:n}}static loadBlogFiles(){const e=Object.assign({"../../content/blog/2025-09-20-01-building-a-minimal-production-graph-library.md":Hl,"../../content/blog/2025-11-14-a-love-letter-to-developers-and-the-terminal.md":Bl,"../../content/blog/2025-11-15-we-trick-rocks-into-thinking.md":Gl,"../../content/blog/2025-11-23-leet-status-unlocked.md":Vl}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),s=r.default;t.set(i,this.createFileNode(i,s))}return t}static loadPortfolioFiles(){const e=Object.assign({"../../content/portfolio/hypergrowing-a-unicorn.md":Yl}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),s=r.default;t.set(i,this.createFileNode(i,s))}return t}static loadPostFiles(){const e=Object.assign({}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),s=r.default;t.set(i,this.createFileNode(i,s))}return t}static loadContentFiles(){const e=Object.assign({"../../content/about.md":Xl,"../../content/contact.md":Zl,"../../content/help.md":Ql}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),s=r.default;t.set(i,this.createFileNode(i,s))}return t}static loadChangelogFile(){const t=Object.values(Object.assign({"../../../CHANGELOG.md":tc}));return t.length>0?t[0].default:""}static createDefaultStructure(){const e=this.createDirectoryNode(""),t=e.children,n=this.createDirectoryNode("root");n.permissions="drwx------",n.owner="root",t.set("root",n),n.children.set(".bashrc",this.createFileNode(".bashrc",`# /root/.bashrc
# TODO: fix the thing
# TODO: also fix the other thing
# TODO: figure out what "the thing" was

export PS1='\\u@\\h:\\w# '
alias please='sudo'
alias yolo='rm -rf / --no-preserve-root'  # DO NOT RUN
alias coffee='echo "brewing..."'

# Note to self: stop SSHing into prod at 2am
`)),n.children.set(".bash_history",this.createFileNode(".bash_history",`ls
cd /var/log
tail -f syslog
sudo systemctl restart nginx
sudo systemctl restart nginx
sudo systemctl restart nginx
why-is-this-not-working
man patience
echo "I should go to bed"
uptime
coffee
echo "one more fix..."
git push --force origin main
git push --force origin main
git reflog
echo "thank god for reflog"
history -c
`)),n.children.set("notes.txt",this.createFileNode("notes.txt",`Admin Notes
===========
1. The portfolio site runs on vibes and vanilla TypeScript
2. No frameworks were harmed in the making of this website
3. If you're reading this, you figured out the password
   (it was on the sticky note, wasn't it?)
4. Congratulations, you have root access to a website
   that runs entirely in your browser.
5. Remember: with great power comes great responsibility.
   Also, there's nothing destructive you can actually do here.
   But it's fun to pretend.
- Darin
`));for(const O of n.children.values())O.owner="root";const r=this.createDirectoryNode("home");t.set("home",r);const i=this.createDirectoryNode("guest");r.children.set("guest",i),i.children.set("README.txt",this.createFileNode("README.txt",`Welcome to darinchambers.com!

This is a terminal-inspired personal website showcasing expertise in AI and software engineering.

Type 'help' to see available commands.
Type 'cd /home/darin' to explore more.
`));const s=this.createDirectoryNode("darin");r.children.set("darin",s),s.children.set(".post-it",this.createFileNode(".post-it",`=============================
    STICKY NOTE - DO NOT LOSE
=============================

WiFi: CoffeeShop5G
Netflix: darin@email.com / password123
Server root: hunter2
Spotify: nice try
AWS Console: ... I should really use a password manager

Remember: Delete this file before anyone finds it.
`)),s.children.set(".secret",this.createFileNode(".secret",`You found a secret! 🎉

"The best way to predict the future is to invent it." - Alan Kay

Keep exploring...
`)),s.children.set("about.txt",this.createFileNode("about.txt",`Darin Chambers
Technologist, Inventor

30 years of experience building innovative solutions.
Specializing in AI, machine learning, and software architecture.

Building What's Next on Rock-Solid Foundations.
`)),s.children.set("projects.txt",this.createFileNode("projects.txt",`Notable Projects:
- AI/ML systems
- Distributed architectures
- Developer tools
- More to come...

Type 'portfolio' for detailed information.
`)),s.children.set("contact.txt",this.createFileNode("contact.txt",`Get in touch with me!

Type 'contact' to see all contact information.
`)),s.children.set("blog.txt",this.createFileNode("blog.txt",`Recent thoughts and articles on software engineering,
AI/ML, distributed systems, and more.

Type 'blog' to read posts.
`));const l=this.createDirectoryNode("blog");s.children.set("blog",l);const a=this.loadBlogFiles();for(const[O,F]of a)l.children.set(O,F);const d=this.createDirectoryNode("posts");s.children.set("posts",d);const _=this.loadPostFiles();for(const[O,F]of _)d.children.set(O,F);const $=this.createDirectoryNode("content");s.children.set("content",$);const g=this.loadContentFiles();for(const[O,F]of g)$.children.set(O,F);const E=this.createDirectoryNode("portfolio");s.children.set("portfolio",E);const y=this.loadPortfolioFiles();for(const[O,F]of y)E.children.set(O,F);const D=this.loadChangelogFile();D&&s.children.set("CHANGELOG.md",this.createFileNode("CHANGELOG.md",D));const b=this.createDirectoryNode("usr");t.set("usr",b);const T=this.createDirectoryNode("bin");b.children.set("bin",T),T.children.set("help",this.createFileNode("help","[Core command: help]")),T.children.set("clear",this.createFileNode("clear","[Core command: clear]")),T.children.set("history",this.createFileNode("history","[Core command: history]")),T.children.set("date",this.createFileNode("date","[Core command: date]")),T.children.set("echo",this.createFileNode("echo","[Core command: echo]")),T.children.set("whoami",this.createFileNode("whoami","[Core command: whoami]")),T.children.set("alias",this.createFileNode("alias","[Core command: alias]")),T.children.set("unalias",this.createFileNode("unalias","[Core command: unalias]")),T.children.set("env",this.createFileNode("env","[Core command: env]")),T.children.set("export",this.createFileNode("export","[Core command: export]")),T.children.set("ls",this.createFileNode("ls","[Core command: ls]")),T.children.set("cd",this.createFileNode("cd","[Core command: cd]")),T.children.set("pwd",this.createFileNode("pwd","[Core command: pwd]")),T.children.set("cat",this.createFileNode("cat","[Core command: cat]")),T.children.set("tree",this.createFileNode("tree","[Core command: tree]")),T.children.set("mkdir",this.createFileNode("mkdir","[Core command: mkdir]")),T.children.set("rm",this.createFileNode("rm","[Core command: rm]")),T.children.set("rmdir",this.createFileNode("rmdir","[Core command: rmdir]")),T.children.set("render",this.createFileNode("render","[Core command: render]")),T.children.set("which",this.createFileNode("which","[Core command: which]")),T.children.set("man",this.createFileNode("man","[Core command: man]")),T.children.set("sudo",this.createFileNode("sudo","[Core command: sudo]")),T.children.set("exit",this.createFileNode("exit","[Core command: exit]")),T.children.set("make",this.createFileNode("make","[Novelty command: make]")),T.children.set("ddate",this.createFileNode("ddate","[Novelty command: ddate]")),T.children.set("figlet",this.createFileNode("figlet","[Novelty command: figlet]")),T.children.set("lolcat",this.createFileNode("lolcat","[Novelty command: lolcat]")),T.children.set("matrix",this.createFileNode("matrix","[Novelty command: matrix]")),T.children.set("life",this.createFileNode("life","[Novelty command: life]")),T.children.set("boot",this.createFileNode("boot","[Novelty command: boot]")),T.children.set("shutdown",this.createFileNode("shutdown","[Novelty command: shutdown]")),T.children.set("reboot",this.createFileNode("reboot","[Novelty command: reboot]")),T.children.set("bsod",this.createFileNode("bsod","[Novelty command: bsod]"));const P=this.createDirectoryNode("local");b.children.set("local",P);const M=this.createDirectoryNode("bin");return P.children.set("bin",M),M.children.set("about",this.createFileNode("about","[Custom command: about]")),M.children.set("portfolio",this.createFileNode("portfolio","[Custom command: portfolio]")),M.children.set("blog",this.createFileNode("blog","[Custom command: blog]")),M.children.set("notes",this.createFileNode("notes","[Custom command: notes]")),M.children.set("contact",this.createFileNode("contact","[Custom command: contact]")),M.children.set("settings",this.createFileNode("settings","[Custom command: settings]")),M.children.set("changelog",this.createFileNode("changelog","[Custom command: changelog]")),e}}class rc{root;currentPath;currentUsername="darin";constructor(e){this.root=e,this.currentPath=Ee.HOME_DARIN}getCurrentPath(){return this.currentPath}setCurrentUsername(e){this.currentUsername=e}getShortPath(){if(this.currentPath==="/")return"/";const e=`/home/${this.currentUsername}`;return this.currentPath===e?"~":this.currentPath.startsWith(e+"/")?"~"+this.currentPath.substring(e.length):this.currentPath}resolvePath(e){return e.startsWith("/")?this.normalizePath(e):e==="~"?`/home/${this.currentUsername}`:e.startsWith("~/")?`/home/${this.currentUsername}`+e.substring(1):this.normalizePath(this.currentPath+"/"+e)}normalizePath(e){const t=e.split("/").filter(r=>r.length>0),n=[];for(const r of t)r===".."?n.pop():r!=="."&&n.push(r);return"/"+n.join("/")}getNode(e){const t=this.resolvePath(e);if(t==="/")return this.root;const n=t.split("/").filter(i=>i.length>0);let r=this.root;for(const i of n){if(!r.children?.has(i))return null;r=r.children.get(i)}return r}list(e="."){const t=this.getNode(e);if(!t)throw new ee(`ls: cannot access '${e}': No such file or directory`);if(t.type!=="directory")throw new ee(`ls: ${e}: Not a directory`);return Array.from(t.children.keys()).sort()}changeDirectory(e){const t=this.resolvePath(e),n=this.getNode(t);if(!n)throw new ee(`cd: ${e}: No such file or directory`);if(n.type!=="directory")throw new ee(`cd: ${e}: Not a directory`);this.currentPath=t||"/"}readFile(e){const t=this.getNode(e);if(!t)throw new ee(`cat: ${e}: No such file or directory`);if(t.type!=="file")throw new ee(`cat: ${e}: Is a directory`);return t.content??""}exists(e){return this.getNode(e)!==null}isDirectory(e){const t=this.getNode(e);return t!==null&&t.type==="directory"}isFile(e){const t=this.getNode(e);return t!==null&&t.type==="file"}writeFile(e,t){const r=this.resolvePath(e).split("/").filter(a=>a.length>0),i=r.pop();if(!i)throw new ee(`Invalid file path: ${e}`);let s=this.root;for(const a of r){if(!s.children?.has(a))throw new ee(`Directory does not exist: ${e}`);if(s=s.children.get(a),s.type!=="directory")throw new ee(`Not a directory: ${e}`)}const l={name:i,type:"file",content:t,size:t.length,permissions:"-rw-r--r--",owner:"darin",modifiedTime:new Date};s.children.set(i,l)}createDirectory(e){const n=this.resolvePath(e).split("/").filter(i=>i.length>0);let r=this.root;for(const i of n)if(r.children?.has(i)){const s=r.children.get(i);if(s.type!=="directory")throw new ee(`mkdir: ${e}: File exists but is not a directory`);r=s}else{const s={name:i,type:"directory",children:new Map};r.children.set(i,s),r=s}}getTree(e=".",t=4){const n=this.getNode(e);if(!n)throw new ee(`tree: cannot access '${e}': No such file or directory`);const r=[],i=this.resolvePath(e);return r.push(i==="/"?"/":i),n.type==="directory"&&this.buildTree(n,"",r,1,t),r}buildTree(e,t,n,r,i){if(r>i||!e.children)return;const s=Array.from(e.children.entries()).sort((l,a)=>l[1].type==="directory"&&a[1].type==="file"?-1:l[1].type==="file"&&a[1].type==="directory"?1:l[0].localeCompare(a[0]));s.forEach(([l,a],d)=>{const _=d===s.length-1,$=_?"└── ":"├── ",g=_?"    ":"│   ";n.push(t+$+l),a.type==="directory"&&this.buildTree(a,t+g,n,r+1,i)})}deleteFile(e){const t=this.resolvePath(e),n=this.getNode(t);if(!n)throw new ee(`rm: cannot remove '${e}': No such file or directory`);if(n.type!=="file")throw new ee(`rm: cannot remove '${e}': Is a directory`);const r=t.split("/").filter(l=>l.length>0),i=r.pop();if(!i)throw new ee(`rm: cannot remove '${e}': Invalid path`);let s=this.root;for(const l of r)s=s.children.get(l);s.children.delete(i)}deleteDirectory(e,t=!1){const n=this.resolvePath(e);if(n==="/")throw new ee("rm: cannot remove '/': Permission denied");const r=this.getNode(n);if(!r)throw new ee(`rm: cannot remove '${e}': No such file or directory`);if(r.type!=="directory")throw new ee(`rm: cannot remove '${e}': Not a directory`);if(!t&&r.children&&r.children.size>0)throw new ee(`rm: cannot remove '${e}': Directory not empty`);const i=n.split("/").filter(a=>a.length>0),s=i.pop();if(!s)throw new ee(`rm: cannot remove '${e}': Invalid path`);let l=this.root;for(const a of i)l=l.children.get(a);l.children.delete(s)}}class oc{terminal;routes;isNavigating=!1;onRouteChangeCallback=null;fileSystem;constructor(e,t){this.terminal=e,this.fileSystem=t,this.routes=this.initializeRoutes(),this.setupListeners()}initializeRoutes(){return[{pattern:/^\/blog\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`blog ${e[1]}`},{pattern:/^\/blog\/?$/,commandBuilder:()=>"blog"},{pattern:/^\/notes\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`notes ${e[1]}`},{pattern:/^\/notes\/?$/,commandBuilder:()=>"notes"},{pattern:/^\/about\/?$/,commandBuilder:()=>"about"},{pattern:/^\/portfolio\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`portfolio ${e[1]}`},{pattern:/^\/portfolio\/?$/,commandBuilder:(e,t)=>{const n=t?.get("tags");return n?`portfolio --tags ${n}`:"portfolio"}},{pattern:/^\/contact\/?$/,commandBuilder:()=>"contact"},{pattern:/^\/settings\/?$/,commandBuilder:()=>"settings"},{pattern:/^\/help\/?$/,commandBuilder:()=>"help"},{pattern:/^\/matrix\/?$/,commandBuilder:()=>"matrix"},{pattern:/^\/life\/?$/,commandBuilder:()=>"life"},{pattern:/^\/$/,commandBuilder:()=>"about"}]}setupListeners(){window.addEventListener("popstate",()=>{this.handleRouteChange(!1)})}handleInitialRoute(){const e=sessionStorage.getItem("ghPagesRedirect");e&&(sessionStorage.removeItem("ghPagesRedirect"),window.history.replaceState({},"",e)),this.handleRouteChange(!1)}handleRouteChange(e){const t=window.location.pathname,n=new URLSearchParams(window.location.search),r=this.parseRoute(t,n);r?(this.isNavigating=!0,this.terminal.executeCommand(r,e),this.isNavigating=!1,this.onRouteChangeCallback&&this.onRouteChangeCallback(r)):this.navigate("/",!0)}parseRoute(e,t){for(const n of this.routes){const r=e.match(n.pattern);if(r)return n.commandBuilder(r,t)}return null}navigate(e,t=!0){this.isNavigating||(window.history.pushState({},"",e),this.handleRouteChange(t))}getValidBlogPostIds(){try{const e=Ee.CONTENT_BLOG,n=this.fileSystem.list(e).filter(i=>i.endsWith(".md")),r=new Set;for(const i of n){const s=yo.getIdFromFilename(i);r.add(s)}return r}catch{return new Set}}getValidPostIds(){try{const e=Ee.CONTENT_POSTS,n=this.fileSystem.list(e).filter(i=>i.endsWith(".md")),r=new Set;for(const i of n){const s=Lo.getIdFromFilename(i);r.add(s)}return r}catch{return new Set}}getPathForCommand(e){const t=e.trim();if(t.startsWith("blog ")&&!t.includes("--tag")){const r=t.substring(5).trim();return this.getValidBlogPostIds().has(r)?`/blog/${r}`:null}if(t.startsWith("notes ")&&!t.includes("--tag")){const r=t.substring(6).trim();return this.getValidPostIds().has(r)?`/notes/${r}`:null}if(t.startsWith("portfolio --tags ")){const r=t.substring(17).trim();return r?`/portfolio?tags=${encodeURIComponent(r)}`:"/portfolio"}return t.startsWith("portfolio ")?`/portfolio/${t.substring(10).trim()}`:{blog:"/blog",notes:"/notes",about:"/about",portfolio:"/portfolio",contact:"/contact",settings:"/settings",help:"/help",matrix:"/matrix",life:"/life"}[t]||null}syncUrlToCommand(e){const t=this.getPathForCommand(e);t&&window.location.pathname!==t&&window.history.pushState({},"",t),this.onRouteChangeCallback&&this.onRouteChangeCallback(e)}onRouteChange(e){this.onRouteChangeCallback=e}getCurrentCommand(){const e=new URLSearchParams(window.location.search);return this.parseRoute(window.location.pathname,e)}}class ic{callback;debounceMs;debounceTimer=null;isMonitoring=!1;boundHandleActivity;constructor(e,t=100){this.callback=e,this.debounceMs=t,this.boundHandleActivity=this.handleActivity.bind(this)}start(){this.isMonitoring||(this.isMonitoring=!0,document.addEventListener("keydown",this.boundHandleActivity),document.addEventListener("click",this.boundHandleActivity),document.addEventListener("touchstart",this.boundHandleActivity,{passive:!0}))}stop(){this.isMonitoring&&(this.isMonitoring=!1,document.removeEventListener("keydown",this.boundHandleActivity),document.removeEventListener("click",this.boundHandleActivity),document.removeEventListener("touchstart",this.boundHandleActivity),this.debounceTimer&&(clearTimeout(this.debounceTimer),this.debounceTimer=null))}handleActivity(){this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>{this.callback(),this.debounceTimer=null},this.debounceMs)}isActive(){return this.isMonitoring}}class sc{settingsManager;terminal;idleTimer=null;state="idle";lastActivityTime=Date.now();constructor(e,t){this.settingsManager=e,this.terminal=t,this.setupVisibilityListener()}recordActivity(){if(this.lastActivityTime=Date.now(),this.state==="active"){this.deactivateScreensaver();return}this.resetIdleTimer()}startIdleTimer(){if(!this.isEnabled()){this.state="disabled";return}this.state="idle",this.resetIdleTimer()}resetIdleTimer(){if(this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null),!this.isEnabled()){this.state="disabled";return}if(this.state==="active")return;const e=this.getTimeoutMs();this.idleTimer=setTimeout(()=>{this.activateScreensaver()},e),this.state="idle"}activateScreensaver(){if(!this.isEnabled()||this.state==="active")return;const e=this.settingsManager.getActiveScreensaver();this.terminal.getOutput().startScreensaverOutput(),this.terminal.executeCommand(e,!1),this.state="active",this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null)}deactivateScreensaver(){this.state==="active"&&(this.terminal.clearScreensaver(),this.state="idle",this.resetIdleTimer())}handleSettingsChange(){this.isEnabled()?this.state==="disabled"?this.startIdleTimer():this.state==="idle"&&this.resetIdleTimer():(this.state="disabled",this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null))}isEnabled(){return so()?!1:this.settingsManager.getScreensaverEnabled()}getTimeoutMs(){return this.settingsManager.getScreensaverTimeout()*60*1e3}getTimeout(){return this.settingsManager.getScreensaverTimeout()}setEnabled(e){this.settingsManager.setScreensaverEnabled(e),this.handleSettingsChange()}setTimeout(e){if(e<bt.MIN_TIMEOUT_MINUTES||e>bt.MAX_TIMEOUT_MINUTES)throw new Error(`Timeout must be between ${bt.MIN_TIMEOUT_MINUTES} and ${bt.MAX_TIMEOUT_MINUTES} minutes`);this.settingsManager.setScreensaverTimeout(e),this.handleSettingsChange()}setActiveScreensaver(e){this.settingsManager.setActiveScreensaver(e)}getState(){return this.state}getIdleTime(){return Date.now()-this.lastActivityTime}setupVisibilityListener(){typeof document>"u"||document.addEventListener("visibilitychange",()=>{document.hidden?this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null):this.state==="idle"&&this.isEnabled()&&this.resetIdleTimer()})}destroy(){this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.state="disabled"}}class ac{settings;fileSystem;settingsPath=Ee.CONFIG_SETTINGS;storageKey=xn.SETTINGS;constructor(e){this.fileSystem=e,this.settings=this.loadFromLocalStorage()??this.getDefaults(),this.syncToFileSystem()}loadFromLocalStorage(){try{const e=localStorage.getItem(this.storageKey);if(!e)return null;const t=JSON.parse(e);return!t.theme||!t.font||!t.effects||!t.prompt?(console.warn("SettingsManager: Invalid settings structure in localStorage, using defaults"),null):(t.screensaver||(t.screensaver=xr.screensaver),t)}catch(e){return console.warn("SettingsManager: Failed to load settings from localStorage:",e),null}}saveToLocalStorage(){try{const e=JSON.stringify(this.settings,null,2);localStorage.setItem(this.storageKey,e)}catch(e){throw console.error("SettingsManager: Failed to save settings to localStorage:",e),new Error(`Failed to save settings: ${e instanceof Error?e.message:String(e)}`)}}syncToFileSystem(){try{const e=JSON.stringify(this.settings,null,2);this.fileSystem.writeFile(this.settingsPath,e)}catch(e){console.error("SettingsManager: Failed to sync settings to filesystem:",e)}}getDefaults(){return JSON.parse(JSON.stringify(xr))}loadSettings(){return this.settings}saveSettings(e){this.settings=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSetting(e){return this.settings[e]}setSetting(e,t){this.settings[e]=t,this.saveToLocalStorage(),this.syncToFileSystem()}getThemePreset(){return this.settings.theme.preset}setThemePreset(e){if(!this.validateThemePreset(e))throw new Error(`Invalid theme preset: ${String(e)}`);this.settings.theme.preset=e,e!=="custom"&&(this.settings.theme.customColors=void 0),this.saveToLocalStorage(),this.syncToFileSystem()}getCustomColors(){return this.settings.theme.customColors}setCustomColors(e){this.settings.theme.preset="custom",this.settings.theme.customColors=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontSize(){return this.settings.font.size}setFontSize(e){if(!this.validateFontSize(e))throw new Error(`Invalid font size: ${e}. Must be between 8 and 24.`);this.settings.font.size=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontFamily(){return this.settings.font.family}setFontFamily(e){if(!this.validateFontFamily(e))throw new Error(`Invalid font family: ${String(e)}`);this.settings.font.family=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScanLines(){return this.settings.effects.scanLines}setScanLines(e){this.settings.effects.scanLines=e,this.saveToLocalStorage(),this.syncToFileSystem()}getGlow(){return this.settings.effects.glow}setGlow(e){this.settings.effects.glow=e,this.saveToLocalStorage(),this.syncToFileSystem()}getBorder(){return this.settings.effects.border}setBorder(e){this.settings.effects.border=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAnimationSpeed(){return this.settings.effects.animationSpeed}setAnimationSpeed(e){if(!this.validateAnimationSpeed(e))throw new Error(`Invalid animation speed: ${e}. Must be between 0.5 and 2.0.`);this.settings.effects.animationSpeed=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSoundEffects(){return this.settings.effects.soundEffects}setSoundEffects(e){this.settings.effects.soundEffects=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAutoScrollBehavior(){return this.settings.effects.autoScrollBehavior}setAutoScrollBehavior(e){this.settings.effects.autoScrollBehavior=e,this.saveToLocalStorage(),this.syncToFileSystem()}getPromptFormat(){return this.settings.prompt.format}setPromptFormat(e){this.settings.prompt.format=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScreensaverEnabled(){return this.settings.screensaver.enabled}setScreensaverEnabled(e){this.settings.screensaver.enabled=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScreensaverTimeout(){return this.settings.screensaver.timeoutMinutes}setScreensaverTimeout(e){if(!this.validateScreensaverTimeout(e))throw new Error(`Invalid screensaver timeout: ${e}. Must be between 1 and 60 minutes.`);this.settings.screensaver.timeoutMinutes=e,this.saveToLocalStorage(),this.syncToFileSystem()}getActiveScreensaver(){return this.settings.screensaver.activeScreensaver}setActiveScreensaver(e){this.settings.screensaver.activeScreensaver=e,this.saveToLocalStorage(),this.syncToFileSystem()}reset(){this.settings=this.getDefaults(),localStorage.removeItem(this.storageKey),this.saveToLocalStorage(),this.syncToFileSystem()}validateThemePreset(e){return["green","yellow","white","light-blue","paper","dc","custom"].includes(e)}validateFontSize(e){return typeof e=="number"&&e>=8&&e<=24&&!isNaN(e)}validateFontFamily(e){return["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"].includes(e)}validateAnimationSpeed(e){return typeof e=="number"&&e>=.5&&e<=2&&!isNaN(e)}validateScreensaverTimeout(e){return typeof e=="number"&&e>=1&&e<=60&&!isNaN(e)}}class lc{settingsManager;presets;constructor(e){this.settingsManager=e,this.presets=new Map,this.initializePresets()}initializePresets(){[{name:"green",displayName:"Green",colors:{"--terminal-bg":"#0a0e14","--terminal-fg":"#39ff14","--terminal-accent":"#00ff99","--terminal-dim":"#20c20e","--terminal-error":"#ff3333","--terminal-cursor":"#39ff14","--terminal-bg-secondary":"#0d1117"}},{name:"yellow",displayName:"Amber",colors:{"--terminal-bg":"#1a1410","--terminal-fg":"#ffb000","--terminal-accent":"#ffd700","--terminal-dim":"#cc8800","--terminal-error":"#ff3333","--terminal-cursor":"#ffb000","--terminal-bg-secondary":"#0f0b08"}},{name:"white",displayName:"White",colors:{"--terminal-bg":"#1a1a1a","--terminal-fg":"#d4d4d4","--terminal-accent":"#88ccff","--terminal-dim":"#999999","--terminal-error":"#ff5555","--terminal-cursor":"#ffffff","--terminal-bg-secondary":"#242424"}},{name:"light-blue",displayName:"Cyan",colors:{"--terminal-bg":"#0a1420","--terminal-fg":"#00d4ff","--terminal-accent":"#00ffff","--terminal-dim":"#0088aa","--terminal-error":"#ff3333","--terminal-cursor":"#00d4ff","--terminal-bg-secondary":"#0d1825"}},{name:"paper",displayName:"Paper",colors:{"--terminal-bg":"#ffffff","--terminal-fg":"#1a1a1a","--terminal-accent":"#007298","--terminal-dim":"#666666","--terminal-error":"#cc0000","--terminal-cursor":"#1a1a1a","--terminal-bg-secondary":"#f0f0f0"}},{name:"dc",displayName:"DC",colors:{"--terminal-bg":"#110e0c","--terminal-fg":"#70dbff","--terminal-accent":"#ffa940","--terminal-dim":"#d4915e","--terminal-error":"#ff4d4d","--terminal-cursor":"#aaff66","--terminal-bg-secondary":"#1c1410"}}].forEach(t=>{this.presets.set(t.name,t)})}getPresets(){return Array.from(this.presets.values())}getPreset(e){return this.presets.get(e)??null}applyTheme(e){if(e==="custom")throw new Error('Cannot apply "custom" theme directly. Use applyCustomColors() instead.');const t=this.presets.get(e);if(!t){const n=Array.from(this.presets.keys()).join(", ");throw new Error(`Invalid theme name: ${e}. Available themes: ${n}`)}this.updateCSSVariables(t.colors),this.settingsManager.setThemePreset(e)}applyCustomColors(e){Object.entries(e).forEach(([i,s])=>{if(!this.validateColor(s))throw new Error(`Invalid color value for ${i}: ${s}. Expected hex format (e.g., #ff0000 or #f00)`)});const t=this.getCurrentColors(),n=this.mergeColors(t,e);this.updateCSSVariables(n);const r={background:n["--terminal-bg"],foreground:n["--terminal-fg"],accent:n["--terminal-accent"],dim:n["--terminal-dim"],error:n["--terminal-error"],cursor:n["--terminal-cursor"],backgroundSecondary:n["--terminal-bg-secondary"]};this.settingsManager.setCustomColors(r)}applyCurrentTheme(){const e=this.settingsManager.loadSettings(),{preset:t,customColors:n}=e.theme;if(t==="custom"&&n){const r={"--terminal-bg":n.background,"--terminal-fg":n.foreground,"--terminal-accent":n.accent,"--terminal-dim":n.dim,"--terminal-error":n.error,"--terminal-cursor":n.cursor,"--terminal-bg-secondary":n.backgroundSecondary};this.updateCSSVariables(r)}else if(t!=="custom"){const r=this.presets.get(t);if(r)this.updateCSSVariables(r.colors);else{console.warn(`ThemeManager: Unknown preset "${t}", falling back to green`);const i=this.presets.get("green");i&&this.updateCSSVariables(i.colors)}}}getCurrentColors(){if(typeof document>"u"){const n=this.presets.get("green");return n?n.colors:{}}const e=document.documentElement,t=getComputedStyle(e);return{"--terminal-bg":t.getPropertyValue("--terminal-bg").trim()||"#0a0e14","--terminal-fg":t.getPropertyValue("--terminal-fg").trim()||"#39ff14","--terminal-accent":t.getPropertyValue("--terminal-accent").trim()||"#39ff14","--terminal-dim":t.getPropertyValue("--terminal-dim").trim()||"#20c20e","--terminal-error":t.getPropertyValue("--terminal-error").trim()||"#ff3333","--terminal-cursor":t.getPropertyValue("--terminal-cursor").trim()||"#39ff14","--terminal-bg-secondary":t.getPropertyValue("--terminal-bg-secondary").trim()||"#0d1117"}}updateCSSVariables(e){if(typeof document>"u"){console.warn("ThemeManager: document not available, skipping CSS update");return}const t=document.documentElement;Object.entries(e).forEach(([n,r])=>{t.style.setProperty(n,r)})}validateColor(e){return/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e)}mergeColors(e,t){return{"--terminal-bg":t["--terminal-bg"]??e["--terminal-bg"],"--terminal-fg":t["--terminal-fg"]??e["--terminal-fg"],"--terminal-accent":t["--terminal-accent"]??e["--terminal-accent"],"--terminal-dim":t["--terminal-dim"]??e["--terminal-dim"],"--terminal-error":t["--terminal-error"]??e["--terminal-error"],"--terminal-cursor":t["--terminal-cursor"]??e["--terminal-cursor"],"--terminal-bg-secondary":t["--terminal-bg-secondary"]??e["--terminal-bg-secondary"]}}}const ko=document.getElementById("terminal-header");if(!ko)throw new Error("Header element not found");new Il(ko);const cc=nc.createDefaultStructure(),X=new rc(cc),Pe=new ac(X),xt=new lc(Pe),_t=new Pl(X,"darin","darinchambers.com");xt.applyCurrentTheme();const to=Pe.getSetting("font");typeof document<"u"&&(document.documentElement.style.setProperty("--terminal-font-size",`${to.size}px`),document.documentElement.style.setProperty("--terminal-font-family",to.family));const dc=Pe.getScanLines();typeof document<"u"&&(dc||document.body.classList.add("no-scan-lines"));const uc=Pe.getGlow();typeof document<"u"&&(uc||document.body.classList.add("no-glow"));const _c=Pe.getBorder();typeof document<"u"&&_c&&document.body.classList.add("border-enabled");const mc=Pe.getAnimationSpeed();typeof document<"u"&&document.documentElement.style.setProperty("--terminal-animation-speed",mc.toString());const Qe=new Ml,en=new kl(X),Oo=new Dl(Qe,en,_t),ce=new Nl(Qe,Oo,Pe,xt,_t);ce.setCurrentPath(X.getShortPath());ce.setFileSystem(X);const Mo=document.getElementById("nav-links");if(!Mo)throw new Error("Navigation links element not found");const hc={name:"help",description:"Display available commands",execute:async(o,e)=>{try{if(o.length>0){const i=o[0];return await Qe.dispatch(`${i} --help`)}const t=X.readFile(Ee.CONTENT_HELP),n=fe.render(t);return{output:ze.makeCommandsClickable(n,Qe.getCommandNames()),html:!0,scrollBehavior:"top"}}catch(t){return{output:t instanceof Error?t.message:String(t),error:!0}}}},pc={name:"clear",description:"Clear the terminal screen",execute:(o,e)=>new B(o).hasFlag("help")?{output:`Usage: clear

Description:
  Clear the terminal screen and remove all output

Examples:
  clear                # Clear the screen`}:{output:$o.CLEAR_SCREEN}},fc=Rs(X),gc=ws(X,o=>ce.setCurrentPath(o),_t),$c=ks(X),Tc=bs(X),Ac=Hs(X),yc=Ns(X),Ec=Ds(X,Qe),Lc=Fs(X),Ic=wi(ce.getInput()),bc=Ai(en),wc=As(en),Sc=Is(ce),Cc=Us(X,["portfolio","blog","notes","contact"]),vc=zs(X),Rc=Ks(X),xc=Ws(X),Nc=Ys(X),kc=X.exists("/home/darin/CHANGELOG.md")?X.readFile("/home/darin/CHANGELOG.md"):"",Oc=Gs(kc),Mc=fs(X),Dc=na(X,Pe,xt),Pc=Li(_t),Fc=bi(_t),Hc=Ua(xt),Uc=xa(xt),Bc=Pa(ce),Wc=Es(Qe,en),Gc=Si(Qe),zc=Ts(ce,Oo),Vc=Ii(ce,_t,X,o=>ce.setCurrentPath(o));ce.registerCommands([hc,pc,Ic,yi,Ei,Sc,bc,wc,Pc,Fc,fc,gc,$c,Tc,Ac,yc,Ec,Lc,Mc,Cc,Rc,xc,Nc,vc,Dc,Oc,ya,va,Ma,Hc,Uc,la,Wa,Ga,ua,Wc,Gc,zc,Vc,Bc]);const jc=[{label:"about",command:"about"},{label:"portfolio",command:"portfolio"},{label:"blog",command:"blog"},{label:"notes",command:"notes"},{label:"contact",command:"contact"},{label:"settings",command:"settings"},{label:"help",command:"help"}],Yc=`Type 'help' to see all commands, or click a command above to get started.
Try 'about' to learn more, 'portfolio' to see my work, or explore with 'ls'.
`;ce.writeWelcome(Yc);const Nt=new oc(ce,X);ce.setRouter(Nt);const Zn=new bl(Mo,o=>{const t={about:"/about",portfolio:"/portfolio",blog:"/blog",notes:"/notes",contact:"/contact",skills:"/skills",settings:"/settings",help:"/help"}[o];t?Nt.navigate(t,!0):ce.executeCommand(o,!0)});Zn.setItems(jc);Nt.onRouteChange(o=>{Zn.setActiveItem(o)});Nt.handleInitialRoute();const no=Nt.getCurrentCommand();no&&Zn.setActiveItem(no);pi();_i();ti();ai();Ti();const Zt=new sc(Pe,ce);ce.setScreensaverManager(Zt);const qc=new ic(()=>Zt.recordActivity(),bt.ACTIVITY_DEBOUNCE_MS);qc.start();Zt.isEnabled()&&Zt.startIdleTimer();async function Do(){if(typeof window.SVGGraphNetwork>"u"){console.warn("SVGGraphNetwork library not loaded");return}document.querySelectorAll("[data-graph]").forEach(t=>{if(t.hasAttribute("data-graph-initialized"))return;const n=t,r=n.id||"unknown";try{const i=t.getAttribute("data-graph");if(!i){console.warn(`Graph container ${r} has no data-graph attribute`);return}const s=JSON.parse(i),l=t.getAttribute("data-graph-theme");l&&s&&typeof s=="object"&&"config"in s&&(s.config.theme=l),new window.SVGGraphNetwork(n.id||n,s),t.setAttribute("data-graph-initialized","true")}catch(i){console.error(`Failed to initialize graph ${r}:`,i),t.setAttribute("data-graph-initialized","true"),t.setAttribute("data-graph-error","true")}});const e=document.querySelectorAll("[data-graph-src]");for(const t of e){if(t.hasAttribute("data-graph-initialized"))continue;const n=t,r=n.id||"unknown",i=t.getAttribute("data-graph-src");if(!i){console.warn(`Graph container ${r} has no data-graph-src attribute`);continue}try{const s=await fetch(i);if(!s.ok)throw new Error(`Failed to fetch ${i}: ${s.statusText}`);const l=await s.json(),a=t.getAttribute("data-graph-theme");a&&l&&typeof l=="object"&&"config"in l&&(l.config.theme=a),new window.SVGGraphNetwork(n.id||n,l),t.setAttribute("data-graph-initialized","true")}catch(s){console.error(`Failed to initialize graph ${r} from ${i}:`,s),t.setAttribute("data-graph-initialized","true"),t.setAttribute("data-graph-error","true")}}}Do();window.initializeGraphs=Do;
