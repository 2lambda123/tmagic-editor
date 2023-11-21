import{_ as a,C as p,o as l,c as o,H as e,Q as s}from"./chunks/framework.1153a8c2.js";const h=JSON.parse('{"title":"联动原理","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/coupling.md","filePath":"guide/advanced/coupling.md"}'),t={name:"guide/advanced/coupling.md"},c=s("",6),r=s("",25);function E(y,i,d,u,F,g){const n=p("demo-block");return l(),o("div",null,[c,e(n,{type:"form",config:`[{
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
