const pdfjsLib = require('pdfjs-dist')

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.7.570/build/pdf.worker.min.js'
export class DocumentPreviewController {
  constructor(file) {
    this._file = file
  }

  getPreviewData() {
    return new Promise((s, f) => {
      let reader = new FileReader()
      switch (this._file.type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/jpg':
        case 'image/gif':
          reader.onload = (e) => {
            s({
              src: reader.result,
              info: this._file.name,
            })
          }
          reader.onerror = (e) => {
            f(e)
          }
          reader.readAsDataURL(this._file)
          break
        case 'application/pdf':
          reader.onload = (e) => {
            const loadingTask = pdfjsLib.getDocument(
              new Uint8Array(reader.result),
            )
            loadingTask.promise
              .then((pdf) => {
                pdf
                  .getPage(1)
                  .then((page) => {
                    let viewport = page.getViewport(1)
                    let canvas = document.createElement('canvas')
                    let canvasContext = canvas.getContext('2d')
                    canvas.width = viewport.width
                    canvas.height = viewport.height
                    var renderTask = page.render({
                      canvasContext,
                      viewport,
                    })
                    renderTask.promise.then(function () {
                      let _s = pdf.numPages > 1 ? 's' : ''
                      s({
                        src: canvas.toDataURL('image/png'),
                        info: `${pdf.numPages} página${_s}`,
                      })
                    })
                  })
                  .catch((err) => {
                    f(err)
                  })
              })
              .catch((err) => {
                f(err)
              })
          }
          reader.readAsArrayBuffer(this._file)
          break
        default:
          f()
          break
      }
    })
  }
}
