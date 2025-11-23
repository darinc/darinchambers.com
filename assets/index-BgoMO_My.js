(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const ze=new Map;function Mt(s){if(ze.has(s))return;ze.forEach((i,o)=>{o!==s&&(i.stopAnimation(),o.querySelectorAll(".matrix-column").forEach(a=>{a.style.animationPlayState="paused"}),ze.delete(o))});const e=s.dataset.matrixChars??"";if(!e){console.warn("[Matrix] No character set found in data-matrix-chars");return}const t={animationId:null,frameCount:0,matrixChars:e,rainElement:s,stopAnimation:()=>{t.animationId&&(cancelAnimationFrame(t.animationId),t.animationId=null),ze.delete(s)}};ze.set(s,t);function n(){return e[Math.floor(Math.random()*e.length)]}function r(){t.frameCount++,s.querySelectorAll(".matrix-column").forEach(o=>{const l=o.querySelectorAll(".matrix-char"),a=parseInt(o.dataset.trailLength??"20");l.forEach((p,m)=>{if(p.classList.contains("matrix-char-bright"))(t.frameCount%45===0||t.frameCount%60===0&&Math.random()<.5)&&(p.textContent=n());else{const E=a-m-1,C=Math.max(8,Math.floor(E/2));t.frameCount%C===0&&Math.random()<.3&&(p.textContent=n())}})}),t.animationId=requestAnimationFrame(r)}t.animationId=requestAnimationFrame(r),kr(s,t)}function kr(s,e){const t=document.getElementById("terminal-output");if(t){const i=()=>{e.stopAnimation()};t.addEventListener("scroll",i,{once:!0})}const n=new MutationObserver(()=>{s.nextElementSibling&&(e.stopAnimation(),n.disconnect())});t&&n.observe(t,{childList:!0,subtree:!0});const r=new MutationObserver(()=>{document.body.contains(s)||(e.stopAnimation(),r.disconnect())});r.observe(document.body,{childList:!0,subtree:!0})}function vr(){const s=new MutationObserver(n=>{n.forEach(r=>{r.addedNodes.forEach(i=>{if(i.nodeType===Node.ELEMENT_NODE){const o=i;o.classList.contains("matrix-rain")&&Mt(o),o.querySelectorAll(".matrix-rain").forEach(a=>{Mt(a)})}})})}),e=document.getElementById("terminal-output");e&&s.observe(e,{childList:!0,subtree:!0}),document.querySelectorAll(".matrix-rain").forEach(n=>{Mt(n)})}class z{flags=new Map;positionals=[];static VALUE_FLAGS=new Set(["f","L","w"]);constructor(e){const t=[];for(const n of e)if(n.startsWith("-")&&!n.startsWith("--")&&n.length>2)for(let r=1;r<n.length;r++)t.push(`-${n[r]}`);else t.push(n);for(let n=0;n<t.length;n++){const r=t[n];if(r.startsWith("--")){const i=r.substring(2),o=t[n+1];o!==void 0&&!o.startsWith("--")&&!o.startsWith("-")?(this.flags.set(i,o),n++):this.flags.set(i,!0)}else if(r.startsWith("-")&&r.length===2){const i=r.substring(1),o=t[n+1];o!==void 0&&!o.startsWith("-")&&(z.VALUE_FLAGS.has(i)||/^\d+$/.test(o))?(this.flags.set(i,o),n++):this.flags.set(i,!0)}else this.positionals.push(r)}}getFlag(e){return this.flags.get(e)}hasFlag(e){return this.flags.has(e)}getPositional(e){return this.positionals[e]}getAllFlags(){return new Map(this.flags)}getAllPositionals(){return[...this.positionals]}get positionalCount(){return this.positionals.length}}function Or(s){return{name:"alias",description:"Create or display command aliases",execute:(e,t)=>{if(new z(e).hasFlag("help"))return{output:`Usage: alias [name='command']

Description:
  Create or display command aliases for shortening commands
  Note: 'll' is aliased to 'ls -alh' by default

Options:
  (no args)            List all defined aliases

Examples:
  alias                # List all aliases
  alias la='ls -a'     # Create an alias
  alias blog-ai='blog --tags ai'  # Alias with flags`};if(e.length===0){const a=s.getAllAliases();return a.size===0?{output:"No aliases defined."}:{output:Array.from(a.entries()).sort((m,A)=>m[0].localeCompare(A[0])).map(([m,A])=>{const E=s.isDefaultAlias(m);return`alias ${m}='${A}'${E?" (default)":""}`}).join(`
`)}}const r=e.join(" "),i=/^(\S+)=(.+)$/.exec(r);if(!i)return{output:`Usage: alias name='command'
       alias (to list all aliases)`,error:!0};const[,o,l]=i;try{return s.setAlias(o,l),{output:`Alias created: ${o}='${l}'`}}catch(a){return{output:a instanceof Error?a.message:String(a),error:!0}}}}}const Dr={name:"date",description:"Display current date and time",execute:(s,e)=>new z(s).hasFlag("help")?{output:`Usage: date

Description:
  Display the current date and time in the system's default format

Examples:
  date                 # Show current date and time`}:{output:new Date().toString()}},Pr={name:"echo",description:"Display a line of text",execute:(s,e)=>{if(new z(s).hasFlag("help"))return{output:`Usage: echo [options] [text...]

Description:
  Display a line of text or pass through stdin content

Options:
  -e                   Enable interpretation of escape sequences

Examples:
  echo "Hello World"   # Display text
  echo -e "Line1\\nLine2"  # Use escape sequences
  cat file.txt | echo  # Pass through stdin`};let n=!1;const r=[];for(const o of s)o==="-e"?n=!0:r.push(o);let i;return r.length===0&&e?(i=e,i.endsWith(`
`)&&(i=i.slice(0,-1))):i=r.join(" "),n&&(i=i.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\\\/g,"\\")),{output:i}}};function Mr(s){return{name:"env",description:"Display all environment variables",execute:(e,t)=>{if(new z(e).hasFlag("help"))return{output:`Usage: env

Description:
  Display all environment variables

Examples:
  env                  # List all variables
  env | grep PATH      # Filter variables`};try{const r=s.getAllVariables();return r.size===0?{output:""}:{output:Array.from(r.entries()).sort((l,a)=>l[0].localeCompare(a[0])).map(([l,a])=>`${l}=${a}`).join(`
`)}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Hr(s){return{name:"export",description:"Set or display environment variables",execute:(e,t)=>{if(new z(e).hasFlag("help"))return{output:`Usage: export [VAR=value] [VAR]

Description:
  Set or display environment variables

Examples:
  export               # List all variables
  export PATH=/bin     # Set variable
  export USER          # Display single variable`};try{if(e.length===0){const i=s.getAllVariables();return i.size===0?{output:""}:{output:Array.from(i.entries()).sort((a,p)=>a[0].localeCompare(p[0])).map(([a,p])=>`${a}=${p}`).join(`
`)}}const r=[];for(const i of e){const o=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(i);if(o){const[,l,a]=o;s.setVariable(l,a)}else{const l=s.getVariable(i);l!==void 0?r.push(`${i}=${l}`):r.push(`export: ${i}: not found`)}}return{output:r.join(`
`)}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Fr(s){return{name:"history",description:"Display command history",execute:(e,t)=>{if(new z(e).hasFlag("help"))return{output:`Usage: history

Description:
  Display command history with line numbers

Examples:
  history              # Show all commands`};const r=s.getHistory();return r.length===0?{output:"No commands in history."}:{output:r.map((o,l)=>`${(l+1).toString().padStart(5," ")}  ${o}`).join(`
`)}}}}function ut(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}class xn{static parse(e){if(!e.trim().startsWith("---"))return{frontmatter:null,content:e};const t=e.split(`
`),n=this.findFrontmatterEnd(t);if(n===-1)return{frontmatter:null,content:e};const r=t.slice(1,n),i=t.slice(n+1);return{frontmatter:this.parseFrontmatterLines(r),content:i.join(`
`)}}static findFrontmatterEnd(e){for(let t=1;t<e.length;t++)if(e[t].trim()==="---")return t;return-1}static parseFrontmatterLines(e){const t={};for(const n of e){const r=n.indexOf(":");if(r===-1)continue;const i=n.substring(0,r).trim(),o=n.substring(r+1).trim();if(o.startsWith("[")&&o.endsWith("]")){const l=o.substring(1,o.length-1);t[i]=l.split(",").map(a=>a.trim().replace(/^["']|["']$/g,"")).filter(a=>a.length>0)}else t[i]=o.replace(/^["']|["']$/g,"")}return t}static renderFrontmatter(e){const t=[];e.title&&typeof e.title=="string"&&t.push(`<h1 class="fm-title">${ut(e.title)}</h1>`);const n=[];if(e.date&&typeof e.date=="string"&&n.push(`<span class="fm-date">${ut(e.date)}</span>`),e.tags&&Array.isArray(e.tags)){const r=e.tags.map(i=>`<span class="fm-tag">${ut(i)}</span>`).join(" ");n.push(`<span class="fm-tags">${r}</span>`)}return n.length>0&&t.push(`<div class="fm-meta">${n.join(" • ")}</div>`),e.summary&&typeof e.summary=="string"&&t.push(`<p class="fm-summary">${ut(e.summary)}</p>`),t.length>0&&t.push('<hr class="fm-divider">'),t.join(`
`)}}function tn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Oe=tn();function er(s){Oe=s}var et={exec:()=>null};function W(s,e=""){let t=typeof s=="string"?s:s.source,n={replace:(r,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(ae.caret,"$1"),t=t.replace(r,o),n},getRegex:()=>new RegExp(t,e)};return n}var Wr=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ae={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:s=>new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}#`),htmlBeginRegex:s=>new RegExp(`^ {0,${Math.min(3,s-1)}}<(?:[a-z].*>|!--)`,"i")},Ur=/^(?:[ \t]*(?:\n|$))+/,Br=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Gr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,tt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Vr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,nn=/(?:[*+-]|\d{1,9}[.)])/,tr=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,nr=W(tr).replace(/bull/g,nn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),zr=W(tr).replace(/bull/g,nn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),rn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,jr=/^[^\n]+/,sn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Yr=W(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",sn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Xr=W(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,nn).getRegex(),It="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",on=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,qr=W("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",on).replace("tag",It).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),rr=W(rn).replace("hr",tt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",It).getRegex(),Kr=W(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",rr).getRegex(),an={blockquote:Kr,code:Br,def:Yr,fences:Gr,heading:Vr,hr:tt,html:qr,lheading:nr,list:Xr,newline:Ur,paragraph:rr,table:et,text:jr},kn=W("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",tt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",It).getRegex(),Zr={...an,lheading:zr,table:kn,paragraph:W(rn).replace("hr",tt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",kn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",It).getRegex()},Qr={...an,html:W(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",on).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:et,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:W(rn).replace("hr",tt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",nr).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Jr=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,es=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,sr=/^( {2,}|\\)\n(?!\s*$)/,ts=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,yt=/[\p{P}\p{S}]/u,ln=/[\s\p{P}\p{S}]/u,ir=/[^\s\p{P}\p{S}]/u,ns=W(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ln).getRegex(),or=/(?!~)[\p{P}\p{S}]/u,rs=/(?!~)[\s\p{P}\p{S}]/u,ss=/(?:[^\s\p{P}\p{S}]|~)/u,is=W(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Wr?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ar=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,os=W(ar,"u").replace(/punct/g,yt).getRegex(),as=W(ar,"u").replace(/punct/g,or).getRegex(),lr="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ls=W(lr,"gu").replace(/notPunctSpace/g,ir).replace(/punctSpace/g,ln).replace(/punct/g,yt).getRegex(),_s=W(lr,"gu").replace(/notPunctSpace/g,ss).replace(/punctSpace/g,rs).replace(/punct/g,or).getRegex(),cs=W("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ir).replace(/punctSpace/g,ln).replace(/punct/g,yt).getRegex(),us=W(/\\(punct)/,"gu").replace(/punct/g,yt).getRegex(),hs=W(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ds=W(on).replace("(?:-->|$)","-->").getRegex(),ms=W("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ds).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),$t=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ps=W(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",$t).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),_r=W(/^!?\[(label)\]\[(ref)\]/).replace("label",$t).replace("ref",sn).getRegex(),cr=W(/^!?\[(ref)\](?:\[\])?/).replace("ref",sn).getRegex(),fs=W("reflink|nolink(?!\\()","g").replace("reflink",_r).replace("nolink",cr).getRegex(),vn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,_n={_backpedal:et,anyPunctuation:us,autolink:hs,blockSkip:is,br:sr,code:es,del:et,emStrongLDelim:os,emStrongRDelimAst:ls,emStrongRDelimUnd:cs,escape:Jr,link:ps,nolink:cr,punctuation:ns,reflink:_r,reflinkSearch:fs,tag:ms,text:ts,url:et},$s={..._n,link:W(/^!?\[(label)\]\((.*?)\)/).replace("label",$t).getRegex(),reflink:W(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",$t).getRegex()},zt={..._n,emStrongRDelimAst:_s,emStrongLDelim:as,url:W(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",vn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:W(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",vn).getRegex()},gs={...zt,br:W(sr).replace("{2,}","*").getRegex(),text:W(zt.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ht={normal:an,gfm:Zr,pedantic:Qr},je={normal:_n,gfm:zt,breaks:gs,pedantic:$s},Ts={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},On=s=>Ts[s];function we(s,e){if(e){if(ae.escapeTest.test(s))return s.replace(ae.escapeReplace,On)}else if(ae.escapeTestNoEncode.test(s))return s.replace(ae.escapeReplaceNoEncode,On);return s}function Dn(s){try{s=encodeURI(s).replace(ae.percentDecode,"%")}catch{return null}return s}function Pn(s,e){let t=s.replace(ae.findPipe,(i,o,l)=>{let a=!1,p=o;for(;--p>=0&&l[p]==="\\";)a=!a;return a?"|":" |"}),n=t.split(ae.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(ae.slashPipe,"|");return n}function Ye(s,e,t){let n=s.length;if(n===0)return"";let r=0;for(;r<n&&s.charAt(n-r-1)===e;)r++;return s.slice(0,n-r)}function Ls(s,e){if(s.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<s.length;n++)if(s[n]==="\\")n++;else if(s[n]===e[0])t++;else if(s[n]===e[1]&&(t--,t<0))return n;return t>0?-2:-1}function Mn(s,e,t,n,r){let i=e.href,o=e.title||null,l=s[1].replace(r.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:s[0].charAt(0)==="!"?"image":"link",raw:t,href:i,title:o,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Es(s,e,t){let n=s.match(t.other.indentCodeCompensation);if(n===null)return e;let r=n[1];return e.split(`
`).map(i=>{let o=i.match(t.other.beginningSpace);if(o===null)return i;let[l]=o;return l.length>=r.length?i.slice(r.length):i}).join(`
`)}var gt=class{options;rules;lexer;constructor(s){this.options=s||Oe}space(s){let e=this.rules.block.newline.exec(s);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(s){let e=this.rules.block.code.exec(s);if(e){let t=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:Ye(t,`
`)}}}fences(s){let e=this.rules.block.fences.exec(s);if(e){let t=e[0],n=Es(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(s){let e=this.rules.block.heading.exec(s);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let n=Ye(t,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(t=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(s){let e=this.rules.block.hr.exec(s);if(e)return{type:"hr",raw:Ye(e[0],`
`)}}blockquote(s){let e=this.rules.block.blockquote.exec(s);if(e){let t=Ye(e[0],`
`).split(`
`),n="",r="",i=[];for(;t.length>0;){let o=!1,l=[],a;for(a=0;a<t.length;a++)if(this.rules.other.blockquoteStart.test(t[a]))l.push(t[a]),o=!0;else if(!o)l.push(t[a]);else break;t=t.slice(a);let p=l.join(`
`),m=p.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${p}`:p,r=r?`${r}
${m}`:m;let A=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(m,i,!0),this.lexer.state.top=A,t.length===0)break;let E=i.at(-1);if(E?.type==="code")break;if(E?.type==="blockquote"){let C=E,M=C.raw+`
`+t.join(`
`),N=this.blockquote(M);i[i.length-1]=N,n=n.substring(0,n.length-C.raw.length)+N.raw,r=r.substring(0,r.length-C.text.length)+N.text;break}else if(E?.type==="list"){let C=E,M=C.raw+`
`+t.join(`
`),N=this.list(M);i[i.length-1]=N,n=n.substring(0,n.length-E.raw.length)+N.raw,r=r.substring(0,r.length-C.raw.length)+N.raw,t=M.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:i,text:r}}}list(s){let e=this.rules.block.list.exec(s);if(e){let t=e[1].trim(),n=t.length>1,r={type:"list",raw:"",ordered:n,start:n?+t.slice(0,-1):"",loose:!1,items:[]};t=n?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=n?t:"[*+-]");let i=this.rules.other.listItemRegex(t),o=!1;for(;s;){let a=!1,p="",m="";if(!(e=i.exec(s))||this.rules.block.hr.test(s))break;p=e[0],s=s.substring(p.length);let A=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,N=>" ".repeat(3*N.length)),E=s.split(`
`,1)[0],C=!A.trim(),M=0;if(this.options.pedantic?(M=2,m=A.trimStart()):C?M=e[1].length+1:(M=e[2].search(this.rules.other.nonSpaceChar),M=M>4?1:M,m=A.slice(M),M+=e[1].length),C&&this.rules.other.blankLine.test(E)&&(p+=E+`
`,s=s.substring(E.length+1),a=!0),!a){let N=this.rules.other.nextBulletRegex(M),R=this.rules.other.hrRegex(M),x=this.rules.other.fencesBeginRegex(M),B=this.rules.other.headingBeginRegex(M),U=this.rules.other.htmlBeginRegex(M);for(;s;){let H=s.split(`
`,1)[0],D;if(E=H,this.options.pedantic?(E=E.replace(this.rules.other.listReplaceNesting,"  "),D=E):D=E.replace(this.rules.other.tabCharGlobal,"    "),x.test(E)||B.test(E)||U.test(E)||N.test(E)||R.test(E))break;if(D.search(this.rules.other.nonSpaceChar)>=M||!E.trim())m+=`
`+D.slice(M);else{if(C||A.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(A)||B.test(A)||R.test(A))break;m+=`
`+E}!C&&!E.trim()&&(C=!0),p+=H+`
`,s=s.substring(H.length+1),A=D.slice(M)}}r.loose||(o?r.loose=!0:this.rules.other.doubleBlankLine.test(p)&&(o=!0)),r.items.push({type:"list_item",raw:p,task:!!this.options.gfm&&this.rules.other.listIsTask.test(m),loose:!1,text:m,tokens:[]}),r.raw+=p}let l=r.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let a of r.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let m=this.lexer.inlineQueue.length-1;m>=0;m--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[m].src)){this.lexer.inlineQueue[m].src=this.lexer.inlineQueue[m].src.replace(this.rules.other.listReplaceTask,"");break}}let p=this.rules.other.listTaskCheckbox.exec(a.raw);if(p){let m={type:"checkbox",raw:p[0]+" ",checked:p[0]!=="[ ]"};a.checked=m.checked,r.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=m.raw+a.tokens[0].raw,a.tokens[0].text=m.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(m)):a.tokens.unshift({type:"paragraph",raw:m.raw,text:m.raw,tokens:[m]}):a.tokens.unshift(m)}}if(!r.loose){let p=a.tokens.filter(A=>A.type==="space"),m=p.length>0&&p.some(A=>this.rules.other.anyLine.test(A.raw));r.loose=m}}if(r.loose)for(let a of r.items){a.loose=!0;for(let p of a.tokens)p.type==="text"&&(p.type="paragraph")}return r}}html(s){let e=this.rules.block.html.exec(s);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(s){let e=this.rules.block.def.exec(s);if(e){let t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:e[0],href:n,title:r}}}table(s){let e=this.rules.block.table.exec(s);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let t=Pn(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(t.length===n.length){for(let o of n)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<t.length;o++)i.header.push({text:t[o],tokens:this.lexer.inline(t[o]),header:!0,align:i.align[o]});for(let o of r)i.rows.push(Pn(o,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(s){let e=this.rules.block.lheading.exec(s);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(s){let e=this.rules.block.paragraph.exec(s);if(e){let t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(s){let e=this.rules.block.text.exec(s);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(s){let e=this.rules.inline.escape.exec(s);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(s){let e=this.rules.inline.tag.exec(s);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(s){let e=this.rules.inline.link.exec(s);if(e){let t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let i=Ye(t.slice(0,-1),"\\");if((t.length-i.length)%2===0)return}else{let i=Ls(e[2],"()");if(i===-2)return;if(i>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let n=e[2],r="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(n);i&&(n=i[1],r=i[3])}else r=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?n=n.slice(1):n=n.slice(1,-1)),Mn(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(s,e){let t;if((t=this.rules.inline.reflink.exec(s))||(t=this.rules.inline.nolink.exec(s))){let n=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=e[n.toLowerCase()];if(!r){let i=t[0].charAt(0);return{type:"text",raw:i,text:i}}return Mn(t,r,t[0],this.lexer,this.rules)}}emStrong(s,e,t=""){let n=this.rules.inline.emStrongLDelim.exec(s);if(!(!n||n[3]&&t.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!t||this.rules.inline.punctuation.exec(t))){let r=[...n[0]].length-1,i,o,l=r,a=0,p=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(p.lastIndex=0,e=e.slice(-1*s.length+r);(n=p.exec(e))!=null;){if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!i)continue;if(o=[...i].length,n[3]||n[4]){l+=o;continue}else if((n[5]||n[6])&&r%3&&!((r+o)%3)){a+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+a);let m=[...n[0]][0].length,A=s.slice(0,r+n.index+m+o);if(Math.min(r,o)%2){let C=A.slice(1,-1);return{type:"em",raw:A,text:C,tokens:this.lexer.inlineTokens(C)}}let E=A.slice(2,-2);return{type:"strong",raw:A,text:E,tokens:this.lexer.inlineTokens(E)}}}}codespan(s){let e=this.rules.inline.code.exec(s);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(t),r=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return n&&r&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(s){let e=this.rules.inline.br.exec(s);if(e)return{type:"br",raw:e[0]}}del(s){let e=this.rules.inline.del.exec(s);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(s){let e=this.rules.inline.autolink.exec(s);if(e){let t,n;return e[2]==="@"?(t=e[1],n="mailto:"+t):(t=e[1],n=t),{type:"link",raw:e[0],text:t,href:n,tokens:[{type:"text",raw:t,text:t}]}}}url(s){let e;if(e=this.rules.inline.url.exec(s)){let t,n;if(e[2]==="@")t=e[0],n="mailto:"+t;else{let r;do r=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(r!==e[0]);t=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:t,href:n,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(s){let e=this.rules.inline.text.exec(s);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},Le=class jt{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Oe,this.options.tokenizer=this.options.tokenizer||new gt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:ae,block:ht.normal,inline:je.normal};this.options.pedantic?(t.block=ht.pedantic,t.inline=je.pedantic):this.options.gfm&&(t.block=ht.gfm,this.options.breaks?t.inline=je.breaks:t.inline=je.gfm),this.tokenizer.rules=t}static get rules(){return{block:ht,inline:je}}static lex(e,t){return new jt(t).lex(e)}static lexInline(e,t){return new jt(t).inlineTokens(e)}lex(e){e=e.replace(ae.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){for(this.options.pedantic&&(e=e.replace(ae.tabCharGlobal,"    ").replace(ae.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(o=>(r=o.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let o=t.at(-1);r.raw.length===1&&o!==void 0?o.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let o=t.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+r.raw,o.text+=`
`+r.text,this.inlineQueue.at(-1).src=o.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let o=t.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+r.raw,o.text+=`
`+r.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startBlock){let o=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(p=>{a=p.call({lexer:this},l),typeof a=="number"&&a>=0&&(o=Math.min(o,a))}),o<1/0&&o>=0&&(i=e.substring(0,o+1))}if(this.state.top&&(r=this.tokenizer.paragraph(i))){let o=t.at(-1);n&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+r.raw,o.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):t.push(r),n=i.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let o=t.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+r.raw,o.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):t.push(r);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let n=e,r=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,r.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+"["+"a".repeat(r[0].length-i-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let o=!1,l="";for(;e;){o||(l=""),o=!1;let a;if(this.options.extensions?.inline?.some(m=>(a=m.call({lexer:this},e,t))?(e=e.substring(a.raw.length),t.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let m=t.at(-1);a.type==="text"&&m?.type==="text"?(m.raw+=a.raw,m.text+=a.text):t.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),t.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),t.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),t.push(a);continue}let p=e;if(this.options.extensions?.startInline){let m=1/0,A=e.slice(1),E;this.options.extensions.startInline.forEach(C=>{E=C.call({lexer:this},A),typeof E=="number"&&E>=0&&(m=Math.min(m,E))}),m<1/0&&m>=0&&(p=e.substring(0,m+1))}if(a=this.tokenizer.inlineText(p)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),o=!0;let m=t.at(-1);m?.type==="text"?(m.raw+=a.raw,m.text+=a.text):t.push(a);continue}if(e){let m="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return t}},Tt=class{options;parser;constructor(s){this.options=s||Oe}space(s){return""}code({text:s,lang:e,escaped:t}){let n=(e||"").match(ae.notSpaceStart)?.[0],r=s.replace(ae.endingNewline,"")+`
`;return n?'<pre><code class="language-'+we(n)+'">'+(t?r:we(r,!0))+`</code></pre>
`:"<pre><code>"+(t?r:we(r,!0))+`</code></pre>
`}blockquote({tokens:s}){return`<blockquote>
${this.parser.parse(s)}</blockquote>
`}html({text:s}){return s}def(s){return""}heading({tokens:s,depth:e}){return`<h${e}>${this.parser.parseInline(s)}</h${e}>
`}hr(s){return`<hr>
`}list(s){let e=s.ordered,t=s.start,n="";for(let o=0;o<s.items.length;o++){let l=s.items[o];n+=this.listitem(l)}let r=e?"ol":"ul",i=e&&t!==1?' start="'+t+'"':"";return"<"+r+i+`>
`+n+"</"+r+`>
`}listitem(s){return`<li>${this.parser.parse(s.tokens)}</li>
`}checkbox({checked:s}){return"<input "+(s?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:s}){return`<p>${this.parser.parseInline(s)}</p>
`}table(s){let e="",t="";for(let r=0;r<s.header.length;r++)t+=this.tablecell(s.header[r]);e+=this.tablerow({text:t});let n="";for(let r=0;r<s.rows.length;r++){let i=s.rows[r];t="";for(let o=0;o<i.length;o++)t+=this.tablecell(i[o]);n+=this.tablerow({text:t})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:s}){return`<tr>
${s}</tr>
`}tablecell(s){let e=this.parser.parseInline(s.tokens),t=s.header?"th":"td";return(s.align?`<${t} align="${s.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:s}){return`<strong>${this.parser.parseInline(s)}</strong>`}em({tokens:s}){return`<em>${this.parser.parseInline(s)}</em>`}codespan({text:s}){return`<code>${we(s,!0)}</code>`}br(s){return"<br>"}del({tokens:s}){return`<del>${this.parser.parseInline(s)}</del>`}link({href:s,title:e,tokens:t}){let n=this.parser.parseInline(t),r=Dn(s);if(r===null)return n;s=r;let i='<a href="'+s+'"';return e&&(i+=' title="'+we(e)+'"'),i+=">"+n+"</a>",i}image({href:s,title:e,text:t,tokens:n}){n&&(t=this.parser.parseInline(n,this.parser.textRenderer));let r=Dn(s);if(r===null)return we(t);s=r;let i=`<img src="${s}" alt="${t}"`;return e&&(i+=` title="${we(e)}"`),i+=">",i}text(s){return"tokens"in s&&s.tokens?this.parser.parseInline(s.tokens):"escaped"in s&&s.escaped?s.text:we(s.text)}},cn=class{strong({text:s}){return s}em({text:s}){return s}codespan({text:s}){return s}del({text:s}){return s}html({text:s}){return s}text({text:s}){return s}link({text:s}){return""+s}image({text:s}){return""+s}br(){return""}checkbox({raw:s}){return s}},Ee=class Yt{options;renderer;textRenderer;constructor(e){this.options=e||Oe,this.options.renderer=this.options.renderer||new Tt,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new cn}static parse(e,t){return new Yt(t).parse(e)}static parseInline(e,t){return new Yt(t).parseInline(e)}parse(e){let t="";for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let o=r,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){t+=l||"";continue}}let i=r;switch(i.type){case"space":{t+=this.renderer.space(i);break}case"hr":{t+=this.renderer.hr(i);break}case"heading":{t+=this.renderer.heading(i);break}case"code":{t+=this.renderer.code(i);break}case"table":{t+=this.renderer.table(i);break}case"blockquote":{t+=this.renderer.blockquote(i);break}case"list":{t+=this.renderer.list(i);break}case"checkbox":{t+=this.renderer.checkbox(i);break}case"html":{t+=this.renderer.html(i);break}case"def":{t+=this.renderer.def(i);break}case"paragraph":{t+=this.renderer.paragraph(i);break}case"text":{t+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return t}parseInline(e,t=this.renderer){let n="";for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=l||"";continue}}let o=i;switch(o.type){case"escape":{n+=t.text(o);break}case"html":{n+=t.html(o);break}case"link":{n+=t.link(o);break}case"image":{n+=t.image(o);break}case"checkbox":{n+=t.checkbox(o);break}case"strong":{n+=t.strong(o);break}case"em":{n+=t.em(o);break}case"codespan":{n+=t.codespan(o);break}case"br":{n+=t.br(o);break}case"del":{n+=t.del(o);break}case"text":{n+=t.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Je=class{options;block;constructor(s){this.options=s||Oe}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(s){return s}postprocess(s){return s}processAllTokens(s){return s}emStrongMask(s){return s}provideLexer(){return this.block?Le.lex:Le.lexInline}provideParser(){return this.block?Ee.parse:Ee.parseInline}},As=class{defaults=tn();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Ee;Renderer=Tt;TextRenderer=cn;Lexer=Le;Tokenizer=gt;Hooks=Je;constructor(...s){this.use(...s)}walkTokens(s,e){let t=[];for(let n of s)switch(t=t.concat(e.call(this,n)),n.type){case"table":{let r=n;for(let i of r.header)t=t.concat(this.walkTokens(i.tokens,e));for(let i of r.rows)for(let o of i)t=t.concat(this.walkTokens(o.tokens,e));break}case"list":{let r=n;t=t.concat(this.walkTokens(r.items,e));break}default:{let r=n;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(i=>{let o=r[i].flat(1/0);t=t.concat(this.walkTokens(o,e))}):r.tokens&&(t=t.concat(this.walkTokens(r.tokens,e)))}}return t}use(...s){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return s.forEach(t=>{let n={...t};if(n.async=this.defaults.async||n.async||!1,t.extensions&&(t.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let i=e.renderers[r.name];i?e.renderers[r.name]=function(...o){let l=r.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:e.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[r.level];i?i.unshift(r.tokenizer):e[r.level]=[r.tokenizer],r.start&&(r.level==="block"?e.startBlock?e.startBlock.push(r.start):e.startBlock=[r.start]:r.level==="inline"&&(e.startInline?e.startInline.push(r.start):e.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(e.childTokens[r.name]=r.childTokens)}),n.extensions=e),t.renderer){let r=this.defaults.renderer||new Tt(this.defaults);for(let i in t.renderer){if(!(i in r))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,l=t.renderer[o],a=r[o];r[o]=(...p)=>{let m=l.apply(r,p);return m===!1&&(m=a.apply(r,p)),m||""}}n.renderer=r}if(t.tokenizer){let r=this.defaults.tokenizer||new gt(this.defaults);for(let i in t.tokenizer){if(!(i in r))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,l=t.tokenizer[o],a=r[o];r[o]=(...p)=>{let m=l.apply(r,p);return m===!1&&(m=a.apply(r,p)),m}}n.tokenizer=r}if(t.hooks){let r=this.defaults.hooks||new Je;for(let i in t.hooks){if(!(i in r))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,l=t.hooks[o],a=r[o];Je.passThroughHooks.has(i)?r[o]=p=>{if(this.defaults.async&&Je.passThroughHooksRespectAsync.has(i))return(async()=>{let A=await l.call(r,p);return a.call(r,A)})();let m=l.call(r,p);return a.call(r,m)}:r[o]=(...p)=>{if(this.defaults.async)return(async()=>{let A=await l.apply(r,p);return A===!1&&(A=await a.apply(r,p)),A})();let m=l.apply(r,p);return m===!1&&(m=a.apply(r,p)),m}}n.hooks=r}if(t.walkTokens){let r=this.defaults.walkTokens,i=t.walkTokens;n.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),r&&(l=l.concat(r.call(this,o))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(s){return this.defaults={...this.defaults,...s},this}lexer(s,e){return Le.lex(s,e??this.defaults)}parser(s,e){return Ee.parse(s,e??this.defaults)}parseMarkdown(s){return(e,t)=>{let n={...t},r={...this.defaults,...n},i=this.onError(!!r.silent,!!r.async);if(this.defaults.async===!0&&n.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=s),r.async)return(async()=>{let o=r.hooks?await r.hooks.preprocess(e):e,l=await(r.hooks?await r.hooks.provideLexer():s?Le.lex:Le.lexInline)(o,r),a=r.hooks?await r.hooks.processAllTokens(l):l;r.walkTokens&&await Promise.all(this.walkTokens(a,r.walkTokens));let p=await(r.hooks?await r.hooks.provideParser():s?Ee.parse:Ee.parseInline)(a,r);return r.hooks?await r.hooks.postprocess(p):p})().catch(i);try{r.hooks&&(e=r.hooks.preprocess(e));let o=(r.hooks?r.hooks.provideLexer():s?Le.lex:Le.lexInline)(e,r);r.hooks&&(o=r.hooks.processAllTokens(o)),r.walkTokens&&this.walkTokens(o,r.walkTokens);let l=(r.hooks?r.hooks.provideParser():s?Ee.parse:Ee.parseInline)(o,r);return r.hooks&&(l=r.hooks.postprocess(l)),l}catch(o){return i(o)}}}onError(s,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,s){let n="<p>An error occurred:</p><pre>"+we(t.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(t);throw t}}},ve=new As;function G(s,e){return ve.parse(s,e)}G.options=G.setOptions=function(s){return ve.setOptions(s),G.defaults=ve.defaults,er(G.defaults),G};G.getDefaults=tn;G.defaults=Oe;G.use=function(...s){return ve.use(...s),G.defaults=ve.defaults,er(G.defaults),G};G.walkTokens=function(s,e){return ve.walkTokens(s,e)};G.parseInline=ve.parseInline;G.Parser=Ee;G.parser=Ee.parse;G.Renderer=Tt;G.TextRenderer=cn;G.Lexer=Le;G.lexer=Le.lex;G.Tokenizer=gt;G.Hooks=Je;G.parse=G;G.options;G.setOptions;G.use;G.walkTokens;G.parseInline;Ee.parse;Le.lex;class Is{static render(e,t=!1){let n=e,r="";if(t){const o=xn.parse(e);n=o.content,o.frontmatter&&(r=xn.renderFrontmatter(o.frontmatter))}const i=G.parse(n);return`<div class="markdown-output">${r}${i}</div>`}}class oe{static render(e,t=!1){return Is.render(e,t)}}function ys(s){return{name:"render",description:"Render markdown file with formatting",execute:(e,t)=>{if(new z(e).hasFlag("help"))return{output:`Usage: render <file>
Or: <command> | render

Description:
  Render markdown with formatting and YAML frontmatter

Examples:
  render ~/blog/post.md   # Render file
  cat file.md | render    # Render from stdin`};let r;if(t)r=t;else if(e.length>0){const l=e[0];try{if(!s.exists(l))return{output:`render: ${l}: No such file or directory`,error:!0};if(!s.isFile(l))return{output:`render: ${l}: Is a directory`,error:!0};r=s.readFile(l)}catch(a){return{output:a instanceof Error?a.message:String(a),error:!0}}}else return{output:`render: missing file operand
Try 'render --help' for more information`,error:!0};const i=r.trim().startsWith("---");return{output:oe.render(r,i),html:!0}}}}function Rs(s){return{name:"unalias",description:"Remove command aliases",execute:(e,t)=>{if(new z(e).hasFlag("help"))return{output:`Usage: unalias <name>

Description:
  Remove a command alias

Examples:
  unalias ll           # Remove the 'll' alias`};if(e.length===0)return{output:`Usage: unalias name
Try 'unalias --help' for more information.`,error:!0};const r=e[0];return s.removeAlias(r)?{output:`Alias removed: ${r}`}:{output:`unalias: ${r}: not found`,error:!0}}}}function Ss(s){return{name:"whoami",description:"Display current username",execute:(e,t)=>new z(e).hasFlag("help")?{output:`Usage: whoami

Description:
  Display the current username

Examples:
  whoami               # Show current user`}:{output:s.getUsername()}}}function bs(s){return{name:"cat",description:"Display file contents",execute:(e,t)=>{if(new z(e).hasFlag("help"))return{output:`Usage: cat <file>

Description:
  Display file contents

Examples:
  cat file.txt         # Display file
  cat ~/blog/post.md   # Display from path
  cat file.txt | grep hello  # Use in pipeline
  echo "data" | cat    # Read from stdin`};if(e.length===0)return t!==void 0?{output:t}:{output:`cat: missing file operand
Try 'cat --help' for more information`,error:!0};try{return{output:s.readFile(e[0])}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Cs(s,e,t){return{name:"cd",description:"Change directory (supports - for previous directory)",execute:(n,r)=>{if(new z(n).hasFlag("help"))return{output:`Usage: cd [directory]

Description:
  Change current working directory

Examples:
  cd                   # Go to home directory
  cd ~/blog            # Change to blog directory
  cd -                 # Go to previous directory`};try{let o=n[0]||"~";if(o==="-"&&t){const l=t.getVariable("OLDPWD");if(!l)return{output:"cd: OLDPWD not set",error:!0};o=l}if(t){const l=t.getVariable("PWD")??s.getCurrentPath();t.setVariable("OLDPWD",l)}return s.changeDirectory(o),t&&t.setVariable("PWD",s.getCurrentPath()),e(s.getShortPath()),{output:""}}catch(o){return{output:o instanceof Error?o.message:String(o),error:!0}}}}}function ws(s,e){if(!e)return s.toString();const t=["B","K","M","G","T"];let n=s,r=0;for(;n>=1024&&r<t.length-1;)n/=1024,r++;return`${r===0?n.toString():n.toFixed(1)}${t[r]}`}function Ns(s){const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][s.getMonth()],n=s.getDate().toString().padStart(2," "),r=s.getHours().toString().padStart(2,"0"),i=s.getMinutes().toString().padStart(2,"0");return`${t} ${n} ${r}:${i}`}function Hn(s,e){const t=s.permissions??"-rw-r--r--",n="1",r=s.owner??"darin",i="staff",o=ws(s.size??0,e),l=Ns(s.modifiedTime??new Date),a=s.name,p=o.padStart(6," ");return`${t}  ${n} ${r}  ${i}  ${p} ${l} ${a}`}function xs(s){const e=s.reduce((t,n)=>t+(n.size??0),0);return Math.ceil(e/512)}function ks(s){return{name:"ls",description:"List directory contents",execute:(e,t)=>{try{const n=new z(e);if(n.hasFlag("help"))return{output:`Usage: ls [options] [path]

Description:
  List directory contents

Options:
  -a                   Show hidden files
  -l                   Long format with details
  -h                   Human-readable sizes

Examples:
  ls                   # List current directory
  ls -la               # List all files with details
  ls ~/blog            # List specific directory`};const r=n.getPositional(0)??".",i=n.hasFlag("a"),o=n.hasFlag("l"),l=n.hasFlag("h"),a=s.getNode(r);if(!a)return{output:`ls: cannot access '${r}': No such file or directory
Try 'ls --help' for more information`,error:!0};if(a.type==="file")return o?{output:Hn(a,l)}:{output:a.name};if(!a.children)return{output:""};let p=Array.from(a.children.values());return i||(p=p.filter(m=>!m.isHidden)),p.length===0?{output:""}:(p.sort((m,A)=>m.name.localeCompare(A.name)),o?{output:[`total ${xs(p)}`,...p.map(E=>Hn(E,l))].join(`
`)}:{output:p.map(A=>A.name).join("  ")})}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}function vs(s){return{name:"pwd",description:"Print working directory",execute:(e,t)=>new z(e).hasFlag("help")?{output:`Usage: pwd

Description:
  Print current working directory path

Examples:
  pwd                  # Show current directory`}:{output:s.getCurrentPath()}}}function Os(s){return{name:"tree",description:"Display directory tree structure",execute:(e,t)=>{try{const n=new z(e);if(n.hasFlag("help"))return{output:`Usage: tree [options] [path]

Description:
  Display directory tree structure

Options:
  -L <depth>           Limit tree depth (default: 4)

Examples:
  tree                 # Show tree of current directory
  tree ~/blog          # Show tree of specific directory
  tree -L 2            # Limit depth to 2 levels`};const r=n.getPositional(0)??".";let i=4;const o=n.getFlag("L");if(o!==void 0){if(typeof o=="boolean")return{output:`tree: -L flag requires a depth value
Try 'tree --help' for more information`,error:!0};const p=parseInt(o,10);if(isNaN(p)||p<1)return{output:`tree: invalid level, must be a positive integer
Try 'tree --help' for more information`,error:!0};i=p}return{output:s.getTree(r,i).join(`
`),scrollBehavior:"top"}}catch(n){return{output:n instanceof Error?n.message:String(n),error:!0}}}}}const ye={HOME_DARIN:"/home/darin",HOME_GUEST:"/home/guest",CONTENT_BLOG:"/home/darin/blog",CONTENT_PORTFOLIO:"/home/darin/portfolio",CONTENT_HELP:"/home/darin/content/help.md",CONTENT_ABOUT:"/home/darin/content/about.md",CONTENT_CONTACT:"/home/darin/content/contact.md",CONFIG_ALIASES:"/home/guest/.alias",CONFIG_SETTINGS:"/home/darin/.settings",CONFIG_ENV:"/home/darin/.env"},ur={CLEAR_SCREEN:"__CLEAR__"},Xt={SETTINGS:"terminal_settings",ENVIRONMENT:"terminal_env_vars"},Lt={EMPTY_PORTFOLIO:"No portfolio projects yet. Check back soon!",EMPTY_BLOG:"No blog posts yet. Check back soon!",NO_TAGS_AVAILABLE:"No tags available yet."},Ds={theme:{preset:"dc",customColors:void 0},font:{size:16,family:"Fira Code"},effects:{scanLines:!1,glow:!1,border:!0,animationSpeed:1,soundEffects:!1,autoScrollBehavior:!0},prompt:{format:"\\W \\$ "}};function Ps(s){return{name:"about",description:"Display bio and expertise overview",execute:(e,t)=>{if(new z(e).hasFlag("help"))return{output:`Usage: about

Description:
  Display professional bio and expertise overview

Examples:
  about                # Show bio and background`};try{const r=s.readFile(ye.CONTENT_ABOUT);return{output:oe.render(r),html:!0,scrollBehavior:"top"}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Ms(s){if(typeof s!="object"||s===null)return!1;const e=s;return typeof e.title=="string"&&typeof e.date=="string"&&typeof e.summary=="string"&&Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string")}class hr{static parseFrontmatter(e){const t=e.split(`
`);if(t[0]?.trim()!=="---")throw new Error("Invalid frontmatter: must start with ---");let n=-1;for(let l=1;l<t.length;l++)if(t[l].trim()==="---"){n=l;break}if(n===-1)throw new Error("Invalid frontmatter: no closing ---");const r=t.slice(1,n),i=t.slice(n+1),o={};for(const l of r){const a=l.indexOf(":");if(a===-1)continue;const p=l.substring(0,a).trim(),m=l.substring(a+1).trim();if(m.startsWith("[")&&m.endsWith("]")){const A=m.substring(1,m.length-1);o[p]=A.split(",").map(E=>E.trim().replace(/^["']|["']$/g,"")).filter(E=>E.length>0)}else o[p]=m.replace(/^["']|["']$/g,"")}if(!Ms(o)){const l=[];throw o.title||l.push("title"),o.date||l.push("date"),o.summary||l.push("summary"),Array.isArray(o.tags)||l.push("tags"),new Error(`Invalid blog frontmatter: missing or invalid fields: ${l.join(", ")}`)}return{frontmatter:o,markdown:i.join(`
`).trim()}}static parseBlogPost(e,t){const{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:e.replace(/^\d{4}-\d{2}-\d{2}-/,"").replace(/\.md$/,""),title:n.title,date:n.date,summary:n.summary,content:r,tags:n.tags}}static getIdFromFilename(e){return e.replace(/^\d{4}-\d{2}-\d{2}-/,"").replace(/\.md$/,"")}}class Et{static formatClickableTag(e,t){return`<button data-command="${t==="portfolio"?`portfolio --tags ${e}`:`blog --tags ${e}`}" class="tag-link">${e}</button>`}static formatPortfolioList(e,t){const n=t?`# Portfolio - Tag: ${t}`:"# Portfolio",r=e.map((o,l)=>{const a=o.tags?.map(m=>this.formatClickableTag(m,"portfolio")).join(" ")??"",p=a?`

**Tags:** ${a}`:"";return`### <a href="/portfolio/${o.id}" data-command="portfolio ${o.id}">${l+1}. ${o.title} (${o.year})</a>

${o.summary}${p}
`}).join(`

---

`);return`${n}

${r}${t?`

---

<a href="/portfolio" data-command="portfolio">← Back to All Projects</a>`:"\n\n---\n\n**Filter by tag:** Type `portfolio --tags <tag>` or `portfolio --tags` to list all tags"}`}static formatPortfolioDetail(e){const t=e.technologies.join(", "),n=e.impact?`**Impact:** ${e.impact}

`:"",r=e.tags?.map(o=>this.formatClickableTag(o,"portfolio")).join(" ")??"",i=r?`**Tags:** ${r}

`:"";return`# ${e.title}

**Year:** ${e.year}

${e.description}

**Technologies:** ${t}

${n}${i}---

<a href="/portfolio" data-command="portfolio">← Back to Portfolio</a>`}static formatBlogList(e,t){const n=t?`# Blog Posts - Tag: ${t}`:"# Blog Posts",r=e.map((o,l)=>{const a=o.tags.map(m=>this.formatClickableTag(m,"blog")).join(" "),p=e.length-l;return`### <a href="/blog/${o.id}" data-command="blog ${o.id}">${p}. ${o.title}</a>

**Date:** ${o.date}

${o.summary}

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

<a href="/blog" data-command="blog">← Back to Blog</a>`}}function Hs(s){return{name:"blog",description:"List and read blog posts",execute:(e,t)=>{const n=new z(e);if(n.hasFlag("help"))return{output:`Usage: blog [options] [post-id|number]

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
  blog post-id                  # Read specific post by ID`};const r=ye.CONTENT_BLOG;try{const o=s.list(r).filter(N=>N.endsWith(".md")).sort().reverse(),l=n.getFlag("tags"),a=n.hasFlag("tags"),p=n.getPositional(0),m=[];for(const N of o){const R=s.readFile(`${r}/${N}`),x=hr.parseBlogPost(N,R);m.push(x)}if(m.length===0&&!a&&!p){const N=`# Blog

${Lt.EMPTY_BLOG}`;return{output:oe.render(N),html:!0,scrollBehavior:"top"}}if(a&&(typeof l=="boolean"||!l)){const N=new Set,R=new Map;m.forEach(D=>{D.tags?.forEach(V=>{N.add(V),R.set(V,(R.get(V)??0)+1)})});const x=Array.from(N).sort();if(x.length===0){const D=`# Blog Tags

${Lt.NO_TAGS_AVAILABLE}`;return{output:oe.render(D),html:!0,scrollBehavior:"top"}}const U=`# Blog Tags

${x.map(D=>{const V=R.get(D)??0;return`- <button data-command="blog --tags ${D}" class="tag-link">${D}</button> (${V} post${V!==1?"s":""})`}).join(`
`)}

---

**Usage:** Type \`blog --tags <tag>\` to filter posts`;return{output:oe.render(U),html:!0,scrollBehavior:"top"}}if(p){let N;const R=parseInt(p,10);if(!isNaN(R)&&R>0&&R<=m.length){const U=m.length-R;N=m[U]}else N=m.find(U=>U.id===p);if(!N)return{output:`Blog post '${p}' not found.
Use 'blog' to list all posts.
Try 'blog --help' for more information`,error:!0};const x=Et.formatBlogPost(N);return{output:oe.render(x),html:!0,scrollBehavior:"top"}}let A=m;const E=typeof l=="string"?l:void 0;if(E&&(A=m.filter(N=>N.tags.some(R=>R.toLowerCase()===E.toLowerCase())),A.length===0)){const N=new Map;m.forEach(B=>{B.tags?.forEach(U=>{N.set(U,(N.get(U)??0)+1)})});const R=Array.from(N.entries()).sort((B,U)=>U[1]-B[1]).slice(0,5).map(([B])=>B),x=R.length>0?`
Try one of these tags: ${R.join(", ")}`:"";return{output:`No blog posts found with tag '${E}'.${x}
Use 'blog' to see all posts.`,error:!1}}const C=Et.formatBlogList(A,E);return{output:oe.render(C),html:!0,scrollBehavior:"top"}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}}}function Fs(s){return{name:"contact",description:"Display contact information",execute:(e,t)=>{if(new z(e).hasFlag("help"))return{output:`Usage: contact

Description:
  Display contact information and professional links

Examples:
  contact              # Show contact details`};try{const r=s.readFile(ye.CONTENT_CONTACT);return{output:oe.render(r),html:!0}}catch(r){return{output:r instanceof Error?r.message:String(r),error:!0}}}}}function Ws(s){if(typeof s!="object"||s===null)return!1;const e=s;return typeof e.id=="string"&&typeof e.title=="string"&&typeof e.summary=="string"&&typeof e.year=="string"&&typeof e.order=="number"&&Array.isArray(e.technologies)&&e.technologies.every(t=>typeof t=="string")&&(e.impact===void 0||typeof e.impact=="string")&&(e.tags===void 0||Array.isArray(e.tags)&&e.tags.every(t=>typeof t=="string"))}class Us{static parseFrontmatter(e){const t=e.split(`
`);if(t[0]?.trim()!=="---")throw new Error("Invalid frontmatter: must start with ---");let n=-1;for(let l=1;l<t.length;l++)if(t[l].trim()==="---"){n=l;break}if(n===-1)throw new Error("Invalid frontmatter: no closing ---");const r=t.slice(1,n),i=t.slice(n+1),o={};for(const l of r){const a=l.indexOf(":");if(a===-1)continue;const p=l.substring(0,a).trim(),m=l.substring(a+1).trim();if(m.startsWith("[")&&m.endsWith("]")){const A=m.substring(1,m.length-1);o[p]=A.split(",").map(E=>E.trim().replace(/^["']|["']$/g,"")).filter(E=>E.length>0)}else{const A=m.replace(/^["']|["']$/g,"");if(p==="order"){const E=Number(A);o[p]=isNaN(E)?A:E}else o[p]=A}}if(!Ws(o)){const l=[];throw o.id||l.push("id"),o.title||l.push("title"),o.summary||l.push("summary"),o.year||l.push("year"),typeof o.order!="number"&&l.push("order"),Array.isArray(o.technologies)||l.push("technologies"),new Error(`Invalid portfolio frontmatter: missing or invalid fields: ${l.join(", ")}`)}return{frontmatter:o,markdown:i.join(`
`).trim()}}static parseProject(e,t){const{frontmatter:n,markdown:r}=this.parseFrontmatter(t);return{id:n.id||e.replace(/\.md$/,""),title:n.title,summary:n.summary,description:r,technologies:n.technologies,impact:n.impact,year:n.year,order:n.order,tags:n.tags}}static getIdFromFilename(e){return e.replace(/\.md$/,"")}}function Bs(s){return{name:"portfolio",description:"Showcase projects and accomplishments",execute:(e,t)=>{const n=new z(e);if(n.hasFlag("help"))return{output:`Usage: portfolio [options] [project-id|number]

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
  portfolio proj-id             # View specific project by ID`};const r=ye.CONTENT_PORTFOLIO;try{const o=s.list(r).filter(R=>R.endsWith(".md")),l=n.getFlag("tags"),a=n.hasFlag("tags"),p=n.getPositional(0),m=[];for(const R of o){const x=s.readFile(`${r}/${R}`);if(x)try{const B=Us.parseProject(R,x);m.push(B)}catch(B){console.error(`Error parsing ${R}:`,B)}}if(m.sort((R,x)=>R.order!==x.order?R.order-x.order:R.title.localeCompare(x.title)),m.length===0&&!a&&!p){const R=`# Portfolio

${Lt.EMPTY_PORTFOLIO}`;return{output:oe.render(R),html:!0,scrollBehavior:"top"}}if(a&&(typeof l=="boolean"||!l)){const R=new Set,x=new Map;m.forEach(V=>{V.tags?.forEach(ee=>{R.add(ee),x.set(ee,(x.get(ee)??0)+1)})});const B=Array.from(R).sort();if(B.length===0){const V=`# Portfolio Tags

${Lt.NO_TAGS_AVAILABLE}`;return{output:oe.render(V),html:!0,scrollBehavior:"top"}}const H=`# Portfolio Tags

${B.map(V=>{const ee=x.get(V)??0;return`- <button data-command="portfolio --tags ${V}" class="tag-link">${V}</button> (${ee} project${ee!==1?"s":""})`}).join(`
`)}

---

**Usage:** Type \`portfolio --tags <tag>\` to filter projects`;return{output:oe.render(H),html:!0,scrollBehavior:"top"}}if(p){let R;const x=parseInt(p,10);if(!isNaN(x)&&x>0&&x<=m.length){const H=x-1;R=m[H]}else R=m.find(H=>H.id===p);if(!R)return{output:`Project '${p}' not found.
Use 'portfolio' to list all projects.
Try 'portfolio --help' for more information`,error:!0};const B=Et.formatPortfolioDetail(R);return{output:oe.render(B),html:!0,scrollBehavior:"top"}}let A=m,E=[];if(a&&typeof l=="string"&&(E=l.split(",").map(R=>R.trim().toLowerCase()),A=m.filter(R=>R.tags?.some(x=>E.includes(x.toLowerCase()))),A.length===0)){const R=E.map(H=>`'${H}'`).join(", "),x=new Map;m.forEach(H=>{H.tags?.forEach(D=>{x.set(D,(x.get(D)??0)+1)})});const B=Array.from(x.entries()).sort((H,D)=>D[1]-H[1]).slice(0,5).map(([H])=>H),U=B.length>0?`
Try one of these tags: ${B.join(", ")}`:"";return{output:`No projects found with tag${E.length>1?"s":""} ${R}.${U}
Use 'portfolio' to see all projects.`,error:!1}}const C=E.length>0?E.join(", "):void 0,M=Et.formatPortfolioList(A,C);return{output:oe.render(M),html:!0,scrollBehavior:"top"}}catch(i){return{output:`Error loading portfolio: ${String(i)}`,error:!0}}}}}function dr(s,e){const t=s.loadSettings(),n=e.getPresets();return`<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true"><h2>Terminal Settings</h2><section class="settings-section"><h3>Color Theme</h3>${Gs(n,t.theme.preset)}</section><section class="settings-section"><details ${t.theme.preset==="custom"?"open":""}><summary>Advanced: Custom Colors</summary>${Vs(t.theme.customColors)}</details></section><section class="settings-section"><h3>Font</h3>${zs(t.font)}</section><section class="settings-section"><h3>Effects</h3>${js(t.effects)}</section><div class="settings-actions"><button data-command="settings reset" class="btn-reset">Reset to Defaults</button></div></aside>`}function Gs(s,e){return'<div class="theme-buttons-container">'+s.map(t=>`<button class="theme-button ${t.name===e?"active":""}" data-command="settings set theme ${t.name}" data-theme="${t.name}" style="background: ${t.colors["--terminal-bg"]}; color: ${t.colors["--terminal-accent"]}; border-color: ${t.colors["--terminal-accent"]};"><span class="theme-preview" style="background: ${t.colors["--terminal-accent"]}"></span>${t.displayName}</button>`).join("")+"</div>"}function Vs(s){return[{key:"--terminal-bg",label:"Background",prop:"background"},{key:"--terminal-bg-secondary",label:"BG (Secondary)",prop:"backgroundSecondary"},{key:"--terminal-fg",label:"Foreground",prop:"foreground"},{key:"--terminal-accent",label:"Accent",prop:"accent"},{key:"--terminal-dim",label:"Dim",prop:"dim"},{key:"--terminal-error",label:"Error",prop:"error"},{key:"--terminal-cursor",label:"Cursor",prop:"cursor"}].map(t=>{const n=s?.[t.prop]??(typeof window<"u"?getComputedStyle(document.documentElement).getPropertyValue(t.key).trim():"#000000");return`<div class="color-picker-group"><label>${t.label}</label><input type="color" value="${n}" data-command-template="settings set color ${t.key}" data-color-var="${t.key}"/><span class="color-value">${s?.[t.prop]??"default"}</span></div>`}).join("")}function zs(s){const e=["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"];return`<div class="setting-group"><label>Font Size: <span id="font-size-value">${s.size}px</span></label><input type="range" min="8" max="24" step="1" value="${s.size}" aria-label="Font size" aria-valuemin="8" aria-valuemax="24" aria-valuenow="${s.size}" aria-valuetext="${s.size} pixels" data-command-template="settings set font-size" data-setting-type="font-size"/></div><div class="setting-group"><label>Font Family</label><select aria-label="Font family" data-command-template="settings set font-family" data-setting-type="font-family">${e.map(t=>`<option value="${t}" ${t===s.family?"selected":""}>${t}</option>`).join("")}</select></div>`}function js(s){return`<div class="setting-group"><label><input type="checkbox" ${s.scanLines?"checked":""} data-command-template="settings set scan-lines" data-setting-type="scan-lines"/>Scan Lines</label></div><div class="setting-group"><label><input type="checkbox" ${s.glow?"checked":""} data-command-template="settings set glow" data-setting-type="glow"/>Glow Effect</label></div><div class="setting-group"><label><input type="checkbox" ${s.border?"checked":""} data-command-template="settings set border" data-setting-type="border"/>Page Border</label></div><div class="setting-group"><label>Animation Speed: <span id="animation-speed-value">${s.animationSpeed}x</span></label><input type="range" min="0.5" max="2.0" step="0.1" value="${s.animationSpeed}" aria-label="Animation speed" aria-valuemin="0.5" aria-valuemax="2" aria-valuenow="${s.animationSpeed}" aria-valuetext="${s.animationSpeed} times speed" data-command-template="settings set animation-speed" data-setting-type="animation-speed"/></div><div class="setting-group"><label><input type="checkbox" ${s.soundEffects?"checked":""} data-command-template="settings set sound-effects" data-setting-type="sound-effects"/>Sound Effects (future feature)</label></div>`}function Ys(s,e,t){return{name:"settings",description:"Manage terminal settings and preferences",aliases:["preferences","config"],execute:(n,r)=>{const i=new z(n);if(i.hasFlag("help"))return{output:`Usage: settings [subcommand] [options]

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
  settings reset       # Reset all settings`};if(n.length===0)return{output:dr(e,t),html:!0};const o=i.getPositional(0);switch(o){case"list":return Xs(e,t);case"set":return Fn(i,e,t);case"reset":return qs(e,t);case"theme":case"font-size":case"font-family":case"fontSize":case"fontFamily":case"scan-lines":case"scanLines":case"glow":case"border":case"animation-speed":case"animationSpeed":case"sound":case"auto-scroll":case"autoScroll":case"prompt":return Fn(new z(["set",o,...n.slice(1)]),e,t);default:return{output:`Unknown subcommand: ${o}.
Try 'settings --help' for more information`,error:!0}}}}}function Xs(s,e){const t=Ks(s,e);return{output:oe.render(t),html:!0}}function Fn(s,e,t){const n=s.getPositional(1),r=s.getPositional(2);if(!n)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};if(n!=="color"&&!r)return{output:`Usage: settings set <setting> <value>
Try 'settings --help' for more information`,error:!0};try{switch(n){case"theme":{const i=["green","yellow","white","light-blue","paper","dc"];return i.includes(r)?(e.setSetting("theme",{preset:r}),t.applyTheme(r),fe(),{output:`Theme changed to: ${r}`}):{output:`Invalid theme: ${r}. Available: ${i.join(", ")}`,error:!0}}case"color":{const i=["terminal-bg","terminal-fg","terminal-accent","terminal-dim","terminal-error","terminal-cursor","terminal-bg-secondary"];let o,l;for(const p of i){const m=s.getFlag(p);if(m&&typeof m=="string"){o="--"+p,l=m;break}}if(!o||!l)return{output:`Usage: settings set color <variable> <value>
Example: settings set color --terminal-accent #ff0000`,error:!0};const a={[o]:l};return t.applyCustomColors(a),fe(),{output:`Color ${o} set to ${l}`}}case"font-size":case"fontSize":{if(!r)return{output:"Font size value required",error:!0};const i=parseInt(r,10);return isNaN(i)?{output:"Font size must be a number (8-24)",error:!0}:(e.setFontSize(i),qt(e),fe(),{output:`Font size set to: ${i}px`})}case"font-family":case"fontFamily":{if(!r)return{output:"Font family value required",error:!0};const i=["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"];return i.includes(r)?(e.setFontFamily(r),qt(e),fe(),{output:`Font family set to: ${r}`}):{output:`Invalid font family: ${r}. Available: ${i.join(", ")}`,error:!0}}case"scan-lines":case"scanLines":{if(!r)return{output:"Scan lines value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Scan lines must be "on" or "off"',error:!0};const i=r==="on";return e.setScanLines(i),mr(i),fe(),{output:`Scan lines: ${r}`}}case"glow":{if(!r)return{output:"Glow value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Glow must be "on" or "off"',error:!0};const i=r==="on";return e.setGlow(i),pr(i),fe(),{output:`Glow: ${r}`}}case"border":{if(!r)return{output:"Border value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Border must be "on" or "off"',error:!0};const i=r==="on";return e.setBorder(i),fr(i),fe(),{output:`Border: ${r}`}}case"animation-speed":case"animationSpeed":{if(!r)return{output:"Animation speed value required",error:!0};const i=parseFloat(r);return isNaN(i)?{output:"Animation speed must be a number (0.5-2.0)",error:!0}:(e.setAnimationSpeed(i),$r(i),fe(),{output:`Animation speed set to: ${i}x`})}case"sound-effects":case"sound":{if(!r)return{output:"Sound effects value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Sound effects must be "on" or "off"',error:!0};const i=r==="on";return e.setSoundEffects(i),fe(),{output:`Sound effects: ${r}`}}case"autoscroll":case"auto-scroll":case"autoScroll":{if(!r)return{output:"Autoscroll value required (on/off)",error:!0};if(r!=="on"&&r!=="off")return{output:'Autoscroll must be "on" or "off"',error:!0};const i=r==="on";return e.setAutoScrollBehavior(i),fe(),{output:`Autoscroll: ${r} - ${i?"Long content (>50 lines) scrolls to command line":"All content scrolls to bottom"}`}}case"prompt":return r?(e.setPromptFormat(r),fe(),{output:`Prompt format set to: ${r}`}):{output:"Prompt format value required",error:!0};default:return{output:`Unknown setting: ${n}. Available: theme, color, font-size, font-family, scan-lines, glow, border, animation-speed, sound-effects, autoscroll, prompt`,error:!0}}}catch(i){return{output:i instanceof Error?i.message:String(i),error:!0}}}function qs(s,e){return s.reset(),e.applyCurrentTheme(),qt(s),mr(s.getScanLines()),pr(s.getGlow()),fr(s.getBorder()),$r(s.getAnimationSpeed()),fe(),{output:"Settings reset to defaults."}}function Ks(s,e){const t=s.loadSettings(),n=e.getPresets();return`# Terminal Settings

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
`}function qt(s){const e=s.getSetting("font");typeof document<"u"&&(document.documentElement.style.setProperty("--terminal-font-size",`${e.size}px`),document.documentElement.style.setProperty("--terminal-font-family",e.family))}function mr(s){typeof document<"u"&&(s?document.body.classList.remove("no-scan-lines"):document.body.classList.add("no-scan-lines"))}function pr(s){typeof document<"u"&&(s?document.body.classList.remove("no-glow"):document.body.classList.add("no-glow"))}function fr(s){typeof document<"u"&&(s?document.body.classList.add("border-enabled"):document.body.classList.remove("border-enabled"))}function $r(s){typeof document<"u"&&document.documentElement.style.setProperty("--terminal-animation-speed",s.toString())}function fe(){if(typeof document<"u"){const s=new CustomEvent("settings-changed");document.dispatchEvent(s)}}const Zs=["Chaos","Discord","Confusion","Bureaucracy","The Aftermath"],Qs=["Sweetmorn","Boomtime","Pungenday","Prickle-Prickle","Setting Orange"],Js=["Mungday","Mojoday","Syadday","Zaraday","Malbowday"],Wn=73,ei=1166;function Kt(s){return s%4===0&&s%100!==0||s%400===0}function ti(s,e,t){const n=[31,28,31,30,31,30,31,31,30,31,30,31];Kt(s)&&(n[1]=29);let r=t;for(let i=0;i<e-1;i++)r+=n[i];return r}function ni(s){const e=s.getFullYear(),t=s.getMonth()+1,n=s.getDate(),r=e+ei,i=ti(e,t,n);if(Kt(e)&&t===2&&n===29)return{weekday:"",season:"",dayOfSeason:0,yold:r,isStTibsDay:!0};let o=i;Kt(e)&&i>60&&(o=i-1);const l=Math.floor((o-1)/Wn),a=Zs[l],p=(o-1)%Wn+1,m=(o-1)%5,A=Qs[m],E=p===5?Js[l]:void 0;return{weekday:A,season:a,dayOfSeason:p,yold:r,isStTibsDay:!1,apostleDay:E}}function ri(s){return s.isStTibsDay?`St. Tib's Day, ${s.yold} YOLD`:s.apostleDay?`${s.weekday}, ${s.apostleDay}, day ${s.dayOfSeason} of ${s.season}, ${s.yold} YOLD`:`${s.weekday}, ${s.season} ${s.dayOfSeason}, ${s.yold} YOLD`}function si(s){if(/^\d{4}-\d{2}-\d{2}$/.test(s)){const e=new Date(s);if(!isNaN(e.getTime()))return e}if(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)){const e=new Date(s);if(!isNaN(e.getTime()))return e}return null}function ii(s,e,t){if(s<1||s>31||e<1||e>12||t<1)return null;const n=new Date(t,e-1,s);return isNaN(n.getTime())?null:n}const oi={name:"ddate",description:"Display date in Discordian calendar",execute:(s,e)=>{const t=new z(s);if(t.hasFlag("help"))return{output:`Usage: ddate [DATE]

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
  --help                   Display this help message`};let n;if(t.positionalCount===0)n=new Date;else if(t.positionalCount===1){const o=t.getPositional(0),l=si(o);if(!l)return{output:`ddate: invalid date '${o}'`,error:!0};n=l}else if(t.positionalCount===3){const o=parseInt(t.getPositional(0),10),l=parseInt(t.getPositional(1),10),a=parseInt(t.getPositional(2),10);if(isNaN(l)||isNaN(o)||isNaN(a))return{output:"ddate: invalid numeric date arguments",error:!0};const p=ii(l,o,a);if(!p)return{output:`ddate: invalid date ${o}/${l}/${a}`,error:!0};n=p}else return{output:`ddate: invalid arguments
Try 'ddate --help' for more information.`,error:!0};const r=ni(n);return{output:ri(r)}}},ai={FULL_WIDTH:0,FITTING:1,SMUSHING:2,CONTROLLED_SMUSHING:3};class li{constructor(){this.comment="",this.numChars=0,this.options={}}}const Ht=["1Row","3-D","3D Diagonal","3D-ASCII","3x5","4Max","5 Line Oblique","AMC 3 Line","AMC 3 Liv1","AMC AAA01","AMC Neko","AMC Razor","AMC Razor2","AMC Slash","AMC Slider","AMC Thin","AMC Tubes","AMC Untitled","ANSI Regular","ANSI Shadow","ANSI-Compact","ASCII 12","ASCII 9","ASCII New Roman","Acrobatic","Alligator","Alligator2","Alpha","Alphabet","Arrows","Avatar","B1FF","Babyface Lame","Babyface Leet","Banner","Banner3-D","Banner3","Banner4","Barbwire","Basic","Bear","Bell","Benjamin","Big ASCII 12","Big ASCII 9","Big Chief","Big Money-ne","Big Money-nw","Big Money-se","Big Money-sw","Big Mono 12","Big Mono 9","Big","Bigfig","Binary","Block","Blocks","Bloody","BlurVision ASCII","Bolger","Braced","Bright","Broadway KB","Broadway","Bubble","Bulbhead","Caligraphy","Caligraphy2","Calvin S","Cards","Catwalk","Chiseled","Chunky","Circle","Coinstak","Cola","Colossal","Computer","Contessa","Contrast","Cosmike","Cosmike2","Crawford","Crawford2","Crazy","Cricket","Cursive","Cyberlarge","Cybermedium","Cybersmall","Cygnet","DANC4","DOS Rebel","DWhistled","Dancing Font","Decimal","Def Leppard","Delta Corps Priest 1","DiamFont","Diamond","Diet Cola","Digital","Doh","Doom","Dot Matrix","Double Shorts","Double","Dr Pepper","Efti Chess","Efti Font","Efti Italic","Efti Piti","Efti Robot","Efti Wall","Efti Water","Electronic","Elite","Emboss 2","Emboss","Epic","Fender","Filter","Fire Font-k","Fire Font-s","Flipped","Flower Power","Four Tops","Fraktur","Fun Face","Fun Faces","Future","Fuzzy","Georgi16","Georgia11","Ghost","Ghoulish","Glenyn","Goofy","Gothic","Graceful","Gradient","Graffiti","Greek","Heart Left","Heart Right","Henry 3D","Hex","Hieroglyphs","Hollywood","Horizontal Left","Horizontal Right","ICL-1900","Impossible","Invita","Isometric1","Isometric2","Isometric3","Isometric4","Italic","Ivrit","JS Block Letters","JS Bracket Letters","JS Capital Curves","JS Cursive","JS Stick Letters","Jacky","Jazmine","Jerusalem","Katakana","Kban","Keyboard","Knob","Konto Slant","Konto","LCD","Larry 3D 2","Larry 3D","Lean","Letter","Letters","Lil Devil","Line Blocks","Linux","Lockergnome","Madrid","Marquee","Maxfour","Merlin1","Merlin2","Mike","Mini","Mirror","Mnemonic","Modular","Mono 12","Mono 9","Morse","Morse2","Moscow","Mshebrew210","Muzzle","NScript","NT Greek","NV Script","Nancyj-Fancy","Nancyj-Improved","Nancyj-Underlined","Nancyj","Nipples","O8","OS2","Octal","Ogre","Old Banner","Pagga","Patorjk's Cheese","Patorjk-HeX","Pawp","Peaks Slant","Peaks","Pebbles","Pepper","Poison","Puffy","Puzzle","Pyramid","Rammstein","Rebel","Rectangles","Red Phoenix","Relief","Relief2","Reverse","Roman","Rot13","Rotated","Rounded","Rowan Cap","Rozzo","RubiFont","Runic","Runyc","S Blood","SL Script","Santa Clara","Script","Serifcap","Shaded Blocky","Shadow","Shimrod","Short","Slant Relief","Slant","Slide","Small ASCII 12","Small ASCII 9","Small Block","Small Braille","Small Caps","Small Isometric1","Small Keyboard","Small Mono 12","Small Mono 9","Small Poison","Small Script","Small Shadow","Small Slant","Small Tengwar","Small","Soft","Speed","Spliff","Stacey","Stampate","Stampatello","Standard","Star Strips","Star Wars","Stellar","Stforek","Stick Letters","Stop","Straight","Stronger Than All","Sub-Zero","Swamp Land","Swan","Sweet","THIS","Tanja","Tengwar","Term","Terrace","Test1","The Edge","Thick","Thin","Thorned","Three Point","Ticks Slant","Ticks","Tiles","Tinker-Toy","Tmplr","Tombstone","Train","Trek","Tsalagi","Tubular","Twisted","Two Point","USA Flag","Univers","Upside Down Text","Varsity","Wavescape","Wavy","Weird","Wet Letter","Whimsy","WideTerm","Wow","miniwi"];function _i(s){return/[.*+?^${}()|[\]\\]/.test(s)?"\\"+s:s}const nt=(()=>{const{FULL_WIDTH:s=0,FITTING:e,SMUSHING:t,CONTROLLED_SMUSHING:n}=ai,r={},i={font:"Standard",fontPath:"./fonts",fetchFontIfMissing:!0};function o(h,d,_){const u=_i(h.trim().slice(-1))||"@",f=d===_-1?new RegExp(u+u+"?\\s*$"):new RegExp(u+"\\s*$");return h.replace(f,"")}function l(h=-1,d=null){let _={},u,f=[[16384,"vLayout",t],[8192,"vLayout",e],[4096,"vRule5",!0],[2048,"vRule4",!0],[1024,"vRule3",!0],[512,"vRule2",!0],[256,"vRule1",!0],[128,"hLayout",t],[64,"hLayout",e],[32,"hRule6",!0],[16,"hRule5",!0],[8,"hRule4",!0],[4,"hRule3",!0],[2,"hRule2",!0],[1,"hRule1",!0]];u=d!==null?d:h;for(const[g,T,L]of f)u>=g?(u-=g,_[T]===void 0&&(_[T]=L)):T!=="vLayout"&&T!=="hLayout"&&(_[T]=!1);return typeof _.hLayout>"u"?h===0?_.hLayout=e:h===-1?_.hLayout=s:_.hRule1||_.hRule2||_.hRule3||_.hRule4||_.hRule5||_.hRule6?_.hLayout=n:_.hLayout=t:_.hLayout===t&&(_.hRule1||_.hRule2||_.hRule3||_.hRule4||_.hRule5||_.hRule6)&&(_.hLayout=n),typeof _.vLayout>"u"?_.vRule1||_.vRule2||_.vRule3||_.vRule4||_.vRule5?_.vLayout=n:_.vLayout=s:_.vLayout===t&&(_.vRule1||_.vRule2||_.vRule3||_.vRule4||_.vRule5)&&(_.vLayout=n),_}function a(h,d,_=""){return h===d&&h!==_?h:!1}function p(h,d){let _="|/\\[]{}()<>";if(h==="_"){if(_.indexOf(d)!==-1)return d}else if(d==="_"&&_.indexOf(h)!==-1)return h;return!1}function m(h,d){let _="| /\\ [] {} () <>",u=_.indexOf(h),f=_.indexOf(d);if(u!==-1&&f!==-1&&u!==f&&Math.abs(u-f)!==1){const g=Math.max(u,f),T=g+1;return _.substring(g,T)}return!1}function A(h,d){let _="[] {} ()",u=_.indexOf(h),f=_.indexOf(d);return u!==-1&&f!==-1&&Math.abs(u-f)<=1?"|":!1}function E(h,d){return{"/\\":"|","\\/":"Y","><":"X"}[h+d]||!1}function C(h,d,_=""){return h===_&&d===_?_:!1}function M(h,d){return h===d?h:!1}function N(h,d){return p(h,d)}function R(h,d){return m(h,d)}function x(h,d){return h==="-"&&d==="_"||h==="_"&&d==="-"?"=":!1}function B(h,d){return h==="|"&&d==="|"?"|":!1}function U(h,d,_){return d===" "||d===""||d===_&&h!==" "?h:d}function H(h,d,_){if(_.fittingRules&&_.fittingRules.vLayout===s)return"invalid";let u,f=Math.min(h.length,d.length),g,T,L=!1,I;if(f===0)return"invalid";for(u=0;u<f;u++)if(g=h.substring(u,u+1),T=d.substring(u,u+1),g!==" "&&T!==" "){if(_.fittingRules&&_.fittingRules.vLayout===e)return"invalid";if(_.fittingRules&&_.fittingRules.vLayout===t)return"end";if(B(g,T)){L=L||!1;continue}if(I=!1,I=_.fittingRules&&_.fittingRules.vRule1?M(g,T):I,I=!I&&_.fittingRules&&_.fittingRules.vRule2?N(g,T):I,I=!I&&_.fittingRules&&_.fittingRules.vRule3?R(g,T):I,I=!I&&_.fittingRules&&_.fittingRules.vRule4?x(g,T):I,L=!0,!I)return"invalid"}return L?"end":"valid"}function D(h,d,_){let u=h.length,f=h.length,g,T,L,I=1,b,v,w;for(;I<=u;){for(g=h.slice(Math.max(0,f-I),f),T=d.slice(0,Math.min(u,I)),L=T.length,w="",b=0;b<L;b++)if(v=H(g[b],T[b],_),v==="end")w=v;else if(v==="invalid"){w=v;break}else w===""&&(w="valid");if(w==="invalid"){I--;break}if(w==="end")break;w==="valid"&&I++}return Math.min(u,I)}function V(h,d,_){let u,f=Math.min(h.length,d.length),g,T,L="",I;const b=_.fittingRules||{};for(u=0;u<f;u++)g=h.substring(u,u+1),T=d.substring(u,u+1),g!==" "&&T!==" "?b.vLayout===e||b.vLayout===t?L+=U(g,T):(I=!1,I=b.vRule5?B(g,T):I,I=!I&&b.vRule1?M(g,T):I,I=!I&&b.vRule2?N(g,T):I,I=!I&&b.vRule3?R(g,T):I,I=!I&&b.vRule4?x(g,T):I,L+=I):L+=U(g,T);return L}function ee(h,d,_,u){let f=h.length,g=d.length,T=h.slice(0,Math.max(0,f-_)),L=h.slice(Math.max(0,f-_),f),I=d.slice(0,Math.min(_,g)),b,v,w,k=[],O;for(v=L.length,b=0;b<v;b++)b>=g?w=L[b]:w=V(L[b],I[b],u),k.push(w);return O=d.slice(Math.min(_,g),g),[...T,...k,...O]}function De(h,d){const _=" ".repeat(d);return h.map(u=>u+_)}function Pe(h,d,_){let u=h[0].length,f=d[0].length,g;return u>f?d=De(d,u-f):f>u&&(h=De(h,f-u)),g=D(h,d,_),ee(h,d,g,_)}function Re(h,d,_){const u=_.fittingRules||{};if(u.hLayout===s)return 0;let f,g=h.length,T=d.length,L=g,I=1,b=!1,v,w,k,O;if(g===0)return 0;e:for(;I<=L;){const re=g-I;for(v=h.substring(re,re+I),w=d.substring(0,Math.min(I,T)),f=0;f<Math.min(I,T);f++)if(k=v.substring(f,f+1),O=w.substring(f,f+1),k!==" "&&O!==" "){if(u.hLayout===e){I=I-1;break e}else if(u.hLayout===t){(k===_.hardBlank||O===_.hardBlank)&&(I=I-1);break e}else if(b=!0,!(u.hRule1&&a(k,O,_.hardBlank)||u.hRule2&&p(k,O)||u.hRule3&&m(k,O)||u.hRule4&&A(k,O)||u.hRule5&&E(k,O)||u.hRule6&&C(k,O,_.hardBlank))){I=I-1;break e}}if(b)break;I++}return Math.min(L,I)}function Y(h,d,_,u){let f,g,T=[],L,I,b,v,w,k,O,re;const q=u.fittingRules||{};if(typeof u.height!="number")throw new Error("height is not defined.");for(f=0;f<u.height;f++){O=h[f],re=d[f],w=O.length,k=re.length,L=w-_,I=O.slice(0,Math.max(0,L)),b="";const me=Math.max(0,w-_);let te=O.substring(me,me+_),pe=re.substring(0,Math.min(_,k));for(g=0;g<_;g++){let se=g<w?te.substring(g,g+1):" ",Q=g<k?pe.substring(g,g+1):" ";if(se!==" "&&Q!==" ")if(q.hLayout===e||q.hLayout===t)b+=U(se,Q,u.hardBlank);else{const wt=q.hRule1&&a(se,Q,u.hardBlank)||q.hRule2&&p(se,Q)||q.hRule3&&m(se,Q)||q.hRule4&&A(se,Q)||q.hRule5&&E(se,Q)||q.hRule6&&C(se,Q,u.hardBlank)||U(se,Q,u.hardBlank);b+=wt}else b+=U(se,Q,u.hardBlank)}_>=k?v="":v=re.substring(_,_+Math.max(0,k-_)),T[f]=I+b+v}return T}function ue(h){return new Array(h).fill("")}const he=function(h){return Math.max(...h.map(d=>d.length))};function de(h,d,_){return h.reduce(function(u,f){return Y(u,f.fig,f.overlap||0,_)},ue(d))}function St(h,d,_){for(let u=h.length-1;u>0;u--){const f=de(h.slice(0,u),d,_);if(he(f)<=_.width)return{outputFigText:f,chars:h.slice(u)}}return{outputFigText:ue(d),chars:h}}function bt(h,d,_){let u,f,g=0,T,L,I,b=_.height,v=[],w,k={chars:[],overlap:g},O=[],re,q,me,te,pe;if(typeof b!="number")throw new Error("height is not defined.");L=ue(b);const se=_.fittingRules||{};for(_.printDirection===1&&(h=h.split("").reverse().join("")),I=h.length,u=0;u<I;u++)if(re=h.substring(u,u+1),q=re.match(/\s/),f=d[re.charCodeAt(0)],te=null,f){if(se.hLayout!==s){for(g=1e4,T=0;T<b;T++)g=Math.min(g,Re(L[T],f[T],_));g=g===1e4?0:g}if(_.width>0&&(_.whitespaceBreak?(me=de(k.chars.concat([{fig:f,overlap:g}]),b,_),te=de(O.concat([{fig:me,overlap:k.overlap}]),b,_),w=he(te)):(te=Y(L,f,g,_),w=he(te)),w>=_.width&&u>0&&(_.whitespaceBreak?(L=de(O.slice(0,-1),b,_),O.length>1&&(v.push(L),L=ue(b)),O=[]):(v.push(L),L=ue(b)))),_.width>0&&_.whitespaceBreak&&((!q||u===I-1)&&k.chars.push({fig:f,overlap:g}),q||u===I-1)){for(pe=null;te=de(k.chars,b,_),w=he(te),w>=_.width;)pe=St(k.chars,b,_),k={chars:pe.chars},v.push(pe.outputFigText);w>0&&(pe?O.push({fig:te,overlap:1}):O.push({fig:te,overlap:k.overlap})),q&&(O.push({fig:f,overlap:g}),L=ue(b)),u===I-1&&(L=de(O,b,_)),k={chars:[],overlap:g};continue}L=Y(L,f,g,_)}return he(L)>0&&v.push(L),_.showHardBlanks||v.forEach(function(Q){for(I=Q.length,T=0;T<I;T++)Q[T]=Q[T].replace(new RegExp("\\"+_.hardBlank,"g")," ")}),h===""&&v.length===0&&v.push(new Array(b).fill("")),v}const Ct=function(h,d){let _;const u=d.fittingRules||{};if(h==="default")_={hLayout:u.hLayout,hRule1:u.hRule1,hRule2:u.hRule2,hRule3:u.hRule3,hRule4:u.hRule4,hRule5:u.hRule5,hRule6:u.hRule6};else if(h==="full")_={hLayout:s,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(h==="fitted")_={hLayout:e,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else if(h==="controlled smushing")_={hLayout:n,hRule1:!0,hRule2:!0,hRule3:!0,hRule4:!0,hRule5:!0,hRule6:!0};else if(h==="universal smushing")_={hLayout:t,hRule1:!1,hRule2:!1,hRule3:!1,hRule4:!1,hRule5:!1,hRule6:!1};else return;return _},it=function(h,d){let _={};const u=d.fittingRules||{};if(h==="default")_={vLayout:u.vLayout,vRule1:u.vRule1,vRule2:u.vRule2,vRule3:u.vRule3,vRule4:u.vRule4,vRule5:u.vRule5};else if(h==="full")_={vLayout:s,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(h==="fitted")_={vLayout:e,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else if(h==="controlled smushing")_={vLayout:n,vRule1:!0,vRule2:!0,vRule3:!0,vRule4:!0,vRule5:!0};else if(h==="universal smushing")_={vLayout:t,vRule1:!1,vRule2:!1,vRule3:!1,vRule4:!1,vRule5:!1};else return;return _},ot=function(h,d,_){_=_.replace(/\r\n/g,`
`).replace(/\r/g,`
`);let u=_.split(`
`),f=[],g,T,L;for(T=u.length,g=0;g<T;g++)f=f.concat(bt(u[g],r[h],d));for(T=f.length,L=f[0],g=1;g<T;g++)L=Pe(L,f[g],d);return L?L.join(`
`):""};function Be(h,d){let _;if(typeof structuredClone<"u"?_=structuredClone(h):_=JSON.parse(JSON.stringify(h)),_.showHardBlanks=d.showHardBlanks||!1,_.width=d.width||-1,_.whitespaceBreak=d.whitespaceBreak||!1,d.horizontalLayout){const u=Ct(d.horizontalLayout,h);u&&Object.assign(_.fittingRules,u)}if(d.verticalLayout){const u=it(d.verticalLayout,h);u&&Object.assign(_.fittingRules,u)}return _.printDirection=d.printDirection!==null&&d.printDirection!==void 0?d.printDirection:h.printDirection,_}const P=async function(h,d,_){return P.text(h,d,_)};return P.text=async function(h,d,_){h=h+"";let u,f;typeof d=="function"?(f=d,u={font:i.font}):typeof d=="string"?(u={font:d},f=_):d?(u=d,f=_):(u={font:i.font},f=_);const g=u.font||i.font;try{const T=await P.loadFont(g),L=T?ot(g,Be(T,u),h):"";return f&&f(null,L),L}catch(T){const L=T instanceof Error?T:new Error(String(T));if(f)return f(L),"";throw L}},P.textSync=function(h,d){h=h+"",typeof d=="string"?d={font:d}:d=d||{};const _=d.font||i.font;let u=Be(P.loadFontSync(_),d);return ot(_,u,h)},P.metadata=async function(h,d){h=h+"";try{const _=await P.loadFont(h);if(!_)throw new Error("Error loading font.");const u=r[h]||{},f=[_,u.comment||""];return d&&d(null,_,u.comment),f}catch(_){const u=_ instanceof Error?_:new Error(String(_));if(d)return d(u),null;throw u}},P.defaults=function(h){return h&&typeof h=="object"&&Object.assign(i,h),typeof structuredClone<"u"?structuredClone(i):JSON.parse(JSON.stringify(i))},P.parseFont=function(h,d,_=!0){if(r[h]&&!_)return r[h].options;d=d.replace(/\r\n/g,`
`).replace(/\r/g,`
`);const u=new li,f=d.split(`
`),g=f.shift();if(!g)throw new Error("Invalid font file: missing header");const T=g.split(" "),L={hardBlank:T[0].substring(5,6),height:parseInt(T[1],10),baseline:parseInt(T[2],10),maxLength:parseInt(T[3],10),oldLayout:parseInt(T[4],10),numCommentLines:parseInt(T[5],10),printDirection:T[6]?parseInt(T[6],10):0,fullLayout:T[7]?parseInt(T[7],10):null,codeTagCount:T[8]?parseInt(T[8],10):null};if((L.hardBlank||"").length!==1||[L.height,L.baseline,L.maxLength,L.oldLayout,L.numCommentLines].some(v=>v==null||isNaN(v)))throw new Error("FIGlet header contains invalid values.");if(L.height==null||L.numCommentLines==null)throw new Error("FIGlet header contains invalid values.");L.fittingRules=l(L.oldLayout,L.fullLayout),u.options=L;const b=[];for(let v=32;v<=126;v++)b.push(v);if(b.push(196,214,220,228,246,252,223),f.length<L.numCommentLines+L.height*b.length)throw new Error(`FIGlet file is missing data. Line length: ${f.length}. Comment lines: ${L.numCommentLines}. Height: ${L.height}. Num chars: ${b.length}.`);for(u.comment=f.splice(0,L.numCommentLines).join(`
`),u.numChars=0;f.length>0&&u.numChars<b.length;){const v=b[u.numChars];u[v]=f.splice(0,L.height);for(let w=0;w<L.height;w++)typeof u[v][w]>"u"?u[v][w]="":u[v][w]=o(u[v][w],w,L.height);u.numChars++}for(;f.length>0;){const v=f.shift();if(!v||v.trim()==="")break;let w=v.split(" ")[0],k;if(/^-?0[xX][0-9a-fA-F]+$/.test(w))k=parseInt(w,16);else if(/^-?0[0-7]+$/.test(w))k=parseInt(w,8);else if(/^-?[0-9]+$/.test(w))k=parseInt(w,10);else throw new Error(`Error parsing data. Invalid data: ${w}`);if(k===-1||k<-2147483648||k>2147483647){const O=k===-1?"The char code -1 is not permitted.":`The char code cannot be ${k<-2147483648?"less than -2147483648":"greater than 2147483647"}.`;throw new Error(`Error parsing data. ${O}`)}u[k]=f.splice(0,L.height);for(let O=0;O<L.height;O++)typeof u[k][O]>"u"?u[k][O]="":u[k][O]=o(u[k][O],O,L.height);u.numChars++}return r[h]=u,L},P.loadedFonts=()=>Object.keys(r),P.clearLoadedFonts=()=>{Object.keys(r).forEach(h=>{delete r[h]})},P.loadFont=async function(h,d){if(r[h]){const _=r[h].options;return d&&d(null,_),Promise.resolve(_)}try{if(!i.fetchFontIfMissing)throw new Error(`Font is not loaded: ${h}`);const _=await fetch(`${i.fontPath}/${h}.flf`);if(!_.ok)throw new Error(`Network response was not ok: ${_.status}`);const u=await _.text(),f=P.parseFont(h,u);return d&&d(null,f),f}catch(_){const u=_ instanceof Error?_:new Error(String(_));if(d)return d(u),null;throw u}},P.loadFontSync=function(h){if(r[h])return r[h].options;throw new Error("Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded.")},P.preloadFonts=async function(h,d){try{for(const _ of h){const u=await fetch(`${i.fontPath}/${_}.flf`);if(!u.ok)throw new Error(`Failed to preload fonts. Error fetching font: ${_}, status code: ${u.statusText}`);const f=await u.text();P.parseFont(_,f)}d&&d()}catch(_){const u=_ instanceof Error?_:new Error(String(_));if(d){d(u);return}throw _}},P.fonts=function(h){return new Promise(function(d,_){d(Ht),h&&h(null,Ht)})},P.fontsSync=function(){return Ht},P.figFonts=r,P})(),ci=`flf2a$ 8 7 54 0 12 0 64 185
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
`,ui=`flf2a$ 6 5 16 15 10 0 18319
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
`,hi=`flf2a$ 5 4 13 15 10 0 22415
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
`,di=`flf2a$ 6 5 16 15 13 0 24463 229
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
         `;nt.parseFont("Standard",di);nt.parseFont("Slant",ui);nt.parseFont("Banner",ci);nt.parseFont("Small",hi);const mi={name:"figlet",description:"Convert text to ASCII art",execute:(s,e)=>{const t=new z(s);if(t.hasFlag("help"))return{output:`Usage: figlet [options] <text>

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
Try 'figlet --help' for more information.`,error:!0};const r=t.getFlag("f"),i=typeof r=="string"?r:"Standard",o=i.charAt(0).toUpperCase()+i.slice(1).toLowerCase();let l="default";t.hasFlag("c")?l="full":t.hasFlag("r")&&(l="fitted");try{return{output:nt.textSync(n,{font:o,horizontalLayout:l})}}catch(a){return a instanceof Error?a.message.includes("font")||a.message.includes("Font")||a.message.includes("FIGlet")?{output:`figlet: font '${o}' not found or invalid
Available fonts: standard, slant, banner, small`,error:!0}:{output:`figlet: ${a.message}`,error:!0}:{output:"figlet: unknown error occurred",error:!0}}}},Zt="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";function pi(){const s=document.getElementById("terminal-output");if(!s)return{cols:80,rows:24};const e=s.getBoundingClientRect(),t=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--terminal-font-size")||"16"),n=t*.6,r=t*1.5,i=Math.floor(e.width/n),o=Math.floor(e.height/r);return{cols:Math.max(i,20),rows:Math.max(o,10)}}function fi(){return Zt[Math.floor(Math.random()*Zt.length)]}function $i(s){return{name:"matrix",description:"Display Matrix digital rain animation",execute:(e,t)=>{const n=new z(e);if(n.hasFlag("help"))return{output:`Usage: matrix [options]

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

Note: Animation continues until you scroll, type, or run 'clear'`};let r=1;const i=n.getFlag("speed");if(i!==void 0){const D=parseFloat(String(i));if(isNaN(D)||D<.1||D>5)return{output:`matrix: invalid speed value '${i}'
Speed must be between 0.1 and 5.0`,error:!0};r=D}const o=n.getFlag("theme");let l=s.getCurrentColors();if(o!==void 0){const D=String(o),V=["green","yellow","white","light-blue","paper","dc","custom"];if(!V.includes(D))return{output:`matrix: invalid theme '${D}'
Valid themes: ${V.join(", ")}`,error:!0};if(D!=="custom"){const ee=s.getPreset(D);ee&&(l=ee.colors)}}const{cols:a,rows:p}=pi(),m=1.2,A=Math.floor(a/m)+5,E=Math.min(p,20),C=l["--terminal-accent"],M=l["--terminal-dim"],N=l["--terminal-bg"],R=p*1.5,x=-E*1.5,B=R,U=[];for(let D=0;D<A;D++){const V=-Math.random()*5,ee=(5+Math.random()*5)/r,De=D*m,Pe=[];for(let Re=0;Re<E;Re++){const Y=Re/E,ue=Math.pow(Y,2),he=Re===E-1,de=fi();Pe.push(`<span class="matrix-char${he?" matrix-char-bright":""}" data-char-index="${Re}" style="color: ${he?C:M}; opacity: ${ue};">${de}</span>`)}U.push(`
  <div class="matrix-column" data-column-index="${D}" data-trail-length="${E}" style="
    left: ${De}em;
    animation: matrix-fall ${ee}s linear ${V}s infinite;
    --matrix-start: ${x}em;
    --matrix-end: ${B}em;
  ">${Pe.join("")}</div>`)}return{output:`
<div class="matrix-rain" data-matrix-chars="${Zt}" style="height: ${R}em; background-color: ${N};">
${U.join("")}
</div>
`,html:!0}}}}class Un{static generateHeader(){return`
 ██████╗  █████╗ ██████╗ ██╗███╗   ██╗     ██████╗██╗  ██╗ █████╗ ███╗   ███╗██████╗ ███████╗██████╗ ███████╗
 ██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║    ██╔════╝██║  ██║██╔══██╗████╗ ████║██╔══██╗██╔════╝██╔══██╗██╔════╝
 ██║  ██║███████║██████╔╝██║██╔██╗ ██║    ██║     ███████║███████║██╔████╔██║██████╔╝█████╗  ██████╔╝███████╗
 ██║  ██║██╔══██║██╔══██╗██║██║╚██╗██║    ██║     ██╔══██║██╔══██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗╚════██║
 ██████╔╝██║  ██║██║  ██║██║██║ ╚████║    ╚██████╗██║  ██║██║  ██║██║ ╚═╝ ██║██████╔╝███████╗██║  ██║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
`}static getTagline(){return"Technologist, Inventor | Building What's Next on Rock-Solid Foundations"}}const{entries:gr,setPrototypeOf:Bn,isFrozen:gi,getPrototypeOf:Ti,getOwnPropertyDescriptor:Li}=Object;let{freeze:le,seal:$e,create:Qt}=Object,{apply:Jt,construct:en}=typeof Reflect<"u"&&Reflect;le||(le=function(e){return e});$e||($e=function(e){return e});Jt||(Jt=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];return e.apply(t,r)});en||(en=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new e(...n)});const dt=_e(Array.prototype.forEach),Ei=_e(Array.prototype.lastIndexOf),Gn=_e(Array.prototype.pop),Xe=_e(Array.prototype.push),Ai=_e(Array.prototype.splice),pt=_e(String.prototype.toLowerCase),Ft=_e(String.prototype.toString),Wt=_e(String.prototype.match),qe=_e(String.prototype.replace),Ii=_e(String.prototype.indexOf),yi=_e(String.prototype.trim),Te=_e(Object.prototype.hasOwnProperty),ie=_e(RegExp.prototype.test),Ke=Ri(TypeError);function _e(s){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return Jt(s,e,n)}}function Ri(s){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return en(s,t)}}function F(s,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:pt;Bn&&Bn(s,null);let n=e.length;for(;n--;){let r=e[n];if(typeof r=="string"){const i=t(r);i!==r&&(gi(e)||(e[n]=i),r=i)}s[r]=!0}return s}function Si(s){for(let e=0;e<s.length;e++)Te(s,e)||(s[e]=null);return s}function Ne(s){const e=Qt(null);for(const[t,n]of gr(s))Te(s,t)&&(Array.isArray(n)?e[t]=Si(n):n&&typeof n=="object"&&n.constructor===Object?e[t]=Ne(n):e[t]=n);return e}function Ze(s,e){for(;s!==null;){const n=Li(s,e);if(n){if(n.get)return _e(n.get);if(typeof n.value=="function")return _e(n.value)}s=Ti(s)}function t(){return null}return t}const Vn=le(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ut=le(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Bt=le(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),bi=le(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Gt=le(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ci=le(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),zn=le(["#text"]),jn=le(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Vt=le(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Yn=le(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),mt=le(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),wi=$e(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ni=$e(/<%[\w\W]*|[\w\W]*%>/gm),xi=$e(/\$\{[\w\W]*/gm),ki=$e(/^data-[\-\w.\u00B7-\uFFFF]+$/),vi=$e(/^aria-[\-\w]+$/),Tr=$e(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Oi=$e(/^(?:\w+script|data):/i),Di=$e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Lr=$e(/^html$/i),Pi=$e(/^[a-z][.\w]*(-[.\w]+)+$/i);var Xn=Object.freeze({__proto__:null,ARIA_ATTR:vi,ATTR_WHITESPACE:Di,CUSTOM_ELEMENT:Pi,DATA_ATTR:ki,DOCTYPE_NAME:Lr,ERB_EXPR:Ni,IS_ALLOWED_URI:Tr,IS_SCRIPT_OR_DATA:Oi,MUSTACHE_EXPR:wi,TMPLIT_EXPR:xi});const Qe={element:1,text:3,progressingInstruction:7,comment:8,document:9},Mi=function(){return typeof window>"u"?null:window},Hi=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const i="dompurify"+(n?"#"+n:"");try{return e.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},qn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Er(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Mi();const e=S=>Er(S);if(e.version="3.3.0",e.removed=[],!s||!s.document||s.document.nodeType!==Qe.document||!s.Element)return e.isSupported=!1,e;let{document:t}=s;const n=t,r=n.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:l,Element:a,NodeFilter:p,NamedNodeMap:m=s.NamedNodeMap||s.MozNamedAttrMap,HTMLFormElement:A,DOMParser:E,trustedTypes:C}=s,M=a.prototype,N=Ze(M,"cloneNode"),R=Ze(M,"remove"),x=Ze(M,"nextSibling"),B=Ze(M,"childNodes"),U=Ze(M,"parentNode");if(typeof o=="function"){const S=t.createElement("template");S.content&&S.content.ownerDocument&&(t=S.content.ownerDocument)}let H,D="";const{implementation:V,createNodeIterator:ee,createDocumentFragment:De,getElementsByTagName:Pe}=t,{importNode:Re}=n;let Y=qn();e.isSupported=typeof gr=="function"&&typeof U=="function"&&V&&V.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ue,ERB_EXPR:he,TMPLIT_EXPR:de,DATA_ATTR:St,ARIA_ATTR:bt,IS_SCRIPT_OR_DATA:Ct,ATTR_WHITESPACE:it,CUSTOM_ELEMENT:ot}=Xn;let{IS_ALLOWED_URI:Be}=Xn,P=null;const h=F({},[...Vn,...Ut,...Bt,...Gt,...zn]);let d=null;const _=F({},[...jn,...Vt,...Yn,...mt]);let u=Object.seal(Qt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),f=null,g=null;const T=Object.seal(Qt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let L=!0,I=!0,b=!1,v=!0,w=!1,k=!0,O=!1,re=!1,q=!1,me=!1,te=!1,pe=!1,se=!0,Q=!1;const wt="user-content-";let Nt=!0,Ge=!1,Me={},He=null;const pn=F({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let fn=null;const $n=F({},["audio","video","img","source","image","track"]);let xt=null;const gn=F({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),at="http://www.w3.org/1998/Math/MathML",lt="http://www.w3.org/2000/svg",Se="http://www.w3.org/1999/xhtml";let Fe=Se,kt=!1,vt=null;const Rr=F({},[at,lt,Se],Ft);let _t=F({},["mi","mo","mn","ms","mtext"]),ct=F({},["annotation-xml"]);const Sr=F({},["title","style","font","a","script"]);let Ve=null;const br=["application/xhtml+xml","text/html"],Cr="text/html";let K=null,We=null;const wr=t.createElement("form"),Tn=function(c){return c instanceof RegExp||c instanceof Function},Ot=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(We&&We===c)){if((!c||typeof c!="object")&&(c={}),c=Ne(c),Ve=br.indexOf(c.PARSER_MEDIA_TYPE)===-1?Cr:c.PARSER_MEDIA_TYPE,K=Ve==="application/xhtml+xml"?Ft:pt,P=Te(c,"ALLOWED_TAGS")?F({},c.ALLOWED_TAGS,K):h,d=Te(c,"ALLOWED_ATTR")?F({},c.ALLOWED_ATTR,K):_,vt=Te(c,"ALLOWED_NAMESPACES")?F({},c.ALLOWED_NAMESPACES,Ft):Rr,xt=Te(c,"ADD_URI_SAFE_ATTR")?F(Ne(gn),c.ADD_URI_SAFE_ATTR,K):gn,fn=Te(c,"ADD_DATA_URI_TAGS")?F(Ne($n),c.ADD_DATA_URI_TAGS,K):$n,He=Te(c,"FORBID_CONTENTS")?F({},c.FORBID_CONTENTS,K):pn,f=Te(c,"FORBID_TAGS")?F({},c.FORBID_TAGS,K):Ne({}),g=Te(c,"FORBID_ATTR")?F({},c.FORBID_ATTR,K):Ne({}),Me=Te(c,"USE_PROFILES")?c.USE_PROFILES:!1,L=c.ALLOW_ARIA_ATTR!==!1,I=c.ALLOW_DATA_ATTR!==!1,b=c.ALLOW_UNKNOWN_PROTOCOLS||!1,v=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,w=c.SAFE_FOR_TEMPLATES||!1,k=c.SAFE_FOR_XML!==!1,O=c.WHOLE_DOCUMENT||!1,me=c.RETURN_DOM||!1,te=c.RETURN_DOM_FRAGMENT||!1,pe=c.RETURN_TRUSTED_TYPE||!1,q=c.FORCE_BODY||!1,se=c.SANITIZE_DOM!==!1,Q=c.SANITIZE_NAMED_PROPS||!1,Nt=c.KEEP_CONTENT!==!1,Ge=c.IN_PLACE||!1,Be=c.ALLOWED_URI_REGEXP||Tr,Fe=c.NAMESPACE||Se,_t=c.MATHML_TEXT_INTEGRATION_POINTS||_t,ct=c.HTML_INTEGRATION_POINTS||ct,u=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&Tn(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(u.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&Tn(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(u.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(u.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),w&&(I=!1),te&&(me=!0),Me&&(P=F({},zn),d=[],Me.html===!0&&(F(P,Vn),F(d,jn)),Me.svg===!0&&(F(P,Ut),F(d,Vt),F(d,mt)),Me.svgFilters===!0&&(F(P,Bt),F(d,Vt),F(d,mt)),Me.mathMl===!0&&(F(P,Gt),F(d,Yn),F(d,mt))),c.ADD_TAGS&&(typeof c.ADD_TAGS=="function"?T.tagCheck=c.ADD_TAGS:(P===h&&(P=Ne(P)),F(P,c.ADD_TAGS,K))),c.ADD_ATTR&&(typeof c.ADD_ATTR=="function"?T.attributeCheck=c.ADD_ATTR:(d===_&&(d=Ne(d)),F(d,c.ADD_ATTR,K))),c.ADD_URI_SAFE_ATTR&&F(xt,c.ADD_URI_SAFE_ATTR,K),c.FORBID_CONTENTS&&(He===pn&&(He=Ne(He)),F(He,c.FORBID_CONTENTS,K)),Nt&&(P["#text"]=!0),O&&F(P,["html","head","body"]),P.table&&(F(P,["tbody"]),delete f.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ke('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ke('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');H=c.TRUSTED_TYPES_POLICY,D=H.createHTML("")}else H===void 0&&(H=Hi(C,r)),H!==null&&typeof D=="string"&&(D=H.createHTML(""));le&&le(c),We=c}},Ln=F({},[...Ut,...Bt,...bi]),En=F({},[...Gt,...Ci]),Nr=function(c){let $=U(c);(!$||!$.tagName)&&($={namespaceURI:Fe,tagName:"template"});const y=pt(c.tagName),j=pt($.tagName);return vt[c.namespaceURI]?c.namespaceURI===lt?$.namespaceURI===Se?y==="svg":$.namespaceURI===at?y==="svg"&&(j==="annotation-xml"||_t[j]):!!Ln[y]:c.namespaceURI===at?$.namespaceURI===Se?y==="math":$.namespaceURI===lt?y==="math"&&ct[j]:!!En[y]:c.namespaceURI===Se?$.namespaceURI===lt&&!ct[j]||$.namespaceURI===at&&!_t[j]?!1:!En[y]&&(Sr[y]||!Ln[y]):!!(Ve==="application/xhtml+xml"&&vt[c.namespaceURI]):!1},Ie=function(c){Xe(e.removed,{element:c});try{U(c).removeChild(c)}catch{R(c)}},ke=function(c,$){try{Xe(e.removed,{attribute:$.getAttributeNode(c),from:$})}catch{Xe(e.removed,{attribute:null,from:$})}if($.removeAttribute(c),c==="is")if(me||te)try{Ie($)}catch{}else try{$.setAttribute(c,"")}catch{}},An=function(c){let $=null,y=null;if(q)c="<remove></remove>"+c;else{const X=Wt(c,/^[\r\n\t ]+/);y=X&&X[0]}Ve==="application/xhtml+xml"&&Fe===Se&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const j=H?H.createHTML(c):c;if(Fe===Se)try{$=new E().parseFromString(j,Ve)}catch{}if(!$||!$.documentElement){$=V.createDocument(Fe,"template",null);try{$.documentElement.innerHTML=kt?D:j}catch{}}const ne=$.body||$.documentElement;return c&&y&&ne.insertBefore(t.createTextNode(y),ne.childNodes[0]||null),Fe===Se?Pe.call($,O?"html":"body")[0]:O?$.documentElement:ne},In=function(c){return ee.call(c.ownerDocument||c,c,p.SHOW_ELEMENT|p.SHOW_COMMENT|p.SHOW_TEXT|p.SHOW_PROCESSING_INSTRUCTION|p.SHOW_CDATA_SECTION,null)},Dt=function(c){return c instanceof A&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof m)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},yn=function(c){return typeof l=="function"&&c instanceof l};function be(S,c,$){dt(S,y=>{y.call(e,c,$,We)})}const Rn=function(c){let $=null;if(be(Y.beforeSanitizeElements,c,null),Dt(c))return Ie(c),!0;const y=K(c.nodeName);if(be(Y.uponSanitizeElement,c,{tagName:y,allowedTags:P}),k&&c.hasChildNodes()&&!yn(c.firstElementChild)&&ie(/<[/\w!]/g,c.innerHTML)&&ie(/<[/\w!]/g,c.textContent)||c.nodeType===Qe.progressingInstruction||k&&c.nodeType===Qe.comment&&ie(/<[/\w]/g,c.data))return Ie(c),!0;if(!(T.tagCheck instanceof Function&&T.tagCheck(y))&&(!P[y]||f[y])){if(!f[y]&&bn(y)&&(u.tagNameCheck instanceof RegExp&&ie(u.tagNameCheck,y)||u.tagNameCheck instanceof Function&&u.tagNameCheck(y)))return!1;if(Nt&&!He[y]){const j=U(c)||c.parentNode,ne=B(c)||c.childNodes;if(ne&&j){const X=ne.length;for(let ce=X-1;ce>=0;--ce){const Ce=N(ne[ce],!0);Ce.__removalCount=(c.__removalCount||0)+1,j.insertBefore(Ce,x(c))}}}return Ie(c),!0}return c instanceof a&&!Nr(c)||(y==="noscript"||y==="noembed"||y==="noframes")&&ie(/<\/no(script|embed|frames)/i,c.innerHTML)?(Ie(c),!0):(w&&c.nodeType===Qe.text&&($=c.textContent,dt([ue,he,de],j=>{$=qe($,j," ")}),c.textContent!==$&&(Xe(e.removed,{element:c.cloneNode()}),c.textContent=$)),be(Y.afterSanitizeElements,c,null),!1)},Sn=function(c,$,y){if(se&&($==="id"||$==="name")&&(y in t||y in wr))return!1;if(!(I&&!g[$]&&ie(St,$))){if(!(L&&ie(bt,$))){if(!(T.attributeCheck instanceof Function&&T.attributeCheck($,c))){if(!d[$]||g[$]){if(!(bn(c)&&(u.tagNameCheck instanceof RegExp&&ie(u.tagNameCheck,c)||u.tagNameCheck instanceof Function&&u.tagNameCheck(c))&&(u.attributeNameCheck instanceof RegExp&&ie(u.attributeNameCheck,$)||u.attributeNameCheck instanceof Function&&u.attributeNameCheck($,c))||$==="is"&&u.allowCustomizedBuiltInElements&&(u.tagNameCheck instanceof RegExp&&ie(u.tagNameCheck,y)||u.tagNameCheck instanceof Function&&u.tagNameCheck(y))))return!1}else if(!xt[$]){if(!ie(Be,qe(y,it,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&c!=="script"&&Ii(y,"data:")===0&&fn[c])){if(!(b&&!ie(Ct,qe(y,it,"")))){if(y)return!1}}}}}}}return!0},bn=function(c){return c!=="annotation-xml"&&Wt(c,ot)},Cn=function(c){be(Y.beforeSanitizeAttributes,c,null);const{attributes:$}=c;if(!$||Dt(c))return;const y={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:d,forceKeepAttr:void 0};let j=$.length;for(;j--;){const ne=$[j],{name:X,namespaceURI:ce,value:Ce}=ne,Ue=K(X),Pt=Ce;let J=X==="value"?Pt:yi(Pt);if(y.attrName=Ue,y.attrValue=J,y.keepAttr=!0,y.forceKeepAttr=void 0,be(Y.uponSanitizeAttribute,c,y),J=y.attrValue,Q&&(Ue==="id"||Ue==="name")&&(ke(X,c),J=wt+J),k&&ie(/((--!?|])>)|<\/(style|title|textarea)/i,J)){ke(X,c);continue}if(Ue==="attributename"&&Wt(J,"href")){ke(X,c);continue}if(y.forceKeepAttr)continue;if(!y.keepAttr){ke(X,c);continue}if(!v&&ie(/\/>/i,J)){ke(X,c);continue}w&&dt([ue,he,de],Nn=>{J=qe(J,Nn," ")});const wn=K(c.nodeName);if(!Sn(wn,Ue,J)){ke(X,c);continue}if(H&&typeof C=="object"&&typeof C.getAttributeType=="function"&&!ce)switch(C.getAttributeType(wn,Ue)){case"TrustedHTML":{J=H.createHTML(J);break}case"TrustedScriptURL":{J=H.createScriptURL(J);break}}if(J!==Pt)try{ce?c.setAttributeNS(ce,X,J):c.setAttribute(X,J),Dt(c)?Ie(c):Gn(e.removed)}catch{ke(X,c)}}be(Y.afterSanitizeAttributes,c,null)},xr=function S(c){let $=null;const y=In(c);for(be(Y.beforeSanitizeShadowDOM,c,null);$=y.nextNode();)be(Y.uponSanitizeShadowNode,$,null),Rn($),Cn($),$.content instanceof i&&S($.content);be(Y.afterSanitizeShadowDOM,c,null)};return e.sanitize=function(S){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,y=null,j=null,ne=null;if(kt=!S,kt&&(S="<!-->"),typeof S!="string"&&!yn(S))if(typeof S.toString=="function"){if(S=S.toString(),typeof S!="string")throw Ke("dirty is not a string, aborting")}else throw Ke("toString is not a function");if(!e.isSupported)return S;if(re||Ot(c),e.removed=[],typeof S=="string"&&(Ge=!1),Ge){if(S.nodeName){const Ce=K(S.nodeName);if(!P[Ce]||f[Ce])throw Ke("root node is forbidden and cannot be sanitized in-place")}}else if(S instanceof l)$=An("<!---->"),y=$.ownerDocument.importNode(S,!0),y.nodeType===Qe.element&&y.nodeName==="BODY"||y.nodeName==="HTML"?$=y:$.appendChild(y);else{if(!me&&!w&&!O&&S.indexOf("<")===-1)return H&&pe?H.createHTML(S):S;if($=An(S),!$)return me?null:pe?D:""}$&&q&&Ie($.firstChild);const X=In(Ge?S:$);for(;j=X.nextNode();)Rn(j),Cn(j),j.content instanceof i&&xr(j.content);if(Ge)return S;if(me){if(te)for(ne=De.call($.ownerDocument);$.firstChild;)ne.appendChild($.firstChild);else ne=$;return(d.shadowroot||d.shadowrootmode)&&(ne=Re.call(n,ne,!0)),ne}let ce=O?$.outerHTML:$.innerHTML;return O&&P["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&ie(Lr,$.ownerDocument.doctype.name)&&(ce="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+ce),w&&dt([ue,he,de],Ce=>{ce=qe(ce,Ce," ")}),H&&pe?H.createHTML(ce):ce},e.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ot(S),re=!0},e.clearConfig=function(){We=null,re=!1},e.isValidAttribute=function(S,c,$){We||Ot({});const y=K(S),j=K(c);return Sn(y,j,$)},e.addHook=function(S,c){typeof c=="function"&&Xe(Y[S],c)},e.removeHook=function(S,c){if(c!==void 0){const $=Ei(Y[S],c);return $===-1?void 0:Ai(Y[S],$,1)[0]}return Gn(Y[S])},e.removeHooks=function(S){Y[S]=[]},e.removeAllHooks=function(){Y=qn()},e}var Fi=Er();function un(s){return Fi.sanitize(s,{ALLOWED_TAGS:["p","div","span","br","strong","b","em","i","u","s","a","code","pre","h1","h2","h3","h4","h5","h6","ul","ol","li","blockquote","table","thead","tbody","tr","th","td","img","button","input","select","option","label","aside","section","details","summary"],ALLOWED_ATTR:["class","id","href","target","rel","src","alt","title","width","height","type","value","checked","selected","disabled","min","max","step","placeholder","data-command","data-command-template","data-setting-type","data-color-var","data-theme","data-settings-panel","data-graph","data-graph-src","data-graph-theme","data-graph-initialized","data-graph-error","style","open","role","aria-label","aria-labelledby","aria-describedby","aria-valuemin","aria-valuemax","aria-valuenow","aria-valuetext","aria-live","aria-atomic","aria-current"],RETURN_DOM:!1,RETURN_DOM_FRAGMENT:!1})}class Wi{headerElement;constructor(e){this.headerElement=e,this.render(),this.setupClickHandler()}render(){const e=Un.generateHeader(),t=Un.getTagline();this.headerElement.innerHTML=un(`
      <div class="header-prompt">$ whoami | figlet | lolcat</div>
      <div class="header-ascii">
        <pre class="header-ascii-text header-clickable">${e}</pre>
      </div>
      <p class="header-tagline">${t}</p>
    `)}setupClickHandler(){this.headerElement.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("header-clickable")||t.closest(".header-clickable")){const n=new CustomEvent("terminal-command",{detail:"clear",bubbles:!0});document.dispatchEvent(n)}})}}class Ui{navLinksElement;onCommandClick;activeCommand=null;constructor(e,t){this.navLinksElement=e,this.onCommandClick=t}setItems(e){this.navLinksElement.innerHTML="",e.forEach(t=>{const n=document.createElement("button");n.className="nav-link",n.type="button",n.textContent=t.label,n.setAttribute("data-command",t.command),n.setAttribute("aria-label",`Navigate to ${t.label}`),n.addEventListener("click",()=>{this.onCommandClick(t.command)}),this.navLinksElement.appendChild(n)})}addItem(e){const t=document.createElement("button");t.className="nav-link",t.type="button",t.textContent=e.label,t.setAttribute("data-command",e.command),t.setAttribute("aria-label",`Navigate to ${e.label}`),t.addEventListener("click",()=>{this.onCommandClick(e.command)}),this.navLinksElement.appendChild(t)}clear(){this.navLinksElement.innerHTML=""}setActiveItem(e){this.activeCommand=e,this.navLinksElement.querySelectorAll("button[data-command]").forEach(r=>{r.removeAttribute("aria-current")});const n=this.navLinksElement.querySelector(`button[data-command="${e}"]`);n&&n.setAttribute("aria-current","page")}getActiveCommand(){return this.activeCommand}}function Bi(){document.querySelectorAll("a.email-protected").forEach(e=>{if(e.dataset.protected==="true")return;const t=e.dataset.user,n=e.dataset.domain;if(!t||!n){console.warn("Email link missing data-user or data-domain attributes",e);return}e.dataset.protected="true",e.addEventListener("click",r=>{r.preventDefault();const o=`mailto:${`${t}@${n}`}`;window.location.href=o}),e.addEventListener("keydown",r=>{if(r.key==="Enter"||r.key===" "){r.preventDefault();const o=`mailto:${`${t}@${n}`}`;window.location.href=o}}),e.hasAttribute("tabindex")||e.setAttribute("tabindex","0")})}class Kn{envVarManager;constructor(e){this.envVarManager=e}format(e,t){let n=e;return this.envVarManager&&(n=this.envVarManager.expandVariables(n)),n=this.expandBashEscapes(n,t),n=this.expandCustomTokens(n,t),n}expandBashEscapes(e,t){let n=e;return n=n.replace(/\\u/g,t.user),n=n.replace(/\\h/g,this.getShortHostname(t.hostname)),n=n.replace(/\\H/g,t.hostname),n=n.replace(/\\w/g,t.shortPwd),n=n.replace(/\\W/g,t.lastDir),n=n.replace(/\\\$/g,t.isRoot?"#":"$"),n=n.replace(/\\d/g,this.getDate()),n=n.replace(/\\t/g,this.getTime24()),n=n.replace(/\\T/g,this.getTime12()),n=n.replace(/\\A/g,this.getTimeShort()),n=n.replace(/\\@/g,this.getTimeAMPM()),t.historyNumber!==void 0&&(n=n.replace(/\\!/g,String(t.historyNumber))),t.commandNumber!==void 0&&(n=n.replace(/\\#/g,String(t.commandNumber))),n=n.replace(/\\\\/g,"\\"),n=n.replace(/\\n/g,`
`),n}expandCustomTokens(e,t){let n=e;return n=n.replace(/\{user\}/g,t.user),n=n.replace(/\{hostname\}/g,t.hostname),n=n.replace(/\{path\}/g,t.shortPwd),n=n.replace(/\{lastdir\}/g,t.lastDir),n=n.replace(/\{pwd\}/g,t.pwd),n}getShortHostname(e){const t=e.indexOf(".");return t>0?e.substring(0,t):e}getDate(){const e=new Date,t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r=t[e.getDay()],i=n[e.getMonth()],o=String(e.getDate()).padStart(2,"0");return`${r} ${i} ${o}`}getTime24(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),r=String(e.getSeconds()).padStart(2,"0");return`${t}:${n}:${r}`}getTime12(){const e=new Date;let t=e.getHours();const n=t>=12?"PM":"AM";t=t%12||12;const r=String(t).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0"),o=String(e.getSeconds()).padStart(2,"0");return`${r}:${i}:${o} ${n}`}getTimeShort(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${t}:${n}`}getTimeAMPM(){const e=new Date;let t=e.getHours();const n=t>=12?"PM":"AM";t=t%12||12;const r=String(t).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0");return`${r}:${i} ${n}`}static getLastDir(e){if(e==="/")return"/";if(e==="~"||e==="")return"~";const t=e.split("/").filter(n=>n&&n!=="~");return t.length>0?t[t.length-1]:"~"}}class Gi{inputElement;promptElement;history=[];historyIndex=-1;currentInput="";availableCommands=[];fileSystem;constructor(e,t){this.inputElement=e,this.promptElement=t,this.setupEventListeners()}setupEventListeners(){this.inputElement.addEventListener("keydown",e=>this.handleKeyDown(e))}handleKeyDown(e){switch(e.key){case"ArrowUp":e.preventDefault(),this.navigateHistory("up");break;case"ArrowDown":e.preventDefault(),this.navigateHistory("down");break;case"Tab":e.preventDefault(),this.handleTabCompletion();break}}navigateHistory(e){this.history.length!==0&&(this.historyIndex===-1&&(this.currentInput=this.inputElement.value),e==="up"?this.historyIndex<this.history.length-1&&(this.historyIndex++,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex>0?(this.historyIndex--,this.inputElement.value=this.history[this.history.length-1-this.historyIndex]):this.historyIndex===0&&(this.historyIndex=-1,this.inputElement.value=this.currentInput))}handleTabCompletion(){const e=this.inputElement.value;if(!e)return;const t=e.split(/\s+/);t.length===1?this.completeCommand(e.trim()):this.completeFilePath(t)}completeCommand(e){const t=this.availableCommands.filter(n=>n.startsWith(e.toLowerCase()));if(t.length===1)this.inputElement.value=t[0];else if(t.length>1){const n=this.findCommonPrefix(t);n.length>e.length&&(this.inputElement.value=n)}}completeFilePath(e){if(!this.fileSystem)return;const t=e[e.length-1],n=e.slice(0,-1).join(" ");let r=this.fileSystem.getCurrentPath(),i=t;const o=t.lastIndexOf("/");if(o!==-1){const l=t.substring(0,o+1);i=t.substring(o+1),l.startsWith("/")?r=l:r=this.resolvePath(this.fileSystem.getCurrentPath(),l)}try{if(!this.fileSystem.exists(r)||!this.fileSystem.isDirectory(r))return;const a=this.fileSystem.list(r).filter(A=>A.toLowerCase().startsWith(i.toLowerCase()));if(a.length===0)return;const p=this.findCommonPrefix(a);let m;if(o!==-1?m=t.substring(0,o+1)+p:m=p,a.length===1){const A=this.resolvePath(r,a[0]);this.fileSystem.isDirectory(A)&&(m+="/")}this.inputElement.value=n+(n?" ":"")+m}catch{return}}resolvePath(e,t){if(t.startsWith("/"))return t;const n=e.split("/").filter(i=>i),r=t.split("/").filter(i=>i);for(const i of r)i===".."?n.pop():i!=="."&&n.push(i);return"/"+n.join("/")}findCommonPrefix(e){if(e.length===0)return"";if(e.length===1)return e[0];let t=e[0];for(let n=1;n<e.length;n++)for(;!e[n].startsWith(t);)if(t=t.substring(0,t.length-1),t==="")return"";return t}addToHistory(e){e.trim()&&(this.history.push(e),this.historyIndex=-1,this.currentInput="")}getValue(){return this.inputElement.value}clear(){this.inputElement.value="",this.currentInput="",this.historyIndex=-1}focus(){this.inputElement.focus({preventScroll:!0})}setPrompt(e){this.promptElement.textContent=e}setAvailableCommands(e){this.availableCommands=e}setFileSystem(e){this.fileSystem=e}getHistory(){return[...this.history]}onSubmit(e){this.inputElement.addEventListener("keydown",t=>{if(t.key==="Enter"){const n=this.getValue();e(n)}})}}class Vi{outputElement;inputLineElement;constructor(e){this.outputElement=e,this.inputLineElement=document.getElementById("terminal-input-line")}writeLine(e,t,n){const r=document.createElement("div");r.className="output-line"+(t?` ${t}`:""),r.textContent=e,this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),n&&n()}write(e,t,n){const r=e.split(`
`);r.forEach((i,o)=>{(o<r.length-1||i)&&this.writeLine(i,t)}),n&&n()}writeHTML(e,t){const n=document.createElement("div");n.className="output-line",n.innerHTML=un(e),this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(n,this.inputLineElement):this.outputElement.appendChild(n),t&&t()}writeError(e,t){const n=e.split(`
`);n.forEach((r,i)=>{if(i<n.length-1||r){const o=document.createElement("div");o.className="output-line output-error",o.textContent=r;const l=`error-${Date.now()}-${i}`;if(o.id=l,o.setAttribute("role","alert"),t&&i===0){const a=document.getElementById(t);if(a){const p=a.getAttribute("aria-describedby");p?a.setAttribute("aria-describedby",`${p} ${l}`):a.setAttribute("aria-describedby",l)}}this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(o,this.inputLineElement):this.outputElement.appendChild(o)}}),this.scrollToBottom()}writeCommand(e,t,n){const r=document.createElement("div");r.className="output-line";const i=document.createElement("span");i.style.color="var(--terminal-accent)",i.style.fontWeight="bold",i.textContent=e+" ";const o=document.createElement("span");o.textContent=t,r.appendChild(i),r.appendChild(o),this.inputLineElement&&this.inputLineElement.parentElement===this.outputElement?this.outputElement.insertBefore(r,this.inputLineElement):this.outputElement.appendChild(r),n&&n()}clear(){Array.from(this.outputElement.children).forEach(t=>{t.id!=="terminal-input-line"&&t.remove()})}scrollToBottom(){const e=this.outputElement.parentElement;e&&(e.scrollTop=e.scrollHeight)}scrollToCommand(){const e=this.outputElement.querySelectorAll(".output-line");e.length>=2?e[e.length-2].scrollIntoView({behavior:"instant",block:"start"}):this.scrollToBottom()}performScrollBehavior(e){requestAnimationFrame(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{setTimeout(()=>{e==="top"?this.scrollToCommand():this.scrollToBottom()},50)})})})}}class zi{constructor(e,t,n,r,i){this.dispatcher=e,this.executor=t,this.settingsManager=n,this.themeManager=r,this.envVarManager=i;const o=document.getElementById("terminal-output"),l=document.getElementById("terminal-input"),a=document.getElementById("terminal-prompt");if(!o||!l||!a)throw new Error("Required terminal elements not found");this.output=new Vi(o),this.input=new Gi(l,a),this.promptFormatter=new Kn(i),this.setupInputHandler(),this.setupClickHandler(o),this.setupSettingsUIHandler(),this.setupKeyboardHandlers(),this.updatePrompt()}input;output;username="darin";hostname="darinchambers.com";currentPath="~";promptFormatter;router;setupClickHandler(e){e.addEventListener("click",t=>{const n=window.getSelection();if(n&&n.toString().length>0)return;const r=t.target,i=["svg","button","a","input","select","textarea","[data-graph]","[data-graph-src]",".graph-container"].join(", ");r.closest(i)||this.input.focus()})}setupKeyboardHandlers(){document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelectorAll("[data-settings-panel]");if(t.length>0){const n=document.activeElement;n&&t[0].contains(n)&&(e.preventDefault(),this.input.focus())}}})}setupSettingsUIHandler(){document.addEventListener("terminal-command",e=>{const t=e;this.executeCommand(t.detail,!1)}),document.addEventListener("click",e=>{const t=e.target;if(t.closest("[data-command]")&&!t.closest(".nav-link")){const n=t.closest("[data-command]"),r=n.getAttribute("data-command");if(r){if(n.tagName==="A"&&e.preventDefault(),this.router){const i=this.router.getPathForCommand(r);if(i){this.router.navigate(i,!1);return}}this.executeCommand(r,!1)}}}),document.addEventListener("change",e=>{const t=e.target,n=t.getAttribute("data-command-template"),r=t.getAttribute("data-setting-type");if(!n)return;let i="";t instanceof HTMLInputElement&&t.type==="checkbox"?i=`${n} ${t.checked?"on":"off"}`:t instanceof HTMLInputElement&&t.type==="color"?i=`${n} ${t.value}`:t instanceof HTMLInputElement&&t.type==="range"?i=`${n} ${t.value}`:t instanceof HTMLSelectElement&&(r==="font-family"?i=`${n} "${t.value}"`:i=`${n} ${t.value}`),i&&this.executeCommand(i,!1)}),document.addEventListener("input",e=>{const t=e.target;if(t.type==="range"){const n=t.getAttribute("data-setting-type");if(n==="font-size"){const r=document.getElementById("font-size-value");r&&(r.textContent=`${t.value}px`)}else if(n==="animation-speed"){const r=document.getElementById("animation-speed-value");r&&(r.textContent=`${t.value}x`)}}}),document.addEventListener("settings-changed",()=>{this.refreshSettingsPanels(),this.updatePrompt()})}refreshSettingsPanels(){if(!this.settingsManager||!this.themeManager)return;const e=document.querySelectorAll("[data-settings-panel]");if(e.length===0)return;const t=Array.from(e).some(r=>r.contains(document.activeElement)),n=dr(this.settingsManager,this.themeManager);if(e.forEach(r=>{const i=n.replace('<aside class="settings-panel" role="complementary" aria-label="Terminal settings" data-settings-panel="true">',"").replace(/<\/aside>$/,"");r.innerHTML=un(i)}),t&&e.length>0){const i=e[0].querySelector("button, input, select");i&&i.focus()}}focusSettingsPanelIfPresent(){setTimeout(()=>{const e=document.querySelector("[data-settings-panel]");if(e){const t=e.querySelector("button, input, select");t&&t.focus()}},0)}setupInputHandler(){this.input.onSubmit(async e=>{const t=e.trim();if(this.output.writeCommand(this.getPromptString(),t),this.input.addToHistory(t),t){const n=await this.executor.execute(t);this.displayResult(n),this.router&&this.router.syncUrlToCommand(t)}this.input.clear(),this.input.focus()})}displayResult(e){e.output===ur.CLEAR_SCREEN?(this.output.clear(),this.router&&window.location.pathname!=="/"&&window.history.pushState({},"","/")):e.output&&!e.raw&&(e.error?this.output.writeError(e.output):e.html?(this.output.writeHTML(e.output,()=>{typeof window.initializeGraphs=="function"&&window.initializeGraphs(),Bi(),this.output.performScrollBehavior(e.scrollBehavior)}),this.focusSettingsPanelIfPresent()):this.output.write(e.output,void 0,()=>{this.output.performScrollBehavior(e.scrollBehavior)}))}getPromptString(){const e={user:this.username,hostname:this.hostname,pwd:this.envVarManager?.getVariable("PWD")??this.currentPath,shortPwd:this.currentPath,lastDir:Kn.getLastDir(this.currentPath),isRoot:this.username==="root"},t=this.settingsManager?.getSetting("prompt")?.format??"\\u@\\h:\\W\\$ ";return this.promptFormatter.format(t,e)}updatePrompt(){this.input.setPrompt(this.getPromptString())}registerCommand(e){this.dispatcher.registerCommand(e),this.input.setAvailableCommands(this.dispatcher.getCommandNames())}registerCommands(e){e.forEach(t=>this.registerCommand(t))}setFileSystem(e){this.input.setFileSystem(e)}writeWelcome(e){this.output.write(e,void 0,()=>{this.output.performScrollBehavior()})}setUsername(e){this.username=e,this.updatePrompt()}getUsername(){return this.username}setCurrentPath(e){this.currentPath=e,this.updatePrompt()}focus(){this.input.focus()}getInput(){return this.input}setRouter(e){this.router=e}async executeCommand(e,t=!1){if(t&&this.output.clear(),this.output.writeCommand(this.getPromptString(),e),this.input.addToHistory(e),e.trim()){const n=await this.executor.execute(e);this.displayResult(n)}this.input.clear(),this.input.focus()}}class ji{aliases=new Map;fileSystem;aliasFilePath=ye.CONFIG_ALIASES;defaultAliases=new Map([["ll","ls -alh"]]);constructor(e){this.fileSystem=e,this.loadDefaultAliases(),this.loadAliases()}loadDefaultAliases(){this.defaultAliases.forEach((e,t)=>{this.aliases.set(t,e)})}loadAliases(){try{this.fileSystem.exists(this.aliasFilePath)&&this.fileSystem.isFile(this.aliasFilePath)&&this.fileSystem.readFile(this.aliasFilePath).split(`
`).filter(n=>n.trim()).forEach(n=>{const r=/^alias\s+(\S+)='(.+)'$/.exec(n);r&&this.aliases.set(r[1],r[2])})}catch{}}saveAliases(){const e=Array.from(this.aliases.entries()).map(([n,r])=>`alias ${n}='${r}'`),t=e.join(`
`)+(e.length>0?`
`:"");try{this.fileSystem.writeFile(this.aliasFilePath,t)}catch(n){throw new Error(`Failed to save aliases: ${n instanceof Error?n.message:String(n)}`)}}setAlias(e,t){if(!/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(e))throw new Error(`Invalid alias name: ${e}`);this.aliases.set(e,t),this.saveAliases()}removeAlias(e){const t=this.aliases.has(e);return t&&(this.aliases.delete(e),this.saveAliases()),t}getAlias(e){return this.aliases.get(e)}getAllAliases(){return new Map(this.aliases)}isDefaultAlias(e){return this.defaultAliases.has(e)}resolve(e){const t=/^(\S+)/.exec(e);if(!t)return e;const n=t[1],r=this.aliases.get(n);if(r){const i=e.replace(/^(\S+)/,r);return this.resolveRecursive(i,10)}return e}resolveRecursive(e,t){if(t<=0)return e;const n=/^(\S+)/.exec(e);if(!n)return e;const r=n[1],i=this.aliases.get(r);if(i){const o=e.replace(/^(\S+)/,i);return this.resolveRecursive(o,t-1)}return e}}class Zn{static parse(e){const t=e.trim();if(!t)return{command:"",args:[],raw:e};const n=this.splitCommand(t),r=n[0]?.toLowerCase()||"",i=n.slice(1);return{command:r,args:i,raw:e}}static splitCommand(e){const t=[];let n="",r=!1,i="",o=!1;for(const l of e){if(l==="\\"&&!o){o=!0;continue}if(o){n+=l,o=!1;continue}(l==='"'||l==="'")&&!r?(r=!0,i=l):l===i&&r?(r=!1,i=""):l===" "&&!r?n&&(t.push(n),n=""):n+=l}return n&&t.push(n),t}}class At extends Error{constructor(e){super(e),this.name="AppError",Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}}class ge extends At{constructor(e){super(e),this.name="FileSystemError"}}class Yi extends At{constructor(e){super(`Command not found: ${e}`),this.name="CommandNotFoundError"}}class ft{static parse(e){const t=[];let n="",r=!1,i="";for(let l=0;l<e.length;l++){const a=e[l],p=l>0?e[l-1]:"";if((a==='"'||a==="'")&&p!=="\\")r?a===i&&(r=!1,i=""):(r=!0,i=a),n+=a;else if(a==="|"&&!r){const m=n.trim();m&&t.push(m),n=""}else n+=a}const o=n.trim();return o&&t.push(o),t}static hasPipe(e){let t=!1,n="";for(let r=0;r<e.length;r++){const i=e[r],o=r>0?e[r-1]:"";if((i==='"'||i==="'")&&o!=="\\")t?i===n&&(t=!1,n=""):(t=!0,n=i);else if(i==="|"&&!t)return!0}return!1}}class Xi{commands=new Map;registerCommand(e){this.commands.set(e.name.toLowerCase(),e),e.aliases&&e.aliases.forEach(t=>{this.commands.set(t.toLowerCase(),e)})}async dispatch(e){const t=Zn.parse(e);if(!t.command)return{output:""};const n=this.commands.get(t.command);if(!n)return{output:`${new Yi(t.command).message}
Type 'help' for available commands.`,error:!0};try{return await n.execute(t.args)}catch(r){return r instanceof At?{output:r.message,error:!0}:r instanceof Error?{output:`Error: ${r.message}`,error:!0}:{output:"An unknown error occurred.",error:!0}}}async dispatchPipeline(e){const t=ft.parse(e);if(t.length===0)return{output:""};let n={output:""};for(let r=0;r<t.length;r++){const i=t[r],o=r===0?void 0:n.output,l=Zn.parse(i);if(!l.command)return{output:""};const a=this.commands.get(l.command);if(!a)return{output:`Command not found: ${l.command}
Type 'help' for available commands.`,error:!0};try{if(n=await a.execute(l.args,o),n.error)return n}catch(p){return p instanceof At?{output:p.message,error:!0}:p instanceof Error?{output:`Error: ${p.message}`,error:!0}:{output:"An unknown error occurred.",error:!0}}}return n}getCommands(){const e=new Map;return this.commands.forEach((t,n)=>{t.name===n&&e.set(n,t)}),Array.from(e.values())}getCommandNames(){return Array.from(this.commands.keys())}}class qi{constructor(e,t,n){this.dispatcher=e,this.aliasManager=t,this.envVarManager=n}async execute(e){const t=e.trim();if(!t)return{output:""};let n;ft.hasPipe(t)?n=ft.parse(t).map(p=>this.aliasManager.resolve(p.trim())).join(" | "):n=this.aliasManager.resolve(t);const r=this.envVarManager?this.envVarManager.expandVariables(n):n;return ft.hasPipe(r)?await this.dispatcher.dispatchPipeline(r):await this.dispatcher.dispatch(r)}}class Ki{platformVars=new Map;userVars=new Map;fileSystem;constructor(e,t,n){this.fileSystem=e,this.initializePlatformVariables(t,n),this.loadUserVariables()}initializePlatformVariables(e,t){const n=`/home/${e}`;this.platformVars.set("HOME",n),this.platformVars.set("USER",e),this.platformVars.set("LOGNAME",e),this.platformVars.set("HOSTNAME",t),this.platformVars.set("PWD",n),this.platformVars.set("OLDPWD",""),this.platformVars.set("SHELL","/bin/bash"),this.platformVars.set("PATH","/usr/local/bin:/usr/bin:/bin"),this.platformVars.set("TERM","xterm-256color")}loadUserVariables(){try{const e=localStorage.getItem(Xt.ENVIRONMENT);if(e){const t=JSON.parse(e);Object.entries(t).forEach(([n,r])=>{this.userVars.set(n,r)})}this.syncToFileSystem()}catch(e){console.warn("Failed to load environment variables from localStorage:",e)}}saveUserVariables(){try{const e={};this.userVars.forEach((t,n)=>{e[n]=t}),localStorage.setItem(Xt.ENVIRONMENT,JSON.stringify(e)),this.syncToFileSystem()}catch(e){console.warn("Failed to save environment variables to localStorage:",e)}}syncToFileSystem(){try{const e=[];e.push("# Environment Variables"),e.push("# Platform variables (read-only):"),this.platformVars.forEach((n,r)=>{e.push(`${r}=${n}`)}),this.userVars.size>0&&(e.push(""),e.push("# User variables:"),this.userVars.forEach((n,r)=>{e.push(`export ${r}=${n}`)}));const t=e.join(`
`);this.fileSystem.writeFile(ye.CONFIG_ENV,t)}catch(e){console.warn("Failed to sync environment variables to filesystem:",e)}}getVariable(e){return this.userVars.get(e)??this.platformVars.get(e)}setVariable(e,t){if(!/^[A-Z_][A-Z0-9_]*$/i.test(e))throw new Error(`Invalid variable name: ${e}`);this.userVars.set(e,t),this.saveUserVariables()}updatePlatformVariable(e,t){this.platformVars.has(e)&&this.platformVars.set(e,t)}unsetVariable(e){this.userVars.delete(e)&&this.saveUserVariables()}getPlatformVariables(){return new Map(this.platformVars)}getUserVariables(){return new Map(this.userVars)}getAllVariables(){const e=new Map;return this.platformVars.forEach((t,n)=>{e.set(n,t)}),this.userVars.forEach((t,n)=>{e.set(n,t)}),e}expandVariables(e){let t=e;return t=t.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/gi,(n,r)=>this.getVariable(r)??n),t=t.replace(new RegExp("(?<!\\\\)\\$([A-Z_][A-Z0-9_]*)","gi"),(n,r)=>this.getVariable(r)??n),t=t.replace(/\\\$/g,"$"),t}exportFormat(){const e=[];return this.getAllVariables().forEach((t,n)=>{e.push(`${n}=${t}`)}),e.sort()}}const Zi=`---
title: 'A Love Letter to Developers (and the terminal)'
date: '2025-11-16'
tags:
  ['ai', 'claude-code', 'web-development', 'developers', 'terminal', 'craftsmanship', 'invention']
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
- **Me:** "Good. Now, write the \`ls\` command. Support flags like \`ls -al\`. Add the \`tree\` command as weel.
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
`,Qi=Object.freeze(Object.defineProperty({__proto__:null,default:Zi},Symbol.toStringTag,{value:"Module"})),Ji=`---
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
`,eo=Object.freeze(Object.defineProperty({__proto__:null,default:Ji},Symbol.toStringTag,{value:"Module"})),to=`---
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
`,no=Object.freeze(Object.defineProperty({__proto__:null,default:to},Symbol.toStringTag,{value:"Module"})),ro=`---
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
`,so=Object.freeze(Object.defineProperty({__proto__:null,default:ro},Symbol.toStringTag,{value:"Module"})),io=`---
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
`,oo=Object.freeze(Object.defineProperty({__proto__:null,default:io},Symbol.toStringTag,{value:"Module"})),ao=`# Darin Chambers

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
`,lo=Object.freeze(Object.defineProperty({__proto__:null,default:ao},Symbol.toStringTag,{value:"Module"})),_o=`# Contact Information

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
`,co=Object.freeze(Object.defineProperty({__proto__:null,default:_o},Symbol.toStringTag,{value:"Module"})),uo=`# Terminal Help

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
`,ho=Object.freeze(Object.defineProperty({__proto__:null,default:uo},Symbol.toStringTag,{value:"Module"}));class mo{static createDirectoryNode(e){const t=e.startsWith(".");return{name:e,type:"directory",children:new Map,permissions:"drwxr-xr-x",owner:"darin",size:4096,modifiedTime:new Date,isHidden:t}}static createFileNode(e,t){const n=e.startsWith(".");return{name:e,type:"file",content:t,permissions:"-rw-r--r--",owner:"darin",size:t.length,modifiedTime:new Date,isHidden:n}}static loadBlogFiles(){const e=Object.assign({"../../content/blog/2025-11-14-a-love-letter-to-developers-and-the-terminal.md":Qi,"../../content/blog/2025-11-15-we-trick-rocks-into-thinking.md":eo,"../../content/blog/2025-11-16-building-an-enterprise-grade-graph-library-in-one-week.md":no,"../../content/blog/2025-11-23-leet-status-unlocked.md":so}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),o=r.default;t.set(i,this.createFileNode(i,o))}return t}static loadPortfolioFiles(){const e=Object.assign({"../../content/portfolio/hypergrowing-a-unicorn.md":oo}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),o=r.default;t.set(i,this.createFileNode(i,o))}return t}static loadContentFiles(){const e=Object.assign({"../../content/about.md":lo,"../../content/contact.md":co,"../../content/help.md":ho}),t=new Map;for(const[n,r]of Object.entries(e)){const i=n.split("/").pop(),o=r.default;t.set(i,this.createFileNode(i,o))}return t}static createDefaultStructure(){const e=this.createDirectoryNode(""),t=e.children;t.set("root",this.createDirectoryNode("root"));const n=this.createDirectoryNode("home");t.set("home",n);const r=this.createDirectoryNode("guest");n.children.set("guest",r),r.children.set("README.txt",this.createFileNode("README.txt",`Welcome to darinchambers.com!

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
`));const o=this.createDirectoryNode("blog");i.children.set("blog",o);const l=this.loadBlogFiles();for(const[R,x]of l)o.children.set(R,x);const a=this.createDirectoryNode("content");i.children.set("content",a);const p=this.loadContentFiles();for(const[R,x]of p)a.children.set(R,x);const m=this.createDirectoryNode("portfolio");i.children.set("portfolio",m);const A=this.loadPortfolioFiles();for(const[R,x]of A)m.children.set(R,x);const E=this.createDirectoryNode("usr");t.set("usr",E);const C=this.createDirectoryNode("bin");E.children.set("bin",C),C.children.set("help",this.createFileNode("help","[Core command: help]")),C.children.set("clear",this.createFileNode("clear","[Core command: clear]")),C.children.set("history",this.createFileNode("history","[Core command: history]")),C.children.set("date",this.createFileNode("date","[Core command: date]")),C.children.set("ddate",this.createFileNode("ddate","[Novelty command: ddate]")),C.children.set("figlet",this.createFileNode("figlet","[Novelty command: figlet]")),C.children.set("whoami",this.createFileNode("whoami","[Core command: whoami]")),C.children.set("alias",this.createFileNode("alias","[Core command: alias]")),C.children.set("unalias",this.createFileNode("unalias","[Core command: unalias]")),C.children.set("ls",this.createFileNode("ls","[Core command: ls]")),C.children.set("cd",this.createFileNode("cd","[Core command: cd]")),C.children.set("pwd",this.createFileNode("pwd","[Core command: pwd]")),C.children.set("cat",this.createFileNode("cat","[Core command: cat]")),C.children.set("tree",this.createFileNode("tree","[Core command: tree]")),C.children.set("render",this.createFileNode("render","[Core command: render]"));const M=this.createDirectoryNode("local");E.children.set("local",M);const N=this.createDirectoryNode("bin");return M.children.set("bin",N),N.children.set("about",this.createFileNode("about","[Custom command: about]")),N.children.set("portfolio",this.createFileNode("portfolio","[Custom command: portfolio]")),N.children.set("blog",this.createFileNode("blog","[Custom command: blog]")),N.children.set("contact",this.createFileNode("contact","[Custom command: contact]")),N.children.set("settings",this.createFileNode("settings","[Custom command: settings]")),e}}class po{root;currentPath;currentUsername="darin";constructor(e){this.root=e,this.currentPath=ye.HOME_DARIN}getCurrentPath(){return this.currentPath}setCurrentUsername(e){this.currentUsername=e}getShortPath(){if(this.currentPath==="/")return"/";const e=`/home/${this.currentUsername}`;return this.currentPath===e?"~":this.currentPath.startsWith(e+"/")?"~"+this.currentPath.substring(e.length):this.currentPath}resolvePath(e){return e.startsWith("/")?this.normalizePath(e):e==="~"?`/home/${this.currentUsername}`:e.startsWith("~/")?`/home/${this.currentUsername}`+e.substring(1):this.normalizePath(this.currentPath+"/"+e)}normalizePath(e){const t=e.split("/").filter(r=>r.length>0),n=[];for(const r of t)r===".."?n.pop():r!=="."&&n.push(r);return"/"+n.join("/")}getNode(e){const t=this.resolvePath(e);if(t==="/")return this.root;const n=t.split("/").filter(i=>i.length>0);let r=this.root;for(const i of n){if(!r.children?.has(i))return null;r=r.children.get(i)}return r}list(e="."){const t=this.getNode(e);if(!t)throw new ge(`ls: cannot access '${e}': No such file or directory`);if(t.type!=="directory")throw new ge(`ls: ${e}: Not a directory`);return Array.from(t.children.keys()).sort()}changeDirectory(e){const t=this.resolvePath(e),n=this.getNode(t);if(!n)throw new ge(`cd: ${e}: No such file or directory`);if(n.type!=="directory")throw new ge(`cd: ${e}: Not a directory`);this.currentPath=t||"/"}readFile(e){const t=this.getNode(e);if(!t)throw new ge(`cat: ${e}: No such file or directory`);if(t.type!=="file")throw new ge(`cat: ${e}: Is a directory`);return t.content??""}exists(e){return this.getNode(e)!==null}isDirectory(e){const t=this.getNode(e);return t!==null&&t.type==="directory"}isFile(e){const t=this.getNode(e);return t!==null&&t.type==="file"}writeFile(e,t){const r=this.resolvePath(e).split("/").filter(a=>a.length>0),i=r.pop();if(!i)throw new ge(`Invalid file path: ${e}`);let o=this.root;for(const a of r){if(!o.children?.has(a))throw new ge(`Directory does not exist: ${e}`);if(o=o.children.get(a),o.type!=="directory")throw new ge(`Not a directory: ${e}`)}const l={name:i,type:"file",content:t};o.children.set(i,l)}createDirectory(e){const n=this.resolvePath(e).split("/").filter(i=>i.length>0);let r=this.root;for(const i of n)if(r.children?.has(i)){const o=r.children.get(i);if(o.type!=="directory")throw new ge(`mkdir: ${e}: File exists but is not a directory`);r=o}else{const o={name:i,type:"directory",children:new Map};r.children.set(i,o),r=o}}getTree(e=".",t=4){const n=this.getNode(e);if(!n)throw new ge(`tree: cannot access '${e}': No such file or directory`);const r=[],i=this.resolvePath(e);return r.push(i==="/"?"/":i),n.type==="directory"&&this.buildTree(n,"",r,1,t),r}buildTree(e,t,n,r,i){if(r>i||!e.children)return;const o=Array.from(e.children.entries()).sort((l,a)=>l[1].type==="directory"&&a[1].type==="file"?-1:l[1].type==="file"&&a[1].type==="directory"?1:l[0].localeCompare(a[0]));o.forEach(([l,a],p)=>{const m=p===o.length-1,A=m?"└── ":"├── ",E=m?"    ":"│   ";n.push(t+A+l),a.type==="directory"&&this.buildTree(a,t+E,n,r+1,i)})}}class fo{terminal;routes;isNavigating=!1;onRouteChangeCallback=null;fileSystem;constructor(e,t){this.terminal=e,this.fileSystem=t,this.routes=this.initializeRoutes(),this.setupListeners()}initializeRoutes(){return[{pattern:/^\/blog\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`blog ${e[1]}`},{pattern:/^\/blog\/?$/,commandBuilder:()=>"blog"},{pattern:/^\/about\/?$/,commandBuilder:()=>"about"},{pattern:/^\/portfolio\/([a-zA-Z0-9-]+)$/,commandBuilder:e=>`portfolio ${e[1]}`},{pattern:/^\/portfolio\/?$/,commandBuilder:(e,t)=>{const n=t?.get("tags");return n?`portfolio --tags ${n}`:"portfolio"}},{pattern:/^\/contact\/?$/,commandBuilder:()=>"contact"},{pattern:/^\/settings\/?$/,commandBuilder:()=>"settings"},{pattern:/^\/help\/?$/,commandBuilder:()=>"help"},{pattern:/^\/matrix\/?$/,commandBuilder:()=>"matrix"},{pattern:/^\/$/,commandBuilder:()=>"about"}]}setupListeners(){window.addEventListener("popstate",()=>{this.handleRouteChange(!1)})}handleInitialRoute(){const e=sessionStorage.getItem("ghPagesRedirect");e&&(sessionStorage.removeItem("ghPagesRedirect"),window.history.replaceState({},"",e)),this.handleRouteChange(!1)}handleRouteChange(e){const t=window.location.pathname,n=new URLSearchParams(window.location.search),r=this.parseRoute(t,n);r?(this.isNavigating=!0,this.terminal.executeCommand(r,e),this.isNavigating=!1,this.onRouteChangeCallback&&this.onRouteChangeCallback(r)):this.navigate("/",!0)}parseRoute(e,t){for(const n of this.routes){const r=e.match(n.pattern);if(r)return n.commandBuilder(r,t)}return null}navigate(e,t=!0){this.isNavigating||(window.history.pushState({},"",e),this.handleRouteChange(t))}getValidBlogPostIds(){try{const e=ye.CONTENT_BLOG,n=this.fileSystem.list(e).filter(i=>i.endsWith(".md")),r=new Set;for(const i of n){const o=hr.getIdFromFilename(i);r.add(o)}return r}catch{return new Set}}getPathForCommand(e){const t=e.trim();if(t.startsWith("blog ")&&!t.includes("--tag")){const r=t.substring(5).trim();return this.getValidBlogPostIds().has(r)?`/blog/${r}`:null}if(t.startsWith("portfolio --tags ")){const r=t.substring(17).trim();return r?`/portfolio?tags=${encodeURIComponent(r)}`:"/portfolio"}return t.startsWith("portfolio ")?`/portfolio/${t.substring(10).trim()}`:{blog:"/blog",about:"/about",portfolio:"/portfolio",contact:"/contact",settings:"/settings",help:"/help",matrix:"/matrix"}[t]||null}syncUrlToCommand(e){const t=this.getPathForCommand(e);t&&window.location.pathname!==t&&window.history.pushState({},"",t),this.onRouteChangeCallback&&this.onRouteChangeCallback(e)}onRouteChange(e){this.onRouteChangeCallback=e}getCurrentCommand(){const e=new URLSearchParams(window.location.search);return this.parseRoute(window.location.pathname,e)}}class $o{settings;fileSystem;settingsPath=ye.CONFIG_SETTINGS;storageKey=Xt.SETTINGS;constructor(e){this.fileSystem=e,this.settings=this.loadFromLocalStorage()??this.getDefaults(),this.syncToFileSystem()}loadFromLocalStorage(){try{const e=localStorage.getItem(this.storageKey);if(!e)return null;const t=JSON.parse(e);return!t.theme||!t.font||!t.effects||!t.prompt?(console.warn("SettingsManager: Invalid settings structure in localStorage, using defaults"),null):t}catch(e){return console.warn("SettingsManager: Failed to load settings from localStorage:",e),null}}saveToLocalStorage(){try{const e=JSON.stringify(this.settings,null,2);localStorage.setItem(this.storageKey,e)}catch(e){throw console.error("SettingsManager: Failed to save settings to localStorage:",e),new Error(`Failed to save settings: ${e instanceof Error?e.message:String(e)}`)}}syncToFileSystem(){try{const e=JSON.stringify(this.settings,null,2);this.fileSystem.writeFile(this.settingsPath,e)}catch(e){console.error("SettingsManager: Failed to sync settings to filesystem:",e)}}getDefaults(){return JSON.parse(JSON.stringify(Ds))}loadSettings(){return this.settings}saveSettings(e){this.settings=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSetting(e){return this.settings[e]}setSetting(e,t){this.settings[e]=t,this.saveToLocalStorage(),this.syncToFileSystem()}getThemePreset(){return this.settings.theme.preset}setThemePreset(e){if(!this.validateThemePreset(e))throw new Error(`Invalid theme preset: ${String(e)}`);this.settings.theme.preset=e,e!=="custom"&&(this.settings.theme.customColors=void 0),this.saveToLocalStorage(),this.syncToFileSystem()}getCustomColors(){return this.settings.theme.customColors}setCustomColors(e){this.settings.theme.preset="custom",this.settings.theme.customColors=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontSize(){return this.settings.font.size}setFontSize(e){if(!this.validateFontSize(e))throw new Error(`Invalid font size: ${e}. Must be between 8 and 24.`);this.settings.font.size=e,this.saveToLocalStorage(),this.syncToFileSystem()}getFontFamily(){return this.settings.font.family}setFontFamily(e){if(!this.validateFontFamily(e))throw new Error(`Invalid font family: ${String(e)}`);this.settings.font.family=e,this.saveToLocalStorage(),this.syncToFileSystem()}getScanLines(){return this.settings.effects.scanLines}setScanLines(e){this.settings.effects.scanLines=e,this.saveToLocalStorage(),this.syncToFileSystem()}getGlow(){return this.settings.effects.glow}setGlow(e){this.settings.effects.glow=e,this.saveToLocalStorage(),this.syncToFileSystem()}getBorder(){return this.settings.effects.border}setBorder(e){this.settings.effects.border=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAnimationSpeed(){return this.settings.effects.animationSpeed}setAnimationSpeed(e){if(!this.validateAnimationSpeed(e))throw new Error(`Invalid animation speed: ${e}. Must be between 0.5 and 2.0.`);this.settings.effects.animationSpeed=e,this.saveToLocalStorage(),this.syncToFileSystem()}getSoundEffects(){return this.settings.effects.soundEffects}setSoundEffects(e){this.settings.effects.soundEffects=e,this.saveToLocalStorage(),this.syncToFileSystem()}getAutoScrollBehavior(){return this.settings.effects.autoScrollBehavior}setAutoScrollBehavior(e){this.settings.effects.autoScrollBehavior=e,this.saveToLocalStorage(),this.syncToFileSystem()}getPromptFormat(){return this.settings.prompt.format}setPromptFormat(e){this.settings.prompt.format=e,this.saveToLocalStorage(),this.syncToFileSystem()}reset(){this.settings=this.getDefaults(),localStorage.removeItem(this.storageKey),this.saveToLocalStorage(),this.syncToFileSystem()}validateThemePreset(e){return["green","yellow","white","light-blue","paper","dc","custom"].includes(e)}validateFontSize(e){return typeof e=="number"&&e>=8&&e<=24&&!isNaN(e)}validateFontFamily(e){return["Fira Code","JetBrains Mono","Cascadia Code","Menlo","Monaco","Courier New","monospace"].includes(e)}validateAnimationSpeed(e){return typeof e=="number"&&e>=.5&&e<=2&&!isNaN(e)}}class go{settingsManager;presets;constructor(e){this.settingsManager=e,this.presets=new Map,this.initializePresets()}initializePresets(){[{name:"green",displayName:"Green",colors:{"--terminal-bg":"#0a0e14","--terminal-fg":"#39ff14","--terminal-accent":"#00ff99","--terminal-dim":"#20c20e","--terminal-error":"#ff3333","--terminal-cursor":"#39ff14","--terminal-bg-secondary":"#0d1117"}},{name:"yellow",displayName:"Amber",colors:{"--terminal-bg":"#1a1410","--terminal-fg":"#ffb000","--terminal-accent":"#ffd700","--terminal-dim":"#cc8800","--terminal-error":"#ff3333","--terminal-cursor":"#ffb000","--terminal-bg-secondary":"#0f0b08"}},{name:"white",displayName:"White",colors:{"--terminal-bg":"#1a1a1a","--terminal-fg":"#d4d4d4","--terminal-accent":"#88ccff","--terminal-dim":"#999999","--terminal-error":"#ff5555","--terminal-cursor":"#ffffff","--terminal-bg-secondary":"#242424"}},{name:"light-blue",displayName:"Cyan",colors:{"--terminal-bg":"#0a1420","--terminal-fg":"#00d4ff","--terminal-accent":"#00ffff","--terminal-dim":"#0088aa","--terminal-error":"#ff3333","--terminal-cursor":"#00d4ff","--terminal-bg-secondary":"#0d1825"}},{name:"paper",displayName:"Paper",colors:{"--terminal-bg":"#ffffff","--terminal-fg":"#1a1a1a","--terminal-accent":"#007298","--terminal-dim":"#666666","--terminal-error":"#cc0000","--terminal-cursor":"#1a1a1a","--terminal-bg-secondary":"#f0f0f0"}},{name:"dc",displayName:"DC",colors:{"--terminal-bg":"#110e0c","--terminal-fg":"#70dbff","--terminal-accent":"#ffa940","--terminal-dim":"#d4915e","--terminal-error":"#ff4d4d","--terminal-cursor":"#aaff66","--terminal-bg-secondary":"#1c1410"}}].forEach(t=>{this.presets.set(t.name,t)})}getPresets(){return Array.from(this.presets.values())}getPreset(e){return this.presets.get(e)??null}applyTheme(e){if(e==="custom")throw new Error('Cannot apply "custom" theme directly. Use applyCustomColors() instead.');const t=this.presets.get(e);if(!t){const n=Array.from(this.presets.keys()).join(", ");throw new Error(`Invalid theme name: ${e}. Available themes: ${n}`)}this.updateCSSVariables(t.colors),this.settingsManager.setThemePreset(e)}applyCustomColors(e){Object.entries(e).forEach(([i,o])=>{if(!this.validateColor(o))throw new Error(`Invalid color value for ${i}: ${o}. Expected hex format (e.g., #ff0000 or #f00)`)});const t=this.getCurrentColors(),n=this.mergeColors(t,e);this.updateCSSVariables(n);const r={background:n["--terminal-bg"],foreground:n["--terminal-fg"],accent:n["--terminal-accent"],dim:n["--terminal-dim"],error:n["--terminal-error"],cursor:n["--terminal-cursor"],backgroundSecondary:n["--terminal-bg-secondary"]};this.settingsManager.setCustomColors(r)}applyCurrentTheme(){const e=this.settingsManager.loadSettings(),{preset:t,customColors:n}=e.theme;if(t==="custom"&&n){const r={"--terminal-bg":n.background,"--terminal-fg":n.foreground,"--terminal-accent":n.accent,"--terminal-dim":n.dim,"--terminal-error":n.error,"--terminal-cursor":n.cursor,"--terminal-bg-secondary":n.backgroundSecondary};this.updateCSSVariables(r)}else if(t!=="custom"){const r=this.presets.get(t);if(r)this.updateCSSVariables(r.colors);else{console.warn(`ThemeManager: Unknown preset "${t}", falling back to green`);const i=this.presets.get("green");i&&this.updateCSSVariables(i.colors)}}}getCurrentColors(){if(typeof document>"u"){const n=this.presets.get("green");return n?n.colors:{}}const e=document.documentElement,t=getComputedStyle(e);return{"--terminal-bg":t.getPropertyValue("--terminal-bg").trim()||"#0a0e14","--terminal-fg":t.getPropertyValue("--terminal-fg").trim()||"#39ff14","--terminal-accent":t.getPropertyValue("--terminal-accent").trim()||"#39ff14","--terminal-dim":t.getPropertyValue("--terminal-dim").trim()||"#20c20e","--terminal-error":t.getPropertyValue("--terminal-error").trim()||"#ff3333","--terminal-cursor":t.getPropertyValue("--terminal-cursor").trim()||"#39ff14","--terminal-bg-secondary":t.getPropertyValue("--terminal-bg-secondary").trim()||"#0d1117"}}updateCSSVariables(e){if(typeof document>"u"){console.warn("ThemeManager: document not available, skipping CSS update");return}const t=document.documentElement;Object.entries(e).forEach(([n,r])=>{t.style.setProperty(n,r)})}validateColor(e){return/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e)}mergeColors(e,t){return{"--terminal-bg":t["--terminal-bg"]??e["--terminal-bg"],"--terminal-fg":t["--terminal-fg"]??e["--terminal-fg"],"--terminal-accent":t["--terminal-accent"]??e["--terminal-accent"],"--terminal-dim":t["--terminal-dim"]??e["--terminal-dim"],"--terminal-error":t["--terminal-error"]??e["--terminal-error"],"--terminal-cursor":t["--terminal-cursor"]??e["--terminal-cursor"],"--terminal-bg-secondary":t["--terminal-bg-secondary"]??e["--terminal-bg-secondary"]}}}const Ar=document.getElementById("terminal-header");if(!Ar)throw new Error("Header element not found");new Wi(Ar);const To=mo.createDefaultStructure(),Z=new po(To),xe=new $o(Z),Rt=new go(xe),rt=new Ki(Z,"darin","darinchambers.com");Rt.applyCurrentTheme();const Qn=xe.getSetting("font");typeof document<"u"&&(document.documentElement.style.setProperty("--terminal-font-size",`${Qn.size}px`),document.documentElement.style.setProperty("--terminal-font-family",Qn.family));const Lo=xe.getScanLines();typeof document<"u"&&(Lo||document.body.classList.add("no-scan-lines"));const Eo=xe.getGlow();typeof document<"u"&&(Eo||document.body.classList.add("no-glow"));const Ao=xe.getBorder();typeof document<"u"&&Ao&&document.body.classList.add("border-enabled");const Io=xe.getAnimationSpeed();typeof document<"u"&&document.documentElement.style.setProperty("--terminal-animation-speed",Io.toString());const hn=new Xi,dn=new ji(Z),yo=new qi(hn,dn,rt),Ae=new zi(hn,yo,xe,Rt,rt);Ae.setCurrentPath(Z.getShortPath());Ae.setFileSystem(Z);const Ir=document.getElementById("nav-links");if(!Ir)throw new Error("Navigation links element not found");const Ro={name:"help",description:"Display available commands",execute:async(s,e)=>{try{if(s.length>0){const r=s[0];return await hn.dispatch(`${r} --help`)}const t=Z.readFile(ye.CONTENT_HELP);return{output:oe.render(t),html:!0,scrollBehavior:"top"}}catch(t){return{output:t instanceof Error?t.message:String(t),error:!0}}}},So={name:"clear",description:"Clear the terminal screen",execute:(s,e)=>new z(s).hasFlag("help")?{output:`Usage: clear

Description:
  Clear the terminal screen and remove all output

Examples:
  clear                # Clear the screen`}:{output:ur.CLEAR_SCREEN}},bo=ks(Z),Co=Cs(Z,s=>Ae.setCurrentPath(s),rt),wo=vs(Z),No=bs(Z),xo=Os(Z),ko=Fr(Ae.getInput()),vo=Or(dn),Oo=Rs(dn),Do=Ss(Ae),Po=Ps(Z),Mo=Fs(Z),Ho=Bs(Z),Fo=Hs(Z),Wo=ys(Z),Uo=Ys(Z,xe,Rt),Bo=Mr(rt),Go=Hr(rt),Vo=$i(Rt);Ae.registerCommands([Ro,So,ko,Dr,Pr,Do,vo,Oo,Bo,Go,bo,Co,wo,No,xo,Wo,Po,Ho,Fo,Mo,Uo,oi,mi,Vo]);const zo=[{label:"about",command:"about"},{label:"portfolio",command:"portfolio"},{label:"blog",command:"blog"},{label:"contact",command:"contact"},{label:"settings",command:"settings"},{label:"help",command:"help"}],jo=`Type 'help' to see all commands, or click a command above to get started.
Try 'about' to learn more, 'portfolio' to see my work, or explore with 'ls'.
`;Ae.writeWelcome(jo);const st=new fo(Ae,Z);Ae.setRouter(st);const mn=new Ui(Ir,s=>{const t={about:"/about",portfolio:"/portfolio",blog:"/blog",contact:"/contact",skills:"/skills",settings:"/settings",help:"/help"}[s];t?st.navigate(t,!0):Ae.executeCommand(s,!0)});mn.setItems(zo);st.onRouteChange(s=>{mn.setActiveItem(s)});st.handleInitialRoute();const Jn=st.getCurrentCommand();Jn&&mn.setActiveItem(Jn);vr();async function yr(){if(typeof window.SVGGraphNetwork>"u"){console.warn("SVGGraphNetwork library not loaded");return}document.querySelectorAll("[data-graph]").forEach(t=>{if(t.hasAttribute("data-graph-initialized"))return;const n=t,r=n.id||"unknown";try{const i=t.getAttribute("data-graph");if(!i){console.warn(`Graph container ${r} has no data-graph attribute`);return}const o=JSON.parse(i),l=t.getAttribute("data-graph-theme");l&&o&&typeof o=="object"&&"config"in o&&(o.config.theme=l),new window.SVGGraphNetwork(n.id||n,o),t.setAttribute("data-graph-initialized","true")}catch(i){console.error(`Failed to initialize graph ${r}:`,i),t.setAttribute("data-graph-initialized","true"),t.setAttribute("data-graph-error","true")}});const e=document.querySelectorAll("[data-graph-src]");for(const t of e){if(t.hasAttribute("data-graph-initialized"))continue;const n=t,r=n.id||"unknown",i=t.getAttribute("data-graph-src");if(!i){console.warn(`Graph container ${r} has no data-graph-src attribute`);continue}try{const o=await fetch(i);if(!o.ok)throw new Error(`Failed to fetch ${i}: ${o.statusText}`);const l=await o.json(),a=t.getAttribute("data-graph-theme");a&&l&&typeof l=="object"&&"config"in l&&(l.config.theme=a),new window.SVGGraphNetwork(n.id||n,l),t.setAttribute("data-graph-initialized","true")}catch(o){console.error(`Failed to initialize graph ${r} from ${i}:`,o),t.setAttribute("data-graph-initialized","true"),t.setAttribute("data-graph-error","true")}}}yr();window.initializeGraphs=yr;Ae.focus();
