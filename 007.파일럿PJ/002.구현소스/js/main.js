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

      // 이징변수
      let easing = "easeOutQuint";

      // 화면커버(광드래그 막기)
      let cover = $(".cover");

      // 슬라이드 순번 변수
      let sno = 0; // 첫슬라이드는 0번 (블릿li순번도 0번부터)

      // 블릿요소
      let indic = $(".bindic li");

      // 슬라이드 개수
      let scnt = slide.find("li").length;

      //console.log("슬수:"+scnt);

      
      // 자동넘김지우기는 드래그 시작이벤트(dragstart)에서 해줘야 미리 끊어줄 수  있다~!
      slide.on("dragstart",()=>{
          
        
        clearAuto()
        
        });
          
      
      // 대상: .slide  -> slide 변수

      
      
      // 이벤트: dragstop -> 
      slide.on("dragstop",function(){

            // 자동넘김 지우기
            clearAuto()


            // 광드래그 막기 커버 보이기 
            cover.show();

            // 슬라이드 위치값 구하기
            spos = slide.offset().left; // offset().left 화면 왼쪽 기준선 left 위치
            //console.log("슬위:"+spos);


            /////////////// 이동 구현하기 //////////////////////
            // 1. 오른쪽에서 들어오는 이동 -> left: -110% 보다 작을 때
            // -110% 구하기 -> -win*1.1

            if(spos < -win*1.1){

                // 슬라이드가 -200%위치로 이동한다.
                // stop() 메서드는 animate가 큐에 쌓이는 것을 막는다.
                slide.stop().animate({

                    left: -win*2 + "px"

                },600,easing,function(){// 콜백함수(이동후)
                    // 변경대상 : .slide -> slide변수
                    slide
                    // 첫번째 슬라이드 li를 맨뒤로 보내기
                    .append(slide.find("li").first())
                    // 이 때 left값을 -100%위치로 고정해야함
                    .css({left:-win+"px"});

                    // 광드래그 커버 지우기
                    cover.hide();

                    // 배너글자 등장함수 호출
                    showTxt();
                    // 아랫쪽의 sno변경이 먼저이루어짐


                });///// animate //////////////
                
                // 블릿순번 변경하기 : 오른쪽이동은 증가
                sno++;
                // 한계수 : 슬라이드 수와 같아지면 첫번호로!
                if(sno===6) sno=0;

                // 블릿변경함수 호출
                chgIndic();

            }////////////if 문 : 오른쪽에서 들어오는 이동 ///////////

            // 2. 왼쪽에서 들어오는 이동 -> left: -90% 보다 클때 
            // -90% 구하기 -> -win*0.9

            else if(spos > -win*0.9){

                // 슬라이드가 -0위치로 이동한다.
                slide.stop().animate({

                    left: "0px"
                },600,easing,function(){ // 콜백함수(이동후)
                    // 대상: .slide -> slide변수
                    slide
                    // 맨뒤의 슬라이드 li를 맨 앞으로 이동
                    .prepend(slide.find("li").last())
                    .css({left:-win+"px"});
                    // 광드래그 커버 지우기
                    cover.hide();

                    // 배너글자 등장함수 호출
                    showTxt();

                });/////////animate////////////

                  // 블릿순번 변경하기 : 왼쪽이동은 감소!
                  sno--;
                  // 한계수 : -1이 되면 마지막번호로!(슬라이드 개수 -1)
                  if(sno===-1) sno = scnt - 1;

                  // 블릿변경함수 호출
                  chgIndic();

            }/////////// else if문 : 왼쪽에서 들어오는 이동 /////////////

            // 3. 사이범위 일때 제자리로 돌아오기 //
            // -110% < 범위 < -90%
            else{
                // 슬라이드가 원위치로 돌아옴
                slide.stop().animate({
                    left: -win + "px"
                },300,easing,function(){
                    // 광드래그 커버 지우기
                    cover.hide();
                });
            } ///////////else문 : 사이범위 /////////
            
      });///////////////// dragstop /////////////////////////
      ///////////////////////////////////////////////////



      ///////////// 블릿변경함수 ////////////////////////
      let chgIndic = () => {
        // 블릿변경하기 : .bindic li -> indic 변수
        indic.eq(sno).addClass("on")
        .siblings().removeClass("on");

        //console.log("블순:"+sno);

      };////////////// chgIndic 함수 ///////////////////


      ////////////////// 배너글자 등장 함수 ///////////////////
      let banTxt = [
            "Men's Season<br>Collection",
            "2021 Special<br>Collection",
            "GongYoo<br>Collection",
            "T-shirt<br>Collection",
            "Shoes<br>Collection",
            "Wind Jacket<br>Collection",
            ];

      let showTxt = () => {

           
            // 0. 있을 수 있는 .btit 박스 지우기
            $(".bit").remove();
            

            // 1. 배너글자 박스 넣기
            // 대상 : .slide li -> 항상 두번째 슬라이드임.
            slide.find("li").eq(1)
            .append('<h2 class="btit"></h2>');

            // 배너화면 구성상 왼쪽과 오른쪽으로 글자위치 조정
            // sno 순번 1,2만 오른쪽
            // left value  즉, left값을 변수로 처리!

            let lval = "30%"; // 왼쪽설정값
            if(sno===1 || sno===2) lval="70%";//오른쪽 설정값


            // 2. 배너글자 박스 CSS
            $(".btit").css({

                position: "absolute",
                top: "55%",// 
                left: lval,// 변수로 처리
                transform: "translate(-50%,-50%)",
                font:"bold 4.5vmax verdana",
                color:"#fff",
                textShadow: "1px 1px 3px #777",
                whiteSpace: "nowrap",
                opacity:0 // 투명도(문자형/숫자형 모두가능)

            })/////////// css ////////////////


            // 3. 글자넣기 - 주인공에서 이어짐
            .html(banTxt[sno])

            // 4. 애니메이션 등장하기 - 주인공에서 이어짐
            .animate({
                top : "50%",
                opacity:1
            },1000,"easeInOutQuart");

      };////////////// showTxt 함수 //////////////////
      
      // 배너텍스트 등장함수 최초호출
      showTxt();


      ////////////////////////////////////////////////////////////////////////////
      ////////////// 배너 자동넘기기 함수 : 오른쪽에서 들어옴////////////////////////
      ////////////////////////////////////////////////////////////////////////////

      let goSlide = () => {

                // 광드래그 막기 커버 보이기 
                cover.show();

                // 슬라이드가 -200%위치로 이동한다.
                // stop() 메서드는 animate가 큐에 쌓이는 것을 막는다.
                slide.stop().animate({

                    left: -win*2 + "px"

                },600,easing,function(){// 콜백함수(이동후)
                    // 변경대상 : .slide -> slide변수
                    slide
                    // 첫번째 슬라이드 li를 맨뒤로 보내기
                    .append(slide.find("li").first())
                    // 이 때 left값을 -100%위치로 고정해야함
                    .css({left:-win+"px"});

                    // 광드래그 커버 지우기
                    cover.hide();

                    // 배너글자 등장함수 호출
                    showTxt();
                    // 아랫쪽의 sno변경이 먼저이루어짐


                });///// animate //////////////
                
                // 블릿순번 변경하기 : 오른쪽이동은 증가
                sno++;
                // 한계수 : 슬라이드 수와 같아지면 첫번호로!
                if(sno===6) sno=0;

                // 블릿변경함수 호출
                chgIndic();



      };////////////// goSlide함수 ////////////////////////

     
      let autoI; // 인터벌용 변수 : 지우기용


      //////////////////////////////////////////////////////
      /////////////// 자동 인터벌 호출 함수 //////////////
      //////////////////////////////////////////////////////

      let autoSlide = () => {

            autoI = setInterval(goSlide,2500);// 2.5초 간격으로 goSlide함수를 호출!
           
      };//////autoSlide함수 ////////////////////


      // 인터발 최초호출
      autoSlide();
      //////////////////////////////////////////////////////////
      //////////// 인터발 지우기 함수 + 안건들면 다시 호출 ///////
      /////////////////////////////////////////////////////////

      // 타임아웃용 변수 : 지우기 위해
      let autoT;


      let clearAuto = () => {

            // 1.인터발 지우기
            clearInterval(autoI);
            // 2.타임아웃 지우기(실행쓰나미 방지)
            clearTimeout(autoT);
            // 3.일정시간뒤 다시 인터발 호출
            autoT = setTimeout(autoSlide,3000);// 3초동안 기다렸다가 다시 인터발함수 호출


      };/////////// clearAuto함수 ////////////////


});///////////////////jQB///////////////////