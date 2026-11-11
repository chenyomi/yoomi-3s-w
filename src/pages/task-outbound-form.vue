<script setup>
import taskApi from '@/api/task';
import { createMaterial } from '@/utils/createMaterial';
import { getDict } from '@/utils/utils';
import { cloneDeep } from 'lodash';
import { onMounted, onUnmounted, watch } from 'vue';

const temp = ref([])
const tempSelect = ref()
watch(() => tempSelect.value, newVal => {
  const item = temp.value.filter(e => e.id == newVal)[0]
  if (!item || !webGL) return
  formData.value = cloneDeep(item)
  webGL.updata(formData.value)
})
taskApi.taskStorageSelector().then(res => {
  temp.value = res.data
})
let webGL = null
const density = inject('density')

const formData = ref({
  materialTemplateShape: 0,
  materialTemplateLengthX: 0,
  materialTemplateLengthY: 0,
  materialTemplateLengthZ: 0,
  materialNumber: null,
  materialName: '',
})


const proType = getDict('sss_material_template_shape')

const onChange = () => {
  webGL && webGL.updata(formData.value)
}

onMounted(() => {
  setTimeout(() => {
    webGL = new createMaterial()
  }, 0)
})
onUnmounted(() => {
  webGL && webGL.disWebGl()
})
defineExpose({
  formData
})
</script>

<template>
  <VRow class="pt-3">
    <VCol cols="3">
      <VSelect v-model="tempSelect" :items="temp" :density="density" class="mb-3" label="模板" item-title="materialName"
        item-value="id" />
      <VSelect v-model="formData.materialTemplateShape" :items="proType" :density="density" class="mb-2" label="物料形状"
        @update:model-value="onChange" />
      <VTextField v-model="formData.materialName" label="物料名称：" :density="density" class="mb-2" />


      <VTextField v-if="formData.materialTemplateShape === 0" v-model="formData.materialTemplateLengthX" label="X轴长度："
        :density="density" class="mb-2" suffix="mm" @update:model-value="onChange" />
      <VTextField v-if="formData.materialTemplateShape === 0" v-model="formData.materialTemplateLengthY" label="Y轴长度："
        :density="density" class="mb-2" suffix="mm" @update:model-value="onChange" />
      <VTextField v-if="formData.materialTemplateShape === 1" v-model="formData.materialTemplateLengthX" label="半径："
        :density="density" class="mb-2" suffix="mm" @update:model-value="onChange" />
      <VTextField v-model="formData.materialTemplateLengthZ" label="Z轴长度：" :density="density" suffix="mm" class="mb-2"
        @update:model-value="onChange" />
      <VTextField v-model="formData.materialNumber" label="数量" :density="density" class="mb-2" />
    </VCol>
    <VCol cols="9">
      <div id="box" class="w-100" style="height: 21.5rem;" />
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
canvas {
  background: none !important;
}
</style>
