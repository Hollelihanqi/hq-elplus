<script lang="ts" setup name="CustomDialog">
	import type { ButtonProps, DialogProps } from "element-plus";
	import { ZoomIn, ZoomOut } from "@element-plus/icons-vue";
	import type { Component } from "vue";

	interface IProps {
		visible: boolean;
		headerBgColor?: string; // 头部颜色

		offset?: Array<string>;

		mimIcon?: Component; //最小化最大化按钮
		maxmin?: boolean; // 最小化最大化按钮显示隐藏

		confirmOption?: Object | string | undefined;
		cancelOption?: Object | string | undefined;
	}
	const props = withDefaults(defineProps<IProps>(), {
		visible: false,
		offset: () => {
			return ["auto", "15vh"];
		},
		mimIcon: ZoomIn,
		maxmin: false,
	});
	const $emit = defineEmits(["update:visible", "cancel", "confirm", "maxminFun", "reductionFun"]);
	const attrs = useAttrs();
	console.log("attrs", attrs, props);

	// -------------------------------- header start--------------------------
	const maxminFun = () => {
		nextTick(() => {
			let dialogBody = document.querySelector("." + "dialog-cst" + " .el-dialog__body");

			if (props.mimIcon == ZoomIn) {
				// @ts-ignore
				dialogBody!.style.display = "none";
				props.mimIcon = ZoomOut;
				$emit("maxminFun");
			} else {
				// @ts-ignore
				dialogBody!.style.display = "block";
				props.mimIcon = ZoomIn;
				$emit("reductionFun");
			}
		});
	};
	// -------------------------------- header end--------------------------

	// -------------------------------- footer btn start--------------------------
	const _showConfirm = computed(() => {
		return Reflect.has(props, "confirmOption") && props.confirmOption != undefined;
	});
	const _showCancel = computed(() => {
		return Reflect.has(props, "cancelOption") && props.cancelOption != undefined;
	});
	const _confirmOption = computed(() => {
		let option = {
			type: "primary",
			size: "default",
			txt: "确认",
		};
		option = Object.assign({}, option, props.confirmOption);
		return reactive(option);
	});
	const _cancelOption = computed(() => {
		let option = {
			type: "default",
			size: "default",
			txt: "取消",
		};
		option = Object.assign({}, option, props.cancelOption);
		return reactive(option);
	});
	const handleClose = () => {
		$emit("update:visible", false);
		$emit("cancel", "cancel");
	};
	const handleConfirm = () => {
		$emit("update:visible", false);
		$emit("confirm", "confirm");
	};
	// -------------------------------- footer btn end--------------------------
</script>

<template>
	<el-dialog class="dialog-cst" v-bind="$attrs" :style="{ marginLeft: offset[0], marginTop: offset[1] }">
		<template #header>
			<slot name="header"></slot>
		</template>

		<slot />

		<template #footer>
			<slot name="footer">
				<el-button v-if="_showConfirm" v-bind="_cancelOption" @click="handleClose">{{ _cancelOption.txt ? _cancelOption.txt : "取消" }}</el-button>
				<el-button v-if="_showCancel" v-bind="_confirmOption" @click="handleConfirm">{{ _confirmOption.txt ? _confirmOption.txt : "确认" }}</el-button>
			</slot>
		</template>
	</el-dialog>
</template>

<style lang="scss" scoped>
	.my-dialog {
		:deep(.el-dialog__header) {
			margin-right: 0;
		}
	}
</style>
