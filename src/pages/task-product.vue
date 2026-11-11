<script setup>
import taskApi from '@/api/task';
import { useStore } from "@/pinia/index";
import { createMaterial } from '@/utils/createMaterial';
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';

const store = useStore()
const density = inject('density')
const btnList = inject('btnList')
const router = useRouter()
const next = inject('next')
const message = inject('message')

const { mdAndDown } = useDisplay()
const dialog = ref(false)

const tools = ref([])

const proType = [
  { title: '立方体', value: 0 },
  { title: '圆柱体', value: 1 },
]

const selectorRow = ref([
  {
    fingerLength: 0, fingerDepth: 0, fingerWidth: 0, handLocateX: 0, handLocateY: 0
  }, {
    fingerLength: 0, fingerDepth: 0, fingerWidth: 0, handLocateX: 0, handLocateY: 0
  }])

const formData = ref({})

// watch(() => [formData.value.clientX, formData.value.clientY, formData.value.clientZ], () => {
//   if (!mdAndDown.value) {
//     webGL.disWebGl()
//     setTimeout(() => {
//       webGL.updata(formData.value)
//     }, 0)
//   }

// })
watch(() => [formData.value.materialFinishName, formData.value.loadHandId, formData.value.unloadHandId], (newVal) => {
  store.setProcess({
    materialFinishName: newVal[0],
    loadHandId: newVal[1],
    unloadHandId: newVal[2]
  })
})

watch(() => dialog.value, newVal => {
  if (!mdAndDown.value) return
  nextTick(() => {
    if (newVal) {
      if (webGL) {
        webGL.updata(formData.value)
      } else {
        webGL = new createMaterial(formData.value)
      }
    } else {
      webGL && webGL.disWebGl()
    }

  })
})


let webGL = null
const getSelector = () => {
  taskApi.taskProcessSelector().then(res => {
    tools.value = res.data.handList
  })
}
const getMD = () => {
  const { process } = storeToRefs(store)
  process.value.storagePalletId && taskApi.taskProcessMaterial({
    storagePalletId: process.value.storagePalletId
  }).then(res => {
    formData.value = res.data
    const { process } = storeToRefs(store)
    if (process.value) {
      formData.value.materialFinishName = process.value.materialFinishName
      formData.value.loadHandId = process.value.loadHandId
      formData.value.unloadHandId = process.value.unloadHandId
    }
    setTimeout(() => {
      if (!mdAndDown.value) {
        webGL = new createMaterial({
          materialTemplateShape: formData.value.materialShape, //0立方体1圆柱
          materialTemplateLengthX: formData.value.materialLengthX, //立方体X
          materialTemplateLengthY: formData.value.materialLengthY, //立方体Y
          materialTemplateLengthZ: formData.value.materialLengthZ, //立方体Z /圆柱高Z
        })
      }
    }, 0);
  })
}

const onChange = (e, a) => {
  const index = tools.value.findIndex(c => c.id == formData.value[e])
  selectorRow.value[a] = tools.value[index]
}

onMounted(() => {
  getSelector()
  getMD()
  nextTick(() => {
    btnList.value = [
      //   {
      //   name: '新增',
      //   color: '#42A5F5',
      //   size: 'large',
      //   width: 120,
      //   mark: '是否新增一个物料',
      //   fn: ({ close, openLoading, closeLoading }) => {
      //     close()
      //     setTimeout(() => {
      //     }, 1000)
      //   },
      // }, {
      //   name: '删除',
      //   color: '#EF5350',
      //   size: 'large',
      //   width: 120,
      //   mark: '是否删除当前选择的物料',
      //   fn: ({ close, openLoading, closeLoading }) => {
      //     close()
      //     setTimeout(() => {
      //       select.value = ['0']
      //     }, 1000)
      //   },
      //   },
      {
        name: '上一步',
        color: '#90A4AE',
        size: 'large',
        width: 120,
        mark: '是否返回上一步',
        fn: ({ close, openLoading, closeLoading }) => {
          close()
          router.push({ path: '/process/drawer' })
        },
      }, {
        name: next.value.name,
        color: '#D32F2F',
        size: 'large',
        width: 220,
        mark: next.value.intro,
        fn: ({ close, openLoading, closeLoading }) => {
          openLoading({
            text: next.value.loadtext,
          })
          close()
          setTimeout(() => {
            closeLoading()
            if (next.value.type == 'next') {
              router.push({ path: next.value.nextPath })
            } else if (next.value.type == 'last') {
              router.push({ path: '/tasklist' })
            }
          }, 1000)
        },
        before: ({ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText }) => {
          if (!formData.value.materialFinishName || formData.value.materialFinishName == '') {
            message.value.open({
              text: '请输入成品名称',
            })
          } else if (!formData.value.loadHandId) {
            message.value.open({
              text: '请选择装载手爪',
            })
          } else if (!formData.value.unloadHandId) {
            message.value.open({
              text: '请选择卸载手爪',
            })
          } else {
            dialog.value = true
          }
        },
      }]
  })
})
onUnmounted(() => {
  webGL && webGL.disWebGl()
})
</script>

