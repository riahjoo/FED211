// GNB 링크 이동 셋팅하기 - linksys.js //

// 원페이지 이므로 GNB메뉴는 한 페이지안에서
// 페이지의 위치 이동을 애니메이션 한다!
// 동시에 페이지 위치표시자를 사용하여
// 페이지의 현재위치를 표시해 준다!
// 현재 페이지에 해당하는 GNB는 클래스를 
// 사용하여 마우스오버시와 동일한 디자인을 준다!

$(function(){ //////// jQB ////////////////////////////

  $(".gnb a, .indic a").click(function(e){

      // 1. 기본이동막기
      e.preventDefault();

  });///////// a요소 기본이동막기

  // 대상: .gnb a + .indic a
  // -> GNB와 인디케이터는 구조가 똑같음!
  // 따라서 이미 구현된 클릭이벤트함수에 추가만해도됨!
  
  $(".gnb li, .indic li").click(function(){


      // 1. a요소 기본이동막기는 위에서 별도로 처리.

      // 2. 클릭된 a의 부모 li의 순번 알아내기
      // index() 메서드사용! -> 선택요소의 순번을 리턴!
      // parent() 메서드는 a요소의 부모인 li로 올라간다!
      // li는 순번이 0부터 읽어옴!
      let idx = $(this).index();
  
      //console.log("메뉴클릭!"+idx);

      /// 페이지이동을 위한 페이지번호(pno)는 
      /// 메뉴 클릭시의 순번인 idx와 같다!!!
      /// 그래서 pno에 idx를 할당함!
      pno = idx; // 중요!!!

      ///////////////////////////////////////////
      // 3. 전체 윈도우(window)화면 높이값 
      //                  단위로 이동위치 만들기///
      // .page의 top값으로 구하면 되지만 새로운버전의
      // 제이쿼리에서 씽크 불일치가 발생함!
      ///////////////////////////////////////////
      let pos = $(window).height() * pno;
      // $(window).height() 윈도우 높이값

      //console.log("이동위치:"+pos);

      /////////////////////////////////////////
      // 4. 실제 위치로 페이지 이동하기 /////////
      /////////////////////////////////////////
      // 전체 스크롤 이동대상: html,body 
      //          -> 두개다 잡는게 브라우저공통임! 
      $("html,body").animate({
          scrollTop: pos + "px"
      }, 800, "easeInOutQuart");

      ////////////////////////////////////////////////
      // 5. 현재 페이지에 해당하는 메뉴에 클래스 on넣기!
      ////////////////////////////////////////////////
      // 대상: .gnb li + .indic li
      // 해당 li에 클래스를 넣으면 css에서 셋팅된 디자인적용!
      $(".gnb li").eq(pno).addClass("on").siblings().removeClass("on");
      $(".indic li").eq(pno).addClass("on").siblings().removeClass("on");

      
     
      //다른 li형제들 class제거!
      
  
  }); //////////// click ///////////////////
  //////////////////////////////////////////


}); ///////////////// jQB ////////////////////////////
///////////////////////////////////////////////////////