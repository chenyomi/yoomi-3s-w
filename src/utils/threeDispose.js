export function disposeObject3D(object) {
  if (!object) {
    return
  }

  object.traverse(child => {
    if (child.geometry) {
      child.geometry.dispose()
    }

    const material = child.material

    if (!material) {
      return
    }

    const materials = Array.isArray(material) ? material : [material]

    materials.forEach(item => {
      if (item.map)
        item.map.dispose()

      item.dispose()
    })
  })
}
