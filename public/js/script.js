
document.addEventListener('DOMContentLoaded', function() {
    /**
     * mobile버튼 공통
     */
    var button = document.querySelector('.mobile_btn');
    var menu = document.querySelector('.gnb_wrap');

    button.addEventListener('click', function() {
        if (window.getComputedStyle(menu).display === 'none') {
            menu.style.display = 'flex';
            var height = menu.scrollHeight + 'px';
            menu.style.maxHeight = '0';
            button.classList.add('on');
            setTimeout(function() {
                menu.style.maxHeight = height;
            }, 10);
        } else {
            menu.style.maxHeight = '0';
            menu.addEventListener('transitionend', function() {
                if (menu.style.maxHeight === '0px') {
                    menu.style.display = 'none';
                }
            }, { once: true });
            button.classList.remove('on');
            menu.removeAttribute('style');
        }
    });


});

(function($) {
    'use strict';


	$(function() {

		var $window = $(window),
				$scrollcontent = $('.scroll_content');

		$scrollcontent.each(function(){
			var $this = $(this),
					scrollTop = $window.scrollTop(),
					scrollBottom = scrollTop + $window.height(),
					contentOffset = $this.offset();
			if(scrollBottom > contentOffset.top) {
				$this.addClass('active');
			};
		});

		$window.on('scroll', function(event) {

			$scrollcontent.each(function(){
				var $this = $(this),
						scrollTop = $window.scrollTop(),
						scrollBottom = scrollTop + $window.height(),
						contentOffset = $this.offset();
				if(scrollBottom > contentOffset.top) {
					$this.addClass('active');
				}else{
					$this.removeClass('active');
				};
			});

		});

        //ajax
        $.ajax({
            url: './event/index.html',
            method: 'GET',
            success: function(data) {
                var $html = $(data);
                var cards = $html.find('.card');
                var eventList = $('.eventList');
                eventList.empty(); // .eventList 내용을 비웁니다.
    
                cards.each(function(index) {
                    var cardElement = $(this).clone();
                    var imgElement = cardElement.find('img');
                    var src = imgElement.attr('src');
                    imgElement.attr('src', src.replace('./images/', './event/images/'));
    
                    // .eventItem 요소를 생성하고 .card 요소를 추가합니다.
                    var eventItem = $('<div class="eventItem"></div>').append(cardElement);
                    eventList.append(eventItem);
                });

                eventList.slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: true,
                    arrows: true,
                    responsive: [
                        {
                            breakpoint:1060,
                            settings:{
                                slidesToShow:2,
                            }
                        },{
                            breakpoint:640,
                            settings:{
                                slidesToShow:1,
                            }
                        }
                    ]
                });
            },
            error: function(error) {
                console.log('Error fetching the cards:', error);
            }
        });

        
        $('.rightBox ul').on('mouseover click focusin', 'li', function(){
            var $this = $(this),
                $Siblings = $this.siblings('li'),
                $leftImg = $('.leftBox .leftImg'),
                $Index = $this.index();
            $this.addClass('active').siblings('li').removeClass('active');
            $leftImg.eq($Index).addClass('active').siblings().removeClass('active');
        });
        
        $('.rightBox li span > a').on('click', function(event){
            event.preventDefault(); // 기본 동작 막기
            var $clickedLink = $(this); // 클릭한 링크 저장
            var videoUrl = $(this).attr('href');
            if(videoUrl !== "#n") {
                var videoId = videoUrl.split('v=')[1];
                var embedUrl = 'https://www.youtube.com/embed/' + videoId;
                $('body').append('<div class="modalBox"><div class="modal"><button class="closeBtn">닫기</button><iframe width="560" height="315" src="' + embedUrl + '" frameborder="0" allowfullscreen></iframe></div></div>');
                $('.closeBtn').focus();
            } else {
                $('body').append('<div class="modalBox"><div class="modal"><button class="closeBtn">닫기</button>유효한 유튜브 경로가 아닙니다.</div></div>');
                $('.closeBtn').focus();
            }
            
            // 모달 닫기 기능 추가
            $('.closeBtn').on('click',function(){
                $(this).closest('.modalBox').remove();
                $clickedLink.focus();
            });
        });
	});
})(window.jQuery);
