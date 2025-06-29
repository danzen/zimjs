
// Type definitions for ZIM at https://zimjs.com
// Definitions by: Dan Zen (Dr. Abstract)
// with thanks to Yoan Herrera, Lucas Joel, Manthan224, Geoffrey Nwachukwu, Kenil Domadia, and a lost teacher
// Documentation : https://zimjs.com/docs.html

///<reference types="../createjs-lib" />
///<reference types="../easeljs" />
///<reference types="../preloadjs" />
///<reference types="../soundjs" />
///<reference types="../tweenjs" />

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// INSTRUCTIONS
// Use index.d.ts provides TypeScript typings for ZIM.
// FYI - these are created by parser
// The ZIM Typings need the CreateJS typings (bundled) as seen above.

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FIXES
// If you have any issues using the typing please contact us on GitHub
// https://github.com/danzen/zimjs/issues/26
// Or join our Forum and post in the requests channel:
// https://forum.zimjs.com

declare global {

	// CONSTANTS
	var orange: string
	var green: string
	var pink: string
	var blue: string
	var brown: string
	var yellow: string
	var purple: string
	var red: string
	var salmon: string
	var interstellar: string
	var black: string
	var darker: string
	var licorice: string
	var dark: string
	var charcoal: string
	var grey: string
	var gray: string
	var granite: string
	var tin: string
	var pewter: string
	var silver: string
	var fog: string
	var mist: string
	var light: string
    var moon: string
	var lighter: string
	var white: string
	var faint: string
	var clear: string

	var F: zim.Frame
	var S: zim.Stage
	var W: number
	var H: number

	var FIT: string
	var FILL: string
	var FULL: string
	var LEFT: string
	var RIGHT: string
	var CENTER: string
	var MIDDLE: string
	var START: string
	var END: string
	var TOP: string
	var BOTTOM: string
	var HORIZONTAL: string
	var VERTICAL: string
	var BOTH: string
	var GET: string
	var POST: string
	var LOCALSTORAGE: string
	var SOCKET: string
	var TO: string
	var FROM: string
	var UP: string
	var DOWN: string
	var NEXT: string
	var PREV: string
	var AUTO: string
	var DEFAULT: string
	var NONE: string
	var AVE: string
	var SINE: string
	var SQUARE: string
	var TRIANGLE: string
	var SAW: string
	var ZAP: string
	var TAU: number
	var DEG: number
	var RAD: number

	// ZIM WRAP - global functions
	// The wrap module contains global functions
	// These were always global and are not available in the zim namespace
	function zog(item1: any, ...item2: any): string
	function zogr(item1: any, ...item2: any): string
	function zogb(item1: any, ...item2: any): string
	function zogy(item1: any, ...item2: any): string
	function zogg(item1: any, ...item2: any): string
	function zogp(item1: any, ...item2: any): string
	function zogo(item1: any, ...item2: any): string
	function zogs(item1: any, ...item2: any): string
	function zid(id: string): HTMLElement
	function zss(id: string): CSSStyleDeclaration
	function zgo(url: string, target?: string, width?: number, height?: number, fullscreen?: boolean, modal?: boolean): void
	function zum(string: string): number
	function zot(value: any): boolean
	function zop(e: any): void
	function zil(): [Function]
	function zet(selector: string): {}
	function zob(func: Function, args: any, sig: string, scope: Function): boolean
	function zik(arg: any): any
	function zta(item: any): any
	function zor(...items: any[]): any
	function zimify(obj: createjs.DisplayObject, list?: Boolean): zim.DisplayObject
	function zimplify(exclude?: string | string[]): void

}

// END GLOBALS


declare namespace zim {

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// TYPES AND INTERFACES
	// A ZIM VEE expression can be evaluated in the receiving function with zik (pick) to delay random selection
	// See https://zimjs.com/docs.html?item=zik
	// The basic parameter type should be used first then | zimVee to get the zik options
	// Example: interval(time:number|zimVee, function:Function, etc.)
	type zimVee = {} | Function | any[]
	// So, any time we see {}|Function|[any] in the code hints (probably after a number, boolean or string) it means ZIM VEE
	// Below is the full type but it complicates the code tips too much:
	// type zimVee = {min?:number, max?:number, integer?:boolean, negative?:boolean, noZick?:[any]|Function}|Function|[any]

	type color = string | GradientColor | RadialColor | BitmapColor

	// ZIM DISPLAY OBJECTS
	// All ZIM Display Objects extend from a DisplayObject at some point through inheritance
	// There is no zim.DisplayObject but when we use the term we are referring to:
	// zim.Container, zim.Bitmap, zim.Shape, zim.Sprite and zim.MovieClip at the top level
	// and then all the objects that extend from the zim.Container:
	// such as the ZIM Shapes (Rectangle, Circle, Triangle, Squiggle, Blob)
	// and all the ZIM Components (Label, Button, CheckBox, RadioButton, etc.)
	// In many places we want the value to be typed as a DisplayObject
	// but if we hint a DisplayObject then that might mislead people to thinking it can't be a ZIM Display Object
	// so this interface will provide a more generic name to handle both CreateJS and ZIM Display Objects
	interface DisplayObject extends createjs.DisplayObject { }

