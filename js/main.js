document.addEventListener("DOMContentLoaded", function() {
  const navigationLinks = document.querySelectorAll(".nav-link a");
  const articleTxt = document.querySelectorAll(".section-p");
  const aboutImg = document.querySelectorAll(".about-gallery img");
  const aboutTxt = document.querySelectorAll(".about-gallery .text");
  const foodImg = document.querySelectorAll(".food img");
  const foodTxt = document.querySelectorAll(".food .foodText");
  const hamburgerIcon = document.getElementById("icon");
  const navigation = document.getElementById("nav");
  // const facilityImg = document.querySelectorAll("#facilityImg");
  const facilityImgs = document.querySelectorAll("#facilityImg .item");
  console.log(facilityImgs);
  hamburgerIcon.firstChild.textContent = "≡";
  
  let isTopButtonVisible = false;
  window.onload = function() {
    modalWindow.style.visibility= "hidden"; 
  };
 
  document.querySelectorAll('.left').forEach(elm => {
      elm.onclick = function () {
            let ul = elm.parentNode.querySelector('ul');
            ul.scrollLeft -= ul.clientWidth;
      };
   
  });
  document.querySelectorAll('.right').forEach(elm => {

    elm.onclick = function () {
      let ul = elm.parentNode.querySelector('ul');
      ul.scrollLeft += ul.clientWidth;
    };

  });

  function throttle(fn, delay) {
    let timerId;
    let lastExecTime = 0;
    return () => {
      const context = this;
      const args = arguments;
      let elapsedTime = performance.now() - lastExecTime;
      const execute = () => {
        fn.apply(context, args);
        lastExecTime = performance.now();
      }
      if (!timerId) {
        execute();
      }
      if (timerId) {
        clearTimeout(timerId);
      }
      if (elapsedTime > delay) {
        execute(); 
      } else {
        timerId = setTimeout(execute, delay);
      }
    }
  }

  function highlightCurrentLink() {
    const scrollPosition = window.scrollY;
    articleAnimation();
    if (scrollPosition > 0 && !isTopButtonVisible) {
      const topButton = document.getElementById("topButton");
      topButton.classList.add("topb");
      isTopButtonVisible = true;
    } else if (scrollPosition === 0 && isTopButtonVisible) {
      const topButton = document.getElementById("topButton");
      topButton.classList.remove("topb");
      isTopButtonVisible = false;
    }

    navigationLinks.forEach(link => {
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetHeight = targetElement.offsetHeight;
        const offsetTop = targetElement.offsetTop;

        if (
          scrollPosition >= offsetTop + 500 &&
          scrollPosition < offsetTop + offsetHeight + 500
        ) {
          link.classList.add("current");
        } else {
          link.classList.remove("current");
        }
      }
    },{passive:true});
  }

  function handleLinkClick(event) {
    // event.preventDefault();
    const targetId = event.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      window.scrollTo({
        top: offsetTop + 900,
        behavior: "smooth"
      });
    }
  }
  function articleAnimation(){
      getElem(articleTxt);
      getElem(aboutTxt);
      
  }

  function aboutAnimation(){
    getElem(aboutImg);
  }

  function foodAnimation(){
    getElem(foodImg);
    getElem(foodTxt);
  }
 function facilityAnimation(){
    getElem(facilityImg);
 }

  function getElem(el){
    
    for(let i = 0; i<el.length;i++){
      //https://developer.mozilla.org/ja/docs/Web/API/Element/getBoundingClientRect
            //                  ↓padding,marginなどの幅も含んだ要素全体が収まる最小の長方形。

      const rect = el[i].getBoundingClientRect().top;
      const scroll = window.scrollY || document.documentElement.scrollTop;
      const offset = rect + scroll;
      const windowHeight = window.innerHeight;
      
      if(el == aboutImg || el == aboutTxt){
          if(scroll > offset - windowHeight + 320){
            el[i].classList.add("aboutFade");

          }
      }else if(el == articleTxt){
        if(scroll > offset - windowHeight + 150){
          el[i].classList.add("fade");
        }
      }else if(el == foodImg || el == foodTxt){
        if(scroll > offset - windowHeight + 150){
          el[i].classList.add("foodFade");

        }
      }else if(el == facilityImg){
        if(scroll > offset - windowHeight + 150){
         facilityImgs.forEach(e =>{
            gsap.to(".",{x:100});
         });

         }
        }
    }
  }


  hamburgerIcon.addEventListener("click", ()=> {
    // var iconTl = gsap.timeline();
    if(hamburgerIcon.firstChild.textContent == "≡"){
      hamburgerIcon.firstChild.textContent = "×";
      navigation.classList.toggle("active");
  

    
    }else{
      hamburgerIcon.firstChild.textContent = "≡";
      navigation.classList.toggle("active");

    }
  });

  const thumbnails = document.querySelectorAll(".item img");
  // const originalImg = document.querySelectorAll("#modalImg ul li");//画像を取得
  const modalWindow = document.getElementById("modalD");
  const modalImage = modalWindow.querySelector("img");


  modalImage.addEventListener("click", function(event){
    closeModal();
    event.stopPropagation();
    
  });
  const showKeyframes = {
    opacity:[0,1],
    visibility:'visible',
    display:'block',
    zIndex:20000,
  
  };
  const hideKeyframes = {
    opacity:[1,0],
    visibility:'hidden',
  };
  const options = {
    duration:800,
    easing:'ease',
    fill:'forwards',
   
  };
  const modalClose = document.getElementById("modalClose");
  const body = document.querySelector("body");
  const closeModal = (event) => {

    modalWindow.animate(hideKeyframes, options); 
    modalWindow.style.visibility = (modalWindow.style.visibility === "hidden" ? "visible" : "hidden")

    event.stopPropagation();

  };

  
  modalClose.addEventListener("click",closeModal);
  modalWindow.addEventListener("click",closeModal);
  
  thumbnails.forEach(function(thumbnail,thumbnailIndex){
    thumbnail.addEventListener("click", throttle(function() {
      console.log(thumbnail.src);
    modalImage.src = thumbnail.src;
    modalWindow.animate(showKeyframes,options);
    modalWindow.style.visibility = (modalWindow.style.visibility === "hidden" ? "visible" : "hidden")

    }));
  });
  // console.log(modalWindow);
  window.addEventListener("scroll",throttle(()=>{
    highlightCurrentLink();
    articleAnimation();
    aboutAnimation();
    foodAnimation();
    facilityAnimation();
  },200,{passive: true}));

  // window.addEventListener("scroll",throttle(()=>highlightCurrentLink(),400));
  // window.addEventListener("scroll",throttle(()=>articleAnimation(),400));
  // window.addEventListener("scroll",throttle(()=>aboutAnimation(),400))
  // window.addEventListener("scroll",throttle(()=>foodAnimation(),400))

  navigationLinks.forEach(link => {
    link.addEventListener("click", handleLinkClick);
  });


});
