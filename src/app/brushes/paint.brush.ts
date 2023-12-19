import { fabric } from 'fabric';
import { Howl } from 'howler';
export interface PencilBrushInterface extends fabric.BaseBrush {
  onMouseDown(pointer: fabric.Point): void;
  onMouseMove(pointer: fabric.Point, options: fabric.IEvent): void;
  onMouseUp(event: fabric.IEvent): void;
}

const PencilBrushImp = fabric.util.createClass(fabric.PencilBrush, {
  sound : null,
  delayBetweenPlays: 150,
  lastPlayTime:0,
  initialize: function (canvas: fabric.Canvas) {
     this.sound = new Howl({
      src: ['assets/sounds/paint1.wav']
    });
    this.callSuper('initialize', canvas);
  },

  onMouseDown: function (pointer: fabric.Point): void {
    const options = {
      e: pointer,
    };
    this.sound.play();
    this.callSuper('onMouseDown', pointer, options);
  },

  onMouseMove: function (pointer: fabric.Point, options: fabric.IEvent): void {
    if (!this.canvas._isMainEvent(options.e)) {
      return;
    }
    const currentTime = Date.now();
    if (currentTime - this.lastPlayTime >= this.delayBetweenPlays) {
      this.sound.play();
      this.lastPlayTime = currentTime;
    }
    this.callSuper('onMouseMove', pointer, options);
  },

  onMouseUp: function (event: fabric.IEvent): void {
    this.callSuper('onMouseUp', event);
  },
});

const PencilBrush: {
  new (canvas: fabric.StaticCanvas): PencilBrushInterface;
} = PencilBrushImp;

(fabric as any).PencilBrush = PencilBrush;
export default PencilBrush;
