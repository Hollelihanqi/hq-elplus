import ElementPlus from 'element-plus'

import VPApp, { NotFound, globals } from '../layouts'
import { define } from '../utils/types'
import 'uno.css'
import './style.css'
import "element-plus/dist/index.css";
import type { Theme } from 'vitepress'

export default define<Theme>({
    NotFound,
    Layout: VPApp,
    enhanceApp: ({ app }) => {
        app.use(ElementPlus)
        globals.forEach(([name, Comp]) => {
            app.component(name, Comp)
        })
    },
})