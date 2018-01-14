class Layer {
    constructor(doc = document) {
        this.doc = doc
        this.element = doc.createElement('canvas')
        this.element.style.position = 'absolute'
        this.context = this.element.getContext('2d')
        this._floor = null
        this.width = 500
        this.height = 300
    }
    get floor(){
        return this._floor
    }
    get buf() {
        return this.context.getImageData(0, 0, this.width, this.height).data.buffer
    }
    set buf(buf) {
        const arr = new Uint8ClampedArray(buf)
        const ID = new ImageData(arr, this.width, this.height)
        this.context.putImageData(ID, 0, 0)
    }
    set floor(f){
        this.element.setAttribute('id', 'layer'+f)
        this._floor = f
    }
    get height () {return this.element.height}
    get width () {return this.element.width}
    set height(h) {
        this.element.height = h
    }
    set width(w) {
        this.element.width = w
    }
    set opacity(o) {
        this.element.style.opacity = o
    }
    get opacity() {
        return this.element.style.opacity
    }
    on(...args) {
        this.element.addEventListener(...args)
    }
    drawImage(img, dx, dy){
        this.context.drawImage(img, dx, dy)
    }
    invert() {
        const img = new Uint8Array(this.buf)
        for (let k = 0; k < img.length; k++) if (k%4 !== 3) {
            img[k] = 255-img[k]
        }
        this.buf = img.buffer
        return this
    }
    get blob() {
        return new Promise(res => this.element.toBlob(res))
    }
    convolution(matrix) {
        const n = matrix.length
        if (n%2 === 0 || !matrix.every(line => line.length == n)) return;
        const m = (n-1)/2
        let sum = 0
        matrix.forEach(l => l.forEach(e => sum += Math.abs(e)))
        matrix = matrix.map(l => l.map(e => e / sum))
        const arr = new Uint8Array(4 * this.width * this.height)
        const img = new Uint8Array(this.buf)
        for (let i = 0; i < this.width; i++) for (let j = 0; j < this.height; j++) {
            arr[(i+this.width*j)*4 + 3] = 255
            for (let r = 0; r < 3; r++){
                let acc = 0 
                for (let p = -m; p <= m; p++) for (let q = -m; q <= m; q++)
                if (i+p < this.width, i+p > -1 &&
                    j+q < this.height, j+q > -1){
                    acc += img[(i+p+this.width*(j+q))*4 + r] * matrix[m+p][m+q]
                }
                arr[(i+this.width*j)*4 + r] = Math.floor(acc)
            }
        }
        this.buf = arr.buffer
        return this
    }
    destroy() {
        this.element.outerHTML = ''
    }
}

module.exports = Layer
