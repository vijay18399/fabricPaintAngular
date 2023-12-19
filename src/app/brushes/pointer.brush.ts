import { fabric } from 'fabric';

    import {
        FabricEvent,
        FabricPointer,
        FabricPointerEvent,
    } from '../utils/fabric.utils';

export interface PointerInterface extends fabric.BaseBrush {

    onMouseDown(pointer: FabricPointer | FabricEvent, ev: FabricEvent): void;
    onMouseMove(pointer: FabricPointer | FabricEvent, ev: FabricEvent): void;
    onMouseUp(ev?: FabricEvent): void;
}

const PointerImp = <any>fabric.util.createClass(fabric.BaseBrush, {


    /**
     * Constructor
     * @param {fabric.Canvas} canvas
     * @return {Pointer} Instance of a pencil brush
     */
    initialize: function (canvas: fabric.Canvas) {
        this.canvas = canvas;
        console.log("kkk")
    },
    /**
     * Inovoked on mouse down
     * @param {Object} pointer
     * @param {Object} ev
     */
    onMouseDown: function (
        pointer: any,
        ev: FabricEvent
    ) {
        //  this.canvas.freeDrawingCursor = 'pointer';
    },
    /**
     * Inovoked on mouse move
     * @param {Object} pointer
     * @param {Object} ev
     */
    onMouseMove: function (
        pointer: FabricPointer | FabricEvent,
        ev: FabricEvent
    ) { 
        //  this.canvas.freeDrawingCursor = 'pointer';
    },
    /**
     * Invoked on mouse up
     * @param {Object} ev
     */
    onMouseUp: function (ev?: FabricEvent) {
        //  this.canvas.freeDrawingCursor = 'pointer';
     },
   
});

/**
 * Pointer class
 * @class fabric.Pointer
 * @extends fabric.BaseBrush
 */
const Pointer: {
    new(canvas: fabric.StaticCanvas): PointerInterface;
} = PointerImp;

(fabric as any).Pointer = Pointer;
export default Pointer;