<template>
  <VCard class="h-100 px-3" style="overflow-y: scroll;">
    <div class="d-flex gap-3 align-center w-50"
      :style="!mdAndDown ? 'position:absolute;top: 1rem;left: 0.75rem;' : 'margin-top:1.25rem'">
      <VTextField v-model="formData.materialFinishName" label="成品名称：" :density="density" />
      <VDialog v-if="mdAndDown" v-model="dialog" width="500">
        <template #activator="{ props }">
          <VBtn color="primary" v-bind="props" variant="tonal">
            <VIcon icon="bxs-cube-alt" />
          </VBtn>
        </template>
        <VCard>
          <VCardText>
            <div id="box" class="w-100" style="height: 300px;" />
          </VCardText>
        </VCard>
      </VDialog>
    </div>

    <div v-if="!mdAndDown" class="d-flex" style="height: calc(100% / 2 - 30px);">
      <div style="flex: 1;" />
      <div id="box" class="h-100" style="flex: 1;">
        <div v-if="!mdAndDown" class="pix">
          <div>
            <span style="background: #ffa726;" />
            <span>X</span>
          </div>
          <div>
            <span style="background: #039be5;" />
            <span>Y</span>
          </div>
          <div>
            <span style="background: #b2ff59;" />
            <span>Z</span>
          </div>
        </div>
      </div>
    </div>
    <VRow>
      <VCol cols="4" class="text-center pb-0">
        <VChip class="mt-3 mb-1" color="#00897B">
          物料
        </VChip>
      </VCol>
      <VCol cols="4" class="text-center pb-0">
        <VChip class="mt-3 mb-1" color="#00897B">
          装载
        </VChip>
      </VCol>
      <VCol cols="4" class="text-center pb-0">
        <VChip class="mt-3 mb-1" color="#00897B">
          卸载
        </VChip>
      </VCol>
      <VCol cols="4">
        <VSelect v-model="formData.materialShape" :items="proType" :density="density" disabled class="mb-2"
          label="物料形状" />
        <VTextField v-model="formData.materialLengthX" label="X轴长度：" :density="density" disabled class="mb-2"
          suffix="mm" />
        <VTextField v-model="formData.materialLengthY" label="Y轴长度：" :density="density" disabled class="mb-2"
          suffix="mm" />

        <VTextField v-model="formData.materialLengthZ" label="Z轴长度：" :density="density" disabled suffix="mm"
          class="mb-2" />
        <!--
          <VSwitch
          v-model="formData.status"
          color="primary"
          class="mt-6"
          label="启用/禁用"
          /> 
        -->
      </VCol>
      <VCol cols="4" :style="!mdAndDown ? 'height: calc(50vh - 130px); overflow-y: scroll;' : ''">
        <VSelect v-model="formData.loadHandId" :items="tools" :density="density" label="手爪" class="mb-2"
          item-title="label" item-value="id" @update:model-value="onChange('loadHandId', 0)" />
        <VTextField v-model="selectorRow[0].fingerLength" label="夹指长度：" :density="density" suffix="mm" class="mb-2"
          disabled />
        <VTextField v-model="selectorRow[0].fingerDepth" label="夹深：" :density="density" class="mb-2" disabled />
        <VTextField v-model="selectorRow[0].fingerWidth" label="指宽：" :density="density" suffix="mm" class="mb-2"
          disabled />
        <VTextField v-model="selectorRow[0].handLocateX" label="X轴长度：" :density="density" suffix="mm" class="mb-2"
          disabled />
        <VTextField v-model="selectorRow[0].handLocateY" label="Y轴长度：" :density="density" suffix="mm" class="mb-2"
          disabled />
      </VCol>
      <VCol cols="4" :style="!mdAndDown ? 'height: calc(50vh - 130px); overflow-y: scroll;' : ''">
        <VSelect v-model="formData.unloadHandId" :items="tools" :density="density" label="手爪" class="mb-2"
          item-title="label" item-value="id" @update:model-value="onChange('unloadHandId', 1)" />
        <VTextField v-model="selectorRow[1].fingerLength" label="夹指长度：" :density="density" suffix="mm" class="mb-2"
          disabled />
        <VTextField v-model="selectorRow[1].fingerDepth" label="夹深：" :density="density" class="mb-2" disabled />
        <VTextField v-model="selectorRow[1].fingerWidth" label="指宽：" :density="density" suffix="mm" class="mb-2"
          disabled />
        <VTextField v-model="selectorRow[1].handLocateX" label="X轴长度：" :density="density" suffix="mm" class="mb-2"
          disabled />
        <VTextField v-model="selectorRow[1].handLocateY" label="Y轴长度：" :density="density" suffix="mm" class="mb-2"
          disabled />
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.pix {
  position: absolute;
  inset-block-start: 60px;
  inset-inline-end: 15px;

  div {
    margin-block-end: 5px;

    span {
      display: inline-block;
      vertical-align: middle;
    }

    span:first-child {
      border-radius: 3px;
      background: #333;
      block-size: 20px;
      inline-size: 20px;
      margin-inline-end: 10px;
    }
  }
}
</style>
