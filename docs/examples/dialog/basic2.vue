<template>
	<div>
		<el-button @click="dialogVisible = true" class="a">弹出位置</el-button>

		<yto-cdialog v-model="dialogVisible" :offset="['0', '0']" @confirm="handleConfirm" @cancel="handleCancel">
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
				// loading: true,
				type: "warning",
				// size: 'large'
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
			};
		},
	});
</script>
