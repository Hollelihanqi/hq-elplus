import Dialog from './src/index.vue'

import { install } from '../../_utils'

import { creator } from '../../_utils/create-api/creator'
creator(Dialog, {})
console.log("Dialog", Dialog);


export const YtoDialog = install(Dialog)

export type { DialogInstance } from './src/instance'

export default YtoDialog
