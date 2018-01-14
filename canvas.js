const Layer = require('./layer.js')

class Canvas {
    constructor(element, width = 500, height = 300) {
        this.element = document.createElement('div')
        this.element.style.position = 'relative'
        this.doc = element.ownerDocument
        this.layers = []
        this.width = width
        this.height = height
        element.appendChild(this.element)
    }
    addLayer(layer) {
        if (this.layers.indexOf(layer) > 0) return;
        layer.floor = this.layers.length
        this.layers.push(layer)
        this.element.appendChild(layer.element)
        layer.width = this.w
        layer.height = this.h       
        return layer
    }
    on(...args) {
        this.element.addEventListener(...args)
    }
    removeLayer(layer) {
        if (this.layers.indexOf(layer) < 0) return;
        this.layers = this.layers.slice(0, layer.floor) 
            + this.layers.slice(layer.floor).map(layer => {
                layer.floor--
                return layer 
            })
        layer.destroy()
    }
    layer(i) {
        return this.layers[i]
    }
    get width() {
        return this.w
    }
    set width(w) {
        this.w = w
        this.element.style.width = w + 'px'
        this.layers.forEach(l => l.width = w)
    }
    get height() {
        return this.h
    }
    set height(h) {
        this.h = h
        this.element.style.height = h + 'px'
        this.layers.forEach(l => l.height = h)
    }
}

module.exports = {
    Canvas,
    Layer
}
