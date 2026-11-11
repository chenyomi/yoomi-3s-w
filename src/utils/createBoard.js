import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { disposeObject3D } from '@/utils/threeDispose'

const MAX_PIXEL_RATIO = 2

function addSiteHoles(squareShape, upper) {
  for (let colIndex = 0; colIndex < upper.trawlBoardSiteY; colIndex++) {
    for (let rowIndex = 0; rowIndex < upper.trawlBoardSiteX; rowIndex++) {
      const row = upper.trawlBoardOffsetX + (upper.trawlBoardSiteLengthX + upper.trawlBoardSiteSpaceX) * rowIndex + upper.trawlBoardSiteLengthX / 2
      const col = upper.trawlBoardOffsetY + (upper.trawlBoardSiteLengthY + upper.trawlBoardSiteSpaceY) * colIndex + upper.trawlBoardSiteLengthY / 2
      const path = new THREE.Path()

      if (upper.trawlBoardShape == 0) {
        path.moveTo(row - upper.trawlBoardSiteLengthX / 2, col - upper.trawlBoardSiteLengthY / 2)
        path.lineTo(row + upper.trawlBoardSiteLengthX / 2, col - upper.trawlBoardSiteLengthY / 2)
        path.lineTo(row + upper.trawlBoardSiteLengthX / 2, col + upper.trawlBoardSiteLengthY / 2)
        path.lineTo(row - upper.trawlBoardSiteLengthX / 2, col + upper.trawlBoardSiteLengthY / 2)
      } else {
        path.absarc(row, col, upper.trawlBoardSiteLengthX / 2, 0, Math.PI * 2, false)
      }

      squareShape.holes.push(path)
    }
  }
}

function addMaterialMeshes(scene, options) {
  options.materials.forEach(item => {
    if (item.materialShape == 0) {
      item.geo = [item.materialLengthX, item.materialLengthZ, item.materialLengthY]
    } else if (item.materialShape == 1) {
      item.geo = [item.materialLengthX / 2, item.materialLengthY / 2, item.materialLengthZ]
    }

    item.pos = [
      item.centerPointX - options.upper.trawlBoardLengthX / 2,
      item.materialLengthZ / 2,
      item.centerPointY - options.upper.trawlBoardLengthY / 2,
    ]
  })

  options.materials.forEach(item => {
    const selected = options.materialList.some(id => id == item.id)
    let mesh = null

    if (item.materialShape == 0) {
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(...item.geo),
        new THREE.MeshLambertMaterial({ color: selected ? 0xfde308 : 0x97b2c8 }),
      )
    } else if (item.materialShape == 1) {
      mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(...item.geo),
        new THREE.MeshLambertMaterial({ color: selected ? 0xfde308 : 0x97b2c8 }),
      )
    }

    if (!mesh) {
      return
    }

    mesh.userData = { id: item.id }
    mesh.position.set(...item.pos)
    scene.add(mesh)
  })
}

export class createBoard {
  constructor(options) {
    this.options = {
      container: '#box', // 容器id
      upper: {
        trawlBoardLengthX: 800,
        trawlBoardLengthY: 400,
        trawlBoardOffsetX: 20,
        trawlBoardOffsetY: 20,
        trawlBoardSiteSpaceX: 10,
        trawlBoardSiteSpaceY: 10,
        trawlBoardSiteLengthX: 83,
        trawlBoardSiteLengthY: 83,
        trawlBoardSiteX: 8,
        trawlBoardSiteY: 4,
        trawlBoardShape: 1,
        trawlBoardThickness: 3,
      },
      materials: [],
      lower: {
        layerBoardLengthX: 800,
        layerBoardLengthY: 400,
        layerBoardThickness: 5,
      },
      L1X: 500,
      L1Y: 400,
      L1Z: -300,
      L2X: -500,
      L2Y: 400,
      L2Z: -300,
      materialList: [],
    }
    this.animation = null
    this.disposed = false
    this.domBox = null
    this.cardBox = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.renderer = null
    this.onPointerClick = null
    this.viewWidth = 0
    this.viewHeight = 0
    this.loop = this.loop.bind(this)
    this.updata(options)
  }