	// ZIM 4TH Display members set all of the original ZIM functions as methods on the ZIM Display objects
	// ZIM also adds width, height, widthOnly, heightOnly, depth and blendMode properties to all as well as a read only type property
	// and as of ZIM Cat 03 adds effects, hue, saturation, brightness, contrast
	interface zimDisplay {
		// ZIM Display Interface
		// ZIM 4TH Methods
		movement(call: Function): this
		noMovement(): this
		tap(call: Function, distance?: number, time?: number, once?: boolean, dbl?: boolean, dblTime?: number, call2?: Function): this
		noTap(): this
		hold(call: Function, distance?: number, time?: number, once?: boolean): this
		noHold(): this
		drag(config_or_boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean, offStage?: boolean, immediateBoundary?: boolean, singleTouch?: boolean, dropTargets?: DisplayObject | [DisplayObject], dropCopy?: boolean, dropSnap?: boolean, dropBack?: boolean, dropEnd?: boolean, dropFull?: boolean, dropHitTest?: string, dropScale?: number, dropWidth?: number, dropHeight?: number): this
		drag(config: { boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean, offStage?: boolean, immediateBoundary?: boolean, singleTouch?: boolean, dropTargets?: DisplayObject | [DisplayObject], dropCopy?: boolean, dropSnap?: boolean, dropBack?: boolean, dropEnd?: boolean, dropFull?: boolean, dropHitTest?: string, dropScale?: number, dropWidth?: number, dropHeight?: number}): this
		noDrag(): this
        change(call: Function): this
		dragBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		dragRect(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		mouse(): this
		noMouse(): this
		effect(effect: createjs.Filter, x?: number, y?: number, width?: number, height?: number): this
		updateEffects(): this
		noEffect(effects?: string, cache?: boolean): this
		wire(config_or_target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wire(config: { target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWire(config_or_target: DisplayObject, prop?: string, input?: string): this
		noWire(config: { target: DisplayObject, prop?: string, input?: string }): this
		wired(config_or_source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wired(config: { source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWired(): this
		bind(config_or_id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind): this
		bind(config: { id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind }): this
		noBind(config_or_props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind): this
		noBind(config: { props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind }): this
		transform(config_or_move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container): this
		transform(config: { move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container }): this
		setSwipe(swipe?: boolean): this
		gesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		gesture(config: { move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } }): this
		noGesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean): this
		noGesture(config: { move?: boolean, scale?: boolean, rotate?: boolean }): this
		gestureBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, update?: boolean): this
		addPhysics(config_or_dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean): this
		addPhysics(config: { dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean }): this
		removePhysics(): this
		impulse(x?: number, y?: number, targetX?: number, targetY?: number): this
		force(x?: number, y?: number, targetX?: number, targetY?: number): this
		torque(amount?: number): this
		sleep(): this
		wake(): this
		follow(config_or_damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean): this
		follow(config: { damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean }): this
		control(config_or_type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean): this
		control(config: { type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean }): this
		noControl(): this
		contact(call: Function): this
		contactEnd(call: Function): this
		noContact(): this
		noContactEnd(): this
        puppet(o: DisplayObject): this
        noPuppet(): this
		hitTestPoint(x: number, y: number, boundsCheck?: boolean): boolean
		hitTestReg(other: DisplayObject): boolean
		hitTestRect(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestRectPoint(x: number, y: number, margin?: number): boolean
		hitTestCircle(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
        hitTestCirclePoint(x: number, y: number, margin?: number): boolean
		hitTestCircleRect(other: DisplayObject, margin?: number): boolean
		hitTestCircles(other: DisplayObject, margin?: number): boolean
		hitTestBounds(other: DisplayObject, margin?: number, boundsShape?: boolean): boolean
		boundsToGlobal(rect: createjs.Rectangle | { x: number, y: number, width: number, height: number }, flip?: boolean): createjs.Rectangle
		resetBounds(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number): this
		hitTestPath(other: DisplayObject, num?: number, showPoints?: boolean): boolean
		hitTestGrid(width?: number, height?: number, cols?: number, rows?: number, x?: number, y?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, local?: boolean, type?: string): any
		animate(config_or_props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean): this
		animate(config: { props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean }): this
		stopAnimate(ids?: string | [string], toEnd?: boolean): this
		pauseAnimate(state?: boolean, ids?: string | [string]): this
		wiggle(config_or_property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number): this
		wiggle(config: { property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number }): this
		copyMatrix(source: DisplayObject): this
		cur(type?: string): this
		sha(color_or_shadow?: string | createjs.Shadow, offsetX?: number, offsetY?: number, blur?: number): this
		pos(config_or_x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean): this
		pos(config: { x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean }): this
		loc(config_or_target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number): this
		loc(config: { target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number }): this
		mov(x: number, y?: number): this
		top(): this
		bot(): this
		ord(num: number): this
		dep(depth: number): this
		alp(alpha: number): this
		vis(visible: boolean): this
		ble(color: color): this
		dye(blendMode: string): this
		hov(value?: any, prop?: string): this
		rot(rotation: number): this
		siz(width: number, height?: number, only?: boolean): this
		ske(skewx: number, skewY?: number): this
		reg(regx: number | string, regY?: number | string, still?: boolean): this
		sca(scale: number, scaleY?: number): this
		scaleTo(boundObj?: DisplayObject, percentX?: number, percentY?: number, type?: string, boundsOnly?: boolean): this
		fit(left?: number, top?: number, width?: number, height?: number, inside?: boolean): {}
		outline(color?: color, size?: number): this
		addTo(config_or_container?: Container | Stage, index?: number, localToLocal?: boolean): this
		addTo(config: { container?: Container | Stage, index?: number, localToLocal?: boolean }): this
		removeFrom(container?: Container | Stage): this
		added(call: Function, interval?: number, maxTime?: number): string
		centerReg(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		centerReg(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		center(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		center(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		place(id?: string): this
		placeReg(id?: string): this
		expand(padding?: number, paddingV?: number, paddingRight?: number, paddingBottom?: number): this
		duplicate(exact?: boolean): this
		setMask(mask: DisplayObject, dynamic?: boolean): this
		toggle(state?: boolean): this
		outlineToggle(state?: boolean): this
		// animate adds these:
		endTween(callType?: string): this
		resetTween(): this
		replayTween(): this
		// ZIM 4TH Properties
		readonly type: string
		width: number
		height: number
		widthOnly: number
		heightOnly: number
		marginLeft: number
		marginRight: number
		marginTop: number
		marginBottom: number
		level: number
		depth: number
		name: string
		draggable: boolean
		effects: { string: createjs.Filter }
		hue: number
		saturation: number
		brightness: number
		contrast: number
		hueBatch: number
		saturationBatch: number
		brightnessBatch: number
		contrastBatch: number
		blendMode: string
		readonly paused: boolean
		readonly toggled: boolean
		readonly outlineToggled: boolean
		group: string
		dynamic: boolean
		dragPaused: boolean
		// animate properties 
		readonly animating: boolean
		readonly waiting: boolean
		readonly tweenState: {}
		percentSpeed: number
		rate: number
		percentComplete: number
		zimLastMouseEnabled: boolean
		// END ZIM Display Interface
	}

	interface zimShape {
		// ZIM Shape Interface
		readonly shape: Shape
		color: color
		colorRange: number
		readonly colorCommand: createjs.Graphics.Fill
		borderColor: color
		readonly borderColorCommand: createjs.Graphics.Stroke
		borderWidth: number
		readonly borderDashedCommand: any
		setColorRange(color1?: color, color2?: color): this
		cloneAll(exact?: boolean, style?: boolean, group?: string, inherit?: {}): this
		linearGradient(colors: [any], ratios: [any], x0: number, y0: number, x1: number, y1: number): this
		radialGradient(colors: [any], ratios: [any], x0: number, y0: number, radius0: number, x1: number, y1: number, radius1: number): this
		readonly veeObj: zimVee
		// END ZIM Shape Interface
	}

	interface zimComponent {
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
	}

	// export function makeGlobals(exceptions?: string[]): void
	export function scrollX(num?: number, time?: number): number
	export function scrollY(num?: number, time?: number): number

	export class Blob extends Container implements zimShape {
		constructor(config_or_color?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number, points?: number | any[] | string | Rectangle | Circle | Triangle | Flare, radius?: number, controlLength?: number, controlType?: string, lockControlType?: string, showControls?: boolean, lockControls?: boolean, handleSize?: number, allowToggle?: boolean, move?: boolean, ctrlclick?: boolean, dashed?: boolean | [number], onTop?: boolean, circleColor?: color, circleBorderColor?: color, stickColor?: color, selectColor?: color, selectPoints?: boolean, editPoints?: string | boolean, interactive?: boolean, strokeObj?: {}, style?: boolean, group?: string, inherit?: {})
		constructor(config: { color?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number, points?: number | any[] | string | Rectangle | Circle | Triangle | Flare, radius?: number, controlLength?: number, controlType?: string, lockControlType?: string, showControls?: boolean, lockControls?: boolean, handleSize?: number, allowToggle?: boolean, move?: boolean, ctrlclick?: boolean, dashed?: boolean | [number], onTop?: boolean, circleColor?: color, circleBorderColor?: color, stickColor?: color, selectColor?: color, selectPoints?: boolean, editPoints?: string | boolean, interactive?: boolean, strokeObj?: {}, style?: boolean, group?: string, inherit?: {} })
		// ZIM Shape Interface
		readonly shape: Shape
		color: color
		colorRange: number
		readonly colorCommand: createjs.Graphics.Fill
		borderColor: color
		readonly borderColorCommand: createjs.Graphics.Stroke
		borderWidth: number
		readonly borderDashedCommand: any
		setColorRange(color1?: color, color2?: color): this
		cloneAll(exact?: boolean, style?: boolean, group?: string, inherit?: {}): this
		linearGradient(colors: [any], ratios: [any], x0: number, y0: number, x1: number, y1: number): this
		radialGradient(colors: [any], ratios: [any], x0: number, y0: number, radius0: number, x1: number, y1: number, radius1: number): this
		readonly veeObj: zimVee
		// END ZIM Shape Interface
		approximateBounds(num?: number, showPoints?: boolean): this
		addPoint(percent?: number, controlType?: string): this
		addPoints(num?: number, controlType?: string, startPoint?: number, spread?: boolean, dataOnly?: boolean, points?: any[]): this
		interpolate(num?: number, startPoint?: number, spread?: boolean): any[]
		setColorRange(color1?: color, color2?: color): this
		recordData(toJSON?: boolean): { x: number, y: number, points: any[][], color: color, borderColor: color, borderWidth: number, move: boolean, toggle: boolean, controls: boolean }
		setData(data: string | { x: number, y: number, points: any[][], color: color, borderColor: color, borderWidth: number, move: boolean, toggle: boolean, controls: boolean }, fromJSON?: boolean): this
		recordPoints(popup: boolean): any[][]
		setPoints(data: any[][]): this
		changeControl(config_or_index: number, type?: string, rect1X?: number, rect1Y?: number, rect2X?: number, rect2Y?: number, circleX?: number, circleY?: number, update?: boolean): this
		changeControl(config: { index: number, type?: string, rect1X?: number, rect1Y?: number, rect2X?: number, rect2Y?: number, circleX?: number, circleY?: number, update?: boolean }): this
		transformPoints(transformType: string, amount: number, x?: number, y?: number): this
		reversePoints(points: [any]): this
		makeSquiggle(index?: number): Squiggle
        splitBlob(point1:Point, point2:Point, num?:number, clean?:boolean): [Blob]
		update(normalized?: boolean): this
		showControls(): this
		hideControls(): this
		traverse(obj: DisplayObject, start?: number, end?: number, time?: number): this
		removePoint(index: number): this
		readonly num: number
		points: number | any[] | string | Rectangle | Circle | Triangle
		pointsAdjusted: [any]
		pointObjects: [any]
		readonly segmentPoints: any[]
		readonly segmentRatios: any[]
		getPointAngle(index: number): number
		getSegmentPoint(point1: any[], point2: any[]): any[]
		getCurvePoint(ratio?: number, segmentRatios?: any[], segmentPoints?: any[], getAngle?: boolean): {}
		stickColor: color
		readonly controls: Container
		readonly sticks: Container
		readonly lastSelected: Container
		readonly lastSelectedIndex: number
		controlsVisible: boolean
		types: string[]
		lockControls: boolean
		lockControlType: boolean
		allowToggle: boolean
		move: boolean
		ctrlclick: boolean
		addPointFactor: number
		addMinDistance: number
	}
	// Window cannot be added to global namespace because duplicates JavaScript Window
	export class Window extends Container implements zimComponent {
		constructor(width?: number, height?: number, content?: string | number | {} | DisplayObject, backgroundColor?: color, borderColor?: color, borderWidth?: number, padding?: number, corner?: number | any[], swipe?: boolean, scrollBarActive?: boolean, scrollBarDrag?: boolean, scrollBarColor?: color, scrollBarAlpha?: number, scrollBarFade?: boolean, scrollBarH?: boolean, scrollBarV?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, interactive?: boolean, shadowColor?: color, shadowBlur?: number, paddingH?: number, paddingV?: number, scrollWheel?: boolean, damp?: number, titleBar?: string | Label, titleBarColor?: color, titleBarBackgroundColor?: color, titleBarHeight?: number, draggable?: boolean, boundary?: Boundary, onTop?: boolean, close?: boolean, closeColor?: color, cancelCurrentDrag?: boolean, fullSize?: boolean, fullSizeColor?: color, resizeHandle?: boolean, collapse?: boolean, collapseColor?: color, collapsed?: boolean, optimize?: boolean, resizeBoundary?: Boundary, resizeVisible?: boolean, style?: boolean, group?: string, inherit?: {})
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		add(obj: DisplayObject, index?: number, center?: number, replace?: boolean): this
		remove(obj: DisplayObject): this
		removeAll(): this
		resize(width?: number, height?: number): this
		update(): void
		background: Shape
		backgroundColor: color
		readonly content: {} | DisplayObject
		readonly contentContainer: Container
		readonly titleBar: Container
		readonly titleBarLabel: Label
		readonly titleBarBacking: Rectangle
		readonly scrollBar: { size: number, minSize: number, spacing: number, margin: number, corner: number, showTime: number, fadeTime: number }
		scrollX: number
		scrollY: number
		readonly scrollXMax: number
		readonly scrollYMax: number
	}
	// Pick seems to be flagging a duplicate - don't know what!
	export class Pick {
		constructor(choices: any)
		num(number: number): this
		loop(number: number, call: Function): any
		static choose(choice: any): any
		static rand(a?: number, b?: number, integer?: boolean, negative?: boolean): number
		static series(...array_item: any): Function
		static getMinMax(vee: zimVee): {}
		type: string
		choices: any
	}
	// END UNIQUE - end of exports not added by parser

	// PARSER - start of exports added by parser from globalsundefined// The PARSER will copy all these globals and export them in the module

	// COLORS
	export var orange: string
	export var green: string
	export var pink: string
	export var blue: string
	export var brown: string
	export var yellow: string
	export var purple: string
	export var red: string
	export var interstellar: string
	export var black: string
	export var darker: string
	export var licorice: string
	export var dark: string
	export var charcoal: string
	export var grey: string
	export var gray: string
	export var granite: string
	export var tin: string
	export var pewter: string
	export var silver: string
	export var fog: string
	export var mist: string
	export var light: string
	export var lighter: string
	export var white: string
	export var clear: string
	export var faint: string

	export var F: Frame
	export var S: Stage
	export var W: number
	export var H: number

	export var FIT: string
	export var FILL: string
	export var FULL: string
	export var LEFT: string
	export var RIGHT: string
	export var CENTER: string
	export var MIDDLE: string
	export var START: string
	export var END: string
	export var TOP: string
	export var BOTTOM: string
	export var HORIZONTAL: string
	export var VERTICAL: string
	export var BOTH: string
	export var ALL: string
	export var RADIAL: string
	export var GET: string
	export var POST: string
	export var LOCALSTORAGE: string
	export var SOCKET: string
	export var TO: string
	export var FROM: string
	export var UP: string
	export var DOWN: string
	export var NEXT: string
	export var PREV: string
	export var AUTO: string
	export var DEFAULT: string
	export var NONE: string
	export var AVE: string
	export var SINE: string
	export var SQUARE: string
	export var TRIANGLE: string
	export var SAW: string
	export var ZAP: string
	export var TAU: number
	export var DEG: number
	export var RAD: number
	export var PHI: number


	// ++++++++++++++++++++++++++++++++++++++
	// ZIM CODE
	export function chop(obj: DisplayObject, cols?: number, rows?: number, tile?: boolean, margin?: number): Tile | [Bitmap]
	export function shuffle(array: [any]): [any]
	export function pluck(array: [any], remove?: boolean): any
	export function rand(a?: number, b?: number, integer?: boolean, negative?: boolean): number
	export function seedRandom(seed?: number | string): number | string
	export function odds(percent?: number): boolean
	export function rarity(weights: {}, shuffle?: boolean, zimColors?: boolean, dynamicPayload?: boolean): [any]
	export function repeats(array: [any], total?: boolean): number
	export function loop(obj: number | {} | [any] | Dictionary, call: Function, reverse?: boolean, interval?: number, step?: number, start?: number, end?: number, immediate?: boolean, complete?: Function, completeParams?: any): any
	export function getTIME(time?: number, timeType?: string, minWarning?: number, maxWarning?: number, noWarning?: boolean): string
	export function checkTIME(time?: number, timeChar?: string, minWarning?: number, maxWarning?: number): void
	export function timeout(time: number | zimVee, call: Function): { pause: Function, clear: Function, time: number, paused: boolean, done: boolean }
	export function interval(time: number | zimVee, call: Function, total?: number, immediate?: boolean, pauseOnBlur?: boolean, timeUnit?: string, complete?: Function, completeParams?: any): { pause: Function, clear: Function, time: number, count: number, total: number, paused: boolean, pauseTimeLeft: number }
	export function copy<T>(obj: T, clone?: boolean): T
	export function arraysEqual(a: [any], b: [any], strict?: boolean): boolean
	export function arrayMinMax(arr: [any]): {}
	export function isEmpty(obj: {}): boolean
	export function isPick(obj: any): boolean
	export function isJSON(str: string): boolean
	export function parseJSON(str: string): any
	export function merge(object1: {}, object2: {}, ...objects: {}[]): {}
	export function sortObject(obj: {}, property: string, reverse?: boolean): {}
	export function decimals(num: number, places?: number, addZeros?: number, addZerosBefore?: number, includeZero?: boolean, time?: boolean): number | string
	export function countDecimals(num: number): number
	export function sign(num: number): 1 | 0 | -1
	export function constrain(num: number, min?: number, max?: number, negative?: boolean): number
	export function dist(a: {} | number, b: {} | number, c: number, d: number): number
	export function rectIntersect(a: {} | Boundary, b: {} | Boundary, margin?: number): {}
	export function boundsAroundPoints(points: [{}]): number
	export function angle(a: {} | number, b: {} | number, c: number, d: number): number
	export function asset(file: string): DisplayObject
	export class Point {
		constructor(x: number, y: number, z?: number, q?: number, r?: number, s?: number, t?: number, u?: number, v?: number, w?: number)
		x: number
		y: number
		z: number
		q: number
		r: number
		s: number
		t: number
		u: number
		v: number
		w: number
		subtract(point: Point): Point
		add(point: Point): Point
		angle(point: Point): number
		length(): number
		distance(point: Point): number
		project(angle: number, distance: number): Point
		interpolate(point: Point, ratio: number): Point
		average(point: Point): Point
	}
	export class Bezier {
		constructor(a: {}, b: {}, c: {}, d: {})
	}
	export class Boundary {
		constructor(x: number, y: number, width: number, height: number)
		x: number
		y: number
		width: number
		height: number
		contract(x: number, y?: number, width?: number, height?: number): this
	}
	export class GradientColor {
		constructor(colors: string[], ratios: number[] | number, x0: number, y0: number, x1: number, y1: number)
	}
	export class RadialColor {
		constructor(colors: string[], ratios: number[] | number, x0: number, y0: number, r0: number, x1: number, y1: number, r1: number)
	}
	export class BitmapColor {
		constructor(image: string | Bitmap, repetition?: string, matrix?: createjs.Matrix2D)
	}
	export function makeID(type?: string | [string | number], length?: number, letterCase?: string): string
	export function makeSyllable(length?: number, firstValue?: boolean): string
	export function makePrimitive(obj: any): string | number | boolean
	export function makeMath(): void
	export function series(...array_item: any): Function
	export function smoothStep(num: number, min: number, max: number): number
	export function unicodeToUTF(val: string): string
	export function capitalizeFirst(string: string): string
	export class Ajax {
		constructor(master?: string | number, couple?: boolean, lock?: string, unique?: boolean)
		get(url: string, call?: Function): void
		post(url: string, data?: string, command?: string, extra?: string, call?: Function): void
		put(url: string, data?: string, call?: Function): void
		master: string | number
		couple: boolean
		lock: string
		unique: boolean
	}
	export class Noise {
		constructor(seed?: number)
		seed: number
		simplex1D(x: number): number
		simplex2D(x: number, y: number): number
		simplex3D(x: number, y: number, z: number): number
		simplex4D(x: number, y: number, z: number, w: number): number
	}
	export class Damp {
		constructor(startValue?: number, damp?: number)
		damp: number
		lastValue: number
		convert(input: number): number
		immediate(num: number): this
	}
	export class Proportion {
		constructor(baseMin: number, baseMax: number, targetMin?: number, targetMax?: number, factor?: number, targetRound?: boolean, clamp?: boolean, clampMin?: number, clampMax?: number)
		convert(input: number): number
	}
	export class ProportionDamp {
		constructor(baseMin: number, baseMax: number, targetMin?: number, targetMax?: number, damp?: number, factor?: number, targetRound?: boolean, clamp?: boolean, clampMin?: number, clampMax?: number)
		damp: number
		convert(input: number): number
		immediate(num: number): this
		dispose(): boolean
	}
	export class Dictionary {
		constructor(unique: boolean)
		length: number
		unique: boolean
		objects: any[]
		values: any[]
		add(object: any, value: any): void
		clear(): this
		at(object: any): any
		remove(object: any): boolean
		dispose(): boolean
	}
	export class Hierarchy {
		constructor(input: [any] | {})
		processSimple(input: [any] | {}): {}
		processComplex(input: [any] | {}): [any] | {}
		getLinearList(data: [any] | {}): [any]
		getLinearIds(data: [any] | {}): [any]
		getData(id: String): any
		getNextSibling(id: string): string
		getPrevSibling(id: string): string
		getParent(id: string): {}
		insertBefore(items: [any] | {}, id: string, innerItems: [any] | {}): void
		insertAfter(items: [any] | {}, id: string, innerItems: [any] | {}): void
		replaceItem(item: [any] | {}, id: string): void
		removeItem(id: string): void
	}
	export function swapProperties(property: string, objA: any, objB: any): boolean
	export function setProps(obj: any, props: {}): void
	export function swapHTML(idA: string, idB: string): boolean
	// scrollX and scrollY are available only in zim namespace due to global conflict
	export function windowWidth(): number
	export function windowHeight(): number
	export function getQueryString(string?: string): {}
	export function urlEncode(string: string): string
	export function urlDecode(string: string): string
	export function setCookie(name: string, value: string, days?: number): boolean
	export function getCookie(name: string): string
	export function deleteCookie(name: string): boolean
	export function convertColor(color: color, toColorType?: string, alpha?: number): string
	export function colorRange(color1: string, color2?: string, ratio?: number): void
	export function lighten(color: string, ratio?: number): void
	export function darken(color: string, ratio?: number): void
	export function toColor(color: string, targetColor: string, ratio?: number): void
	export function toAlpha(color: string, ratio?: number): void
	export function toBW(hex: string): string
	export function invertColor(hex: string): string
	export function zimEase(points: [any], polynomials?: [any], reverse?: boolean, lockEnds?: boolean): Function
	export function spline(points: [any], tension?: number, close?: boolean, shape?: Shape, removeLast?: boolean): string
	export function getPointAtPercent(x1?:number, y1?:number, x2?:number, y2?:number, percent?:number): Point
    export function pointAlongCurve(points: [any], ratio?: number, getAngle?: boolean): {}
	export function distanceAlongCurve(points: [any]): number
	export function closestPointAlongCurve(point: any, segmentPoints: [any], num?: number, interpolate?: boolean, percentage?: boolean): number
	export function transformPoints(points: [any], transformType: string, amount: number, x?: number, y?: number): [any]
	export function trimEndPoints(points: [any]): [any]
	export function reversePoints(points: [any]): [any]
	export function appendPoints(original: [any], points: [any], controlType?: string): [any]
	export function prependPoints(original: [any], points: [any], controlType?: string): [any]
	export function splitPoints(points: [any], index?: number, trimEnds?: boolean): [any]
	export function outlineImage(image: DisplayObject, reverse?: boolean): [[any]]
	export function simplifyPoints(points: [any], tolerance?:number, highestQuality?:boolean, reverse?:boolean, removeLast?:boolean): [[any]]
	export function mobile(orientation?: boolean): string | boolean
	export function vee(obj?: any): boolean
	export function async(url: string, callback?: Function): void
	export function couple(json: string): void
	export function decouple(json: string): void
	export function asset(file: string, width?: number, height?: number): DisplayObject
	export function object(name: string): DisplayObject
	// not sure how to type any class... is it Function?
	export function extend(subclass: Function, superclass: Function, override?: string | string[], prefix?: string, prototype?: boolean): Function

	// ++++++++++++++++++++++++++++++++++++++
	// ZIM DISPLAY
	export class Stage extends createjs.Stage {
		constructor(canvasID: string | HTMLCanvasElement)
		loop(config_or_call: Function, reverse?: boolean, interval?: number, step?: number, start?: number, end?: number, immediate?: boolean, complete?: Function, completeParams?: any): any
		loop(config: { call: Function, reverse?: boolean, interval?: number, step?: number, start?: number, end?: number, immediate?: boolean, complete?: Function, completeParams?: any }): any
		loop(config: { call: Function, reverse?: boolean, interval?: number, step?: number, start?: number, end?: number, immediate?: boolean, complete?: Function, completeParams?: any }): any
		hitTestGrid(width?: number, height?: number, cols?: number, rows?: number, x?: number, y?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, local?: boolean, type?: string): any
		type: string
		readonly width: number
		readonly height: number
		draggable: boolean
	}

	export class StageGL extends Stage {
		constructor(canvasID: string | HTMLCanvasElement, options: { preserveBuffer: boolean, antialias: boolean, transparent: boolean, premultiply: false, autoPurge: number })
		loop(config_or_call: Function, reverse?: boolean, interval?: number, step?: number, start?: number, end?: number, immediate?: boolean, complete?: Function, completeParams?: any): any
		loop(config: { call: Function, reverse?: boolean, interval?: number, step?: number, start?: number, end?: number, immediate?: boolean, complete?: Function, completeParams?: any }): any
		loop(config: { call: Function, reverse?: boolean, interval?: number, step?: number, start?: number, end?: number, immediate?: boolean, complete?: Function, completeParams?: any }): any
		hitTestGrid(width?: number, height?: number, cols?: number, rows?: number, x?: number, y?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, local?: boolean, type?: string): any
		type: string
		readonly width: number
		readonly height: number
	}

	export class Container extends createjs.Container implements zimDisplay {
		constructor(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number, style?: boolean, group?: string, inherit?: {})
		// ZIM Display Interface
		// ZIM 4TH Methods
		movement(call: Function): this
		noMovement(): this
		tap(call: Function, distance?: number, time?: number, once?: boolean, dbl?: boolean, dblTime?: number, call2?: Function): this
		noTap(): this
		hold(call: Function, distance?: number, time?: number, once?: boolean): this
		noHold(): this
        change(call: Function): this
		drag(config_or_boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean): this
		drag(config: { boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean }): this
		noDrag(): this
		dragBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		dragRect(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		mouse(): this
		noMouse(): this
		effect(effect: createjs.Filter, x?: number, y?: number, width?: number, height?: number): this
		updateEffects(): this
		noEffect(effects?: string, cache?: boolean): this
		wire(config_or_target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wire(config: { target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWire(config_or_target: DisplayObject, prop?: string, input?: string): this
		noWire(config: { target: DisplayObject, prop?: string, input?: string }): this
		wired(config_or_source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wired(config: { source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWired(): this
		bind(config_or_id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind): this
		bind(config: { id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind }): this
		noBind(config_or_props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind): this
		noBind(config: { props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind }): this
		transform(config_or_move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container): this
		transform(config: { move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container }): this
		setSwipe(swipe?: boolean): this
		gesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		gesture(config: { move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } }): this
		noGesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean): this
		noGesture(config: { move?: boolean, scale?: boolean, rotate?: boolean }): this
		gestureBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, update?: boolean): this
		addPhysics(config_or_dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean): this
		addPhysics(config: { dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean }): this
		removePhysics(): this
		impulse(x?: number, y?: number, targetX?: number, targetY?: number): this
		force(x?: number, y?: number, targetX?: number, targetY?: number): this
		torque(amount?: number): this
		sleep(): this
		wake(): this
		follow(config_or_damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean): this
		follow(config: { damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean }): this
		control(config_or_type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean): this
		control(config: { type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean }): this
		noControl(): this
		contact(call: Function): this
		contactEnd(call: Function): this
		noContact(): this
		noContactEnd(): this
		hitTestPoint(x: number, y: number, boundsCheck?: boolean): boolean
		hitTestReg(other: DisplayObject): boolean
		hitTestRect(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircle(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircles(other: DisplayObject, margin?: number): boolean
		hitTestCircleRect(other: DisplayObject, margin?: number): boolean
		hitTestBounds(other: DisplayObject, margin?: number, boundsShape?: boolean): boolean
		boundsToGlobal(rect: createjs.Rectangle | { x: number, y: number, width: number, height: number }, flip?: boolean): createjs.Rectangle
		resetBounds(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number): this
		hitTestPath(other: DisplayObject, num?: number, showPoints?: boolean): boolean
		hitTestGrid(width?: number, height?: number, cols?: number, rows?: number, x?: number, y?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, local?: boolean, type?: string): any
		animate(config_or_props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean): this
		animate(config: { props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean }): this
		stopAnimate(ids?: string | [string], toEnd?: boolean): this
		pauseAnimate(state?: boolean, ids?: string | [string]): this
		wiggle(config_or_property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number): this
		wiggle(config: { property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number }): this
		copyMatrix(source: DisplayObject): this
		cur(type?: string): this
		sha(color_or_shadow?: string | createjs.Shadow, offsetX?: number, offsetY?: number, blur?: number): this
		pos(config_or_x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean): this
		pos(config: { x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean }): this
		loc(config_or_target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number): this
		loc(config: { target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number }): this
		mov(x: number, y?: number): this
		top(): this
		bot(): this
		ord(num: number): this
		dep(depth: number): this
		alp(alpha: number): this
		vis(visible: boolean): this
		ble(color: color): this
		dye(blendMode: string): this
		hov(value?: any, prop?: string): this
		rot(rotation: number): this
		siz(width: number, height?: number, only?: boolean): this
		ske(skewx: number, skewY?: number): this
		reg(regx: number | string, regY?: number | string, still?: boolean): this
		sca(scale: number, scaleY?: number): this
		scaleTo(boundObj?: DisplayObject, percentX?: number, percentY?: number, type?: string, boundsOnly?: boolean): this
		fit(left?: number, top?: number, width?: number, height?: number, inside?: boolean): {}
		outline(color?: color, size?: number): this
		addTo(config_or_container?: Container | Stage, index?: number, localToLocal?: boolean): this
		addTo(config: { container?: Container | Stage, index?: number, localToLocal?: boolean }): this
		removeFrom(container?: Container | Stage): this
		added(call: Function, interval?: number, maxTime?: number): string
		centerReg(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		centerReg(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		center(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		center(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		place(id?: string): this
		placeReg(id?: string): this
		expand(padding?: number, paddingV?: number, paddingRight?: number, paddingBottom?: number): this
		duplicate(exact?: boolean): this
		setMask(mask: DisplayObject, dynamic?: boolean): this
		toggle(state?: boolean): this
		outlineToggle(state?: boolean): this
		// animate adds these:
		endTween(callType?: string): this
		resetTween(): this
		replayTween(): this
		// ZIM 4TH Properties
		readonly type: string
		width: number
		height: number
		widthOnly: number
		heightOnly: number
		marginLeft: number
		marginRight: number
		marginTop: number
		marginBottom: number
		level: number
		depth: number
		name: string
		draggable: boolean
		effects: { string: createjs.Filter }
		hue: number
		saturation: number
		brightness: number
		contrast: number
		hueBatch: number
		saturationBatch: number
		brightnessBatch: number
		contrastBatch: number
		blendMode: string
		readonly paused: boolean
		readonly toggled: boolean
		readonly outlineToggled: boolean
		group: string
		dynamic: boolean
		dragPaused: boolean
		// animate properties 
		readonly animating: boolean
		readonly waiting: boolean
		readonly tweenState: {}
		percentSpeed: number
		rate: number
		percentComplete: number
		zimLastMouseEnabled: boolean
		// END ZIM Display Interface
		loop(config_or_call: Function, reverse?: boolean, interval?: number, step?: number, start?: number, end?: number, immediate?: boolean, complete?: Function, completeParams?: any): any
		loop(config: { call: Function, reverse?: boolean, interval?: number, step?: number, start?: number, end?: number, immediate?: boolean, complete?: Function, completeParams?: any }): any
		cache(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number, scale?: number, options?: {}, margin?: number): this
		setBounds(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number): this
		hasProp(prop: string): boolean
		dispose(): boolean
	}

	export class Sprite extends createjs.Sprite implements zimDisplay {
		constructor(config_or_image?: Bitmap, cols?: number, rows?: number, count?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, width?: number, height?: number, animations?: {}, json?: string | {}, id?: string | number, globalControl?: boolean, spriteSheet?: createjs.SpriteSheet, frame?: Frame, style?: boolean, group?: string, inherit?: {})
		constructor(config: { image?: Bitmap, cols?: number, rows?: number, count?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, width?: number, height?: number, animations?: {}, json?: string | {}, id?: string | number, globalControl?: boolean, spriteSheet?: createjs.SpriteSheet, frame?: Frame, style?: boolean, group?: string, inherit?: {} })
		// ZIM Display Interface
		// ZIM 4TH Methods
		movement(call: Function): this
		noMovement(): this
		tap(call: Function, distance?: number, time?: number, once?: boolean, dbl?: boolean, dblTime?: number, call2?: Function): this
		noTap(): this
		hold(call: Function, distance?: number, time?: number, once?: boolean): this
		noHold(): this
		drag(config_or_boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean): this
		drag(config: { boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean }): this
		noDrag(): this
        change(call: Function): this
		dragBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		dragRect(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		mouse(): this
		noMouse(): this
		effect(effect: createjs.Filter, x?: number, y?: number, width?: number, height?: number): this
		updateEffects(): this
		noEffect(effects?: string, cache?: boolean): this
		wire(config_or_target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wire(config: { target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWire(config_or_target: DisplayObject, prop?: string, input?: string): this
		noWire(config: { target: DisplayObject, prop?: string, input?: string }): this
		wired(config_or_source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wired(config: { source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWired(): this
		bind(config_or_id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind): this
		bind(config: { id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind }): this
		noBind(config_or_props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind): this
		noBind(config: { props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind }): this
		transform(config_or_move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container): this
		transform(config: { move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container }): this
		setSwipe(swipe?: boolean): this
		gesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		gesture(config: { move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } }): this
		noGesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean): this
		noGesture(config: { move?: boolean, scale?: boolean, rotate?: boolean }): this
		gestureBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, update?: boolean): this
		addPhysics(config_or_dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean): this
		addPhysics(config: { dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean }): this
		removePhysics(): this
		impulse(x?: number, y?: number, targetX?: number, targetY?: number): this
		force(x?: number, y?: number, targetX?: number, targetY?: number): this
		torque(amount?: number): this
		sleep(): this
		wake(): this
		follow(config_or_damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean): this
		follow(config: { damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean }): this
		control(config_or_type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean): this
		control(config: { type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean }): this
		noControl(): this
		contact(call: Function): this
		contactEnd(call: Function): this
		noContact(): this
		noContactEnd(): this
		hitTestPoint(x: number, y: number, boundsCheck?: boolean): boolean
		hitTestReg(other: DisplayObject): boolean
		hitTestRect(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircle(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircles(other: DisplayObject, margin?: number): boolean
		hitTestCircleRect(other: DisplayObject, margin?: number): boolean
		hitTestBounds(other: DisplayObject, margin?: number, boundsShape?: boolean): boolean
		boundsToGlobal(rect: createjs.Rectangle | { x: number, y: number, width: number, height: number }, flip?: boolean): createjs.Rectangle
		resetBounds(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number): this
		hitTestPath(other: DisplayObject, num?: number, showPoints?: boolean): boolean
		hitTestGrid(width?: number, height?: number, cols?: number, rows?: number, x?: number, y?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, local?: boolean, type?: string): any
		animate(config_or_props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean): this
		animate(config: { props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean }): this
		stopAnimate(ids?: string | [string], toEnd?: boolean): this
		pauseAnimate(state?: boolean, ids?: string | [string]): this
		wiggle(config_or_property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number): this
		wiggle(config: { property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number }): this
		copyMatrix(source: DisplayObject): this
		cur(type?: string): this
		sha(color_or_shadow?: string | createjs.Shadow, offsetX?: number, offsetY?: number, blur?: number): this
		pos(config_or_x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean): this
		pos(config: { x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean }): this
		loc(config_or_target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number): this
		loc(config: { target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number }): this
		mov(x: number, y?: number): this
		top(): this
		bot(): this
		ord(num: number): this
		dep(depth: number): this
		alp(alpha: number): this
		vis(visible: boolean): this
		ble(color: color): this
		dye(blendMode: string): this
		hov(value?: any, prop?: string): this
		rot(rotation: number): this
		siz(width: number, height?: number, only?: boolean): this
		ske(skewx: number, skewY?: number): this
		reg(regx: number | string, regY?: number | string, still?: boolean): this
		sca(scale: number, scaleY?: number): this
		scaleTo(boundObj?: DisplayObject, percentX?: number, percentY?: number, type?: string, boundsOnly?: boolean): this
		fit(left?: number, top?: number, width?: number, height?: number, inside?: boolean): {}
		outline(color?: color, size?: number): this
		addTo(config_or_container?: Container | Stage, index?: number, localToLocal?: boolean): this
		addTo(config: { container?: Container | Stage, index?: number, localToLocal?: boolean }): this
		removeFrom(container?: Container | Stage): this
		added(call: Function, interval?: number, maxTime?: number): string
		centerReg(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		centerReg(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		center(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		center(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		place(id?: string): this
		placeReg(id?: string): this
		expand(padding?: number, paddingV?: number, paddingRight?: number, paddingBottom?: number): this
		duplicate(exact?: boolean): this
		setMask(mask: DisplayObject, dynamic?: boolean): this
		toggle(state?: boolean): this
		outlineToggle(state?: boolean): this
		// animate adds these:
		endTween(callType?: string): this
		resetTween(): this
		replayTween(): this
		// ZIM 4TH Properties
		readonly type: string
		width: number
		height: number
		widthOnly: number
		heightOnly: number
		marginLeft: number
		marginRight: number
		marginTop: number
		marginBottom: number
		level: number
		depth: number
		name: string
		draggable: boolean
		effects: { string: createjs.Filter }
		hue: number
		saturation: number
		brightness: number
		contrast: number
		hueBatch: number
		saturationBatch: number
		brightnessBatch: number
		contrastBatch: number
		blendMode: string
		readonly paused: boolean
		readonly toggled: boolean
		readonly outlineToggled: boolean
		group: string
		dynamic: boolean
		dragPaused: boolean
		// animate properties 
		readonly animating: boolean
		readonly waiting: boolean
		readonly tweenState: {}
		percentSpeed: number
		rate: number
		percentComplete: number
		zimLastMouseEnabled: boolean
		// END ZIM Display Interface
		run(time?: number, label?: string, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, startFrame?: number, frame?: number, end?: number, tweek?: number, id?: string, globalControl?: boolean): this
		pauseRun(state?: boolean): this
		stopRun(): this
		hasProp(prop: string): boolean
		dispose(): boolean
		id: any // string for Sprite and number for createjs.Sprite
		frame: number
		normalizedFrame: number
		normalizedFrames: [any]
		totalFrames: number
		animations: {}
		running: boolean
		runPaused: boolean
	}

	export class Shape extends createjs.Shape implements zimDisplay {
		constructor(config_or_width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number, graphics?: createjs.Graphics, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number, graphics?: createjs.Graphics, style?: boolean, group?: string, inherit?: {} })
		
        // ZIM Display Interface
		// ZIM 4TH Methods
		movement(call: Function): this
		noMovement(): this
		tap(call: Function, distance?: number, time?: number, once?: boolean, dbl?: boolean, dblTime?: number, call2?: Function): this
		noTap(): this
		hold(call: Function, distance?: number, time?: number, once?: boolean): this
		noHold(): this
		drag(config_or_boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean): this
		drag(config: { boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean }): this
		noDrag(): this
        change(call: Function): this
		dragBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		dragRect(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		mouse(): this
		noMouse(): this
		effect(effect: createjs.Filter, x?: number, y?: number, width?: number, height?: number): this
		updateEffects(): this
		noEffect(effects?: string, cache?: boolean): this
		wire(config_or_target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wire(config: { target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWire(config_or_target: DisplayObject, prop?: string, input?: string): this
		noWire(config: { target: DisplayObject, prop?: string, input?: string }): this
		wired(config_or_source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wired(config: { source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWired(): this
		bind(config_or_id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind): this
		bind(config: { id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind }): this
		noBind(config_or_props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind): this
		noBind(config: { props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind }): this
		transform(config_or_move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container): this
		transform(config: { move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container }): this
		setSwipe(swipe?: boolean): this
		gesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		gesture(config: { move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } }): this
		noGesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean): this
		noGesture(config: { move?: boolean, scale?: boolean, rotate?: boolean }): this
		gestureBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, update?: boolean): this
		addPhysics(config_or_dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean): this
		addPhysics(config: { dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean }): this
		removePhysics(): this
		impulse(x?: number, y?: number, targetX?: number, targetY?: number): this
		force(x?: number, y?: number, targetX?: number, targetY?: number): this
		torque(amount?: number): this
		sleep(): this
		wake(): this
		follow(config_or_damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean): this
		follow(config: { damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean }): this
		control(config_or_type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean): this
		control(config: { type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean }): this
		noControl(): this
		contact(call: Function): this
		contactEnd(call: Function): this
		noContact(): this
		noContactEnd(): this
		hitTestPoint(x: number, y: number, boundsCheck?: boolean): boolean
		hitTestReg(other: DisplayObject): boolean
		hitTestRect(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircle(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircles(other: DisplayObject, margin?: number): boolean
		hitTestCircleRect(other: DisplayObject, margin?: number): boolean
		hitTestBounds(other: DisplayObject, margin?: number, boundsShape?: boolean): boolean
		boundsToGlobal(rect: createjs.Rectangle | { x: number, y: number, width: number, height: number }, flip?: boolean): createjs.Rectangle
		resetBounds(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number): this
		hitTestPath(other: DisplayObject, num?: number, showPoints?: boolean): boolean
		hitTestGrid(width?: number, height?: number, cols?: number, rows?: number, x?: number, y?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, local?: boolean, type?: string): any
		animate(config_or_props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean): this
		animate(config: { props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean }): this
		stopAnimate(ids?: string | [string], toEnd?: boolean): this
		pauseAnimate(state?: boolean, ids?: string | [string]): this
		wiggle(config_or_property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number): this
		wiggle(config: { property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number }): this
		copyMatrix(source: DisplayObject): this
		cur(type?: string): this
		sha(color_or_shadow?: string | createjs.Shadow, offsetX?: number, offsetY?: number, blur?: number): this
		pos(config_or_x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean): this
		pos(config: { x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean }): this
		loc(config_or_target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number): this
		loc(config: { target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number }): this
		mov(x: number, y?: number): this
		top(): this
		bot(): this
		ord(num: number): this
		dep(depth: number): this
		alp(alpha: number): this
		vis(visible: boolean): this
		ble(color: color): this
		dye(blendMode: string): this
		hov(value?: any, prop?: string): this
		rot(rotation: number): this
		siz(width: number, height?: number, only?: boolean): this
		ske(skewx: number, skewY?: number): this
		reg(regx: number | string, regY?: number | string, still?: boolean): this
		sca(scale: number, scaleY?: number): this
		scaleTo(boundObj?: DisplayObject, percentX?: number, percentY?: number, type?: string, boundsOnly?: boolean): this
		fit(left?: number, top?: number, width?: number, height?: number, inside?: boolean): {}
		outline(color?: color, size?: number): this
		addTo(config_or_container?: Container | Stage, index?: number, localToLocal?: boolean): this
		addTo(config: { container?: Container | Stage, index?: number, localToLocal?: boolean }): this
		removeFrom(container?: Container | Stage): this
		added(call: Function, interval?: number, maxTime?: number): string
		centerReg(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		centerReg(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		center(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		center(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		place(id?: string): this
		placeReg(id?: string): this
		expand(padding?: number, paddingV?: number, paddingRight?: number, paddingBottom?: number): this
		duplicate(exact?: boolean): this
		setMask(mask: DisplayObject, dynamic?: boolean): this
		toggle(state?: boolean): this
		outlineToggle(state?: boolean): this
		// animate adds these:
		endTween(callType?: string): this
		resetTween(): this
		replayTween(): this
		// ZIM 4TH Properties
		readonly type: string
		width: number
		height: number
		widthOnly: number
		heightOnly: number
		marginLeft: number
		marginRight: number
		marginTop: number
		marginBottom: number
		level: number
		depth: number
		name: string
		draggable: boolean
		effects: { string: createjs.Filter }
		hue: number
		saturation: number
		brightness: number
		contrast: number
		hueBatch: number
		saturationBatch: number
		brightnessBatch: number
		contrastBatch: number
		blendMode: string
		readonly paused: boolean
		readonly toggled: boolean
		readonly outlineToggled: boolean
		group: string
		dynamic: boolean
		dragPaused: boolean
		// animate properties 
		readonly animating: boolean
		readonly waiting: boolean
		readonly tweenState: {}
		percentSpeed: number
		rate: number
		percentComplete: number
		zimLastMouseEnabled: boolean
		// END ZIM Display Interface
		cache(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number, scale?: number, options?: {}, margin?: number): this
		hasProp(prop: string): boolean
		mt(...args: any[]): this
		lt(...args: any[]): this
		a(...args: any[]): this
		at(...args: any[]): this
		bt(...args: any[]): this
		qt(...args: any[]): this
		r(...args: any[]): this
		cp(...args: any[]): this
		c(...args: any[]): this
		f(...args: any[]): this
		lf(...args: any[]): this
		rf(...args: any[]): this
		bf(...args: any[]): this
		ef(...args: any[]): this
		ss(...args: any[]): this
		sd(...args: any[]): this
		s(...args: any[]): this
		ls(...args: any[]): this
		rs(...args: any[]): this
		bs(...args: any[]): this
		es(...args: any[]): this
		dr(...args: any[]): this
		rr(...args: any[]): this
		rc(...args: any[]): this
		dc(...args: any[]): this
		de(...args: any[]): this
		dp(...args: any[]): this
		p(...args: any[]): this
	}

	export class Bitmap extends createjs.Bitmap implements zimDisplay {
		constructor(config_or_image?: HTMLImageElement | DisplayObject, width?: number, height?: number, left?: number, top?: number, id?: string, style?: boolean, group?: string, inherit?: {})
		constructor(config: { image?: HTMLImageElement | DisplayObject, width?: number, height?: number, left?: number, top?: number, id?: string, style?: boolean, group?: string, inherit?: {} })
        // ZIM Display Interface
		// ZIM 4TH Methods
		movement(call: Function): this
		noMovement(): this
		tap(call: Function, distance?: number, time?: number, once?: boolean, dbl?: boolean, dblTime?: number, call2?: Function): this
		noTap(): this
		hold(call: Function, distance?: number, time?: number, once?: boolean): this
		noHold(): this
		drag(config_or_boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean): this
		drag(config: { boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean }): this
		noDrag(): this
        change(call: Function): this
		dragBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		dragRect(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		mouse(): this
		noMouse(): this
		effect(effect: createjs.Filter, x?: number, y?: number, width?: number, height?: number): this
		updateEffects(): this
		noEffect(effects?: string, cache?: boolean): this
		wire(config_or_target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wire(config: { target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWire(config_or_target: DisplayObject, prop?: string, input?: string): this
		noWire(config: { target: DisplayObject, prop?: string, input?: string }): this
		wired(config_or_source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wired(config: { source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWired(): this
		bind(config_or_id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind): this
		bind(config: { id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind }): this
		noBind(config_or_props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind): this
		noBind(config: { props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind }): this
		transform(config_or_move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container): this
		transform(config: { move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container }): this
		setSwipe(swipe?: boolean): this
		gesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		gesture(config: { move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } }): this
		noGesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean): this
		noGesture(config: { move?: boolean, scale?: boolean, rotate?: boolean }): this
		gestureBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, update?: boolean): this
		addPhysics(config_or_dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean): this
		addPhysics(config: { dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean }): this
		removePhysics(): this
		impulse(x?: number, y?: number, targetX?: number, targetY?: number): this
		force(x?: number, y?: number, targetX?: number, targetY?: number): this
		torque(amount?: number): this
		sleep(): this
		wake(): this
		follow(config_or_damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean): this
		follow(config: { damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean }): this
		control(config_or_type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean): this
		control(config: { type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean }): this
		noControl(): this
		contact(call: Function): this
		contactEnd(call: Function): this
		noContact(): this
		noContactEnd(): this
		hitTestPoint(x: number, y: number, boundsCheck?: boolean): boolean
		hitTestReg(other: DisplayObject): boolean
		hitTestRect(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircle(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircles(other: DisplayObject, margin?: number): boolean
		hitTestCircleRect(other: DisplayObject, margin?: number): boolean
		hitTestBounds(other: DisplayObject, margin?: number, boundsShape?: boolean): boolean
		boundsToGlobal(rect: createjs.Rectangle | { x: number, y: number, width: number, height: number }, flip?: boolean): createjs.Rectangle
		resetBounds(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number): this
		hitTestPath(other: DisplayObject, num?: number, showPoints?: boolean): boolean
		hitTestGrid(width?: number, height?: number, cols?: number, rows?: number, x?: number, y?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, local?: boolean, type?: string): any
		animate(config_or_props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean): this
		animate(config: { props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean }): this
		stopAnimate(ids?: string | [string], toEnd?: boolean): this
		pauseAnimate(state?: boolean, ids?: string | [string]): this
		wiggle(config_or_property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number): this
		wiggle(config: { property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number }): this
		copyMatrix(source: DisplayObject): this
		cur(type?: string): this
		sha(color_or_shadow?: string | createjs.Shadow, offsetX?: number, offsetY?: number, blur?: number): this
		pos(config_or_x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean): this
		pos(config: { x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean }): this
		loc(config_or_target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number): this
		loc(config: { target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number }): this
		mov(x: number, y?: number): this
		top(): this
		bot(): this
		ord(num: number): this
		dep(depth: number): this
		alp(alpha: number): this
		vis(visible: boolean): this
		ble(color: color): this
		dye(blendMode: string): this
		hov(value?: any, prop?: string): this
		rot(rotation: number): this
		siz(width: number, height?: number, only?: boolean): this
		ske(skewx: number, skewY?: number): this
		reg(regx: number | string, regY?: number | string, still?: boolean): this
		sca(scale: number, scaleY?: number): this
		scaleTo(boundObj?: DisplayObject, percentX?: number, percentY?: number, type?: string, boundsOnly?: boolean): this
		fit(left?: number, top?: number, width?: number, height?: number, inside?: boolean): {}
		outline(color?: color, size?: number): this
		addTo(config_or_container?: Container | Stage, index?: number, localToLocal?: boolean): this
		addTo(config: { container?: Container | Stage, index?: number, localToLocal?: boolean }): this
		removeFrom(container?: Container | Stage): this
		added(call: Function, interval?: number, maxTime?: number): string
		centerReg(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		centerReg(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		center(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		center(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		place(id?: string): this
		placeReg(id?: string): this
		expand(padding?: number, paddingV?: number, paddingRight?: number, paddingBottom?: number): this
		duplicate(exact?: boolean): this
		setMask(mask: DisplayObject, dynamic?: boolean): this
		toggle(state?: boolean): this
		outlineToggle(state?: boolean): this
		// animate adds these:
		endTween(callType?: string): this
		resetTween(): this
		replayTween(): this
		// ZIM 4TH Properties
		readonly type: string
		width: number
		height: number
		widthOnly: number
		heightOnly: number
        cacheScale: number
		marginLeft: number
		marginRight: number
		marginTop: number
		marginBottom: number
		level: number
		depth: number
		name: string
		draggable: boolean
		effects: { string: createjs.Filter }
		hue: number
		saturation: number
		brightness: number
		contrast: number
		hueBatch: number
		saturationBatch: number
		brightnessBatch: number
		contrastBatch: number
		blendMode: string
		readonly paused: boolean
		readonly toggled: boolean
		readonly outlineToggled: boolean
		group: string
		dynamic: boolean
		dragPaused: boolean
		// animate properties 
		readonly animating: boolean
		readonly waiting: boolean
		readonly tweenState: {}
		percentSpeed: number
		rate: number
		percentComplete: number
		zimLastMouseEnabled: boolean
		// END ZIM Display Interface
		// clone():this
		hasProp(prop: string): boolean
		dispose(): boolean
		cache(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number, scale?: number, options?: {}): this
		keyOut(color?: string, tolerance?: number, replacement?: color): this
		getColorAt(x: number, y: number, array?: boolean): string | [number]
		drawImageData(x?: number, y?: number, sourceX?: number, srcY?: number, srcWidth?: number, srcHeight?: number): void
        addBitmapData(): Bitmap
		static fromData(data: any, callback: Function): void
		imageData: { data: [number] }
		svg: SVGElement
	}

    export class SlicedBitmap extends zim.Bitmap implements zimDisplay {
		constructor(config_or_width?: number, height?: number, obj?: HTMLImageElement | DisplayObject, slices?:[[]], types?:[[]], gap?: number, scale?: number, style?: boolean, group?: string, inherit?: {})
        constructor(config: { width?: number, height?: number, obj?: HTMLImageElement | DisplayObject, slices?:[[]], types?:[[]], gap?: number, scale?: number, style?: boolean, group?: string, inherit?: {} })
        slicesSca(): this
        slices: [[]]
        types: [[]]
        gap: number
        slicesWidth: number
        slicesHeight: number
        slicesSale: number
        slicesScaleX: number
        slicesScaleY: number
        exchange: [[[]]]
        sH0: number
        sV0: number
        tH0: number
        tV0: number
        sH1: number
        sV1: number
        tH1: number
        tV1: number
        sH2: number
        sV2: number
        tH2: number
        tV3: number
        sH3: number
        sV3: number
        tH4: number
        tV4: number
        sH4: number
        sV5: number
        tH5: number
        tV5: number
        sH6: number
        sV6: number
        tH6: number
        tV6: number
        sH7: number
        sV7: number
        tH7: number
        tV7: number
        sH8: number
        sV8: number
        tH8: number
        tV8: number
        sH9: number
        sV9: number
        tH9: number
        tV9: number
    }

	export class MovieClip extends createjs.MovieClip implements zimDisplay {
		constructor(mode?: string, startPosition?: number, loop?: boolean, labels?: {}, style?: boolean, group?: string, inherit?: {})
		// ZIM Display Interface
		// ZIM 4TH Methods
		movement(call: Function): this
		noMovement(): this
		tap(call: Function, distance?: number, time?: number, once?: boolean, dbl?: boolean, dblTime?: number, call2?: Function): this
		noTap(): this
		hold(call: Function, distance?: number, time?: number, once?: boolean): this
		noHold(): this
		drag(config_or_boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean): this
		drag(config: { boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean }): this
		noDrag(): this
        change(call: Function): this
		dragBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		dragRect(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		mouse(): this
		noMouse(): this
		effect(effect: createjs.Filter, x?: number, y?: number, width?: number, height?: number): this
		updateEffects(): this
		noEffect(effects?: string, cache?: boolean): this
		wire(config_or_target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wire(config: { target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWire(config_or_target: DisplayObject, prop?: string, input?: string): this
		noWire(config: { target: DisplayObject, prop?: string, input?: string }): this
		wired(config_or_source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wired(config: { source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWired(): this
		bind(config_or_id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind): this
		bind(config: { id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind }): this
		noBind(config_or_props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind): this
		noBind(config: { props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind }): this
		transform(config_or_move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container): this
		transform(config: { move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container }): this
		setSwipe(swipe?: boolean): this
		gesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		gesture(config: { move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } }): this
		noGesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean): this
		noGesture(config: { move?: boolean, scale?: boolean, rotate?: boolean }): this
		gestureBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, update?: boolean): this
		addPhysics(config_or_dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean): this
		addPhysics(config: { dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean }): this
		removePhysics(): this
		impulse(x?: number, y?: number, targetX?: number, targetY?: number): this
		force(x?: number, y?: number, targetX?: number, targetY?: number): this
		torque(amount?: number): this
		sleep(): this
		wake(): this
		follow(config_or_damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean): this
		follow(config: { damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean }): this
		control(config_or_type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean): this
		control(config: { type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean }): this
		noControl(): this
		contact(call: Function): this
		contactEnd(call: Function): this
		noContact(): this
		noContactEnd(): this
		hitTestPoint(x: number, y: number, boundsCheck?: boolean): boolean
		hitTestReg(other: DisplayObject): boolean
		hitTestRect(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircle(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircles(other: DisplayObject, margin?: number): boolean
		hitTestCircleRect(other: DisplayObject, margin?: number): boolean
		hitTestBounds(other: DisplayObject, margin?: number, boundsShape?: boolean): boolean
		boundsToGlobal(rect: createjs.Rectangle | { x: number, y: number, width: number, height: number }, flip?: boolean): createjs.Rectangle
		resetBounds(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number): this
		hitTestPath(other: DisplayObject, num?: number, showPoints?: boolean): boolean
		hitTestGrid(width?: number, height?: number, cols?: number, rows?: number, x?: number, y?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, local?: boolean, type?: string): any
		animate(config_or_props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean): this
		animate(config: { props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean }): this
		stopAnimate(ids?: string | [string], toEnd?: boolean): this
		pauseAnimate(state?: boolean, ids?: string | [string]): this
		wiggle(config_or_property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number): this
		wiggle(config: { property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number }): this
		copyMatrix(source: DisplayObject): this
		cur(type?: string): this
		sha(color_or_shadow?: string | createjs.Shadow, offsetX?: number, offsetY?: number, blur?: number): this
		pos(config_or_x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean): this
		pos(config: { x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean }): this
		loc(config_or_target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number): this
		loc(config: { target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number }): this
		mov(x: number, y?: number): this
		top(): this
		bot(): this
		ord(num: number): this
		dep(depth: number): this
		alp(alpha: number): this
		vis(visible: boolean): this
		ble(color: color): this
		dye(blendMode: string): this
		hov(value?: any, prop?: string): this
		rot(rotation: number): this
		siz(width: number, height?: number, only?: boolean): this
		ske(skewx: number, skewY?: number): this
		reg(regx: number | string, regY?: number | string, still?: boolean): this
		sca(scale: number, scaleY?: number): this
		scaleTo(boundObj?: DisplayObject, percentX?: number, percentY?: number, type?: string, boundsOnly?: boolean): this
		fit(left?: number, top?: number, width?: number, height?: number, inside?: boolean): {}
		outline(color?: color, size?: number): this
		addTo(config_or_container?: Container | Stage, index?: number, localToLocal?: boolean): this
		addTo(config: { container?: Container | Stage, index?: number, localToLocal?: boolean }): this
		removeFrom(container?: Container | Stage): this
		added(call: Function, interval?: number, maxTime?: number): string
		centerReg(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		centerReg(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		center(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		center(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		place(id?: string): this
		placeReg(id?: string): this
		expand(padding?: number, paddingV?: number, paddingRight?: number, paddingBottom?: number): this
		duplicate(exact?: boolean): this
		setMask(mask: DisplayObject, dynamic?: boolean): this
		toggle(state?: boolean): this
		outlineToggle(state?: boolean): this
		// animate adds these:
		endTween(callType?: string): this
		resetTween(): this
		replayTween(): this
		// ZIM 4TH Properties
		readonly type: string
		width: number
		height: number
		widthOnly: number
		heightOnly: number
		marginLeft: number
		marginRight: number
		marginTop: number
		marginBottom: number
		level: number
		depth: number
		name: string
		draggable: boolean
		effects: { string: createjs.Filter }
		hue: number
		saturation: number
		brightness: number
		contrast: number
		hueBatch: number
		saturationBatch: number
		brightnessBatch: number
		contrastBatch: number
		blendMode: string
		readonly paused: boolean
		readonly toggled: boolean
		readonly outlineToggled: boolean
		group: string
		dynamic: boolean
		dragPaused: boolean
		// animate properties 
		readonly animating: boolean
		readonly waiting: boolean
		readonly tweenState: {}
		percentSpeed: number
		rate: number
		percentComplete: number
		zimLastMouseEnabled: boolean
		// END ZIM Display Interface
		hasProp(prop: string): boolean
		dispose(): boolean
	}

	export class SVGContainer extends Container implements zimDisplay {
		constructor(config_or_svg?: any, splitTypes?: boolean, geometric?: boolean, showControls?: boolean, interactive?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { svg?: any, splitTypes?: boolean, geometric?: boolean, showControls?: boolean, interactive?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Display Interface
		// ZIM 4TH Methods
		movement(call: Function): this
		noMovement(): this
		tap(call: Function, distance?: number, time?: number, once?: boolean, dbl?: boolean, dblTime?: number, call2?: Function): this
		noTap(): this
		hold(call: Function, distance?: number, time?: number, once?: boolean): this
		noHold(): this
		drag(config_or_boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean): this
		drag(config: { boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } | DisplayObject, axis?: string, overCursor?: string, dragCursor?: string, all?: boolean, swipe?: boolean, localBoundary?: boolean, onTop?: boolean, surround?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, reg?: boolean, removeTweens?: boolean, startBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, currentTarget?: boolean }): this
		noDrag(): this
        change(call: Function): this
		dragBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		dragRect(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		mouse(): this
		noMouse(): this
		effect(effect: createjs.Filter, x?: number, y?: number, width?: number, height?: number): this
		updateEffects(): this
		noEffect(effects?: string, cache?: boolean): this
		wire(config_or_target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wire(config: { target: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWire(config_or_target: DisplayObject, prop?: string, input?: string): this
		noWire(config: { target: DisplayObject, prop?: string, input?: string }): this
		wired(config_or_source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string): this
		wired(config: { source: DisplayObject, prop: string, twoWay?: boolean, setSource?: boolean, filter?: Function, call?: Function, input?: string }): this
		noWired(): this
		bind(config_or_id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind): this
		bind(config: { id: string, props?: [any] | {} | string, extra?: string | number, filter?: Function, bindObj?: Bind }): this
		noBind(config_or_props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind): this
		noBind(config: { props?: [any] | {} | string, removeConnectionData?: boolean, call?: Function, bindObj?: Bind }): this
		transform(config_or_move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container): this
		transform(config: { move?: boolean, stretchX?: boolean, stretchY?: boolean, scale?: boolean, rotate?: boolean, allowToggle?: boolean, visible?: boolean, onTop?: boolean, showStretch?: boolean, showRotate?: boolean, showScale?: boolean, showReg?: boolean, showBorder?: boolean, borderColor?: color, borderWidth?: number, dashed?: boolean | [number], customCursors?: boolean, handleSize?: number, regSize?: number, snapDistance?: number, snapRotation?: number, cache?: boolean, events?: boolean, ghostColor?: color, ghostWidth?: number, ghostDashed?: boolean, ghostHidden?: boolean, container?: Container }): this
		setSwipe(swipe?: boolean): this
		gesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }): this
		gesture(config: { move?: boolean, scale?: boolean, rotate?: boolean, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, minScale?: number, maxScale?: number, snapRotate?: number, localBounds?: boolean, slide?: boolean, slideEffect?: number, regControl?: boolean, onTop?: boolean, surround?: boolean, circularBounds?: boolean, rect?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number } }): this
		noGesture(config_or_move?: boolean, scale?: boolean, rotate?: boolean): this
		noGesture(config: { move?: boolean, scale?: boolean, rotate?: boolean }): this
		gestureBoundary(boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, update?: boolean): this
		addPhysics(config_or_dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean): this
		addPhysics(config: { dynamic?: boolean, contract?: number, shape?: string, friction?: number, linear?: number, angular?: number, density?: number, bounciness?: number, maskBits?: number, categoryBits?: number, physics?: Physics, restitution?: number, sensor?: boolean }): this
		removePhysics(): this
		impulse(x?: number, y?: number, targetX?: number, targetY?: number): this
		force(x?: number, y?: number, targetX?: number, targetY?: number): this
		torque(amount?: number): this
		sleep(): this
		wake(): this
		follow(config_or_damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean): this
		follow(config: { damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, borderOriginal?: boolean }): this
		control(config_or_type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean): this
		control(config: { type?: string, speed?: number, speedY?: number, horizontal?: boolean, vertical?: boolean }): this
		noControl(): this
		contact(call: Function): this
		contactEnd(call: Function): this
		noContact(): this
		noContactEnd(): this
		hitTestPoint(x: number, y: number, boundsCheck?: boolean): boolean
		hitTestReg(other: DisplayObject): boolean
		hitTestRect(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircle(other: DisplayObject, num?: number, boundsCheck?: boolean, inside?: boolean): boolean
		hitTestCircles(other: DisplayObject, margin?: number): boolean
		hitTestCircleRect(other: DisplayObject, margin?: number): boolean
		hitTestBounds(other: DisplayObject, margin?: number, boundsShape?: boolean): boolean
		boundsToGlobal(rect: createjs.Rectangle | { x: number, y: number, width: number, height: number }, flip?: boolean): createjs.Rectangle
		resetBounds(width_or_boundsX?: number, height_or_boundsY?: number, width?: number, height?: number): this
		hitTestPath(other: DisplayObject, num?: number, showPoints?: boolean): boolean
		hitTestGrid(width?: number, height?: number, cols?: number, rows?: number, x?: number, y?: number, offsetX?: number, offsetY?: number, spacingX?: number, spacingY?: number, local?: boolean, type?: string): any
		animate(config_or_props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean): this
		animate(config: { props: {} | [{}], time?: number | zimVee, ease?: string | zimVee, call?: Function, params?: any, wait?: number | zimVee, waitedCall?: Function, waitedParams?: any, loop?: boolean, loopCount?: number | zimVee, loopWait?: number | zimVee, loopCall?: Function, loopParams?: any, loopWaitCall?: Function, loopWaitParams?: any, loopPick?: boolean, rewind?: boolean | zimVee, rewindWait?: number | zimVee, rewindCall?: Function, rewindParams?: any, rewindWaitCall?: Function, rewindWaitParams?: any, rewindTime?: number | zimVee, rewindEase?: string | zimVee, sequence?: number, sequenceCall?: Function, sequenceParams?: any, sequenceReverse?: boolean | zimVee, ticker?: boolean, cjsProps?: {}, css?: boolean, protect?: boolean, override?: boolean, from?: boolean | zimVee, set?: {} | zimVee, id?: string, events?: boolean, sequenceTarget?: any, dynamic?: boolean, drag?: boolean, clamp?: boolean, startPaused?: boolean, clean?: boolean, obj?: {} | [{}], seriesWait?: any, sequenceWait?: any, rate?: number | zimVee, pauseOnBlur?: boolean, easeAmount?: number | zimVee, easeFrequency?: number | zimVee, timeUnit?: string, timeCheck?: boolean, noAnimateCall?: boolean }): this
		stopAnimate(ids?: string | [string], toEnd?: boolean): this
		pauseAnimate(state?: boolean, ids?: string | [string]): this
		wiggle(config_or_property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number): this
		wiggle(config: { property: string, baseAmount: number | zimVee, minAmount?: number | zimVee, maxAmount?: number | zimVee, minTime?: number | zimVee, maxTime?: number | zimVee, totalTime?: number, type?: string, ease?: string, integer?: boolean, id?: string, startType?: string, ticker?: boolean, wait?: number }): this
		copyMatrix(source: DisplayObject): this
		cur(type?: string): this
		sha(color_or_shadow?: string | createjs.Shadow, offsetX?: number, offsetY?: number, blur?: number): this
		pos(config_or_x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean): this
		pos(config: { x?: number, y?: number, right?: boolean | string, bottom?: boolean | string, container?: Container | Stage, index?: number, add?: boolean, reg?: boolean, regX?: boolean, regY?: boolean }): this
		loc(config_or_target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number): this
		loc(config: { target_or_x?: {} | [] | DisplayObject | Point | number, y?: number, container?: Container | Stage, index?: number, add?: boolean, localToLocal?: boolean, x?: number }): this
		mov(x: number, y?: number): this
		top(): this
		bot(): this
		ord(num: number): this
		dep(depth: number): this
		alp(alpha: number): this
		vis(visible: boolean): this
		ble(color: color): this
		dye(blendMode: string): this
		hov(value?: any, prop?: string): this
		rot(rotation: number): this
		siz(width: number, height?: number, only?: boolean): this
		ske(skewx: number, skewY?: number): this
		reg(regx: number | string, regY?: number | string, still?: boolean): this
		sca(scale: number, scaleY?: number): this
		scaleTo(boundObj?: DisplayObject, percentX?: number, percentY?: number, type?: string, boundsOnly?: boolean): this
		fit(left?: number, top?: number, width?: number, height?: number, inside?: boolean): {}
		outline(color?: color, size?: number): this
		addTo(config_or_container?: Container | Stage, index?: number, localToLocal?: boolean): this
		addTo(config: { container?: Container | Stage, index?: number, localToLocal?: boolean }): this
		removeFrom(container?: Container | Stage): this
		added(call: Function, interval?: number, maxTime?: number): string
		centerReg(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		centerReg(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		center(config_or_container?: Container | Stage, index?: number, add?: boolean): this
		center(config: { container?: Container | Stage, index?: number, add?: boolean }): this
		place(id?: string): this
		placeReg(id?: string): this
		expand(padding?: number, paddingV?: number, paddingRight?: number, paddingBottom?: number): this
		duplicate(exact?: boolean): this
		setMask(mask: DisplayObject, dynamic?: boolean): this
		toggle(state?: boolean): this
		outlineToggle(state?: boolean): this
		// animate adds these:
		endTween(callType?: string): this
		resetTween(): this
		replayTween(): this
		// ZIM 4TH Properties
		readonly type: string
		width: number
		height: number
		widthOnly: number
		heightOnly: number
		marginLeft: number
		marginRight: number
		marginTop: number
		marginBottom: number
		level: number
		depth: number
		name: string
		draggable: boolean
		effects: { string: createjs.Filter }
		hue: number
		saturation: number
		brightness: number
		contrast: number
		hueBatch: number
		saturationBatch: number
		brightnessBatch: number
		contrastBatch: number
		blendMode: string
		readonly paused: boolean
		readonly toggled: boolean
		readonly outlineToggled: boolean
		group: string
		dynamic: boolean
		dragPaused: boolean
		// animate properties 
		readonly animating: boolean
		readonly waiting: boolean
		readonly tweenState: {}
		percentSpeed: number
		rate: number
		percentComplete: number
		zimLastMouseEnabled: boolean
		// END ZIM Display Interface
		svg: string
	}

	export class CustomShape extends Container implements zimShape {
		constructor(x?: number, y?: number, w?: number, h?: number)
		// ZIM Shape Interface
		readonly shape: Shape
		color: color
		colorRange: number
		readonly colorCommand: createjs.Graphics.Fill
		borderColor: color
		readonly borderColorCommand: createjs.Graphics.Stroke
		borderWidth: number
		readonly borderDashedCommand: any
		setColorRange(color1?: color, color2?: color): this
		cloneAll(exact?: boolean, style?: boolean, group?: string, inherit?: {}): this
		linearGradient(colors: [any], ratios: [any], x0: number, y0: number, x1: number, y1: number): this
		radialGradient(colors: [any], ratios: [any], x0: number, y0: number, radius0: number, x1: number, y1: number, radius1: number): this
		readonly veeObj: zimVee
		// END ZIM Shape Interface
	}

	export class Circle extends Container implements zimShape {
		constructor(config_radius?: number | zimVee, color?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number | zimVee, dashed?: boolean | [number], percent?: number, percentClose?: boolean, strokeObj?: {}, style?: boolean, group?: string, inherit?: {})
		// ZIM Shape Interface
		readonly shape: Shape
		color: color
		colorRange: number
		readonly colorCommand: createjs.Graphics.Fill
		borderColor: color
		readonly borderColorCommand: createjs.Graphics.Stroke
		borderWidth: number
		readonly borderDashedCommand: any
		setColorRange(color1?: color, color2?: color): this
		cloneAll(exact?: boolean, style?: boolean, group?: string, inherit?: {}): this
		linearGradient(colors: [any], ratios: [any], x0: number, y0: number, x1: number, y1: number): this
		radialGradient(colors: [any], ratios: [any], x0: number, y0: number, radius0: number, x1: number, y1: number, radius1: number): this
		readonly veeObj: zimVee
		// END ZIM Shape Interface
		radius: number
		percentage: number
		percentClose: boolean
	}

	export class Rectangle extends Container implements zimShape {
		constructor(config_or_width?: number | zimVee, height?: number | zimVee, color?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number | zimVee, corner?: number | any[], dashed?: boolean | [number], strokeObj?: {}, scaleDimensions?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number | zimVee, height?: number | zimVee, color?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number | zimVee, corner?: number | any[], dashed?: boolean | [number], strokeObj?: {}, scaleDimensions?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Shape Interface
		readonly shape: Shape
		color: color
		colorRange: number
		readonly colorCommand: createjs.Graphics.Fill
		borderColor: color
		readonly borderColorCommand: createjs.Graphics.Stroke
		borderWidth: number
		readonly borderDashedCommand: any
		setColorRange(color1?: color, color2?: color): this
		cloneAll(exact?: boolean, style?: boolean, group?: string, inherit?: {}): this
		linearGradient(colors: [any], ratios: [any], x0: number, y0: number, x1: number, y1: number): this
		radialGradient(colors: [any], ratios: [any], x0: number, y0: number, radius0: number, x1: number, y1: number, radius1: number): this
		readonly veeObj: zimVee
		// END ZIM Shape Interface
		corner: number
	}

	export class Triangle extends Container implements zimShape {
		constructor(config_or_a?: number | zimVee, b?: number | zimVee, c?: number | zimVee, color?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number | zimVee, corner?: number | any[], center?: boolean, adjust?: number, dashed?: boolean | [number], strokeObj?: {}, style?: boolean, group?: string, inherit?: {})
		constructor(config: { a?: number | zimVee, b?: number | zimVee, c?: number | zimVee, color?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number | zimVee, corner?: number | any[], center?: boolean, adjust?: number, dashed?: boolean | [number], strokeObj?: {}, style?: boolean, group?: string, inherit?: {} })
		// ZIM Shape Interface
		readonly shape: Shape
		color: color
		colorRange: number
		readonly colorCommand: createjs.Graphics.Fill
		borderColor: color
		readonly borderColorCommand: createjs.Graphics.Stroke
		borderWidth: number
		readonly borderDashedCommand: any
		setColorRange(color1?: color, color2?: color): this
		cloneAll(exact?: boolean, style?: boolean, group?: string, inherit?: {}): this
		linearGradient(colors: [any], ratios: [any], x0: number, y0: number, x1: number, y1: number): this
		radialGradient(colors: [any], ratios: [any], x0: number, y0: number, radius0: number, x1: number, y1: number, radius1: number): this
		readonly veeObj: zimVee
		// END ZIM Shape Interface
		readonly one: { x: number, y: number }
		readonly two: { x: number, y: number }
		readonly three: { x: number, y: number }
		readonly angles: number[]
	}

	export class Poly extends Container implements zimShape {
		constructor(config_or_radius?: number | zimVee, sides?: number | zimVee, pointSize?: number | zimVee, color?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number | zimVee, dashed?: boolean | [number], strokeObj?: {}, style?: boolean, group?: string, inherit?: {})
		constructor(config: { radius?: number | zimVee, sides?: number | zimVee, pointSize?: number | zimVee, color?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number | zimVee, dashed?: boolean | [number], strokeObj?: {}, style?: boolean, group?: string, inherit?: {} })
		// ZIM Shape Interface
		readonly shape: Shape
		color: color
		colorRange: number
		readonly colorCommand: createjs.Graphics.Fill
		borderColor: color
		readonly borderColorCommand: createjs.Graphics.Stroke
		borderWidth: number
		readonly borderDashedCommand: any
		setColorRange(color1?: color, color2?: color): this
		cloneAll(exact?: boolean, style?: boolean, group?: string, inherit?: {}): this
		linearGradient(colors: [any], ratios: [any], x0: number, y0: number, x1: number, y1: number): this
		radialGradient(colors: [any], ratios: [any], x0: number, y0: number, radius0: number, x1: number, y1: number, radius1: number): this
		readonly veeObj: zimVee
		// END ZIM Shape Interface
		radius: number
		sides: number
		pointSize: number
	}

	export class Line extends Container implements zimShape {
		constructor(config_or_length?: number | zimVee, thickness?: number | zimVee, color?: color | zimVee, startHead?: string | DisplayObject | zimVee, endHead?: string | DisplayObject | zimVee, dashed?: boolean | [number], strokeObj?: {}, style?: boolean, group?: string, inherit?: {})
		constructor(config: { length?: number | zimVee, thickness?: number | zimVee, color?: color | zimVee, startHead?: string | DisplayObject | zimVee, endHead?: string | DisplayObject | zimVee, dashed?: boolean | [number], strokeObj?: {}, style?: boolean, group?: string, inherit?: {} })
		// ZIM Shape Interface
		readonly shape: Shape
		color: color
		colorRange: number
		readonly colorCommand: createjs.Graphics.Fill
		borderColor: color
		readonly borderColorCommand: createjs.Graphics.Stroke
		borderWidth: number
		readonly borderDashedCommand: any
		setColorRange(color1?: color, color2?: color): this
		cloneAll(exact?: boolean, style?: boolean, group?: string, inherit?: {}): this
		linearGradient(colors: [any], ratios: [any], x0: number, y0: number, x1: number, y1: number): this
		radialGradient(colors: [any], ratios: [any], x0: number, y0: number, radius0: number, x1: number, y1: number, radius1: number): this
		readonly veeObj: zimVee
		// END ZIM Shape Interface
		setPoints(a: Point | number, b: Point | number, c?: number, d?: number): this
		from(a: Point | number, b?: number): this
		to(a: Point | number, b?: number): this
		length: number
		startPoint: Point
		startX: number
		startY: number
		endPoint: Point
		endX: number
		endY: number
		startHead: string | DisplayObject
		endHead: string | DisplayObject
		readonly angle: number
	}



	export class Squiggle extends Container {
		constructor(config_or_color?: color | zimVee, thickness?: number, points?: number | any[], length?: number, controlLength?: number | zimVee, controlType?: string, lockControlType?: string, showControls?: boolean, lockControls?: boolean, handleSize?: number, allowToggle?: boolean, move?: boolean, ctrlclick?: boolean, dashed?: boolean | [number], onTop?: boolean, circleColor?: color, circleBorderColor?: color, stickColor?: color, selectColor?: color, selectPoints?: boolean, editPoints?: string | boolean, interactive?: boolean, strokeObj?: {}, style?: boolean, group?: string, inherit?: {})
		constructor(config: { color?: color | zimVee, thickness?: number, points?: number | any[], length?: number, controlLength?: number | zimVee, controlType?: string, lockControlType?: string, showControls?: boolean, lockControls?: boolean, handleSize?: number, allowToggle?: boolean, move?: boolean, ctrlclick?: boolean, dashed?: boolean | [number], onTop?: boolean, circleColor?: color, circleBorderColor?: color, stickColor?: color, selectColor?: color, selectPoints?: boolean, editPoints?: string | boolean, interactive?: boolean, strokeObj?: {}, style?: boolean, group?: string, inherit?: {} })
		readonly shape: Shape
		color: color
		colorRange: number
		stickColor: color
		readonly colorCommand: createjs.Graphics.Fill
		thickness: number
		readonly thicknessCommand: createjs.Graphics.Stroke
		readonly dashedCommand: any
		approximateBounds(num?: number, showPoints?: boolean): this
		addPoint(percent?: number, controlType?: string): this
		addPoints(num?: number, controlType?: string, startPoint?: number, spread?: boolean, dataOnly?: boolean, points?: any[]): this
		interpolate(num?: number, startPoint?: number, spread?: boolean): any[]
		setColorRange(color1?: color, color2?: color): this
		recordData(toJSON?: boolean): { x: number, y: number, points: any[][], color: color, borderColor: color, borderWidth: number, move: boolean, toggle: boolean, controls: boolean }
		setData(data: string | { x: number, y: number, points: any[][], color: color, borderColor: color, borderWidth: number, move: boolean, toggle: boolean, controls: boolean }, fromJSON?: boolean): this
		recordPoints(popup: boolean): any[][]
		getPoints(popup: boolean): any[][]
		setPoints(data: any[][]): this
		changeControl(config_or_index: number, type?: string, rect1X?: number, rect1Y?: number, rect2X?: number, rect2Y?: number, circleX?: number, circleY?: number, update?: boolean): this
		changeControl(config: { index: number, type?: string, rect1X?: number, rect1Y?: number, rect2X?: number, rect2Y?: number, circleX?: number, circleY?: number, update?: boolean }): this
		transformPoints(transformType: string, amount: number, x?: number, y?: number): this
		reversePoints(points: [any]): this
		appendPoints(original: [any], points: [any], controlType?: string): this
		prependPoints(original: [any], points: [any], controlType?: string): this
		splitPoints(points: [any], index?: number, trimEnds?: boolean): Squiggle
		makeBlob(controlType?: string, mergeDist?: boolean): Blob
		update(normalized?: boolean): this
		showControls(): this
		hideControls(): this
		traverse(obj: DisplayObject, start?: number, end?: number, time?: number): this
		removePoint(index: number): this
		readonly num: number
		points: any[]
		pointsAdjusted: any[]
		pointObjects: any[]
		readonly segmentPoints: any[]
		readonly segmentRatios: any[]
		getPointAngle(index: number): number
		getSegmentPoint(point1: any[], point2: any[]): any[]
		getCurvePoint(ratio?: number, segmentRatios?: any[], segmentPoints?: any[], getAngle?: boolean): {}
		readonly controls: Container
		controlsVisible: boolean
		readonly sticks: Container
		readonly lastSelected: Container
		readonly lastSelectedIndex: number
		types: string[]
		lockControls: boolean
		lockControlType: boolean
		allowToggle: boolean
		move: boolean
		ctrlclick: boolean
		addPointFactor: number
		addMinDistance: number
	}
	// ZIM Blob is only available in the module using the zim namespace

	export class Flare extends Container {
		constructor(config_or_color?: color, borderColor?: color, borderWidth?: number, crossAngle?: number, thickness?: number, thicknessA?: number, thicknessB?: number, pin?: number, startX?: number, startY?: number, lengths?: [number], angles?: [number], anglesA?: [number], anglesB?: [number], anglesEnd?: [number], cross?: boolean, crossColors?: [string], close?: boolean, dashed?: boolean | [number], strokeObj?: {}, spineColor?: color, spineBorderWidth?: number, spineBorderColor?: color, spineDashed?: boolean, spineStrokeObj?: {}, closeColor?: color, closeBorderWidth?: number, closeBorderColor?: color, closeDashed?: boolean, closeStrokeObj?: {}, style?: boolean, group?: string, inherit?: {})
		constructor(config: { color?: color, borderColor?: color, borderWidth?: number, crossAngle?: number, thickness?: number, thicknessA?: number, thicknessB?: number, pin?: number, startX?: number, startY?: number, lengths?: [number], angles?: [number], anglesA?: [number], anglesB?: [number], anglesEnd?: [number], cross?: boolean, crossColors?: [string], close?: boolean, dashed?: boolean | [number], strokeObj?: {}, spineColor?: color, spineBorderWidth?: number, spineBorderColor?: color, spineDashed?: boolean, spineStrokeObj?: {}, closeColor?: color, closeBorderWidth?: number, closeBorderColor?: color, closeDashed?: boolean, closeStrokeObj?: {}, style?: boolean, group?: string, inherit?: {} })
		add(lengths?: [number], angles?: [number], anglesA?: [number], anglesB?: [number], anglesEnd?: [number], cross?: boolean, crossColors?: [string], close?: boolean): this
		remake(): this
		readonly shape: Shape
		readonly spineShape: Shape
		readonly closeShape: Shape
		pin: number
		readonly points: [{}]
		readonly pinPoints: [{}]
		color: color
		colorRange: number
		borderColor: color
		borderWidth: number
		borderDashedCommand: any
		closeColor: color
		closeBorderColor: color
		closeBorderWidth: number
		closeBorderDashedCommand: any
		spineColor: color
		spineBorderColor: color
		spineBorderWidth: number
		spineBorderDashedCommand: any
		thicknessA: number
		thicknessB: number
		cross: boolean
		close: boolean
		lengths: [number]
		angles: [number]
		anglesA: [number]
		anglesB: [number]
		anglesEnd: [number]
		crossColors: [string]
	}

	export class MultiFlare extends Container {
		constructor(config_or_flares?: [Flare], pins?: [number], angles?: [number], endToEnd?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { flares?: [Flare], pins?: [number], angles?: [number], endToEnd?: boolean, style?: boolean, group?: string, inherit?: {} })
		add(flares: Flare | [Flare]): this
		remove(flares: Flare | [Flare]): this
		flares: [Flare]
		pins: [number]
		angles: [number]
		endToEnd: boolean
	}

	export class FlareBox extends Container {
		constructor(config_or_width?: number, height?: number, color?: color, borderColor?: color, borderWidth?: number, flares?: [Flare | MultiFlare] | Flare | MultiFlare, corners?: [number], pins?: [number], style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, color?: color, borderColor?: color, borderWidth?: number, flares?: [Flare | MultiFlare] | Flare | MultiFlare, corners?: [number], pins?: [number], style?: boolean, group?: string, inherit?: {} })
		setColorRange(color1: color, color2?: color): this
		readonly multiFlare: MultiFlare
		readonly flares: [Flare]
		readonly backing: Rectangle
		color: color
		colorRange: number
		borderColor: color
		borderWidth: number
		borderDashedCommand: any
	}

	export class Label extends Container implements zimComponent {
		constructor(config_or_text?: string | zimVee, size?: number, font?: string, color?: color, rollColor?: color, shadowColor?: color, shadowBlur?: number, align?: string, valign?: string, lineWidth?: number, lineHeight?: number, bold?: boolean, italic?: boolean, variant?: boolean, backing?: DisplayObject, outlineColor?: color, outlineWidth?: number, backgroundColor?: color, backgroundBorderColor?: color, backgroundBorderWidth?: number, corner?: number | any[], backgroundDashed?: boolean, padding?: number, paddingH?: number, paddingV?: number, shiftH?: number, shiftV?: number, rollPersist?: boolean, labelWidth?: number, labelHeight?: number, maxSize?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { text?: string | zimVee, size?: number, font?: string, color?: color, rollColor?: color, shadowColor?: color, shadowBlur?: number, align?: string, valign?: string, lineWidth?: number, lineHeight?: number, bold?: boolean, italic?: boolean, variant?: boolean, backing?: DisplayObject, outlineColor?: color, outlineWidth?: number, backgroundColor?: color, backgroundBorderColor?: color, backgroundBorderWidth?: number, corner?: number | any[], backgroundDashed?: boolean, padding?: number, paddingH?: number, paddingV?: number, shiftH?: number, shiftV?: number, rollPersist?: boolean, labelWidth?: number, labelHeight?: number, maxSize?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		showRollColor(visible: boolean): this
		label: createjs.Text
		color: color
		colorOnly: color
		backgroundColor: color
		colorRange: number
		rollColor: color
		labelWidth: number
		labelHeight: number
		text: string
		size: number
		font: string
		align: string
		valign: string
		backing: DisplayObject
		background: Rectangle
		setColorRange(color1?: color, color2?: color): this
	}
	export class LabelOnPath extends Container implements zimComponent {
		constructor(config_or_label?: string | Label, path?: Squiggle | zim.Blob, percentAngle?: number, percents?: number[], showPath?: boolean, allowToggle?: boolean, interactive?: boolean, onTop?: boolean, rtl?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { label?: string | Label, path?: Squiggle | zim.Blob, percentAngle?: number, percents?: number[], showPath?: boolean, allowToggle?: boolean, interactive?: boolean, onTop?: boolean, rtl?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
        setProps(obj: [Label], props: {}): this
		enabled: boolean
		// END ZIM Component Interface
		toggle(state?: boolean): this
		hidePath(): this
		showPath(): this
		resize(): this
		text: string
		color: color
		readonly path: Squiggle | zim.Blob
		readonly letters: Container
		readonly numLetters: number
		readonly percents: number[]
		allowToggle: boolean
		interactive: boolean
	}
	export class LabelOnArc extends Container implements zimComponent {
		constructor(config_or_label?: string | Label, size?: number, font?: string, color?: color, radius?: number, flip?: boolean, spacing?: number, letterSpacing?: number, angles?: number[], showCircle?: boolean, arcColor?: color, arcBorderColor?: color, arcBorderWidth?: number, radiusSpread?: boolean, rtl?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { label?: string | Label, size?: number, font?: string, color?: color, radius?: number, flip?: boolean, spacing?: number, letterSpacing?: number, angles?: number[], showCircle?: boolean, arcColor?: color, arcBorderColor?: color, arcBorderWidth?: number, radiusSpread?: boolean, rtl?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
        setProps(obj: [Label], props: {}): this
		enabled: boolean
		// END ZIM Component Interface
		readonly text: string
		readonly labels: Label[]
		readonly letters: Container
		readonly numLetters: number
		readonly letterHeight: number
		color: color
		radius: number
		readonly circle: Circle
		readonly arc: DisplayObject
		readonly angles: number[]
		readonly innerRadius: number
		readonly outerRadius: number
	}
	export class LabelLetters extends Container implements zimComponent {
		constructor(config_or_label?: string | Label, align?: string, valign?: string, letterSpacing?: number, letterSpacings?: [number], lineSpacing?: number, lineSpacings?: [number], lineHeight?: number, lineAlign?: string, lineValign?: string, cache?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { label?: string | Label, align?: string, valign?: string, letterSpacing?: number, letterSpacings?: [number], lineSpacing?: number, lineSpacings?: [number], lineHeight?: number, lineAlign?: string, lineValign?: string, cache?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
        setProps(obj: [Label], props: {}): this
		enabled: boolean
		// END ZIM Component Interface
		toggle(state?: boolean): this
		text: string
		labels: Label[]
		readonly numLetters: number
	}
	export class LabelWords extends Wrapper implements zimComponent {
		constructor(config_or_label?: string | Label, width?: number, size?: number, font?: string, color?: color, backgroundColor?: color, itemCache?: boolean, itemRegX?: number, itemRegY?: number, spacingH?: number, spacingV?: number, wrapperType?: string, align?: string, valign?: string, alignInner?: string, valignInner?: string, flip?: boolean, reverse?: boolean, bottomFull?: boolean, colSize?: number, rowSize?: number, height?: number, minSpreadNum?: number, minStretchNum?: number, percentVoidH?: number, offsetVoidH?: number, percentVoidV?: number, offsetVoidV?: number, minStretchFirst?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { label?: string | Label, width?: number, size?: number, font?: string, color?: color, backgroundColor?: color, itemCache?: boolean, itemRegX?: number, itemRegY?: number, spacingH?: number, spacingV?: number, wrapperType?: string, align?: string, valign?: string, alignInner?: string, valignInner?: string, flip?: boolean, reverse?: boolean, bottomFull?: boolean, colSize?: number, rowSize?: number, height?: number, minSpreadNum?: number, minStretchNum?: number, percentVoidH?: number, offsetVoidH?: number, percentVoidV?: number, offsetVoidV?: number, minStretchFirst?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
        setProps(obj: [Label], props: {}): this
		enabled: boolean
		// END ZIM Component Interface
		toggle(state?: boolean): this
		text: string
		labels: Label[]
		readonly numWords: number
	}
	export class Emoji extends Container implements zimComponent {
		constructor(config_or_code: string, size?: number, monochrome?: boolean, italic?: boolean, backgroundColor?: color, backgroundBorderColor?: color, backgroundBorderWidth?: number, corner?: number | any[], backing?: DisplayObject, padding?: number, paddingH?: number, paddingV?: number, shiftH?: number, shiftV?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { code: string, size?: number, monochrome?: boolean, italic?: boolean, backgroundColor?: color, backgroundBorderColor?: color, backgroundBorderWidth?: number, corner?: number | any[], backing?: DisplayObject, padding?: number, paddingH?: number, paddingV?: number, shiftH?: number, shiftV?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
	}
	export class Button extends Container implements zimComponent {
		constructor(config_or_width?: number | string, height?: number | string, label?: string | Label, backgroundColor?: color, rollBackgroundColor?: color, downBackgroundColor?: color, color?: color, rollColor?: color, downColor?: color, borderColor?: color, borderWidth?: number, rollBorderColor?: color, downBorderColor?: color, backing?: DisplayObject, rollBacking?: DisplayObject, downBacking?: DisplayObject, icon?: DisplayObject, rollIcon?: DisplayObject, downIcon?: DisplayObject, corner?: number | any[], dashed?: boolean | [number], shadowColor?: color, shadowBlur?: number, gradient?: number, gloss?: number, align?: string, valign?: string, indent?: number, indentH?: number, indentV?: number, hitPadding?: number, autoPadding?: number, autoPaddingH?: number, autoPaddingV?: number, rollPersist?: boolean, toggle?: string | boolean, toggleBackgroundColor?: color, rollToggleBackgroundColor?: color, downToggleBackgroundColor?: color, toggleColor?: color, rollToggleColor?: color, downToggleColor?: color, toggleBacking?: DisplayObject, rollToggleBacking?: DisplayObject, downToggleBacking?: DisplayObject, toggleIcon?: DisplayObject, rollToggleIcon?: DisplayObject, downToggleIcon?: DisplayObject, toggleEvent?: string, wait?: string, waitTime?: boolean, waitBackgroundColor?: color, rollWaitBackgroundColor?: color, downWaitBackgroundColor?: color, waitColor?: color, rollWaitColor?: color, downWaitColor?: color, waitBacking?: DisplayObject, rollWaitBacking?: DisplayObject, downWaitBacking?: DisplayObject, waitIcon?: DisplayObject, rollWaitIcon?: DisplayObject, downWaitIcon?: DisplayObject, waitModal?: boolean, waitEnabled?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number | string, height?: number | string, label?: string | Label, backgroundColor?: color, rollBackgroundColor?: color, downBackgroundColor?: color, color?: color, rollColor?: color, downColor?: color, borderColor?: color, borderWidth?: number, rollBorderColor?: color, downBorderColor?: color, backing?: DisplayObject, rollBacking?: DisplayObject, downBacking?: DisplayObject, icon?: DisplayObject, rollIcon?: DisplayObject, downIcon?: DisplayObject, corner?: number | any[], dashed?: boolean | [number], shadowColor?: color, shadowBlur?: number, gradient?: number, gloss?: number, align?: string, valign?: string, indent?: number, indentH?: number, indentV?: number, hitPadding?: number, autoPadding?: number, autoPaddingH?: number, autoPaddingV?: number, rollPersist?: boolean, toggle?: string | boolean, toggleBackgroundColor?: color, rollToggleBackgroundColor?: color, downToggleBackgroundColor?: color, toggleColor?: color, rollToggleColor?: color, downToggleColor?: color, toggleBacking?: DisplayObject, rollToggleBacking?: DisplayObject, downToggleBacking?: DisplayObject, toggleIcon?: DisplayObject, rollToggleIcon?: DisplayObject, downToggleIcon?: DisplayObject, toggleEvent?: string, wait?: string, waitTime?: boolean, waitBackgroundColor?: color, rollWaitBackgroundColor?: color, downWaitBackgroundColor?: color, waitColor?: color, rollWaitColor?: color, downWaitColor?: color, waitBacking?: DisplayObject, rollWaitBacking?: DisplayObject, downWaitBacking?: DisplayObject, waitIcon?: DisplayObject, rollWaitIcon?: DisplayObject, downWaitIcon?: DisplayObject, waitModal?: boolean, waitEnabled?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		setBacking(type: string, newIcon: DisplayObject): this
		setIcon(type: string, newIcon: DisplayObject): this
		toggle(state?: boolean): this
		wait(): this
		clearWait(): this
		removeWait(): this
		text: string
		label: Label
		color: color
		rollColor: color
		rollPersist: boolean
		borderColor: color
		borderRollColor: color
		hitPadding: number
		readonly backing: DisplayObject
		readonly rollBacking: DisplayObject
		readonly icon: DisplayObject
		readonly rollIcon: DisplayObject
		readonly rolled: boolean
		readonly toggled: boolean
		readonly toggleBacking: DisplayObject
		readonly rollToggleBacking: DisplayObject
		readonly toggleIcon: DisplayObject
		readonly rollToggleIcon: DisplayObject
		readonlywaitBacking: DisplayObject
		readonly rollWaitBacking: DisplayObject
		readonly waitIcon: DisplayObject
		readonly rollWaitIcon: DisplayObject
		focus: boolean

	}
	export class CheckBox extends Container implements zimComponent {
		constructor(config_or_size?: number, label?: string | Label, startChecked?: boolean, color?: color, backgroundColor?: color, margin?: number, indicatorType?: string, indicatorColor?: color, tap?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { size?: number, label?: string | Label, startChecked?: boolean, color?: color, backgroundColor?: color, margin?: number, indicatorType?: string, indicatorColor?: color, tap?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		setChecked(type: boolean): this
		toggle(type: boolean): this
		checked: boolean
		toggled: boolean
		label: Label
		text: string
		indicator: Shape
		indicatorColor: color
		backgroundColor: color
	}
	export class RadioButtons extends Container implements zimComponent {
		constructor(config_or_size?: number, buttons?: string[] | {}[], vertical?: boolean, color?: color, backgroundColor?: color, spacing?: number, margin?: number, always?: boolean, indicatorColor?: color, index?: number, rtl?: boolean, selectedIndex?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { size?: number, buttons?: string[] | {}[], vertical?: boolean, color?: color, backgroundColor?: color, spacing?: number, margin?: number, always?: boolean, indicatorColor?: color, index?: number, rtl?: boolean, selectedIndex?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		setSelected(num: number): this
		readonly selected: { index: number, selected: boolean, label: Label }
		index: number
		selectedIndex: number
		label: Label
		text: string
		id: any
		buttons: Container[]
		labels: Label[]
		indicators: Shape[]
	}
	export class Toggle extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, label?: string | Label, startToggled?: boolean, backgroundColor?: color, margin?: number, indicatorType?: string, indicatorColor?: color, toggleBackgroundColor?: color, color?: color, borderColor?: color, borderWidth?: number, corner?: number | number[], indicatorCorner?: number | number[], shadowColor?: color, shadowBlur?: number, time?: number, labelLeft?: string | Label, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, label?: string | Label, startToggled?: boolean, backgroundColor?: color, margin?: number, indicatorType?: string, indicatorColor?: color, toggleBackgroundColor?: color, color?: color, borderColor?: color, borderWidth?: number, corner?: number | number[], indicatorCorner?: number | number[], shadowColor?: color, shadowBlur?: number, time?: number, labelLeft?: string | Label, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		toggle(state: boolean): this
		toggled: boolean
		readonly text: string
		readonly indicator: DisplayObject
		readonly background: Rectangle
		readonly label: Label
		readonly labelLeft: Label
	}
	export class Tip extends Label implements zimComponent {
		constructor(config_or_text?: string, align?: string, valign?: string, margin?: number, marginH?: number, marginV?: number, outside?: boolean, target?: DisplayObject, size?: number, font?: string, color?: color, rollColor?: color, shadowColor?: color, shadowBlur?: number, textAlign?: string, textValign?: string, lineWidth?: number, lineHeight?: number, fontOptions?: string, backing?: DisplayObject, outlineColor?: color, outlineWidth?: number, backgroundColor?: color, backgroundBorderColor?: color, backgroundBorderWidth?: number, corner?: number | any[], backgroundDashed?: boolean, padding?: number, paddingH?: number, paddingV?: number, shiftH?: number, shiftV?: number, rollPersist?: boolean, labelWidth?: number, labelHeight?: number, maxSize?: number, bold?: boolean, italic?: boolean, variant?: boolean, splitWords?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { text?: string, align?: string, valign?: string, margin?: number, marginH?: number, marginV?: number, outside?: boolean, target?: DisplayObject, size?: number, font?: string, color?: color, rollColor?: color, shadowColor?: color, shadowBlur?: number, textAlign?: string, textValign?: string, lineWidth?: number, lineHeight?: number, fontOptions?: string, backing?: DisplayObject, outlineColor?: color, outlineWidth?: number, backgroundColor?: color, backgroundBorderColor?: color, backgroundBorderWidth?: number, corner?: number | any[], backgroundDashed?: boolean, padding?: number, paddingH?: number, paddingV?: number, shiftH?: number, shiftV?: number, rollPersist?: boolean, labelWidth?: number, labelHeight?: number, maxSize?: number, bold?: boolean, italic?: boolean, variant?: boolean, splitWords?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		show(delay?: number, time?: number): this
		hide(): this
		clear(): this
		align: string
		valign: string
	}
	export class Panel extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, content?: string | number | {} | DisplayObject, titleBar?: string | Label | zimVee, titleBarColor?: color | zimVee, titleBarBackroundColor?: color | zimVee, titleBarHeight?: number, backgroundColor?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number, corner?: number | any[], close?: boolean, closeColor?: color, next?: boolean, nextColor?: color, extraButton?: boolean, collapse?: boolean, collapseColor?: color, collapsed?: boolean, align?: string, shadowColor?: color, shadowBlur?: number, draggable?: boolean, boundary?: Boundary | {}, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, content?: string | number | {} | DisplayObject, titleBar?: string | Label | zimVee, titleBarColor?: color | zimVee, titleBarBackroundColor?: color | zimVee, titleBarHeight?: number, backgroundColor?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number, corner?: number | any[], close?: boolean, closeColor?: color, next?: boolean, nextColor?: color, extraButton?: boolean, collapse?: boolean, collapseColor?: color, collapsed?: boolean, align?: string, shadowColor?: color, shadowBlur?: number, draggable?: boolean, boundary?: Boundary | {}, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		nextPanel(index?: number, event?: boolean): this
		collapsed: boolean
		readonly titleBar: Rectangle
		readonly label: Label
		readonly text: string
		readonly arrow: Shape
		readonly content: {} | DisplayObject
		readonly contentContainer: Container
		readonly background: Rectangle
		readonly overlay: Rectangle
		readonly extraButton: Label
		panelHeight: number
	}
	export class Pane extends Container implements zimComponent {
		constructor(config_or_content?: string | number | {} | DisplayObject, backgroundColor?: color, color?: color, width?: number | string, height?: number | string, draggable?: boolean, resets?: boolean, modal?: boolean, corner?: number | any[], backdropColor?: color, shadowColor?: color, shadowBlur?: number, center?: boolean, displayClose?: boolean, backdropClose?: boolean, backing?: DisplayObject, fadeTime?: number, container?: Stage | Container, titleBar?: string | Label, titleBarColor?: color, titleBarBackroundColor?: color, titleBarHeight?: number, close?: boolean, closeColor?: color, style?: boolean, group?: string, inherit?: {})
		constructor(config: { content?: string | number | {} | DisplayObject, backgroundColor?: color, color?: color, width?: number | string, height?: number | string, draggable?: boolean, resets?: boolean, modal?: boolean, corner?: number | any[], backdropColor?: color, shadowColor?: color, shadowBlur?: number, center?: boolean, displayClose?: boolean, backdropClose?: boolean, backing?: DisplayObject, fadeTime?: number, container?: Stage | Container, titleBar?: string | Label, titleBarColor?: color, titleBarBackroundColor?: color, titleBarHeight?: number, close?: boolean, closeColor?: color, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		show(call?:Function): this
		hide(): this
		readonly display: Rectangle
		text: string
		label: Label
		titleBar: Container
		titleBarLabel: Label
		titleBarBacking: Rectangle
		close: Shape
		readonly content: {} | DisplayObject
		readonly contentContainer: Container
		readonly backdrop: Shape
		resetX: number
		resetY: number
	}

	// Window is only available in the module using the zim namespace

	export class Page extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, color?: string, color2?: string, angle?: number, pattern?: DisplayObject, scalePattern?: string, cache?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, color?: string, color2?: string, angle?: number, pattern?: DisplayObject, scalePattern?: string, cache?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
	}

	export class Central extends Container implements zimComponent {
		constructor(width?: number, height?: number, style?: boolean, group?: string, inherit?: {})
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
	}

	export class Layer extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, titleBar?: string | number | Label, titleBarContainer?: Container, backgroundColor?: color, rollBackgroundColor?: color, selectedBackgroundColor?: color, color?: color, rollColor?: color, selectedColor?: color, borderWidth?: number, borderColor?: color, dashed?: boolean | [number], transformObject?: {}, titleBarWidth?: number, titleBarHeight?: number, titleBarDraggable?: string, close?: boolean, closeColor?: color, closeBackgroundColor?: color, closeIndicatorColor?: color, anchor?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, titleBar?: string | number | Label, titleBarContainer?: Container, backgroundColor?: color, rollBackgroundColor?: color, selectedBackgroundColor?: color, color?: color, rollColor?: color, selectedColor?: color, borderWidth?: number, borderColor?: color, dashed?: boolean | [number], transformObject?: {}, titleBarWidth?: number, titleBarHeight?: number, titleBarDraggable?: string, close?: boolean, closeColor?: color, closeBackgroundColor?: color, closeIndicatorColor?: color, anchor?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		transformControls: {}
		anchor: boolean
		readonly toggled: boolean
		readonly titleBar: Container
		titleBarDraggable: boolean
		readonly checkBox: CheckBox
		readonly button: Button
		readonly label: Label
	}

	export class Waiter extends Container implements zimComponent {
		constructor(config_or_container?: Stage | Container, speed?: number, foregroundColor?: color, backgroundColor?: color, circleColor?: color, corner?: number | any[], shadowColor?: color, shadowBlur?: number, fadeTime?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { container?: Stage | Container, speed?: number, foregroundColor?: color, backgroundColor?: color, circleColor?: color, corner?: number | any[], shadowColor?: color, shadowBlur?: number, fadeTime?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface

		titleBarPos(x?: number, y?: number, right?: boolean, bottom?: boolean): this
		resetTitleBar(): this
		toggle(state?: boolean): this
		resize(dispatch?: boolean): this
		display: Shape
	}
	export class ProgressBar extends Container implements zimComponent {
		constructor(config_or_barType?: string, foregroundColor?: color, backgroundColor?: color, borderColor?: color, borderWidth?: number, padding?: number, label?: Label, color?: color, labelPosition?: string, percentage?: number, corner?: number | any[], shadowColor?: color, shadowBlur?: number, backing?: DisplayObject, delay?: number, fastClose?: boolean, container?: Stage | Container, autoHide?: boolean, width?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { barType?: string, foregroundColor?: color, backgroundColor?: color, borderColor?: color, borderWidth?: number, padding?: number, label?: Label, color?: color, labelPosition?: string, percentage?: number, corner?: number | any[], shadowColor?: color, shadowBlur?: number, backing?: DisplayObject, delay?: number, fastClose?: boolean, container?: Stage | Container, autoHide?: boolean, width?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		show(): this
		hide(): this
		percent: number
		readonly label: Label
		readonly backing: DisplayObject
		readonly bar: DisplayObject
	}
	export class Indicator extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, num?: number, foregroundColor?: color, backgroundColor?: color, borderColor?: color, borderWidth?: number, backdropColor?: color, corner?: number | any[], indicatorType?: string|DisplayObject, selectedIndicatorType?: string|DisplayObject, fill?: boolean, scale?: number, lightScale?: number, interactive?: boolean, shadowColor?: color, shadowBlur?: number, index?: number, backgroundAlpha?: number, selectedIndex?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, num?: number, foregroundColor?: color, backgroundColor?: color, borderColor?: color, borderWidth?: number, backdropColor?: color, corner?: number | any[], indicatorType?: string|DisplayObject, selectedIndicatorType?: string|DisplayObject, fill?: boolean, scale?: number, lightScale?: number, interactive?: boolean, shadowColor?: color, shadowBlur?: number, index?: number, backgroundAlpha?: number, selectedIndex?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		index: number
		selectedIndex: number
		readonly num: number
		readonly backdrop: Rectangle
		lights: Circle[] | Rectangle[]
		lightsContainer: Container
	}
	export class TextInput extends zim.Window implements zimComponent {
		constructor(config_or_width?: number | zimVee, height?: number | zimVee, placeholder?: string | zimVee, text?: string | zimVee, size?: number, font?: string, color?: color | zimVee, backgroundColor?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number, maxLength?: number, password?: string, selectionColor?: color, selectionAlpha?: number, cursorColor?: color, cursorSpeed?: number, shadowColor?: color, shadowBlur?: number, align?: string, corner?: number | any[], padding?: number, paddingH?: number, paddingV?: number, shiftH?: number, shiftV?: number, rollPersist?: boolean, multiline?: boolean, wrap?: boolean, scrollBarActive?: boolean, scrollBarDrag?: boolean, scrollBarColor?: color, scrollBarAlpha?: number, scrollBarFade?: boolean, scrollBarH?: boolean, scrollBarV?: boolean, readOnly?: boolean, inputType?: string, rtl?: boolean, uppercase?: boolean, placeholderInstant?: boolean, keyboardShift?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number | zimVee, height?: number | zimVee, placeholder?: string | zimVee, text?: string | zimVee, size?: number, font?: string, color?: color | zimVee, backgroundColor?: color | zimVee, borderColor?: color | zimVee, borderWidth?: number, maxLength?: number, password?: string, selectionColor?: color, selectionAlpha?: number, cursorColor?: color, cursorSpeed?: number, shadowColor?: color, shadowBlur?: number, align?: string, corner?: number | any[], padding?: number, paddingH?: number, paddingV?: number, shiftH?: number, shiftV?: number, rollPersist?: boolean, multiline?: boolean, wrap?: boolean, scrollBarActive?: boolean, scrollBarDrag?: boolean, scrollBarColor?: color, scrollBarAlpha?: number, scrollBarFade?: boolean, scrollBarH?: boolean, scrollBarV?: boolean, readOnly?: boolean, inputType?: string, rtl?: boolean, uppercase?: boolean, placeholderInstant?: boolean, keyboardShift?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		text: string
		readonly label: Label
		readonly placeholderLabel: Label
		readonly htmlTag: HTMLInputElement
		readonly selection: Rectangle
		selectionAlpha: number
		readonly blinker: Rectangle
		size: number
		font: string
		align: string
		color: color
		static LabelInput(config_or_text?: string | zimVee, size?: number, maxLength?: number, password?: string, selectionColor?: color, selectionAlpha?: number, blinkerColor?: color, blinkerSpeed?: number, font?: string, color?: color, rollColor?: color, shadowColor?: color, shadowBlur?: number, align?: string, valign?: string, lineWidth?: number, lineHeight?: number, bold?: boolean, italic?: boolean, variant?: boolean, backing?: DisplayObject, outlineColor?: color, outlineWidth?: number, backgroundColor?: color, backgroundBorderColor?: color, backgroundBorderWidth?: number, corner?: number | any[], backgroundDashed?: boolean, padding?: number, paddingH?: number, paddingV?: number, shiftH?: number, shiftV?: number, rollPersist?: boolean, labelWidth?: number, labelHeight?: number, style?: boolean, group?: string, inherit?: {}): Container
		static LabelInput(config: { text?: string | zimVee, size?: number, maxLength?: number, password?: string, selectionColor?: color, selectionAlpha?: number, blinkerColor?: color, blinkerSpeed?: number, font?: string, color?: color, rollColor?: color, shadowColor?: color, shadowBlur?: number, align?: string, valign?: string, lineWidth?: number, lineHeight?: number, bold?: boolean, italic?: boolean, variant?: boolean, backing?: DisplayObject, outlineColor?: color, outlineWidth?: number, backgroundColor?: color, backgroundBorderColor?: color, backgroundBorderWidth?: number, corner?: number | any[], backgroundDashed?: boolean, padding?: number, paddingH?: number, paddingV?: number, shiftH?: number, shiftV?: number, rollPersist?: boolean, labelWidth?: number, labelHeight?: number, style?: boolean, group?: string, inherit?: {} }): Container
	}
	export class List extends zim.Window implements zimComponent {
		constructor(config_or_width?: number, height?: number, list?: any[]|{}, viewNum?: number, vertical?: boolean, currentSelected?: boolean, align?: string, valign?: string, labelAlign?: string, labelValign?: string, labelIndent?: number, labelIndentH?: boolean, labelIndentV?: boolean, indent?: number, spacing?: number, backgroundColor?: color, rollBackgroundColor?: color, downBackgroundColor?: color, selectedBackgroundColor?: color, backdropColor?: color, color?: color, rollColor?: color, downColor?: color, selectedColor?: color, borderColor?: color, borderWidth?: number, padding?: number, corner?: number | any[], swipe?: boolean, scrollBarActive?: boolean, scrollBarDrag?: boolean, scrollBarColor?: color, scrollBarAlpha?: number, scrollBarFade?: boolean, scrollBarH?: boolean, scrollBarV?: boolean, scrollBarOverlay?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, shadowColor?: color, shadowBlur?: number, paddingH?: number, paddingV?: number, scrollWheel?: boolean, damp?: number, titleBar?: string | Label, titleBarColor?: color, titleBarBackgroundColor?: color, titleBarHeight?: number, draggable?: boolean, boundary?: {} | Boundary, onTop?: boolean, close?: boolean, closeColor?: color, excludeCustomTap?: boolean, organizer?: Organizer, checkBox?: boolean, pulldown?: boolean, clone?: boolean, cancelCurrentDrag?: boolean, index?: number, resizeHandle?: boolean, resizeBoundary?: Boundary, resizeVisible?: boolean, drop?: boolean, dropTargets?: DisplayObject | [DisplayObject], dropSelf?: boolean, dropCopy?: boolean, dropColor?: color, dropThickness?: number, dropScrollSpeed?: number, dropReticleAlpha?: number, dropHitTest?: string, dropFull?: boolean, dropSnap?: boolean, dropEnd?: boolean, dropScale?: number, dropWidth?: number, dropHeight?: number, selectedIndex?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, list?: any[]|{}, viewNum?: number, vertical?: boolean, currentSelected?: boolean, align?: string, valign?: string, labelAlign?: string, labelValign?: string, labelIndent?: number, labelIndentH?: boolean, labelIndentV?: boolean, indent?: number, spacing?: number, backgroundColor?: color, rollBackgroundColor?: color, downBackgroundColor?: color, selectedBackgroundColor?: color, backdropColor?: color, color?: color, rollColor?: color, downColor?: color, selectedColor?: color, borderColor?: color, borderWidth?: number, padding?: number, corner?: number | any[], swipe?: boolean, scrollBarActive?: boolean, scrollBarDrag?: boolean, scrollBarColor?: color, scrollBarAlpha?: number, scrollBarFade?: boolean, scrollBarH?: boolean, scrollBarV?: boolean, scrollBarOverlay?: boolean, slide?: boolean, slideFactor?: number, slideSnap?: boolean, slideSnapDamp?: number, shadowColor?: color, shadowBlur?: number, paddingH?: number, paddingV?: number, scrollWheel?: boolean, damp?: number, titleBar?: string | Label, titleBarColor?: color, titleBarBackgroundColor?: color, titleBarHeight?: number, draggable?: boolean, boundary?: {} | Boundary, onTop?: boolean, close?: boolean, closeColor?: color, excludeCustomTap?: boolean, organizer?: Organizer, checkBox?: boolean, pulldown?: boolean, clone?: boolean, cancelCurrentDrag?: boolean, index?: number, resizeHandle?: boolean, resizeBoundary?: Boundary, resizeVisible?: boolean, drop?: boolean, dropTargets?: DisplayObject | [DisplayObject], dropSelf?: boolean, dropCopy?: boolean, dropColor?: color, dropThickness?: number, dropScrollSpeed?: number, dropReticleAlpha?: number, dropHitTest?: string, dropFull?: boolean, dropSnap?: boolean, dropEnd?: boolean, dropScale?: number, dropWidth?: number, dropHeight?: number, selectedIndex?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		animateTo(index?: number, timePerItem?: number): this
		addAt(items?: any, index?: number, clone?: boolean): this
		removeAt(number?: number, index?: number): this
		clear(): this
		first(): this
		last(): this
		openAtLevel(level: number): this
		openAtId(idNum: number): this
		toggle(state?: boolean, index?:number | [number]): this
		static slider(label?: string | Label, min?: number, max?: number, val?: number, call?: Function, step?: number, obj?: any, property?: string, paddingLeft?: number, paddingRight?: number): Container
		static checkBox(label?: string | Label, checked?: boolean, call?: Function, step?: number, obj?: any, property?: string, paddingLeft?: number, paddingRight?: number): Container
		static colorPicker(label?: string | Label, color?: color, picker?: ColorPicker, call?: Function, step?: number, obj?: any, property?: string, paddingLeft?: number, paddingRight?: number): Container
		static checkItem(text?: string, width?: number, paddingH?: number, paddingV?: number, color?: color, rollColor?: color, backgroundColor?: color, rollBackgroundColor?: color, selectedColor?: color, selectedRollColor?: color, selectedBackgroundColor?: color, selectedRollBackgroundColor?: color): Container
		setCheck(index?: number, type?: boolean): this
		setChecks(type?: boolean): this
		getCheck(index?: number): boolean
        updateDrop(): boolean
        index:number
		selectedIndex: number
		selectedIndexPlusPosition: number
		toggled: boolean
		readonly selected: DisplayObject
		readonly text: string
        value: any
		readonly currentValue: string
		readonly label: Label
		readonly titleBarLabel: Label
		readonly list: any[]|{}
		readonly items: any[]
		readonly itemsText: string[]
		readonly length: number
		readonly tabs: Tabs
		readonly checkBoxes: [CheckBox]
        drop: boolean
        dropTargets: [List]
        dropColor: color
        readonly dropReticle: Rectangle 
        readonly dropItem: DisplayObject
        readonly dropIndex: Number
        readonly dropList: List
        readonly dropNewIndex: number

		scrollEnabled: boolean
	}
	export class Stepper extends Container implements zimComponent {
		constructor(config_or_list?: string[] | number[], width?: number, backgroundColor?: color, borderColor?: color, borderWidth?: number, label?: Label, color?: color, vertical?: boolean, arrows?: number, corner?: number | any[], shadowColor?: color, shadowBlur?: number, continuous?: boolean, display?: boolean, press?: boolean, hold?: boolean, holdDelay?: number, holdSpeed?: number, draggable?: boolean, dragSensitivity?: number, dragRange?: number, stepperType?: string, min?: number, max?: number, step?: number, step2?: number, arrows2?: boolean, arrows2Scale?: number, keyEnabled?: boolean, keyArrows?: number, rightForward?: boolean, downForward?: boolean, index?: number, value?: string | number, arrowColor?: color, arrowScale?: number, selectedIndex?: number, currentValue?: string | number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { list?: string[] | number[], width?: number, backgroundColor?: color, borderColor?: color, borderWidth?: number, label?: Label, color?: color, vertical?: boolean, arrows?: number, corner?: number | any[], shadowColor?: color, shadowBlur?: number, continuous?: boolean, display?: boolean, press?: boolean, hold?: boolean, holdDelay?: number, holdSpeed?: number, draggable?: boolean, dragSensitivity?: number, dragRange?: number, stepperType?: string, min?: number, max?: number, step?: number, step2?: number, arrows2?: boolean, arrows2Scale?: number, keyEnabled?: boolean, keyArrows?: number, rightForward?: boolean, downForward?: boolean, index?: number, value?: string | number, arrowColor?: color, arrowScale?: number, selectedIndex?: number, currentValue?: string | number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		next(): void
		prev(): void
        index: number
		selectedIndex: number
        value: string | number
		currentValue: string | number
		valueEvent: string | number
		stepperArray: string[] | number[]
		containerPrev: Container
		containerNext: Container
		arrowPrev: Triangle
		arrowNext: Triangle
		prev2: Triangle
		next2: Triangle
		arrowPrev2: Triangle
		arrowNext2: Triangle
		min: number
		max: number
		label: Label
		textBox: Shape
        continuous: boolean
		keyFocus: boolean
	}
	export class Slider extends Container implements zimComponent {
		constructor(config_or_min?: number | zimVee, max?: number | zimVee, step?: number | zimVee, button?: Button, barLength?: number, barWidth?: number, barColor?: color, vertical?: boolean, useTicks?: boolean, tickColor?: color, tickStep?: number, semiTicks?: number, tickScale?: number, semiTickScale?: number, accentSize?: number, accentOffset?: number, accentColor?: color, accentBackgroundColor?: color, accentDifference?: number, sound?: boolean, inside?: boolean, keyArrows?: number, keyArrowsStep?: number, keyArrowsH?: boolean, keyArrowsV?: boolean, damp?: number, value?: number | zimVee, expand?: number, expandV?: number, expandBar?: number, expandBarV?: number, useLabels?: boolean, labelMargin?: number, labelColor?: color, range?: boolean, rangeColor?: color, rangeWidth?: number, rangeMin?: number, rangeMax?: number, rangeAve?: number, addZero?: boolean, currentValue?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { min?: number | zimVee, max?: number | zimVee, step?: number | zimVee, button?: Button, barLength?: number, barWidth?: number, barColor?: color, vertical?: boolean, useTicks?: boolean, tickColor?: color, tickStep?: number, semiTicks?: number, tickScale?: number, semiTickScale?: number, accentSize?: number, accentOffset?: number, accentColor?: color, accentBackgroundColor?: color, accentDifference?: number, sound?: boolean, inside?: boolean, keyArrows?: number, keyArrowsStep?: number, keyArrowsH?: boolean, keyArrowsV?: boolean, damp?: number, value?: number | zimVee, expand?: number, expandV?: number, expandBar?: number, expandBarV?: number, useLabels?: boolean, labelMargin?: number, labelColor?: color, range?: boolean, rangeColor?: color, rangeWidth?: number, rangeMin?: number, rangeMax?: number, rangeAve?: number, addZero?: boolean, currentValue?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		value: number
		currentValue: number
		currentValueEvent: number
		readonly min: number
		readonly max: number
		readonly step: number
		bar: Rectangle
		button: Button
		ticks: Shape
		labels: Container
		keyArrowsH: number
		keyArrowsV: number
		keyFocus: boolean
        readonly rangeBar: Rectangle
        readonly rangeSliderA: Slider
        readonly rangeSliderB: Slider
        readonly rangeButtonA: Button
        readonly rangeButtonB: Button
        rangeMin: number
        rangeMax: number
        rangeAve: number
        readonly rangeAmount: number
	}
	export class Selector extends Container implements zimComponent {
		constructor(config_or_tile?: Tile, borderColor?: color | zimVee, borderWidth?: number, backgroundColor?: color | zimVee, corner?: number | [any], dashed?: boolean | [number], padding?: number, paddingV?: number, speed?: number, diagonal?: boolean, dim?: boolean, multi?: boolean, keyArrows?: boolean, behind?: boolean, resizeScale?: number, index?: number, liveIndex?: boolean, selectedIndex?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { tile?: Tile, borderColor?: color | zimVee, borderWidth?: number, backgroundColor?: color | zimVee, corner?: number | [any], dashed?: boolean | [number], padding?: number, paddingV?: number, speed?: number, diagonal?: boolean, dim?: boolean, multi?: boolean, keyArrows?: boolean, behind?: boolean, resizeScale?: number, index?: number, liveIndex?: boolean, selectedIndex?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		index: number
        selectedIndex: number
		liveIndex: boolean
		currentItem: DisplayObject
        noAnimate: boolean       
        readonly downIndex: number
        readonly upIndex: number
        readonly downItem: DisplayObject
        readonly upItem: DisplayObject
        readonly lastIndex: number
        readonly lastItem: DisplayObject
        readonly selectedCol: number
        readonly selectedRow: number
        readonly lastCol: number
        readonly lastRow: number
        readonly tile: Tile
        readonly selector: Rectangle
        blendMode: string
        keyFocus: boolean
	}
    export class Slicer extends Window implements zimComponent {
		constructor(config_or_obj?: HTMLCanvasElement | DisplayObject, objScale?: number, slices?: [[]], types?: [[]], titleBar?: string | Label, remember?: boolean, upload?: boolean, selection?: boolean, multiple?: boolean, proportion?: boolean, resize?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { obj?: HTMLCanvasElement | DisplayObject, objScale?: number, slices?: [[]], types?: [[]], titleBar?: string | Label, remember?: boolean, upload?: boolean, selection?: boolean, multiple?: boolean, proportion?: boolean, resize?: boolean, style?: boolean, group?: string, inherit?: {} })
		setObject(newObj:HTMLCanvasElement | DisplayObject, scale?: number) : this
        updateLines(slices: [[]]): this
        setSlicerTypes(slicerTypes: SlicerTypes): this
        clearSelection(): this
        clear(): this
        clone(): Slicer
		readonly obj: HTMLCanvasElement | DisplayObject
        slices: [[]]
        types: [[]]
        exchange: [[[]]]
        readonly selectedIndexH: number
        readonly selectedIndexV: number
        readonly currentLineH: Container
        readonly currentLineV: Container
        readonly selection: [[]]
        readonly box: Rectangle
        readonly trackH: Rectangle
        readonly trackV: Rectangle
        readonly deleteH: Button
        readonly deleteV: Button
        readonly hide: Button
        readonly loader: Loader
        readonly linesHContainer: Container
        readonly linesVContainer: Container
        readonly highlightContainer: Container
	}
    export class SlicerTypes extends Window implements zimComponent {
		constructor(config_or_slicer: Slicer, titleBar?: string | Label, sliceType?: string, style?: boolean, group?: string, inherit?: {})
		constructor(config: { slicer: Slicer, titleBar?: string | Label, sliceType?: string, style?: boolean, group?: string, inherit?: {} })
		slicer: Slicer
        sliceType: string
        readonly radioH: RadioButtons
        readonly radioV: RadioButtons
        readonly importButton: Button
        readonly exportButton: Button
        readonly importPane: Pane
        readonly exportPane: Pane
        readonly submitButton: Button
        readonly shield: Rectangle
	}
	export class Dial extends Container implements zimComponent {
		constructor(config_or_min?: number, max?: number, step?: number, width?: number, backgroundColor?: color, indicatorColor?: color, indicatorScale?: number, indicatorType?: string, useTicks?: boolean, innerTicks?: boolean, tickColor?: color, tickStep?: number, semiTicks?: number, tickScale?: number, semiTickScale?: number, innerCircle?: boolean, innerScale?: number, innerColor?: color, inner2Color?: color, accentSize?: number, accentRadius?: number, accentColor?: color, accentBackgroundColor?: color, accentDifference?: number, sound?: boolean, linear?: boolean, gap?: number, limit?: boolean, keyArrows?: number, keyArrowsStep?: number, keyArrowsH?: boolean, keyArrowsV?: boolean, continuous?: boolean, continuousMin?: number, continuousMax?: number, value?: number, useLabels?: boolean, labelMargin?: number, addZero?: boolean, currentValue?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { min?: number, max?: number, step?: number, width?: number, backgroundColor?: color, indicatorColor?: color, indicatorScale?: number, indicatorType?: string, useTicks?: boolean, innerTicks?: boolean, tickColor?: color, tickStep?: number, semiTicks?: number, tickScale?: number, semiTickScale?: number, innerCircle?: boolean, innerScale?: number, innerColor?: color, inner2Color?: color, accentSize?: number, accentRadius?: number, accentColor?: color, accentBackgroundColor?: color, accentDifference?: number, sound?: boolean, linear?: boolean, gap?: number, limit?: boolean, keyArrows?: number, keyArrowsStep?: number, keyArrowsH?: boolean, keyArrowsV?: boolean, continuous?: boolean, continuousMin?: number, continuousMax?: number, value?: number, useLabels?: boolean, labelMargin?: number, addZero?: boolean, currentValue?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		value: number
		currentValue: number
		currentValueEvent: number
		readonly min: number
		readonly max: number
		readonly step: number
		readonly continuous: boolean
		continuousMin: number
		continuousMax: number
		backing: Circle
		inner: Circle
		inner2: Circle
		ticks: Container
		labels: Container
		indicator: Triangle | Circle | Rectangle
		indicatorShape: Shape
		keyArrowsH: number
		keyArrowsV: number
		keyFocus: boolean
	}
	export class Tabs extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, tabs?: string[] | {}[], backgroundColor?: color, rollBackgroundColor?: color, downBackgroundColor?: color, selectedBackgroundColor?: color, selectedRollBackgroundColor?: color, color?: color, rollColor?: color, downColor?: color, selectedColor?: color, selectedRollColor?: color, vertical?: boolean, spacing?: number, currentEnabled?: boolean, currentSelected?: boolean, corner?: number | any[], base?: string, keyEnabled?: boolean, gradient?: number, gloss?: number, backing?: DisplayObject, rollBacking?: DisplayObject, wait?: string, waitTime?: number, waitBackgroundColor?: color, rollWaitBackgroundColor?: color, waitColor?: color, rollWaitColor?: color, waitModal?: boolean, waitEnabled?: boolean, backdropColor?: color, align?: number, valign?: number, labelAlign?: string, labelValign?: string, labelIndent?: number, labelIndentH?: number, labelIndentV?: number, indent?: number, useTap?: boolean, excludeCustomTap?: boolean, index?: number, styleLabels?: boolean, keyWrap?: boolean, selectedIndex?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, tabs?: string[] | {}[], backgroundColor?: color, rollBackgroundColor?: color, downBackgroundColor?: color, selectedBackgroundColor?: color, selectedRollBackgroundColor?: color, color?: color, rollColor?: color, downColor?: color, selectedColor?: color, selectedRollColor?: color, vertical?: boolean, spacing?: number, currentEnabled?: boolean, currentSelected?: boolean, corner?: number | any[], base?: string, keyEnabled?: boolean, gradient?: number, gloss?: number, backing?: DisplayObject, rollBacking?: DisplayObject, wait?: string, waitTime?: number, waitBackgroundColor?: color, rollWaitBackgroundColor?: color, waitColor?: color, rollWaitColor?: color, waitModal?: boolean, waitEnabled?: boolean, backdropColor?: color, align?: number, valign?: number, labelAlign?: string, labelValign?: string, labelIndent?: number, labelIndentH?: number, labelIndentV?: number, indent?: number, useTap?: boolean, excludeCustomTap?: boolean, index?: number, styleLabels?: boolean, keyWrap?: boolean, selectedIndex?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		index: number
		selectedIndex: number
		selected: Button
		tabs: any[]
		backgroundColor: color
		rollBackgroundColor: color
		offBackgroundColor: color
		color: color
		offColor: color
		rollColor: color
		text: string
		label: Label
		buttons: Button[]
		labels: Label[]
		backdrop: Rectangle
		keyEnabled: boolean
		keyFocus: boolean
	}
	export class Pad extends Container implements zimComponent {
		constructor(config_or_width?: number, cols?: number, rows?: number, keys?: string[] | {}[], backgroundColor?: color, rollBackgroundColor?: color, downBackgroundColor?: color, selectedBackgroundColor?: color, selectedRollBackgroundColor?: color, color?: color, rollColor?: color, downColor?: color, selectedColor?: color, selectedRollColor?: color, spacing?: number, currentEnabled?: boolean, currentSelected?: boolean, corner?: number | any[], labelColor?: color, gradient?: number, gloss?: number, backing?: DisplayObject, rollBacking?: DisplayObject, wait?: string, waitTime?: number, waitBackgroundColor?: color, rollWaitBackgroundColor?: color, waitColor?: color, rollWaitColor?: color, waitModal?: boolean, waitEnabled?: boolean, index?: number, selectedIndex?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, cols?: number, rows?: number, keys?: string[] | {}[], backgroundColor?: color, rollBackgroundColor?: color, downBackgroundColor?: color, selectedBackgroundColor?: color, selectedRollBackgroundColor?: color, color?: color, rollColor?: color, downColor?: color, selectedColor?: color, selectedRollColor?: color, spacing?: number, currentEnabled?: boolean, currentSelected?: boolean, corner?: number | any[], labelColor?: color, gradient?: number, gloss?: number, backing?: DisplayObject, rollBacking?: DisplayObject, wait?: string, waitTime?: number, waitBackgroundColor?: color, rollWaitBackgroundColor?: color, waitColor?: color, rollWaitColor?: color, waitModal?: boolean, waitEnabled?: boolean, index?: number, selectedIndex?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		index: number
		selectedIndex: number
		selected: Button
		color: color
		rollColor: color
		offColor: color
		text: string
		label: Label
		buttons: Button[]
		labels: Label[]
		tabs: Tabs[]
		keyEnabled: boolean
	}
	export class NumPad extends Container implements zimComponent {
		constructor(config_or_advanced?: boolean | string, titleBar?: string | Label, titleBarColor?: color, titleBarBackroundColor?: color, titleBarHeight?: number, backgroundColor?: color, borderColor?: color, borderWidth?: number, corner?: number | any[], numberCorner?: number | any[], close?: boolean, closeColor?: color, collapse?: boolean, collapseColor?: color, collapsed?: boolean, align?: string, shadowColor?: color, shadowBlur?: number, draggable?: boolean, boundary?: Boundary | {}, style?: boolean, group?: string, inherit?: {})
		constructor(config: { advanced?: boolean | string, titleBar?: string | Label, titleBarColor?: color, titleBarBackroundColor?: color, titleBarHeight?: number, backgroundColor?: color, borderColor?: color, borderWidth?: number, corner?: number | any[], numberCorner?: number | any[], close?: boolean, closeColor?: color, collapse?: boolean, collapseColor?: color, collapsed?: boolean, align?: string, shadowColor?: color, shadowBlur?: number, draggable?: boolean, boundary?: Boundary | {}, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		key: number | string
		pad: Pad
	}
	export class DPad extends Container implements zimComponent {
		constructor(config_or_axis?: string, width?: number, backgroundColor?: color, indicatorColor?: color, indicatorPressColor?: color, indicatorScale?: number, indicatorRadius?: number, innerCircle?: boolean, innerScale?: number, activeRadius?: number, clamp?: boolean, logo?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { axis?: string, width?: number, backgroundColor?: color, indicatorColor?: color, indicatorPressColor?: color, indicatorScale?: number, indicatorRadius?: number, innerCircle?: boolean, innerScale?: number, activeRadius?: number, clamp?: boolean, logo?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		readonly dirX: number
		readonly dirY: number
	}
	export class Radial extends Container implements zimComponent {
		constructor(config_or_labels?: string[] | number[] | Label[], size?: number, font?: string, startAngle?: number, totalAngle?: number, angles?: number[], flip?: boolean, shiftRadial?: number, icons?: DisplayObject[], rollIcons?: DisplayObject[], rotateIcons?: boolean, iconsShiftRadial?: number, height?: number, coreRadius?: number, coreColor?: number, backgroundColor?: color, rollBackgroundColor?: color, selectedBackgroundColor?: color, selectedRollBackgroundColor?: color, backdropColor?: color, color?: color, rollColor?: color, selectedColor?: color, selectedRollColor?: color, borderColor?: color, borderWidth?: number, gradient?: number, gap?: number, gapAsAngle?: boolean, spacing?: number, spacingInner?: number, spacingOuter?: number, currentEnabled?: boolean, currentSelected?: boolean, index?: number, selectedIndex?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { labels?: string[] | number[] | Label[], size?: number, font?: string, startAngle?: number, totalAngle?: number, angles?: number[], flip?: boolean, shiftRadial?: number, icons?: DisplayObject[], rollIcons?: DisplayObject[], rotateIcons?: boolean, iconsShiftRadial?: number, height?: number, coreRadius?: number, coreColor?: number, backgroundColor?: color, rollBackgroundColor?: color, selectedBackgroundColor?: color, selectedRollBackgroundColor?: color, backdropColor?: color, color?: color, rollColor?: color, selectedColor?: color, selectedRollColor?: color, borderColor?: color, borderWidth?: number, gradient?: number, gap?: number, gapAsAngle?: boolean, spacing?: number, spacingInner?: number, spacingOuter?: number, currentEnabled?: boolean, currentSelected?: boolean, index?: number, selectedIndex?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		index: number
		selectedIndex: number
		readonly text: string
		readonly label: Label
		readonly selected: DisplayObject
		readonly buttons: Container
		readonly angles: number[]
		readonly core: Circle
	}
	export class RadialMenu extends Container implements zimComponent {
		constructor(config_or_menu?: {}, size?: number, font?: string, startAngle?: number, totalAngle?: number, flip?: boolean, shiftRadial?: number, rotateIcons?: boolean, iconsShiftRadial?: number, height?: number, coreRadius?: number, coreColor?: number, title?: string, titleIcon?: DisplayObject, backgroundColor?: color, rollBackgroundColor?: color, selectedBackgroundColor?: color, selectedRollBackgroundColor?: color, backdropColor?: color, color?: color, rollColor?: color, selectedColor?: color, selectedRollColor?: color, borderColor?: color, borderWidth?: number, gradient?: number, gap?: number, gapAsAngle?: boolean, spacing?: number, spacingInner?: number, spacingOuter?: number, currentEnabled?: boolean, currentSelected?: boolean, open?: boolean, under?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { menu?: {}, size?: number, font?: string, startAngle?: number, totalAngle?: number, flip?: boolean, shiftRadial?: number, rotateIcons?: boolean, iconsShiftRadial?: number, height?: number, coreRadius?: number, coreColor?: number, title?: string, titleIcon?: DisplayObject, backgroundColor?: color, rollBackgroundColor?: color, selectedBackgroundColor?: color, selectedRollBackgroundColor?: color, backdropColor?: color, color?: color, rollColor?: color, selectedColor?: color, selectedRollColor?: color, borderColor?: color, borderWidth?: number, gradient?: number, gap?: number, gapAsAngle?: boolean, spacing?: number, spacingInner?: number, spacingOuter?: number, currentEnabled?: boolean, currentSelected?: boolean, open?: boolean, under?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		closeRings(): void
		readonly index: number
		readonly selectedLevel: number
		readonly outerLevel: number
		readonly outerMenu: Radial
		readonly text: string
		readonly label: Label
		readonly selected: DisplayObject
		readonly core: Circle
	}
	export class ColorPicker extends Container implements zimComponent {
		constructor(config_or_width?: number, colors?: string | [color], cols?: number, spacing?: number, greyPicker?: boolean, alphaPicker?: boolean, startBackgroundColor?: color, draggable?: boolean, shadowColor?: color, shadowBlur?: number, buttonBar?: boolean, circles?: boolean, indicator?: boolean, backgroundColor?: color, keyArrows?: boolean, index?: number, selectedColor?: string, dropperTarget?: DisplayObject, spectrumCollapse?: boolean, spectrumMode?: boolean, spectrumClose?: boolean, spectrumOk?: boolean, spectrumTitle?: string, tolerancePicker?: boolean, collapsed?: boolean, selectedIndex?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, colors?: string | [color], cols?: number, spacing?: number, greyPicker?: boolean, alphaPicker?: boolean, startBackgroundColor?: color, draggable?: boolean, shadowColor?: color, shadowBlur?: number, buttonBar?: boolean, circles?: boolean, indicator?: boolean, backgroundColor?: color, keyArrows?: boolean, index?: number, selectedColor?: string, dropperTarget?: DisplayObject, spectrumCollapse?: boolean, spectrumMode?: boolean, spectrumClose?: boolean, spectrumOk?: boolean, spectrumTitle?: string, tolerancePicker?: boolean, collapsed?: boolean, selectedIndex?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		show(): this
		hide(): this
		toggle(state?: boolean): this
		toggleSpectrum(state?: boolean): this
		collapse(state?: boolean): this
		updateDropperTarget(): this
		selectedColor: color
		value: string
		currentValue: string
		currentValueEvent: string
		readonly selectedAlpha: number
		readonly index: number
		readonly swatch: Rectangle
		readonly swatchbackground: Shape
		readonly swatchText: Label
		readonly grip: Shape
		readonly background: Rectangle
		readonly okBut: Button
		readonly closeBut: Button
		readonly indicator: Shape
		readonly alpaBacking: Rectangle
		readonly alphaBut: Button
		readonly alphaSlider: Slider
		readonly alphaText: Label
		keyFocus: boolean
	}
	export class EmojiPicker extends Window implements zimComponent {
		constructor(config_or_width?: number, height?: number, emojis?: [string], monochrome?: boolean, backgroundColor?: color, titleBar?: string, titleBarColor?: color, titleBarBackgroundColor?: color, titleBarHeight?: number, cache?: boolean, size?: number, collapse?: boolean, collapsedColor?: color, collapsed?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, emojis?: [string], monochrome?: boolean, backgroundColor?: color, titleBar?: string, titleBarColor?: color, titleBarBackgroundColor?: color, titleBarHeight?: number, cache?: boolean, size?: number, collapse?: boolean, collapsedColor?: color, collapsed?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		readonly selectedEmoji: Emoji
		readonly emojiData: [string]
	}
	export class TextEditor extends Container implements zimComponent {
		constructor(config_or_width?: number, color?: string, backgroundColor?: string, fieldColor?: string, fieldHeight?: number, textSize?: number, sizeList?: boolean, optionList?: boolean, colorList?: boolean, fontList?: boolean, live?: boolean, button?: Button, titleBar?: string, titleBarColor?: string, titleBarBackgroundColor?: string, titleBarHeight?: number, wrap?: boolean, limit?: number, scroll?: boolean, placeholder?: string, password?: boolean, borderColor?: string, borderWidth?: number, margin?: number, corner?: number, shadowColor?: string, shadowBlur?: number, draggable?: boolean, boundary?: Boundary, frame?: Frame, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, color?: string, backgroundColor?: string, fieldColor?: string, fieldHeight?: number, textSize?: number, sizeList?: boolean, optionList?: boolean, colorList?: boolean, fontList?: boolean, live?: boolean, button?: Button, titleBar?: string, titleBarColor?: string, titleBarBackgroundColor?: string, titleBarHeight?: number, wrap?: boolean, limit?: number, scroll?: boolean, placeholder?: string, password?: boolean, borderColor?: string, borderWidth?: number, margin?: number, corner?: number, shadowColor?: string, shadowBlur?: number, draggable?: boolean, boundary?: Boundary, frame?: Frame, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		show(label: Label, x?: number, y?: number): this
		hide(): this
		readonly textArea: TextArea
		readonly label: Label
		readonly button: Button
		readonly color: Rectangle
		readonly colorPicker: ColorPicker
		readonly bold: Button
		readonly italic: Button
		readonly align: Selector
		readonly size: Stepper
		readonly font: List
	}
	export class Keyboard extends Container implements zimComponent {
		constructor(config_or_labels?: Label[] | Label, backgroundColor?: color, color?: color, shiftBackgroundColor?: color, shiftHoldBackgroundColor?: color, placeBackgroundColor?: color, placeColor?: color, cursorColor?: color, shadeAlpha?: number, borderColor?: color, borderWidth?: number, margin?: number, corner?: number | any[], draggable?: boolean, placeClose?: boolean, shadowColor?: color, shadowBlur?: number, container?: Container, data?: [any], place?: boolean, placeShiftH?: number, placeShiftV?: number, placeScale?: number, special?: string, rtl?: boolean, hardKeyboard?: boolean, layout?: string, numPadScale?: number, numPadDraggable?: boolean, numPadOnly?: boolean, numPadAdvanced?: boolean, maxLength?: number, numbersOnly?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { labels?: Label[] | Label, backgroundColor?: color, color?: color, shiftBackgroundColor?: color, shiftHoldBackgroundColor?: color, placeBackgroundColor?: color, placeColor?: color, cursorColor?: color, shadeAlpha?: number, borderColor?: color, borderWidth?: number, margin?: number, corner?: number | any[], draggable?: boolean, placeClose?: boolean, shadowColor?: color, shadowBlur?: number, container?: Container, data?: [any], place?: boolean, placeShiftH?: number, placeShiftV?: number, placeScale?: number, special?: string, rtl?: boolean, hardKeyboard?: boolean, layout?: string, numPadScale?: number, numPadDraggable?: boolean, numPadOnly?: boolean, numPadAdvanced?: boolean, maxLength?: number, numbersOnly?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		show(index?: number): this
		hide(): this
		showPlace(): this
		hidePlace(): this
		addLabels(labels: Label[] | Label): this
		removeLabels(labels: Label[] | Label): this
		resize(): this
		readonly data: any[]
		readonly labels: Label[]
		readonly placeMenu: Container
		selectedLabel: Label
		index: number
		keys: Container
		numPad: NumPad
		maxLength: number
		numbersOnly: boolean
	}
	export class Organizer extends Tabs implements zimComponent {
		constructor(config_or_width?: number, list?: List, useAdd?: boolean, useRemove?: boolean, usePosition?: boolean, autoAdd?: boolean, autoRemove?: boolean, autoPosition?: boolean, addForward?: boolean, removeForward?: boolean, backgroundColor?: color, rollBackgroundColor?: color, selectedBackgroundColor?: color, color?: color, rollColor?: color, selectedColor?: color, selectedRollColor?: color, spacing?: number, corner?: number | any[], keyEnabled?: boolean, gradient?: number, gloss?: number, backdropColor?: color, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, list?: List, useAdd?: boolean, useRemove?: boolean, usePosition?: boolean, autoAdd?: boolean, autoRemove?: boolean, autoPosition?: boolean, addForward?: boolean, removeForward?: boolean, backgroundColor?: color, rollBackgroundColor?: color, selectedBackgroundColor?: color, color?: color, rollColor?: color, selectedColor?: color, selectedRollColor?: color, spacing?: number, corner?: number | any[], keyEnabled?: boolean, gradient?: number, gloss?: number, backdropColor?: color, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		add(index?: number, item?: any, clone?: boolean): this
		up(index?: number): this
		down(index?: number): this
		toTop(index?: number): this
		toBottom(index?: number): this
		remove(index?: number): this
		setButtons(): this
		list: List
		readonly lastIndex: number
		readonly orgIndex: number
		readonly orgItem: string | DisplayObject
		readonly orgType: string
		readonly removedItem: DisplayObject
	}
	export class Scrambler extends Container implements zimComponent {
		constructor(config_or_tile?: Tile, keys?: [any], keyProperty?: string, scramble?: boolean, time?: number, wait?: number, num?: number, shadowColor?: string, shadowBlur?: number, swap?: boolean, swapLock?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { tile?: Tile, keys?: [any], keyProperty?: string, scramble?: boolean, time?: number, wait?: number, num?: number, shadowColor?: string, shadowBlur?: number, swap?: boolean, swapLock?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		scramble(time?: number, wait?: number, num?: number): this
		solve(time?: number, wait?: number, disable?: boolean): this
		test(): this
		update(): this
		testItem(item: DisplayObject, index?: number): this
		readonly tile: Tile
		readonly complete: boolean
		readonly starts: [number]
		readonly order: [number]
	}
	export class Connectors extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, points?: [] | zim.Blob | Squiggle, node?: DisplayObject, line?: Line, linear?: boolean, linearWrap?: boolean, linearOrder?: boolean, num?: number, snapH?: number, snapV?: number, dropType?: string, dropArray?: [number], continuous?: boolean, startIndex?: number, duplicateLines?: boolean, deleteNode?: boolean, dblclick?: boolean, fullMove?: boolean, min?: number, max?: number, boundary?: Boundary | DisplayObject, expand?: number, nodeRollColor?: string, nodeRollBorderColor?: string, nodeSelectedColor?: string, nodeSelectedBorderColor?: string, baseColor?: string, baseBorderColor?: string, baseRollover?: string, rootLock?: boolean, grandChildren?: boolean, dblclickTime?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, points?: [] | zim.Blob | Squiggle, node?: DisplayObject, line?: Line, linear?: boolean, linearWrap?: boolean, linearOrder?: boolean, num?: number, snapH?: number, snapV?: number, dropType?: string, dropArray?: [number], continuous?: boolean, startIndex?: number, duplicateLines?: boolean, deleteNode?: boolean, dblclick?: boolean, fullMove?: boolean, min?: number, max?: number, boundary?: Boundary | DisplayObject, expand?: number, nodeRollColor?: string, nodeRollBorderColor?: string, nodeSelectedColor?: string, nodeSelectedBorderColor?: string, baseColor?: string, baseBorderColor?: string, baseRollover?: string, rootLock?: boolean, grandChildren?: boolean, dblclickTime?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		addNode(x: number|DisplayObject, y: number|[], startNode?:boolean, endNode?:boolean, startLength?:number, endLength?:number): this
		removeNode(node: DisplayObject): this
		removeConnectors(): this
		selectNode(node: DisplayObject, children?: boolean): this
		getSteps(popup?: boolean): this
		setSteps(steps: []): this
		addBase(base: DisplayObject, baseInfo?: number | []): this
		removeBase(base: DisplayObject): this
		setAvailableIndexes(indexes: number | [number]): this
		node: DisplayObject
		creator: DisplayObject
		line: Line
		readonly steps: []
		readonly nodes: Container
		readonly lines: Container
		readonly points: []
		readonly selectedList: []
		readonly bases: []
	}
	export class Marquee extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, items?: [any], transition?: string, speed?: number, direction?: string, marginLeft?: number, marginRight?: number, marqueeType?: string, borderColor?: color, borderWidth?: number, refresh?: number, mix?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, items?: [any], transition?: string, speed?: number, direction?: string, marginLeft?: number, marginRight?: number, marqueeType?: string, borderColor?: color, borderWidth?: number, refresh?: number, mix?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		add(obj: any, url?: string, target?: string): this
		remove(obj: any): this
		go(obj: any): this
		pause(state?: boolean, immediate?: boolean): this
		load(data: string | [any] | {}, path?: string): this
		readonly content: DisplayObject
		readonly pages: Pages
		readonly button: Button
		readonly indicator: Indicator
		readonly index: number
		readonly selected: DisplayObject
		readonly lastSelected: DisplayObject
		time: number
		readonly speed: number
		readonly paused: boolean
		readonly interval: boolean
		readonly left: Container
		readonly right: Container
		readonly icon: Container
		readonly label: Label
		readonly marqueeLoader: Queue
	}
	export class Carousel extends Container implements zimComponent {
		constructor(config_or_items?: [DisplayObject | string], viewNum?: number, time?: number, spacing?: number, backgroundColor?: color, backing?: DisplayObject, padding?: number, paddingH?: number, paddingV?: number, arrowLeft?: Arrow, arrowRight?: Arrow, arrowGap?: number, valign?: string, ease?: string, swipe?: boolean, remember?: string | boolean, index?: number, continuous?: boolean, selectedIndex?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { items?: [DisplayObject | string], viewNum?: number, time?: number, spacing?: number, backgroundColor?: color, backing?: DisplayObject, padding?: number, paddingH?: number, paddingV?: number, arrowLeft?: Arrow, arrowRight?: Arrow, arrowGap?: number, valign?: string, ease?: string, swipe?: boolean, remember?: string | boolean, index?: number, continuous?: boolean, selectedIndex?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		goRight(time?: number): this
		goLeft(time?: number): this
		cycle(cycleTime?: number | zimVee, transitionTime?: number, bounce?: boolean, bounceNum?: number, recycle?: number, rtl?: string): this
		cycleClear(): this
		disableArrows(): this
		enableArrows(): this
		index: number
		selectedIndex: number
		readonly items: [DisplayObject]
		readonly tile: Tile
		readonly viewNum: number
		readonly itemWidth: number
		readonly itemHeight: number
		readonly spacing: number
		readonly arrowLeft: Arrow
		readonly arrowRight: Arrow
		swipe: boolean
		readonly bounceTotal: number
		readonly swipeObj: Swipe
		readonly cycleInterval: number
		readonly recycleEvent: any
		readonly recycleWait: Function
		readonly background: Rectangle
		readonly backing: Rectangle
	}
	export class Carousel3D extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, items?: DisplayObject, widthFactor?: number, heightFactor?: number, curve?: number, interactive?: boolean, continuous?: number, fade?: number, fadeColor?: color, vertical?: boolean, sensitivity?: number, damp?: number, factor?: number, index?: number, selectedIndex?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, items?: DisplayObject, widthFactor?: number, heightFactor?: number, curve?: number, interactive?: boolean, continuous?: number, fade?: number, fadeColor?: color, vertical?: boolean, sensitivity?: number, damp?: number, factor?: number, index?: number, selectedIndex?: number, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
        go(index?:number, immediate?:boolean, wrap?:boolean):this
        prev(immediate?:boolean):this
        next(immediate?:boolean):this
        addItem(item:DisplayObject, index?:number):this
        removeItem(index?:number, num?:number):this
        makeCarousel():this
		index: number
        readonly selectedItem:DisplayObject
        items: [DisplayObject]
        curve: number
        continuous: boolean
        readonly swiper: Swiper
        readonly backing: Rectangle
        readonly holder: Container
	}
	export class Loader extends Button implements zimComponent {
		constructor(config_or_width?: number | string, height?: number | string, label?: string | Label, type?: string, backgroundColor?: color, rollBackgroundColor?: color, color?: color, rollColor?: color, borderColor?: color, borderWidth?: number, corner?: number | any[], shadowColor?: color, shadowBlur?: number, hitPadding?: number, gradient?: number, gloss?: number, dashed?: boolean | [number], backing?: DisplayObject, rollBacking?: DisplayObject, rollPersist?: boolean, icon?: DisplayObject, rollIcon?: DisplayObject, toggle?: string, rollToggle?: DisplayObject, toggleEvent?: string, frame?: Frame, multiple?: boolean, accept?: [any], style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number | string, height?: number | string, label?: string | Label, type?: string, backgroundColor?: color, rollBackgroundColor?: color, color?: color, rollColor?: color, borderColor?: color, borderWidth?: number, corner?: number | any[], shadowColor?: color, shadowBlur?: number, hitPadding?: number, gradient?: number, gloss?: number, dashed?: boolean | [number], backing?: DisplayObject, rollBacking?: DisplayObject, rollPersist?: boolean, icon?: DisplayObject, rollIcon?: DisplayObject, toggle?: string, rollToggle?: DisplayObject, toggleEvent?: string, frame?: Frame, multiple?: boolean, accept?: [any], style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		resize(): this
		save(content?: DisplayObject, x?: number, y?: number, width?: number, height?: number, url?: string, cached?: boolean, cachedBounds?: any, type?: string, data?: boolean): this
		tag: HTMLInputElement
	}
	export class TextArea extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, size?: number, padding?: number, color?: color, backgroundColor?: color, borderColor?: color, borderWidth?: number, corner?: number | any[], shadowColor?: color, shadowBlur?: number, dashed?: boolean | [number], id?: string, placeholder?: string, readOnly?: boolean, spellCheck?: boolean, password?: boolean, wrap?: boolean, maxLength?: number, frame?: Frame, keyboardShift?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, size?: number, padding?: number, color?: color, backgroundColor?: color, borderColor?: color, borderWidth?: number, corner?: number | any[], shadowColor?: color, shadowBlur?: number, dashed?: boolean | [number], id?: string, placeholder?: string, readOnly?: boolean, spellCheck?: boolean, password?: boolean, wrap?: boolean, maxLength?: number, frame?: Frame, keyboardShift?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		setFocus(type: boolean): this
		resize(): this
		value: string
		currentValue: string
		text: string
		focus: boolean
		readOnly: boolean
		tag: HTMLTextAreaElement
		background: Rectangle
		keyFocus: boolean
	}

	export class Tag extends Container implements zimComponent {
		constructor(config_or_width?: number, height?: number, id?: string, frame?: Frame, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, id?: string, frame?: Frame, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		add(htmlString: string): this
		resize(): this
		readonly tagID: string
		tag: HTMLDivElement
		innerHTML: string
	}

	// ++++++++++++++++++++++++++++++++++++++
	// ZIM CONTROLS
	export var ANIMATE: boolean
	export var OPTIMIZE: boolean
	export var ACTIONEVENT: string
	export var STYLE: {}
	export var GLOBALSTYLE: {}
	export class Style {
		static clear(): void
		static clearTypes(): void
		static clearGroups(): void
		static remembered: string
		static remember(id?: string): void
		static clearRemembered(id?: string): void
		static recall(id?: string): void
		static add(obj: {}): void
		static addType(typeName: string, obj: {}): void
		static addGroup(groupName: string, obj: {}): void
		static remove(styleName: string): void
		static removeType(typeName: string): void
		static removeGroup(groupName: string): void
	}
	export var POSREG: boolean
	export var DRAGALL: boolean
	export var Ticker: {
		always: (stage?: Stage) => void,
		alwaysOff: (stage?: Stage) => void,
		add: (f: Function, stage?: Stage) => void,
		remove: (f: Function) => void,
		removeAll: (stage?: Stage) => void,
		has: (f: Function, stage?: Stage) => boolean,
		setFPS: (mobile?: Function, pc?: Stage) => void,
		setTimingMode: (mode?: string) => void,
		raw: (f: Function) => void,
		removeRaw: (id: any) => void,
		dispose: (stage?: Stage) => void,
		update: boolean,
		list: Dictionary,
		framerate: number,
	}
	export class Accessibility extends createjs.EventDispatcher {
		constructor(config_or_appName?: string, tabOrder?: DisplayObject[], tabIndex?: number, cycle?: boolean, decimals?: number, frame?: Frame, application?: boolean, alwaysHighlight?: boolean, AHTime?: number, AHColor?: color, AHBorderWidth?: number, AHBorderPadding?: number, AHAlpha?: number, AHObject?: DisplayObject, AHObjectScale?: number)
		constructor(config: { appName?: string, tabOrder?: DisplayObject[], tabIndex?: number, cycle?: boolean, decimals?: number, frame?: Frame, application?: boolean, alwaysHighlight?: boolean, AHTime?: number, AHColor?: color, AHBorderWidth?: number, AHBorderPadding?: number, AHAlpha?: number, AHObject?: DisplayObject, AHObjectScale?: number })
		tab(dir: 1 | -1): void
		changeTitle(DisplayObject: number, title?: string, activate?: boolean): void
		talk(words: string): void
		resize(target?: DisplayObject): void
		readonly type: string
		tabOrder: DisplayObject[]
		tabIndex: number
		currentObject: DisplayObject
		readonly activatedObject: DisplayObject
		readonly startAppTag: HTMLElement
		readonly endAppTag: HTMLElement
		cycle: boolean
		decimals: number
		readonly frame: Frame
		alwaysHighlight: boolean
		AHTime: number
		AHColor: color
		AHBorderWidth: number
		AHBorderPadding: number
		AHAlpha: number
		AHObject: DisplayObject
		AHObjectScale: number
		enabled: boolean
	}
	export class TextureActive extends Page implements zimComponent {
		constructor(config_or_width?: number, height?: number, color?: string, color2?: string, angle?: number, borderColor?: color, borderWidth?: number, corner?: number | any[], interactive?: boolean, animated?: boolean, backingOrbit?: boolean, pattern?: DisplayObject, scalePattern?: string, cache?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, color?: string, color2?: string, angle?: number, borderColor?: color, borderWidth?: number, corner?: number | any[], interactive?: boolean, animated?: boolean, backingOrbit?: boolean, pattern?: DisplayObject, scalePattern?: string, cache?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		static makeLogo(shade?: string, mouse?: boolean): Container
		static makeBacking(width?: number, height?: number, text?: string, color?: color): Container
		readonly interactive: boolean
		readonly animated: boolean
        readonly canvas: HTMLCanvasElement
		backingOrbit: boolean
	}
	export class TextureActives extends createjs.EventDispatcher {
		constructor(config_or_actives: TextureActive | [TextureActive], threejs: any, zimThree?: any, renderer?: any, scene?: any, camera?: any, controls?: any, layers?: number, near?: number, far?: number, ignoreList?: any[], toggleKey?: string, color?: color, outerColor?: color, style?: boolean, group?: string, inherit?: {})
		constructor(config: { actives: TextureActive | [TextureActive], threejs: any, zimThree?: any, renderer?: any, scene?: any, camera?: any, controls?: any, layers?: number, near?: number, far?: number, ignoreList?: any[], toggleKey?: string, color?: color, outerColor?: color, style?: boolean, group?: string, inherit?: {} })
		add(actives: TextureActive | [TextureActive]): this
		remove(actives: TextureActive | [TextureActive]): this
		addMesh(mesh: any, layer?: number): this
        dispose(): void
		readonly interactive: boolean
		readonly animated: boolean
		readonly manager: TextureActivesManager
		ignoreList: any[]
		readonly raycaster: any
		raycast: boolean
		readonly renderer: any
		readonly layers: any[]
		readonly actives: any[]
		readonly threeMeshes: any[]
	}
	export class TextureActivesManager extends createjs.EventDispatcher {
		constructor(stage?: Stage | StageGL, toggleKey?: string)
		toggle(state?: boolean): this
		show(): this
		hide(): this
        dispose(): void
		readonly toggled: boolean
		readonly tile: Tile
		readonly objects: Dictionary
		color: color
		outerColor: color
		readonly backing: Rectangle
		readonly nav: Panel
		readonly slider: Slider
		readonly swiper: Swiper
	}
	export class Swipe extends createjs.EventDispatcher {
		constructor(config_or_obj: DisplayObject, distance?: number, duration?: number)
		constructor(config: { obj: DisplayObject, distance?: number, duration?: number })
		enable(): void
		disable(): void
		readonly type: string
		distance: number
		duration: number
		direction: string
		obj: DisplayObject
		active: boolean
	}
	export class Pages extends Container {
		constructor(config_or_pages?: DisplayObject[] | { page: DisplayObject, swipe?: DisplayObject[] }[], transition?: string, speed?: number, transitionTable?: any[][], holder?: Stage | Container, arrowDisableColor?: color, style?: boolean, group?: string, inherit?: {})
		constructor(config: { pages?: DisplayObject[] | { page: DisplayObject, swipe?: DisplayObject[] }[], transition?: string, speed?: number, transitionTable?: any[][], holder?: Stage | Container, arrowDisableColor?: color, style?: boolean, group?: string, inherit?: {} })
		addPage(page: DisplayObject, swipeArray?: string[]): this
		removePage(page: DisplayObject): this
		setSwipeArray(page: DisplayObject, swipeArray?: string[]): this
		go(newPage: DisplayObject | number, direction: string, trans?: string, ms?: number): this
		resize(): this
		pause(): this
		unpause(): this
		puff(time: number): this
		settle(): this
		disable(): this
		enable(): this
		dispose(): boolean
		readonly type: string
		speed: number
		transitionTable: any[][]
		readonly page: DisplayObject
		pages: DisplayObject[] | { page: DisplayObject, swipe?: DisplayObject[] }[]
		readonly lastPage: DisplayObject
		readonly direction: string
		readonly transitioning: boolean
		active: boolean
		swipe: Swipe
	}
	export class Arrow extends Button {
		constructor(config_or_backgroundColor?: color, rollBackgroundColor?: color, pages?: Pages, direction?: string, type?: string, newPage?: DisplayObject, trans?: string, speed?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { backgroundColor?: color, rollBackgroundColor?: color, pages?: Pages, direction?: string, type?: string, newPage?: DisplayObject, trans?: string, speed?: number, style?: boolean, group?: string, inherit?: {} })
		activate(state?: boolean, offColor?: color): this
		setDisabled: boolean
	}
	export class HotSpots extends Container {
		constructor(config_or_spots: { page: Container, rect: number[] | DisplayObject, call: Function }[], local?: boolean, mouseDowns?: boolean)
		constructor(config: { spots: { page: Container, rect: number[] | DisplayObject, call: Function }[], local?: boolean, mouseDowns?: boolean })
		show(): void
		hide(): void
		addHotSpot(page: DisplayObject, rect: number[] | DisplayObject, call: Function): void
		removeHotSpots(page: DisplayObject, rect: number[] | DisplayObject): void
		readonly type: string
	}
	export class HotSpot extends Container {
		constructor(config_or_obj: Stage | Container, x: number, y: number, width: number, height: number, call: Function, local?: boolean)
		constructor(config: { obj: Stage | Container, x: number, y: number, width: number, height: number, call: Function, local?: boolean })
		show(): void
		hide(): void
		readonly type: string
	}
	export class Manager {
		constructor()
		add(element: DisplayObject | DisplayObject[]): void
		remove(element: DisplayObject | DisplayObject[]): void
		resize(): void
		dispose(): boolean
		toggle(state?: boolean): this
		readonly type: string
		items: DisplayObject[]
	}
	export class ResizeManager extends Manager {
		constructor()
	}
	export class TransformManager extends Manager {
		constructor(objects: DisplayObject | DisplayObject[], persistID?: string)
		show(obj: DisplayObject): this
		hide(obj: DisplayObject): this
		hideAll(): void
		persist(id: string): void
		clearPersist(id: string): void
		savePersist(): void
		stopPersist(): void
		readonly type: string
		currentObject: DisplayObject
		persistData: any // could be data for Blob, Squiggle, transform
	}
	export class Guide extends Container {
		constructor(config_or_obj?: Stage | Container, vertical?: boolean, percent?: boolean, hideKey?: string, pixelKey?: string, style?: boolean, group?: string, inherit?: {})
		constructor(config: { obj?: Stage | Container, vertical?: boolean, percent?: boolean, hideKey?: string, pixelKey?: string, style?: boolean, group?: string, inherit?: {} })
		resize(): void
		readonly type: string
		pixels: boolean
	}
	export class GuideManager extends Manager {
		constructor()
	}
	export class Grid extends Container {
		constructor(config_or_obj?: Stage | Container, color?: color, percent?: boolean, hideKey?: string, pixelKey?: string, allowToggle?: boolean, cache?: boolean, numbers?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { obj?: Stage | Container, color?: color, percent?: boolean, hideKey?: string, pixelKey?: string, allowToggle?: boolean, cache?: boolean, numbers?: boolean, style?: boolean, group?: string, inherit?: {} })
		resize(): void
		readonly type: string
		pixels: boolean
		numbersX: boolean
		numbersY: boolean
	}
	export class GridManager extends Manager {
		constructor()
	}
	export class Layout extends createjs.EventDispatcher {
		constructor(config_or_holder: Stage | Container, regions: {}[], lastMargin?: number | string, lastMarginMin?: number, backgroundColor?: color, vertical?: boolean, showRegions?: boolean, scalingObject?: Stage | Container, hideKey?: string, style?: boolean, group?: string, inherit?: {})
		constructor(config: { holder: Stage | Container, regions: {}[], lastMargin?: number | string, lastMarginMin?: number, backgroundColor?: color, vertical?: boolean, showRegions?: boolean, scalingObject?: Stage | Container, hideKey?: string, style?: boolean, group?: string, inherit?: {} })
		resize(): void
		dispose(): boolean
		addShape(shape: Shape): void
		removeShape(): void
		disable(): void
		enable(): void
		toggle(state?: boolean): this
		readonly type: string
		readonly toggled: boolean
		regions: {}[]
		readonly backing: Shape
	}
	export class LayoutManager extends Manager {
		constructor()
		enable(): void
		disable(): void
	}
	export class SelectionSet {
		constructor(selections?: any[])
		readonly type: string
		items: any[]
		clear(): void
		isSelected(item: any): boolean
		toggle(item: any, multiple?: boolean, match?: SelectionSet, unmatch?: SelectionSet): void
		add(item: any, multiple?: boolean, match?: SelectionSet, unmatch?: SelectionSet): void
		remove(item: any, multiple?: boolean, match?: SelectionSet, unmatch?: SelectionSet): void
		dispose(): boolean
	}
	export class SelectionManager extends createjs.EventDispatcher {
		constructor(sets?: [SelectionSet], multipleKey?: boolean, multipleSets?: boolean)
		readonly type: string
		sets: [SelectionSet]
		multipleKey: string
		readonly multiple: boolean
		readonly ctrlKey: boolean
		readonly shiftKey: boolean
		readonly metaKey: boolean
		clear(): void
		setCurrent(set: SelectionSet): void
		dispose(): boolean
	}

	export class Bind {
		constructor(config_or_connection?: string, bindType?: string, master?: string | number, masterFilter?: Function, couple?: boolean, smartDecimals?: boolean, report?: boolean, setDefault?: boolean)
		constructor(config: { connection?: string, bindType?: string, master?: string | number, masterFilter?: Function, couple?: boolean, smartDecimals?: boolean, report?: boolean, setDefault?: boolean })
		add(config_or_id: string, obj: DisplayObject, props?: string | [string], extra?: string | number, filter?: Function): this
		add(config: { id: string, obj: DisplayObject, props?: string | [string], extra?: string | number, filter?: Function }): this
		remove(config_or_targets?: string, props?: string | [string], extra?: string | number, filter?: Function, removeConnectionData?: boolean, call?: Function): this
		remove(config: { targets?: string, props?: string | [string], extra?: string | number, filter?: Function, removeConnectionData?: boolean, call?: Function }): this
		from(config_or_call?: Function, targets?: DisplayObject | string | [DisplayObject | string], props?: string | [string], extra?: string | number, filter?: Function): this
		from(config: { call?: Function, targets?: DisplayObject | string | [DisplayObject | string], props?: string | [string], extra?: string | number, filter?: Function }): this
		to(config_or_targets?: DisplayObject | string | [DisplayObject | string], props?: string | [string], extra?: string | number, filter?: Function, smartDecimals?: boolean, call?: Function): this
		to(config: { targets?: DisplayObject | string | [DisplayObject | string], props?: string | [string], extra?: string | number, filter?: Function, smartDecimals?: boolean, call?: Function }): this
		toLock(config_or_targets?: DisplayObject | string | [DisplayObject | string], props?: string | [string], extra?: string | number, filter?: Function, smartDecimals?: boolean, call?: Function): this
		toLock(config: { targets?: DisplayObject | string | [DisplayObject | string], props?: string | [string], extra?: string | number, filter?: Function, smartDecimals?: boolean, call?: Function }): this
		toUnique(): this
		stop(): this
		report(): this
		toggleReport(state?: boolean): this
		applyData(): this
		updateFilter(id: string | number, func: Function | null): this
		clear(): this
		removeAllBindings(removeConnectionData?: boolean, call?: Function): this
		readonly type: string
		data: {}
		connection: string
		bindType: string
		master: string
		masterFilter: Function
		couple: boolean
		default: boolean
		smartDecimals: boolean
		stopped: boolean
		ajax: Ajax
		bindings: {}
		readonly ids: [string]
		objIDs: Dictionary
		toIDs: {}
		fromIDs: {}
	}

	export class Wrapper extends Container {
		constructor(config_or_width?: number, spacingH?: number, spacingV?: number, wrapperType?: string, align?: string, valign?: string, alignInner?: string, valignInner?: string, flip?: boolean, reverse?: boolean, bottomFull?: boolean, colSize?: number, rowSize?: number, height?: number, minSpreadNum?: number, minStretchNum?: number, percentVoidH?: number, offsetVoidH?: number, percentVoidV?: number, offsetVoidV?: number, minStretchFirst?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, spacingH?: number, spacingV?: number, wrapperType?: string, align?: string, valign?: string, alignInner?: string, valignInner?: string, flip?: boolean, reverse?: boolean, bottomFull?: boolean, colSize?: number, rowSize?: number, height?: number, minSpreadNum?: number, minStretchNum?: number, percentVoidH?: number, offsetVoidH?: number, percentVoidV?: number, offsetVoidV?: number, minStretchFirst?: boolean, style?: boolean, group?: string, inherit?: {} })
		add(items?: any[]): this
		addAt(items?: any[], index?: number): this
		remove(items?: any[]): this
		resize(width?: number, height?: number): this
		readonly type: string
		readonly items: any[]
		readonly items2D: any[]
		spacingH: number
		spacingV: number
		wrapperType: string
		align: string
		valign: string
		alignInner: string
		valignInner: string
		flip: boolean
		reverse: boolean
		bottomFull: boolean
		colSize: number
		rowSize: number
		percentVoidH: number
		offsetVoidH: number
		percentVoidV: number
		offsetVoidV: number
		readonly group: string
	}
	export class Tile extends Container {
		constructor(config_or_obj: DisplayObject | zimVee, cols?: number, rows?: number, spacingH?: number, spacingV?: number, unique?: boolean, width?: number, height?: number, squeezeH?: boolean, squeezeV?: boolean, colSize?: number | zimVee, rowSize?: number | zimVee, align?: string | zimVee, valign?: string | zimVee, count?: number, mirrorH?: boolean, mirrorV?: boolean, snapToPixel?: boolean, clone?: boolean, events?: boolean, exact?: boolean, scaleToH?: number | zimVee, scaleToV?: number | zimVee, scaleToType?: string | zimVee, backgroundColor?: color | zimVee, backing?: DisplayObject | zimVee, backdropColor?: color | zimVee, backdropPadding?: number, backdropPaddingH?: number, backdropPaddingV?: number, mat?: DisplayObject, style?: boolean, group?: string, inherit?: {})
		constructor(config: { obj: DisplayObject | zimVee, cols?: number, rows?: number, spacingH?: number, spacingV?: number, unique?: boolean, width?: number, height?: number, squeezeH?: boolean, squeezeV?: boolean, colSize?: number | zimVee, rowSize?: number | zimVee, align?: string | zimVee, valign?: string | zimVee, count?: number, mirrorH?: boolean, mirrorV?: boolean, snapToPixel?: boolean, clone?: boolean, events?: boolean, exact?: boolean, scaleToH?: number | zimVee, scaleToV?: number | zimVee, scaleToType?: string | zimVee, backgroundColor?: color | zimVee, backing?: DisplayObject | zimVee, backdropColor?: color | zimVee, backdropPadding?: number, backdropPaddingH?: number, backdropPaddingV?: number, mat?: DisplayObject, style?: boolean, group?: string, inherit?: {} })
		remake(items?: any[]): this
		resize(width?: number, height?: number): this
        setProps(obj: [], props: {}): this
		itemUnderPoint(x: number, y: number, ignoreSpacing?: boolean): DisplayObject
		readonly type: string
		readonly items: any[]
		readonly items2D: any[]
		readonly items2DCols: any[]
		readonly current: any[]
		readonly current2D: any[]
		readonly current2DCols: any[]
		cols: number
		rows: number
		spacingH: number
		spacingV: number
		squeezeH: boolean
		squeezeV: boolean
		align: string
		valign: string
		mirrorH: boolean
		mirrorV: boolean
		readonly group: string
	}
	export class Pack extends Container {
		constructor(config_or_width: number, height?: number, items?: [DisplayObject], spacingH?: number, spacingV?: number, flatten?: boolean, direction?: string, lock?: boolean, backgroundColor?: color, align?: string, valign?: string, lastAlign?: string, paddingH?: number, paddingV?: number, dragOrder?: boolean, dragColor?: color, dragThickness?: number, dragDashed?: boolean, reverse?: boolean, funnel?: boolean, showPacking?: boolean, order?: [any], style?: boolean, group?: string, inherit?: {})
		constructor(config: { width: number, height?: number, items?: [DisplayObject], spacingH?: number, spacingV?: number, flatten?: boolean, direction?: string, lock?: boolean, backgroundColor?: color, align?: string, valign?: string, lastAlign?: string, paddingH?: number, paddingV?: number, dragOrder?: boolean, dragColor?: color, dragThickness?: number, dragDashed?: boolean, reverse?: boolean, funnel?: boolean, showPacking?: boolean, order?: [any], style?: boolean, group?: string, inherit?: {} })
		getOrder(popup?: boolean): this
		setOrder(order: [any]): this
		addAt(items: DisplayObject | [DisplayObject], index?: number): this
		removeAt(number?: number, index?: number): this
		readonly type: string
		readonly items: any[]
		readonly currentItems: any[]
		readonly cols: number
		readonly rows: number
		flatten: boolean
		direction: string
		lock: string
		order: boolean
		dragOrder: boolean
		outerWidth: number
		outerHeight: number
		spacing: number
		readonly backing: Rectangle
		readonly ghost: Rectangle
		readonly beacon: Rectangle
	}
	export class Beads extends Container {
		constructor(config_or_path?: Blob | Squiggle, obj?: DisplayObject | zimVee, count?: number, angle?: number, startPercent?: number, percent?: number, percents?: [number], height?: number, onTop?: boolean, showControls?: boolean, visible?: boolean, interactive?: boolean, clone?: boolean, group?: string, style?: boolean, inherit?: {})
		constructor(config: { path?: Blob | Squiggle, obj?: DisplayObject | zimVee, count?: number, angle?: number, startPercent?: number, percent?: number, percents?: [number], height?: number, onTop?: boolean, showControls?: boolean, visible?: boolean, interactive?: boolean, clone?: boolean, group?: string, style?: boolean, inherit?: {} })
		resize(): this
		readonly type: string
		readonly path: Blob | Squiggle
		readonly count: number
		percents: number[]
		readonly group: string
	}
	export class BlurEffect extends createjs.BlurFilter {
		constructor(config_or_blurX?: number | zimVee, blurY?: number | zimVee, quality?: number | zimVee, style?: boolean, group?: string, inherit?: {})
		constructor(config: { blurX?: number | zimVee, blurY?: number | zimVee, quality?: number | zimVee, style?: boolean, group?: string, inherit?: {} })
		blurX: number
		blurY: number
		quality: number
	}
	export class GlowEffect extends createjs.BlurFilter {
		constructor(config_or_color?: color | zimVee, alpha?: number | zimVee, blurX?: number | zimVee, blurY?: number | zimVee, strength?: number | zimVee, quality?: number | zimVee, inner?: boolean | zimVee, knockout?: boolean | zimVee, hideObject?: boolean | zimVee, style?: boolean, group?: string, inherit?: {})
		constructor(config: { color?: color | zimVee, alpha?: number | zimVee, blurX?: number | zimVee, blurY?: number | zimVee, strength?: number | zimVee, quality?: number | zimVee, inner?: boolean | zimVee, knockout?: boolean | zimVee, hideObject?: boolean | zimVee, style?: boolean, group?: string, inherit?: {} })
		color: string
		blurX: number
		blurY: number
		strength: number
		quality: number
		inner: boolean
		knockout: boolean
		hideObject: boolean
	}
	export class ShadowEffect extends createjs.BlurFilter {
		constructor(config_or_distance?: number | zimVee, angle?: number | zimVee, color?: color | zimVee, alpha?: number | zimVee, blurX?: number | zimVee, blurY?: number | zimVee, strength?: number | zimVee, quality?: number | zimVee, inner?: boolean | zimVee, knockout?: boolean | zimVee, hideObject?: boolean | zimVee, style?: boolean, group?: string, inherit?: {})
		constructor(config: { distance?: number | zimVee, angle?: number | zimVee, color?: color | zimVee, alpha?: number | zimVee, blurX?: number | zimVee, blurY?: number | zimVee, strength?: number | zimVee, quality?: number | zimVee, inner?: boolean | zimVee, knockout?: boolean | zimVee, hideObject?: boolean | zimVee, style?: boolean, group?: string, inherit?: {} })
		distance: number
		angle: number
		color: string
		blurX: number
		blurY: number
		strength: number
		quality: number
		inner: boolean
		knockout: boolean
		hideObject: boolean
	}
	export class ColorEffect extends createjs.ColorFilter {
		constructor(config_or_redMultiplier?: number | zimVee, greenMultiplier?: number | zimVee, blueMultiplier?: number | zimVee, alphaMultiplier?: number | zimVee, redOffset?: number | zimVee, greenOffset?: number | zimVee, blueOffset?: number | zimVee, alphaOffset?: number | zimVee, style?: boolean, group?: string, inherit?: {})
		constructor(config: { redMultiplier?: number | zimVee, greenMultiplier?: number | zimVee, blueMultiplier?: number | zimVee, alphaMultiplier?: number | zimVee, redOffset?: number | zimVee, greenOffset?: number | zimVee, blueOffset?: number | zimVee, alphaOffset?: number | zimVee, style?: boolean, group?: string, inherit?: {} })
		redMultiplier: number
		greenMultiplier: number
		blueMultiplier: number
		alphaMultiplier: number
		redOffset: number
		greenOffset: number
		blueOffset: number
		alphaOffset: number
	}
	export class MultiEffect extends createjs.ColorMatrixFilter {
		constructor(config_or_hue?: number | zimVee, saturation?: number | zimVee, brightness?: number | zimVee, contrast?: number | zimVee, style?: boolean, group?: string, inherit?: {})
		constructor(config: { hue?: number | zimVee, saturation?: number | zimVee, brightness?: number | zimVee, contrast?: number | zimVee, style?: boolean, group?: string, inherit?: {} })
		hue: number
		saturation: number
		brightness: number
		contrast: number
	}
	export class AlphaEffect extends createjs.AlphaMaskFilter {
		constructor(config_or_mask?: DisplayObject, style?: boolean, group?: string, inherit?: {})
		constructor(config: { mask?: DisplayObject, style?: boolean, group?: string, inherit?: {} })
	}
	export class Pixel extends Bitmap {
		constructor(config_or_obj?: DisplayObject, amount?: number, amountY?: number, blur?: number, dynamic?: boolean, blendmode?: string, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, expand?: boolean | [number], amountFactor?: number, blurFactor?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { obj?: DisplayObject, amount?: number, amountY?: number, blur?: number, dynamic?: boolean, blendmode?: string, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, expand?: boolean | [number], amountFactor?: number, blurFactor?: number, style?: boolean, group?: string, inherit?: {} })
		update(): this
		amount: number
		amountY: number
		amountFactor: number
		blur: number
		blurFactor: number
	}
	export class Parallax {
		constructor(config_or_layers?: { obj: DisplayObject, prop: string, propChange: number, input?: string, inMin?: number, inMax?: number, factor?: number, integer?: boolean }[], damp?: number, auto?: boolean, stage?: Stage, startPaused?: boolean, mouseMoveOutside?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { layers?: { obj: DisplayObject, prop: string, propChange: number, input?: string, inMin?: number, inMax?: number, factor?: number, integer?: boolean }[], damp?: number, auto?: boolean, stage?: Stage, startPaused?: boolean, mouseMoveOutside?: boolean, style?: boolean, group?: string, inherit?: {} })
		addLayer(layer: { obj: DisplayObject, prop: string, propChange: number, input?: string, inMin?: number, inMax?: number, factor?: number, integer?: boolean }): this
		removeLayer(index: number): this
		step(input?: number): this
		immediate(array: number[]): this
		pause(state: boolean): this
		dispose(): boolean
		readonly type: string
		readonly paused: boolean
		damp: number
	}
	export class Flipper {
		constructor(config_or_front?: DisplayObject, back?: DisplayObject, interactive?: boolean, time?: number, vertical?: boolean, flipped?: boolean, ease?: string, frontPress?: boolean, backPress?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { front?: DisplayObject, back?: DisplayObject, interactive?: boolean, time?: number, vertical?: boolean, flipped?: boolean, ease?: string, frontPress?: boolean, backPress?: boolean, style?: boolean, group?: string, inherit?: {} })
		flip(state?: boolean, time?: number): this
		dispose(): boolean
		readonly type: string
		readonly flipped: boolean
		readonly front: DisplayObject
		readonly back: DisplayObject
	}
	export class Book extends Container {
		constructor(config_or_width?: number, height?: number, pages?: [DisplayObject], startPage?: number, rollUp?: boolean | number, radius?: number, backgroundColor?: color, arrows?: boolean, handleHTML?: boolean)
		constructor(config: { width?: number, height?: number, pages?: [DisplayObject], startPage?: number, rollUp?: boolean | number, radius?: number, backgroundColor?: color, arrows?: boolean, handleHTML?: boolean })
		nextPage(time?: number): this
		prevPage(time?: number): this
		gotoPage(num?: number, time?: number): this
		page: number
		readonly direction: string
		readonly lastPage: number
		readonly pages: [DisplayObject]
		readonly moving: boolean
	}
	export class Scroller extends createjs.EventDispatcher {
		constructor(config_or_backing: DisplayObject, speed?: number, direction?: number, horizontal?: boolean, gapFix?: number, stage?: Stage, container?: Stage | DisplayObject)
		constructor(config: { backing: DisplayObject, speed?: number, direction?: number, horizontal?: boolean, gapFix?: number, stage?: Stage, container?: Stage | DisplayObject })
		pause(state: boolean): void
		dispose(): boolean
		readonly type: string
		backing1: DisplayObject
		backing2: DisplayObject
		speed: number
		baseSpeed: number
		percentSpeed: number
		direction: number
		readonly paused: boolean
	}
	export class Dynamo extends createjs.EventDispatcher {
		constructor(config_or_sprite: Sprite, speed?: number, label?: string, startFrame?: number, endFrame?: number, update?: boolean, reversible?: boolean, flip?: boolean, flipV?: boolean)
		constructor(config: { sprite: Sprite, speed?: number, label?: string, startFrame?: number, endFrame?: number, update?: boolean, reversible?: boolean, flip?: boolean, flipV?: boolean })
		pause(state: boolean, time: number, frame: number): void
		dispose(): boolean
		readonly type: string
		frames: number[]
		frame: number
		totalFrames: number
		percentSpeed: number
		baseSpeed: number
		readonly paused: boolean
		scaleX: number
		scaleY: number
	}
	export class Accelerator extends createjs.EventDispatcher {
		constructor(objects: Scroller | Dynamo | [Scroller | Dynamo])
		add(objects: Scroller | Dynamo | [Scroller | Dynamo]): this
		remove(objects: Scroller | Dynamo | [Scroller | Dynamo]): this
		pause(state: boolean, time: number, frameNumber: number): void
		dispose(): boolean
		readonly type: string
		percentSpeed: number
		readonly paused: boolean
		items: [Scroller | Dynamo]
	}
	export class Swiper extends createjs.EventDispatcher {
		constructor(config_or_swipeOn: Stage | DisplayObject, target: Object, property: string, sensitivity?: number, swiperType?: string, min?: number, max?: number, damp?: number, integer?: boolean, factor?: number, pauseTime?: number, otherSwiper?: Swiper)
		constructor(config: { swipeOn: Stage | DisplayObject, target: Object, property: string, sensitivity?: number, swiperType?: string, min?: number, max?: number, damp?: number, integer?: boolean, factor?: number, pauseTime?: number, otherSwiper?: Swiper })
		immediate(val: number): void
		dispose(): boolean
		readonly type: string
		target: Object
		property: string
		damp: number
		sensitivity: number
		desiredValue: number
		readonly min: number
		readonly max: number
		enabled: boolean
	}
	export class MotionController extends createjs.EventDispatcher {
		constructor(config_or_target?: DisplayObject, type?: string, speed?: number, axis?: string, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, map?: [number | number[]], diagonal?: boolean, damp?: number, flip?: string, orient?: boolean, constant?: boolean, firstPerson?: boolean, turnSpeed?: number, moveThreshold?: number, stickThreshold?: number, container?: Stage | StageGL | Container, localBounds?: boolean, mouseMoveOutside?: boolean, mousedownIncludes?: DisplayObject[], minPercentSpeed?: number, maxPercentSpeed?: number, dampKeyup?: number, rotate?: boolean, mouseOutside?: boolean)
		constructor(config: { target?: DisplayObject, type?: string, speed?: number, axis?: string, boundary?: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }, map?: [number | number[]], diagonal?: boolean, damp?: number, flip?: string, orient?: boolean, constant?: boolean, firstPerson?: boolean, turnSpeed?: number, moveThreshold?: number, stickThreshold?: number, container?: Stage | StageGL | Container, localBounds?: boolean, mouseMoveOutside?: boolean, mousedownIncludes?: DisplayObject[], minPercentSpeed?: number, maxPercentSpeed?: number, dampKeyup?: number, rotate?: boolean, mouseOutside?: boolean })
		immediate(x: number, y: number): void
		convert(x: number, y: number): void
		pause(state?: boolean, time?: number): this
		dispose(): boolean
		readonly type: string
		target: Object
		x: number
		y: number
		dirX: number
		dirY: number
		boundary: Boundary | createjs.Rectangle | { x: number, y: number, width: number, height: number }
		readonly rotation: number
		readonly scaleX: number
		readonly scaleY: number
		readonly dampX: Damp
		readonly dampY: Damp
		speed: number
		turnSpeed: number
		axis: string
		readonly moving: boolean
		readonly movingX: boolean
		readonly movingY: boolean
		readonly gamepad: GamePad
		moveThreshold: number
		stickThreshold: number
		enabled: boolean
	}
	export class GamePad extends createjs.EventDispatcher {
		constructor()
		dispose(): boolean
		readonly type: string
		connected: boolean
		currentIndex: number
		data: {}
		buttons: boolean[]
		A: number
		B: number
		X: number
		Y: number
		LB: number
		RB: number
		LT: number
		RT: number
		BACK: number
		START: number
		LS: number
		RS: number
		DPAD_UP: number
		DPAD_DOWN: number
		DPAD_LEFT: number
		DPAD_RIGHT: number
		LSX: number
		LSY: number
		RSX: number
		RSY: number
		axes: number[]
	}
	export class Generator extends Container {
		constructor(config_or_color?: string | zimVee, strokeColor?: string | zimVee, strokeWidth?: number | zimVee, draw?: Function, stamp?: Function, setup?: Function, maxCount?: number, boundary?: Boundary, drawCount?: number, drawPause?: boolean, drawSpacebarPause?: boolean, startX?: number, startY?: number, cache?: boolean, recordLinePoints?: boolean, frame?: Frame, seed?: number, output?: boolean, outputType?: string, style?: boolean, group?: string, inherit?: {})
		constructor(config: { color?: string | zimVee, strokeColor?: string | zimVee, strokeWidth?: number | zimVee, draw?: Function, stamp?: Function, setup?: Function, maxCount?: number, boundary?: Boundary, drawCount?: number, drawPause?: boolean, drawSpacebarPause?: boolean, startX?: number, startY?: number, cache?: boolean, recordLinePoints?: boolean, frame?: Frame, seed?: number, output?: boolean, outputType?: string, style?: boolean, group?: string, inherit?: {} })
		fill(color: string | zimVee): this
		stroke(color?: string | zimVee, size?: number | zimVee): this
		noStroke(): this
		translate(x?: number | zimVee, y?: number | zimVee): this
		rotate(degrees: number | zimVee): this
		setScale(x?: number | zimVee, y?: number | zimVee): this // scale(x, y) is DEPRECATED as conflicting with createjs scale property
		skew(x?: number | zimVee, y?: number | zimVee): this
		line(x1?: number | zimVee, y1?: number | zimVee, x2?: number | zimVee, y2?: number | zimVee): this
		arc(x?: number | zimVee, y?: number | zimVee, radius?: number | zimVee, startAngle?: number | zimVee, endAngle?: number | zimVee, anticlockwise?: boolean | zimVee): this
		curve(x1: number | zimVee, y1: number | zimVee, cpx: number | zimVee, cpy: number | zimVee, x2: number | zimVee, y2: number | zimVee): this
		bezier(x1: number | zimVee, y1: number | zimVee, cp1x: number | zimVee, cp1y: number | zimVee, cp2x: number | zimVee, cp2y: number | zimVee, x2: number | zimVee, y2: number | zimVee): this
		rectangle(x?: number | zimVee, y?: number | zimVee, w?: number | zimVee, h?: number | zimVee, a?: number | zimVee, b?: number | zimVee, c?: number | zimVee, d?: number | zimVee): this
		circle(x?: number | zimVee, y?: number | zimVee, radius?: number | zimVee, percent?: number | zimVee, percentClose?: number | zimVee): this
		oval(x?: number | zimVee, y?: number | zimVee, w?: number | zimVee, h?: number | zimVee): this
		poly(x?: number | zimVee, y?: number | zimVee, radius?: number | zimVee, sides?: number | zimVee, pointSize?: number | zimVee, angle?: number | zimVee): this
		push(): this
		pop(): this
		step(): this
		blit(): this
		noise(a: number, b?: number, c?: number, d?: number): number
		clear(): this
		reset(): this
		resetup(clear?: boolean): this
		redraw(clear?: boolean, setup?: boolean): this
		restamp(clear?: boolean, setup?: boolean): this
		pause(state?: boolean | zimVee, time?: number | zimVee): this
		stop(): this
		readonly type: string
		readonly drawing: Container
		readonly shape: Shape
		count: number
		maxCount: number
		drawCount: number
		color: string | zimVee
		readonly currentColor: string
		strokeColor: string | zimVee
		readonly currentStrokeColor: string
		strokeWidth: number | zimVee
		readonly currentStrokeWidth: number
		readonly currentX: number
		readonly currentY: number
		linePoints: []
		readonly paused: boolean
		stack: []
		colorStrokeStack: []
	}
	export class Emitter extends Container {
		constructor(config_or_obj?: DisplayObject | zimVee, width?: number, height?: number, interval?: number | zimVee, num?: number | zimVee, life?: number | zimVee, fade?: boolean, shrink?: boolean, decayTime?: number, decayStart?: number, trace?: boolean, traceFadeTime?: number, traceShiftX?: number, traceShiftY?: number, angle?: number | zimVee, force?: number | zimVee, gravity?: number, wind?: number, layers?: string, animation?: {} | zimVee, random?: {}, horizontal?: boolean, vertical?: boolean, sink?: DisplayObject | { x: number, y: number }, sinkForce?: number, cache?: boolean, events?: boolean, startPaused?: boolean, pool?: boolean, poolMin?: number, particles?: Container, style?: boolean, group?: string, inherit?: {})
		constructor(config: { obj?: DisplayObject | zimVee, width?: number, height?: number, interval?: number | zimVee, num?: number | zimVee, life?: number | zimVee, fade?: boolean, shrink?: boolean, decayTime?: number, decayStart?: number, trace?: boolean, traceFadeTime?: number, traceShiftX?: number, traceShiftY?: number, angle?: number | zimVee, force?: number | zimVee, gravity?: number, wind?: number, layers?: string, animation?: {} | zimVee, random?: {}, horizontal?: boolean, vertical?: boolean, sink?: DisplayObject | { x: number, y: number }, sinkForce?: number, cache?: boolean, events?: boolean, startPaused?: boolean, pool?: boolean, poolMin?: number, particles?: Container, style?: boolean, group?: string, inherit?: {} })
		spurt(num?: number | zimVee, time?: number | zimVee, restart?: boolean): void
		pauseEmitter(state?: boolean, restart?: boolean, freeze?: boolean, immediate?: boolean): void
		clearPool(): void
		resize(width: number, height: number): void
		readonly type: string
		obj: DisplayObject | zimVee
		interval: number | zimVee
		num: number | zimVee
		life: number
		fade: boolean
		shrink: boolean
		decayTime: number
		decayStart: number
		trace: boolean
		traceFadeTime: number
		traceShiftX: number
		traceShiftY: number
		angle: number | zimVee
		emitterForce: number | zimVee
		gravity: number
		wind: number
		layers: string
		animation: {} | zimVee
		random: {}
		horizontal: boolean
		vertical: boolean
		sink: DisplayObject | { x: number, y: number }
		sinkForce: number
		events: boolean
		startPaused: boolean
		pool: boolean
		poolMin: number
		readonly emitterPaused: boolean
		currentParticle: DisplayObject
		particlesEmitted: number
		spurtNum: number
		spurtCount: number
		zimInterval: { pause: Function, clear: Function, time: number, count: number, total: number, paused: boolean, pauseTimeLeft: number }
		zimTicker: Function
		particles: Container
	}
	export class Pen extends Container {
		constructor(config_or_size?: number | zimVee, color?: color | zimVee, penType?: string, damp?: number, spread?: number | zimVee, borderColor?: number | zimVee, borderWidth?: number | zimVee, end?: string, paper?: Container, nib?: DisplayObject, cache?: boolean, ctrlKey?: boolean, cropScale?: number, undo?: number, undoKeys?: boolean, draggable?: boolean, onTop?: boolean, deleteable?: boolean, doubleClickDelete?: boolean, holdDelete?: boolean, immediateStop?: boolean, lineAlpha?: number, lineBlendMode?: string, frame?: Frame, style?: boolean, group?: string, inherit?: {})
		constructor(config: { size?: number | zimVee, color?: color | zimVee, penType?: string, damp?: number, spread?: number | zimVee, borderColor?: number | zimVee, borderWidth?: number | zimVee, end?: string, paper?: Container, nib?: DisplayObject, cache?: boolean, ctrlKey?: boolean, cropScale?: number, undo?: number, undoKeys?: boolean, draggable?: boolean, onTop?: boolean, deleteable?: boolean, doubleClickDelete?: boolean, holdDelete?: boolean, immediateStop?: boolean, lineAlpha?: number, lineBlendMode?: string, frame?: Frame, style?: boolean, group?: string, inherit?: {} })
		setPen(newPen?: string): this
		saveState(obj: DisplayObject): this
		undo(): this
		redo(): this
		immediate(x?: number, y?: number): this
		deleteSegment(segmentObject: Bitmap | Shape): this
		clear(): this
		dispose(): boolean
		readonly type: string
		undoLevels: number
		draggable: boolean
		paper: DisplayObject
		readonly lastSegment: Shape | Bitmap
		readonly lastSelected: Shape | Bitmap
		readonly nib: DisplayObject
		write: boolean
		readonly drawing: boolean
		size: number | zimVee
		sizeFactor: number
		sizeScale: number
		spread: number | zimVee
		spreadFactor: number
		spreadScale: number
		color: color | zimVee
		borderColor: color | zimVee
		borderWidth: number | zimVee
		penType: string
		immediateStop: boolean
		infinite: boolean
	}
	export class SoundWave extends createjs.EventDispatcher {
		constructor(config_or_num?: number, input?: string, include?: number, smoothing?: number, min?: number, max?: number, operation?: Function, baseline?: number, magnify?: number, reduce?: number)
		constructor(config: { num?: number, input?: string, include?: number, smoothing?: number, min?: number, max?: number, operation?: Function, baseline?: number, magnify?: number, reduce?: number })
		calculate(): number[]
		readonly type: string
		readonly num: number
		smoothing: number
		analyser: AnalyserNode
		baseline: number
		magnify: number
		reduce: number
	}
	export class Synth extends createjs.EventDispatcher {
		constructor(volume?: number, frequency?: number)
		play(volume?: number, randomness?: number, frequency?: number, attack?: number, sustain?: number, release?: number, shape?: number, shapeCurve?: number, slide?: number, deltaSlide?: number, pitchJump?: number, pitchJumpTime?: number, repeatTime?: number, noise?: number, modulation?: number, bitCrush?: number, delay?: number): any
		tone(volume?: number, note?: number | string, shape?: string | {}, duration?: number, attack?: number, release?: number, wahAmount?: number, wahRate?: number, wahShape?: number, wahThroat?: number, wahNote?: number, vibratoAmount?: number, vibratoRate?: number, vibratoShape?: number, tremeloAmount?: number, tremeloRate?: number, tremeloShape?: number, startTime?: number, pauseOnBlur?: boolean): any
		oscillator(frequency?: number, gain?: number, form?: string, offset?: number): any
		static setShape(oscillator: any, shape: string): void
		static getNote(frequency: number, semitoneOffset: number): void
		static note(note: string): void
		static wave(a: string | any, b?: any): void
		static drawWave(shape?: string, color?: color, thickness?: number, backgroundColor?: color, borderColor?: color, borderWidth?: number, corner?: number, padding?: number, paddingV?: number): Container
		static readonly notes: [string]
		static readonly major: [string]
		static readonly minor: [string]
		static readonly shapes: [string]
		volume: number
		frequency: number
	}
	export class Portal extends createjs.EventDispatcher {
		constructor(obj: DisplayObject, lands?: Stage | DisplayObject)
		dispose(): boolean
		readonly type: string
		portal: DisplayObject
		enabled: boolean
		readonly currentLand: DisplayObject
		readonly nextLand: DisplayObject
	}
	export class Physics {
		constructor(config_or_gravity?: number, borders?: Boundary | {}, scroll?: boolean, frame?: Frame)
		constructor(config: { gravity?: number, borders?: Boundary | {}, scroll?: boolean, frame?: Frame })
		borders(boundary?: Boundary | {}): void
		drag(array?: [any]): void
		noDrag(): void
        pause(type?:boolean): void;
		join(obj1: DisplayObject, obj2: DisplayObject, point1?: Point | {}, point2?: Point | {}, minAngle?: number, maxAngle?: number, type?: string): any
		break(joint: any): void
        attach(control:DisplayObject, obj:DisplayObject):string
        unattach(id:string):void
        buoyancy(height?:number, denisity?:number, linear?:number, angular?:number):any
		debug(): void
		updateDebug(): void
		removeDebug(): void
		remove(obj: DisplayObject): void
		dispose(): void
		readonly world: any
		readonly scale: number
		readonly step: number
		readonly gravity: number
		readonly Ticker: any
		controlObject: DisplayObject
		followObject: DisplayObject
		readonly borderTop: any
		readonly borderBottom: any
		readonly borderLeft: any
		readonly borderRight: any
	}
	export class Timeline extends Container {
		constructor(config_or_objects?: DisplayObject, width?: number, startPaused?: boolean, barColor?: color, buttonColor?: color, themeColor?: color, corner?: number | [any], ticks?: boolean, damp?: number | boolean, loop?: boolean, noLoop?: boolean, call?: Function, style?: boolean, group?: string, inherit?: {})
		constructor(config: { objects?: DisplayObject, width?: number, startPaused?: boolean, barColor?: color, buttonColor?: color, themeColor?: color, corner?: number | [any], ticks?: boolean, damp?: number | boolean, loop?: boolean, noLoop?: boolean, call?: Function, style?: boolean, group?: string, inherit?: {} })
		setThemeColor(color?: color): this
		readonly backing: Rectangle
		readonly shade: Rectangle
		readonly shade2: Rectangle
		readonly slider: Slider
		readonly controls: Button
		readonly menu: Button
		readonly pane: Pane
		readonly title: Label
		readonly icon: DisplayObject
		readonly list: List
		readonly themeColor: color
	}
	export class VR extends Container {
		constructor(config_or_content: Container, angle?: number, distance?: number, parallax?: number, parallaxAngle?: number, damp?: number, parallaxDamp?: number, startAngle?: number, negativeParallax?: boolean, boundaryMarkers?: boolean, swiper?: boolean, holder?: Stage | Container)
		constructor(config: { content: Container, angle?: number, distance?: number, parallax?: number, parallaxAngle?: number, damp?: number, parallaxDamp?: number, startAngle?: number, negativeParallax?: boolean, boundaryMarkers?: boolean, swiper?: boolean, holder?: Stage | Container })
		register(item: DisplayObject): DisplayObject
		remove(item: DisplayObject): DisplayObject
		position(item: DisplayObject, x: number, y: number): DisplayObject
		showAdjuster(): this
		hideAdjuster(): this
		resize(): this
		readonly type: string
		readonly angle: number
		readonly currentAngle: number
		content: Container
		contentLeft: Container
		contentRight: Container
		left: Container
		right: Container
		adjuster: Container
		swiper: Swiper
		boundaryLeft: Container
		boundaryRight: Container
	}

	// ++++++++++++++++++++++++++++++++++++++
	// ZIM FRAME
	export class Queue extends createjs.EventDispatcher {
		constructor()
		readonly isLoading: boolean
	}
	export class Frame extends createjs.EventDispatcher {
		constructor(config_or_scaling?: string, width?: number, height?: number, color?: color, outerColor?: color, ready?: Function, assets?: [string, {}] | string | {}, path?: string, progress?: Waiter | ProgressBar, ticker?: Function, rollover?: boolean, touch?: boolean, scrollTop?: boolean, align?: string, valign?: string, canvasID?: string, rollPerSecond?: number, delay?: number, canvasCheck?: boolean, gpu?: boolean, gpuObj?: boolean, nextFrame?: Frame, nextStage?: Stage, allowDefault?: boolean, loadFailObj?: DisplayObject, sensors?: boolean, retina?: boolean, mouseMoveOutside?: boolean, captureMouse?: boolean, shim?: {}, maxConnections?: number, maxNum?: number, singleTouch?: boolean)
		constructor(config: { scaling?: string, width?: number, height?: number, color?: color, outerColor?: color, ready?: Function, assets?: [string, {}] | string | {}, path?: string, progress?: Waiter | ProgressBar, ticker?: Function, rollover?: boolean, touch?: boolean, scrollTop?: boolean, align?: string, valign?: string, canvasID?: string, rollPerSecond?: number, delay?: number, canvasCheck?: boolean, gpu?: boolean, gpuObj?: boolean, nextFrame?: Frame, nextStage?: Stage, allowDefault?: boolean, loadFailObj?: DisplayObject, sensors?: boolean, retina?: boolean, mouseMoveOutside?: boolean, captureMouse?: boolean, shim?: {}, maxConnections?: number, maxNum?: number, singleTouch?: boolean })
		loadAssets(config_or_assets: [string, {}] | string | {}, path?: string, progress?: Waiter | ProgressBar, xhr?: boolean, time?: number, loadTimeout?: number, outputAudioSprite?: boolean, crossOrigin?: string, fileType?: string, queueOnly?: boolean, shim?: {}): Queue
		loadAssets(config: { assets: [string, {}] | string | {}, path?: string, progress?: Waiter | ProgressBar, xhr?: boolean, time?: number, loadTimeout?: number, outputAudioSprite?: boolean, crossOrigin?: string, fileType?: string, queueOnly?: boolean, shim?: {} }): Queue
		asset(file: string): any
		follow(config_or_obj?: DisplayObject, boundary?: Boundary | {}, damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, lag?: boolean): this
		follow(config: { obj?: DisplayObject, boundary?: Boundary | {}, damp?: number, dampY?: number, leftOffset?: number, rightOffset?: number, upOffset?: number, downOffset?: number, offsetDamp?: number, offsetDampY?: number, horizontal?: boolean, vertical?: boolean, borderLock?: boolean, lag?: boolean }): this
		setDefault(): this
		makeCircles(radius?: number, multiple?: false): Shape
		makeCircles(radius?: number, multiple?: true): Container
		makeCat(height?: number): Container
		makeIcon(config_or_edges?: string, box?: string, slats?: string, borderColor?: string, borderWidth?: string): Container
		makeIcon(config: { edges?: string, box?: string, slats?: string, borderColor?: string, borderWidth?: string }): Container
		madeWith(config_or_color?: string, text?: string, edges?: string, box?: string, slats?: string, borderColor?: string, borderWidth?: string): Container
		madeWith(config: { color?: string, text?: string, edges?: string, box?: string, slats?: string, borderColor?: string, borderWidth?: string }): Container
		remakeCanvas(width: number, height: number): void
		fullscreen(mode?: boolean): void
		keyboardMessage(): void
		dispose(): boolean
		readonly type: string
		stage: Stage | StageGL
		canvas: HTMLCanvasElement
		canvasID: string
		color: color
		outerColor: color
		readonly tag: HTMLElement
		readonly isLoading: boolean
		readonly isDefault: boolean
		readonly isFullscreen: boolean
		readonly leftMouseDown: boolean
		readonly width: number
		readonly height: number
		readonly scale: number
		readonly mouseX: number
		readonly mouseY: number
		readonly mouseEvent: any
		orientation: string
		visibleLeft: number
		visibleTop: number
		visibleRight: number
		visibleBottom: number
		cursors: {}
        allowDefault: boolean 
        touch: boolean 
        singleTouch: boolean
		readonly cursorList: Dictionary
		readonly cursorObj: DisplayObject
		zil: Function[]
		altKey: boolean
		ctrlKey: boolean
		metaKey: boolean
		shiftKey: boolean
		loadFailObj: DisplayObject
		readonly retina: boolean
		readonly reloaded: boolean
	}

	export class Pic extends Container {
		constructor(config_or_file?: string, width?: number, height?: number, noCors?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { file?: string, width?: number, height?: number, noCors?: boolean, style?: boolean, group?: string, inherit?: {} })
		keyOut(color?: string, tolerance?: number, replacement?: color): this
		readonly file: string
		readonly src: string
		readonly image: HTMLImageElement
		readonly bitmap: Bitmap
		readonly item: {}
	}
	export class Aud extends Container {
		constructor(config_or_file?: string, volume?: number, loop?: number, loopCount?: number, pan?: number, offset?: number, delay?: number, interrupt?: string, maxNum?: number, style?: boolean, group?: string, inherit?: {})
		constructor(config: { file?: string, volume?: number, loop?: number, loopCount?: number, pan?: number, offset?: number, delay?: number, interrupt?: string, maxNum?: number, style?: boolean, group?: string, inherit?: {} })
		play(volume?: number, loop?: number, loopCount?: number, pan?: number, offset?: number, delay?: number, interrupt?: string): createjs.AbstractSoundInstance
		readonly file: string
		readonly src: string
		readonly item: {}
	}
    export class Dat extends createjs.EventDispatcher {
		constructor(file: string)
		readonly data: any
		readonly file: string
	}
	export class Vid extends Container {
		constructor(config_or_file?: string, width?: number, height?: number, volume?: number, loop?: boolean, align?: string, valign?: string, type?: string, style?: boolean, group?: string, inherit?: {})
		constructor(config: { file?: string, width?: number, height?: number, volume?: number, loop?: boolean, align?: string, valign?: string, type?: string, style?: boolean, group?: string, inherit?: {} })
		play(): this
		pause(state?: boolean): this
		keyOut(color?: string, tolerance?: number, replacement?: color): this
		readonly duration: number
		currentTime: number
		volume: number
		readonly videoPaused: boolean
		readonly source: HTMLVideoElement
		readonly bitmap: Bitmap
	}
	export class SVG extends Container {
		constructor(config_or_svg?: string, width?: number, height?: number, bitmap?: boolean, splitTypes?: boolean, geometric?: boolean, showControls?: boolean, interactive?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { svg?: string, width?: number, height?: number, bitmap?: boolean, splitTypes?: boolean, geometric?: boolean, showControls?: boolean, interactive?: boolean, style?: boolean, group?: string, inherit?: {} })
		readonly sensorType: string
		readonly label: Label
		readonly yes: Button
		readonly no: Button
		readonly file: string
		readonly src: string
		readonly item: {}
	}
	export class Speech extends createjs.EventDispatcher {
		constructor()
		talk(text: string, voice?: string, volume?: number, lang?: string, rate?: number, pitch?: number): this
		stopTalking(): this
		pauseTalking(): this
		resumeTalking(): this
		getVoices(): this
		listen(): this
		stopListening(): this
		readonly voices: [string]
		readonly voiceObjects: [any]
		readonly voiceLanguages: [string]
		readonly recognition: any
	}
	export class SensorAsk extends Pane {
		constructor(config_or_callback?: Function, sensorType?: string, color?: color, backgroundColor?: color, style?: boolean, group?: string, inherit?: {})
		constructor(config: { callback?: Function, sensorType?: string, color?: color, backgroundColor?: color, style?: boolean, group?: string, inherit?: {} })
		readonly sensorType: string
		readonly label: Label
		readonly yes: Button
		readonly no: Button
	}
	export class PermissionAsk extends Pane {
		constructor(config_or_callback?: Function, permissionType?: string, color?: color, backgroundColor?: color, style?: boolean, group?: string, inherit?: {})
		constructor(config: { callback?: Function, permissionType?: string, color?: color, backgroundColor?: color, style?: boolean, group?: string, inherit?: {} })
		readonly permissionType: string
		readonly label: Label
		readonly yes: Button
		readonly no: Button
	}

	export class Shader extends Bitmap implements zimComponent {
		constructor(config_or_width?: number, height?: number, fragment?: string, uniforms?: Uniforms, vertex?: string, dynamic?: boolean, preCall?: Function, postCall?: Function, rate?: number | zimVee, version?: string, canvas?: HTMLCanvasElement, vertexPosition?: string, strip?: boolean, log?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, fragment?: string, uniforms?: Uniforms, vertex?: string, dynamic?: boolean, preCall?: Function, postCall?: Function, rate?: number | zimVee, version?: string, canvas?: HTMLCanvasElement, vertexPosition?: string, strip?: boolean, log?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		update(): this
		dynamic: boolean
		rate: number
		readonly canvas: HTMLCanvasElement
		readonly gl: any
		readonly uniforms: Uniforms
		readonly fragment: string
		readonly vertex: string
		readonly ticker: any
	}

	export class ShaderOverlay extends Tag implements zimComponent {
		constructor(config_or_width?: number, height?: number, fragment?: string, uniforms?: Uniforms, vertex?: string, dynamic?: boolean, preCall?: Function, postCall?: Function, rate?: number | zimVee, version?: string, canvas?: HTMLCanvasElement, vertexPosition?: string, strip?: boolean, log?: boolean, style?: boolean, group?: string, inherit?: {})
		constructor(config: { width?: number, height?: number, fragment?: string, uniforms?: Uniforms, vertex?: string, dynamic?: boolean, preCall?: Function, postCall?: Function, rate?: number | zimVee, version?: string, canvas?: HTMLCanvasElement, vertexPosition?: string, strip?: boolean, log?: boolean, style?: boolean, group?: string, inherit?: {} })
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		update(): this
		dynamic: boolean
		rate: number
		readonly canvas: HTMLCanvasElement
		readonly gl: any
		readonly uniforms: Uniforms
		readonly fragment: string
		readonly vertex: string
		readonly ticker: any
	}

	export class Uniforms extends Container implements zimComponent {
		constructor(obj: {})
		// ZIM Component Interface
		// dispose():boolean // now added to Container, etc.
		enabled: boolean
		// END ZIM Component Interface
		update(): this
		obj: {}
	}


	// ++++++++++++++++++++++++++++++++++++++
	// ZIM META
	export var DISTILL: boolean
	export function distill(): void
	export function parseAudioSprite(audioSpriteData: { resources: string[], spritemap: {} }, outputAudioSprite?: boolean): { src: string, data: {} }
	export function previewAudioSprite(audioSpriteData: {}, numLetters?: number, frame?: Frame): Tabs
	export function svgToBitmap(svg: string | SVGElement, callBack: Function): void
	export function fastFrame(cjs: any, stage: createjs.Stage | createjs.StageGL): Function
	export function addWires({ }): {}
	export function setBlurDetect(): void
	export var ZIMONON: boolean
	export var ZIMON: {
		stringify: (obj: any, key?: {}) => string,
		parse: (string: string) => any
	}
	export class Wonder {
		constructor(wid: string, client: string, app: string, notes?: string, server?: string)
		count(keyword: string): void
		timeStart(keyword: string): void
		timePause(keyword: string): void
		timeUnpause(keyword: string): void
		timeEnd(keyword: string): void
		order(keyword: string, item: any): void
		countOff(keyword: string): void
		countOn(keyword: string): void
		timeOff(keyword: string): void
		timeOn(keyword: string): void
		orderOff(keyword: string): void
		orderOn(keyword: string): void
		dispose(): boolean
	}
	export var VERSION: string
	export function getLatestVersions(call: Function): string
	export class PWA {
		constructor(call?: Function, label?: string, backgroundColor?: color, color?: color, backdropColor?: color, pane?: Pane, noScale?: boolean)
		show(): void
	}
	export class QR {
		constructor(config_or_url?: string, color?: color, backgroundColor?: color, size?: number, clickable?: boolean, correctLevel?: number)
		constructor(config: { url?: string, color?: color, backgroundColor?: color, size?: number, clickable?: boolean, correctLevel?: number })
	}
	export class GIF {
		constructor(config_or_file?: string, width?: number, height?: number, startPaused?: boolean)
		constructor(config: { file?: string, width?: number, height?: number, startPaused?: boolean })
		pause(state?: boolean): this
		pause(state?: boolean): this
		pause(state?: boolean): this
		pause(state?: boolean): this
	}
    export class Rive {
        constructor(config_or_width?:number, height?:number, src?:string, stateMachines?:string, artboard?:string, animations?:string|[string], autoplay?:boolean, layout?:{}, buffer?:ArrayBuffer, file?:string, useOffscreenRenderer?:boolean, enableRiveAssetCDN?:boolean, shouldDisableRiveListeners?:boolean, isTouchScrollEnabled?:boolean, automaticallyHandleEvents?:boolean, onLoad?:Function, onLoadError?:Function, onPlay?:Function, onPause?:Function, onStop?:Function, onLoop?:Function, onStateChange?:Function, onAdvance?:Function, assetLoader?:Function, canvas?:HTMLCanvasElement)
		constructor(config: {width?:number, height?:number, src?:string, stateMachines?:string, artboard?:string, animations?:string|[string], autoplay?:boolean, layout?:{}, buffer?:ArrayBuffer, file?:string, useOffscreenRenderer?:boolean, enableRiveAssetCDN?:boolean, shouldDisableRiveListeners?:boolean, isTouchScrollEnabled?:boolean, automaticallyHandleEvents?:boolean, onLoad?:Function, onLoadError?:Function, onPlay?:Function, onPause?:Function, onStop?:Function, onLoop?:Function, onStateChange?:Function, onAdvance?:Function, assetLoader?:Function, canvas?:HTMLCanvasElement })
        play(names?:string|[string], autoplay?:boolean): void
        pause(names?:string|[string]): void
        stop(names?:string|[string]): void
        scrub(animationNames?:string|[string], time?:number): void
        reset(params?:{}): void
        on(): Function
        off(eventType:string, callback:Function): void
        removeAllEventListeners(): void
        stateMachineInputs(): void
        dispose(): void
        type: string
        display: string
        canvas: Bitmap
        content: string
        source: string
        activeArtboard: string
        animationNames: [string]
        stateMachineNames: [string]
        playingAnimationNames: [string]
        playingStateMachineNames: [string]
        pausedAnimationNames: [string]
        pausedStateMachineNames: [string]
        isPlaying: boolean
        isPaused: boolean
        isStopped: boolean
        bounds: {}
        layout: any
    }
    export class RiveListener {
        constructor(src:string, damp?:number, canvas?:HTMLCanvasElement, wasm?:string)
        dispose(): void
        type: string
        display: Bitmap
        canvas: HTMLCanvasElement
        rive: any
        renderer: any
        file: string
        artboards: [string]
        animations: [string]
        stateMachines: [string]
        input: any
        pauseMove: boolean
        pauseDown: boolean
        pauseUp: boolean
    }
	export var THEME: { name?: string, lightenRatio?: number, tint?: color, tintRatio?: number, exclude?: color | [color] }
	export class Theme {
		constructor()
		set(name?: string, lightenRatio?: number, tint?: color, tintRatio?: number, exclude?: color | [color]): void
		apply(state?: boolean): void
		clear(): void
	}

	// ++++++++++++++++++++++++++++++++++++++
	// ZIM SOCKET 
    export class Socket {
		constructor(server: string, appName: string, roomName?: string, maxPeople?: number, fill?: boolean, initObj?: {})
		changeRoom(appName: string, roomName?: string, maxPeople?: number, fill?: boolean, initObj?: {}): void
		requestTime(): void
		requestSync(): void
        on(event:string, listener:Function): void 
        off(event:string, listener:Function): void 
        offAll(): void 
        setProperty(propertyName:string, propertyValue:string|number|boolean): void
        setProperties(objectOfPropertiesToSet:{}): void 
		getMyProperty(propertyName: string): any
		getMyData(): {}
		getOtherProperty(id: string, propertyName: string): any
		getOtherData(id: string): {}
		getSenderProperty(propertyName: string): any
		getSenderData(): {}
		getProperties(propertyName: string): [any]
		getData(): {}
		getLatestValue(propertyName: string): any
		getLatestTime(propertyName: string): number
		getLatestValueID(propertyName: string): string
		getLatestProperties(propertyName: string): [any]
		appendToHistory(someText: string): void
		clearHistory(): void
		dispose(): void
	}

}

export = zim

