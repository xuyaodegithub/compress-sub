import CompressSub from "./packages/compressSub/index.js";
import YaSub from "./packages/YaSub/index.js";
const Sublist=[CompressSub,YaSub];
const install=function(Vue,ops={}){
  Sublist.forEach(component => {
    Vue.component(component.name, component);
  });
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  install,
  CompressSub,
  YaSub
}
