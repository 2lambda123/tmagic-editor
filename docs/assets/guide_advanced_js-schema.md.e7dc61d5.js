import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.1153a8c2.js";const F=JSON.parse('{"title":"JS Schema","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/js-schema.md","filePath":"guide/advanced/js-schema.md"}'),p={name:"guide/advanced/js-schema.md"},o=l(`<h1 id="js-schema" tabindex="-1">JS Schema <a class="header-anchor" href="#js-schema" aria-label="Permalink to &quot;JS Schema&quot;">​</a></h1><p>tmagic-editor的业务组件需要有表单配置能力，我们通过一份配置来描述表单，我们采用的描述方案是 JS schema。当我们在编辑器中配置一个页面时，页面的基本信息和页面包含的组件信息，也是采用 JS schema 描述的。JS schema 描述方案，也是我们提供<a href="./../advanced/code-block.html">代码块</a>功能的基础。</p><p>组件的<strong>配置描述</strong>，参考<a href="./tmagic-form.html#示例">示例</a>，是由开发者在开发组件时，通过 <a href="./tmagic-form.html">@tmagic/form</a> 支持的表单项来提供的。</p><p>在编辑器中对页面进行编辑，保存得到的是一份关于页面基本信息、页面所包含组件以及组件配置信息的配置，我们称为 <strong>DSL</strong>，这份配置是最终页面渲染需要的描述信息。</p><p>JS schema 本质即是一个 js 对象，这个形式可以支持我们在组件的表单配置描述中，直接进行函数编写，功能灵活，对于前端开发来说更符合直觉，几乎没有理解成本。</p><h2 id="表单配置" tabindex="-1">表单配置 <a class="header-anchor" href="#表单配置" aria-label="Permalink to &quot;表单配置&quot;">​</a></h2><p>组件中的表单配置描述，在经过 @tmagic/form 表单渲染器后，可以生成表单栏的配置项。在表单栏中对表单进行配置，配置数据将动态写入 DSL 中。</p><img src="https://image.video.qpic.cn/oa_88b7d-36_673631168_1636343947880034?imageView2/q/70"><h2 id="dsl" tabindex="-1">DSL <a class="header-anchor" href="#dsl" aria-label="Permalink to &quot;DSL&quot;">​</a></h2><p>编辑器中生成的 DSL 序列化存储后，在发布时，将其作为 js 文件发布出去，供生成页使用。一个生成页最终保存的 DSL 配置示例如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;75f0extui9d7yksklx27hff8xg&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;test_page&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">beginTime</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;2021-04-26T16:00:00.000Z&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">endTime</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;2021-05-28T16:00:00.000Z&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">items</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&quot;page&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&quot;index&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      layout: </span><span style="color:#9ECBFF;">&quot;absolute&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      style: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        width: </span><span style="color:#9ECBFF;">&quot;375&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        height: </span><span style="color:#9ECBFF;">&quot;1728&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        backgroundColor: </span><span style="color:#9ECBFF;">&quot;rgba(218, 192, 192, 1)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      id: </span><span style="color:#9ECBFF;">&quot;39381280&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: </span><span style="color:#9ECBFF;">&quot;container&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          name: </span><span style="color:#9ECBFF;">&quot;组&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          id: </span><span style="color:#9ECBFF;">&quot;98549062&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">            {</span></span>
<span class="line"><span style="color:#E1E4E8;">              type: </span><span style="color:#9ECBFF;">&quot;button&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              id: </span><span style="color:#9ECBFF;">&quot;87016850&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              name: </span><span style="color:#9ECBFF;">&quot;按钮&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              style: {</span></span>
<span class="line"><span style="color:#E1E4E8;">                position: </span><span style="color:#9ECBFF;">&quot;absolute&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                left: </span><span style="color:#79B8FF;">57</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                top: </span><span style="color:#79B8FF;">152</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                right: </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                bottom: </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                width: </span><span style="color:#79B8FF;">270</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                height: </span><span style="color:#79B8FF;">38</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                backgroundImage: </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                backgroundColor: </span><span style="color:#9ECBFF;">&quot;#fb6f00&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                backgroundRepeat: </span><span style="color:#9ECBFF;">&quot;no-repeat&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                backgroundSize: </span><span style="color:#9ECBFF;">&quot;100% 100%&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                transform: </span><span style="color:#9ECBFF;">&quot;none&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                textAlign: </span><span style="color:#9ECBFF;">&quot;center&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                border: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">              },</span></span>
<span class="line"><span style="color:#E1E4E8;">              events: [</span></span>
<span class="line"><span style="color:#E1E4E8;">                {</span></span>
<span class="line"><span style="color:#E1E4E8;">                  name: </span><span style="color:#9ECBFF;">&quot;magic:common:events:click&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                  to: </span><span style="color:#9ECBFF;">&quot;button_3877&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                  method: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">              ],</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">created</span><span style="color:#E1E4E8;">: ()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{},</span></span>
<span class="line"><span style="color:#E1E4E8;">              text: </span><span style="color:#9ECBFF;">&quot;请输入文本内容&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            {</span></span>
<span class="line"><span style="color:#E1E4E8;">              id: </span><span style="color:#9ECBFF;">&quot;text_7909&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              style: {</span></span>
<span class="line"><span style="color:#E1E4E8;">                left: </span><span style="color:#79B8FF;">88</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                top: </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">73</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                position: </span><span style="color:#9ECBFF;">&quot;absolute&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                width: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                height: </span><span style="color:#79B8FF;">14</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                transform: </span><span style="color:#9ECBFF;">&quot;none&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">              },</span></span>
<span class="line"><span style="color:#E1E4E8;">              type: </span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              name: </span><span style="color:#9ECBFF;">&quot;文本&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              text: </span><span style="color:#9ECBFF;">&quot;请输入文本内容&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              multiple: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            {</span></span>
<span class="line"><span style="color:#E1E4E8;">              type: </span><span style="color:#9ECBFF;">&quot;button&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              id: </span><span style="color:#9ECBFF;">&quot;button_3877&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              style: {</span></span>
<span class="line"><span style="color:#E1E4E8;">                position: </span><span style="color:#9ECBFF;">&quot;absolute&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                left: </span><span style="color:#9ECBFF;">&quot;57&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                width: </span><span style="color:#9ECBFF;">&quot;270&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                height: </span><span style="color:#9ECBFF;">&quot;37.5&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                border: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                backgroundColor: </span><span style="color:#9ECBFF;">&quot;#fb6f00&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">              },</span></span>
<span class="line"><span style="color:#E1E4E8;">              name: </span><span style="color:#9ECBFF;">&quot;按钮&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              text: </span><span style="color:#9ECBFF;">&quot;请输入文本内容&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              multiple: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          ],</span></span>
<span class="line"><span style="color:#E1E4E8;">          style: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            width: </span><span style="color:#9ECBFF;">&quot;100%&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            height: </span><span style="color:#9ECBFF;">&quot;100&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            position: </span><span style="color:#9ECBFF;">&quot;absolute&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            left: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            top: </span><span style="color:#79B8FF;">204</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;75f0extui9d7yksklx27hff8xg&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;test_page&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">beginTime</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;2021-04-26T16:00:00.000Z&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">endTime</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;2021-05-28T16:00:00.000Z&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">items</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&quot;page&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&quot;index&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      layout: </span><span style="color:#032F62;">&quot;absolute&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      style: {</span></span>
<span class="line"><span style="color:#24292E;">        width: </span><span style="color:#032F62;">&quot;375&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        height: </span><span style="color:#032F62;">&quot;1728&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        backgroundColor: </span><span style="color:#032F62;">&quot;rgba(218, 192, 192, 1)&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      id: </span><span style="color:#032F62;">&quot;39381280&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          type: </span><span style="color:#032F62;">&quot;container&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          name: </span><span style="color:#032F62;">&quot;组&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          id: </span><span style="color:#032F62;">&quot;98549062&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          items: [</span></span>
<span class="line"><span style="color:#24292E;">            {</span></span>
<span class="line"><span style="color:#24292E;">              type: </span><span style="color:#032F62;">&quot;button&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              id: </span><span style="color:#032F62;">&quot;87016850&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              name: </span><span style="color:#032F62;">&quot;按钮&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              style: {</span></span>
<span class="line"><span style="color:#24292E;">                position: </span><span style="color:#032F62;">&quot;absolute&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                left: </span><span style="color:#005CC5;">57</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                top: </span><span style="color:#005CC5;">152</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                right: </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                bottom: </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                width: </span><span style="color:#005CC5;">270</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                height: </span><span style="color:#005CC5;">38</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                backgroundImage: </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                backgroundColor: </span><span style="color:#032F62;">&quot;#fb6f00&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                backgroundRepeat: </span><span style="color:#032F62;">&quot;no-repeat&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                backgroundSize: </span><span style="color:#032F62;">&quot;100% 100%&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                transform: </span><span style="color:#032F62;">&quot;none&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                textAlign: </span><span style="color:#032F62;">&quot;center&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                border: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">              },</span></span>
<span class="line"><span style="color:#24292E;">              events: [</span></span>
<span class="line"><span style="color:#24292E;">                {</span></span>
<span class="line"><span style="color:#24292E;">                  name: </span><span style="color:#032F62;">&quot;magic:common:events:click&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                  to: </span><span style="color:#032F62;">&quot;button_3877&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                  method: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">              ],</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">created</span><span style="color:#24292E;">: ()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{},</span></span>
<span class="line"><span style="color:#24292E;">              text: </span><span style="color:#032F62;">&quot;请输入文本内容&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            {</span></span>
<span class="line"><span style="color:#24292E;">              id: </span><span style="color:#032F62;">&quot;text_7909&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              style: {</span></span>
<span class="line"><span style="color:#24292E;">                left: </span><span style="color:#005CC5;">88</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                top: </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">73</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                position: </span><span style="color:#032F62;">&quot;absolute&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                width: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                height: </span><span style="color:#005CC5;">14</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                transform: </span><span style="color:#032F62;">&quot;none&quot;</span></span>
<span class="line"><span style="color:#24292E;">              },</span></span>
<span class="line"><span style="color:#24292E;">              type: </span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              name: </span><span style="color:#032F62;">&quot;文本&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              text: </span><span style="color:#032F62;">&quot;请输入文本内容&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              multiple: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            {</span></span>
<span class="line"><span style="color:#24292E;">              type: </span><span style="color:#032F62;">&quot;button&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              id: </span><span style="color:#032F62;">&quot;button_3877&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              style: {</span></span>
<span class="line"><span style="color:#24292E;">                position: </span><span style="color:#032F62;">&quot;absolute&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                left: </span><span style="color:#032F62;">&quot;57&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                width: </span><span style="color:#032F62;">&quot;270&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                height: </span><span style="color:#032F62;">&quot;37.5&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                border: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                backgroundColor: </span><span style="color:#032F62;">&quot;#fb6f00&quot;</span></span>
<span class="line"><span style="color:#24292E;">              },</span></span>
<span class="line"><span style="color:#24292E;">              name: </span><span style="color:#032F62;">&quot;按钮&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              text: </span><span style="color:#032F62;">&quot;请输入文本内容&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              multiple: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          ],</span></span>
<span class="line"><span style="color:#24292E;">          style: {</span></span>
<span class="line"><span style="color:#24292E;">            width: </span><span style="color:#032F62;">&quot;100%&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            height: </span><span style="color:#032F62;">&quot;100&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            position: </span><span style="color:#032F62;">&quot;absolute&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            left: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            top: </span><span style="color:#005CC5;">204</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,11),t=[o];function e(c,E,r,y,i,u){return n(),a("div",null,t)}const d=s(p,[["render",e]]);export{F as __pageData,d as default};
