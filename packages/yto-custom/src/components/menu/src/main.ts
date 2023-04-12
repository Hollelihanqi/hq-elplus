import YtoMenu from './index.vue'
// import 'element-plus/dist/index.css'
export {YtoMenu}
export default {
    install: (App:any) => {
        App.component("yto-menu", YtoMenu) //注意避坑 -> 组件内部一定要写name属性
    }
}