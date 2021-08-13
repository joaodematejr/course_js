export class ClassEvent {
  constructor() {
    this._events = {}
  }

  on(eventname, fn) {
    if (!this._events[eventname]) this._events[eventname] = new Array()

    this._events[eventname].push(fn)
  }

  trigger() {
    let args = [...arguments]
    let eventName = args.shift()

    args.push(new Event(eventName))

    if (this._events[eventName] instanceof Array) {
      this._events[eventName].forEach((fn) => {
        fn.apply(null, args)
      })
    }
  }
}
