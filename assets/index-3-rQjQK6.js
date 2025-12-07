(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const ut=new Map;function Ut(s){ut.forEach((i,o)=>{i.stopAnimation(),o.querySelectorAll(".matrix-column").forEach(a=>{a.style.animationPlayState="paused"})}),ut.clear();const e=s.dataset.matrixChars??"";if(!e){console.warn("[Matrix] No character set found in data-matrix-chars");return}const t={animationId:null,frameCount:0,matrixChars:e,rainElement:s,stopAnimation:()=>{t.animationId&&(cancelAnimationFrame(t.animationId),t.animationId=null),ut.delete(s)}};ut.set(s,t);function r(){return e[Math.floor(Math.random()*e.length)]}function n(){t.frameCount++,s.querySelectorAll(".matrix-column").forEach(o=>{const l=o.querySelectorAll(".matrix-char"),a=parseInt(o.dataset.trailLength??"20");l.forEach((p,h)=>{if(p.classList.contains("matrix-char-bright"))(t.frameCount%45===0||t.frameCount%60===0&&Math.random()<.5)&&(p.textContent=r());else{const E=a-h-1,C=Math.max(8,Math.floor(E/2));t.frameCount%C===0&&Math.random()<.3&&(p.textContent=r())}})}),t.animationId=requestAnimationFrame(n)}t.animationId=requestAnimationFrame(n),Mr(s,t)}function Mr(s,e){const t=document.getElementById("terminal-output");if(t){const i=()=>{e.stopAnimation()};t.addEventListener("scroll",i,{once:!0})}const r=new MutationObserver(()=>{s.nextElementSibling&&(e.stopAnimation(),r.disconnect())});t&&r.observe(t,{childList:!0,subtree:!0});const n=new MutationObserver(()=>{document.body.contains(s)||(e.stopAnimation(),n.disconnect())});n.observe(document.body,{childList:!0,subtree:!0})}function Dr(){const s=new MutationObserver(r=>{r.forEach(n=>{n.addedNodes.forEach(i=>{if(i.nodeType===Node.ELEMENT_NODE){const o=i;o.classList.contains("matrix-rain")&&Ut(o),o.querySelectorAll(".matrix-rain").forEach(a=>{Ut(a)})}})})}),e=document.getElementById("terminal-output");e&&s.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll(".matrix-rain").forEach(r=>{Ut(r)})}class V{flags=new Map;positionals=[];static VALUE_FLAGS=new Set(["f","L","w"]);constructor(e){const t=[];for(const r of e)if(r.startsWith("-")&&!r.startsWith("--")&&r.length>2)for(let n=1;n<r.length;n++)t.push(`-${r[n]}`);else t.push(r);for(let r=0;r<t.length;r++){const n=t[r];if(n.startsWith("--")){const i=n.substring(2),o=t[r+1];o!==void 0&&!o.startsWith("--")&&!o.startsWith("-")?(this.flags.set(i,o),r++):this.flags.set(i,!0)}else if(n.startsWith("-")&&n.length===2){const i=n.substring(1),o=t[r+1];o!==void 0&&!o.startsWith("-")&&(V.VALUE_FLAGS.has(i)||/^\d+$/.test(o))?(this.flags.set(i,o),r++):this.flags.set(i,!0)}else this.positionals.push(n)}}getFlag(e){return this.flags.get(e)}hasFlag(e){return this.flags.has(e)}getPositional(e){return this.positionals[e]}getAllFlags(){return new Map(this.flags)}getAllPositionals(){return[...this.positionals]}get positionalCount(){return this.positionals.length}}function Pr(s){return{name:"alias",description:"Create or display command aliases",execute:(e,t)=>{if(new V(e).hasFlag("help"))return{output:`Usage: alias [name='command']

Description:
  Create or display command aliases for shortening commands
  Note: 'll' is aliased to 'ls -alh' by default

Options:
  (no args)            List all defined aliases

Examples:
  alias                # List all aliases
  alias la='ls -a'     # Create an alias
  alias blog-ai='blog --tags ai'  # Alias with flags`};if(e.length===0){const a=s.getAllAliases();return a.size===0?{output:"No aliases defined."}:{output:Array.from(a.entries()).sort((h,A)=>h[0].localeCompare(A[0])).map(([h,A])=>{const E=s.isDefaultAlias(h);return`alias ${h}='${A}'${E?" (default)":""}`}).join(`
`)}}const n=e.join(" "),i=/^(\S+)=(.+)$/.exec(n);if(!i)return{output:`Usage: alias name='command'
       alias (to list all aliases)`,error:!0};const[,o,l]=i;try{return s.setAlias(o,l),{output:`Alias created: ${o}='${l}'`}}catch(a){return{output:a instanceof Error?a.message:String(a),error:!0}}}}}const Hr={name:"date",description:"Display current date and time",execute:(s,e)=>new V(s).hasFlag("help")?{output:`Usage: date

Description:
  Display the current date and time in the system's default format

Examples:
  date                 # Show current date and time`}:{output:new Date().toString()}},Fr={name:"echo",description:"Display a line of text",execute:(s,e)=>{if(new V(s).hasFlag("help"))return{output:`Usage: echo [options] [text...]

Description:
  Display a line of text or pass through stdin content

Options:
  -e                   Enable interpretation of escape sequences

Examples:
  echo "Hello World"   # Display text
  echo -e "Line1\\nLine2"  # Use escape sequences
  cat file.txt | echo  # Pass through stdin`};let r=!1;const n=[];for(const o of s)o==="-e"?r=!0:n.push(o);let i;return n.length===0&&e?(i=e,i.endsWith(`
`)&&(i=i.slice(0,-1))):i=n.join(" "),r&&(i=i.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\\\/g,"\\")),{output:i}}};function Wr(s){return{name:"env",description:"Display all environment variables",execute:(e,t)=>{if(new V(e).hasFlag("help"))return{output:`Usage: env

Description:
  Display all environment variables

Examples:
  env                  # List all variables
  env | grep PATH      # Filter variables`};try{const n=s.getAllVariables();return n.size===0?{output:""}:{output:Array.from(n.entries()).sort((l,a)=>l[0].localeCompare(a[0])).map(([l,a])=>`${l}=${a}`).join(`
`)}}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}function Ur(s){return{name:"export",description:"Set or display environment variables",execute:(e,t)=>{if(new V(e).hasFlag("help"))return{output:`Usage: export [VAR=value] [VAR]

Description:
  Set or display environment variables

Examples:
  export               # List all variables
  export PATH=/bin     # Set variable
  export USER          # Display single variable`};try{if(e.length===0){const i=s.getAllVariables();return i.size===0?{output:""}:{output:Array.from(i.entries()).sort((a,p)=>a[0].localeCompare(p[0])).map(([a,p])=>`${a}=${p}`).join(`
`)}}const n=[];for(const i of e){const o=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(i);if(o){const[,l,a]=o;s.setVariable(l,a)}else{const l=s.getVariable(i);l!==void 0?n.push(`${i}=${l}`):n.push(`export: ${i}: not found`)}}return{output:n.join(`
`)}}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}function Br(s){return{name:"history",description:"Display command history",execute:(e,t)=>{if(new V(e).hasFlag("help"))return{output:`Usage: history

Description:
  Display command history with line numbers

Examples:
  history              # Show all commands`};const n=s.getHistory();return n.length===0?{output:"No commands in history."}:{output:n.map((o,l)=>`${(l+1).toString().padStart(5," ")}  ${o}`).join(`
`)}}}}function ht(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}class kn{static parse(e){if(!e.trim().startsWith("---"))return{frontmatter:null,content:e};const t=e.split(`
`),r=this.findFrontmatterEnd(t);if(r===-1)return{frontmatter:null,content:e};const n=t.slice(1,r),i=t.slice(r+1);return{frontmatter:this.parseFrontmatterLines(n),content:i.join(`
`)}}static findFrontmatterEnd(e){for(let t=1;t<e.length;t++)if(e[t].trim()==="---")return t;return-1}static parseFrontmatterLines(e){const t={};for(const r of e){const n=r.indexOf(":");if(n===-1)continue;const i=r.substring(0,n).trim(),o=r.substring(n+1).trim();if(o.startsWith("[")&&o.endsWith("]")){const l=o.substring(1,o.length-1);t[i]=l.split(",").map(a=>a.trim().replace(/^["']|["']$/g,"")).filter(a=>a.length>0)}else t[i]=o.replace(/^["']|["']$/g,"")}return t}static renderFrontmatter(e){const t=[];e.title&&typeof e.title=="string"&&t.push(`<h1 class="fm-title">${ht(e.title)}</h1>`);const r=[];if(e.date&&typeof e.date=="string"&&r.push(`<span class="fm-date">${ht(e.date)}</span>`),e.tags&&Array.isArray(e.tags)){const n=e.tags.map(i=>`<span class="fm-tag">${ht(i)}</span>`).join(" ");r.push(`<span class="fm-tags">${n}</span>`)}return r.length>0&&t.push(`<div class="fm-meta">${r.join(" • ")}</div>`),e.summary&&typeof e.summary=="string"&&t.push(`<p class="fm-summary">${ht(e.summary)}</p>`),t.length>0&&t.push('<hr class="fm-divider">'),t.join(`
`)}}function on(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Oe=on();function rr(s){Oe=s}var et={exec:()=>null};function W(s,e=""){let t=typeof s=="string"?s:s.source,r={replace:(n,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(le.caret,"$1"),t=t.replace(n,o),r},getRegex:()=>new RegExp(t,e)};return r}var Gr=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),le={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:s=>new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}#`),htmlBeginRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}<(?:[a-z].*>|!--)`,"i")},Vr=/^(?:[ \t]*(?:\n|$))+/,zr=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,jr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,tt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Yr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,an=/(?:[*+-]|\d{1,9}[.)])/,sr=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ir=W(sr).replace(/bull/g,an).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Xr=W(sr).replace(/bull/g,an).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ln=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qr=/^[^\n]+/,_n=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Kr=W(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",_n).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Zr=W(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,an).getRegex(),St="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",cn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Qr=W("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",cn).replace("tag",St).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),or=W(ln).replace("hr",tt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",St).getRegex(),Jr=W(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",or).getRegex(),un={blockquote:Jr,code:zr,def:Kr,fences:jr,heading:Yr,hr:tt,html:Qr,lheading:ir,list:Zr,newline:Vr,paragraph:or,table:et,text:qr},On=W("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",tt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",St).getRegex(),es={...un,lheading:Xr,table:On,paragraph:W(ln).replace("hr",tt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",On).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",St).getRegex()},ts={...un,html:W(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",cn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:et,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:W(ln).replace("hr",tt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ir).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ns=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,rs=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ar=/^( {2,}|\\)\n(?!\s*$)/,ss=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,bt=/[\p{P}\p{S}]/u,hn=/[\s\p{P}\p{S}]/u,lr=/[^\s\p{P}\p{S}]/u,is=W(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,hn).getRegex(),_r=/(?!~)[\p{P}\p{S}]/u,os=/(?!~)[\s\p{P}\p{S}]/u,as=/(?:[^\s\p{P}\p{S}]|~)/u,ls=W(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Gr?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),cr=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,_s=W(cr,"u").replace(/punct/g,bt).getRegex(),cs=W(cr,"u").replace(/punct/g,_r).getRegex(),ur="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",us=W(ur,"gu").replace(/notPunctSpace/g,lr).replace(/punctSpace/g,hn).replace(/punct/g,bt).getRegex(),hs=W(ur,"gu").replace(/notPunctSpace/g,as).replace(/punctSpace/g,os).replace(/punct/g,_r).getRegex(),ds=W("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,lr).replace(/punctSpace/g,hn).replace(/punct/g,bt).getRegex(),ms=W(/\\(punct)/,"gu").replace(/punct/g,bt).getRegex(),ps=W(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),fs=W(cn).replace("(?:-->|$)","-->").getRegex(),$s=W("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",fs).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),gt=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,gs=W(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",gt).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),hr=W(/^!?\[(label)\]\[(ref)\]/).replace("label",gt).replace("ref",_n).getRegex(),dr=W(/^!?\[(ref)\](?:\[\])?/).replace("ref",_n).getRegex(),Ts=W("reflink|nolink(?!\\()","g").replace("reflink",hr).replace("nolink",dr).getRegex(),Mn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,dn={_backpedal:et,anyPunctuation:ms,autolink:ps,blockSkip:ls,br:ar,code:rs,del:et,emStrongLDelim:_s,emStrongRDelimAst:us,emStrongRDelimUnd:ds,escape:ns,link:gs,nolink:dr,punctuation:is,reflink:hr,reflinkSearch:Ts,tag:$s,text:ss,url:et},Ls={...dn,link:W(/^!?\[(label)\]\((.*?)\)/).replace("label",gt).getRegex(),reflink:W(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",gt).getRegex()},qt={...dn,emStrongRDelimAst:hs,emStrongLDelim:cs,url:W(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Mn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:W(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Mn).getRegex()},Es={...qt,br:W(ar).replace("{2,}","*").getRegex(),text:W(qt.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},dt={normal:un,gfm:es,pedantic:ts},ze={normal:dn,gfm:qt,breaks:Es,pedantic:Ls},As={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Dn=s=>As[s];function we(s,e){if(e){if(le.escapeTest.test(s))return s.replace(le.escapeReplace,Dn)}else if(le.escapeTestNoEncode.test(s))return s.replace(le.escapeReplaceNoEncode,Dn);return s}function Pn(s){try{s=encodeURI(s).replace(le.percentDecode,"%")}catch{return null}return s}function Hn(s,e){let t=s.replace(le.findPipe,(i,o,l)=>{let a=!1,p=o;for(;--p>=0&&l[p]==="\\";)a=!a;return a?"|":" |"}),r=t.split(le.splitPipe),n=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),e)if(r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;n<r.length;n++)r[n]=r[n].trim().replace(le.slashPipe,"|");return r}function je(s,e,t){let r=s.length;if(r===0)return"";let n=0;for(;n<r&&s.charAt(r-n-1)===e;)n++;return s.slice(0,r-n)}function Is(s,e){if(s.indexOf(e[1])===-1)return-1;let t=0;for(let r=0;r<s.length;r++)if(s[r]==="\\")r++;else if(s[r]===e[0])t++;else if(s[r]===e[1]&&(t--,t<0))return r;return t>0?-2:-1}function Fn(s,e,t,r,n){let i=e.href,o=e.title||null,l=s[1].replace(n.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:s[0].charAt(0)==="!"?"image":"link",raw:t,href:i,title:o,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function ys(s,e,t){let r=s.match(t.other.indentCodeCompensation);if(r===null)return e;let n=r[1];return e.split(`
`).map(i=>{let o=i.match(t.other.beginningSpace);if(o===null)return i;let[l]=o;return l.length>=n.length?i.slice(n.length):i}).join(`
`)}var Tt=class{options;rules;lexer;constructor(s){this.options=s||Oe}space(s){let e=this.rules.block.newline.exec(s);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(s){let e=this.rules.block.code.exec(s);if(e){let t=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:je(t,`
`)}}}fences(s){let e=this.rules.block.fences.exec(s);if(e){let t=e[0],r=ys(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:r}}}heading(s){let e=this.rules.block.heading.exec(s);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let r=je(t,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(t=r.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(s){let e=this.rules.block.hr.exec(s);if(e)return{type:"hr",raw:je(e[0],`
`)}}blockquote(s){let e=this.rules.block.blockquote.exec(s);if(e){let t=je(e[0],`
`).split(`
`),r="",n="",i=[];for(;t.length>0;){let o=!1,l=[],a;for(a=0;a<t.length;a++)if(this.rules.other.blockquoteStart.test(t[a]))l.push(t[a]),o=!0;else if(!o)l.push(t[a]);else break;t=t.slice(a);let p=l.join(`
`),h=p.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${p}`:p,n=n?`${n}
${h}`:h;let A=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,i,!0),this.lexer.state.top=A,t.length===0)break;let E=i.at(-1);if(E?.type==="code")break;if(E?.type==="blockquote"){let C=E,P=C.raw+`
`+t.join(`
`),N=this.blockquote(P);i[i.length-1]=N,r=r.substring(0,r.length-C.raw.length)+N.raw,n=n.substring(0,n.length-C.text.length)+N.text;break}else if(E?.type==="list"){let C=E,P=C.raw+`
`+t.join(`
`),N=this.list(P);i[i.length-1]=N,r=r.substring(0,r.length-E.raw.length)+N.raw,n=n.substring(0,n.length-C.raw.length)+N.raw,t=P.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:n}}}list(s){let e=this.rules.block.list.exec(s);if(e){let t=e[1].trim(),r=t.length>1,n={type:"list",raw:"",ordered:r,start:r?+t.slice(0,-1):"",loose:!1,items:[]};t=r?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=r?t:"[*+-]");let i=this.rules.other.listItemRegex(t),o=!1;for(;s;){let a=!1,p="",h="";if(!(e=i.exec(s))||this.rules.block.hr.test(s))break;p=e[0],s=s.substring(p.length);let A=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),E=s.split(`
`,1)[0],C=!A.trim(),P=0;if(this.options.pedantic?(P=2,h=A.trimStart()):C?P=e[1].length+1:(P=e[2].search(this.rules.other.nonSpaceChar),P=P>4?1:P,h=A.slice(P),P+=e[1].length),C&&this.rules.other.blankLine.test(E)&&(p+=E+`
`,s=s.substring(E.length+1),a=!0),!a){let N=this.rules.other.nextBulletRegex(P),S=this.rules.other.hrRegex(P),x=this.rules.other.fencesBeginRegex(P),B=this.rules.other.headingBeginRegex(P),U=this.rules.other.htmlBeginRegex(P);for(;s;){let H=s.split(`
`,1)[0],M;if(E=H,this.options.pedantic?(E=E.replace(this.rules.other.listReplaceNesting,"  "),M=E):M=E.replace(this.rules.other.tabCharGlobal,"    "),x.test(E)||B.test(E)||U.test(E)||N.test(E)||S.test(E))break;if(M.search(this.rules.other.nonSpaceChar)>=P||!E.trim())h+=`
`+M.slice(P);else{if(C||A.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(A)||B.test(A)||S.test(A))break;h+=`
`+E}!C&&!E.trim()&&(C=!0),p+=H+`
`,s=s.substring(H.length+1),A=M.slice(P)}}n.loose||(o?n.loose=!0:this.rules.other.doubleBlankLine.test(p)&&(o=!0)),n.items.push({type:"list_item",raw:p,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),n.raw+=p}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let a of n.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let p=this.rules.other.listTaskCheckbox.exec(a.raw);if(p){let h={type:"checkbox",raw:p[0]+" ",checked:p[0]!=="[ ]"};a.checked=h.checked,n.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=h.raw+a.tokens[0].raw,a.tokens[0].text=h.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(h)):a.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):a.tokens.unshift(h)}}if(!n.loose){let p=a.tokens.filter(A=>A.type==="space"),h=p.length>0&&p.some(A=>this.rules.other.anyLine.test(A.raw));n.loose=h}}if(n.loose)for(let a of n.items){a.loose=!0;for(let p of a.tokens)p.type==="text"&&(p.type="paragraph")}return n}}html(s){let e=this.rules.block.html.exec(s);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(s){let e=this.rules.block.def.exec(s);if(e){let t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:e[0],href:r,title:n}}}table(s){let e=this.rules.block.table.exec(s);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let t=Hn(e[1]),r=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(t.length===r.length){for(let o of r)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<t.length;o++)i.header.push({text:t[o],tokens:this.lexer.inline(t[o]),header:!0,align:i.align[o]});for(let o of n)i.rows.push(Hn(o,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(s){let e=this.rules.block.lheading.exec(s);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(s){let e=this.rules.block.paragraph.exec(s);if(e){let t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(s){let e=this.rules.block.text.exec(s);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(s){let e=this.rules.inline.escape.exec(s);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(s){let e=this.rules.inline.tag.exec(s);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(s){let e=this.rules.inline.link.exec(s);if(e){let t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let i=je(t.slice(0,-1),"\\");if((t.length-i.length)%2===0)return}else{let i=Is(e[2],"()");if(i===-2)return;if(i>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let r=e[2],n="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],n=i[3])}else n=e[3]?e[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?r=r.slice(1):r=r.slice(1,-1)),Fn(e,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(s,e){let t;if((t=this.rules.inline.reflink.exec(s))||(t=this.rules.inline.nolink.exec(s))){let r=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[r.toLowerCase()];if(!n){let i=t[0].charAt(0);return{type:"text",raw:i,text:i}}return Fn(t,n,t[0],this.lexer,this.rules)}}emStrong(s,e,t=""){let r=this.rules.inline.emStrongLDelim.exec(s);if(!(!r||r[3]&&t.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!t||this.rules.inline.punctuation.exec(t))){let n=[...r[0]].length-1,i,o,l=n,a=0,p=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(p.lastIndex=0,e=e.slice(-1*s.length+n);(r=p.exec(e))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(o=[...i].length,r[3]||r[4]){l+=o;continue}else if((r[5]||r[6])&&n%3&&!((n+o)%3)){a+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+a);let h=[...r[0]][0].length,A=s.slice(0,n+r.index+h+o);if(Math.min(n,o)%2){let C=A.slice(1,-1);return{type:"em",raw:A,text:C,tokens:this.lexer.inlineTokens(C)}}let E=A.slice(2,-2);return{type:"strong",raw:A,text:E,tokens:this.lexer.inlineTokens(E)}}}}codespan(s){let e=this.rules.inline.code.exec(s);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(t),n=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return r&&n&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(s){let e=this.rules.inline.br.exec(s);if(e)return{type:"br",raw:e[0]}}del(s){let e=this.rules.inline.del.exec(s);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(s){let e=this.rules.inline.autolink.exec(s);if(e){let t,r;return e[2]==="@"?(t=e[1],r="mailto:"+t):(t=e[1],r=t),{type:"link",raw:e[0],text:t,href:r,tokens:[{type:"text",raw:t,text:t}]}}}url(s){let e;if(e=this.rules.inline.url.exec(s)){let t,r;if(e[2]==="@")t=e[0],r="mailto:"+t;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);t=e[0],e[1]==="www."?r="http://"+e[0]:r=e[0]}return{type:"link",raw:e[0],text:t,href:r,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(s){let e=this.rules.inline.text.exec(s);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},Ee=class Kt{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Oe,this.options.tokenizer=this.options.tokenizer||new Tt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:le,block:dt.normal,inline:ze.normal};this.options.pedantic?(t.block=dt.pedantic,t.inline=ze.pedantic):this.options.gfm&&(t.block=dt.gfm,this.options.breaks?t.inline=ze.breaks:t.inline=ze.gfm),this.tokenizer.rules=t}static get rules(){return{block:dt,inline:ze}}static lex(e,t){return new Kt(t).lex(e)}static lexInline(e,t){return new Kt(t).inlineTokens(e)}lex(e){e=e.replace(le.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let r=this.inlineQueue[t];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],r=!1){for(this.options.pedantic&&(e=e.replace(le.tabCharGlobal,"    ").replace(le.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(o=>(n=o.call({lexer:this},e,t))?(e=e.substring(n.raw.length),t.push(n),!0):!1))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let o=t.at(-1);n.raw.length===1&&o!==void 0?o.raw+=`
`:t.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);let o=t.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.at(-1).src=o.text):t.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);let o=t.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title},t.push(n));continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),t.push(n);continue}let i=e;if(this.options.extensions?.startBlock){let o=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(p=>{a=p.call({lexer:this},l),typeof a=="number"&&a>=0&&(o=Math.min(o,a))}),o<1/0&&o>=0&&(i=e.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(i))){let o=t.at(-1);r&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):t.push(n),r=i.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);let o=t.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):t.push(n);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let r=e,n=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,n.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=n[2]?n[2].length:0,r=r.slice(0,n.index+i)+"["+"a".repeat(n[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let o=!1,l="";for(;e;){o||(l=""),o=!1;let a;if(this.options.extensions?.inline?.some(h=>(a=h.call({lexer:this},e,t))?(e=e.substring(a.raw.length),t.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let h=t.at(-1);a.type==="text"&&h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):t.push(a);continue}if(a=this.tokenizer.emStrong(e,r,l)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),t.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),t.push(a);continue}let p=e;if(this.options.extensions?.startInline){let h=1/0,A=e.slice(1),E;this.options.extensions.startInline.forEach(C=>{E=C.call({lexer:this},A),typeof E=="number"&&E>=0&&(h=Math.min(h,E))}),h<1/0&&h>=0&&(p=e.substring(0,h+1))}if(a=this.tokenizer.inlineText(p)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),o=!0;let h=t.at(-1);h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):t.push(a);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return t}},Lt=class{options;parser;constructor(s){this.options=s||Oe}space(s){return""}code({text:s,lang:e,escaped:t}){let r=(e||"").match(le.notSpaceStart)?.[0],n=s.replace(le.endingNewline,"")+`
`;return r?'<pre><code class="language-'+we(r)+'">'+(t?n:we(n,!0))+`</code></pre>
`:"<pre><code>"+(t?n:we(n,!0))+`</code></pre>
`}blockquote({tokens:s}){return`<blockquote>
${this.parser.parse(s)}</blockquote>
`}html({text:s}){return s}def(s){return""}heading({tokens:s,depth:e}){return`<h${e}>${this.parser.parseInline(s)}</h${e}>
`}hr(s){return`<hr>
`}list(s){let e=s.ordered,t=s.start,r="";for(let o=0;o<s.items.length;o++){let l=s.items[o];r+=this.listitem(l)}let n=e?"ol":"ul",i=e&&t!==1?' start="'+t+'"':"";return"<"+n+i+`>
`+r+"</"+n+`>
`}listitem(s){return`<li>${this.parser.parse(s.tokens)}</li>
`}checkbox({checked:s}){return"<input "+(s?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:s}){return`<p>${this.parser.parseInline(s)}</p>
`}table(s){let e="",t="";for(let n=0;n<s.header.length;n++)t+=this.tablecell(s.header[n]);e+=this.tablerow({text:t});let r="";for(let n=0;n<s.rows.length;n++){let i=s.rows[n];t="";for(let o=0;o<i.length;o++)t+=this.tablecell(i[o]);r+=this.tablerow({text:t})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+r+`</table>
`}tablerow({text:s}){return`<tr>
${s}</tr>
`}tablecell(s){let e=this.parser.parseInline(s.tokens),t=s.header?"th":"td";return(s.align?`<${t} align="${s.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:s}){return`<strong>${this.parser.parseInline(s)}</strong>`}em({tokens:s}){return`<em>${this.parser.parseInline(s)}</em>`}codespan({text:s}){return`<code>${we(s,!0)}</code>`}br(s){return"<br>"}del({tokens:s}){return`<del>${this.parser.parseInline(s)}</del>`}link({href:s,title:e,tokens:t}){let r=this.parser.parseInline(t),n=Pn(s);if(n===null)return r;s=n;let i='<a href="'+s+'"';return e&&(i+=' title="'+we(e)+'"'),i+=">"+r+"</a>",i}image({href:s,title:e,text:t,tokens:r}){r&&(t=this.parser.parseInline(r,this.parser.textRenderer));let n=Pn(s);if(n===null)return we(t);s=n;let i=`<img src="${s}" alt="${t}"`;return e&&(i+=` title="${we(e)}"`),i+=">",i}text(s){return"tokens"in s&&s.tokens?this.parser.parseInline(s.tokens):"escaped"in s&&s.escaped?s.text:we(s.text)}},mn=class{strong({text:s}){return s}em({text:s}){return s}codespan({text:s}){return s}del({text:s}){return s}html({text:s}){return s}text({text:s}){return s}link({text:s}){return""+s}image({text:s}){return""+s}br(){return""}checkbox({raw:s}){return s}},Ae=class Zt{options;renderer;textRenderer;constructor(e){this.options=e||Oe,this.options.renderer=this.options.renderer||new Lt,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new mn}static parse(e,t){return new Zt(t).parse(e)}static parseInline(e,t){return new Zt(t).parseInline(e)}parse(e){let t="";for(let r=0;r<e.length;r++){let n=e[r];if(this.options.extensions?.renderers?.[n.type]){let o=n,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){t+=l||"";continue}}let i=n;switch(i.type){case"space":{t+=this.renderer.space(i);break}case"hr":{t+=this.renderer.hr(i);break}case"heading":{t+=this.renderer.heading(i);break}case"code":{t+=this.renderer.code(i);break}case"table":{t+=this.renderer.table(i);break}case"blockquote":{t+=this.renderer.blockquote(i);break}case"list":{t+=this.renderer.list(i);break}case"checkbox":{t+=this.renderer.checkbox(i);break}case"html":{t+=this.renderer.html(i);break}case"def":{t+=this.renderer.def(i);break}case"paragraph":{t+=this.renderer.paragraph(i);break}case"text":{t+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return t}parseInline(e,t=this.renderer){let r="";for(let n=0;n<e.length;n++){let i=e[n];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let o=i;switch(o.type){case"escape":{r+=t.text(o);break}case"html":{r+=t.html(o);break}case"link":{r+=t.link(o);break}case"image":{r+=t.image(o);break}case"checkbox":{r+=t.checkbox(o);break}case"strong":{r+=t.strong(o);break}case"em":{r+=t.em(o);break}case"codespan":{r+=t.codespan(o);break}case"br":{r+=t.br(o);break}case"del":{r+=t.del(o);break}case"text":{r+=t.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Qe=class{options;block;constructor(s){this.options=s||Oe}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(s){return s}postprocess(s){return s}processAllTokens(s){return s}emStrongMask(s){return s}provideLexer(){return this.block?Ee.lex:Ee.lexInline}provideParser(){return this.block?Ae.parse:Ae.parseInline}},Ss=class{defaults=on();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Ae;Renderer=Lt;TextRenderer=mn;Lexer=Ee;Tokenizer=Tt;Hooks=Qe;constructor(...s){this.use(...s)}walkTokens(s,e){let t=[];for(let r of s)switch(t=t.concat(e.call(this,r)),r.type){case"table":{let n=r;for(let i of n.header)t=t.concat(this.walkTokens(i.tokens,e));for(let i of n.rows)for(let o of i)t=t.concat(this.walkTokens(o.tokens,e));break}case"list":{let n=r;t=t.concat(this.walkTokens(n.items,e));break}default:{let n=r;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(i=>{let o=n[i].flat(1/0);t=t.concat(this.walkTokens(o,e))}):n.tokens&&(t=t.concat(this.walkTokens(n.tokens,e)))}}return t}use(...s){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return s.forEach(t=>{let r={...t};if(r.async=this.defaults.async||r.async||!1,t.extensions&&(t.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let i=e.renderers[n.name];i?e.renderers[n.name]=function(...o){let l=n.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[n.level];i?i.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),r.extensions=e),t.renderer){let n=this.defaults.renderer||new Lt(this.defaults);for(let i in t.renderer){if(!(i in n))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,l=t.renderer[o],a=n[o];n[o]=(...p)=>{let h=l.apply(n,p);return h===!1&&(h=a.apply(n,p)),h||""}}r.renderer=n}if(t.tokenizer){let n=this.defaults.tokenizer||new Tt(this.defaults);for(let i in t.tokenizer){if(!(i in n))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,l=t.tokenizer[o],a=n[o];n[o]=(...p)=>{let h=l.apply(n,p);return h===!1&&(h=a.apply(n,p)),h}}r.tokenizer=n}if(t.hooks){let n=this.defaults.hooks||new Qe;for(let i in t.hooks){if(!(i in n))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,l=t.hooks[o],a=n[o];Qe.passThroughHooks.has(i)?n[o]=p=>{if(this.defaults.async&&Qe.passThroughHooksRespectAsync.has(i))return(async()=>{let A=await l.call(n,p);return a.call(n,A)})();let h=l.call(n,p);return a.call(n,h)}:n[o]=(...p)=>{if(this.defaults.async)return(async()=>{let A=await l.apply(n,p);return A===!1&&(A=await a.apply(n,p)),A})();let h=l.apply(n,p);return h===!1&&(h=a.apply(n,p)),h}}r.hooks=n}if(t.walkTokens){let n=this.defaults.walkTokens,i=t.walkTokens;r.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),n&&(l=l.concat(n.call(this,o))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(s){return this.defaults={...this.defaults,...s},this}lexer(s,e){return Ee.lex(s,e??this.defaults)}parser(s,e){return Ae.parse(s,e??this.defaults)}parseMarkdown(s){return(e,t)=>{let r={...t},n={...this.defaults,...r},i=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=s),n.async)return(async()=>{let o=n.hooks?await n.hooks.preprocess(e):e,l=await(n.hooks?await n.hooks.provideLexer():s?Ee.lex:Ee.lexInline)(o,n),a=n.hooks?await n.hooks.processAllTokens(l):l;n.walkTokens&&await Promise.all(this.walkTokens(a,n.walkTokens));let p=await(n.hooks?await n.hooks.provideParser():s?Ae.parse:Ae.parseInline)(a,n);return n.hooks?await n.hooks.postprocess(p):p})().catch(i);try{n.hooks&&(e=n.hooks.preprocess(e));let o=(n.hooks?n.hooks.provideLexer():s?Ee.lex:Ee.lexInline)(e,n);n.hooks&&(o=n.hooks.processAllTokens(o)),n.walkTokens&&this.walkTokens(o,n.walkTokens);let l=(n.hooks?n.hooks.provideParser():s?Ae.parse:Ae.parseInline)(o,n);return n.hooks&&(l=n.hooks.postprocess(l)),l}catch(o){return i(o)}}}onError(s,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,s){let r="<p>An error occurred:</p><pre>"+we(t.message+"",!0)+"</pre>";return e?Promise.resolve(r):r}if(e)return Promise.reject(t);throw t}}},ke=new Ss;function G(s,e){return ke.parse(s,e)}G.options=G.setOptions=function(s){return ke.setOptions(s),G.defaults=ke.defaults,rr(G.defaults),G};G.getDefaults=on;G.defaults=Oe;G.use=function(...s){return ke.use(...s),G.defaults=ke.defaults,rr(G.defaults),G};G.walkTokens=function(s,e){return ke.walkTokens(s,e)};G.parseInline=ke.parseInline;G.Parser=Ae;G.parser=Ae.parse;G.Renderer=Lt;G.TextRenderer=mn;G.Lexer=Ee;G.lexer=Ee.lex;G.Tokenizer=Tt;G.Hooks=Qe;G.parse=G;G.options;G.setOptions;G.use;G.walkTokens;G.parseInline;Ae.parse;Ee.lex;class bs{static render(e,t=!1){let r=e,n="";if(t){const o=kn.parse(e);r=o.content,o.frontmatter&&(n=kn.renderFrontmatter(o.frontmatter))}const i=G.parse(r);return`<div class="markdown-output">${n}${i}</div>`}}class ae{static render(e,t=!1){return bs.render(e,t)}}function Rs(s){return{name:"render",description:"Render markdown file with formatting",execute:(e,t)=>{if(new V(e).hasFlag("help"))return{output:`Usage: render <file>
Or: <command> | render

Description:
  Render markdown with formatting and YAML frontmatter

Examples:
  render ~/blog/post.md   # Render file
  cat file.md | render    # Render from stdin`};let n;if(t)n=t;else if(e.length>0){const l=e[0];try{if(!s.exists(l))return{output:`render: ${l}: No such file or directory`,error:!0};if(!s.isFile(l))return{output:`render: ${l}: Is a directory`,error:!0};n=s.readFile(l)}catch(a){return{output:a instanceof Error?a.message:String(a),error:!0}}}else return{output:`render: missing file operand
Try 'render --help' for more information`,error:!0};const i=n.trim().startsWith("---");return{output:ae.render(n,i),html:!0}}}}function Cs(s){return{name:"unalias",description:"Remove command aliases",execute:(e,t)=>{if(new V(e).hasFlag("help"))return{output:`Usage: unalias <name>

Description:
  Remove a command alias

Examples:
  unalias ll           # Remove the 'll' alias`};if(e.length===0)return{output:`Usage: unalias name
Try 'unalias --help' for more information.`,error:!0};const n=e[0];return s.removeAlias(n)?{output:`Alias removed: ${n}`}:{output:`unalias: ${n}: not found`,error:!0}}}}const ws=new Set(["about","portfolio","blog","contact","settings"]);function Ns(s,e){return{name:"which",description:"Locate a command and display its path",execute:(t,r)=>{const n=new V(t);if(n.hasFlag("help"))return{output:`Usage: which [-a] <command> [command ...]

Description:
  Locate a command and display its path

Options:
  -a               Show all matching paths
  --help           Show this help message

Examples:
  which ls         # /usr/bin/ls
  which about      # /usr/local/bin/about
  which ll         # ll: aliased to ls -alh
  which ls cat     # Check multiple commands`};const i=n.getAllPositionals();if(i.length===0)return{output:`which: missing command argument
Usage: which [-a] <command> [command ...]`,error:!0};const o=n.hasFlag("a"),l=[];let a=!1;for(const h of i){const A=xs(h,s,e,o);A.error&&(a=!0),l.push(A.output)}const p={output:l.join(`
`)};return a&&(p.error=!0),p}}}function xs(s,e,t,r){const n=[],i=t.getAlias(s);if(i&&(n.push(`${s}: aliased to ${i}`),!r))return{output:n.join(`
`)};if(e.getCommandNames().includes(s.toLowerCase())){const a=ws.has(s.toLowerCase())?`/usr/local/bin/${s}`:`/usr/bin/${s}`;n.push(a)}return n.length===0?{output:`which: ${s}: command not found`,error:!0}:{output:n.join(`
`)}}function vs(s){return{name:"whoami",description:"Display current username",execute:(e,t)=>new V(e).hasFlag("help")?{output:`Usage: whoami

Description:
  Display the current username

Examples:
  whoami               # Show current user`}:{output:s.getUsername()}}}function ks(s){return{name:"cat",description:"Display file contents",execute:(e,t)=>{if(new V(e).hasFlag("help"))return{output:`Usage: cat <file>

Description:
  Display file contents

Examples:
  cat file.txt         # Display file
  cat ~/blog/post.md   # Display from path
  cat file.txt | grep hello  # Use in pipeline
  echo "data" | cat    # Read from stdin`};if(e.length===0)return t!==void 0?{output:t}:{output:`cat: missing file operand
Try 'cat --help' for more information`,error:!0};try{return{output:s.readFile(e[0])}}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}function Os(s,e,t){return{name:"cd",description:"Change directory (supports - for previous directory)",execute:(r,n)=>{if(new V(r).hasFlag("help"))return{output:`Usage: cd [directory]

Description:
  Change current working directory

Examples:
  cd                   # Go to home directory
  cd ~/blog            # Change to blog directory
  cd -                 # Go to previous directory`};try{let o=r[0]||"~";if(o==="-"&&t){const l=t.getVariable("OLDPWD");if(!l)return{output:"cd: OLDPWD not set",error:!0};o=l}if(t){const l=t.getVariable("PWD")??s.getCurrentPath();t.setVariable("OLDPWD",l)}return s.changeDirectory(o),t&&t.setVariable("PWD",s.getCurrentPath()),e(s.getShortPath()),{output:""}}catch(o){return{output:o instanceof Error?o.message:String(o),error:!0}}}}}function Ms(s,e){if(!e)return s.toString();const t=["B","K","M","G","T"];let r=s,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;return`${n===0?r.toString():r.toFixed(1)}${t[n]}`}function Ds(s){const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][s.getMonth()],r=s.getDate().toString().padStart(2," "),n=s.getHours().toString().padStart(2,"0"),i=s.getMinutes().toString().padStart(2,"0");return`${t} ${r} ${n}:${i}`}function Wn(s,e){const t=s.permissions??"-rw-r--r--",r="1",n=s.owner??"darin",i="staff",o=Ms(s.size??0,e),l=Ds(s.modifiedTime??new Date),a=s.name,p=o.padStart(6," ");return`${t}  ${r} ${n}  ${i}  ${p} ${l} ${a}`}function Ps(s){const e=s.reduce((t,r)=>t+(r.size??0),0);return Math.ceil(e/512)}function Hs(s){return{name:"ls",description:"List directory contents",execute:(e,t)=>{try{const r=new V(e);if(r.hasFlag("help"))return{output:`Usage: ls [options] [path]

Description:
  List directory contents

Options:
  -a                   Show hidden files
  -l                   Long format with details
  -h                   Human-readable sizes

Examples:
  ls                   # List current directory
  ls -la               # List all files with details
  ls ~/blog            # List specific directory`};const n=r.getPositional(0)??".",i=r.hasFlag("a"),o=r.hasFlag("l"),l=r.hasFlag("h"),a=s.getNode(n);if(!a)return{output:`ls: cannot access '${n}': No such file or directory
Try 'ls --help' for more information`,error:!0};if(a.type==="file")return o?{output:Wn(a,l)}:{output:a.name};if(!a.children)return{output:""};let p=Array.from(a.children.values());return i||(p=p.filter(h=>!h.isHidden)),p.length===0?{output:""}:(p.sort((h,A)=>h.name.localeCompare(A.name)),o?{output:[`total ${Ps(p)}`,...p.map(E=>Wn(E,l))].join(`
`)}:{output:p.map(A=>A.name).join("  ")})}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Fs(s){return{name:"pwd",description:"Print working directory",execute:(e,t)=>new V(e).hasFlag("help")?{output:`Usage: pwd

Description:
  Print current working directory path

Examples:
  pwd                  # Show current directory`}:{output:s.getCurrentPath()}}}function Ws(s){return{name:"tree",description:"Display directory tree structure",execute:(e,t)=>{try{const r=new V(e);if(r.hasFlag("help"))return{output:`Usage: tree [options] [path]

Description:
  Display directory tree structure

Options:
  -L <depth>           Limit tree depth (default: 4)

Examples:
  tree                 # Show tree of current directory
  tree ~/blog          # Show tree of specific directory
  tree -L 2            # Limit depth to 2 levels`};const n=r.getPositional(0)??".";let i=4;const o=r.getFlag("L");if(o!==void 0){if(typeof o=="boolean")return{output:`tree: -L flag requires a depth value
Try 'tree --help' for more information`,error:!0};const p=parseInt(o,10);if(isNaN(p)||p<1)return{output:`tree: invalid level, must be a positive integer
Try 'tree --help' for more information`,error:!0};i=p}return{output:s.getTree(n,i).join(`
`),scrollBehavior:"top"}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}const ye={HOME_DARIN:"/home/darin",HOME_GUEST:"/home/guest",CONTENT_BLOG:"/home/darin/blog",CONTENT_PORTFOLIO:"/home/darin/portfolio",CONTENT_HELP:"/home/darin/content/help.md",CONTENT_ABOUT:"/home/darin/content/about.md",CONTENT_CONTACT:"/home/darin/content/contact.md",CONFIG_ALIASES:"/home/guest/.alias",CONFIG_SETTINGS:"/home/darin/.settings",CONFIG_ENV:"/home/darin/.env"},mr={CLEAR_SCREEN:"__CLEAR__"},Qt={SETTINGS:"terminal_settings",ENVIRONMENT:"terminal_env_vars"},Et={EMPTY_PORTFOLIO:"No portfolio projects yet. Check back soon!",EMPTY_BLOG:"No blog posts yet. Check back soon!",NO_TAGS_AVAILABLE:"No tags available yet."},Un={theme:{preset:"dc",customColors:void 0},font:{size:16,family:"Fira Code"},effects:{scanLines:!1,glow:!1,border:!0,animationSpeed:1,soundEffects:!1,autoScrollBehavior:!0},prompt:{format:"\\W \\$ "},screensaver:{enabled:!0,timeoutMinutes:5,activeScreensaver:"matrix"}},Je={MIN_TIMEOUT_MINUTES:1,MAX_TIMEOUT_MINUTES:60,ACTIVITY_DEBOUNCE_MS:100};function Us(s){return{name:"about",description:"Display bio and expertise overview",execute:(e,t)=>{if(new V(e).hasFlag("help"))return{output:`Usage: about

Description:
  Display professional bio and expertise overview

Examples:
  about                # Show bio and background`};try{const n=s.readFile(ye.CONTENT_ABOUT);return{output:ae.render(n),html:!0,scrollBehavior:"top"}}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}function Bs(s){if(typeof s!="object"||s===null)return!1;const e=s;return typeof e.title=="string"&&typeof e.date=="string"&&typeof e.summary=="string"&&Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string")}class pr{static parseFrontmatter(e){const t=e.split(`
`);if(t[0]?.trim()!=="---")throw new Error("Invalid frontmatter: must start with ---");let r=-1;for(let l=1;l<t.length;l++)if(t[l].trim()==="---"){r=l;break}if(r===-1)throw new Error("Invalid frontmatter: no closing ---");const n=t.slice(1,r),i=t.slice(r+1),o={};for(const l of n){const a=l.indexOf(":");if(a===-1)continue;const p=l.substring(0,a).trim(),h=l.substring(a+1).trim();if(h.startsWith("[")&&h.endsWith("]")){const A=h.substring(1,h.length-1);o[p]=A.split(",").map(E=>E.trim().replace(/^["']|["']$/g,"")).filter(E=>E.length>0)}else o[p]=h.replace(/^["']|["']$/g,"")}if(!Bs(o)){const l=[];throw o.title||l.push("title"),o.date||l.push("date"),o.summary||l.push("summary"),Array.isArray(o.tags)||l.push("tags"),new Error(`Invalid blog frontmatter: missing or invalid fields: ${l.join(", ")}`)}return{frontmatter:o,markdown:i.join(`
`).trim()}}static parseBlogPost(e,t){const{frontmatter:r,markdown:n}=this.parseFrontmatter(t);return{id:e.replace(/^\d{4}-\d{2}-\d{2}-/,"").replace(/\.md$/,""),title:r.title,date:r.date,summary:r.summary,content:n,tags:r.tags}}static getIdFromFilename(e){return e.replace(/^\d{4}-\d{2}-\d{2}-/,"").replace(/\.md$/,"")}}class At{static formatClickableTag(e,t){return`<button data-command="${t==="portfolio"?`portfolio --tags ${e}`:`blog --tags ${e}`}" class="tag-link">${e}</button>`}static formatPortfolioList(e,t){const r=t?`# Portfolio - Tag: ${t}`:"# Portfolio",n=e.map((o,l)=>{const a=o.tags?.map(h=>this.formatClickableTag(h,"portfolio")).join(" ")??"",p=a?`

**Tags:** ${a}`:"";return`### <a href="/portfolio/${o.id}" data-command="portfolio ${o.id}">${l+1}. ${o.title} (${o.year})</a>

${o.summary}${p}
`}).join(`

---

`);return`${r}

${n}${t?`

---

<a href="/portfolio" data-command="portfolio">← Back to All Projects</a>`:"\n\n---\n\n**Filter by tag:** Type `portfolio --tags <tag>` or `portfolio --tags` to list all tags"}`}static formatPortfolioDetail(e){const t=e.technologies.join(", "),r=e.impact?`**Impact:** ${e.impact}

`:"",n=e.tags?.map(o=>this.formatClickableTag(o,"portfolio")).join(" ")??"",i=n?`**Tags:** ${n}

`:"";return`# ${e.title}

**Year:** ${e.year}

${e.description}

**Technologies:** ${t}

${r}${i}---

<a href="/portfolio" data-command="portfolio">← Back to Portfolio</a>`}static formatBlogList(e,t){const r=t?`# Blog Posts - Tag: ${t}`:"# Blog Posts",n=e.map((o,l)=>{const a=o.tags.map(h=>this.formatClickableTag(h,"blog")).join(" "),p=e.length-l;return`### <a href="/blog/${o.id}" data-command="blog ${o.id}">${p}. ${o.title}</a>

**Date:** ${o.date}

${o.summary}

**Tags:** ${a}
`}).join(`

---

`);return`${r}

${n}${t?`

---

<a href="/blog" data-command="blog">← Back to All Posts</a>`:"\n\n---\n\n**Filter by tag:** Type `blog --tags <tag>` or `blog --tags` to list all tags"}`}static formatBlogPost(e){const t=e.tags.map(r=>this.formatClickableTag(r,"blog")).join(" ");return`# ${e.title}

**Date:** ${e.date}

---

${e.content}

---

**Tags:** ${t}

<a href="/blog" data-command="blog">← Back to Blog</a>`}}function Gs(s){return{name:"blog",description:"List and read blog posts",execute:(e,t)=>{const r=new V(e);if(r.hasFlag("help"))return{output:`Usage: blog [options] [post-id|number]

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
  blog post-id                  # Read specific post by ID`};const n=ye.CONTENT_BLOG;try{const o=s.list(n).filter(N=>N.endsWith(".md")).sort().reverse(),l=r.getFlag("tags"),a=r.hasFlag("tags"),p=r.getPositional(0),h=[];for(const N of o){const S=s.readFile(`${n}/${N}`),x=pr.parseBlogPost(N,S);h.push(x)}if(h.length===0&&!a&&!p){const N=`# Blog

${Et.EMPTY_BLOG}`;return{output:ae.render(N),html:!0,scrollBehavior:"top"}}if(a&&(typeof l=="boolean"||!l)){const N=new Set,S=new Map;h.forEach(M=>{M.tags?.forEach(z=>{N.add(z),S.set(z,(S.get(z)??0)+1)})});const x=Array.from(N).sort();if(x.length===0){const M=`# Blog Tags

${Et.NO_TAGS_AVAILABLE}`;return{output:ae.render(M),html:!0,scrollBehavior:"top"}}const U=`# Blog Tags

${x.map(M=>{const z=S.get(M)??0;return`- <button data-command="blog --tags ${M}" class="tag-link">${M}</button> (${z} post${z!==1?"s":""})`}).join(`
`)}

---

**Usage:** Type \`blog --tags <tag>\` to filter posts`;return{output:ae.render(U),html:!0,scrollBehavior:"top"}}if(p){let N;const S=parseInt(p,10);if(!isNaN(S)&&S>0&&S<=h.length){const U=h.length-S;N=h[U]}else N=h.find(U=>U.id===p);if(!N)return{output:`Blog post '${p}' not found.
Use 'blog' to list all posts.
Try 'blog --help' for more information`,error:!0};const x=At.formatBlogPost(N);return{output:ae.render(x),html:!0,scrollBehavior:"top"}}let A=h;const E=typeof l=="string"?l:void 0;if(E&&(A=h.filter(N=>N.tags.some(S=>S.toLowerCase()===E.toLowerCase())),A.length===0)){const N=new Map;h.forEach(B=>{B.tags?.forEach(U=>{N.set(U,(N.get(U)??0)+1)})});const S=Array.from(N.entries()).sort((B,U)=>U[1]-B[1]).slice(0,5).map(([B])=>B),x=S.length>0?`
Try one of these tags: ${S.join(", ")}`:"";return{output:`No blog posts found with tag '${E}'.${x}
Use 'blog' to see all posts.`,error:!1}}const C=At.formatBlogList(A,E);return{output:ae.render(C),html:!0,scrollBehavior:"top"}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}}}function Vs(s){return{name:"contact",description:"Display contact information",execute:(e,t)=>{if(new V(e).hasFlag("help"))return{output:`Usage: contact

Description:
  Display contact information and professional links

Examples:
  contact              # Show contact details`};try{const n=s.readFile(ye.CONTENT_CONTACT);return{output:ae.render(n),html:!0}}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}function zs(s){if(typeof s!="object"||s===null)return!1;const e=s;return typeof e.id=="string"&&typeof e.title=="string"&&typeof e.summary=="string"&&typeof e.year=="string"&&typeof e.order=="number"&&Array.isArray(e.technologies)&&e.technologies.every(t=>typeof t=="string")&&(e.impact===void 0||typeof e.impact=="string")&&(e.tags===void 0||Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string"))}class js{static parseFrontmatter(e){const t=e.split(`
`);if(t[0]?.trim()!=="---")throw new Error("Invalid frontmatter: must start with ---");let r=-1;for(let l=1;l<t.length;l++)if(t[l].trim()==="---"){r=l;break}if(r===-1)throw new Error("Invalid frontmatter: no closing ---");const n=t.slice(1,r),i=t.slice(r+1),o={};for(const l of n){const a=l.indexOf(":");if(a===-1)continue;const p=l.substring(0,a).trim(),h=l.substring(a+1).trim();if(h.startsWith("[")&&h.endsWith("]")){const A=h.substring(1,h.length-1);o[p]=A.split(",").map(E=>E.trim().replace(/^["']|["']$/g,"")).filter(E=>E.length>0)}else{const A=h.replace(/^["']|["']$/g,"");if(p==="order"){const E=Number(A);o[p]=isNaN(E)?A:E}else o[p]=A}}if(!zs(o)){const l=[];throw o.id||l.push("id"),o.title||l.push("title"),o.summary||l.push("summary"),o.year||l.push("year"),typeof o.order!="number"&&l.push("order"),Array.isArray(o.technologies)||l.push("technologies"),new Error(`Invalid portfolio frontmatter: missing or invalid fields: ${l.join(", ")}`)}return{frontmatter:o,markdown:i.join(`
`).trim()}}static parseProject(e,t){const{frontmatter:r,markdown:n}=this.parseFrontmatter(t);return{id:r.id||e.replace(/\.md$/,""),title:r.title,summary:r.summary,description:n,technologies:r.technologies,impact:r.impact,year:r.year,order:r.order,tags:r.tags}}static getIdFromFilename(e){return e.replace(/\.md$/,"")}}function Ys(s){return{name:"portfolio",description:"Showcase projects and accomplishments",execute:(e,t)=>{const r=new V(e);if(r.hasFlag("help"))return{output:`Usage: portfolio [options] [project-id|number]

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
  portfolio proj-id             # View specific project by ID`};const n=ye.CONTENT_PORTFOLIO;try{const o=s.list(n).filter(S=>S.endsWith(".md")),l=r.getFlag("tags"),a=r.hasFlag("tags"),p=r.getPositional(0),h=[];for(const S of o){const x=s.readFile(`${n}/${S}`);if(x)try{const B=js.parseProject(S,x);h.push(B)}catch(B){console.error(`Error parsing ${S}:`,B)}}if(h.sort((S,x)=>S.order!==x.order?S.order-x.order:S.title.localeCompare(x.title)),h.length===0&&!a&&!p){const S=`# Portfolio

${Et.EMPTY_PORTFOLIO}`;return{output:ae.render(S),html:!0,scrollBehavior:"top"}}if(a&&(typeof l=="boolean"||!l)){const S=new Set,x=new Map;h.forEach(z=>{z.tags?.forEach(ee=>{S.add(ee),x.set(ee,(x.get(ee)??0)+1)})});const B=Array.from(S).sort();if(B.length===0){const z=`# Portfolio Tags

${Et.NO_TAGS_AVAILABLE}`;return{output:ae.render(z),html:!0,scrollBehavior:"top"}}const H=`# Portfolio Tags

${B.map(z=>{const ee=x.get(z)??0;return`- <button data-command="portfolio --tags ${z}" class="tag-link">${z}</button> (${ee} project${ee!==1?"s":""})`}).join(`
`)}

---

**Usage:** Type \`portfolio --tags <tag>\` to filter projects`;return{output:ae.render(H),html:!0,scrollBehavior:"top"}}if(p){let S;const x=parseInt(p,10);if(!isNaN(x)&&x>0&&x<=h.length){const H=x-1;S=h[H]}else S=h.find(H=>H.id===p);if(!S)return{output:`Project '${p}' not found.
Use 'portfolio' to list all projects.
Try 'portfolio --help' for more information`,error:!0};const B=At.formatPortfolioDetail(S);return{output:ae.render(B),html:!0,scrollBehavior:"top"}}let A=h,E=[];if(a&&typeof l=="string"&&(E=l.split(",").map(S=>S.trim().toLowerCase()),A=h.filter(S=>S.tags?.some(x=>E.includes(x.toLowerCase()))),A.length===0)){const S=E.map(H=>`'${H}'`).join(", "),x=new Map;h.forEach(H=>{H.tags?.forEach(M=>{x.set(M,(x.get(M)??0)+1)})});const B=Array.from(x.entries()).sort((H,M)=>M[1]-H[1]).slice(0,5).map(([H])=>H),U=B.length>0?`
Try one of these tags: ${B.join(", ")}`:"";return{output:`No projects found with tag${E.length>1?"s":""} ${S}.${U}
Use 'portfolio' to see all projects.`,error:!1}}const C=E.length>0?E.join(", "):void 0,P=At.formatPortfolioList(A,C);return{output:ae.render(P),html:!0,scrollBehavior:"top"}}catch(i){return{output:`Error loading portfolio: ${String(i)}`,error:!0}}}}}function fr(s,e){const t=s.loadSettings(),r=e.getPresets();return`<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true"><h2>Terminal Settings</h2><section class="settings-section"><h3>Color Theme</h3>${Xs(r,t.theme.preset)}</section><section class="settings-section"><details ${t.theme.preset==="custom"?"open":""}><summary>Advanced: Custom Colors</summary>${qs(t.theme.customColors)}</details></section><section class="settings-section"><h3>Font</h3>${Ks(t.font)}</section><section class="settings-section"><h3>Effects</h3>${Zs(t.effects)}</section><section class="settings-section"><h3>Screensaver</h3>${Qs(t.screensaver)}</section><div class="settings-actions"><button data-command="settings reset" class="btn-reset">Reset to Defaults</button></div></aside>`}function Xs(s,e){return'<div class="theme-buttons-container">'+s.map(t=>`<button class="theme-button ${t.name===e?"active":""}" data-command="settings set theme ${t.name}" data-theme="${t.name}" style="background: ${t.colors["--terminal-bg"]}; color: ${t.colors["--terminal-accent"]}; border-color: ${t.colors["--terminal-accent"]};"><span class="theme-preview" style="background: ${t.colors["--terminal-accent"]}"></span>${t.displayName}</button>`).join("")+"</div>"}function qs(s){return[{key:"--terminal-bg",label:"Background",prop:"background"},{key:"--terminal-bg-secondary",label:"BG (Secondary)",prop:"backgroundSecondary"},{key:"--terminal-fg",label:"Foreground",prop:"foreground"},{key:"--terminal-accent",label:"Accent",prop:"accent"},{key:"--terminal-dim",label:"Dim",prop:"dim"},{key:"--terminal-error",label:"Error",prop:"error"},{key:"--terminal-cursor",label:"Cursor",prop:"cursor"}].map(t=>{const r=s?.[t.prop]??(typeof window<"u"?getComputedStyle(document.documentElement).getPropertyValue(t.key).trim():"#000000");return`<div class="color-picker-group"><label>${t.label}</label><input type="color" value="${r}" data-command-template="settings set color ${t.key}" data-color-var="${t.key}"/><span class="color-value">${s?.[t.prop]??"default"}</span></div>`}).join("")}function Ks(s){const e=["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"];return`<div class="setting-group"><label>Font Size: <span id="font-size-value">${s.size}px</span></label><input type="range" min="8" max="24" step="1" value="${s.size}" aria-label="Font size" aria-valuemin="8" aria-valuemax="24" aria-valuenow="${s.size}" aria-valuetext="${s.size} pixels" data-command-template="settings set font-size" data-setting-type="font-size"/></div><div class="setting-group"><label>Font Family</label><select aria-label="Font family" data-command-template="settings set font-family" data-setting-type="font-family">${e.map(t=>`<option value="${t}" ${t===s.family?"selected":""}>${t}</option>`).join("")}</select></div>`}function Zs(s){return`<div class="setting-group"><label><input type="checkbox" ${s.scanLines?"checked":""} data-command-template="settings set scan-lines" data-setting-type="scan-lines"/>Scan Lines</label></div><div class="setting-group"><label><input type="checkbox" ${s.glow?"checked":""} data-command-template="settings set glow" data-setting-type="glow"/>Glow Effect</label></div><div class="setting-group"><label><input type="checkbox" ${s.border?"checked":""} data-command-template="settings set border" data-setting-type="border"/>Page Border</label></div><div class="setting-group"><label>Animation Speed: <span id="animation-speed-value">${s.animationSpeed}x</span></label><input type="range" min="0.5" max="2.0" step="0.1" value="${s.animationSpeed}" aria-label="Animation speed" aria-valuemin="0.5" aria-valuemax="2" aria-valuenow="${s.animationSpeed}" aria-valuetext="${s.animationSpeed} times speed" data-command-template="settings set animation-speed" data-setting-type="animation-speed"/></div><div class="setting-group"><label><input type="checkbox" ${s.soundEffects?"checked":""} data-command-template="settings set sound-effects" data-setting-type="sound-effects"/>Sound Effects (future feature)</label></div>`}function Qs(s){const e=[{value:"matrix",label:"Matrix Digital Rain"}];return`<div class="setting-group"><label><input type="checkbox" ${s.enabled?"checked":""} data-command-template="settings set screensaver-enabled" data-setting-type="screensaver-enabled"/>Enable Screensaver</label></div><div class="setting-group"><label>Timeout: <span id="screensaver-timeout-value">${s.timeoutMinutes}min</span></label><input type="range" min="1" max="60" step="1" value="${s.timeoutMinutes}" aria-label="Screensaver timeout" aria-valuemin="1" aria-valuemax="60" aria-valuenow="${s.timeoutMinutes}" aria-valuetext="${s.timeoutMinutes} minutes" data-command-template="settings set screensaver-timeout" data-setting-type="screensaver-timeout"/></div><div class="setting-group"><label>Screensaver Type</label><select aria-label="Screensaver type" data-command-template="settings set screensaver-type" data-setting-type="screensaver-type">${e.map(t=>`<option value="${t.value}" ${t.value===s.activeScreensaver?"selected":""}>${t.label}</option>`).join("")}</select></div>`}function Js(s,e,t){return{name:"settings",description:"Manage terminal settings and preferences",aliases:["preferences","config"],execute:(r,n)=>{const i=new V(r);if(i.hasFlag("help"))return{output:`Usage: settings [subcommand] [options]

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
  settings reset       # Reset all settings`};if(r.length===0)return{output:fr(e,t),html:!0};const o=i.getPositional(0);switch(o){case"list":return ei(e,t);case"set":return Bn(i,e,t);case"reset":return ti(e,t);case"theme":case"font-size":case"font-family":case"fontSize":case"fontFamily":case"scan-lines":case"scanLines":case"glow":case"border":case"animation-speed":case"animationSpeed":case"sound":case"auto-scroll":case"autoScroll":case"prompt":case"screensaver-enabled":case"screensaverEnabled":case"screensaver-timeout":case"screensaverTimeout":case"screensaver-type":case"screensaverType":return Bn(new V(["set",o,...r.slice(1)]),e,t);default:return{output:`Unknown subcommand: ${o}.
Try 'settings --help' for more information`,error:!0}}}}}function ei(s,e){const t=ni(s,e);return{output:ae.render(t),html:!0}}function Bn(s,e,t){const r=s.getPositional(1),n=s.getPositional(2);if(!r)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};if(r!=="color"&&!n)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};try{switch(r){case"theme":{const i=["green","yellow","white","light-blue","paper","dc"];return i.includes(n)?(e.setSetting("theme",{preset:n}),t.applyTheme(n),oe(),{output:`Theme changed to: ${n}`}):{output:`Invalid theme: ${n}. Available: ${i.join(", ")}`,error:!0}}case"color":{const i=["terminal-bg","terminal-fg","terminal-accent","terminal-dim","terminal-error","terminal-cursor","terminal-bg-secondary"];let o,l;for(const p of i){const h=s.getFlag(p);if(h&&typeof h=="string"){o="--"+p,l=h;break}}if(!o||!l)return{output:`Usage: settings set color <variable> <value>
Example: settings set color --terminal-accent #ff0000`,error:!0};const a={[o]:l};return t.applyCustomColors(a),oe(),{output:`Color ${o} set to ${l}`}}case"font-size":case"fontSize":{if(!n)return{output:"Font size value required",error:!0};const i=parseInt(n,10);return isNaN(i)?{output:"Font size must be a number (8-24)",error:!0}:(e.setFontSize(i),Jt(e),oe(),{output:`Font size set to: ${i}px`})}case"font-family":case"fontFamily":{if(!n)return{output:"Font family value required",error:!0};const i=["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"];return i.includes(n)?(e.setFontFamily(n),Jt(e),oe(),{output:`Font family set to: ${n}`}):{output:`Invalid font family: ${n}. Available: ${i.join(", ")}`,error:!0}}case"scan-lines":case"scanLines":{if(!n)return{output:"Scan lines value required (on/off)",error:!0};if(n!=="on"&&n!=="off")return{output:'Scan lines must be "on" or "off"',error:!0};const i=n==="on";return e.setScanLines(i),$r(i),oe(),{output:`Scan lines: ${n}`}}case"glow":{if(!n)return{output:"Glow value required (on/off)",error:!0};if(n!=="on"&&n!=="off")return{output:'Glow must be "on" or "off"',error:!0};const i=n==="on";return e.setGlow(i),gr(i),oe(),{output:`Glow: ${n}`}}case"border":{if(!n)return{output:"Border value required (on/off)",error:!0};if(n!=="on"&&n!=="off")return{output:'Border must be "on" or "off"',error:!0};const i=n==="on";return e.setBorder(i),Tr(i),oe(),{output:`Border: ${n}`}}case"animation-speed":case"animationSpeed":{if(!n)return{output:"Animation speed value required",error:!0};const i=parseFloat(n);return isNaN(i)?{output:"Animation speed must be a number (0.5-2.0)",error:!0}:(e.setAnimationSpeed(i),Lr(i),oe(),{output:`Animation speed set to: ${i}x`})}case"sound-effects":case"sound":{if(!n)return{output:"Sound effects value required (on/off)",error:!0};if(n!=="on"&&n!=="off")return{output:'Sound effects must be "on" or "off"',error:!0};const i=n==="on";return e.setSoundEffects(i),oe(),{output:`Sound effects: ${n}`}}case"autoscroll":case"auto-scroll":case"autoScroll":{if(!n)return{output:"Autoscroll value required (on/off)",error:!0};if(n!=="on"&&n!=="off")return{output:'Autoscroll must be "on" or "off"',error:!0};const i=n==="on";return e.setAutoScrollBehavior(i),oe(),{output:`Autoscroll: ${n} - ${i?"Long content (>50 lines) scrolls to command line":"All content scrolls to bottom"}`}}case"prompt":return n?(e.setPromptFormat(n),oe(),{output:`Prompt format set to: ${n}`}):{output:"Prompt format value required",error:!0};case"screensaver-enabled":case"screensaverEnabled":{if(!n)return{output:"Screensaver enabled value required (on/off)",error:!0};if(n!=="on"&&n!=="off")return{output:'Screensaver enabled must be "on" or "off"',error:!0};const i=n==="on";return e.setScreensaverEnabled(i),oe(),{output:`Screensaver: ${n}`}}case"screensaver-timeout":case"screensaverTimeout":{if(!n)return{output:"Screensaver timeout value required (1-60 minutes)",error:!0};const i=parseInt(n,10);return isNaN(i)||i<1||i>60?{output:"Screensaver timeout must be between 1 and 60 minutes",error:!0}:(e.setScreensaverTimeout(i),oe(),{output:`Screensaver timeout set to: ${i} minutes`})}case"screensaver-type":case"screensaverType":{if(!n)return{output:"Screensaver type value required",error:!0};const i=["matrix"];return i.includes(n)?(e.setActiveScreensaver(n),oe(),{output:`Screensaver type set to: ${n}`}):{output:`Invalid screensaver type: ${n}. Available: ${i.join(", ")}`,error:!0}}default:return{output:`Unknown setting: ${r}. Available: theme, color, font-size, font-family, scan-lines, glow, border, animation-speed, sound-effects, autoscroll, prompt, screensaver-enabled, screensaver-timeout, screensaver-type`,error:!0}}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}function ti(s,e){return s.reset(),e.applyCurrentTheme(),Jt(s),$r(s.getScanLines()),gr(s.getGlow()),Tr(s.getBorder()),Lr(s.getAnimationSpeed()),oe(),{output:"Settings reset to defaults."}}function ni(s,e){const t=s.loadSettings(),r=e.getPresets();return`# Terminal Settings

## Current Configuration

### Theme
**${t.theme.preset==="custom"?"Custom":r.find(i=>i.name===t.theme.preset)?.displayName??t.theme.preset}**

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

${r.map(i=>`- **${i.name}**: ${i.displayName}`).join(`
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
`}function Jt(s){const e=s.getSetting("font");typeof document<"u"&&(document.documentElement.style.setProperty("--terminal-font-size",`${e.size}px`),document.documentElement.style.setProperty("--terminal-font-family",e.family))}function $r(s){typeof document<"u"&&(s?document.body.classList.remove("no-scan-lines"):document.body.classList.add("no-scan-lines"))}function gr(s){typeof document<"u"&&(s?document.body.classList.remove("no-glow"):document.body.classList.add("no-glow"))}function Tr(s){typeof document<"u"&&(s?document.body.classList.add("border-enabled"):document.body.classList.remove("border-enabled"))}function Lr(s){typeof document<"u"&&document.documentElement.style.setProperty("--terminal-animation-speed",s.toString())}function oe(){if(typeof document<"u"){const s=new CustomEvent("settings-changed");document.dispatchEvent(s)}}const ri=["Chaos","Discord","Confusion","Bureaucracy","The Aftermath"],si=["Sweetmorn","Boomtime","Pungenday","Prickle-Prickle","Setting Orange"],ii=["Mungday","Mojoday","Syadday","Zaraday","Malbowday"],Gn=73,oi=1166;function en(s){return s%4===0&&s%100!==0||s%400===0}function ai(s,e,t){const r=[31,28,31,30,31,30,31,31,30,31,30,31];en(s)&&(r[1]=29);let n=t;for(let i=0;i<e-1;i++)n+=r[i];return n}function li(s){const e=s.getFullYear(),t=s.getMonth()+1,r=s.getDate(),n=e+oi,i=ai(e,t,r);if(en(e)&&t===2&&r===29)return{weekday:"",season:"",dayOfSeason:0,yold:n,isStTibsDay:!0};let o=i;en(e)&&i>60&&(o=i-1);const l=Math.floor((o-1)/Gn),a=ri[l],p=(o-1)%Gn+1,h=(o-1)%5,A=si[h],E=p===5?ii[l]:void 0;return{weekday:A,season:a,dayOfSeason:p,yold:n,isStTibsDay:!1,apostleDay:E}}function _i(s){return s.isStTibsDay?`St. Tib's Day, ${s.yold} YOLD`:s.apostleDay?`${s.weekday}, ${s.apostleDay}, day ${s.dayOfSeason} of ${s.season}, ${s.yold} YOLD`:`${s.weekday}, ${s.season} ${s.dayOfSeason}, ${s.yold} YOLD`}function ci(s){if(/^\d{4}-\d{2}-\d{2}$/.test(s)){const e=new Date(s);if(!isNaN(e.getTime()))return e}if(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)){const e=new Date(s);if(!isNaN(e.getTime()))return e}return null}function ui(s,e,t){if(s<1||s>31||e<1||e>12||t<1)return null;const r=new Date(t,e-1,s);return isNaN(r.getTime())?null:r}const hi={name:"ddate",description:"Display date in Discordian calendar",execute:(s,e)=>{const t=new V(s);if(t.hasFlag("help"))return{output:`Usage: ddate [DATE]

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
  --help                   Display this help message`};let r;if(t.positionalCount===0)r=new Date;else if(t.positionalCount===1){const o=t.getPositional(0),l=ci(o);if(!l)return{output:`ddate: invalid date '${o}'`,error:!0};r=l}else if(t.positionalCount===3){const o=parseInt(t.getPositional(0),10),l=parseInt(t.getPositional(1),10),a=parseInt(t.getPositional(2),10);if(isNaN(l)||isNaN(o)||isNaN(a))return{output:"ddate: invalid numeric date arguments",error:!0};const p=ui(l,o,a);if(!p)return{output:`ddate: invalid date ${o}/${l}/${a}`,error:!0};r=p}else return{output:`ddate: invalid arguments
Try 'ddate --help' for more information.`,error:!0};const n=li(r);return{output:_i(n)}}},di={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3};class mi{constructor(){this.comment="",this.numChars=0,this.options={}}}const Bt=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Regular","ANSI Shadow","ANSI-Compact","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Four Tops","Fraktur","Fun Face","Fun Faces","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"];function pi(s){return/[.*+?^${}()|[\]\\]/.test(s)?"\\"+s:s}const nt=(()=>{const{FULL_WIDTH:s=0,FITTING:e,SMUSHING:t,CONTROLLED_SMUSHING:r}=di,n={},i={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function o(d,m,_){const u=pi(d.trim().slice(-1))||"@",f=m===_-1?new RegExp(u+u+"?\\s*$"):new RegExp(u+"\\s*$");return d.replace(f,"")}function l(d=-1,m=null){let _={},u,f=[[16384,"vLayout",t],[8192,"vLayout",e],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",t],[64,"hLayout",e],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];u=m!==null?m:d;for(const[g,T,L]of f)u>=g?(u-=g,_[T]===void 0&&(_[T]=L)):T!=="vLayout"&&T!=="hLayout"&&(_[T]=!1);return typeof _.hLayout>"u"?d===0?_.hLayout=e:d===-1?_.hLayout=s:_.hRule1||_.hRule2||_.hRule3||_.hRule4||_.hRule5||_.hRule6?_.hLayout=r:_.hLayout=t:_.hLayout===t&&(_.hRule1||_.hRule2||_.hRule3||_.hRule4||_.hRule5||_.hRule6)&&(_.hLayout=r),typeof _.vLayout>"u"?_.vRule1||_.vRule2||_.vRule3||_.vRule4||_.vRule5?_.vLayout=r:_.vLayout=s:_.vLayout===t&&(_.vRule1||_.vRule2||_.vRule3||_.vRule4||_.vRule5)&&(_.vLayout=r),_}function a(d,m,_=""){return d===m&&d!==_?d:!1}function p(d,m){let _="|/\\[]{}()<>";if(d==="_"){if(_.indexOf(m)!==-1)return m}else if(m==="_"&&_.indexOf(d)!==-1)return d;return!1}function h(d,m){let _="| /\\ [] {} () <>",u=_.indexOf(d),f=_.indexOf(m);if(u!==-1&&f!==-1&&u!==f&&Math.abs(u-f)!==1){const g=Math.max(u,f),T=g+1;return _.substring(g,T)}return!1}function A(d,m){let _="[] {} ()",u=_.indexOf(d),f=_.indexOf(m);return u!==-1&&f!==-1&&Math.abs(u-f)<=1?"|":!1}function E(d,m){return{"/\\":"|","\\/":"Y","><":"X"}[d+m]||!1}function C(d,m,_=""){return d===_&&m===_?_:!1}function P(d,m){return d===m?d:!1}function N(d,m){return p(d,m)}function S(d,m){return h(d,m)}function x(d,m){return d==="-"&&m==="_"||d==="_"&&m==="-"?"=":!1}function B(d,m){return d==="|"&&m==="|"?"|":!1}function U(d,m,_){return m===" "||m===""||m===_&&d!==" "?d:m}function H(d,m,_){if(_.fittingRules&&_.fittingRules.vLayout===s)return"invalid";let u,f=Math.min(d.length,m.length),g,T,L=!1,I;if(f===0)return"invalid";for(u=0;u<f;u++)if(g=d.substring(u,u+1),T=m.substring(u,u+1),g!==" "&&T!==" "){if(_.fittingRules&&_.fittingRules.vLayout===e)return"invalid";if(_.fittingRules&&_.fittingRules.vLayout===t)return"end";if(B(g,T)){L=L||!1;continue}if(I=!1,I=_.fittingRules&&_.fittingRules.vRule1?P(g,T):I,I=!I&&_.fittingRules&&_.fittingRules.vRule2?N(g,T):I,I=!I&&_.fittingRules&&_.fittingRules.vRule3?S(g,T):I,I=!I&&_.fittingRules&&_.fittingRules.vRule4?x(g,T):I,L=!0,!I)return"invalid"}return L?"end":"valid"}function M(d,m,_){let u=d.length,f=d.length,g,T,L,I=1,R,k,w;for(;I<=u;){for(g=d.slice(Math.max(0,f-I),f),T=m.slice(0,Math.min(u,I)),L=T.length,w="",R=0;R<L;R++)if(k=H(g[R],T[R],_),k==="end")w=k;else if(k==="invalid"){w=k;break}else w===""&&(w="valid");if(w==="invalid"){I--;break}if(w==="end")break;w==="valid"&&I++}return Math.min(u,I)}function z(d,m,_){let u,f=Math.min(d.length,m.length),g,T,L="",I;const R=_.fittingRules||{};for(u=0;u<f;u++)g=d.substring(u,u+1),T=m.substring(u,u+1),g!==" "&&T!==" "?R.vLayout===e||R.vLayout===t?L+=U(g,T):(I=!1,I=R.vRule5?B(g,T):I,I=!I&&R.vRule1?P(g,T):I,I=!I&&R.vRule2?N(g,T):I,I=!I&&R.vRule3?S(g,T):I,I=!I&&R.vRule4?x(g,T):I,L+=I):L+=U(g,T);return L}function ee(d,m,_,u){let f=d.length,g=m.length,T=d.slice(0,Math.max(0,f-_)),L=d.slice(Math.max(0,f-_),f),I=m.slice(0,Math.min(_,g)),R,k,w,v=[],O;for(k=L.length,R=0;R<k;R++)R>=g?w=L[R]:w=z(L[R],I[R],u),v.push(w);return O=m.slice(Math.min(_,g),g),[...T,...v,...O]}function Me(d,m){const _=" ".repeat(m);return d.map(u=>u+_)}function De(d,m,_){let u=d[0].length,f=m[0].length,g;return u>f?m=Me(m,u-f):f>u&&(d=Me(d,f-u)),g=M(d,m,_),ee(d,m,g,_)}function Se(d,m,_){const u=_.fittingRules||{};if(u.hLayout===s)return 0;let f,g=d.length,T=m.length,L=g,I=1,R=!1,k,w,v,O;if(g===0)return 0;e:for(;I<=L;){const re=g-I;for(k=d.substring(re,re+I),w=m.substring(0,Math.min(I,T)),f=0;f<Math.min(I,T);f++)if(v=k.substring(f,f+1),O=w.substring(f,f+1),v!==" "&&O!==" "){if(u.hLayout===e){I=I-1;break e}else if(u.hLayout===t){(v===_.hardBlank||O===_.hardBlank)&&(I=I-1);break e}else if(R=!0,!(u.hRule1&&a(v,O,_.hardBlank)||u.hRule2&&p(v,O)||u.hRule3&&h(v,O)||u.hRule4&&A(v,O)||u.hRule5&&E(v,O)||u.hRule6&&C(v,O,_.hardBlank))){I=I-1;break e}}if(R)break;I++}return Math.min(L,I)}function Y(d,m,_,u){let f,g,T=[],L,I,R,k,w,v,O,re;const q=u.fittingRules||{};if(typeof u.height!="number")throw new Error("height is not defined.");for(f=0;f<u.height;f++){O=d[f],re=m[f],w=O.length,v=re.length,L=w-_,I=O.slice(0,Math.max(0,L)),R="";const pe=Math.max(0,w-_);let te=O.substring(pe,pe+_),fe=re.substring(0,Math.min(_,v));for(g=0;g<_;g++){let se=g<w?te.substring(g,g+1):" ",Q=g<v?fe.substring(g,g+1):" ";if(se!==" "&&Q!==" ")if(q.hLayout===e||q.hLayout===t)R+=U(se,Q,u.hardBlank);else{const kt=q.hRule1&&a(se,Q,u.hardBlank)||q.hRule2&&p(se,Q)||q.hRule3&&h(se,Q)||q.hRule4&&A(se,Q)||q.hRule5&&E(se,Q)||q.hRule6&&C(se,Q,u.hardBlank)||U(se,Q,u.hardBlank);R+=kt}else R+=U(se,Q,u.hardBlank)}_>=v?k="":k=re.substring(_,_+Math.max(0,v-_)),T[f]=I+R+k}return T}function he(d){return new Array(d).fill("")}const de=function(d){return Math.max(...d.map(m=>m.length))};function me(d,m,_){return d.reduce(function(u,f){return Y(u,f.fig,f.overlap||0,_)},he(m))}function Nt(d,m,_){for(let u=d.length-1;u>0;u--){const f=me(d.slice(0,u),m,_);if(de(f)<=_.width)return{outputFigText:f,chars:d.slice(u)}}return{outputFigText:he(m),chars:d}}function xt(d,m,_){let u,f,g=0,T,L,I,R=_.height,k=[],w,v={chars:[],overlap:g},O=[],re,q,pe,te,fe;if(typeof R!="number")throw new Error("height is not defined.");L=he(R);const se=_.fittingRules||{};for(_.printDirection===1&&(d=d.split("").reverse().join("")),I=d.length,u=0;u<I;u++)if(re=d.substring(u,u+1),q=re.match(/\s/),f=m[re.charCodeAt(0)],te=null,f){if(se.hLayout!==s){for(g=1e4,T=0;T<R;T++)g=Math.min(g,Se(L[T],f[T],_));g=g===1e4?0:g}if(_.width>0&&(_.whitespaceBreak?(pe=me(v.chars.concat([{fig:f,overlap:g}]),R,_),te=me(O.concat([{fig:pe,overlap:v.overlap}]),R,_),w=de(te)):(te=Y(L,f,g,_),w=de(te)),w>=_.width&&u>0&&(_.whitespaceBreak?(L=me(O.slice(0,-1),R,_),O.length>1&&(k.push(L),L=he(R)),O=[]):(k.push(L),L=he(R)))),_.width>0&&_.whitespaceBreak&&((!q||u===I-1)&&v.chars.push({fig:f,overlap:g}),q||u===I-1)){for(fe=null;te=me(v.chars,R,_),w=de(te),w>=_.width;)fe=Nt(v.chars,R,_),v={chars:fe.chars},k.push(fe.outputFigText);w>0&&(fe?O.push({fig:te,overlap:1}):O.push({fig:te,overlap:v.overlap})),q&&(O.push({fig:f,overlap:g}),L=he(R)),u===I-1&&(L=me(O,R,_)),v={chars:[],overlap:g};continue}L=Y(L,f,g,_)}return de(L)>0&&k.push(L),_.showHardBlanks||k.forEach(function(Q){for(I=Q.length,T=0;T<I;T++)Q[T]=Q[T].replace(new RegExp("\\"+_.hardBlank,"g")," ")}),d===""&&k.length===0&&k.push(new Array(R).fill("")),k}const vt=function(d,m){let _;const u=m.fittingRules||{};if(d==="default")_={hLayout:u.hLayout,hRule1:u.hRule1,hRule2:u.hRule2,hRule3:u.hRule3,hRule4:u.hRule4,hRule5:u.hRule5,hRule6:u.hRule6};else if(d==="full")_={hLayout:s,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(d==="fitted")_={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(d==="controlled smushing")_={hLayout:r,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(d==="universal smushing")_={hLayout:t,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return _},it=function(d,m){let _={};const u=m.fittingRules||{};if(d==="default")_={vLayout:u.vLayout,vRule1:u.vRule1,vRule2:u.vRule2,vRule3:u.vRule3,vRule4:u.vRule4,vRule5:u.vRule5};else if(d==="full")_={vLayout:s,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(d==="fitted")_={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(d==="controlled smushing")_={vLayout:r,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(d==="universal smushing")_={vLayout:t,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return _},ot=function(d,m,_){_=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let u=_.split(`
`),f=[],g,T,L;for(T=u.length,g=0;g<T;g++)f=f.concat(xt(u[g],n[d],m));for(T=f.length,L=f[0],g=1;g<T;g++)L=De(L,f[g],m);return L?L.join(`
`):""};function Be(d,m){let _;if(typeof structuredClone<"u"?_=structuredClone(d):_=JSON.parse(JSON.stringify(d)),_.showHardBlanks=m.showHardBlanks||!1,_.width=m.width||-1,_.whitespaceBreak=m.whitespaceBreak||!1,m.horizontalLayout){const u=vt(m.horizontalLayout,d);u&&Object.assign(_.fittingRules,u)}if(m.verticalLayout){const u=it(m.verticalLayout,d);u&&Object.assign(_.fittingRules,u)}return _.printDirection=m.printDirection!==null&&m.printDirection!==void 0?m.printDirection:d.printDirection,_}const D=async function(d,m,_){return D.text(d,m,_)};return D.text=async function(d,m,_){d=d+"";let u,f;typeof m=="function"?(f=m,u={font:i.font}):typeof m=="string"?(u={font:m},f=_):m?(u=m,f=_):(u={font:i.font},f=_);const g=u.font||i.font;try{const T=await D.loadFont(g),L=T?ot(g,Be(T,u),d):"";return f&&f(null,L),L}catch(T){const L=T instanceof Error?T:new Error(String(T));if(f)return f(L),"";throw L}},D.textSync=function(d,m){d=d+"",typeof m=="string"?m={font:m}:m=m||{};const _=m.font||i.font;let u=Be(D.loadFontSync(_),m);return ot(_,u,d)},D.metadata=async function(d,m){d=d+"";try{const _=await D.loadFont(d);if(!_)throw new Error("Error loading font.");const u=n[d]||{},f=[_,u.comment||""];return m&&m(null,_,u.comment),f}catch(_){const u=_ instanceof Error?_:new Error(String(_));if(m)return m(u),null;throw u}},D.defaults=function(d){return d&&typeof d=="object"&&Object.assign(i,d),typeof structuredClone<"u"?structuredClone(i):JSON.parse(JSON.stringify(i))},D.parseFont=function(d,m,_=!0){if(n[d]&&!_)return n[d].options;m=m.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const u=new mi,f=m.split(`
`),g=f.shift();if(!g)throw new Error("Invalid font file: missing header");const T=g.split(" "),L={hardBlank:T[0].substring(5,6),height:parseInt(T[1],10),baseline:parseInt(T[2],10),maxLength:parseInt(T[3],10),oldLayout:parseInt(T[4],10),numCommentLines:parseInt(T[5],10),printDirection:T[6]?parseInt(T[6],10):0,fullLayout:T[7]?parseInt(T[7],10):null,codeTagCount:T[8]?parseInt(T[8],10):null};if((L.hardBlank||"").length!==1||[L.height,L.baseline,L.maxLength,L.oldLayout,L.numCommentLines].some(k=>k==null||isNaN(k)))throw new Error("FIGlet header contains invalid values.");if(L.height==null||L.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");L.fittingRules=l(L.oldLayout,L.fullLayout),u.options=L;const R=[];for(let k=32;k<=126;k++)R.push(k);if(R.push(196,214,220,228,246,252,223),f.length<L.numCommentLines+L.height*R.length)throw new Error(`FIGlet file is missing data. Line length: ${f.length}. Comment lines: ${L.numCommentLines}. Height: ${L.height}. Num chars: ${R.length}.`);for(u.comment=f.splice(0,L.numCommentLines).join(`
`),u.numChars=0;f.length>0&&u.numChars<R.length;){const k=R[u.numChars];u[k]=f.splice(0,L.height);for(let w=0;w<L.height;w++)typeof u[k][w]>"u"?u[k][w]="":u[k][w]=o(u[k][w],w,L.height);u.numChars++}for(;f.length>0;){const k=f.shift();if(!k||k.trim()==="")break;let w=k.split(" ")[0],v;if(/^-?0[xX][0-9a-fA-F]+$/.test(w))v=parseInt(w,16);else if(/^-?0[0-7]+$/.test(w))v=parseInt(w,8);else if(/^-?[0-9]+$/.test(w))v=parseInt(w,10);else throw new Error(`Error parsing data. Invalid data: ${w}`);if(v===-1||v<-2147483648||v>2147483647){const O=v===-1?"The char code -1 is not permitted.":`The char code cannot be ${v<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${O}`)}u[v]=f.splice(0,L.height);for(let O=0;O<L.height;O++)typeof u[v][O]>"u"?u[v][O]="":u[v][O]=o(u[v][O],O,L.height);u.numChars++}return n[d]=u,L},D.loadedFonts=()=>Object.keys(n),D.clearLoadedFonts=()=>{Object.keys(n).forEach(d=>{delete n[d]})},D.loadFont=async function(d,m){if(n[d]){const _=n[d].options;return m&&m(null,_),Promise.resolve(_)}try{if(!i.fetchFontIfMissing)throw new Error(`Font is not loaded: ${d}`);const _=await fetch(`${i.fontPath}/${d}.flf`);if(!_.ok)throw new Error(`Network response was not ok: ${_.status}`);const u=await _.text(),f=D.parseFont(d,u);return m&&m(null,f),f}catch(_){const u=_ instanceof Error?_:new Error(String(_));if(m)return m(u),null;throw u}},D.loadFontSync=function(d){if(n[d])return n[d].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},D.preloadFonts=async function(d,m){try{for(const _ of d){const u=await fetch(`${i.fontPath}/${_}.flf`);if(!u.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${_}, status code: ${u.statusText}`);const f=await u.text();D.parseFont(_,f)}m&&m()}catch(_){const u=_ instanceof Error?_:new Error(String(_));if(m){m(u);return}throw _}},D.fonts=function(d){return new Promise(function(m,_){m(Bt),d&&d(null,Bt)})},D.fontsSync=function(){return Bt},D.figFonts=n,D})(),fi=`flf2a$ 8 7 54 0 12 0 64 185
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
`,$i=`flf2a$ 6 5 16 15 10 0 18319
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
`,gi=`flf2a$ 5 4 13 15 10 0 22415
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
`,Ti=`flf2a$ 6 5 16 15 13 0 24463 229
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
         `;nt.parseFont("Standard",Ti);nt.parseFont("Slant",$i);nt.parseFont("Banner",fi);nt.parseFont("Small",gi);const Li={name:"figlet",description:"Convert text to ASCII art",execute:(s,e)=>{const t=new V(s);if(t.hasFlag("help"))return{output:`Usage: figlet [options] <text>

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
  small      - Compact font`};let r;if(e)r=e.trim();else if(t.positionalCount>0)r=t.getAllPositionals().join(" ");else return{output:`figlet: missing text argument
Try 'figlet --help' for more information.`,error:!0};const n=t.getFlag("f"),i=typeof n=="string"?n:"Standard",o=i.charAt(0).toUpperCase()+i.slice(1).toLowerCase();let l="default";t.hasFlag("c")?l="full":t.hasFlag("r")&&(l="fitted");try{return{output:nt.textSync(r,{font:o,horizontalLayout:l})}}catch(a){return a instanceof Error?a.message.includes("font")||a.message.includes("Font")||a.message.includes("FIGlet")?{output:`figlet: font '${o}' not found or invalid
Available fonts: standard, slant, banner, small`,error:!0}:{output:`figlet: ${a.message}`,error:!0}:{output:"figlet: unknown error occurred",error:!0}}}},tn="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";function Ei(){const s=document.getElementById("terminal-output");if(!s)return{cols:80,rows:24};const e=s.getBoundingClientRect(),t=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--terminal-font-size")||"16"),r=t*.6,n=t*1.5,i=Math.floor(e.width/r),o=Math.floor(e.height/n);return{cols:Math.max(i,20),rows:Math.max(o,10)}}function Ai(){return tn[Math.floor(Math.random()*tn.length)]}function Ii(s){return{name:"matrix",description:"Display Matrix digital rain animation",execute:(e,t)=>{const r=new V(e);if(r.hasFlag("help"))return{output:`Usage: matrix [options]

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

Note: Animation continues until you scroll, type, or run 'clear'`};let n=1;const i=r.getFlag("speed");if(i!==void 0){const M=parseFloat(String(i));if(isNaN(M)||M<.1||M>5)return{output:`matrix: invalid speed value '${i}'
Speed must be between 0.1 and 5.0`,error:!0};n=M}const o=r.getFlag("theme");let l=s.getCurrentColors();if(o!==void 0){const M=String(o),z=["green","yellow","white","light-blue","paper","dc","custom"];if(!z.includes(M))return{output:`matrix: invalid theme '${M}'
Valid themes: ${z.join(", ")}`,error:!0};if(M!=="custom"){const ee=s.getPreset(M);ee&&(l=ee.colors)}}const{cols:a,rows:p}=Ei(),h=1.2,A=Math.floor(a/h)+5,E=Math.min(p,20),C=l["--terminal-accent"],P=l["--terminal-dim"],N=l["--terminal-bg"],S=p*1.5,x=-E*1.5,B=S,U=[];for(let M=0;M<A;M++){const z=-Math.random()*5,ee=(5+Math.random()*5)/n,Me=M*h,De=[];for(let Se=0;Se<E;Se++){const Y=Se/E,he=Math.pow(Y,2),de=Se===E-1,me=Ai();De.push(`<span class="matrix-char${de?" matrix-char-bright":""}" data-char-index="${Se}" style="color: ${de?C:P}; opacity: ${he};">${me}</span>`)}U.push(`
  <div class="matrix-column" data-column-index="${M}" data-trail-length="${E}" style="
    left: ${Me}em;
    animation: matrix-fall ${ee}s linear ${z}s infinite;
    --matrix-start: ${x}em;
    --matrix-end: ${B}em;
  ">${De.join("")}</div>`)}return{output:`
<div class="matrix-rain" data-matrix-chars="${tn}" style="height: ${S}em; background-color: ${N};">
${U.join("")}
</div>
`,html:!0}}}}class Vn{static generateHeader(){return`
 ██████╗  █████╗ ██████╗ ██╗███╗   ██╗     ██████╗██╗  ██╗ █████╗ ███╗   ███╗██████╗ ███████╗██████╗ ███████╗
 ██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║    ██╔════╝██║  ██║██╔══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔════╝
 ██║  ██║███████║██████╔╝██║██╔██╗ ██║    ██║     ███████║███████║██╔████╔██║██████╔╝█████╗  ██████╔╝███████╗
 ██║  ██║██╔══██║██╔══██╗██║██║╚██╗██║    ██║     ██╔══██║██╔══██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗╚════██║
 ██████╔╝██║  ██║██║  ██║██║██║ ╚████║    ╚██████╗██║  ██║██║  ██║██║ ╚═╝ ██║██████╔╝███████╗██║  ██║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
`}static getTagline(){return"Technologist, Inventor | Building What's Next on Rock-Solid Foundations"}}const{entries:Er,setPrototypeOf:zn,isFrozen:yi,getPrototypeOf:Si,getOwnPropertyDescriptor:bi}=Object;let{freeze:_e,seal:$e,create:nn}=Object,{apply:rn,construct:sn}=typeof Reflect<"u"&&Reflect;_e||(_e=function(e){return e});$e||($e=function(e){return e});rn||(rn=function(e,t){for(var r=arguments.length,n=new Array(r>2?r-2:0),i=2;i<r;i++)n[i-2]=arguments[i];return e.apply(t,n)});sn||(sn=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return new e(...r)});const mt=ce(Array.prototype.forEach),Ri=ce(Array.prototype.lastIndexOf),jn=ce(Array.prototype.pop),Ye=ce(Array.prototype.push),Ci=ce(Array.prototype.splice),ft=ce(String.prototype.toLowerCase),Gt=ce(String.prototype.toString),Vt=ce(String.prototype.match),Xe=ce(String.prototype.replace),wi=ce(String.prototype.indexOf),Ni=ce(String.prototype.trim),Le=ce(Object.prototype.hasOwnProperty),ie=ce(RegExp.prototype.test),qe=xi(TypeError);function ce(s){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return rn(s,e,r)}}function xi(s){return function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return sn(s,t)}}function F(s,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ft;zn&&zn(s,null);let r=e.length;for(;r--;){let n=e[r];if(typeof n=="string"){const i=t(n);i!==n&&(yi(e)||(e[r]=i),n=i)}s[n]=!0}return s}function vi(s){for(let e=0;e<s.length;e++)Le(s,e)||(s[e]=null);return s}function Ne(s){const e=nn(null);for(const[t,r]of Er(s))Le(s,t)&&(Array.isArray(r)?e[t]=vi(r):r&&typeof r=="object"&&r.constructor===Object?e[t]=Ne(r):e[t]=r);return e}function Ke(s,e){for(;s!==null;){const r=bi(s,e);if(r){if(r.get)return ce(r.get);if(typeof r.value=="function")return ce(r.value)}s=Si(s)}function t(){return null}return t}const Yn=_e(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),zt=_e(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),jt=_e(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ki=_e(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Yt=_e(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Oi=_e(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Xn=_e(["#text"]),qn=_e(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Xt=_e(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Kn=_e(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),pt=_e(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Mi=$e(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Di=$e(/<%[\w\W]*|[\w\W]*%>/gm),Pi=$e(/\$\{[\w\W]*/gm),Hi=$e(/^data-[\-\w.\u00B7-\uFFFF]+$/),Fi=$e(/^aria-[\-\w]+$/),Ar=$e(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Wi=$e(/^(?:\w+script|data):/i),Ui=$e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ir=$e(/^html$/i),Bi=$e(/^[a-z][.\w]*(-[.\w]+)+$/i);var Zn=Object.freeze({__proto__:null,ARIA_ATTR:Fi,ATTR_WHITESPACE:Ui,CUSTOM_ELEMENT:Bi,DATA_ATTR:Hi,DOCTYPE_NAME:Ir,ERB_EXPR:Di,IS_ALLOWED_URI:Ar,IS_SCRIPT_OR_DATA:Wi,MUSTACHE_EXPR:Mi,TMPLIT_EXPR:Pi});const Ze={element:1,text:3,progressingInstruction:7,comment:8,document:9},Gi=function(){return typeof window>"u"?null:window},Vi=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let r=null;const n="data-tt-policy-suffix";t&&t.hasAttribute(n)&&(r=t.getAttribute(n));const i="dompurify"+(r?"#"+r:"");try{return e.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Qn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function yr(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Gi();const e=b=>yr(b);if(e.version="3.3.0",e.removed=[],!s||!s.document||s.document.nodeType!==Ze.document||!s.Element)return e.isSupported=!1,e;let{document:t}=s;const r=t,n=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:l,Element:a,NodeFilter:p,NamedNodeMap:h=s.NamedNodeMap||s.MozNamedAttrMap,HTMLFormElement:A,DOMParser:E,trustedTypes:C}=s,P=a.prototype,N=Ke(P,"cloneNode"),S=Ke(P,"remove"),x=Ke(P,"nextSibling"),B=Ke(P,"childNodes"),U=Ke(P,"parentNode");if(typeof o=="function"){const b=t.createElement("template");b.content&&b.content.ownerDocument&&(t=b.content.ownerDocument)}let H,M="";const{implementation:z,createNodeIterator:ee,createDocumentFragment:Me,getElementsByTagName:De}=t,{importNode:Se}=r;let Y=Qn();e.isSupported=typeof Er=="function"&&typeof U=="function"&&z&&z.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:he,ERB_EXPR:de,TMPLIT_EXPR:me,DATA_ATTR:Nt,ARIA_ATTR:xt,IS_SCRIPT_OR_DATA:vt,ATTR_WHITESPACE:it,CUSTOM_ELEMENT:ot}=Zn;let{IS_ALLOWED_URI:Be}=Zn,D=null;const d=F({},[...Yn,...zt,...jt,...Yt,...Xn]);let m=null;const _=F({},[...qn,...Xt,...Kn,...pt]);let u=Object.seal(nn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),f=null,g=null;const T=Object.seal(nn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let L=!0,I=!0,R=!1,k=!0,w=!1,v=!0,O=!1,re=!1,q=!1,pe=!1,te=!1,fe=!1,se=!0,Q=!1;const kt="user-content-";let Ot=!0,Ge=!1,Pe={},He=null;const $n=F({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let gn=null;const Tn=F({},["audio","video","img","source","image","track"]);let Mt=null;const Ln=F({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),at="http://www.w3.org/1998/Math/MathML",lt="http://www.w3.org/2000/svg",be="http://www.w3.org/1999/xhtml";let Fe=be,Dt=!1,Pt=null;const Cr=F({},[at,lt,be],Gt);let _t=F({},["mi","mo","mn","ms","mtext"]),ct=F({},["annotation-xml"]);const wr=F({},["title","style","font","a","script"]);let Ve=null;const Nr=["application/xhtml+xml","text/html"],xr="text/html";let K=null,We=null;const vr=t.createElement("form"),En=function(c){return c instanceof RegExp||c instanceof Function},Ht=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(We&&We===c)){if((!c||typeof c!="object")&&(c={}),c=Ne(c),Ve=Nr.indexOf(c.PARSER_MEDIA_TYPE)===-1?xr:c.PARSER_MEDIA_TYPE,K=Ve==="application/xhtml+xml"?Gt:ft,D=Le(c,"ALLOWED_TAGS")?F({},c.ALLOWED_TAGS,K):d,m=Le(c,"ALLOWED_ATTR")?F({},c.ALLOWED_ATTR,K):_,Pt=Le(c,"ALLOWED_NAMESPACES")?F({},c.ALLOWED_NAMESPACES,Gt):Cr,Mt=Le(c,"ADD_URI_SAFE_ATTR")?F(Ne(Ln),c.ADD_URI_SAFE_ATTR,K):Ln,gn=Le(c,"ADD_DATA_URI_TAGS")?F(Ne(Tn),c.ADD_DATA_URI_TAGS,K):Tn,He=Le(c,"FORBID_CONTENTS")?F({},c.FORBID_CONTENTS,K):$n,f=Le(c,"FORBID_TAGS")?F({},c.FORBID_TAGS,K):Ne({}),g=Le(c,"FORBID_ATTR")?F({},c.FORBID_ATTR,K):Ne({}),Pe=Le(c,"USE_PROFILES")?c.USE_PROFILES:!1,L=c.ALLOW_ARIA_ATTR!==!1,I=c.ALLOW_DATA_ATTR!==!1,R=c.ALLOW_UNKNOWN_PROTOCOLS||!1,k=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,w=c.SAFE_FOR_TEMPLATES||!1,v=c.SAFE_FOR_XML!==!1,O=c.WHOLE_DOCUMENT||!1,pe=c.RETURN_DOM||!1,te=c.RETURN_DOM_FRAGMENT||!1,fe=c.RETURN_TRUSTED_TYPE||!1,q=c.FORCE_BODY||!1,se=c.SANITIZE_DOM!==!1,Q=c.SANITIZE_NAMED_PROPS||!1,Ot=c.KEEP_CONTENT!==!1,Ge=c.IN_PLACE||!1,Be=c.ALLOWED_URI_REGEXP||Ar,Fe=c.NAMESPACE||be,_t=c.MATHML_TEXT_INTEGRATION_POINTS||_t,ct=c.HTML_INTEGRATION_POINTS||ct,u=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&En(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(u.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&En(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(u.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(u.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),w&&(I=!1),te&&(pe=!0),Pe&&(D=F({},Xn),m=[],Pe.html===!0&&(F(D,Yn),F(m,qn)),Pe.svg===!0&&(F(D,zt),F(m,Xt),F(m,pt)),Pe.svgFilters===!0&&(F(D,jt),F(m,Xt),F(m,pt)),Pe.mathMl===!0&&(F(D,Yt),F(m,Kn),F(m,pt))),c.ADD_TAGS&&(typeof c.ADD_TAGS=="function"?T.tagCheck=c.ADD_TAGS:(D===d&&(D=Ne(D)),F(D,c.ADD_TAGS,K))),c.ADD_ATTR&&(typeof c.ADD_ATTR=="function"?T.attributeCheck=c.ADD_ATTR:(m===_&&(m=Ne(m)),F(m,c.ADD_ATTR,K))),c.ADD_URI_SAFE_ATTR&&F(Mt,c.ADD_URI_SAFE_ATTR,K),c.FORBID_CONTENTS&&(He===$n&&(He=Ne(He)),F(He,c.FORBID_CONTENTS,K)),Ot&&(D["#text"]=!0),O&&F(D,["html","head","body"]),D.table&&(F(D,["tbody"]),delete f.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw qe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw qe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');H=c.TRUSTED_TYPES_POLICY,M=H.createHTML("")}else H===void 0&&(H=Vi(C,n)),H!==null&&typeof M=="string"&&(M=H.createHTML(""));_e&&_e(c),We=c}},An=F({},[...zt,...jt,...ki]),In=F({},[...Yt,...Oi]),kr=function(c){let $=U(c);(!$||!$.tagName)&&($={namespaceURI:Fe,tagName:"template"});const y=ft(c.tagName),j=ft($.tagName);return Pt[c.namespaceURI]?c.namespaceURI===lt?$.namespaceURI===be?y==="svg":$.namespaceURI===at?y==="svg"&&(j==="annotation-xml"||_t[j]):!!An[y]:c.namespaceURI===at?$.namespaceURI===be?y==="math":$.namespaceURI===lt?y==="math"&&ct[j]:!!In[y]:c.namespaceURI===be?$.namespaceURI===lt&&!ct[j]||$.namespaceURI===at&&!_t[j]?!1:!In[y]&&(wr[y]||!An[y]):!!(Ve==="application/xhtml+xml"&&Pt[c.namespaceURI]):!1},Ie=function(c){Ye(e.removed,{element:c});try{U(c).removeChild(c)}catch{S(c)}},ve=function(c,$){try{Ye(e.removed,{attribute:$.getAttributeNode(c),from:$})}catch{Ye(e.removed,{attribute:null,from:$})}if($.removeAttribute(c),c==="is")if(pe||te)try{Ie($)}catch{}else try{$.setAttribute(c,"")}catch{}},yn=function(c){let $=null,y=null;if(q)c="<remove></remove>"+c;else{const X=Vt(c,/^[\r\n\t ]+/);y=X&&X[0]}Ve==="application/xhtml+xml"&&Fe===be&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const j=H?H.createHTML(c):c;if(Fe===be)try{$=new E().parseFromString(j,Ve)}catch{}if(!$||!$.documentElement){$=z.createDocument(Fe,"template",null);try{$.documentElement.innerHTML=Dt?M:j}catch{}}const ne=$.body||$.documentElement;return c&&y&&ne.insertBefore(t.createTextNode(y),ne.childNodes[0]||null),Fe===be?De.call($,O?"html":"body")[0]:O?$.documentElement:ne},Sn=function(c){return ee.call(c.ownerDocument||c,c,p.SHOW_ELEMENT|p.SHOW_COMMENT|p.SHOW_TEXT|p.SHOW_PROCESSING_INSTRUCTION|p.SHOW_CDATA_SECTION,null)},Ft=function(c){return c instanceof A&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof h)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},bn=function(c){return typeof l=="function"&&c instanceof l};function Re(b,c,$){mt(b,y=>{y.call(e,c,$,We)})}const Rn=function(c){let $=null;if(Re(Y.beforeSanitizeElements,c,null),Ft(c))return Ie(c),!0;const y=K(c.nodeName);if(Re(Y.uponSanitizeElement,c,{tagName:y,allowedTags:D}),v&&c.hasChildNodes()&&!bn(c.firstElementChild)&&ie(/<[/\w!]/g,c.innerHTML)&&ie(/<[/\w!]/g,c.textContent)||c.nodeType===Ze.progressingInstruction||v&&c.nodeType===Ze.comment&&ie(/<[/\w]/g,c.data))return Ie(c),!0;if(!(T.tagCheck instanceof Function&&T.tagCheck(y))&&(!D[y]||f[y])){if(!f[y]&&wn(y)&&(u.tagNameCheck instanceof RegExp&&ie(u.tagNameCheck,y)||u.tagNameCheck instanceof Function&&u.tagNameCheck(y)))return!1;if(Ot&&!He[y]){const j=U(c)||c.parentNode,ne=B(c)||c.childNodes;if(ne&&j){const X=ne.length;for(let ue=X-1;ue>=0;--ue){const Ce=N(ne[ue],!0);Ce.__removalCount=(c.__removalCount||0)+1,j.insertBefore(Ce,x(c))}}}return Ie(c),!0}return c instanceof a&&!kr(c)||(y==="noscript"||y==="noembed"||y==="noframes")&&ie(/<\/no(script|embed|frames)/i,c.innerHTML)?(Ie(c),!0):(w&&c.nodeType===Ze.text&&($=c.textContent,mt([he,de,me],j=>{$=Xe($,j," ")}),c.textContent!==$&&(Ye(e.removed,{element:c.cloneNode()}),c.textContent=$)),Re(Y.afterSanitizeElements,c,null),!1)},Cn=function(c,$,y){if(se&&($==="id"||$==="name")&&(y in t||y in vr))return!1;if(!(I&&!g[$]&&ie(Nt,$))){if(!(L&&ie(xt,$))){if(!(T.attributeCheck instanceof Function&&T.attributeCheck($,c))){if(!m[$]||g[$]){if(!(wn(c)&&(u.tagNameCheck instanceof RegExp&&ie(u.tagNameCheck,c)||u.tagNameCheck instanceof Function&&u.tagNameCheck(c))&&(u.attributeNameCheck instanceof RegExp&&ie(u.attributeNameCheck,$)||u.attributeNameCheck instanceof Function&&u.attributeNameCheck($,c))||$==="is"&&u.allowCustomizedBuiltInElements&&(u.tagNameCheck instanceof RegExp&&ie(u.tagNameCheck,y)||u.tagNameCheck instanceof Function&&u.tagNameCheck(y))))return!1}else if(!Mt[$]){if(!ie(Be,Xe(y,it,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&c!=="script"&&wi(y,"data:")===0&&gn[c])){if(!(R&&!ie(vt,Xe(y,it,"")))){if(y)return!1}}}}}}}return!0},wn=function(c){return c!=="annotation-xml"&&Vt(c,ot)},Nn=function(c){Re(Y.beforeSanitizeAttributes,c,null);const{attributes:$}=c;if(!$||Ft(c))return;const y={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:m,forceKeepAttr:void 0};let j=$.length;for(;j--;){const ne=$[j],{name:X,namespaceURI:ue,value:Ce}=ne,Ue=K(X),Wt=Ce;let J=X==="value"?Wt:Ni(Wt);if(y.attrName=Ue,y.attrValue=J,y.keepAttr=!0,y.forceKeepAttr=void 0,Re(Y.uponSanitizeAttribute,c,y),J=y.attrValue,Q&&(Ue==="id"||Ue==="name")&&(ve(X,c),J=kt+J),v&&ie(/((--!?|])>)|<\/(style|title|textarea)/i,J)){ve(X,c);continue}if(Ue==="attributename"&&Vt(J,"href")){ve(X,c);continue}if(y.forceKeepAttr)continue;if(!y.keepAttr){ve(X,c);continue}if(!k&&ie(/\/>/i,J)){ve(X,c);continue}w&&mt([he,de,me],vn=>{J=Xe(J,vn," ")});const xn=K(c.nodeName);if(!Cn(xn,Ue,J)){ve(X,c);continue}if(H&&typeof C=="object"&&typeof C.getAttributeType=="function"&&!ue)switch(C.getAttributeType(xn,Ue)){case"TrustedHTML":{J=H.createHTML(J);break}case"TrustedScriptURL":{J=H.createScriptURL(J);break}}if(J!==Wt)try{ue?c.setAttributeNS(ue,X,J):c.setAttribute(X,J),Ft(c)?Ie(c):jn(e.removed)}catch{ve(X,c)}}Re(Y.afterSanitizeAttributes,c,null)},Or=function b(c){let $=null;const y=Sn(c);for(Re(Y.beforeSanitizeShadowDOM,c,null);$=y.nextNode();)Re(Y.uponSanitizeShadowNode,$,null),Rn($),Nn($),$.content instanceof i&&b($.content);Re(Y.afterSanitizeShadowDOM,c,null)};return e.sanitize=function(b){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,y=null,j=null,ne=null;if(Dt=!b,Dt&&(b="<!-->"),typeof b!="string"&&!bn(b))if(typeof b.toString=="function"){if(b=b.toString(),typeof b!="string")throw qe("dirty is not a string, aborting")}else throw qe("toString is not a function");if(!e.isSupported)return b;if(re||Ht(c),e.removed=[],typeof b=="string"&&(Ge=!1),Ge){if(b.nodeName){const Ce=K(b.nodeName);if(!D[Ce]||f[Ce])throw qe("root node is forbidden and cannot be sanitized in-place")}}else if(b instanceof l)$=yn("<!---->"),y=$.ownerDocument.importNode(b,!0),y.nodeType===Ze.element&&y.nodeName==="BODY"||y.nodeName==="HTML"?$=y:$.appendChild(y);else{if(!pe&&!w&&!O&&b.indexOf("<")===-1)return H&&fe?H.createHTML(b):b;if($=yn(b),!$)return pe?null:fe?M:""}$&&q&&Ie($.firstChild);const X=Sn(Ge?b:$);for(;j=X.nextNode();)Rn(j),Nn(j),j.content instanceof i&&Or(j.content);if(Ge)return b;if(pe){if(te)for(ne=Me.call($.ownerDocument);$.firstChild;)ne.appendChild($.firstChild);else ne=$;return(m.shadowroot||m.shadowrootmode)&&(ne=Se.call(r,ne,!0)),ne}let ue=O?$.outerHTML:$.innerHTML;return O&&D["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&ie(Ir,$.ownerDocument.doctype.name)&&(ue="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+ue),w&&mt([he,de,me],Ce=>{ue=Xe(ue,Ce," ")}),H&&fe?H.createHTML(ue):ue},e.setConfig=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ht(b),re=!0},e.clearConfig=function(){We=null,re=!1},e.isValidAttribute=function(b,c,$){We||Ht({});const y=K(b),j=K(c);return Cn(y,j,$)},e.addHook=function(b,c){typeof c=="function"&&Ye(Y[b],c)},e.removeHook=function(b,c){if(c!==void 0){const $=Ri(Y[b],c);return $===-1?void 0:Ci(Y[b],$,1)[0]}return jn(Y[b])},e.removeHooks=function(b){Y[b]=[]},e.removeAllHooks=function(){Y=Qn()},e}var zi=yr();function pn(s){return zi.sanitize(s,{ALLOWED_TAGS:["p","div","span","br","strong","b","em","i","u","s","a","code","pre","h1","h2","h3","h4","h5","h6","ul","ol","li","blockquote","table","thead","tbody","tr","th","td","img","button","input","select","option","label","aside","section","details","summary"],ALLOWED_ATTR:["class","id","href","target","rel","src","alt","title","width","height","type","value","checked","selected","disabled","min","max","step","placeholder","data-command","data-command-template","data-setting-type","data-color-var","data-theme","data-settings-panel","data-graph","data-graph-src","data-graph-theme","data-graph-initialized","data-graph-error","style","open","role","aria-label","aria-labelledby","aria-describedby","aria-valuemin","aria-valuemax","aria-valuenow","aria-valuetext","aria-live","aria-atomic","aria-current"],RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1})}class ji{headerElement;constructor(e){this.headerElement=e,this.render(),this.setupClickHandler()}render(){const e=Vn.generateHeader(),t=Vn.getTagline();this.headerElement.innerHTML=pn(`
      <div class="header-prompt">$ whoami | figlet | lolcat</div>
      <div class="header-ascii">
        <pre class="header-ascii-text header-clickable">${e}</pre>
      </div>
      <p class="header-tagline">${t}</p>
    `)}setupClickHandler(){this.headerElement.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("header-clickable")||t.closest(".header-clickable")){const r=new CustomEvent("terminal-command",{detail:"clear",bubbles:!0});document.dispatchEvent(r)}})}}class Yi{navLinksElement;onCommandClick;activeCommand=null;constructor(e,t){this.navLinksElement=e,this.onCommandClick=t}setItems(e){this.navLinksElement.innerHTML="",e.forEach(t=>{const r=document.createElement("button");r.className="nav-link",r.type="button",r.textContent=t.label,r.setAttribute("data-command",t.command),r.setAttribute("aria-label",`Navigate to ${t.label}`),r.addEventListener("click",()=>{this.onCommandClick(t.command)}),this.navLinksElement.appendChild(r)})}addItem(e){const t=document.createElement("button");t.className="nav-link",t.type="button",t.textContent=e.label,t.setAttribute("data-command",e.command),t.setAttribute("aria-label",`Navigate to ${e.label}`),t.addEventListener("click",()=>{this.onCommandClick(e.command)}),this.navLinksElement.appendChild(t)}clear(){this.navLinksElement.innerHTML=""}setActiveItem(e){this.activeCommand=e,this.navLinksElement.querySelectorAll("button[data-command]").forEach(n=>{n.removeAttribute("aria-current")});const r=this.navLinksElement.querySelector(`button[data-command="${e}"]`);r&&r.setAttribute("aria-current","page")}getActiveCommand(){return this.activeCommand}}function Xi(){document.querySelectorAll("a.email-protected").forEach(e=>{if(e.dataset.protected==="true")return;const t=e.dataset.user,r=e.dataset.domain;if(!t||!r){console.warn("Email link missing data-user or data-domain attributes",e);return}e.dataset.protected="true",e.addEventListener("click",n=>{n.preventDefault();const o=`mailto:${`${t}@${r}`}`;window.location.href=o}),e.addEventListener("keydown",n=>{if(n.key==="Enter"||n.key===" "){n.preventDefault();const o=`mailto:${`${t}@${r}`}`;window.location.href=o}}),e.hasAttribute("tabindex")||e.setAttribute("tabindex","0")})}class Jn{envVarManager;constructor(e){this.envVarManager=e}format(e,t){let r=e;return this.envVarManager&&(r=this.envVarManager.expandVariables(r)),r=this.expandBashEscapes(r,t),r=this.expandCustomTokens(r,t),r}expandBashEscapes(e,t){let r=e;return r=r.replace(/\\u/g,t.user),r=r.replace(/\\h/g,this.getShortHostname(t.hostname)),r=r.replace(/\\H/g,t.hostname),r=r.replace(/\\w/g,t.shortPwd),r=r.replace(/\\W/g,t.lastDir),r=r.replace(/\\\$/g,t.isRoot?"#":"$"),r=r.replace(/\\d/g,this.getDate()),r=r.replace(/\\t/g,this.getTime24()),r=r.replace(/\\T/g,this.getTime12()),r=r.replace(/\\A/g,this.getTimeShort()),r=r.replace(/\\@/g,this.getTimeAMPM()),t.historyNumber!==void 0&&(r=r.replace(/\\!/g,String(t.historyNumber))),t.commandNumber!==void 0&&(r=r.replace(/\\#/g,String(t.commandNumber))),r=r.replace(/\\\\/g,"\\"),r=r.replace(/\\n/g,`
`),r}expandCustomTokens(e,t){let r=e;return r=r.replace(/\{user\}/g,t.user),r=r.replace(/\{hostname\}/g,t.hostname),r=r.replace(/\{path\}/g,t.shortPwd),r=r.replace(/\{lastdir\}/g,t.lastDir),r=r.replace(/\{pwd\}/g,t.pwd),r}getShortHostname(e){const t=e.indexOf(".");return t>0?e.substring(0,t):e}getDate(){const e=new Date,t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=t[e.getDay()],i=r[e.getMonth()],o=String(e.getDate()).padStart(2,"0");return`${n} ${i} ${o}`}getTime24(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0"),n=String(e.getSeconds()).padStart(2,"0");return`${t}:${r}:${n}`}getTime12(){const e=new Date;let t=e.getHours();const r=t>=12?"PM":"AM";t=t%12||12;const n=String(t).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0"),o=String(e.getSeconds()).padStart(2,"0");return`${n}:${i}:${o} ${r}`}getTimeShort(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0");return`${t}:${r}`}getTimeAMPM(){const e=new Date;let t=e.getHours();const r=t>=12?"PM":"AM";t=t%12||12;const n=String(t).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0");return`${n}:${i} ${r}`}static getLastDir(e){if(e==="/")return"/";if(e==="~"||e==="")return"~";const t=e.split("/").filter(r=>r&&r!=="~");return t.length>0?t[t.length-1]:"~"}}class qi{inputElement;promptElement;history=[];historyIndex=-1;currentInput="";availableCommands=[];fileSystem;constructor(e,t){this.inputElement=e,this.promptElement=t,this.setupEventListeners()}setupEventListeners(){this.inputElement.addEventListener("keydown",e=>this.handleKeyDown(e))}handleKeyDown(e){switch(e.key){case"ArrowUp":e.preventDefault(),this.navigateHistory("up");break;case"ArrowDown":e.preventDefault(),this.navigateHistory("down");break;case"Tab":e.preventDefault(),this.handleTabCompletion();break}}navigateHistory(e){this.history.length!==0&&(this.historyIndex===-1&&(this.currentInput=this.inputElement.value),e==="up"?this.historyIndex<this.history.length-1&&(this.historyIndex++,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex>0?(this.historyIndex--,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex===0&&(this.historyIndex=-1,this.inputElement.value=this.currentInput))}handleTabCompletion(){const e=this.inputElement.value;if(!e)return;const t=e.split(/\s+/);t.length===1?this.completeCommand(e.trim()):this.completeFilePath(t)}completeCommand(e){const t=this.availableCommands.filter(r=>r.startsWith(e.toLowerCase()));if(t.length===1)this.inputElement.value=t[0];else if(t.length>1){const r=this.findCommonPrefix(t);r.length>e.length&&(this.inputElement.value=r)}}completeFilePath(e){if(!this.fileSystem)return;const t=e[e.length-1],r=e.slice(0,-1).join(" ");let n=this.fileSystem.getCurrentPath(),i=t;const o=t.lastIndexOf("/");if(o!==-1){const l=t.substring(0,o+1);i=t.substring(o+1),l.startsWith("/")?n=l:n=this.resolvePath(this.fileSystem.getCurrentPath(),l)}try{if(!this.fileSystem.exists(n)||!this.fileSystem.isDirectory(n))return;const a=this.fileSystem.list(n).filter(A=>A.toLowerCase().startsWith(i.toLowerCase()));if(a.length===0)return;const p=this.findCommonPrefix(a);let h;if(o!==-1?h=t.substring(0,o+1)+p:h=p,a.length===1){const A=this.resolvePath(n,a[0]);this.fileSystem.isDirectory(A)&&(h+="/")}this.inputElement.value=r+(r?" ":"")+h}catch{return}}resolvePath(e,t){if(t.startsWith("/"))return t;const r=e.split("/").filter(i=>i),n=t.split("/").filter(i=>i);for(const i of n)i===".."?r.pop():i!=="."&&r.push(i);return"/"+r.join("/")}findCommonPrefix(e){if(e.length===0)return"";if(e.length===1)return e[0];let t=e[0];for(let r=1;r<e.length;r++)for(;!e[r].startsWith(t);)if(t=t.substring(0,t.length-1),t==="")return"";return t}addToHistory(e){e.trim()&&(this.history.push(e),this.historyIndex=-1,this.currentInput="")}getValue(){return this.inputElement.value}clear(){this.inputElement.value="",this.currentInput="",this.historyIndex=-1}focus(e=!1){!e&&this.isMobileDevice()||this.inputElement.focus({preventScroll:!0})}isMobileDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0||window.matchMedia("(max-width: 768px)").matches}setPrompt(e){this.promptElement.textContent=e}setAvailableCommands(e){this.availableCommands=e}setFileSystem(e){this.fileSystem=e}getHistory(){return[...this.history]}onSubmit(e){this.inputElement.addEventListener("keydown",t=>{if(t.key==="Enter"){const r=this.getValue();e(r)}})}}class Ki{outputElement;inputLineElement;constructor(e){this.outputElement=e,this.inputLineElement=document.getElementById("terminal-input-line")}writeLine(e,t,r){const n=document.createElement("div");n.className="output-line"+(t?` ${t}`:""),n.textContent=e,this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(n,this.inputLineElement):this.outputElement.appendChild(n),r&&r()}write(e,t,r){const n=e.split(`
`);n.forEach((i,o)=>{(o<n.length-1||i)&&this.writeLine(i,t)}),r&&r()}writeHTML(e,t){const r=document.createElement("div");r.className="output-line",r.innerHTML=pn(e),this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),t&&t()}writeError(e,t){const r=e.split(`
`);r.forEach((n,i)=>{if(i<r.length-1||n){const o=document.createElement("div");o.className="output-line output-error",o.textContent=n;const l=`error-${Date.now()}-${i}`;if(o.id=l,o.setAttribute("role","alert"),t&&i===0){const a=document.getElementById(t);if(a){const p=a.getAttribute("aria-describedby");p?a.setAttribute("aria-describedby",`${p} ${l}`):a.setAttribute("aria-describedby",l)}}this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(o,this.inputLineElement):this.outputElement.appendChild(o)}}),this.scrollToBottom()}writeCommand(e,t,r){const n=document.createElement("div");n.className="output-line";const i=document.createElement("span");i.style.color="var(--terminal-accent)",i.style.fontWeight="bold",i.textContent=e+" ";const o=document.createElement("span");o.textContent=t,n.appendChild(i),n.appendChild(o),this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(n,this.inputLineElement):this.outputElement.appendChild(n),r&&r()}clear(){Array.from(this.outputElement.children).forEach(t=>{t.id!=="terminal-input-line"&&t.remove()})}scrollToBottom(){const e=this.outputElement.parentElement;e&&(e.scrollTop=e.scrollHeight)}scrollToCommand(){const e=this.outputElement.querySelectorAll(".output-line");e.length>=2?e[e.length-2].scrollIntoView({behavior:"instant",block:"start"}):this.scrollToBottom()}performScrollBehavior(e){requestAnimationFrame(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{setTimeout(()=>{e==="top"?this.scrollToCommand():this.scrollToBottom()},50)})})})}}class Zi{constructor(e,t,r,n,i){this.dispatcher=e,this.executor=t,this.settingsManager=r,this.themeManager=n,this.envVarManager=i;const o=document.getElementById("terminal-output"),l=document.getElementById("terminal-input"),a=document.getElementById("terminal-prompt");if(!o||!l||!a)throw new Error("Required terminal elements not found");this.output=new Ki(o),this.input=new qi(l,a),this.promptFormatter=new Jn(i),this.setupInputHandler(),this.setupClickHandler(o),this.setupSettingsUIHandler(),this.setupKeyboardHandlers(),this.setupMobileViewportHandler(),this.updatePrompt()}input;output;username="darin";hostname="darinchambers.com";currentPath="~";promptFormatter;router;screensaverManager;setupClickHandler(e){e.addEventListener("click",t=>{const r=window.getSelection();if(r&&r.toString().length>0)return;const n=t.target,i=["svg","button","a","input","select","textarea","[data-graph]","[data-graph-src]",".graph-container"].join(", ");n.closest(i)||this.input.focus(!0)})}setupKeyboardHandlers(){document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelectorAll("[data-settings-panel]");if(t.length>0){const r=document.activeElement;r&&t[0].contains(r)&&(e.preventDefault(),this.input.focus(!0))}}})}setupMobileViewportHandler(){if(!window.visualViewport)return;let e=window.visualViewport.height;window.visualViewport.addEventListener("resize",()=>{const t=window.visualViewport.height;t>e&&this.scrollToHeader(),e=t})}scrollToHeader(){requestAnimationFrame(()=>{const e=document.getElementById("terminal-header");e?e.scrollIntoView({behavior:"smooth",block:"start"}):window.scrollTo({top:0,behavior:"smooth"})})}setupSettingsUIHandler(){document.addEventListener("terminal-command",e=>{const t=e;this.executeCommand(t.detail,!1)}),document.addEventListener("click",e=>{const t=e.target;if(t.closest("[data-command]")&&!t.closest(".nav-link")){const r=t.closest("[data-command]"),n=r.getAttribute("data-command");if(n){if(r.tagName==="A"&&e.preventDefault(),this.router){const i=this.router.getPathForCommand(n);if(i){this.router.navigate(i,!1);return}}this.executeCommand(n,!1)}}}),document.addEventListener("change",e=>{const t=e.target,r=t.getAttribute("data-command-template"),n=t.getAttribute("data-setting-type");if(!r)return;let i="";t instanceof HTMLInputElement&&t.type==="checkbox"?i=`${r} ${t.checked?"on":"off"}`:t instanceof HTMLInputElement&&t.type==="color"?i=`${r} ${t.value}`:t instanceof HTMLInputElement&&t.type==="range"?i=`${r} ${t.value}`:t instanceof HTMLSelectElement&&(n==="font-family"?i=`${r} "${t.value}"`:i=`${r} ${t.value}`),i&&this.executeCommand(i,!1)}),document.addEventListener("input",e=>{const t=e.target;if(t.type==="range"){const r=t.getAttribute("data-setting-type");if(r==="font-size"){const n=document.getElementById("font-size-value");n&&(n.textContent=`${t.value}px`)}else if(r==="animation-speed"){const n=document.getElementById("animation-speed-value");n&&(n.textContent=`${t.value}x`)}}}),document.addEventListener("settings-changed",()=>{this.refreshSettingsPanels(),this.updatePrompt(),this.screensaverManager?.handleSettingsChange()})}refreshSettingsPanels(){if(!this.settingsManager||!this.themeManager)return;const e=document.querySelectorAll("[data-settings-panel]");if(e.length===0)return;const t=Array.from(e).some(n=>n.contains(document.activeElement)),r=fr(this.settingsManager,this.themeManager);if(e.forEach(n=>{const i=r.replace('<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true">',"").replace(/<\/aside>$/,"");n.innerHTML=pn(i)}),t&&e.length>0){const i=e[0].querySelector("button, input, select");i&&i.focus()}}focusSettingsPanelIfPresent(){setTimeout(()=>{const e=document.querySelector("[data-settings-panel]");if(e){const t=e.querySelector("button, input, select");t&&t.focus()}},0)}setupInputHandler(){this.input.onSubmit(async e=>{const t=e.trim();if(this.screensaverManager?.deactivateScreensaver(),this.output.writeCommand(this.getPromptString(),t),this.input.addToHistory(t),t){const r=await this.executor.execute(t);this.displayResult(r),this.router&&this.router.syncUrlToCommand(t)}this.input.clear(),this.input.focus(!0)})}displayResult(e){e.output===mr.CLEAR_SCREEN?(this.output.clear(),this.router&&window.location.pathname!=="/"&&window.history.pushState({},"","/")):e.output&&!e.raw&&(e.error?this.output.writeError(e.output):e.html?(this.output.writeHTML(e.output,()=>{typeof window.initializeGraphs=="function"&&window.initializeGraphs(),Xi(),this.output.performScrollBehavior(e.scrollBehavior)}),this.focusSettingsPanelIfPresent()):this.output.write(e.output,void 0,()=>{this.output.performScrollBehavior(e.scrollBehavior)}))}getPromptString(){const e={user:this.username,hostname:this.hostname,pwd:this.envVarManager?.getVariable("PWD")??this.currentPath,shortPwd:this.currentPath,lastDir:Jn.getLastDir(this.currentPath),isRoot:this.username==="root"},t=this.settingsManager?.getSetting("prompt")?.format??"\\u@\\h:\\W\\$ ";return this.promptFormatter.format(t,e)}updatePrompt(){this.input.setPrompt(this.getPromptString())}registerCommand(e){this.dispatcher.registerCommand(e),this.input.setAvailableCommands(this.dispatcher.getCommandNames())}registerCommands(e){e.forEach(t=>this.registerCommand(t))}setFileSystem(e){this.input.setFileSystem(e)}writeWelcome(e){this.output.write(e,void 0,()=>{this.output.performScrollBehavior()})}setUsername(e){this.username=e,this.updatePrompt()}getUsername(){return this.username}setCurrentPath(e){this.currentPath=e,this.updatePrompt()}focus(e=!1){this.input.focus(e)}getInput(){return this.input}setRouter(e){this.router=e}setScreensaverManager(e){this.screensaverManager=e}async executeCommand(e,t=!1){if(t&&this.output.clear(),this.output.writeCommand(this.getPromptString(),e),this.input.addToHistory(e),e.trim()){const r=await this.executor.execute(e);this.displayResult(r)}this.input.clear(),this.input.focus()}}class Qi{aliases=new Map;fileSystem;aliasFilePath=ye.CONFIG_ALIASES;defaultAliases=new Map([["ll","ls -alh"]]);constructor(e){this.fileSystem=e,this.loadDefaultAliases(),this.loadAliases()}loadDefaultAliases(){this.defaultAliases.forEach((e,t)=>{this.aliases.set(t,e)})}loadAliases(){try{this.fileSystem.exists(this.aliasFilePath)&&this.fileSystem.isFile(this.aliasFilePath)&&this.fileSystem.readFile(this.aliasFilePath).split(`
`).filter(r=>r.trim()).forEach(r=>{const n=/^alias\s+(\S+)='(.+)'$/.exec(r);n&&this.aliases.set(n[1],n[2])})}catch{}}saveAliases(){const e=Array.from(this.aliases.entries()).map(([r,n])=>`alias ${r}='${n}'`),t=e.join(`
`)+(e.length>0?`
`:"");try{this.fileSystem.writeFile(this.aliasFilePath,t)}catch(r){throw new Error(`Failed to save aliases: ${r instanceof Error?r.message:String(r)}`)}}setAlias(e,t){if(!/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(e))throw new Error(`Invalid alias name: ${e}`);this.aliases.set(e,t),this.saveAliases()}removeAlias(e){const t=this.aliases.has(e);return t&&(this.aliases.delete(e),this.saveAliases()),t}getAlias(e){return this.aliases.get(e)}getAllAliases(){return new Map(this.aliases)}isDefaultAlias(e){return this.defaultAliases.has(e)}resolve(e){const t=/^(\S+)/.exec(e);if(!t)return e;const r=t[1],n=this.aliases.get(r);if(n){const i=e.replace(/^(\S+)/,n);return this.resolveRecursive(i,10)}return e}resolveRecursive(e,t){if(t<=0)return e;const r=/^(\S+)/.exec(e);if(!r)return e;const n=r[1],i=this.aliases.get(n);if(i){const o=e.replace(/^(\S+)/,i);return this.resolveRecursive(o,t-1)}return e}}class er{static parse(e){const t=e.trim();if(!t)return{command:"",args:[],raw:e};const r=this.splitCommand(t),n=r[0]?.toLowerCase()||"",i=r.slice(1);return{command:n,args:i,raw:e}}static splitCommand(e){const t=[];let r="",n=!1,i="",o=!1;for(const l of e){if(l==="\\"&&!o){o=!0;continue}if(o){r+=l,o=!1;continue}(l==='"'||l==="'")&&!n?(n=!0,i=l):l===i&&n?(n=!1,i=""):l===" "&&!n?r&&(t.push(r),r=""):r+=l}return r&&t.push(r),t}}class It extends Error{constructor(e){super(e),this.name="AppError",Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}}class Te extends It{constructor(e){super(e),this.name="FileSystemError"}}class Ji extends It{constructor(e){super(`Command not found: ${e}`),this.name="CommandNotFoundError"}}class $t{static parse(e){const t=[];let r="",n=!1,i="";for(let l=0;l<e.length;l++){const a=e[l],p=l>0?e[l-1]:"";if((a==='"'||a==="'")&&p!=="\\")n?a===i&&(n=!1,i=""):(n=!0,i=a),r+=a;else if(a==="|"&&!n){const h=r.trim();h&&t.push(h),r=""}else r+=a}const o=r.trim();return o&&t.push(o),t}static hasPipe(e){let t=!1,r="";for(let n=0;n<e.length;n++){const i=e[n],o=n>0?e[n-1]:"";if((i==='"'||i==="'")&&o!=="\\")t?i===r&&(t=!1,r=""):(t=!0,r=i);else if(i==="|"&&!t)return!0}return!1}}class eo{commands=new Map;registerCommand(e){this.commands.set(e.name.toLowerCase(),e),e.aliases&&e.aliases.forEach(t=>{this.commands.set(t.toLowerCase(),e)})}async dispatch(e){const t=er.parse(e);if(!t.command)return{output:""};const r=this.commands.get(t.command);if(!r)return{output:`${new Ji(t.command).message}
Type 'help' for available commands.`,error:!0};try{return await r.execute(t.args)}catch(n){return n instanceof It?{output:n.message,error:!0}:n instanceof Error?{output:`Error: ${n.message}`,error:!0}:{output:"An unknown error occurred.",error:!0}}}async dispatchPipeline(e){const t=$t.parse(e);if(t.length===0)return{output:""};let r={output:""};for(let n=0;n<t.length;n++){const i=t[n],o=n===0?void 0:r.output,l=er.parse(i);if(!l.command)return{output:""};const a=this.commands.get(l.command);if(!a)return{output:`Command not found: ${l.command}
Type 'help' for available commands.`,error:!0};try{if(r=await a.execute(l.args,o),r.error)return r}catch(p){return p instanceof It?{output:p.message,error:!0}:p instanceof Error?{output:`Error: ${p.message}`,error:!0}:{output:"An unknown error occurred.",error:!0}}}return r}getCommands(){const e=new Map;return this.commands.forEach((t,r)=>{t.name===r&&e.set(r,t)}),Array.from(e.values())}getCommandNames(){return Array.from(this.commands.keys())}}class to{constructor(e,t,r){this.dispatcher=e,this.aliasManager=t,this.envVarManager=r}async execute(e){const t=e.trim();if(!t)return{output:""};let r;$t.hasPipe(t)?r=$t.parse(t).map(p=>this.aliasManager.resolve(p.trim())).join(" | "):r=this.aliasManager.resolve(t);const n=this.envVarManager?this.envVarManager.expandVariables(r):r;return $t.hasPipe(n)?await this.dispatcher.dispatchPipeline(n):await this.dispatcher.dispatch(n)}}class no{platformVars=new Map;userVars=new Map;fileSystem;constructor(e,t,r){this.fileSystem=e,this.initializePlatformVariables(t,r),this.loadUserVariables()}initializePlatformVariables(e,t){const r=`/home/${e}`;this.platformVars.set("HOME",r),this.platformVars.set("USER",e),this.platformVars.set("LOGNAME",e),this.platformVars.set("HOSTNAME",t),this.platformVars.set("PWD",r),this.platformVars.set("OLDPWD",""),this.platformVars.set("SHELL","/bin/dcsh"),this.platformVars.set("PATH","/usr/local/bin:/usr/bin:/bin"),this.platformVars.set("TERM","xterm-256color")}loadUserVariables(){try{const e=localStorage.getItem(Qt.ENVIRONMENT);if(e){const t=JSON.parse(e);Object.entries(t).forEach(([r,n])=>{this.userVars.set(r,n)})}this.syncToFileSystem()}catch(e){console.warn("Failed to load environment variables from localStorage:",e)}}saveUserVariables(){try{const e={};this.userVars.forEach((t,r)=>{e[r]=t}),localStorage.setItem(Qt.ENVIRONMENT,JSON.stringify(e)),this.syncToFileSystem()}catch(e){console.warn("Failed to save environment variables to localStorage:",e)}}syncToFileSystem(){try{const e=[];e.push("# Environment Variables"),e.push("# Platform variables (read-only):"),this.platformVars.forEach((r,n)=>{e.push(`${n}=${r}`)}),this.userVars.size>0&&(e.push(""),e.push("# User variables:"),this.userVars.forEach((r,n)=>{e.push(`export ${n}=${r}`)}));const t=e.join(`
`);this.fileSystem.writeFile(ye.CONFIG_ENV,t)}catch(e){console.warn("Failed to sync environment variables to filesystem:",e)}}getVariable(e){return this.userVars.get(e)??this.platformVars.get(e)}setVariable(e,t){if(!/^[A-Z_][A-Z0-9_]*$/i.test(e))throw new Error(`Invalid variable name: ${e}`);this.userVars.set(e,t),this.saveUserVariables()}updatePlatformVariable(e,t){this.platformVars.has(e)&&this.platformVars.set(e,t)}unsetVariable(e){this.userVars.delete(e)&&this.saveUserVariables()}getPlatformVariables(){return new Map(this.platformVars)}getUserVariables(){return new Map(this.userVars)}getAllVariables(){const e=new Map;return this.platformVars.forEach((t,r)=>{e.set(r,t)}),this.userVars.forEach((t,r)=>{e.set(r,t)}),e}expandVariables(e){let t=e;return t=t.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/gi,(r,n)=>this.getVariable(n)??r),t=t.replace(new RegExp("(?<!\\\\)\\$([A-Z_][A-Z0-9_]*)","gi"),(r,n)=>this.getVariable(n)??r),t=t.replace(/\\\$/g,"$"),t}exportFormat(){const e=[];return this.getAllVariables().forEach((t,r)=>{e.push(`${r}=${t}`)}),e.sort()}}const ro=`---
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
`,so=Object.freeze(Object.defineProperty({__proto__:null,default:ro},Symbol.toStringTag,{value:"Module"})),io=`---
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
`,oo=Object.freeze(Object.defineProperty({__proto__:null,default:io},Symbol.toStringTag,{value:"Module"})),ao=`---
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
`,lo=Object.freeze(Object.defineProperty({__proto__:null,default:ao},Symbol.toStringTag,{value:"Module"})),_o=`---
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
`,co=Object.freeze(Object.defineProperty({__proto__:null,default:_o},Symbol.toStringTag,{value:"Module"})),uo=`---
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
`,ho=Object.freeze(Object.defineProperty({__proto__:null,default:uo},Symbol.toStringTag,{value:"Module"})),mo=`# Darin Chambers

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
`,po=Object.freeze(Object.defineProperty({__proto__:null,default:mo},Symbol.toStringTag,{value:"Module"})),fo=`# Contact Information

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
`,$o=Object.freeze(Object.defineProperty({__proto__:null,default:fo},Symbol.toStringTag,{value:"Module"})),go=`# Terminal Help

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
- **\`ddate\`** - Discordian calendar date

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
\`\`\`

**Navigation:** Use arrow keys for command history, Tab for auto-complete

**Aliases:** Create shortcuts with \`alias ll='ls -la'\`

---

**Tip:** For detailed help on any command, use \`<command> --help\` or \`help <command>\`
`,To=Object.freeze(Object.defineProperty({__proto__:null,default:go},Symbol.toStringTag,{value:"Module"}));class Lo{static createDirectoryNode(e){const t=e.startsWith(".");return{name:e,type:"directory",children:new Map,permissions:"drwxr-xr-x",owner:"darin",size:4096,modifiedTime:new Date,isHidden:t}}static createFileNode(e,t){const r=e.startsWith(".");return{name:e,type:"file",content:t,permissions:"-rw-r--r--",owner:"darin",size:t.length,modifiedTime:new Date,isHidden:r}}static loadBlogFiles(){const e=Object.assign({"../../content/blog/2025-11-14-a-love-letter-to-developers-and-the-terminal.md":so,"../../content/blog/2025-11-15-we-trick-rocks-into-thinking.md":oo,"../../content/blog/2025-11-16-building-an-enterprise-grade-graph-library-in-one-week.md":lo,"../../content/blog/2025-11-23-leet-status-unlocked.md":co}),t=new Map;for(const[r,n]of Object.entries(e)){const i=r.split("/").pop(),o=n.default;t.set(i,this.createFileNode(i,o))}return t}static loadPortfolioFiles(){const e=Object.assign({"../../content/portfolio/hypergrowing-a-unicorn.md":ho}),t=new Map;for(const[r,n]of Object.entries(e)){const i=r.split("/").pop(),o=n.default;t.set(i,this.createFileNode(i,o))}return t}static loadContentFiles(){const e=Object.assign({"../../content/about.md":po,"../../content/contact.md":$o,"../../content/help.md":To}),t=new Map;for(const[r,n]of Object.entries(e)){const i=r.split("/").pop(),o=n.default;t.set(i,this.createFileNode(i,o))}return t}static createDefaultStructure(){const e=this.createDirectoryNode(""),t=e.children;t.set("root",this.createDirectoryNode("root"));const r=this.createDirectoryNode("home");t.set("home",r);const n=this.createDirectoryNode("guest");r.children.set("guest",n),n.children.set("README.txt",this.createFileNode("README.txt",`Welcome to darinchambers.com!

This is a terminal-inspired personal website showcasing expertise in AI and software engineering.

Type 'help' to see available commands.
Type 'cd /home/darin' to explore more.
`));const i=this.createDirectoryNode("darin");r.children.set("darin",i),i.children.set(".secret",this.createFileNode(".secret",`You found a secret! 🎉

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
`));const o=this.createDirectoryNode("blog");i.children.set("blog",o);const l=this.loadBlogFiles();for(const[S,x]of l)o.children.set(S,x);const a=this.createDirectoryNode("content");i.children.set("content",a);const p=this.loadContentFiles();for(const[S,x]of p)a.children.set(S,x);const h=this.createDirectoryNode("portfolio");i.children.set("portfolio",h);const A=this.loadPortfolioFiles();for(const[S,x]of A)h.children.set(S,x);const E=this.createDirectoryNode("usr");t.set("usr",E);const C=this.createDirectoryNode("bin");E.children.set("bin",C),C.children.set("help",this.createFileNode("help","[Core command: help]")),C.children.set("clear",this.createFileNode("clear","[Core command: clear]")),C.children.set("history",this.createFileNode("history","[Core command: history]")),C.children.set("date",this.createFileNode("date","[Core command: date]")),C.children.set("echo",this.createFileNode("echo","[Core command: echo]")),C.children.set("ddate",this.createFileNode("ddate","[Novelty command: ddate]")),C.children.set("figlet",this.createFileNode("figlet","[Novelty command: figlet]")),C.children.set("matrix",this.createFileNode("matrix","[Novelty command: matrix]")),C.children.set("whoami",this.createFileNode("whoami","[Core command: whoami]")),C.children.set("alias",this.createFileNode("alias","[Core command: alias]")),C.children.set("unalias",this.createFileNode("unalias","[Core command: unalias]")),C.children.set("ls",this.createFileNode("ls","[Core command: ls]")),C.children.set("cd",this.createFileNode("cd","[Core command: cd]")),C.children.set("pwd",this.createFileNode("pwd","[Core command: pwd]")),C.children.set("cat",this.createFileNode("cat","[Core command: cat]")),C.children.set("tree",this.createFileNode("tree","[Core command: tree]")),C.children.set("render",this.createFileNode("render","[Core command: render]")),C.children.set("which",this.createFileNode("which","[Core command: which]"));const P=this.createDirectoryNode("local");E.children.set("local",P);const N=this.createDirectoryNode("bin");return P.children.set("bin",N),N.children.set("about",this.createFileNode("about","[Custom command: about]")),N.children.set("portfolio",this.createFileNode("portfolio","[Custom command: portfolio]")),N.children.set("blog",this.createFileNode("blog","[Custom command: blog]")),N.children.set("contact",this.createFileNode("contact","[Custom command: contact]")),N.children.set("settings",this.createFileNode("settings","[Custom command: settings]")),e}}class Eo{root;currentPath;currentUsername="darin";constructor(e){this.root=e,this.currentPath=ye.HOME_DARIN}getCurrentPath(){return this.currentPath}setCurrentUsername(e){this.currentUsername=e}getShortPath(){if(this.currentPath==="/")return"/";const e=`/home/${this.currentUsername}`;return this.currentPath===e?"~":this.currentPath.startsWith(e+"/")?"~"+this.currentPath.substring(e.length):this.currentPath}resolvePath(e){return e.startsWith("/")?this.normalizePath(e):e==="~"?`/home/${this.currentUsername}`:e.startsWith("~/")?`/home/${this.currentUsername}`+e.substring(1):this.normalizePath(this.currentPath+"/"+e)}normalizePath(e){const t=e.split("/").filter(n=>n.length>0),r=[];for(const n of t)n===".."?r.pop():n!=="."&&r.push(n);return"/"+r.join("/")}getNode(e){const t=this.resolvePath(e);if(t==="/")return this.root;const r=t.split("/").filter(i=>i.length>0);let n=this.root;for(const i of r){if(!n.children?.has(i))return null;n=n.children.get(i)}return n}list(e="."){const t=this.getNode(e);if(!t)throw new Te(`ls: cannot access '${e}': No such file or directory`);if(t.type!=="directory")throw new Te(`ls: ${e}: Not a directory`);return Array.from(t.children.keys()).sort()}changeDirectory(e){const t=this.resolvePath(e),r=this.getNode(t);if(!r)throw new Te(`cd: ${e}: No such file or directory`);if(r.type!=="directory")throw new Te(`cd: ${e}: Not a directory`);this.currentPath=t||"/"}readFile(e){const t=this.getNode(e);if(!t)throw new Te(`cat: ${e}: No such file or directory`);if(t.type!=="file")throw new Te(`cat: ${e}: Is a directory`);return t.content??""}exists(e){return this.getNode(e)!==null}isDirectory(e){const t=this.getNode(e);return t!==null&&t.type==="directory"}isFile(e){const t=this.getNode(e);return t!==null&&t.type==="file"}writeFile(e,t){const n=this.resolvePath(e).split("/").filter(a=>a.length>0),i=n.pop();if(!i)throw new Te(`Invalid file path: ${e}`);let o=this.root;for(const a of n){if(!o.children?.has(a))throw new Te(`Directory does not exist: ${e}`);if(o=o.children.get(a),o.type!=="directory")throw new Te(`Not a directory: ${e}`)}const l={name:i,type:"file",content:t};o.children.set(i,l)}createDirectory(e){const r=this.resolvePath(e).split("/").filter(i=>i.length>0);let n=this.root;for(const i of r)if(n.children?.has(i)){const o=n.children.get(i);if(o.type!=="directory")throw new Te(`mkdir: ${e}: File exists but is not a directory`);n=o}else{const o={name:i,type:"directory",children:new Map};n.children.set(i,o),n=o}}getTree(e=".",t=4){const r=this.getNode(e);if(!r)throw new Te(`tree: cannot access '${e}': No such file or directory`);const n=[],i=this.resolvePath(e);return n.push(i==="/"?"/":i),r.type==="directory"&&this.buildTree(r,"",n,1,t),n}buildTree(e,t,r,n,i){if(n>i||!e.children)return;const o=Array.from(e.children.entries()).sort((l,a)=>l[1].type==="directory"&&a[1].type==="file"?-1:l[1].type==="file"&&a[1].type==="directory"?1:l[0].localeCompare(a[0]));o.forEach(([l,a],p)=>{const h=p===o.length-1,A=h?"└── ":"├── ",E=h?"    ":"│   ";r.push(t+A+l),a.type==="directory"&&this.buildTree(a,t+E,r,n+1,i)})}}class Ao{terminal;routes;isNavigating=!1;onRouteChangeCallback=null;fileSystem;constructor(e,t){this.terminal=e,this.fileSystem=t,this.routes=this.initializeRoutes(),this.setupListeners()}initializeRoutes(){return[{pattern:/^\/blog\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`blog ${e[1]}`},{pattern:/^\/blog\/?$/,commandBuilder:()=>"blog"},{pattern:/^\/about\/?$/,commandBuilder:()=>"about"},{pattern:/^\/portfolio\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`portfolio ${e[1]}`},{pattern:/^\/portfolio\/?$/,commandBuilder:(e,t)=>{const r=t?.get("tags");return r?`portfolio --tags ${r}`:"portfolio"}},{pattern:/^\/contact\/?$/,commandBuilder:()=>"contact"},{pattern:/^\/settings\/?$/,commandBuilder:()=>"settings"},{pattern:/^\/help\/?$/,commandBuilder:()=>"help"},{pattern:/^\/matrix\/?$/,commandBuilder:()=>"matrix"},{pattern:/^\/$/,commandBuilder:()=>"about"}]}setupListeners(){window.addEventListener("popstate",()=>{this.handleRouteChange(!1)})}handleInitialRoute(){const e=sessionStorage.getItem("ghPagesRedirect");e&&(sessionStorage.removeItem("ghPagesRedirect"),window.history.replaceState({},"",e)),this.handleRouteChange(!1)}handleRouteChange(e){const t=window.location.pathname,r=new URLSearchParams(window.location.search),n=this.parseRoute(t,r);n?(this.isNavigating=!0,this.terminal.executeCommand(n,e),this.isNavigating=!1,this.onRouteChangeCallback&&this.onRouteChangeCallback(n)):this.navigate("/",!0)}parseRoute(e,t){for(const r of this.routes){const n=e.match(r.pattern);if(n)return r.commandBuilder(n,t)}return null}navigate(e,t=!0){this.isNavigating||(window.history.pushState({},"",e),this.handleRouteChange(t))}getValidBlogPostIds(){try{const e=ye.CONTENT_BLOG,r=this.fileSystem.list(e).filter(i=>i.endsWith(".md")),n=new Set;for(const i of r){const o=pr.getIdFromFilename(i);n.add(o)}return n}catch{return new Set}}getPathForCommand(e){const t=e.trim();if(t.startsWith("blog ")&&!t.includes("--tag")){const n=t.substring(5).trim();return this.getValidBlogPostIds().has(n)?`/blog/${n}`:null}if(t.startsWith("portfolio --tags ")){const n=t.substring(17).trim();return n?`/portfolio?tags=${encodeURIComponent(n)}`:"/portfolio"}return t.startsWith("portfolio ")?`/portfolio/${t.substring(10).trim()}`:{blog:"/blog",about:"/about",portfolio:"/portfolio",contact:"/contact",settings:"/settings",help:"/help",matrix:"/matrix"}[t]||null}syncUrlToCommand(e){const t=this.getPathForCommand(e);t&&window.location.pathname!==t&&window.history.pushState({},"",t),this.onRouteChangeCallback&&this.onRouteChangeCallback(e)}onRouteChange(e){this.onRouteChangeCallback=e}getCurrentCommand(){const e=new URLSearchParams(window.location.search);return this.parseRoute(window.location.pathname,e)}}class Io{callback;debounceMs;debounceTimer=null;isMonitoring=!1;boundHandleActivity;constructor(e,t=100){this.callback=e,this.debounceMs=t,this.boundHandleActivity=this.handleActivity.bind(this)}start(){this.isMonitoring||(this.isMonitoring=!0,document.addEventListener("keydown",this.boundHandleActivity),document.addEventListener("click",this.boundHandleActivity),document.addEventListener("touchstart",this.boundHandleActivity,{passive:!0}))}stop(){this.isMonitoring&&(this.isMonitoring=!1,document.removeEventListener("keydown",this.boundHandleActivity),document.removeEventListener("click",this.boundHandleActivity),document.removeEventListener("touchstart",this.boundHandleActivity),this.debounceTimer&&(clearTimeout(this.debounceTimer),this.debounceTimer=null))}handleActivity(){this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>{this.callback(),this.debounceTimer=null},this.debounceMs)}isActive(){return this.isMonitoring}}class yo{settingsManager;terminal;idleTimer=null;state="idle";lastActivityTime=Date.now();constructor(e,t){this.settingsManager=e,this.terminal=t,this.setupVisibilityListener()}recordActivity(){if(this.lastActivityTime=Date.now(),this.state==="active"){this.deactivateScreensaver();return}this.resetIdleTimer()}startIdleTimer(){if(!this.isEnabled()){this.state="disabled";return}this.state="idle",this.resetIdleTimer()}resetIdleTimer(){if(this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null),!this.isEnabled()){this.state="disabled";return}if(this.state==="active")return;const e=this.getTimeoutMs();this.idleTimer=setTimeout(()=>{this.activateScreensaver()},e),this.state="idle"}activateScreensaver(){if(!this.isEnabled()||this.state==="active")return;const e=this.settingsManager.getActiveScreensaver();this.terminal.executeCommand(e,!1),this.state="active",this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null)}deactivateScreensaver(){this.state==="active"&&(this.state="idle",this.resetIdleTimer())}handleSettingsChange(){this.isEnabled()?this.state==="disabled"?this.startIdleTimer():this.state==="idle"&&this.resetIdleTimer():(this.state="disabled",this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null))}isEnabled(){return this.settingsManager.getScreensaverEnabled()}getTimeoutMs(){return this.settingsManager.getScreensaverTimeout()*60*1e3}getTimeout(){return this.settingsManager.getScreensaverTimeout()}setEnabled(e){this.settingsManager.setScreensaverEnabled(e),this.handleSettingsChange()}setTimeout(e){if(e<Je.MIN_TIMEOUT_MINUTES||e>Je.MAX_TIMEOUT_MINUTES)throw new Error(`Timeout must be between ${Je.MIN_TIMEOUT_MINUTES} and ${Je.MAX_TIMEOUT_MINUTES} minutes`);this.settingsManager.setScreensaverTimeout(e),this.handleSettingsChange()}setActiveScreensaver(e){this.settingsManager.setActiveScreensaver(e)}getState(){return this.state}getIdleTime(){return Date.now()-this.lastActivityTime}setupVisibilityListener(){typeof document>"u"||document.addEventListener("visibilitychange",()=>{document.hidden?this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null):this.state==="idle"&&this.isEnabled()&&this.resetIdleTimer()})}destroy(){this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.state="disabled"}}class So{settings;fileSystem;settingsPath=ye.CONFIG_SETTINGS;storageKey=Qt.SETTINGS;constructor(e){this.fileSystem=e,this.settings=this.loadFromLocalStorage()??this.getDefaults(),this.syncToFileSystem()}loadFromLocalStorage(){try{const e=localStorage.getItem(this.storageKey);if(!e)return null;const t=JSON.parse(e);return!t.theme||!t.font||!t.effects||!t.prompt?(console.warn("SettingsManager: Invalid settings structure in localStorage, using defaults"),null):(t.screensaver||(t.screensaver=Un.screensaver),t)}catch(e){return console.warn("SettingsManager: Failed to load settings from localStorage:",e),null}}saveToLocalStorage(){try{const e=JSON.stringify(this.settings,null,2);localStorage.setItem(this.storageKey,e)}catch(e){throw console.error("SettingsManager: Failed to save settings to localStorage:",e),new Error(`Failed to save settings: ${e instanceof Error?e.message:String(e)}`)}}syncToFileSystem(){try{const e=JSON.stringify(this.settings,null,2);this.fileSystem.writeFile(this.settingsPath,e)}catch(e){console.error("SettingsManager: Failed to sync settings to filesystem:",e)}}getDefaults(){return JSON.parse(JSON.stringify(Un))}loadSettings(){return this.settings}saveSettings(e){this.settings=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSetting(e){return this.settings[e]}setSetting(e,t){this.settings[e]=t,this.saveToLocalStorage(),this.syncToFileSystem()}getThemePreset(){return this.settings.theme.preset}setThemePreset(e){if(!this.validateThemePreset(e))throw new Error(`Invalid theme preset: ${String(e)}`);this.settings.theme.preset=e,e!=="custom"&&(this.settings.theme.customColors=void 0),this.saveToLocalStorage(),this.syncToFileSystem()}getCustomColors(){return this.settings.theme.customColors}setCustomColors(e){this.settings.theme.preset="custom",this.settings.theme.customColors=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontSize(){return this.settings.font.size}setFontSize(e){if(!this.validateFontSize(e))throw new Error(`Invalid font size: ${e}. Must be between 8 and 24.`);this.settings.font.size=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontFamily(){return this.settings.font.family}setFontFamily(e){if(!this.validateFontFamily(e))throw new Error(`Invalid font family: ${String(e)}`);this.settings.font.family=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScanLines(){return this.settings.effects.scanLines}setScanLines(e){this.settings.effects.scanLines=e,this.saveToLocalStorage(),this.syncToFileSystem()}getGlow(){return this.settings.effects.glow}setGlow(e){this.settings.effects.glow=e,this.saveToLocalStorage(),this.syncToFileSystem()}getBorder(){return this.settings.effects.border}setBorder(e){this.settings.effects.border=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAnimationSpeed(){return this.settings.effects.animationSpeed}setAnimationSpeed(e){if(!this.validateAnimationSpeed(e))throw new Error(`Invalid animation speed: ${e}. Must be between 0.5 and 2.0.`);this.settings.effects.animationSpeed=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSoundEffects(){return this.settings.effects.soundEffects}setSoundEffects(e){this.settings.effects.soundEffects=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAutoScrollBehavior(){return this.settings.effects.autoScrollBehavior}setAutoScrollBehavior(e){this.settings.effects.autoScrollBehavior=e,this.saveToLocalStorage(),this.syncToFileSystem()}getPromptFormat(){return this.settings.prompt.format}setPromptFormat(e){this.settings.prompt.format=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScreensaverEnabled(){return this.settings.screensaver.enabled}setScreensaverEnabled(e){this.settings.screensaver.enabled=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScreensaverTimeout(){return this.settings.screensaver.timeoutMinutes}setScreensaverTimeout(e){if(!this.validateScreensaverTimeout(e))throw new Error(`Invalid screensaver timeout: ${e}. Must be between 1 and 60 minutes.`);this.settings.screensaver.timeoutMinutes=e,this.saveToLocalStorage(),this.syncToFileSystem()}getActiveScreensaver(){return this.settings.screensaver.activeScreensaver}setActiveScreensaver(e){this.settings.screensaver.activeScreensaver=e,this.saveToLocalStorage(),this.syncToFileSystem()}reset(){this.settings=this.getDefaults(),localStorage.removeItem(this.storageKey),this.saveToLocalStorage(),this.syncToFileSystem()}validateThemePreset(e){return["green","yellow","white","light-blue","paper","dc","custom"].includes(e)}validateFontSize(e){return typeof e=="number"&&e>=8&&e<=24&&!isNaN(e)}validateFontFamily(e){return["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"].includes(e)}validateAnimationSpeed(e){return typeof e=="number"&&e>=.5&&e<=2&&!isNaN(e)}validateScreensaverTimeout(e){return typeof e=="number"&&e>=1&&e<=60&&!isNaN(e)}}class bo{settingsManager;presets;constructor(e){this.settingsManager=e,this.presets=new Map,this.initializePresets()}initializePresets(){[{name:"green",displayName:"Green",colors:{"--terminal-bg":"#0a0e14","--terminal-fg":"#39ff14","--terminal-accent":"#00ff99","--terminal-dim":"#20c20e","--terminal-error":"#ff3333","--terminal-cursor":"#39ff14","--terminal-bg-secondary":"#0d1117"}},{name:"yellow",displayName:"Amber",colors:{"--terminal-bg":"#1a1410","--terminal-fg":"#ffb000","--terminal-accent":"#ffd700","--terminal-dim":"#cc8800","--terminal-error":"#ff3333","--terminal-cursor":"#ffb000","--terminal-bg-secondary":"#0f0b08"}},{name:"white",displayName:"White",colors:{"--terminal-bg":"#1a1a1a","--terminal-fg":"#d4d4d4","--terminal-accent":"#88ccff","--terminal-dim":"#999999","--terminal-error":"#ff5555","--terminal-cursor":"#ffffff","--terminal-bg-secondary":"#242424"}},{name:"light-blue",displayName:"Cyan",colors:{"--terminal-bg":"#0a1420","--terminal-fg":"#00d4ff","--terminal-accent":"#00ffff","--terminal-dim":"#0088aa","--terminal-error":"#ff3333","--terminal-cursor":"#00d4ff","--terminal-bg-secondary":"#0d1825"}},{name:"paper",displayName:"Paper",colors:{"--terminal-bg":"#ffffff","--terminal-fg":"#1a1a1a","--terminal-accent":"#007298","--terminal-dim":"#666666","--terminal-error":"#cc0000","--terminal-cursor":"#1a1a1a","--terminal-bg-secondary":"#f0f0f0"}},{name:"dc",displayName:"DC",colors:{"--terminal-bg":"#110e0c","--terminal-fg":"#70dbff","--terminal-accent":"#ffa940","--terminal-dim":"#d4915e","--terminal-error":"#ff4d4d","--terminal-cursor":"#aaff66","--terminal-bg-secondary":"#1c1410"}}].forEach(t=>{this.presets.set(t.name,t)})}getPresets(){return Array.from(this.presets.values())}getPreset(e){return this.presets.get(e)??null}applyTheme(e){if(e==="custom")throw new Error('Cannot apply "custom" theme directly. Use applyCustomColors() instead.');const t=this.presets.get(e);if(!t){const r=Array.from(this.presets.keys()).join(", ");throw new Error(`Invalid theme name: ${e}. Available themes: ${r}`)}this.updateCSSVariables(t.colors),this.settingsManager.setThemePreset(e)}applyCustomColors(e){Object.entries(e).forEach(([i,o])=>{if(!this.validateColor(o))throw new Error(`Invalid color value for ${i}: ${o}. Expected hex format (e.g., #ff0000 or #f00)`)});const t=this.getCurrentColors(),r=this.mergeColors(t,e);this.updateCSSVariables(r);const n={background:r["--terminal-bg"],foreground:r["--terminal-fg"],accent:r["--terminal-accent"],dim:r["--terminal-dim"],error:r["--terminal-error"],cursor:r["--terminal-cursor"],backgroundSecondary:r["--terminal-bg-secondary"]};this.settingsManager.setCustomColors(n)}applyCurrentTheme(){const e=this.settingsManager.loadSettings(),{preset:t,customColors:r}=e.theme;if(t==="custom"&&r){const n={"--terminal-bg":r.background,"--terminal-fg":r.foreground,"--terminal-accent":r.accent,"--terminal-dim":r.dim,"--terminal-error":r.error,"--terminal-cursor":r.cursor,"--terminal-bg-secondary":r.backgroundSecondary};this.updateCSSVariables(n)}else if(t!=="custom"){const n=this.presets.get(t);if(n)this.updateCSSVariables(n.colors);else{console.warn(`ThemeManager: Unknown preset "${t}", falling back to green`);const i=this.presets.get("green");i&&this.updateCSSVariables(i.colors)}}}getCurrentColors(){if(typeof document>"u"){const r=this.presets.get("green");return r?r.colors:{}}const e=document.documentElement,t=getComputedStyle(e);return{"--terminal-bg":t.getPropertyValue("--terminal-bg").trim()||"#0a0e14","--terminal-fg":t.getPropertyValue("--terminal-fg").trim()||"#39ff14","--terminal-accent":t.getPropertyValue("--terminal-accent").trim()||"#39ff14","--terminal-dim":t.getPropertyValue("--terminal-dim").trim()||"#20c20e","--terminal-error":t.getPropertyValue("--terminal-error").trim()||"#ff3333","--terminal-cursor":t.getPropertyValue("--terminal-cursor").trim()||"#39ff14","--terminal-bg-secondary":t.getPropertyValue("--terminal-bg-secondary").trim()||"#0d1117"}}updateCSSVariables(e){if(typeof document>"u"){console.warn("ThemeManager: document not available, skipping CSS update");return}const t=document.documentElement;Object.entries(e).forEach(([r,n])=>{t.style.setProperty(r,n)})}validateColor(e){return/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e)}mergeColors(e,t){return{"--terminal-bg":t["--terminal-bg"]??e["--terminal-bg"],"--terminal-fg":t["--terminal-fg"]??e["--terminal-fg"],"--terminal-accent":t["--terminal-accent"]??e["--terminal-accent"],"--terminal-dim":t["--terminal-dim"]??e["--terminal-dim"],"--terminal-error":t["--terminal-error"]??e["--terminal-error"],"--terminal-cursor":t["--terminal-cursor"]??e["--terminal-cursor"],"--terminal-bg-secondary":t["--terminal-bg-secondary"]??e["--terminal-bg-secondary"]}}}const Sr=document.getElementById("terminal-header");if(!Sr)throw new Error("Header element not found");new ji(Sr);const Ro=Lo.createDefaultStructure(),Z=new Eo(Ro),xe=new So(Z),Rt=new bo(xe),rt=new no(Z,"darin","darinchambers.com");Rt.applyCurrentTheme();const tr=xe.getSetting("font");typeof document<"u"&&(document.documentElement.style.setProperty("--terminal-font-size",`${tr.size}px`),document.documentElement.style.setProperty("--terminal-font-family",tr.family));const Co=xe.getScanLines();typeof document<"u"&&(Co||document.body.classList.add("no-scan-lines"));const wo=xe.getGlow();typeof document<"u"&&(wo||document.body.classList.add("no-glow"));const No=xe.getBorder();typeof document<"u"&&No&&document.body.classList.add("border-enabled");const xo=xe.getAnimationSpeed();typeof document<"u"&&document.documentElement.style.setProperty("--terminal-animation-speed",xo.toString());const Ct=new eo,wt=new Qi(Z),vo=new to(Ct,wt,rt),ge=new Zi(Ct,vo,xe,Rt,rt);ge.setCurrentPath(Z.getShortPath());ge.setFileSystem(Z);const br=document.getElementById("nav-links");if(!br)throw new Error("Navigation links element not found");const ko={name:"help",description:"Display available commands",execute:async(s,e)=>{try{if(s.length>0){const n=s[0];return await Ct.dispatch(`${n} --help`)}const t=Z.readFile(ye.CONTENT_HELP);return{output:ae.render(t),html:!0,scrollBehavior:"top"}}catch(t){return{output:t instanceof Error?t.message:String(t),error:!0}}}},Oo={name:"clear",description:"Clear the terminal screen",execute:(s,e)=>new V(s).hasFlag("help")?{output:`Usage: clear

Description:
  Clear the terminal screen and remove all output

Examples:
  clear                # Clear the screen`}:{output:mr.CLEAR_SCREEN}},Mo=Hs(Z),Do=Os(Z,s=>ge.setCurrentPath(s),rt),Po=Fs(Z),Ho=ks(Z),Fo=Ws(Z),Wo=Br(ge.getInput()),Uo=Pr(wt),Bo=Cs(wt),Go=vs(ge),Vo=Us(Z),zo=Vs(Z),jo=Ys(Z),Yo=Gs(Z),Xo=Rs(Z),qo=Js(Z,xe,Rt),Ko=Wr(rt),Zo=Ur(rt),Qo=Ii(Rt),Jo=Ns(Ct,wt);ge.registerCommands([ko,Oo,Wo,Hr,Fr,Go,Uo,Bo,Ko,Zo,Mo,Do,Po,Ho,Fo,Xo,Vo,jo,Yo,zo,qo,hi,Li,Qo,Jo]);const ea=[{label:"about",command:"about"},{label:"portfolio",command:"portfolio"},{label:"blog",command:"blog"},{label:"contact",command:"contact"},{label:"settings",command:"settings"},{label:"help",command:"help"}],ta=`Type 'help' to see all commands, or click a command above to get started.
Try 'about' to learn more, 'portfolio' to see my work, or explore with 'ls'.
`;ge.writeWelcome(ta);const st=new Ao(ge,Z);ge.setRouter(st);const fn=new Yi(br,s=>{const t={about:"/about",portfolio:"/portfolio",blog:"/blog",contact:"/contact",skills:"/skills",settings:"/settings",help:"/help"}[s];t?st.navigate(t,!0):ge.executeCommand(s,!0)});fn.setItems(ea);st.onRouteChange(s=>{fn.setActiveItem(s)});st.handleInitialRoute();const nr=st.getCurrentCommand();nr&&fn.setActiveItem(nr);Dr();const yt=new yo(xe,ge);ge.setScreensaverManager(yt);const na=new Io(()=>yt.recordActivity(),Je.ACTIVITY_DEBOUNCE_MS);na.start();yt.isEnabled()&&yt.startIdleTimer();async function Rr(){if(typeof window.SVGGraphNetwork>"u"){console.warn("SVGGraphNetwork library not loaded");return}document.querySelectorAll("[data-graph]").forEach(t=>{if(t.hasAttribute("data-graph-initialized"))return;const r=t,n=r.id||"unknown";try{const i=t.getAttribute("data-graph");if(!i){console.warn(`Graph container ${n} has no data-graph attribute`);return}const o=JSON.parse(i),l=t.getAttribute("data-graph-theme");l&&o&&typeof o=="object"&&"config"in o&&(o.config.theme=l),new window.SVGGraphNetwork(r.id||r,o),t.setAttribute("data-graph-initialized","true")}catch(i){console.error(`Failed to initialize graph ${n}:`,i),t.setAttribute("data-graph-initialized","true"),t.setAttribute("data-graph-error","true")}});const e=document.querySelectorAll("[data-graph-src]");for(const t of e){if(t.hasAttribute("data-graph-initialized"))continue;const r=t,n=r.id||"unknown",i=t.getAttribute("data-graph-src");if(!i){console.warn(`Graph container ${n} has no data-graph-src attribute`);continue}try{const o=await fetch(i);if(!o.ok)throw new Error(`Failed to fetch ${i}: ${o.statusText}`);const l=await o.json(),a=t.getAttribute("data-graph-theme");a&&l&&typeof l=="object"&&"config"in l&&(l.config.theme=a),new window.SVGGraphNetwork(r.id||r,l),t.setAttribute("data-graph-initialized","true")}catch(o){console.error(`Failed to initialize graph ${n} from ${i}:`,o),t.setAttribute("data-graph-initialized","true"),t.setAttribute("data-graph-error","true")}}}Rr();window.initializeGraphs=Rr;
