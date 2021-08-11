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
      console.log("reader.result", this._file)
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
          console.log("reader.result", reader)
          /* reader.onload = (e) => {
            const loadingTask = pdfjsLib.getDocument(
              new Uint8Array(reader.result),
            )
            loadingTask
              .then((pdf) => {
                console.log('pdf', pdf)
              })
              .catch((err) => {
                f(rer)
              })
          }
          reader.readAsArrayBuffer(this._file) */
          break
        default:
          f()
          break
      }
    })
  }
}
