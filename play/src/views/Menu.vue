<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-04-21 15:45:49
 * @LastEditTime: 2023-04-21 17:13:51
-->
<template>
  <yto-menu :menuData="menuData" @select="onSelect" @open="open" @close="close" @menuItemClick="menuItemClick"></yto-menu>
</template>
<script lang="ts" setup name="Menu">
const menuData = [
  {
    name: "Navigator Three",
    path: "/navigatorThree",
    icon: "",
    children: [
      {name: 'Item Three', path: '/three1'},
      {name: 'Item Three', path: '/three2'},
    ],
  },
  {
    name: "Navigator Two",
    path: "/navigatorTwo",
    icon: "",
    children: [
      {
        name: 'SubItem One', path: '/nav/tow',
        children: [
          {
            name: 'Item1', path: '/nav/tow/sub',
            children: [
              {name: 'Item21', path: '/nav/tow/sub21',},
              {name: 'Item22', path: '/nav/tow/sub22'}
            ]
          },
          {name: 'Item2', path: '/nav/tow/sub2'}
        ]
      },
      {name: 'SubItem Two', path: '/nav/tow2'},
    ],
  },
  {
    name: "Navigator One",
    path: "/navigatorOne",
    icon: "",
    children: [
      {
        name: "Group One",
        type: 'group',
        children: [
          {name: 'SubItem One', path: '/one/sub1'},
          {name: 'SubItem Tow', path: '/one/sub2'}
        ],
      },
      {
        name: "Group Tow",
        type: 'group',
        children: [
          {name: 'SubItem One 1', path: '/tow/sub1'},
          {name: 'SubItem Two 1', path: '/tow/sub2'}
        ],
      }
    ],
  },
]
const onSelect = () => {
  console.log('****se');
  
}
const open = () => {
  console.log('****open');
  
}
const close = () => {
  console.log('****close');
  
}
const menuItemClick = () => {
  console.log('****menuItemClick');
  
}

</script>
