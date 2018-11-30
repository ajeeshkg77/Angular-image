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
			var ind         = 0;
			let slideTimer;
			let start = 0;
			let end = 3;

			timer();

			scope.slideShow = slideImages = [
			{
				id:0,
				src:`assets/images/1.jpg`,
				status:false
			},

			{
				id:1,
				src:`assets/images/2.jpg`,
				status:false
			},

			{
				id:2,
				src:`assets/images/3.jpg`,
				status:false
			},

			{
				id:3,
				src:`assets/images/4.jpg`,
				status:false
			},

			{
				id:4,
				src:`assets/images/5.jpg`,
				status:false
			},

			{
				id:5,
				src:`assets/images/6.jpg`,
				status:false
			}];

			scope.buttonSlide = [];

			function buttonToggle(){
				scope.buttonSlide = [];
				for(let i = start; i < end; i++){
					scope.buttonSlide.push(scope.slideShow[i]);
				}
			}
			buttonToggle();

			statusChanger();

			scope.next = function(){
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

				$interval.cancel(slideTimer);
				timer();
				if(ind >= scope.slideShow.length-1){
					ind = 0;
				} else{
					ind += 1;
				}
				statusChanger();
			}

			scope.previous = function(){
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

				$interval.cancel(slideTimer);
				timer();
				if(ind <= 0){;
					ind = scope.slideShow.length-1;
				} else{
					ind -= 1;
				}
				statusChanger();
			}

			scope.getImage = function(index){
				console.log(index);
				ind = index;
				$interval.cancel(slideTimer);
				timer();
				statusChanger();
			}

			function timer(){
				slideTimer = $interval(function(){scope.next()},5000);
			}

			function statusChanger(){
				for(let i = 0; i < scope.slideShow.length; i++){
					if((ind === i)){
						scope.slideShow[i].status = true;
					}
					else{
						scope.slideShow[i].status = false;
					}
				}
			}
		}
	}
	sliderDirective.$inject = ['$interval'];
})();
