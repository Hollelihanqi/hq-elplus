/**
 * 1. 创建vnode
 * 2. 挂载
 */

import { render, h, VNode } from 'vue'

let mountDom: Element | null = null;

type IObj = {
    [k: string]: any
}

interface IReturnObj {
    $destroy: Function
}

export const createMountContainer = (cls?: string[]): Element => {
    const container = document.createElement('div');
    container.className = `creator-api-container ${cls ? cls : ''}`;
    return container
}


export const createVnode = (component: Component, props: IObj): VNode => {
    const vnode = h(component, { ...props });
    return vnode;
}

const destroy = () => {
    if (mountDom) {
        document.body.removeChild(mountDom);
    }
}

export const mount = (vnode: VNode, customClass?: string[]): IReturnObj => {
    destroy();
    mountDom = createMountContainer(customClass)
    render(vnode, mountDom);
    document.body.appendChild(mountDom)

    function $destroy(mountDom: Element) {
        document.body.removeChild(mountDom);
    }
    return {
        $destroy
    }
}


//--------------------------------------------------------


/**
 *  1. 给组件实例扩充 createAPI
 */
export const creator = (component: Component, props: IObj, customClass?: string[]) => {
    Object.assign(component!, {
        $creator: function (props: IObj) {
            const vnode = createVnode(this, props);
            mount(vnode, customClass)
        }
    });
}

