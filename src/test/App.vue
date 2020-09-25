<template>
  <div id="app">
    1111阿斯达所多
    <yan-compress-sub :pressType="pressType" :maxSize="maxSize" :action="baseUrl" :ratio="0.5" :data="data"
                      :disabled="false" :errUpload="errUpload" :beforeUpload="beforeUpload"
                      :successUpload="successUpload" :uploadEnd="uploadEnd">
    </yan-compress-sub>
    <yan-ya-sub :pressType="pressType" :maxSize="maxSize" :action="baseUrl" :ratio="0.5" :data="data" :disabled="false"
                :errUpload="errUpload" :beforeUpload="beforeUpload" :successUpload="successUpload"
                :uploadEnd="uploadEnd">
    </yan-ya-sub>
  </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                baseUrl: 'http://restapidev.picup.shop/oss/upload',
                data: {a: 1},
                pressType: 'quality',
                maxSize: 2048
            }
        },
        components: {},
        methods: {
            beforeUpload(file) {
                console.log( file, 111111 )
            },
            successUpload(res) {
                console.log( res.data, 22222 )
            },
            uploadEnd() {
                console.log( '上传完成' )
            },
            errUpload(err) {
                console.log( '上传失败', err )
            }
        }
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    width: 200px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
