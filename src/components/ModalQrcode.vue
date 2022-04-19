<script setup>
defineProps({
  qrcode: {
    type: String,
    default:
      "https://icon-library.com/images/image-error-icon/image-error-icon-18.jpg",
  },
});
</script>

<template>
  <div
    class="fixed inset-0 flex justify-center items-center z-50"
    @click.self="$emit('close')"
  >
    <div class="relative bg-slate-800 w-64 rounded">
      <button
        class="absolute bg-red-700 rounded-full w-10 h-10 -right-4 -top-4"
        @click="$emit('close')"
      >
        <box-icon name="x" color="white" class="align-middle"></box-icon>
      </button>
      <div class="p-2">
        <img :src="qrcode" class="w-full rounded-lg" alt="qrcode" />
      </div>
    </div>
  </div>
</template>
