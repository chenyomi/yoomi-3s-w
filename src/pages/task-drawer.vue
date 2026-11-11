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
import { useStore } from "@/pinia/index";
import { createBoard } from '@/utils/createBoard';
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';
import drawerForm from './task-drawer-form.vue';
const { t } = useLocale()
const router = useRouter()
const density = inject('density')
const btnList = inject('btnList')
const next = inject('next')
const message = inject('message')
const select = ref()
const modalData = ref()


const store = useStore()

const onChange = () => {
  store.setProcess({
    storagePalletId: select.value
  })
  modalData.value = desserts.value.filter(e => e.value == select.value)[0]
  webGL && webGL.updata({
    ...modalData.value.storagePallet,
    materialList: []
  })
}

let desserts = ref([])

let webGL = null

onMounted(() => {
  nextTick(() => {
    btnList.value = [{
      name: '新增物料',
      color: '#7986CB',
      size: 'large',
      width: 150,
      formWidth: 400,
      hideDiaName: true,
      slot: shallowRef(drawerForm),
      slotData: {},
      fn: ({ close, openLoading, closeLoading, diaFormRef }) => {
        openLoading({
          text: '正在上传更新',
        })
        diaFormRef.submit().then(e => {
          e.storagePalletId = select.value
          storageApi.getStorageMaterial(e).then(res => {
            modalData.value.storagePallet = res.data
            webGL && webGL.updata(modalData.value.storagePallet)
          })
        }).finally(() => {
          close()
          closeLoading()
        })
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
        if (modalData.value.storagePallet.materialList && modalData.value.storagePallet.materialList.length) {
          storageApi.getStorageMaterialCheck({ materialList: modalData.value.storagePallet.materialList }).then(res => {
            dialog.value = true
          }).catch(res => {
            message.value.open({
              text: '必须选择同一种物料',
            })
          })

        } else {
          message.value.open({
            text: '请选择物料',
          })
        }

      },
    }]
    const { process } = storeToRefs(store)
    storageApi.getStorage().then(res => {
      desserts.value = res.data
      // 更新当前页面select 默认
      select.value = process.value.storagePalletId ? process.value.storagePalletId : res.data[0].value
      // 更新需要提交的数据pinia结构中的select 值
      store.setProcess({
        storagePalletId: select.value
      })
      // 第一次进入默认选中的料盘的完整数据
      modalData.value = desserts.value.filter(e => e.value == select.value)[0]
      // 再次渲染如果存在选择的物料就传入 默认
      modalData.value.storagePallet.materialList = process.value.materialList || []
      webGL = new createBoard(modalData.value.storagePallet)
      // 监听数据的变化
      webGL.onModalChange = (data) => {
        // 选择以后更新选择的物料就传入 默认
        modalData.value.storagePallet.materialList = data
        store.setProcess({
          materialList: data
        })
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

