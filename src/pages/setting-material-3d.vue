<script setup>
import { createMaterial } from '@/utils/createMaterial'
import { onMounted } from 'vue'

const propsData = defineProps({
  data: { type: Object },
})

const formData = ref(propsData.data)


let webGL = null
onMounted(() => {
  setTimeout(() => {
    webGL = new createMaterial(formData.value)
  }, 500)
})
onUnmounted(() => {
  webGL && webGL.disWebGl()
})
</script>

<template>
  <div
    id="box"
    style="
  width: 100%;height: 400px;"
  />
</template>


