import { fabric } from 'fabric';
import { Howl } from 'howler';
export interface PatternBrushInterface extends fabric.BaseBrush {
  onMouseDown(pointer: fabric.Point): void;
  onMouseMove(pointer: fabric.Point, options: fabric.IEvent): void;
  onMouseUp(event: fabric.IEvent): void;
}

const PatternBrushImp = fabric.util.createClass(fabric.PatternBrush, {
  sound : null,
  delayBetweenPlays: 150,
  lastPlayTime:0,
  initialize: function (canvas: fabric.Canvas) {
     this.sound = new Howl({
      src: ['assets/sounds/paint1.wav']
    });
    this.callSuper('initialize', canvas);

  },
  getPatternSrc : function() {
    var patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternCanvas.height = 10;
    var ctx = patternCanvas.getContext('2d');
   if(ctx){
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(10, 5);
    ctx.closePath();
    ctx.stroke();
   }
    return patternCanvas;
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

const PatternBrush: {
  new (canvas: fabric.StaticCanvas): PatternBrushInterface;
} = PatternBrushImp;

(fabric as any).PatternBrush = PatternBrush;
export default PatternBrush;
