/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-05-11 15:42:28
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-06-04 20:00:34
 * @FilePath: \yto-engine\docs2\.vitepress\config.mts
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import consola from 'consola'
// import { REPO_BRANCH, REPO_PATH } from '@element-plus/build-constants'
// import { docsDirName } from '@element-plus/build-utils'
// import { languages } from './utils/lang'
import { features, head, mdPlugin, nav, sidebars } from './config'

import type { UserConfig } from 'vitepress'

const buildTransformers = () => {
  const transformer = () => {
    return {
      props: [],
      needRuntime: true,
    }
  }

  const transformers = {}
  const directives = [
    'infinite-scroll',
    'loading',
    'popover',
    'click-outside',
    'repeat-click',
    'trap-focus',
    'mousewheel',
    'resize',
  ]
  directives.forEach((k) => {
    transformers[k] = transformer
  })

  return transformers
}

consola.debug(`DOC_ENV: ${process.env.DOC_ENV}`)

// const locales = {}
// languages.forEach((lang) => {
//   locales[`/${lang}`] = {
//     label: lang,
//     lang,
//   }
// })

export const config: UserConfig = {
  title: '前端业务组件库',
  description: `一个用于前端快速构建页面的组件库`,
  lastUpdated: true,
  head,
  themeConfig: {
    // repo: REPO_PATH,
    // docsBranch: REPO_BRANCH,
    // docsDir: docsDirName,

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    logo: '/images/element-plus-logo.svg',
    logoSmall: '/images/element-plus-logo-small.svg',
    sidebars,
    nav,
    agolia: {
      apiKey: '99caf32e743ba77d78b095b763b8e380',
      appId: 'ZM3TI8AKL4',
    },
    features,
    // langs: languages,
  },

  locales,

  markdown: {
    config: (md) => mdPlugin(md),
  },

  vue: {
    template: {
      ssr: true,
      compilerOptions: {
        directiveTransforms: buildTransformers(),
      },
    },
  },
}
export default config
