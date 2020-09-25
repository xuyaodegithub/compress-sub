# compress-sub

> 基于Vue图片压缩上传组件

## Build Setup

``` bash
# install dependencies
npm install yan-compress-sub

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

### 使用方法
暂时就一个组件   后续会出其他组件   有需求的可以提

全局引用

import YanSubs form yan-compress-sub

Vue.use(YanSubs)

按需引用

import { SubName } form yan-compress-sub

Vue.component(SubName.name,SubName)

:::tip
SubName 为组件名称，具体名称可以从下方组件列表寻找
:::


# 组件列表

## 1、CompressSub 图片上传组件（带压缩功能）
适用图片上传对图片大小有要求的

### 基础用法
```html
    <yan-compress-sub :pressType="pressType"
                      :maxSize="maxSize"
                      :action="baseUrl"
                      :ratio="ratio"
                      :data="data"
                      :errUpload="errUpload"
                      :beforeUpload="beforeUpload"
                      :successUpload="successUpload"
                      :uploadEnd="uploadEnd">
    </yan-compress-sub>

<script>
  export default {
    data() {
      return {
           baseUrl: 'http://restapidev.picup.shop/oss/upload',//示例
           data: {a: 1},
           pressType:'size',
           maxSize:1024,
           ratio:0.5
      };
    },
    methods: {
            beforeUpload(file){
                console.log(file,111111)
            },
            successUpload(res){
                console.log('上传成功',22222)
            },
            uploadEnd(){
                console.log('上传完成')
            },
            errUpload(err){
              console.log('上传失败',err)
            }
    }
  };
</script>
```

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| width | 组件宽度  |  string / number | — | 200 |
| height  | 组件高度    | string / number   | — | 200   |
| pressType  | 压缩方式(quality代表通过降低图片质量压缩、size代表通过降低图片尺寸压缩)    |string   | quality / size | quality   |
| maxSize  |  图片允许的最大 大小 如果低于此值 则不会压缩 否则会压缩（单位kb）   |number   | — | 1024   |
| ratio  | 压缩比率，或者是压缩后与压缩前的图片质量比/压缩后的图片宽高和原图片宽高比（0-1）    | number   | — | 0.75 |
| action  | 图片上传接口地址（必填）    | string   | — | — |
| headers  | 请求头    | object   | — | {'Content-Type': 'multipart/form-data'}|
| data  | 上传携带的额为参数    | object | — | — |
| name  | 上传文件字段    | string | — | file |
| withCredentials  | 支持发送 cookie 凭证信息    | boolean   | — | false |
| disabled  | 是否禁用    | boolean   | — | false |
| beforeUpload | 上传之前触发函数(默认参数file)    | Function   | — | — |
| successUpload  | 上传成功的回调(默认参数接口返回值)     | Function   | - | — |
| errUpload  | 上传错误的回调(默认参数err信息)     | Function   | - | — |
| uploadEnd  | 上传完成的回调（失败成功都会触发）     | Function   | - | — |


:::tip
提示：png图片只能通过size进行压缩(否则无效果)，jpeg两种方式都可以，
:::

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
