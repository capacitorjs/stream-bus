'use strict';

import StreamBus from 'src/stream-bus';

describe('StreamBus', function () {
  describe('emit/on', function () {
    beforeEach(function () {
      this.bus = new StreamBus();
    });

    describe('emitting to a listened-to event', function () {
      beforeEach(function () {
        this.eventStub = this.sandbox.stub();
        this.event2Stub = this.sandbox.stub();
        this.eventDisposer = this.bus.on('event', this.eventStub);
        this.event2Disposer = this.bus.on('event', this.event2Stub);
      });

      it('calls all associated callbacks with the arguments', function () {
        this.bus.emit('event', 'arg1', 'arg2');
        expect(this.eventStub).to.be.calledOnce
          .and.calledWith('arg1', 'arg2');
        expect(this.event2Stub).to.be.calledOnce
          .and.calledWith('arg1', 'arg2');

        this.bus.emit('event', 'newArg');
        expect(this.eventStub).to.be.calledTwice
          .and.calledWith('newArg');
        expect(this.event2Stub).to.be.calledTwice
          .and.calledWith('newArg');
      });

      it('stops calling a specific handler if the returned dispose is called', function () {
        this.eventDisposer();
        this.bus.emit('event', 'arg1', 'arg2');
        expect(this.eventStub).not.to.have.been.called;
        expect(this.event2Stub).to.have.been.calledOnce
          .and.calledWith('arg1', 'arg2');
      });
    });

    describe('grabbing the underlying stream', function () {
      beforeEach(function () {
        this.stream = this.bus.asStream('event');
      });

      it('provides the same stream used by emit/on', function (done) {
        this.stream.subscribe(() => done());
        this.bus.emit('event');
      });
    });
  });
});
