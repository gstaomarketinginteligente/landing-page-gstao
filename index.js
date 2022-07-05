const dialogForm = {
  name: "",
  email: "",
  number: "",
  segment: "",
  invoicing: "",
  investment: "",
  site: "",
};

const firebaseConfig = {
  apiKey: "AIzaSyBDLcn8w_vA92O3QYe5cATI168eCtpCkyw",
  authDomain: "form-lp-gstao.firebaseapp.com",
  databaseURL: "https://form-lp-gstao-default-rtdb.firebaseio.com",
  projectId: "form-lp-gstao",
  storageBucket: "form-lp-gstao.appspot.com",
  messagingSenderId: "256491077335",
  appId: "1:256491077335:web:c03e8ec18a5a0722813a92",
  measurementId: "G-VHFE2DPXPM",
};

firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("1DsvQNErb5OkDeM-hul6eOPDTHGaYWqha0P9DNbL2iXo");

const saveMessages = (
  name,
  email,
  number,
  segment,
  invoicing,
  investment,
  site
) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    email: email,
    number: number,
    segment: segment,
    invoicing: invoicing,
    investment: investment,
    site: site,
  });
};

function submitForm() {
  saveMessages(
    dialogForm.name,
    dialogForm.email,
    dialogForm.number,
    dialogForm.segment,
    dialogForm.invoicing,
    dialogForm.investment,
    dialogForm.site
  );
}

let counter = 0;

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
  finalBtn.addEventListener("click", submitForm);

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
