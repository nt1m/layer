const {Canvas, Layer} = require('../canvas.js')
const controls = document.getElementById('controls')
const layers = controls.querySelector('#layers')
const add = controls.querySelector('#add')
const canvas = new Canvas(document.getElementById('canvas'))
const image = document.createElement('img')
const newLayer = () => {
    const lay = canvas.addLayer(new Layer())
    lay.blob.then(blob => {
        const el = document.createElement('div')
        el.setAttribute('class', 'layer')
        el.setAttribute('floor', lay.floor)
        el.addEventListener('click', e => {
            const focused = layers.querySelector('.focused')
            if (focused) focused.classList.remove('focused')
            el.classList.add('focused')
        })
        layers.appendChild(el)
    })
    return lay
}
image.src = 'landscape.png'
image.onload = () => newLayer().drawImage(image,0,0)
add.addEventListener('click', newLayer)

global.cnv = canvas

