var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=new Map;function r(){n.forEach(e=>{e.stopAnimation()}),n.clear(),document.querySelectorAll(`.boot-overlay`).forEach(e=>{e.remove()})}function i(e){e.style.animation=`boot-overlay-fade 0.3s ease forwards`,e.addEventListener(`animationend`,()=>{e.remove()},{once:!0}),setTimeout(()=>{e.parentNode&&e.remove()},500)}function a(e){r();let t=e.dataset.bootType??`boot`;t===`boot`&&document.querySelectorAll(`.boot-overlay`).forEach(e=>{i(e)});let a={element:e,bootType:t,overlay:null,cleanupFns:[],stopAnimation:()=>{a.cleanupFns.forEach(e=>e()),a.cleanupFns=[],a.overlay?.parentNode&&(i(a.overlay),a.overlay=null),n.delete(e)}};if(n.set(e,a),t===`shutdown`||t===`reboot`){let t=e.querySelector(`[data-boot-overlay]`);if(t){a.overlay=t;let r=getComputedStyle(t).animationDelay,i=parseFloat(r)*(r.includes(`ms`)?1:1e3);setTimeout(()=>{n.has(e)&&t.parentNode&&document.body.appendChild(t)},i)}}o(e,a)}function o(e,t){let r=document.getElementById(`terminal-output`);if(r){let e=()=>{t.stopAnimation()};r.addEventListener(`scroll`,e,{once:!0}),t.cleanupFns.push(()=>{r.removeEventListener(`scroll`,e)})}let i=e=>{e.key===`Shift`||e.key===`Control`||e.key===`Alt`||e.key===`Meta`||t.stopAnimation()};setTimeout(()=>{n.has(e)&&(document.addEventListener(`keydown`,i,{once:!0}),t.cleanupFns.push(()=>{document.removeEventListener(`keydown`,i)}))},100);let a=()=>{t.stopAnimation()};setTimeout(()=>{n.has(e)&&(document.addEventListener(`click`,a,{once:!0}),t.cleanupFns.push(()=>{document.removeEventListener(`click`,a)}))},100);let o=new MutationObserver(()=>{e.nextElementSibling&&(t.stopAnimation(),o.disconnect())});r&&(o.observe(r,{childList:!0,subtree:!0}),t.cleanupFns.push(()=>{o.disconnect()}));let s=new MutationObserver(()=>{document.body.contains(e)||(t.stopAnimation(),s.disconnect())});s.observe(document.body,{childList:!0,subtree:!0}),t.cleanupFns.push(()=>{s.disconnect()})}function s(){let e=new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{if(e.nodeType===Node.ELEMENT_NODE){let t=e;t.classList.contains(`boot-sequence`)&&a(t),t.querySelectorAll(`.boot-sequence`).forEach(e=>{a(e)})}})})}),t=document.getElementById(`terminal-output`);t&&e.observe(t,{childList:!0,subtree:!0}),document.querySelectorAll(`.boot-sequence`).forEach(e=>{a(e)})}var c=new Map;function l(){c.forEach(e=>{e.stopAnimation()}),c.clear(),document.querySelectorAll(`.bsod-overlay`).forEach(e=>{e.remove()})}function u(e){e.style.animation=`bsod-fade-out 0.3s ease forwards`,e.addEventListener(`animationend`,()=>{e.remove()},{once:!0}),setTimeout(()=>{e.parentNode&&e.remove()},500)}function d(e,t){let n=e.querySelector(`[data-bsod-progress]`);if(!n)return;let r=0,i=setInterval(()=>{if(!c.has(e)){clearInterval(i);return}r=(r+1)%101,n.textContent=String(r)},100);t.cleanupFns.push(()=>{clearInterval(i)})}function f(e,t){let n=e.querySelector(`[data-bsod-cursor]`);if(!n)return;let r=!0,i=setInterval(()=>{if(!c.has(e)){clearInterval(i);return}r=!r,n.style.visibility=r?`visible`:`hidden`},530);t.cleanupFns.push(()=>{clearInterval(i)})}function p(e){l();let t=e.dataset.bsodStyle??`modern`,n={element:e,style:t,cleanupFns:[],stopAnimation:()=>{n.cleanupFns.forEach(e=>e()),n.cleanupFns=[],e.parentNode&&u(e),c.delete(e)}};c.set(e,n),document.body.appendChild(e),t===`modern`?d(e,n):f(e,n),m(e,n)}function m(e,t){let n=document.getElementById(`terminal-output`),r=e=>{e.key===`Shift`||e.key===`Control`||e.key===`Alt`||e.key===`Meta`||t.stopAnimation()};setTimeout(()=>{c.has(e)&&(document.addEventListener(`keydown`,r,{once:!0}),t.cleanupFns.push(()=>{document.removeEventListener(`keydown`,r)}))},100);let i=()=>{t.stopAnimation()};setTimeout(()=>{c.has(e)&&(document.addEventListener(`click`,i,{once:!0}),t.cleanupFns.push(()=>{document.removeEventListener(`click`,i)}))},100);let a=new MutationObserver(n=>{for(let r of n)for(let n of r.addedNodes)if(n!==e&&n.nodeType===Node.ELEMENT_NODE){t.stopAnimation(),a.disconnect();return}});n&&(a.observe(n,{childList:!0,subtree:!0}),t.cleanupFns.push(()=>{a.disconnect()}));let o=new MutationObserver(()=>{document.body.contains(e)||(t.stopAnimation(),o.disconnect())});o.observe(document.body,{childList:!0,subtree:!0}),t.cleanupFns.push(()=>{o.disconnect()})}function h(){let e=new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{if(e.nodeType===Node.ELEMENT_NODE){let t=e;t.hasAttribute(`data-bsod`)&&p(t),t.querySelectorAll(`[data-bsod]`).forEach(e=>{p(e)})}})})}),t=document.getElementById(`terminal-output`);t&&e.observe(t,{childList:!0,subtree:!0}),document.querySelectorAll(`[data-bsod]`).forEach(e=>{p(e)})}var g=new Map;function _(e,t){return{width:e,height:t,cells:new Uint8Array(e*t),generation:0}}function v(e,t,n){return e.cells[n*e.width+t]}function y(e,t,n,r){e.cells[n*e.width+t]=r}function b(e,t){return(e%t+t)%t}function x(e,t,n){let r=0;for(let i=-1;i<=1;i++)for(let a=-1;a<=1;a++)a===0&&i===0||v(e,b(t+a,e.width),b(n+i,e.height))>0&&r++;return r}function S(e){let t=_(e.width,e.height);t.generation=e.generation+1;for(let n=0;n<e.height;n++)for(let r=0;r<e.width;r++){let i=x(e,r,n);v(e,r,n)>0?y(t,r,n,+(i===2||i===3)):y(t,r,n,i===3?2:0)}return t}function ee(e,t){for(let n=0;n<e.cells.length;n++)e.cells[n]=+(Math.random()<t)}function C(e,t){let n=Math.floor(e.width/2),r=Math.floor(e.height/2);switch(t){case`acorn`:y(e,n+1,r-1,1),y(e,n+3,r,1),y(e,n,r+1,1),y(e,n+1,r+1,1),y(e,n+4,r+1,1),y(e,n+5,r+1,1),y(e,n+6,r+1,1);break;case`glider`:y(e,n+1,r-1,1),y(e,n-1,r,1),y(e,n+1,r,1),y(e,n,r+1,1),y(e,n+1,r+1,1);break;case`blinker`:y(e,n-1,r,1),y(e,n,r,1),y(e,n+1,r,1);break;default:ee(e,.3)}}function te(){let e=getComputedStyle(document.documentElement);return{accent:e.getPropertyValue(`--terminal-accent`).trim(),dim:e.getPropertyValue(`--terminal-dim`).trim(),bg:e.getPropertyValue(`--terminal-bg`).trim()}}function ne(e,t,n,r,i){e.fillStyle=n.bg,e.fillRect(0,0,e.canvas.width,e.canvas.height);for(let a=0;a<t.height;a++)for(let o=0;o<t.width;o++){let s=v(t,o,a);s!==0&&(e.fillStyle=s===2?n.accent:n.dim,e.globalAlpha=s===2?1:.7,e.fillRect(o*r,a*i,r,i))}e.globalAlpha=1}function w(){g.forEach(e=>{e.stopAnimation()}),g.clear()}function re(e,t){let n=()=>{t.stopAnimation()};window.addEventListener(`scroll`,n,{once:!0});let r=new MutationObserver(e=>{for(let n of e)if(n.type===`childList`&&n.addedNodes.length>0){for(let e of n.addedNodes)if(e instanceof HTMLElement&&e.classList.contains(`output-line`)){t.stopAnimation(),r.disconnect();return}}}),i=document.querySelector(`.terminal-output`);i&&r.observe(i,{childList:!0});let a=new MutationObserver(()=>{document.body.contains(e)||(t.stopAnimation(),a.disconnect())});a.observe(document.body,{childList:!0,subtree:!0});let o=t.stopAnimation;t.stopAnimation=()=>{window.removeEventListener(`scroll`,n),r.disconnect(),a.disconnect(),o()}}function ie(e,t,n,r){w();let i=e.getContext(`2d`);if(!i)return;let a=e.dataset.speed,o=e.dataset.density,s=e.dataset.pattern,c=a?parseFloat(a):t,l=o?parseFloat(o):n,u=s??r,d=Math.floor(e.width/10),f=Math.floor(e.height/10),p=e.width/d,m=e.height/f,h=_(d,f);u&&u!==`random`?C(h,u):ee(h,l);let v={animationId:null,grid:h,canvas:e,speed:c,lastUpdate:performance.now(),cellWidth:p,cellHeight:m,stopAnimation:()=>{v.animationId!==null&&(cancelAnimationFrame(v.animationId),v.animationId=null),g.delete(e)}};g.set(e,v);let y=te();ne(i,v.grid,y,v.cellWidth,v.cellHeight);function b(e){if(!v.animationId)return;let t=1e3/v.speed;if(e-v.lastUpdate>=t){v.grid=S(v.grid);let t=te();i&&ne(i,v.grid,t,v.cellWidth,v.cellHeight),v.lastUpdate=e}v.animationId=requestAnimationFrame(b)}v.animationId=requestAnimationFrame(b),re(e,v)}function T(){new MutationObserver(e=>{for(let t of e)if(t.type===`childList`){for(let e of t.addedNodes)if(e instanceof HTMLElement){e.classList.contains(`life-grid`)&&e instanceof HTMLCanvasElement&&ie(e,2,.3);let t=e.querySelectorAll(`.life-grid`);t.length>0&&requestAnimationFrame(()=>{t.forEach(e=>{ie(e,2,.3)})})}}}).observe(document.body,{childList:!0,subtree:!0})}function ae(){return typeof window<`u`&&typeof window.matchMedia==`function`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}var oe=new Map;function se(){oe.forEach(e=>{e.stopAnimation()}),oe.clear(),document.querySelectorAll(`.matrix-rain`).forEach(e=>{e.querySelectorAll(`.matrix-column`).forEach(e=>{e.style.animationPlayState=`paused`})})}function ce(e){oe.forEach((e,t)=>{e.stopAnimation(),t.querySelectorAll(`.matrix-column`).forEach(e=>{e.style.animationPlayState=`paused`})}),oe.clear();let t=e.dataset.matrixChars??``;if(!t){console.warn(`[Matrix] No character set found in data-matrix-chars`);return}if(ae())return;let n={animationId:null,frameCount:0,matrixChars:t,rainElement:e,stopAnimation:()=>{n.animationId&&=(cancelAnimationFrame(n.animationId),null),oe.delete(e)}};oe.set(e,n);function r(){return t[Math.floor(Math.random()*t.length)]}function i(){n.frameCount++,e.querySelectorAll(`.matrix-column`).forEach(e=>{let t=e.querySelectorAll(`.matrix-char`),i=parseInt(e.dataset.trailLength??`20`);t.forEach((e,t)=>{if(e.classList.contains(`matrix-char-bright`))(n.frameCount%45==0||n.frameCount%60==0&&Math.random()<.5)&&(e.textContent=r());else{let a=i-t-1,o=Math.max(8,Math.floor(a/2));n.frameCount%o===0&&Math.random()<.3&&(e.textContent=r())}})}),n.animationId=requestAnimationFrame(i)}n.animationId=requestAnimationFrame(i),le(e,n)}function le(e,t){let n=document.getElementById(`terminal-output`);n&&n.addEventListener(`scroll`,()=>{t.stopAnimation()},{once:!0});let r=new MutationObserver(()=>{e.nextElementSibling&&(t.stopAnimation(),r.disconnect())});n&&r.observe(n,{childList:!0,subtree:!0});let i=new MutationObserver(()=>{document.body.contains(e)||(t.stopAnimation(),i.disconnect())});i.observe(document.body,{childList:!0,subtree:!0})}function E(){let e=new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{if(e.nodeType===Node.ELEMENT_NODE){let t=e;t.classList.contains(`matrix-rain`)&&ce(t),t.querySelectorAll(`.matrix-rain`).forEach(e=>{ce(e)})}})})}),t=document.getElementById(`terminal-output`);t&&e.observe(t,{childList:!0,subtree:!0}),document.querySelectorAll(`.matrix-rain`).forEach(e=>{ce(e)})}var D=new Map;function ue(e){return()=>(e=e*1103515245+12345&2147483647,e/2147483647)}function de(){D.forEach(e=>{e.cleanupFns.forEach(e=>e()),e.styleElement.remove(),e.container.remove()}),D.clear(),document.querySelectorAll(`.melt-container`).forEach(e=>e.remove()),document.querySelectorAll(`style[data-melt-styles]`).forEach(e=>e.remove())}function fe(e,t,n){let r=/linear-gradient\(\s*(\d+)deg\s*,\s*(.+)\)/.exec(t);if(!r)return null;parseInt(r[1]);let i=r[2],a,o,s,c;a=n.left,o=n.top,s=n.right,c=n.top;let l=e.createLinearGradient(a,o,s,c),u=i.matchAll(/(#[0-9a-fA-F]{6}|rgb[a]?\([^)]+\))\s*(\d+)?%?/g);for(let e of u){let t=e[1],n=e[2]?parseInt(e[2])/100:0;try{l.addColorStop(n,t)}catch{}}return l}function pe(e,t,n,r){try{let i=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,null),a;for(;a=i.nextNode();){let t=a.textContent||``;if(!t.trim())continue;let i=a.parentElement;if(!i)continue;let o=getComputedStyle(i),s=o.fontSize,c=o.fontFamily,l=o.fontWeight,u=document.createRange();if(u.selectNodeContents(a),typeof u.getClientRects!=`function`)continue;let d=u.getClientRects();if(d.length===0)continue;let f=(o.getPropertyValue(`-webkit-background-clip`)||o.backgroundClip)===`text`,p=o.color||r;if(f){let t=i.getBoundingClientRect(),n=o.backgroundImage;if(n?.includes(`linear-gradient`)){let r=fe(e,n,t);r&&(p=r)}}e.fillStyle=p,e.font=`${parseInt(l)>=600?`bold `:``}${s} ${c||n}`;for(let n of d)n.width>0&&n.height>0&&e.fillText(t,n.left,n.top+n.height*.85)}}catch{}}function me(){let e=window.innerWidth,t=window.innerHeight,n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`),i=getComputedStyle(document.documentElement),a=i.getPropertyValue(`--terminal-bg`).trim()||`#0a0a0a`,o=i.getPropertyValue(`--terminal-fg`).trim()||`#00ff00`,s=i.getPropertyValue(`--terminal-font-family`)||`monospace`;r.fillStyle=a,r.fillRect(0,0,e,t);let c=document.querySelector(`header`);c&&pe(r,c,s,o);let l=document.getElementById(`terminal-output`);l&&pe(r,l,s,o);let u=document.querySelector(`.terminal-input-container`);return u&&pe(r,u,s,o),n}function he(e){de();let t=window.innerWidth,n=window.innerHeight,r=document.createElement(`style`);r.setAttribute(`data-melt-styles`,``),r.textContent=`
    @keyframes melt-drop {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      100% {
        transform: translateY(${n*1.5}px);
        opacity: 0.4;
      }
    }
    @keyframes melt-message-fade {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `,document.head.appendChild(r);let i=document.createElement(`div`);i.className=`melt-container`;let a=me().toDataURL(`image/png`),o=Math.ceil(t/12),s=ue(Date.now());for(let e=0;e<o;e++){let r=document.createElement(`div`);r.className=`melt-column`,r.style.left=`${e*12}px`,r.style.width=`12px`,r.style.height=`${n}px`,r.style.backgroundImage=`url(${a})`,r.style.backgroundPosition=`-${e*12}px 0`,r.style.backgroundSize=`${t}px ${n}px`;let c=Math.abs(e-o/2)/(o/2)*.4+s()*.3,l=2.5+s()*1.5;r.style.animation=`melt-drop ${l}s ease-in ${c}s forwards`,i.appendChild(r)}let c=document.createElement(`div`);c.className=`melt-message`,c.textContent=`yeah, you probably shouldn't do that`,c.style.animation=`melt-message-fade 0.5s ease-out 2s forwards`,i.appendChild(c),document.body.appendChild(i);let l={container:i,styleElement:r,cleanupFns:[]};D.set(e,l);let u=setTimeout(()=>{D.has(e)&&de()},6500);l.cleanupFns.push(()=>clearTimeout(u)),setTimeout(()=>{if(!D.has(e))return;let t=()=>de(),n=e=>{[`Shift`,`Control`,`Alt`,`Meta`].includes(e.key)||t()},r=()=>t();document.addEventListener(`keydown`,n,{once:!0}),document.addEventListener(`click`,r,{once:!0}),l.cleanupFns.push(()=>{document.removeEventListener(`keydown`,n),document.removeEventListener(`click`,r)})},500)}function ge(){let e=new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{if(e.nodeType===Node.ELEMENT_NODE){let t=e;t.hasAttribute(`data-melt`)&&he(t),t.querySelectorAll(`[data-melt]`).forEach(e=>{he(e)})}})})}),t=document.getElementById(`terminal-output`);t&&e.observe(t,{childList:!0,subtree:!0}),e.observe(document.body,{childList:!0,subtree:!0})}var O=class e{flags=new Map;positionals=[];static VALUE_FLAGS=new Set([`f`,`L`,`w`]);constructor(t){let n=[];for(let e of t)if(e.startsWith(`-`)&&!e.startsWith(`--`)&&e.length>2)for(let t=1;t<e.length;t++)n.push(`-${e[t]}`);else n.push(e);for(let t=0;t<n.length;t++){let r=n[t];if(r.startsWith(`--`)){let e=r.substring(2),i=n[t+1];i!==void 0&&!i.startsWith(`--`)&&!i.startsWith(`-`)?(this.flags.set(e,i),t++):this.flags.set(e,!0)}else if(r.startsWith(`-`)&&r.length===2){let i=r.substring(1),a=n[t+1];a!==void 0&&!a.startsWith(`-`)&&(e.VALUE_FLAGS.has(i)||/^\d+$/.test(a))?(this.flags.set(i,a),t++):this.flags.set(i,!0)}else this.positionals.push(r)}}getFlag(e){return this.flags.get(e)}hasFlag(e){return this.flags.has(e)}getPositional(e){return this.positionals[e]}getAllFlags(){return new Map(this.flags)}getAllPositionals(){return[...this.positionals]}get positionalCount(){return this.positionals.length}};function k(e){return{name:`alias`,description:`Create or display command aliases`,execute:(t,n)=>{if(new O(t).hasFlag(`help`))return{output:`Usage: alias [name='command']

Description:
  Create or display command aliases for shortening commands
  Note: 'll' is aliased to 'ls -alh' by default

Options:
  (no args)            List all defined aliases

Examples:
  alias                # List all aliases
  alias la='ls -a'     # Create an alias
  alias blog-ai='blog --tags ai'  # Alias with flags`};if(t.length===0){let t=e.getAllAliases();return t.size===0?{output:`No aliases defined.`}:{output:Array.from(t.entries()).sort((e,t)=>e[0].localeCompare(t[0])).map(([t,n])=>`alias ${t}='${n}'${e.isDefaultAlias(t)?` (default)`:``}`).join(`
`)}}let r=t.join(` `),i=/^(\S+)=(.+)$/.exec(r);if(!i)return{output:`Usage: alias name='command'
       alias (to list all aliases)`,error:!0};let[,a,o]=i;try{return e.setAlias(a,o),{output:`Alias created: ${a}='${o}'`}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}var _e={name:`date`,description:`Display current date and time`,execute:(e,t)=>new O(e).hasFlag(`help`)?{output:`Usage: date

Description:
  Display the current date and time in the system's default format

Examples:
  date                 # Show current date and time`}:{output:new Date().toString()}},A={name:`echo`,description:`Display a line of text`,execute:(e,t)=>{if(new O(e).hasFlag(`help`))return{output:`Usage: echo [options] [text...]

Description:
  Display a line of text or pass through stdin content

Options:
  -e                   Enable interpretation of escape sequences

Examples:
  echo "Hello World"   # Display text
  echo -e "Line1\\nLine2"  # Use escape sequences
  cat file.txt | echo  # Pass through stdin`};let n=!1,r=[];for(let t of e)t===`-e`?n=!0:r.push(t);let i;return r.length===0&&t?(i=t,i.endsWith(`
`)&&(i=i.slice(0,-1))):i=r.join(` `),n&&(i=i.replace(/\\n/g,`
`).replace(/\\t/g,`	`).replace(/\\r/g,`\r`).replace(/\\b/g,`\b`).replace(/\\f/g,`\f`).replace(/\\v/g,`\v`).replace(/\\\\/g,`\\`)),{output:i}}};function ve(e){return{name:`env`,description:`Display all environment variables`,execute:(t,n)=>{if(new O(t).hasFlag(`help`))return{output:`Usage: env

Description:
  Display all environment variables

Examples:
  env                  # List all variables
  env | grep PATH      # Filter variables`};try{let t=e.getAllVariables();return t.size===0?{output:``}:{output:Array.from(t.entries()).sort((e,t)=>e[0].localeCompare(t[0])).map(([e,t])=>`${e}=${t}`).join(`
`)}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}var j=[`There is no escape.`,`You can check out any time you like, but you can never leave.`,`no`,`no thank you`,`nope`,`exit: permission denied: too interesting to leave`,`logout
Connection to darinchambers.com closed.

...just kidding. Welcome back.`];function ye(e,t,n,r){return{name:`exit`,description:`Exit the current session`,aliases:[`logout`],execute:(i,a)=>new O(i).hasFlag(`help`)?{output:`Usage: exit

Description:
  Exit the current session. If logged in as root (via sudo su),
  returns to the regular user. Otherwise, displays a message.

Aliases:
  logout

Examples:
  exit                 # Exit root session or display message
  logout               # Same as exit`}:e.getUsername()===`root`?(e.setUsername(`darin`),t.setVariable(`HOME`,`/home/darin`),t.setVariable(`USER`,`darin`),t.setVariable(`PWD`,`/home/darin`),n.changeDirectory(`/home/darin`),r(n.getShortPath()),{output:``}):{output:j[Math.floor(Math.random()*j.length)]}}}function be(e){return{name:`export`,description:`Set or display environment variables`,execute:(t,n)=>{if(new O(t).hasFlag(`help`))return{output:`Usage: export [VAR=value] [VAR]

Description:
  Set or display environment variables

Examples:
  export               # List all variables
  export PATH=/bin     # Set variable
  export USER          # Display single variable`};try{if(t.length===0){let t=e.getAllVariables();return t.size===0?{output:``}:{output:Array.from(t.entries()).sort((e,t)=>e[0].localeCompare(t[0])).map(([e,t])=>`${e}=${t}`).join(`
`)}}let n=[];for(let r of t){let t=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(r);if(t){let[,n,r]=t;e.setVariable(n,r)}else{let t=e.getVariable(r);t===void 0?n.push(`export: ${r}: not found`):n.push(`${r}=${t}`)}}return{output:n.join(`
`)}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}function xe(e){return{name:`history`,description:`Display command history`,execute:(t,n)=>{if(new O(t).hasFlag(`help`))return{output:`Usage: history

Description:
  Display command history with line numbers

Examples:
  history              # Show all commands`};let r=e.getHistory();return r.length===0?{output:`No commands in history.`}:{output:r.map((e,t)=>`${(t+1).toString().padStart(5,` `)}  ${e}`).join(`
`)}}}}function Se(e){return{name:`man`,description:`Display manual pages for commands`,execute:async(t,n)=>{let r=new O(t);if(r.hasFlag(`help`))return{output:`Usage: man <command>

Description:
  Display manual pages for commands

Options:
  --help           Show this help message

Examples:
  man ls           # Show manual page for ls
  man help         # Show manual page for help`};let i=r.getAllPositionals();if(i.length===0)return{output:`What manual page do you want?
For example, try 'man help'.`,error:!0};let a=i[0].toLowerCase();if(!e.getCommandNames().includes(a))return{output:`No manual entry for ${i[0]}`,error:!0};let o=e.getCommands().find(e=>e.name===a),s=o?o.description:a,c=(await e.dispatch(`${a} --help`)).output,l=`${a}(1)`,u=Math.max(0,60-l.length*2-13),d=`${l}${` `.repeat(Math.floor(u/2))}User Commands${` `.repeat(Math.ceil(u/2))}${l}`,f=[`help`,`which`].filter(e=>e!==a).map(e=>`${e}(1)`).join(`, `);return{output:[d,``,`NAME`,`    ${a} - ${s}`,``,c,``,`SEE ALSO`,`    ${f}`].join(`
`)}}}}var Ce={features:{useMarkedRenderer:!0}};function M(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}var we=class{static parse(e){if(!e.trim().startsWith(`---`))return{frontmatter:null,content:e};let t=e.split(`
`),n=this.findFrontmatterEnd(t);if(n===-1)return{frontmatter:null,content:e};let r=t.slice(1,n),i=t.slice(n+1);return{frontmatter:this.parseFrontmatterLines(r),content:i.join(`
`)}}static findFrontmatterEnd(e){for(let t=1;t<e.length;t++)if(e[t].trim()===`---`)return t;return-1}static parseFrontmatterLines(e){let t={};for(let n of e){let e=n.indexOf(`:`);if(e===-1)continue;let r=n.substring(0,e).trim(),i=n.substring(e+1).trim();i.startsWith(`[`)&&i.endsWith(`]`)?t[r]=i.substring(1,i.length-1).split(`,`).map(e=>e.trim().replace(/^["']|["']$/g,``)).filter(e=>e.length>0):t[r]=i.replace(/^["']|["']$/g,``)}return t}static renderFrontmatter(e){let t=[];e.title&&typeof e.title==`string`&&t.push(`<h1 class="fm-title">${M(e.title)}</h1>`);let n=[];if(e.date&&typeof e.date==`string`&&n.push(`<span class="fm-date">${M(e.date)}</span>`),e.tags&&Array.isArray(e.tags)){let t=e.tags.map(e=>`<span class="fm-tag">${M(e)}</span>`).join(` `);n.push(`<span class="fm-tags">${t}</span>`)}return n.length>0&&t.push(`<div class="fm-meta">${n.join(` • `)}</div>`),e.summary&&typeof e.summary==`string`&&t.push(`<p class="fm-summary">${M(e.summary)}</p>`),t.length>0&&t.push(`<hr class="fm-divider">`),t.join(`
`)}},Te=class{canHandle(e,t){return e.trim().startsWith("```")||t.getState()===`code_block`}handle(e,t){let n=e.trim();return t.getState()===`code_block`?(n.startsWith("```")?(t.flushCodeBlock(),t.setState(`normal`)):t.addCodeLine(e),!0):n.startsWith("```")?(t.flushList(),t.setState(`code_block`),!0):!1}},Ee=class{canHandle(e,t){return t.getState()===`code_block`?!1:e.trim()===``}handle(e,t){return t.getState()===`list`&&(t.flushList(),t.setState(`normal`)),t.getState()===`normal`&&t.addHtml(`<br>`),!0}},De=class{static render(e){let t=M(e);return t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,`<a href="$2">$1</a>`),t=t.replace(/`([^`]+)`/g,`<code>$1</code>`),t=t.replace(/\*\*([^*]+)\*\*/g,`<strong>$1</strong>`),t=t.replace(/__([^_]+)__/g,`<strong>$1</strong>`),t=t.replace(/\*([^*]+)\*/g,`<em>$1</em>`),t=t.replace(/_([^_]+)_/g,`<em>$1</em>`),t}},Oe=class{canHandle(e,t){return t.getState()===`code_block`?!1:e.trim().startsWith(`#`)}handle(e,t){let n=e.trim(),r=/^(#{1,6})\s+(.+)$/.exec(n);if(!r)return!1;t.flushList();let i=r[1].length,a=De.render(r[2]);return t.addHtml(`<h${i}>${a}</h${i}>`),!0}},ke=class{canHandle(e,t){if(t.getState()===`code_block`)return!1;let n=e.trim();return/^[-*]\s+/.exec(n)||/^\d+\.\s+/.exec(n)?!0:t.getState()===`list`?n.length>0&&this.isListItem(n):!1}handle(e,t){let n=e.trim();if(t.getState()===`list`&&(!n||!this.isListItem(n)))return t.flushList(),t.setState(`normal`),!1;let r=/^[-*]\s+(.+)$/.exec(n);if(r)return this.handleListItem(t,`ul`,r[1]);let i=/^\d+\.\s+(.+)$/.exec(n);return i?this.handleListItem(t,`ol`,i[1]):!1}handleListItem(e,t,n){let r=e.getListType();r&&r!==t&&e.flushList(),(!r||r!==t)&&(e.setState(`list`),e.setListType(t));let i=De.render(n);return e.addListItem(`<li>${i}</li>`),!0}isListItem(e){return!!(/^[-*]\s+/.exec(e)??/^\d+\.\s+/.exec(e))}},Ae=class{canHandle(e,t){return t.getState()===`normal`&&e.trim().length>0}handle(e,t){let n=De.render(e);return t.addHtml(`<p>${n}</p>`),!0}},je=class{htmlLines=[];state=`normal`;listType=null;listItems=[];codeBlockLines=[];addHtml(e){this.htmlLines.push(e)}getHtml(){return this.htmlLines.join(`
`)}setState(e){this.state=e}getState(){return this.state}setListType(e){this.listType=e}getListType(){return this.listType}addListItem(e){this.listItems.push(e)}flushList(){if(this.listItems.length>0&&this.listType){let e=`<${this.listType}>${this.listItems.join(``)}</${this.listType}>`;this.addHtml(e),this.listItems=[],this.listType=null}}addCodeLine(e){this.codeBlockLines.push(e)}flushCodeBlock(){if(this.codeBlockLines.length>0){let e=this.codeBlockLines.map(e=>M(e)).join(`
`);this.addHtml(`<pre><code>${e}</code></pre>`),this.codeBlockLines=[]}}},Me=class{handlers;constructor(){this.handlers=[new Te,new Oe,new ke,new Ee,new Ae]}parse(e){let t=e.split(`
`),n=new je;for(let e of t)this.processLine(e,n);return this.flushRemainingState(n),n.getHtml()}processLine(e,t){for(let n of this.handlers)if(n.canHandle(e,t)&&n.handle(e,t))break}flushRemainingState(e){e.flushList(),e.flushCodeBlock()}},Ne=class{static render(e,t=!1){let n=e,r=``;if(t){let t=we.parse(e);n=t.content,t.frontmatter&&(r=we.renderFrontmatter(t.frontmatter))}let i=new Me().parse(n);return`<div class="markdown-output">${r}${i}</div>`}};function Pe(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Fe=Pe();function Ie(e){Fe=e}var Le={exec:()=>null};function N(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function P(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(F.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var Re=((e=``)=>{try{return!!RegExp(`(?<=1)(?<!1)`+e)}catch{return!1}})(),F={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:N(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:N(e=>RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:N(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:N(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:N(e=>RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`,`i`)),blockquoteBeginRegex:N(e=>RegExp(`^ {0,${e}}>`))},ze=/^(?:[ \t]*(?:\n|$))+/,Be=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ve=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,He=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ue=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,I=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,We=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ge=P(We).replace(/bull/g,I).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),Ke=P(We).replace(/bull/g,I).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),qe=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Je=/^[^\n]+/,Ye=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Xe=P(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,Ye).replace(`title`,/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ze=P(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,I).getRegex(),Qe=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,$e=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,et=P(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,$e).replace(`tag`,Qe).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),L=P(qe).replace(`hr`,He).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Qe).getRegex(),tt={blockquote:P(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace(`paragraph`,L).getRegex(),code:Be,def:Xe,fences:Ve,heading:Ue,hr:He,html:et,lheading:Ge,list:Ze,newline:ze,paragraph:L,table:Le,text:Je},nt=P(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,He).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Qe).getRegex(),rt={...tt,lheading:Ke,table:nt,paragraph:P(qe).replace(`hr`,He).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,nt).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,Qe).getRegex()},it={...tt,html:P(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace(`comment`,$e).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Le,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:P(qe).replace(`hr`,He).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,Ge).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},at=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ot=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,st=/^( {2,}|\\)\n(?!\s*$)/,ct=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,lt=/[\p{P}\p{S}]/u,ut=/[\s\p{P}\p{S}]/u,dt=/[^\s\p{P}\p{S}]/u,ft=P(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,ut).getRegex(),pt=/(?!~)[\p{P}\p{S}]/u,mt=/(?!~)[\s\p{P}\p{S}]/u,ht=/(?:[^\s\p{P}\p{S}]|~)/u,gt=P(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,Re?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),_t=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,vt=P(_t,`u`).replace(/punct/g,lt).getRegex(),yt=P(_t,`u`).replace(/punct/g,pt).getRegex(),bt=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,xt=P(bt,`gu`).replace(/notPunctSpace/g,dt).replace(/punctSpace/g,ut).replace(/punct/g,lt).getRegex(),St=P(bt,`gu`).replace(/notPunctSpace/g,ht).replace(/punctSpace/g,mt).replace(/punct/g,pt).getRegex(),Ct=P(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,dt).replace(/punctSpace/g,ut).replace(/punct/g,lt).getRegex(),wt=P(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,lt).getRegex(),Tt=P(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,dt).replace(/punctSpace/g,ut).replace(/punct/g,lt).getRegex(),Et=P(/\\(punct)/,`gu`).replace(/punct/g,lt).getRegex(),Dt=P(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ot=P($e).replace(`(?:-->|$)`,`-->`).getRegex(),kt=P(`^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,Ot).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),At=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,jt=P(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace(`label`,At).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace(`title`,/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Mt=P(/^!?\[(label)\]\[(ref)\]/).replace(`label`,At).replace(`ref`,Ye).getRegex(),Nt=P(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,Ye).getRegex(),Pt=P(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,Mt).replace(`nolink`,Nt).getRegex(),Ft=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,It={_backpedal:Le,anyPunctuation:Et,autolink:Dt,blockSkip:gt,br:st,code:ot,del:Le,delLDelim:Le,delRDelim:Le,emStrongLDelim:vt,emStrongRDelimAst:xt,emStrongRDelimUnd:Ct,escape:at,link:jt,nolink:Nt,punctuation:ft,reflink:Mt,reflinkSearch:Pt,tag:kt,text:ct,url:Le},Lt={...It,link:P(/^!?\[(label)\]\((.*?)\)/).replace(`label`,At).getRegex(),reflink:P(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,At).getRegex()},Rt={...It,emStrongRDelimAst:St,emStrongLDelim:yt,delLDelim:wt,delRDelim:Tt,url:P(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`protocol`,Ft).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:P(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace(`protocol`,Ft).getRegex()},zt={...Rt,br:P(st).replace(`{2,}`,`*`).getRegex(),text:P(Rt.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},Bt={normal:tt,gfm:rt,pedantic:it},Vt={normal:It,gfm:Rt,breaks:zt,pedantic:Lt},Ht={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Ut=e=>Ht[e];function Wt(e,t){if(t){if(F.escapeTest.test(e))return e.replace(F.escapeReplace,Ut)}else if(F.escapeTestNoEncode.test(e))return e.replace(F.escapeReplaceNoEncode,Ut);return e}function Gt(e){try{e=encodeURI(e).replace(F.percentDecode,`%`)}catch{return null}return e}function Kt(e,t){let n=e.replace(F.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(F.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``);for(;r<n.length;r++)n[r]=n[r].trim().replace(F.slashPipe,`|`);return n}function qt(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function Jt(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&F.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function Yt(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Xt(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function Zt(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`);r.state.inLink=!0;let c={type:e[0].charAt(0)===`!`?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:r.inlineTokens(s)};return r.state.inLink=!1,c}function Qt(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return r.length>=i.length?e.slice(i.length):e}).join(`
`)}var $t=class{options;rules;lexer;constructor(e){this.options=e||Fe}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:Jt(t[0]);return{type:`code`,raw:e,codeBlockStyle:`indented`,text:e.replace(this.rules.other.codeRemoveIndent,``)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=Qt(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=qt(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:qt(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:qt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=qt(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o;for(o=0;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`)break;if(u?.type===`blockquote`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.blockquote(a);i[i.length-1]=o,n=n.substring(0,n.length-t.raw.length)+o.raw,r=r.substring(0,r.length-t.text.length)+o.text;break}else if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o,n=n.substring(0,n.length-u.raw.length)+o.raw,r=r.substring(0,r.length-t.raw.length)+o.raw,e=a.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:`list`,raw:``,ordered:r,start:r?+n.slice(0,-1):``,loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:`[*+-]`);let a=this.rules.other.listItemRegex(n),o=!1;for(;e;){let n=!1,r=``,s=``;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let c=Xt(t[2].split(`
`,1)[0],t[1].length),l=e.split(`
`,1)[0],u=!c.trim(),d=0;if(this.options.pedantic?(d=2,s=c.trimStart()):u?d=t[1].length+1:(d=c.search(this.rules.other.nonSpaceChar),d=d>4?1:d,s=c.slice(d),d+=t[1].length),u&&this.rules.other.blankLine.test(l)&&(r+=l+`
`,e=e.substring(l.length+1),n=!0),!n){let t=this.rules.other.nextBulletRegex(d),n=this.rules.other.hrRegex(d),i=this.rules.other.fencesBeginRegex(d),a=this.rules.other.headingBeginRegex(d),o=this.rules.other.htmlBeginRegex(d),f=this.rules.other.blockquoteBeginRegex(d);for(;e;){let p=e.split(`
`,1)[0],m;if(l=p,this.options.pedantic?(l=l.replace(this.rules.other.listReplaceNesting,`  `),m=l):m=l.replace(this.rules.other.tabCharGlobal,`    `),i.test(l)||a.test(l)||o.test(l)||f.test(l)||t.test(l)||n.test(l))break;if(m.search(this.rules.other.nonSpaceChar)>=d||!l.trim())s+=`
`+m.slice(d);else{if(u||c.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||i.test(c)||a.test(c)||n.test(c))break;s+=`
`+l}u=!l.trim(),r+=p+`
`,e=e.substring(p.length+1),c=m.slice(d)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(o=!0)),i.items.push({type:`list_item`,raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(s),loose:!1,text:s,tokens:[]}),i.raw+=r}let s=i.items.at(-1);if(s)s.raw=s.raw.trimEnd(),s.text=s.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let e of i.items){this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]);let t=e.tokens[0];if(e.task&&(t?.type===`text`||t?.type===`paragraph`)){e.text=e.text.replace(this.rules.other.listReplaceTask,``),t.raw=t.raw.replace(this.rules.other.listReplaceTask,``),t.text=t.text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:`checkbox`,raw:n[0]+` `,checked:n[0]!==`[ ]`};e.checked=t.checked,i.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:`paragraph`,raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&=!1;if(!i.loose){let t=e.tokens.filter(e=>e.type===`space`);i.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(i.loose)for(let e of i.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return i}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=Jt(t[0]);return{type:`html`,block:!0,raw:e,pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal,` `),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:qt(t[0],`
`),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Kt(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:qt(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(Kt(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:qt(t[0],`
`),depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=qt(e.slice(0,-1),`\\`);if((e.length-t.length)%2==0)return}else{let e=Yt(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let n=t[2],r=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(n);e&&(n=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):``;return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(n=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?n.slice(1):n.slice(1,-1)),Zt(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,`$1`),title:r&&r.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=t[(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal,` `).toLowerCase()];if(!e){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return Zt(n,e,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=0,c=r[0][0]===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+n);(r=c.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(a=[...i].length,r[3]||r[4]){o+=a;continue}else if((r[5]||r[6])&&n%3&&!((n+a)%3)){s+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o+s);let t=[...r[0]][0].length,c=e.slice(0,n+r.index+t+a);if(Math.min(n,a)%2){let e=c.slice(1,-1);return{type:`em`,raw:c,text:e,tokens:this.lexer.inlineTokens(e)}}let l=c.slice(2,-2);return{type:`strong`,raw:c,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+n);(r=s.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:t[0],escaped:e}}}},R=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Fe,this.options.tokenizer=this.options.tokenizer||new $t,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:F,block:Bt.normal,inline:Vt.normal};this.options.pedantic?(t.block=Bt.pedantic,t.inline=Vt.pedantic):this.options.gfm&&(t.block=Bt.gfm,this.options.breaks?t.inline=Vt.breaks:t.inline=Vt.gfm),this.tokenizer.rules=t}static get rules(){return{block:Bt,inline:Vt}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(F.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(F.tabCharGlobal,`    `).replace(F.spaceLine,``));let r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(n=>(i=n.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let n=t.at(-1);i.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},t.push(i));continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}let a=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(a=e.substring(0,t+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let r=t.at(-1);n&&r?.type===`paragraph`?(r.raw+=(r.raw.endsWith(`
`)?``:`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(i),n=a.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e,r=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!==null;)e.includes(r[0].slice(r[0].lastIndexOf(`[`)+1,-1))&&(n=n.slice(0,r.index)+`[`+`a`.repeat(r[0].length-2)+`]`+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!==null;)n=n.slice(0,r.index)+`++`+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!==null;)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+`[`+`a`.repeat(r[0].length-i-2)+`]`+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,o=``,s=1/0;for(;e;){if(e.length<s)s=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}a||(o=``),a=!1;let r;if(this.options.extensions?.inline?.some(n=>(r=n.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.escape(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.tag(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.link(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length);let n=t.at(-1);r.type===`text`&&n?.type===`text`?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(r=this.tokenizer.emStrong(e,n,o)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.codespan(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.br(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.del(e,n,o)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.autolink(e)){e=e.substring(r.raw.length),t.push(r);continue}if(!this.state.inLink&&(r=this.tokenizer.url(e))){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(i=e.substring(0,t+1))}if(r=this.tokenizer.inlineText(i)){e=e.substring(r.raw.length),r.raw.slice(-1)!==`_`&&(o=r.raw.slice(-1)),a=!0;let n=t.at(-1);n?.type===`text`?(n.raw+=r.raw,n.text+=r.text):t.push(r);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t=`Infinite loop on byte: `+e;if(this.options.silent)console.error(t);else throw Error(t)}},en=class{options;parser;constructor(e){this.options=e||Fe}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(F.notSpaceStart)?.[0],i=e.replace(F.endingNewline,``)+`
`;return r?`<pre><code class="language-`+Wt(r)+`">`+(n?i:Wt(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:Wt(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return``}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r=``;for(let t=0;t<e.items.length;t++){let n=e.items[t];r+=this.listitem(n)}let i=t?`ol`:`ul`,a=t&&n!==1?` start="`+n+`"`:``;return`<`+i+a+`>
`+r+`</`+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return`<input `+(e?`checked="" `:``)+`disabled="" type="checkbox"> `}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t=``,n=``;for(let t=0;t<e.header.length;t++)n+=this.tablecell(e.header[t]);t+=this.tablerow({text:n});let r=``;for(let t=0;t<e.rows.length;t++){let i=e.rows[t];n=``;for(let e=0;e<i.length;e++)n+=this.tablecell(i[e]);r+=this.tablerow({text:n})}return r&&=`<tbody>${r}</tbody>`,`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?`th`:`td`;return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Wt(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),i=Gt(e);if(i===null)return r;e=i;let a=`<a href="`+e+`"`;return t&&(a+=` title="`+Wt(t)+`"`),a+=`>`+r+`</a>`,a}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=Gt(e);if(i===null)return Wt(n);e=i;let a=`<img src="${e}" alt="${Wt(n)}"`;return t&&(a+=` title="${Wt(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:Wt(e.text)}},tn=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return``+e}image({text:e}){return``+e}br(){return``}checkbox({raw:e}){return e}},z=class e{options;renderer;textRenderer;constructor(e){this.options=e||Fe,this.options.renderer=this.options.renderer||new en,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new tn}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},nn=class{options;block;constructor(e){this.options=e||Fe}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?R.lex:R.lexInline}provideParser(e=this.block){return e?z.parse:z.parseInline}},rn=new class{defaults=Pe();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=z;Renderer=en;TextRenderer=tn;Lexer=R;Tokenizer=$t;Hooks=nn;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)n=n.concat(this.walkTokens(e.tokens,t));break}case`list`:{let e=r;n=n.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);n=n.concat(this.walkTokens(i,t))}):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new en(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n||``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new $t(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new nn;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];nn.passThroughHooks.has(n)?t[r]=e=>{if(this.defaults.async&&nn.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:t[r]=(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return R.lex(e,t??this.defaults)}parser(e,t){return z.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?R.lex:R.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?z.parse:z.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?R.lex:R.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?z.parse:z.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+Wt(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function B(e,t){return rn.parse(e,t)}B.options=B.setOptions=function(e){return rn.setOptions(e),B.defaults=rn.defaults,Ie(B.defaults),B},B.getDefaults=Pe,B.defaults=Fe,B.use=function(...e){return rn.use(...e),B.defaults=rn.defaults,Ie(B.defaults),B},B.walkTokens=function(e,t){return rn.walkTokens(e,t)},B.parseInline=rn.parseInline,B.Parser=z,B.parser=z.parse,B.Renderer=en,B.TextRenderer=tn,B.Lexer=R,B.lexer=R.lex,B.Tokenizer=$t,B.Hooks=nn,B.parse=B,B.options,B.setOptions,B.use,B.walkTokens,B.parseInline,z.parse,R.lex;var an=class{static render(e,t=!1){let n=e,r=``;if(t){let t=we.parse(e);n=t.content,t.frontmatter&&(r=we.renderFrontmatter(t.frontmatter))}let i=B.parse(n);return`<div class="markdown-output">${r}${i}</div>`}},V=class{static render(e,t=!1){return Ce.features.useMarkedRenderer?an.render(e,t):Ne.render(e,t)}};function on(e){return{name:`render`,description:`Render markdown file with formatting`,execute:(t,n)=>{if(new O(t).hasFlag(`help`))return{output:`Usage: render <file>
Or: <command> | render

Description:
  Render markdown with formatting and YAML frontmatter

Examples:
  render ~/blog/post.md   # Render file
  cat file.md | render    # Render from stdin`};let r;if(n)r=n;else if(t.length>0){let n=t[0];try{if(!e.exists(n))return{output:`render: ${n}: No such file or directory`,error:!0};if(!e.isFile(n))return{output:`render: ${n}: Is a directory`,error:!0};r=e.readFile(n)}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}else return{output:`render: missing file operand
Try 'render --help' for more information`,error:!0};let i=r.trim().startsWith(`---`);return{output:V.render(r,i),html:!0}}}}var sn=`hunter2`,cn=300*1e3;function ln(e,t){let n=null,r=3,i=null,a=null;function o(){return n===null?!1:Date.now()-n<cn}function s(){r=3}function c(){e.setUsername(`root`),t.execute(`export HOME=/root`),t.execute(`export USER=root`),e.executeCommand(`cd /root`)}function l(){let t=`[sudo] password for ${e.getUsername()}: `;e.getInput().setInputType(`password`),e.getInput().setPrompt(t),e.setInputInterceptor(d)}function u(){e.getInput().setInputType(`text`),e.setUsername(e.getUsername())}function d(o){if(o===sn){if(n=Date.now(),s(),u(),a&&i){let e=a,n=i;a=null,i=null,e===`su`||e===`su -`?(c(),n({output:``})):t.execute(e).then(e=>n(e))}}else r--,r<=0?(u(),i&&(i({output:`sudo: 3 incorrect password attempts`,error:!0}),i=null,a=null),s()):(e.writeError(`Sorry, try again.`),l())}return{name:`sudo`,description:`Execute a command as superuser`,execute:(e,n)=>{if(new O(e).hasFlag(`help`))return{output:`Usage: sudo <command>

Description:
  Execute a command as the superuser (root).
  Requires authentication via password.
  Authentication is cached for 5 minutes.

Options:
  --help               Show this help message

Examples:
  sudo ls /root        # List root's home directory as root
  sudo su              # Switch to root user
  sudo su -            # Switch to root user (login shell)`};if(e.length===0)return{output:`usage: sudo <command>`,error:!0};let r=e.join(` `);if(r===`make me a sandwich`)return{output:`Okay.`};if(o()){let e=r.trim();return e===`su`||e===`su -`?(c(),{output:``}):t.execute(r)}return s(),new Promise(e=>{i=e,a=r,l()})}}}function un(e){return{name:`unalias`,description:`Remove command aliases`,execute:(t,n)=>{if(new O(t).hasFlag(`help`))return{output:`Usage: unalias <name>

Description:
  Remove a command alias

Examples:
  unalias ll           # Remove the 'll' alias`};if(t.length===0)return{output:`Usage: unalias name
Try 'unalias --help' for more information.`,error:!0};let r=t[0];return e.removeAlias(r)?{output:`Alias removed: ${r}`}:{output:`unalias: ${r}: not found`,error:!0}}}}var dn=new Set([`about`,`portfolio`,`blog`,`contact`,`settings`]);function fn(e,t){return{name:`which`,description:`Locate a command and display its path`,execute:(n,r)=>{let i=new O(n);if(i.hasFlag(`help`))return{output:`Usage: which [-a] <command> [command ...]

Description:
  Locate a command and display its path

Options:
  -a               Show all matching paths
  --help           Show this help message

Examples:
  which ls         # /usr/bin/ls
  which about      # /usr/local/bin/about
  which ll         # ll: aliased to ls -alh
  which ls cat     # Check multiple commands`};let a=i.getAllPositionals();if(a.length===0)return{output:`which: missing command argument
Usage: which [-a] <command> [command ...]`,error:!0};let o=i.hasFlag(`a`),s=[],c=!1;for(let n of a){let r=pn(n,e,t,o);r.error&&(c=!0),s.push(r.output)}let l={output:s.join(`
`)};return c&&(l.error=!0),l}}}function pn(e,t,n,r){let i=[],a=n.getAlias(e);if(a&&(i.push(`${e}: aliased to ${a}`),!r))return{output:i.join(`
`)};if(t.getCommandNames().includes(e.toLowerCase())){let t=dn.has(e.toLowerCase())?`/usr/local/bin/${e}`:`/usr/bin/${e}`;i.push(t)}return i.length===0?{output:`which: ${e}: command not found`,error:!0}:{output:i.join(`
`)}}function mn(e){return{name:`whoami`,description:`Display current username`,execute:(t,n)=>new O(t).hasFlag(`help`)?{output:`Usage: whoami

Description:
  Display the current username

Examples:
  whoami               # Show current user`}:{output:e.getUsername()}}}function hn(e){return{name:`cat`,description:`Display file contents`,execute:(t,n)=>{if(new O(t).hasFlag(`help`))return{output:`Usage: cat <file>

Description:
  Display file contents

Examples:
  cat file.txt         # Display file
  cat ~/blog/post.md   # Display from path
  cat file.txt | grep hello  # Use in pipeline
  echo "data" | cat    # Read from stdin`};if(t.length===0)return n===void 0?{output:`cat: missing file operand
Try 'cat --help' for more information`,error:!0}:{output:n};try{return{output:e.readFile(t[0])}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}function gn(e,t,n){return{name:`cd`,description:`Change directory (supports - for previous directory)`,execute:(r,i)=>{if(new O(r).hasFlag(`help`))return{output:`Usage: cd [directory]

Description:
  Change current working directory

Examples:
  cd                   # Go to home directory
  cd ~/blog            # Change to blog directory
  cd -                 # Go to previous directory`};try{let i=r[0]||`~`;if(i===`-`&&n){let e=n.getVariable(`OLDPWD`);if(!e)return{output:`cd: OLDPWD not set`,error:!0};i=e}if(n){let t=n.getVariable(`PWD`)??e.getCurrentPath();n.setVariable(`OLDPWD`,t)}return e.changeDirectory(i),n&&n.setVariable(`PWD`,e.getCurrentPath()),t(e.getShortPath()),{output:``}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}function _n(e,t){if(!t)return e.toString();let n=[`B`,`K`,`M`,`G`,`T`],r=e,i=0;for(;r>=1024&&i<n.length-1;)r/=1024,i++;return`${i===0?r.toString():r.toFixed(1)}${n[i]}`}function vn(e){return`${[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`][e.getMonth()]} ${e.getDate().toString().padStart(2,` `)} ${e.getHours().toString().padStart(2,`0`)}:${e.getMinutes().toString().padStart(2,`0`)}`}function yn(e,t){let n=e.permissions??`-rw-r--r--`,r=e.owner??`darin`,i=_n(e.size??0,t),a=vn(e.modifiedTime??new Date),o=e.name;return`${n}  1 ${r}  staff  ${i.padStart(6,` `)} ${a} ${o}`}function bn(e){let t=e.reduce((e,t)=>e+(t.size??0),0);return Math.ceil(t/512)}function xn(e){return{name:`ls`,description:`List directory contents`,execute:(t,n)=>{try{let n=new O(t);if(n.hasFlag(`help`))return{output:`Usage: ls [options] [path]

Description:
  List directory contents

Options:
  -a                   Show hidden files
  -l                   Long format with details
  -h                   Human-readable sizes

Examples:
  ls                   # List current directory
  ls -la               # List all files with details
  ls ~/blog            # List specific directory`};let r=n.getPositional(0)??`.`,i=n.hasFlag(`a`),a=n.hasFlag(`l`),o=n.hasFlag(`h`),s=e.getNode(r);if(!s)return{output:`ls: cannot access '${r}': No such file or directory\nTry 'ls --help' for more information`,error:!0};if(s.type===`file`)return a?{output:yn(s,o)}:{output:s.name};if(!s.children)return{output:``};let c=Array.from(s.children.values());return i||(c=c.filter(e=>!e.isHidden)),c.length===0?{output:``}:(c.sort((e,t)=>e.name.localeCompare(t.name)),a?{output:[`total ${bn(c)}`,...c.map(e=>yn(e,o))].join(`
`)}:{output:c.map(e=>e.name).join(`  `)})}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}var Sn=`Usage: mkdir [OPTION]... DIRECTORY...

Description:
  Create directories in the filesystem

Options:
  -p                   Create parent directories as needed
  --help               Display this help and exit

Examples:
  mkdir mydir          # Create a directory
  mkdir -p a/b/c       # Create nested directories
  mkdir dir1 dir2      # Create multiple directories`;function Cn(e){return{name:`mkdir`,description:`Create directories`,execute:(t,n)=>{let r=new O(t);if(r.hasFlag(`help`))return{output:Sn};let i=r.hasFlag(`p`),a=r.getAllPositionals();if(a.length===0)return{output:`mkdir: missing operand
Try 'mkdir --help' for more information`,error:!0};let o=[],s=!1;for(let t of a)try{if(e.exists(t)&&e.isDirectory(t)){if(i)continue;o.push(`mkdir: cannot create directory '${t}': File exists`),s=!0;continue}if(!i){let n=t.replace(/\/+$/,``).split(`/`);if(n.length>1){let r=n.slice(0,-1).join(`/`)||`/`;if(!e.exists(r)||!e.isDirectory(r)){o.push(`mkdir: cannot create directory '${t}': No such file or directory`),s=!0;continue}}}e.createDirectory(t)}catch(e){o.push(e instanceof Error?e.message:String(e)),s=!0}return{output:o.join(`
`),error:s}}}}function wn(e){return{name:`pwd`,description:`Print working directory`,execute:(t,n)=>new O(t).hasFlag(`help`)?{output:`Usage: pwd

Description:
  Print current working directory path

Examples:
  pwd                  # Show current directory`}:{output:e.getCurrentPath()}}}var Tn=`Usage: rm [OPTION]... FILE...

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
  rm -rf /             # Don't try this at home`;function En(){return`<div data-melt class="melt-trigger"></div>`}function Dn(e,t){return{name:`rm`,description:`Remove files or directories`,execute:(n,r)=>{let i=new O(n);if(i.hasFlag(`help`))return{output:Tn};let a=i.getFlag(`recursive`),o=i.getFlag(`force`),s=i.getFlag(`f`),c=i.hasFlag(`r`)||i.hasFlag(`R`)||a!==void 0,l=i.hasFlag(`f`)||o!==void 0,u=[...i.getAllPositionals()];if(typeof a==`string`&&u.push(a),typeof o==`string`&&u.push(o),typeof s==`string`&&u.push(s),u.length===0)return{output:`rm: missing operand
Try 'rm --help' for more information`,error:!0};if(c&&l&&u.some(e=>e===`/`||e===`/*`))return{output:En(),html:!0};let d=[],f=!1;for(let n of u)try{if(!e.exists(n)){l||(d.push(`rm: cannot remove '${n}': No such file or directory`),f=!0);continue}if(e.isDirectory(n)){if(!c){d.push(`rm: cannot remove '${n}': Is a directory`),f=!0;continue}e.deleteDirectory(n,!0)}else{let r=n.startsWith(`/`)?n:`${e.getCurrentPath()}/${n}`.replace(/\/+/g,`/`);if(r.startsWith(`/usr/bin/`)||r.startsWith(`/usr/local/bin/`)){let e=r.split(`/`).pop();e&&t.unregisterCommand(e)}e.deleteFile(n)}}catch(e){l||(d.push(e instanceof Error?e.message:String(e)),f=!0)}return l?{output:``,error:!1}:{output:d.join(`
`),error:f}}}}var On=`Usage: rmdir DIRECTORY...

Description:
  Remove empty directories from the filesystem

Options:
  --help               Display this help and exit

Examples:
  rmdir mydir          # Remove an empty directory
  rmdir dir1 dir2      # Remove multiple empty directories`;function kn(e){return{name:`rmdir`,description:`Remove empty directories`,execute:(t,n)=>{let r=new O(t);if(r.hasFlag(`help`))return{output:On};let i=r.getAllPositionals();if(i.length===0)return{output:`rmdir: missing operand
Try 'rmdir --help' for more information`,error:!0};let a=[],o=!1;for(let t of i)try{if(!e.exists(t)){a.push(`rmdir: failed to remove '${t}': No such file or directory`),o=!0;continue}if(!e.isDirectory(t)){a.push(`rmdir: failed to remove '${t}': Not a directory`),o=!0;continue}e.deleteDirectory(t)}catch(e){let t=e instanceof Error?e.message:String(e);a.push(t.replace(/^rm:/,`rmdir:`)),o=!0}return{output:a.join(`
`),error:o}}}}function An(e){return{name:`tree`,description:`Display directory tree structure`,execute:(t,n)=>{try{let n=new O(t);if(n.hasFlag(`help`))return{output:`Usage: tree [options] [path]

Description:
  Display directory tree structure

Options:
  -L <depth>           Limit tree depth (default: 4)

Examples:
  tree                 # Show tree of current directory
  tree ~/blog          # Show tree of specific directory
  tree -L 2            # Limit depth to 2 levels`};let r=n.getPositional(0)??`.`,i=4,a=n.getFlag(`L`);if(a!==void 0){if(typeof a==`boolean`)return{output:`tree: -L flag requires a depth value
Try 'tree --help' for more information`,error:!0};let e=parseInt(a,10);if(isNaN(e)||e<1)return{output:`tree: invalid level, must be a positive integer
Try 'tree --help' for more information`,error:!0};i=e}return{output:e.getTree(r,i).join(`
`),scrollBehavior:`top`}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}var H={HOME_DARIN:`/home/darin`,HOME_GUEST:`/home/guest`,CONTENT_BLOG:`/home/darin/blog`,CONTENT_PORTFOLIO:`/home/darin/portfolio`,CONTENT_POSTS:`/home/darin/posts`,CONTENT_HELP:`/home/darin/content/help.md`,CONTENT_ABOUT:`/home/darin/content/about.md`,CONTENT_CONTACT:`/home/darin/content/contact.md`,CONFIG_ALIASES:`/home/guest/.alias`,CONFIG_SETTINGS:`/home/darin/.settings`,CONFIG_ENV:`/home/darin/.env`},jn={CLEAR_SCREEN:`__CLEAR__`,NO_OUTPUT:`__NO_OUTPUT__`},Mn={SETTINGS:`terminal_settings`,ENVIRONMENT:`terminal_env_vars`},Nn={EMPTY_PORTFOLIO:`No portfolio projects yet. Check back soon!`,EMPTY_BLOG:`No blog posts yet. Check back soon!`,EMPTY_POSTS:`No notes yet. Check back soon!`,NO_TAGS_AVAILABLE:`No tags available yet.`},Pn={theme:{preset:`dc`,customColors:void 0},font:{size:16,family:`Fira Code`},effects:{scanLines:!1,glow:!1,border:!0,animationSpeed:1,soundEffects:!1,autoScrollBehavior:!0},prompt:{format:`\\W \\$ `},screensaver:{enabled:!0,timeoutMinutes:5,activeScreensaver:`matrix`}},Fn={MIN_TIMEOUT_MINUTES:1,MAX_TIMEOUT_MINUTES:60,ACTIVITY_DEBOUNCE_MS:100,DEFAULT_SCREENSAVER:`matrix`},In=class{static makeCommandsClickable(e,t){let n=new Set(t);return e.replace(/<code>([^<]+)<\/code>/g,(e,t)=>{let r=t.trim();return n.has(r)?`<a data-command="${r}" class="command-link"><code>${r}</code></a>`:e})}static formatClickableTag(e,t){return`<button data-command="${`${t} --tags ${e}`}" class="tag-link">${e}</button>`}static formatPortfolioList(e,t){return`${t?`# Portfolio - Tag: ${t}`:`# Portfolio`}

${e.map((e,t)=>{let n=e.tags?.map(e=>this.formatClickableTag(e,`portfolio`)).join(` `)??``,r=n?`\n\n**Tags:** ${n}`:``;return`### <a href="/portfolio/${e.id}" data-command="portfolio ${e.id}">${t+1}. ${e.title} (${e.year})</a>

${e.summary}${r}
`}).join(`

---

`)}${t?`

---

<a href="/portfolio" data-command="portfolio">← Back to All Projects</a>`:`

---

**Filter by tag:** Type \`portfolio --tags <tag>\` or \`portfolio --tags\` to list all tags`}`}static formatPortfolioDetail(e){let t=e.technologies.join(`, `),n=e.impact?`**Impact:** ${e.impact}\n\n`:``,r=e.tags?.map(e=>this.formatClickableTag(e,`portfolio`)).join(` `)??``,i=r?`**Tags:** ${r}\n\n`:``;return`# ${e.title}

**Year:** ${e.year}

${e.description}

**Technologies:** ${t}

${n}${i}---

<a href="/portfolio" data-command="portfolio">← Back to Portfolio</a>`}static formatBlogList(e,t){return`${t?`# Blog Posts - Tag: ${t}`:`# Blog Posts`}

${e.map((t,n)=>{let r=t.tags.map(e=>this.formatClickableTag(e,`blog`)).join(` `),i=e.length-n;return`### <a href="/blog/${t.id}" data-command="blog ${t.id}">${i}. ${t.title}</a>

**Date:** ${t.date}

${t.summary}

**Tags:** ${r}
`}).join(`

---

`)}${t?`

---

<a href="/blog" data-command="blog">← Back to All Posts</a>`:`

---

**Filter by tag:** Type \`blog --tags <tag>\` or \`blog --tags\` to list all tags`}`}static formatBlogPost(e){let t=e.tags.map(e=>this.formatClickableTag(e,`blog`)).join(` `);return`# ${e.title}

**Date:** ${e.date}

---

${e.content}

---

**Tags:** ${t}

<a href="/blog" data-command="blog">← Back to Blog</a>`}static formatPostedLinks(e){if(!e||e.length===0)return{badges:``,links:``};let t=e.map(e=>e.platform).join(` · `),n=e.map(e=>`<a href="${e.url}" target="_blank" rel="noopener noreferrer">${e.platform} →</a>`).join(` · `);return{badges:` · ${t}`,links:`\n\n**Posted on:** ${n}`}}static formatPostList(e,t){return`${t?`# Notes - Tag: ${t}`:`# Notes`}

${e.map((t,n)=>{let r=t.tags.map(e=>this.formatClickableTag(e,`notes`)).join(` `),i=e.length-n,{badges:a,links:o}=this.formatPostedLinks(t.posted);return`### <a href="/notes/${t.id}" data-command="notes ${t.id}">${i}. ${t.title}</a>

**${t.date}**${a}

${t.content}${o}

**Tags:** ${r}
`}).join(`

---

`)}${t?`

---

<a href="/notes" data-command="notes">← Back to All Notes</a>`:`

---

**Filter by tag:** Type \`notes --tags <tag>\` or \`notes --tags\` to list all tags`}`}static formatPostDetail(e){let t=e.tags.map(e=>this.formatClickableTag(e,`notes`)).join(` `),{badges:n,links:r}=this.formatPostedLinks(e.posted);return`# ${e.title}

**${e.date}**${n}

---

${e.content}${r}

---

**Tags:** ${t}

<a href="/notes" data-command="notes">← Back to Notes</a>`}};function Ln(e,t=[]){return{name:`about`,description:`Display bio and expertise overview`,execute:(n,r)=>{if(new O(n).hasFlag(`help`))return{output:`Usage: about

Description:
  Display professional bio and expertise overview

Examples:
  about                # Show bio and background`};try{let n=e.readFile(H.CONTENT_ABOUT),r=V.render(n);return{output:In.makeCommandsClickable(r,t),html:!0,scrollBehavior:`top`}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}function Rn(e){let t=e.split(`
`);if(t[0]?.trim()!==`---`)throw Error(`Invalid frontmatter: must start with ---`);let n=-1;for(let e=1;e<t.length;e++)if(t[e].trim()===`---`){n=e;break}if(n===-1)throw Error(`Invalid frontmatter: no closing ---`);return{frontmatterLines:t.slice(1,n),markdown:t.slice(n+1).join(`
`).trim()}}function zn(e){return e.replace(/^["']|["']$/g,``)}function Bn(e){return e.startsWith(`[`)&&e.endsWith(`]`)?e.substring(1,e.length-1).split(`,`).map(e=>zn(e.trim())).filter(e=>e.length>0):zn(e)}function Vn(e){let t={};for(let n of e){let e=n.indexOf(`:`);if(e===-1)continue;let r=n.substring(0,e).trim();t[r]=Bn(n.substring(e+1).trim())}return t}function Hn(e){return e.replace(/^\d{4}-\d{2}-\d{2}-(\d{2}-)?/,``).replace(/\.md$/,``)}function Un(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.title==`string`&&typeof t.date==`string`&&typeof t.summary==`string`&&Array.isArray(t.tags)&&t.tags.every(e=>typeof e==`string`)}var Wn=class{static parseFrontmatter(e){let{frontmatterLines:t,markdown:n}=Rn(e),r=Vn(t);if(!Un(r)){let e=[];throw r.title||e.push(`title`),r.date||e.push(`date`),r.summary||e.push(`summary`),Array.isArray(r.tags)||e.push(`tags`),Error(`Invalid blog frontmatter: missing or invalid fields: ${e.join(`, `)}`)}return{frontmatter:r,markdown:n}}static parseBlogPost(e,t){let{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:Hn(e),title:n.title,date:n.date,summary:n.summary,content:r,tags:n.tags}}static getIdFromFilename(e){return Hn(e)}};function Gn(e){return{output:V.render(e),html:!0,scrollBehavior:`top`}}function Kn(e,t){let{name:n,pluralNoun:r}=t;return{name:n,description:t.description,execute:(i,a)=>{let o=new O(i);if(o.hasFlag(`help`))return{output:t.help};try{let i=e.list(t.dir).filter(e=>e.endsWith(`.md`)).sort().reverse(),a=o.getFlag(`tags`),s=o.hasFlag(`tags`),c=o.getPositional(0),l=i.map(n=>t.parse(n,e.readFile(`${t.dir}/${n}`)));if(l.length===0&&!s&&!c)return Gn(`# ${t.heading}\n\n${t.emptyMessage}`);if(s&&(typeof a==`boolean`||!a)){let e=new Map;l.forEach(t=>t.tags?.forEach(t=>e.set(t,(e.get(t)??0)+1)));let i=Array.from(e.keys()).sort();if(i.length===0)return Gn(`# ${t.tagsHeading}\n\n${Nn.NO_TAGS_AVAILABLE}`);let a=i.map(r=>{let i=e.get(r)??0;return`- <button data-command="${n} --tags ${r}" class="tag-link">${r}</button> (${i} ${t.countNoun}${i===1?``:`s`})`}).join(`
`);return Gn(`# ${t.tagsHeading}\n\n${a}\n\n---\n\n**Usage:** Type \`${n} --tags <tag>\` to filter ${r}`)}if(c){let e=parseInt(c,10),i=!isNaN(e)&&e>0&&e<=l.length?l[l.length-e]:l.find(e=>e.id===c);return i?Gn(t.formatDetail(i)):{output:`${t.notFoundLabel} '${c}' not found.\nUse '${n}' to list all ${r}.\nTry '${n} --help' for more information`,error:!0}}let u=l,d=typeof a==`string`?a:void 0;if(d&&(u=l.filter(e=>e.tags.some(e=>e.toLowerCase()===d.toLowerCase())),u.length===0)){let e=Array.from(l.flatMap(e=>e.tags??[]).reduce((e,t)=>e.set(t,(e.get(t)??0)+1),new Map).entries()).sort((e,t)=>t[1]-e[1]).slice(0,5).map(([e])=>e),i=e.length>0?`\nTry one of these tags: ${e.join(`, `)}`:``;return{output:`No ${t.filterMissLabel} found with tag '${d}'.${i}\nUse '${n}' to see all ${r}.`,error:!1}}return Gn(t.formatList(u,d))}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}function qn(e){return Kn(e,{name:`blog`,description:`List and read blog posts`,help:`Usage: blog [options] [post-id|number]

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
  blog post-id                  # Read specific post by ID`,dir:H.CONTENT_BLOG,emptyMessage:Nn.EMPTY_BLOG,heading:`Blog`,tagsHeading:`Blog Tags`,countNoun:`post`,pluralNoun:`posts`,notFoundLabel:`Blog post`,filterMissLabel:`blog posts`,parse:(e,t)=>Wn.parseBlogPost(e,t),formatList:(e,t)=>In.formatBlogList(e,t),formatDetail:e=>In.formatBlogPost(e)})}var Jn=class{static parse(e){let t=[],n=e.split(`
`),r=null,i=null,a=[],o=/^## \[([^\]]+)\] - (\d{4}-\d{2}-\d{2})/,s=/^### (\w+)/,c=/^- (.+)/;for(let e of n){let n=o.exec(e);if(n){r&&(r.rawContent=a.join(`
`).trim(),t.push(r)),r={version:n[1],date:n[2],sections:{},rawContent:``},i=null,a=[e];continue}r&&a.push(e);let l=s.exec(e);if(l&&r){i=l[1],r.sections[i]=[];continue}let u=c.exec(e);u&&r&&i&&r.sections[i].push(u[1])}return r&&(r.rawContent=a.join(`
`).trim(),t.push(r)),t}static getVersion(e,t){return e.find(e=>e.version===t)}static getByIndex(e,t){if(!(t<1||t>e.length))return e[t-1]}static formatEntry(e){let t=[];t.push(`## Version ${e.version}`),t.push(`*Released: ${e.date}*`),t.push(``);for(let[n,r]of Object.entries(e.sections)){t.push(`### ${n}`);for(let e of r)t.push(`- ${e}`);t.push(``)}return t.join(`
`)}static formatEntries(e){return`# Changelog

All notable changes to this project are documented here.

---

`+e.map(e=>this.formatEntry(e)).join(`
---

`)}};function Yn(e){return{name:`changelog`,description:`View project version history`,execute:(t,n)=>{let r=new O(t);if(r.hasFlag(`help`))return{output:`Usage: changelog [options] [version|number]

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
  changelog 0.22.0           # Show specific version`};try{let t=Jn.parse(e);if(t.length===0)return{output:`No changelog entries found.`,error:!0};let n=r.getPositional(0);if(n){if(n.toLowerCase()===`latest`){let e=t[0],n=Jn.formatEntry(e);return{output:V.render(n),html:!0,scrollBehavior:`top`}}if(/^\d+$/.test(n)){let e=parseInt(n,10);if(e>0){let n=Jn.getByIndex(t,e);if(!n)return{output:`Version at position ${e} not found. There are ${t.length} versions available.\nTry 'changelog --help' for more information.`,error:!0};let r=Jn.formatEntry(n);return{output:V.render(r),html:!0,scrollBehavior:`top`}}}let e=Jn.getVersion(t,n);if(!e)return{output:`Version '${n}' not found.\nRecent versions: ${t.slice(0,5).map(e=>e.version).join(`, `)}\nTry 'changelog --help' for more information.`,error:!0};let r=Jn.formatEntry(e);return{output:V.render(r),html:!0,scrollBehavior:`top`}}let i=Jn.formatEntries(t);return{output:V.render(i),html:!0,scrollBehavior:`top`}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}function Xn(e){return{name:`contact`,description:`Display contact information`,execute:(t,n)=>{if(new O(t).hasFlag(`help`))return{output:`Usage: contact

Description:
  Display contact information and professional links

Examples:
  contact              # Show contact details`};try{let t=e.readFile(H.CONTENT_CONTACT);return{output:V.render(t),html:!0}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}}}function Zn(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.title==`string`&&typeof t.date==`string`&&Array.isArray(t.tags)&&t.tags.every(e=>typeof e==`string`)}function Qn(e){let t=[],n=null;for(let r of e){let e=r.trim();if(e.startsWith(`- `)){n?.platform&&n?.url&&t.push({platform:n.platform,url:n.url}),n={};let r=e.substring(2).trim(),i=r.indexOf(`:`);if(i!==-1){let e=r.substring(0,i).trim(),t=r.substring(i+1).trim().replace(/^["']|["']$/g,``);e===`platform`&&(n.platform=t),e===`url`&&(n.url=t)}}else if(n){let t=e.indexOf(`:`);if(t!==-1){let r=e.substring(0,t).trim(),i=e.substring(t+1).trim().replace(/^["']|["']$/g,``);r===`platform`&&(n.platform=i),r===`url`&&(n.url=i)}}}return n?.platform&&n?.url&&t.push({platform:n.platform,url:n.url}),t}var $n=class{static parseFrontmatter(e){let{frontmatterLines:t,markdown:n}=Rn(e),r={},i=0;for(;i<t.length;){let e=t[i],n=e.indexOf(`:`);if(n===-1){i++;continue}let a=e.substring(0,n).trim(),o=e.substring(n+1).trim();if(a===`posted`&&o===``){let e=[];for(i++;i<t.length;){let n=t[i];if(/^\s+(- |[\w])/.exec(n))e.push(n),i++;else break}r[a]=Qn(e);continue}r[a]=Bn(o),i++}if(!Zn(r)){let e=[];throw r.title||e.push(`title`),r.date||e.push(`date`),Array.isArray(r.tags)||e.push(`tags`),Error(`Invalid post frontmatter: missing or invalid fields: ${e.join(`, `)}`)}return{frontmatter:r,markdown:n}}static parsePost(e,t){let{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:this.getIdFromFilename(e),title:n.title,date:n.date,content:r,tags:n.tags,...n.posted&&n.posted.length>0&&{posted:n.posted}}}static getIdFromFilename(e){return Hn(e)}};function er(e){return Kn(e,{name:`notes`,description:`List and read short-form notes`,help:`Usage: notes [options] [note-id|number]

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
  notes note-id                 # Read specific note by ID`,dir:H.CONTENT_POSTS,emptyMessage:Nn.EMPTY_POSTS,heading:`Notes`,tagsHeading:`Note Tags`,countNoun:`note`,pluralNoun:`notes`,notFoundLabel:`Note`,filterMissLabel:`notes`,parse:(e,t)=>$n.parsePost(e,t),formatList:(e,t)=>In.formatPostList(e,t),formatDetail:e=>In.formatPostDetail(e)})}function tr(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.id==`string`&&typeof t.title==`string`&&typeof t.summary==`string`&&typeof t.year==`string`&&typeof t.order==`number`&&Array.isArray(t.technologies)&&t.technologies.every(e=>typeof e==`string`)&&(t.impact===void 0||typeof t.impact==`string`)&&(t.tags===void 0||Array.isArray(t.tags)&&t.tags.every(e=>typeof e==`string`))}var nr=class{static parseFrontmatter(e){let{frontmatterLines:t,markdown:n}=Rn(e),r=Vn(t);if(typeof r.order==`string`){let e=Number(r.order);isNaN(e)||(r.order=e)}if(!tr(r)){let e=[];throw r.id||e.push(`id`),r.title||e.push(`title`),r.summary||e.push(`summary`),r.year||e.push(`year`),typeof r.order!=`number`&&e.push(`order`),Array.isArray(r.technologies)||e.push(`technologies`),Error(`Invalid portfolio frontmatter: missing or invalid fields: ${e.join(`, `)}`)}return{frontmatter:r,markdown:n}}static parseProject(e,t){let{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:n.id||e.replace(/\.md$/,``),title:n.title,summary:n.summary,description:r,technologies:n.technologies,impact:n.impact,year:n.year,order:n.order,tags:n.tags}}static getIdFromFilename(e){return e.replace(/\.md$/,``)}};function rr(e){return{name:`portfolio`,description:`Showcase projects and accomplishments`,execute:(t,n)=>{let r=new O(t);if(r.hasFlag(`help`))return{output:`Usage: portfolio [options] [project-id|number]

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
  portfolio proj-id             # View specific project by ID`};let i=H.CONTENT_PORTFOLIO;try{let t=e.list(i).filter(e=>e.endsWith(`.md`)),n=r.getFlag(`tags`),a=r.hasFlag(`tags`),o=r.getPositional(0),s=[];for(let n of t){let t=e.readFile(`${i}/${n}`);if(t)try{let e=nr.parseProject(n,t);s.push(e)}catch(e){console.error(`Error parsing ${n}:`,e)}}if(s.sort((e,t)=>e.order===t.order?e.title.localeCompare(t.title):e.order-t.order),s.length===0&&!a&&!o){let e=`# Portfolio

${Nn.EMPTY_PORTFOLIO}`;return{output:V.render(e),html:!0,scrollBehavior:`top`}}if(a&&(typeof n==`boolean`||!n)){let e=new Set,t=new Map;s.forEach(n=>{n.tags?.forEach(n=>{e.add(n),t.set(n,(t.get(n)??0)+1)})});let n=Array.from(e).sort();if(n.length===0){let e=`# Portfolio Tags

${Nn.NO_TAGS_AVAILABLE}`;return{output:V.render(e),html:!0,scrollBehavior:`top`}}let r=`# Portfolio Tags

${n.map(e=>{let n=t.get(e)??0;return`- <button data-command="portfolio --tags ${e}" class="tag-link">${e}</button> (${n} project${n===1?``:`s`})`}).join(`
`)}

---

**Usage:** Type \`portfolio --tags <tag>\` to filter projects`;return{output:V.render(r),html:!0,scrollBehavior:`top`}}if(o){let e,t=parseInt(o,10);if(e=!isNaN(t)&&t>0&&t<=s.length?s[t-1]:s.find(e=>e.id===o),!e)return{output:`Project '${o}' not found.\nUse 'portfolio' to list all projects.\nTry 'portfolio --help' for more information`,error:!0};let n=In.formatPortfolioDetail(e);return{output:V.render(n),html:!0,scrollBehavior:`top`}}let c=s,l=[];if(a&&typeof n==`string`&&(l=n.split(`,`).map(e=>e.trim().toLowerCase()),c=s.filter(e=>e.tags?.some(e=>l.includes(e.toLowerCase()))),c.length===0)){let e=l.map(e=>`'${e}'`).join(`, `),t=new Map;s.forEach(e=>{e.tags?.forEach(e=>{t.set(e,(t.get(e)??0)+1)})});let n=Array.from(t.entries()).sort((e,t)=>t[1]-e[1]).slice(0,5).map(([e])=>e),r=n.length>0?`\nTry one of these tags: ${n.join(`, `)}`:``;return{output:`No projects found with tag${l.length>1?`s`:``} ${e}.${r}\nUse 'portfolio' to see all projects.`,error:!1}}let u=l.length>0?l.join(`, `):void 0,d=In.formatPortfolioList(c,u);return{output:V.render(d),html:!0,scrollBehavior:`top`}}catch(e){return{output:`Error loading portfolio: ${String(e)}`,error:!0}}}}}function ir(e,t){let n=e.loadSettings();return`<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true"><h2>Terminal Settings</h2><section class="settings-section"><h3>Color Theme</h3>${ar(t.getPresets(),n.theme.preset)}</section><section class="settings-section"><details ${n.theme.preset===`custom`?`open`:``}><summary>Advanced: Custom Colors</summary>${or(n.theme.customColors)}</details></section><section class="settings-section"><h3>Font</h3>${sr(n.font)}</section><section class="settings-section"><h3>Effects</h3>${cr(n.effects)}</section><section class="settings-section"><h3>Screensaver</h3>${lr(n.screensaver)}</section><div class="settings-actions"><button data-command="settings reset" class="btn-reset">Reset to Defaults</button></div></aside>`}function ar(e,t){return`<div class="theme-buttons-container">`+e.map(e=>`<button class="theme-button ${e.name===t?`active`:``}" data-command="settings set theme ${e.name}" data-theme="${e.name}" style="background: ${e.colors[`--terminal-bg`]}; color: ${e.colors[`--terminal-accent`]}; border-color: ${e.colors[`--terminal-accent`]};"><span class="theme-preview" style="background: ${e.colors[`--terminal-accent`]}"></span>${e.displayName}</button>`).join(``)+`</div>`}function or(e){return[{key:`--terminal-bg`,label:`Background`,prop:`background`},{key:`--terminal-bg-secondary`,label:`BG (Secondary)`,prop:`backgroundSecondary`},{key:`--terminal-fg`,label:`Foreground`,prop:`foreground`},{key:`--terminal-accent`,label:`Accent`,prop:`accent`},{key:`--terminal-dim`,label:`Dim`,prop:`dim`},{key:`--terminal-error`,label:`Error`,prop:`error`},{key:`--terminal-cursor`,label:`Cursor`,prop:`cursor`}].map(t=>{let n=e?.[t.prop]??(typeof window<`u`?getComputedStyle(document.documentElement).getPropertyValue(t.key).trim():`#000000`);return`<div class="color-picker-group"><label>${t.label}</label><input type="color" value="${n}" data-command-template="settings set color ${t.key}" data-color-var="${t.key}"/><span class="color-value">${e?.[t.prop]??`default`}</span></div>`}).join(``)}function sr(e){return`<div class="setting-group"><label>Font Size: <span id="font-size-value">${e.size}px</span></label><input type="range" min="8" max="24" step="1" value="${e.size}" aria-label="Font size" aria-valuemin="8" aria-valuemax="24" aria-valuenow="${e.size}" aria-valuetext="${e.size} pixels" data-command-template="settings set font-size" data-setting-type="font-size"/></div><div class="setting-group"><label>Font Family</label><select aria-label="Font family" data-command-template="settings set font-family" data-setting-type="font-family">${[`Fira Code`,`JetBrains Mono`,`Cascadia Code`,`Menlo`,`Monaco`,`Courier New`,`monospace`].map(t=>`<option value="${t}" ${t===e.family?`selected`:``}>${t}</option>`).join(``)}</select></div>`}function cr(e){return`<div class="setting-group"><label><input type="checkbox" ${e.scanLines?`checked`:``} data-command-template="settings set scan-lines" data-setting-type="scan-lines"/>Scan Lines</label></div><div class="setting-group"><label><input type="checkbox" ${e.glow?`checked`:``} data-command-template="settings set glow" data-setting-type="glow"/>Glow Effect</label></div><div class="setting-group"><label><input type="checkbox" ${e.border?`checked`:``} data-command-template="settings set border" data-setting-type="border"/>Page Border</label></div><div class="setting-group"><label>Animation Speed: <span id="animation-speed-value">${e.animationSpeed}x</span></label><input type="range" min="0.5" max="2.0" step="0.1" value="${e.animationSpeed}" aria-label="Animation speed" aria-valuemin="0.5" aria-valuemax="2" aria-valuenow="${e.animationSpeed}" aria-valuetext="${e.animationSpeed} times speed" data-command-template="settings set animation-speed" data-setting-type="animation-speed"/></div><div class="setting-group"><label><input type="checkbox" ${e.soundEffects?`checked`:``} data-command-template="settings set sound-effects" data-setting-type="sound-effects"/>Sound Effects (future feature)</label></div>`}function lr(e){return`<div class="setting-group"><label><input type="checkbox" ${e.enabled?`checked`:``} data-command-template="settings set screensaver-enabled" data-setting-type="screensaver-enabled"/>Enable Screensaver</label></div><div class="setting-group"><label>Timeout: <span id="screensaver-timeout-value">${e.timeoutMinutes}min</span></label><input type="range" min="1" max="60" step="1" value="${e.timeoutMinutes}" aria-label="Screensaver timeout" aria-valuemin="1" aria-valuemax="60" aria-valuenow="${e.timeoutMinutes}" aria-valuetext="${e.timeoutMinutes} minutes" data-command-template="settings set screensaver-timeout" data-setting-type="screensaver-timeout"/></div><div class="setting-group"><label>Screensaver Type</label><select aria-label="Screensaver type" data-command-template="settings set screensaver-type" data-setting-type="screensaver-type">${[{value:`matrix`,label:`Matrix Digital Rain`},{value:`life`,label:`Conway's Game of Life`}].map(t=>`<option value="${t.value}" ${t.value===e.activeScreensaver?`selected`:``}>${t.label}</option>`).join(``)}</select></div>`}function ur(e,t,n){return{name:`settings`,description:`Manage terminal settings and preferences`,aliases:[`preferences`,`config`],execute:(e,r)=>{let i=new O(e);if(i.hasFlag(`help`))return{output:`Usage: settings [subcommand] [options]

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
  settings reset       # Reset all settings`};if(e.length===0)return{output:ir(t,n),html:!0};let a=i.getPositional(0);switch(a){case`list`:return dr(t,n);case`set`:return fr(i,t,n);case`reset`:return pr(t,n);case`theme`:case`font-size`:case`font-family`:case`fontSize`:case`fontFamily`:case`scan-lines`:case`scanLines`:case`glow`:case`border`:case`animation-speed`:case`animationSpeed`:case`sound`:case`auto-scroll`:case`autoScroll`:case`prompt`:case`screensaver-enabled`:case`screensaverEnabled`:case`screensaver-timeout`:case`screensaverTimeout`:case`screensaver-type`:case`screensaverType`:return fr(new O([`set`,a,...e.slice(1)]),t,n);default:return{output:`Unknown subcommand: ${a}.\nTry 'settings --help' for more information`,error:!0}}}}}function dr(e,t){let n=mr(e,t);return{output:V.render(n),html:!0}}function fr(e,t,n){let r=e.getPositional(1),i=e.getPositional(2);if(!r||r!==`color`&&!i)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};try{switch(r){case`theme`:{let e=[`green`,`yellow`,`white`,`light-blue`,`paper`,`dc`];return e.includes(i)?(t.setSetting(`theme`,{preset:i}),n.applyTheme(i),U(),{output:`Theme changed to: ${i}`}):{output:`Invalid theme: ${i}. Available: ${e.join(`, `)}`,error:!0}}case`color`:{let t=[`terminal-bg`,`terminal-fg`,`terminal-accent`,`terminal-dim`,`terminal-error`,`terminal-cursor`,`terminal-bg-secondary`],r,i;for(let n of t){let t=e.getFlag(n);if(t&&typeof t==`string`){r=`--`+n,i=t;break}}if(!r||!i)return{output:`Usage: settings set color <variable> <value>
Example: settings set color --terminal-accent #ff0000`,error:!0};let a={[r]:i};return n.applyCustomColors(a),U(),{output:`Color ${r} set to ${i}`}}case`font-size`:case`fontSize`:{if(!i)return{output:`Font size value required`,error:!0};let e=parseInt(i,10);return isNaN(e)?{output:`Font size must be a number (8-24)`,error:!0}:(t.setFontSize(e),hr(t),U(),{output:`Font size set to: ${e}px`})}case`font-family`:case`fontFamily`:{if(!i)return{output:`Font family value required`,error:!0};let e=[`Fira Code`,`JetBrains Mono`,`Cascadia Code`,`Menlo`,`Monaco`,`Courier New`,`monospace`];return e.includes(i)?(t.setFontFamily(i),hr(t),U(),{output:`Font family set to: ${i}`}):{output:`Invalid font family: ${i}. Available: ${e.join(`, `)}`,error:!0}}case`scan-lines`:case`scanLines`:{if(!i)return{output:`Scan lines value required (on/off)`,error:!0};if(i!==`on`&&i!==`off`)return{output:`Scan lines must be "on" or "off"`,error:!0};let e=i===`on`;return t.setScanLines(e),gr(e),U(),{output:`Scan lines: ${i}`}}case`glow`:{if(!i)return{output:`Glow value required (on/off)`,error:!0};if(i!==`on`&&i!==`off`)return{output:`Glow must be "on" or "off"`,error:!0};let e=i===`on`;return t.setGlow(e),_r(e),U(),{output:`Glow: ${i}`}}case`border`:{if(!i)return{output:`Border value required (on/off)`,error:!0};if(i!==`on`&&i!==`off`)return{output:`Border must be "on" or "off"`,error:!0};let e=i===`on`;return t.setBorder(e),vr(e),U(),{output:`Border: ${i}`}}case`animation-speed`:case`animationSpeed`:{if(!i)return{output:`Animation speed value required`,error:!0};let e=parseFloat(i);return isNaN(e)?{output:`Animation speed must be a number (0.5-2.0)`,error:!0}:(t.setAnimationSpeed(e),yr(e),U(),{output:`Animation speed set to: ${e}x`})}case`sound-effects`:case`sound`:{if(!i)return{output:`Sound effects value required (on/off)`,error:!0};if(i!==`on`&&i!==`off`)return{output:`Sound effects must be "on" or "off"`,error:!0};let e=i===`on`;return t.setSoundEffects(e),U(),{output:`Sound effects: ${i}`}}case`autoscroll`:case`auto-scroll`:case`autoScroll`:{if(!i)return{output:`Autoscroll value required (on/off)`,error:!0};if(i!==`on`&&i!==`off`)return{output:`Autoscroll must be "on" or "off"`,error:!0};let e=i===`on`;return t.setAutoScrollBehavior(e),U(),{output:`Autoscroll: ${i} - ${e?`Long content (>50 lines) scrolls to command line`:`All content scrolls to bottom`}`}}case`prompt`:return i?(t.setPromptFormat(i),U(),{output:`Prompt format set to: ${i}`}):{output:`Prompt format value required`,error:!0};case`screensaver-enabled`:case`screensaverEnabled`:{if(!i)return{output:`Screensaver enabled value required (on/off)`,error:!0};if(i!==`on`&&i!==`off`)return{output:`Screensaver enabled must be "on" or "off"`,error:!0};let e=i===`on`;return t.setScreensaverEnabled(e),U(),{output:`Screensaver: ${i}`}}case`screensaver-timeout`:case`screensaverTimeout`:{if(!i)return{output:`Screensaver timeout value required (1-60 minutes)`,error:!0};let e=parseInt(i,10);return isNaN(e)||e<1||e>60?{output:`Screensaver timeout must be between 1 and 60 minutes`,error:!0}:(t.setScreensaverTimeout(e),U(),{output:`Screensaver timeout set to: ${e} minutes`})}case`screensaver-type`:case`screensaverType`:{if(!i)return{output:`Screensaver type value required`,error:!0};let e=[`matrix`,`life`];return e.includes(i)?(t.setActiveScreensaver(i),U(),{output:`Screensaver type set to: ${i}`}):{output:`Invalid screensaver type: ${i}. Available: ${e.join(`, `)}`,error:!0}}default:return{output:`Unknown setting: ${r}. Available: theme, color, font-size, font-family, scan-lines, glow, border, animation-speed, sound-effects, autoscroll, prompt, screensaver-enabled, screensaver-timeout, screensaver-type`,error:!0}}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}function pr(e,t){return e.reset(),t.applyCurrentTheme(),hr(e),gr(e.getScanLines()),_r(e.getGlow()),vr(e.getBorder()),yr(e.getAnimationSpeed()),U(),{output:`Settings reset to defaults.`}}function mr(e,t){let n=e.loadSettings(),r=t.getPresets();return`# Terminal Settings

## Current Configuration

### Theme
**${n.theme.preset===`custom`?`Custom`:r.find(e=>e.name===n.theme.preset)?.displayName??n.theme.preset}**

### Font
- **Size:** ${n.font.size}px
- **Family:** ${n.font.family}

### Prompt
- **Format:** \`${n.prompt.format}\`

### Effects
- **Scan Lines:** ${n.effects.scanLines?`Enabled`:`Disabled`}
- **Glow:** ${n.effects.glow?`Enabled`:`Disabled`}
- **Border:** ${n.effects.border?`Enabled`:`Disabled`}
- **Animation Speed:** ${n.effects.animationSpeed}x
- **Sound Effects:** ${n.effects.soundEffects?`Enabled`:`Disabled`}
- **Autoscroll:** ${n.effects.autoScrollBehavior?`Enabled (smart)`:`Disabled (classic)`}

## Available Themes

${r.map(e=>`- **${e.name}**: ${e.displayName}`).join(`
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
`}function hr(e){let t=e.getSetting(`font`);typeof document<`u`&&(document.documentElement.style.setProperty(`--terminal-font-size`,`${t.size}px`),document.documentElement.style.setProperty(`--terminal-font-family`,t.family))}function gr(e){typeof document<`u`&&(e?document.body.classList.remove(`no-scan-lines`):document.body.classList.add(`no-scan-lines`))}function _r(e){typeof document<`u`&&(e?document.body.classList.remove(`no-glow`):document.body.classList.add(`no-glow`))}function vr(e){typeof document<`u`&&(e?document.body.classList.add(`border-enabled`):document.body.classList.remove(`border-enabled`))}function yr(e){typeof document<`u`&&document.documentElement.style.setProperty(`--terminal-animation-speed`,e.toString())}function U(){if(typeof document<`u`){let e=new CustomEvent(`settings-changed`);document.dispatchEvent(e)}}function br(e){return e?[{type:`bios`,text:`PHOENIX BIOS v4.0`},{type:`bios`,text:`Memory Test: 16384 MB OK`},{type:`kernel`,text:`Loading kernel...`},{type:`kernel`,text:`[    0.000000] Linux version 6.8.0-darin`},{type:`ok`,text:`Started System Logging Service`},{type:`ok`,text:`Started Network Manager`},{type:`ok`,text:`Started Terminal Emulator`},{type:`ok`,text:`Reached target Multi-User System`},{type:`welcome`,text:`Welcome to darinchambers.com!`}]:[{type:`bios`,text:`PHOENIX BIOS v4.0 Release 6.0`},{type:`bios`,text:`Copyright 1985-2025 Phoenix Technologies Ltd.`},{type:`bios`,text:`CPU: JavaScript V8 Engine @ ∞ GHz`},{type:`bios`,text:`Memory Test: 16384 MB OK`},{type:`bios`,text:`Detecting IDE drives...`},{type:`bios`,text:`  Primary Master: Virtual SSD 256GB`},{type:`kernel`,text:`Loading kernel...`},{type:`kernel`,text:`[    0.000000] Linux version 6.8.0-darin (darin@darinchambers.com)`},{type:`kernel`,text:`[    0.000001] Command line: BOOT_IMAGE=/vmlinuz-6.8.0-darin root=/dev/sda1`},{type:`kernel`,text:`[    0.123456] Calibrating delay loop... 7999.99 BogoMIPS (lpj=15999984)`},{type:`kernel`,text:`[    0.234567] Memory: 16384MB available`},{type:`kernel`,text:`[    0.345678] CPU: JavaScript Virtual CPU`},{type:`kernel`,text:`[    0.456789] Mounting root filesystem...`},{type:`ok`,text:`Started System Logging Service`},{type:`ok`,text:`Started Journal Service`},{type:`ok`,text:`Started D-Bus System Message Bus`},{type:`ok`,text:`Reached target Local File Systems`},{type:`ok`,text:`Started Network Manager`},{type:`failed`,text:`Started Bluetooth Service (no adapter found)`},{type:`ok`,text:`Started Login Service`},{type:`ok`,text:`Started OpenSSH Server`},{type:`ok`,text:`Started Docker Container Runtime`},{type:`ok`,text:`Started Code Editor Process`},{type:`ok`,text:`Started Terminal Emulator`},{type:`ok`,text:`Reached target Multi-User System`},{type:`info`,text:`darinchambers.com login: darin`},{type:`info`,text:`Password: ********`},{type:`welcome`,text:`Welcome to darinchambers.com!`},{type:`info`,text:`Type 'help' for available commands.`}]}function xr(e,t=0){let n=br(e),r=e?80:120,i=0;return{html:n.map((e,n)=>{let a=t+n*r,o=`boot-line boot-line-${e.type}`,s=e.text.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`);return e.type===`welcome`&&(i=a),`<div class="${o}" style="animation-delay: ${a}ms;">${s}</div>`}).join(`
`),welcomeDelay:i}}var Sr={name:`boot`,description:`Display simulated Linux boot sequence`,execute:(e,t)=>{let n=new O(e);if(n.hasFlag(`help`))return{output:`Usage: boot [options]

Display a simulated Linux boot sequence with BIOS POST,
kernel loading, and service startup messages.

Options:
  --fast     Show abbreviated boot sequence
  --help     Display this help message

Examples:
  boot           # Show full boot sequence
  boot --fast    # Show quick boot sequence

Note: Messages appear with timed animation. Scroll or type to stop.`};let{html:r,welcomeDelay:i}=xr(n.hasFlag(`fast`));return{output:`<div class="boot-sequence boot-startup" data-boot-type="boot">
${r}
</div>`,html:!0,clearBefore:!0,fullscreen:!0,fullscreenDuration:i,scrollBehavior:`top`}}},Cr=[{code:`SYSTEM_THREAD_EXCEPTION_NOT_HANDLED`,description:`A system thread generated an exception that was not handled.`},{code:`DRIVER_IRQL_NOT_LESS_OR_EQUAL`,description:`A driver attempted to access a pageable memory at an inappropriate IRQL.`},{code:`KERNEL_DATA_INPAGE_ERROR`,description:`The requested page of kernel data from the paging file could not be read.`},{code:`PAGE_FAULT_IN_NONPAGED_AREA`,description:`Invalid system memory has been referenced.`},{code:`CRITICAL_PROCESS_DIED`,description:`A critical system process died unexpectedly.`}];function wr(e,t){return`<div class="bsod-overlay bsod-modern" data-bsod="true" data-bsod-style="modern">
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
        <p class="bsod-stop-code">Stop code: ${M(e)}</p>
        <p class="bsod-description">${M(t)}</p>
      </div>
    </div>
  </div>
</div>`}function Tr(e,t){let n=[`0x0000007E`,`0xC0000005`,`0xBF8B4C62`,`0x00000000`,`0xBF8B4C62`];return`<div class="bsod-overlay bsod-classic" data-bsod="true" data-bsod-style="classic">
  <div class="bsod-classic-content">
    <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
    <br>
    <p>${M(e)}</p>
    <br>
    <p>${M(t)}</p>
    <br>
    <p>If this is the first time you've seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:</p>
    <br>
    <p>Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.</p>
    <br>
    <p>If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.</p>
    <br>
    <p>Technical information:</p>
    <br>
    <p>*** STOP: ${n[0]} (${n[1]}, ${n[2]}, ${n[3]}, ${n[4]})</p>
    <br>
    <br>
    <p>*** DARINCHAMBERS.SYS - Address ${n[2]} base at BF800000, DateStamp 4802539d</p>
    <br>
    <p>Beginning dump of physical memory</p>
    <p>Physical memory dump complete.</p>
    <p>Contact your system administrator or technical support group for further assistance.</p>
    <br>
    <p class="bsod-classic-cursor" data-bsod-cursor>_</p>
  </div>
</div>`}var Er={name:`bsod`,description:`Display a fake Windows Blue Screen of Death`,execute:(e,t)=>{let n=new O(e);if(n.hasFlag(`help`)||n.hasFlag(`h`))return{output:`Usage: bsod [options]

Display a fake Windows Blue Screen of Death. Supports two styles:
- Modern (default): Windows 10/11 style with animated progress counter
- Classic: Windows XP/NT style with technical text and blinking cursor

Options:
  --classic         Use Windows XP/NT style BSOD
  --reason <text>   Custom error description
  --error <index>   Select specific error code (0-${Cr.length-1})
  --help, -h        Display this help message

Error codes:
${Cr.map((e,t)=>`  ${t}: ${e.code}`).join(`
`)}

Examples:
  bsod                     # Modern style with random error
  bsod --classic           # Classic style with random error
  bsod --error 2           # Use specific error code
  bsod --reason "Custom"   # Custom error description

Note: Click anywhere or press any key to dismiss the BSOD.`};let r=n.hasFlag(`classic`),i=n.getFlag(`reason`),a=n.getFlag(`error`),o=Cr[Math.floor(Math.random()*Cr.length)];if(a!==void 0&&a!==!0){let e=parseInt(String(a),10);!isNaN(e)&&e>=0&&e<Cr.length&&(o=Cr[e])}let s=typeof i==`string`?i:o.description;return{output:r?Tr(o.code,s):wr(o.code,s),html:!0,clearBefore:!0,scrollBehavior:`top`}}},Dr=[`Chaos`,`Discord`,`Confusion`,`Bureaucracy`,`The Aftermath`],Or=[`Sweetmorn`,`Boomtime`,`Pungenday`,`Prickle-Prickle`,`Setting Orange`],kr=[`Mungday`,`Mojoday`,`Syadday`,`Zaraday`,`Malbowday`],Ar=73,jr=1166;function Mr(e){return e%4==0&&e%100!=0||e%400==0}function Nr(e,t,n){let r=[31,28,31,30,31,30,31,31,30,31,30,31];Mr(e)&&(r[1]=29);let i=n;for(let e=0;e<t-1;e++)i+=r[e];return i}function Pr(e){let t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),i=t+jr,a=Nr(t,n,r);if(Mr(t)&&n===2&&r===29)return{weekday:``,season:``,dayOfSeason:0,yold:i,isStTibsDay:!0};let o=a;Mr(t)&&a>60&&(o=a-1);let s=Math.floor((o-1)/Ar),c=Dr[s],l=(o-1)%Ar+1;return{weekday:Or[(o-1)%5],season:c,dayOfSeason:l,yold:i,isStTibsDay:!1,apostleDay:l===5?kr[s]:void 0}}function Fr(e){return e.isStTibsDay?`St. Tib's Day, ${e.yold} YOLD`:e.apostleDay?`${e.weekday}, ${e.apostleDay}, day ${e.dayOfSeason} of ${e.season}, ${e.yold} YOLD`:`${e.weekday}, ${e.season} ${e.dayOfSeason}, ${e.yold} YOLD`}function Ir(e){if(/^\d{4}-\d{2}-\d{2}$/.test(e)){let t=new Date(e);if(!isNaN(t.getTime()))return t}if(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(e)){let t=new Date(e);if(!isNaN(t.getTime()))return t}return null}function Lr(e,t,n){if(e<1||e>31||t<1||t>12||n<1)return null;let r=new Date(n,t-1,e);return isNaN(r.getTime())?null:r}var Rr={name:`ddate`,description:`Display date in Discordian calendar`,execute:(e,t)=>{let n=new O(e);if(n.hasFlag(`help`))return{output:`Usage: ddate [DATE]

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
  --help                   Display this help message`};let r;if(n.positionalCount===0)r=new Date;else if(n.positionalCount===1){let e=n.getPositional(0),t=Ir(e);if(!t)return{output:`ddate: invalid date '${e}'`,error:!0};r=t}else if(n.positionalCount===3){let e=parseInt(n.getPositional(0),10),t=parseInt(n.getPositional(1),10),i=parseInt(n.getPositional(2),10);if(isNaN(t)||isNaN(e)||isNaN(i))return{output:`ddate: invalid numeric date arguments`,error:!0};let a=Lr(t,e,i);if(!a)return{output:`ddate: invalid date ${e}/${t}/${i}`,error:!0};r=a}else return{output:`ddate: invalid arguments
Try 'ddate --help' for more information.`,error:!0};return{output:Fr(Pr(r))}}},zr={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3},Br=class{constructor(){this.comment=``,this.numChars=0,this.options={}}},Vr=`1Row.3-D.3D Diagonal.3D-ASCII.3x5.4Max.5 Line Oblique.AMC 3 Line.AMC 3 Liv1.AMC AAA01.AMC Neko.AMC Razor.AMC Razor2.AMC Slash.AMC Slider.AMC Thin.AMC Tubes.AMC Untitled.ANSI Compact.ANSI Regular.ANSI Shadow.ASCII 12.ASCII 9.ASCII New Roman.Acrobatic.Alligator.Alligator2.Alpha.Alphabet.Arrows.Avatar.B1FF.Babyface Lame.Babyface Leet.Banner.Banner3-D.Banner3.Banner4.Barbwire.Basic.Bear.Bell.Benjamin.Big ASCII 12.Big ASCII 9.Big Chief.Big Money-ne.Big Money-nw.Big Money-se.Big Money-sw.Big Mono 12.Big Mono 9.Big.Bigfig.Binary.Block.Blocks.Bloody.BlurVision ASCII.Bolger.Braced.Bright.Broadway KB.Broadway.Bubble.Bulbhead.Caligraphy.Caligraphy2.Calvin S.Cards.Catwalk.Chiseled.Chunky.Circle.Classy.Coder Mini.Coinstak.Cola.Colossal.Computer.Contessa.Contrast.Cosmike.Cosmike2.Crawford.Crawford2.Crazy.Cricket.Cursive.Cyberlarge.Cybermedium.Cybersmall.Cygnet.DANC4.DOS Rebel.DWhistled.Dancing Font.Decimal.Def Leppard.Delta Corps Priest 1.DiamFont.Diamond.Diet Cola.Digital.Doh.Doom.Dot Matrix.Double Shorts.Double.Dr Pepper.Efti Chess.Efti Font.Efti Italic.Efti Piti.Efti Robot.Efti Wall.Efti Water.Electronic.Elite.Emboss 2.Emboss.Epic.Fender.Filter.Fire Font-k.Fire Font-s.Flipped.Flower Power.Font Font.Four Tops.Fraktur.Fun Face.Fun Faces.Future Smooth.Future Thin.Future.Fuzzy.Georgi16.Georgia11.Ghost.Ghoulish.Glenyn.Goofy.Gothic.Graceful.Gradient.Graffiti.Greek.Heart Left.Heart Right.Henry 3D.Hex.Hieroglyphs.Hollywood.Horizontal Left.Horizontal Right.ICL-1900.Impossible.Invita.Isometric1.Isometric2.Isometric3.Isometric4.Italic.Ivrit.JS Block Letters.JS Bracket Letters.JS Capital Curves.JS Cursive.JS Stick Letters.Jacky.Jazmine.Jerusalem.Katakana.Kban.Keyboard.Knob.Konto Slant.Konto.LCD.Larry 3D 2.Larry 3D.Lean.Letter.Letters.Lil Devil.Line Blocks.Linux.Lockergnome.Madrid.Marquee.Maxfour.Merlin1.Merlin2.Mike.Mini.Mirror.Mnemonic.Modular.Mono 12.Mono 9.Morse.Morse2.Moscow.Mshebrew210.Muzzle.NScript.NT Greek.NV Script.Nancyj-Fancy.Nancyj-Improved.Nancyj-Underlined.Nancyj.Nipples.O8.OS2.Octal.Ogre.Old Banner.Pagga.Patorjk's Cheese.Patorjk-HeX.Pawp.Peaks Slant.Peaks.Pebbles.Pepper.Poison.Puffy.Puzzle.Pyramid.Rammstein.Rebel.Rectangles.Red Phoenix.Relief.Relief2.Reverse.Roman.Rot13.Rotated.Rounded.Rowan Cap.Rozzo.RubiFont.Runic.Runyc.S Blood.SL Script.Santa Clara.Script.Serifcap.Shaded Blocky.Shadow.Shimrod.Short.Slant Relief.Slant.Slide.Small ASCII 12.Small ASCII 9.Small Block.Small Braille.Small Caps.Small Isometric1.Small Keyboard.Small Mono 12.Small Mono 9.Small Poison.Small Script.Small Shadow.Small Slant.Small Tengwar.Small.Soft.Speed.Spliff.Stacey.Stampate.Stampatello.Standard.Star Strips.Star Wars.Stellar.Stforek.Stick Letters.Stop.Straight.Stronger Than All.Sub-Zero.Swamp Land.Swan.Sweet.THIS.Tanja.Tengwar.Term.Terrace.Test1.The Edge.Thick.Thin.Thorned.Three Point.Ticks Slant.Ticks.Tiles.Tinker-Toy.Tmplr.Tombstone.Train.Trek.Tsalagi.Tubular.Twisted.Two Point.USA Flag.Univers.Upside Down Text.Varsity.Wavescape.Wavy.Weird.Wet Letter.Whimsy.WideTerm.Wow.miniwi`.split(`.`),Hr={"ANSI-Compact":`ANSI Compact`},Ur=e=>Hr[e]?Hr[e]:e;function Wr(e){return/[.*+?^${}()|[\]\\]/.test(e)?`\\`+e:e}var Gr=(()=>{let{FULL_WIDTH:e=0,FITTING:t,SMUSHING:n,CONTROLLED_SMUSHING:r}=zr,i={},a={font:`Standard`,fontPath:`./fonts`,fetchFontIfMissing:!0};function o(e,t,n){let r=Wr(e.trim().slice(-1))||`@`,i=t===n-1?RegExp(r+r+`?\\s*$`):RegExp(r+`\\s*$`);return e.replace(i,``)}function s(i=-1,a=null){let o={},s,c=[[16384,`vLayout`,n],[8192,`vLayout`,t],[4096,`vRule5`,!0],[2048,`vRule4`,!0],[1024,`vRule3`,!0],[512,`vRule2`,!0],[256,`vRule1`,!0],[128,`hLayout`,n],[64,`hLayout`,t],[32,`hRule6`,!0],[16,`hRule5`,!0],[8,`hRule4`,!0],[4,`hRule3`,!0],[2,`hRule2`,!0],[1,`hRule1`,!0]];s=a===null?i:a;for(let[e,t,n]of c)s>=e?(s-=e,o[t]===void 0&&(o[t]=n)):t!==`vLayout`&&t!==`hLayout`&&(o[t]=!1);return o.hLayout===void 0?i===0?o.hLayout=t:i===-1?o.hLayout=e:o.hRule1||o.hRule2||o.hRule3||o.hRule4||o.hRule5||o.hRule6?o.hLayout=r:o.hLayout=n:o.hLayout===n&&(o.hRule1||o.hRule2||o.hRule3||o.hRule4||o.hRule5||o.hRule6)&&(o.hLayout=r),o.vLayout===void 0?o.vRule1||o.vRule2||o.vRule3||o.vRule4||o.vRule5?o.vLayout=r:o.vLayout=e:o.vLayout===n&&(o.vRule1||o.vRule2||o.vRule3||o.vRule4||o.vRule5)&&(o.vLayout=r),o}function c(e,t,n=``){return e===t&&e!==n?e:!1}function l(e,t){let n=`|/\\[]{}()<>`;if(e===`_`){if(n.indexOf(t)!==-1)return t}else if(t===`_`&&n.indexOf(e)!==-1)return e;return!1}function u(e,t){let n=`| /\\ [] {} () <>`,r=n.indexOf(e),i=n.indexOf(t);if(r!==-1&&i!==-1&&r!==i&&Math.abs(r-i)!==1){let e=Math.max(r,i),t=e+1;return n.substring(e,t)}return!1}function d(e,t){let n=`[] {} ()`,r=n.indexOf(e),i=n.indexOf(t);return r!==-1&&i!==-1&&Math.abs(r-i)<=1?`|`:!1}function f(e,t){return{"/\\":`|`,"\\/":`Y`,"><":`X`}[e+t]||!1}function p(e,t,n=``){return e===n&&t===n?n:!1}function m(e,t){return e===t?e:!1}function h(e,t){return l(e,t)}function g(e,t){return u(e,t)}function _(e,t){return e===`-`&&t===`_`||e===`_`&&t===`-`?`=`:!1}function v(e,t){return e===`|`&&t===`|`?`|`:!1}function y(e,t,n){return t===` `||t===``||t===n&&e!==` `?e:t}function b(r,i,a){if(a.fittingRules&&a.fittingRules.vLayout===e)return`invalid`;let o,s=Math.min(r.length,i.length),c,l,u=!1,d;if(s===0)return`invalid`;for(o=0;o<s;o++)if(c=r.substring(o,o+1),l=i.substring(o,o+1),c!==` `&&l!==` `){if(a.fittingRules&&a.fittingRules.vLayout===t)return`invalid`;if(a.fittingRules&&a.fittingRules.vLayout===n)return`end`;if(v(c,l)){u||=!1;continue}if(d=!1,d=a.fittingRules&&a.fittingRules.vRule1?m(c,l):d,d=!d&&a.fittingRules&&a.fittingRules.vRule2?h(c,l):d,d=!d&&a.fittingRules&&a.fittingRules.vRule3?g(c,l):d,d=!d&&a.fittingRules&&a.fittingRules.vRule4?_(c,l):d,u=!0,!d)return`invalid`}return u?`end`:`valid`}function x(e,t,n){let r=e.length,i=e.length,a,o,s,c=1,l,u,d;for(;c<=r;){for(a=e.slice(Math.max(0,i-c),i),o=t.slice(0,Math.min(r,c)),s=o.length,d=``,l=0;l<s;l++)if(u=b(a[l],o[l],n),u===`end`)d=u;else if(u===`invalid`){d=u;break}else d===``&&(d=`valid`);if(d===`invalid`){c--;break}if(d===`end`)break;d===`valid`&&c++}return Math.min(r,c)}function S(e,r,i){let a,o=Math.min(e.length,r.length),s,c,l=``,u,d=i.fittingRules||{};for(a=0;a<o;a++)s=e.substring(a,a+1),c=r.substring(a,a+1),s!==` `&&c!==` `?d.vLayout===t||d.vLayout===n?l+=y(s,c):(u=!1,u=d.vRule5?v(s,c):u,u=!u&&d.vRule1?m(s,c):u,u=!u&&d.vRule2?h(s,c):u,u=!u&&d.vRule3?g(s,c):u,u=!u&&d.vRule4?_(s,c):u,l+=u):l+=y(s,c);return l}function ee(e,t,n,r){let i=e.length,a=t.length,o=e.slice(0,Math.max(0,i-n)),s=e.slice(Math.max(0,i-n),i),c=t.slice(0,Math.min(n,a)),l,u,d,f=[],p;for(u=s.length,l=0;l<u;l++)d=l>=a?s[l]:S(s[l],c[l],r),f.push(d);return p=t.slice(Math.min(n,a),a),[...o,...f,...p]}function C(e,t){let n=` `.repeat(t);return e.map(e=>e+n)}function te(e,t,n){let r=e[0].length,i=t[0].length,a;return r>i?t=C(t,r-i):i>r&&(e=C(e,i-r)),a=x(e,t,n),ee(e,t,a,n)}function ne(r,i,a){let o=a.fittingRules||{};if(o.hLayout===e)return 0;let s,m=r.length,h=i.length,g=m,_=1,v=!1,y,b,x,S;if(m===0)return 0;distCal:for(;_<=g;){let e=m-_;for(y=r.substring(e,e+_),b=i.substring(0,Math.min(_,h)),s=0;s<Math.min(_,h);s++)if(x=y.substring(s,s+1),S=b.substring(s,s+1),x!==` `&&S!==` `){if(o.hLayout===t){--_;break distCal}else if(o.hLayout===n){(x===a.hardBlank||S===a.hardBlank)&&--_;break distCal}else if(v=!0,!(o.hRule1&&c(x,S,a.hardBlank)||o.hRule2&&l(x,S)||o.hRule3&&u(x,S)||o.hRule4&&d(x,S)||o.hRule5&&f(x,S)||o.hRule6&&p(x,S,a.hardBlank))){--_;break distCal}}if(v)break;_++}return Math.min(g,_)}function w(e,r,i,a){let o,s,m=[],h,g,_,v,b,x,S,ee,C=a.fittingRules||{};if(typeof a.height!=`number`)throw Error(`height is not defined.`);for(o=0;o<a.height;o++){S=e[o],ee=r[o],b=S.length,x=ee.length,h=b-i,g=S.slice(0,Math.max(0,h)),_=``;let te=Math.max(0,b-i),ne=S.substring(te,te+i),w=ee.substring(0,Math.min(i,x));for(s=0;s<i;s++){let e=s<b?ne.substring(s,s+1):` `,r=s<x?w.substring(s,s+1):` `;if(e!==` `&&r!==` `)if(C.hLayout===t||C.hLayout===n)_+=y(e,r,a.hardBlank);else{let t=C.hRule1&&c(e,r,a.hardBlank)||C.hRule2&&l(e,r)||C.hRule3&&u(e,r)||C.hRule4&&d(e,r)||C.hRule5&&f(e,r)||C.hRule6&&p(e,r,a.hardBlank)||y(e,r,a.hardBlank);_+=t}else _+=y(e,r,a.hardBlank)}v=i>=x?``:ee.substring(i,i+Math.max(0,x-i)),m[o]=g+_+v}return m}function re(e){return Array(e).fill(``)}let ie=function(e){return Math.max(...e.map(e=>e.length))};function T(e,t,n){return e.reduce(function(e,t){return w(e,t.fig,t.overlap||0,n)},re(t))}function ae(e,t,n){for(let r=e.length-1;r>0;r--){let i=T(e.slice(0,r),t,n);if(ie(i)<=n.width)return{outputFigText:i,chars:e.slice(r)}}return{outputFigText:re(t),chars:e}}function oe(t,n,r){let i,a,o=0,s,c,l,u=r.height,d=[],f,p={chars:[],overlap:o},m=[],h,g,_,v,y;if(typeof u!=`number`)throw Error(`height is not defined.`);c=re(u);let b=r.fittingRules||{};for(r.printDirection===1&&(t=t.split(``).reverse().join(``)),l=t.length,i=0;i<l;i++)if(h=t.substring(i,i+1),g=h.match(/\s/),a=n[h.charCodeAt(0)],v=null,a){if(b.hLayout!==e){for(o=1e4,s=0;s<u;s++)o=Math.min(o,ne(c[s],a[s],r));o=o===1e4?0:o}if(r.width>0&&(r.whitespaceBreak?(_=T(p.chars.concat([{fig:a,overlap:o}]),u,r),v=T(m.concat([{fig:_,overlap:p.overlap}]),u,r),f=ie(v)):(v=w(c,a,o,r),f=ie(v)),f>=r.width&&i>0&&(r.whitespaceBreak?(c=T(m.slice(0,-1),u,r),m.length>1&&(d.push(c),c=re(u)),m=[]):(d.push(c),c=re(u)))),r.width>0&&r.whitespaceBreak&&((!g||i===l-1)&&p.chars.push({fig:a,overlap:o}),g||i===l-1)){for(y=null;v=T(p.chars,u,r),f=ie(v),f>=r.width;)y=ae(p.chars,u,r),p={chars:y.chars},d.push(y.outputFigText);f>0&&(y?m.push({fig:v,overlap:1}):m.push({fig:v,overlap:p.overlap})),g&&(m.push({fig:a,overlap:o}),c=re(u)),i===l-1&&(c=T(m,u,r)),p={chars:[],overlap:o};continue}c=w(c,a,o,r)}return ie(c)>0&&d.push(c),r.showHardBlanks||d.forEach(function(e){for(l=e.length,s=0;s<l;s++)e[s]=e[s].replace(RegExp(`\\`+r.hardBlank,`g`),` `)}),t===``&&d.length===0&&d.push(Array(u).fill(``)),d}let se=function(i,a){let o,s=a.fittingRules||{};if(i==="default")o={hLayout:s.hLayout,hRule1:s.hRule1,hRule2:s.hRule2,hRule3:s.hRule3,hRule4:s.hRule4,hRule5:s.hRule5,hRule6:s.hRule6};else if(i===`full`)o={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(i===`fitted`)o={hLayout:t,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(i===`controlled smushing`)o={hLayout:r,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(i===`universal smushing`)o={hLayout:n,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return o},ce=function(i,a){let o={},s=a.fittingRules||{};if(i==="default")o={vLayout:s.vLayout,vRule1:s.vRule1,vRule2:s.vRule2,vRule3:s.vRule3,vRule4:s.vRule4,vRule5:s.vRule5};else if(i===`full`)o={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(i===`fitted`)o={vLayout:t,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(i===`controlled smushing`)o={vLayout:r,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(i===`universal smushing`)o={vLayout:n,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return o},le=function(e,t,n){n=n.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let r=Ur(e),a=n.split(`
`),o=[],s,c,l;for(c=a.length,s=0;s<c;s++)o=o.concat(oe(a[s],i[r],t));for(c=o.length,l=o[0],s=1;s<c;s++)l=te(l,o[s],t);return l?l.join(`
`):``};function E(e,t){let n;if(n=typeof structuredClone<`u`?structuredClone(e):JSON.parse(JSON.stringify(e)),n.showHardBlanks=t.showHardBlanks||!1,n.width=t.width||-1,n.whitespaceBreak=t.whitespaceBreak||!1,t.horizontalLayout){let r=se(t.horizontalLayout,e);r&&Object.assign(n.fittingRules,r)}if(t.verticalLayout){let r=ce(t.verticalLayout,e);r&&Object.assign(n.fittingRules,r)}return n.printDirection=t.printDirection!==null&&t.printDirection!==void 0?t.printDirection:e.printDirection,n}let D=async function(e,t,n){return D.text(e,t,n)};return D.text=async function(e,t,n){e+=``;let r,i;typeof t==`function`?(i=t,r={font:a.font}):typeof t==`string`?(r={font:t},i=n):t?(r=t,i=n):(r={font:a.font},i=n);let o=r.font||a.font;try{let t=await D.loadFont(o),n=t?le(o,E(t,r),e):``;return i&&i(null,n),n}catch(e){let t=e instanceof Error?e:Error(String(e));if(i)return i(t),``;throw t}},D.textSync=function(e,t){e+=``,typeof t==`string`?t={font:t}:t||={};let n=t.font||a.font;return le(n,E(D.loadFontSync(n),t),e)},D.metadata=async function(e,t){e+=``;try{let n=await D.loadFont(e);if(!n)throw Error(`Error loading font.`);let r=i[Ur(e)]||{},a=[n,r.comment||``];return t&&t(null,n,r.comment),a}catch(e){let n=e instanceof Error?e:Error(String(e));if(t)return t(n),null;throw n}},D.defaults=function(e){return e&&typeof e==`object`&&Object.assign(a,e),typeof structuredClone<`u`?structuredClone(a):JSON.parse(JSON.stringify(a))},D.parseFont=function(e,t,n=!0){if(i[e]&&!n)return i[e].options;t=t.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let r=new Br,a=t.split(`
`),c=a.shift();if(!c)throw Error(`Invalid font file: missing header`);let l=c.split(` `),u={hardBlank:l[0].substring(5,6),height:parseInt(l[1],10),baseline:parseInt(l[2],10),maxLength:parseInt(l[3],10),oldLayout:parseInt(l[4],10),numCommentLines:parseInt(l[5],10),printDirection:l[6]?parseInt(l[6],10):0,fullLayout:l[7]?parseInt(l[7],10):null,codeTagCount:l[8]?parseInt(l[8],10):null};if((u.hardBlank||``).length!==1||[u.height,u.baseline,u.maxLength,u.oldLayout,u.numCommentLines].some(e=>e==null||isNaN(e))||u.height==null||u.numCommentLines==null)throw Error(`FIGlet header contains invalid values.`);u.fittingRules=s(u.oldLayout,u.fullLayout),r.options=u;let d=[];for(let e=32;e<=126;e++)d.push(e);if(d.push(196,214,220,228,246,252,223),a.length<u.numCommentLines+u.height*d.length)throw Error(`FIGlet file is missing data. Line length: ${a.length}. Comment lines: ${u.numCommentLines}. Height: ${u.height}. Num chars: ${d.length}.`);for(r.comment=a.splice(0,u.numCommentLines).join(`
`),r.numChars=0;a.length>0&&r.numChars<d.length;){let e=d[r.numChars];r[e]=a.splice(0,u.height);for(let t=0;t<u.height;t++)r[e][t]===void 0?r[e][t]=``:r[e][t]=o(r[e][t],t,u.height);r.numChars++}for(;a.length>0;){let e=a.shift();if(!e||e.trim()===``)break;let t=e.split(` `)[0],n;if(/^-?0[xX][0-9a-fA-F]+$/.test(t))n=parseInt(t,16);else if(/^-?0[0-7]+$/.test(t))n=parseInt(t,8);else if(/^-?[0-9]+$/.test(t))n=parseInt(t,10);else throw Error(`Error parsing data. Invalid data: ${t}`);if(n===-1||n<-2147483648||n>2147483647)throw Error(`Error parsing data. ${n===-1?`The char code -1 is not permitted.`:`The char code cannot be ${n<-2147483648?`less than -2147483648`:`greater than 2147483647`}.`}`);r[n]=a.splice(0,u.height);for(let e=0;e<u.height;e++)r[n][e]===void 0?r[n][e]=``:r[n][e]=o(r[n][e],e,u.height);r.numChars++}return i[e]=r,u},D.loadedFonts=()=>Object.keys(i),D.clearLoadedFonts=()=>{Object.keys(i).forEach(e=>{delete i[e]})},D.loadFont=async function(e,t){let n=Ur(e);if(i[n]){let e=i[n].options;return t&&t(null,e),Promise.resolve(e)}try{if(!a.fetchFontIfMissing)throw Error(`Font is not loaded: ${n}`);let e=await fetch(`${a.fontPath}/${n}.flf`);if(!e.ok)throw Error(`Network response was not ok: ${e.status}`);let r=await e.text(),i=D.parseFont(n,r);return t&&t(null,i),i}catch(e){let n=e instanceof Error?e:Error(String(e));if(t)return t(n),null;throw n}},D.loadFontSync=function(e){let t=Ur(e);if(i[t])return i[t].options;throw Error(`Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.`)},D.preloadFonts=async function(e,t){try{for(let t of e){let e=Ur(t),n=await fetch(`${a.fontPath}/${e}.flf`);if(!n.ok)throw Error(`Failed to preload fonts. Error fetching font: ${e}, status code: ${n.statusText}`);let r=await n.text();D.parseFont(e,r)}t&&t()}catch(e){let n=e instanceof Error?e:Error(String(e));if(t){t(n);return}throw e}},D.fonts=function(e){return new Promise(function(t,n){t(Vr),e&&e(null,Vr)})},D.fontsSync=function(){return Vr},D.figFonts=i,D})();Gr.parseFont(`Standard`,`flf2a$ 6 5 16 15 13 0 24463 229
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
         `),Gr.parseFont(`Slant`,`flf2a$ 6 5 16 15 10 0 18319
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
`),Gr.parseFont(`Banner`,`flf2a$ 8 7 54 0 12 0 64 185
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
`),Gr.parseFont(`Small`,`flf2a$ 5 4 13 15 10 0 22415
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
`);var Kr={name:`figlet`,description:`Convert text to ASCII art`,execute:(e,t)=>{let n=new O(e);if(n.hasFlag(`help`))return{output:`Usage: figlet [options] <text>

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
  small      - Compact font`};let r;if(t)r=t.trim();else if(n.positionalCount>0)r=n.getAllPositionals().join(` `);else return{output:`figlet: missing text argument
Try 'figlet --help' for more information.`,error:!0};let i=n.getFlag(`f`),a=typeof i==`string`?i:`Standard`,o=a.charAt(0).toUpperCase()+a.slice(1).toLowerCase(),s=`default`;n.hasFlag(`c`)?s=`full`:n.hasFlag(`r`)&&(s=`fitted`);try{return{output:Gr.textSync(r,{font:o,horizontalLayout:s})}}catch(e){return e instanceof Error?e.message.includes(`font`)||e.message.includes(`Font`)||e.message.includes(`FIGlet`)?{output:`figlet: font '${o}' not found or invalid\nAvailable fonts: standard, slant, banner, small`,error:!0}:{output:`figlet: ${e.message}`,error:!0}:{output:`figlet: unknown error occurred`,error:!0}}}};function qr(){let e=window.innerWidth,t=window.innerHeight,n=document.querySelector(`header`),r=n?n.getBoundingClientRect().height:60;return{width:Math.max(400,Math.floor(e*.95)),height:Math.max(300,Math.floor(t-r))}}function Jr(e){return{name:`life`,description:`Conway's Game of Life cellular automaton`,execute:(t,n)=>{let r=new O(t);if(r.hasFlag(`help`))return{output:`Usage: life [options]

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

Note: Animation continues until you scroll, type, or run 'clear'`};let i=2,a=r.getFlag(`speed`);if(a!==void 0){let e=parseFloat(String(a));if(isNaN(e)||e<.5||e>10)return{output:`life: invalid speed '${a}'\nSpeed must be between 0.5 and 10.0`,error:!0};i=e}let o=.3,s=r.getFlag(`density`);if(s!==void 0){let e=parseFloat(String(s));if(isNaN(e)||e<0||e>1)return{output:`life: invalid density '${s}'\nDensity must be between 0.0 and 1.0`,error:!0};o=e}let c=r.getFlag(`pattern`),l=`random`;if(c!==void 0){let e=String(c),t=[`random`,`acorn`,`glider`,`blinker`];if(!t.includes(e))return{output:`life: invalid pattern '${e}'\nValid patterns: ${t.join(`, `)}`,error:!0};l=e}let u=r.getFlag(`theme`),d=e.getCurrentColors();if(u!==void 0){let t=String(u),n=[`green`,`yellow`,`white`,`light-blue`,`paper`,`dc`,`custom`];if(!n.includes(t))return{output:`life: invalid theme '${t}'\nValid themes: ${n.join(`, `)}`,error:!0};if(t!==`custom`){let n=e.getPreset(t);n&&(d=n.colors)}}let{width:f,height:p}=qr(),m=Math.floor(p*.8),h=d[`--terminal-accent`],g=d[`--terminal-dim`];return{output:`
<div class="life-container" style="background-color: ${d[`--terminal-bg`]}; min-height: ${m}px;">
  <canvas id="life-canvas" class="life-grid"
          width="${f}"
          height="${p}"
          data-speed="${i}"
          data-density="${o}"
          data-pattern="${l}"
          data-accent-color="${h}"
          data-dim-color="${g}"
          style="width: 100%; height: ${m}px; display: block;">
  </canvas>
</div>
`,html:!0}}}}var Yr=[`#ff6b35`,`#ff8c42`,`#ffaa4f`,`#ffc85c`,`#e6e669`,`#c4e676`,`#9fe683`,`#7ae690`,`#5ad69d`,`#3ac6aa`,`#1bb6b7`,`#00a6c4`,`#0096d1`,`#0086de`];function Xr(e,t,n,r){let i=e/n+t*r;return Yr[Math.floor(Math.abs(i))%Yr.length]}function Zr(e){return/<(div|span|pre)\s+(class|style)=/i.test(e)}function Qr(e,t,n){return e.split(`
`).map((e,r)=>{let i=0;return[...e].map(e=>e===` `||e===`	`?e:`<span style="color: ${Xr(i++,r,t,n)}">${M(e)}</span>`).join(``)}).join(`
`)}function $r(e,t,n){let r=0,i=0,a=``,o=!1,s=!1,c=``;for(let l of e)if(l===`<`)o=!0,a+=l;else if(l===`>`)o=!1,a+=l;else if(o)a+=l;else if(l===`&`)s=!0,c=l;else if(s){if(c+=l,l===`;`){s=!1;let e=Xr(i++,r,t,n);a+=`<span style="color: ${e}">${c}</span>`,c=``}}else if(l===`
`)a+=l,r++,i=0;else if(l===` `||l===`	`)a+=l;else{let e=Xr(i++,r,t,n);a+=`<span style="color: ${e}">${l}</span>`}return a}var ei={name:`lolcat`,description:`Rainbow-colorize text output`,execute:(e,t)=>{let n=new O(e);if(n.hasFlag(`help`))return{output:`Usage: lolcat [options] [text...]

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
  lolcat --freq 1.0 "Lines"      More variation between lines`};let r=n.getFlag(`spread`),i=3;if(typeof r==`string`){let e=parseFloat(r);if(isNaN(e)||e<1||e>10)return{output:`lolcat: invalid spread '${r}'\nSpread must be between 1 and 10.`,error:!0};i=e}let a=n.getFlag(`freq`),o=.3;if(typeof a==`string`){let e=parseFloat(a);if(isNaN(e)||e<.1||e>2)return{output:`lolcat: invalid freq '${a}'\nFrequency must be between 0.1 and 2.0.`,error:!0};o=e}let s;if(t)s=t;else if(n.positionalCount>0)s=n.getAllPositionals().join(` `);else return{output:`lolcat: missing text input
Try 'lolcat --help' for more information.`,error:!0};return Zr(s)?{output:$r(s,i,o),html:!0}:{output:`<pre class="lolcat-output">${Qr(s,i,o)}</pre>`,html:!0}}},ti=3600;function ni(e){return{name:`make`,description:`Build targets from a Makefile`,execute:(t,n)=>{if(new O(t).hasFlag(`help`))return{output:`Usage: make [target...]

Description:
  Build targets specified in the Makefile. If no target is specified,
  the default target is used.

Options:
  --help               Show this help message

Examples:
  make                 # Build default target
  make coffee          # Build the coffee target
  make me a sandwich   # Try it and see`};let r=t.join(` `);if(r===`me a sandwich`)return{output:`What? Make it yourself.`};if(r===`coffee`){let t=[{text:`Grinding beans...`,delay:0},{text:`Compiling bean.c...`,delay:400},{text:`Linking libcaffeine.so...`,delay:800}],n=1200,r=`<div class="make-container">`+t.map(e=>`<div class="make-line" style="animation-delay: ${e.delay}ms;">${e.text}</div>`).join(``)+`<div class="make-line" style="animation-delay: ${n}ms;">Brewing dark roast <span class="make-progress-track"><span class="make-progress-bar" style="animation-delay: ${n}ms;"></span></span> 100%</div><div class="make-line" style="animation-delay: 3400ms;">make: Ready. Careful, it's hot.</div></div>`;return e.setInputLineVisible(!1),setTimeout(()=>{e.setInputLineVisible(!0),e.focus(!0)},ti),{output:r,html:!0}}return t.length===0?{output:`make: *** No targets specified. Stop.`,error:!0}:{output:`make: *** No rule to make target '${t[0]}'. Stop.`,error:!0}}}}var ri=`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ`;function ii(){let e=document.getElementById(`terminal-output`);if(!e)return{cols:80,rows:24};let t=e.getBoundingClientRect(),n=parseFloat(getComputedStyle(document.documentElement).getPropertyValue(`--terminal-font-size`)||`16`),r=n*.6,i=n*1.5,a=Math.floor(t.width/r),o=Math.floor(t.height/i);return{cols:Math.max(a,20),rows:Math.max(o,10)}}function ai(){return ri[Math.floor(Math.random()*81)]}function oi(e){return{name:`matrix`,description:`Display Matrix digital rain animation`,execute:(t,n)=>{let r=new O(t);if(r.hasFlag(`help`))return{output:`Usage: matrix [options]

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

Note: Animation continues until you scroll, type, or run 'clear'`};let i=1,a=r.getFlag(`speed`);if(a!==void 0){let e=parseFloat(String(a));if(isNaN(e)||e<.1||e>5)return{output:`matrix: invalid speed value '${a}'\nSpeed must be between 0.1 and 5.0`,error:!0};i=e}let o=r.getFlag(`theme`),s=e.getCurrentColors();if(o!==void 0){let t=String(o),n=[`green`,`yellow`,`white`,`light-blue`,`paper`,`dc`,`custom`];if(!n.includes(t))return{output:`matrix: invalid theme '${t}'\nValid themes: ${n.join(`, `)}`,error:!0};if(t!==`custom`){let n=e.getPreset(t);n&&(s=n.colors)}}let{cols:c,rows:l}=ii(),u=1.2,d=Math.floor(c/u)+5,f=Math.min(l,20),p=s[`--terminal-accent`],m=s[`--terminal-dim`],h=s[`--terminal-bg`],g=l*1.5,_=-f*1.5,v=g,y=[];for(let e=0;e<d;e++){let t=-Math.random()*5,n=(5+Math.random()*5)/i,r=e*u,a=[];for(let e=0;e<f;e++){let t=(e/f)**2,n=e===f-1,r=ai();a.push(`<span class="matrix-char${n?` matrix-char-bright`:``}" data-char-index="${e}" style="color: ${n?p:m}; opacity: ${t};">${r}</span>`)}y.push(`
  <div class="matrix-column" data-column-index="${e}" data-trail-length="${f}" style="
    left: ${r}em;
    animation: matrix-fall ${n}s linear ${t}s infinite;
    --matrix-start: ${_}em;
    --matrix-end: ${v}em;
  ">${a.join(``)}</div>`)}return{output:`
<div class="matrix-rain" data-matrix-chars="${ri}" style="height: ${g}em; background-color: ${h};">
${y.join(``)}
</div>
`,html:!0}}}}function si(){return[{type:`info`,text:`Broadcast message from root@darinchambers.com:`},{type:`info`,text:`The system is going down for poweroff NOW!`},{type:`ok`,text:`Stopped Session c1 of user darin`},{type:`ok`,text:`Stopped Target - Graphical Interface`},{type:`ok`,text:`Stopped Code Editor Process`},{type:`ok`,text:`Stopped Docker Container Runtime`},{type:`ok`,text:`Stopped OpenSSH Server`},{type:`failed`,text:`Stopped Bluetooth Service (timeout)`},{type:`ok`,text:`Stopped Network Manager`},{type:`ok`,text:`Stopped D-Bus System Message Bus`},{type:`ok`,text:`Stopped Journal Service`},{type:`ok`,text:`Stopped System Logging Service`},{type:`info`,text:`Sending SIGTERM to remaining processes...`},{type:`info`,text:`Sending SIGKILL to remaining processes...`},{type:`ok`,text:`Unmounted /home`},{type:`ok`,text:`Unmounted /var`},{type:`ok`,text:`Unmounted /tmp`},{type:`info`,text:`All filesystems unmounted.`},{type:`ok`,text:`Reached target - Power-Off`}]}function ci(e){let t=si(),n=t.map((e,t)=>{let n=t*150;return`<div class="${`boot-line boot-line-${e.type}`}" style="animation-delay: ${n}ms;">${e.text.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}</div>`}),r=t.length*150,i=e?`System halted.`:`Power off.`;n.push(`<div class="boot-line boot-line-info" style="animation-delay: ${r}ms;">${i}</div>`);let a=r+500;return n.push(`<div class="boot-overlay" style="animation-delay: ${a}ms;" data-boot-overlay="true"><span class="boot-overlay-text">Screen off</span></div>`),n.join(`
`)}var li={name:`shutdown`,description:`Display simulated Linux shutdown sequence`,execute:(e,t)=>{let n=new O(e);return n.hasFlag(`help`)?{output:`Usage: shutdown [options]

Display a simulated Linux shutdown sequence with services stopping,
filesystems unmounting, and a power-off screen.

Options:
  --halt     Show "System halted" instead of "Power off"
  --help     Display this help message

Examples:
  shutdown          # Show shutdown with power off
  shutdown --halt   # Show shutdown with system halt

Note: The screen goes black after shutdown. Scroll or type to dismiss.`}:{output:`<div class="boot-sequence shutdown-sequence" data-boot-type="shutdown">
${ci(n.hasFlag(`halt`))}
</div>`,html:!0,clearBefore:!0,fullscreen:!0,fullscreenExitCommand:`boot`,scrollBehavior:`top`}}},ui={name:`reboot`,description:`Display simulated system reboot sequence`,execute:(e,t)=>{let n=new O(e);if(n.hasFlag(`help`))return{output:`Usage: reboot [options]

Display a simulated system reboot sequence combining
shutdown and boot animations.

Options:
  --fast     Show abbreviated sequences
  --help     Display this help message

Examples:
  reboot          # Show full reboot sequence
  reboot --fast   # Show quick reboot sequence

Note: The full sequence takes about 10 seconds. Scroll or type to stop.`};let r=n.hasFlag(`fast`);return{output:`<div class="boot-sequence reboot-sequence" data-boot-type="reboot">
${ci(!1).split(`
`).filter(e=>!e.includes(`data-boot-overlay`)).join(`
`)}
<div class="boot-line boot-line-info" style="animation-delay: 3000ms;">Rebooting...</div>
</div>`,html:!0,clearBefore:!0,fullscreen:!0,scrollBehavior:`top`,scheduledCommand:{command:r?`boot --fast`:`boot`,delayMs:7e3,clearBefore:!0}}}},di=class{static generateHeader(){return`
 ██████╗  █████╗ ██████╗ ██╗███╗   ██╗     ██████╗██╗  ██╗ █████╗ ███╗   ███╗██████╗ ███████╗██████╗ ███████╗
 ██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║    ██╔════╝██║  ██║██╔══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔════╝
 ██║  ██║███████║██████╔╝██║██╔██╗ ██║    ██║     ███████║███████║██╔████╔██║██████╔╝█████╗  ██████╔╝███████╗
 ██║  ██║██╔══██║██╔══██╗██║██║╚██╗██║    ██║     ██╔══██║██╔══██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗╚════██║
 ██████╔╝██║  ██║██║  ██║██║██║ ╚████║    ╚██████╗██║  ██║██║  ██║██║ ╚═╝ ██║██████╔╝███████╗██║  ██║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
`}static getTagline(){return`Technologist, Inventor | Building What's Next on Rock-Solid Foundations`}};function fi(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function pi(e){if(Array.isArray(e))return e}function mi(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t!==0)for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function hi(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function gi(e,t){return pi(e)||mi(e,t)||_i(e,t)||hi()}function _i(e,t){if(e){if(typeof e==`string`)return fi(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?fi(e,t):void 0}}var vi=Object.entries,yi=Object.setPrototypeOf,bi=Object.isFrozen,xi=Object.getPrototypeOf,Si=Object.getOwnPropertyDescriptor,W=Object.freeze,G=Object.seal,Ci=Object.create,wi=typeof Reflect<`u`&&Reflect,Ti=wi.apply,Ei=wi.construct;W||=function(e){return e},G||=function(e){return e},Ti||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},Ei||=function(e){return new e(...[...arguments].slice(1))};var Di=J(Array.prototype.forEach),Oi=J(Array.prototype.lastIndexOf),ki=J(Array.prototype.pop),Ai=J(Array.prototype.push),ji=J(Array.prototype.splice),Mi=Array.isArray,Ni=J(String.prototype.toLowerCase),Pi=J(String.prototype.toString),Fi=J(String.prototype.match),Ii=J(String.prototype.replace),Li=J(String.prototype.indexOf),Ri=J(String.prototype.trim),zi=J(Number.prototype.toString),Bi=J(Boolean.prototype.toString),Vi=typeof BigInt>`u`?null:J(BigInt.prototype.toString),Hi=typeof Symbol>`u`?null:J(Symbol.prototype.toString),K=J(Object.prototype.hasOwnProperty),Ui=J(Object.prototype.toString),q=J(RegExp.prototype.test),Wi=Gi(TypeError);function J(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return Ti(e,t,n)}}function Gi(e){return function(){return Ei(e,[...arguments])}}function Y(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ni;if(yi&&yi(e,null),!Mi(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(bi(t)||(t[r]=e),i=e)}e[i]=!0}return e}function Ki(e){for(let t=0;t<e.length;t++)K(e,t)||(e[t]=null);return e}function X(e){let t=Ci(null);for(let r of vi(e)){var n=gi(r,2);let i=n[0],a=n[1];K(e,i)&&(Mi(a)?t[i]=Ki(a):a&&typeof a==`object`&&a.constructor===Object?t[i]=X(a):t[i]=a)}return t}function qi(e){switch(typeof e){case`string`:return e;case`number`:return zi(e);case`boolean`:return Bi(e);case`bigint`:return Vi?Vi(e):`0`;case`symbol`:return Hi?Hi(e):`Symbol()`;case`undefined`:return Ui(e);case`function`:case`object`:{if(e===null)return Ui(e);let t=e,n=Ji(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:Ui(e)}return Ui(e)}default:return Ui(e)}}function Ji(e,t){for(;e!==null;){let n=Si(e,t);if(n){if(n.get)return J(n.get);if(typeof n.value==`function`)return J(n.value)}e=xi(e)}function n(){return null}return n}function Yi(e){try{return q(e,``),!0}catch{return!1}}var Xi=W(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),Zi=W(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),Qi=W([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),$i=W([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),ea=W(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),ta=W([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),na=W([`#text`]),ra=W(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),ia=W(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-rendering.textlength.type.u1.u2.unicode.values.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),aa=W(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),oa=W([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),sa=G(/{{[\w\W]*|^[\w\W]*}}/g),ca=G(/<%[\w\W]*|^[\w\W]*%>/g),la=G(/\${[\w\W]*/g),ua=G(/^data-[\-\w.\u00B7-\uFFFF]+$/),da=G(/^aria-[\-\w]+$/),fa=G(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),pa=G(/^(?:\w+script|data):/i),ma=G(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ha=G(/^html$/i),ga=G(/^[a-z][.\w]*(-[.\w]+)+$/i),_a=G(/<[/\w!]/g),va=G(/<[/\w]/g),ya=G(/<\/no(script|embed|frames)/i),ba=G(/\/>/i),xa={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Sa=function(){return typeof window>`u`?null:window},Ca=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},wa=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Ta=function(e,t,n,r){return K(e,t)&&Mi(e[t])?Y(r.base?X(r.base):{},e[t],r.transform):n};function Ea(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Sa(),t=e=>Ea(e);if(t.version=`3.4.10`,t.removed=[],!e||!e.document||e.document.nodeType!==xa.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=Ji(d,`cloneNode`),p=Ji(d,`remove`),m=Ji(d,`nextSibling`),h=Ji(d,`childNodes`),g=Ji(d,`parentNode`),_=Ji(d,`shadowRoot`),v=Ji(d,`attributes`),y=o&&o.prototype?Ji(o.prototype,`nodeType`):null,b=o&&o.prototype?Ji(o.prototype,`nodeName`):null;if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let x,S=``,ee,C=!1,te=0,ne=function(){if(te>0)throw Wi(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},w=function(e){ne(),te++;try{return x.createHTML(e)}finally{te--}},re=function(e){ne(),te++;try{return x.createScriptURL(e)}finally{te--}},ie=function(){return C||=(ee=Ca(u,i),!0),ee},T=n,ae=T.implementation,oe=T.createNodeIterator,se=T.createDocumentFragment,ce=T.getElementsByTagName,le=r.importNode,E=wa();t.isSupported=typeof vi==`function`&&typeof g==`function`&&ae&&ae.createHTMLDocument!==void 0;let D=sa,ue=ca,de=la,fe=ua,pe=da,me=pa,he=ma,ge=ga,O=fa,k=null,_e=Y({},[...Xi,...Zi,...Qi,...ea,...na]),A=null,ve=Y({},[...ra,...ia,...aa,...oa]),j=Object.seal(Ci(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ye=null,be=null,xe=Object.seal(Ci(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Se=!0,Ce=!0,M=!1,we=!0,Te=!1,Ee=!0,De=!1,Oe=!1,ke=!1,Ae=!1,je=!1,Me=!1,Ne=!0,Pe=!1,Fe=`user-content-`,Ie=!0,Le=!1,N={},P=null,Re=Y({},`annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),F=null,ze=Y({},[`audio`,`video`,`img`,`source`,`image`,`track`]),Be=null,Ve=Y({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),He=`http://www.w3.org/1998/Math/MathML`,Ue=`http://www.w3.org/2000/svg`,I=`http://www.w3.org/1999/xhtml`,We=I,Ge=!1,Ke=null,qe=Y({},[He,Ue,I],Pi),Je=W([`mi`,`mo`,`mn`,`ms`,`mtext`]),Ye=Y({},Je),Xe=W([`annotation-xml`]),Ze=Y({},Xe),Qe=Y({},[`title`,`style`,`font`,`a`,`script`]),$e=null,et=[`application/xhtml+xml`,`text/html`],L=null,tt=null,nt=n.createElement(`form`),rt=function(e){return e instanceof RegExp||e instanceof Function},it=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(tt&&tt===e)return;(!e||typeof e!=`object`)&&(e={}),e=X(e),$e=et.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,L=$e===`application/xhtml+xml`?Pi:Ni,k=Ta(e,`ALLOWED_TAGS`,_e,{transform:L}),A=Ta(e,`ALLOWED_ATTR`,ve,{transform:L}),Ke=Ta(e,`ALLOWED_NAMESPACES`,qe,{transform:Pi}),Be=Ta(e,`ADD_URI_SAFE_ATTR`,Ve,{transform:L,base:Ve}),F=Ta(e,`ADD_DATA_URI_TAGS`,ze,{transform:L,base:ze}),P=Ta(e,`FORBID_CONTENTS`,Re,{transform:L}),ye=Ta(e,`FORBID_TAGS`,X({}),{transform:L}),be=Ta(e,`FORBID_ATTR`,X({}),{transform:L}),N=K(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?X(e.USE_PROFILES):e.USE_PROFILES:!1,Se=e.ALLOW_ARIA_ATTR!==!1,Ce=e.ALLOW_DATA_ATTR!==!1,M=e.ALLOW_UNKNOWN_PROTOCOLS||!1,we=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=e.SAFE_FOR_TEMPLATES||!1,Ee=e.SAFE_FOR_XML!==!1,De=e.WHOLE_DOCUMENT||!1,Ae=e.RETURN_DOM||!1,je=e.RETURN_DOM_FRAGMENT||!1,Me=e.RETURN_TRUSTED_TYPE||!1,ke=e.FORCE_BODY||!1,Ne=e.SANITIZE_DOM!==!1,Pe=e.SANITIZE_NAMED_PROPS||!1,Ie=e.KEEP_CONTENT!==!1,Le=e.IN_PLACE||!1,O=Yi(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:fa,We=typeof e.NAMESPACE==`string`?e.NAMESPACE:I,Ye=K(e,`MATHML_TEXT_INTEGRATION_POINTS`)&&e.MATHML_TEXT_INTEGRATION_POINTS&&typeof e.MATHML_TEXT_INTEGRATION_POINTS==`object`?X(e.MATHML_TEXT_INTEGRATION_POINTS):Y({},Je),Ze=K(e,`HTML_INTEGRATION_POINTS`)&&e.HTML_INTEGRATION_POINTS&&typeof e.HTML_INTEGRATION_POINTS==`object`?X(e.HTML_INTEGRATION_POINTS):Y({},Xe);let t=K(e,`CUSTOM_ELEMENT_HANDLING`)&&e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING==`object`?X(e.CUSTOM_ELEMENT_HANDLING):Ci(null);if(j=Ci(null),K(t,`tagNameCheck`)&&rt(t.tagNameCheck)&&(j.tagNameCheck=t.tagNameCheck),K(t,`attributeNameCheck`)&&rt(t.attributeNameCheck)&&(j.attributeNameCheck=t.attributeNameCheck),K(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(j.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),G(j),Te&&(Ce=!1),je&&(Ae=!0),N&&(k=Y({},na),A=Ci(null),N.html===!0&&(Y(k,Xi),Y(A,ra)),N.svg===!0&&(Y(k,Zi),Y(A,ia),Y(A,oa)),N.svgFilters===!0&&(Y(k,Qi),Y(A,ia),Y(A,oa)),N.mathMl===!0&&(Y(k,ea),Y(A,aa),Y(A,oa))),xe.tagCheck=null,xe.attributeCheck=null,K(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?xe.tagCheck=e.ADD_TAGS:Mi(e.ADD_TAGS)&&(k===_e&&(k=X(k)),Y(k,e.ADD_TAGS,L))),K(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?xe.attributeCheck=e.ADD_ATTR:Mi(e.ADD_ATTR)&&(A===ve&&(A=X(A)),Y(A,e.ADD_ATTR,L))),K(e,`ADD_URI_SAFE_ATTR`)&&Mi(e.ADD_URI_SAFE_ATTR)&&Y(Be,e.ADD_URI_SAFE_ATTR,L),K(e,`FORBID_CONTENTS`)&&Mi(e.FORBID_CONTENTS)&&(P===Re&&(P=X(P)),Y(P,e.FORBID_CONTENTS,L)),K(e,`ADD_FORBID_CONTENTS`)&&Mi(e.ADD_FORBID_CONTENTS)&&(P===Re&&(P=X(P)),Y(P,e.ADD_FORBID_CONTENTS,L)),Ie&&(k[`#text`]=!0),De&&Y(k,[`html`,`head`,`body`]),k.table&&(Y(k,[`tbody`]),delete ye.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw Wi(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw Wi(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=x;x=e.TRUSTED_TYPES_POLICY;try{S=w(``)}catch(e){throw x=t,e}}else e.TRUSTED_TYPES_POLICY===null?(x=void 0,S=``):(x===void 0&&(x=ie()),x&&typeof S==`string`&&(S=w(``)));(E.uponSanitizeElement.length>0||E.uponSanitizeAttribute.length>0)&&k===_e&&(k=X(k)),E.uponSanitizeAttribute.length>0&&A===ve&&(A=X(A)),W&&W(e),tt=e},at=Y({},[...Zi,...Qi,...$i]),ot=Y({},[...ea,...ta]),st=function(e,t,n){return t.namespaceURI===I?e===`svg`:t.namespaceURI===He?e===`svg`&&(n===`annotation-xml`||Ye[n]):!!at[e]},ct=function(e,t,n){return t.namespaceURI===I?e===`math`:t.namespaceURI===Ue?e===`math`&&Ze[n]:!!ot[e]},lt=function(e,t,n){return t.namespaceURI===Ue&&!Ze[n]||t.namespaceURI===He&&!Ye[n]?!1:!ot[e]&&(Qe[e]||!at[e])},ut=function(e){let t=g(e);(!t||!t.tagName)&&(t={namespaceURI:We,tagName:`template`});let n=Ni(e.tagName),r=Ni(t.tagName);return Ke[e.namespaceURI]?e.namespaceURI===Ue?st(n,t,r):e.namespaceURI===He?ct(n,t,r):e.namespaceURI===I?lt(n,t,r):!!($e===`application/xhtml+xml`&&Ke[e.namespaceURI]):!1},dt=function(e){Ai(t.removed,{element:e});try{g(e).removeChild(e)}catch{if(p(e),!g(e))throw Wi(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},ft=function(e){let t=h(e);if(t){let e=[];Di(t,t=>{Ai(e,t)}),Di(e,e=>{try{p(e)}catch{}})}let n=v(e);if(n)for(let t=n.length-1;t>=0;--t){let r=n[t],i=r&&r.name;if(typeof i==`string`)try{e.removeAttribute(i)}catch{}}},pt=function(e,n){try{Ai(t.removed,{attribute:n.getAttributeNode(e),from:n})}catch{Ai(t.removed,{attribute:null,from:n})}if(n.removeAttribute(e),e===`is`)if(Ae||je)try{dt(n)}catch{}else try{n.setAttribute(e,``)}catch{}},mt=function(e){let t=v(e);if(t)for(let n=t.length-1;n>=0;--n){let r=t[n],i=r&&r.name;if(!(typeof i!=`string`||A[L(i)]))try{e.removeAttribute(i)}catch{}}},ht=function(e){let t=[e];for(;t.length>0;){let e=t.pop();(y?y(e):e.nodeType)===xa.element&&mt(e);let n=h(e);if(n)for(let e=n.length-1;e>=0;--e)t.push(n[e])}},gt=function(e){let t=null,r=null;if(ke)e=`<remove></remove>`+e;else{let t=Fi(e,/^[\r\n\t ]+/);r=t&&t[0]}$e===`application/xhtml+xml`&&We===I&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=x?w(e):e;if(We===I)try{t=new l().parseFromString(i,$e)}catch{}if(!t||!t.documentElement){t=ae.createDocument(We,`template`,null);try{t.documentElement.innerHTML=Ge?S:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),We===I?ce.call(t,De?`html`:`body`)[0]:De?t.documentElement:a},_t=function(e){return oe.call(e.ownerDocument||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},vt=function(e){return e=Ii(e,D,` `),e=Ii(e,ue,` `),e=Ii(e,de,` `),e},yt=function(e){e.normalize();let t=oe.call(e.ownerDocument||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),n=t.nextNode();for(;n;)n.data=vt(n.data),n=t.nextNode();let r=e.querySelectorAll?.call(e,`template`);r&&Di(r,e=>{xt(e.content)&&yt(e.content)})},bt=function(e){let t=b?b(e):null;return typeof t!=`string`||L(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==v(e)||typeof e.removeAttribute!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==y(e)||e.childNodes!==h(e)},xt=function(e){if(!y||typeof e!=`object`||!e)return!1;try{return y(e)===xa.documentFragment}catch{return!1}},St=function(e){if(!y||typeof e!=`object`||!e)return!1;try{return typeof y(e)==`number`}catch{return!1}};function Ct(e,n,r){e.length!==0&&Di(e,e=>{e.call(t,n,r,tt)})}let wt=function(e,t){return!!(Ee&&e.hasChildNodes()&&!St(e.firstElementChild)&&q(_a,e.textContent)&&q(_a,e.innerHTML)||Ee&&e.namespaceURI===I&&t===`style`&&St(e.firstElementChild)||e.nodeType===xa.processingInstruction||Ee&&e.nodeType===xa.comment&&q(va,e.data))},Tt=function(e,t){if(!ye[t]&&kt(t)&&(j.tagNameCheck instanceof RegExp&&q(j.tagNameCheck,t)||j.tagNameCheck instanceof Function&&j.tagNameCheck(t)))return!1;if(Ie&&!P[t]){let t=g(e),n=h(e);if(n&&t){let r=n.length;for(let i=r-1;i>=0;--i){let r=Le?n[i]:f(n[i],!0);t.insertBefore(r,m(e))}}}return dt(e),!0},Et=function(e){if(Ct(E.beforeSanitizeElements,e,null),bt(e))return dt(e),!0;let n=L(b?b(e):e.nodeName);if(Ct(E.uponSanitizeElement,e,{tagName:n,allowedTags:k}),wt(e,n))return dt(e),!0;if(ye[n]||!(xe.tagCheck instanceof Function&&xe.tagCheck(n))&&!k[n])return Tt(e,n);if((y?y(e):e.nodeType)===xa.element&&!ut(e)||(n===`noscript`||n===`noembed`||n===`noframes`)&&q(ya,e.innerHTML))return dt(e),!0;if(Te&&e.nodeType===xa.text){let n=vt(e.textContent);e.textContent!==n&&(Ai(t.removed,{element:e.cloneNode()}),e.textContent=n)}return Ct(E.afterSanitizeElements,e,null),!1},Dt=function(e,t,r){if(be[t]||Ne&&(t===`id`||t===`name`)&&(r in n||r in nt))return!1;let i=A[t]||xe.attributeCheck instanceof Function&&xe.attributeCheck(t,e);if(!(Ce&&q(fe,t))&&!(Se&&q(pe,t))){if(!i){if(!(kt(e)&&(j.tagNameCheck instanceof RegExp&&q(j.tagNameCheck,e)||j.tagNameCheck instanceof Function&&j.tagNameCheck(e))&&(j.attributeNameCheck instanceof RegExp&&q(j.attributeNameCheck,t)||j.attributeNameCheck instanceof Function&&j.attributeNameCheck(t,e))||t===`is`&&j.allowCustomizedBuiltInElements&&(j.tagNameCheck instanceof RegExp&&q(j.tagNameCheck,r)||j.tagNameCheck instanceof Function&&j.tagNameCheck(r))))return!1}else if(!Be[t]&&!q(O,Ii(r,he,``))&&!((t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&Li(r,`data:`)===0&&F[e])&&!(M&&!q(me,Ii(r,he,``)))&&r)return!1}return!0},Ot=Y({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),kt=function(e){return!Ot[Ni(e)]&&q(ge,e)},At=function(e,t,n,r){if(x&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return w(r);case`TrustedScriptURL`:return re(r)}return r},jt=function(e,n,r,i){try{r?e.setAttributeNS(r,n,i):e.setAttribute(n,i),bt(e)?dt(e):ki(t.removed)}catch{pt(n,e)}},Mt=function(e){Ct(E.beforeSanitizeAttributes,e,null);let t=e.attributes;if(!t||bt(e))return;let n={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:A,forceKeepAttr:void 0},r=t.length,i=L(e.nodeName);for(;r--;){let a=t[r],o=a.name,s=a.namespaceURI,c=a.value,l=L(o),u=c,d=o===`value`?u:Ri(u);if(n.attrName=l,n.attrValue=d,n.keepAttr=!0,n.forceKeepAttr=void 0,Ct(E.uponSanitizeAttribute,e,n),d=n.attrValue,Pe&&(l===`id`||l===`name`)&&Li(d,Fe)!==0&&(pt(o,e),d=Fe+d),Ee&&q(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,d)){pt(o,e);continue}if(l===`attributename`&&Fi(d,`href`)){pt(o,e);continue}if(!n.forceKeepAttr){if(!n.keepAttr){pt(o,e);continue}if(!we&&q(ba,d)){pt(o,e);continue}if(Te&&(d=vt(d)),!Dt(i,l,d)){pt(o,e);continue}d=At(i,l,s,d),d!==u&&jt(e,o,s,d)}}Ct(E.afterSanitizeAttributes,e,null)},Nt=function(e){let t=null,n=_t(e);for(Ct(E.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(Ct(E.uponSanitizeShadowNode,t,null),Et(t),Mt(t),xt(t.content)&&Nt(t.content),(y?y(t):t.nodeType)===xa.element){let e=_(t);xt(e)&&(Pt(e),Nt(e))}Ct(E.afterSanitizeShadowDOM,e,null)},Pt=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){Nt(e.shadow);continue}let n=e.node,r=(y?y(n):n.nodeType)===xa.element,i=h(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=b?b(n):null;if(typeof e==`string`&&L(e)===`template`){let e=n.content;xt(e)&&t.push({node:e,shadow:null})}}if(r){let e=_(n);xt(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(Ge=!e,Ge&&(e=`<!-->`),typeof e!=`string`&&!St(e)&&(e=qi(e),typeof e!=`string`))throw Wi(`dirty is not a string, aborting`);if(!t.isSupported)return e;Oe||it(n),t.removed=[];let c=Le&&typeof e!=`string`&&St(e);if(c){let t=b?b(e):e.nodeName;if(typeof t==`string`){let e=L(t);if(!k[e]||ye[e])throw Wi(`root node is forbidden and cannot be sanitized in-place`)}if(bt(e))throw Wi(`root node is clobbered and cannot be sanitized in-place`);try{Pt(e)}catch(t){throw ft(e),t}}else if(St(e))i=gt(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===xa.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),Pt(a);else{if(!Ae&&!Te&&!De&&e.indexOf(`<`)===-1)return x&&Me?w(e):e;if(i=gt(e),!i)return Ae?null:Me?S:``}i&&ke&&dt(i.firstChild);let l=_t(c?e:i);try{for(;o=l.nextNode();)Et(o),Mt(o),xt(o.content)&&Nt(o.content)}catch(t){throw c&&ft(e),t}if(c)return Di(t.removed,e=>{e.element&&ht(e.element)}),Te&&yt(e),e;if(Ae){if(Te&&yt(i),je)for(s=se.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(A.shadowroot||A.shadowrootmode)&&(s=le.call(r,s,!0)),s}let u=De?i.outerHTML:i.innerHTML;return De&&k[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&q(ha,i.ownerDocument.doctype.name)&&(u=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+u),Te&&(u=vt(u)),x&&Me?w(u):u},t.setConfig=function(){it(arguments.length>0&&arguments[0]!==void 0?arguments[0]:{}),Oe=!0},t.clearConfig=function(){tt=null,Oe=!1,x=ee,S=``},t.isValidAttribute=function(e,t,n){return tt||it({}),Dt(L(e),L(t),n)},t.addHook=function(e,t){typeof t==`function`&&Ai(E[e],t)},t.removeHook=function(e,t){if(t!==void 0){let n=Oi(E[e],t);return n===-1?void 0:ji(E[e],n,1)[0]}return ki(E[e])},t.removeHooks=function(e){E[e]=[]},t.removeAllHooks=function(){E=wa()},t}var Da=Ea();function Oa(e){return Da.sanitize(e,{ALLOWED_TAGS:`p.div.span.br.strong.b.em.i.u.s.a.code.pre.h1.h2.h3.h4.h5.h6.ul.ol.li.blockquote.table.thead.tbody.tr.th.td.img.canvas.button.input.select.option.label.aside.section.details.summary`.split(`.`),ALLOWED_ATTR:`class.id.href.target.rel.src.alt.title.width.height.type.value.checked.selected.disabled.min.max.step.placeholder.data-command.data-command-template.data-setting-type.data-color-var.data-theme.data-settings-panel.data-graph.data-graph-src.data-graph-theme.data-graph-initialized.data-graph-error.data-speed.data-density.data-pattern.data-accent-color.data-dim-color.style.open.role.aria-label.aria-labelledby.aria-describedby.aria-valuemin.aria-valuemax.aria-valuenow.aria-valuetext.aria-live.aria-atomic.aria-current`.split(`.`),RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1})}var ka=class{headerElement;constructor(e){this.headerElement=e,this.render(),this.setupClickHandler()}render(){let e=di.generateHeader(),t=di.getTagline();this.headerElement.innerHTML=Oa(`
      <div class="header-prompt">$ whoami | figlet | lolcat</div>
      <div class="header-ascii">
        <pre class="header-ascii-text header-clickable">${e}</pre>
      </div>
      <p class="header-tagline">${t}</p>
    `)}setupClickHandler(){this.headerElement.addEventListener(`click`,e=>{let t=e.target;if(t.classList.contains(`header-clickable`)||t.closest(`.header-clickable`)){let e=new CustomEvent(`terminal-command`,{detail:`clear`,bubbles:!0});document.dispatchEvent(e)}})}},Aa=class{navLinksElement;onCommandClick;activeCommand=null;constructor(e,t){this.navLinksElement=e,this.onCommandClick=t}setItems(e){this.navLinksElement.innerHTML=``,e.forEach(e=>{let t=document.createElement(`button`);t.className=`nav-link`,t.type=`button`,t.textContent=e.label,t.setAttribute(`data-command`,e.command),t.setAttribute(`aria-label`,`Navigate to ${e.label}`),t.addEventListener(`click`,()=>{this.onCommandClick(e.command)}),this.navLinksElement.appendChild(t)})}addItem(e){let t=document.createElement(`button`);t.className=`nav-link`,t.type=`button`,t.textContent=e.label,t.setAttribute(`data-command`,e.command),t.setAttribute(`aria-label`,`Navigate to ${e.label}`),t.addEventListener(`click`,()=>{this.onCommandClick(e.command)}),this.navLinksElement.appendChild(t)}clear(){this.navLinksElement.innerHTML=``}setActiveItem(e){this.activeCommand=e,this.navLinksElement.querySelectorAll(`button[data-command]`).forEach(e=>{e.removeAttribute(`aria-current`)});let t=this.navLinksElement.querySelector(`button[data-command="${e}"]`);t&&t.setAttribute(`aria-current`,`page`)}getActiveCommand(){return this.activeCommand}};function ja(){document.querySelectorAll(`a.email-protected`).forEach(e=>{if(e.dataset.protected===`true`)return;let t=e.dataset.user,n=e.dataset.domain;if(!t||!n){console.warn(`Email link missing data-user or data-domain attributes`,e);return}e.dataset.protected=`true`,e.addEventListener(`click`,e=>{e.preventDefault();let r=`mailto:${`${t}@${n}`}`;window.location.href=r}),e.addEventListener(`keydown`,e=>{if(e.key===`Enter`||e.key===` `){e.preventDefault();let r=`mailto:${`${t}@${n}`}`;window.location.href=r}}),e.hasAttribute(`tabindex`)||e.setAttribute(`tabindex`,`0`)})}var Ma=class{envVarManager;constructor(e){this.envVarManager=e}format(e,t){let n=e;return this.envVarManager&&(n=this.envVarManager.expandVariables(n)),n=this.expandBashEscapes(n,t),n=this.expandCustomTokens(n,t),n}expandBashEscapes(e,t){let n=e;return n=n.replace(/\\u/g,t.user),n=n.replace(/\\h/g,this.getShortHostname(t.hostname)),n=n.replace(/\\H/g,t.hostname),n=n.replace(/\\w/g,t.shortPwd),n=n.replace(/\\W/g,t.lastDir),n=n.replace(/\\\$/g,t.isRoot?`#`:`$`),n=n.replace(/\\d/g,this.getDate()),n=n.replace(/\\t/g,this.getTime24()),n=n.replace(/\\T/g,this.getTime12()),n=n.replace(/\\A/g,this.getTimeShort()),n=n.replace(/\\@/g,this.getTimeAMPM()),t.historyNumber!==void 0&&(n=n.replace(/\\!/g,String(t.historyNumber))),t.commandNumber!==void 0&&(n=n.replace(/\\#/g,String(t.commandNumber))),n=n.replace(/\\\\/g,`\\`),n=n.replace(/\\n/g,`
`),n}expandCustomTokens(e,t){let n=e;return n=n.replace(/\{user\}/g,t.user),n=n.replace(/\{hostname\}/g,t.hostname),n=n.replace(/\{path\}/g,t.shortPwd),n=n.replace(/\{lastdir\}/g,t.lastDir),n=n.replace(/\{pwd\}/g,t.pwd),n}getShortHostname(e){let t=e.indexOf(`.`);return t>0?e.substring(0,t):e}getDate(){let e=new Date;return`${[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`][e.getDay()]} ${[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`][e.getMonth()]} ${String(e.getDate()).padStart(2,`0`)}`}getTime24(){let e=new Date;return`${String(e.getHours()).padStart(2,`0`)}:${String(e.getMinutes()).padStart(2,`0`)}:${String(e.getSeconds()).padStart(2,`0`)}`}getTime12(){let e=new Date,t=e.getHours(),n=t>=12?`PM`:`AM`;return t=t%12||12,`${String(t).padStart(2,`0`)}:${String(e.getMinutes()).padStart(2,`0`)}:${String(e.getSeconds()).padStart(2,`0`)} ${n}`}getTimeShort(){let e=new Date;return`${String(e.getHours()).padStart(2,`0`)}:${String(e.getMinutes()).padStart(2,`0`)}`}getTimeAMPM(){let e=new Date,t=e.getHours(),n=t>=12?`PM`:`AM`;return t=t%12||12,`${String(t).padStart(2,`0`)}:${String(e.getMinutes()).padStart(2,`0`)} ${n}`}static getLastDir(e){if(e===`/`)return`/`;if(e===`~`||e===``)return`~`;let t=e.split(`/`).filter(e=>e&&e!==`~`);return t.length>0?t[t.length-1]:`~`}},Na=[`terminal-header`,`terminal-nav`,`terminal-input-line`],Pa=[`keydown`,`click`,`touchstart`,`wheel`],Fa=class{runExitCommand;active=!1;exitHandler=null;exitCommand=null;constructor(e){this.runExitCommand=e}enter(e,t){this.active||(this.active=!0,this.exitCommand=e??null,this.setChromeHidden(!0),this.exitHandler=()=>this.exit(),setTimeout(()=>{if(!(!this.active||!this.exitHandler))for(let e of Pa)document.addEventListener(e,this.exitHandler,{once:!0})},100),t!==void 0&&setTimeout(()=>this.exit(),t))}reset(){this.active=!1,this.exitCommand=null,this.removeListeners()}exit(){if(!this.active)return;this.active=!1;let e=this.exitCommand;this.exitCommand=null,this.setChromeHidden(!1),this.removeListeners(),e&&setTimeout(()=>this.runExitCommand(e),100)}removeListeners(){if(this.exitHandler){for(let e of Pa)document.removeEventListener(e,this.exitHandler);this.exitHandler=null}}setChromeHidden(e){for(let t of Na)document.getElementById(t)?.classList.toggle(`fullscreen-hidden`,e)}},Ia=class{deps;constructor(e){this.deps=e,document.addEventListener(`terminal-command`,e=>{let t=e;this.deps.executeCommand(t.detail)}),document.addEventListener(`click`,e=>this.handleClick(e)),document.addEventListener(`change`,e=>this.handleChange(e)),document.addEventListener(`input`,e=>this.handleInput(e)),document.addEventListener(`settings-changed`,()=>{this.refreshPanels(),this.deps.onSettingsChanged()})}handleClick(e){let t=e.target;if(t.closest(`[data-command]`)&&!t.closest(`.nav-link`)){let n=t.closest(`[data-command]`),r=n.getAttribute(`data-command`);if(!r)return;n.tagName===`A`&&e.preventDefault();let i=this.deps.getRouter();if(i){let e=i.getPathForCommand(r);if(e){i.navigate(e,!1);return}}this.deps.executeCommand(r)}}handleChange(e){let t=e.target,n=t.getAttribute(`data-command-template`),r=t.getAttribute(`data-setting-type`);if(!n)return;let i=``;t instanceof HTMLInputElement&&t.type===`checkbox`?i=`${n} ${t.checked?`on`:`off`}`:t instanceof HTMLInputElement&&t.type===`color`||t instanceof HTMLInputElement&&t.type===`range`?i=`${n} ${t.value}`:t instanceof HTMLSelectElement&&(i=r===`font-family`?`${n} "${t.value}"`:`${n} ${t.value}`),i&&this.deps.executeCommand(i)}handleInput(e){let t=e.target;if(t.type!==`range`)return;let n=t.getAttribute(`data-setting-type`);if(n===`font-size`){let e=document.getElementById(`font-size-value`);e&&(e.textContent=`${t.value}px`)}else if(n===`animation-speed`){let e=document.getElementById(`animation-speed-value`);e&&(e.textContent=`${t.value}x`)}}refreshPanels(){let{settingsManager:e,themeManager:t}=this.deps;if(!e||!t)return;let n=document.querySelectorAll(`[data-settings-panel]`);if(n.length===0)return;let r=Array.from(n).some(e=>e.contains(document.activeElement)),i=ir(e,t);n.forEach(e=>{e.innerHTML=Oa(i.replace(`<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true">`,``).replace(/<\/aside>$/,``))}),r&&n[0].querySelector(`button, input, select`)?.focus()}focusPanelIfPresent(){setTimeout(()=>{(document.querySelector(`[data-settings-panel]`)?.querySelector(`button, input, select`))?.focus()},0)}},La=class{inputElement;promptElement;history=[];historyIndex=-1;currentInput=``;availableCommands=[];fileSystem;constructor(e,t){this.inputElement=e,this.promptElement=t,this.setupEventListeners()}setupEventListeners(){this.inputElement.addEventListener(`keydown`,e=>this.handleKeyDown(e))}handleKeyDown(e){switch(e.key){case`ArrowUp`:e.preventDefault(),this.navigateHistory(`up`);break;case`ArrowDown`:e.preventDefault(),this.navigateHistory(`down`);break;case`Tab`:if(e.shiftKey||this.inputElement.value.trim()===``)return;e.preventDefault(),this.handleTabCompletion();break}}navigateHistory(e){this.history.length!==0&&(this.historyIndex===-1&&(this.currentInput=this.inputElement.value),e===`up`?this.historyIndex<this.history.length-1&&(this.historyIndex++,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex>0?(this.historyIndex--,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex===0&&(this.historyIndex=-1,this.inputElement.value=this.currentInput))}handleTabCompletion(){let e=this.inputElement.value;if(!e)return;let t=e.split(/\s+/);t.length===1?this.completeCommand(e.trim()):this.completeFilePath(t)}completeCommand(e){let t=this.availableCommands.filter(t=>t.startsWith(e.toLowerCase()));if(t.length===1)this.inputElement.value=t[0];else if(t.length>1){let n=this.findCommonPrefix(t);n.length>e.length&&(this.inputElement.value=n)}}completeFilePath(e){if(!this.fileSystem)return;let t=e[e.length-1],n=e.slice(0,-1).join(` `),r=this.fileSystem.getCurrentPath(),i=t,a=t.lastIndexOf(`/`);if(a!==-1){let e=t.substring(0,a+1);i=t.substring(a+1),r=e.startsWith(`/`)?e:this.resolvePath(this.fileSystem.getCurrentPath(),e)}try{if(!this.fileSystem.exists(r)||!this.fileSystem.isDirectory(r))return;let e=this.fileSystem.list(r).filter(e=>e.toLowerCase().startsWith(i.toLowerCase()));if(e.length===0)return;let o=this.findCommonPrefix(e),s;if(s=a===-1?o:t.substring(0,a+1)+o,e.length===1){let t=this.resolvePath(r,e[0]);this.fileSystem.isDirectory(t)&&(s+=`/`)}this.inputElement.value=n+(n?` `:``)+s}catch{return}}resolvePath(e,t){if(t.startsWith(`/`))return t;let n=e.split(`/`).filter(e=>e),r=t.split(`/`).filter(e=>e);for(let e of r)e===`..`?n.pop():e!==`.`&&n.push(e);return`/`+n.join(`/`)}findCommonPrefix(e){if(e.length===0)return``;if(e.length===1)return e[0];let t=e[0];for(let n=1;n<e.length;n++)for(;!e[n].startsWith(t);)if(t=t.substring(0,t.length-1),t===``)return``;return t}addToHistory(e){e.trim()&&(this.history.push(e),this.historyIndex=-1,this.currentInput=``)}getValue(){return this.inputElement.value}clear(){this.inputElement.value=``,this.currentInput=``,this.historyIndex=-1}focus(e=!1){!e&&this.isMobileDevice()||this.inputElement.focus({preventScroll:!0})}isMobileDevice(){return`ontouchstart`in window||navigator.maxTouchPoints>0||window.matchMedia(`(max-width: 768px)`).matches}setPrompt(e){this.promptElement.textContent=e}setAvailableCommands(e){this.availableCommands=e}setFileSystem(e){this.fileSystem=e}setInputType(e){this.inputElement.type=e}getHistory(){return[...this.history]}onSubmit(e){this.inputElement.addEventListener(`keydown`,t=>{t.key===`Enter`&&e(this.getValue())})}},Ra=class{outputElement;inputLineElement;screensaverElements=[];isScreensaverOutput=!1;constructor(e){this.outputElement=e,this.inputLineElement=document.getElementById(`terminal-input-line`)}startScreensaverOutput(){this.screensaverElements=[],this.isScreensaverOutput=!0}writeLine(e,t,n){let r=document.createElement(`div`);r.className=`output-line`+(t?` ${t}`:``),r.textContent=e,this.inputLineElement?.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),n&&n()}write(e,t,n){let r=e.split(`
`);r.forEach((e,n)=>{(n<r.length-1||e)&&this.writeLine(e,t)}),n&&n()}writeHTML(e,t){let n=document.createElement(`div`);n.className=`output-line`,n.innerHTML=Oa(e),this.isScreensaverOutput&&=(this.screensaverElements.push(n),!1),this.inputLineElement?.parentElement===this.outputElement?this.outputElement.insertBefore(n,this.inputLineElement):this.outputElement.appendChild(n),t&&t()}writeError(e,t){let n=e.split(`
`);n.forEach((e,r)=>{if(r<n.length-1||e){let n=document.createElement(`div`);n.className=`output-line output-error`,n.textContent=e;let i=`error-${Date.now()}-${r}`;if(n.id=i,n.setAttribute(`role`,`alert`),t&&r===0){let e=document.getElementById(t);if(e){let t=e.getAttribute(`aria-describedby`);t?e.setAttribute(`aria-describedby`,`${t} ${i}`):e.setAttribute(`aria-describedby`,i)}}this.inputLineElement?.parentElement===this.outputElement?this.outputElement.insertBefore(n,this.inputLineElement):this.outputElement.appendChild(n)}}),this.scrollToBottom()}writeCommand(e,t,n){let r=document.createElement(`div`);r.className=`output-line`;let i=document.createElement(`span`);i.style.color=`var(--terminal-accent)`,i.textContent=e;let a=document.createElement(`span`);a.textContent=t,r.appendChild(i),r.appendChild(a),this.isScreensaverOutput&&this.screensaverElements.push(r),this.inputLineElement?.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),n&&n()}clear(){Array.from(this.outputElement.children).forEach(e=>{e.id!==`terminal-input-line`&&e.remove()})}clearScreensaverOutput(){this.screensaverElements.forEach(e=>{e.parentElement&&e.remove()}),this.screensaverElements=[],this.isScreensaverOutput=!1}scrollToBottom(){let e=this.outputElement.parentElement;e&&(e.scrollTop=e.scrollHeight)}scrollToCommand(){let e=this.outputElement.querySelectorAll(`.output-line`);e.length>=2?e[e.length-2].scrollIntoView({behavior:`instant`,block:`start`}):e.length===1?e[0].scrollIntoView({behavior:`instant`,block:`start`}):this.scrollToBottom()}performScrollBehavior(e){requestAnimationFrame(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{setTimeout(()=>{e===`top`?this.scrollToCommand():this.scrollToBottom()},50)})})})}},za=class{dispatcher;executor;settingsManager;themeManager;envVarManager;input;output;username=`darin`;hostname=`darinchambers.com`;currentPath=`~`;promptFormatter;router;screensaverManager;inputInterceptor=null;fullscreen;settingsUI;constructor(e,t,n,r,i){this.dispatcher=e,this.executor=t,this.settingsManager=n,this.themeManager=r,this.envVarManager=i;let a=document.getElementById(`terminal-output`),o=document.getElementById(`terminal-input`),s=document.getElementById(`terminal-prompt`);if(!a||!o||!s)throw Error(`Required terminal elements not found`);this.output=new Ra(a),this.input=new La(o,s),this.promptFormatter=new Ma(i),this.fullscreen=new Fa(e=>void this.executeCommand(e,!0)),this.settingsUI=new Ia({settingsManager:this.settingsManager,themeManager:this.themeManager,executeCommand:e=>void this.executeCommand(e,!1),getRouter:()=>this.router,onSettingsChanged:()=>{this.updatePrompt(),this.screensaverManager?.handleSettingsChange()}}),this.setupInputHandler(),this.setupClickHandler(a),this.setupKeyboardHandlers(),this.setupMobileViewportHandler(),this.updatePrompt()}setupClickHandler(e){e.addEventListener(`click`,e=>{let t=window.getSelection();if(t&&t.toString().length>0)return;let n=e.target,r=[`svg`,`button`,`a`,`input`,`select`,`textarea`,`[data-graph]`,`[data-graph-src]`,`.graph-container`].join(`, `);n.closest(r)||this.input.focus(!0)})}setupKeyboardHandlers(){document.addEventListener(`keydown`,e=>{if(e.key===`Escape`){let t=document.querySelectorAll(`[data-settings-panel]`);if(t.length>0){let n=document.activeElement;n&&t[0].contains(n)&&(e.preventDefault(),this.input.focus(!0))}}})}setupMobileViewportHandler(){if(!window.visualViewport)return;let e=window.visualViewport.height;window.visualViewport.addEventListener(`resize`,()=>{let t=window.visualViewport.height;t>e&&this.scrollToHeader(),e=t})}scrollToHeader(){requestAnimationFrame(()=>{let e=document.getElementById(`terminal-header`);e?e.scrollIntoView({behavior:`smooth`,block:`start`}):window.scrollTo({top:0,behavior:`smooth`})})}setupInputHandler(){this.input.onSubmit(async e=>{if(this.inputInterceptor){let t=this.inputInterceptor;this.inputInterceptor=null,this.input.clear(),await t(e.trim()),setTimeout(()=>this.input.focus(!0),100);return}let t=e.trim();if(this.input.clear(),this.output.writeCommand(this.getPromptString(),t),this.input.addToHistory(t),t){let e=await this.executor.execute(t);this.displayResult(e),this.router&&this.router.syncUrlToCommand(t)}setTimeout(()=>{this.input.focus(!0)},100)})}displayResult(e){if(e.clearBefore&&this.output.clear(),e.fullscreen&&this.fullscreen.enter(e.fullscreenExitCommand,e.fullscreenDuration),e.output===jn.CLEAR_SCREEN?(this.output.clear(),this.router&&window.location.pathname!==`/`&&window.history.pushState({},``,`/`)):e.output&&!e.raw&&(e.error?this.output.writeError(e.output):e.html?(this.output.writeHTML(e.output,()=>{typeof window.initializeGraphs==`function`&&window.initializeGraphs(),ja(),this.output.performScrollBehavior(e.scrollBehavior)}),this.settingsUI.focusPanelIfPresent()):this.output.write(e.output,void 0,()=>{this.output.performScrollBehavior(e.scrollBehavior)})),e.scheduledCommand){let{command:t,delayMs:n,clearBefore:r}=e.scheduledCommand;setTimeout(()=>{this.fullscreen.reset(),r&&this.output.clear(),this.executeCommand(t,!0)},n)}}getPromptString(){let e={user:this.username,hostname:this.hostname,pwd:this.envVarManager?.getVariable(`PWD`)??this.currentPath,shortPwd:this.currentPath,lastDir:Ma.getLastDir(this.currentPath),isRoot:this.username===`root`},t=this.settingsManager?.getSetting(`prompt`)?.format??`\\u@\\h:\\W\\$ `;return this.promptFormatter.format(t,e)}updatePrompt(){this.input.setPrompt(this.getPromptString())}registerCommand(e){this.dispatcher.registerCommand(e),this.input.setAvailableCommands(this.dispatcher.getCommandNames())}registerCommands(e){e.forEach(e=>this.registerCommand(e))}setFileSystem(e){this.input.setFileSystem(e)}writeWelcome(e){this.output.write(e,void 0,()=>{this.output.performScrollBehavior()})}setUsername(e){this.username=e,this.updatePrompt()}getUsername(){return this.username}setCurrentPath(e){this.currentPath=e,this.updatePrompt()}setInputInterceptor(e){this.inputInterceptor=e}writeOutput(e){this.output.write(e)}writeError(e){this.output.writeError(e)}showResult(e){this.displayResult(e)}setInputLineVisible(e){let t=document.getElementById(`terminal-input-line`);t&&(t.style.display=e?``:`none`)}focus(e=!1){this.input.focus(e)}getInput(){return this.input}getOutput(){return this.output}stopScreensaverAnimations(){se(),w()}clearScreensaver(){this.stopScreensaverAnimations(),this.output.clearScreensaverOutput()}setRouter(e){this.router=e}setScreensaverManager(e){this.screensaverManager=e}async executeCommand(e,t=!1){if(t&&this.output.clear(),this.output.writeCommand(this.getPromptString(),e),this.input.addToHistory(e),e.trim()){let t=await this.executor.execute(e);this.displayResult(t)}this.input.clear(),this.input.focus()}},Ba=class{aliases=new Map;fileSystem;aliasFilePath=H.CONFIG_ALIASES;defaultAliases=new Map([[`ll`,`ls -alh`]]);constructor(e){this.fileSystem=e,this.loadDefaultAliases(),this.loadAliases()}loadDefaultAliases(){this.defaultAliases.forEach((e,t)=>{this.aliases.set(t,e)})}loadAliases(){try{this.fileSystem.exists(this.aliasFilePath)&&this.fileSystem.isFile(this.aliasFilePath)&&this.fileSystem.readFile(this.aliasFilePath).split(`
`).filter(e=>e.trim()).forEach(e=>{let t=/^alias\s+(\S+)='(.+)'$/.exec(e);t&&this.aliases.set(t[1],t[2])})}catch{}}saveAliases(){let e=Array.from(this.aliases.entries()).map(([e,t])=>`alias ${e}='${t}'`),t=e.join(`
`)+(e.length>0?`
`:``);try{this.fileSystem.writeFile(this.aliasFilePath,t)}catch(e){throw Error(`Failed to save aliases: ${e instanceof Error?e.message:String(e)}`,{cause:e})}}setAlias(e,t){if(!/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(e))throw Error(`Invalid alias name: ${e}`);this.aliases.set(e,t),this.saveAliases()}removeAlias(e){let t=this.aliases.has(e);return t&&(this.aliases.delete(e),this.saveAliases()),t}getAlias(e){return this.aliases.get(e)}getAllAliases(){return new Map(this.aliases)}isDefaultAlias(e){return this.defaultAliases.has(e)}resolve(e){let t=/^(\S+)/.exec(e);if(!t)return e;let n=t[1],r=this.aliases.get(n);if(r){let t=e.replace(/^(\S+)/,r);return this.resolveRecursive(t,10)}return e}resolveRecursive(e,t){if(t<=0)return e;let n=/^(\S+)/.exec(e);if(!n)return e;let r=n[1],i=this.aliases.get(r);if(i){let n=e.replace(/^(\S+)/,i);return this.resolveRecursive(n,t-1)}return e}},Va=class{static parse(e){let t=e.trim();if(!t)return{command:``,args:[],raw:e};let n=this.splitCommand(t);return{command:n[0]?.toLowerCase()||``,args:n.slice(1),raw:e}}static splitCommand(e){let t=[],n=``,r=!1,i=``,a=!1;for(let o of e){if(o===`\\`&&!a){a=!0;continue}if(a){n+=o,a=!1;continue}(o===`"`||o===`'`)&&!r?(r=!0,i=o):o===i&&r?(r=!1,i=``):o===` `&&!r?n&&=(t.push(n),``):n+=o}return n&&t.push(n),t}},Ha=class extends Error{constructor(e){super(e),this.name=`AppError`,Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},Z=class extends Ha{constructor(e){super(e),this.name=`FileSystemError`}},Ua=class extends Ha{constructor(e){super(`Command not found: ${e}`),this.name=`CommandNotFoundError`}},Wa=class{static parse(e){let t=[],n=``,r=!1,i=``;for(let a=0;a<e.length;a++){let o=e[a],s=a>0?e[a-1]:``;if((o===`"`||o===`'`)&&s!==`\\`)r?o===i&&(r=!1,i=``):(r=!0,i=o),n+=o;else if(o===`|`&&!r){let e=n.trim();e&&t.push(e),n=``}else n+=o}let a=n.trim();return a&&t.push(a),t}static hasPipe(e){let t=!1,n=``;for(let r=0;r<e.length;r++){let i=e[r],a=r>0?e[r-1]:``;if((i===`"`||i===`'`)&&a!==`\\`)t?i===n&&(t=!1,n=``):(t=!0,n=i);else if(i===`|`&&!t)return!0}return!1}},Ga=class{commands=new Map;registerCommand(e){this.commands.set(e.name.toLowerCase(),e),e.aliases&&e.aliases.forEach(t=>{this.commands.set(t.toLowerCase(),e)})}unregisterCommand(e){let t=e.toLowerCase(),n=this.commands.get(t);return n?(this.commands.delete(n.name.toLowerCase()),this.commands.forEach((e,t)=>{e===n&&this.commands.delete(t)}),!0):!1}async dispatch(e){let t=Va.parse(e);if(!t.command)return{output:``};let n=this.commands.get(t.command);if(!n)return{output:`${new Ua(t.command).message}\nType 'help' for available commands.`,error:!0};try{return await n.execute(t.args)}catch(e){return e instanceof Ha?{output:e.message,error:!0}:e instanceof Error?{output:`Error: ${e.message}`,error:!0}:{output:`An unknown error occurred.`,error:!0}}}async dispatchPipeline(e){let t=Wa.parse(e);if(t.length===0)return{output:``};let n={output:``};for(let e=0;e<t.length;e++){let r=t[e],i=e===0?void 0:n.output,a=Va.parse(r);if(!a.command)return{output:``};let o=this.commands.get(a.command);if(!o)return{output:`Command not found: ${a.command}\nType 'help' for available commands.`,error:!0};try{if(n=await o.execute(a.args,i),n.error)return n}catch(e){return e instanceof Ha?{output:e.message,error:!0}:e instanceof Error?{output:`Error: ${e.message}`,error:!0}:{output:`An unknown error occurred.`,error:!0}}}return n}getCommands(){let e=new Map;return this.commands.forEach((t,n)=>{t.name===n&&e.set(n,t)}),Array.from(e.values())}getCommandNames(){return Array.from(this.commands.keys())}},Ka=class{dispatcher;aliasManager;envVarManager;constructor(e,t,n){this.dispatcher=e,this.aliasManager=t,this.envVarManager=n}async execute(e){let t=e.trim();if(!t)return{output:``};let n;n=Wa.hasPipe(t)?Wa.parse(t).map(e=>this.aliasManager.resolve(e.trim())).join(` | `):this.aliasManager.resolve(t);let r=this.envVarManager?this.envVarManager.expandVariables(n):n;return Wa.hasPipe(r)?await this.dispatcher.dispatchPipeline(r):await this.dispatcher.dispatch(r)}},qa=class{platformVars=new Map;userVars=new Map;fileSystem;constructor(e,t,n){this.fileSystem=e,this.initializePlatformVariables(t,n),this.loadUserVariables()}initializePlatformVariables(e,t){let n=`/home/${e}`;this.platformVars.set(`HOME`,n),this.platformVars.set(`USER`,e),this.platformVars.set(`LOGNAME`,e),this.platformVars.set(`HOSTNAME`,t),this.platformVars.set(`PWD`,n),this.platformVars.set(`OLDPWD`,``),this.platformVars.set(`SHELL`,`/bin/dcsh`),this.platformVars.set(`PATH`,`/usr/local/bin:/usr/bin:/bin`),this.platformVars.set(`TERM`,`xterm-256color`)}loadUserVariables(){try{let e=localStorage.getItem(Mn.ENVIRONMENT);if(e){let t=JSON.parse(e);Object.entries(t).forEach(([e,t])=>{this.userVars.set(e,t)})}this.syncToFileSystem()}catch(e){console.warn(`Failed to load environment variables from localStorage:`,e)}}saveUserVariables(){try{let e={};this.userVars.forEach((t,n)=>{e[n]=t}),localStorage.setItem(Mn.ENVIRONMENT,JSON.stringify(e)),this.syncToFileSystem()}catch(e){console.warn(`Failed to save environment variables to localStorage:`,e)}}syncToFileSystem(){try{let e=[];e.push(`# Environment Variables`),e.push(`# Platform variables (read-only):`),this.platformVars.forEach((t,n)=>{e.push(`${n}=${t}`)}),this.userVars.size>0&&(e.push(``),e.push(`# User variables:`),this.userVars.forEach((t,n)=>{e.push(`export ${n}=${t}`)}));let t=e.join(`
`);this.fileSystem.writeFile(H.CONFIG_ENV,t)}catch(e){console.warn(`Failed to sync environment variables to filesystem:`,e)}}getVariable(e){return this.userVars.get(e)??this.platformVars.get(e)}setVariable(e,t){if(!/^[A-Z_][A-Z0-9_]*$/i.test(e))throw Error(`Invalid variable name: ${e}`);this.userVars.set(e,t),this.saveUserVariables()}updatePlatformVariable(e,t){this.platformVars.has(e)&&this.platformVars.set(e,t)}unsetVariable(e){this.userVars.delete(e)&&this.saveUserVariables()}getPlatformVariables(){return new Map(this.platformVars)}getUserVariables(){return new Map(this.userVars)}getAllVariables(){let e=new Map;return this.platformVars.forEach((t,n)=>{e.set(n,t)}),this.userVars.forEach((t,n)=>{e.set(n,t)}),e}expandVariables(e){let t=e;return t=t.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/gi,(e,t)=>this.getVariable(t)??e),t=t.replace(/(?<!\\)\$([A-Z_][A-Z0-9_]*)/gi,(e,t)=>this.getVariable(t)??e),t=t.replace(/\\\$/g,`$`),t}exportFormat(){let e=[];return this.getAllVariables().forEach((t,n)=>{e.push(`${n}=${t}`)}),e.sort()}},Ja=t({default:()=>Ya}),Ya=`---
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
`,Xa=t({default:()=>Za}),Za=`---
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
`,Qa=t({default:()=>$a}),$a=`---
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
`,eo=t({default:()=>to}),to=`---
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
`,no=t({default:()=>ro}),ro=`---
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
`,io=t({default:()=>ao}),ao=`# Darin Chambers

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
`,oo=t({default:()=>so}),so=`# Contact Information

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
`,co=t({default:()=>lo}),lo='# Terminal Help\n\nWelcome to my interactive terminal! This is a Unix-like command-line interface where you can explore my work and read my blog.\n\n## Getting Help\n\n- **`help`** - Show this help message\n- **`help <command>`** - Show detailed help for a specific command\n- **`man`** - Display manual pages for commands\n- **`<command> --help`** - Show detailed help for any command\n\n**Example:** `help ls` or `ls --help`\n\n## Available Commands\n\n### Content & Navigation\n\n- **`about`** - Learn about my background and expertise\n- **`portfolio`** - View my projects and accomplishments\n- **`blog`** - Read my blog posts and articles\n- **`notes`** - Short-form notes and thoughts\n- **`contact`** - Get in touch with me\n- **`changelog`** - View project version history\n\n### File System\n\n- **`ls`** - List directory contents\n- **`cd`** - Change directory\n- **`pwd`** - Print working directory\n- **`cat`** - Display file contents\n- **`tree`** - Show directory structure\n- **`mkdir`** - Create directories\n- **`rm`** - Remove files or directories\n- **`rmdir`** - Remove empty directories\n- **`render`** - Render markdown files\n\n### Core Utilities\n\n- **`echo`** - Display text\n- **`date`** - Show current date/time\n- **`clear`** - Clear the screen\n- **`history`** - Show command history\n- **`alias`** - Create command shortcuts\n- **`whoami`** - Display current user\n- **`which`** - Show path of commands\n\n### Novelty\n\n- **`figlet`** - ASCII art text banners\n- **`lolcat`** - Rainbow-colorize text output\n- **`ddate`** - Discordian calendar date\n- **`matrix`** - Matrix digital rain animation\n- **`life`** - Conway\'s Game of Life\n- **`boot`** - Simulated Linux boot sequence\n- **`shutdown`** - Simulated Linux shutdown\n- **`reboot`** - Full reboot animation\n- **`bsod`** - Fake Windows Blue Screen of Death\n\n## Quick Start\n\nTry these commands to explore:\n\n```\nabout           # Learn about me\nportfolio       # See my work\nblog            # Read my posts\nnotes           # Short-form thoughts\ntree            # Explore the file structure\nls ~            # List home directory\n```\n\n## Advanced Features\n\n**Command Piping:** Chain commands with `|`\n\n```\ncat ~/blog/post.md | render\necho "Hello" | figlet\nfiglet "Hi" | lolcat\n```\n\n**Navigation:** Use arrow keys for command history, Tab for auto-complete\n\n**Aliases:** Create shortcuts with `alias ll=\'ls -la\'`\n\n---\n\n**Tip:** For detailed help on any command, use `<command> --help` or `help <command>`\n',uo=t({default:()=>fo}),fo=`# Changelog

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
`,po=class{static createDirectoryNode(e){let t=e.startsWith(`.`);return{name:e,type:`directory`,children:new Map,permissions:`drwxr-xr-x`,owner:`darin`,size:4096,modifiedTime:new Date,isHidden:t}}static createFileNode(e,t){let n=e.startsWith(`.`);return{name:e,type:`file`,content:t,permissions:`-rw-r--r--`,owner:`darin`,size:t.length,modifiedTime:new Date,isHidden:n}}static loadBlogFiles(){let e=Object.assign({"../../content/blog/2025-09-20-01-building-a-minimal-production-graph-library.md":Ja,"../../content/blog/2025-11-14-a-love-letter-to-developers-and-the-terminal.md":Xa,"../../content/blog/2025-11-15-we-trick-rocks-into-thinking.md":Qa,"../../content/blog/2025-11-23-leet-status-unlocked.md":eo}),t=new Map;for(let[n,r]of Object.entries(e)){let e=n.split(`/`).pop(),i=r.default;t.set(e,this.createFileNode(e,i))}return t}static loadPortfolioFiles(){let e=Object.assign({"../../content/portfolio/hypergrowing-a-unicorn.md":no}),t=new Map;for(let[n,r]of Object.entries(e)){let e=n.split(`/`).pop(),i=r.default;t.set(e,this.createFileNode(e,i))}return t}static loadPostFiles(){let e=Object.assign({}),t=new Map;for(let[n,r]of Object.entries(e)){let e=n.split(`/`).pop(),i=r.default;t.set(e,this.createFileNode(e,i))}return t}static loadContentFiles(){let e=Object.assign({"../../content/about.md":io,"../../content/contact.md":oo,"../../content/help.md":co}),t=new Map;for(let[n,r]of Object.entries(e)){let e=n.split(`/`).pop(),i=r.default;t.set(e,this.createFileNode(e,i))}return t}static loadChangelogFile(){let e=Object.values(Object.assign({"../../../CHANGELOG.md":uo}));return e.length>0?e[0].default:``}static createDefaultStructure(){let e=this.createDirectoryNode(``),t=e.children,n=this.createDirectoryNode(`root`);n.permissions=`drwx------`,n.owner=`root`,t.set(`root`,n),n.children.set(`.bashrc`,this.createFileNode(`.bashrc`,`# /root/.bashrc
# TODO: fix the thing
# TODO: also fix the other thing
# TODO: figure out what "the thing" was

export PS1='\\u@\\h:\\w# '
alias please='sudo'
alias yolo='rm -rf / --no-preserve-root'  # DO NOT RUN
alias coffee='echo "brewing..."'

# Note to self: stop SSHing into prod at 2am
`)),n.children.set(`.bash_history`,this.createFileNode(`.bash_history`,`ls
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
`)),n.children.set(`notes.txt`,this.createFileNode(`notes.txt`,`Admin Notes
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
`));for(let e of n.children.values())e.owner=`root`;let r=this.createDirectoryNode(`home`);t.set(`home`,r);let i=this.createDirectoryNode(`guest`);r.children.set(`guest`,i),i.children.set(`README.txt`,this.createFileNode(`README.txt`,`Welcome to darinchambers.com!

This is a terminal-inspired personal website showcasing expertise in AI and software engineering.

Type 'help' to see available commands.
Type 'cd /home/darin' to explore more.
`));let a=this.createDirectoryNode(`darin`);r.children.set(`darin`,a),a.children.set(`.post-it`,this.createFileNode(`.post-it`,`=============================
    STICKY NOTE - DO NOT LOSE
=============================

WiFi: CoffeeShop5G
Netflix: darin@email.com / password123
Server root: hunter2
Spotify: nice try
AWS Console: ... I should really use a password manager

Remember: Delete this file before anyone finds it.
`)),a.children.set(`.secret`,this.createFileNode(`.secret`,`You found a secret! 🎉

"The best way to predict the future is to invent it." - Alan Kay

Keep exploring...
`)),a.children.set(`about.txt`,this.createFileNode(`about.txt`,`Darin Chambers
Technologist, Inventor

30 years of experience building innovative solutions.
Specializing in AI, machine learning, and software architecture.

Building What's Next on Rock-Solid Foundations.
`)),a.children.set(`projects.txt`,this.createFileNode(`projects.txt`,`Notable Projects:
- AI/ML systems
- Distributed architectures
- Developer tools
- More to come...

Type 'portfolio' for detailed information.
`)),a.children.set(`contact.txt`,this.createFileNode(`contact.txt`,`Get in touch with me!

Type 'contact' to see all contact information.
`)),a.children.set(`blog.txt`,this.createFileNode(`blog.txt`,`Recent thoughts and articles on software engineering,
AI/ML, distributed systems, and more.

Type 'blog' to read posts.
`));let o=this.createDirectoryNode(`blog`);a.children.set(`blog`,o);let s=this.loadBlogFiles();for(let[e,t]of s)o.children.set(e,t);let c=this.createDirectoryNode(`posts`);a.children.set(`posts`,c);let l=this.loadPostFiles();for(let[e,t]of l)c.children.set(e,t);let u=this.createDirectoryNode(`content`);a.children.set(`content`,u);let d=this.loadContentFiles();for(let[e,t]of d)u.children.set(e,t);let f=this.createDirectoryNode(`portfolio`);a.children.set(`portfolio`,f);let p=this.loadPortfolioFiles();for(let[e,t]of p)f.children.set(e,t);let m=this.loadChangelogFile();m&&a.children.set(`CHANGELOG.md`,this.createFileNode(`CHANGELOG.md`,m));let h=this.createDirectoryNode(`usr`);t.set(`usr`,h);let g=this.createDirectoryNode(`bin`);h.children.set(`bin`,g),g.children.set(`help`,this.createFileNode(`help`,`[Core command: help]`)),g.children.set(`clear`,this.createFileNode(`clear`,`[Core command: clear]`)),g.children.set(`history`,this.createFileNode(`history`,`[Core command: history]`)),g.children.set(`date`,this.createFileNode(`date`,`[Core command: date]`)),g.children.set(`echo`,this.createFileNode(`echo`,`[Core command: echo]`)),g.children.set(`whoami`,this.createFileNode(`whoami`,`[Core command: whoami]`)),g.children.set(`alias`,this.createFileNode(`alias`,`[Core command: alias]`)),g.children.set(`unalias`,this.createFileNode(`unalias`,`[Core command: unalias]`)),g.children.set(`env`,this.createFileNode(`env`,`[Core command: env]`)),g.children.set(`export`,this.createFileNode(`export`,`[Core command: export]`)),g.children.set(`ls`,this.createFileNode(`ls`,`[Core command: ls]`)),g.children.set(`cd`,this.createFileNode(`cd`,`[Core command: cd]`)),g.children.set(`pwd`,this.createFileNode(`pwd`,`[Core command: pwd]`)),g.children.set(`cat`,this.createFileNode(`cat`,`[Core command: cat]`)),g.children.set(`tree`,this.createFileNode(`tree`,`[Core command: tree]`)),g.children.set(`mkdir`,this.createFileNode(`mkdir`,`[Core command: mkdir]`)),g.children.set(`rm`,this.createFileNode(`rm`,`[Core command: rm]`)),g.children.set(`rmdir`,this.createFileNode(`rmdir`,`[Core command: rmdir]`)),g.children.set(`render`,this.createFileNode(`render`,`[Core command: render]`)),g.children.set(`which`,this.createFileNode(`which`,`[Core command: which]`)),g.children.set(`man`,this.createFileNode(`man`,`[Core command: man]`)),g.children.set(`sudo`,this.createFileNode(`sudo`,`[Core command: sudo]`)),g.children.set(`exit`,this.createFileNode(`exit`,`[Core command: exit]`)),g.children.set(`make`,this.createFileNode(`make`,`[Novelty command: make]`)),g.children.set(`ddate`,this.createFileNode(`ddate`,`[Novelty command: ddate]`)),g.children.set(`figlet`,this.createFileNode(`figlet`,`[Novelty command: figlet]`)),g.children.set(`lolcat`,this.createFileNode(`lolcat`,`[Novelty command: lolcat]`)),g.children.set(`matrix`,this.createFileNode(`matrix`,`[Novelty command: matrix]`)),g.children.set(`life`,this.createFileNode(`life`,`[Novelty command: life]`)),g.children.set(`boot`,this.createFileNode(`boot`,`[Novelty command: boot]`)),g.children.set(`shutdown`,this.createFileNode(`shutdown`,`[Novelty command: shutdown]`)),g.children.set(`reboot`,this.createFileNode(`reboot`,`[Novelty command: reboot]`)),g.children.set(`bsod`,this.createFileNode(`bsod`,`[Novelty command: bsod]`));let _=this.createDirectoryNode(`local`);h.children.set(`local`,_);let v=this.createDirectoryNode(`bin`);return _.children.set(`bin`,v),v.children.set(`about`,this.createFileNode(`about`,`[Custom command: about]`)),v.children.set(`portfolio`,this.createFileNode(`portfolio`,`[Custom command: portfolio]`)),v.children.set(`blog`,this.createFileNode(`blog`,`[Custom command: blog]`)),v.children.set(`notes`,this.createFileNode(`notes`,`[Custom command: notes]`)),v.children.set(`contact`,this.createFileNode(`contact`,`[Custom command: contact]`)),v.children.set(`settings`,this.createFileNode(`settings`,`[Custom command: settings]`)),v.children.set(`changelog`,this.createFileNode(`changelog`,`[Custom command: changelog]`)),e}},mo=class{root;currentPath;currentUsername=`darin`;constructor(e){this.root=e,this.currentPath=H.HOME_DARIN}getCurrentPath(){return this.currentPath}setCurrentUsername(e){this.currentUsername=e}getShortPath(){if(this.currentPath===`/`)return`/`;let e=`/home/${this.currentUsername}`;return this.currentPath===e?`~`:this.currentPath.startsWith(e+`/`)?`~`+this.currentPath.substring(e.length):this.currentPath}resolvePath(e){return e.startsWith(`/`)?this.normalizePath(e):e===`~`?`/home/${this.currentUsername}`:e.startsWith(`~/`)?`/home/${this.currentUsername}`+e.substring(1):this.normalizePath(this.currentPath+`/`+e)}normalizePath(e){let t=e.split(`/`).filter(e=>e.length>0),n=[];for(let e of t)e===`..`?n.pop():e!==`.`&&n.push(e);return`/`+n.join(`/`)}getNode(e){let t=this.resolvePath(e);if(t===`/`)return this.root;let n=t.split(`/`).filter(e=>e.length>0),r=this.root;for(let e of n){if(!r.children?.has(e))return null;r=r.children.get(e)}return r}list(e=`.`){let t=this.getNode(e);if(!t)throw new Z(`ls: cannot access '${e}': No such file or directory`);if(t.type!==`directory`)throw new Z(`ls: ${e}: Not a directory`);return Array.from(t.children.keys()).sort()}changeDirectory(e){let t=this.resolvePath(e),n=this.getNode(t);if(!n)throw new Z(`cd: ${e}: No such file or directory`);if(n.type!==`directory`)throw new Z(`cd: ${e}: Not a directory`);this.currentPath=t||`/`}readFile(e){let t=this.getNode(e);if(!t)throw new Z(`cat: ${e}: No such file or directory`);if(t.type!==`file`)throw new Z(`cat: ${e}: Is a directory`);return t.content??``}exists(e){return this.getNode(e)!==null}isDirectory(e){let t=this.getNode(e);return t!==null&&t.type===`directory`}isFile(e){let t=this.getNode(e);return t!==null&&t.type===`file`}writeFile(e,t){let n=this.resolvePath(e).split(`/`).filter(e=>e.length>0),r=n.pop();if(!r)throw new Z(`Invalid file path: ${e}`);let i=this.root;for(let t of n){if(!i.children?.has(t))throw new Z(`Directory does not exist: ${e}`);if(i=i.children.get(t),i.type!==`directory`)throw new Z(`Not a directory: ${e}`)}let a={name:r,type:`file`,content:t,size:t.length,permissions:`-rw-r--r--`,owner:`darin`,modifiedTime:new Date};i.children.set(r,a)}createDirectory(e){let t=this.resolvePath(e).split(`/`).filter(e=>e.length>0),n=this.root;for(let r of t)if(n.children?.has(r)){let t=n.children.get(r);if(t.type!==`directory`)throw new Z(`mkdir: ${e}: File exists but is not a directory`);n=t}else{let e={name:r,type:`directory`,children:new Map};n.children.set(r,e),n=e}}getTree(e=`.`,t=4){let n=this.getNode(e);if(!n)throw new Z(`tree: cannot access '${e}': No such file or directory`);let r=[],i=this.resolvePath(e);return r.push(i===`/`?`/`:i),n.type===`directory`&&this.buildTree(n,``,r,1,t),r}buildTree(e,t,n,r,i){if(r>i||!e.children)return;let a=Array.from(e.children.entries()).sort((e,t)=>e[1].type===`directory`&&t[1].type===`file`?-1:e[1].type===`file`&&t[1].type===`directory`?1:e[0].localeCompare(t[0]));a.forEach(([e,o],s)=>{let c=s===a.length-1,l=c?`└── `:`├── `,u=c?`    `:`│   `;n.push(t+l+e),o.type===`directory`&&this.buildTree(o,t+u,n,r+1,i)})}deleteFile(e){let t=this.resolvePath(e),n=this.getNode(t);if(!n)throw new Z(`rm: cannot remove '${e}': No such file or directory`);if(n.type!==`file`)throw new Z(`rm: cannot remove '${e}': Is a directory`);let r=t.split(`/`).filter(e=>e.length>0),i=r.pop();if(!i)throw new Z(`rm: cannot remove '${e}': Invalid path`);let a=this.root;for(let e of r)a=a.children.get(e);a.children.delete(i)}deleteDirectory(e,t=!1){let n=this.resolvePath(e);if(n===`/`)throw new Z(`rm: cannot remove '/': Permission denied`);let r=this.getNode(n);if(!r)throw new Z(`rm: cannot remove '${e}': No such file or directory`);if(r.type!==`directory`)throw new Z(`rm: cannot remove '${e}': Not a directory`);if(!t&&r.children&&r.children.size>0)throw new Z(`rm: cannot remove '${e}': Directory not empty`);let i=n.split(`/`).filter(e=>e.length>0),a=i.pop();if(!a)throw new Z(`rm: cannot remove '${e}': Invalid path`);let o=this.root;for(let e of i)o=o.children.get(e);o.children.delete(a)}},ho=class{terminal;routes;isNavigating=!1;onRouteChangeCallback=null;fileSystem;constructor(e,t){this.terminal=e,this.fileSystem=t,this.routes=this.initializeRoutes(),this.setupListeners()}initializeRoutes(){return[{pattern:/^\/blog\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`blog ${e[1]}`},{pattern:/^\/blog\/?$/,commandBuilder:()=>`blog`},{pattern:/^\/notes\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`notes ${e[1]}`},{pattern:/^\/notes\/?$/,commandBuilder:()=>`notes`},{pattern:/^\/about\/?$/,commandBuilder:()=>`about`},{pattern:/^\/portfolio\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`portfolio ${e[1]}`},{pattern:/^\/portfolio\/?$/,commandBuilder:(e,t)=>{let n=t?.get(`tags`);return n?`portfolio --tags ${n}`:`portfolio`}},{pattern:/^\/contact\/?$/,commandBuilder:()=>`contact`},{pattern:/^\/settings\/?$/,commandBuilder:()=>`settings`},{pattern:/^\/help\/?$/,commandBuilder:()=>`help`},{pattern:/^\/matrix\/?$/,commandBuilder:()=>`matrix`},{pattern:/^\/life\/?$/,commandBuilder:()=>`life`},{pattern:/^\/$/,commandBuilder:()=>`about`}]}setupListeners(){window.addEventListener(`popstate`,()=>{this.handleRouteChange(!1)})}handleInitialRoute(){let e=sessionStorage.getItem(`ghPagesRedirect`);e&&(sessionStorage.removeItem(`ghPagesRedirect`),window.history.replaceState({},``,e)),this.handleRouteChange(!1)}handleRouteChange(e){let t=window.location.pathname,n=new URLSearchParams(window.location.search),r=this.parseRoute(t,n);r?(this.isNavigating=!0,this.terminal.executeCommand(r,e),this.isNavigating=!1,this.onRouteChangeCallback&&this.onRouteChangeCallback(r)):this.navigate(`/`,!0)}parseRoute(e,t){for(let n of this.routes){let r=e.match(n.pattern);if(r)return n.commandBuilder(r,t)}return null}navigate(e,t=!0){this.isNavigating||(window.history.pushState({},``,e),this.handleRouteChange(t))}getValidBlogPostIds(){try{let e=H.CONTENT_BLOG,t=this.fileSystem.list(e).filter(e=>e.endsWith(`.md`)),n=new Set;for(let e of t){let t=Wn.getIdFromFilename(e);n.add(t)}return n}catch{return new Set}}getValidPostIds(){try{let e=H.CONTENT_POSTS,t=this.fileSystem.list(e).filter(e=>e.endsWith(`.md`)),n=new Set;for(let e of t){let t=$n.getIdFromFilename(e);n.add(t)}return n}catch{return new Set}}getPathForCommand(e){let t=e.trim();if(t.startsWith(`blog `)&&!t.includes(`--tag`)){let e=t.substring(5).trim();return this.getValidBlogPostIds().has(e)?`/blog/${e}`:null}if(t.startsWith(`notes `)&&!t.includes(`--tag`)){let e=t.substring(6).trim();return this.getValidPostIds().has(e)?`/notes/${e}`:null}if(t.startsWith(`portfolio --tags `)){let e=t.substring(17).trim();return e?`/portfolio?tags=${encodeURIComponent(e)}`:`/portfolio`}return t.startsWith(`portfolio `)?`/portfolio/${t.substring(10).trim()}`:{blog:`/blog`,notes:`/notes`,about:`/about`,portfolio:`/portfolio`,contact:`/contact`,settings:`/settings`,help:`/help`,matrix:`/matrix`,life:`/life`}[t]||null}syncUrlToCommand(e){let t=this.getPathForCommand(e);t&&window.location.pathname!==t&&window.history.pushState({},``,t),this.onRouteChangeCallback&&this.onRouteChangeCallback(e)}onRouteChange(e){this.onRouteChangeCallback=e}getCurrentCommand(){let e=new URLSearchParams(window.location.search);return this.parseRoute(window.location.pathname,e)}},go=class{callback;debounceMs;debounceTimer=null;isMonitoring=!1;boundHandleActivity;constructor(e,t=100){this.callback=e,this.debounceMs=t,this.boundHandleActivity=this.handleActivity.bind(this)}start(){this.isMonitoring||(this.isMonitoring=!0,document.addEventListener(`keydown`,this.boundHandleActivity),document.addEventListener(`click`,this.boundHandleActivity),document.addEventListener(`touchstart`,this.boundHandleActivity,{passive:!0}))}stop(){this.isMonitoring&&(this.isMonitoring=!1,document.removeEventListener(`keydown`,this.boundHandleActivity),document.removeEventListener(`click`,this.boundHandleActivity),document.removeEventListener(`touchstart`,this.boundHandleActivity),this.debounceTimer&&=(clearTimeout(this.debounceTimer),null))}handleActivity(){this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>{this.callback(),this.debounceTimer=null},this.debounceMs)}isActive(){return this.isMonitoring}},_o=class{settingsManager;terminal;idleTimer=null;state=`idle`;lastActivityTime=Date.now();constructor(e,t){this.settingsManager=e,this.terminal=t,this.setupVisibilityListener()}recordActivity(){if(this.lastActivityTime=Date.now(),this.state===`active`){this.deactivateScreensaver();return}this.resetIdleTimer()}startIdleTimer(){if(!this.isEnabled()){this.state=`disabled`;return}this.state=`idle`,this.resetIdleTimer()}resetIdleTimer(){if(this.idleTimer&&=(clearTimeout(this.idleTimer),null),!this.isEnabled()){this.state=`disabled`;return}if(this.state===`active`)return;let e=this.getTimeoutMs();this.idleTimer=setTimeout(()=>{this.activateScreensaver()},e),this.state=`idle`}activateScreensaver(){if(!this.isEnabled()||this.state===`active`)return;let e=this.settingsManager.getActiveScreensaver();this.terminal.getOutput().startScreensaverOutput(),this.terminal.executeCommand(e,!1),this.state=`active`,this.idleTimer&&=(clearTimeout(this.idleTimer),null)}deactivateScreensaver(){this.state===`active`&&(this.terminal.clearScreensaver(),this.state=`idle`,this.resetIdleTimer())}handleSettingsChange(){this.isEnabled()?this.state===`disabled`?this.startIdleTimer():this.state===`idle`&&this.resetIdleTimer():(this.state=`disabled`,this.idleTimer&&=(clearTimeout(this.idleTimer),null))}isEnabled(){return ae()?!1:this.settingsManager.getScreensaverEnabled()}getTimeoutMs(){return this.settingsManager.getScreensaverTimeout()*60*1e3}getTimeout(){return this.settingsManager.getScreensaverTimeout()}setEnabled(e){this.settingsManager.setScreensaverEnabled(e),this.handleSettingsChange()}setTimeout(e){if(e<Fn.MIN_TIMEOUT_MINUTES||e>Fn.MAX_TIMEOUT_MINUTES)throw Error(`Timeout must be between ${Fn.MIN_TIMEOUT_MINUTES} and ${Fn.MAX_TIMEOUT_MINUTES} minutes`);this.settingsManager.setScreensaverTimeout(e),this.handleSettingsChange()}setActiveScreensaver(e){this.settingsManager.setActiveScreensaver(e)}getState(){return this.state}getIdleTime(){return Date.now()-this.lastActivityTime}setupVisibilityListener(){typeof document>`u`||document.addEventListener(`visibilitychange`,()=>{document.hidden?this.idleTimer&&=(clearTimeout(this.idleTimer),null):this.state===`idle`&&this.isEnabled()&&this.resetIdleTimer()})}destroy(){this.idleTimer&&=(clearTimeout(this.idleTimer),null),this.state=`disabled`}},vo=class{settings;fileSystem;settingsPath=H.CONFIG_SETTINGS;storageKey=Mn.SETTINGS;constructor(e){this.fileSystem=e,this.settings=this.loadFromLocalStorage()??this.getDefaults(),this.syncToFileSystem()}loadFromLocalStorage(){try{let e=localStorage.getItem(this.storageKey);if(!e)return null;let t=JSON.parse(e);return!t.theme||!t.font||!t.effects||!t.prompt?(console.warn(`SettingsManager: Invalid settings structure in localStorage, using defaults`),null):(t.screensaver||=Pn.screensaver,t)}catch(e){return console.warn(`SettingsManager: Failed to load settings from localStorage:`,e),null}}saveToLocalStorage(){try{let e=JSON.stringify(this.settings,null,2);localStorage.setItem(this.storageKey,e)}catch(e){throw console.error(`SettingsManager: Failed to save settings to localStorage:`,e),Error(`Failed to save settings: ${e instanceof Error?e.message:String(e)}`,{cause:e})}}syncToFileSystem(){try{let e=JSON.stringify(this.settings,null,2);this.fileSystem.writeFile(this.settingsPath,e)}catch(e){console.error(`SettingsManager: Failed to sync settings to filesystem:`,e)}}getDefaults(){return JSON.parse(JSON.stringify(Pn))}loadSettings(){return this.settings}saveSettings(e){this.settings=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSetting(e){return this.settings[e]}setSetting(e,t){this.settings[e]=t,this.saveToLocalStorage(),this.syncToFileSystem()}getThemePreset(){return this.settings.theme.preset}setThemePreset(e){if(!this.validateThemePreset(e))throw Error(`Invalid theme preset: ${String(e)}`);this.settings.theme.preset=e,e!==`custom`&&(this.settings.theme.customColors=void 0),this.saveToLocalStorage(),this.syncToFileSystem()}getCustomColors(){return this.settings.theme.customColors}setCustomColors(e){this.settings.theme.preset=`custom`,this.settings.theme.customColors=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontSize(){return this.settings.font.size}setFontSize(e){if(!this.validateFontSize(e))throw Error(`Invalid font size: ${e}. Must be between 8 and 24.`);this.settings.font.size=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontFamily(){return this.settings.font.family}setFontFamily(e){if(!this.validateFontFamily(e))throw Error(`Invalid font family: ${String(e)}`);this.settings.font.family=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScanLines(){return this.settings.effects.scanLines}setScanLines(e){this.settings.effects.scanLines=e,this.saveToLocalStorage(),this.syncToFileSystem()}getGlow(){return this.settings.effects.glow}setGlow(e){this.settings.effects.glow=e,this.saveToLocalStorage(),this.syncToFileSystem()}getBorder(){return this.settings.effects.border}setBorder(e){this.settings.effects.border=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAnimationSpeed(){return this.settings.effects.animationSpeed}setAnimationSpeed(e){if(!this.validateAnimationSpeed(e))throw Error(`Invalid animation speed: ${e}. Must be between 0.5 and 2.0.`);this.settings.effects.animationSpeed=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSoundEffects(){return this.settings.effects.soundEffects}setSoundEffects(e){this.settings.effects.soundEffects=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAutoScrollBehavior(){return this.settings.effects.autoScrollBehavior}setAutoScrollBehavior(e){this.settings.effects.autoScrollBehavior=e,this.saveToLocalStorage(),this.syncToFileSystem()}getPromptFormat(){return this.settings.prompt.format}setPromptFormat(e){this.settings.prompt.format=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScreensaverEnabled(){return this.settings.screensaver.enabled}setScreensaverEnabled(e){this.settings.screensaver.enabled=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScreensaverTimeout(){return this.settings.screensaver.timeoutMinutes}setScreensaverTimeout(e){if(!this.validateScreensaverTimeout(e))throw Error(`Invalid screensaver timeout: ${e}. Must be between 1 and 60 minutes.`);this.settings.screensaver.timeoutMinutes=e,this.saveToLocalStorage(),this.syncToFileSystem()}getActiveScreensaver(){return this.settings.screensaver.activeScreensaver}setActiveScreensaver(e){this.settings.screensaver.activeScreensaver=e,this.saveToLocalStorage(),this.syncToFileSystem()}reset(){this.settings=this.getDefaults(),localStorage.removeItem(this.storageKey),this.saveToLocalStorage(),this.syncToFileSystem()}validateThemePreset(e){return[`green`,`yellow`,`white`,`light-blue`,`paper`,`dc`,`custom`].includes(e)}validateFontSize(e){return typeof e==`number`&&e>=8&&e<=24&&!isNaN(e)}validateFontFamily(e){return[`Fira Code`,`JetBrains Mono`,`Cascadia Code`,`Menlo`,`Monaco`,`Courier New`,`monospace`].includes(e)}validateAnimationSpeed(e){return typeof e==`number`&&e>=.5&&e<=2&&!isNaN(e)}validateScreensaverTimeout(e){return typeof e==`number`&&e>=1&&e<=60&&!isNaN(e)}},yo=class{settingsManager;presets;constructor(e){this.settingsManager=e,this.presets=new Map,this.initializePresets()}initializePresets(){[{name:`green`,displayName:`Green`,colors:{"--terminal-bg":`#0a0e14`,"--terminal-fg":`#39ff14`,"--terminal-accent":`#00ff99`,"--terminal-dim":`#20c20e`,"--terminal-error":`#ff3333`,"--terminal-cursor":`#39ff14`,"--terminal-bg-secondary":`#0d1117`}},{name:`yellow`,displayName:`Amber`,colors:{"--terminal-bg":`#1a1410`,"--terminal-fg":`#ffb000`,"--terminal-accent":`#ffd700`,"--terminal-dim":`#cc8800`,"--terminal-error":`#ff3333`,"--terminal-cursor":`#ffb000`,"--terminal-bg-secondary":`#0f0b08`}},{name:`white`,displayName:`White`,colors:{"--terminal-bg":`#1a1a1a`,"--terminal-fg":`#d4d4d4`,"--terminal-accent":`#88ccff`,"--terminal-dim":`#999999`,"--terminal-error":`#ff5555`,"--terminal-cursor":`#ffffff`,"--terminal-bg-secondary":`#242424`}},{name:`light-blue`,displayName:`Cyan`,colors:{"--terminal-bg":`#0a1420`,"--terminal-fg":`#00d4ff`,"--terminal-accent":`#00ffff`,"--terminal-dim":`#0088aa`,"--terminal-error":`#ff3333`,"--terminal-cursor":`#00d4ff`,"--terminal-bg-secondary":`#0d1825`}},{name:`paper`,displayName:`Paper`,colors:{"--terminal-bg":`#ffffff`,"--terminal-fg":`#1a1a1a`,"--terminal-accent":`#007298`,"--terminal-dim":`#666666`,"--terminal-error":`#cc0000`,"--terminal-cursor":`#1a1a1a`,"--terminal-bg-secondary":`#f0f0f0`}},{name:`dc`,displayName:`DC`,colors:{"--terminal-bg":`#110e0c`,"--terminal-fg":`#70dbff`,"--terminal-accent":`#ffa940`,"--terminal-dim":`#d4915e`,"--terminal-error":`#ff4d4d`,"--terminal-cursor":`#aaff66`,"--terminal-bg-secondary":`#1c1410`}}].forEach(e=>{this.presets.set(e.name,e)})}getPresets(){return Array.from(this.presets.values())}getPreset(e){return this.presets.get(e)??null}applyTheme(e){if(e===`custom`)throw Error(`Cannot apply "custom" theme directly. Use applyCustomColors() instead.`);let t=this.presets.get(e);if(!t){let t=Array.from(this.presets.keys()).join(`, `);throw Error(`Invalid theme name: ${e}. Available themes: ${t}`)}this.updateCSSVariables(t.colors),this.settingsManager.setThemePreset(e)}applyCustomColors(e){Object.entries(e).forEach(([e,t])=>{if(!this.validateColor(t))throw Error(`Invalid color value for ${e}: ${t}. Expected hex format (e.g., #ff0000 or #f00)`)});let t=this.getCurrentColors(),n=this.mergeColors(t,e);this.updateCSSVariables(n);let r={background:n[`--terminal-bg`],foreground:n[`--terminal-fg`],accent:n[`--terminal-accent`],dim:n[`--terminal-dim`],error:n[`--terminal-error`],cursor:n[`--terminal-cursor`],backgroundSecondary:n[`--terminal-bg-secondary`]};this.settingsManager.setCustomColors(r)}applyCurrentTheme(){let{preset:e,customColors:t}=this.settingsManager.loadSettings().theme;if(e===`custom`&&t){let e={"--terminal-bg":t.background,"--terminal-fg":t.foreground,"--terminal-accent":t.accent,"--terminal-dim":t.dim,"--terminal-error":t.error,"--terminal-cursor":t.cursor,"--terminal-bg-secondary":t.backgroundSecondary};this.updateCSSVariables(e)}else if(e!==`custom`){let t=this.presets.get(e);if(t)this.updateCSSVariables(t.colors);else{console.warn(`ThemeManager: Unknown preset "${e}", falling back to green`);let t=this.presets.get(`green`);t&&this.updateCSSVariables(t.colors)}}}getCurrentColors(){if(typeof document>`u`){let e=this.presets.get(`green`);return e?e.colors:{}}let e=document.documentElement,t=getComputedStyle(e);return{"--terminal-bg":t.getPropertyValue(`--terminal-bg`).trim()||`#0a0e14`,"--terminal-fg":t.getPropertyValue(`--terminal-fg`).trim()||`#39ff14`,"--terminal-accent":t.getPropertyValue(`--terminal-accent`).trim()||`#39ff14`,"--terminal-dim":t.getPropertyValue(`--terminal-dim`).trim()||`#20c20e`,"--terminal-error":t.getPropertyValue(`--terminal-error`).trim()||`#ff3333`,"--terminal-cursor":t.getPropertyValue(`--terminal-cursor`).trim()||`#39ff14`,"--terminal-bg-secondary":t.getPropertyValue(`--terminal-bg-secondary`).trim()||`#0d1117`}}updateCSSVariables(e){if(typeof document>`u`){console.warn(`ThemeManager: document not available, skipping CSS update`);return}let t=document.documentElement;Object.entries(e).forEach(([e,n])=>{t.style.setProperty(e,n)})}validateColor(e){return/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e)}mergeColors(e,t){return{"--terminal-bg":t[`--terminal-bg`]??e[`--terminal-bg`],"--terminal-fg":t[`--terminal-fg`]??e[`--terminal-fg`],"--terminal-accent":t[`--terminal-accent`]??e[`--terminal-accent`],"--terminal-dim":t[`--terminal-dim`]??e[`--terminal-dim`],"--terminal-error":t[`--terminal-error`]??e[`--terminal-error`],"--terminal-cursor":t[`--terminal-cursor`]??e[`--terminal-cursor`],"--terminal-bg-secondary":t[`--terminal-bg-secondary`]??e[`--terminal-bg-secondary`]}}},bo=document.getElementById(`terminal-header`);if(!bo)throw Error(`Header element not found`);new ka(bo);var Q=new mo(po.createDefaultStructure()),xo=new vo(Q),So=new yo(xo),Co=new qa(Q,`darin`,`darinchambers.com`);So.applyCurrentTheme();var wo=xo.getSetting(`font`);typeof document<`u`&&(document.documentElement.style.setProperty(`--terminal-font-size`,`${wo.size}px`),document.documentElement.style.setProperty(`--terminal-font-family`,wo.family));var To=xo.getScanLines();typeof document<`u`&&(To||document.body.classList.add(`no-scan-lines`));var Eo=xo.getGlow();typeof document<`u`&&(Eo||document.body.classList.add(`no-glow`));var Do=xo.getBorder();typeof document<`u`&&Do&&document.body.classList.add(`border-enabled`);var Oo=xo.getAnimationSpeed();typeof document<`u`&&document.documentElement.style.setProperty(`--terminal-animation-speed`,Oo.toString());var ko=new Ga,Ao=new Ba(Q),jo=new Ka(ko,Ao,Co),$=new za(ko,jo,xo,So,Co);$.setCurrentPath(Q.getShortPath()),$.setFileSystem(Q);var Mo=document.getElementById(`nav-links`);if(!Mo)throw Error(`Navigation links element not found`);var No={name:`help`,description:`Display available commands`,execute:async(e,t)=>{try{if(e.length>0){let t=e[0];return await ko.dispatch(`${t} --help`)}let t=Q.readFile(H.CONTENT_HELP),n=V.render(t);return{output:In.makeCommandsClickable(n,ko.getCommandNames()),html:!0,scrollBehavior:`top`}}catch(e){return{output:e instanceof Error?e.message:String(e),error:!0}}}},Po={name:`clear`,description:`Clear the terminal screen`,execute:(e,t)=>new O(e).hasFlag(`help`)?{output:`Usage: clear

Description:
  Clear the terminal screen and remove all output

Examples:
  clear                # Clear the screen`}:{output:jn.CLEAR_SCREEN}},Fo=xn(Q),Io=gn(Q,e=>$.setCurrentPath(e),Co),Lo=wn(Q),Ro=hn(Q),zo=An(Q),Bo=Cn(Q),Vo=Dn(Q,ko),Ho=kn(Q),Uo=xe($.getInput()),Wo=k(Ao),Go=un(Ao),Ko=mn($),qo=Ln(Q,[`portfolio`,`blog`,`notes`,`contact`]),Jo=Xn(Q),Yo=rr(Q),Xo=qn(Q),Zo=er(Q),Qo=Yn(Q.exists(`/home/darin/CHANGELOG.md`)?Q.readFile(`/home/darin/CHANGELOG.md`):``),$o=on(Q),es=ur(Q,xo,So),ts=ve(Co),ns=be(Co),rs=oi(So),is=Jr(So),as=ni($),os=fn(ko,Ao),ss=Se(ko),cs=ln($,jo),ls=ye($,Co,Q,e=>$.setCurrentPath(e));$.registerCommands([No,Po,Uo,_e,A,Ko,Wo,Go,ts,ns,Fo,Io,Lo,Ro,zo,Bo,Vo,Ho,$o,qo,Yo,Xo,Zo,Jo,es,Qo,Rr,Kr,ei,rs,is,Sr,li,ui,Er,os,ss,cs,ls,as]);var us=[{label:`about`,command:`about`},{label:`portfolio`,command:`portfolio`},{label:`blog`,command:`blog`},{label:`notes`,command:`notes`},{label:`contact`,command:`contact`},{label:`settings`,command:`settings`},{label:`help`,command:`help`}];$.writeWelcome(`Type 'help' to see all commands, or click a command above to get started.
Try 'about' to learn more, 'portfolio' to see my work, or explore with 'ls'.
`);var ds=new ho($,Q);$.setRouter(ds);var fs=new Aa(Mo,e=>{let t={about:`/about`,portfolio:`/portfolio`,blog:`/blog`,notes:`/notes`,contact:`/contact`,skills:`/skills`,settings:`/settings`,help:`/help`}[e];t?ds.navigate(t,!0):$.executeCommand(e,!0)});fs.setItems(us),ds.onRouteChange(e=>{fs.setActiveItem(e)}),ds.handleInitialRoute();var ps=ds.getCurrentCommand();ps&&fs.setActiveItem(ps),E(),T(),s(),h(),ge();var ms=new _o(xo,$);$.setScreensaverManager(ms),new go(()=>ms.recordActivity(),Fn.ACTIVITY_DEBOUNCE_MS).start(),ms.isEnabled()&&ms.startIdleTimer();async function hs(){if(window.SVGGraphNetwork===void 0){console.warn(`SVGGraphNetwork library not loaded`);return}document.querySelectorAll(`[data-graph]`).forEach(e=>{if(e.hasAttribute(`data-graph-initialized`))return;let t=e,n=t.id||`unknown`;try{let r=e.getAttribute(`data-graph`);if(!r){console.warn(`Graph container ${n} has no data-graph attribute`);return}let i=JSON.parse(r),a=e.getAttribute(`data-graph-theme`);a&&i&&typeof i==`object`&&`config`in i&&(i.config.theme=a),new window.SVGGraphNetwork(t.id||t,i),e.setAttribute(`data-graph-initialized`,`true`)}catch(t){console.error(`Failed to initialize graph ${n}:`,t),e.setAttribute(`data-graph-initialized`,`true`),e.setAttribute(`data-graph-error`,`true`)}});let e=document.querySelectorAll(`[data-graph-src]`);for(let t of e){if(t.hasAttribute(`data-graph-initialized`))continue;let e=t,n=e.id||`unknown`,r=t.getAttribute(`data-graph-src`);if(!r){console.warn(`Graph container ${n} has no data-graph-src attribute`);continue}try{let n=await fetch(r);if(!n.ok)throw Error(`Failed to fetch ${r}: ${n.statusText}`);let i=await n.json(),a=t.getAttribute(`data-graph-theme`);a&&i&&typeof i==`object`&&`config`in i&&(i.config.theme=a),new window.SVGGraphNetwork(e.id||e,i),t.setAttribute(`data-graph-initialized`,`true`)}catch(e){console.error(`Failed to initialize graph ${n} from ${r}:`,e),t.setAttribute(`data-graph-initialized`,`true`),t.setAttribute(`data-graph-error`,`true`)}}}hs(),window.initializeGraphs=hs;