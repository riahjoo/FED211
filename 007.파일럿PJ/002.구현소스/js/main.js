// 파일럿 PJ 메인 JS - main.js


$(function(){///////////jQB///////////////////

      ////////////////////////////
      // 배너 드래그 기능 구현하기//
      ////////////////////////////

      // 드래그 대상 : .slide
      let slide = $(".slide");

      // 드래그 기능 주기 -> 제이쿼리 UI기능!
      slide.draggable({

          axis : "x" ////x축고정

      }); ////////draggable///////////

      /* 
        배너 드래그 이동의 기준
        1. 현재 슬라이드의 left:-100% 값을 기준으로 판단함
        2. 오른쪽에서 들어오는 이동 -> left: -110% 보다 작을 때
        3. 왼쪽에서 들어오는 이동 -> left: -90% 보다 클때
        4. 제자리로 돌아가는 이동 -> left가  -110%보다 크고 -90%보다 작을때

        -> 구현상 유의사항 : 실제로 이동시에 px단위로 이동함
        따라서 %를 px로 변환해줘야한다.
        예시) 가로크기 : 1000px -> left: -100% -> left : -1000px
            left: -110% -> left: -(1000*1.1)+"px"

      */

      
      // 윈도우 가로크기 구하는 함수

      let awin = () => $(window).width();
            // 화살표 함수 뒤에 중괄호{}없이 명령문 하나만 있으면 그게 바로 return 문이다. -> 함수 호출하는 곳으로 값을 가져감.

      // awin함수



      // 윈도우 가로크기
      let win = awin(); 

      // 화면 크기변경 (resize)시 윈도우 가로크기 업데이트
      $(window).resize(()=>{

            win = awin();
            //console.log("윈도가로:"+win);

      });///////////resize///////////
      //console.log("윈도우 가로크기:"+win);

      // 현재 슬라이드 위치값 구하기
      // 슬라이드 위치값
      let spos;

      // 대상: .slide  -> slide 변수
      
      // 이벤트: dragstop -> 
      slide.on("dragstop",function(){

            // 슬라이드 위치값 구하기
            spos = slide.offset().left; // offset().left 화면 왼쪽 기준선 left 위치
            //console.log("슬위:"+spos);

            /////////////// 이동 구현하기 //////////////////////
            // 1. 오른쪽에서 들어오는 이동 -> left: -110% 보다 작을 때
            // -110% 구하기 -> -win*1.1

            if(spos < -win*1.1){

                // 슬라이드가 -200%위치로 이동한다.
                slide.animate({

                    left: -win*2 + "px"

                },600,"easeOutQuint",function(){// 콜백함수(이동후)
                    // 변경대상 : .slide -> slide변수
                    slide
                    // 첫번째 슬라이드 li를 맨뒤로 보내기
                    .append(slide.find("li").first())
                    // 이 때 left값을 -100%위치로 고정해야함
                    .css({left:-win+"px"});

                });

            }

            // 2. 왼쪽에서 들어오는 이동 -> left: -90% 보다 클때 
            // -90% 구하기 -> -win*0.9

            else if(spos > -win*0.9){

                // 슬라이드가 -0위치로 이동한다.
                slide.animate({

                    left: "0px"
                },600,"easeOutQuint",function(){ // 콜백함수(이동후)
                    // 대상: .slide -> slide변수
                    slide
                    // 맨뒤의 슬라이드 li를 맨 앞으로 이동
                    .prepend(slide.find("li").last())
                    .css({left:-win+"px"});
                });

            }

            // 3. 사이범위 일때 제자리로 돌아오기 //
            // -110% < 범위 < -90%
            else{
                // 슬라이드가 원위치로 돌아옴
                slide.animate({
                    left: -win + "px"
                },300);
            } ///////////else문 : 사이범위 /////////


         
            
      });///////////////// drag /////////////////////////
      ///////////////////////////////////////////////////



});///////////////////jQB///////////////////