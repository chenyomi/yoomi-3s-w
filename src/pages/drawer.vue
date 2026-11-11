<template>
  <VCard id="card-box" class="h-100" style="flex: 1;">
    <VSelect v-model="select" class="w-25" style="position: absolute;top: 1rem;left: 0.75rem;" :items="desserts"
      :density="density" :label="t('料盘')" item-title="label" item-value="value" @update:model-value="onChange" />
    <div class="pix">
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
    <div id="box" class="h-100" />
  </VCard>
</template>

<script setup>
import storageApi from '@/api/storage';
import { createBoard } from '@/utils/createBoard';
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

const router = useRouter()
const { t } = useLocale()
const density = inject('density')
const btnList = inject('btnList')
const select = ref()

const modalData = ref()

const onChange = () => {
  modalData.value = desserts.value.filter(e => e.value == select.value)[0]
  webGL && webGL.updata(modalData.value.storagePallet)
}


let desserts = ref([])

let webGL = null

onMounted(() => {

  nextTick(() => {

    btnList.value = [{
      name: '开始',
      color: '#D32F2F',
      icon: 'bxs-zap',
      size: 'large',
      width: 220,
      mark: '是否任务？',
      before: ({ dialog, openLoading, close, dialogLoading, closeLoading, dialogLoadingText, selectRow }) => {
        router.push('/task')
      }
    }]
    storageApi.getStorage().then(res => {
      desserts.value = res.data
      select.value = res.data[0].value
      modalData.value = desserts.value.filter(e => e.value == select.value)[0]
      webGL = new createBoard(modalData.value.storagePallet)
      webGL.onModalChange = (res) => {
        console.log(res)
      }
    })

  })

})

onUnmounted(() => {
  webGL && webGL.disWebGl()
})
</script>

<style lang="scss" scoped>
.pix {
  position: absolute;
  inset-block-start: 70px;
  inset-inline-start: 20px;

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

