import { toJoin, toLowerCamelCase, toNumber, toPathFormat, toUpperCamelCase } from '../../src/index'


import { describe } from 'vitest'
import { testToEqual } from '../TestExtend';
describe('test case toNumber...', () => {
  testToEqual(() => toNumber('123'), 123)
  testToEqual(() => toNumber('25px'), 25)
  testToEqual(() => toNumber('abc'), 0)
})


describe('test case toPathFormat...', () => {
  testToEqual(() => toPathFormat('///a///b/////c'), '/a/b/c')
  testToEqual(() => toPathFormat('\\\\\a\\\\b\\\\c'), '/a/b/c')
  testToEqual(() => toPathFormat('http://localhost:8080//a///b/////\\c'), 'http://localhost:8080/a/b/c')
})

describe('test case toUpperCamelCase...', () => {
  testToEqual(() => toUpperCamelCase('/system/list', '/'), 'SystemList')
  testToEqual(() => toUpperCamelCase('system-info'), 'SystemInfo')
})


describe('test case toLowerCamelCase...', () => {
  testToEqual(() => toLowerCamelCase('/system/list', '/'), 'systemList')
  testToEqual(() => toLowerCamelCase('system-info'), 'systemInfo')
})

describe('test case toLowerCamelCase...', () => {
  testToEqual(() => toJoin('/system/list'), '/system/list')
  testToEqual(() => toJoin('/systemInfo/dataList'), '/system-info/data-list')
  testToEqual(() => toJoin('/SystemInfo/DataList'), '/system-info/data-list')
  testToEqual(() => toJoin('SystemInfo'), 'system-info')
})


