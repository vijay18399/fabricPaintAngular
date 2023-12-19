import { fabric } from 'fabric';
import { Howl } from 'howler';

export interface ImageBrushInterface extends fabric.BaseBrush {
  onMouseDown(pointer: fabric.Point): void;
  onMouseMove(pointer: fabric.Point, options: fabric.IEvent): void;
  onMouseUp(event: fabric.IEvent): void;
}

const ImageBrushImp = fabric.util.createClass(fabric.PencilBrush, {
  sound: null,
  delayBetweenPlays: 30, // Adjust this value to set the desired gap in milliseconds
  lastPlayTime: 0,

  initialize: function (canvas: fabric.Canvas) {
    this.sound = new Howl({
      src: ['assets/sounds/paint2.wav']
    });
    this.callSuper('initialize', canvas);
  },
  addImage(pointer: fabric.Point){
    fabric.Image.fromURL('assets/images/shapes/pentagon_f.png', (image) => {
      image.set({
        left: pointer.x,
        top: pointer.y,
        originX: 'center',
        originY: 'center',
      });
      this.canvas.add(image);
    });
  },
  onMouseDown: function (pointer: fabric.Point): void {
    this.addImage(pointer);
    this.sound.play();
  },

  onMouseMove: function (pointer: fabric.Point, options: fabric.IEvent): void {
    if (!this.canvas._isMainEvent(options.e)) {
      return;
    }
    const currentTime = Date.now();
    if (currentTime - this.lastPlayTime >= this.delayBetweenPlays) {
        this.addImage(pointer)
        this.sound.play();
        this.lastPlayTime = currentTime;
     }
  },

  onMouseUp: function (event: fabric.IEvent): void {
  },
});

const ImageBrush: {
  new (canvas: fabric.StaticCanvas): ImageBrushInterface;
} = ImageBrushImp;

(fabric as any).ImageBrush = ImageBrush;
export default ImageBrush;
