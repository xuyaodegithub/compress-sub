import compressSub from "./packages/compressSub/index.js";
import YanSub from "./packages/YaSub/index.js";
const Sublist=[compressSub,YanSub];
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
  compressSub,
  YanSub
}
