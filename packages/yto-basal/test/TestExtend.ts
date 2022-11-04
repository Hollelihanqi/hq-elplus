import { test, expect } from "vitest";

export function testToBe(fn: Function, valueExpect: any) {
  test(`${fn.toString()} expect result ${valueExpect} `, () => {
    expect(fn()).toBe(valueExpect);
  })
}

export function testToEqual(fn: Function, valueExpect: any) {
  test(`${fn.toString()} expect result ${valueExpect} `, () => {
    expect(fn()).toEqual(valueExpect);
  })
}

export function testToStrictEqual(fn: Function, valueExpect: any) {
  test(`${fn.toString()} expect result ${valueExpect} `, () => {
    expect(fn()).toStrictEqual(valueExpect);
  })
}

