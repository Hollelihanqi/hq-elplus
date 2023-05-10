<template>
	<div>
		<el-button @click="dialogVisible = true" class="a">按钮定制</el-button>

		<yto-cdialog v-model="dialogVisible" @confirm="handleConfirm" @cancel="handleCancel" :confirmOption="confirm" :cancelOption="cancel">
			<template #header> title </template>
			<p>这是一个示例对话框</p>
		</yto-cdialog>
	</div>
</template>

<style></style>

<script lang="ts">
	import { defineComponent, ref, reactive } from "vue";
	// import { YtoDialog } from "@yto/custom";

	export default defineComponent({
		setup() {
			const confirm = reactive({
				loading: true,
				// type: "primary",
				size: "large",
				txt: "confirm",
			});

			const cancel = reactive({
				// loading: true,
				type: "warning",
				size: "large",
				txt: "cancel",
			});

			const dialogVisible = ref(false);
			const handleConfirm = (val: boolean) => {
				dialogVisible.value = false;
				console.log(val);
			};
			const handleCancel = (val: boolean) => {
				dialogVisible.value = false;
				console.log(val);
			};
			return {
				dialogVisible,
				handleConfirm,
				handleCancel,
				confirm,
				cancel,
			};
		},
	});
</script>
