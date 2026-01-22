(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const De=new Map;function os(){De.forEach(e=>{e.stopAnimation()}),De.clear(),document.querySelectorAll(".boot-overlay").forEach(e=>{e.remove()})}function zn(s){s.style.animation="boot-overlay-fade 0.3s ease forwards",s.addEventListener("animationend",()=>{s.remove()},{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)}function Yt(s){os();const e=s.dataset.bootType??"boot";e==="boot"&&document.querySelectorAll(".boot-overlay").forEach(r=>{zn(r)});const t={element:s,bootType:e,overlay:null,cleanupFns:[],stopAnimation:()=>{t.cleanupFns.forEach(n=>n()),t.cleanupFns=[],t.overlay?.parentNode&&(zn(t.overlay),t.overlay=null),De.delete(s)}};if(De.set(s,t),e==="shutdown"||e==="reboot"){const n=s.querySelector("[data-boot-overlay]");if(n){t.overlay=n;const o=getComputedStyle(n).animationDelay,i=parseFloat(o)*(o.includes("ms")?1:1e3);setTimeout(()=>{De.has(s)&&n.parentNode&&document.body.appendChild(n)},i)}}is(s,t)}function is(s,e){const t=document.getElementById("terminal-output");if(t){const a=()=>{e.stopAnimation()};t.addEventListener("scroll",a,{once:!0}),e.cleanupFns.push(()=>{t.removeEventListener("scroll",a)})}const n=a=>{a.key==="Shift"||a.key==="Control"||a.key==="Alt"||a.key==="Meta"||e.stopAnimation()};setTimeout(()=>{De.has(s)&&(document.addEventListener("keydown",n,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("keydown",n)}))},100);const r=()=>{e.stopAnimation()};setTimeout(()=>{De.has(s)&&(document.addEventListener("click",r,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("click",r)}))},100);const o=new MutationObserver(()=>{s.nextElementSibling&&(e.stopAnimation(),o.disconnect())});t&&(o.observe(t,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{o.disconnect()}));const i=new MutationObserver(()=>{document.body.contains(s)||(e.stopAnimation(),i.disconnect())});i.observe(document.body,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{i.disconnect()})}function as(){const s=new MutationObserver(n=>{n.forEach(r=>{r.addedNodes.forEach(o=>{if(o.nodeType===Node.ELEMENT_NODE){const i=o;i.classList.contains("boot-sequence")&&Yt(i),i.querySelectorAll(".boot-sequence").forEach(l=>{Yt(l)})}})})}),e=document.getElementById("terminal-output");e&&s.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll(".boot-sequence").forEach(n=>{Yt(n)})}const Oe=new Map;function ls(){Oe.forEach(e=>{e.stopAnimation()}),Oe.clear(),document.querySelectorAll(".bsod-overlay").forEach(e=>{e.remove()})}function cs(s){s.style.animation="bsod-fade-out 0.3s ease forwards",s.addEventListener("animationend",()=>{s.remove()},{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)}function _s(s,e){const t=s.querySelector("[data-bsod-progress]");if(!t)return;let n=0;const r=setInterval(()=>{if(!Oe.has(s)){clearInterval(r);return}n=(n+1)%101,t.textContent=String(n)},100);e.cleanupFns.push(()=>{clearInterval(r)})}function us(s,e){const t=s.querySelector("[data-bsod-cursor]");if(!t)return;let n=!0;const r=setInterval(()=>{if(!Oe.has(s)){clearInterval(r);return}n=!n,t.style.visibility=n?"visible":"hidden"},530);e.cleanupFns.push(()=>{clearInterval(r)})}function qt(s){ls();const e=s.dataset.bsodStyle??"modern",t={element:s,style:e,cleanupFns:[],stopAnimation:()=>{t.cleanupFns.forEach(n=>n()),t.cleanupFns=[],s.parentNode&&cs(s),Oe.delete(s)}};Oe.set(s,t),document.body.appendChild(s),e==="modern"?_s(s,t):us(s,t),ds(s,t)}function ds(s,e){const t=document.getElementById("terminal-output"),n=a=>{a.key==="Shift"||a.key==="Control"||a.key==="Alt"||a.key==="Meta"||e.stopAnimation()};setTimeout(()=>{Oe.has(s)&&(document.addEventListener("keydown",n,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("keydown",n)}))},100);const r=()=>{e.stopAnimation()};setTimeout(()=>{Oe.has(s)&&(document.addEventListener("click",r,{once:!0}),e.cleanupFns.push(()=>{document.removeEventListener("click",r)}))},100);const o=new MutationObserver(a=>{for(const l of a)for(const u of l.addedNodes)if(u!==s&&u.nodeType===Node.ELEMENT_NODE){e.stopAnimation(),o.disconnect();return}});t&&(o.observe(t,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{o.disconnect()}));const i=new MutationObserver(()=>{document.body.contains(s)||(e.stopAnimation(),i.disconnect())});i.observe(document.body,{childList:!0,subtree:!0}),e.cleanupFns.push(()=>{i.disconnect()})}function hs(){const s=new MutationObserver(n=>{n.forEach(r=>{r.addedNodes.forEach(o=>{if(o.nodeType===Node.ELEMENT_NODE){const i=o;i.hasAttribute("data-bsod")&&qt(i),i.querySelectorAll("[data-bsod]").forEach(l=>{qt(l)})}})})}),e=document.getElementById("terminal-output");e&&s.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll("[data-bsod]").forEach(n=>{qt(n)})}const bt=new Map;function Ar(s,e){return{width:s,height:e,cells:new Uint8Array(s*e),generation:0}}function gn(s,e,t){return s.cells[t*s.width+e]}function te(s,e,t,n){s.cells[t*s.width+e]=n}function jn(s,e){return(s%e+e)%e}function ms(s,e,t){let n=0;for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){if(o===0&&r===0)continue;const i=jn(e+o,s.width),a=jn(t+r,s.height);gn(s,i,a)>0&&n++}return n}function ps(s){const e=Ar(s.width,s.height);e.generation=s.generation+1;for(let t=0;t<s.height;t++)for(let n=0;n<s.width;n++){const r=ms(s,n,t);gn(s,n,t)>0?te(e,n,t,r===2||r===3?1:0):te(e,n,t,r===3?2:0)}return e}function Ir(s,e){for(let t=0;t<s.cells.length;t++)s.cells[t]=Math.random()<e?1:0}function fs(s,e){const t=Math.floor(s.width/2),n=Math.floor(s.height/2);switch(e){case"acorn":te(s,t+1,n-1,1),te(s,t+3,n,1),te(s,t,n+1,1),te(s,t+1,n+1,1),te(s,t+4,n+1,1),te(s,t+5,n+1,1),te(s,t+6,n+1,1);break;case"glider":te(s,t+1,n-1,1),te(s,t-1,n,1),te(s,t+1,n,1),te(s,t,n+1,1),te(s,t+1,n+1,1);break;case"blinker":te(s,t-1,n,1),te(s,t,n,1),te(s,t+1,n,1);break;default:Ir(s,.3)}}function Yn(){const s=getComputedStyle(document.documentElement);return{accent:s.getPropertyValue("--terminal-accent").trim(),dim:s.getPropertyValue("--terminal-dim").trim(),bg:s.getPropertyValue("--terminal-bg").trim()}}function qn(s,e,t,n,r){s.fillStyle=t.bg,s.fillRect(0,0,s.canvas.width,s.canvas.height);for(let o=0;o<e.height;o++)for(let i=0;i<e.width;i++){const a=gn(e,i,o);a!==0&&(s.fillStyle=a===2?t.accent:t.dim,s.globalAlpha=a===2?1:.7,s.fillRect(i*n,o*r,n,r))}s.globalAlpha=1}function yr(){bt.forEach(s=>{s.stopAnimation()}),bt.clear()}function gs(s,e){const t=()=>{e.stopAnimation()};window.addEventListener("scroll",t,{once:!0});const n=new MutationObserver(a=>{for(const l of a)if(l.type==="childList"&&l.addedNodes.length>0){for(const u of l.addedNodes)if(u instanceof HTMLElement&&u.classList.contains("output-line")){e.stopAnimation(),n.disconnect();return}}}),r=document.querySelector(".terminal-output");r&&n.observe(r,{childList:!0});const o=new MutationObserver(()=>{document.body.contains(s)||(e.stopAnimation(),o.disconnect())});o.observe(document.body,{childList:!0,subtree:!0});const i=e.stopAnimation;e.stopAnimation=()=>{window.removeEventListener("scroll",t),n.disconnect(),o.disconnect(),i()}}function Xn(s,e,t,n){yr();const r=s.getContext("2d");if(!r)return;const o=s.dataset.speed,i=s.dataset.density,a=s.dataset.pattern,l=o?parseFloat(o):e,u=i?parseFloat(i):t,d=a??n,g=10,f=Math.floor(s.width/g),T=Math.floor(s.height/g),R=s.width/f,w=s.height/T,y=Ar(f,T);d&&d!=="random"?fs(y,d):Ir(y,u);const b={animationId:null,grid:y,canvas:s,speed:l,lastUpdate:performance.now(),cellWidth:R,cellHeight:w,stopAnimation:()=>{b.animationId!==null&&(cancelAnimationFrame(b.animationId),b.animationId=null),bt.delete(s)}};bt.set(s,b);const H=Yn();qn(r,b.grid,H,b.cellWidth,b.cellHeight);function v(O){if(!b.animationId)return;const M=1e3/b.speed;if(O-b.lastUpdate>=M){b.grid=ps(b.grid);const z=Yn();r&&qn(r,b.grid,z,b.cellWidth,b.cellHeight),b.lastUpdate=O}b.animationId=requestAnimationFrame(v)}b.animationId=requestAnimationFrame(v),gs(s,b)}function $s(){new MutationObserver(e=>{for(const t of e)if(t.type==="childList"){for(const n of t.addedNodes)if(n instanceof HTMLElement){n.classList.contains("life-grid")&&n instanceof HTMLCanvasElement&&Xn(n,2,.3);const r=n.querySelectorAll(".life-grid");r.length>0&&requestAnimationFrame(()=>{r.forEach(o=>{Xn(o,2,.3)})})}}}).observe(document.body,{childList:!0,subtree:!0})}const Ye=new Map;function Ts(){Ye.forEach(e=>{e.stopAnimation()}),Ye.clear(),document.querySelectorAll(".matrix-rain").forEach(e=>{e.querySelectorAll(".matrix-column").forEach(n=>{n.style.animationPlayState="paused"})})}function Xt(s){Ye.forEach((o,i)=>{o.stopAnimation(),i.querySelectorAll(".matrix-column").forEach(l=>{l.style.animationPlayState="paused"})}),Ye.clear();const e=s.dataset.matrixChars??"";if(!e){console.warn("[Matrix] No character set found in data-matrix-chars");return}const t={animationId:null,frameCount:0,matrixChars:e,rainElement:s,stopAnimation:()=>{t.animationId&&(cancelAnimationFrame(t.animationId),t.animationId=null),Ye.delete(s)}};Ye.set(s,t);function n(){return e[Math.floor(Math.random()*e.length)]}function r(){t.frameCount++,s.querySelectorAll(".matrix-column").forEach(i=>{const a=i.querySelectorAll(".matrix-char"),l=parseInt(i.dataset.trailLength??"20");a.forEach((u,d)=>{if(u.classList.contains("matrix-char-bright"))(t.frameCount%45===0||t.frameCount%60===0&&Math.random()<.5)&&(u.textContent=n());else{const f=l-d-1,T=Math.max(8,Math.floor(f/2));t.frameCount%T===0&&Math.random()<.3&&(u.textContent=n())}})}),t.animationId=requestAnimationFrame(r)}t.animationId=requestAnimationFrame(r),Ls(s,t)}function Ls(s,e){const t=document.getElementById("terminal-output");if(t){const o=()=>{e.stopAnimation()};t.addEventListener("scroll",o,{once:!0})}const n=new MutationObserver(()=>{s.nextElementSibling&&(e.stopAnimation(),n.disconnect())});t&&n.observe(t,{childList:!0,subtree:!0});const r=new MutationObserver(()=>{document.body.contains(s)||(e.stopAnimation(),r.disconnect())});r.observe(document.body,{childList:!0,subtree:!0})}function Es(){const s=new MutationObserver(n=>{n.forEach(r=>{r.addedNodes.forEach(o=>{if(o.nodeType===Node.ELEMENT_NODE){const i=o;i.classList.contains("matrix-rain")&&Xt(i),i.querySelectorAll(".matrix-rain").forEach(l=>{Xt(l)})}})})}),e=document.getElementById("terminal-output");e&&s.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll(".matrix-rain").forEach(n=>{Xt(n)})}const it=new Map;function As(s){return()=>(s=s*1103515245+12345&2147483647,s/2147483647)}function Kt(){it.forEach(t=>{t.cleanupFns.forEach(n=>n()),t.styleElement.remove(),t.container.remove()}),it.clear(),document.querySelectorAll(".melt-container").forEach(t=>t.remove()),document.querySelectorAll("style[data-melt-styles]").forEach(t=>t.remove())}function Is(s,e,t){const n=/linear-gradient\(\s*(\d+)deg\s*,\s*(.+)\)/.exec(e);if(!n)return null;const r=parseInt(n[1]),o=n[2];let i,a,l,u;i=t.left,a=t.top,l=t.right,u=t.top;const d=s.createLinearGradient(i,a,l,u),g=o.matchAll(/(#[0-9a-fA-F]{6}|rgb[a]?\([^)]+\))\s*(\d+)?%?/g);for(const f of g){const T=f[1],R=f[2]?parseInt(f[2])/100:0;try{d.addColorStop(R,T)}catch{}}return d}function Zt(s,e,t,n){try{const r=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null);let o;for(;o=r.nextNode();){const i=o.textContent||"";if(!i.trim())continue;const a=o.parentElement;if(!a)continue;const l=getComputedStyle(a),u=l.fontSize,d=l.fontFamily,g=l.fontWeight,f=document.createRange();if(f.selectNodeContents(o),typeof f.getClientRects!="function")continue;const T=f.getClientRects();if(T.length===0)continue;const w=(l.getPropertyValue("-webkit-background-clip")||l.backgroundClip)==="text";let y=l.color||n;if(w){const H=a.getBoundingClientRect(),v=l.backgroundImage;if(v?.includes("linear-gradient")){const O=Is(s,v,H);O&&(y=O)}}s.fillStyle=y;const b=parseInt(g)>=600?"bold ":"";s.font=`${b}${u} ${d||t}`;for(const H of T)H.width>0&&H.height>0&&s.fillText(i,H.left,H.top+H.height*.85)}}catch{}}function ys(){const s=window.innerWidth,e=window.innerHeight,t=document.createElement("canvas");t.width=s,t.height=e;const n=t.getContext("2d"),r=getComputedStyle(document.documentElement),o=r.getPropertyValue("--terminal-bg").trim()||"#0a0a0a",i=r.getPropertyValue("--terminal-fg").trim()||"#00ff00",a=r.getPropertyValue("--terminal-font-family")||"monospace";n.fillStyle=o,n.fillRect(0,0,s,e);const l=document.querySelector("header");l&&Zt(n,l,a,i);const u=document.getElementById("terminal-output");u&&Zt(n,u,a,i);const d=document.querySelector(".terminal-input-container");return d&&Zt(n,d,a,i),t}function Kn(s){Kt();const e=window.innerWidth,t=window.innerHeight,n=document.createElement("style");n.setAttribute("data-melt-styles",""),n.textContent=`
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
  `,document.head.appendChild(n);const r=document.createElement("div");r.className="melt-container";const i=ys().toDataURL("image/png"),a=12,l=Math.ceil(e/a),u=As(Date.now());for(let T=0;T<l;T++){const R=document.createElement("div");R.className="melt-column",R.style.left=`${T*a}px`,R.style.width=`${a}px`,R.style.height=`${t}px`,R.style.backgroundImage=`url(${i})`,R.style.backgroundPosition=`-${T*a}px 0`,R.style.backgroundSize=`${e}px ${t}px`;const y=Math.abs(T-l/2)/(l/2)*.4+u()*.3,b=2.5+u()*1.5;R.style.animation=`melt-drop ${b}s ease-in ${y}s forwards`,r.appendChild(R)}const d=document.createElement("div");d.className="melt-message",d.textContent="yeah, you probably shouldn't do that",d.style.animation="melt-message-fade 0.5s ease-out 2s forwards",r.appendChild(d),document.body.appendChild(r);const g={container:r,styleElement:n,cleanupFns:[]};it.set(s,g);const f=setTimeout(()=>{it.has(s)&&Kt()},6500);g.cleanupFns.push(()=>clearTimeout(f)),setTimeout(()=>{if(!it.has(s))return;const T=()=>Kt(),R=y=>{["Shift","Control","Alt","Meta"].includes(y.key)||T()},w=()=>T();document.addEventListener("keydown",R,{once:!0}),document.addEventListener("click",w,{once:!0}),g.cleanupFns.push(()=>{document.removeEventListener("keydown",R),document.removeEventListener("click",w)})},500)}function bs(){const s=new MutationObserver(t=>{t.forEach(n=>{n.addedNodes.forEach(r=>{if(r.nodeType===Node.ELEMENT_NODE){const o=r;o.hasAttribute("data-melt")&&Kn(o),o.querySelectorAll("[data-melt]").forEach(a=>{Kn(a)})}})})}),e=document.getElementById("terminal-output");e&&s.observe(e,{childList:!0,subtree:!0}),s.observe(document.body,{childList:!0,subtree:!0})}class U{flags=new Map;positionals=[];static VALUE_FLAGS=new Set(["f","L","w"]);constructor(e){const t=[];for(const n of e)if(n.startsWith("-")&&!n.startsWith("--")&&n.length>2)for(let r=1;r<n.length;r++)t.push(`-${n[r]}`);else t.push(n);for(let n=0;n<t.length;n++){const r=t[n];if(r.startsWith("--")){const o=r.substring(2),i=t[n+1];i!==void 0&&!i.startsWith("--")&&!i.startsWith("-")?(this.flags.set(o,i),n++):this.flags.set(o,!0)}else if(r.startsWith("-")&&r.length===2){const o=r.substring(1),i=t[n+1];i!==void 0&&!i.startsWith("-")&&(U.VALUE_FLAGS.has(o)||/^\d+$/.test(i))?(this.flags.set(o,i),n++):this.flags.set(o,!0)}else this.positionals.push(r)}}getFlag(e){return this.flags.get(e)}hasFlag(e){return this.flags.has(e)}getPositional(e){return this.positionals[e]}getAllFlags(){return new Map(this.flags)}getAllPositionals(){return[...this.positionals]}get positionalCount(){return this.positionals.length}}function Ss(s){return{name:"alias",description:"Create or display command aliases",execute:(e,t)=>{if(new U(e).hasFlag("help"))return{output:`Usage: alias [name='command']

Description:
  Create or display command aliases for shortening commands
  Note: 'll' is aliased to 'ls -alh' by default

Options:
  (no args)            List all defined aliases

Examples:
  alias                # List all aliases
  alias la='ls -a'     # Create an alias
  alias blog-ai='blog --tags ai'  # Alias with flags`};if(e.length===0){const l=s.getAllAliases();return l.size===0?{output:"No aliases defined."}:{output:Array.from(l.entries()).sort((d,g)=>d[0].localeCompare(g[0])).map(([d,g])=>{const f=s.isDefaultAlias(d);return`alias ${d}='${g}'${f?" (default)":""}`}).join(`
`)}}const r=e.join(" "),o=/^(\S+)=(.+)$/.exec(r);if(!o)return{output:`Usage: alias name='command'
       alias (to list all aliases)`,error:!0};const[,i,a]=o;try{return s.setAlias(i,a),{output:`Alias created: ${i}='${a}'`}}catch(l){return{output:l instanceof Error?l.message:String(l),error:!0}}}}}const Rs={name:"date",description:"Display current date and time",execute:(s,e)=>new U(s).hasFlag("help")?{output:`Usage: date

Description:
  Display the current date and time in the system's default format

Examples:
  date                 # Show current date and time`}:{output:new Date().toString()}},Cs={name:"echo",description:"Display a line of text",execute:(s,e)=>{if(new U(s).hasFlag("help"))return{output:`Usage: echo [options] [text...]

Description:
  Display a line of text or pass through stdin content

Options:
  -e                   Enable interpretation of escape sequences

Examples:
  echo "Hello World"   # Display text
  echo -e "Line1\\nLine2"  # Use escape sequences
  cat file.txt | echo  # Pass through stdin`};let n=!1;const r=[];for(const i of s)i==="-e"?n=!0:r.push(i);let o;return r.length===0&&e?(o=e,o.endsWith(`
`)&&(o=o.slice(0,-1))):o=r.join(" "),n&&(o=o.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\\\/g,"\\")),{output:o}}};function ws(s){return{name:"env",description:"Display all environment variables",execute:(e,t)=>{if(new U(e).hasFlag("help"))return{output:`Usage: env

Description:
  Display all environment variables

Examples:
  env                  # List all variables
  env | grep PATH      # Filter variables`};try{const r=s.getAllVariables();return r.size===0?{output:""}:{output:Array.from(r.entries()).sort((a,l)=>a[0].localeCompare(l[0])).map(([a,l])=>`${a}=${l}`).join(`
`)}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function vs(s){return{name:"export",description:"Set or display environment variables",execute:(e,t)=>{if(new U(e).hasFlag("help"))return{output:`Usage: export [VAR=value] [VAR]

Description:
  Set or display environment variables

Examples:
  export               # List all variables
  export PATH=/bin     # Set variable
  export USER          # Display single variable`};try{if(e.length===0){const o=s.getAllVariables();return o.size===0?{output:""}:{output:Array.from(o.entries()).sort((l,u)=>l[0].localeCompare(u[0])).map(([l,u])=>`${l}=${u}`).join(`
`)}}const r=[];for(const o of e){const i=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(o);if(i){const[,a,l]=i;s.setVariable(a,l)}else{const a=s.getVariable(o);a!==void 0?r.push(`${o}=${a}`):r.push(`export: ${o}: not found`)}}return{output:r.join(`
`)}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Ns(s){return{name:"history",description:"Display command history",execute:(e,t)=>{if(new U(e).hasFlag("help"))return{output:`Usage: history

Description:
  Display command history with line numbers

Examples:
  history              # Show all commands`};const r=s.getHistory();return r.length===0?{output:"No commands in history."}:{output:r.map((i,a)=>`${(a+1).toString().padStart(5," ")}  ${i}`).join(`
`)}}}}function xe(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}class Zn{static parse(e){if(!e.trim().startsWith("---"))return{frontmatter:null,content:e};const t=e.split(`
`),n=this.findFrontmatterEnd(t);if(n===-1)return{frontmatter:null,content:e};const r=t.slice(1,n),o=t.slice(n+1);return{frontmatter:this.parseFrontmatterLines(r),content:o.join(`
`)}}static findFrontmatterEnd(e){for(let t=1;t<e.length;t++)if(e[t].trim()==="---")return t;return-1}static parseFrontmatterLines(e){const t={};for(const n of e){const r=n.indexOf(":");if(r===-1)continue;const o=n.substring(0,r).trim(),i=n.substring(r+1).trim();if(i.startsWith("[")&&i.endsWith("]")){const a=i.substring(1,i.length-1);t[o]=a.split(",").map(l=>l.trim().replace(/^["']|["']$/g,"")).filter(l=>l.length>0)}else t[o]=i.replace(/^["']|["']$/g,"")}return t}static renderFrontmatter(e){const t=[];e.title&&typeof e.title=="string"&&t.push(`<h1 class="fm-title">${xe(e.title)}</h1>`);const n=[];if(e.date&&typeof e.date=="string"&&n.push(`<span class="fm-date">${xe(e.date)}</span>`),e.tags&&Array.isArray(e.tags)){const r=e.tags.map(o=>`<span class="fm-tag">${xe(o)}</span>`).join(" ");n.push(`<span class="fm-tags">${r}</span>`)}return n.length>0&&t.push(`<div class="fm-meta">${n.join(" • ")}</div>`),e.summary&&typeof e.summary=="string"&&t.push(`<p class="fm-summary">${xe(e.summary)}</p>`),t.length>0&&t.push('<hr class="fm-divider">'),t.join(`
`)}}function $n(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Fe=$n();function br(s){Fe=s}var at={exec:()=>null};function G(s,e=""){let t=typeof s=="string"?s:s.source,n={replace:(r,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(_e.caret,"$1"),t=t.replace(r,i),n},getRegex:()=>new RegExp(t,e)};return n}var xs=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),_e={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:s=>new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}#`),htmlBeginRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}<(?:[a-z].*>|!--)`,"i")},ks=/^(?:[ \t]*(?:\n|$))+/,Os=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ms=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,lt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ds=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Tn=/(?:[*+-]|\d{1,9}[.)])/,Sr=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Rr=G(Sr).replace(/bull/g,Tn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ps=G(Sr).replace(/bull/g,Tn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ln=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Fs=/^[^\n]+/,En=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Hs=G(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",En).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ws=G(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Tn).getRegex(),kt="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",An=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Bs=G("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",An).replace("tag",kt).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Cr=G(Ln).replace("hr",lt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kt).getRegex(),Us=G(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Cr).getRegex(),In={blockquote:Us,code:Os,def:Hs,fences:Ms,heading:Ds,hr:lt,html:Bs,lheading:Rr,list:Ws,newline:ks,paragraph:Cr,table:at,text:Fs},Jn=G("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",lt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kt).getRegex(),Gs={...In,lheading:Ps,table:Jn,paragraph:G(Ln).replace("hr",lt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Jn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kt).getRegex()},Vs={...In,html:G(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",An).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:at,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:G(Ln).replace("hr",lt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Rr).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},zs=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,js=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,wr=/^( {2,}|\\)\n(?!\s*$)/,Ys=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ot=/[\p{P}\p{S}]/u,yn=/[\s\p{P}\p{S}]/u,vr=/[^\s\p{P}\p{S}]/u,qs=G(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,yn).getRegex(),Nr=/(?!~)[\p{P}\p{S}]/u,Xs=/(?!~)[\s\p{P}\p{S}]/u,Ks=/(?:[^\s\p{P}\p{S}]|~)/u,Zs=G(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",xs?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),xr=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Js=G(xr,"u").replace(/punct/g,Ot).getRegex(),Qs=G(xr,"u").replace(/punct/g,Nr).getRegex(),kr="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",eo=G(kr,"gu").replace(/notPunctSpace/g,vr).replace(/punctSpace/g,yn).replace(/punct/g,Ot).getRegex(),to=G(kr,"gu").replace(/notPunctSpace/g,Ks).replace(/punctSpace/g,Xs).replace(/punct/g,Nr).getRegex(),no=G("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,vr).replace(/punctSpace/g,yn).replace(/punct/g,Ot).getRegex(),ro=G(/\\(punct)/,"gu").replace(/punct/g,Ot).getRegex(),so=G(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),oo=G(An).replace("(?:-->|$)","-->").getRegex(),io=G("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",oo).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),St=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ao=G(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",St).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Or=G(/^!?\[(label)\]\[(ref)\]/).replace("label",St).replace("ref",En).getRegex(),Mr=G(/^!?\[(ref)\](?:\[\])?/).replace("ref",En).getRegex(),lo=G("reflink|nolink(?!\\()","g").replace("reflink",Or).replace("nolink",Mr).getRegex(),Qn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,bn={_backpedal:at,anyPunctuation:ro,autolink:so,blockSkip:Zs,br:wr,code:js,del:at,emStrongLDelim:Js,emStrongRDelimAst:eo,emStrongRDelimUnd:no,escape:zs,link:ao,nolink:Mr,punctuation:qs,reflink:Or,reflinkSearch:lo,tag:io,text:Ys,url:at},co={...bn,link:G(/^!?\[(label)\]\((.*?)\)/).replace("label",St).getRegex(),reflink:G(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",St).getRegex()},on={...bn,emStrongRDelimAst:to,emStrongLDelim:Qs,url:G(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Qn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:G(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Qn).getRegex()},_o={...on,br:G(wr).replace("{2,}","*").getRegex(),text:G(on.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Lt={normal:In,gfm:Gs,pedantic:Vs},Ze={normal:bn,gfm:on,breaks:_o,pedantic:co},uo={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},er=s=>uo[s];function ve(s,e){if(e){if(_e.escapeTest.test(s))return s.replace(_e.escapeReplace,er)}else if(_e.escapeTestNoEncode.test(s))return s.replace(_e.escapeReplaceNoEncode,er);return s}function tr(s){try{s=encodeURI(s).replace(_e.percentDecode,"%")}catch{return null}return s}function nr(s,e){let t=s.replace(_e.findPipe,(o,i,a)=>{let l=!1,u=i;for(;--u>=0&&a[u]==="\\";)l=!l;return l?"|":" |"}),n=t.split(_e.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(_e.slashPipe,"|");return n}function Je(s,e,t){let n=s.length;if(n===0)return"";let r=0;for(;r<n&&s.charAt(n-r-1)===e;)r++;return s.slice(0,n-r)}function ho(s,e){if(s.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<s.length;n++)if(s[n]==="\\")n++;else if(s[n]===e[0])t++;else if(s[n]===e[1]&&(t--,t<0))return n;return t>0?-2:-1}function rr(s,e,t,n,r){let o=e.href,i=e.title||null,a=s[1].replace(r.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:s[0].charAt(0)==="!"?"image":"link",raw:t,href:o,title:i,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,l}function mo(s,e,t){let n=s.match(t.other.indentCodeCompensation);if(n===null)return e;let r=n[1];return e.split(`
`).map(o=>{let i=o.match(t.other.beginningSpace);if(i===null)return o;let[a]=i;return a.length>=r.length?o.slice(r.length):o}).join(`
`)}var Rt=class{options;rules;lexer;constructor(s){this.options=s||Fe}space(s){let e=this.rules.block.newline.exec(s);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(s){let e=this.rules.block.code.exec(s);if(e){let t=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:Je(t,`
`)}}}fences(s){let e=this.rules.block.fences.exec(s);if(e){let t=e[0],n=mo(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(s){let e=this.rules.block.heading.exec(s);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let n=Je(t,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(t=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(s){let e=this.rules.block.hr.exec(s);if(e)return{type:"hr",raw:Je(e[0],`
`)}}blockquote(s){let e=this.rules.block.blockquote.exec(s);if(e){let t=Je(e[0],`
`).split(`
`),n="",r="",o=[];for(;t.length>0;){let i=!1,a=[],l;for(l=0;l<t.length;l++)if(this.rules.other.blockquoteStart.test(t[l]))a.push(t[l]),i=!0;else if(!i)a.push(t[l]);else break;t=t.slice(l);let u=a.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,r=r?`${r}
${d}`:d;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=g,t.length===0)break;let f=o.at(-1);if(f?.type==="code")break;if(f?.type==="blockquote"){let T=f,R=T.raw+`
`+t.join(`
`),w=this.blockquote(R);o[o.length-1]=w,n=n.substring(0,n.length-T.raw.length)+w.raw,r=r.substring(0,r.length-T.text.length)+w.text;break}else if(f?.type==="list"){let T=f,R=T.raw+`
`+t.join(`
`),w=this.list(R);o[o.length-1]=w,n=n.substring(0,n.length-f.raw.length)+w.raw,r=r.substring(0,r.length-T.raw.length)+w.raw,t=R.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:r}}}list(s){let e=this.rules.block.list.exec(s);if(e){let t=e[1].trim(),n=t.length>1,r={type:"list",raw:"",ordered:n,start:n?+t.slice(0,-1):"",loose:!1,items:[]};t=n?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=n?t:"[*+-]");let o=this.rules.other.listItemRegex(t),i=!1;for(;s;){let l=!1,u="",d="";if(!(e=o.exec(s))||this.rules.block.hr.test(s))break;u=e[0],s=s.substring(u.length);let g=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,w=>" ".repeat(3*w.length)),f=s.split(`
`,1)[0],T=!g.trim(),R=0;if(this.options.pedantic?(R=2,d=g.trimStart()):T?R=e[1].length+1:(R=e[2].search(this.rules.other.nonSpaceChar),R=R>4?1:R,d=g.slice(R),R+=e[1].length),T&&this.rules.other.blankLine.test(f)&&(u+=f+`
`,s=s.substring(f.length+1),l=!0),!l){let w=this.rules.other.nextBulletRegex(R),y=this.rules.other.hrRegex(R),b=this.rules.other.fencesBeginRegex(R),H=this.rules.other.headingBeginRegex(R),v=this.rules.other.htmlBeginRegex(R);for(;s;){let O=s.split(`
`,1)[0],M;if(f=O,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),M=f):M=f.replace(this.rules.other.tabCharGlobal,"    "),b.test(f)||H.test(f)||v.test(f)||w.test(f)||y.test(f))break;if(M.search(this.rules.other.nonSpaceChar)>=R||!f.trim())d+=`
`+M.slice(R);else{if(T||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||b.test(g)||H.test(g)||y.test(g))break;d+=`
`+f}!T&&!f.trim()&&(T=!0),u+=O+`
`,s=s.substring(O.length+1),g=M.slice(R)}}r.loose||(i?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),r.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),r.raw+=u}let a=r.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let l of r.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,r.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!r.loose){let u=l.tokens.filter(g=>g.type==="space"),d=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));r.loose=d}}if(r.loose)for(let l of r.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return r}}html(s){let e=this.rules.block.html.exec(s);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(s){let e=this.rules.block.def.exec(s);if(e){let t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:e[0],href:n,title:r}}}table(s){let e=this.rules.block.table.exec(s);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let t=nr(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(t.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<t.length;i++)o.header.push({text:t[i],tokens:this.lexer.inline(t[i]),header:!0,align:o.align[i]});for(let i of r)o.rows.push(nr(i,o.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:o.align[l]})));return o}}lheading(s){let e=this.rules.block.lheading.exec(s);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(s){let e=this.rules.block.paragraph.exec(s);if(e){let t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(s){let e=this.rules.block.text.exec(s);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(s){let e=this.rules.inline.escape.exec(s);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(s){let e=this.rules.inline.tag.exec(s);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(s){let e=this.rules.inline.link.exec(s);if(e){let t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let o=Je(t.slice(0,-1),"\\");if((t.length-o.length)%2===0)return}else{let o=ho(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],r="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],r=o[3])}else r=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?n=n.slice(1):n=n.slice(1,-1)),rr(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(s,e){let t;if((t=this.rules.inline.reflink.exec(s))||(t=this.rules.inline.nolink.exec(s))){let n=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=e[n.toLowerCase()];if(!r){let o=t[0].charAt(0);return{type:"text",raw:o,text:o}}return rr(t,r,t[0],this.lexer,this.rules)}}emStrong(s,e,t=""){let n=this.rules.inline.emStrongLDelim.exec(s);if(!(!n||n[3]&&t.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!t||this.rules.inline.punctuation.exec(t))){let r=[...n[0]].length-1,o,i,a=r,l=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*s.length+r);(n=u.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){a+=i;continue}else if((n[5]||n[6])&&r%3&&!((r+i)%3)){l+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a+l);let d=[...n[0]][0].length,g=s.slice(0,r+n.index+d+i);if(Math.min(r,i)%2){let T=g.slice(1,-1);return{type:"em",raw:g,text:T,tokens:this.lexer.inlineTokens(T)}}let f=g.slice(2,-2);return{type:"strong",raw:g,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(s){let e=this.rules.inline.code.exec(s);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(t),r=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return n&&r&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(s){let e=this.rules.inline.br.exec(s);if(e)return{type:"br",raw:e[0]}}del(s){let e=this.rules.inline.del.exec(s);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(s){let e=this.rules.inline.autolink.exec(s);if(e){let t,n;return e[2]==="@"?(t=e[1],n="mailto:"+t):(t=e[1],n=t),{type:"link",raw:e[0],text:t,href:n,tokens:[{type:"text",raw:t,text:t}]}}}url(s){let e;if(e=this.rules.inline.url.exec(s)){let t,n;if(e[2]==="@")t=e[0],n="mailto:"+t;else{let r;do r=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(r!==e[0]);t=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:t,href:n,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(s){let e=this.rules.inline.text.exec(s);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},Ae=class an{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Fe,this.options.tokenizer=this.options.tokenizer||new Rt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:_e,block:Lt.normal,inline:Ze.normal};this.options.pedantic?(t.block=Lt.pedantic,t.inline=Ze.pedantic):this.options.gfm&&(t.block=Lt.gfm,this.options.breaks?t.inline=Ze.breaks:t.inline=Ze.gfm),this.tokenizer.rules=t}static get rules(){return{block:Lt,inline:Ze}}static lex(e,t){return new an(t).lex(e)}static lexInline(e,t){return new an(t).inlineTokens(e)}lex(e){e=e.replace(_e.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){for(this.options.pedantic&&(e=e.replace(_e.tabCharGlobal,"    ").replace(_e.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(i=>(r=i.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let i=t.at(-1);r.raw.length===1&&i!==void 0?i.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,a=e.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},a),typeof l=="number"&&l>=0&&(i=Math.min(i,l))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(r=this.tokenizer.paragraph(o))){let i=t.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r),n=o.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n=e,r=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,r.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=r[2]?r[2].length:0,n=n.slice(0,r.index+o)+"["+"a".repeat(r[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,a="";for(;e;){i||(a=""),i=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},e,t))?(e=e.substring(l.raw.length),t.push(l),!0):!1))continue;if(l=this.tokenizer.escape(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.tag(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.link(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(l.raw.length);let d=t.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):t.push(l);continue}if(l=this.tokenizer.emStrong(e,n,a)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.codespan(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.br(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.del(e)){e=e.substring(l.raw.length),t.push(l);continue}if(l=this.tokenizer.autolink(e)){e=e.substring(l.raw.length),t.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(e))){e=e.substring(l.raw.length),t.push(l);continue}let u=e;if(this.options.extensions?.startInline){let d=1/0,g=e.slice(1),f;this.options.extensions.startInline.forEach(T=>{f=T.call({lexer:this},g),typeof f=="number"&&f>=0&&(d=Math.min(d,f))}),d<1/0&&d>=0&&(u=e.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){e=e.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),i=!0;let d=t.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):t.push(l);continue}if(e){let d="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return t}},Ct=class{options;parser;constructor(s){this.options=s||Fe}space(s){return""}code({text:s,lang:e,escaped:t}){let n=(e||"").match(_e.notSpaceStart)?.[0],r=s.replace(_e.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ve(n)+'">'+(t?r:ve(r,!0))+`</code></pre>
`:"<pre><code>"+(t?r:ve(r,!0))+`</code></pre>
`}blockquote({tokens:s}){return`<blockquote>
${this.parser.parse(s)}</blockquote>
`}html({text:s}){return s}def(s){return""}heading({tokens:s,depth:e}){return`<h${e}>${this.parser.parseInline(s)}</h${e}>
`}hr(s){return`<hr>
`}list(s){let e=s.ordered,t=s.start,n="";for(let i=0;i<s.items.length;i++){let a=s.items[i];n+=this.listitem(a)}let r=e?"ol":"ul",o=e&&t!==1?' start="'+t+'"':"";return"<"+r+o+`>
`+n+"</"+r+`>
`}listitem(s){return`<li>${this.parser.parse(s.tokens)}</li>
`}checkbox({checked:s}){return"<input "+(s?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:s}){return`<p>${this.parser.parseInline(s)}</p>
`}table(s){let e="",t="";for(let r=0;r<s.header.length;r++)t+=this.tablecell(s.header[r]);e+=this.tablerow({text:t});let n="";for(let r=0;r<s.rows.length;r++){let o=s.rows[r];t="";for(let i=0;i<o.length;i++)t+=this.tablecell(o[i]);n+=this.tablerow({text:t})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:s}){return`<tr>
${s}</tr>
`}tablecell(s){let e=this.parser.parseInline(s.tokens),t=s.header?"th":"td";return(s.align?`<${t} align="${s.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:s}){return`<strong>${this.parser.parseInline(s)}</strong>`}em({tokens:s}){return`<em>${this.parser.parseInline(s)}</em>`}codespan({text:s}){return`<code>${ve(s,!0)}</code>`}br(s){return"<br>"}del({tokens:s}){return`<del>${this.parser.parseInline(s)}</del>`}link({href:s,title:e,tokens:t}){let n=this.parser.parseInline(t),r=tr(s);if(r===null)return n;s=r;let o='<a href="'+s+'"';return e&&(o+=' title="'+ve(e)+'"'),o+=">"+n+"</a>",o}image({href:s,title:e,text:t,tokens:n}){n&&(t=this.parser.parseInline(n,this.parser.textRenderer));let r=tr(s);if(r===null)return ve(t);s=r;let o=`<img src="${s}" alt="${t}"`;return e&&(o+=` title="${ve(e)}"`),o+=">",o}text(s){return"tokens"in s&&s.tokens?this.parser.parseInline(s.tokens):"escaped"in s&&s.escaped?s.text:ve(s.text)}},Sn=class{strong({text:s}){return s}em({text:s}){return s}codespan({text:s}){return s}del({text:s}){return s}html({text:s}){return s}text({text:s}){return s}link({text:s}){return""+s}image({text:s}){return""+s}br(){return""}checkbox({raw:s}){return s}},Ie=class ln{options;renderer;textRenderer;constructor(e){this.options=e||Fe,this.options.renderer=this.options.renderer||new Ct,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Sn}static parse(e,t){return new ln(t).parse(e)}static parseInline(e,t){return new ln(t).parseInline(e)}parse(e){let t="";for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let i=r,a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){t+=a||"";continue}}let o=r;switch(o.type){case"space":{t+=this.renderer.space(o);break}case"hr":{t+=this.renderer.hr(o);break}case"heading":{t+=this.renderer.heading(o);break}case"code":{t+=this.renderer.code(o);break}case"table":{t+=this.renderer.table(o);break}case"blockquote":{t+=this.renderer.blockquote(o);break}case"list":{t+=this.renderer.list(o);break}case"checkbox":{t+=this.renderer.checkbox(o);break}case"html":{t+=this.renderer.html(o);break}case"def":{t+=this.renderer.def(o);break}case"paragraph":{t+=this.renderer.paragraph(o);break}case"text":{t+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return t}parseInline(e,t=this.renderer){let n="";for(let r=0;r<e.length;r++){let o=e[r];if(this.options.extensions?.renderers?.[o.type]){let a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=a||"";continue}}let i=o;switch(i.type){case"escape":{n+=t.text(i);break}case"html":{n+=t.html(i);break}case"link":{n+=t.link(i);break}case"image":{n+=t.image(i);break}case"checkbox":{n+=t.checkbox(i);break}case"strong":{n+=t.strong(i);break}case"em":{n+=t.em(i);break}case"codespan":{n+=t.codespan(i);break}case"br":{n+=t.br(i);break}case"del":{n+=t.del(i);break}case"text":{n+=t.text(i);break}default:{let a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}},st=class{options;block;constructor(s){this.options=s||Fe}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(s){return s}postprocess(s){return s}processAllTokens(s){return s}emStrongMask(s){return s}provideLexer(){return this.block?Ae.lex:Ae.lexInline}provideParser(){return this.block?Ie.parse:Ie.parseInline}},po=class{defaults=$n();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Ie;Renderer=Ct;TextRenderer=Sn;Lexer=Ae;Tokenizer=Rt;Hooks=st;constructor(...s){this.use(...s)}walkTokens(s,e){let t=[];for(let n of s)switch(t=t.concat(e.call(this,n)),n.type){case"table":{let r=n;for(let o of r.header)t=t.concat(this.walkTokens(o.tokens,e));for(let o of r.rows)for(let i of o)t=t.concat(this.walkTokens(i.tokens,e));break}case"list":{let r=n;t=t.concat(this.walkTokens(r.items,e));break}default:{let r=n;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(o=>{let i=r[o].flat(1/0);t=t.concat(this.walkTokens(i,e))}):r.tokens&&(t=t.concat(this.walkTokens(r.tokens,e)))}}return t}use(...s){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return s.forEach(t=>{let n={...t};if(n.async=this.defaults.async||n.async||!1,t.extensions&&(t.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let o=e.renderers[r.name];o?e.renderers[r.name]=function(...i){let a=r.renderer.apply(this,i);return a===!1&&(a=o.apply(this,i)),a}:e.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[r.level];o?o.unshift(r.tokenizer):e[r.level]=[r.tokenizer],r.start&&(r.level==="block"?e.startBlock?e.startBlock.push(r.start):e.startBlock=[r.start]:r.level==="inline"&&(e.startInline?e.startInline.push(r.start):e.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(e.childTokens[r.name]=r.childTokens)}),n.extensions=e),t.renderer){let r=this.defaults.renderer||new Ct(this.defaults);for(let o in t.renderer){if(!(o in r))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,a=t.renderer[i],l=r[i];r[i]=(...u)=>{let d=a.apply(r,u);return d===!1&&(d=l.apply(r,u)),d||""}}n.renderer=r}if(t.tokenizer){let r=this.defaults.tokenizer||new Rt(this.defaults);for(let o in t.tokenizer){if(!(o in r))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,a=t.tokenizer[i],l=r[i];r[i]=(...u)=>{let d=a.apply(r,u);return d===!1&&(d=l.apply(r,u)),d}}n.tokenizer=r}if(t.hooks){let r=this.defaults.hooks||new st;for(let o in t.hooks){if(!(o in r))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,a=t.hooks[i],l=r[i];st.passThroughHooks.has(o)?r[i]=u=>{if(this.defaults.async&&st.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await a.call(r,u);return l.call(r,g)})();let d=a.call(r,u);return l.call(r,d)}:r[i]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await a.apply(r,u);return g===!1&&(g=await l.apply(r,u)),g})();let d=a.apply(r,u);return d===!1&&(d=l.apply(r,u)),d}}n.hooks=r}if(t.walkTokens){let r=this.defaults.walkTokens,o=t.walkTokens;n.walkTokens=function(i){let a=[];return a.push(o.call(this,i)),r&&(a=a.concat(r.call(this,i))),a}}this.defaults={...this.defaults,...n}}),this}setOptions(s){return this.defaults={...this.defaults,...s},this}lexer(s,e){return Ae.lex(s,e??this.defaults)}parser(s,e){return Ie.parse(s,e??this.defaults)}parseMarkdown(s){return(e,t)=>{let n={...t},r={...this.defaults,...n},o=this.onError(!!r.silent,!!r.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=s),r.async)return(async()=>{let i=r.hooks?await r.hooks.preprocess(e):e,a=await(r.hooks?await r.hooks.provideLexer():s?Ae.lex:Ae.lexInline)(i,r),l=r.hooks?await r.hooks.processAllTokens(a):a;r.walkTokens&&await Promise.all(this.walkTokens(l,r.walkTokens));let u=await(r.hooks?await r.hooks.provideParser():s?Ie.parse:Ie.parseInline)(l,r);return r.hooks?await r.hooks.postprocess(u):u})().catch(o);try{r.hooks&&(e=r.hooks.preprocess(e));let i=(r.hooks?r.hooks.provideLexer():s?Ae.lex:Ae.lexInline)(e,r);r.hooks&&(i=r.hooks.processAllTokens(i)),r.walkTokens&&this.walkTokens(i,r.walkTokens);let a=(r.hooks?r.hooks.provideParser():s?Ie.parse:Ie.parseInline)(i,r);return r.hooks&&(a=r.hooks.postprocess(a)),a}catch(i){return o(i)}}}onError(s,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,s){let n="<p>An error occurred:</p><pre>"+ve(t.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(t);throw t}}},Pe=new po;function V(s,e){return Pe.parse(s,e)}V.options=V.setOptions=function(s){return Pe.setOptions(s),V.defaults=Pe.defaults,br(V.defaults),V};V.getDefaults=$n;V.defaults=Fe;V.use=function(...s){return Pe.use(...s),V.defaults=Pe.defaults,br(V.defaults),V};V.walkTokens=function(s,e){return Pe.walkTokens(s,e)};V.parseInline=Pe.parseInline;V.Parser=Ie;V.parser=Ie.parse;V.Renderer=Ct;V.TextRenderer=Sn;V.Lexer=Ae;V.lexer=Ae.lex;V.Tokenizer=Rt;V.Hooks=st;V.parse=V;V.options;V.setOptions;V.use;V.walkTokens;V.parseInline;Ie.parse;Ae.lex;class fo{static render(e,t=!1){let n=e,r="";if(t){const i=Zn.parse(e);n=i.content,i.frontmatter&&(r=Zn.renderFrontmatter(i.frontmatter))}const o=V.parse(n);return`<div class="markdown-output">${r}${o}</div>`}}class ce{static render(e,t=!1){return fo.render(e,t)}}function go(s){return{name:"render",description:"Render markdown file with formatting",execute:(e,t)=>{if(new U(e).hasFlag("help"))return{output:`Usage: render <file>
Or: <command> | render

Description:
  Render markdown with formatting and YAML frontmatter

Examples:
  render ~/blog/post.md   # Render file
  cat file.md | render    # Render from stdin`};let r;if(t)r=t;else if(e.length>0){const a=e[0];try{if(!s.exists(a))return{output:`render: ${a}: No such file or directory`,error:!0};if(!s.isFile(a))return{output:`render: ${a}: Is a directory`,error:!0};r=s.readFile(a)}catch(l){return{output:l instanceof Error?l.message:String(l),error:!0}}}else return{output:`render: missing file operand
Try 'render --help' for more information`,error:!0};const o=r.trim().startsWith("---");return{output:ce.render(r,o),html:!0}}}}function $o(s){return{name:"unalias",description:"Remove command aliases",execute:(e,t)=>{if(new U(e).hasFlag("help"))return{output:`Usage: unalias <name>

Description:
  Remove a command alias

Examples:
  unalias ll           # Remove the 'll' alias`};if(e.length===0)return{output:`Usage: unalias name
Try 'unalias --help' for more information.`,error:!0};const r=e[0];return s.removeAlias(r)?{output:`Alias removed: ${r}`}:{output:`unalias: ${r}: not found`,error:!0}}}}const To=new Set(["about","portfolio","blog","contact","settings"]);function Lo(s,e){return{name:"which",description:"Locate a command and display its path",execute:(t,n)=>{const r=new U(t);if(r.hasFlag("help"))return{output:`Usage: which [-a] <command> [command ...]

Description:
  Locate a command and display its path

Options:
  -a               Show all matching paths
  --help           Show this help message

Examples:
  which ls         # /usr/bin/ls
  which about      # /usr/local/bin/about
  which ll         # ll: aliased to ls -alh
  which ls cat     # Check multiple commands`};const o=r.getAllPositionals();if(o.length===0)return{output:`which: missing command argument
Usage: which [-a] <command> [command ...]`,error:!0};const i=r.hasFlag("a"),a=[];let l=!1;for(const d of o){const g=Eo(d,s,e,i);g.error&&(l=!0),a.push(g.output)}const u={output:a.join(`
`)};return l&&(u.error=!0),u}}}function Eo(s,e,t,n){const r=[],o=t.getAlias(s);if(o&&(r.push(`${s}: aliased to ${o}`),!n))return{output:r.join(`
`)};if(e.getCommandNames().includes(s.toLowerCase())){const l=To.has(s.toLowerCase())?`/usr/local/bin/${s}`:`/usr/bin/${s}`;r.push(l)}return r.length===0?{output:`which: ${s}: command not found`,error:!0}:{output:r.join(`
`)}}function Ao(s){return{name:"whoami",description:"Display current username",execute:(e,t)=>new U(e).hasFlag("help")?{output:`Usage: whoami

Description:
  Display the current username

Examples:
  whoami               # Show current user`}:{output:s.getUsername()}}}function Io(s){return{name:"cat",description:"Display file contents",execute:(e,t)=>{if(new U(e).hasFlag("help"))return{output:`Usage: cat <file>

Description:
  Display file contents

Examples:
  cat file.txt         # Display file
  cat ~/blog/post.md   # Display from path
  cat file.txt | grep hello  # Use in pipeline
  echo "data" | cat    # Read from stdin`};if(e.length===0)return t!==void 0?{output:t}:{output:`cat: missing file operand
Try 'cat --help' for more information`,error:!0};try{return{output:s.readFile(e[0])}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function yo(s,e,t){return{name:"cd",description:"Change directory (supports - for previous directory)",execute:(n,r)=>{if(new U(n).hasFlag("help"))return{output:`Usage: cd [directory]

Description:
  Change current working directory

Examples:
  cd                   # Go to home directory
  cd ~/blog            # Change to blog directory
  cd -                 # Go to previous directory`};try{let i=n[0]||"~";if(i==="-"&&t){const a=t.getVariable("OLDPWD");if(!a)return{output:"cd: OLDPWD not set",error:!0};i=a}if(t){const a=t.getVariable("PWD")??s.getCurrentPath();t.setVariable("OLDPWD",a)}return s.changeDirectory(i),t&&t.setVariable("PWD",s.getCurrentPath()),e(s.getShortPath()),{output:""}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}}}function bo(s,e){if(!e)return s.toString();const t=["B","K","M","G","T"];let n=s,r=0;for(;n>=1024&&r<t.length-1;)n/=1024,r++;return`${r===0?n.toString():n.toFixed(1)}${t[r]}`}function So(s){const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][s.getMonth()],n=s.getDate().toString().padStart(2," "),r=s.getHours().toString().padStart(2,"0"),o=s.getMinutes().toString().padStart(2,"0");return`${t} ${n} ${r}:${o}`}function sr(s,e){const t=s.permissions??"-rw-r--r--",n="1",r=s.owner??"darin",o="staff",i=bo(s.size??0,e),a=So(s.modifiedTime??new Date),l=s.name,u=i.padStart(6," ");return`${t}  ${n} ${r}  ${o}  ${u} ${a} ${l}`}function Ro(s){const e=s.reduce((t,n)=>t+(n.size??0),0);return Math.ceil(e/512)}function Co(s){return{name:"ls",description:"List directory contents",execute:(e,t)=>{try{const n=new U(e);if(n.hasFlag("help"))return{output:`Usage: ls [options] [path]

Description:
  List directory contents

Options:
  -a                   Show hidden files
  -l                   Long format with details
  -h                   Human-readable sizes

Examples:
  ls                   # List current directory
  ls -la               # List all files with details
  ls ~/blog            # List specific directory`};const r=n.getPositional(0)??".",o=n.hasFlag("a"),i=n.hasFlag("l"),a=n.hasFlag("h"),l=s.getNode(r);if(!l)return{output:`ls: cannot access '${r}': No such file or directory
Try 'ls --help' for more information`,error:!0};if(l.type==="file")return i?{output:sr(l,a)}:{output:l.name};if(!l.children)return{output:""};let u=Array.from(l.children.values());return o||(u=u.filter(d=>!d.isHidden)),u.length===0?{output:""}:(u.sort((d,g)=>d.name.localeCompare(g.name)),i?{output:[`total ${Ro(u)}`,...u.map(f=>sr(f,a))].join(`
`)}:{output:u.map(g=>g.name).join("  ")})}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}function wo(s){return{name:"pwd",description:"Print working directory",execute:(e,t)=>new U(e).hasFlag("help")?{output:`Usage: pwd

Description:
  Print current working directory path

Examples:
  pwd                  # Show current directory`}:{output:s.getCurrentPath()}}}const vo=`Usage: rm [OPTION]... FILE...

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
  rm -rf /             # Don't try this at home`;function No(){return'<div data-melt class="melt-trigger"></div>'}function xo(s,e){return{name:"rm",description:"Remove files or directories",execute:(t,n)=>{const r=new U(t);if(r.hasFlag("help"))return{output:vo};const o=r.getFlag("recursive"),i=r.getFlag("force"),a=r.getFlag("f"),l=r.hasFlag("r")||r.hasFlag("R")||o!==void 0,u=r.hasFlag("f")||i!==void 0,d=[...r.getAllPositionals()];if(typeof o=="string"&&d.push(o),typeof i=="string"&&d.push(i),typeof a=="string"&&d.push(a),d.length===0)return{output:`rm: missing operand
Try 'rm --help' for more information`,error:!0};if(l&&u&&d.some(R=>R==="/"||R==="/*"))return{output:No(),html:!0};const g=[];let f=!1;for(const T of d)try{if(!s.exists(T)){u||(g.push(`rm: cannot remove '${T}': No such file or directory`),f=!0);continue}if(s.isDirectory(T)){if(!l){g.push(`rm: cannot remove '${T}': Is a directory`),f=!0;continue}s.deleteDirectory(T,!0)}else{const y=T.startsWith("/")?T:`${s.getCurrentPath()}/${T}`.replace(/\/+/g,"/");if(y.startsWith("/usr/bin/")||y.startsWith("/usr/local/bin/")){const b=y.split("/").pop();b&&e.unregisterCommand(b)}s.deleteFile(T)}}catch(R){u||(g.push(R instanceof Error?R.message:String(R)),f=!0)}return u?{output:"",error:!1}:{output:g.join(`
`),error:f}}}}function ko(s){return{name:"tree",description:"Display directory tree structure",execute:(e,t)=>{try{const n=new U(e);if(n.hasFlag("help"))return{output:`Usage: tree [options] [path]

Description:
  Display directory tree structure

Options:
  -L <depth>           Limit tree depth (default: 4)

Examples:
  tree                 # Show tree of current directory
  tree ~/blog          # Show tree of specific directory
  tree -L 2            # Limit depth to 2 levels`};const r=n.getPositional(0)??".";let o=4;const i=n.getFlag("L");if(i!==void 0){if(typeof i=="boolean")return{output:`tree: -L flag requires a depth value
Try 'tree --help' for more information`,error:!0};const u=parseInt(i,10);if(isNaN(u)||u<1)return{output:`tree: invalid level, must be a positive integer
Try 'tree --help' for more information`,error:!0};o=u}return{output:s.getTree(r,o).join(`
`),scrollBehavior:"top"}}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}const be={HOME_DARIN:"/home/darin",HOME_GUEST:"/home/guest",CONTENT_BLOG:"/home/darin/blog",CONTENT_PORTFOLIO:"/home/darin/portfolio",CONTENT_HELP:"/home/darin/content/help.md",CONTENT_ABOUT:"/home/darin/content/about.md",CONTENT_CONTACT:"/home/darin/content/contact.md",CONFIG_ALIASES:"/home/guest/.alias",CONFIG_SETTINGS:"/home/darin/.settings",CONFIG_ENV:"/home/darin/.env"},Dr={CLEAR_SCREEN:"__CLEAR__"},cn={SETTINGS:"terminal_settings",ENVIRONMENT:"terminal_env_vars"},wt={EMPTY_PORTFOLIO:"No portfolio projects yet. Check back soon!",EMPTY_BLOG:"No blog posts yet. Check back soon!",NO_TAGS_AVAILABLE:"No tags available yet."},or={theme:{preset:"dc",customColors:void 0},font:{size:16,family:"Fira Code"},effects:{scanLines:!1,glow:!1,border:!0,animationSpeed:1,soundEffects:!1,autoScrollBehavior:!0},prompt:{format:"\\W \\$ "},screensaver:{enabled:!0,timeoutMinutes:5,activeScreensaver:"matrix"}},ot={MIN_TIMEOUT_MINUTES:1,MAX_TIMEOUT_MINUTES:60,ACTIVITY_DEBOUNCE_MS:100};function Oo(s){return{name:"about",description:"Display bio and expertise overview",execute:(e,t)=>{if(new U(e).hasFlag("help"))return{output:`Usage: about

Description:
  Display professional bio and expertise overview

Examples:
  about                # Show bio and background`};try{const r=s.readFile(be.CONTENT_ABOUT);return{output:ce.render(r),html:!0,scrollBehavior:"top"}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Mo(s){if(typeof s!="object"||s===null)return!1;const e=s;return typeof e.title=="string"&&typeof e.date=="string"&&typeof e.summary=="string"&&Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string")}class Pr{static parseFrontmatter(e){const t=e.split(`
`);if(t[0]?.trim()!=="---")throw new Error("Invalid frontmatter: must start with ---");let n=-1;for(let a=1;a<t.length;a++)if(t[a].trim()==="---"){n=a;break}if(n===-1)throw new Error("Invalid frontmatter: no closing ---");const r=t.slice(1,n),o=t.slice(n+1),i={};for(const a of r){const l=a.indexOf(":");if(l===-1)continue;const u=a.substring(0,l).trim(),d=a.substring(l+1).trim();if(d.startsWith("[")&&d.endsWith("]")){const g=d.substring(1,d.length-1);i[u]=g.split(",").map(f=>f.trim().replace(/^["']|["']$/g,"")).filter(f=>f.length>0)}else i[u]=d.replace(/^["']|["']$/g,"")}if(!Mo(i)){const a=[];throw i.title||a.push("title"),i.date||a.push("date"),i.summary||a.push("summary"),Array.isArray(i.tags)||a.push("tags"),new Error(`Invalid blog frontmatter: missing or invalid fields: ${a.join(", ")}`)}return{frontmatter:i,markdown:o.join(`
`).trim()}}static parseBlogPost(e,t){const{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:e.replace(/^\d{4}-\d{2}-\d{2}-/,"").replace(/\.md$/,""),title:n.title,date:n.date,summary:n.summary,content:r,tags:n.tags}}static getIdFromFilename(e){return e.replace(/^\d{4}-\d{2}-\d{2}-/,"").replace(/\.md$/,"")}}class vt{static formatClickableTag(e,t){return`<button data-command="${t==="portfolio"?`portfolio --tags ${e}`:`blog --tags ${e}`}" class="tag-link">${e}</button>`}static formatPortfolioList(e,t){const n=t?`# Portfolio - Tag: ${t}`:"# Portfolio",r=e.map((i,a)=>{const l=i.tags?.map(d=>this.formatClickableTag(d,"portfolio")).join(" ")??"",u=l?`

**Tags:** ${l}`:"";return`### <a href="/portfolio/${i.id}" data-command="portfolio ${i.id}">${a+1}. ${i.title} (${i.year})</a>

${i.summary}${u}
`}).join(`

---

`);return`${n}

${r}${t?`

---

<a href="/portfolio" data-command="portfolio">← Back to All Projects</a>`:"\n\n---\n\n**Filter by tag:** Type `portfolio --tags <tag>` or `portfolio --tags` to list all tags"}`}static formatPortfolioDetail(e){const t=e.technologies.join(", "),n=e.impact?`**Impact:** ${e.impact}

`:"",r=e.tags?.map(i=>this.formatClickableTag(i,"portfolio")).join(" ")??"",o=r?`**Tags:** ${r}

`:"";return`# ${e.title}

**Year:** ${e.year}

${e.description}

**Technologies:** ${t}

${n}${o}---

<a href="/portfolio" data-command="portfolio">← Back to Portfolio</a>`}static formatBlogList(e,t){const n=t?`# Blog Posts - Tag: ${t}`:"# Blog Posts",r=e.map((i,a)=>{const l=i.tags.map(d=>this.formatClickableTag(d,"blog")).join(" "),u=e.length-a;return`### <a href="/blog/${i.id}" data-command="blog ${i.id}">${u}. ${i.title}</a>

**Date:** ${i.date}

${i.summary}

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

<a href="/blog" data-command="blog">← Back to Blog</a>`}}function Do(s){return{name:"blog",description:"List and read blog posts",execute:(e,t)=>{const n=new U(e);if(n.hasFlag("help"))return{output:`Usage: blog [options] [post-id|number]

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
  blog post-id                  # Read specific post by ID`};const r=be.CONTENT_BLOG;try{const i=s.list(r).filter(w=>w.endsWith(".md")).sort().reverse(),a=n.getFlag("tags"),l=n.hasFlag("tags"),u=n.getPositional(0),d=[];for(const w of i){const y=s.readFile(`${r}/${w}`),b=Pr.parseBlogPost(w,y);d.push(b)}if(d.length===0&&!l&&!u){const w=`# Blog

${wt.EMPTY_BLOG}`;return{output:ce.render(w),html:!0,scrollBehavior:"top"}}if(l&&(typeof a=="boolean"||!a)){const w=new Set,y=new Map;d.forEach(M=>{M.tags?.forEach(z=>{w.add(z),y.set(z,(y.get(z)??0)+1)})});const b=Array.from(w).sort();if(b.length===0){const M=`# Blog Tags

${wt.NO_TAGS_AVAILABLE}`;return{output:ce.render(M),html:!0,scrollBehavior:"top"}}const v=`# Blog Tags

${b.map(M=>{const z=y.get(M)??0;return`- <button data-command="blog --tags ${M}" class="tag-link">${M}</button> (${z} post${z!==1?"s":""})`}).join(`
`)}

---

**Usage:** Type \`blog --tags <tag>\` to filter posts`;return{output:ce.render(v),html:!0,scrollBehavior:"top"}}if(u){let w;const y=parseInt(u,10);if(!isNaN(y)&&y>0&&y<=d.length){const v=d.length-y;w=d[v]}else w=d.find(v=>v.id===u);if(!w)return{output:`Blog post '${u}' not found.
Use 'blog' to list all posts.
Try 'blog --help' for more information`,error:!0};const b=vt.formatBlogPost(w);return{output:ce.render(b),html:!0,scrollBehavior:"top"}}let g=d;const f=typeof a=="string"?a:void 0;if(f&&(g=d.filter(w=>w.tags.some(y=>y.toLowerCase()===f.toLowerCase())),g.length===0)){const w=new Map;d.forEach(H=>{H.tags?.forEach(v=>{w.set(v,(w.get(v)??0)+1)})});const y=Array.from(w.entries()).sort((H,v)=>v[1]-H[1]).slice(0,5).map(([H])=>H),b=y.length>0?`
Try one of these tags: ${y.join(", ")}`:"";return{output:`No blog posts found with tag '${f}'.${b}
Use 'blog' to see all posts.`,error:!1}}const T=vt.formatBlogList(g,f);return{output:ce.render(T),html:!0,scrollBehavior:"top"}}catch(o){return{output:o instanceof Error?o.message:String(o),error:!0}}}}}function Po(s){return{name:"contact",description:"Display contact information",execute:(e,t)=>{if(new U(e).hasFlag("help"))return{output:`Usage: contact

Description:
  Display contact information and professional links

Examples:
  contact              # Show contact details`};try{const r=s.readFile(be.CONTENT_CONTACT);return{output:ce.render(r),html:!0}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Fo(s){if(typeof s!="object"||s===null)return!1;const e=s;return typeof e.id=="string"&&typeof e.title=="string"&&typeof e.summary=="string"&&typeof e.year=="string"&&typeof e.order=="number"&&Array.isArray(e.technologies)&&e.technologies.every(t=>typeof t=="string")&&(e.impact===void 0||typeof e.impact=="string")&&(e.tags===void 0||Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string"))}class Ho{static parseFrontmatter(e){const t=e.split(`
`);if(t[0]?.trim()!=="---")throw new Error("Invalid frontmatter: must start with ---");let n=-1;for(let a=1;a<t.length;a++)if(t[a].trim()==="---"){n=a;break}if(n===-1)throw new Error("Invalid frontmatter: no closing ---");const r=t.slice(1,n),o=t.slice(n+1),i={};for(const a of r){const l=a.indexOf(":");if(l===-1)continue;const u=a.substring(0,l).trim(),d=a.substring(l+1).trim();if(d.startsWith("[")&&d.endsWith("]")){const g=d.substring(1,d.length-1);i[u]=g.split(",").map(f=>f.trim().replace(/^["']|["']$/g,"")).filter(f=>f.length>0)}else{const g=d.replace(/^["']|["']$/g,"");if(u==="order"){const f=Number(g);i[u]=isNaN(f)?g:f}else i[u]=g}}if(!Fo(i)){const a=[];throw i.id||a.push("id"),i.title||a.push("title"),i.summary||a.push("summary"),i.year||a.push("year"),typeof i.order!="number"&&a.push("order"),Array.isArray(i.technologies)||a.push("technologies"),new Error(`Invalid portfolio frontmatter: missing or invalid fields: ${a.join(", ")}`)}return{frontmatter:i,markdown:o.join(`
`).trim()}}static parseProject(e,t){const{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:n.id||e.replace(/\.md$/,""),title:n.title,summary:n.summary,description:r,technologies:n.technologies,impact:n.impact,year:n.year,order:n.order,tags:n.tags}}static getIdFromFilename(e){return e.replace(/\.md$/,"")}}function Wo(s){return{name:"portfolio",description:"Showcase projects and accomplishments",execute:(e,t)=>{const n=new U(e);if(n.hasFlag("help"))return{output:`Usage: portfolio [options] [project-id|number]

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
  portfolio proj-id             # View specific project by ID`};const r=be.CONTENT_PORTFOLIO;try{const i=s.list(r).filter(y=>y.endsWith(".md")),a=n.getFlag("tags"),l=n.hasFlag("tags"),u=n.getPositional(0),d=[];for(const y of i){const b=s.readFile(`${r}/${y}`);if(b)try{const H=Ho.parseProject(y,b);d.push(H)}catch(H){console.error(`Error parsing ${y}:`,H)}}if(d.sort((y,b)=>y.order!==b.order?y.order-b.order:y.title.localeCompare(b.title)),d.length===0&&!l&&!u){const y=`# Portfolio

${wt.EMPTY_PORTFOLIO}`;return{output:ce.render(y),html:!0,scrollBehavior:"top"}}if(l&&(typeof a=="boolean"||!a)){const y=new Set,b=new Map;d.forEach(z=>{z.tags?.forEach(ne=>{y.add(ne),b.set(ne,(b.get(ne)??0)+1)})});const H=Array.from(y).sort();if(H.length===0){const z=`# Portfolio Tags

${wt.NO_TAGS_AVAILABLE}`;return{output:ce.render(z),html:!0,scrollBehavior:"top"}}const O=`# Portfolio Tags

${H.map(z=>{const ne=b.get(z)??0;return`- <button data-command="portfolio --tags ${z}" class="tag-link">${z}</button> (${ne} project${ne!==1?"s":""})`}).join(`
`)}

---

**Usage:** Type \`portfolio --tags <tag>\` to filter projects`;return{output:ce.render(O),html:!0,scrollBehavior:"top"}}if(u){let y;const b=parseInt(u,10);if(!isNaN(b)&&b>0&&b<=d.length){const O=b-1;y=d[O]}else y=d.find(O=>O.id===u);if(!y)return{output:`Project '${u}' not found.
Use 'portfolio' to list all projects.
Try 'portfolio --help' for more information`,error:!0};const H=vt.formatPortfolioDetail(y);return{output:ce.render(H),html:!0,scrollBehavior:"top"}}let g=d,f=[];if(l&&typeof a=="string"&&(f=a.split(",").map(y=>y.trim().toLowerCase()),g=d.filter(y=>y.tags?.some(b=>f.includes(b.toLowerCase()))),g.length===0)){const y=f.map(O=>`'${O}'`).join(", "),b=new Map;d.forEach(O=>{O.tags?.forEach(M=>{b.set(M,(b.get(M)??0)+1)})});const H=Array.from(b.entries()).sort((O,M)=>M[1]-O[1]).slice(0,5).map(([O])=>O),v=H.length>0?`
Try one of these tags: ${H.join(", ")}`:"";return{output:`No projects found with tag${f.length>1?"s":""} ${y}.${v}
Use 'portfolio' to see all projects.`,error:!1}}const T=f.length>0?f.join(", "):void 0,R=vt.formatPortfolioList(g,T);return{output:ce.render(R),html:!0,scrollBehavior:"top"}}catch(o){return{output:`Error loading portfolio: ${String(o)}`,error:!0}}}}}function Fr(s,e){const t=s.loadSettings(),n=e.getPresets();return`<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true"><h2>Terminal Settings</h2><section class="settings-section"><h3>Color Theme</h3>${Bo(n,t.theme.preset)}</section><section class="settings-section"><details ${t.theme.preset==="custom"?"open":""}><summary>Advanced: Custom Colors</summary>${Uo(t.theme.customColors)}</details></section><section class="settings-section"><h3>Font</h3>${Go(t.font)}</section><section class="settings-section"><h3>Effects</h3>${Vo(t.effects)}</section><section class="settings-section"><h3>Screensaver</h3>${zo(t.screensaver)}</section><div class="settings-actions"><button data-command="settings reset" class="btn-reset">Reset to Defaults</button></div></aside>`}function Bo(s,e){return'<div class="theme-buttons-container">'+s.map(t=>`<button class="theme-button ${t.name===e?"active":""}" data-command="settings set theme ${t.name}" data-theme="${t.name}" style="background: ${t.colors["--terminal-bg"]}; color: ${t.colors["--terminal-accent"]}; border-color: ${t.colors["--terminal-accent"]};"><span class="theme-preview" style="background: ${t.colors["--terminal-accent"]}"></span>${t.displayName}</button>`).join("")+"</div>"}function Uo(s){return[{key:"--terminal-bg",label:"Background",prop:"background"},{key:"--terminal-bg-secondary",label:"BG (Secondary)",prop:"backgroundSecondary"},{key:"--terminal-fg",label:"Foreground",prop:"foreground"},{key:"--terminal-accent",label:"Accent",prop:"accent"},{key:"--terminal-dim",label:"Dim",prop:"dim"},{key:"--terminal-error",label:"Error",prop:"error"},{key:"--terminal-cursor",label:"Cursor",prop:"cursor"}].map(t=>{const n=s?.[t.prop]??(typeof window<"u"?getComputedStyle(document.documentElement).getPropertyValue(t.key).trim():"#000000");return`<div class="color-picker-group"><label>${t.label}</label><input type="color" value="${n}" data-command-template="settings set color ${t.key}" data-color-var="${t.key}"/><span class="color-value">${s?.[t.prop]??"default"}</span></div>`}).join("")}function Go(s){const e=["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"];return`<div class="setting-group"><label>Font Size: <span id="font-size-value">${s.size}px</span></label><input type="range" min="8" max="24" step="1" value="${s.size}" aria-label="Font size" aria-valuemin="8" aria-valuemax="24" aria-valuenow="${s.size}" aria-valuetext="${s.size} pixels" data-command-template="settings set font-size" data-setting-type="font-size"/></div><div class="setting-group"><label>Font Family</label><select aria-label="Font family" data-command-template="settings set font-family" data-setting-type="font-family">${e.map(t=>`<option value="${t}" ${t===s.family?"selected":""}>${t}</option>`).join("")}</select></div>`}function Vo(s){return`<div class="setting-group"><label><input type="checkbox" ${s.scanLines?"checked":""} data-command-template="settings set scan-lines" data-setting-type="scan-lines"/>Scan Lines</label></div><div class="setting-group"><label><input type="checkbox" ${s.glow?"checked":""} data-command-template="settings set glow" data-setting-type="glow"/>Glow Effect</label></div><div class="setting-group"><label><input type="checkbox" ${s.border?"checked":""} data-command-template="settings set border" data-setting-type="border"/>Page Border</label></div><div class="setting-group"><label>Animation Speed: <span id="animation-speed-value">${s.animationSpeed}x</span></label><input type="range" min="0.5" max="2.0" step="0.1" value="${s.animationSpeed}" aria-label="Animation speed" aria-valuemin="0.5" aria-valuemax="2" aria-valuenow="${s.animationSpeed}" aria-valuetext="${s.animationSpeed} times speed" data-command-template="settings set animation-speed" data-setting-type="animation-speed"/></div><div class="setting-group"><label><input type="checkbox" ${s.soundEffects?"checked":""} data-command-template="settings set sound-effects" data-setting-type="sound-effects"/>Sound Effects (future feature)</label></div>`}function zo(s){const e=[{value:"matrix",label:"Matrix Digital Rain"},{value:"life",label:"Conway's Game of Life"}];return`<div class="setting-group"><label><input type="checkbox" ${s.enabled?"checked":""} data-command-template="settings set screensaver-enabled" data-setting-type="screensaver-enabled"/>Enable Screensaver</label></div><div class="setting-group"><label>Timeout: <span id="screensaver-timeout-value">${s.timeoutMinutes}min</span></label><input type="range" min="1" max="60" step="1" value="${s.timeoutMinutes}" aria-label="Screensaver timeout" aria-valuemin="1" aria-valuemax="60" aria-valuenow="${s.timeoutMinutes}" aria-valuetext="${s.timeoutMinutes} minutes" data-command-template="settings set screensaver-timeout" data-setting-type="screensaver-timeout"/></div><div class="setting-group"><label>Screensaver Type</label><select aria-label="Screensaver type" data-command-template="settings set screensaver-type" data-setting-type="screensaver-type">${e.map(t=>`<option value="${t.value}" ${t.value===s.activeScreensaver?"selected":""}>${t.label}</option>`).join("")}</select></div>`}function jo(s,e,t){return{name:"settings",description:"Manage terminal settings and preferences",aliases:["preferences","config"],execute:(n,r)=>{const o=new U(n);if(o.hasFlag("help"))return{output:`Usage: settings [subcommand] [options]

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
  settings reset       # Reset all settings`};if(n.length===0)return{output:Fr(e,t),html:!0};const i=o.getPositional(0);switch(i){case"list":return Yo(e,t);case"set":return ir(o,e,t);case"reset":return qo(e,t);case"theme":case"font-size":case"font-family":case"fontSize":case"fontFamily":case"scan-lines":case"scanLines":case"glow":case"border":case"animation-speed":case"animationSpeed":case"sound":case"auto-scroll":case"autoScroll":case"prompt":case"screensaver-enabled":case"screensaverEnabled":case"screensaver-timeout":case"screensaverTimeout":case"screensaver-type":case"screensaverType":return ir(new U(["set",i,...n.slice(1)]),e,t);default:return{output:`Unknown subcommand: ${i}.
Try 'settings --help' for more information`,error:!0}}}}}function Yo(s,e){const t=Xo(s,e);return{output:ce.render(t),html:!0}}function ir(s,e,t){const n=s.getPositional(1),r=s.getPositional(2);if(!n)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};if(n!=="color"&&!r)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};try{switch(n){case"theme":{const o=["green","yellow","white","light-blue","paper","dc"];return o.includes(r)?(e.setSetting("theme",{preset:r}),t.applyTheme(r),le(),{output:`Theme changed to: ${r}`}):{output:`Invalid theme: ${r}. Available: ${o.join(", ")}`,error:!0}}case"color":{const o=["terminal-bg","terminal-fg","terminal-accent","terminal-dim","terminal-error","terminal-cursor","terminal-bg-secondary"];let i,a;for(const u of o){const d=s.getFlag(u);if(d&&typeof d=="string"){i="--"+u,a=d;break}}if(!i||!a)return{output:`Usage: settings set color <variable> <value>
Example: settings set color --terminal-accent #ff0000`,error:!0};const l={[i]:a};return t.applyCustomColors(l),le(),{output:`Color ${i} set to ${a}`}}case"font-size":case"fontSize":{if(!r)return{output:"Font size value required",error:!0};const o=parseInt(r,10);return isNaN(o)?{output:"Font size must be a number (8-24)",error:!0}:(e.setFontSize(o),_n(e),le(),{output:`Font size set to: ${o}px`})}case"font-family":case"fontFamily":{if(!r)return{output:"Font family value required",error:!0};const o=["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"];return o.includes(r)?(e.setFontFamily(r),_n(e),le(),{output:`Font family set to: ${r}`}):{output:`Invalid font family: ${r}. Available: ${o.join(", ")}`,error:!0}}case"scan-lines":case"scanLines":{if(!r)return{output:"Scan lines value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Scan lines must be "on" or "off"',error:!0};const o=r==="on";return e.setScanLines(o),Hr(o),le(),{output:`Scan lines: ${r}`}}case"glow":{if(!r)return{output:"Glow value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Glow must be "on" or "off"',error:!0};const o=r==="on";return e.setGlow(o),Wr(o),le(),{output:`Glow: ${r}`}}case"border":{if(!r)return{output:"Border value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Border must be "on" or "off"',error:!0};const o=r==="on";return e.setBorder(o),Br(o),le(),{output:`Border: ${r}`}}case"animation-speed":case"animationSpeed":{if(!r)return{output:"Animation speed value required",error:!0};const o=parseFloat(r);return isNaN(o)?{output:"Animation speed must be a number (0.5-2.0)",error:!0}:(e.setAnimationSpeed(o),Ur(o),le(),{output:`Animation speed set to: ${o}x`})}case"sound-effects":case"sound":{if(!r)return{output:"Sound effects value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Sound effects must be "on" or "off"',error:!0};const o=r==="on";return e.setSoundEffects(o),le(),{output:`Sound effects: ${r}`}}case"autoscroll":case"auto-scroll":case"autoScroll":{if(!r)return{output:"Autoscroll value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Autoscroll must be "on" or "off"',error:!0};const o=r==="on";return e.setAutoScrollBehavior(o),le(),{output:`Autoscroll: ${r} - ${o?"Long content (>50 lines) scrolls to command line":"All content scrolls to bottom"}`}}case"prompt":return r?(e.setPromptFormat(r),le(),{output:`Prompt format set to: ${r}`}):{output:"Prompt format value required",error:!0};case"screensaver-enabled":case"screensaverEnabled":{if(!r)return{output:"Screensaver enabled value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Screensaver enabled must be "on" or "off"',error:!0};const o=r==="on";return e.setScreensaverEnabled(o),le(),{output:`Screensaver: ${r}`}}case"screensaver-timeout":case"screensaverTimeout":{if(!r)return{output:"Screensaver timeout value required (1-60 minutes)",error:!0};const o=parseInt(r,10);return isNaN(o)||o<1||o>60?{output:"Screensaver timeout must be between 1 and 60 minutes",error:!0}:(e.setScreensaverTimeout(o),le(),{output:`Screensaver timeout set to: ${o} minutes`})}case"screensaver-type":case"screensaverType":{if(!r)return{output:"Screensaver type value required",error:!0};const o=["matrix","life"];return o.includes(r)?(e.setActiveScreensaver(r),le(),{output:`Screensaver type set to: ${r}`}):{output:`Invalid screensaver type: ${r}. Available: ${o.join(", ")}`,error:!0}}default:return{output:`Unknown setting: ${n}. Available: theme, color, font-size, font-family, scan-lines, glow, border, animation-speed, sound-effects, autoscroll, prompt, screensaver-enabled, screensaver-timeout, screensaver-type`,error:!0}}}catch(o){return{output:o instanceof Error?o.message:String(o),error:!0}}}function qo(s,e){return s.reset(),e.applyCurrentTheme(),_n(s),Hr(s.getScanLines()),Wr(s.getGlow()),Br(s.getBorder()),Ur(s.getAnimationSpeed()),le(),{output:"Settings reset to defaults."}}function Xo(s,e){const t=s.loadSettings(),n=e.getPresets();return`# Terminal Settings

## Current Configuration

### Theme
**${t.theme.preset==="custom"?"Custom":n.find(o=>o.name===t.theme.preset)?.displayName??t.theme.preset}**

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

${n.map(o=>`- **${o.name}**: ${o.displayName}`).join(`
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
`}function _n(s){const e=s.getSetting("font");typeof document<"u"&&(document.documentElement.style.setProperty("--terminal-font-size",`${e.size}px`),document.documentElement.style.setProperty("--terminal-font-family",e.family))}function Hr(s){typeof document<"u"&&(s?document.body.classList.remove("no-scan-lines"):document.body.classList.add("no-scan-lines"))}function Wr(s){typeof document<"u"&&(s?document.body.classList.remove("no-glow"):document.body.classList.add("no-glow"))}function Br(s){typeof document<"u"&&(s?document.body.classList.add("border-enabled"):document.body.classList.remove("border-enabled"))}function Ur(s){typeof document<"u"&&document.documentElement.style.setProperty("--terminal-animation-speed",s.toString())}function le(){if(typeof document<"u"){const s=new CustomEvent("settings-changed");document.dispatchEvent(s)}}function Ko(s){const e=[{type:"bios",text:"PHOENIX BIOS v4.0 Release 6.0"},{type:"bios",text:"Copyright 1985-2025 Phoenix Technologies Ltd."},{type:"bios",text:"CPU: JavaScript V8 Engine @ ∞ GHz"},{type:"bios",text:"Memory Test: 16384 MB OK"},{type:"bios",text:"Detecting IDE drives..."},{type:"bios",text:"  Primary Master: Virtual SSD 256GB"},{type:"kernel",text:"Loading kernel..."},{type:"kernel",text:"[    0.000000] Linux version 6.8.0-darin (darin@darinchambers.com)"},{type:"kernel",text:"[    0.000001] Command line: BOOT_IMAGE=/vmlinuz-6.8.0-darin root=/dev/sda1"},{type:"kernel",text:"[    0.123456] Calibrating delay loop... 7999.99 BogoMIPS (lpj=15999984)"},{type:"kernel",text:"[    0.234567] Memory: 16384MB available"},{type:"kernel",text:"[    0.345678] CPU: JavaScript Virtual CPU"},{type:"kernel",text:"[    0.456789] Mounting root filesystem..."},{type:"ok",text:"Started System Logging Service"},{type:"ok",text:"Started Journal Service"},{type:"ok",text:"Started D-Bus System Message Bus"},{type:"ok",text:"Reached target Local File Systems"},{type:"ok",text:"Started Network Manager"},{type:"failed",text:"Started Bluetooth Service (no adapter found)"},{type:"ok",text:"Started Login Service"},{type:"ok",text:"Started OpenSSH Server"},{type:"ok",text:"Started Docker Container Runtime"},{type:"ok",text:"Started Code Editor Process"},{type:"ok",text:"Started Terminal Emulator"},{type:"ok",text:"Reached target Multi-User System"},{type:"info",text:"darinchambers.com login: darin"},{type:"info",text:"Password: ********"},{type:"welcome",text:"Welcome to darinchambers.com!"},{type:"info",text:"Type 'help' for available commands."}];return s?[{type:"bios",text:"PHOENIX BIOS v4.0"},{type:"bios",text:"Memory Test: 16384 MB OK"},{type:"kernel",text:"Loading kernel..."},{type:"kernel",text:"[    0.000000] Linux version 6.8.0-darin"},{type:"ok",text:"Started System Logging Service"},{type:"ok",text:"Started Network Manager"},{type:"ok",text:"Started Terminal Emulator"},{type:"ok",text:"Reached target Multi-User System"},{type:"welcome",text:"Welcome to darinchambers.com!"}]:e}function Gr(s,e=0){const t=Ko(s),n=s?80:120;return t.map((o,i)=>{const a=e+i*n,l=`boot-line boot-line-${o.type}`,u=o.text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`<div class="${l}" style="animation-delay: ${a}ms;">${u}</div>`}).join(`
`)}const Zo={name:"boot",description:"Display simulated Linux boot sequence",execute:(s,e)=>{const t=new U(s);if(t.hasFlag("help"))return{output:`Usage: boot [options]

Display a simulated Linux boot sequence with BIOS POST,
kernel loading, and service startup messages.

Options:
  --fast     Show abbreviated boot sequence
  --help     Display this help message

Examples:
  boot           # Show full boot sequence
  boot --fast    # Show quick boot sequence

Note: Messages appear with timed animation. Scroll or type to stop.`};const n=t.hasFlag("fast");return{output:`<div class="boot-sequence boot-startup" data-boot-type="boot">
${Gr(n)}
</div>`,html:!0,clearBefore:!0,scrollBehavior:"top"}}},je=[{code:"SYSTEM_THREAD_EXCEPTION_NOT_HANDLED",description:"A system thread generated an exception that was not handled."},{code:"DRIVER_IRQL_NOT_LESS_OR_EQUAL",description:"A driver attempted to access a pageable memory at an inappropriate IRQL."},{code:"KERNEL_DATA_INPAGE_ERROR",description:"The requested page of kernel data from the paging file could not be read."},{code:"PAGE_FAULT_IN_NONPAGED_AREA",description:"Invalid system memory has been referenced."},{code:"CRITICAL_PROCESS_DIED",description:"A critical system process died unexpectedly."}];function Jo(s,e){return`<div class="bsod-overlay bsod-modern" data-bsod="true" data-bsod-style="modern">
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
        <p class="bsod-stop-code">Stop code: ${xe(s)}</p>
        <p class="bsod-description">${xe(e)}</p>
      </div>
    </div>
  </div>
</div>`}function Qo(s,e){const t=["0x0000007E","0xC0000005","0xBF8B4C62","0x00000000","0xBF8B4C62"];return`<div class="bsod-overlay bsod-classic" data-bsod="true" data-bsod-style="classic">
  <div class="bsod-classic-content">
    <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
    <br>
    <p>${xe(s)}</p>
    <br>
    <p>${xe(e)}</p>
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
</div>`}const ei={name:"bsod",description:"Display a fake Windows Blue Screen of Death",execute:(s,e)=>{const t=new U(s);if(t.hasFlag("help")||t.hasFlag("h"))return{output:`Usage: bsod [options]

Display a fake Windows Blue Screen of Death. Supports two styles:
- Modern (default): Windows 10/11 style with animated progress counter
- Classic: Windows XP/NT style with technical text and blinking cursor

Options:
  --classic         Use Windows XP/NT style BSOD
  --reason <text>   Custom error description
  --error <index>   Select specific error code (0-${je.length-1})
  --help, -h        Display this help message

Error codes:
${je.map((u,d)=>`  ${d}: ${u.code}`).join(`
`)}

Examples:
  bsod                     # Modern style with random error
  bsod --classic           # Classic style with random error
  bsod --error 2           # Use specific error code
  bsod --reason "Custom"   # Custom error description

Note: Click anywhere or press any key to dismiss the BSOD.`};const n=t.hasFlag("classic"),r=t.getFlag("reason"),o=t.getFlag("error");let i=je[Math.floor(Math.random()*je.length)];if(o!==void 0&&o!==!0){const u=parseInt(String(o),10);!isNaN(u)&&u>=0&&u<je.length&&(i=je[u])}const a=typeof r=="string"?r:i.description;return{output:n?Qo(i.code,a):Jo(i.code,a),html:!0,clearBefore:!0,scrollBehavior:"top"}}},ti=["Chaos","Discord","Confusion","Bureaucracy","The Aftermath"],ni=["Sweetmorn","Boomtime","Pungenday","Prickle-Prickle","Setting Orange"],ri=["Mungday","Mojoday","Syadday","Zaraday","Malbowday"],ar=73,si=1166;function un(s){return s%4===0&&s%100!==0||s%400===0}function oi(s,e,t){const n=[31,28,31,30,31,30,31,31,30,31,30,31];un(s)&&(n[1]=29);let r=t;for(let o=0;o<e-1;o++)r+=n[o];return r}function ii(s){const e=s.getFullYear(),t=s.getMonth()+1,n=s.getDate(),r=e+si,o=oi(e,t,n);if(un(e)&&t===2&&n===29)return{weekday:"",season:"",dayOfSeason:0,yold:r,isStTibsDay:!0};let i=o;un(e)&&o>60&&(i=o-1);const a=Math.floor((i-1)/ar),l=ti[a],u=(i-1)%ar+1,d=(i-1)%5,g=ni[d],f=u===5?ri[a]:void 0;return{weekday:g,season:l,dayOfSeason:u,yold:r,isStTibsDay:!1,apostleDay:f}}function ai(s){return s.isStTibsDay?`St. Tib's Day, ${s.yold} YOLD`:s.apostleDay?`${s.weekday}, ${s.apostleDay}, day ${s.dayOfSeason} of ${s.season}, ${s.yold} YOLD`:`${s.weekday}, ${s.season} ${s.dayOfSeason}, ${s.yold} YOLD`}function li(s){if(/^\d{4}-\d{2}-\d{2}$/.test(s)){const e=new Date(s);if(!isNaN(e.getTime()))return e}if(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)){const e=new Date(s);if(!isNaN(e.getTime()))return e}return null}function ci(s,e,t){if(s<1||s>31||e<1||e>12||t<1)return null;const n=new Date(t,e-1,s);return isNaN(n.getTime())?null:n}const _i={name:"ddate",description:"Display date in Discordian calendar",execute:(s,e)=>{const t=new U(s);if(t.hasFlag("help"))return{output:`Usage: ddate [DATE]

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
  --help                   Display this help message`};let n;if(t.positionalCount===0)n=new Date;else if(t.positionalCount===1){const i=t.getPositional(0),a=li(i);if(!a)return{output:`ddate: invalid date '${i}'`,error:!0};n=a}else if(t.positionalCount===3){const i=parseInt(t.getPositional(0),10),a=parseInt(t.getPositional(1),10),l=parseInt(t.getPositional(2),10);if(isNaN(a)||isNaN(i)||isNaN(l))return{output:"ddate: invalid numeric date arguments",error:!0};const u=ci(a,i,l);if(!u)return{output:`ddate: invalid date ${i}/${a}/${l}`,error:!0};n=u}else return{output:`ddate: invalid arguments
Try 'ddate --help' for more information.`,error:!0};const r=ii(n);return{output:ai(r)}}},ui={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3};class di{constructor(){this.comment="",this.numChars=0,this.options={}}}const Jt=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Regular","ANSI Shadow","ANSI-Compact","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Four Tops","Fraktur","Fun Face","Fun Faces","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"];function hi(s){return/[.*+?^${}()|[\]\\]/.test(s)?"\\"+s:s}const ct=(()=>{const{FULL_WIDTH:s=0,FITTING:e,SMUSHING:t,CONTROLLED_SMUSHING:n}=ui,r={},o={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function i(m,p,c){const h=hi(m.trim().slice(-1))||"@",$=p===c-1?new RegExp(h+h+"?\\s*$"):new RegExp(h+"\\s*$");return m.replace($,"")}function a(m=-1,p=null){let c={},h,$=[[16384,"vLayout",t],[8192,"vLayout",e],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",t],[64,"hLayout",e],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];h=p!==null?p:m;for(const[E,A,I]of $)h>=E?(h-=E,c[A]===void 0&&(c[A]=I)):A!=="vLayout"&&A!=="hLayout"&&(c[A]=!1);return typeof c.hLayout>"u"?m===0?c.hLayout=e:m===-1?c.hLayout=s:c.hRule1||c.hRule2||c.hRule3||c.hRule4||c.hRule5||c.hRule6?c.hLayout=n:c.hLayout=t:c.hLayout===t&&(c.hRule1||c.hRule2||c.hRule3||c.hRule4||c.hRule5||c.hRule6)&&(c.hLayout=n),typeof c.vLayout>"u"?c.vRule1||c.vRule2||c.vRule3||c.vRule4||c.vRule5?c.vLayout=n:c.vLayout=s:c.vLayout===t&&(c.vRule1||c.vRule2||c.vRule3||c.vRule4||c.vRule5)&&(c.vLayout=n),c}function l(m,p,c=""){return m===p&&m!==c?m:!1}function u(m,p){let c="|/\\[]{}()<>";if(m==="_"){if(c.indexOf(p)!==-1)return p}else if(p==="_"&&c.indexOf(m)!==-1)return m;return!1}function d(m,p){let c="| /\\ [] {} () <>",h=c.indexOf(m),$=c.indexOf(p);if(h!==-1&&$!==-1&&h!==$&&Math.abs(h-$)!==1){const E=Math.max(h,$),A=E+1;return c.substring(E,A)}return!1}function g(m,p){let c="[] {} ()",h=c.indexOf(m),$=c.indexOf(p);return h!==-1&&$!==-1&&Math.abs(h-$)<=1?"|":!1}function f(m,p){return{"/\\":"|","\\/":"Y","><":"X"}[m+p]||!1}function T(m,p,c=""){return m===c&&p===c?c:!1}function R(m,p){return m===p?m:!1}function w(m,p){return u(m,p)}function y(m,p){return d(m,p)}function b(m,p){return m==="-"&&p==="_"||m==="_"&&p==="-"?"=":!1}function H(m,p){return m==="|"&&p==="|"?"|":!1}function v(m,p,c){return p===" "||p===""||p===c&&m!==" "?m:p}function O(m,p,c){if(c.fittingRules&&c.fittingRules.vLayout===s)return"invalid";let h,$=Math.min(m.length,p.length),E,A,I=!1,S;if($===0)return"invalid";for(h=0;h<$;h++)if(E=m.substring(h,h+1),A=p.substring(h,h+1),E!==" "&&A!==" "){if(c.fittingRules&&c.fittingRules.vLayout===e)return"invalid";if(c.fittingRules&&c.fittingRules.vLayout===t)return"end";if(H(E,A)){I=I||!1;continue}if(S=!1,S=c.fittingRules&&c.fittingRules.vRule1?R(E,A):S,S=!S&&c.fittingRules&&c.fittingRules.vRule2?w(E,A):S,S=!S&&c.fittingRules&&c.fittingRules.vRule3?y(E,A):S,S=!S&&c.fittingRules&&c.fittingRules.vRule4?b(E,A):S,I=!0,!S)return"invalid"}return I?"end":"valid"}function M(m,p,c){let h=m.length,$=m.length,E,A,I,S=1,x,P,k;for(;S<=h;){for(E=m.slice(Math.max(0,$-S),$),A=p.slice(0,Math.min(h,S)),I=A.length,k="",x=0;x<I;x++)if(P=O(E[x],A[x],c),P==="end")k=P;else if(P==="invalid"){k=P;break}else k===""&&(k="valid");if(k==="invalid"){S--;break}if(k==="end")break;k==="valid"&&S++}return Math.min(h,S)}function z(m,p,c){let h,$=Math.min(m.length,p.length),E,A,I="",S;const x=c.fittingRules||{};for(h=0;h<$;h++)E=m.substring(h,h+1),A=p.substring(h,h+1),E!==" "&&A!==" "?x.vLayout===e||x.vLayout===t?I+=v(E,A):(S=!1,S=x.vRule5?H(E,A):S,S=!S&&x.vRule1?R(E,A):S,S=!S&&x.vRule2?w(E,A):S,S=!S&&x.vRule3?y(E,A):S,S=!S&&x.vRule4?b(E,A):S,I+=S):I+=v(E,A);return I}function ne(m,p,c,h){let $=m.length,E=p.length,A=m.slice(0,Math.max(0,$-c)),I=m.slice(Math.max(0,$-c),$),S=p.slice(0,Math.min(c,E)),x,P,k,D=[],F;for(P=I.length,x=0;x<P;x++)x>=E?k=I[x]:k=z(I[x],S[x],h),D.push(k);return F=p.slice(Math.min(c,E),E),[...A,...D,...F]}function He(m,p){const c=" ".repeat(p);return m.map(h=>h+c)}function We(m,p,c){let h=m[0].length,$=p[0].length,E;return h>$?p=He(p,h-$):$>h&&(m=He(m,$-h)),E=M(m,p,c),ne(m,p,E,c)}function Se(m,p,c){const h=c.fittingRules||{};if(h.hLayout===s)return 0;let $,E=m.length,A=p.length,I=E,S=1,x=!1,P,k,D,F;if(E===0)return 0;e:for(;S<=I;){const oe=E-S;for(P=m.substring(oe,oe+S),k=p.substring(0,Math.min(S,A)),$=0;$<Math.min(S,A);$++)if(D=P.substring($,$+1),F=k.substring($,$+1),D!==" "&&F!==" "){if(h.hLayout===e){S=S-1;break e}else if(h.hLayout===t){(D===c.hardBlank||F===c.hardBlank)&&(S=S-1);break e}else if(x=!0,!(h.hRule1&&l(D,F,c.hardBlank)||h.hRule2&&u(D,F)||h.hRule3&&d(D,F)||h.hRule4&&g(D,F)||h.hRule5&&f(D,F)||h.hRule6&&T(D,F,c.hardBlank))){S=S-1;break e}}if(x)break;S++}return Math.min(I,S)}function Y(m,p,c,h){let $,E,A=[],I,S,x,P,k,D,F,oe;const Z=h.fittingRules||{};if(typeof h.height!="number")throw new Error("height is not defined.");for($=0;$<h.height;$++){F=m[$],oe=p[$],k=F.length,D=oe.length,I=k-c,S=F.slice(0,Math.max(0,I)),x="";const ge=Math.max(0,k-c);let re=F.substring(ge,ge+c),$e=oe.substring(0,Math.min(c,D));for(E=0;E<c;E++){let ie=E<k?re.substring(E,E+1):" ",Q=E<D?$e.substring(E,E+1):" ";if(ie!==" "&&Q!==" ")if(Z.hLayout===e||Z.hLayout===t)x+=v(ie,Q,h.hardBlank);else{const Ht=Z.hRule1&&l(ie,Q,h.hardBlank)||Z.hRule2&&u(ie,Q)||Z.hRule3&&d(ie,Q)||Z.hRule4&&g(ie,Q)||Z.hRule5&&f(ie,Q)||Z.hRule6&&T(ie,Q,h.hardBlank)||v(ie,Q,h.hardBlank);x+=Ht}else x+=v(ie,Q,h.hardBlank)}c>=D?P="":P=oe.substring(c,c+Math.max(0,D-c)),A[$]=S+x+P}return A}function me(m){return new Array(m).fill("")}const pe=function(m){return Math.max(...m.map(p=>p.length))};function fe(m,p,c){return m.reduce(function(h,$){return Y(h,$.fig,$.overlap||0,c)},me(p))}function Dt(m,p,c){for(let h=m.length-1;h>0;h--){const $=fe(m.slice(0,h),p,c);if(pe($)<=c.width)return{outputFigText:$,chars:m.slice(h)}}return{outputFigText:me(p),chars:m}}function Pt(m,p,c){let h,$,E=0,A,I,S,x=c.height,P=[],k,D={chars:[],overlap:E},F=[],oe,Z,ge,re,$e;if(typeof x!="number")throw new Error("height is not defined.");I=me(x);const ie=c.fittingRules||{};for(c.printDirection===1&&(m=m.split("").reverse().join("")),S=m.length,h=0;h<S;h++)if(oe=m.substring(h,h+1),Z=oe.match(/\s/),$=p[oe.charCodeAt(0)],re=null,$){if(ie.hLayout!==s){for(E=1e4,A=0;A<x;A++)E=Math.min(E,Se(I[A],$[A],c));E=E===1e4?0:E}if(c.width>0&&(c.whitespaceBreak?(ge=fe(D.chars.concat([{fig:$,overlap:E}]),x,c),re=fe(F.concat([{fig:ge,overlap:D.overlap}]),x,c),k=pe(re)):(re=Y(I,$,E,c),k=pe(re)),k>=c.width&&h>0&&(c.whitespaceBreak?(I=fe(F.slice(0,-1),x,c),F.length>1&&(P.push(I),I=me(x)),F=[]):(P.push(I),I=me(x)))),c.width>0&&c.whitespaceBreak&&((!Z||h===S-1)&&D.chars.push({fig:$,overlap:E}),Z||h===S-1)){for($e=null;re=fe(D.chars,x,c),k=pe(re),k>=c.width;)$e=Dt(D.chars,x,c),D={chars:$e.chars},P.push($e.outputFigText);k>0&&($e?F.push({fig:re,overlap:1}):F.push({fig:re,overlap:D.overlap})),Z&&(F.push({fig:$,overlap:E}),I=me(x)),h===S-1&&(I=fe(F,x,c)),D={chars:[],overlap:E};continue}I=Y(I,$,E,c)}return pe(I)>0&&P.push(I),c.showHardBlanks||P.forEach(function(Q){for(S=Q.length,A=0;A<S;A++)Q[A]=Q[A].replace(new RegExp("\\"+c.hardBlank,"g")," ")}),m===""&&P.length===0&&P.push(new Array(x).fill("")),P}const Ft=function(m,p){let c;const h=p.fittingRules||{};if(m==="default")c={hLayout:h.hLayout,hRule1:h.hRule1,hRule2:h.hRule2,hRule3:h.hRule3,hRule4:h.hRule4,hRule5:h.hRule5,hRule6:h.hRule6};else if(m==="full")c={hLayout:s,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(m==="fitted")c={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(m==="controlled smushing")c={hLayout:n,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(m==="universal smushing")c={hLayout:t,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return c},mt=function(m,p){let c={};const h=p.fittingRules||{};if(m==="default")c={vLayout:h.vLayout,vRule1:h.vRule1,vRule2:h.vRule2,vRule3:h.vRule3,vRule4:h.vRule4,vRule5:h.vRule5};else if(m==="full")c={vLayout:s,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(m==="fitted")c={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(m==="controlled smushing")c={vLayout:n,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(m==="universal smushing")c={vLayout:t,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return c},pt=function(m,p,c){c=c.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let h=c.split(`
`),$=[],E,A,I;for(A=h.length,E=0;E<A;E++)$=$.concat(Pt(h[E],r[m],p));for(A=$.length,I=$[0],E=1;E<A;E++)I=We(I,$[E],p);return I?I.join(`
`):""};function qe(m,p){let c;if(typeof structuredClone<"u"?c=structuredClone(m):c=JSON.parse(JSON.stringify(m)),c.showHardBlanks=p.showHardBlanks||!1,c.width=p.width||-1,c.whitespaceBreak=p.whitespaceBreak||!1,p.horizontalLayout){const h=Ft(p.horizontalLayout,m);h&&Object.assign(c.fittingRules,h)}if(p.verticalLayout){const h=mt(p.verticalLayout,m);h&&Object.assign(c.fittingRules,h)}return c.printDirection=p.printDirection!==null&&p.printDirection!==void 0?p.printDirection:m.printDirection,c}const W=async function(m,p,c){return W.text(m,p,c)};return W.text=async function(m,p,c){m=m+"";let h,$;typeof p=="function"?($=p,h={font:o.font}):typeof p=="string"?(h={font:p},$=c):p?(h=p,$=c):(h={font:o.font},$=c);const E=h.font||o.font;try{const A=await W.loadFont(E),I=A?pt(E,qe(A,h),m):"";return $&&$(null,I),I}catch(A){const I=A instanceof Error?A:new Error(String(A));if($)return $(I),"";throw I}},W.textSync=function(m,p){m=m+"",typeof p=="string"?p={font:p}:p=p||{};const c=p.font||o.font;let h=qe(W.loadFontSync(c),p);return pt(c,h,m)},W.metadata=async function(m,p){m=m+"";try{const c=await W.loadFont(m);if(!c)throw new Error("Error loading font.");const h=r[m]||{},$=[c,h.comment||""];return p&&p(null,c,h.comment),$}catch(c){const h=c instanceof Error?c:new Error(String(c));if(p)return p(h),null;throw h}},W.defaults=function(m){return m&&typeof m=="object"&&Object.assign(o,m),typeof structuredClone<"u"?structuredClone(o):JSON.parse(JSON.stringify(o))},W.parseFont=function(m,p,c=!0){if(r[m]&&!c)return r[m].options;p=p.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const h=new di,$=p.split(`
`),E=$.shift();if(!E)throw new Error("Invalid font file: missing header");const A=E.split(" "),I={hardBlank:A[0].substring(5,6),height:parseInt(A[1],10),baseline:parseInt(A[2],10),maxLength:parseInt(A[3],10),oldLayout:parseInt(A[4],10),numCommentLines:parseInt(A[5],10),printDirection:A[6]?parseInt(A[6],10):0,fullLayout:A[7]?parseInt(A[7],10):null,codeTagCount:A[8]?parseInt(A[8],10):null};if((I.hardBlank||"").length!==1||[I.height,I.baseline,I.maxLength,I.oldLayout,I.numCommentLines].some(P=>P==null||isNaN(P)))throw new Error("FIGlet header contains invalid values.");if(I.height==null||I.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");I.fittingRules=a(I.oldLayout,I.fullLayout),h.options=I;const x=[];for(let P=32;P<=126;P++)x.push(P);if(x.push(196,214,220,228,246,252,223),$.length<I.numCommentLines+I.height*x.length)throw new Error(`FIGlet file is missing data. Line length: ${$.length}. Comment lines: ${I.numCommentLines}. Height: ${I.height}. Num chars: ${x.length}.`);for(h.comment=$.splice(0,I.numCommentLines).join(`
`),h.numChars=0;$.length>0&&h.numChars<x.length;){const P=x[h.numChars];h[P]=$.splice(0,I.height);for(let k=0;k<I.height;k++)typeof h[P][k]>"u"?h[P][k]="":h[P][k]=i(h[P][k],k,I.height);h.numChars++}for(;$.length>0;){const P=$.shift();if(!P||P.trim()==="")break;let k=P.split(" ")[0],D;if(/^-?0[xX][0-9a-fA-F]+$/.test(k))D=parseInt(k,16);else if(/^-?0[0-7]+$/.test(k))D=parseInt(k,8);else if(/^-?[0-9]+$/.test(k))D=parseInt(k,10);else throw new Error(`Error parsing data. Invalid data: ${k}`);if(D===-1||D<-2147483648||D>2147483647){const F=D===-1?"The char code -1 is not permitted.":`The char code cannot be ${D<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${F}`)}h[D]=$.splice(0,I.height);for(let F=0;F<I.height;F++)typeof h[D][F]>"u"?h[D][F]="":h[D][F]=i(h[D][F],F,I.height);h.numChars++}return r[m]=h,I},W.loadedFonts=()=>Object.keys(r),W.clearLoadedFonts=()=>{Object.keys(r).forEach(m=>{delete r[m]})},W.loadFont=async function(m,p){if(r[m]){const c=r[m].options;return p&&p(null,c),Promise.resolve(c)}try{if(!o.fetchFontIfMissing)throw new Error(`Font is not loaded: ${m}`);const c=await fetch(`${o.fontPath}/${m}.flf`);if(!c.ok)throw new Error(`Network response was not ok: ${c.status}`);const h=await c.text(),$=W.parseFont(m,h);return p&&p(null,$),$}catch(c){const h=c instanceof Error?c:new Error(String(c));if(p)return p(h),null;throw h}},W.loadFontSync=function(m){if(r[m])return r[m].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},W.preloadFonts=async function(m,p){try{for(const c of m){const h=await fetch(`${o.fontPath}/${c}.flf`);if(!h.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${c}, status code: ${h.statusText}`);const $=await h.text();W.parseFont(c,$)}p&&p()}catch(c){const h=c instanceof Error?c:new Error(String(c));if(p){p(h);return}throw c}},W.fonts=function(m){return new Promise(function(p,c){p(Jt),m&&m(null,Jt)})},W.fontsSync=function(){return Jt},W.figFonts=r,W})(),mi=`flf2a$ 8 7 54 0 12 0 64 185
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
`,pi=`flf2a$ 6 5 16 15 10 0 18319
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
`,fi=`flf2a$ 5 4 13 15 10 0 22415
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
`,gi=`flf2a$ 6 5 16 15 13 0 24463 229
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
         `;ct.parseFont("Standard",gi);ct.parseFont("Slant",pi);ct.parseFont("Banner",mi);ct.parseFont("Small",fi);const $i={name:"figlet",description:"Convert text to ASCII art",execute:(s,e)=>{const t=new U(s);if(t.hasFlag("help"))return{output:`Usage: figlet [options] <text>

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
Try 'figlet --help' for more information.`,error:!0};const r=t.getFlag("f"),o=typeof r=="string"?r:"Standard",i=o.charAt(0).toUpperCase()+o.slice(1).toLowerCase();let a="default";t.hasFlag("c")?a="full":t.hasFlag("r")&&(a="fitted");try{return{output:ct.textSync(n,{font:i,horizontalLayout:a})}}catch(l){return l instanceof Error?l.message.includes("font")||l.message.includes("Font")||l.message.includes("FIGlet")?{output:`figlet: font '${i}' not found or invalid
Available fonts: standard, slant, banner, small`,error:!0}:{output:`figlet: ${l.message}`,error:!0}:{output:"figlet: unknown error occurred",error:!0}}}};function Ti(){const s=window.innerWidth,e=window.innerHeight,t=document.querySelector("header"),n=t?t.getBoundingClientRect().height:60,r=Math.max(400,Math.floor(s*.95)),o=Math.max(300,Math.floor(e-n));return{width:r,height:o}}function Li(s){return{name:"life",description:"Conway's Game of Life cellular automaton",execute:(e,t)=>{const n=new U(e);if(n.hasFlag("help"))return{output:`Usage: life [options]

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

Note: Animation continues until you scroll, type, or run 'clear'`};let r=2;const o=n.getFlag("speed");if(o!==void 0){const v=parseFloat(String(o));if(isNaN(v)||v<.5||v>10)return{output:`life: invalid speed '${o}'
Speed must be between 0.5 and 10.0`,error:!0};r=v}let i=.3;const a=n.getFlag("density");if(a!==void 0){const v=parseFloat(String(a));if(isNaN(v)||v<0||v>1)return{output:`life: invalid density '${a}'
Density must be between 0.0 and 1.0`,error:!0};i=v}const l=n.getFlag("pattern");let u="random";if(l!==void 0){const v=String(l),O=["random","acorn","glider","blinker"];if(!O.includes(v))return{output:`life: invalid pattern '${v}'
Valid patterns: ${O.join(", ")}`,error:!0};u=v}const d=n.getFlag("theme");let g=s.getCurrentColors();if(d!==void 0){const v=String(d),O=["green","yellow","white","light-blue","paper","dc","custom"];if(!O.includes(v))return{output:`life: invalid theme '${v}'
Valid themes: ${O.join(", ")}`,error:!0};if(v!=="custom"){const M=s.getPreset(v);M&&(g=M.colors)}}const{width:f,height:T}=Ti(),R=Math.floor(T*.8),w=g["--terminal-accent"],y=g["--terminal-dim"];return{output:`
<div class="life-container" style="background-color: ${g["--terminal-bg"]}; min-height: ${R}px;">
  <canvas id="life-canvas" class="life-grid"
          width="${f}"
          height="${T}"
          data-speed="${r}"
          data-density="${i}"
          data-pattern="${u}"
          data-accent-color="${w}"
          data-dim-color="${y}"
          style="width: 100%; height: ${R}px; display: block;">
  </canvas>
</div>
`,html:!0}}}}const lr=["#ff6b35","#ff8c42","#ffaa4f","#ffc85c","#e6e669","#c4e676","#9fe683","#7ae690","#5ad69d","#3ac6aa","#1bb6b7","#00a6c4","#0096d1","#0086de"];function dn(s,e,t,n){const r=s/t+e*n;return lr[Math.floor(Math.abs(r))%lr.length]}function Ei(s){return/<(div|span|pre)\s+(class|style)=/i.test(s)}function Ai(s,e,t){return s.split(`
`).map((n,r)=>{let o=0;return[...n].map(i=>i===" "||i==="	"?i:`<span style="color: ${dn(o++,r,e,t)}">${xe(i)}</span>`).join("")}).join(`
`)}function Ii(s,e,t){let n=0,r=0,o="",i=!1,a=!1,l="";for(const u of s)if(u==="<")i=!0,o+=u;else if(u===">")i=!1,o+=u;else if(i)o+=u;else if(u==="&")a=!0,l=u;else if(a){if(l+=u,u===";"){a=!1;const d=dn(r++,n,e,t);o+=`<span style="color: ${d}">${l}</span>`,l=""}}else if(u===`
`)o+=u,n++,r=0;else if(u===" "||u==="	")o+=u;else{const d=dn(r++,n,e,t);o+=`<span style="color: ${d}">${u}</span>`}return o}const yi={name:"lolcat",description:"Rainbow-colorize text output",execute:(s,e)=>{const t=new U(s);if(t.hasFlag("help"))return{output:`Usage: lolcat [options] [text...]

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
Spread must be between 1 and 10.`,error:!0};r=l}const o=t.getFlag("freq");let i=.3;if(typeof o=="string"){const l=parseFloat(o);if(isNaN(l)||l<.1||l>2)return{output:`lolcat: invalid freq '${o}'
Frequency must be between 0.1 and 2.0.`,error:!0};i=l}let a;if(e)a=e;else if(t.positionalCount>0)a=t.getAllPositionals().join(" ");else return{output:`lolcat: missing text input
Try 'lolcat --help' for more information.`,error:!0};return Ei(a)?{output:Ii(a,r,i),html:!0}:{output:`<pre class="lolcat-output">${Ai(a,r,i)}</pre>`,html:!0}}},hn="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";function bi(){const s=document.getElementById("terminal-output");if(!s)return{cols:80,rows:24};const e=s.getBoundingClientRect(),t=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--terminal-font-size")||"16"),n=t*.6,r=t*1.5,o=Math.floor(e.width/n),i=Math.floor(e.height/r);return{cols:Math.max(o,20),rows:Math.max(i,10)}}function Si(){return hn[Math.floor(Math.random()*hn.length)]}function Ri(s){return{name:"matrix",description:"Display Matrix digital rain animation",execute:(e,t)=>{const n=new U(e);if(n.hasFlag("help"))return{output:`Usage: matrix [options]

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

Note: Animation continues until you scroll, type, or run 'clear'`};let r=1;const o=n.getFlag("speed");if(o!==void 0){const M=parseFloat(String(o));if(isNaN(M)||M<.1||M>5)return{output:`matrix: invalid speed value '${o}'
Speed must be between 0.1 and 5.0`,error:!0};r=M}const i=n.getFlag("theme");let a=s.getCurrentColors();if(i!==void 0){const M=String(i),z=["green","yellow","white","light-blue","paper","dc","custom"];if(!z.includes(M))return{output:`matrix: invalid theme '${M}'
Valid themes: ${z.join(", ")}`,error:!0};if(M!=="custom"){const ne=s.getPreset(M);ne&&(a=ne.colors)}}const{cols:l,rows:u}=bi(),d=1.2,g=Math.floor(l/d)+5,f=Math.min(u,20),T=a["--terminal-accent"],R=a["--terminal-dim"],w=a["--terminal-bg"],y=u*1.5,b=-f*1.5,H=y,v=[];for(let M=0;M<g;M++){const z=-Math.random()*5,ne=(5+Math.random()*5)/r,He=M*d,We=[];for(let Se=0;Se<f;Se++){const Y=Se/f,me=Math.pow(Y,2),pe=Se===f-1,fe=Si();We.push(`<span class="matrix-char${pe?" matrix-char-bright":""}" data-char-index="${Se}" style="color: ${pe?T:R}; opacity: ${me};">${fe}</span>`)}v.push(`
  <div class="matrix-column" data-column-index="${M}" data-trail-length="${f}" style="
    left: ${He}em;
    animation: matrix-fall ${ne}s linear ${z}s infinite;
    --matrix-start: ${b}em;
    --matrix-end: ${H}em;
  ">${We.join("")}</div>`)}return{output:`
<div class="matrix-rain" data-matrix-chars="${hn}" style="height: ${y}em; background-color: ${w};">
${v.join("")}
</div>
`,html:!0}}}}function Ci(){return[{type:"info",text:"Broadcast message from root@darinchambers.com:"},{type:"info",text:"The system is going down for poweroff NOW!"},{type:"ok",text:"Stopped Session c1 of user darin"},{type:"ok",text:"Stopped Target - Graphical Interface"},{type:"ok",text:"Stopped Code Editor Process"},{type:"ok",text:"Stopped Docker Container Runtime"},{type:"ok",text:"Stopped OpenSSH Server"},{type:"failed",text:"Stopped Bluetooth Service (timeout)"},{type:"ok",text:"Stopped Network Manager"},{type:"ok",text:"Stopped D-Bus System Message Bus"},{type:"ok",text:"Stopped Journal Service"},{type:"ok",text:"Stopped System Logging Service"},{type:"info",text:"Sending SIGTERM to remaining processes..."},{type:"info",text:"Sending SIGKILL to remaining processes..."},{type:"ok",text:"Unmounted /home"},{type:"ok",text:"Unmounted /var"},{type:"ok",text:"Unmounted /tmp"},{type:"info",text:"All filesystems unmounted."},{type:"ok",text:"Reached target - Power-Off"}]}function Vr(s){const e=Ci(),t=150,n=e.map((a,l)=>{const u=l*t,d=`boot-line boot-line-${a.type}`,g=a.text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`<div class="${d}" style="animation-delay: ${u}ms;">${g}</div>`}),r=e.length*t,o=s?"System halted.":"Power off.";n.push(`<div class="boot-line boot-line-info" style="animation-delay: ${r}ms;">${o}</div>`);const i=r+500;return n.push(`<div class="boot-overlay" style="animation-delay: ${i}ms;" data-boot-overlay="true"><span class="boot-overlay-text">Screen off</span></div>`),n.join(`
`)}const wi={name:"shutdown",description:"Display simulated Linux shutdown sequence",execute:(s,e)=>{const t=new U(s);if(t.hasFlag("help"))return{output:`Usage: shutdown [options]

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
</div>`,html:!0,clearBefore:!0,scrollBehavior:"top"}}};function vi(s){const t=Vr(!1).split(`
`).filter(T=>!T.includes("data-boot-overlay")).join(`
`),o=25*150,i=2e3,a=o+500,l=a+i,u=Gr(s,l),d=a,g=l-300,f=`<div class="boot-overlay boot-pause-overlay" style="animation-delay: ${d}ms;" data-boot-overlay="true" data-fade-delay="${g}"><span class="boot-overlay-text">Rebooting...</span></div>`;return`${t}
<div class="boot-line boot-line-info" style="animation-delay: ${o}ms;">Rebooting...</div>
${f}
${u}`}const Ni={name:"reboot",description:"Display simulated system reboot sequence",execute:(s,e)=>{const t=new U(s);if(t.hasFlag("help"))return{output:`Usage: reboot [options]

Display a simulated system reboot sequence combining
shutdown and boot animations.

Options:
  --fast     Show abbreviated sequences
  --help     Display this help message

Examples:
  reboot          # Show full reboot sequence
  reboot --fast   # Show quick reboot sequence

Note: The full sequence takes about 10 seconds. Scroll or type to stop.`};const n=t.hasFlag("fast");return{output:`<div class="boot-sequence reboot-sequence" data-boot-type="reboot">
${vi(n)}
</div>`,html:!0,clearBefore:!0,scrollBehavior:"top"}}};class cr{static generateHeader(){return`
 ██████╗  █████╗ ██████╗ ██╗███╗   ██╗     ██████╗██╗  ██╗ █████╗ ███╗   ███╗██████╗ ███████╗██████╗ ███████╗
 ██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║    ██╔════╝██║  ██║██╔══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔════╝
 ██║  ██║███████║██████╔╝██║██╔██╗ ██║    ██║     ███████║███████║██╔████╔██║██████╔╝█████╗  ██████╔╝███████╗
 ██║  ██║██╔══██║██╔══██╗██║██║╚██╗██║    ██║     ██╔══██║██╔══██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗╚════██║
 ██████╔╝██║  ██║██║  ██║██║██║ ╚████║    ╚██████╗██║  ██║██║  ██║██║ ╚═╝ ██║██████╔╝███████╗██║  ██║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
`}static getTagline(){return"Technologist, Inventor | Building What's Next on Rock-Solid Foundations"}}const{entries:zr,setPrototypeOf:_r,isFrozen:xi,getPrototypeOf:ki,getOwnPropertyDescriptor:Oi}=Object;let{freeze:ue,seal:Te,create:mn}=Object,{apply:pn,construct:fn}=typeof Reflect<"u"&&Reflect;ue||(ue=function(e){return e});Te||(Te=function(e){return e});pn||(pn=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];return e.apply(t,r)});fn||(fn=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new e(...n)});const Et=de(Array.prototype.forEach),Mi=de(Array.prototype.lastIndexOf),ur=de(Array.prototype.pop),Qe=de(Array.prototype.push),Di=de(Array.prototype.splice),It=de(String.prototype.toLowerCase),Qt=de(String.prototype.toString),en=de(String.prototype.match),et=de(String.prototype.replace),Pi=de(String.prototype.indexOf),Fi=de(String.prototype.trim),Ee=de(Object.prototype.hasOwnProperty),ae=de(RegExp.prototype.test),tt=Hi(TypeError);function de(s){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return pn(s,e,n)}}function Hi(s){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return fn(s,t)}}function B(s,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:It;_r&&_r(s,null);let n=e.length;for(;n--;){let r=e[n];if(typeof r=="string"){const o=t(r);o!==r&&(xi(e)||(e[n]=o),r=o)}s[r]=!0}return s}function Wi(s){for(let e=0;e<s.length;e++)Ee(s,e)||(s[e]=null);return s}function Ne(s){const e=mn(null);for(const[t,n]of zr(s))Ee(s,t)&&(Array.isArray(n)?e[t]=Wi(n):n&&typeof n=="object"&&n.constructor===Object?e[t]=Ne(n):e[t]=n);return e}function nt(s,e){for(;s!==null;){const n=Oi(s,e);if(n){if(n.get)return de(n.get);if(typeof n.value=="function")return de(n.value)}s=ki(s)}function t(){return null}return t}const dr=ue(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),tn=ue(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),nn=ue(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Bi=ue(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),rn=ue(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ui=ue(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),hr=ue(["#text"]),mr=ue(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),sn=ue(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),pr=ue(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),At=ue(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Gi=Te(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Vi=Te(/<%[\w\W]*|[\w\W]*%>/gm),zi=Te(/\$\{[\w\W]*/gm),ji=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),Yi=Te(/^aria-[\-\w]+$/),jr=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),qi=Te(/^(?:\w+script|data):/i),Xi=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Yr=Te(/^html$/i),Ki=Te(/^[a-z][.\w]*(-[.\w]+)+$/i);var fr=Object.freeze({__proto__:null,ARIA_ATTR:Yi,ATTR_WHITESPACE:Xi,CUSTOM_ELEMENT:Ki,DATA_ATTR:ji,DOCTYPE_NAME:Yr,ERB_EXPR:Vi,IS_ALLOWED_URI:jr,IS_SCRIPT_OR_DATA:qi,MUSTACHE_EXPR:Gi,TMPLIT_EXPR:zi});const rt={element:1,text:3,progressingInstruction:7,comment:8,document:9},Zi=function(){return typeof window>"u"?null:window},Ji=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},gr=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qr(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Zi();const e=N=>qr(N);if(e.version="3.3.0",e.removed=[],!s||!s.document||s.document.nodeType!==rt.document||!s.Element)return e.isSupported=!1,e;let{document:t}=s;const n=t,r=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:a,Element:l,NodeFilter:u,NamedNodeMap:d=s.NamedNodeMap||s.MozNamedAttrMap,HTMLFormElement:g,DOMParser:f,trustedTypes:T}=s,R=l.prototype,w=nt(R,"cloneNode"),y=nt(R,"remove"),b=nt(R,"nextSibling"),H=nt(R,"childNodes"),v=nt(R,"parentNode");if(typeof i=="function"){const N=t.createElement("template");N.content&&N.content.ownerDocument&&(t=N.content.ownerDocument)}let O,M="";const{implementation:z,createNodeIterator:ne,createDocumentFragment:He,getElementsByTagName:We}=t,{importNode:Se}=n;let Y=gr();e.isSupported=typeof zr=="function"&&typeof v=="function"&&z&&z.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:me,ERB_EXPR:pe,TMPLIT_EXPR:fe,DATA_ATTR:Dt,ARIA_ATTR:Pt,IS_SCRIPT_OR_DATA:Ft,ATTR_WHITESPACE:mt,CUSTOM_ELEMENT:pt}=fr;let{IS_ALLOWED_URI:qe}=fr,W=null;const m=B({},[...dr,...tn,...nn,...rn,...hr]);let p=null;const c=B({},[...mr,...sn,...pr,...At]);let h=Object.seal(mn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$=null,E=null;const A=Object.seal(mn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let I=!0,S=!0,x=!1,P=!0,k=!1,D=!0,F=!1,oe=!1,Z=!1,ge=!1,re=!1,$e=!1,ie=!0,Q=!1;const Ht="user-content-";let Wt=!0,Xe=!1,Be={},Ue=null;const wn=B({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let vn=null;const Nn=B({},["audio","video","img","source","image","track"]);let Bt=null;const xn=B({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ft="http://www.w3.org/1998/Math/MathML",gt="http://www.w3.org/2000/svg",Re="http://www.w3.org/1999/xhtml";let Ge=Re,Ut=!1,Gt=null;const Jr=B({},[ft,gt,Re],Qt);let $t=B({},["mi","mo","mn","ms","mtext"]),Tt=B({},["annotation-xml"]);const Qr=B({},["title","style","font","a","script"]);let Ke=null;const es=["application/xhtml+xml","text/html"],ts="text/html";let J=null,Ve=null;const ns=t.createElement("form"),kn=function(_){return _ instanceof RegExp||_ instanceof Function},Vt=function(){let _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ve&&Ve===_)){if((!_||typeof _!="object")&&(_={}),_=Ne(_),Ke=es.indexOf(_.PARSER_MEDIA_TYPE)===-1?ts:_.PARSER_MEDIA_TYPE,J=Ke==="application/xhtml+xml"?Qt:It,W=Ee(_,"ALLOWED_TAGS")?B({},_.ALLOWED_TAGS,J):m,p=Ee(_,"ALLOWED_ATTR")?B({},_.ALLOWED_ATTR,J):c,Gt=Ee(_,"ALLOWED_NAMESPACES")?B({},_.ALLOWED_NAMESPACES,Qt):Jr,Bt=Ee(_,"ADD_URI_SAFE_ATTR")?B(Ne(xn),_.ADD_URI_SAFE_ATTR,J):xn,vn=Ee(_,"ADD_DATA_URI_TAGS")?B(Ne(Nn),_.ADD_DATA_URI_TAGS,J):Nn,Ue=Ee(_,"FORBID_CONTENTS")?B({},_.FORBID_CONTENTS,J):wn,$=Ee(_,"FORBID_TAGS")?B({},_.FORBID_TAGS,J):Ne({}),E=Ee(_,"FORBID_ATTR")?B({},_.FORBID_ATTR,J):Ne({}),Be=Ee(_,"USE_PROFILES")?_.USE_PROFILES:!1,I=_.ALLOW_ARIA_ATTR!==!1,S=_.ALLOW_DATA_ATTR!==!1,x=_.ALLOW_UNKNOWN_PROTOCOLS||!1,P=_.ALLOW_SELF_CLOSE_IN_ATTR!==!1,k=_.SAFE_FOR_TEMPLATES||!1,D=_.SAFE_FOR_XML!==!1,F=_.WHOLE_DOCUMENT||!1,ge=_.RETURN_DOM||!1,re=_.RETURN_DOM_FRAGMENT||!1,$e=_.RETURN_TRUSTED_TYPE||!1,Z=_.FORCE_BODY||!1,ie=_.SANITIZE_DOM!==!1,Q=_.SANITIZE_NAMED_PROPS||!1,Wt=_.KEEP_CONTENT!==!1,Xe=_.IN_PLACE||!1,qe=_.ALLOWED_URI_REGEXP||jr,Ge=_.NAMESPACE||Re,$t=_.MATHML_TEXT_INTEGRATION_POINTS||$t,Tt=_.HTML_INTEGRATION_POINTS||Tt,h=_.CUSTOM_ELEMENT_HANDLING||{},_.CUSTOM_ELEMENT_HANDLING&&kn(_.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(h.tagNameCheck=_.CUSTOM_ELEMENT_HANDLING.tagNameCheck),_.CUSTOM_ELEMENT_HANDLING&&kn(_.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(h.attributeNameCheck=_.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),_.CUSTOM_ELEMENT_HANDLING&&typeof _.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(h.allowCustomizedBuiltInElements=_.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),k&&(S=!1),re&&(ge=!0),Be&&(W=B({},hr),p=[],Be.html===!0&&(B(W,dr),B(p,mr)),Be.svg===!0&&(B(W,tn),B(p,sn),B(p,At)),Be.svgFilters===!0&&(B(W,nn),B(p,sn),B(p,At)),Be.mathMl===!0&&(B(W,rn),B(p,pr),B(p,At))),_.ADD_TAGS&&(typeof _.ADD_TAGS=="function"?A.tagCheck=_.ADD_TAGS:(W===m&&(W=Ne(W)),B(W,_.ADD_TAGS,J))),_.ADD_ATTR&&(typeof _.ADD_ATTR=="function"?A.attributeCheck=_.ADD_ATTR:(p===c&&(p=Ne(p)),B(p,_.ADD_ATTR,J))),_.ADD_URI_SAFE_ATTR&&B(Bt,_.ADD_URI_SAFE_ATTR,J),_.FORBID_CONTENTS&&(Ue===wn&&(Ue=Ne(Ue)),B(Ue,_.FORBID_CONTENTS,J)),Wt&&(W["#text"]=!0),F&&B(W,["html","head","body"]),W.table&&(B(W,["tbody"]),delete $.tbody),_.TRUSTED_TYPES_POLICY){if(typeof _.TRUSTED_TYPES_POLICY.createHTML!="function")throw tt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof _.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw tt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=_.TRUSTED_TYPES_POLICY,M=O.createHTML("")}else O===void 0&&(O=Ji(T,r)),O!==null&&typeof M=="string"&&(M=O.createHTML(""));ue&&ue(_),Ve=_}},On=B({},[...tn,...nn,...Bi]),Mn=B({},[...rn,...Ui]),rs=function(_){let L=v(_);(!L||!L.tagName)&&(L={namespaceURI:Ge,tagName:"template"});const C=It(_.tagName),j=It(L.tagName);return Gt[_.namespaceURI]?_.namespaceURI===gt?L.namespaceURI===Re?C==="svg":L.namespaceURI===ft?C==="svg"&&(j==="annotation-xml"||$t[j]):!!On[C]:_.namespaceURI===ft?L.namespaceURI===Re?C==="math":L.namespaceURI===gt?C==="math"&&Tt[j]:!!Mn[C]:_.namespaceURI===Re?L.namespaceURI===gt&&!Tt[j]||L.namespaceURI===ft&&!$t[j]?!1:!Mn[C]&&(Qr[C]||!On[C]):!!(Ke==="application/xhtml+xml"&&Gt[_.namespaceURI]):!1},ye=function(_){Qe(e.removed,{element:_});try{v(_).removeChild(_)}catch{y(_)}},Me=function(_,L){try{Qe(e.removed,{attribute:L.getAttributeNode(_),from:L})}catch{Qe(e.removed,{attribute:null,from:L})}if(L.removeAttribute(_),_==="is")if(ge||re)try{ye(L)}catch{}else try{L.setAttribute(_,"")}catch{}},Dn=function(_){let L=null,C=null;if(Z)_="<remove></remove>"+_;else{const q=en(_,/^[\r\n\t ]+/);C=q&&q[0]}Ke==="application/xhtml+xml"&&Ge===Re&&(_='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+_+"</body></html>");const j=O?O.createHTML(_):_;if(Ge===Re)try{L=new f().parseFromString(j,Ke)}catch{}if(!L||!L.documentElement){L=z.createDocument(Ge,"template",null);try{L.documentElement.innerHTML=Ut?M:j}catch{}}const se=L.body||L.documentElement;return _&&C&&se.insertBefore(t.createTextNode(C),se.childNodes[0]||null),Ge===Re?We.call(L,F?"html":"body")[0]:F?L.documentElement:se},Pn=function(_){return ne.call(_.ownerDocument||_,_,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},zt=function(_){return _ instanceof g&&(typeof _.nodeName!="string"||typeof _.textContent!="string"||typeof _.removeChild!="function"||!(_.attributes instanceof d)||typeof _.removeAttribute!="function"||typeof _.setAttribute!="function"||typeof _.namespaceURI!="string"||typeof _.insertBefore!="function"||typeof _.hasChildNodes!="function")},Fn=function(_){return typeof a=="function"&&_ instanceof a};function Ce(N,_,L){Et(N,C=>{C.call(e,_,L,Ve)})}const Hn=function(_){let L=null;if(Ce(Y.beforeSanitizeElements,_,null),zt(_))return ye(_),!0;const C=J(_.nodeName);if(Ce(Y.uponSanitizeElement,_,{tagName:C,allowedTags:W}),D&&_.hasChildNodes()&&!Fn(_.firstElementChild)&&ae(/<[/\w!]/g,_.innerHTML)&&ae(/<[/\w!]/g,_.textContent)||_.nodeType===rt.progressingInstruction||D&&_.nodeType===rt.comment&&ae(/<[/\w]/g,_.data))return ye(_),!0;if(!(A.tagCheck instanceof Function&&A.tagCheck(C))&&(!W[C]||$[C])){if(!$[C]&&Bn(C)&&(h.tagNameCheck instanceof RegExp&&ae(h.tagNameCheck,C)||h.tagNameCheck instanceof Function&&h.tagNameCheck(C)))return!1;if(Wt&&!Ue[C]){const j=v(_)||_.parentNode,se=H(_)||_.childNodes;if(se&&j){const q=se.length;for(let he=q-1;he>=0;--he){const we=w(se[he],!0);we.__removalCount=(_.__removalCount||0)+1,j.insertBefore(we,b(_))}}}return ye(_),!0}return _ instanceof l&&!rs(_)||(C==="noscript"||C==="noembed"||C==="noframes")&&ae(/<\/no(script|embed|frames)/i,_.innerHTML)?(ye(_),!0):(k&&_.nodeType===rt.text&&(L=_.textContent,Et([me,pe,fe],j=>{L=et(L,j," ")}),_.textContent!==L&&(Qe(e.removed,{element:_.cloneNode()}),_.textContent=L)),Ce(Y.afterSanitizeElements,_,null),!1)},Wn=function(_,L,C){if(ie&&(L==="id"||L==="name")&&(C in t||C in ns))return!1;if(!(S&&!E[L]&&ae(Dt,L))){if(!(I&&ae(Pt,L))){if(!(A.attributeCheck instanceof Function&&A.attributeCheck(L,_))){if(!p[L]||E[L]){if(!(Bn(_)&&(h.tagNameCheck instanceof RegExp&&ae(h.tagNameCheck,_)||h.tagNameCheck instanceof Function&&h.tagNameCheck(_))&&(h.attributeNameCheck instanceof RegExp&&ae(h.attributeNameCheck,L)||h.attributeNameCheck instanceof Function&&h.attributeNameCheck(L,_))||L==="is"&&h.allowCustomizedBuiltInElements&&(h.tagNameCheck instanceof RegExp&&ae(h.tagNameCheck,C)||h.tagNameCheck instanceof Function&&h.tagNameCheck(C))))return!1}else if(!Bt[L]){if(!ae(qe,et(C,mt,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&_!=="script"&&Pi(C,"data:")===0&&vn[_])){if(!(x&&!ae(Ft,et(C,mt,"")))){if(C)return!1}}}}}}}return!0},Bn=function(_){return _!=="annotation-xml"&&en(_,pt)},Un=function(_){Ce(Y.beforeSanitizeAttributes,_,null);const{attributes:L}=_;if(!L||zt(_))return;const C={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:p,forceKeepAttr:void 0};let j=L.length;for(;j--;){const se=L[j],{name:q,namespaceURI:he,value:we}=se,ze=J(q),jt=we;let ee=q==="value"?jt:Fi(jt);if(C.attrName=ze,C.attrValue=ee,C.keepAttr=!0,C.forceKeepAttr=void 0,Ce(Y.uponSanitizeAttribute,_,C),ee=C.attrValue,Q&&(ze==="id"||ze==="name")&&(Me(q,_),ee=Ht+ee),D&&ae(/((--!?|])>)|<\/(style|title|textarea)/i,ee)){Me(q,_);continue}if(ze==="attributename"&&en(ee,"href")){Me(q,_);continue}if(C.forceKeepAttr)continue;if(!C.keepAttr){Me(q,_);continue}if(!P&&ae(/\/>/i,ee)){Me(q,_);continue}k&&Et([me,pe,fe],Vn=>{ee=et(ee,Vn," ")});const Gn=J(_.nodeName);if(!Wn(Gn,ze,ee)){Me(q,_);continue}if(O&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!he)switch(T.getAttributeType(Gn,ze)){case"TrustedHTML":{ee=O.createHTML(ee);break}case"TrustedScriptURL":{ee=O.createScriptURL(ee);break}}if(ee!==jt)try{he?_.setAttributeNS(he,q,ee):_.setAttribute(q,ee),zt(_)?ye(_):ur(e.removed)}catch{Me(q,_)}}Ce(Y.afterSanitizeAttributes,_,null)},ss=function N(_){let L=null;const C=Pn(_);for(Ce(Y.beforeSanitizeShadowDOM,_,null);L=C.nextNode();)Ce(Y.uponSanitizeShadowNode,L,null),Hn(L),Un(L),L.content instanceof o&&N(L.content);Ce(Y.afterSanitizeShadowDOM,_,null)};return e.sanitize=function(N){let _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,C=null,j=null,se=null;if(Ut=!N,Ut&&(N="<!-->"),typeof N!="string"&&!Fn(N))if(typeof N.toString=="function"){if(N=N.toString(),typeof N!="string")throw tt("dirty is not a string, aborting")}else throw tt("toString is not a function");if(!e.isSupported)return N;if(oe||Vt(_),e.removed=[],typeof N=="string"&&(Xe=!1),Xe){if(N.nodeName){const we=J(N.nodeName);if(!W[we]||$[we])throw tt("root node is forbidden and cannot be sanitized in-place")}}else if(N instanceof a)L=Dn("<!---->"),C=L.ownerDocument.importNode(N,!0),C.nodeType===rt.element&&C.nodeName==="BODY"||C.nodeName==="HTML"?L=C:L.appendChild(C);else{if(!ge&&!k&&!F&&N.indexOf("<")===-1)return O&&$e?O.createHTML(N):N;if(L=Dn(N),!L)return ge?null:$e?M:""}L&&Z&&ye(L.firstChild);const q=Pn(Xe?N:L);for(;j=q.nextNode();)Hn(j),Un(j),j.content instanceof o&&ss(j.content);if(Xe)return N;if(ge){if(re)for(se=He.call(L.ownerDocument);L.firstChild;)se.appendChild(L.firstChild);else se=L;return(p.shadowroot||p.shadowrootmode)&&(se=Se.call(n,se,!0)),se}let he=F?L.outerHTML:L.innerHTML;return F&&W["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&ae(Yr,L.ownerDocument.doctype.name)&&(he="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+he),k&&Et([me,pe,fe],we=>{he=et(he,we," ")}),O&&$e?O.createHTML(he):he},e.setConfig=function(){let N=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Vt(N),oe=!0},e.clearConfig=function(){Ve=null,oe=!1},e.isValidAttribute=function(N,_,L){Ve||Vt({});const C=J(N),j=J(_);return Wn(C,j,L)},e.addHook=function(N,_){typeof _=="function"&&Qe(Y[N],_)},e.removeHook=function(N,_){if(_!==void 0){const L=Mi(Y[N],_);return L===-1?void 0:Di(Y[N],L,1)[0]}return ur(Y[N])},e.removeHooks=function(N){Y[N]=[]},e.removeAllHooks=function(){Y=gr()},e}var Qi=qr();function Rn(s){return Qi.sanitize(s,{ALLOWED_TAGS:["p","div","span","br","strong","b","em","i","u","s","a","code","pre","h1","h2","h3","h4","h5","h6","ul","ol","li","blockquote","table","thead","tbody","tr","th","td","img","canvas","button","input","select","option","label","aside","section","details","summary"],ALLOWED_ATTR:["class","id","href","target","rel","src","alt","title","width","height","type","value","checked","selected","disabled","min","max","step","placeholder","data-command","data-command-template","data-setting-type","data-color-var","data-theme","data-settings-panel","data-graph","data-graph-src","data-graph-theme","data-graph-initialized","data-graph-error","data-speed","data-density","data-pattern","data-accent-color","data-dim-color","style","open","role","aria-label","aria-labelledby","aria-describedby","aria-valuemin","aria-valuemax","aria-valuenow","aria-valuetext","aria-live","aria-atomic","aria-current"],RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1})}class ea{headerElement;constructor(e){this.headerElement=e,this.render(),this.setupClickHandler()}render(){const e=cr.generateHeader(),t=cr.getTagline();this.headerElement.innerHTML=Rn(`
      <div class="header-prompt">$ whoami | figlet | lolcat</div>
      <div class="header-ascii">
        <pre class="header-ascii-text header-clickable">${e}</pre>
      </div>
      <p class="header-tagline">${t}</p>
    `)}setupClickHandler(){this.headerElement.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("header-clickable")||t.closest(".header-clickable")){const n=new CustomEvent("terminal-command",{detail:"clear",bubbles:!0});document.dispatchEvent(n)}})}}class ta{navLinksElement;onCommandClick;activeCommand=null;constructor(e,t){this.navLinksElement=e,this.onCommandClick=t}setItems(e){this.navLinksElement.innerHTML="",e.forEach(t=>{const n=document.createElement("button");n.className="nav-link",n.type="button",n.textContent=t.label,n.setAttribute("data-command",t.command),n.setAttribute("aria-label",`Navigate to ${t.label}`),n.addEventListener("click",()=>{this.onCommandClick(t.command)}),this.navLinksElement.appendChild(n)})}addItem(e){const t=document.createElement("button");t.className="nav-link",t.type="button",t.textContent=e.label,t.setAttribute("data-command",e.command),t.setAttribute("aria-label",`Navigate to ${e.label}`),t.addEventListener("click",()=>{this.onCommandClick(e.command)}),this.navLinksElement.appendChild(t)}clear(){this.navLinksElement.innerHTML=""}setActiveItem(e){this.activeCommand=e,this.navLinksElement.querySelectorAll("button[data-command]").forEach(r=>{r.removeAttribute("aria-current")});const n=this.navLinksElement.querySelector(`button[data-command="${e}"]`);n&&n.setAttribute("aria-current","page")}getActiveCommand(){return this.activeCommand}}function na(){document.querySelectorAll("a.email-protected").forEach(e=>{if(e.dataset.protected==="true")return;const t=e.dataset.user,n=e.dataset.domain;if(!t||!n){console.warn("Email link missing data-user or data-domain attributes",e);return}e.dataset.protected="true",e.addEventListener("click",r=>{r.preventDefault();const i=`mailto:${`${t}@${n}`}`;window.location.href=i}),e.addEventListener("keydown",r=>{if(r.key==="Enter"||r.key===" "){r.preventDefault();const i=`mailto:${`${t}@${n}`}`;window.location.href=i}}),e.hasAttribute("tabindex")||e.setAttribute("tabindex","0")})}class $r{envVarManager;constructor(e){this.envVarManager=e}format(e,t){let n=e;return this.envVarManager&&(n=this.envVarManager.expandVariables(n)),n=this.expandBashEscapes(n,t),n=this.expandCustomTokens(n,t),n}expandBashEscapes(e,t){let n=e;return n=n.replace(/\\u/g,t.user),n=n.replace(/\\h/g,this.getShortHostname(t.hostname)),n=n.replace(/\\H/g,t.hostname),n=n.replace(/\\w/g,t.shortPwd),n=n.replace(/\\W/g,t.lastDir),n=n.replace(/\\\$/g,t.isRoot?"#":"$"),n=n.replace(/\\d/g,this.getDate()),n=n.replace(/\\t/g,this.getTime24()),n=n.replace(/\\T/g,this.getTime12()),n=n.replace(/\\A/g,this.getTimeShort()),n=n.replace(/\\@/g,this.getTimeAMPM()),t.historyNumber!==void 0&&(n=n.replace(/\\!/g,String(t.historyNumber))),t.commandNumber!==void 0&&(n=n.replace(/\\#/g,String(t.commandNumber))),n=n.replace(/\\\\/g,"\\"),n=n.replace(/\\n/g,`
`),n}expandCustomTokens(e,t){let n=e;return n=n.replace(/\{user\}/g,t.user),n=n.replace(/\{hostname\}/g,t.hostname),n=n.replace(/\{path\}/g,t.shortPwd),n=n.replace(/\{lastdir\}/g,t.lastDir),n=n.replace(/\{pwd\}/g,t.pwd),n}getShortHostname(e){const t=e.indexOf(".");return t>0?e.substring(0,t):e}getDate(){const e=new Date,t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r=t[e.getDay()],o=n[e.getMonth()],i=String(e.getDate()).padStart(2,"0");return`${r} ${o} ${i}`}getTime24(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}getTime12(){const e=new Date;let t=e.getHours();const n=t>=12?"PM":"AM";t=t%12||12;const r=String(t).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0"),i=String(e.getSeconds()).padStart(2,"0");return`${r}:${o}:${i} ${n}`}getTimeShort(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${t}:${n}`}getTimeAMPM(){const e=new Date;let t=e.getHours();const n=t>=12?"PM":"AM";t=t%12||12;const r=String(t).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0");return`${r}:${o} ${n}`}static getLastDir(e){if(e==="/")return"/";if(e==="~"||e==="")return"~";const t=e.split("/").filter(n=>n&&n!=="~");return t.length>0?t[t.length-1]:"~"}}class ra{inputElement;promptElement;history=[];historyIndex=-1;currentInput="";availableCommands=[];fileSystem;constructor(e,t){this.inputElement=e,this.promptElement=t,this.setupEventListeners()}setupEventListeners(){this.inputElement.addEventListener("keydown",e=>this.handleKeyDown(e))}handleKeyDown(e){switch(e.key){case"ArrowUp":e.preventDefault(),this.navigateHistory("up");break;case"ArrowDown":e.preventDefault(),this.navigateHistory("down");break;case"Tab":e.preventDefault(),this.handleTabCompletion();break}}navigateHistory(e){this.history.length!==0&&(this.historyIndex===-1&&(this.currentInput=this.inputElement.value),e==="up"?this.historyIndex<this.history.length-1&&(this.historyIndex++,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex>0?(this.historyIndex--,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex===0&&(this.historyIndex=-1,this.inputElement.value=this.currentInput))}handleTabCompletion(){const e=this.inputElement.value;if(!e)return;const t=e.split(/\s+/);t.length===1?this.completeCommand(e.trim()):this.completeFilePath(t)}completeCommand(e){const t=this.availableCommands.filter(n=>n.startsWith(e.toLowerCase()));if(t.length===1)this.inputElement.value=t[0];else if(t.length>1){const n=this.findCommonPrefix(t);n.length>e.length&&(this.inputElement.value=n)}}completeFilePath(e){if(!this.fileSystem)return;const t=e[e.length-1],n=e.slice(0,-1).join(" ");let r=this.fileSystem.getCurrentPath(),o=t;const i=t.lastIndexOf("/");if(i!==-1){const a=t.substring(0,i+1);o=t.substring(i+1),a.startsWith("/")?r=a:r=this.resolvePath(this.fileSystem.getCurrentPath(),a)}try{if(!this.fileSystem.exists(r)||!this.fileSystem.isDirectory(r))return;const l=this.fileSystem.list(r).filter(g=>g.toLowerCase().startsWith(o.toLowerCase()));if(l.length===0)return;const u=this.findCommonPrefix(l);let d;if(i!==-1?d=t.substring(0,i+1)+u:d=u,l.length===1){const g=this.resolvePath(r,l[0]);this.fileSystem.isDirectory(g)&&(d+="/")}this.inputElement.value=n+(n?" ":"")+d}catch{return}}resolvePath(e,t){if(t.startsWith("/"))return t;const n=e.split("/").filter(o=>o),r=t.split("/").filter(o=>o);for(const o of r)o===".."?n.pop():o!=="."&&n.push(o);return"/"+n.join("/")}findCommonPrefix(e){if(e.length===0)return"";if(e.length===1)return e[0];let t=e[0];for(let n=1;n<e.length;n++)for(;!e[n].startsWith(t);)if(t=t.substring(0,t.length-1),t==="")return"";return t}addToHistory(e){e.trim()&&(this.history.push(e),this.historyIndex=-1,this.currentInput="")}getValue(){return this.inputElement.value}clear(){this.inputElement.value="",this.currentInput="",this.historyIndex=-1}focus(e=!1){!e&&this.isMobileDevice()||this.inputElement.focus({preventScroll:!0})}isMobileDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0||window.matchMedia("(max-width: 768px)").matches}setPrompt(e){this.promptElement.textContent=e}setAvailableCommands(e){this.availableCommands=e}setFileSystem(e){this.fileSystem=e}getHistory(){return[...this.history]}onSubmit(e){this.inputElement.addEventListener("keydown",t=>{if(t.key==="Enter"){const n=this.getValue();e(n)}})}}class sa{outputElement;inputLineElement;screensaverElements=[];isScreensaverOutput=!1;constructor(e){this.outputElement=e,this.inputLineElement=document.getElementById("terminal-input-line")}startScreensaverOutput(){this.screensaverElements=[],this.isScreensaverOutput=!0}writeLine(e,t,n){const r=document.createElement("div");r.className="output-line"+(t?` ${t}`:""),r.textContent=e,this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),n&&n()}write(e,t,n){const r=e.split(`
`);r.forEach((o,i)=>{(i<r.length-1||o)&&this.writeLine(o,t)}),n&&n()}writeHTML(e,t){const n=document.createElement("div");n.className="output-line",n.innerHTML=Rn(e),this.isScreensaverOutput&&(this.screensaverElements.push(n),this.isScreensaverOutput=!1),this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(n,this.inputLineElement):this.outputElement.appendChild(n),t&&t()}writeError(e,t){const n=e.split(`
`);n.forEach((r,o)=>{if(o<n.length-1||r){const i=document.createElement("div");i.className="output-line output-error",i.textContent=r;const a=`error-${Date.now()}-${o}`;if(i.id=a,i.setAttribute("role","alert"),t&&o===0){const l=document.getElementById(t);if(l){const u=l.getAttribute("aria-describedby");u?l.setAttribute("aria-describedby",`${u} ${a}`):l.setAttribute("aria-describedby",a)}}this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(i,this.inputLineElement):this.outputElement.appendChild(i)}}),this.scrollToBottom()}writeCommand(e,t,n){const r=document.createElement("div");r.className="output-line";const o=document.createElement("span");o.style.color="var(--terminal-accent)",o.textContent=e;const i=document.createElement("span");i.textContent=t,r.appendChild(o),r.appendChild(i),this.isScreensaverOutput&&this.screensaverElements.push(r),this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),n&&n()}clear(){Array.from(this.outputElement.children).forEach(t=>{t.id!=="terminal-input-line"&&t.remove()})}clearScreensaverOutput(){this.screensaverElements.forEach(e=>{e.parentElement&&e.remove()}),this.screensaverElements=[],this.isScreensaverOutput=!1}scrollToBottom(){const e=this.outputElement.parentElement;e&&(e.scrollTop=e.scrollHeight)}scrollToCommand(){const e=this.outputElement.querySelectorAll(".output-line");e.length>=2?e[e.length-2].scrollIntoView({behavior:"instant",block:"start"}):this.scrollToBottom()}performScrollBehavior(e){requestAnimationFrame(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{setTimeout(()=>{e==="top"?this.scrollToCommand():this.scrollToBottom()},50)})})})}}class oa{constructor(e,t,n,r,o){this.dispatcher=e,this.executor=t,this.settingsManager=n,this.themeManager=r,this.envVarManager=o;const i=document.getElementById("terminal-output"),a=document.getElementById("terminal-input"),l=document.getElementById("terminal-prompt");if(!i||!a||!l)throw new Error("Required terminal elements not found");this.output=new sa(i),this.input=new ra(a,l),this.promptFormatter=new $r(o),this.setupInputHandler(),this.setupClickHandler(i),this.setupSettingsUIHandler(),this.setupKeyboardHandlers(),this.setupMobileViewportHandler(),this.updatePrompt()}input;output;username="darin";hostname="darinchambers.com";currentPath="~";promptFormatter;router;screensaverManager;setupClickHandler(e){e.addEventListener("click",t=>{const n=window.getSelection();if(n&&n.toString().length>0)return;const r=t.target,o=["svg","button","a","input","select","textarea","[data-graph]","[data-graph-src]",".graph-container"].join(", ");r.closest(o)||this.input.focus(!0)})}setupKeyboardHandlers(){document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelectorAll("[data-settings-panel]");if(t.length>0){const n=document.activeElement;n&&t[0].contains(n)&&(e.preventDefault(),this.input.focus(!0))}}})}setupMobileViewportHandler(){if(!window.visualViewport)return;let e=window.visualViewport.height;window.visualViewport.addEventListener("resize",()=>{const t=window.visualViewport.height;t>e&&this.scrollToHeader(),e=t})}scrollToHeader(){requestAnimationFrame(()=>{const e=document.getElementById("terminal-header");e?e.scrollIntoView({behavior:"smooth",block:"start"}):window.scrollTo({top:0,behavior:"smooth"})})}setupSettingsUIHandler(){document.addEventListener("terminal-command",e=>{const t=e;this.executeCommand(t.detail,!1)}),document.addEventListener("click",e=>{const t=e.target;if(t.closest("[data-command]")&&!t.closest(".nav-link")){const n=t.closest("[data-command]"),r=n.getAttribute("data-command");if(r){if(n.tagName==="A"&&e.preventDefault(),this.router){const o=this.router.getPathForCommand(r);if(o){this.router.navigate(o,!1);return}}this.executeCommand(r,!1)}}}),document.addEventListener("change",e=>{const t=e.target,n=t.getAttribute("data-command-template"),r=t.getAttribute("data-setting-type");if(!n)return;let o="";t instanceof HTMLInputElement&&t.type==="checkbox"?o=`${n} ${t.checked?"on":"off"}`:t instanceof HTMLInputElement&&t.type==="color"?o=`${n} ${t.value}`:t instanceof HTMLInputElement&&t.type==="range"?o=`${n} ${t.value}`:t instanceof HTMLSelectElement&&(r==="font-family"?o=`${n} "${t.value}"`:o=`${n} ${t.value}`),o&&this.executeCommand(o,!1)}),document.addEventListener("input",e=>{const t=e.target;if(t.type==="range"){const n=t.getAttribute("data-setting-type");if(n==="font-size"){const r=document.getElementById("font-size-value");r&&(r.textContent=`${t.value}px`)}else if(n==="animation-speed"){const r=document.getElementById("animation-speed-value");r&&(r.textContent=`${t.value}x`)}}}),document.addEventListener("settings-changed",()=>{this.refreshSettingsPanels(),this.updatePrompt(),this.screensaverManager?.handleSettingsChange()})}refreshSettingsPanels(){if(!this.settingsManager||!this.themeManager)return;const e=document.querySelectorAll("[data-settings-panel]");if(e.length===0)return;const t=Array.from(e).some(r=>r.contains(document.activeElement)),n=Fr(this.settingsManager,this.themeManager);if(e.forEach(r=>{const o=n.replace('<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true">',"").replace(/<\/aside>$/,"");r.innerHTML=Rn(o)}),t&&e.length>0){const o=e[0].querySelector("button, input, select");o&&o.focus()}}focusSettingsPanelIfPresent(){setTimeout(()=>{const e=document.querySelector("[data-settings-panel]");if(e){const t=e.querySelector("button, input, select");t&&t.focus()}},0)}setupInputHandler(){this.input.onSubmit(async e=>{const t=e.trim();if(this.input.clear(),this.output.writeCommand(this.getPromptString(),t),this.input.addToHistory(t),t){const n=await this.executor.execute(t);this.displayResult(n),this.router&&this.router.syncUrlToCommand(t)}setTimeout(()=>{this.input.focus(!0)},100)})}displayResult(e){e.clearBefore&&this.output.clear(),e.output===Dr.CLEAR_SCREEN?(this.output.clear(),this.router&&window.location.pathname!=="/"&&window.history.pushState({},"","/")):e.output&&!e.raw&&(e.error?this.output.writeError(e.output):e.html?(this.output.writeHTML(e.output,()=>{typeof window.initializeGraphs=="function"&&window.initializeGraphs(),na(),this.output.performScrollBehavior(e.scrollBehavior)}),this.focusSettingsPanelIfPresent()):this.output.write(e.output,void 0,()=>{this.output.performScrollBehavior(e.scrollBehavior)}))}getPromptString(){const e={user:this.username,hostname:this.hostname,pwd:this.envVarManager?.getVariable("PWD")??this.currentPath,shortPwd:this.currentPath,lastDir:$r.getLastDir(this.currentPath),isRoot:this.username==="root"},t=this.settingsManager?.getSetting("prompt")?.format??"\\u@\\h:\\W\\$ ";return this.promptFormatter.format(t,e)}updatePrompt(){this.input.setPrompt(this.getPromptString())}registerCommand(e){this.dispatcher.registerCommand(e),this.input.setAvailableCommands(this.dispatcher.getCommandNames())}registerCommands(e){e.forEach(t=>this.registerCommand(t))}setFileSystem(e){this.input.setFileSystem(e)}writeWelcome(e){this.output.write(e,void 0,()=>{this.output.performScrollBehavior()})}setUsername(e){this.username=e,this.updatePrompt()}getUsername(){return this.username}setCurrentPath(e){this.currentPath=e,this.updatePrompt()}focus(e=!1){this.input.focus(e)}getInput(){return this.input}getOutput(){return this.output}stopScreensaverAnimations(){Ts(),yr()}clearScreensaver(){this.stopScreensaverAnimations(),this.output.clearScreensaverOutput()}setRouter(e){this.router=e}setScreensaverManager(e){this.screensaverManager=e}async executeCommand(e,t=!1){if(t&&this.output.clear(),this.output.writeCommand(this.getPromptString(),e),this.input.addToHistory(e),e.trim()){const n=await this.executor.execute(e);this.displayResult(n)}this.input.clear(),this.input.focus()}}class ia{aliases=new Map;fileSystem;aliasFilePath=be.CONFIG_ALIASES;defaultAliases=new Map([["ll","ls -alh"]]);constructor(e){this.fileSystem=e,this.loadDefaultAliases(),this.loadAliases()}loadDefaultAliases(){this.defaultAliases.forEach((e,t)=>{this.aliases.set(t,e)})}loadAliases(){try{this.fileSystem.exists(this.aliasFilePath)&&this.fileSystem.isFile(this.aliasFilePath)&&this.fileSystem.readFile(this.aliasFilePath).split(`
`).filter(n=>n.trim()).forEach(n=>{const r=/^alias\s+(\S+)='(.+)'$/.exec(n);r&&this.aliases.set(r[1],r[2])})}catch{}}saveAliases(){const e=Array.from(this.aliases.entries()).map(([n,r])=>`alias ${n}='${r}'`),t=e.join(`
`)+(e.length>0?`
`:"");try{this.fileSystem.writeFile(this.aliasFilePath,t)}catch(n){throw new Error(`Failed to save aliases: ${n instanceof Error?n.message:String(n)}`)}}setAlias(e,t){if(!/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(e))throw new Error(`Invalid alias name: ${e}`);this.aliases.set(e,t),this.saveAliases()}removeAlias(e){const t=this.aliases.has(e);return t&&(this.aliases.delete(e),this.saveAliases()),t}getAlias(e){return this.aliases.get(e)}getAllAliases(){return new Map(this.aliases)}isDefaultAlias(e){return this.defaultAliases.has(e)}resolve(e){const t=/^(\S+)/.exec(e);if(!t)return e;const n=t[1],r=this.aliases.get(n);if(r){const o=e.replace(/^(\S+)/,r);return this.resolveRecursive(o,10)}return e}resolveRecursive(e,t){if(t<=0)return e;const n=/^(\S+)/.exec(e);if(!n)return e;const r=n[1],o=this.aliases.get(r);if(o){const i=e.replace(/^(\S+)/,o);return this.resolveRecursive(i,t-1)}return e}}class Tr{static parse(e){const t=e.trim();if(!t)return{command:"",args:[],raw:e};const n=this.splitCommand(t),r=n[0]?.toLowerCase()||"",o=n.slice(1);return{command:r,args:o,raw:e}}static splitCommand(e){const t=[];let n="",r=!1,o="",i=!1;for(const a of e){if(a==="\\"&&!i){i=!0;continue}if(i){n+=a,i=!1;continue}(a==='"'||a==="'")&&!r?(r=!0,o=a):a===o&&r?(r=!1,o=""):a===" "&&!r?n&&(t.push(n),n=""):n+=a}return n&&t.push(n),t}}class Nt extends Error{constructor(e){super(e),this.name="AppError",Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}}class X extends Nt{constructor(e){super(e),this.name="FileSystemError"}}class aa extends Nt{constructor(e){super(`Command not found: ${e}`),this.name="CommandNotFoundError"}}class yt{static parse(e){const t=[];let n="",r=!1,o="";for(let a=0;a<e.length;a++){const l=e[a],u=a>0?e[a-1]:"";if((l==='"'||l==="'")&&u!=="\\")r?l===o&&(r=!1,o=""):(r=!0,o=l),n+=l;else if(l==="|"&&!r){const d=n.trim();d&&t.push(d),n=""}else n+=l}const i=n.trim();return i&&t.push(i),t}static hasPipe(e){let t=!1,n="";for(let r=0;r<e.length;r++){const o=e[r],i=r>0?e[r-1]:"";if((o==='"'||o==="'")&&i!=="\\")t?o===n&&(t=!1,n=""):(t=!0,n=o);else if(o==="|"&&!t)return!0}return!1}}class la{commands=new Map;registerCommand(e){this.commands.set(e.name.toLowerCase(),e),e.aliases&&e.aliases.forEach(t=>{this.commands.set(t.toLowerCase(),e)})}unregisterCommand(e){const t=e.toLowerCase(),n=this.commands.get(t);return n?(this.commands.delete(n.name.toLowerCase()),this.commands.forEach((r,o)=>{r===n&&this.commands.delete(o)}),!0):!1}async dispatch(e){const t=Tr.parse(e);if(!t.command)return{output:""};const n=this.commands.get(t.command);if(!n)return{output:`${new aa(t.command).message}
Type 'help' for available commands.`,error:!0};try{return await n.execute(t.args)}catch(r){return r instanceof Nt?{output:r.message,error:!0}:r instanceof Error?{output:`Error: ${r.message}`,error:!0}:{output:"An unknown error occurred.",error:!0}}}async dispatchPipeline(e){const t=yt.parse(e);if(t.length===0)return{output:""};let n={output:""};for(let r=0;r<t.length;r++){const o=t[r],i=r===0?void 0:n.output,a=Tr.parse(o);if(!a.command)return{output:""};const l=this.commands.get(a.command);if(!l)return{output:`Command not found: ${a.command}
Type 'help' for available commands.`,error:!0};try{if(n=await l.execute(a.args,i),n.error)return n}catch(u){return u instanceof Nt?{output:u.message,error:!0}:u instanceof Error?{output:`Error: ${u.message}`,error:!0}:{output:"An unknown error occurred.",error:!0}}}return n}getCommands(){const e=new Map;return this.commands.forEach((t,n)=>{t.name===n&&e.set(n,t)}),Array.from(e.values())}getCommandNames(){return Array.from(this.commands.keys())}}class ca{constructor(e,t,n){this.dispatcher=e,this.aliasManager=t,this.envVarManager=n}async execute(e){const t=e.trim();if(!t)return{output:""};let n;yt.hasPipe(t)?n=yt.parse(t).map(u=>this.aliasManager.resolve(u.trim())).join(" | "):n=this.aliasManager.resolve(t);const r=this.envVarManager?this.envVarManager.expandVariables(n):n;return yt.hasPipe(r)?await this.dispatcher.dispatchPipeline(r):await this.dispatcher.dispatch(r)}}class _a{platformVars=new Map;userVars=new Map;fileSystem;constructor(e,t,n){this.fileSystem=e,this.initializePlatformVariables(t,n),this.loadUserVariables()}initializePlatformVariables(e,t){const n=`/home/${e}`;this.platformVars.set("HOME",n),this.platformVars.set("USER",e),this.platformVars.set("LOGNAME",e),this.platformVars.set("HOSTNAME",t),this.platformVars.set("PWD",n),this.platformVars.set("OLDPWD",""),this.platformVars.set("SHELL","/bin/dcsh"),this.platformVars.set("PATH","/usr/local/bin:/usr/bin:/bin"),this.platformVars.set("TERM","xterm-256color")}loadUserVariables(){try{const e=localStorage.getItem(cn.ENVIRONMENT);if(e){const t=JSON.parse(e);Object.entries(t).forEach(([n,r])=>{this.userVars.set(n,r)})}this.syncToFileSystem()}catch(e){console.warn("Failed to load environment variables from localStorage:",e)}}saveUserVariables(){try{const e={};this.userVars.forEach((t,n)=>{e[n]=t}),localStorage.setItem(cn.ENVIRONMENT,JSON.stringify(e)),this.syncToFileSystem()}catch(e){console.warn("Failed to save environment variables to localStorage:",e)}}syncToFileSystem(){try{const e=[];e.push("# Environment Variables"),e.push("# Platform variables (read-only):"),this.platformVars.forEach((n,r)=>{e.push(`${r}=${n}`)}),this.userVars.size>0&&(e.push(""),e.push("# User variables:"),this.userVars.forEach((n,r)=>{e.push(`export ${r}=${n}`)}));const t=e.join(`
`);this.fileSystem.writeFile(be.CONFIG_ENV,t)}catch(e){console.warn("Failed to sync environment variables to filesystem:",e)}}getVariable(e){return this.userVars.get(e)??this.platformVars.get(e)}setVariable(e,t){if(!/^[A-Z_][A-Z0-9_]*$/i.test(e))throw new Error(`Invalid variable name: ${e}`);this.userVars.set(e,t),this.saveUserVariables()}updatePlatformVariable(e,t){this.platformVars.has(e)&&this.platformVars.set(e,t)}unsetVariable(e){this.userVars.delete(e)&&this.saveUserVariables()}getPlatformVariables(){return new Map(this.platformVars)}getUserVariables(){return new Map(this.userVars)}getAllVariables(){const e=new Map;return this.platformVars.forEach((t,n)=>{e.set(n,t)}),this.userVars.forEach((t,n)=>{e.set(n,t)}),e}expandVariables(e){let t=e;return t=t.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/gi,(n,r)=>this.getVariable(r)??n),t=t.replace(new RegExp("(?<!\\\\)\\$([A-Z_][A-Z0-9_]*)","gi"),(n,r)=>this.getVariable(r)??n),t=t.replace(/\\\$/g,"$"),t}exportFormat(){const e=[];return this.getAllVariables().forEach((t,n)=>{e.push(`${n}=${t}`)}),e.sort()}}const ua=`---
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
`,da=Object.freeze(Object.defineProperty({__proto__:null,default:ua},Symbol.toStringTag,{value:"Module"})),ha=`---
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
`,ma=Object.freeze(Object.defineProperty({__proto__:null,default:ha},Symbol.toStringTag,{value:"Module"})),pa=`---
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
`,fa=Object.freeze(Object.defineProperty({__proto__:null,default:pa},Symbol.toStringTag,{value:"Module"})),ga=`---
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
`,$a=Object.freeze(Object.defineProperty({__proto__:null,default:ga},Symbol.toStringTag,{value:"Module"})),Ta=`---
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
`,La=Object.freeze(Object.defineProperty({__proto__:null,default:Ta},Symbol.toStringTag,{value:"Module"})),Ea=`# Darin Chambers

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

**Next Steps:** Type \`portfolio\` to see projects, \`blog\` to see the blog, or \`contact\` to get in touch.
`,Aa=Object.freeze(Object.defineProperty({__proto__:null,default:Ea},Symbol.toStringTag,{value:"Module"})),Ia=`# Contact Information

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
`,ya=Object.freeze(Object.defineProperty({__proto__:null,default:Ia},Symbol.toStringTag,{value:"Module"})),ba=`# Terminal Help

Welcome to my interactive terminal! This is a Unix-like command-line interface where you can explore my work and read my blog.

## Getting Help

- **\`help\`** - Show this help message
- **\`help <command>\`** - Show detailed help for a specific command
- **\`<command> --help\`** - Show detailed help for any command

**Example:** \`help ls\` or \`ls --help\`

## Available Commands

### Content & Navigation

- **\`about\`** - Learn about my background and expertise
- **\`portfolio\`** - View my projects and accomplishments
- **\`blog\`** - Read my blog posts and articles
- **\`contact\`** - Get in touch with me

### File System

- **\`ls\`** - List directory contents
- **\`cd\`** - Change directory
- **\`pwd\`** - Print working directory
- **\`cat\`** - Display file contents
- **\`tree\`** - Show directory structure
- **\`rm\`** - Remove files or directories
- **\`render\`** - Render markdown files

### Core Utilities

- **\`echo\`** - Display text
- **\`date\`** - Show current date/time
- **\`clear\`** - Clear the screen
- **\`history\`** - Show command history
- **\`alias\`** - Create command shortcuts
- **\`whoami\`** - Display current user
- **\`which\`** - Show path of commands

### Novelty

- **\`figlet\`** - ASCII art text banners
- **\`lolcat\`** - Rainbow-colorize text output
- **\`ddate\`** - Discordian calendar date
- **\`matrix\`** - Matrix digital rain animation
- **\`life\`** - Conway's Game of Life
- **\`boot\`** - Simulated Linux boot sequence
- **\`shutdown\`** - Simulated Linux shutdown
- **\`reboot\`** - Full reboot animation
- **\`bsod\`** - Fake Windows Blue Screen of Death

## Quick Start

Try these commands to explore:

\`\`\`
about           # Learn about me
portfolio       # See my work
blog            # Read my posts
tree            # Explore the file structure
ls ~            # List home directory
\`\`\`

## Advanced Features

**Command Piping:** Chain commands with \`|\`

\`\`\`
cat ~/blog/post.md | render
echo "Hello" | figlet
figlet "Hi" | lolcat
\`\`\`

**Navigation:** Use arrow keys for command history, Tab for auto-complete

**Aliases:** Create shortcuts with \`alias ll='ls -la'\`

---

**Tip:** For detailed help on any command, use \`<command> --help\` or \`help <command>\`
`,Sa=Object.freeze(Object.defineProperty({__proto__:null,default:ba},Symbol.toStringTag,{value:"Module"}));class Ra{static createDirectoryNode(e){const t=e.startsWith(".");return{name:e,type:"directory",children:new Map,permissions:"drwxr-xr-x",owner:"darin",size:4096,modifiedTime:new Date,isHidden:t}}static createFileNode(e,t){const n=e.startsWith(".");return{name:e,type:"file",content:t,permissions:"-rw-r--r--",owner:"darin",size:t.length,modifiedTime:new Date,isHidden:n}}static loadBlogFiles(){const e=Object.assign({"../../content/blog/2025-11-14-a-love-letter-to-developers-and-the-terminal.md":da,"../../content/blog/2025-11-15-we-trick-rocks-into-thinking.md":ma,"../../content/blog/2025-11-16-building-an-enterprise-grade-graph-library-in-one-week.md":fa,"../../content/blog/2025-11-23-leet-status-unlocked.md":$a}),t=new Map;for(const[n,r]of Object.entries(e)){const o=n.split("/").pop(),i=r.default;t.set(o,this.createFileNode(o,i))}return t}static loadPortfolioFiles(){const e=Object.assign({"../../content/portfolio/hypergrowing-a-unicorn.md":La}),t=new Map;for(const[n,r]of Object.entries(e)){const o=n.split("/").pop(),i=r.default;t.set(o,this.createFileNode(o,i))}return t}static loadContentFiles(){const e=Object.assign({"../../content/about.md":Aa,"../../content/contact.md":ya,"../../content/help.md":Sa}),t=new Map;for(const[n,r]of Object.entries(e)){const o=n.split("/").pop(),i=r.default;t.set(o,this.createFileNode(o,i))}return t}static createDefaultStructure(){const e=this.createDirectoryNode(""),t=e.children;t.set("root",this.createDirectoryNode("root"));const n=this.createDirectoryNode("home");t.set("home",n);const r=this.createDirectoryNode("guest");n.children.set("guest",r),r.children.set("README.txt",this.createFileNode("README.txt",`Welcome to darinchambers.com!

This is a terminal-inspired personal website showcasing expertise in AI and software engineering.

Type 'help' to see available commands.
Type 'cd /home/darin' to explore more.
`));const o=this.createDirectoryNode("darin");n.children.set("darin",o),o.children.set(".secret",this.createFileNode(".secret",`You found a secret! 🎉

"The best way to predict the future is to invent it." - Alan Kay

Keep exploring...
`)),o.children.set("about.txt",this.createFileNode("about.txt",`Darin Chambers
Technologist, Inventor

30 years of experience building innovative solutions.
Specializing in AI, machine learning, and software architecture.

Building What's Next on Rock-Solid Foundations.
`)),o.children.set("projects.txt",this.createFileNode("projects.txt",`Notable Projects:
- AI/ML systems
- Distributed architectures
- Developer tools
- More to come...

Type 'portfolio' for detailed information.
`)),o.children.set("contact.txt",this.createFileNode("contact.txt",`Get in touch with me!

Type 'contact' to see all contact information.
`)),o.children.set("blog.txt",this.createFileNode("blog.txt",`Recent thoughts and articles on software engineering,
AI/ML, distributed systems, and more.

Type 'blog' to read posts.
`));const i=this.createDirectoryNode("blog");o.children.set("blog",i);const a=this.loadBlogFiles();for(const[y,b]of a)i.children.set(y,b);const l=this.createDirectoryNode("content");o.children.set("content",l);const u=this.loadContentFiles();for(const[y,b]of u)l.children.set(y,b);const d=this.createDirectoryNode("portfolio");o.children.set("portfolio",d);const g=this.loadPortfolioFiles();for(const[y,b]of g)d.children.set(y,b);const f=this.createDirectoryNode("usr");t.set("usr",f);const T=this.createDirectoryNode("bin");f.children.set("bin",T),T.children.set("help",this.createFileNode("help","[Core command: help]")),T.children.set("clear",this.createFileNode("clear","[Core command: clear]")),T.children.set("history",this.createFileNode("history","[Core command: history]")),T.children.set("date",this.createFileNode("date","[Core command: date]")),T.children.set("echo",this.createFileNode("echo","[Core command: echo]")),T.children.set("whoami",this.createFileNode("whoami","[Core command: whoami]")),T.children.set("alias",this.createFileNode("alias","[Core command: alias]")),T.children.set("unalias",this.createFileNode("unalias","[Core command: unalias]")),T.children.set("env",this.createFileNode("env","[Core command: env]")),T.children.set("export",this.createFileNode("export","[Core command: export]")),T.children.set("ls",this.createFileNode("ls","[Core command: ls]")),T.children.set("cd",this.createFileNode("cd","[Core command: cd]")),T.children.set("pwd",this.createFileNode("pwd","[Core command: pwd]")),T.children.set("cat",this.createFileNode("cat","[Core command: cat]")),T.children.set("tree",this.createFileNode("tree","[Core command: tree]")),T.children.set("rm",this.createFileNode("rm","[Core command: rm]")),T.children.set("render",this.createFileNode("render","[Core command: render]")),T.children.set("which",this.createFileNode("which","[Core command: which]")),T.children.set("ddate",this.createFileNode("ddate","[Novelty command: ddate]")),T.children.set("figlet",this.createFileNode("figlet","[Novelty command: figlet]")),T.children.set("lolcat",this.createFileNode("lolcat","[Novelty command: lolcat]")),T.children.set("matrix",this.createFileNode("matrix","[Novelty command: matrix]")),T.children.set("life",this.createFileNode("life","[Novelty command: life]")),T.children.set("boot",this.createFileNode("boot","[Novelty command: boot]")),T.children.set("shutdown",this.createFileNode("shutdown","[Novelty command: shutdown]")),T.children.set("reboot",this.createFileNode("reboot","[Novelty command: reboot]")),T.children.set("bsod",this.createFileNode("bsod","[Novelty command: bsod]"));const R=this.createDirectoryNode("local");f.children.set("local",R);const w=this.createDirectoryNode("bin");return R.children.set("bin",w),w.children.set("about",this.createFileNode("about","[Custom command: about]")),w.children.set("portfolio",this.createFileNode("portfolio","[Custom command: portfolio]")),w.children.set("blog",this.createFileNode("blog","[Custom command: blog]")),w.children.set("contact",this.createFileNode("contact","[Custom command: contact]")),w.children.set("settings",this.createFileNode("settings","[Custom command: settings]")),e}}class Ca{root;currentPath;currentUsername="darin";constructor(e){this.root=e,this.currentPath=be.HOME_DARIN}getCurrentPath(){return this.currentPath}setCurrentUsername(e){this.currentUsername=e}getShortPath(){if(this.currentPath==="/")return"/";const e=`/home/${this.currentUsername}`;return this.currentPath===e?"~":this.currentPath.startsWith(e+"/")?"~"+this.currentPath.substring(e.length):this.currentPath}resolvePath(e){return e.startsWith("/")?this.normalizePath(e):e==="~"?`/home/${this.currentUsername}`:e.startsWith("~/")?`/home/${this.currentUsername}`+e.substring(1):this.normalizePath(this.currentPath+"/"+e)}normalizePath(e){const t=e.split("/").filter(r=>r.length>0),n=[];for(const r of t)r===".."?n.pop():r!=="."&&n.push(r);return"/"+n.join("/")}getNode(e){const t=this.resolvePath(e);if(t==="/")return this.root;const n=t.split("/").filter(o=>o.length>0);let r=this.root;for(const o of n){if(!r.children?.has(o))return null;r=r.children.get(o)}return r}list(e="."){const t=this.getNode(e);if(!t)throw new X(`ls: cannot access '${e}': No such file or directory`);if(t.type!=="directory")throw new X(`ls: ${e}: Not a directory`);return Array.from(t.children.keys()).sort()}changeDirectory(e){const t=this.resolvePath(e),n=this.getNode(t);if(!n)throw new X(`cd: ${e}: No such file or directory`);if(n.type!=="directory")throw new X(`cd: ${e}: Not a directory`);this.currentPath=t||"/"}readFile(e){const t=this.getNode(e);if(!t)throw new X(`cat: ${e}: No such file or directory`);if(t.type!=="file")throw new X(`cat: ${e}: Is a directory`);return t.content??""}exists(e){return this.getNode(e)!==null}isDirectory(e){const t=this.getNode(e);return t!==null&&t.type==="directory"}isFile(e){const t=this.getNode(e);return t!==null&&t.type==="file"}writeFile(e,t){const r=this.resolvePath(e).split("/").filter(l=>l.length>0),o=r.pop();if(!o)throw new X(`Invalid file path: ${e}`);let i=this.root;for(const l of r){if(!i.children?.has(l))throw new X(`Directory does not exist: ${e}`);if(i=i.children.get(l),i.type!=="directory")throw new X(`Not a directory: ${e}`)}const a={name:o,type:"file",content:t};i.children.set(o,a)}createDirectory(e){const n=this.resolvePath(e).split("/").filter(o=>o.length>0);let r=this.root;for(const o of n)if(r.children?.has(o)){const i=r.children.get(o);if(i.type!=="directory")throw new X(`mkdir: ${e}: File exists but is not a directory`);r=i}else{const i={name:o,type:"directory",children:new Map};r.children.set(o,i),r=i}}getTree(e=".",t=4){const n=this.getNode(e);if(!n)throw new X(`tree: cannot access '${e}': No such file or directory`);const r=[],o=this.resolvePath(e);return r.push(o==="/"?"/":o),n.type==="directory"&&this.buildTree(n,"",r,1,t),r}buildTree(e,t,n,r,o){if(r>o||!e.children)return;const i=Array.from(e.children.entries()).sort((a,l)=>a[1].type==="directory"&&l[1].type==="file"?-1:a[1].type==="file"&&l[1].type==="directory"?1:a[0].localeCompare(l[0]));i.forEach(([a,l],u)=>{const d=u===i.length-1,g=d?"└── ":"├── ",f=d?"    ":"│   ";n.push(t+g+a),l.type==="directory"&&this.buildTree(l,t+f,n,r+1,o)})}deleteFile(e){const t=this.resolvePath(e),n=this.getNode(t);if(!n)throw new X(`rm: cannot remove '${e}': No such file or directory`);if(n.type!=="file")throw new X(`rm: cannot remove '${e}': Is a directory`);const r=t.split("/").filter(a=>a.length>0),o=r.pop();if(!o)throw new X(`rm: cannot remove '${e}': Invalid path`);let i=this.root;for(const a of r)i=i.children.get(a);i.children.delete(o)}deleteDirectory(e,t=!1){const n=this.resolvePath(e);if(n==="/")throw new X("rm: cannot remove '/': Permission denied");const r=this.getNode(n);if(!r)throw new X(`rm: cannot remove '${e}': No such file or directory`);if(r.type!=="directory")throw new X(`rm: cannot remove '${e}': Not a directory`);if(!t&&r.children&&r.children.size>0)throw new X(`rm: cannot remove '${e}': Directory not empty`);const o=n.split("/").filter(l=>l.length>0),i=o.pop();if(!i)throw new X(`rm: cannot remove '${e}': Invalid path`);let a=this.root;for(const l of o)a=a.children.get(l);a.children.delete(i)}}class wa{terminal;routes;isNavigating=!1;onRouteChangeCallback=null;fileSystem;constructor(e,t){this.terminal=e,this.fileSystem=t,this.routes=this.initializeRoutes(),this.setupListeners()}initializeRoutes(){return[{pattern:/^\/blog\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`blog ${e[1]}`},{pattern:/^\/blog\/?$/,commandBuilder:()=>"blog"},{pattern:/^\/about\/?$/,commandBuilder:()=>"about"},{pattern:/^\/portfolio\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`portfolio ${e[1]}`},{pattern:/^\/portfolio\/?$/,commandBuilder:(e,t)=>{const n=t?.get("tags");return n?`portfolio --tags ${n}`:"portfolio"}},{pattern:/^\/contact\/?$/,commandBuilder:()=>"contact"},{pattern:/^\/settings\/?$/,commandBuilder:()=>"settings"},{pattern:/^\/help\/?$/,commandBuilder:()=>"help"},{pattern:/^\/matrix\/?$/,commandBuilder:()=>"matrix"},{pattern:/^\/life\/?$/,commandBuilder:()=>"life"},{pattern:/^\/$/,commandBuilder:()=>"about"}]}setupListeners(){window.addEventListener("popstate",()=>{this.handleRouteChange(!1)})}handleInitialRoute(){const e=sessionStorage.getItem("ghPagesRedirect");e&&(sessionStorage.removeItem("ghPagesRedirect"),window.history.replaceState({},"",e)),this.handleRouteChange(!1)}handleRouteChange(e){const t=window.location.pathname,n=new URLSearchParams(window.location.search),r=this.parseRoute(t,n);r?(this.isNavigating=!0,this.terminal.executeCommand(r,e),this.isNavigating=!1,this.onRouteChangeCallback&&this.onRouteChangeCallback(r)):this.navigate("/",!0)}parseRoute(e,t){for(const n of this.routes){const r=e.match(n.pattern);if(r)return n.commandBuilder(r,t)}return null}navigate(e,t=!0){this.isNavigating||(window.history.pushState({},"",e),this.handleRouteChange(t))}getValidBlogPostIds(){try{const e=be.CONTENT_BLOG,n=this.fileSystem.list(e).filter(o=>o.endsWith(".md")),r=new Set;for(const o of n){const i=Pr.getIdFromFilename(o);r.add(i)}return r}catch{return new Set}}getPathForCommand(e){const t=e.trim();if(t.startsWith("blog ")&&!t.includes("--tag")){const r=t.substring(5).trim();return this.getValidBlogPostIds().has(r)?`/blog/${r}`:null}if(t.startsWith("portfolio --tags ")){const r=t.substring(17).trim();return r?`/portfolio?tags=${encodeURIComponent(r)}`:"/portfolio"}return t.startsWith("portfolio ")?`/portfolio/${t.substring(10).trim()}`:{blog:"/blog",about:"/about",portfolio:"/portfolio",contact:"/contact",settings:"/settings",help:"/help",matrix:"/matrix",life:"/life"}[t]||null}syncUrlToCommand(e){const t=this.getPathForCommand(e);t&&window.location.pathname!==t&&window.history.pushState({},"",t),this.onRouteChangeCallback&&this.onRouteChangeCallback(e)}onRouteChange(e){this.onRouteChangeCallback=e}getCurrentCommand(){const e=new URLSearchParams(window.location.search);return this.parseRoute(window.location.pathname,e)}}class va{callback;debounceMs;debounceTimer=null;isMonitoring=!1;boundHandleActivity;constructor(e,t=100){this.callback=e,this.debounceMs=t,this.boundHandleActivity=this.handleActivity.bind(this)}start(){this.isMonitoring||(this.isMonitoring=!0,document.addEventListener("keydown",this.boundHandleActivity),document.addEventListener("click",this.boundHandleActivity),document.addEventListener("touchstart",this.boundHandleActivity,{passive:!0}))}stop(){this.isMonitoring&&(this.isMonitoring=!1,document.removeEventListener("keydown",this.boundHandleActivity),document.removeEventListener("click",this.boundHandleActivity),document.removeEventListener("touchstart",this.boundHandleActivity),this.debounceTimer&&(clearTimeout(this.debounceTimer),this.debounceTimer=null))}handleActivity(){this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>{this.callback(),this.debounceTimer=null},this.debounceMs)}isActive(){return this.isMonitoring}}class Na{settingsManager;terminal;idleTimer=null;state="idle";lastActivityTime=Date.now();constructor(e,t){this.settingsManager=e,this.terminal=t,this.setupVisibilityListener()}recordActivity(){if(this.lastActivityTime=Date.now(),this.state==="active"){this.deactivateScreensaver();return}this.resetIdleTimer()}startIdleTimer(){if(!this.isEnabled()){this.state="disabled";return}this.state="idle",this.resetIdleTimer()}resetIdleTimer(){if(this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null),!this.isEnabled()){this.state="disabled";return}if(this.state==="active")return;const e=this.getTimeoutMs();this.idleTimer=setTimeout(()=>{this.activateScreensaver()},e),this.state="idle"}activateScreensaver(){if(!this.isEnabled()||this.state==="active")return;const e=this.settingsManager.getActiveScreensaver();this.terminal.getOutput().startScreensaverOutput(),this.terminal.executeCommand(e,!1),this.state="active",this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null)}deactivateScreensaver(){this.state==="active"&&(this.terminal.clearScreensaver(),this.state="idle",this.resetIdleTimer())}handleSettingsChange(){this.isEnabled()?this.state==="disabled"?this.startIdleTimer():this.state==="idle"&&this.resetIdleTimer():(this.state="disabled",this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null))}isEnabled(){return this.settingsManager.getScreensaverEnabled()}getTimeoutMs(){return this.settingsManager.getScreensaverTimeout()*60*1e3}getTimeout(){return this.settingsManager.getScreensaverTimeout()}setEnabled(e){this.settingsManager.setScreensaverEnabled(e),this.handleSettingsChange()}setTimeout(e){if(e<ot.MIN_TIMEOUT_MINUTES||e>ot.MAX_TIMEOUT_MINUTES)throw new Error(`Timeout must be between ${ot.MIN_TIMEOUT_MINUTES} and ${ot.MAX_TIMEOUT_MINUTES} minutes`);this.settingsManager.setScreensaverTimeout(e),this.handleSettingsChange()}setActiveScreensaver(e){this.settingsManager.setActiveScreensaver(e)}getState(){return this.state}getIdleTime(){return Date.now()-this.lastActivityTime}setupVisibilityListener(){typeof document>"u"||document.addEventListener("visibilitychange",()=>{document.hidden?this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null):this.state==="idle"&&this.isEnabled()&&this.resetIdleTimer()})}destroy(){this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.state="disabled"}}class xa{settings;fileSystem;settingsPath=be.CONFIG_SETTINGS;storageKey=cn.SETTINGS;constructor(e){this.fileSystem=e,this.settings=this.loadFromLocalStorage()??this.getDefaults(),this.syncToFileSystem()}loadFromLocalStorage(){try{const e=localStorage.getItem(this.storageKey);if(!e)return null;const t=JSON.parse(e);return!t.theme||!t.font||!t.effects||!t.prompt?(console.warn("SettingsManager: Invalid settings structure in localStorage, using defaults"),null):(t.screensaver||(t.screensaver=or.screensaver),t)}catch(e){return console.warn("SettingsManager: Failed to load settings from localStorage:",e),null}}saveToLocalStorage(){try{const e=JSON.stringify(this.settings,null,2);localStorage.setItem(this.storageKey,e)}catch(e){throw console.error("SettingsManager: Failed to save settings to localStorage:",e),new Error(`Failed to save settings: ${e instanceof Error?e.message:String(e)}`)}}syncToFileSystem(){try{const e=JSON.stringify(this.settings,null,2);this.fileSystem.writeFile(this.settingsPath,e)}catch(e){console.error("SettingsManager: Failed to sync settings to filesystem:",e)}}getDefaults(){return JSON.parse(JSON.stringify(or))}loadSettings(){return this.settings}saveSettings(e){this.settings=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSetting(e){return this.settings[e]}setSetting(e,t){this.settings[e]=t,this.saveToLocalStorage(),this.syncToFileSystem()}getThemePreset(){return this.settings.theme.preset}setThemePreset(e){if(!this.validateThemePreset(e))throw new Error(`Invalid theme preset: ${String(e)}`);this.settings.theme.preset=e,e!=="custom"&&(this.settings.theme.customColors=void 0),this.saveToLocalStorage(),this.syncToFileSystem()}getCustomColors(){return this.settings.theme.customColors}setCustomColors(e){this.settings.theme.preset="custom",this.settings.theme.customColors=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontSize(){return this.settings.font.size}setFontSize(e){if(!this.validateFontSize(e))throw new Error(`Invalid font size: ${e}. Must be between 8 and 24.`);this.settings.font.size=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontFamily(){return this.settings.font.family}setFontFamily(e){if(!this.validateFontFamily(e))throw new Error(`Invalid font family: ${String(e)}`);this.settings.font.family=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScanLines(){return this.settings.effects.scanLines}setScanLines(e){this.settings.effects.scanLines=e,this.saveToLocalStorage(),this.syncToFileSystem()}getGlow(){return this.settings.effects.glow}setGlow(e){this.settings.effects.glow=e,this.saveToLocalStorage(),this.syncToFileSystem()}getBorder(){return this.settings.effects.border}setBorder(e){this.settings.effects.border=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAnimationSpeed(){return this.settings.effects.animationSpeed}setAnimationSpeed(e){if(!this.validateAnimationSpeed(e))throw new Error(`Invalid animation speed: ${e}. Must be between 0.5 and 2.0.`);this.settings.effects.animationSpeed=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSoundEffects(){return this.settings.effects.soundEffects}setSoundEffects(e){this.settings.effects.soundEffects=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAutoScrollBehavior(){return this.settings.effects.autoScrollBehavior}setAutoScrollBehavior(e){this.settings.effects.autoScrollBehavior=e,this.saveToLocalStorage(),this.syncToFileSystem()}getPromptFormat(){return this.settings.prompt.format}setPromptFormat(e){this.settings.prompt.format=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScreensaverEnabled(){return this.settings.screensaver.enabled}setScreensaverEnabled(e){this.settings.screensaver.enabled=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScreensaverTimeout(){return this.settings.screensaver.timeoutMinutes}setScreensaverTimeout(e){if(!this.validateScreensaverTimeout(e))throw new Error(`Invalid screensaver timeout: ${e}. Must be between 1 and 60 minutes.`);this.settings.screensaver.timeoutMinutes=e,this.saveToLocalStorage(),this.syncToFileSystem()}getActiveScreensaver(){return this.settings.screensaver.activeScreensaver}setActiveScreensaver(e){this.settings.screensaver.activeScreensaver=e,this.saveToLocalStorage(),this.syncToFileSystem()}reset(){this.settings=this.getDefaults(),localStorage.removeItem(this.storageKey),this.saveToLocalStorage(),this.syncToFileSystem()}validateThemePreset(e){return["green","yellow","white","light-blue","paper","dc","custom"].includes(e)}validateFontSize(e){return typeof e=="number"&&e>=8&&e<=24&&!isNaN(e)}validateFontFamily(e){return["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"].includes(e)}validateAnimationSpeed(e){return typeof e=="number"&&e>=.5&&e<=2&&!isNaN(e)}validateScreensaverTimeout(e){return typeof e=="number"&&e>=1&&e<=60&&!isNaN(e)}}class ka{settingsManager;presets;constructor(e){this.settingsManager=e,this.presets=new Map,this.initializePresets()}initializePresets(){[{name:"green",displayName:"Green",colors:{"--terminal-bg":"#0a0e14","--terminal-fg":"#39ff14","--terminal-accent":"#00ff99","--terminal-dim":"#20c20e","--terminal-error":"#ff3333","--terminal-cursor":"#39ff14","--terminal-bg-secondary":"#0d1117"}},{name:"yellow",displayName:"Amber",colors:{"--terminal-bg":"#1a1410","--terminal-fg":"#ffb000","--terminal-accent":"#ffd700","--terminal-dim":"#cc8800","--terminal-error":"#ff3333","--terminal-cursor":"#ffb000","--terminal-bg-secondary":"#0f0b08"}},{name:"white",displayName:"White",colors:{"--terminal-bg":"#1a1a1a","--terminal-fg":"#d4d4d4","--terminal-accent":"#88ccff","--terminal-dim":"#999999","--terminal-error":"#ff5555","--terminal-cursor":"#ffffff","--terminal-bg-secondary":"#242424"}},{name:"light-blue",displayName:"Cyan",colors:{"--terminal-bg":"#0a1420","--terminal-fg":"#00d4ff","--terminal-accent":"#00ffff","--terminal-dim":"#0088aa","--terminal-error":"#ff3333","--terminal-cursor":"#00d4ff","--terminal-bg-secondary":"#0d1825"}},{name:"paper",displayName:"Paper",colors:{"--terminal-bg":"#ffffff","--terminal-fg":"#1a1a1a","--terminal-accent":"#007298","--terminal-dim":"#666666","--terminal-error":"#cc0000","--terminal-cursor":"#1a1a1a","--terminal-bg-secondary":"#f0f0f0"}},{name:"dc",displayName:"DC",colors:{"--terminal-bg":"#110e0c","--terminal-fg":"#70dbff","--terminal-accent":"#ffa940","--terminal-dim":"#d4915e","--terminal-error":"#ff4d4d","--terminal-cursor":"#aaff66","--terminal-bg-secondary":"#1c1410"}}].forEach(t=>{this.presets.set(t.name,t)})}getPresets(){return Array.from(this.presets.values())}getPreset(e){return this.presets.get(e)??null}applyTheme(e){if(e==="custom")throw new Error('Cannot apply "custom" theme directly. Use applyCustomColors() instead.');const t=this.presets.get(e);if(!t){const n=Array.from(this.presets.keys()).join(", ");throw new Error(`Invalid theme name: ${e}. Available themes: ${n}`)}this.updateCSSVariables(t.colors),this.settingsManager.setThemePreset(e)}applyCustomColors(e){Object.entries(e).forEach(([o,i])=>{if(!this.validateColor(i))throw new Error(`Invalid color value for ${o}: ${i}. Expected hex format (e.g., #ff0000 or #f00)`)});const t=this.getCurrentColors(),n=this.mergeColors(t,e);this.updateCSSVariables(n);const r={background:n["--terminal-bg"],foreground:n["--terminal-fg"],accent:n["--terminal-accent"],dim:n["--terminal-dim"],error:n["--terminal-error"],cursor:n["--terminal-cursor"],backgroundSecondary:n["--terminal-bg-secondary"]};this.settingsManager.setCustomColors(r)}applyCurrentTheme(){const e=this.settingsManager.loadSettings(),{preset:t,customColors:n}=e.theme;if(t==="custom"&&n){const r={"--terminal-bg":n.background,"--terminal-fg":n.foreground,"--terminal-accent":n.accent,"--terminal-dim":n.dim,"--terminal-error":n.error,"--terminal-cursor":n.cursor,"--terminal-bg-secondary":n.backgroundSecondary};this.updateCSSVariables(r)}else if(t!=="custom"){const r=this.presets.get(t);if(r)this.updateCSSVariables(r.colors);else{console.warn(`ThemeManager: Unknown preset "${t}", falling back to green`);const o=this.presets.get("green");o&&this.updateCSSVariables(o.colors)}}}getCurrentColors(){if(typeof document>"u"){const n=this.presets.get("green");return n?n.colors:{}}const e=document.documentElement,t=getComputedStyle(e);return{"--terminal-bg":t.getPropertyValue("--terminal-bg").trim()||"#0a0e14","--terminal-fg":t.getPropertyValue("--terminal-fg").trim()||"#39ff14","--terminal-accent":t.getPropertyValue("--terminal-accent").trim()||"#39ff14","--terminal-dim":t.getPropertyValue("--terminal-dim").trim()||"#20c20e","--terminal-error":t.getPropertyValue("--terminal-error").trim()||"#ff3333","--terminal-cursor":t.getPropertyValue("--terminal-cursor").trim()||"#39ff14","--terminal-bg-secondary":t.getPropertyValue("--terminal-bg-secondary").trim()||"#0d1117"}}updateCSSVariables(e){if(typeof document>"u"){console.warn("ThemeManager: document not available, skipping CSS update");return}const t=document.documentElement;Object.entries(e).forEach(([n,r])=>{t.style.setProperty(n,r)})}validateColor(e){return/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e)}mergeColors(e,t){return{"--terminal-bg":t["--terminal-bg"]??e["--terminal-bg"],"--terminal-fg":t["--terminal-fg"]??e["--terminal-fg"],"--terminal-accent":t["--terminal-accent"]??e["--terminal-accent"],"--terminal-dim":t["--terminal-dim"]??e["--terminal-dim"],"--terminal-error":t["--terminal-error"]??e["--terminal-error"],"--terminal-cursor":t["--terminal-cursor"]??e["--terminal-cursor"],"--terminal-bg-secondary":t["--terminal-bg-secondary"]??e["--terminal-bg-secondary"]}}}const Xr=document.getElementById("terminal-header");if(!Xr)throw new Error("Header element not found");new ea(Xr);const Oa=Ra.createDefaultStructure(),K=new Ca(Oa),ke=new xa(K),_t=new ka(ke),ut=new _a(K,"darin","darinchambers.com");_t.applyCurrentTheme();const Lr=ke.getSetting("font");typeof document<"u"&&(document.documentElement.style.setProperty("--terminal-font-size",`${Lr.size}px`),document.documentElement.style.setProperty("--terminal-font-family",Lr.family));const Ma=ke.getScanLines();typeof document<"u"&&(Ma||document.body.classList.add("no-scan-lines"));const Da=ke.getGlow();typeof document<"u"&&(Da||document.body.classList.add("no-glow"));const Pa=ke.getBorder();typeof document<"u"&&Pa&&document.body.classList.add("border-enabled");const Fa=ke.getAnimationSpeed();typeof document<"u"&&document.documentElement.style.setProperty("--terminal-animation-speed",Fa.toString());const dt=new la,Mt=new ia(K),Ha=new ca(dt,Mt,ut),Le=new oa(dt,Ha,ke,_t,ut);Le.setCurrentPath(K.getShortPath());Le.setFileSystem(K);const Kr=document.getElementById("nav-links");if(!Kr)throw new Error("Navigation links element not found");const Wa={name:"help",description:"Display available commands",execute:async(s,e)=>{try{if(s.length>0){const r=s[0];return await dt.dispatch(`${r} --help`)}const t=K.readFile(be.CONTENT_HELP);return{output:ce.render(t),html:!0,scrollBehavior:"top"}}catch(t){return{output:t instanceof Error?t.message:String(t),error:!0}}}},Ba={name:"clear",description:"Clear the terminal screen",execute:(s,e)=>new U(s).hasFlag("help")?{output:`Usage: clear

Description:
  Clear the terminal screen and remove all output

Examples:
  clear                # Clear the screen`}:{output:Dr.CLEAR_SCREEN}},Ua=Co(K),Ga=yo(K,s=>Le.setCurrentPath(s),ut),Va=wo(K),za=Io(K),ja=ko(K),Ya=xo(K,dt),qa=Ns(Le.getInput()),Xa=Ss(Mt),Ka=$o(Mt),Za=Ao(Le),Ja=Oo(K),Qa=Po(K),el=Wo(K),tl=Do(K),nl=go(K),rl=jo(K,ke,_t),sl=ws(ut),ol=vs(ut),il=Ri(_t),al=Li(_t),ll=Lo(dt,Mt);Le.registerCommands([Wa,Ba,qa,Rs,Cs,Za,Xa,Ka,sl,ol,Ua,Ga,Va,za,ja,Ya,nl,Ja,el,tl,Qa,rl,_i,$i,yi,il,al,Zo,wi,Ni,ei,ll]);const cl=[{label:"about",command:"about"},{label:"portfolio",command:"portfolio"},{label:"blog",command:"blog"},{label:"contact",command:"contact"},{label:"settings",command:"settings"},{label:"help",command:"help"}],_l=`Type 'help' to see all commands, or click a command above to get started.
Try 'about' to learn more, 'portfolio' to see my work, or explore with 'ls'.
`;Le.writeWelcome(_l);const ht=new wa(Le,K);Le.setRouter(ht);const Cn=new ta(Kr,s=>{const t={about:"/about",portfolio:"/portfolio",blog:"/blog",contact:"/contact",skills:"/skills",settings:"/settings",help:"/help"}[s];t?ht.navigate(t,!0):Le.executeCommand(s,!0)});Cn.setItems(cl);ht.onRouteChange(s=>{Cn.setActiveItem(s)});ht.handleInitialRoute();const Er=ht.getCurrentCommand();Er&&Cn.setActiveItem(Er);Es();$s();as();hs();bs();const xt=new Na(ke,Le);Le.setScreensaverManager(xt);const ul=new va(()=>xt.recordActivity(),ot.ACTIVITY_DEBOUNCE_MS);ul.start();xt.isEnabled()&&xt.startIdleTimer();async function Zr(){if(typeof window.SVGGraphNetwork>"u"){console.warn("SVGGraphNetwork library not loaded");return}document.querySelectorAll("[data-graph]").forEach(t=>{if(t.hasAttribute("data-graph-initialized"))return;const n=t,r=n.id||"unknown";try{const o=t.getAttribute("data-graph");if(!o){console.warn(`Graph container ${r} has no data-graph attribute`);return}const i=JSON.parse(o),a=t.getAttribute("data-graph-theme");a&&i&&typeof i=="object"&&"config"in i&&(i.config.theme=a),new window.SVGGraphNetwork(n.id||n,i),t.setAttribute("data-graph-initialized","true")}catch(o){console.error(`Failed to initialize graph ${r}:`,o),t.setAttribute("data-graph-initialized","true"),t.setAttribute("data-graph-error","true")}});const e=document.querySelectorAll("[data-graph-src]");for(const t of e){if(t.hasAttribute("data-graph-initialized"))continue;const n=t,r=n.id||"unknown",o=t.getAttribute("data-graph-src");if(!o){console.warn(`Graph container ${r} has no data-graph-src attribute`);continue}try{const i=await fetch(o);if(!i.ok)throw new Error(`Failed to fetch ${o}: ${i.statusText}`);const a=await i.json(),l=t.getAttribute("data-graph-theme");l&&a&&typeof a=="object"&&"config"in a&&(a.config.theme=l),new window.SVGGraphNetwork(n.id||n,a),t.setAttribute("data-graph-initialized","true")}catch(i){console.error(`Failed to initialize graph ${r} from ${o}:`,i),t.setAttribute("data-graph-initialized","true"),t.setAttribute("data-graph-error","true")}}}Zr();window.initializeGraphs=Zr;
