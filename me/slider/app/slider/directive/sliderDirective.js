(function(){
	angular
	.module('sliderApp')
	.directive('sliderDirective',sliderDirective);
	function sliderDirective($interval){
		var directive = {
			link: sliderLink,
			templateUrl: `app/slider/template/sliderTemplate.html`,
			restrict: `EA`
		};
		return directive;
		function sliderLink(scope,element,attrs){
			var startIndex = 0;
			let slideTimer;
var slideImages = [
			{
				id:0,
				src:`1.jpg`,
				status:false
			},

			{
				id:1,
				src:`2.jpg`,
				status:false
			},
 
			{
				id:2,
				src:`3.jpg`, 
				status:false
			},

			{
				id:3,
				src:`4.jpg`,
				status:false
			},

			{
				id:4,
				src:`5.jpg`,
				status:false
			},
			
			{
				id:5,
				src:`6.jpg`,
				status:false
			}];


			// l to start
			 // m to end 
			let start = 0;
			let end = 3;

			timer();

			scope.slideShow = slideImages;
			scope.buttonSlide = [];

			function buttonToggle(){
				scope.buttonSlide = [];
				for(let i = start; i < end; i++){
					scope.buttonSlide.push(scope.slideShow[i]);
				}
			}
			buttonToggle();

			statusChanger();
			timer();

			scope.next = function(){
				if(startIndex === 2){
					start = 3;
					end = 6;
					buttonToggle();
				}

				if(startIndex === 5){
					start = 0;
					end = 3;
					buttonToggle();
				}

				$interval.cancel(slideTimer);
				timer();
				if(startIndex >= scope.slideShow.length-1){
					startIndex = 0;
				} else{
					startIndex += 1;
				}
				statusChanger();
			}

			scope.previous = function(){
				if(startIndex === 0){
					start = 3;
					end = 6;
					buttonToggle();
				}

				if(startIndex === 3){
					start = 0;
					end = 3;
					buttonToggle();
				}

				$interval.cancel(slideTimer);
				timer();
				if(startIndex <= 0){;
					startIndex = scope.slideShow.length-1;
				} else{
					startIndex -= 1;
				}
				statusChanger();
			}

			scope.getImage = function(index){
				startIndex = index;
				$interval.cancel(slideTimer);
				timer();
				statusChanger();
			}

			function timer(){
				slideTimer = $interval(function(){scope.next()},5000);
			}

			function statusChanger(){
				for(let i = 0; i < scope.slideShow.length; i++){
					if((startIndex === i)){
						scope.slideShow[i].status = true;
					}
					else{
						scope.slideShow[i].status = false;
					}
				}
			}

			// original
			// function addImages(){
			// 	for(let i = 0 ; i < 3 ; i++){
			// 		scope.slideShow.push(slideImages[k]);
			// 		scope.slideShow[i].status = false;
			// 		k += 1;
			// 	}
			// 	if (k === 6){
			// 		k = 0;
			// 	}
			// }

			// addImages();
			// statusChanger();

			// function removeImages(){
			// 	scope.slideShow = [];
			// }

			// scope.next = function(){
			// 	$interval.cancel(slideTimer);
			// 	timer();
			// 	if(ind >= scope.slideShow.length-1){
			// 		removeImages();
			// 		addImages();
			// 		ind = 0;
			// 	} else{
			// 		ind += 1;
			// 	}
			// 	statusChanger();
			// }

			// scope.previous = function(){
			// 	$interval.cancel(slideTimer);
			// 	timer();
			// 	if(ind <= 0){
			// 		removeImages();
			// 		addImages();
			// 		ind = scope.slideShow.length-1;
			// 	} else{
			// 		ind -= 1;
			// 	}
			// 	statusChanger();
			// }

			// scope.getImage = function(index){
			// 	ind = index;
			// 	$interval.cancel(slideTimer);
			// 	timer();
			// 	statusChanger();
			// }

			// function timer(){
			// 	slideTimer = $interval(function(){scope.next()},7000);
			// }

			// timer();

			// function statusChanger(){
			// 	for(let i = 0; i < 3; i++){
			// 		if((ind === i)){
			// 			scope.slideShow[i].status = true;
			// 		}
			// 		else{
			// 			scope.slideShow[i].status = false;
			// 		}
			// 	}
			// }

		}
	}
	sliderDirective.$inject = ['$interval'];
})();