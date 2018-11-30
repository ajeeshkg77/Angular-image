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
			scope.slideShow = [];
			let k           = 0;
			let time;

			function addImages(){
				for(let i = 0 ; i < 3 ; i++){
					scope.slideShow.push(slideImages[k]);
					scope.slideShow[i].status = false;
					k += 1;
				}
				// statusChanger();
				if (k === 6){
					k = 0;
				}
			}

			addImages();
			statusChanger();

			function removeImages(){
				scope.slideShow = [];
			}

			scope.next = function(){
				$interval.cancel(slideTimer);
				timer();
				if(ind >= scope.slideShow.length-1){
					removeImages();
					addImages();
					ind = 0;
				} else{
					ind += 1;
				}
				statusChanger();
			}

			scope.previous = function(){
				$interval.cancel(slideTimer);
				timer();
				if(ind <= 0){
					removeImages();
					addImages();
					ind = scope.slideShow.length-1;
				} else{
					ind -= 1;
				}
				statusChanger();
			}

			scope.getImage = function(index){
				ind = index;
				$interval.cancel(slideTimer);
				timer();
				statusChanger();
			}

			function timer(){
				slideTimer = $interval(function(){scope.next()},3000);
			}

			timer();

			function statusChanger(){
				for(let i = 0; i < 3; i++){
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