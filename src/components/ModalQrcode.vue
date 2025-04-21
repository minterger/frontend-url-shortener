<script setup>
const props = defineProps({
  qrcode: {
    type: String,
    default:
      "https://icon-library.com/images/image-error-icon/image-error-icon-18.jpg",
  },
  nameQr: {
    type: String,
    default: "",
  },
});

const downloadQRCode = () => {
  const link = document.createElement("a");
  link.href = props.qrcode;
  link.download = `${props.nameQr}.png`;
  link.click();
  link.remove();
};
</script>

<template>
  <div
    class="fixed inset-0 flex justify-center items-center z-50"
    @click.self="$emit('close')"
  >
    <div class="relative bg-slate-800 w-64 flex flex-col rounded">
      <button
        class="absolute bg-red-700 rounded-full w-10 h-10 -right-4 -top-4 cursor-pointer"
        @click="$emit('close')"
      >
        <box-icon name="x" color="white" class="align-middle"></box-icon>
      </button>
      <div class="p-2">
        <img :src="qrcode" class="w-full rounded-lg" alt="qrcode" />
      </div>
      <button
        @click="downloadQRCode"
        class="rounded-sm m-2 mt-0 bg-green-500 dark:bg-red-600 text-white px-3 py-2 hover:bg-green-600 hover:dark:bg-red-700 transition-colors duration-200 cursor-pointer"
      >
        Download
      </button>
    </div>
  </div>
</template>
