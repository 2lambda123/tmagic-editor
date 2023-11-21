import{_ as a,C as p,o as l,c as o,H as e,Q as s}from"./chunks/framework.1153a8c2.js";const h=JSON.parse('{"title":"联动原理","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/coupling.md","filePath":"guide/advanced/coupling.md"}'),t={name:"guide/advanced/coupling.md"},c=s('<h1 id="联动原理" tabindex="-1">联动原理 <a class="header-anchor" href="#联动原理" aria-label="Permalink to &quot;联动原理&quot;">​</a></h1><p>tmagic-editor的联动，指这两种情况：</p><ul><li>在编辑器中，组件的表单配置项之间需要联动。</li><li>页面中的组件之间，需要联动触发行为。</li></ul><h2 id="表单联动" tabindex="-1">表单联动 <a class="header-anchor" href="#表单联动" aria-label="Permalink to &quot;表单联动&quot;">​</a></h2><p>表单的详细内容，可以参考<a href="./tmagic-form.html">@tmagic/form</a>。我们通过 <a href="./js-schema.html">JS Schema</a> 描述的表单配置，实现联动的方式，就是写一个简单 js 函数。</p><p>比如下面的例子，我们希望改变选项时，同时改变文本框的内容。</p>',6),r=s(`<p>在经过表单渲染器时，所有指出函数 API 都会传入当前渲染的<strong>表单组件实例(vm)</strong>，<strong>当前项目(value)</strong>，<strong>当前表单model</strong>，<strong>表单值formValue</strong>，model 即 vue 的<a href="https://v3.cn.vuejs.org/guide/forms.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95" target="_blank" rel="noreferrer">表单输入绑定</a>，可以通过修改他来实现值联动。</p><p>当然我们也可以通过上述的参数传入，以及其他函数 API 实现更多灵活的表单联动，具体参考<a href="./../../form-config/relate.html">表单 API</a>。</p><h2 id="组件联动" tabindex="-1">组件联动 <a class="header-anchor" href="#组件联动" aria-label="Permalink to &quot;组件联动&quot;">​</a></h2><p>tmagic-editor在 @tmagic/core 中，实现了组件的事件绑定/分发机制。在组件渲染时，每个组件在 @tmagic/ui 中经过基础组件渲染时，会被基础组件注入公共方法的实现。如下对按钮配置了<strong>点击使文本隐藏</strong>的联动事件，那么在对应按钮被点击时，将会触发对应绑定文本的隐藏。</p><img src="https://image.video.qpic.cn/oa_88b7d-10_2117738923_1637238863127559"><h3 id="添加组件自定义事件" tabindex="-1">添加组件自定义事件 <a class="header-anchor" href="#添加组件自定义事件" aria-label="Permalink to &quot;添加组件自定义事件&quot;">​</a></h3><p>如何开发一个完整组件可以参考<a href="./../component.html">组件开发</a>，这一节我们主要讲述如何配置定义事件。</p><p>在组件开发过程中，我们可以通过声明组件中的 event 文件，在文件中描述当前组件可以配置的事件名，和可以被触发的动作。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// event.js</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  events: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      label: </span><span style="color:#9ECBFF;">&#39;完成某事件&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      value: </span><span style="color:#9ECBFF;">&#39;yourComponent:finishSomething&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      label: </span><span style="color:#9ECBFF;">&#39;弹出 Toast&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      value: </span><span style="color:#9ECBFF;">&#39;toast&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// event.js</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  events: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      label: </span><span style="color:#032F62;">&#39;完成某事件&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      value: </span><span style="color:#032F62;">&#39;yourComponent:finishSomething&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  methods: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      label: </span><span style="color:#032F62;">&#39;弹出 Toast&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      value: </span><span style="color:#032F62;">&#39;toast&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>其中，events 的 value 是个事件名，是 <code>string</code> 类型，为了避免和其他组件事件名重复，应该添加上一些前缀。</p><p>而 methods 中的 value 则是一个挂载在组件上的可执行函数。我们会在事件触发时，分发到对应组件上，并执行对应组件实例上的方法。</p><p>配置了上述内容的组件，在编辑器中选中当前组件，要触发其他组件的联动事件时，会有如下选项</p><img src="https://image.video.qpic.cn/oa_88b7d-32_1191352525_1637240258489761"><p>在被其他组件选中为联动组件，要触发联动事件，会有如下选项</p><img src="https://image.video.qpic.cn/oa_fd3c9c-3_214972289_1637240375129207"><h3 id="组件中的代码实现" tabindex="-1">组件中的代码实现 <a class="header-anchor" href="#组件中的代码实现" aria-label="Permalink to &quot;组件中的代码实现&quot;">​</a></h3><p>如上面提到的，我们定制了<strong>完成某件事</strong>这个事件，以及要提供一个<strong>弹出 Toast</strong>的方法。在组件中必要的实现内容如下。</p><h4 id="vue-版本实现" tabindex="-1">vue 版本实现 <a class="header-anchor" href="#vue-版本实现" aria-label="Permalink to &quot;vue 版本实现&quot;">​</a></h4><p>我们主要讲解 vue3 的 setup 实现。vue2 可以根据 vue3 同理转换成 options api 实现即可。</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- Test.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">@click</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;onClick&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- your component code --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineComponent, inject } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">props</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineProps</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  config: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: Object,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> ({}),</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">app</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Core</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">inject</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;app&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">node</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> app?.page?.</span><span style="color:#B392F0;">getNode</span><span style="color:#E1E4E8;">(props.config.id);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// app.emit 第一个参数为事件名，其余参数为你要传给接受事件组件的参数</span></span>
<span class="line"><span style="color:#E1E4E8;">  app?.</span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;yourComponent:finishSomething&quot;</span><span style="color:#E1E4E8;">, node, </span><span style="color:#6A737D;">/*可以传参给接收方*/</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">defineExpose</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 此处实现事件动作</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 实际触发时是调用vue实例上的方法，所以需要将改方法暴露到实例上</span></span>
<span class="line"><span style="color:#E1E4E8;">  toast: (</span><span style="color:#6A737D;">/*触发组件node*/</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">/*接收触发事件组件传进来的参数*/</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;测试 vue3&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- Test.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">@click</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;onClick&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- your component code --&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineComponent, inject } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">props</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineProps</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  config: {</span></span>
<span class="line"><span style="color:#24292E;">    type: Object,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> ({}),</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">app</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Core</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">inject</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;app&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">node</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> app?.page?.</span><span style="color:#6F42C1;">getNode</span><span style="color:#24292E;">(props.config.id);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// app.emit 第一个参数为事件名，其余参数为你要传给接受事件组件的参数</span></span>
<span class="line"><span style="color:#24292E;">  app?.</span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;yourComponent:finishSomething&quot;</span><span style="color:#24292E;">, node, </span><span style="color:#6A737D;">/*可以传参给接收方*/</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">defineExpose</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 此处实现事件动作</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 实际触发时是调用vue实例上的方法，所以需要将改方法暴露到实例上</span></span>
<span class="line"><span style="color:#24292E;">  toast: (</span><span style="color:#6A737D;">/*触发组件node*/</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">/*接收触发事件组件传进来的参数*/</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;测试 vue3&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="react-版本实现" tabindex="-1">react 版本实现 <a class="header-anchor" href="#react-版本实现" aria-label="Permalink to &quot;react 版本实现&quot;">​</a></h4><p>在 react 的实现中，由于tmagic-editor提供的 @tmagic/ui-react 版本是用 hook 实现的。所以组件开发我们也相应的需要使用 hook 方式。</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useApp } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@tmagic/ui-react&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Test</span><span style="color:#E1E4E8;">({ </span><span style="color:#FFAB70;">config</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// react 和 vue 实现不同，我们通过 useApp 这个 hook 来提供 app 等核心内容</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">app</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useApp</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    config,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 此处实现事件动作</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 通过向 useApp 这个 hook 提供 methods 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// tmagic-editor会将该事件注册到事件机制中，在对应事件响应被触发时调用对应方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">: (</span><span style="color:#6A737D;">/*接收触发事件组件传进来的参数*/</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;测试 react&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClickFunc</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// app.emit 第一个参数为事件名，其余参数为你要传给接受事件组件的参数</span></span>
<span class="line"><span style="color:#E1E4E8;">    app?.</span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;yourComponent:finishSomething&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">/*可以传参给接收方*/</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">id</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{config.id}</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">style</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{app.</span><span style="color:#B392F0;">transformStyle</span><span style="color:#E1E4E8;">(config.style </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> {})}</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{onClick}</span></span>
<span class="line"><span style="color:#E1E4E8;">    &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      // your component code</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> Test;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useApp } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@tmagic/ui-react&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Test</span><span style="color:#24292E;">({ </span><span style="color:#E36209;">config</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// react 和 vue 实现不同，我们通过 useApp 这个 hook 来提供 app 等核心内容</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">app</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useApp</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    config,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 此处实现事件动作</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 通过向 useApp 这个 hook 提供 methods 方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// tmagic-editor会将该事件注册到事件机制中，在对应事件响应被触发时调用对应方法</span></span>
<span class="line"><span style="color:#24292E;">    methods: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">: (</span><span style="color:#6A737D;">/*接收触发事件组件传进来的参数*/</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;测试 react&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClickFunc</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// app.emit 第一个参数为事件名，其余参数为你要传给接受事件组件的参数</span></span>
<span class="line"><span style="color:#24292E;">    app?.</span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;yourComponent:finishSomething&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">/*可以传参给接收方*/</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">id</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{config.id}</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">style</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{app.</span><span style="color:#6F42C1;">transformStyle</span><span style="color:#24292E;">(config.style </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> {})}</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{onClick}</span></span>
<span class="line"><span style="color:#24292E;">    &gt;</span></span>
<span class="line"><span style="color:#24292E;">      // your component code</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> Test;</span></span></code></pre></div><p>按照上述实现触发事件和事件动作，就可以完成组件的联动事件分发响应。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>组件事件的联动是借助了@tmagic/core，需要在组件实例化的时候将需要暴露的方法提供给@tmagic/core，在上述例子中useApp方法的调用就是完成这个操作，useApp返回的app对象就是@tmagic/core的实例。在vue的实现中useApp是将整个vue实例都提供给了app，所以需要defineExpose来定义vue instance上的方法，react则是将需要暴露的方法作为useApp的参数传入</p></div>`,25);function E(y,i,d,u,F,g){const n=p("demo-block");return l(),o("div",null,[c,e(n,{type:"form",config:`[{
  text: '文本',
  name: 'text'
}, {
  type: 'select',
  text: '下拉选项',
  name: 'select',
  options: [
    { text: '选项1', value: 1 },
    { text: '选项2', value: 2 }
  ],
  onChange: (vm, value, { model }) => {
    model.text = value;
  }
}]`},null,8,["config"]),r])}const A=a(t,[["render",E]]);export{h as __pageData,A as default};
