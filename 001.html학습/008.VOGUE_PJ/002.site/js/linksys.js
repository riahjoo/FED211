/// 보그 코리아 링크 시스템 JS - linksys.js ///

$(function(){/////////// jQB /////////////////

      // console.log("링크시스템 로딩구역!");

      /// 1. 로고 클릭시 첫페이지로 가기
        // 대상: .logo a
        $(".logo a").click(function(){

            location.href="index.html";
            
        })/////////click///////////////


      /// 2. GNB 메뉴 링크 연결하기 ///
        // 대상 : .gnb a + .mongnb a (모바일용 gnb포함)
        // 이벤트 : click -> click() 메서드사용
        $(".gnb a, .mognb a").click(function(e){
            // e-이벤트전달변수 : 여러가지 이벤트 관련 설정가능
            
            // 1. 기본 이동속성 막기(a태그 기본속성)
            e.preventDefault()
            // preventDefault() 기본이벤트 발생을 막아준다.
            // e라는 이벤트 전달변수를 꼭 써야함.

            // 2. 클릭된 a요소의 텍스트 읽어오기
            let mtxt = $(this).text().toLowerCase().trim();
            //toLowerCase() -> 소문자 변환 메서드
            //비교) toUpperCase() -> 대문자변환 메서드
            //-> 메뉴가 대문자인데 Get방식으로 넘길때
            // 소문자로 넘기고자함. 그래서 변환했음.
            //-> sub페이지에서 소문자로 넘긴 파라미터를 활용함

            // trim() 메서드 : 문자데이터 앞뒤 공백 제거
            // -> 여기서는 마지막 검색아이콘 클릭시 앞뒤 공백있는 "search"
            // 라는 글자가 나온다.
            //console.log(mtxt);

            // 3. 페이지 이동하기 : url뒤에 ?(물음표) 키=값 쌍으로 보냄
            if(mtxt !== "search")//search가 아닐때만 아래 문장 진행.
              location.href="sub.html?cat="+mtxt;

            // cat이라는 키 이름은 내가 지은것이다.
            // 키=값 으로 데이터를 맞추기 위해서


        })////////// click /////////////

});/////////////// jQB ////////////////////////
///////////////////////////////////////////////