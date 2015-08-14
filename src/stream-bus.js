'use strict';

import Rx from 'rx';

export default class StreamBus {
  constructor() {
    this._subjects = {};
  }

  emit(event, ...payload) {
    const subject = this.asStream(event);
    subject.onNext(payload);
  }

  on(event, callback) {
    const subject = this.asStream(event);
    const listener = subject.subscribe(function (payload) {
      callback(...payload);
    });

    return listener.dispose.bind(listener);
  }

  asStream(event) {
    let subject = this._subjects[event];
    if (!subject) {
      subject = new Rx.Subject();
      this._subjects[event] = subject;
    }
    return subject;
  }
}
