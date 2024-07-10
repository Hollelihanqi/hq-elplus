<template>
  <div class="p-[16px]">
    <el-button @click="actionDialog">预览JSON</el-button>
  </div>
  <el-drawer v-model="dialogVisible" title="详细信息" direction="rtl" :before-close="handleClose" size="600px">
    <yto-c-sticky-container>
      <yto-c-json-viewer :data="tabAct === 1 ? testData2 : testData" class="!p-0" />
    </yto-c-sticky-container>
    <template #footer>
      <div class="flex items-center justify-end">
        <el-button type="default" @click="handleClose">取消</el-button>
        <el-button type="default" @click="handleToggle">切换数据</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="tsx" setup>
const dialogVisible = ref(false);
const actionDialog = (): void => {
  dialogVisible.value = true;
};

const handleClose = () => {
  dialogVisible.value = false;
};

const tabAct = ref(1);
const testData = {
  gdStreet: null,
  clientMac: null,
  loginIpCityCode: "",
  pullDate: null,
  ipDistrictCode: "0",
  lihanqi: {
    hello: "123",
    word: "780",
    train: {
      h1: "2222222222222",
      h2: "5555555555555555555",
    },
  },
  dream: true,
  deviceId: "B041068450B521C3",
  branch: "377001",
  depCode: null,
  protocol: null,
  systemSource: null,
  sellerId: null,
  receiverMobileVirtualId: null,
  uaName: "unknown",
  gdCityCode: null,
  gdStreetNumber: null,
  ipCityCode: "411300",
  loginIp: "10.7.81.110",
  receiveSize: "79",
  longitude: 0,
  deviceType: null,
  gdTownCode: null,
  clientUserAgent: "XZ-AND/RMO-AN00/8.3.8.1",
  orgName: "河南省南阳市宛城区溧河乡",
  machineCode: null,
  method: null,
  gdCountryName: null,
  gdDistrictName: null,
  orgCountry: "中国",
  ipCountryCode: "CN",
  params: '{"imId":0,"mailNo":"YT1853581813051","pilotVersion":0,"queryType":3,"smsVersion":"df"}',
  depName: null,
  customerName: null,
  actionResult: "true",
  tags: [28, 89, 65, { name: "lihanqi", age: 28 }],
  instancePort: "8002",
  macAddress: null,
  systemService: null,
  actionClass: "cn.yto.courier.api.controller.ImCallAPi",
  topic: "XZ_courier-app-api",
  applicationId: "6",
  data_dt: "20240403",
  ipCountryName: "中国",
  responseBody:
    '{"dfStatus":0,"lphone":"@xc-encrypt-text@136****6586@/xc-encrypt-text@@xc-encrypt-content@WwO307/xdnts4osvtceSXQ==@/xc-encrypt-content@","mailNo":"YT1853581813051","secretType":0}',
  regionManageCode: "371907",
  latitude: 0,
  lastPullDate: null,
  orgCity: "南阳市",
  sellerName: null,
  serverName: "行者app服务",
  customerCode: null,
  gdProvinceName: null,
  userCode: "02665082",
  lastUniqueNo: null,
  ipFirst: "39.144.181.223",
  orgProvince: "河南省",
  sellerCode: "",
  orgCode: "377738",
  ipProvinceName: "河南省",
  clientPort: null,
  paramsWaybillNo: null,
  isCommon: null,
  operationId: "1117467",
  startTime: null,
  applicationName: "行者",
  ipCate: "互联网",
  regionManageName: "河南区",
  systemClient: null,
  actionMethod: "queryPhoneInShortVmByControl",
  gdTown: null,
  responseTime: 1712120988348,
  userSource: "员工账号",
  receiverName: null,
  mobile: "",
  operationName: "",
  sessionId: "f92323614f4ef923d1f4bfdbc3ac17d091d69ebc1ee8c64325ee6da435b85fec",
  userName: "杨勉",
  osName: "unknown",
  url: "http://courier-app.yto56.com.cn:10443/courierAppApi/imCall/queryPhoneInShortVmByControl/3",
  ipCityName: "南阳市",
  requestTime: "2024-04-03 13:09:50",
  clientAddr: "39.144.181.223",
  sendSize: null,
  ipDistrictName: "",
  serverAddr: "10.7.73.56",
  createTime: 1712120988417,
  ipProvinceCode: "410000",
  gdCityName: null,
  gdAdCode: null,
  wayBillNo: "YT1853581813051",
  deviceModel: null,
  endTime: null,
};

const testData2 = {
  id: "61ce7d82727a74d030e08eb1",
  userCode: "02393963",
  userName: "李涵祺",
  stationName: "总公司",
  stationCode: "999999",
  tags: [28, 89, 65, { name: "lihanqi", age: 28 },"train",false],
  block: false,
  role: "用户体验设计前端开发工程师",
  show: true,
  stationPath: [],
  stationType: null,
  dream: {
    dream01: {
      dream02: {
        dream03: {
          name: "train",
        },
      },
    },
  },
};

const handleToggle = () => {
  tabAct.value = tabAct.value === 1 ? 2 : 1;
};
defineExpose({
  actionDialog,
});
</script>
