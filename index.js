const dialogForm = {
  name: '',
  email: '',
  number: '',
  segment: '',
  invoicing: '',
  investment: '',
  site: '',
};

let counter = 0;

var script_url ="https://script.google.com/macros/s/AKfycbxOhOXN-3vgDdP7u63tsDWCCHk3DRhm8OiqR-wLsQUKaWEn5GGn/exec";
var emailcheck=false;
  // Make an AJAX call to Google Script

function insert_value() {

  var name= dialogForm.name;
  var email= dialogForm.email;
  var number= dialogForm.number;
  var segment= dialogForm.segment;
  var invoicing= dialogForm.invoicing;
  var investment= dialogForm.investment;
  var site= site;
  console.log(name);
  var url = script_url+"?callback=ctrlq&name="+name+"&number="+number+"&email="+email+"&invoicing="+invoicing+"&segment="+segment+"&investment="+investment+"&site="+site+"&action=insert"; 
  var request = jQuery.ajax({
    crossDomain: true,
    url: url ,
    method: "GET",
    dataType: "jsonp"
  });
}
window.onload = () => {
  const cardsCarousel = document.querySelector(".parent");
  const cards = [...cardsCarousel.children];
  const showDialogBtns = [...document.querySelectorAll(".dialogOpener")];
  const closeDialogBtn = document.querySelector(".close");
  const finalBtn = document.querySelector("#final");
  const okBtns = [...document.querySelectorAll(".okBtn")].filter(
    (btn) => btn !== finalBtn
  );

  const showDialog = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector(".popup").classList.add("active");
    document.querySelector(".root").classList.add("active");
    document.querySelector("html").style.overflow = "hidden";
    disableScroll();
  };

  const closeDialog = () => {
    document.querySelector(".popup").classList.remove("active");
    document.querySelector(".root").classList.remove("active");
    document.querySelector(".thanksCard").classList.remove("active");
    document.querySelector("html").style.overflowX = "hidden";
    document.querySelector("html").style.overflowY = "scroll";
    enableScroll();
  };

  const endDialog = (e) => {
    const input = e.target.parentElement.previousElementSibling;
    dialogForm[input.id] = input.value;
    document.querySelector(".popup").classList.remove("active");
    document.querySelector(".thanksCard").classList.add("active");
  };

  const showErrorMessage = (target) => {
    target.nextElementSibling.style.visibility = "visible";
    target.nextElementSibling.style.opacity = "1";
  };

  const HideErrorMessage = (target) => {
    target.nextElementSibling.style.visibility = "hidden";
    target.nextElementSibling.style.opacity = "0";
  };

  const nextQuestionBtn = ({ target, target: { id } }) => {
    const input = target.parentElement.previousElementSibling;
    if (input.value === "" && target.id !== "final") {
      showErrorMessage(target);
      return;
    }
    dialogForm[input.id] = input.value;
    HideErrorMessage(target);
    const form = document.querySelector(".form");
    const currentQuestion = target.parentElement.parentElement;
    const NEXT_QUESTION_ID = "#question" + id;
    const nextQuestion = document.querySelector(NEXT_QUESTION_ID);
    const CURRENT_QUESTION_HEIGHT = parseInt(
      window.getComputedStyle(currentQuestion).height
    );
    const CURRENT_QUESTION_MARGIN = parseInt(
      window.getComputedStyle(currentQuestion).marginBottom
    );

    form.scrollTo({
      behavior: "smooth",
      top: counter + CURRENT_QUESTION_HEIGHT + CURRENT_QUESTION_MARGIN,
    });
    counter += CURRENT_QUESTION_HEIGHT + CURRENT_QUESTION_MARGIN;
    nextQuestion.classList.remove("inactive");
    currentQuestion.classList.add("invisible");
  };

  okBtns.forEach((btn) => btn.addEventListener("click", nextQuestionBtn));
  showDialogBtns.forEach((btn) => btn.addEventListener("click", showDialog));
  closeDialogBtn.addEventListener("click", closeDialog);
  document.querySelector(".thanksClose").addEventListener("click", closeDialog);
  finalBtn.addEventListener("click", endDialog);
  finalBtn.addEventListener("click", insert_value);



  // console.log(dialogForm);
  

  if (window.screen.width < 600) {
    cardsCarousel.className = "carousel";
    for (const card of cards) {
      card.className = "carousel-cell";
    }
    const flickity = new Flickity(cardsCarousel, {
      autoPlay: true,
      prevNextButtons: false,
      pageDots: false,
    });
  }
};
