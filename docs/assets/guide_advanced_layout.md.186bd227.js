import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.1153a8c2.js";const h=JSON.parse('{"title":"布局原理","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/layout.md","filePath":"guide/advanced/layout.md"}'),l={name:"guide/advanced/layout.md"},o=p(`<h1 id="布局原理" tabindex="-1">布局原理 <a class="header-anchor" href="#布局原理" aria-label="Permalink to &quot;布局原理&quot;">​</a></h1><p>tmagic-editor的布局实现方式，<strong>关键在于将布局配置指定在容器上，对容器内的所有子组件生效</strong>，这是tmagic-editor页面可以支持各种布局方式混合使用的核心方法。</p><h2 id="容器" tabindex="-1">容器 <a class="header-anchor" href="#容器" aria-label="Permalink to &quot;容器&quot;">​</a></h2><p>前面概念介绍中有提到，tmagic-editor的容器是组件的基础。组件必属于某个容器，容器下可以放组件，也可以放容器。页面本身就是一个容器，是所有容器和组件的根，整个页面的容器和组件组成一个树状结构。在 DSL 配置中，表现为:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[{</span></span>
<span class="line"><span style="color:#E1E4E8;">  id: </span><span style="color:#79B8FF;">123456</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  type: </span><span style="color:#9ECBFF;">&#39;page&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  items: [{</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">222222</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&#39;comp-A&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">333333</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&#39;comp-B&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }]</span></span>
<span class="line"><span style="color:#E1E4E8;">}]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[{</span></span>
<span class="line"><span style="color:#24292E;">  id: </span><span style="color:#005CC5;">123456</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  type: </span><span style="color:#032F62;">&#39;page&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  items: [{</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">222222</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&#39;comp-A&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  }, {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">333333</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&#39;comp-B&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  }]</span></span>
<span class="line"><span style="color:#24292E;">}]</span></span></code></pre></div><h2 id="顺序-绝对定位" tabindex="-1">顺序/绝对定位 <a class="header-anchor" href="#顺序-绝对定位" aria-label="Permalink to &quot;顺序/绝对定位&quot;">​</a></h2><p>组件是绝对或者顺序定位，体现在组件的<strong>直属父级容器</strong>上，比如我们将 page 设置为绝对定位，则它的子组件，全都为绝对定位。在 DSL 配置中，表现为：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[{</span></span>
<span class="line"><span style="color:#E1E4E8;">  id: </span><span style="color:#79B8FF;">123456</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  type: </span><span style="color:#9ECBFF;">&#39;page&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  layout: </span><span style="color:#9ECBFF;">&quot;absolute&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  items: [{</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">222222</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&#39;comp-A&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    style: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      position: </span><span style="color:#9ECBFF;">&#39;absolute&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">333333</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&#39;comp-B&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    style: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      position: </span><span style="color:#9ECBFF;">&#39;absolute&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  }]</span></span>
<span class="line"><span style="color:#E1E4E8;">}]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[{</span></span>
<span class="line"><span style="color:#24292E;">  id: </span><span style="color:#005CC5;">123456</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  type: </span><span style="color:#032F62;">&#39;page&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  layout: </span><span style="color:#032F62;">&quot;absolute&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  items: [{</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">222222</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&#39;comp-A&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    style: {</span></span>
<span class="line"><span style="color:#24292E;">      position: </span><span style="color:#032F62;">&#39;absolute&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  }, {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">333333</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&#39;comp-B&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    style: {</span></span>
<span class="line"><span style="color:#24292E;">      position: </span><span style="color:#032F62;">&#39;absolute&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  }]</span></span>
<span class="line"><span style="color:#24292E;">}]</span></span></code></pre></div><p>所以，我们对绝对/顺序排布的配置描述 layout，是存在于容器上的。</p><h2 id="混合布局" tabindex="-1">混合布局 <a class="header-anchor" href="#混合布局" aria-label="Permalink to &quot;混合布局&quot;">​</a></h2><p>因为tmagic-editor的布局配置，是指定在容器上的，所以tmagic-editor的设计方式，就可以支持在页面中实现各种混合布局的嵌套。</p><img src="https://image.video.qpic.cn/oa_88b7d-37_1417201939_1636341538475155?imageView2/q/70">`,12),e=[o];function t(c,E,r,i,y,d){return a(),n("div",null,e)}const F=s(l,[["render",t]]);export{h as __pageData,F as default};
