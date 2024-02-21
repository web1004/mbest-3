$(document).ready(function() {

  window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";
  
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage;                            //Webkit, Safari, Chrome
  });

  // 브라우저 크기 바꿨을 때 이벤트
  $(window).resize(function(){
    location.reload();
  });

  // 스크롤바 영역 숫자 나오게 하는 법
  /* $(window).scroll(function(){
    $("#txt1").text($(this).scrollTop());
  }); */

  // ===============================
  const $text = document.querySelector(".main-typing");

  // 글자 모음
  const letters = [
    "Publishing",
    "UX UI Design", 
    "Graphic Design"
  ];
  
  // 글자 입력 속도
  const speed = 80;
  let i = 0;
  
  // 타이핑 효과
  const typing = async () => {  
    const letter = letters[i].split("");
    
    while (letter.length) {
      await wait(speed);
      $text.innerHTML += letter.shift(); 
    }
    
    // 잠시 대기
    await wait(800);
    
    // 지우는 효과
    remove();
  }
  
  // 글자 지우는 효과
  const remove = async () => {
    const letter = letters[i].split("");
    
    while (letter.length) {
      await wait(speed);
      
      letter.pop();
      $text.innerHTML = letter.join(""); 
    }
    
    // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
    i = !letters[i+1] ? 0 : i + 1;
    typing();
  }
  
    // 딜레이 기능 ( 마이크로초 )
    function wait(ms) {
      return new Promise(res => setTimeout(res, ms))
    }
  
    // 초기 실행
    setTimeout(typing, 1000);
  // ===============================

  // 새로고침 했을 때 스크롤 맨 위로
  setTimeout(function(){
    $('html, body').scrollTop(0);
  }, 1000);

  // 해상도 최적화 팝업 닫기
  $("#resolution .close").click(function(){
    $("#resolution").hide();
  })

  // Scroll Down Button
  $(".scroll-down").click(function(){
    $('html, body').animate({
      scrollTop: 990      
    }, 600);
  });

  $(window).scroll(function(){    
    if($(this).scrollTop()<100){
      $(".scroll-down").fadeIn(200);
    }else{
      $(".scroll-down").fadeOut(200);
    }
  });

  // Scorll Up Button
  $(window).scroll(function(){    
    if($(this).scrollTop()>1300){
      $(".scroll-up").fadeIn();
    }else{
      $(".scroll-up").fadeOut();
    }
  });

  $(".scroll-up").click(function(){
    $('html, body').animate({
      scrollTop: 0      
    }, 400);
  });

  // 메인 가로 슬라이드
  let $img = $("section");
  let $imgdiv=$("section>div");
  let $img_w = $("section>div").width();
  let $dotbtn=$(".navi-dots li"); /* 하단 페이지네이션 닷 */
  let img_n = $imgdiv.length; //이미지의 총개수  
  let oldidx=0;  //기존이미지
  let index=0;  //선택된 새이미지

  function slideImg(index){   
    targetX=-(index*$img_w); //움직이는 거리(너비)    
    $img.animate({left:targetX},600);  //위에서 계산한 거리만큼 움직임
    if(oldidx!=index){ /* 기존의 이미지와 선택된 이미지가 다를 때 */
      $dotbtn.eq(oldidx).removeClass("on");  //기존버튼 비활성화
      $dotbtn.eq(index).addClass("on");  //선택버튼 활성화
      $('html').scrollTop(0);
    };
    oldidx=index;    
    /* 선택된 새 이미지는 다시 기존 이미지로 저장되어서 Fade Out */  
  };

  // 하단 페이지네이션 닷 클릭시...
  $dotbtn.click(function(){
    index=$(this).index(); /* 0,1,2... */
    slideImg(index);
  });

  // 메인 슬라이드 좌우 버튼
  $(".next-btn").click(function(){   
    index++;	
    if(index>img_n-1){ 
      index=0;
    } /* 끝까지 가면 다시 처음으로 */
    slideImg(index);
  });

  $(".prev-btn").click(function(){
    index--;		
    if(index<0){ /* 선택한 이미지가 4,3,2,1,0에서 첫번째 이미지일 때 맨 마지막부터 다시 시작 */
    index=img_n-1; /* 총개수 5-1=4(index 0,1,2,3,4) */
    }
    slideImg(index);
  });    

  // Main, About 스크롤 막기  
  $('#main, #about').on('scroll touchmove mousewheel', function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  // Work-1 Webtrend Modal OPEN
  $('.wbt-btn').click(function(){    
    let wbtModal = $(this).attr('data-modal');
    $('.prognroll-bar').hide();
    $("#"+wbtModal).fadeIn(400);  
  });
  // Work2 Webtrend Modal CLOSE
  $(document).mouseup(function (e){
    var modalClose = $(".modal-bg-1, .modal-bg-2, .modal-bg-3");      
    if(modalClose.has(e.target).length === 0){
      modalClose.fadeOut(400);        
      $('.prognroll-bar').show();        
    }      
  });

  // Discord Storyboard Tab Menu
  $(".discord-tabmenu > span").click(function(){
    $(this).siblings().removeClass("on");
    $(this).addClass("on");
    $('.dContainer > div').hide();
    let = dTabOn = $(this).attr('data-dTab');
    // let = dTabOff = $(this).siblings().attr('data-dTab');
    $('#'+dTabOn).fadeIn();   
  });

  // Discord-5 Sub Pages Tab Menu
  $(".discord5-menu li").click(function(){
    $(this).siblings().removeClass("on");
    $(this).addClass("on");
    let = dSubOn = $(this).attr('data-dSub');
    $(".discord-5 > div").fadeOut();
    $('#'+dSubOn).fadeIn(400);    
  })  

  // Gallery
  
  // 1. 리스트 썸네일 이미지 클릭시 나오게 함
  $("#gallery-box > div").click(function(){ 
    gal_pop = $(this).index(); /* li에 index 변수 걸어준다. */
    /* 몇번째 썸네일을 누를 지 모르니까 this 이용 */
    
    $(".gal_page span:nth-child(1)").text(gal_pop+1); /* 오른쪽 상단 페이지 넘버 */
    /* 예) 5번 썸네일 클릭하면 상단 페이지 넘버가 '5'로 설정돼있는지. */
    /* 인덱스는 0부터 시작하지만 페이지수는 1부터 시작하니 +1을 해줬다. */   

    /* 숨기기 */
    $('.prognroll-bar').hide(); 
    $('.prev-btn').hide();
    $('.next-btn').hide();
    $('.navi-dots').hide();

    $("#pop-up>li").eq(gal_pop).stop().show(); /* g_pop index에 해당하는 팝업 보이기 */
    /* li(g_pop)의 "몇번째"를 콕 찝어주는 게 eq의 역할 */
   
    $("#gal-modal").stop().fadeIn(); /* 검정배경 */
    $('.pop-body').scrollTop(0);
  });

  // 2-1. 좌우 버튼 - 다음보기
  $(".gal-right-btn").click(function(){
    $('.pop-body').scrollTop(0); /* 새로운 팝업창 이동할 때 마다 스크롤 맨위로 갱신 */
    /* 마지막 페이지 도달 시, 더 이상 넘어가지 않게 막아줘야 한다. */
    $('.prognroll-bar').hide(); /* 페이지 프로그레스바 숨기기 */
    if(gal_pop<29){ /* 인덱스 기준 13번을 뜻함 */ 
      $("#pop-up > li").stop().fadeOut(); /* 기존 것 사라짐. 클릭한 this 아님. */
      gal_pop++; /* 내가 클릭한 썸네일 페이지 수에서 1씩 더한다. */
      $(".gal_page span:nth-child(1)").text(gal_pop+1);
      $("#pop-up > li").eq(gal_pop).stop().fadeIn();
    };
  });

  // 2-2. 좌우 버튼 - 이전 보기
  $(".gal-left-btn").click(function(){
    $('.pop-body').scrollTop(0);
    $('.prognroll-bar').hide(); /* 페이지 프로그레스바 숨기기 */
    if(gal_pop>0){
      $("#pop-up>li").stop().fadeOut(); /* 기존 것 사라짐. 클릭한 this 아님. */
      gal_pop--; /* 내가 클릭한 썸네일 페이지 수에서 1씩 뺀다 */
      $(".gal_page span:nth-child(1)").text(gal_pop+1);
      $("#pop-up>li").eq(gal_pop).stop().fadeIn();
    }
  });

   // Gallery Modal CLOSE
  $(document).mouseup(function (e){
    var galModalClose = $("#gal-modal");      
    if(galModalClose.has(e.target).length == 0){
      galModalClose.fadeOut(400); 
      $("#pop-up>li").stop().fadeOut();

      $('.prognroll-bar').show(); 
      $('.prev-btn').show();
      $('.next-btn').show();
      $('.navi-dots').show();    
    }      
  }); 

  $(document).keydown(function(e){
    var code = e.keyCode || e.which;     
    if (code == 27) {
        $('#gal-modal').fadeOut();
        $('.prognroll-bar').show(); 
        $('.prev-btn').show();
        $('.next-btn').show();
        $('.navi-dots').show();  
    }
  });

  $('#gal-modal .close-btn').click(function(){
    $('#gal-modal').fadeOut();
    $('.prognroll-bar').show(); 
    $('.prev-btn').show();
    $('.next-btn').show();
    $('.navi-dots').show();  
  });

  



  // $('#element').off('scroll touchmove mousewheel'); 스크롤 잠금 해제

  // 크롬



});