export class DocumentPreviewController {
  constructor(file) {
    this._file = file
  }

  getPreviewData() {
    return new Promise((s, f) => {
      switch (this._file.type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/jpg':
        case 'image/gif':
          break

        default:
          break
      }
    })
  }
}