  loop() {
    if (this.disposed || !this.renderer || !this.scene || !this.camera) {
      this.animation = null

      return
    }

    this.animation = requestAnimationFrame(this.loop)
    this.renderer.render(this.scene, this.camera)
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

  onClick(event) {
    event.preventDefault()

    const intersects = this.getIntersects(event.layerX, event.layerY)

    if (!intersects.length) {
      return
    }

    const hit = intersects.filter(item => item && item.object)[0]

    if (!hit || !hit.object || !hit.object.userData.id) {
      return
    }

    const index = this.options.materialList.findIndex(item => item === hit.object.userData.id)

    if (index == -1) {
      this.options.materialList.push(hit.object.userData.id)
      hit.object.material.color.set('#fde308')
    } else {
      this.options.materialList.splice(index, 1)
      hit.object.material.color.set('#97b2c8')
    }

    this.onModalChange(this.options.materialList)
  }

  mount() {
    this.cardBox = document.querySelector(this.options.container)

    if (!this.cardBox) {
      throw new Error(`未找到模型容器 ${this.options.container}`)
    }

    const width = this.cardBox.clientWidth || 1
    const height = this.cardBox.clientHeight || 1

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO))
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.shadowMap.enabled = true
    this.viewWidth = width
    this.viewHeight = height

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.domBox = this.cardBox
    this.renderer.domElement.setAttribute('class', 'fadeIn')
    this.domBox.appendChild(this.renderer.domElement)

    this.onPointerClick = event => this.onClick(event)
    this.cardBox.addEventListener('click', this.onPointerClick, false)
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
  }

  clearScene() {
    const children = [...this.scene.children]

    children.forEach(child => {
      this.scene.remove(child)
      disposeObject3D(child)
    })
  }

  rebuild() {
    this.theme = localStorage.getItem('theme')
    this.clearScene()

    const upper = this.options.upper
    const axesHelper = new THREE.AxesHelper(200)

    axesHelper.position.set(-upper.trawlBoardLengthX / 2 - 10, upper.trawlBoardThickness, -upper.trawlBoardLengthY / 2 - 10)
    this.scene.add(axesHelper)

    const directional = this.theme == 'light' ? 2 : 1
    const light1 = new THREE.DirectionalLight(0xeeeeee, directional)
    const light2 = new THREE.DirectionalLight(0xeeeeee, directional)

    light1.position.set(this.options.L1X, this.options.L1Y, this.options.L1Z)
    light2.position.set(this.options.L2X, this.options.L2Y, this.options.L2Z)
    this.scene.add(light1)
    this.scene.add(light2)
    this.scene.add(new THREE.AmbientLight(0xaaaaaa, this.theme == 'light' ? 3 : 2))

    const lowerBoard = new THREE.Mesh(
      new THREE.BoxGeometry(this.options.lower.layerBoardLengthX, this.options.lower.layerBoardThickness, this.options.lower.layerBoardLengthY),
      new THREE.MeshLambertMaterial({ color: 0xccdbdd }),
    )

    lowerBoard.position.y = -this.options.lower.layerBoardThickness / 2
    this.scene.add(lowerBoard)

    const squareShape = new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(0, upper.trawlBoardLengthY)
      .lineTo(upper.trawlBoardLengthX, upper.trawlBoardLengthY)
      .lineTo(upper.trawlBoardLengthX, 0)
      .lineTo(0, 0)

    addSiteHoles(squareShape, upper)

    const board = new THREE.Mesh(
      new THREE.ExtrudeGeometry(squareShape, {
        depth: upper.trawlBoardThickness,
        bevelEnabled: false,
        curveSegments: 50,
      }),
      new THREE.MeshStandardMaterial({ color: 0xc3d6d3, roughness: 0.3 }),
    )

    board.position.set(-upper.trawlBoardLengthX / 2, upper.trawlBoardThickness, -upper.trawlBoardLengthY / 2)
    board.rotation.set(Math.PI / 2, 0, 0)
    this.scene.add(board)
    addMaterialMeshes(this.scene, this.options)

    this.camera.position.set(0, upper.trawlBoardLengthY, upper.trawlBoardLengthY)
    this.controls.target.set(0, 0, 0)
    this.controls.update()
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

    if (this.cardBox && this.onPointerClick) {
      this.cardBox.removeEventListener('click', this.onPointerClick, false)
      this.onPointerClick = null
    }

    if (this.controls) {
      this.controls.dispose()
      this.controls = null
    }

    if (this.scene) {
      this.clearScene()
      this.scene = null
    }

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
    this.options.materialList = []
    this.viewWidth = 0
    this.viewHeight = 0
  }

  getIntersects(x, y) {
    if (!this.camera || !this.scene || !this.cardBox) {
      return []
    }

    const raycaster = new THREE.Raycaster()
    const mouseVector = new THREE.Vector2()
    const width = this.cardBox.clientWidth
    const height = this.cardBox.clientHeight
    const offsetTop = this.cardBox.offsetTop
    const offsetLeft = this.cardBox.offsetLeft

    mouseVector.set(
      ((x - offsetLeft) / width) * 2 - 1,
      -((y - offsetTop) / height) * 2 + 1,
    )
    raycaster.setFromCamera(mouseVector, this.camera)

    return raycaster.intersectObjects(this.scene.children, true)
  }
}
