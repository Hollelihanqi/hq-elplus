import Dialog from './src/index.vue'

import { install } from '../../_utils'

import { creator } from '../../_utils/create-api/creator'
creator(Dialog, {})

export const YtoDialog = install(Dialog)

export * from './src/instance'

export default YtoDialog

