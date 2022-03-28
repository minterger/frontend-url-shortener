<script setup>
import { onUnmounted } from "vue";
import { useMainStore } from "../stores/main";

const mainStore = useMainStore();

const props = defineProps({
  id: {
    type: Number,
  },
  type: {
    type: String,
    default: "success",
  },
  message: {
    type: String,
    default: "",
  },
});

const timeout = setTimeout(() => {
  mainStore.removeNotification(props.id);
}, 5000);

onUnmounted(() => {
  clearTimeout(timeout);
});

const bgColor = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};
</script>

<template>
  <div :class="bgColor[props.type]" class="rounded-sm text-white p-2 m-2 w-60">
    <p class="text-sm">{{ props.message }}</p>
  </div>
</template>
