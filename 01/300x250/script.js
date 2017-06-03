(function(){

	var settings = {
		version:"1",
		debug: false,
		//maxDuration: 15,
		loopAmount: 3,
	};

	var backupURL = "backup.gif";

	var dom = {};

	var inSpeed = "1s";

	MyBanner = function(){
		dom.ad = document.getElementById('ad');
		dom.clickthrough = document.getElementById('clickthrough');

		dom.logo = document.getElementById("static-img-logo");
		dom.tac = document.getElementById("static-img-tac");
		dom.product = document.getElementById("static-img-product");
		dom.bg1 = document.getElementById("bg1");
		dom.bg2 = document.getElementById("bg2");

		dom.frame01 = document.getElementById("frame-1");
		dom.frame01txt01 = document.getElementById("frame-01-txt-01");
		dom.frame01txt02 = document.getElementById("frame-01-txt-02");
		dom.frame02 = document.getElementById("frame-2");
		dom.frame02txt01 = document.getElementById("frame-02-txt-01");
		dom.frame02txt02 = document.getElementById("frame-02-txt-02");

		dom.frame03 = document.getElementById("frame-3");
		dom.frame03txt = document.getElementById("frame-03-txt");
		dom.frame03arrow = document.getElementById("frame-03-arrow");
		dom.frame03logo = document.getElementById("frame-03-logo");
		dom.arrow = document.getElementById("arrow");

		ggg.event(window, 'load', this.init);
	};

	function animArrow(){
		var target = dom.arrow;
		ggg.animate({
			asset : target,
			delay:0.5,
			time : "0.2s",
			easing : ggg.easing.easeOut,
			to: {
				transform: "translate(20px, 0)",
			}
		},function(){
			ggg.animate({
				asset : target,
				time : "0.2s",
				easing : ggg.easing.easeIn,
				to: {
					transform: "translate(0px, 0)",
				}
			},function(){
				ggg.animate({
					asset : target,
					time : "0.2s",
					easing : ggg.easing.easeOut,
					to: {
						transform: "translate(10px, 0)",
					}
				},function(){
					ggg.animate({
						asset : target,
						time : "0.2s",
						easing : ggg.easing.easeIn,
						to: {
							transform: "translate(0px, 0)",
						}
					},function(){
						animArrow();
					});
				});
			});
		});
	}

	MyBanner.prototype = {

		init: function(){
			ggg.init(settings, banner.playFromStart);
			banner.ClickHandlers();
			animArrow();
		},

		playFromStart: function(){
			banner.reset();
			 // force IE8 to show backup image, not sure if allowed
			if( ggg.browser.IE8 && backupURL ){
				ggg.css(dom.clickthrough,{ 'z-index':'9999', 'background':'url("'+backupURL+'") no-repeat 0 0' });
			}else{
				banner.timings();
			}
		},

		ClickHandlers: function(){
			ggg.event(dom.clickthrough, 'click', banner.ClickThrough);
		},
		ClickThrough: function(){
	 		ggg.log('Clickthrough');
	 		
	 		// Clickthroughs preset, remove if needed
			switch (ggg.platform){
				case "DC": Enabler.exit('Background Exit');
				break;
				case "EB":
					EB.clickthrough();
				break;
				default:
					if(window.clickTag){
						window.open(window.clickTag);
					}else{
						ggg.log("No clickTag set", true);
					}
				break;
			}
		},

		reset: function(){
			ggg.resetDom(dom);
			ggg.show(dom.ad);

			ggg.opacity(dom.bg2,1);

			ggg.opacity(dom.frame01,0);
			ggg.opacity(dom.frame02,0);
			ggg.opacity(dom.frame03,0);
		},

		timings: function(){
			banner.animation.in_frame01(function(){
				ggg.delay(3,function(){
				banner.animation.out_frame01();

					banner.animation.out_frame01();
					banner.animation.in_frame02(function(){
						ggg.delay(3,function(){

							banner.animation.out_frame02(function(){
								banner.animation.in_frame03(function(){
									ggg.delay(3.5,function(){
						
										if(ggg.loop()){
											banner.animation.out_frame03(function(){
												banner.playFromStart();
											});
										}

									});
								});
							});

						});
					});
					
				});
			});
		},
		animation: (function(){

			function in_frame01(callback){
				var productWidth = ggg.ad.width-dom.product.getElementsByTagName("img")[0].width;
				ggg.animate({
					asset : dom.product,
					delay: 0,
					time : "10s",
					easing : ggg.easing.linear,
					from: {
						opacity: 1,
						transform: "translate(0, 0)",
					},
					to: {
						opacity: 1,
						transform: "translate("+productWidth+"px, 0)",
					}
				});
				ggg.animate({
					asset : dom.bg2,
					delay: 0,
					time : "0.4s",
					easing : ggg.easing.linear,
					to: {
						opacity: 0,
					}
				});

				var delay = 1;
				ggg.opacity(dom.frame01,1);
				ggg.animate({
					asset : dom.bg1,
					delay: delay,
					time : inSpeed,
					easing : ggg.easing.easeOut,
					from: {
						opacity: 1,
						transform: "translate(0, 300px)",
					},
					to: {
						opacity: 1,
						transform: "translate(0px, 0)",
					}
				});
				ggg.animate({
					asset : dom.frame01txt01,
					delay: delay+0.05,
					time : inSpeed,
					easing : ggg.easing.easeOut,
					from: {
						opacity: 1,
						transform: "translate(0, 300px)",
					},
					to: {
						opacity: 1,
						transform: "translate(0px, 0)",
					}
				});
				ggg.animate({
					asset : dom.frame01txt02,
					delay: delay+0.1,
					time : inSpeed,
					easing : ggg.easing.easeOut,
					from: {
						opacity: 1,
						transform: "translate(0, 300px)",
					},
					to: {
						opacity: 1,
						transform: "translate(0px, 0)",
					}
				}, callback);
			}
			function out_frame01(callback){
				ggg.animate({
					asset : dom.frame01txt01,
					delay: 0,
					time : '0.2s',
					easing : ggg.easing.easeIn,
					to: {
						opacity: 0,
					}
				});
				ggg.animate({
					asset : dom.frame01txt02,
					delay: 0,
					time : '0.2s',
					easing : ggg.easing.easeIn,
					to: {
						opacity: 0,
					}
				}, callback);
			}
			

			function in_frame02(callback){
				ggg.opacity(dom.frame02,1);
				ggg.animate({
					asset : dom.frame02txt01,
					delay: 0.05,
					time : inSpeed,
					easing : ggg.easing.easeOut,
					from: {
						opacity: 1,
						transform: "translate(0, 300px)",
					},
					to: {
						opacity: 1,
						transform: "translate(0px, 0)",
					}
				});
				ggg.animate({
					asset : dom.frame02txt02,
					delay: 0.1,
					time : inSpeed,
					easing : ggg.easing.easeOut,
					from: {
						opacity: 1,
						transform: "translate(0, 300px)",
					},
					to: {
						opacity: 1,
						transform: "translate(0px, 0)",
					}
				}, callback);
			}
			function out_frame02(callback){
				ggg.animate({
					asset : dom.bg2,
					delay: 0,
					time : '0.4s',
					easing : ggg.easing.easeIn,
					to: {
						opacity: 1,
					}
				}, callback);
			}
			

			function in_frame03(callback){
				var duration = "0.85s";
				ggg.opacity(dom.frame03,1);
				ggg.animate({
					asset : dom.frame03txt,
					delay: 0.05,
					time : duration,
					easing : ggg.easing.easeOutQuad,
					from: {
						opacity: 1,
						transform: "translate(0, 300px)",
					},
					to: {
						opacity: 1,
						transform: "translate(0, 0px)",
					}
				});
				ggg.animate({
					asset : dom.frame03logo,
					delay: 0.1,
					time : duration,
					easing : ggg.easing.easeOutQuad,
					from: {
						opacity: 1,
						transform: "translate(0, 300px)",
					},
					to: {
						opacity: 1,
						transform: "translate(0, 0px)",
					}
				});
				ggg.animate({
					asset : dom.frame03arrow,
					delay: 0.15,
					time : duration,
					easing : ggg.easing.easeOutQuad,
					from: {
						opacity: 1,
						transform: "translate(0, 300px)",
					},
					to: {
						opacity: 1,
						transform: "translate(0, 0px)",
					}
				}, callback);
			}
			function out_frame03(callback){
				ggg.animate({
					asset : dom.frame03,
					delay: 0,
					time : "0.4s",
					easing : ggg.easing.easeIn,
					from: {
						opacity: 1,
					},
					to: {
						opacity: 0,
					}
				}, callback);
			}


			return {
				in_frame01	: in_frame01,
				out_frame01	: out_frame01,
				in_frame02	: in_frame02,
				out_frame02	: out_frame02,
				in_frame03	: in_frame03,
				out_frame03	: out_frame03,
			}
		})(),

	};

	var banner = new MyBanner();

})();