(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const Fe=new Map;function so(){Fe.forEach(e=>{e.stopAnimation()}),Fe.clear(),document.querySelectorAll(".boot-overlay").forEach(e=>{e.remove()})}function jn(o){o.style.animation="boot-overlay-fade 0.3s ease forwards",o.addEventListener("animationend",()=>{o.remove()},{once:!0}),setTimeout(()=>{o.parentNode&&o.remove()},500)}function qt(o){so();const e=o.dataset.bootType??"boot";e==="boot"&&document.querySelectorAll(".boot-overlay").forEach(r=>{jn(r)});const t={element:o,bootType:e,overlay:null,cleanupFns:[],stopAnimation:()=>{t.cleanupFns.forEach(n=>n()),t.cleanupFns=[],t.overlay?.parentNode&&(jn(t.overlay),t.overlay=null),Fe.delete(o)}};if(Fe.set(o,t),e==="shutdown"||e==="reboot"){const n=o.querySelector("[data-boot-overlay]");if(n){t.overlay=n;const i=getComputedStyle(n).animationDelay,s=parseFloat(i)*(i.includes("ms")?1:1e3);setTimeout(()=>{Fe.has(o)&&n.parentNode&&document.body.appendChild(n)},s)}}ao(o,t)}function ao(o,e){const t=document.getElementById("terminal-output");if(t){const a=()=>{e.stopAnimation()};t.addEventListener("scroll",a,{once:!0}),e.cleanupFns.push(()=>{t.removeEventListener("scroll",a)})}const n=a=>{a.key==="Shift"||a.key==="Control"||a.key==="Alt"||a.key==="Meta"||e.stopAnimation()};setTimeout(()=>{Fe.has(o)&&(document.addEventListener("keydown",n,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("keydown",n)}))},100);const r=()=>{e.stopAnimation()};setTimeout(()=>{Fe.has(o)&&(document.addEventListener("click",r,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("click",r)}))},100);const i=new MutationObserver(()=>{o.nextElementSibling&&(e.stopAnimation(),i.disconnect())});t&&(i.observe(t,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{i.disconnect()}));const s=new MutationObserver(()=>{document.body.contains(o)||(e.stopAnimation(),s.disconnect())});s.observe(document.body,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{s.disconnect()})}function lo(){const o=new MutationObserver(n=>{n.forEach(r=>{r.addedNodes.forEach(i=>{if(i.nodeType===Node.ELEMENT_NODE){const s=i;s.classList.contains("boot-sequence")&&qt(s),s.querySelectorAll(".boot-sequence").forEach(l=>{qt(l)})}})})}),e=document.getElementById("terminal-output");e&&o.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll(".boot-sequence").forEach(n=>{qt(n)})}const Me=new Map;function co(){Me.forEach(e=>{e.stopAnimation()}),Me.clear(),document.querySelectorAll(".bsod-overlay").forEach(e=>{e.remove()})}function uo(o){o.style.animation="bsod-fade-out 0.3s ease forwards",o.addEventListener("animationend",()=>{o.remove()},{once:!0}),setTimeout(()=>{o.parentNode&&o.remove()},500)}function _o(o,e){const t=o.querySelector("[data-bsod-progress]");if(!t)return;let n=0;const r=setInterval(()=>{if(!Me.has(o)){clearInterval(r);return}n=(n+1)%101,t.textContent=String(n)},100);e.cleanupFns.push(()=>{clearInterval(r)})}function mo(o,e){const t=o.querySelector("[data-bsod-cursor]");if(!t)return;let n=!0;const r=setInterval(()=>{if(!Me.has(o)){clearInterval(r);return}n=!n,t.style.visibility=n?"visible":"hidden"},530);e.cleanupFns.push(()=>{clearInterval(r)})}function Xt(o){co();const e=o.dataset.bsodStyle??"modern",t={element:o,style:e,cleanupFns:[],stopAnimation:()=>{t.cleanupFns.forEach(n=>n()),t.cleanupFns=[],o.parentNode&&uo(o),Me.delete(o)}};Me.set(o,t),document.body.appendChild(o),e==="modern"?_o(o,t):mo(o,t),ho(o,t)}function ho(o,e){const t=document.getElementById("terminal-output"),n=a=>{a.key==="Shift"||a.key==="Control"||a.key==="Alt"||a.key==="Meta"||e.stopAnimation()};setTimeout(()=>{Me.has(o)&&(document.addEventListener("keydown",n,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("keydown",n)}))},100);const r=()=>{e.stopAnimation()};setTimeout(()=>{Me.has(o)&&(document.addEventListener("click",r,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("click",r)}))},100);const i=new MutationObserver(a=>{for(const l of a)for(const c of l.addedNodes)if(c!==o&&c.nodeType===Node.ELEMENT_NODE){e.stopAnimation(),i.disconnect();return}});t&&(i.observe(t,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{i.disconnect()}));const s=new MutationObserver(()=>{document.body.contains(o)||(e.stopAnimation(),s.disconnect())});s.observe(document.body,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{s.disconnect()})}function po(){const o=new MutationObserver(n=>{n.forEach(r=>{r.addedNodes.forEach(i=>{if(i.nodeType===Node.ELEMENT_NODE){const s=i;s.hasAttribute("data-bsod")&&Xt(s),s.querySelectorAll("[data-bsod]").forEach(l=>{Xt(l)})}})})}),e=document.getElementById("terminal-output");e&&o.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll("[data-bsod]").forEach(n=>{Xt(n)})}const vt=new Map;function yr(o,e){return{width:o,height:e,cells:new Uint8Array(o*e),generation:0}}function $n(o,e,t){return o.cells[t*o.width+e]}function ne(o,e,t,n){o.cells[t*o.width+e]=n}function Yn(o,e){return(o%e+e)%e}function fo(o,e,t){let n=0;for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){if(i===0&&r===0)continue;const s=Yn(e+i,o.width),a=Yn(t+r,o.height);$n(o,s,a)>0&&n++}return n}function go(o){const e=yr(o.width,o.height);e.generation=o.generation+1;for(let t=0;t<o.height;t++)for(let n=0;n<o.width;n++){const r=fo(o,n,t);$n(o,n,t)>0?ne(e,n,t,r===2||r===3?1:0):ne(e,n,t,r===3?2:0)}return e}function Ir(o,e){for(let t=0;t<o.cells.length;t++)o.cells[t]=Math.random()<e?1:0}function $o(o,e){const t=Math.floor(o.width/2),n=Math.floor(o.height/2);switch(e){case"acorn":ne(o,t+1,n-1,1),ne(o,t+3,n,1),ne(o,t,n+1,1),ne(o,t+1,n+1,1),ne(o,t+4,n+1,1),ne(o,t+5,n+1,1),ne(o,t+6,n+1,1);break;case"glider":ne(o,t+1,n-1,1),ne(o,t-1,n,1),ne(o,t+1,n,1),ne(o,t,n+1,1),ne(o,t+1,n+1,1);break;case"blinker":ne(o,t-1,n,1),ne(o,t,n,1),ne(o,t+1,n,1);break;default:Ir(o,.3)}}function qn(){const o=getComputedStyle(document.documentElement);return{accent:o.getPropertyValue("--terminal-accent").trim(),dim:o.getPropertyValue("--terminal-dim").trim(),bg:o.getPropertyValue("--terminal-bg").trim()}}function Xn(o,e,t,n,r){o.fillStyle=t.bg,o.fillRect(0,0,o.canvas.width,o.canvas.height);for(let i=0;i<e.height;i++)for(let s=0;s<e.width;s++){const a=$n(e,s,i);a!==0&&(o.fillStyle=a===2?t.accent:t.dim,o.globalAlpha=a===2?1:.7,o.fillRect(s*n,i*r,n,r))}o.globalAlpha=1}function br(){vt.forEach(o=>{o.stopAnimation()}),vt.clear()}function To(o,e){const t=()=>{e.stopAnimation()};window.addEventListener("scroll",t,{once:!0});const n=new MutationObserver(a=>{for(const l of a)if(l.type==="childList"&&l.addedNodes.length>0){for(const c of l.addedNodes)if(c instanceof HTMLElement&&c.classList.contains("output-line")){e.stopAnimation(),n.disconnect();return}}}),r=document.querySelector(".terminal-output");r&&n.observe(r,{childList:!0});const i=new MutationObserver(()=>{document.body.contains(o)||(e.stopAnimation(),i.disconnect())});i.observe(document.body,{childList:!0,subtree:!0});const s=e.stopAnimation;e.stopAnimation=()=>{window.removeEventListener("scroll",t),n.disconnect(),i.disconnect(),s()}}function Kn(o,e,t,n){br();const r=o.getContext("2d");if(!r)return;const i=o.dataset.speed,s=o.dataset.density,a=o.dataset.pattern,l=i?parseFloat(i):e,c=s?parseFloat(s):t,d=a??n,g=10,f=Math.floor(o.width/g),E=Math.floor(o.height/g),v=o.width/f,w=o.height/E,$=yr(f,E);d&&d!=="random"?$o($,d):Ir($,c);const y={animationId:null,grid:$,canvas:o,speed:l,lastUpdate:performance.now(),cellWidth:v,cellHeight:w,stopAnimation:()=>{y.animationId!==null&&(cancelAnimationFrame(y.animationId),y.animationId=null),vt.delete(o)}};vt.set(o,y);const N=qn();Xn(r,y.grid,N,y.cellWidth,y.cellHeight);function S(x){if(!y.animationId)return;const k=1e3/y.speed;if(x-y.lastUpdate>=k){y.grid=go(y.grid);const W=qn();r&&Xn(r,y.grid,W,y.cellWidth,y.cellHeight),y.lastUpdate=x}y.animationId=requestAnimationFrame(S)}y.animationId=requestAnimationFrame(S),To(o,y)}function Ao(){new MutationObserver(e=>{for(const t of e)if(t.type==="childList"){for(const n of t.addedNodes)if(n instanceof HTMLElement){n.classList.contains("life-grid")&&n instanceof HTMLCanvasElement&&Kn(n,2,.3);const r=n.querySelectorAll(".life-grid");r.length>0&&requestAnimationFrame(()=>{r.forEach(i=>{Kn(i,2,.3)})})}}}).observe(document.body,{childList:!0,subtree:!0})}const Xe=new Map;function Eo(){Xe.forEach(e=>{e.stopAnimation()}),Xe.clear(),document.querySelectorAll(".matrix-rain").forEach(e=>{e.querySelectorAll(".matrix-column").forEach(n=>{n.style.animationPlayState="paused"})})}function Kt(o){Xe.forEach((i,s)=>{i.stopAnimation(),s.querySelectorAll(".matrix-column").forEach(l=>{l.style.animationPlayState="paused"})}),Xe.clear();const e=o.dataset.matrixChars??"";if(!e){console.warn("[Matrix] No character set found in data-matrix-chars");return}const t={animationId:null,frameCount:0,matrixChars:e,rainElement:o,stopAnimation:()=>{t.animationId&&(cancelAnimationFrame(t.animationId),t.animationId=null),Xe.delete(o)}};Xe.set(o,t);function n(){return e[Math.floor(Math.random()*e.length)]}function r(){t.frameCount++,o.querySelectorAll(".matrix-column").forEach(s=>{const a=s.querySelectorAll(".matrix-char"),l=parseInt(s.dataset.trailLength??"20");a.forEach((c,d)=>{if(c.classList.contains("matrix-char-bright"))(t.frameCount%45===0||t.frameCount%60===0&&Math.random()<.5)&&(c.textContent=n());else{const f=l-d-1,E=Math.max(8,Math.floor(f/2));t.frameCount%E===0&&Math.random()<.3&&(c.textContent=n())}})}),t.animationId=requestAnimationFrame(r)}t.animationId=requestAnimationFrame(r),Lo(o,t)}function Lo(o,e){const t=document.getElementById("terminal-output");if(t){const i=()=>{e.stopAnimation()};t.addEventListener("scroll",i,{once:!0})}const n=new MutationObserver(()=>{o.nextElementSibling&&(e.stopAnimation(),n.disconnect())});t&&n.observe(t,{childList:!0,subtree:!0});const r=new MutationObserver(()=>{document.body.contains(o)||(e.stopAnimation(),r.disconnect())});r.observe(document.body,{childList:!0,subtree:!0})}function yo(){const o=new MutationObserver(n=>{n.forEach(r=>{r.addedNodes.forEach(i=>{if(i.nodeType===Node.ELEMENT_NODE){const s=i;s.classList.contains("matrix-rain")&&Kt(s),s.querySelectorAll(".matrix-rain").forEach(l=>{Kt(l)})}})})}),e=document.getElementById("terminal-output");e&&o.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll(".matrix-rain").forEach(n=>{Kt(n)})}const dt=new Map;function Io(o){return()=>(o=o*1103515245+12345&2147483647,o/2147483647)}function Zt(){dt.forEach(t=>{t.cleanupFns.forEach(n=>n()),t.styleElement.remove(),t.container.remove()}),dt.clear(),document.querySelectorAll(".melt-container").forEach(t=>t.remove()),document.querySelectorAll("style[data-melt-styles]").forEach(t=>t.remove())}function bo(o,e,t){const n=/linear-gradient\(\s*(\d+)deg\s*,\s*(.+)\)/.exec(e);if(!n)return null;const r=parseInt(n[1]),i=n[2];let s,a,l,c;s=t.left,a=t.top,l=t.right,c=t.top;const d=o.createLinearGradient(s,a,l,c),g=i.matchAll(/(#[0-9a-fA-F]{6}|rgb[a]?\([^)]+\))\s*(\d+)?%?/g);for(const f of g){const E=f[1],v=f[2]?parseInt(f[2])/100:0;try{d.addColorStop(v,E)}catch{}}return d}function Jt(o,e,t,n){try{const r=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null);let i;for(;i=r.nextNode();){const s=i.textContent||"";if(!s.trim())continue;const a=i.parentElement;if(!a)continue;const l=getComputedStyle(a),c=l.fontSize,d=l.fontFamily,g=l.fontWeight,f=document.createRange();if(f.selectNodeContents(i),typeof f.getClientRects!="function")continue;const E=f.getClientRects();if(E.length===0)continue;const w=(l.getPropertyValue("-webkit-background-clip")||l.backgroundClip)==="text";let $=l.color||n;if(w){const N=a.getBoundingClientRect(),S=l.backgroundImage;if(S?.includes("linear-gradient")){const x=bo(o,S,N);x&&($=x)}}o.fillStyle=$;const y=parseInt(g)>=600?"bold ":"";o.font=`${y}${c} ${d||t}`;for(const N of E)N.width>0&&N.height>0&&o.fillText(s,N.left,N.top+N.height*.85)}}catch{}}function wo(){const o=window.innerWidth,e=window.innerHeight,t=document.createElement("canvas");t.width=o,t.height=e;const n=t.getContext("2d"),r=getComputedStyle(document.documentElement),i=r.getPropertyValue("--terminal-bg").trim()||"#0a0a0a",s=r.getPropertyValue("--terminal-fg").trim()||"#00ff00",a=r.getPropertyValue("--terminal-font-family")||"monospace";n.fillStyle=i,n.fillRect(0,0,o,e);const l=document.querySelector("header");l&&Jt(n,l,a,s);const c=document.getElementById("terminal-output");c&&Jt(n,c,a,s);const d=document.querySelector(".terminal-input-container");return d&&Jt(n,d,a,s),t}function Zn(o){Zt();const e=window.innerWidth,t=window.innerHeight,n=document.createElement("style");n.setAttribute("data-melt-styles",""),n.textContent=`
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
  `,document.head.appendChild(n);const r=document.createElement("div");r.className="melt-container";const s=wo().toDataURL("image/png"),a=12,l=Math.ceil(e/a),c=Io(Date.now());for(let E=0;E<l;E++){const v=document.createElement("div");v.className="melt-column",v.style.left=`${E*a}px`,v.style.width=`${a}px`,v.style.height=`${t}px`,v.style.backgroundImage=`url(${s})`,v.style.backgroundPosition=`-${E*a}px 0`,v.style.backgroundSize=`${e}px ${t}px`;const $=Math.abs(E-l/2)/(l/2)*.4+c()*.3,y=2.5+c()*1.5;v.style.animation=`melt-drop ${y}s ease-in ${$}s forwards`,r.appendChild(v)}const d=document.createElement("div");d.className="melt-message",d.textContent="yeah, you probably shouldn't do that",d.style.animation="melt-message-fade 0.5s ease-out 2s forwards",r.appendChild(d),document.body.appendChild(r);const g={container:r,styleElement:n,cleanupFns:[]};dt.set(o,g);const f=setTimeout(()=>{dt.has(o)&&Zt()},6500);g.cleanupFns.push(()=>clearTimeout(f)),setTimeout(()=>{if(!dt.has(o))return;const E=()=>Zt(),v=$=>{["Shift","Control","Alt","Meta"].includes($.key)||E()},w=()=>E();document.addEventListener("keydown",v,{once:!0}),document.addEventListener("click",w,{once:!0}),g.cleanupFns.push(()=>{document.removeEventListener("keydown",v),document.removeEventListener("click",w)})},500)}function So(){const o=new MutationObserver(t=>{t.forEach(n=>{n.addedNodes.forEach(r=>{if(r.nodeType===Node.ELEMENT_NODE){const i=r;i.hasAttribute("data-melt")&&Zn(i),i.querySelectorAll("[data-melt]").forEach(a=>{Zn(a)})}})})}),e=document.getElementById("terminal-output");e&&o.observe(e,{childList:!0,subtree:!0}),o.observe(document.body,{childList:!0,subtree:!0})}class G{flags=new Map;positionals=[];static VALUE_FLAGS=new Set(["f","L","w"]);constructor(e){const t=[];for(const n of e)if(n.startsWith("-")&&!n.startsWith("--")&&n.length>2)for(let r=1;r<n.length;r++)t.push(`-${n[r]}`);else t.push(n);for(let n=0;n<t.length;n++){const r=t[n];if(r.startsWith("--")){const i=r.substring(2),s=t[n+1];s!==void 0&&!s.startsWith("--")&&!s.startsWith("-")?(this.flags.set(i,s),n++):this.flags.set(i,!0)}else if(r.startsWith("-")&&r.length===2){const i=r.substring(1),s=t[n+1];s!==void 0&&!s.startsWith("-")&&(G.VALUE_FLAGS.has(i)||/^\d+$/.test(s))?(this.flags.set(i,s),n++):this.flags.set(i,!0)}else this.positionals.push(r)}}getFlag(e){return this.flags.get(e)}hasFlag(e){return this.flags.has(e)}getPositional(e){return this.positionals[e]}getAllFlags(){return new Map(this.flags)}getAllPositionals(){return[...this.positionals]}get positionalCount(){return this.positionals.length}}function vo(o){return{name:"alias",description:"Create or display command aliases",execute:(e,t)=>{if(new G(e).hasFlag("help"))return{output:`Usage: alias [name='command']

Description:
  Create or display command aliases for shortening commands
  Note: 'll' is aliased to 'ls -alh' by default

Options:
  (no args)            List all defined aliases

Examples:
  alias                # List all aliases
  alias la='ls -a'     # Create an alias
  alias blog-ai='blog --tags ai'  # Alias with flags`};if(e.length===0){const l=o.getAllAliases();return l.size===0?{output:"No aliases defined."}:{output:Array.from(l.entries()).sort((d,g)=>d[0].localeCompare(g[0])).map(([d,g])=>{const f=o.isDefaultAlias(d);return`alias ${d}='${g}'${f?" (default)":""}`}).join(`
`)}}const r=e.join(" "),i=/^(\S+)=(.+)$/.exec(r);if(!i)return{output:`Usage: alias name='command'
       alias (to list all aliases)`,error:!0};const[,s,a]=i;try{return o.setAlias(s,a),{output:`Alias created: ${s}='${a}'`}}catch(l){return{output:l instanceof Error?l.message:String(l),error:!0}}}}}const Co={name:"date",description:"Display current date and time",execute:(o,e)=>new G(o).hasFlag("help")?{output:`Usage: date

Description:
  Display the current date and time in the system's default format

Examples:
  date                 # Show current date and time`}:{output:new Date().toString()}},Ro={name:"echo",description:"Display a line of text",execute:(o,e)=>{if(new G(o).hasFlag("help"))return{output:`Usage: echo [options] [text...]

Description:
  Display a line of text or pass through stdin content

Options:
  -e                   Enable interpretation of escape sequences

Examples:
  echo "Hello World"   # Display text
  echo -e "Line1\\nLine2"  # Use escape sequences
  cat file.txt | echo  # Pass through stdin`};let n=!1;const r=[];for(const s of o)s==="-e"?n=!0:r.push(s);let i;return r.length===0&&e?(i=e,i.endsWith(`
`)&&(i=i.slice(0,-1))):i=r.join(" "),n&&(i=i.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\\\/g,"\\")),{output:i}}};function xo(o){return{name:"env",description:"Display all environment variables",execute:(e,t)=>{if(new G(e).hasFlag("help"))return{output:`Usage: env

Description:
  Display all environment variables

Examples:
  env                  # List all variables
  env | grep PATH      # Filter variables`};try{const r=o.getAllVariables();return r.size===0?{output:""}:{output:Array.from(r.entries()).sort((a,l)=>a[0].localeCompare(l[0])).map(([a,l])=>`${a}=${l}`).join(`
`)}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function No(o){return{name:"export",description:"Set or display environment variables",execute:(e,t)=>{if(new G(e).hasFlag("help"))return{output:`Usage: export [VAR=value] [VAR]

Description:
  Set or display environment variables

Examples:
  export               # List all variables
  export PATH=/bin     # Set variable
  export USER          # Display single variable`};try{if(e.length===0){const i=o.getAllVariables();return i.size===0?{output:""}:{output:Array.from(i.entries()).sort((l,c)=>l[0].localeCompare(c[0])).map(([l,c])=>`${l}=${c}`).join(`
`)}}const r=[];for(const i of e){const s=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(i);if(s){const[,a,l]=s;o.setVariable(a,l)}else{const a=o.getVariable(i);a!==void 0?r.push(`${i}=${a}`):r.push(`export: ${i}: not found`)}}return{output:r.join(`
`)}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function ko(o){return{name:"history",description:"Display command history",execute:(e,t)=>{if(new G(e).hasFlag("help"))return{output:`Usage: history

Description:
  Display command history with line numbers

Examples:
  history              # Show all commands`};const r=o.getHistory();return r.length===0?{output:"No commands in history."}:{output:r.map((s,a)=>`${(a+1).toString().padStart(5," ")}  ${s}`).join(`
`)}}}}function Ne(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}class Jn{static parse(e){if(!e.trim().startsWith("---"))return{frontmatter:null,content:e};const t=e.split(`
`),n=this.findFrontmatterEnd(t);if(n===-1)return{frontmatter:null,content:e};const r=t.slice(1,n),i=t.slice(n+1);return{frontmatter:this.parseFrontmatterLines(r),content:i.join(`
`)}}static findFrontmatterEnd(e){for(let t=1;t<e.length;t++)if(e[t].trim()==="---")return t;return-1}static parseFrontmatterLines(e){const t={};for(const n of e){const r=n.indexOf(":");if(r===-1)continue;const i=n.substring(0,r).trim(),s=n.substring(r+1).trim();if(s.startsWith("[")&&s.endsWith("]")){const a=s.substring(1,s.length-1);t[i]=a.split(",").map(l=>l.trim().replace(/^["']|["']$/g,"")).filter(l=>l.length>0)}else t[i]=s.replace(/^["']|["']$/g,"")}return t}static renderFrontmatter(e){const t=[];e.title&&typeof e.title=="string"&&t.push(`<h1 class="fm-title">${Ne(e.title)}</h1>`);const n=[];if(e.date&&typeof e.date=="string"&&n.push(`<span class="fm-date">${Ne(e.date)}</span>`),e.tags&&Array.isArray(e.tags)){const r=e.tags.map(i=>`<span class="fm-tag">${Ne(i)}</span>`).join(" ");n.push(`<span class="fm-tags">${r}</span>`)}return n.length>0&&t.push(`<div class="fm-meta">${n.join(" • ")}</div>`),e.summary&&typeof e.summary=="string"&&t.push(`<p class="fm-summary">${Ne(e.summary)}</p>`),t.length>0&&t.push('<hr class="fm-divider">'),t.join(`
`)}}function Tn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ue=Tn();function wr(o){Ue=o}var ut={exec:()=>null};function z(o,e=""){let t=typeof o=="string"?o:o.source,n={replace:(r,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(de.caret,"$1"),t=t.replace(r,s),n},getRegex:()=>new RegExp(t,e)};return n}var Mo=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),de={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:o=>new RegExp(`^( {0,3}${o})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}#`),htmlBeginRegex:o=>new RegExp(`^ {0,${Math.min(3,o-1)}}<(?:[a-z].*>|!--)`,"i")},Oo=/^(?:[ \t]*(?:\n|$))+/,Do=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Po=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,_t=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Fo=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,An=/(?:[*+-]|\d{1,9}[.)])/,Sr=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,vr=z(Sr).replace(/bull/g,An).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ho=z(Sr).replace(/bull/g,An).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),En=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Uo=/^[^\n]+/,Ln=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Bo=z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ln).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Wo=z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,An).getRegex(),Mt="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",yn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Go=z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",yn).replace("tag",Mt).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Cr=z(En).replace("hr",_t).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mt).getRegex(),zo=z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Cr).getRegex(),In={blockquote:zo,code:Do,def:Bo,fences:Po,heading:Fo,hr:_t,html:Go,lheading:vr,list:Wo,newline:Oo,paragraph:Cr,table:ut,text:Uo},Qn=z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",_t).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mt).getRegex(),Vo={...In,lheading:Ho,table:Qn,paragraph:z(En).replace("hr",_t).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Qn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mt).getRegex()},jo={...In,html:z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",yn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ut,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:z(En).replace("hr",_t).replace("heading",` *#{1,6} *[^
]`).replace("lheading",vr).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Yo=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,qo=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Rr=/^( {2,}|\\)\n(?!\s*$)/,Xo=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ot=/[\p{P}\p{S}]/u,bn=/[\s\p{P}\p{S}]/u,xr=/[^\s\p{P}\p{S}]/u,Ko=z(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,bn).getRegex(),Nr=/(?!~)[\p{P}\p{S}]/u,Zo=/(?!~)[\s\p{P}\p{S}]/u,Jo=/(?:[^\s\p{P}\p{S}]|~)/u,Qo=z(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Mo?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),kr=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ei=z(kr,"u").replace(/punct/g,Ot).getRegex(),ti=z(kr,"u").replace(/punct/g,Nr).getRegex(),Mr="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ni=z(Mr,"gu").replace(/notPunctSpace/g,xr).replace(/punctSpace/g,bn).replace(/punct/g,Ot).getRegex(),ri=z(Mr,"gu").replace(/notPunctSpace/g,Jo).replace(/punctSpace/g,Zo).replace(/punct/g,Nr).getRegex(),oi=z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,xr).replace(/punctSpace/g,bn).replace(/punct/g,Ot).getRegex(),ii=z(/\\(punct)/,"gu").replace(/punct/g,Ot).getRegex(),si=z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ai=z(yn).replace("(?:-->|$)","-->").getRegex(),li=z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ai).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ct=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ci=z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ct).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Or=z(/^!?\[(label)\]\[(ref)\]/).replace("label",Ct).replace("ref",Ln).getRegex(),Dr=z(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ln).getRegex(),di=z("reflink|nolink(?!\\()","g").replace("reflink",Or).replace("nolink",Dr).getRegex(),er=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,wn={_backpedal:ut,anyPunctuation:ii,autolink:si,blockSkip:Qo,br:Rr,code:qo,del:ut,emStrongLDelim:ei,emStrongRDelimAst:ni,emStrongRDelimUnd:oi,escape:Yo,link:ci,nolink:Dr,punctuation:Ko,reflink:Or,reflinkSearch:di,tag:li,text:Xo,url:ut},ui={...wn,link:z(/^!?\[(label)\]\((.*?)\)/).replace("label",Ct).getRegex(),reflink:z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ct).getRegex()},an={...wn,emStrongRDelimAst:ri,emStrongLDelim:ti,url:z(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",er).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:z(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",er).getRegex()},_i={...an,br:z(Rr).replace("{2,}","*").getRegex(),text:z(an.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},yt={normal:In,gfm:Vo,pedantic:jo},tt={normal:wn,gfm:an,breaks:_i,pedantic:ui},mi={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},tr=o=>mi[o];function Re(o,e){if(e){if(de.escapeTest.test(o))return o.replace(de.escapeReplace,tr)}else if(de.escapeTestNoEncode.test(o))return o.replace(de.escapeReplaceNoEncode,tr);return o}function nr(o){try{o=encodeURI(o).replace(de.percentDecode,"%")}catch{return null}return o}function rr(o,e){let t=o.replace(de.findPipe,(i,s,a)=>{let l=!1,c=s;for(;--c>=0&&a[c]==="\\";)l=!l;return l?"|":" |"}),n=t.split(de.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(de.slashPipe,"|");return n}function nt(o,e,t){let n=o.length;if(n===0)return"";let r=0;for(;r<n&&o.charAt(n-r-1)===e;)r++;return o.slice(0,n-r)}function hi(o,e){if(o.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<o.length;n++)if(o[n]==="\\")n++;else if(o[n]===e[0])t++;else if(o[n]===e[1]&&(t--,t<0))return n;return t>0?-2:-1}function or(o,e,t,n,r){let i=e.href,s=e.title||null,a=o[1].replace(r.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:o[0].charAt(0)==="!"?"image":"link",raw:t,href:i,title:s,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,l}function pi(o,e,t){let n=o.match(t.other.indentCodeCompensation);if(n===null)return e;let r=n[1];return e.split(`
`).map(i=>{let s=i.match(t.other.beginningSpace);if(s===null)return i;let[a]=s;return a.length>=r.length?i.slice(r.length):i}).join(`
`)}var Rt=class{options;rules;lexer;constructor(o){this.options=o||Ue}space(o){let e=this.rules.block.newline.exec(o);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(o){let e=this.rules.block.code.exec(o);if(e){let t=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:nt(t,`
`)}}}fences(o){let e=this.rules.block.fences.exec(o);if(e){let t=e[0],n=pi(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(o){let e=this.rules.block.heading.exec(o);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let n=nt(t,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(t=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(o){let e=this.rules.block.hr.exec(o);if(e)return{type:"hr",raw:nt(e[0],`
`)}}blockquote(o){let e=this.rules.block.blockquote.exec(o);if(e){let t=nt(e[0],`
`).split(`
`),n="",r="",i=[];for(;t.length>0;){let s=!1,a=[],l;for(l=0;l<t.length;l++)if(this.rules.other.blockquoteStart.test(t[l]))a.push(t[l]),s=!0;else if(!s)a.push(t[l]);else break;t=t.slice(l);let c=a.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,r=r?`${r}
${d}`:d;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=g,t.length===0)break;let f=i.at(-1);if(f?.type==="code")break;if(f?.type==="blockquote"){let E=f,v=E.raw+`
`+t.join(`
`),w=this.blockquote(v);i[i.length-1]=w,n=n.substring(0,n.length-E.raw.length)+w.raw,r=r.substring(0,r.length-E.text.length)+w.text;break}else if(f?.type==="list"){let E=f,v=E.raw+`
`+t.join(`
`),w=this.list(v);i[i.length-1]=w,n=n.substring(0,n.length-f.raw.length)+w.raw,r=r.substring(0,r.length-E.raw.length)+w.raw,t=v.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:i,text:r}}}list(o){let e=this.rules.block.list.exec(o);if(e){let t=e[1].trim(),n=t.length>1,r={type:"list",raw:"",ordered:n,start:n?+t.slice(0,-1):"",loose:!1,items:[]};t=n?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=n?t:"[*+-]");let i=this.rules.other.listItemRegex(t),s=!1;for(;o;){let l=!1,c="",d="";if(!(e=i.exec(o))||this.rules.block.hr.test(o))break;c=e[0],o=o.substring(c.length);let g=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,w=>" ".repeat(3*w.length)),f=o.split(`
`,1)[0],E=!g.trim(),v=0;if(this.options.pedantic?(v=2,d=g.trimStart()):E?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=g.slice(v),v+=e[1].length),E&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,o=o.substring(f.length+1),l=!0),!l){let w=this.rules.other.nextBulletRegex(v),$=this.rules.other.hrRegex(v),y=this.rules.other.fencesBeginRegex(v),N=this.rules.other.headingBeginRegex(v),S=this.rules.other.htmlBeginRegex(v);for(;o;){let x=o.split(`
`,1)[0],k;if(f=x,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),k=f):k=f.replace(this.rules.other.tabCharGlobal,"    "),y.test(f)||N.test(f)||S.test(f)||w.test(f)||$.test(f))break;if(k.search(this.rules.other.nonSpaceChar)>=v||!f.trim())d+=`
`+k.slice(v);else{if(E||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||y.test(g)||N.test(g)||$.test(g))break;d+=`
`+f}!E&&!f.trim()&&(E=!0),c+=x+`
`,o=o.substring(x.length+1),g=k.slice(v)}}r.loose||(s?r.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(s=!0)),r.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),r.raw+=c}let a=r.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let l of r.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(l.raw);if(c){let d={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};l.checked=d.checked,r.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!r.loose){let c=l.tokens.filter(g=>g.type==="space"),d=c.length>0&&c.some(g=>this.rules.other.anyLine.test(g.raw));r.loose=d}}if(r.loose)for(let l of r.items){l.loose=!0;for(let c of l.tokens)c.type==="text"&&(c.type="paragraph")}return r}}html(o){let e=this.rules.block.html.exec(o);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(o){let e=this.rules.block.def.exec(o);if(e){let t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:e[0],href:n,title:r}}}table(o){let e=this.rules.block.table.exec(o);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let t=rr(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(t.length===n.length){for(let s of n)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<t.length;s++)i.header.push({text:t[s],tokens:this.lexer.inline(t[s]),header:!0,align:i.align[s]});for(let s of r)i.rows.push(rr(s,i.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:i.align[l]})));return i}}lheading(o){let e=this.rules.block.lheading.exec(o);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(o){let e=this.rules.block.paragraph.exec(o);if(e){let t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(o){let e=this.rules.block.text.exec(o);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(o){let e=this.rules.inline.escape.exec(o);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(o){let e=this.rules.inline.tag.exec(o);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(o){let e=this.rules.inline.link.exec(o);if(e){let t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let i=nt(t.slice(0,-1),"\\");if((t.length-i.length)%2===0)return}else{let i=hi(e[2],"()");if(i===-2)return;if(i>-1){let s=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,s).trim(),e[3]=""}}let n=e[2],r="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(n);i&&(n=i[1],r=i[3])}else r=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?n=n.slice(1):n=n.slice(1,-1)),or(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(o,e){let t;if((t=this.rules.inline.reflink.exec(o))||(t=this.rules.inline.nolink.exec(o))){let n=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=e[n.toLowerCase()];if(!r){let i=t[0].charAt(0);return{type:"text",raw:i,text:i}}return or(t,r,t[0],this.lexer,this.rules)}}emStrong(o,e,t=""){let n=this.rules.inline.emStrongLDelim.exec(o);if(!(!n||n[3]&&t.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!t||this.rules.inline.punctuation.exec(t))){let r=[...n[0]].length-1,i,s,a=r,l=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*o.length+r);(n=c.exec(e))!=null;){if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!i)continue;if(s=[...i].length,n[3]||n[4]){a+=s;continue}else if((n[5]||n[6])&&r%3&&!((r+s)%3)){l+=s;continue}if(a-=s,a>0)continue;s=Math.min(s,s+a+l);let d=[...n[0]][0].length,g=o.slice(0,r+n.index+d+s);if(Math.min(r,s)%2){let E=g.slice(1,-1);return{type:"em",raw:g,text:E,tokens:this.lexer.inlineTokens(E)}}let f=g.slice(2,-2);return{type:"strong",raw:g,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(o){let e=this.rules.inline.code.exec(o);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(t),r=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return n&&r&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(o){let e=this.rules.inline.br.exec(o);if(e)return{type:"br",raw:e[0]}}del(o){let e=this.rules.inline.del.exec(o);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(o){let e=this.rules.inline.autolink.exec(o);if(e){let t,n;return e[2]==="@"?(t=e[1],n="mailto:"+t):(t=e[1],n=t),{type:"link",raw:e[0],text:t,href:n,tokens:[{type:"text",raw:t,text:t}]}}}url(o){let e;if(e=this.rules.inline.url.exec(o)){let t,n;if(e[2]==="@")t=e[0],n="mailto:"+t;else{let r;do r=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(r!==e[0]);t=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:t,href:n,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(o){let e=this.rules.inline.text.exec(o);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},ye=class ln{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ue,this.options.tokenizer=this.options.tokenizer||new Rt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:de,block:yt.normal,inline:tt.normal};this.options.pedantic?(t.block=yt.pedantic,t.inline=tt.pedantic):this.options.gfm&&(t.block=yt.gfm,this.options.breaks?t.inline=tt.breaks:t.inline=tt.gfm),this.tokenizer.rules=t}static get rules(){return{block:yt,inline:tt}}static lex(e,t){return new ln(t).lex(e)}static lexInline(e,t){return new ln(t).inlineTokens(e)}lex(e){e=e.replace(de.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){for(this.options.pedantic&&(e=e.replace(de.tabCharGlobal,"    ").replace(de.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(s=>(r=s.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let s=t.at(-1);r.raw.length===1&&s!==void 0?s.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.at(-1).src=s.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startBlock){let s=1/0,a=e.slice(1),l;this.options.extensions.startBlock.forEach(c=>{l=c.call({lexer:this},a),typeof l=="number"&&l>=0&&(s=Math.min(s,l))}),s<1/0&&s>=0&&(i=e.substring(0,s+1))}if(this.state.top&&(r=this.tokenizer.paragraph(i))){let s=t.at(-1);n&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):t.push(r),n=i.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):t.push(r);continue}if(e){let s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n=e,r=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,r.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+"["+"a".repeat(r[0].length-i-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let s=!1,a="";for(;e;){s||(a=""),s=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},e,t))?(e=e.substring(l.raw.length),t.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);let d=t.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):t.push(l);continue}if(l=this.tokenizer.emStrong(e,n,a)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.del(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),t.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),t.push(l);continue}let c=e;if(this.options.extensions?.startInline){let d=1/0,g=e.slice(1),f;this.options.extensions.startInline.forEach(E=>{f=E.call({lexer:this},g),typeof f=="number"&&f>=0&&(d=Math.min(d,f))}),d<1/0&&d>=0&&(c=e.substring(0,d+1))}if(l=this.tokenizer.inlineText(c)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),s=!0;let d=t.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):t.push(l);continue}if(e){let d="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return t}},xt=class{options;parser;constructor(o){this.options=o||Ue}space(o){return""}code({text:o,lang:e,escaped:t}){let n=(e||"").match(de.notSpaceStart)?.[0],r=o.replace(de.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Re(n)+'">'+(t?r:Re(r,!0))+`</code></pre>
`:"<pre><code>"+(t?r:Re(r,!0))+`</code></pre>
`}blockquote({tokens:o}){return`<blockquote>
${this.parser.parse(o)}</blockquote>
`}html({text:o}){return o}def(o){return""}heading({tokens:o,depth:e}){return`<h${e}>${this.parser.parseInline(o)}</h${e}>
`}hr(o){return`<hr>
`}list(o){let e=o.ordered,t=o.start,n="";for(let s=0;s<o.items.length;s++){let a=o.items[s];n+=this.listitem(a)}let r=e?"ol":"ul",i=e&&t!==1?' start="'+t+'"':"";return"<"+r+i+`>
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
`}strong({tokens:o}){return`<strong>${this.parser.parseInline(o)}</strong>`}em({tokens:o}){return`<em>${this.parser.parseInline(o)}</em>`}codespan({text:o}){return`<code>${Re(o,!0)}</code>`}br(o){return"<br>"}del({tokens:o}){return`<del>${this.parser.parseInline(o)}</del>`}link({href:o,title:e,tokens:t}){let n=this.parser.parseInline(t),r=nr(o);if(r===null)return n;o=r;let i='<a href="'+o+'"';return e&&(i+=' title="'+Re(e)+'"'),i+=">"+n+"</a>",i}image({href:o,title:e,text:t,tokens:n}){n&&(t=this.parser.parseInline(n,this.parser.textRenderer));let r=nr(o);if(r===null)return Re(t);o=r;let i=`<img src="${o}" alt="${t}"`;return e&&(i+=` title="${Re(e)}"`),i+=">",i}text(o){return"tokens"in o&&o.tokens?this.parser.parseInline(o.tokens):"escaped"in o&&o.escaped?o.text:Re(o.text)}},Sn=class{strong({text:o}){return o}em({text:o}){return o}codespan({text:o}){return o}del({text:o}){return o}html({text:o}){return o}text({text:o}){return o}link({text:o}){return""+o}image({text:o}){return""+o}br(){return""}checkbox({raw:o}){return o}},Ie=class cn{options;renderer;textRenderer;constructor(e){this.options=e||Ue,this.options.renderer=this.options.renderer||new xt,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Sn}static parse(e,t){return new cn(t).parse(e)}static parseInline(e,t){return new cn(t).parseInline(e)}parse(e){let t="";for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let s=r,a=this.options.extensions.renderers[s.type].call({parser:this},s);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){t+=a||"";continue}}let i=r;switch(i.type){case"space":{t+=this.renderer.space(i);break}case"hr":{t+=this.renderer.hr(i);break}case"heading":{t+=this.renderer.heading(i);break}case"code":{t+=this.renderer.code(i);break}case"table":{t+=this.renderer.table(i);break}case"blockquote":{t+=this.renderer.blockquote(i);break}case"list":{t+=this.renderer.list(i);break}case"checkbox":{t+=this.renderer.checkbox(i);break}case"html":{t+=this.renderer.html(i);break}case"def":{t+=this.renderer.def(i);break}case"paragraph":{t+=this.renderer.paragraph(i);break}case"text":{t+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return t}parseInline(e,t=this.renderer){let n="";for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=a||"";continue}}let s=i;switch(s.type){case"escape":{n+=t.text(s);break}case"html":{n+=t.html(s);break}case"link":{n+=t.link(s);break}case"image":{n+=t.image(s);break}case"checkbox":{n+=t.checkbox(s);break}case"strong":{n+=t.strong(s);break}case"em":{n+=t.em(s);break}case"codespan":{n+=t.codespan(s);break}case"br":{n+=t.br(s);break}case"del":{n+=t.del(s);break}case"text":{n+=t.text(s);break}default:{let a='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}},lt=class{options;block;constructor(o){this.options=o||Ue}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(o){return o}postprocess(o){return o}processAllTokens(o){return o}emStrongMask(o){return o}provideLexer(){return this.block?ye.lex:ye.lexInline}provideParser(){return this.block?Ie.parse:Ie.parseInline}},fi=class{defaults=Tn();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Ie;Renderer=xt;TextRenderer=Sn;Lexer=ye;Tokenizer=Rt;Hooks=lt;constructor(...o){this.use(...o)}walkTokens(o,e){let t=[];for(let n of o)switch(t=t.concat(e.call(this,n)),n.type){case"table":{let r=n;for(let i of r.header)t=t.concat(this.walkTokens(i.tokens,e));for(let i of r.rows)for(let s of i)t=t.concat(this.walkTokens(s.tokens,e));break}case"list":{let r=n;t=t.concat(this.walkTokens(r.items,e));break}default:{let r=n;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(i=>{let s=r[i].flat(1/0);t=t.concat(this.walkTokens(s,e))}):r.tokens&&(t=t.concat(this.walkTokens(r.tokens,e)))}}return t}use(...o){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return o.forEach(t=>{let n={...t};if(n.async=this.defaults.async||n.async||!1,t.extensions&&(t.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let i=e.renderers[r.name];i?e.renderers[r.name]=function(...s){let a=r.renderer.apply(this,s);return a===!1&&(a=i.apply(this,s)),a}:e.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[r.level];i?i.unshift(r.tokenizer):e[r.level]=[r.tokenizer],r.start&&(r.level==="block"?e.startBlock?e.startBlock.push(r.start):e.startBlock=[r.start]:r.level==="inline"&&(e.startInline?e.startInline.push(r.start):e.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(e.childTokens[r.name]=r.childTokens)}),n.extensions=e),t.renderer){let r=this.defaults.renderer||new xt(this.defaults);for(let i in t.renderer){if(!(i in r))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,a=t.renderer[s],l=r[s];r[s]=(...c)=>{let d=a.apply(r,c);return d===!1&&(d=l.apply(r,c)),d||""}}n.renderer=r}if(t.tokenizer){let r=this.defaults.tokenizer||new Rt(this.defaults);for(let i in t.tokenizer){if(!(i in r))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,a=t.tokenizer[s],l=r[s];r[s]=(...c)=>{let d=a.apply(r,c);return d===!1&&(d=l.apply(r,c)),d}}n.tokenizer=r}if(t.hooks){let r=this.defaults.hooks||new lt;for(let i in t.hooks){if(!(i in r))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,a=t.hooks[s],l=r[s];lt.passThroughHooks.has(i)?r[s]=c=>{if(this.defaults.async&&lt.passThroughHooksRespectAsync.has(i))return(async()=>{let g=await a.call(r,c);return l.call(r,g)})();let d=a.call(r,c);return l.call(r,d)}:r[s]=(...c)=>{if(this.defaults.async)return(async()=>{let g=await a.apply(r,c);return g===!1&&(g=await l.apply(r,c)),g})();let d=a.apply(r,c);return d===!1&&(d=l.apply(r,c)),d}}n.hooks=r}if(t.walkTokens){let r=this.defaults.walkTokens,i=t.walkTokens;n.walkTokens=function(s){let a=[];return a.push(i.call(this,s)),r&&(a=a.concat(r.call(this,s))),a}}this.defaults={...this.defaults,...n}}),this}setOptions(o){return this.defaults={...this.defaults,...o},this}lexer(o,e){return ye.lex(o,e??this.defaults)}parser(o,e){return Ie.parse(o,e??this.defaults)}parseMarkdown(o){return(e,t)=>{let n={...t},r={...this.defaults,...n},i=this.onError(!!r.silent,!!r.async);if(this.defaults.async===!0&&n.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=o),r.async)return(async()=>{let s=r.hooks?await r.hooks.preprocess(e):e,a=await(r.hooks?await r.hooks.provideLexer():o?ye.lex:ye.lexInline)(s,r),l=r.hooks?await r.hooks.processAllTokens(a):a;r.walkTokens&&await Promise.all(this.walkTokens(l,r.walkTokens));let c=await(r.hooks?await r.hooks.provideParser():o?Ie.parse:Ie.parseInline)(l,r);return r.hooks?await r.hooks.postprocess(c):c})().catch(i);try{r.hooks&&(e=r.hooks.preprocess(e));let s=(r.hooks?r.hooks.provideLexer():o?ye.lex:ye.lexInline)(e,r);r.hooks&&(s=r.hooks.processAllTokens(s)),r.walkTokens&&this.walkTokens(s,r.walkTokens);let a=(r.hooks?r.hooks.provideParser():o?Ie.parse:Ie.parseInline)(s,r);return r.hooks&&(a=r.hooks.postprocess(a)),a}catch(s){return i(s)}}}onError(o,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,o){let n="<p>An error occurred:</p><pre>"+Re(t.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(t);throw t}}},He=new fi;function V(o,e){return He.parse(o,e)}V.options=V.setOptions=function(o){return He.setOptions(o),V.defaults=He.defaults,wr(V.defaults),V};V.getDefaults=Tn;V.defaults=Ue;V.use=function(...o){return He.use(...o),V.defaults=He.defaults,wr(V.defaults),V};V.walkTokens=function(o,e){return He.walkTokens(o,e)};V.parseInline=He.parseInline;V.Parser=Ie;V.parser=Ie.parse;V.Renderer=xt;V.TextRenderer=Sn;V.Lexer=ye;V.lexer=ye.lex;V.Tokenizer=Rt;V.Hooks=lt;V.parse=V;V.options;V.setOptions;V.use;V.walkTokens;V.parseInline;Ie.parse;ye.lex;class gi{static render(e,t=!1){let n=e,r="";if(t){const s=Jn.parse(e);n=s.content,s.frontmatter&&(r=Jn.renderFrontmatter(s.frontmatter))}const i=V.parse(n);return`<div class="markdown-output">${r}${i}</div>`}}class Y{static render(e,t=!1){return gi.render(e,t)}}function $i(o){return{name:"render",description:"Render markdown file with formatting",execute:(e,t)=>{if(new G(e).hasFlag("help"))return{output:`Usage: render <file>
Or: <command> | render

Description:
  Render markdown with formatting and YAML frontmatter

Examples:
  render ~/blog/post.md   # Render file
  cat file.md | render    # Render from stdin`};let r;if(t)r=t;else if(e.length>0){const a=e[0];try{if(!o.exists(a))return{output:`render: ${a}: No such file or directory`,error:!0};if(!o.isFile(a))return{output:`render: ${a}: Is a directory`,error:!0};r=o.readFile(a)}catch(l){return{output:l instanceof Error?l.message:String(l),error:!0}}}else return{output:`render: missing file operand
Try 'render --help' for more information`,error:!0};const i=r.trim().startsWith("---");return{output:Y.render(r,i),html:!0}}}}function Ti(o){return{name:"unalias",description:"Remove command aliases",execute:(e,t)=>{if(new G(e).hasFlag("help"))return{output:`Usage: unalias <name>

Description:
  Remove a command alias

Examples:
  unalias ll           # Remove the 'll' alias`};if(e.length===0)return{output:`Usage: unalias name
Try 'unalias --help' for more information.`,error:!0};const r=e[0];return o.removeAlias(r)?{output:`Alias removed: ${r}`}:{output:`unalias: ${r}: not found`,error:!0}}}}const Ai=new Set(["about","portfolio","blog","contact","settings"]);function Ei(o,e){return{name:"which",description:"Locate a command and display its path",execute:(t,n)=>{const r=new G(t);if(r.hasFlag("help"))return{output:`Usage: which [-a] <command> [command ...]

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
Usage: which [-a] <command> [command ...]`,error:!0};const s=r.hasFlag("a"),a=[];let l=!1;for(const d of i){const g=Li(d,o,e,s);g.error&&(l=!0),a.push(g.output)}const c={output:a.join(`
`)};return l&&(c.error=!0),c}}}function Li(o,e,t,n){const r=[],i=t.getAlias(o);if(i&&(r.push(`${o}: aliased to ${i}`),!n))return{output:r.join(`
`)};if(e.getCommandNames().includes(o.toLowerCase())){const l=Ai.has(o.toLowerCase())?`/usr/local/bin/${o}`:`/usr/bin/${o}`;r.push(l)}return r.length===0?{output:`which: ${o}: command not found`,error:!0}:{output:r.join(`
`)}}function yi(o){return{name:"whoami",description:"Display current username",execute:(e,t)=>new G(e).hasFlag("help")?{output:`Usage: whoami

Description:
  Display the current username

Examples:
  whoami               # Show current user`}:{output:o.getUsername()}}}function Ii(o){return{name:"cat",description:"Display file contents",execute:(e,t)=>{if(new G(e).hasFlag("help"))return{output:`Usage: cat <file>

Description:
  Display file contents

Examples:
  cat file.txt         # Display file
  cat ~/blog/post.md   # Display from path
  cat file.txt | grep hello  # Use in pipeline
  echo "data" | cat    # Read from stdin`};if(e.length===0)return t!==void 0?{output:t}:{output:`cat: missing file operand
Try 'cat --help' for more information`,error:!0};try{return{output:o.readFile(e[0])}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function bi(o,e,t){return{name:"cd",description:"Change directory (supports - for previous directory)",execute:(n,r)=>{if(new G(n).hasFlag("help"))return{output:`Usage: cd [directory]

Description:
  Change current working directory

Examples:
  cd                   # Go to home directory
  cd ~/blog            # Change to blog directory
  cd -                 # Go to previous directory`};try{let s=n[0]||"~";if(s==="-"&&t){const a=t.getVariable("OLDPWD");if(!a)return{output:"cd: OLDPWD not set",error:!0};s=a}if(t){const a=t.getVariable("PWD")??o.getCurrentPath();t.setVariable("OLDPWD",a)}return o.changeDirectory(s),t&&t.setVariable("PWD",o.getCurrentPath()),e(o.getShortPath()),{output:""}}catch(s){return{output:s instanceof Error?s.message:String(s),error:!0}}}}}function wi(o,e){if(!e)return o.toString();const t=["B","K","M","G","T"];let n=o,r=0;for(;n>=1024&&r<t.length-1;)n/=1024,r++;return`${r===0?n.toString():n.toFixed(1)}${t[r]}`}function Si(o){const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][o.getMonth()],n=o.getDate().toString().padStart(2," "),r=o.getHours().toString().padStart(2,"0"),i=o.getMinutes().toString().padStart(2,"0");return`${t} ${n} ${r}:${i}`}function ir(o,e){const t=o.permissions??"-rw-r--r--",n="1",r=o.owner??"darin",i="staff",s=wi(o.size??0,e),a=Si(o.modifiedTime??new Date),l=o.name,c=s.padStart(6," ");return`${t}  ${n} ${r}  ${i}  ${c} ${a} ${l}`}function vi(o){const e=o.reduce((t,n)=>t+(n.size??0),0);return Math.ceil(e/512)}function Ci(o){return{name:"ls",description:"List directory contents",execute:(e,t)=>{try{const n=new G(e);if(n.hasFlag("help"))return{output:`Usage: ls [options] [path]

Description:
  List directory contents

Options:
  -a                   Show hidden files
  -l                   Long format with details
  -h                   Human-readable sizes

Examples:
  ls                   # List current directory
  ls -la               # List all files with details
  ls ~/blog            # List specific directory`};const r=n.getPositional(0)??".",i=n.hasFlag("a"),s=n.hasFlag("l"),a=n.hasFlag("h"),l=o.getNode(r);if(!l)return{output:`ls: cannot access '${r}': No such file or directory
Try 'ls --help' for more information`,error:!0};if(l.type==="file")return s?{output:ir(l,a)}:{output:l.name};if(!l.children)return{output:""};let c=Array.from(l.children.values());return i||(c=c.filter(d=>!d.isHidden)),c.length===0?{output:""}:(c.sort((d,g)=>d.name.localeCompare(g.name)),s?{output:[`total ${vi(c)}`,...c.map(f=>ir(f,a))].join(`
`)}:{output:c.map(g=>g.name).join("  ")})}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}function Ri(o){return{name:"pwd",description:"Print working directory",execute:(e,t)=>new G(e).hasFlag("help")?{output:`Usage: pwd

Description:
  Print current working directory path

Examples:
  pwd                  # Show current directory`}:{output:o.getCurrentPath()}}}const xi=`Usage: rm [OPTION]... FILE...

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
  rm -rf /             # Don't try this at home`;function Ni(){return'<div data-melt class="melt-trigger"></div>'}function ki(o,e){return{name:"rm",description:"Remove files or directories",execute:(t,n)=>{const r=new G(t);if(r.hasFlag("help"))return{output:xi};const i=r.getFlag("recursive"),s=r.getFlag("force"),a=r.getFlag("f"),l=r.hasFlag("r")||r.hasFlag("R")||i!==void 0,c=r.hasFlag("f")||s!==void 0,d=[...r.getAllPositionals()];if(typeof i=="string"&&d.push(i),typeof s=="string"&&d.push(s),typeof a=="string"&&d.push(a),d.length===0)return{output:`rm: missing operand
Try 'rm --help' for more information`,error:!0};if(l&&c&&d.some(v=>v==="/"||v==="/*"))return{output:Ni(),html:!0};const g=[];let f=!1;for(const E of d)try{if(!o.exists(E)){c||(g.push(`rm: cannot remove '${E}': No such file or directory`),f=!0);continue}if(o.isDirectory(E)){if(!l){g.push(`rm: cannot remove '${E}': Is a directory`),f=!0;continue}o.deleteDirectory(E,!0)}else{const $=E.startsWith("/")?E:`${o.getCurrentPath()}/${E}`.replace(/\/+/g,"/");if($.startsWith("/usr/bin/")||$.startsWith("/usr/local/bin/")){const y=$.split("/").pop();y&&e.unregisterCommand(y)}o.deleteFile(E)}}catch(v){c||(g.push(v instanceof Error?v.message:String(v)),f=!0)}return c?{output:"",error:!1}:{output:g.join(`
`),error:f}}}}function Mi(o){return{name:"tree",description:"Display directory tree structure",execute:(e,t)=>{try{const n=new G(e);if(n.hasFlag("help"))return{output:`Usage: tree [options] [path]

Description:
  Display directory tree structure

Options:
  -L <depth>           Limit tree depth (default: 4)

Examples:
  tree                 # Show tree of current directory
  tree ~/blog          # Show tree of specific directory
  tree -L 2            # Limit depth to 2 levels`};const r=n.getPositional(0)??".";let i=4;const s=n.getFlag("L");if(s!==void 0){if(typeof s=="boolean")return{output:`tree: -L flag requires a depth value
Try 'tree --help' for more information`,error:!0};const c=parseInt(s,10);if(isNaN(c)||c<1)return{output:`tree: invalid level, must be a positive integer
Try 'tree --help' for more information`,error:!0};i=c}return{output:o.getTree(r,i).join(`
`),scrollBehavior:"top"}}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}const Te={HOME_DARIN:"/home/darin",HOME_GUEST:"/home/guest",CONTENT_BLOG:"/home/darin/blog",CONTENT_PORTFOLIO:"/home/darin/portfolio",CONTENT_POSTS:"/home/darin/posts",CONTENT_HELP:"/home/darin/content/help.md",CONTENT_ABOUT:"/home/darin/content/about.md",CONTENT_CONTACT:"/home/darin/content/contact.md",CONFIG_ALIASES:"/home/guest/.alias",CONFIG_SETTINGS:"/home/darin/.settings",CONFIG_ENV:"/home/darin/.env"},Pr={CLEAR_SCREEN:"__CLEAR__"},dn={SETTINGS:"terminal_settings",ENVIRONMENT:"terminal_env_vars"},Ke={EMPTY_PORTFOLIO:"No portfolio projects yet. Check back soon!",EMPTY_BLOG:"No blog posts yet. Check back soon!",EMPTY_POSTS:"No notes yet. Check back soon!",NO_TAGS_AVAILABLE:"No tags available yet."},sr={theme:{preset:"dc",customColors:void 0},font:{size:16,family:"Fira Code"},effects:{scanLines:!1,glow:!1,border:!0,animationSpeed:1,soundEffects:!1,autoScrollBehavior:!0},prompt:{format:"\\W \\$ "},screensaver:{enabled:!0,timeoutMinutes:5,activeScreensaver:"matrix"}},ct={MIN_TIMEOUT_MINUTES:1,MAX_TIMEOUT_MINUTES:60,ACTIVITY_DEBOUNCE_MS:100};class Oe{static makeCommandsClickable(e,t){const n=new Set(t);return e.replace(/<code>([^<]+)<\/code>/g,(r,i)=>{const s=i.trim();return n.has(s)?`<a data-command="${s}" class="command-link"><code>${s}</code></a>`:r})}static formatClickableTag(e,t){return`<button data-command="${`${t} --tags ${e}`}" class="tag-link">${e}</button>`}static formatPortfolioList(e,t){const n=t?`# Portfolio - Tag: ${t}`:"# Portfolio",r=e.map((s,a)=>{const l=s.tags?.map(d=>this.formatClickableTag(d,"portfolio")).join(" ")??"",c=l?`

**Tags:** ${l}`:"";return`### <a href="/portfolio/${s.id}" data-command="portfolio ${s.id}">${a+1}. ${s.title} (${s.year})</a>

${s.summary}${c}
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

<a href="/portfolio" data-command="portfolio">← Back to Portfolio</a>`}static formatBlogList(e,t){const n=t?`# Blog Posts - Tag: ${t}`:"# Blog Posts",r=e.map((s,a)=>{const l=s.tags.map(d=>this.formatClickableTag(d,"blog")).join(" "),c=e.length-a;return`### <a href="/blog/${s.id}" data-command="blog ${s.id}">${c}. ${s.title}</a>

**Date:** ${s.date}

${s.summary}

**Tags:** ${l}
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

**Posted on:** ${n}`}}static formatPostList(e,t){const n=t?`# Notes - Tag: ${t}`:"# Notes",r=e.map((s,a)=>{const l=s.tags.map(f=>this.formatClickableTag(f,"notes")).join(" "),c=e.length-a,{badges:d,links:g}=this.formatPostedLinks(s.posted);return`### <a href="/notes/${s.id}" data-command="notes ${s.id}">${c}. ${s.title}</a>

**${s.date}**${d}

${s.content}${g}

**Tags:** ${l}
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

<a href="/notes" data-command="notes">← Back to Notes</a>`}}function Oi(o,e=[]){return{name:"about",description:"Display bio and expertise overview",execute:(t,n)=>{if(new G(t).hasFlag("help"))return{output:`Usage: about

Description:
  Display professional bio and expertise overview

Examples:
  about                # Show bio and background`};try{const i=o.readFile(Te.CONTENT_ABOUT),s=Y.render(i);return{output:Oe.makeCommandsClickable(s,e),html:!0,scrollBehavior:"top"}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}}}function Di(o){if(typeof o!="object"||o===null)return!1;const e=o;return typeof e.title=="string"&&typeof e.date=="string"&&typeof e.summary=="string"&&Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string")}class Fr{static parseFrontmatter(e){const t=e.split(`
`);if(t[0]?.trim()!=="---")throw new Error("Invalid frontmatter: must start with ---");let n=-1;for(let a=1;a<t.length;a++)if(t[a].trim()==="---"){n=a;break}if(n===-1)throw new Error("Invalid frontmatter: no closing ---");const r=t.slice(1,n),i=t.slice(n+1),s={};for(const a of r){const l=a.indexOf(":");if(l===-1)continue;const c=a.substring(0,l).trim(),d=a.substring(l+1).trim();if(d.startsWith("[")&&d.endsWith("]")){const g=d.substring(1,d.length-1);s[c]=g.split(",").map(f=>f.trim().replace(/^["']|["']$/g,"")).filter(f=>f.length>0)}else s[c]=d.replace(/^["']|["']$/g,"")}if(!Di(s)){const a=[];throw s.title||a.push("title"),s.date||a.push("date"),s.summary||a.push("summary"),Array.isArray(s.tags)||a.push("tags"),new Error(`Invalid blog frontmatter: missing or invalid fields: ${a.join(", ")}`)}return{frontmatter:s,markdown:i.join(`
`).trim()}}static parseBlogPost(e,t){const{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:e.replace(/^\d{4}-\d{2}-\d{2}-/,"").replace(/\.md$/,""),title:n.title,date:n.date,summary:n.summary,content:r,tags:n.tags}}static getIdFromFilename(e){return e.replace(/^\d{4}-\d{2}-\d{2}-/,"").replace(/\.md$/,"")}}function Pi(o){return{name:"blog",description:"List and read blog posts",execute:(e,t)=>{const n=new G(e);if(n.hasFlag("help"))return{output:`Usage: blog [options] [post-id|number]

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
  blog post-id                  # Read specific post by ID`};const r=Te.CONTENT_BLOG;try{const s=o.list(r).filter(w=>w.endsWith(".md")).sort().reverse(),a=n.getFlag("tags"),l=n.hasFlag("tags"),c=n.getPositional(0),d=[];for(const w of s){const $=o.readFile(`${r}/${w}`),y=Fr.parseBlogPost(w,$);d.push(y)}if(d.length===0&&!l&&!c){const w=`# Blog

${Ke.EMPTY_BLOG}`;return{output:Y.render(w),html:!0,scrollBehavior:"top"}}if(l&&(typeof a=="boolean"||!a)){const w=new Set,$=new Map;d.forEach(k=>{k.tags?.forEach(W=>{w.add(W),$.set(W,($.get(W)??0)+1)})});const y=Array.from(w).sort();if(y.length===0){const k=`# Blog Tags

${Ke.NO_TAGS_AVAILABLE}`;return{output:Y.render(k),html:!0,scrollBehavior:"top"}}const S=`# Blog Tags

${y.map(k=>{const W=$.get(k)??0;return`- <button data-command="blog --tags ${k}" class="tag-link">${k}</button> (${W} post${W!==1?"s":""})`}).join(`
`)}

---

**Usage:** Type \`blog --tags <tag>\` to filter posts`;return{output:Y.render(S),html:!0,scrollBehavior:"top"}}if(c){let w;const $=parseInt(c,10);if(!isNaN($)&&$>0&&$<=d.length){const S=d.length-$;w=d[S]}else w=d.find(S=>S.id===c);if(!w)return{output:`Blog post '${c}' not found.
Use 'blog' to list all posts.
Try 'blog --help' for more information`,error:!0};const y=Oe.formatBlogPost(w);return{output:Y.render(y),html:!0,scrollBehavior:"top"}}let g=d;const f=typeof a=="string"?a:void 0;if(f&&(g=d.filter(w=>w.tags.some($=>$.toLowerCase()===f.toLowerCase())),g.length===0)){const w=new Map;d.forEach(N=>{N.tags?.forEach(S=>{w.set(S,(w.get(S)??0)+1)})});const $=Array.from(w.entries()).sort((N,S)=>S[1]-N[1]).slice(0,5).map(([N])=>N),y=$.length>0?`
Try one of these tags: ${$.join(", ")}`:"";return{output:`No blog posts found with tag '${f}'.${y}
Use 'blog' to see all posts.`,error:!1}}const E=Oe.formatBlogList(g,f);return{output:Y.render(E),html:!0,scrollBehavior:"top"}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}}}class Pe{static parse(e){const t=[],n=e.split(`
`);let r=null,i=null,s=[];const a=/^## \[([^\]]+)\] - (\d{4}-\d{2}-\d{2})/,l=/^### (\w+)/,c=/^- (.+)/;for(const d of n){const g=a.exec(d);if(g){r&&(r.rawContent=s.join(`
`).trim(),t.push(r)),r={version:g[1],date:g[2],sections:{},rawContent:""},i=null,s=[d];continue}r&&s.push(d);const f=l.exec(d);if(f&&r){i=f[1],r.sections[i]=[];continue}const E=c.exec(d);E&&r&&i&&r.sections[i].push(E[1])}return r&&(r.rawContent=s.join(`
`).trim(),t.push(r)),t}static getVersion(e,t){return e.find(n=>n.version===t)}static getByIndex(e,t){if(!(t<1||t>e.length))return e[t-1]}static formatEntry(e){const t=[];t.push(`## Version ${e.version}`),t.push(`*Released: ${e.date}*`),t.push("");for(const[n,r]of Object.entries(e.sections)){t.push(`### ${n}`);for(const i of r)t.push(`- ${i}`);t.push("")}return t.join(`
`)}static formatEntries(e){const t=`# Changelog

All notable changes to this project are documented here.

---

`,n=e.map(r=>this.formatEntry(r)).join(`
---

`);return t+n}}function Fi(o){return{name:"changelog",description:"View project version history",execute:(e,t)=>{const n=new G(e);if(n.hasFlag("help"))return{output:`Usage: changelog [options] [version|number]

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
  changelog 0.22.0           # Show specific version`};try{const r=Pe.parse(o);if(r.length===0)return{output:"No changelog entries found.",error:!0};const i=n.getPositional(0);if(i){if(i.toLowerCase()==="latest"){const f=r[0],E=Pe.formatEntry(f);return{output:Y.render(E),html:!0,scrollBehavior:"top"}}if(/^\d+$/.test(i)){const f=parseInt(i,10);if(f>0){const E=Pe.getByIndex(r,f);if(!E)return{output:`Version at position ${f} not found. There are ${r.length} versions available.
Try 'changelog --help' for more information.`,error:!0};const v=Pe.formatEntry(E);return{output:Y.render(v),html:!0,scrollBehavior:"top"}}}const c=Pe.getVersion(r,i);if(!c){const f=r.slice(0,5).map(E=>E.version).join(", ");return{output:`Version '${i}' not found.
Recent versions: ${f}
Try 'changelog --help' for more information.`,error:!0}}const d=Pe.formatEntry(c);return{output:Y.render(d),html:!0,scrollBehavior:"top"}}const s=Pe.formatEntries(r);return{output:Y.render(s),html:!0,scrollBehavior:"top"}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Hi(o){return{name:"contact",description:"Display contact information",execute:(e,t)=>{if(new G(e).hasFlag("help"))return{output:`Usage: contact

Description:
  Display contact information and professional links

Examples:
  contact              # Show contact details`};try{const r=o.readFile(Te.CONTENT_CONTACT);return{output:Y.render(r),html:!0}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Ui(o){if(typeof o!="object"||o===null)return!1;const e=o;return typeof e.title=="string"&&typeof e.date=="string"&&Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string")}function Bi(o){const e=[];let t=null;for(const n of o){const r=n.trim();if(r.startsWith("- ")){t?.platform&&t?.url&&e.push({platform:t.platform,url:t.url}),t={};const i=r.substring(2).trim(),s=i.indexOf(":");if(s!==-1){const a=i.substring(0,s).trim(),l=i.substring(s+1).trim().replace(/^["']|["']$/g,"");a==="platform"&&(t.platform=l),a==="url"&&(t.url=l)}}else if(t){const i=r.indexOf(":");if(i!==-1){const s=r.substring(0,i).trim(),a=r.substring(i+1).trim().replace(/^["']|["']$/g,"");s==="platform"&&(t.platform=a),s==="url"&&(t.url=a)}}}return t?.platform&&t?.url&&e.push({platform:t.platform,url:t.url}),e}class Hr{static parseFrontmatter(e){const t=e.split(`
`);if(t[0]?.trim()!=="---")throw new Error("Invalid frontmatter: must start with ---");let n=-1;for(let l=1;l<t.length;l++)if(t[l].trim()==="---"){n=l;break}if(n===-1)throw new Error("Invalid frontmatter: no closing ---");const r=t.slice(1,n),i=t.slice(n+1),s={};let a=0;for(;a<r.length;){const l=r[a],c=l.indexOf(":");if(c===-1){a++;continue}const d=l.substring(0,c).trim(),g=l.substring(c+1).trim();if(d==="posted"&&g===""){const f=[];for(a++;a<r.length;){const E=r[a];if(/^\s+(- |[\w])/.exec(E))f.push(E),a++;else break}s[d]=Bi(f);continue}if(g.startsWith("[")&&g.endsWith("]")){const f=g.substring(1,g.length-1);s[d]=f.split(",").map(E=>E.trim().replace(/^["']|["']$/g,"")).filter(E=>E.length>0)}else s[d]=g.replace(/^["']|["']$/g,"");a++}if(!Ui(s)){const l=[];throw s.title||l.push("title"),s.date||l.push("date"),Array.isArray(s.tags)||l.push("tags"),new Error(`Invalid post frontmatter: missing or invalid fields: ${l.join(", ")}`)}return{frontmatter:s,markdown:i.join(`
`).trim()}}static parsePost(e,t){const{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:this.getIdFromFilename(e),title:n.title,date:n.date,content:r,tags:n.tags,...n.posted&&n.posted.length>0&&{posted:n.posted}}}static getIdFromFilename(e){return e.replace(/^\d{4}-\d{2}-\d{2}-/,"").replace(/\.md$/,"")}}function Wi(o){return{name:"notes",description:"List and read short-form notes",execute:(e,t)=>{const n=new G(e);if(n.hasFlag("help"))return{output:`Usage: notes [options] [note-id|number]

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
  notes note-id                 # Read specific note by ID`};const r=Te.CONTENT_POSTS;try{const s=o.list(r).filter(w=>w.endsWith(".md")).sort().reverse(),a=n.getFlag("tags"),l=n.hasFlag("tags"),c=n.getPositional(0),d=[];for(const w of s){const $=o.readFile(`${r}/${w}`),y=Hr.parsePost(w,$);d.push(y)}if(d.length===0&&!l&&!c){const w=`# Notes

${Ke.EMPTY_POSTS}`;return{output:Y.render(w),html:!0,scrollBehavior:"top"}}if(l&&(typeof a=="boolean"||!a)){const w=new Set,$=new Map;d.forEach(k=>{k.tags?.forEach(W=>{w.add(W),$.set(W,($.get(W)??0)+1)})});const y=Array.from(w).sort();if(y.length===0){const k=`# Note Tags

${Ke.NO_TAGS_AVAILABLE}`;return{output:Y.render(k),html:!0,scrollBehavior:"top"}}const S=`# Note Tags

${y.map(k=>{const W=$.get(k)??0;return`- <button data-command="notes --tags ${k}" class="tag-link">${k}</button> (${W} note${W!==1?"s":""})`}).join(`
`)}

---

**Usage:** Type \`notes --tags <tag>\` to filter notes`;return{output:Y.render(S),html:!0,scrollBehavior:"top"}}if(c){let w;const $=parseInt(c,10);if(!isNaN($)&&$>0&&$<=d.length){const S=d.length-$;w=d[S]}else w=d.find(S=>S.id===c);if(!w)return{output:`Note '${c}' not found.
Use 'notes' to list all notes.
Try 'notes --help' for more information`,error:!0};const y=Oe.formatPostDetail(w);return{output:Y.render(y),html:!0,scrollBehavior:"top"}}let g=d;const f=typeof a=="string"?a:void 0;if(f&&(g=d.filter(w=>w.tags.some($=>$.toLowerCase()===f.toLowerCase())),g.length===0)){const w=new Map;d.forEach(N=>{N.tags?.forEach(S=>{w.set(S,(w.get(S)??0)+1)})});const $=Array.from(w.entries()).sort((N,S)=>S[1]-N[1]).slice(0,5).map(([N])=>N),y=$.length>0?`
Try one of these tags: ${$.join(", ")}`:"";return{output:`No notes found with tag '${f}'.${y}
Use 'notes' to see all notes.`,error:!1}}const E=Oe.formatPostList(g,f);return{output:Y.render(E),html:!0,scrollBehavior:"top"}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}}}function Gi(o){if(typeof o!="object"||o===null)return!1;const e=o;return typeof e.id=="string"&&typeof e.title=="string"&&typeof e.summary=="string"&&typeof e.year=="string"&&typeof e.order=="number"&&Array.isArray(e.technologies)&&e.technologies.every(t=>typeof t=="string")&&(e.impact===void 0||typeof e.impact=="string")&&(e.tags===void 0||Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string"))}class zi{static parseFrontmatter(e){const t=e.split(`
`);if(t[0]?.trim()!=="---")throw new Error("Invalid frontmatter: must start with ---");let n=-1;for(let a=1;a<t.length;a++)if(t[a].trim()==="---"){n=a;break}if(n===-1)throw new Error("Invalid frontmatter: no closing ---");const r=t.slice(1,n),i=t.slice(n+1),s={};for(const a of r){const l=a.indexOf(":");if(l===-1)continue;const c=a.substring(0,l).trim(),d=a.substring(l+1).trim();if(d.startsWith("[")&&d.endsWith("]")){const g=d.substring(1,d.length-1);s[c]=g.split(",").map(f=>f.trim().replace(/^["']|["']$/g,"")).filter(f=>f.length>0)}else{const g=d.replace(/^["']|["']$/g,"");if(c==="order"){const f=Number(g);s[c]=isNaN(f)?g:f}else s[c]=g}}if(!Gi(s)){const a=[];throw s.id||a.push("id"),s.title||a.push("title"),s.summary||a.push("summary"),s.year||a.push("year"),typeof s.order!="number"&&a.push("order"),Array.isArray(s.technologies)||a.push("technologies"),new Error(`Invalid portfolio frontmatter: missing or invalid fields: ${a.join(", ")}`)}return{frontmatter:s,markdown:i.join(`
`).trim()}}static parseProject(e,t){const{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:n.id||e.replace(/\.md$/,""),title:n.title,summary:n.summary,description:r,technologies:n.technologies,impact:n.impact,year:n.year,order:n.order,tags:n.tags}}static getIdFromFilename(e){return e.replace(/\.md$/,"")}}function Vi(o){return{name:"portfolio",description:"Showcase projects and accomplishments",execute:(e,t)=>{const n=new G(e);if(n.hasFlag("help"))return{output:`Usage: portfolio [options] [project-id|number]

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
  portfolio proj-id             # View specific project by ID`};const r=Te.CONTENT_PORTFOLIO;try{const s=o.list(r).filter($=>$.endsWith(".md")),a=n.getFlag("tags"),l=n.hasFlag("tags"),c=n.getPositional(0),d=[];for(const $ of s){const y=o.readFile(`${r}/${$}`);if(y)try{const N=zi.parseProject($,y);d.push(N)}catch(N){console.error(`Error parsing ${$}:`,N)}}if(d.sort(($,y)=>$.order!==y.order?$.order-y.order:$.title.localeCompare(y.title)),d.length===0&&!l&&!c){const $=`# Portfolio

${Ke.EMPTY_PORTFOLIO}`;return{output:Y.render($),html:!0,scrollBehavior:"top"}}if(l&&(typeof a=="boolean"||!a)){const $=new Set,y=new Map;d.forEach(W=>{W.tags?.forEach(re=>{$.add(re),y.set(re,(y.get(re)??0)+1)})});const N=Array.from($).sort();if(N.length===0){const W=`# Portfolio Tags

${Ke.NO_TAGS_AVAILABLE}`;return{output:Y.render(W),html:!0,scrollBehavior:"top"}}const x=`# Portfolio Tags

${N.map(W=>{const re=y.get(W)??0;return`- <button data-command="portfolio --tags ${W}" class="tag-link">${W}</button> (${re} project${re!==1?"s":""})`}).join(`
`)}

---

**Usage:** Type \`portfolio --tags <tag>\` to filter projects`;return{output:Y.render(x),html:!0,scrollBehavior:"top"}}if(c){let $;const y=parseInt(c,10);if(!isNaN(y)&&y>0&&y<=d.length){const x=y-1;$=d[x]}else $=d.find(x=>x.id===c);if(!$)return{output:`Project '${c}' not found.
Use 'portfolio' to list all projects.
Try 'portfolio --help' for more information`,error:!0};const N=Oe.formatPortfolioDetail($);return{output:Y.render(N),html:!0,scrollBehavior:"top"}}let g=d,f=[];if(l&&typeof a=="string"&&(f=a.split(",").map($=>$.trim().toLowerCase()),g=d.filter($=>$.tags?.some(y=>f.includes(y.toLowerCase()))),g.length===0)){const $=f.map(x=>`'${x}'`).join(", "),y=new Map;d.forEach(x=>{x.tags?.forEach(k=>{y.set(k,(y.get(k)??0)+1)})});const N=Array.from(y.entries()).sort((x,k)=>k[1]-x[1]).slice(0,5).map(([x])=>x),S=N.length>0?`
Try one of these tags: ${N.join(", ")}`:"";return{output:`No projects found with tag${f.length>1?"s":""} ${$}.${S}
Use 'portfolio' to see all projects.`,error:!1}}const E=f.length>0?f.join(", "):void 0,v=Oe.formatPortfolioList(g,E);return{output:Y.render(v),html:!0,scrollBehavior:"top"}}catch(i){return{output:`Error loading portfolio: ${String(i)}`,error:!0}}}}}function Ur(o,e){const t=o.loadSettings(),n=e.getPresets();return`<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true"><h2>Terminal Settings</h2><section class="settings-section"><h3>Color Theme</h3>${ji(n,t.theme.preset)}</section><section class="settings-section"><details ${t.theme.preset==="custom"?"open":""}><summary>Advanced: Custom Colors</summary>${Yi(t.theme.customColors)}</details></section><section class="settings-section"><h3>Font</h3>${qi(t.font)}</section><section class="settings-section"><h3>Effects</h3>${Xi(t.effects)}</section><section class="settings-section"><h3>Screensaver</h3>${Ki(t.screensaver)}</section><div class="settings-actions"><button data-command="settings reset" class="btn-reset">Reset to Defaults</button></div></aside>`}function ji(o,e){return'<div class="theme-buttons-container">'+o.map(t=>`<button class="theme-button ${t.name===e?"active":""}" data-command="settings set theme ${t.name}" data-theme="${t.name}" style="background: ${t.colors["--terminal-bg"]}; color: ${t.colors["--terminal-accent"]}; border-color: ${t.colors["--terminal-accent"]};"><span class="theme-preview" style="background: ${t.colors["--terminal-accent"]}"></span>${t.displayName}</button>`).join("")+"</div>"}function Yi(o){return[{key:"--terminal-bg",label:"Background",prop:"background"},{key:"--terminal-bg-secondary",label:"BG (Secondary)",prop:"backgroundSecondary"},{key:"--terminal-fg",label:"Foreground",prop:"foreground"},{key:"--terminal-accent",label:"Accent",prop:"accent"},{key:"--terminal-dim",label:"Dim",prop:"dim"},{key:"--terminal-error",label:"Error",prop:"error"},{key:"--terminal-cursor",label:"Cursor",prop:"cursor"}].map(t=>{const n=o?.[t.prop]??(typeof window<"u"?getComputedStyle(document.documentElement).getPropertyValue(t.key).trim():"#000000");return`<div class="color-picker-group"><label>${t.label}</label><input type="color" value="${n}" data-command-template="settings set color ${t.key}" data-color-var="${t.key}"/><span class="color-value">${o?.[t.prop]??"default"}</span></div>`}).join("")}function qi(o){const e=["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"];return`<div class="setting-group"><label>Font Size: <span id="font-size-value">${o.size}px</span></label><input type="range" min="8" max="24" step="1" value="${o.size}" aria-label="Font size" aria-valuemin="8" aria-valuemax="24" aria-valuenow="${o.size}" aria-valuetext="${o.size} pixels" data-command-template="settings set font-size" data-setting-type="font-size"/></div><div class="setting-group"><label>Font Family</label><select aria-label="Font family" data-command-template="settings set font-family" data-setting-type="font-family">${e.map(t=>`<option value="${t}" ${t===o.family?"selected":""}>${t}</option>`).join("")}</select></div>`}function Xi(o){return`<div class="setting-group"><label><input type="checkbox" ${o.scanLines?"checked":""} data-command-template="settings set scan-lines" data-setting-type="scan-lines"/>Scan Lines</label></div><div class="setting-group"><label><input type="checkbox" ${o.glow?"checked":""} data-command-template="settings set glow" data-setting-type="glow"/>Glow Effect</label></div><div class="setting-group"><label><input type="checkbox" ${o.border?"checked":""} data-command-template="settings set border" data-setting-type="border"/>Page Border</label></div><div class="setting-group"><label>Animation Speed: <span id="animation-speed-value">${o.animationSpeed}x</span></label><input type="range" min="0.5" max="2.0" step="0.1" value="${o.animationSpeed}" aria-label="Animation speed" aria-valuemin="0.5" aria-valuemax="2" aria-valuenow="${o.animationSpeed}" aria-valuetext="${o.animationSpeed} times speed" data-command-template="settings set animation-speed" data-setting-type="animation-speed"/></div><div class="setting-group"><label><input type="checkbox" ${o.soundEffects?"checked":""} data-command-template="settings set sound-effects" data-setting-type="sound-effects"/>Sound Effects (future feature)</label></div>`}function Ki(o){const e=[{value:"matrix",label:"Matrix Digital Rain"},{value:"life",label:"Conway's Game of Life"}];return`<div class="setting-group"><label><input type="checkbox" ${o.enabled?"checked":""} data-command-template="settings set screensaver-enabled" data-setting-type="screensaver-enabled"/>Enable Screensaver</label></div><div class="setting-group"><label>Timeout: <span id="screensaver-timeout-value">${o.timeoutMinutes}min</span></label><input type="range" min="1" max="60" step="1" value="${o.timeoutMinutes}" aria-label="Screensaver timeout" aria-valuemin="1" aria-valuemax="60" aria-valuenow="${o.timeoutMinutes}" aria-valuetext="${o.timeoutMinutes} minutes" data-command-template="settings set screensaver-timeout" data-setting-type="screensaver-timeout"/></div><div class="setting-group"><label>Screensaver Type</label><select aria-label="Screensaver type" data-command-template="settings set screensaver-type" data-setting-type="screensaver-type">${e.map(t=>`<option value="${t.value}" ${t.value===o.activeScreensaver?"selected":""}>${t.label}</option>`).join("")}</select></div>`}function Zi(o,e,t){return{name:"settings",description:"Manage terminal settings and preferences",aliases:["preferences","config"],execute:(n,r)=>{const i=new G(n);if(i.hasFlag("help"))return{output:`Usage: settings [subcommand] [options]

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
  settings reset       # Reset all settings`};if(n.length===0)return{output:Ur(e,t),html:!0};const s=i.getPositional(0);switch(s){case"list":return Ji(e,t);case"set":return ar(i,e,t);case"reset":return Qi(e,t);case"theme":case"font-size":case"font-family":case"fontSize":case"fontFamily":case"scan-lines":case"scanLines":case"glow":case"border":case"animation-speed":case"animationSpeed":case"sound":case"auto-scroll":case"autoScroll":case"prompt":case"screensaver-enabled":case"screensaverEnabled":case"screensaver-timeout":case"screensaverTimeout":case"screensaver-type":case"screensaverType":return ar(new G(["set",s,...n.slice(1)]),e,t);default:return{output:`Unknown subcommand: ${s}.
Try 'settings --help' for more information`,error:!0}}}}}function Ji(o,e){const t=es(o,e);return{output:Y.render(t),html:!0}}function ar(o,e,t){const n=o.getPositional(1),r=o.getPositional(2);if(!n)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};if(n!=="color"&&!r)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};try{switch(n){case"theme":{const i=["green","yellow","white","light-blue","paper","dc"];return i.includes(r)?(e.setSetting("theme",{preset:r}),t.applyTheme(r),ce(),{output:`Theme changed to: ${r}`}):{output:`Invalid theme: ${r}. Available: ${i.join(", ")}`,error:!0}}case"color":{const i=["terminal-bg","terminal-fg","terminal-accent","terminal-dim","terminal-error","terminal-cursor","terminal-bg-secondary"];let s,a;for(const c of i){const d=o.getFlag(c);if(d&&typeof d=="string"){s="--"+c,a=d;break}}if(!s||!a)return{output:`Usage: settings set color <variable> <value>
Example: settings set color --terminal-accent #ff0000`,error:!0};const l={[s]:a};return t.applyCustomColors(l),ce(),{output:`Color ${s} set to ${a}`}}case"font-size":case"fontSize":{if(!r)return{output:"Font size value required",error:!0};const i=parseInt(r,10);return isNaN(i)?{output:"Font size must be a number (8-24)",error:!0}:(e.setFontSize(i),un(e),ce(),{output:`Font size set to: ${i}px`})}case"font-family":case"fontFamily":{if(!r)return{output:"Font family value required",error:!0};const i=["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"];return i.includes(r)?(e.setFontFamily(r),un(e),ce(),{output:`Font family set to: ${r}`}):{output:`Invalid font family: ${r}. Available: ${i.join(", ")}`,error:!0}}case"scan-lines":case"scanLines":{if(!r)return{output:"Scan lines value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Scan lines must be "on" or "off"',error:!0};const i=r==="on";return e.setScanLines(i),Br(i),ce(),{output:`Scan lines: ${r}`}}case"glow":{if(!r)return{output:"Glow value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Glow must be "on" or "off"',error:!0};const i=r==="on";return e.setGlow(i),Wr(i),ce(),{output:`Glow: ${r}`}}case"border":{if(!r)return{output:"Border value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Border must be "on" or "off"',error:!0};const i=r==="on";return e.setBorder(i),Gr(i),ce(),{output:`Border: ${r}`}}case"animation-speed":case"animationSpeed":{if(!r)return{output:"Animation speed value required",error:!0};const i=parseFloat(r);return isNaN(i)?{output:"Animation speed must be a number (0.5-2.0)",error:!0}:(e.setAnimationSpeed(i),zr(i),ce(),{output:`Animation speed set to: ${i}x`})}case"sound-effects":case"sound":{if(!r)return{output:"Sound effects value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Sound effects must be "on" or "off"',error:!0};const i=r==="on";return e.setSoundEffects(i),ce(),{output:`Sound effects: ${r}`}}case"autoscroll":case"auto-scroll":case"autoScroll":{if(!r)return{output:"Autoscroll value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Autoscroll must be "on" or "off"',error:!0};const i=r==="on";return e.setAutoScrollBehavior(i),ce(),{output:`Autoscroll: ${r} - ${i?"Long content (>50 lines) scrolls to command line":"All content scrolls to bottom"}`}}case"prompt":return r?(e.setPromptFormat(r),ce(),{output:`Prompt format set to: ${r}`}):{output:"Prompt format value required",error:!0};case"screensaver-enabled":case"screensaverEnabled":{if(!r)return{output:"Screensaver enabled value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Screensaver enabled must be "on" or "off"',error:!0};const i=r==="on";return e.setScreensaverEnabled(i),ce(),{output:`Screensaver: ${r}`}}case"screensaver-timeout":case"screensaverTimeout":{if(!r)return{output:"Screensaver timeout value required (1-60 minutes)",error:!0};const i=parseInt(r,10);return isNaN(i)||i<1||i>60?{output:"Screensaver timeout must be between 1 and 60 minutes",error:!0}:(e.setScreensaverTimeout(i),ce(),{output:`Screensaver timeout set to: ${i} minutes`})}case"screensaver-type":case"screensaverType":{if(!r)return{output:"Screensaver type value required",error:!0};const i=["matrix","life"];return i.includes(r)?(e.setActiveScreensaver(r),ce(),{output:`Screensaver type set to: ${r}`}):{output:`Invalid screensaver type: ${r}. Available: ${i.join(", ")}`,error:!0}}default:return{output:`Unknown setting: ${n}. Available: theme, color, font-size, font-family, scan-lines, glow, border, animation-speed, sound-effects, autoscroll, prompt, screensaver-enabled, screensaver-timeout, screensaver-type`,error:!0}}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}function Qi(o,e){return o.reset(),e.applyCurrentTheme(),un(o),Br(o.getScanLines()),Wr(o.getGlow()),Gr(o.getBorder()),zr(o.getAnimationSpeed()),ce(),{output:"Settings reset to defaults."}}function es(o,e){const t=o.loadSettings(),n=e.getPresets();return`# Terminal Settings

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
`}function un(o){const e=o.getSetting("font");typeof document<"u"&&(document.documentElement.style.setProperty("--terminal-font-size",`${e.size}px`),document.documentElement.style.setProperty("--terminal-font-family",e.family))}function Br(o){typeof document<"u"&&(o?document.body.classList.remove("no-scan-lines"):document.body.classList.add("no-scan-lines"))}function Wr(o){typeof document<"u"&&(o?document.body.classList.remove("no-glow"):document.body.classList.add("no-glow"))}function Gr(o){typeof document<"u"&&(o?document.body.classList.add("border-enabled"):document.body.classList.remove("border-enabled"))}function zr(o){typeof document<"u"&&document.documentElement.style.setProperty("--terminal-animation-speed",o.toString())}function ce(){if(typeof document<"u"){const o=new CustomEvent("settings-changed");document.dispatchEvent(o)}}function ts(o){const e=[{type:"bios",text:"PHOENIX BIOS v4.0 Release 6.0"},{type:"bios",text:"Copyright 1985-2025 Phoenix Technologies Ltd."},{type:"bios",text:"CPU: JavaScript V8 Engine @ ∞ GHz"},{type:"bios",text:"Memory Test: 16384 MB OK"},{type:"bios",text:"Detecting IDE drives..."},{type:"bios",text:"  Primary Master: Virtual SSD 256GB"},{type:"kernel",text:"Loading kernel..."},{type:"kernel",text:"[    0.000000] Linux version 6.8.0-darin (darin@darinchambers.com)"},{type:"kernel",text:"[    0.000001] Command line: BOOT_IMAGE=/vmlinuz-6.8.0-darin root=/dev/sda1"},{type:"kernel",text:"[    0.123456] Calibrating delay loop... 7999.99 BogoMIPS (lpj=15999984)"},{type:"kernel",text:"[    0.234567] Memory: 16384MB available"},{type:"kernel",text:"[    0.345678] CPU: JavaScript Virtual CPU"},{type:"kernel",text:"[    0.456789] Mounting root filesystem..."},{type:"ok",text:"Started System Logging Service"},{type:"ok",text:"Started Journal Service"},{type:"ok",text:"Started D-Bus System Message Bus"},{type:"ok",text:"Reached target Local File Systems"},{type:"ok",text:"Started Network Manager"},{type:"failed",text:"Started Bluetooth Service (no adapter found)"},{type:"ok",text:"Started Login Service"},{type:"ok",text:"Started OpenSSH Server"},{type:"ok",text:"Started Docker Container Runtime"},{type:"ok",text:"Started Code Editor Process"},{type:"ok",text:"Started Terminal Emulator"},{type:"ok",text:"Reached target Multi-User System"},{type:"info",text:"darinchambers.com login: darin"},{type:"info",text:"Password: ********"},{type:"welcome",text:"Welcome to darinchambers.com!"},{type:"info",text:"Type 'help' for available commands."}];return o?[{type:"bios",text:"PHOENIX BIOS v4.0"},{type:"bios",text:"Memory Test: 16384 MB OK"},{type:"kernel",text:"Loading kernel..."},{type:"kernel",text:"[    0.000000] Linux version 6.8.0-darin"},{type:"ok",text:"Started System Logging Service"},{type:"ok",text:"Started Network Manager"},{type:"ok",text:"Started Terminal Emulator"},{type:"ok",text:"Reached target Multi-User System"},{type:"welcome",text:"Welcome to darinchambers.com!"}]:e}function ns(o,e=0){const t=ts(o),n=o?80:120;let r=0;return{html:t.map((s,a)=>{const l=e+a*n,c=`boot-line boot-line-${s.type}`,d=s.text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return s.type==="welcome"&&(r=l),`<div class="${c}" style="animation-delay: ${l}ms;">${d}</div>`}).join(`
`),welcomeDelay:r}}const rs={name:"boot",description:"Display simulated Linux boot sequence",execute:(o,e)=>{const t=new G(o);if(t.hasFlag("help"))return{output:`Usage: boot [options]

Display a simulated Linux boot sequence with BIOS POST,
kernel loading, and service startup messages.

Options:
  --fast     Show abbreviated boot sequence
  --help     Display this help message

Examples:
  boot           # Show full boot sequence
  boot --fast    # Show quick boot sequence

Note: Messages appear with timed animation. Scroll or type to stop.`};const n=t.hasFlag("fast"),{html:r,welcomeDelay:i}=ns(n);return{output:`<div class="boot-sequence boot-startup" data-boot-type="boot">
${r}
</div>`,html:!0,clearBefore:!0,fullscreen:!0,fullscreenDuration:i,scrollBehavior:"top"}}},qe=[{code:"SYSTEM_THREAD_EXCEPTION_NOT_HANDLED",description:"A system thread generated an exception that was not handled."},{code:"DRIVER_IRQL_NOT_LESS_OR_EQUAL",description:"A driver attempted to access a pageable memory at an inappropriate IRQL."},{code:"KERNEL_DATA_INPAGE_ERROR",description:"The requested page of kernel data from the paging file could not be read."},{code:"PAGE_FAULT_IN_NONPAGED_AREA",description:"Invalid system memory has been referenced."},{code:"CRITICAL_PROCESS_DIED",description:"A critical system process died unexpectedly."}];function os(o,e){return`<div class="bsod-overlay bsod-modern" data-bsod="true" data-bsod-style="modern">
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
        <p class="bsod-stop-code">Stop code: ${Ne(o)}</p>
        <p class="bsod-description">${Ne(e)}</p>
      </div>
    </div>
  </div>
</div>`}function is(o,e){const t=["0x0000007E","0xC0000005","0xBF8B4C62","0x00000000","0xBF8B4C62"];return`<div class="bsod-overlay bsod-classic" data-bsod="true" data-bsod-style="classic">
  <div class="bsod-classic-content">
    <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
    <br>
    <p>${Ne(o)}</p>
    <br>
    <p>${Ne(e)}</p>
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
</div>`}const ss={name:"bsod",description:"Display a fake Windows Blue Screen of Death",execute:(o,e)=>{const t=new G(o);if(t.hasFlag("help")||t.hasFlag("h"))return{output:`Usage: bsod [options]

Display a fake Windows Blue Screen of Death. Supports two styles:
- Modern (default): Windows 10/11 style with animated progress counter
- Classic: Windows XP/NT style with technical text and blinking cursor

Options:
  --classic         Use Windows XP/NT style BSOD
  --reason <text>   Custom error description
  --error <index>   Select specific error code (0-${qe.length-1})
  --help, -h        Display this help message

Error codes:
${qe.map((c,d)=>`  ${d}: ${c.code}`).join(`
`)}

Examples:
  bsod                     # Modern style with random error
  bsod --classic           # Classic style with random error
  bsod --error 2           # Use specific error code
  bsod --reason "Custom"   # Custom error description

Note: Click anywhere or press any key to dismiss the BSOD.`};const n=t.hasFlag("classic"),r=t.getFlag("reason"),i=t.getFlag("error");let s=qe[Math.floor(Math.random()*qe.length)];if(i!==void 0&&i!==!0){const c=parseInt(String(i),10);!isNaN(c)&&c>=0&&c<qe.length&&(s=qe[c])}const a=typeof r=="string"?r:s.description;return{output:n?is(s.code,a):os(s.code,a),html:!0,clearBefore:!0,scrollBehavior:"top"}}},as=["Chaos","Discord","Confusion","Bureaucracy","The Aftermath"],ls=["Sweetmorn","Boomtime","Pungenday","Prickle-Prickle","Setting Orange"],cs=["Mungday","Mojoday","Syadday","Zaraday","Malbowday"],lr=73,ds=1166;function _n(o){return o%4===0&&o%100!==0||o%400===0}function us(o,e,t){const n=[31,28,31,30,31,30,31,31,30,31,30,31];_n(o)&&(n[1]=29);let r=t;for(let i=0;i<e-1;i++)r+=n[i];return r}function _s(o){const e=o.getFullYear(),t=o.getMonth()+1,n=o.getDate(),r=e+ds,i=us(e,t,n);if(_n(e)&&t===2&&n===29)return{weekday:"",season:"",dayOfSeason:0,yold:r,isStTibsDay:!0};let s=i;_n(e)&&i>60&&(s=i-1);const a=Math.floor((s-1)/lr),l=as[a],c=(s-1)%lr+1,d=(s-1)%5,g=ls[d],f=c===5?cs[a]:void 0;return{weekday:g,season:l,dayOfSeason:c,yold:r,isStTibsDay:!1,apostleDay:f}}function ms(o){return o.isStTibsDay?`St. Tib's Day, ${o.yold} YOLD`:o.apostleDay?`${o.weekday}, ${o.apostleDay}, day ${o.dayOfSeason} of ${o.season}, ${o.yold} YOLD`:`${o.weekday}, ${o.season} ${o.dayOfSeason}, ${o.yold} YOLD`}function hs(o){if(/^\d{4}-\d{2}-\d{2}$/.test(o)){const e=new Date(o);if(!isNaN(e.getTime()))return e}if(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(o)){const e=new Date(o);if(!isNaN(e.getTime()))return e}return null}function ps(o,e,t){if(o<1||o>31||e<1||e>12||t<1)return null;const n=new Date(t,e-1,o);return isNaN(n.getTime())?null:n}const fs={name:"ddate",description:"Display date in Discordian calendar",execute:(o,e)=>{const t=new G(o);if(t.hasFlag("help"))return{output:`Usage: ddate [DATE]

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
  --help                   Display this help message`};let n;if(t.positionalCount===0)n=new Date;else if(t.positionalCount===1){const s=t.getPositional(0),a=hs(s);if(!a)return{output:`ddate: invalid date '${s}'`,error:!0};n=a}else if(t.positionalCount===3){const s=parseInt(t.getPositional(0),10),a=parseInt(t.getPositional(1),10),l=parseInt(t.getPositional(2),10);if(isNaN(a)||isNaN(s)||isNaN(l))return{output:"ddate: invalid numeric date arguments",error:!0};const c=ps(a,s,l);if(!c)return{output:`ddate: invalid date ${s}/${a}/${l}`,error:!0};n=c}else return{output:`ddate: invalid arguments
Try 'ddate --help' for more information.`,error:!0};const r=_s(n);return{output:ms(r)}}},gs={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3};class $s{constructor(){this.comment="",this.numChars=0,this.options={}}}const Qt=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Regular","ANSI Shadow","ANSI-Compact","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Four Tops","Fraktur","Fun Face","Fun Faces","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"];function Ts(o){return/[.*+?^${}()|[\]\\]/.test(o)?"\\"+o:o}const mt=(()=>{const{FULL_WIDTH:o=0,FITTING:e,SMUSHING:t,CONTROLLED_SMUSHING:n}=gs,r={},i={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function s(h,p,u){const m=Ts(h.trim().slice(-1))||"@",T=p===u-1?new RegExp(m+m+"?\\s*$"):new RegExp(m+"\\s*$");return h.replace(T,"")}function a(h=-1,p=null){let u={},m,T=[[16384,"vLayout",t],[8192,"vLayout",e],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",t],[64,"hLayout",e],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];m=p!==null?p:h;for(const[L,I,b]of T)m>=L?(m-=L,u[I]===void 0&&(u[I]=b)):I!=="vLayout"&&I!=="hLayout"&&(u[I]=!1);return typeof u.hLayout>"u"?h===0?u.hLayout=e:h===-1?u.hLayout=o:u.hRule1||u.hRule2||u.hRule3||u.hRule4||u.hRule5||u.hRule6?u.hLayout=n:u.hLayout=t:u.hLayout===t&&(u.hRule1||u.hRule2||u.hRule3||u.hRule4||u.hRule5||u.hRule6)&&(u.hLayout=n),typeof u.vLayout>"u"?u.vRule1||u.vRule2||u.vRule3||u.vRule4||u.vRule5?u.vLayout=n:u.vLayout=o:u.vLayout===t&&(u.vRule1||u.vRule2||u.vRule3||u.vRule4||u.vRule5)&&(u.vLayout=n),u}function l(h,p,u=""){return h===p&&h!==u?h:!1}function c(h,p){let u="|/\\[]{}()<>";if(h==="_"){if(u.indexOf(p)!==-1)return p}else if(p==="_"&&u.indexOf(h)!==-1)return h;return!1}function d(h,p){let u="| /\\ [] {} () <>",m=u.indexOf(h),T=u.indexOf(p);if(m!==-1&&T!==-1&&m!==T&&Math.abs(m-T)!==1){const L=Math.max(m,T),I=L+1;return u.substring(L,I)}return!1}function g(h,p){let u="[] {} ()",m=u.indexOf(h),T=u.indexOf(p);return m!==-1&&T!==-1&&Math.abs(m-T)<=1?"|":!1}function f(h,p){return{"/\\":"|","\\/":"Y","><":"X"}[h+p]||!1}function E(h,p,u=""){return h===u&&p===u?u:!1}function v(h,p){return h===p?h:!1}function w(h,p){return c(h,p)}function $(h,p){return d(h,p)}function y(h,p){return h==="-"&&p==="_"||h==="_"&&p==="-"?"=":!1}function N(h,p){return h==="|"&&p==="|"?"|":!1}function S(h,p,u){return p===" "||p===""||p===u&&h!==" "?h:p}function x(h,p,u){if(u.fittingRules&&u.fittingRules.vLayout===o)return"invalid";let m,T=Math.min(h.length,p.length),L,I,b=!1,C;if(T===0)return"invalid";for(m=0;m<T;m++)if(L=h.substring(m,m+1),I=p.substring(m,m+1),L!==" "&&I!==" "){if(u.fittingRules&&u.fittingRules.vLayout===e)return"invalid";if(u.fittingRules&&u.fittingRules.vLayout===t)return"end";if(N(L,I)){b=b||!1;continue}if(C=!1,C=u.fittingRules&&u.fittingRules.vRule1?v(L,I):C,C=!C&&u.fittingRules&&u.fittingRules.vRule2?w(L,I):C,C=!C&&u.fittingRules&&u.fittingRules.vRule3?$(L,I):C,C=!C&&u.fittingRules&&u.fittingRules.vRule4?y(L,I):C,b=!0,!C)return"invalid"}return b?"end":"valid"}function k(h,p,u){let m=h.length,T=h.length,L,I,b,C=1,O,F,D;for(;C<=m;){for(L=h.slice(Math.max(0,T-C),T),I=p.slice(0,Math.min(m,C)),b=I.length,D="",O=0;O<b;O++)if(F=x(L[O],I[O],u),F==="end")D=F;else if(F==="invalid"){D=F;break}else D===""&&(D="valid");if(D==="invalid"){C--;break}if(D==="end")break;D==="valid"&&C++}return Math.min(m,C)}function W(h,p,u){let m,T=Math.min(h.length,p.length),L,I,b="",C;const O=u.fittingRules||{};for(m=0;m<T;m++)L=h.substring(m,m+1),I=p.substring(m,m+1),L!==" "&&I!==" "?O.vLayout===e||O.vLayout===t?b+=S(L,I):(C=!1,C=O.vRule5?N(L,I):C,C=!C&&O.vRule1?v(L,I):C,C=!C&&O.vRule2?w(L,I):C,C=!C&&O.vRule3?$(L,I):C,C=!C&&O.vRule4?y(L,I):C,b+=C):b+=S(L,I);return b}function re(h,p,u,m){let T=h.length,L=p.length,I=h.slice(0,Math.max(0,T-u)),b=h.slice(Math.max(0,T-u),T),C=p.slice(0,Math.min(u,L)),O,F,D,P=[],H;for(F=b.length,O=0;O<F;O++)O>=L?D=b[O]:D=W(b[O],C[O],m),P.push(D);return H=p.slice(Math.min(u,L),L),[...I,...P,...H]}function Be(h,p){const u=" ".repeat(p);return h.map(m=>m+u)}function We(h,p,u){let m=h[0].length,T=p[0].length,L;return m>T?p=Be(p,m-T):T>m&&(h=Be(h,T-m)),L=k(h,p,u),re(h,p,L,u)}function we(h,p,u){const m=u.fittingRules||{};if(m.hLayout===o)return 0;let T,L=h.length,I=p.length,b=L,C=1,O=!1,F,D,P,H;if(L===0)return 0;e:for(;C<=b;){const se=L-C;for(F=h.substring(se,se+C),D=p.substring(0,Math.min(C,I)),T=0;T<Math.min(C,I);T++)if(P=F.substring(T,T+1),H=D.substring(T,T+1),P!==" "&&H!==" "){if(m.hLayout===e){C=C-1;break e}else if(m.hLayout===t){(P===u.hardBlank||H===u.hardBlank)&&(C=C-1);break e}else if(O=!0,!(m.hRule1&&l(P,H,u.hardBlank)||m.hRule2&&c(P,H)||m.hRule3&&d(P,H)||m.hRule4&&g(P,H)||m.hRule5&&f(P,H)||m.hRule6&&E(P,H,u.hardBlank))){C=C-1;break e}}if(O)break;C++}return Math.min(b,C)}function X(h,p,u,m){let T,L,I=[],b,C,O,F,D,P,H,se;const J=m.fittingRules||{};if(typeof m.height!="number")throw new Error("height is not defined.");for(T=0;T<m.height;T++){H=h[T],se=p[T],D=H.length,P=se.length,b=D-u,C=H.slice(0,Math.max(0,b)),O="";const ge=Math.max(0,D-u);let oe=H.substring(ge,ge+u),$e=se.substring(0,Math.min(u,P));for(L=0;L<u;L++){let ae=L<D?oe.substring(L,L+1):" ",ee=L<P?$e.substring(L,L+1):" ";if(ae!==" "&&ee!==" ")if(J.hLayout===e||J.hLayout===t)O+=S(ae,ee,m.hardBlank);else{const Ut=J.hRule1&&l(ae,ee,m.hardBlank)||J.hRule2&&c(ae,ee)||J.hRule3&&d(ae,ee)||J.hRule4&&g(ae,ee)||J.hRule5&&f(ae,ee)||J.hRule6&&E(ae,ee,m.hardBlank)||S(ae,ee,m.hardBlank);O+=Ut}else O+=S(ae,ee,m.hardBlank)}u>=P?F="":F=se.substring(u,u+Math.max(0,P-u)),I[T]=C+O+F}return I}function he(h){return new Array(h).fill("")}const pe=function(h){return Math.max(...h.map(p=>p.length))};function fe(h,p,u){return h.reduce(function(m,T){return X(m,T.fig,T.overlap||0,u)},he(p))}function Pt(h,p,u){for(let m=h.length-1;m>0;m--){const T=fe(h.slice(0,m),p,u);if(pe(T)<=u.width)return{outputFigText:T,chars:h.slice(m)}}return{outputFigText:he(p),chars:h}}function Ft(h,p,u){let m,T,L=0,I,b,C,O=u.height,F=[],D,P={chars:[],overlap:L},H=[],se,J,ge,oe,$e;if(typeof O!="number")throw new Error("height is not defined.");b=he(O);const ae=u.fittingRules||{};for(u.printDirection===1&&(h=h.split("").reverse().join("")),C=h.length,m=0;m<C;m++)if(se=h.substring(m,m+1),J=se.match(/\s/),T=p[se.charCodeAt(0)],oe=null,T){if(ae.hLayout!==o){for(L=1e4,I=0;I<O;I++)L=Math.min(L,we(b[I],T[I],u));L=L===1e4?0:L}if(u.width>0&&(u.whitespaceBreak?(ge=fe(P.chars.concat([{fig:T,overlap:L}]),O,u),oe=fe(H.concat([{fig:ge,overlap:P.overlap}]),O,u),D=pe(oe)):(oe=X(b,T,L,u),D=pe(oe)),D>=u.width&&m>0&&(u.whitespaceBreak?(b=fe(H.slice(0,-1),O,u),H.length>1&&(F.push(b),b=he(O)),H=[]):(F.push(b),b=he(O)))),u.width>0&&u.whitespaceBreak&&((!J||m===C-1)&&P.chars.push({fig:T,overlap:L}),J||m===C-1)){for($e=null;oe=fe(P.chars,O,u),D=pe(oe),D>=u.width;)$e=Pt(P.chars,O,u),P={chars:$e.chars},F.push($e.outputFigText);D>0&&($e?H.push({fig:oe,overlap:1}):H.push({fig:oe,overlap:P.overlap})),J&&(H.push({fig:T,overlap:L}),b=he(O)),m===C-1&&(b=fe(H,O,u)),P={chars:[],overlap:L};continue}b=X(b,T,L,u)}return pe(b)>0&&F.push(b),u.showHardBlanks||F.forEach(function(ee){for(C=ee.length,I=0;I<C;I++)ee[I]=ee[I].replace(new RegExp("\\"+u.hardBlank,"g")," ")}),h===""&&F.length===0&&F.push(new Array(O).fill("")),F}const Ht=function(h,p){let u;const m=p.fittingRules||{};if(h==="default")u={hLayout:m.hLayout,hRule1:m.hRule1,hRule2:m.hRule2,hRule3:m.hRule3,hRule4:m.hRule4,hRule5:m.hRule5,hRule6:m.hRule6};else if(h==="full")u={hLayout:o,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(h==="fitted")u={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(h==="controlled smushing")u={hLayout:n,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(h==="universal smushing")u={hLayout:t,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return u},gt=function(h,p){let u={};const m=p.fittingRules||{};if(h==="default")u={vLayout:m.vLayout,vRule1:m.vRule1,vRule2:m.vRule2,vRule3:m.vRule3,vRule4:m.vRule4,vRule5:m.vRule5};else if(h==="full")u={vLayout:o,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(h==="fitted")u={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(h==="controlled smushing")u={vLayout:n,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(h==="universal smushing")u={vLayout:t,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return u},$t=function(h,p,u){u=u.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let m=u.split(`
`),T=[],L,I,b;for(I=m.length,L=0;L<I;L++)T=T.concat(Ft(m[L],r[h],p));for(I=T.length,b=T[0],L=1;L<I;L++)b=We(b,T[L],p);return b?b.join(`
`):""};function Je(h,p){let u;if(typeof structuredClone<"u"?u=structuredClone(h):u=JSON.parse(JSON.stringify(h)),u.showHardBlanks=p.showHardBlanks||!1,u.width=p.width||-1,u.whitespaceBreak=p.whitespaceBreak||!1,p.horizontalLayout){const m=Ht(p.horizontalLayout,h);m&&Object.assign(u.fittingRules,m)}if(p.verticalLayout){const m=gt(p.verticalLayout,h);m&&Object.assign(u.fittingRules,m)}return u.printDirection=p.printDirection!==null&&p.printDirection!==void 0?p.printDirection:h.printDirection,u}const U=async function(h,p,u){return U.text(h,p,u)};return U.text=async function(h,p,u){h=h+"";let m,T;typeof p=="function"?(T=p,m={font:i.font}):typeof p=="string"?(m={font:p},T=u):p?(m=p,T=u):(m={font:i.font},T=u);const L=m.font||i.font;try{const I=await U.loadFont(L),b=I?$t(L,Je(I,m),h):"";return T&&T(null,b),b}catch(I){const b=I instanceof Error?I:new Error(String(I));if(T)return T(b),"";throw b}},U.textSync=function(h,p){h=h+"",typeof p=="string"?p={font:p}:p=p||{};const u=p.font||i.font;let m=Je(U.loadFontSync(u),p);return $t(u,m,h)},U.metadata=async function(h,p){h=h+"";try{const u=await U.loadFont(h);if(!u)throw new Error("Error loading font.");const m=r[h]||{},T=[u,m.comment||""];return p&&p(null,u,m.comment),T}catch(u){const m=u instanceof Error?u:new Error(String(u));if(p)return p(m),null;throw m}},U.defaults=function(h){return h&&typeof h=="object"&&Object.assign(i,h),typeof structuredClone<"u"?structuredClone(i):JSON.parse(JSON.stringify(i))},U.parseFont=function(h,p,u=!0){if(r[h]&&!u)return r[h].options;p=p.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const m=new $s,T=p.split(`
`),L=T.shift();if(!L)throw new Error("Invalid font file: missing header");const I=L.split(" "),b={hardBlank:I[0].substring(5,6),height:parseInt(I[1],10),baseline:parseInt(I[2],10),maxLength:parseInt(I[3],10),oldLayout:parseInt(I[4],10),numCommentLines:parseInt(I[5],10),printDirection:I[6]?parseInt(I[6],10):0,fullLayout:I[7]?parseInt(I[7],10):null,codeTagCount:I[8]?parseInt(I[8],10):null};if((b.hardBlank||"").length!==1||[b.height,b.baseline,b.maxLength,b.oldLayout,b.numCommentLines].some(F=>F==null||isNaN(F)))throw new Error("FIGlet header contains invalid values.");if(b.height==null||b.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");b.fittingRules=a(b.oldLayout,b.fullLayout),m.options=b;const O=[];for(let F=32;F<=126;F++)O.push(F);if(O.push(196,214,220,228,246,252,223),T.length<b.numCommentLines+b.height*O.length)throw new Error(`FIGlet file is missing data. Line length: ${T.length}. Comment lines: ${b.numCommentLines}. Height: ${b.height}. Num chars: ${O.length}.`);for(m.comment=T.splice(0,b.numCommentLines).join(`
`),m.numChars=0;T.length>0&&m.numChars<O.length;){const F=O[m.numChars];m[F]=T.splice(0,b.height);for(let D=0;D<b.height;D++)typeof m[F][D]>"u"?m[F][D]="":m[F][D]=s(m[F][D],D,b.height);m.numChars++}for(;T.length>0;){const F=T.shift();if(!F||F.trim()==="")break;let D=F.split(" ")[0],P;if(/^-?0[xX][0-9a-fA-F]+$/.test(D))P=parseInt(D,16);else if(/^-?0[0-7]+$/.test(D))P=parseInt(D,8);else if(/^-?[0-9]+$/.test(D))P=parseInt(D,10);else throw new Error(`Error parsing data. Invalid data: ${D}`);if(P===-1||P<-2147483648||P>2147483647){const H=P===-1?"The char code -1 is not permitted.":`The char code cannot be ${P<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${H}`)}m[P]=T.splice(0,b.height);for(let H=0;H<b.height;H++)typeof m[P][H]>"u"?m[P][H]="":m[P][H]=s(m[P][H],H,b.height);m.numChars++}return r[h]=m,b},U.loadedFonts=()=>Object.keys(r),U.clearLoadedFonts=()=>{Object.keys(r).forEach(h=>{delete r[h]})},U.loadFont=async function(h,p){if(r[h]){const u=r[h].options;return p&&p(null,u),Promise.resolve(u)}try{if(!i.fetchFontIfMissing)throw new Error(`Font is not loaded: ${h}`);const u=await fetch(`${i.fontPath}/${h}.flf`);if(!u.ok)throw new Error(`Network response was not ok: ${u.status}`);const m=await u.text(),T=U.parseFont(h,m);return p&&p(null,T),T}catch(u){const m=u instanceof Error?u:new Error(String(u));if(p)return p(m),null;throw m}},U.loadFontSync=function(h){if(r[h])return r[h].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},U.preloadFonts=async function(h,p){try{for(const u of h){const m=await fetch(`${i.fontPath}/${u}.flf`);if(!m.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${u}, status code: ${m.statusText}`);const T=await m.text();U.parseFont(u,T)}p&&p()}catch(u){const m=u instanceof Error?u:new Error(String(u));if(p){p(m);return}throw u}},U.fonts=function(h){return new Promise(function(p,u){p(Qt),h&&h(null,Qt)})},U.fontsSync=function(){return Qt},U.figFonts=r,U})(),As=`flf2a$ 8 7 54 0 12 0 64 185
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
`,Es=`flf2a$ 6 5 16 15 10 0 18319
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
`,Ls=`flf2a$ 5 4 13 15 10 0 22415
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
`,ys=`flf2a$ 6 5 16 15 13 0 24463 229
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
         `;mt.parseFont("Standard",ys);mt.parseFont("Slant",Es);mt.parseFont("Banner",As);mt.parseFont("Small",Ls);const Is={name:"figlet",description:"Convert text to ASCII art",execute:(o,e)=>{const t=new G(o);if(t.hasFlag("help"))return{output:`Usage: figlet [options] <text>

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
Try 'figlet --help' for more information.`,error:!0};const r=t.getFlag("f"),i=typeof r=="string"?r:"Standard",s=i.charAt(0).toUpperCase()+i.slice(1).toLowerCase();let a="default";t.hasFlag("c")?a="full":t.hasFlag("r")&&(a="fitted");try{return{output:mt.textSync(n,{font:s,horizontalLayout:a})}}catch(l){return l instanceof Error?l.message.includes("font")||l.message.includes("Font")||l.message.includes("FIGlet")?{output:`figlet: font '${s}' not found or invalid
Available fonts: standard, slant, banner, small`,error:!0}:{output:`figlet: ${l.message}`,error:!0}:{output:"figlet: unknown error occurred",error:!0}}}};function bs(){const o=window.innerWidth,e=window.innerHeight,t=document.querySelector("header"),n=t?t.getBoundingClientRect().height:60,r=Math.max(400,Math.floor(o*.95)),i=Math.max(300,Math.floor(e-n));return{width:r,height:i}}function ws(o){return{name:"life",description:"Conway's Game of Life cellular automaton",execute:(e,t)=>{const n=new G(e);if(n.hasFlag("help"))return{output:`Usage: life [options]

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

Note: Animation continues until you scroll, type, or run 'clear'`};let r=2;const i=n.getFlag("speed");if(i!==void 0){const S=parseFloat(String(i));if(isNaN(S)||S<.5||S>10)return{output:`life: invalid speed '${i}'
Speed must be between 0.5 and 10.0`,error:!0};r=S}let s=.3;const a=n.getFlag("density");if(a!==void 0){const S=parseFloat(String(a));if(isNaN(S)||S<0||S>1)return{output:`life: invalid density '${a}'
Density must be between 0.0 and 1.0`,error:!0};s=S}const l=n.getFlag("pattern");let c="random";if(l!==void 0){const S=String(l),x=["random","acorn","glider","blinker"];if(!x.includes(S))return{output:`life: invalid pattern '${S}'
Valid patterns: ${x.join(", ")}`,error:!0};c=S}const d=n.getFlag("theme");let g=o.getCurrentColors();if(d!==void 0){const S=String(d),x=["green","yellow","white","light-blue","paper","dc","custom"];if(!x.includes(S))return{output:`life: invalid theme '${S}'
Valid themes: ${x.join(", ")}`,error:!0};if(S!=="custom"){const k=o.getPreset(S);k&&(g=k.colors)}}const{width:f,height:E}=bs(),v=Math.floor(E*.8),w=g["--terminal-accent"],$=g["--terminal-dim"];return{output:`
<div class="life-container" style="background-color: ${g["--terminal-bg"]}; min-height: ${v}px;">
  <canvas id="life-canvas" class="life-grid"
          width="${f}"
          height="${E}"
          data-speed="${r}"
          data-density="${s}"
          data-pattern="${c}"
          data-accent-color="${w}"
          data-dim-color="${$}"
          style="width: 100%; height: ${v}px; display: block;">
  </canvas>
</div>
`,html:!0}}}}const cr=["#ff6b35","#ff8c42","#ffaa4f","#ffc85c","#e6e669","#c4e676","#9fe683","#7ae690","#5ad69d","#3ac6aa","#1bb6b7","#00a6c4","#0096d1","#0086de"];function mn(o,e,t,n){const r=o/t+e*n;return cr[Math.floor(Math.abs(r))%cr.length]}function Ss(o){return/<(div|span|pre)\s+(class|style)=/i.test(o)}function vs(o,e,t){return o.split(`
`).map((n,r)=>{let i=0;return[...n].map(s=>s===" "||s==="	"?s:`<span style="color: ${mn(i++,r,e,t)}">${Ne(s)}</span>`).join("")}).join(`
`)}function Cs(o,e,t){let n=0,r=0,i="",s=!1,a=!1,l="";for(const c of o)if(c==="<")s=!0,i+=c;else if(c===">")s=!1,i+=c;else if(s)i+=c;else if(c==="&")a=!0,l=c;else if(a){if(l+=c,c===";"){a=!1;const d=mn(r++,n,e,t);i+=`<span style="color: ${d}">${l}</span>`,l=""}}else if(c===`
`)i+=c,n++,r=0;else if(c===" "||c==="	")i+=c;else{const d=mn(r++,n,e,t);i+=`<span style="color: ${d}">${c}</span>`}return i}const Rs={name:"lolcat",description:"Rainbow-colorize text output",execute:(o,e)=>{const t=new G(o);if(t.hasFlag("help"))return{output:`Usage: lolcat [options] [text...]

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
  lolcat --freq 1.0 "Lines"      More variation between lines`};const n=t.getFlag("spread");let r=3;if(typeof n=="string"){const l=parseFloat(n);if(isNaN(l)||l<1||l>10)return{output:`lolcat: invalid spread '${n}'
Spread must be between 1 and 10.`,error:!0};r=l}const i=t.getFlag("freq");let s=.3;if(typeof i=="string"){const l=parseFloat(i);if(isNaN(l)||l<.1||l>2)return{output:`lolcat: invalid freq '${i}'
Frequency must be between 0.1 and 2.0.`,error:!0};s=l}let a;if(e)a=e;else if(t.positionalCount>0)a=t.getAllPositionals().join(" ");else return{output:`lolcat: missing text input
Try 'lolcat --help' for more information.`,error:!0};return Ss(a)?{output:Cs(a,r,s),html:!0}:{output:`<pre class="lolcat-output">${vs(a,r,s)}</pre>`,html:!0}}},hn="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";function xs(){const o=document.getElementById("terminal-output");if(!o)return{cols:80,rows:24};const e=o.getBoundingClientRect(),t=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--terminal-font-size")||"16"),n=t*.6,r=t*1.5,i=Math.floor(e.width/n),s=Math.floor(e.height/r);return{cols:Math.max(i,20),rows:Math.max(s,10)}}function Ns(){return hn[Math.floor(Math.random()*hn.length)]}function ks(o){return{name:"matrix",description:"Display Matrix digital rain animation",execute:(e,t)=>{const n=new G(e);if(n.hasFlag("help"))return{output:`Usage: matrix [options]

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

Note: Animation continues until you scroll, type, or run 'clear'`};let r=1;const i=n.getFlag("speed");if(i!==void 0){const k=parseFloat(String(i));if(isNaN(k)||k<.1||k>5)return{output:`matrix: invalid speed value '${i}'
Speed must be between 0.1 and 5.0`,error:!0};r=k}const s=n.getFlag("theme");let a=o.getCurrentColors();if(s!==void 0){const k=String(s),W=["green","yellow","white","light-blue","paper","dc","custom"];if(!W.includes(k))return{output:`matrix: invalid theme '${k}'
Valid themes: ${W.join(", ")}`,error:!0};if(k!=="custom"){const re=o.getPreset(k);re&&(a=re.colors)}}const{cols:l,rows:c}=xs(),d=1.2,g=Math.floor(l/d)+5,f=Math.min(c,20),E=a["--terminal-accent"],v=a["--terminal-dim"],w=a["--terminal-bg"],$=c*1.5,y=-f*1.5,N=$,S=[];for(let k=0;k<g;k++){const W=-Math.random()*5,re=(5+Math.random()*5)/r,Be=k*d,We=[];for(let we=0;we<f;we++){const X=we/f,he=Math.pow(X,2),pe=we===f-1,fe=Ns();We.push(`<span class="matrix-char${pe?" matrix-char-bright":""}" data-char-index="${we}" style="color: ${pe?E:v}; opacity: ${he};">${fe}</span>`)}S.push(`
  <div class="matrix-column" data-column-index="${k}" data-trail-length="${f}" style="
    left: ${Be}em;
    animation: matrix-fall ${re}s linear ${W}s infinite;
    --matrix-start: ${y}em;
    --matrix-end: ${N}em;
  ">${We.join("")}</div>`)}return{output:`
<div class="matrix-rain" data-matrix-chars="${hn}" style="height: ${$}em; background-color: ${w};">
${S.join("")}
</div>
`,html:!0}}}}function Ms(){return[{type:"info",text:"Broadcast message from root@darinchambers.com:"},{type:"info",text:"The system is going down for poweroff NOW!"},{type:"ok",text:"Stopped Session c1 of user darin"},{type:"ok",text:"Stopped Target - Graphical Interface"},{type:"ok",text:"Stopped Code Editor Process"},{type:"ok",text:"Stopped Docker Container Runtime"},{type:"ok",text:"Stopped OpenSSH Server"},{type:"failed",text:"Stopped Bluetooth Service (timeout)"},{type:"ok",text:"Stopped Network Manager"},{type:"ok",text:"Stopped D-Bus System Message Bus"},{type:"ok",text:"Stopped Journal Service"},{type:"ok",text:"Stopped System Logging Service"},{type:"info",text:"Sending SIGTERM to remaining processes..."},{type:"info",text:"Sending SIGKILL to remaining processes..."},{type:"ok",text:"Unmounted /home"},{type:"ok",text:"Unmounted /var"},{type:"ok",text:"Unmounted /tmp"},{type:"info",text:"All filesystems unmounted."},{type:"ok",text:"Reached target - Power-Off"}]}function Vr(o){const e=Ms(),t=150,n=e.map((a,l)=>{const c=l*t,d=`boot-line boot-line-${a.type}`,g=a.text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`<div class="${d}" style="animation-delay: ${c}ms;">${g}</div>`}),r=e.length*t,i=o?"System halted.":"Power off.";n.push(`<div class="boot-line boot-line-info" style="animation-delay: ${r}ms;">${i}</div>`);const s=r+500;return n.push(`<div class="boot-overlay" style="animation-delay: ${s}ms;" data-boot-overlay="true"><span class="boot-overlay-text">Screen off</span></div>`),n.join(`
`)}const Os={name:"shutdown",description:"Display simulated Linux shutdown sequence",execute:(o,e)=>{const t=new G(o);if(t.hasFlag("help"))return{output:`Usage: shutdown [options]

Display a simulated Linux shutdown sequence with services stopping,
filesystems unmounting, and a power-off screen.

Options:
  --halt     Show "System halted" instead of "Power off"
  --help     Display this help message

Examples:
  shutdown          # Show shutdown with power off
  shutdown --halt   # Show shutdown with system halt

Note: The screen goes black after shutdown. Scroll or type to dismiss.`};const n=t.hasFlag("halt");return{output:`<div class="boot-sequence shutdown-sequence" data-boot-type="shutdown">
${Vr(n)}
</div>`,html:!0,clearBefore:!0,fullscreen:!0,fullscreenExitCommand:"boot",scrollBehavior:"top"}}},Ds={name:"reboot",description:"Display simulated system reboot sequence",execute:(o,e)=>{const t=new G(o);if(t.hasFlag("help"))return{output:`Usage: reboot [options]

Display a simulated system reboot sequence combining
shutdown and boot animations.

Options:
  --fast     Show abbreviated sequences
  --help     Display this help message

Examples:
  reboot          # Show full reboot sequence
  reboot --fast   # Show quick reboot sequence

Note: The full sequence takes about 10 seconds. Scroll or type to stop.`};const n=t.hasFlag("fast"),i=Vr(!1).split(`
`).filter(f=>!f.includes("data-boot-overlay")).join(`
`),c=20*150,d=c+4e3;return{output:`<div class="boot-sequence reboot-sequence" data-boot-type="reboot">
${i}
<div class="boot-line boot-line-info" style="animation-delay: ${c}ms;">Rebooting...</div>
</div>`,html:!0,clearBefore:!0,fullscreen:!0,scrollBehavior:"top",scheduledCommand:{command:n?"boot --fast":"boot",delayMs:d,clearBefore:!0}}}};class dr{static generateHeader(){return`
 ██████╗  █████╗ ██████╗ ██╗███╗   ██╗     ██████╗██╗  ██╗ █████╗ ███╗   ███╗██████╗ ███████╗██████╗ ███████╗
 ██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║    ██╔════╝██║  ██║██╔══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔════╝
 ██║  ██║███████║██████╔╝██║██╔██╗ ██║    ██║     ███████║███████║██╔████╔██║██████╔╝█████╗  ██████╔╝███████╗
 ██║  ██║██╔══██║██╔══██╗██║██║╚██╗██║    ██║     ██╔══██║██╔══██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗╚════██║
 ██████╔╝██║  ██║██║  ██║██║██║ ╚████║    ╚██████╗██║  ██║██║  ██║██║ ╚═╝ ██║██████╔╝███████╗██║  ██║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
`}static getTagline(){return"Technologist, Inventor | Building What's Next on Rock-Solid Foundations"}}const{entries:jr,setPrototypeOf:ur,isFrozen:Ps,getPrototypeOf:Fs,getOwnPropertyDescriptor:Hs}=Object;let{freeze:ue,seal:Ae,create:pn}=Object,{apply:fn,construct:gn}=typeof Reflect<"u"&&Reflect;ue||(ue=function(e){return e});Ae||(Ae=function(e){return e});fn||(fn=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];return e.apply(t,r)});gn||(gn=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new e(...n)});const It=_e(Array.prototype.forEach),Us=_e(Array.prototype.lastIndexOf),_r=_e(Array.prototype.pop),rt=_e(Array.prototype.push),Bs=_e(Array.prototype.splice),wt=_e(String.prototype.toLowerCase),en=_e(String.prototype.toString),tn=_e(String.prototype.match),ot=_e(String.prototype.replace),Ws=_e(String.prototype.indexOf),Gs=_e(String.prototype.trim),Le=_e(Object.prototype.hasOwnProperty),le=_e(RegExp.prototype.test),it=zs(TypeError);function _e(o){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return fn(o,e,n)}}function zs(o){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return gn(o,t)}}function B(o,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:wt;ur&&ur(o,null);let n=e.length;for(;n--;){let r=e[n];if(typeof r=="string"){const i=t(r);i!==r&&(Ps(e)||(e[n]=i),r=i)}o[r]=!0}return o}function Vs(o){for(let e=0;e<o.length;e++)Le(o,e)||(o[e]=null);return o}function xe(o){const e=pn(null);for(const[t,n]of jr(o))Le(o,t)&&(Array.isArray(n)?e[t]=Vs(n):n&&typeof n=="object"&&n.constructor===Object?e[t]=xe(n):e[t]=n);return e}function st(o,e){for(;o!==null;){const n=Hs(o,e);if(n){if(n.get)return _e(n.get);if(typeof n.value=="function")return _e(n.value)}o=Fs(o)}function t(){return null}return t}const mr=ue(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),nn=ue(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),rn=ue(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),js=ue(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),on=ue(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ys=ue(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),hr=ue(["#text"]),pr=ue(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),sn=ue(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),fr=ue(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),bt=ue(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qs=Ae(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Xs=Ae(/<%[\w\W]*|[\w\W]*%>/gm),Ks=Ae(/\$\{[\w\W]*/gm),Zs=Ae(/^data-[\-\w.\u00B7-\uFFFF]+$/),Js=Ae(/^aria-[\-\w]+$/),Yr=Ae(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qs=Ae(/^(?:\w+script|data):/i),ea=Ae(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),qr=Ae(/^html$/i),ta=Ae(/^[a-z][.\w]*(-[.\w]+)+$/i);var gr=Object.freeze({__proto__:null,ARIA_ATTR:Js,ATTR_WHITESPACE:ea,CUSTOM_ELEMENT:ta,DATA_ATTR:Zs,DOCTYPE_NAME:qr,ERB_EXPR:Xs,IS_ALLOWED_URI:Yr,IS_SCRIPT_OR_DATA:Qs,MUSTACHE_EXPR:qs,TMPLIT_EXPR:Ks});const at={element:1,text:3,progressingInstruction:7,comment:8,document:9},na=function(){return typeof window>"u"?null:window},ra=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const i="dompurify"+(n?"#"+n:"");try{return e.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},$r=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Xr(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:na();const e=M=>Xr(M);if(e.version="3.3.0",e.removed=[],!o||!o.document||o.document.nodeType!==at.document||!o.Element)return e.isSupported=!1,e;let{document:t}=o;const n=t,r=n.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:a,Element:l,NodeFilter:c,NamedNodeMap:d=o.NamedNodeMap||o.MozNamedAttrMap,HTMLFormElement:g,DOMParser:f,trustedTypes:E}=o,v=l.prototype,w=st(v,"cloneNode"),$=st(v,"remove"),y=st(v,"nextSibling"),N=st(v,"childNodes"),S=st(v,"parentNode");if(typeof s=="function"){const M=t.createElement("template");M.content&&M.content.ownerDocument&&(t=M.content.ownerDocument)}let x,k="";const{implementation:W,createNodeIterator:re,createDocumentFragment:Be,getElementsByTagName:We}=t,{importNode:we}=n;let X=$r();e.isSupported=typeof jr=="function"&&typeof S=="function"&&W&&W.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:he,ERB_EXPR:pe,TMPLIT_EXPR:fe,DATA_ATTR:Pt,ARIA_ATTR:Ft,IS_SCRIPT_OR_DATA:Ht,ATTR_WHITESPACE:gt,CUSTOM_ELEMENT:$t}=gr;let{IS_ALLOWED_URI:Je}=gr,U=null;const h=B({},[...mr,...nn,...rn,...on,...hr]);let p=null;const u=B({},[...pr,...sn,...fr,...bt]);let m=Object.seal(pn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),T=null,L=null;const I=Object.seal(pn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let b=!0,C=!0,O=!1,F=!0,D=!1,P=!0,H=!1,se=!1,J=!1,ge=!1,oe=!1,$e=!1,ae=!0,ee=!1;const Ut="user-content-";let Bt=!0,Qe=!1,Ge={},ze=null;const Rn=B({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let xn=null;const Nn=B({},["audio","video","img","source","image","track"]);let Wt=null;const kn=B({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Tt="http://www.w3.org/1998/Math/MathML",At="http://www.w3.org/2000/svg",Se="http://www.w3.org/1999/xhtml";let Ve=Se,Gt=!1,zt=null;const Qr=B({},[Tt,At,Se],en);let Et=B({},["mi","mo","mn","ms","mtext"]),Lt=B({},["annotation-xml"]);const eo=B({},["title","style","font","a","script"]);let et=null;const to=["application/xhtml+xml","text/html"],no="text/html";let Q=null,je=null;const ro=t.createElement("form"),Mn=function(_){return _ instanceof RegExp||_ instanceof Function},Vt=function(){let _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(je&&je===_)){if((!_||typeof _!="object")&&(_={}),_=xe(_),et=to.indexOf(_.PARSER_MEDIA_TYPE)===-1?no:_.PARSER_MEDIA_TYPE,Q=et==="application/xhtml+xml"?en:wt,U=Le(_,"ALLOWED_TAGS")?B({},_.ALLOWED_TAGS,Q):h,p=Le(_,"ALLOWED_ATTR")?B({},_.ALLOWED_ATTR,Q):u,zt=Le(_,"ALLOWED_NAMESPACES")?B({},_.ALLOWED_NAMESPACES,en):Qr,Wt=Le(_,"ADD_URI_SAFE_ATTR")?B(xe(kn),_.ADD_URI_SAFE_ATTR,Q):kn,xn=Le(_,"ADD_DATA_URI_TAGS")?B(xe(Nn),_.ADD_DATA_URI_TAGS,Q):Nn,ze=Le(_,"FORBID_CONTENTS")?B({},_.FORBID_CONTENTS,Q):Rn,T=Le(_,"FORBID_TAGS")?B({},_.FORBID_TAGS,Q):xe({}),L=Le(_,"FORBID_ATTR")?B({},_.FORBID_ATTR,Q):xe({}),Ge=Le(_,"USE_PROFILES")?_.USE_PROFILES:!1,b=_.ALLOW_ARIA_ATTR!==!1,C=_.ALLOW_DATA_ATTR!==!1,O=_.ALLOW_UNKNOWN_PROTOCOLS||!1,F=_.ALLOW_SELF_CLOSE_IN_ATTR!==!1,D=_.SAFE_FOR_TEMPLATES||!1,P=_.SAFE_FOR_XML!==!1,H=_.WHOLE_DOCUMENT||!1,ge=_.RETURN_DOM||!1,oe=_.RETURN_DOM_FRAGMENT||!1,$e=_.RETURN_TRUSTED_TYPE||!1,J=_.FORCE_BODY||!1,ae=_.SANITIZE_DOM!==!1,ee=_.SANITIZE_NAMED_PROPS||!1,Bt=_.KEEP_CONTENT!==!1,Qe=_.IN_PLACE||!1,Je=_.ALLOWED_URI_REGEXP||Yr,Ve=_.NAMESPACE||Se,Et=_.MATHML_TEXT_INTEGRATION_POINTS||Et,Lt=_.HTML_INTEGRATION_POINTS||Lt,m=_.CUSTOM_ELEMENT_HANDLING||{},_.CUSTOM_ELEMENT_HANDLING&&Mn(_.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(m.tagNameCheck=_.CUSTOM_ELEMENT_HANDLING.tagNameCheck),_.CUSTOM_ELEMENT_HANDLING&&Mn(_.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(m.attributeNameCheck=_.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),_.CUSTOM_ELEMENT_HANDLING&&typeof _.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(m.allowCustomizedBuiltInElements=_.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),D&&(C=!1),oe&&(ge=!0),Ge&&(U=B({},hr),p=[],Ge.html===!0&&(B(U,mr),B(p,pr)),Ge.svg===!0&&(B(U,nn),B(p,sn),B(p,bt)),Ge.svgFilters===!0&&(B(U,rn),B(p,sn),B(p,bt)),Ge.mathMl===!0&&(B(U,on),B(p,fr),B(p,bt))),_.ADD_TAGS&&(typeof _.ADD_TAGS=="function"?I.tagCheck=_.ADD_TAGS:(U===h&&(U=xe(U)),B(U,_.ADD_TAGS,Q))),_.ADD_ATTR&&(typeof _.ADD_ATTR=="function"?I.attributeCheck=_.ADD_ATTR:(p===u&&(p=xe(p)),B(p,_.ADD_ATTR,Q))),_.ADD_URI_SAFE_ATTR&&B(Wt,_.ADD_URI_SAFE_ATTR,Q),_.FORBID_CONTENTS&&(ze===Rn&&(ze=xe(ze)),B(ze,_.FORBID_CONTENTS,Q)),Bt&&(U["#text"]=!0),H&&B(U,["html","head","body"]),U.table&&(B(U,["tbody"]),delete T.tbody),_.TRUSTED_TYPES_POLICY){if(typeof _.TRUSTED_TYPES_POLICY.createHTML!="function")throw it('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof _.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw it('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=_.TRUSTED_TYPES_POLICY,k=x.createHTML("")}else x===void 0&&(x=ra(E,r)),x!==null&&typeof k=="string"&&(k=x.createHTML(""));ue&&ue(_),je=_}},On=B({},[...nn,...rn,...js]),Dn=B({},[...on,...Ys]),oo=function(_){let A=S(_);(!A||!A.tagName)&&(A={namespaceURI:Ve,tagName:"template"});const R=wt(_.tagName),j=wt(A.tagName);return zt[_.namespaceURI]?_.namespaceURI===At?A.namespaceURI===Se?R==="svg":A.namespaceURI===Tt?R==="svg"&&(j==="annotation-xml"||Et[j]):!!On[R]:_.namespaceURI===Tt?A.namespaceURI===Se?R==="math":A.namespaceURI===At?R==="math"&&Lt[j]:!!Dn[R]:_.namespaceURI===Se?A.namespaceURI===At&&!Lt[j]||A.namespaceURI===Tt&&!Et[j]?!1:!Dn[R]&&(eo[R]||!On[R]):!!(et==="application/xhtml+xml"&&zt[_.namespaceURI]):!1},be=function(_){rt(e.removed,{element:_});try{S(_).removeChild(_)}catch{$(_)}},De=function(_,A){try{rt(e.removed,{attribute:A.getAttributeNode(_),from:A})}catch{rt(e.removed,{attribute:null,from:A})}if(A.removeAttribute(_),_==="is")if(ge||oe)try{be(A)}catch{}else try{A.setAttribute(_,"")}catch{}},Pn=function(_){let A=null,R=null;if(J)_="<remove></remove>"+_;else{const K=tn(_,/^[\r\n\t ]+/);R=K&&K[0]}et==="application/xhtml+xml"&&Ve===Se&&(_='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+_+"</body></html>");const j=x?x.createHTML(_):_;if(Ve===Se)try{A=new f().parseFromString(j,et)}catch{}if(!A||!A.documentElement){A=W.createDocument(Ve,"template",null);try{A.documentElement.innerHTML=Gt?k:j}catch{}}const ie=A.body||A.documentElement;return _&&R&&ie.insertBefore(t.createTextNode(R),ie.childNodes[0]||null),Ve===Se?We.call(A,H?"html":"body")[0]:H?A.documentElement:ie},Fn=function(_){return re.call(_.ownerDocument||_,_,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},jt=function(_){return _ instanceof g&&(typeof _.nodeName!="string"||typeof _.textContent!="string"||typeof _.removeChild!="function"||!(_.attributes instanceof d)||typeof _.removeAttribute!="function"||typeof _.setAttribute!="function"||typeof _.namespaceURI!="string"||typeof _.insertBefore!="function"||typeof _.hasChildNodes!="function")},Hn=function(_){return typeof a=="function"&&_ instanceof a};function ve(M,_,A){It(M,R=>{R.call(e,_,A,je)})}const Un=function(_){let A=null;if(ve(X.beforeSanitizeElements,_,null),jt(_))return be(_),!0;const R=Q(_.nodeName);if(ve(X.uponSanitizeElement,_,{tagName:R,allowedTags:U}),P&&_.hasChildNodes()&&!Hn(_.firstElementChild)&&le(/<[/\w!]/g,_.innerHTML)&&le(/<[/\w!]/g,_.textContent)||_.nodeType===at.progressingInstruction||P&&_.nodeType===at.comment&&le(/<[/\w]/g,_.data))return be(_),!0;if(!(I.tagCheck instanceof Function&&I.tagCheck(R))&&(!U[R]||T[R])){if(!T[R]&&Wn(R)&&(m.tagNameCheck instanceof RegExp&&le(m.tagNameCheck,R)||m.tagNameCheck instanceof Function&&m.tagNameCheck(R)))return!1;if(Bt&&!ze[R]){const j=S(_)||_.parentNode,ie=N(_)||_.childNodes;if(ie&&j){const K=ie.length;for(let me=K-1;me>=0;--me){const Ce=w(ie[me],!0);Ce.__removalCount=(_.__removalCount||0)+1,j.insertBefore(Ce,y(_))}}}return be(_),!0}return _ instanceof l&&!oo(_)||(R==="noscript"||R==="noembed"||R==="noframes")&&le(/<\/no(script|embed|frames)/i,_.innerHTML)?(be(_),!0):(D&&_.nodeType===at.text&&(A=_.textContent,It([he,pe,fe],j=>{A=ot(A,j," ")}),_.textContent!==A&&(rt(e.removed,{element:_.cloneNode()}),_.textContent=A)),ve(X.afterSanitizeElements,_,null),!1)},Bn=function(_,A,R){if(ae&&(A==="id"||A==="name")&&(R in t||R in ro))return!1;if(!(C&&!L[A]&&le(Pt,A))){if(!(b&&le(Ft,A))){if(!(I.attributeCheck instanceof Function&&I.attributeCheck(A,_))){if(!p[A]||L[A]){if(!(Wn(_)&&(m.tagNameCheck instanceof RegExp&&le(m.tagNameCheck,_)||m.tagNameCheck instanceof Function&&m.tagNameCheck(_))&&(m.attributeNameCheck instanceof RegExp&&le(m.attributeNameCheck,A)||m.attributeNameCheck instanceof Function&&m.attributeNameCheck(A,_))||A==="is"&&m.allowCustomizedBuiltInElements&&(m.tagNameCheck instanceof RegExp&&le(m.tagNameCheck,R)||m.tagNameCheck instanceof Function&&m.tagNameCheck(R))))return!1}else if(!Wt[A]){if(!le(Je,ot(R,gt,""))){if(!((A==="src"||A==="xlink:href"||A==="href")&&_!=="script"&&Ws(R,"data:")===0&&xn[_])){if(!(O&&!le(Ht,ot(R,gt,"")))){if(R)return!1}}}}}}}return!0},Wn=function(_){return _!=="annotation-xml"&&tn(_,$t)},Gn=function(_){ve(X.beforeSanitizeAttributes,_,null);const{attributes:A}=_;if(!A||jt(_))return;const R={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:p,forceKeepAttr:void 0};let j=A.length;for(;j--;){const ie=A[j],{name:K,namespaceURI:me,value:Ce}=ie,Ye=Q(K),Yt=Ce;let te=K==="value"?Yt:Gs(Yt);if(R.attrName=Ye,R.attrValue=te,R.keepAttr=!0,R.forceKeepAttr=void 0,ve(X.uponSanitizeAttribute,_,R),te=R.attrValue,ee&&(Ye==="id"||Ye==="name")&&(De(K,_),te=Ut+te),P&&le(/((--!?|])>)|<\/(style|title|textarea)/i,te)){De(K,_);continue}if(Ye==="attributename"&&tn(te,"href")){De(K,_);continue}if(R.forceKeepAttr)continue;if(!R.keepAttr){De(K,_);continue}if(!F&&le(/\/>/i,te)){De(K,_);continue}D&&It([he,pe,fe],Vn=>{te=ot(te,Vn," ")});const zn=Q(_.nodeName);if(!Bn(zn,Ye,te)){De(K,_);continue}if(x&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!me)switch(E.getAttributeType(zn,Ye)){case"TrustedHTML":{te=x.createHTML(te);break}case"TrustedScriptURL":{te=x.createScriptURL(te);break}}if(te!==Yt)try{me?_.setAttributeNS(me,K,te):_.setAttribute(K,te),jt(_)?be(_):_r(e.removed)}catch{De(K,_)}}ve(X.afterSanitizeAttributes,_,null)},io=function M(_){let A=null;const R=Fn(_);for(ve(X.beforeSanitizeShadowDOM,_,null);A=R.nextNode();)ve(X.uponSanitizeShadowNode,A,null),Un(A),Gn(A),A.content instanceof i&&M(A.content);ve(X.afterSanitizeShadowDOM,_,null)};return e.sanitize=function(M){let _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},A=null,R=null,j=null,ie=null;if(Gt=!M,Gt&&(M="<!-->"),typeof M!="string"&&!Hn(M))if(typeof M.toString=="function"){if(M=M.toString(),typeof M!="string")throw it("dirty is not a string, aborting")}else throw it("toString is not a function");if(!e.isSupported)return M;if(se||Vt(_),e.removed=[],typeof M=="string"&&(Qe=!1),Qe){if(M.nodeName){const Ce=Q(M.nodeName);if(!U[Ce]||T[Ce])throw it("root node is forbidden and cannot be sanitized in-place")}}else if(M instanceof a)A=Pn("<!---->"),R=A.ownerDocument.importNode(M,!0),R.nodeType===at.element&&R.nodeName==="BODY"||R.nodeName==="HTML"?A=R:A.appendChild(R);else{if(!ge&&!D&&!H&&M.indexOf("<")===-1)return x&&$e?x.createHTML(M):M;if(A=Pn(M),!A)return ge?null:$e?k:""}A&&J&&be(A.firstChild);const K=Fn(Qe?M:A);for(;j=K.nextNode();)Un(j),Gn(j),j.content instanceof i&&io(j.content);if(Qe)return M;if(ge){if(oe)for(ie=Be.call(A.ownerDocument);A.firstChild;)ie.appendChild(A.firstChild);else ie=A;return(p.shadowroot||p.shadowrootmode)&&(ie=we.call(n,ie,!0)),ie}let me=H?A.outerHTML:A.innerHTML;return H&&U["!doctype"]&&A.ownerDocument&&A.ownerDocument.doctype&&A.ownerDocument.doctype.name&&le(qr,A.ownerDocument.doctype.name)&&(me="<!DOCTYPE "+A.ownerDocument.doctype.name+`>
`+me),D&&It([he,pe,fe],Ce=>{me=ot(me,Ce," ")}),x&&$e?x.createHTML(me):me},e.setConfig=function(){let M=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Vt(M),se=!0},e.clearConfig=function(){je=null,se=!1},e.isValidAttribute=function(M,_,A){je||Vt({});const R=Q(M),j=Q(_);return Bn(R,j,A)},e.addHook=function(M,_){typeof _=="function"&&rt(X[M],_)},e.removeHook=function(M,_){if(_!==void 0){const A=Us(X[M],_);return A===-1?void 0:Bs(X[M],A,1)[0]}return _r(X[M])},e.removeHooks=function(M){X[M]=[]},e.removeAllHooks=function(){X=$r()},e}var oa=Xr();function vn(o){return oa.sanitize(o,{ALLOWED_TAGS:["p","div","span","br","strong","b","em","i","u","s","a","code","pre","h1","h2","h3","h4","h5","h6","ul","ol","li","blockquote","table","thead","tbody","tr","th","td","img","canvas","button","input","select","option","label","aside","section","details","summary"],ALLOWED_ATTR:["class","id","href","target","rel","src","alt","title","width","height","type","value","checked","selected","disabled","min","max","step","placeholder","data-command","data-command-template","data-setting-type","data-color-var","data-theme","data-settings-panel","data-graph","data-graph-src","data-graph-theme","data-graph-initialized","data-graph-error","data-speed","data-density","data-pattern","data-accent-color","data-dim-color","style","open","role","aria-label","aria-labelledby","aria-describedby","aria-valuemin","aria-valuemax","aria-valuenow","aria-valuetext","aria-live","aria-atomic","aria-current"],RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1})}class ia{headerElement;constructor(e){this.headerElement=e,this.render(),this.setupClickHandler()}render(){const e=dr.generateHeader(),t=dr.getTagline();this.headerElement.innerHTML=vn(`
      <div class="header-prompt">$ whoami | figlet | lolcat</div>
      <div class="header-ascii">
        <pre class="header-ascii-text header-clickable">${e}</pre>
      </div>
      <p class="header-tagline">${t}</p>
    `)}setupClickHandler(){this.headerElement.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("header-clickable")||t.closest(".header-clickable")){const n=new CustomEvent("terminal-command",{detail:"clear",bubbles:!0});document.dispatchEvent(n)}})}}class sa{navLinksElement;onCommandClick;activeCommand=null;constructor(e,t){this.navLinksElement=e,this.onCommandClick=t}setItems(e){this.navLinksElement.innerHTML="",e.forEach(t=>{const n=document.createElement("button");n.className="nav-link",n.type="button",n.textContent=t.label,n.setAttribute("data-command",t.command),n.setAttribute("aria-label",`Navigate to ${t.label}`),n.addEventListener("click",()=>{this.onCommandClick(t.command)}),this.navLinksElement.appendChild(n)})}addItem(e){const t=document.createElement("button");t.className="nav-link",t.type="button",t.textContent=e.label,t.setAttribute("data-command",e.command),t.setAttribute("aria-label",`Navigate to ${e.label}`),t.addEventListener("click",()=>{this.onCommandClick(e.command)}),this.navLinksElement.appendChild(t)}clear(){this.navLinksElement.innerHTML=""}setActiveItem(e){this.activeCommand=e,this.navLinksElement.querySelectorAll("button[data-command]").forEach(r=>{r.removeAttribute("aria-current")});const n=this.navLinksElement.querySelector(`button[data-command="${e}"]`);n&&n.setAttribute("aria-current","page")}getActiveCommand(){return this.activeCommand}}function aa(){document.querySelectorAll("a.email-protected").forEach(e=>{if(e.dataset.protected==="true")return;const t=e.dataset.user,n=e.dataset.domain;if(!t||!n){console.warn("Email link missing data-user or data-domain attributes",e);return}e.dataset.protected="true",e.addEventListener("click",r=>{r.preventDefault();const s=`mailto:${`${t}@${n}`}`;window.location.href=s}),e.addEventListener("keydown",r=>{if(r.key==="Enter"||r.key===" "){r.preventDefault();const s=`mailto:${`${t}@${n}`}`;window.location.href=s}}),e.hasAttribute("tabindex")||e.setAttribute("tabindex","0")})}class Tr{envVarManager;constructor(e){this.envVarManager=e}format(e,t){let n=e;return this.envVarManager&&(n=this.envVarManager.expandVariables(n)),n=this.expandBashEscapes(n,t),n=this.expandCustomTokens(n,t),n}expandBashEscapes(e,t){let n=e;return n=n.replace(/\\u/g,t.user),n=n.replace(/\\h/g,this.getShortHostname(t.hostname)),n=n.replace(/\\H/g,t.hostname),n=n.replace(/\\w/g,t.shortPwd),n=n.replace(/\\W/g,t.lastDir),n=n.replace(/\\\$/g,t.isRoot?"#":"$"),n=n.replace(/\\d/g,this.getDate()),n=n.replace(/\\t/g,this.getTime24()),n=n.replace(/\\T/g,this.getTime12()),n=n.replace(/\\A/g,this.getTimeShort()),n=n.replace(/\\@/g,this.getTimeAMPM()),t.historyNumber!==void 0&&(n=n.replace(/\\!/g,String(t.historyNumber))),t.commandNumber!==void 0&&(n=n.replace(/\\#/g,String(t.commandNumber))),n=n.replace(/\\\\/g,"\\"),n=n.replace(/\\n/g,`
`),n}expandCustomTokens(e,t){let n=e;return n=n.replace(/\{user\}/g,t.user),n=n.replace(/\{hostname\}/g,t.hostname),n=n.replace(/\{path\}/g,t.shortPwd),n=n.replace(/\{lastdir\}/g,t.lastDir),n=n.replace(/\{pwd\}/g,t.pwd),n}getShortHostname(e){const t=e.indexOf(".");return t>0?e.substring(0,t):e}getDate(){const e=new Date,t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r=t[e.getDay()],i=n[e.getMonth()],s=String(e.getDate()).padStart(2,"0");return`${r} ${i} ${s}`}getTime24(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}getTime12(){const e=new Date;let t=e.getHours();const n=t>=12?"PM":"AM";t=t%12||12;const r=String(t).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0"),s=String(e.getSeconds()).padStart(2,"0");return`${r}:${i}:${s} ${n}`}getTimeShort(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${t}:${n}`}getTimeAMPM(){const e=new Date;let t=e.getHours();const n=t>=12?"PM":"AM";t=t%12||12;const r=String(t).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0");return`${r}:${i} ${n}`}static getLastDir(e){if(e==="/")return"/";if(e==="~"||e==="")return"~";const t=e.split("/").filter(n=>n&&n!=="~");return t.length>0?t[t.length-1]:"~"}}class la{inputElement;promptElement;history=[];historyIndex=-1;currentInput="";availableCommands=[];fileSystem;constructor(e,t){this.inputElement=e,this.promptElement=t,this.setupEventListeners()}setupEventListeners(){this.inputElement.addEventListener("keydown",e=>this.handleKeyDown(e))}handleKeyDown(e){switch(e.key){case"ArrowUp":e.preventDefault(),this.navigateHistory("up");break;case"ArrowDown":e.preventDefault(),this.navigateHistory("down");break;case"Tab":e.preventDefault(),this.handleTabCompletion();break}}navigateHistory(e){this.history.length!==0&&(this.historyIndex===-1&&(this.currentInput=this.inputElement.value),e==="up"?this.historyIndex<this.history.length-1&&(this.historyIndex++,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex>0?(this.historyIndex--,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex===0&&(this.historyIndex=-1,this.inputElement.value=this.currentInput))}handleTabCompletion(){const e=this.inputElement.value;if(!e)return;const t=e.split(/\s+/);t.length===1?this.completeCommand(e.trim()):this.completeFilePath(t)}completeCommand(e){const t=this.availableCommands.filter(n=>n.startsWith(e.toLowerCase()));if(t.length===1)this.inputElement.value=t[0];else if(t.length>1){const n=this.findCommonPrefix(t);n.length>e.length&&(this.inputElement.value=n)}}completeFilePath(e){if(!this.fileSystem)return;const t=e[e.length-1],n=e.slice(0,-1).join(" ");let r=this.fileSystem.getCurrentPath(),i=t;const s=t.lastIndexOf("/");if(s!==-1){const a=t.substring(0,s+1);i=t.substring(s+1),a.startsWith("/")?r=a:r=this.resolvePath(this.fileSystem.getCurrentPath(),a)}try{if(!this.fileSystem.exists(r)||!this.fileSystem.isDirectory(r))return;const l=this.fileSystem.list(r).filter(g=>g.toLowerCase().startsWith(i.toLowerCase()));if(l.length===0)return;const c=this.findCommonPrefix(l);let d;if(s!==-1?d=t.substring(0,s+1)+c:d=c,l.length===1){const g=this.resolvePath(r,l[0]);this.fileSystem.isDirectory(g)&&(d+="/")}this.inputElement.value=n+(n?" ":"")+d}catch{return}}resolvePath(e,t){if(t.startsWith("/"))return t;const n=e.split("/").filter(i=>i),r=t.split("/").filter(i=>i);for(const i of r)i===".."?n.pop():i!=="."&&n.push(i);return"/"+n.join("/")}findCommonPrefix(e){if(e.length===0)return"";if(e.length===1)return e[0];let t=e[0];for(let n=1;n<e.length;n++)for(;!e[n].startsWith(t);)if(t=t.substring(0,t.length-1),t==="")return"";return t}addToHistory(e){e.trim()&&(this.history.push(e),this.historyIndex=-1,this.currentInput="")}getValue(){return this.inputElement.value}clear(){this.inputElement.value="",this.currentInput="",this.historyIndex=-1}focus(e=!1){!e&&this.isMobileDevice()||this.inputElement.focus({preventScroll:!0})}isMobileDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0||window.matchMedia("(max-width: 768px)").matches}setPrompt(e){this.promptElement.textContent=e}setAvailableCommands(e){this.availableCommands=e}setFileSystem(e){this.fileSystem=e}getHistory(){return[...this.history]}onSubmit(e){this.inputElement.addEventListener("keydown",t=>{if(t.key==="Enter"){const n=this.getValue();e(n)}})}}class ca{outputElement;inputLineElement;screensaverElements=[];isScreensaverOutput=!1;constructor(e){this.outputElement=e,this.inputLineElement=document.getElementById("terminal-input-line")}startScreensaverOutput(){this.screensaverElements=[],this.isScreensaverOutput=!0}writeLine(e,t,n){const r=document.createElement("div");r.className="output-line"+(t?` ${t}`:""),r.textContent=e,this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),n&&n()}write(e,t,n){const r=e.split(`
`);r.forEach((i,s)=>{(s<r.length-1||i)&&this.writeLine(i,t)}),n&&n()}writeHTML(e,t){const n=document.createElement("div");n.className="output-line",n.innerHTML=vn(e),this.isScreensaverOutput&&(this.screensaverElements.push(n),this.isScreensaverOutput=!1),this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(n,this.inputLineElement):this.outputElement.appendChild(n),t&&t()}writeError(e,t){const n=e.split(`
`);n.forEach((r,i)=>{if(i<n.length-1||r){const s=document.createElement("div");s.className="output-line output-error",s.textContent=r;const a=`error-${Date.now()}-${i}`;if(s.id=a,s.setAttribute("role","alert"),t&&i===0){const l=document.getElementById(t);if(l){const c=l.getAttribute("aria-describedby");c?l.setAttribute("aria-describedby",`${c} ${a}`):l.setAttribute("aria-describedby",a)}}this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(s,this.inputLineElement):this.outputElement.appendChild(s)}}),this.scrollToBottom()}writeCommand(e,t,n){const r=document.createElement("div");r.className="output-line";const i=document.createElement("span");i.style.color="var(--terminal-accent)",i.textContent=e;const s=document.createElement("span");s.textContent=t,r.appendChild(i),r.appendChild(s),this.isScreensaverOutput&&this.screensaverElements.push(r),this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),n&&n()}clear(){Array.from(this.outputElement.children).forEach(t=>{t.id!=="terminal-input-line"&&t.remove()})}clearScreensaverOutput(){this.screensaverElements.forEach(e=>{e.parentElement&&e.remove()}),this.screensaverElements=[],this.isScreensaverOutput=!1}scrollToBottom(){const e=this.outputElement.parentElement;e&&(e.scrollTop=e.scrollHeight)}scrollToCommand(){const e=this.outputElement.querySelectorAll(".output-line");e.length>=2?e[e.length-2].scrollIntoView({behavior:"instant",block:"start"}):e.length===1?e[0].scrollIntoView({behavior:"instant",block:"start"}):this.scrollToBottom()}performScrollBehavior(e){requestAnimationFrame(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{setTimeout(()=>{e==="top"?this.scrollToCommand():this.scrollToBottom()},50)})})})}}class da{constructor(e,t,n,r,i){this.dispatcher=e,this.executor=t,this.settingsManager=n,this.themeManager=r,this.envVarManager=i;const s=document.getElementById("terminal-output"),a=document.getElementById("terminal-input"),l=document.getElementById("terminal-prompt");if(!s||!a||!l)throw new Error("Required terminal elements not found");this.output=new ca(s),this.input=new la(a,l),this.promptFormatter=new Tr(i),this.setupInputHandler(),this.setupClickHandler(s),this.setupSettingsUIHandler(),this.setupKeyboardHandlers(),this.setupMobileViewportHandler(),this.updatePrompt()}input;output;username="darin";hostname="darinchambers.com";currentPath="~";promptFormatter;router;screensaverManager;isFullscreen=!1;fullscreenExitHandler=null;fullscreenExitCommand=null;setupClickHandler(e){e.addEventListener("click",t=>{const n=window.getSelection();if(n&&n.toString().length>0)return;const r=t.target,i=["svg","button","a","input","select","textarea","[data-graph]","[data-graph-src]",".graph-container"].join(", ");r.closest(i)||this.input.focus(!0)})}setupKeyboardHandlers(){document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelectorAll("[data-settings-panel]");if(t.length>0){const n=document.activeElement;n&&t[0].contains(n)&&(e.preventDefault(),this.input.focus(!0))}}})}setupMobileViewportHandler(){if(!window.visualViewport)return;let e=window.visualViewport.height;window.visualViewport.addEventListener("resize",()=>{const t=window.visualViewport.height;t>e&&this.scrollToHeader(),e=t})}scrollToHeader(){requestAnimationFrame(()=>{const e=document.getElementById("terminal-header");e?e.scrollIntoView({behavior:"smooth",block:"start"}):window.scrollTo({top:0,behavior:"smooth"})})}setupSettingsUIHandler(){document.addEventListener("terminal-command",e=>{const t=e;this.executeCommand(t.detail,!1)}),document.addEventListener("click",e=>{const t=e.target;if(t.closest("[data-command]")&&!t.closest(".nav-link")){const n=t.closest("[data-command]"),r=n.getAttribute("data-command");if(r){if(n.tagName==="A"&&e.preventDefault(),this.router){const i=this.router.getPathForCommand(r);if(i){this.router.navigate(i,!1);return}}this.executeCommand(r,!1)}}}),document.addEventListener("change",e=>{const t=e.target,n=t.getAttribute("data-command-template"),r=t.getAttribute("data-setting-type");if(!n)return;let i="";t instanceof HTMLInputElement&&t.type==="checkbox"?i=`${n} ${t.checked?"on":"off"}`:t instanceof HTMLInputElement&&t.type==="color"?i=`${n} ${t.value}`:t instanceof HTMLInputElement&&t.type==="range"?i=`${n} ${t.value}`:t instanceof HTMLSelectElement&&(r==="font-family"?i=`${n} "${t.value}"`:i=`${n} ${t.value}`),i&&this.executeCommand(i,!1)}),document.addEventListener("input",e=>{const t=e.target;if(t.type==="range"){const n=t.getAttribute("data-setting-type");if(n==="font-size"){const r=document.getElementById("font-size-value");r&&(r.textContent=`${t.value}px`)}else if(n==="animation-speed"){const r=document.getElementById("animation-speed-value");r&&(r.textContent=`${t.value}x`)}}}),document.addEventListener("settings-changed",()=>{this.refreshSettingsPanels(),this.updatePrompt(),this.screensaverManager?.handleSettingsChange()})}refreshSettingsPanels(){if(!this.settingsManager||!this.themeManager)return;const e=document.querySelectorAll("[data-settings-panel]");if(e.length===0)return;const t=Array.from(e).some(r=>r.contains(document.activeElement)),n=Ur(this.settingsManager,this.themeManager);if(e.forEach(r=>{const i=n.replace('<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true">',"").replace(/<\/aside>$/,"");r.innerHTML=vn(i)}),t&&e.length>0){const i=e[0].querySelector("button, input, select");i&&i.focus()}}focusSettingsPanelIfPresent(){setTimeout(()=>{const e=document.querySelector("[data-settings-panel]");if(e){const t=e.querySelector("button, input, select");t&&t.focus()}},0)}setupInputHandler(){this.input.onSubmit(async e=>{const t=e.trim();if(this.input.clear(),this.output.writeCommand(this.getPromptString(),t),this.input.addToHistory(t),t){const n=await this.executor.execute(t);this.displayResult(n),this.router&&this.router.syncUrlToCommand(t)}setTimeout(()=>{this.input.focus(!0)},100)})}displayResult(e){if(e.clearBefore&&this.output.clear(),e.fullscreen&&this.enterFullscreen(e.fullscreenExitCommand,e.fullscreenDuration),e.output===Pr.CLEAR_SCREEN?(this.output.clear(),this.router&&window.location.pathname!=="/"&&window.history.pushState({},"","/")):e.output&&!e.raw&&(e.error?this.output.writeError(e.output):e.html?(this.output.writeHTML(e.output,()=>{typeof window.initializeGraphs=="function"&&window.initializeGraphs(),aa(),this.output.performScrollBehavior(e.scrollBehavior)}),this.focusSettingsPanelIfPresent()):this.output.write(e.output,void 0,()=>{this.output.performScrollBehavior(e.scrollBehavior)})),e.scheduledCommand){const{command:t,delayMs:n,clearBefore:r}=e.scheduledCommand;setTimeout(()=>{this.resetFullscreen(),r&&this.output.clear(),this.executeCommand(t,!0)},n)}}getPromptString(){const e={user:this.username,hostname:this.hostname,pwd:this.envVarManager?.getVariable("PWD")??this.currentPath,shortPwd:this.currentPath,lastDir:Tr.getLastDir(this.currentPath),isRoot:this.username==="root"},t=this.settingsManager?.getSetting("prompt")?.format??"\\u@\\h:\\W\\$ ";return this.promptFormatter.format(t,e)}updatePrompt(){this.input.setPrompt(this.getPromptString())}registerCommand(e){this.dispatcher.registerCommand(e),this.input.setAvailableCommands(this.dispatcher.getCommandNames())}registerCommands(e){e.forEach(t=>this.registerCommand(t))}setFileSystem(e){this.input.setFileSystem(e)}writeWelcome(e){this.output.write(e,void 0,()=>{this.output.performScrollBehavior()})}setUsername(e){this.username=e,this.updatePrompt()}getUsername(){return this.username}setCurrentPath(e){this.currentPath=e,this.updatePrompt()}focus(e=!1){this.input.focus(e)}getInput(){return this.input}getOutput(){return this.output}stopScreensaverAnimations(){Eo(),br()}clearScreensaver(){this.stopScreensaverAnimations(),this.output.clearScreensaverOutput()}enterFullscreen(e,t){if(this.isFullscreen)return;this.isFullscreen=!0,this.fullscreenExitCommand=e??null;const n=document.getElementById("terminal-header"),r=document.getElementById("terminal-nav"),i=document.getElementById("terminal-input-line");n?.classList.add("fullscreen-hidden"),r?.classList.add("fullscreen-hidden"),i?.classList.add("fullscreen-hidden"),this.fullscreenExitHandler=()=>{this.exitFullscreen()},setTimeout(()=>{!this.isFullscreen||!this.fullscreenExitHandler||(document.addEventListener("keydown",this.fullscreenExitHandler,{once:!0}),document.addEventListener("click",this.fullscreenExitHandler,{once:!0}),document.addEventListener("touchstart",this.fullscreenExitHandler,{once:!0}),document.addEventListener("wheel",this.fullscreenExitHandler,{once:!0}))},100),t!==void 0&&setTimeout(()=>{this.exitFullscreen()},t)}resetFullscreen(){this.isFullscreen=!1,this.fullscreenExitCommand=null,this.fullscreenExitHandler&&(document.removeEventListener("keydown",this.fullscreenExitHandler),document.removeEventListener("click",this.fullscreenExitHandler),document.removeEventListener("touchstart",this.fullscreenExitHandler),document.removeEventListener("wheel",this.fullscreenExitHandler),this.fullscreenExitHandler=null)}exitFullscreen(){if(!this.isFullscreen)return;this.isFullscreen=!1;const e=this.fullscreenExitCommand;this.fullscreenExitCommand=null;const t=document.getElementById("terminal-header"),n=document.getElementById("terminal-nav"),r=document.getElementById("terminal-input-line");t?.classList.remove("fullscreen-hidden"),n?.classList.remove("fullscreen-hidden"),r?.classList.remove("fullscreen-hidden"),this.fullscreenExitHandler&&(document.removeEventListener("keydown",this.fullscreenExitHandler),document.removeEventListener("click",this.fullscreenExitHandler),document.removeEventListener("touchstart",this.fullscreenExitHandler),document.removeEventListener("wheel",this.fullscreenExitHandler),this.fullscreenExitHandler=null),e&&setTimeout(()=>{this.executeCommand(e,!0)},100)}setRouter(e){this.router=e}setScreensaverManager(e){this.screensaverManager=e}async executeCommand(e,t=!1){if(t&&this.output.clear(),this.output.writeCommand(this.getPromptString(),e),this.input.addToHistory(e),e.trim()){const n=await this.executor.execute(e);this.displayResult(n)}this.input.clear(),this.input.focus()}}class ua{aliases=new Map;fileSystem;aliasFilePath=Te.CONFIG_ALIASES;defaultAliases=new Map([["ll","ls -alh"]]);constructor(e){this.fileSystem=e,this.loadDefaultAliases(),this.loadAliases()}loadDefaultAliases(){this.defaultAliases.forEach((e,t)=>{this.aliases.set(t,e)})}loadAliases(){try{this.fileSystem.exists(this.aliasFilePath)&&this.fileSystem.isFile(this.aliasFilePath)&&this.fileSystem.readFile(this.aliasFilePath).split(`
`).filter(n=>n.trim()).forEach(n=>{const r=/^alias\s+(\S+)='(.+)'$/.exec(n);r&&this.aliases.set(r[1],r[2])})}catch{}}saveAliases(){const e=Array.from(this.aliases.entries()).map(([n,r])=>`alias ${n}='${r}'`),t=e.join(`
`)+(e.length>0?`
`:"");try{this.fileSystem.writeFile(this.aliasFilePath,t)}catch(n){throw new Error(`Failed to save aliases: ${n instanceof Error?n.message:String(n)}`)}}setAlias(e,t){if(!/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(e))throw new Error(`Invalid alias name: ${e}`);this.aliases.set(e,t),this.saveAliases()}removeAlias(e){const t=this.aliases.has(e);return t&&(this.aliases.delete(e),this.saveAliases()),t}getAlias(e){return this.aliases.get(e)}getAllAliases(){return new Map(this.aliases)}isDefaultAlias(e){return this.defaultAliases.has(e)}resolve(e){const t=/^(\S+)/.exec(e);if(!t)return e;const n=t[1],r=this.aliases.get(n);if(r){const i=e.replace(/^(\S+)/,r);return this.resolveRecursive(i,10)}return e}resolveRecursive(e,t){if(t<=0)return e;const n=/^(\S+)/.exec(e);if(!n)return e;const r=n[1],i=this.aliases.get(r);if(i){const s=e.replace(/^(\S+)/,i);return this.resolveRecursive(s,t-1)}return e}}class Ar{static parse(e){const t=e.trim();if(!t)return{command:"",args:[],raw:e};const n=this.splitCommand(t),r=n[0]?.toLowerCase()||"",i=n.slice(1);return{command:r,args:i,raw:e}}static splitCommand(e){const t=[];let n="",r=!1,i="",s=!1;for(const a of e){if(a==="\\"&&!s){s=!0;continue}if(s){n+=a,s=!1;continue}(a==='"'||a==="'")&&!r?(r=!0,i=a):a===i&&r?(r=!1,i=""):a===" "&&!r?n&&(t.push(n),n=""):n+=a}return n&&t.push(n),t}}class Nt extends Error{constructor(e){super(e),this.name="AppError",Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}}class Z extends Nt{constructor(e){super(e),this.name="FileSystemError"}}class _a extends Nt{constructor(e){super(`Command not found: ${e}`),this.name="CommandNotFoundError"}}class St{static parse(e){const t=[];let n="",r=!1,i="";for(let a=0;a<e.length;a++){const l=e[a],c=a>0?e[a-1]:"";if((l==='"'||l==="'")&&c!=="\\")r?l===i&&(r=!1,i=""):(r=!0,i=l),n+=l;else if(l==="|"&&!r){const d=n.trim();d&&t.push(d),n=""}else n+=l}const s=n.trim();return s&&t.push(s),t}static hasPipe(e){let t=!1,n="";for(let r=0;r<e.length;r++){const i=e[r],s=r>0?e[r-1]:"";if((i==='"'||i==="'")&&s!=="\\")t?i===n&&(t=!1,n=""):(t=!0,n=i);else if(i==="|"&&!t)return!0}return!1}}class ma{commands=new Map;registerCommand(e){this.commands.set(e.name.toLowerCase(),e),e.aliases&&e.aliases.forEach(t=>{this.commands.set(t.toLowerCase(),e)})}unregisterCommand(e){const t=e.toLowerCase(),n=this.commands.get(t);return n?(this.commands.delete(n.name.toLowerCase()),this.commands.forEach((r,i)=>{r===n&&this.commands.delete(i)}),!0):!1}async dispatch(e){const t=Ar.parse(e);if(!t.command)return{output:""};const n=this.commands.get(t.command);if(!n)return{output:`${new _a(t.command).message}
Type 'help' for available commands.`,error:!0};try{return await n.execute(t.args)}catch(r){return r instanceof Nt?{output:r.message,error:!0}:r instanceof Error?{output:`Error: ${r.message}`,error:!0}:{output:"An unknown error occurred.",error:!0}}}async dispatchPipeline(e){const t=St.parse(e);if(t.length===0)return{output:""};let n={output:""};for(let r=0;r<t.length;r++){const i=t[r],s=r===0?void 0:n.output,a=Ar.parse(i);if(!a.command)return{output:""};const l=this.commands.get(a.command);if(!l)return{output:`Command not found: ${a.command}
Type 'help' for available commands.`,error:!0};try{if(n=await l.execute(a.args,s),n.error)return n}catch(c){return c instanceof Nt?{output:c.message,error:!0}:c instanceof Error?{output:`Error: ${c.message}`,error:!0}:{output:"An unknown error occurred.",error:!0}}}return n}getCommands(){const e=new Map;return this.commands.forEach((t,n)=>{t.name===n&&e.set(n,t)}),Array.from(e.values())}getCommandNames(){return Array.from(this.commands.keys())}}class ha{constructor(e,t,n){this.dispatcher=e,this.aliasManager=t,this.envVarManager=n}async execute(e){const t=e.trim();if(!t)return{output:""};let n;St.hasPipe(t)?n=St.parse(t).map(c=>this.aliasManager.resolve(c.trim())).join(" | "):n=this.aliasManager.resolve(t);const r=this.envVarManager?this.envVarManager.expandVariables(n):n;return St.hasPipe(r)?await this.dispatcher.dispatchPipeline(r):await this.dispatcher.dispatch(r)}}class pa{platformVars=new Map;userVars=new Map;fileSystem;constructor(e,t,n){this.fileSystem=e,this.initializePlatformVariables(t,n),this.loadUserVariables()}initializePlatformVariables(e,t){const n=`/home/${e}`;this.platformVars.set("HOME",n),this.platformVars.set("USER",e),this.platformVars.set("LOGNAME",e),this.platformVars.set("HOSTNAME",t),this.platformVars.set("PWD",n),this.platformVars.set("OLDPWD",""),this.platformVars.set("SHELL","/bin/dcsh"),this.platformVars.set("PATH","/usr/local/bin:/usr/bin:/bin"),this.platformVars.set("TERM","xterm-256color")}loadUserVariables(){try{const e=localStorage.getItem(dn.ENVIRONMENT);if(e){const t=JSON.parse(e);Object.entries(t).forEach(([n,r])=>{this.userVars.set(n,r)})}this.syncToFileSystem()}catch(e){console.warn("Failed to load environment variables from localStorage:",e)}}saveUserVariables(){try{const e={};this.userVars.forEach((t,n)=>{e[n]=t}),localStorage.setItem(dn.ENVIRONMENT,JSON.stringify(e)),this.syncToFileSystem()}catch(e){console.warn("Failed to save environment variables to localStorage:",e)}}syncToFileSystem(){try{const e=[];e.push("# Environment Variables"),e.push("# Platform variables (read-only):"),this.platformVars.forEach((n,r)=>{e.push(`${r}=${n}`)}),this.userVars.size>0&&(e.push(""),e.push("# User variables:"),this.userVars.forEach((n,r)=>{e.push(`export ${r}=${n}`)}));const t=e.join(`
`);this.fileSystem.writeFile(Te.CONFIG_ENV,t)}catch(e){console.warn("Failed to sync environment variables to filesystem:",e)}}getVariable(e){return this.userVars.get(e)??this.platformVars.get(e)}setVariable(e,t){if(!/^[A-Z_][A-Z0-9_]*$/i.test(e))throw new Error(`Invalid variable name: ${e}`);this.userVars.set(e,t),this.saveUserVariables()}updatePlatformVariable(e,t){this.platformVars.has(e)&&this.platformVars.set(e,t)}unsetVariable(e){this.userVars.delete(e)&&this.saveUserVariables()}getPlatformVariables(){return new Map(this.platformVars)}getUserVariables(){return new Map(this.userVars)}getAllVariables(){const e=new Map;return this.platformVars.forEach((t,n)=>{e.set(n,t)}),this.userVars.forEach((t,n)=>{e.set(n,t)}),e}expandVariables(e){let t=e;return t=t.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/gi,(n,r)=>this.getVariable(r)??n),t=t.replace(new RegExp("(?<!\\\\)\\$([A-Z_][A-Z0-9_]*)","gi"),(n,r)=>this.getVariable(r)??n),t=t.replace(/\\\$/g,"$"),t}exportFormat(){const e=[];return this.getAllVariables().forEach((t,n)=>{e.push(`${n}=${t}`)}),e.sort()}}const fa=`---
title: 'A Love Letter to Developers (and the terminal)'
date: '2025-11-16'
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
`,ga=Object.freeze(Object.defineProperty({__proto__:null,default:fa},Symbol.toStringTag,{value:"Module"})),$a=`---
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
`,Ta=Object.freeze(Object.defineProperty({__proto__:null,default:$a},Symbol.toStringTag,{value:"Module"})),Aa=`---
title: 'Building an Enterprise Graph Library in One Week'
date: '2025-11-16'
tags: ['open-source', 'visualization', 'typescript', 'vibe-coding', 'claude-code']
summary: 'What vibe coding looks like taken to an extreme.  Claude Code and I programmed a Enterprise grade, zero-dependency SVG graph library with force-directed physics and touch-optimized gestures in a week in my spare time.  Why?  I wanted to see how far one could push vibe coding, and I learned a lot along the way.'
---

I love force directed graphs.  They bring me joy.  I bumped into a really neat proprietary SVG force directed graph library.  Unable to find it as open-source I tasked Gemini Pro 2.5 to build one.  Within the confines of lunchtime we had a plain, but working SVG graph library.  What happened over the next week was an exercise in seeing how far we could go with vibe coding.  Check out the <a href="https://darinc.github.io/SVG-Graph-Network/" target="_blank" rel="noopener noreferrer">finished project page</a>. and the code: <a href="https://github.com/darinc/SVG-Graph-Network" target="_blank" rel="noopener noreferrer">SVG-Graph-Network</a>.

<div class="side-by-side-layout">
<div class="content-column">

## The Lunchtime Project Gets Ambitious

That "lunchtime project" didn't stay a simple toy. By that first evening, the library was becoming more usable. We had a new dataset, light/dark modes, collapsible legends, and multiple node shapes.

Then, on Thursday, the project hit its inflection point.

We'd just added comprehensive mobile and touch support. The physics kept running while dragging nodes. It was becoming obvious the next steps involed... well... a lot of steps so it was time to draft up and commit to the repo a roadmap.

This was the moment "vibe coding" collided with "best practices." The project, which had zero users, was suddenly slated for a full architectural overhaul.

</div>
<div class="graph-column">

<div id="blog-graph-demo" class="graph-container" data-graph-src="/data/blog-graph-demo.json" style="width: 100%; height: 350px; border: 1px solid #333;"></div>

</div>
</div>

## The Great Refactoring

The initial code was a 1,500-line monolithic "God Object." It worked, but it wasn't best practices, or even good practices.

So, we did the "unnecessary" thing and tore it down to the studs.

- **Thursday:** We began an "aggressive architectural refactoring," breaking that huge file into a modular system: a physics engine, a UI manager, a renderer, and an event manager. The main class size was cut by 70%.
- **Thursday Night:** The vibe turned professional. In preparation for a language migration, we added 92 unit tests, a full CI/CD pipeline, and then...
- **Thursday, 10 PM:** We started the full TypeScript migration.

## From "Vibe" to "Production-Ready"

Friday Claude Code was quite busy. I effectively put Claude into a loop of migrate, test, repeat and we completed the TypeScript migration while adding tests the whole way. By the end of Friday we had implemented professional-grade APIs for core data and bulk operations. The roadmap was updated and our: **"Production Readiness Upgrade"** in our roadmap went from 4/10 → 7/10

In 24 hours, the project had gone from a toy to a serious library. We immediately added 38 new methods for selection, highlighting, and camera control.

Then we added the _real_ professional infrastructure:

- TypeDoc for API docs
- Husky pre-commit hooks
- Lint-staged for quality gates
- Size-limit for bundle monitoring (it's 19.53KB brotlied, by the way)

## The Day of Deconstruction

At this point the project was looking good, but Claude created some "God Objects" during the refactor that did not pass an audit prompt. Sunday was the day we paid the technical debt we had just incurred.

We didn't just refactor _one_ God Object; we hunted down _all_ of them.

- **The 3,300-line God Object:** Refactored with an EventBus and dependency injection. **Result: 91% complexity reduction.**
- **The 900-line Renderer:** Decomposed into focused managers. **Result: 78% complexity reduction.**
- **The 1,000-line Event Manager:** Broken apart. **Result: 80% complexity reduction.**
- **The 800-line UI Manager:** Split into five components. **Result: 76% complexity reduction.**

By the end of the day, we had **466 passing tests**, and the architecture was clean, testable, and maintainable.

## The "Honest README"

The sprint finished on Tuesday with a final, crucial commit: we wrote the documentation, which included a section honestly recommending _against_ using this for most production systems. It points everyone to D3.js, Cytoscape, and the other giants.

Because making yet another graphing library was never the point (xkcd 927?).

This was about the joy of the craft. It was an exercise in seeing how far a developer-AI pair could push a "vibe" and still land on a foundation of rock-solid, professional-grade best practices.

We "shipped" it on Wednesday by building the GitHub Pages site and, in a final act of dogfooding, using the library itself to visualize its own internal module dependencies.

At the end of the day? It's a graph library that hopefully nobody uses. But for me, it was a one-week, 100 commit experiment to seeing if humans and AI can build things _right_ when pushing the envolope of what is possible.
`,Ea=Object.freeze(Object.defineProperty({__proto__:null,default:Aa},Symbol.toStringTag,{value:"Module"})),La=`---
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
`,ya=Object.freeze(Object.defineProperty({__proto__:null,default:La},Symbol.toStringTag,{value:"Module"})),Ia=`---
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
`,ba=Object.freeze(Object.defineProperty({__proto__:null,default:Ia},Symbol.toStringTag,{value:"Module"})),wa=`# Darin Chambers

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
`,Sa=Object.freeze(Object.defineProperty({__proto__:null,default:wa},Symbol.toStringTag,{value:"Module"})),va=`# Contact Information

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
`,Ca=Object.freeze(Object.defineProperty({__proto__:null,default:va},Symbol.toStringTag,{value:"Module"})),Ra='# Terminal Help\n\nWelcome to my interactive terminal! This is a Unix-like command-line interface where you can explore my work and read my blog.\n\n## Getting Help\n\n- **`help`** - Show this help message\n- **`help <command>`** - Show detailed help for a specific command\n- **`<command> --help`** - Show detailed help for any command\n\n**Example:** `help ls` or `ls --help`\n\n## Available Commands\n\n### Content & Navigation\n\n- **`about`** - Learn about my background and expertise\n- **`portfolio`** - View my projects and accomplishments\n- **`blog`** - Read my blog posts and articles\n- **`notes`** - Short-form notes and thoughts\n- **`contact`** - Get in touch with me\n- **`changelog`** - View project version history\n\n### File System\n\n- **`ls`** - List directory contents\n- **`cd`** - Change directory\n- **`pwd`** - Print working directory\n- **`cat`** - Display file contents\n- **`tree`** - Show directory structure\n- **`rm`** - Remove files or directories\n- **`render`** - Render markdown files\n\n### Core Utilities\n\n- **`echo`** - Display text\n- **`date`** - Show current date/time\n- **`clear`** - Clear the screen\n- **`history`** - Show command history\n- **`alias`** - Create command shortcuts\n- **`whoami`** - Display current user\n- **`which`** - Show path of commands\n\n### Novelty\n\n- **`figlet`** - ASCII art text banners\n- **`lolcat`** - Rainbow-colorize text output\n- **`ddate`** - Discordian calendar date\n- **`matrix`** - Matrix digital rain animation\n- **`life`** - Conway\'s Game of Life\n- **`boot`** - Simulated Linux boot sequence\n- **`shutdown`** - Simulated Linux shutdown\n- **`reboot`** - Full reboot animation\n- **`bsod`** - Fake Windows Blue Screen of Death\n\n## Quick Start\n\nTry these commands to explore:\n\n```\nabout           # Learn about me\nportfolio       # See my work\nblog            # Read my posts\nnotes           # Short-form thoughts\ntree            # Explore the file structure\nls ~            # List home directory\n```\n\n## Advanced Features\n\n**Command Piping:** Chain commands with `|`\n\n```\ncat ~/blog/post.md | render\necho "Hello" | figlet\nfiglet "Hi" | lolcat\n```\n\n**Navigation:** Use arrow keys for command history, Tab for auto-complete\n\n**Aliases:** Create shortcuts with `alias ll=\'ls -la\'`\n\n---\n\n**Tip:** For detailed help on any command, use `<command> --help` or `help <command>`\n',xa=Object.freeze(Object.defineProperty({__proto__:null,default:Ra},Symbol.toStringTag,{value:"Module"})),Na=`# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
`,ka=Object.freeze(Object.defineProperty({__proto__:null,default:Na},Symbol.toStringTag,{value:"Module"}));class Ma{static createDirectoryNode(e){const t=e.startsWith(".");return{name:e,type:"directory",children:new Map,permissions:"drwxr-xr-x",owner:"darin",size:4096,modifiedTime:new Date,isHidden:t}}static createFileNode(e,t){const n=e.startsWith(".");return{name:e,type:"file",content:t,permissions:"-rw-r--r--",owner:"darin",size:t.length,modifiedTime:new Date,isHidden:n}}static loadBlogFiles(){const e=Object.assign({"../../content/blog/2025-11-14-a-love-letter-to-developers-and-the-terminal.md":ga,"../../content/blog/2025-11-15-we-trick-rocks-into-thinking.md":Ta,"../../content/blog/2025-11-16-building-an-enterprise-grade-graph-library-in-one-week.md":Ea,"../../content/blog/2025-11-23-leet-status-unlocked.md":ya}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),s=r.default;t.set(i,this.createFileNode(i,s))}return t}static loadPortfolioFiles(){const e=Object.assign({"../../content/portfolio/hypergrowing-a-unicorn.md":ba}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),s=r.default;t.set(i,this.createFileNode(i,s))}return t}static loadPostFiles(){const e=Object.assign({}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),s=r.default;t.set(i,this.createFileNode(i,s))}return t}static loadContentFiles(){const e=Object.assign({"../../content/about.md":Sa,"../../content/contact.md":Ca,"../../content/help.md":xa}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),s=r.default;t.set(i,this.createFileNode(i,s))}return t}static loadChangelogFile(){const t=Object.values(Object.assign({"../../../CHANGELOG.md":ka}));return t.length>0?t[0].default:""}static createDefaultStructure(){const e=this.createDirectoryNode(""),t=e.children;t.set("root",this.createDirectoryNode("root"));const n=this.createDirectoryNode("home");t.set("home",n);const r=this.createDirectoryNode("guest");n.children.set("guest",r),r.children.set("README.txt",this.createFileNode("README.txt",`Welcome to darinchambers.com!

This is a terminal-inspired personal website showcasing expertise in AI and software engineering.

Type 'help' to see available commands.
Type 'cd /home/darin' to explore more.
`));const i=this.createDirectoryNode("darin");n.children.set("darin",i),i.children.set(".secret",this.createFileNode(".secret",`You found a secret! 🎉

"The best way to predict the future is to invent it." - Alan Kay

Keep exploring...
`)),i.children.set("about.txt",this.createFileNode("about.txt",`Darin Chambers
Technologist, Inventor

30 years of experience building innovative solutions.
Specializing in AI, machine learning, and software architecture.

Building What's Next on Rock-Solid Foundations.
`)),i.children.set("projects.txt",this.createFileNode("projects.txt",`Notable Projects:
- AI/ML systems
- Distributed architectures
- Developer tools
- More to come...

Type 'portfolio' for detailed information.
`)),i.children.set("contact.txt",this.createFileNode("contact.txt",`Get in touch with me!

Type 'contact' to see all contact information.
`)),i.children.set("blog.txt",this.createFileNode("blog.txt",`Recent thoughts and articles on software engineering,
AI/ML, distributed systems, and more.

Type 'blog' to read posts.
`));const s=this.createDirectoryNode("blog");i.children.set("blog",s);const a=this.loadBlogFiles();for(const[S,x]of a)s.children.set(S,x);const l=this.createDirectoryNode("posts");i.children.set("posts",l);const c=this.loadPostFiles();for(const[S,x]of c)l.children.set(S,x);const d=this.createDirectoryNode("content");i.children.set("content",d);const g=this.loadContentFiles();for(const[S,x]of g)d.children.set(S,x);const f=this.createDirectoryNode("portfolio");i.children.set("portfolio",f);const E=this.loadPortfolioFiles();for(const[S,x]of E)f.children.set(S,x);const v=this.loadChangelogFile();v&&i.children.set("CHANGELOG.md",this.createFileNode("CHANGELOG.md",v));const w=this.createDirectoryNode("usr");t.set("usr",w);const $=this.createDirectoryNode("bin");w.children.set("bin",$),$.children.set("help",this.createFileNode("help","[Core command: help]")),$.children.set("clear",this.createFileNode("clear","[Core command: clear]")),$.children.set("history",this.createFileNode("history","[Core command: history]")),$.children.set("date",this.createFileNode("date","[Core command: date]")),$.children.set("echo",this.createFileNode("echo","[Core command: echo]")),$.children.set("whoami",this.createFileNode("whoami","[Core command: whoami]")),$.children.set("alias",this.createFileNode("alias","[Core command: alias]")),$.children.set("unalias",this.createFileNode("unalias","[Core command: unalias]")),$.children.set("env",this.createFileNode("env","[Core command: env]")),$.children.set("export",this.createFileNode("export","[Core command: export]")),$.children.set("ls",this.createFileNode("ls","[Core command: ls]")),$.children.set("cd",this.createFileNode("cd","[Core command: cd]")),$.children.set("pwd",this.createFileNode("pwd","[Core command: pwd]")),$.children.set("cat",this.createFileNode("cat","[Core command: cat]")),$.children.set("tree",this.createFileNode("tree","[Core command: tree]")),$.children.set("rm",this.createFileNode("rm","[Core command: rm]")),$.children.set("render",this.createFileNode("render","[Core command: render]")),$.children.set("which",this.createFileNode("which","[Core command: which]")),$.children.set("ddate",this.createFileNode("ddate","[Novelty command: ddate]")),$.children.set("figlet",this.createFileNode("figlet","[Novelty command: figlet]")),$.children.set("lolcat",this.createFileNode("lolcat","[Novelty command: lolcat]")),$.children.set("matrix",this.createFileNode("matrix","[Novelty command: matrix]")),$.children.set("life",this.createFileNode("life","[Novelty command: life]")),$.children.set("boot",this.createFileNode("boot","[Novelty command: boot]")),$.children.set("shutdown",this.createFileNode("shutdown","[Novelty command: shutdown]")),$.children.set("reboot",this.createFileNode("reboot","[Novelty command: reboot]")),$.children.set("bsod",this.createFileNode("bsod","[Novelty command: bsod]"));const y=this.createDirectoryNode("local");w.children.set("local",y);const N=this.createDirectoryNode("bin");return y.children.set("bin",N),N.children.set("about",this.createFileNode("about","[Custom command: about]")),N.children.set("portfolio",this.createFileNode("portfolio","[Custom command: portfolio]")),N.children.set("blog",this.createFileNode("blog","[Custom command: blog]")),N.children.set("notes",this.createFileNode("notes","[Custom command: notes]")),N.children.set("contact",this.createFileNode("contact","[Custom command: contact]")),N.children.set("settings",this.createFileNode("settings","[Custom command: settings]")),N.children.set("changelog",this.createFileNode("changelog","[Custom command: changelog]")),e}}class Oa{root;currentPath;currentUsername="darin";constructor(e){this.root=e,this.currentPath=Te.HOME_DARIN}getCurrentPath(){return this.currentPath}setCurrentUsername(e){this.currentUsername=e}getShortPath(){if(this.currentPath==="/")return"/";const e=`/home/${this.currentUsername}`;return this.currentPath===e?"~":this.currentPath.startsWith(e+"/")?"~"+this.currentPath.substring(e.length):this.currentPath}resolvePath(e){return e.startsWith("/")?this.normalizePath(e):e==="~"?`/home/${this.currentUsername}`:e.startsWith("~/")?`/home/${this.currentUsername}`+e.substring(1):this.normalizePath(this.currentPath+"/"+e)}normalizePath(e){const t=e.split("/").filter(r=>r.length>0),n=[];for(const r of t)r===".."?n.pop():r!=="."&&n.push(r);return"/"+n.join("/")}getNode(e){const t=this.resolvePath(e);if(t==="/")return this.root;const n=t.split("/").filter(i=>i.length>0);let r=this.root;for(const i of n){if(!r.children?.has(i))return null;r=r.children.get(i)}return r}list(e="."){const t=this.getNode(e);if(!t)throw new Z(`ls: cannot access '${e}': No such file or directory`);if(t.type!=="directory")throw new Z(`ls: ${e}: Not a directory`);return Array.from(t.children.keys()).sort()}changeDirectory(e){const t=this.resolvePath(e),n=this.getNode(t);if(!n)throw new Z(`cd: ${e}: No such file or directory`);if(n.type!=="directory")throw new Z(`cd: ${e}: Not a directory`);this.currentPath=t||"/"}readFile(e){const t=this.getNode(e);if(!t)throw new Z(`cat: ${e}: No such file or directory`);if(t.type!=="file")throw new Z(`cat: ${e}: Is a directory`);return t.content??""}exists(e){return this.getNode(e)!==null}isDirectory(e){const t=this.getNode(e);return t!==null&&t.type==="directory"}isFile(e){const t=this.getNode(e);return t!==null&&t.type==="file"}writeFile(e,t){const r=this.resolvePath(e).split("/").filter(l=>l.length>0),i=r.pop();if(!i)throw new Z(`Invalid file path: ${e}`);let s=this.root;for(const l of r){if(!s.children?.has(l))throw new Z(`Directory does not exist: ${e}`);if(s=s.children.get(l),s.type!=="directory")throw new Z(`Not a directory: ${e}`)}const a={name:i,type:"file",content:t};s.children.set(i,a)}createDirectory(e){const n=this.resolvePath(e).split("/").filter(i=>i.length>0);let r=this.root;for(const i of n)if(r.children?.has(i)){const s=r.children.get(i);if(s.type!=="directory")throw new Z(`mkdir: ${e}: File exists but is not a directory`);r=s}else{const s={name:i,type:"directory",children:new Map};r.children.set(i,s),r=s}}getTree(e=".",t=4){const n=this.getNode(e);if(!n)throw new Z(`tree: cannot access '${e}': No such file or directory`);const r=[],i=this.resolvePath(e);return r.push(i==="/"?"/":i),n.type==="directory"&&this.buildTree(n,"",r,1,t),r}buildTree(e,t,n,r,i){if(r>i||!e.children)return;const s=Array.from(e.children.entries()).sort((a,l)=>a[1].type==="directory"&&l[1].type==="file"?-1:a[1].type==="file"&&l[1].type==="directory"?1:a[0].localeCompare(l[0]));s.forEach(([a,l],c)=>{const d=c===s.length-1,g=d?"└── ":"├── ",f=d?"    ":"│   ";n.push(t+g+a),l.type==="directory"&&this.buildTree(l,t+f,n,r+1,i)})}deleteFile(e){const t=this.resolvePath(e),n=this.getNode(t);if(!n)throw new Z(`rm: cannot remove '${e}': No such file or directory`);if(n.type!=="file")throw new Z(`rm: cannot remove '${e}': Is a directory`);const r=t.split("/").filter(a=>a.length>0),i=r.pop();if(!i)throw new Z(`rm: cannot remove '${e}': Invalid path`);let s=this.root;for(const a of r)s=s.children.get(a);s.children.delete(i)}deleteDirectory(e,t=!1){const n=this.resolvePath(e);if(n==="/")throw new Z("rm: cannot remove '/': Permission denied");const r=this.getNode(n);if(!r)throw new Z(`rm: cannot remove '${e}': No such file or directory`);if(r.type!=="directory")throw new Z(`rm: cannot remove '${e}': Not a directory`);if(!t&&r.children&&r.children.size>0)throw new Z(`rm: cannot remove '${e}': Directory not empty`);const i=n.split("/").filter(l=>l.length>0),s=i.pop();if(!s)throw new Z(`rm: cannot remove '${e}': Invalid path`);let a=this.root;for(const l of i)a=a.children.get(l);a.children.delete(s)}}class Da{terminal;routes;isNavigating=!1;onRouteChangeCallback=null;fileSystem;constructor(e,t){this.terminal=e,this.fileSystem=t,this.routes=this.initializeRoutes(),this.setupListeners()}initializeRoutes(){return[{pattern:/^\/blog\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`blog ${e[1]}`},{pattern:/^\/blog\/?$/,commandBuilder:()=>"blog"},{pattern:/^\/notes\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`notes ${e[1]}`},{pattern:/^\/notes\/?$/,commandBuilder:()=>"notes"},{pattern:/^\/about\/?$/,commandBuilder:()=>"about"},{pattern:/^\/portfolio\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`portfolio ${e[1]}`},{pattern:/^\/portfolio\/?$/,commandBuilder:(e,t)=>{const n=t?.get("tags");return n?`portfolio --tags ${n}`:"portfolio"}},{pattern:/^\/contact\/?$/,commandBuilder:()=>"contact"},{pattern:/^\/settings\/?$/,commandBuilder:()=>"settings"},{pattern:/^\/help\/?$/,commandBuilder:()=>"help"},{pattern:/^\/matrix\/?$/,commandBuilder:()=>"matrix"},{pattern:/^\/life\/?$/,commandBuilder:()=>"life"},{pattern:/^\/$/,commandBuilder:()=>"about"}]}setupListeners(){window.addEventListener("popstate",()=>{this.handleRouteChange(!1)})}handleInitialRoute(){const e=sessionStorage.getItem("ghPagesRedirect");e&&(sessionStorage.removeItem("ghPagesRedirect"),window.history.replaceState({},"",e)),this.handleRouteChange(!1)}handleRouteChange(e){const t=window.location.pathname,n=new URLSearchParams(window.location.search),r=this.parseRoute(t,n);r?(this.isNavigating=!0,this.terminal.executeCommand(r,e),this.isNavigating=!1,this.onRouteChangeCallback&&this.onRouteChangeCallback(r)):this.navigate("/",!0)}parseRoute(e,t){for(const n of this.routes){const r=e.match(n.pattern);if(r)return n.commandBuilder(r,t)}return null}navigate(e,t=!0){this.isNavigating||(window.history.pushState({},"",e),this.handleRouteChange(t))}getValidBlogPostIds(){try{const e=Te.CONTENT_BLOG,n=this.fileSystem.list(e).filter(i=>i.endsWith(".md")),r=new Set;for(const i of n){const s=Fr.getIdFromFilename(i);r.add(s)}return r}catch{return new Set}}getValidPostIds(){try{const e=Te.CONTENT_POSTS,n=this.fileSystem.list(e).filter(i=>i.endsWith(".md")),r=new Set;for(const i of n){const s=Hr.getIdFromFilename(i);r.add(s)}return r}catch{return new Set}}getPathForCommand(e){const t=e.trim();if(t.startsWith("blog ")&&!t.includes("--tag")){const r=t.substring(5).trim();return this.getValidBlogPostIds().has(r)?`/blog/${r}`:null}if(t.startsWith("notes ")&&!t.includes("--tag")){const r=t.substring(6).trim();return this.getValidPostIds().has(r)?`/notes/${r}`:null}if(t.startsWith("portfolio --tags ")){const r=t.substring(17).trim();return r?`/portfolio?tags=${encodeURIComponent(r)}`:"/portfolio"}return t.startsWith("portfolio ")?`/portfolio/${t.substring(10).trim()}`:{blog:"/blog",notes:"/notes",about:"/about",portfolio:"/portfolio",contact:"/contact",settings:"/settings",help:"/help",matrix:"/matrix",life:"/life"}[t]||null}syncUrlToCommand(e){const t=this.getPathForCommand(e);t&&window.location.pathname!==t&&window.history.pushState({},"",t),this.onRouteChangeCallback&&this.onRouteChangeCallback(e)}onRouteChange(e){this.onRouteChangeCallback=e}getCurrentCommand(){const e=new URLSearchParams(window.location.search);return this.parseRoute(window.location.pathname,e)}}class Pa{callback;debounceMs;debounceTimer=null;isMonitoring=!1;boundHandleActivity;constructor(e,t=100){this.callback=e,this.debounceMs=t,this.boundHandleActivity=this.handleActivity.bind(this)}start(){this.isMonitoring||(this.isMonitoring=!0,document.addEventListener("keydown",this.boundHandleActivity),document.addEventListener("click",this.boundHandleActivity),document.addEventListener("touchstart",this.boundHandleActivity,{passive:!0}))}stop(){this.isMonitoring&&(this.isMonitoring=!1,document.removeEventListener("keydown",this.boundHandleActivity),document.removeEventListener("click",this.boundHandleActivity),document.removeEventListener("touchstart",this.boundHandleActivity),this.debounceTimer&&(clearTimeout(this.debounceTimer),this.debounceTimer=null))}handleActivity(){this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>{this.callback(),this.debounceTimer=null},this.debounceMs)}isActive(){return this.isMonitoring}}class Fa{settingsManager;terminal;idleTimer=null;state="idle";lastActivityTime=Date.now();constructor(e,t){this.settingsManager=e,this.terminal=t,this.setupVisibilityListener()}recordActivity(){if(this.lastActivityTime=Date.now(),this.state==="active"){this.deactivateScreensaver();return}this.resetIdleTimer()}startIdleTimer(){if(!this.isEnabled()){this.state="disabled";return}this.state="idle",this.resetIdleTimer()}resetIdleTimer(){if(this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null),!this.isEnabled()){this.state="disabled";return}if(this.state==="active")return;const e=this.getTimeoutMs();this.idleTimer=setTimeout(()=>{this.activateScreensaver()},e),this.state="idle"}activateScreensaver(){if(!this.isEnabled()||this.state==="active")return;const e=this.settingsManager.getActiveScreensaver();this.terminal.getOutput().startScreensaverOutput(),this.terminal.executeCommand(e,!1),this.state="active",this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null)}deactivateScreensaver(){this.state==="active"&&(this.terminal.clearScreensaver(),this.state="idle",this.resetIdleTimer())}handleSettingsChange(){this.isEnabled()?this.state==="disabled"?this.startIdleTimer():this.state==="idle"&&this.resetIdleTimer():(this.state="disabled",this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null))}isEnabled(){return this.settingsManager.getScreensaverEnabled()}getTimeoutMs(){return this.settingsManager.getScreensaverTimeout()*60*1e3}getTimeout(){return this.settingsManager.getScreensaverTimeout()}setEnabled(e){this.settingsManager.setScreensaverEnabled(e),this.handleSettingsChange()}setTimeout(e){if(e<ct.MIN_TIMEOUT_MINUTES||e>ct.MAX_TIMEOUT_MINUTES)throw new Error(`Timeout must be between ${ct.MIN_TIMEOUT_MINUTES} and ${ct.MAX_TIMEOUT_MINUTES} minutes`);this.settingsManager.setScreensaverTimeout(e),this.handleSettingsChange()}setActiveScreensaver(e){this.settingsManager.setActiveScreensaver(e)}getState(){return this.state}getIdleTime(){return Date.now()-this.lastActivityTime}setupVisibilityListener(){typeof document>"u"||document.addEventListener("visibilitychange",()=>{document.hidden?this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null):this.state==="idle"&&this.isEnabled()&&this.resetIdleTimer()})}destroy(){this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.state="disabled"}}class Ha{settings;fileSystem;settingsPath=Te.CONFIG_SETTINGS;storageKey=dn.SETTINGS;constructor(e){this.fileSystem=e,this.settings=this.loadFromLocalStorage()??this.getDefaults(),this.syncToFileSystem()}loadFromLocalStorage(){try{const e=localStorage.getItem(this.storageKey);if(!e)return null;const t=JSON.parse(e);return!t.theme||!t.font||!t.effects||!t.prompt?(console.warn("SettingsManager: Invalid settings structure in localStorage, using defaults"),null):(t.screensaver||(t.screensaver=sr.screensaver),t)}catch(e){return console.warn("SettingsManager: Failed to load settings from localStorage:",e),null}}saveToLocalStorage(){try{const e=JSON.stringify(this.settings,null,2);localStorage.setItem(this.storageKey,e)}catch(e){throw console.error("SettingsManager: Failed to save settings to localStorage:",e),new Error(`Failed to save settings: ${e instanceof Error?e.message:String(e)}`)}}syncToFileSystem(){try{const e=JSON.stringify(this.settings,null,2);this.fileSystem.writeFile(this.settingsPath,e)}catch(e){console.error("SettingsManager: Failed to sync settings to filesystem:",e)}}getDefaults(){return JSON.parse(JSON.stringify(sr))}loadSettings(){return this.settings}saveSettings(e){this.settings=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSetting(e){return this.settings[e]}setSetting(e,t){this.settings[e]=t,this.saveToLocalStorage(),this.syncToFileSystem()}getThemePreset(){return this.settings.theme.preset}setThemePreset(e){if(!this.validateThemePreset(e))throw new Error(`Invalid theme preset: ${String(e)}`);this.settings.theme.preset=e,e!=="custom"&&(this.settings.theme.customColors=void 0),this.saveToLocalStorage(),this.syncToFileSystem()}getCustomColors(){return this.settings.theme.customColors}setCustomColors(e){this.settings.theme.preset="custom",this.settings.theme.customColors=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontSize(){return this.settings.font.size}setFontSize(e){if(!this.validateFontSize(e))throw new Error(`Invalid font size: ${e}. Must be between 8 and 24.`);this.settings.font.size=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontFamily(){return this.settings.font.family}setFontFamily(e){if(!this.validateFontFamily(e))throw new Error(`Invalid font family: ${String(e)}`);this.settings.font.family=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScanLines(){return this.settings.effects.scanLines}setScanLines(e){this.settings.effects.scanLines=e,this.saveToLocalStorage(),this.syncToFileSystem()}getGlow(){return this.settings.effects.glow}setGlow(e){this.settings.effects.glow=e,this.saveToLocalStorage(),this.syncToFileSystem()}getBorder(){return this.settings.effects.border}setBorder(e){this.settings.effects.border=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAnimationSpeed(){return this.settings.effects.animationSpeed}setAnimationSpeed(e){if(!this.validateAnimationSpeed(e))throw new Error(`Invalid animation speed: ${e}. Must be between 0.5 and 2.0.`);this.settings.effects.animationSpeed=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSoundEffects(){return this.settings.effects.soundEffects}setSoundEffects(e){this.settings.effects.soundEffects=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAutoScrollBehavior(){return this.settings.effects.autoScrollBehavior}setAutoScrollBehavior(e){this.settings.effects.autoScrollBehavior=e,this.saveToLocalStorage(),this.syncToFileSystem()}getPromptFormat(){return this.settings.prompt.format}setPromptFormat(e){this.settings.prompt.format=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScreensaverEnabled(){return this.settings.screensaver.enabled}setScreensaverEnabled(e){this.settings.screensaver.enabled=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScreensaverTimeout(){return this.settings.screensaver.timeoutMinutes}setScreensaverTimeout(e){if(!this.validateScreensaverTimeout(e))throw new Error(`Invalid screensaver timeout: ${e}. Must be between 1 and 60 minutes.`);this.settings.screensaver.timeoutMinutes=e,this.saveToLocalStorage(),this.syncToFileSystem()}getActiveScreensaver(){return this.settings.screensaver.activeScreensaver}setActiveScreensaver(e){this.settings.screensaver.activeScreensaver=e,this.saveToLocalStorage(),this.syncToFileSystem()}reset(){this.settings=this.getDefaults(),localStorage.removeItem(this.storageKey),this.saveToLocalStorage(),this.syncToFileSystem()}validateThemePreset(e){return["green","yellow","white","light-blue","paper","dc","custom"].includes(e)}validateFontSize(e){return typeof e=="number"&&e>=8&&e<=24&&!isNaN(e)}validateFontFamily(e){return["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"].includes(e)}validateAnimationSpeed(e){return typeof e=="number"&&e>=.5&&e<=2&&!isNaN(e)}validateScreensaverTimeout(e){return typeof e=="number"&&e>=1&&e<=60&&!isNaN(e)}}class Ua{settingsManager;presets;constructor(e){this.settingsManager=e,this.presets=new Map,this.initializePresets()}initializePresets(){[{name:"green",displayName:"Green",colors:{"--terminal-bg":"#0a0e14","--terminal-fg":"#39ff14","--terminal-accent":"#00ff99","--terminal-dim":"#20c20e","--terminal-error":"#ff3333","--terminal-cursor":"#39ff14","--terminal-bg-secondary":"#0d1117"}},{name:"yellow",displayName:"Amber",colors:{"--terminal-bg":"#1a1410","--terminal-fg":"#ffb000","--terminal-accent":"#ffd700","--terminal-dim":"#cc8800","--terminal-error":"#ff3333","--terminal-cursor":"#ffb000","--terminal-bg-secondary":"#0f0b08"}},{name:"white",displayName:"White",colors:{"--terminal-bg":"#1a1a1a","--terminal-fg":"#d4d4d4","--terminal-accent":"#88ccff","--terminal-dim":"#999999","--terminal-error":"#ff5555","--terminal-cursor":"#ffffff","--terminal-bg-secondary":"#242424"}},{name:"light-blue",displayName:"Cyan",colors:{"--terminal-bg":"#0a1420","--terminal-fg":"#00d4ff","--terminal-accent":"#00ffff","--terminal-dim":"#0088aa","--terminal-error":"#ff3333","--terminal-cursor":"#00d4ff","--terminal-bg-secondary":"#0d1825"}},{name:"paper",displayName:"Paper",colors:{"--terminal-bg":"#ffffff","--terminal-fg":"#1a1a1a","--terminal-accent":"#007298","--terminal-dim":"#666666","--terminal-error":"#cc0000","--terminal-cursor":"#1a1a1a","--terminal-bg-secondary":"#f0f0f0"}},{name:"dc",displayName:"DC",colors:{"--terminal-bg":"#110e0c","--terminal-fg":"#70dbff","--terminal-accent":"#ffa940","--terminal-dim":"#d4915e","--terminal-error":"#ff4d4d","--terminal-cursor":"#aaff66","--terminal-bg-secondary":"#1c1410"}}].forEach(t=>{this.presets.set(t.name,t)})}getPresets(){return Array.from(this.presets.values())}getPreset(e){return this.presets.get(e)??null}applyTheme(e){if(e==="custom")throw new Error('Cannot apply "custom" theme directly. Use applyCustomColors() instead.');const t=this.presets.get(e);if(!t){const n=Array.from(this.presets.keys()).join(", ");throw new Error(`Invalid theme name: ${e}. Available themes: ${n}`)}this.updateCSSVariables(t.colors),this.settingsManager.setThemePreset(e)}applyCustomColors(e){Object.entries(e).forEach(([i,s])=>{if(!this.validateColor(s))throw new Error(`Invalid color value for ${i}: ${s}. Expected hex format (e.g., #ff0000 or #f00)`)});const t=this.getCurrentColors(),n=this.mergeColors(t,e);this.updateCSSVariables(n);const r={background:n["--terminal-bg"],foreground:n["--terminal-fg"],accent:n["--terminal-accent"],dim:n["--terminal-dim"],error:n["--terminal-error"],cursor:n["--terminal-cursor"],backgroundSecondary:n["--terminal-bg-secondary"]};this.settingsManager.setCustomColors(r)}applyCurrentTheme(){const e=this.settingsManager.loadSettings(),{preset:t,customColors:n}=e.theme;if(t==="custom"&&n){const r={"--terminal-bg":n.background,"--terminal-fg":n.foreground,"--terminal-accent":n.accent,"--terminal-dim":n.dim,"--terminal-error":n.error,"--terminal-cursor":n.cursor,"--terminal-bg-secondary":n.backgroundSecondary};this.updateCSSVariables(r)}else if(t!=="custom"){const r=this.presets.get(t);if(r)this.updateCSSVariables(r.colors);else{console.warn(`ThemeManager: Unknown preset "${t}", falling back to green`);const i=this.presets.get("green");i&&this.updateCSSVariables(i.colors)}}}getCurrentColors(){if(typeof document>"u"){const n=this.presets.get("green");return n?n.colors:{}}const e=document.documentElement,t=getComputedStyle(e);return{"--terminal-bg":t.getPropertyValue("--terminal-bg").trim()||"#0a0e14","--terminal-fg":t.getPropertyValue("--terminal-fg").trim()||"#39ff14","--terminal-accent":t.getPropertyValue("--terminal-accent").trim()||"#39ff14","--terminal-dim":t.getPropertyValue("--terminal-dim").trim()||"#20c20e","--terminal-error":t.getPropertyValue("--terminal-error").trim()||"#ff3333","--terminal-cursor":t.getPropertyValue("--terminal-cursor").trim()||"#39ff14","--terminal-bg-secondary":t.getPropertyValue("--terminal-bg-secondary").trim()||"#0d1117"}}updateCSSVariables(e){if(typeof document>"u"){console.warn("ThemeManager: document not available, skipping CSS update");return}const t=document.documentElement;Object.entries(e).forEach(([n,r])=>{t.style.setProperty(n,r)})}validateColor(e){return/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e)}mergeColors(e,t){return{"--terminal-bg":t["--terminal-bg"]??e["--terminal-bg"],"--terminal-fg":t["--terminal-fg"]??e["--terminal-fg"],"--terminal-accent":t["--terminal-accent"]??e["--terminal-accent"],"--terminal-dim":t["--terminal-dim"]??e["--terminal-dim"],"--terminal-error":t["--terminal-error"]??e["--terminal-error"],"--terminal-cursor":t["--terminal-cursor"]??e["--terminal-cursor"],"--terminal-bg-secondary":t["--terminal-bg-secondary"]??e["--terminal-bg-secondary"]}}}const Kr=document.getElementById("terminal-header");if(!Kr)throw new Error("Header element not found");new ia(Kr);const Ba=Ma.createDefaultStructure(),q=new Oa(Ba),ke=new Ha(q),ht=new Ua(ke),pt=new pa(q,"darin","darinchambers.com");ht.applyCurrentTheme();const Er=ke.getSetting("font");typeof document<"u"&&(document.documentElement.style.setProperty("--terminal-font-size",`${Er.size}px`),document.documentElement.style.setProperty("--terminal-font-family",Er.family));const Wa=ke.getScanLines();typeof document<"u"&&(Wa||document.body.classList.add("no-scan-lines"));const Ga=ke.getGlow();typeof document<"u"&&(Ga||document.body.classList.add("no-glow"));const za=ke.getBorder();typeof document<"u"&&za&&document.body.classList.add("border-enabled");const Va=ke.getAnimationSpeed();typeof document<"u"&&document.documentElement.style.setProperty("--terminal-animation-speed",Va.toString());const Ze=new ma,Dt=new ua(q),ja=new ha(Ze,Dt,pt),Ee=new da(Ze,ja,ke,ht,pt);Ee.setCurrentPath(q.getShortPath());Ee.setFileSystem(q);const Zr=document.getElementById("nav-links");if(!Zr)throw new Error("Navigation links element not found");const Ya={name:"help",description:"Display available commands",execute:async(o,e)=>{try{if(o.length>0){const i=o[0];return await Ze.dispatch(`${i} --help`)}const t=q.readFile(Te.CONTENT_HELP),n=Y.render(t);return{output:Oe.makeCommandsClickable(n,Ze.getCommandNames()),html:!0,scrollBehavior:"top"}}catch(t){return{output:t instanceof Error?t.message:String(t),error:!0}}}},qa={name:"clear",description:"Clear the terminal screen",execute:(o,e)=>new G(o).hasFlag("help")?{output:`Usage: clear

Description:
  Clear the terminal screen and remove all output

Examples:
  clear                # Clear the screen`}:{output:Pr.CLEAR_SCREEN}},Xa=Ci(q),Ka=bi(q,o=>Ee.setCurrentPath(o),pt),Za=Ri(q),Ja=Ii(q),Qa=Mi(q),el=ki(q,Ze),tl=ko(Ee.getInput()),nl=vo(Dt),rl=Ti(Dt),ol=yi(Ee),il=Oi(q,["portfolio","blog","notes","contact"]),sl=Hi(q),al=Vi(q),ll=Pi(q),cl=Wi(q),dl=q.exists("/home/darin/CHANGELOG.md")?q.readFile("/home/darin/CHANGELOG.md"):"",ul=Fi(dl),_l=$i(q),ml=Zi(q,ke,ht),hl=xo(pt),pl=No(pt),fl=ks(ht),gl=ws(ht),$l=Ei(Ze,Dt);Ee.registerCommands([Ya,qa,tl,Co,Ro,ol,nl,rl,hl,pl,Xa,Ka,Za,Ja,Qa,el,_l,il,al,ll,cl,sl,ml,ul,fs,Is,Rs,fl,gl,rs,Os,Ds,ss,$l]);const Tl=[{label:"about",command:"about"},{label:"portfolio",command:"portfolio"},{label:"blog",command:"blog"},{label:"notes",command:"notes"},{label:"contact",command:"contact"},{label:"settings",command:"settings"},{label:"help",command:"help"}],Al=`Type 'help' to see all commands, or click a command above to get started.
Try 'about' to learn more, 'portfolio' to see my work, or explore with 'ls'.
`;Ee.writeWelcome(Al);const ft=new Da(Ee,q);Ee.setRouter(ft);const Cn=new sa(Zr,o=>{const t={about:"/about",portfolio:"/portfolio",blog:"/blog",notes:"/notes",contact:"/contact",skills:"/skills",settings:"/settings",help:"/help"}[o];t?ft.navigate(t,!0):Ee.executeCommand(o,!0)});Cn.setItems(Tl);ft.onRouteChange(o=>{Cn.setActiveItem(o)});ft.handleInitialRoute();const Lr=ft.getCurrentCommand();Lr&&Cn.setActiveItem(Lr);yo();Ao();lo();po();So();const kt=new Fa(ke,Ee);Ee.setScreensaverManager(kt);const El=new Pa(()=>kt.recordActivity(),ct.ACTIVITY_DEBOUNCE_MS);El.start();kt.isEnabled()&&kt.startIdleTimer();async function Jr(){if(typeof window.SVGGraphNetwork>"u"){console.warn("SVGGraphNetwork library not loaded");return}document.querySelectorAll("[data-graph]").forEach(t=>{if(t.hasAttribute("data-graph-initialized"))return;const n=t,r=n.id||"unknown";try{const i=t.getAttribute("data-graph");if(!i){console.warn(`Graph container ${r} has no data-graph attribute`);return}const s=JSON.parse(i),a=t.getAttribute("data-graph-theme");a&&s&&typeof s=="object"&&"config"in s&&(s.config.theme=a),new window.SVGGraphNetwork(n.id||n,s),t.setAttribute("data-graph-initialized","true")}catch(i){console.error(`Failed to initialize graph ${r}:`,i),t.setAttribute("data-graph-initialized","true"),t.setAttribute("data-graph-error","true")}});const e=document.querySelectorAll("[data-graph-src]");for(const t of e){if(t.hasAttribute("data-graph-initialized"))continue;const n=t,r=n.id||"unknown",i=t.getAttribute("data-graph-src");if(!i){console.warn(`Graph container ${r} has no data-graph-src attribute`);continue}try{const s=await fetch(i);if(!s.ok)throw new Error(`Failed to fetch ${i}: ${s.statusText}`);const a=await s.json(),l=t.getAttribute("data-graph-theme");l&&a&&typeof a=="object"&&"config"in a&&(a.config.theme=l),new window.SVGGraphNetwork(n.id||n,a),t.setAttribute("data-graph-initialized","true")}catch(s){console.error(`Failed to initialize graph ${r} from ${i}:`,s),t.setAttribute("data-graph-initialized","true"),t.setAttribute("data-graph-error","true")}}}Jr();window.initializeGraphs=Jr;
