/*
* @description: slider app directive
* @author: sambath
*/
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
			var ind    = 0;
			let start  = 0;
			let end    = 3;
			let slideTimer;

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
				$interval.cancel(slideTimer);
				if(ind === 2){
					start = 3;
					end = 6;
					buttonToggle();
				}

				if(ind === 5){
					start = 0;
					end = 3;
					buttonToggle();
				}

				// $interval.cancel(slideTimer);
				// timer();
				if(ind >= scope.slideShow.length-1){
					ind = 0;
				} else{
					ind += 1;
				}
				statusChanger();
				timer();
			}

			scope.previous = function(){
				$interval.cancel(slideTimer);
				if(ind === 0){
					start = 3;
					end = 6;
					buttonToggle();
				}

				if(ind === 3){
					start = 0;
					end = 3;
					buttonToggle();
				}

				// $interval.cancel(slideTimer);
				// timer();
				if(ind <= 0){
					ind = scope.slideShow.length-1;
				} else{
					ind -= 1;
				}
				statusChanger();
				timer();
			}

			scope.getImage = function(index){
				$interval.cancel(slideTimer);
				console.log(index);
				ind = index;
				statusChanger();
				timer();
			}

			function timer(){
				slideTimer = $interval(function(){scope.next()},3000);
			}

			function statusChanger(){
				// timer();
				for(let i = 0; i < scope.slideShow.length; i++){
					if((ind === i)){
						scope.slideShow[i].status = true;
					}
					else{
						scope.slideShow[i].status = false;
					}
				}
			}

			scope.stopTimer = function(){
				$interval.cancel(slideTimer);
			}
			scope.startTimer = function(){
				$interval.cancel(slideTimer);
				timer();
			}

		}
	}
	sliderDirective.$inject = ['$interval'];
})();