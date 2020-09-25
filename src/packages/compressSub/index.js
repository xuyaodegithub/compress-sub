import compressSub from './src/compressSub';
compressSub.install=function(Vue,ops){
  Vue.component(compressSub.name,compressSub);
}
export default compressSub;
