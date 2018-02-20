import { TimelineMax, TweenMax, Linear } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';

$(function() {
	let controller = new ScrollMagic.Controller();

	let blockTween = new TweenMax.to("#image-1", 3, {
		opacity: 1
	})
	var containerScene = new ScrollMagic.Scene({
		triggerElement: "#image-1",
		triggerHook: "onEnter",
		reverse: true
	})
	containerScene
		.setTween(blockTween)
		.addTo(controller);

	let tween2 = new TweenMax.to("#image-2", 3, {
		opacity: 1
	})
	let cont2 = new ScrollMagic.Scene({
		triggerElement: "#image-2",
		triggerHook: "onEnter",
		reverse: true
	})
	cont2
		.setTween(tween2)
		.addTo(controller);

	let tween3 = new TweenMax.to("#image-3", 3, {
		opacity: 1
	})
	let cont3 = new ScrollMagic.Scene({
		triggerElement: "#image-3",
		triggerHook: "onEnter",
		reverse: true
	})
	cont3
		.setTween(tween3)
		.addTo(controller);


		// next
	let titleTween1 = new TweenMax.to("#first-title", 1.5, {
		backgroundColor: "#66fcf1"
	})
	let titleCont1 = new ScrollMagic.Scene({
		triggerElement: "#first-title",
		triggerHook: "onEnter",
		reverse: true
	})
	titleCont1
		.setTween(titleTween1)
		.addTo(controller);

	let titleTween2 = new TweenMax.to("#second-title", 1.5, {
		backgroundColor: "#66fcf1"
	})
	let titleCont2 = new ScrollMagic.Scene({
		triggerElement: "#second-title",
		triggerHook: "onEnter",
		reverse: true
	})
	titleCont2
		.setTween(titleTween2)
		.addTo(controller);

	let titleTween3 = new TweenMax.to("#third-title", 1.5, {
		backgroundColor: "#66fcf1"
	})
	let titleCont3 = new ScrollMagic.Scene({
		triggerElement: "#third-title",
		triggerHook: "onEnter",
		reverse: true

	})
	titleCont3
		.setTween(titleTween3)
		.addTo(controller);

//tween for head animation
	let testerTween = new TweenMax.to("#test", 1, {
		rotation: 360, ease: Linear.easeNone,
		scale: 0.2,
		opacity: 0
	})

	let testCont = new ScrollMagic.Scene({
		triggerElement: "#title",
		triggerHook: "onCenter",
		reverse: true,
		duration: "1650"
	})
	testCont
		.setTween(testerTween)
		.addTo(controller);

// work header tween

let workHeaderTween = new TweenMax.to("#work-header", 2, {
	letterSpacing: ".8em",
	fontSize: "2em"
})

let workHeaderCont = new ScrollMagic.Scene({
	triggerElement: "#work-header",
	duration: 375
})

workHeaderCont.setTween(workHeaderTween).addTo(controller);

	//HW TWEENS!!!!

	// let hwTween = new TweenMax.to(".test-path", 1, {
	// 	fill: "#66fcf1"
	// })
	// let hwCont = new ScrollMagic.Scene({
	// 	triggerElement: "#title",
	// 	triggerHook: "onCenter",
	// 	reverse: true,
	// 	duration: 200
	// })
	// hwCont
	// 	.setTween(hwTween)
	// 	.addTo(controller);

	// let hwTween2 = new TweenMax.to(".test-path", 1, {
	// 	fill: "#5cdb95"
	// })
	// let hwCont2 = new ScrollMagic.Scene({
	// 	triggerElement: "#brooklyn",
	// 	triggerHook: "onCenter",
	// 	reverse: true,
	// 	duration: 200
	// })
	// hwCont2
	// 	.setTween(hwTween2)
	// 	.addTo(controller);

	// let hwTweenDisappear = new TweenMax.to("#test", 1, {
	// 	opacity: 0
	// })
	// let hwContEnd = new ScrollMagic.Scene({
	// 	triggerElement: "#work-header",
	// 	// triggerHook: "onEnter",
	// 	reverse: true,
	// 	duration: 375
	// })
	// hwContEnd
	// 	.setTween(hwTweenDisappear)
	// 	.addTo(controller);



});

