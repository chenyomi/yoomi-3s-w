import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { disposeObject3D } from '@/utils/threeDispose'

const MAX_PIXEL_RATIO = 2

export class createMaterial {
  constructor(options) {
    this.options = {
      container: '#box', // 容器id
      materialTemplateShape: 0, // 0立方体 1圆柱
      materialTemplateLengthX: 100, // 立方体X
      materialTemplateLengthY: 100, // 立方体Y
      materialTemplateLengthZ: 100, // 立方体Z / 圆柱高Z
      L1X: 500,
      L1Y: 400,
      L1Z: -300,
      L2X: -500,
      L2Y: 400,
      L2Z: 300,
    }
    this.animation = null
    this.disposed = false
    this.domBox = null
    this.cardBox = null
    this.composer = null
    this.outlinePass = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.v2 = null
    this.renderer = null
    this.job = null
    this.axesHelper = null
    this.light1 = null
    this.light2 = null
    this.ambientLight = null
    this.viewWidth = 0
    this.viewHeight = 0
    this.loop = this.loop.bind(this)
    this.updata(options)
  }

  loop() {
    if (this.disposed || !this.composer) {
      this.animation = null

      return
    }

    this.animation = requestAnimationFrame(this.loop)
    this.composer.render()
  }

  applyOptions(options) {
    if (!options) {
      return
    }

    Object.keys(options).forEach(key => {
      if (options[key] !== undefined)
        this.options[key] = options[key]
    })
  }

  mount() {
    this.cardBox = document.querySelector(this.options.container)

    if (!this.cardBox) {
      throw new Error(`未找到模型容器 ${this.options.container}`)
    }

    const width = this.cardBox.clientWidth || 1
    const height = this.cardBox.clientHeight || 1

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO))
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.shadowMap.enabled = true
    this.viewWidth = width
    this.viewHeight = height

    this.scene = new THREE.Scene()
    this.v2 = new THREE.Vector2(width, height)
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

    this.theme = localStorage.getItem('theme')

    const directional = this.theme == 'light' ? 2 : 1

    this.light1 = new THREE.DirectionalLight(0xeeeeee, directional)
    this.light2 = new THREE.DirectionalLight(0xeeeeee, directional)
    this.ambientLight = new THREE.AmbientLight(0xaaaaaa, this.theme == 'light' ? 3 : 2)
    this.scene.add(this.light1, this.light2, this.ambientLight)

    this.axesHelper = new THREE.AxesHelper(200)
    this.scene.add(this.axesHelper)

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.outlinePass = new OutlinePass(this.v2, this.scene, this.camera)
    this.composer.addPass(this.outlinePass)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.domBox = this.cardBox
    this.renderer.domElement.setAttribute('class', 'fadeIn')
    this.domBox.appendChild(this.renderer.domElement)
    this.animation = requestAnimationFrame(this.loop)
  }

  resize() {
    if (!this.cardBox || !this.renderer) {
      return
    }

    const width = this.cardBox.clientWidth
    const height = this.cardBox.clientHeight

    if (!width || !height || (width === this.viewWidth && height === this.viewHeight)) {
      return
    }

    this.viewWidth = width
    this.viewHeight = height
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.v2.set(width, height)
    this.composer.setSize(width, height)
  }

  rebuild() {
    this.theme = localStorage.getItem('theme')

    const directional = this.theme == 'light' ? 2 : 1
    const { materialTemplateLengthX: x, materialTemplateLengthY: y, materialTemplateLengthZ: z } = this.options

    this.light1.intensity = directional
    this.light2.intensity = directional
    this.ambientLight.intensity = this.theme == 'light' ? 3 : 2
    this.light1.position.set(this.options.L1X, this.options.L1Y, this.options.L1Z)
    this.light2.position.set(this.options.L2X, this.options.L2Y, this.options.L2Z)

    this.axesHelper.position.set(-x / 2 - 10, -y / 2 - 10, -z / 2 - 10)
    this.camera.position.set(0, 1.2 * z, 1.2 * z)
    this.controls.target.set(0, 0, 0)
    this.controls.update()

    if (this.job) {
      this.scene.remove(this.job)
      disposeObject3D(this.job)
      this.job = null
    }

    const geometry = this.options.materialTemplateShape == 0
      ? new THREE.BoxGeometry(x, z, y)
      : new THREE.CylinderGeometry(x / 2, x / 2, z)

    this.job = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x9ed2ff }))
    this.job.position.set(0, 0, 0)
    this.scene.add(this.job)
    this.outlinePass.selectedObjects = [this.job]
  }

  updata(options) {
    this.applyOptions(options)

    if (this.disposed || !this.renderer) {
      this.disposed = false
      this.mount()
    }

    this.resize()
    this.rebuild()
  }

  disWebGl() {
    if (this.disposed && !this.renderer) {
      return
    }

    this.disposed = true
    cancelAnimationFrame(this.animation)
    this.animation = null

    if (this.controls) {
      this.controls.dispose()
      this.controls = null
    }

    if (this.composer) {
      this.composer.dispose()
      this.composer = null
    }

    this.outlinePass = null

    if (this.scene) {
      disposeObject3D(this.scene)
      this.scene.clear()
      this.scene = null
    }

    this.job = null
    this.axesHelper = null
    this.light1 = null
    this.light2 = null
    this.ambientLight = null

    if (this.renderer) {
      const canvas = this.renderer.domElement

      if (canvas && canvas.parentNode)
        canvas.parentNode.removeChild(canvas)

      this.renderer.dispose()
      this.renderer.forceContextLoss()
      this.renderer = null
    }

    this.camera = null
    this.cardBox = null
    this.domBox = null
    this.v2 = null
    this.viewWidth = 0
    this.viewHeight = 0
  }
}
