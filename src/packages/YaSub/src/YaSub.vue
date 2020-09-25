<template>
  <div class="image" :style="style" @click="upBefor" :class="{ enable : disabled}">
    <input type="file" accept="image/*" style="display: none" @change="changeImg" ref="input">
    <img :src="backImg" alt="" class="initB" v-show="!imageUrl">
    <img :src="imageUrl" alt=""  v-show="imageUrl" ref="loadAfter" :style="imgstyle">
  </div>
</template>

<script>
    // import loading from "@/assets/loading.gif";
    var loading='https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting/2020/09/24/loading.gif';
    // import fail from "@/assets/financial_fail.png";
    var fail ='https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting/2020/09/24/financial_fail.png';
    import axios from 'axios'
    import {compressImg, resetToblob} from "@/utils"

    export default {
        name: "YanYaSub",
        data() {
            return {
                backImg:'https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting/2020/09/24/upimg.png',
                imageUrl: '',
                imgstyle:{}
            }
        },
        props: {
            pressType:{
                type:String,
                default:'quality'
            },//压缩方式 quality通过降低图片质量 size通过缩小图片尺寸
            maxSize: {
                type:Number,
                default:1024
            },//大于1024kb就压缩
            width: {//容器宽----------
                type: [Number, String],
                default: 200
            },
            height: {//容器高-------
                type: [Number, String],
                default: 200
            },
            ratio: {//压缩占比，默认75%--------
                type: Number,
                default: 0.75
            },
            action: {//上传地址----------
                type:String,
                required:true
            },
            headers: {//请求头---------
                type: Object,
                default: function () {
                    return {'Content-Type': 'multipart/form-data'}
                }
            },
            data: Object,//上传时带的额外参数---------
            name: {//原生name  文件字段名-------
                type: String,
                default: 'file'
            },
            withCredentials: Boolean,//支持发送 cookie 凭证信息-----
            disabled: Boolean,//是否禁用------
            beforeUpload: Function,//上传之前 默认参数file文件------
            successUpload: Function,//上传成功回调 默认参数返回值-----
            errUpload: Function,//上传失败回调 默认参数返回值--------
            uploadEnd: Function,//上传完成回调 默认无参数---------

        },
        mounted() {
            resetToblob();
            if (this.withCredentials) axios.defaults.withCredentials = this.withCredentials;
        },
        computed: {
            style() {
                const w = typeof this.width === 'number' ? this.width + 'px' : this.width;
                const h = typeof this.height === 'number' ? this.height + 'px' : this.height;
                return {
                    width: w,
                    height: h
                }
            }
        },
        methods: {
            upBefor() {
                if (this.disabled) return;
                this.$refs.input.value = '';
                this.$refs.input.click();
            },
            changeImg(e) {
                if (e.target.files.length < 1) return;
                this.backImg = loading;
                this.imageUrl='';
                const file = e.target.files[0],linkUrl=URL.createObjectURL(file);
                this.instyle(linkUrl);//提前计算好图片样式
                let formData = new FormData();
                if (this.data && this.data !== {}) {
                    let otherC = Object.keys( this.data );
                    otherC.map( item => {
                        formData.append( item, this.data[item] )
                    } )
                }
                if (this.beforeUpload) this.beforeUpload( file );
                if (file.size / 1024 < this.maxSize) {
                    formData.append( this.name, file );
                    this.upload( formData,file,linkUrl )
                } else {
                    compressImg( file, this.pressType,this.ratio).then( blob => {
                        formData.append( this.name, blob );
                        this.upload( formData ,file,linkUrl)
                    } )
                }

            },
            upload(formData,file,linkUrl) {
                axios( {
                    method: 'post',
                    url: this.action,
                    dataType: 'JSON',
                    data: formData,
                    headers: this.headers
                } ).then( res => {
                    this.imageUrl=linkUrl;
                    this.successUpload( res );
                } ).catch( err => {
                    this.backImg = fail;
                    this.errUpload( err )
                } ).finally( res => {
                    this.uploadEnd()
                } )
            },
            instyle(linkUrl){
                const oImg=new Image(),oDiv=document.querySelector('.image');
                oImg.onload=()=>{
                    const w=oDiv.offsetWidth,h=oDiv.offsetHeight;
                    if(w>h){
                        if(oImg.width<oImg.height)this.imgstyle={height:'100%',width:'auto'};
                    }else {
                        if(oImg.width>oImg.height)this.imgstyle={height:'auto',width:'100%'};
                        else this.imgstyle={height:'100%',width:'auto'};
                    }
                }
                oImg.src=linkUrl;
            }
        }
    }
</script>

<style scoped>
  .image {
    background-color: #F2F6FC;
    border: 1px dashed #999;
    border-radius: 5px;
    position: relative;
  }

  .image .initB,.image img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .image img {
    display: block;
    width: 100%;
  }
  .image .initB{
    width: 30%;
  }
  .image.enable:after {
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    background-color: #c0c4cc;
    opacity: .4;
    cursor: not-allowed;
    left: 0;
    top: 0;
    z-index: 11;
  }
</style>
