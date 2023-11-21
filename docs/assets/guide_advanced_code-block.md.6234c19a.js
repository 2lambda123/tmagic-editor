import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.1153a8c2.js";const m=JSON.parse('{"title":"代码块","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/code-block.md","filePath":"guide/advanced/code-block.md"}'),l={name:"guide/advanced/code-block.md"},e=p(`<h1 id="代码块" tabindex="-1">代码块 <a class="header-anchor" href="#代码块" aria-label="Permalink to &quot;代码块&quot;">​</a></h1><p>代码块是一种低代码能力，tmagic-editor中对组件的逻辑干预主要通过代码块来进行支持</p><h2 id="能力展示" tabindex="-1">能力展示 <a class="header-anchor" href="#能力展示" aria-label="Permalink to &quot;能力展示&quot;">​</a></h2><p>代码块支持的能力有 1、在线编辑 2、参数定义，包括：参数类型定义 3、自动保存草稿 4、参数注释 下面将主要介绍代码块的实现原理，包含dsl结构定义，以及代码块挂载执行时机等</p><h2 id="协议描述" tabindex="-1">协议描述 <a class="header-anchor" href="#协议描述" aria-label="Permalink to &quot;协议描述&quot;">​</a></h2><p>我们将在线编写的代码内容保存在<a href="./../advanced/js-schema.html">DSL</a>中，与app同一层级，这样的好处是代码块可以在同一活动，不同页面中实现灵活编排。 类型定义参见<a href="https://github.com/Tencent/tmagic-editor/blob/c143a5f7670ae61d80c1a2cfcc780cfb5259849d/packages/schema/src/index.ts#L75" target="_blank" rel="noreferrer">CodeBlockDsl</a>。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[{</span></span>
<span class="line"><span style="color:#E1E4E8;">  id: </span><span style="color:#79B8FF;">123456</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  type: </span><span style="color:#9ECBFF;">&#39;app&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  items: [{</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#79B8FF;">222222</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&#39;page&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    items: [{</span></span>
<span class="line"><span style="color:#E1E4E8;">      id: </span><span style="color:#79B8FF;">333</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&#39;comp-A&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }]</span></span>
<span class="line"><span style="color:#E1E4E8;">  }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  codeBlocks: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    code_123: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&#39;代码块名称&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">: ()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{},</span></span>
<span class="line"><span style="color:#E1E4E8;">      params: [{</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;参数1&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[{</span></span>
<span class="line"><span style="color:#24292E;">  id: </span><span style="color:#005CC5;">123456</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  type: </span><span style="color:#032F62;">&#39;app&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  items: [{</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#005CC5;">222222</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&#39;page&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    items: [{</span></span>
<span class="line"><span style="color:#24292E;">      id: </span><span style="color:#005CC5;">333</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&#39;comp-A&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }]</span></span>
<span class="line"><span style="color:#24292E;">  }],</span></span>
<span class="line"><span style="color:#24292E;">  codeBlocks: {</span></span>
<span class="line"><span style="color:#24292E;">    code_123: {</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&#39;代码块名称&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">: ()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{},</span></span>
<span class="line"><span style="color:#24292E;">      params: [{</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;参数1&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}]</span></span></code></pre></div><p>在页面中创建代码块也就是会将新的代码内容添加到DSL中的codeBlocks数组并保存下来，这里涉及的逻辑可以参见CodeBlock类中的<a href="https://github.com/Tencent/tmagic-editor/blob/c143a5f7670ae61d80c1a2cfcc780cfb5259849d/packages/editor/src/services/codeBlock.ts#L107" target="_blank" rel="noreferrer">setCodeDslById</a>方法。 并且可以在编辑器左侧的“代码块”tab下看到当前活动的代码块列表 <img src="https://vip.image.video.qpic.cn/vupload/20230228/4d17861677585336888.png" alt="代码块列表"></p><h2 id="组件绑定" tabindex="-1">组件绑定 <a class="header-anchor" href="#组件绑定" aria-label="Permalink to &quot;组件绑定&quot;">​</a></h2><p>代码块的初衷是为了实现对组件逻辑的在线干预（代码执行的时机平台提供了组件created, mounted两个钩子），因此我们需要将创建的代码与组件进行关联。 <img src="https://vip.image.video.qpic.cn/vupload/20230228/4a34a11677585505930.png" alt="组件绑定代码块"> 选中组件之后，在组件配置-高级tab下需要支持下拉选择代码块，以及代码参数的输入。由于每一个组件绑定代码块的需求都是相同的，因此这一部分我们可以抽出为公共的表单配置，相关的逻辑处理在<a href="https://github.com/Tencent/tmagic-editor/blob/c143a5f7670ae61d80c1a2cfcc780cfb5259849d/packages/editor/src/utils/props.ts#L223" target="_blank" rel="noreferrer">prop文件</a>中，我们在高级tab下统一添加了名为created和mounted两个配置项，表单组件使用了自定义的&#39;code-select&#39;。前面已经提过，表单组件会按照type字段来进行渲染，即 :is=&quot;\${type}&quot;，<a href="https://github.com/Tencent/tmagic-editor/blob/c143a5f7670ae61d80c1a2cfcc780cfb5259849d/packages/editor/src/fields/CodeSelect.vue" target="_blank" rel="noreferrer">CodeSelect</a>组件是在editor中自定义的</p><p>完成绑定的动作实质就是在组件配置中增加与代码块的映射关系</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    id: </span><span style="color:#9ECBFF;">&#39;111&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&#39;comp_A&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    created: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      hookType: </span><span style="color:#9ECBFF;">&#39;code&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      hookData: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">          codeId: </span><span style="color:#9ECBFF;">&#39;code_123&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          params: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            age: </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            studentName: </span><span style="color:#9ECBFF;">&#39;lisa&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    id: </span><span style="color:#032F62;">&#39;111&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&#39;comp_A&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    created: {</span></span>
<span class="line"><span style="color:#24292E;">      hookType: </span><span style="color:#032F62;">&#39;code&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      hookData: [</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">          codeId: </span><span style="color:#032F62;">&#39;code_123&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          params: {</span></span>
<span class="line"><span style="color:#24292E;">            age: </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            studentName: </span><span style="color:#032F62;">&#39;lisa&#39;</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="代码内容注入与执行" tabindex="-1">代码内容注入与执行 <a class="header-anchor" href="#代码内容注入与执行" aria-label="Permalink to &quot;代码内容注入与执行&quot;">​</a></h2><p>在实现代码块创建和绑定操作之后，DSL已经包含了代码块执行所需的所有信息，接下来我们在页面加载时对代码块进行解析，并在适当的时机运行。</p><p>由于代码块的执行时机为组件created，mounted，因此触发执行的动作需要在runtime中完成，对于VUE3来说，我们在组件对应的生命周期去触发就可以了，react则需要在类似的时间点去触发，详细请参见<a href="https://github.com/Tencent/tmagic-editor/blob/master/packages/ui/src/useApp.ts#L29" target="_blank" rel="noreferrer">ui</a></p><p>接收事件的动作是在<a href="https://github.com/Tencent/tmagic-editor/blob/c143a5f7670ae61d80c1a2cfcc780cfb5259849d/packages/core/src/Node.ts" target="_blank" rel="noreferrer">Core</a>中完成的，请记得前面提到过Core主要负责对组件进行跨框架管理与一些通用复杂逻辑的实现，触发时机各个框架不同，但接收事件并执行代码块的逻辑与框架无关。<a href="https://github.com/Tencent/tmagic-editor/blob/master/packages/core/src/Node.ts#L56" target="_blank" rel="noreferrer">Core/Node</a>会对生命周期事件进行监听，并根据组件绑定的代码块ID拿到具体的代码内容，然后执行。在执行调用时我们以{ app, params }的形式传入了两个参数，其中app包含了全局的变量，params为组件绑定时针对代码块传入的参数。</p><p>至此，我们就完成了代码块创建-绑定-注入-运行。与代码块功能相关的UI界面中我们也提供了丰富的插槽供开发者扩展，相关源码请见<a href="https://github.com/Tencent/tmagic-editor/tree/master/packages/editor/src/layouts/sidebar/code-block" target="_blank" rel="noreferrer">sidebar/codeBlock</a>。</p><h2 id="代码块界面展示" tabindex="-1">代码块界面展示 <a class="header-anchor" href="#代码块界面展示" aria-label="Permalink to &quot;代码块界面展示&quot;">​</a></h2><p>侧边栏的代码块列表可以查看当前创建的代码块，以及每个代码块绑定的组件，点击代码块下方展示的组件icon可以在画布中选中该组件 <img src="https://vip.image.video.qpic.cn/vupload/20230228/92dcfe1677636899649.png" alt="代码块列表"></p><p>代码块编辑面板，可以在这里编写代码内容，申明参数 <img src="https://vip.image.video.qpic.cn/vupload/20230228/1fd2e11677637006239.png" alt="代码块编辑面板"></p><p>组件高级tab下绑定代码块，可以输入参数值，查看注释，打开代码编辑面板 <img src="https://vip.image.video.qpic.cn/vupload/20230301/b2c8431677637119126.png" alt="绑定代码块"></p><p>保存后点击预览，可以看到在控制台打出了我们打印的日志内容 <img src="https://vip.image.video.qpic.cn/vupload/20230301/672f8a1677637682103.png" alt="预览"></p>`,22),o=[e];function c(t,r,i,E,d,y){return a(),n("div",null,o)}const g=s(l,[["render",c]]);export{m as __pageData,g as default};
