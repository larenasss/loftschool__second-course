//////////////////////////////////////////////// мобильное меню

let buttonBurger = document.querySelector('.button-burger');
let fullscreen = document.querySelector('.fullscreen');
let bodystyle = document.querySelector('.body');
buttonBurger.addEventListener('click', function() { fullscreen.style.right = '0' });
let fullscreenExit = document.querySelector('.fullscreen__close');
fullscreenExit.addEventListener('click', function() { fullscreen.style.right = '-100%' });
fullscreenExit.addEventListener('click', function() { document.getElementsByTagName("body")[0].style.overflow="auto"; });
buttonBurger.addEventListener('click', function() { document.getElementsByTagName("body")[0].style.overflow="hidden";});

////////////////////////////////////////// Меню ( горизонтальный аккордеон)

let menu = document.querySelector('.options');
let optionsItem = document.querySelectorAll('.options__item');
let optionsItemLength = optionsItem.length;

menu.addEventListener('click', function(e) {
   for (let i = 0; i < optionsItemLength; i++) {
      optionsItem[i].classList.remove('options__item--active');
   }
});

for (let i = 0; i < optionsItemLength; i++) {
      optionsItem[i].addEventListener('click', function(e) {
         e.stopPropagation();
         e.preventDefault();

         if (optionsItem[i].classList.contains('options__item--active')) {
            optionsItem[i].classList.remove('options__item--active')
         } else { 
            for (let i=0; i < optionsItemLength; i++) { 
               optionsItem[i].classList.remove('options__item--active');
            }                     
            optionsItem[i].classList.add('options__item--active')
         }
      })
   }

//////////////////////////////////////// меню вертикальное 

let accordeonItem = document.querySelectorAll('.accordeon__item');
let accordeonItemLenght = accordeonItem.length;

for (let i = 0; i < accordeonItemLenght; i++) {
   accordeonItem[i].addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      if (accordeonItem[i].classList.contains('accordeon__item--active')) {
         accordeonItem[i].classList.remove('accordeon__item--active')
      } else {
         for (let i=0; i < accordeonItemLenght; i++) { 
            accordeonItem[i].classList.remove('accordeon__item--active');
         }
         accordeonItem[i].classList.add('accordeon__item--active')
      }
   })
}

////////////////////////////////////// слайдер бургеров

let scrollLeft = document.querySelector('.burgers__scroll-left');
let scrollRight = document.querySelector('.burgers__scroll-right');
let contentList = document.querySelector('.burgers__block-menu');


scrollRight.addEventListener('click', function(e) { 
   e.preventDefault(), contentList.appendChild(contentList.firstElementChild) 
});

scrollLeft.addEventListener('click', function(e) { 
   e.preventDefault(), contentList.insertBefore(contentList.lastElementChild, contentList.firstElementChild) });

/////////////////////////////////////////////// модалки

let reviews = document.querySelector('.reviews');
let reviewsTitle = document.querySelector('.reviews__title');
let popupTitle = document.querySelector('.popup__title');
let reviewsText = document.querySelector('.reviews__text');
let overlay = document.querySelector('.overlay');
let popupText = document.querySelector('.popup__text');
let popupClose = document.querySelector('.popup__close');

reviews.addEventListener('click', function (e) {
   e.preventDefault();
   let elem = e.target;

   if (elem.tagName === 'A') {
      let modalText = reviewsText.innerHTML;
      let modalTitle = reviewsTitle.innerHTML;

      popupText.innerHTML = modalText;
      popupTitle.innerHTML = modalTitle;
      overlay.style.display = 'block';
      document.getElementsByTagName("body")[0].style.overflow="hidden"; 
   }

   document.addEventListener('keyup', function (e) {
      let keyName = e.key;
      
      if(keyName === 'Escape') {
         overlay.style.display = 'none';
         document.getElementsByTagName("body")[0].style.overflow="auto"; 
      }
   })
});

popupClose.addEventListener('click', function (e) {
   overlay.style.display = 'none';
   document.getElementsByTagName("body")[0].style.overflow="auto"; 
})

/////////////////////////////////////////// Форма

let myForm = document.querySelector('.form__elem');
let formButton = document.querySelector('.form__btn');
let formOverlay = document.querySelector('.form__overlay');
let formClose = document.querySelector('.form__close');
let formPopup = document.querySelector('.popup');
let popupTextForm = document.querySelector('.popup__text-form');
let formNumber = document.querySelectorAll('.input-number');
let formNumberl = formNumber.length;
let formError = document.querySelectorAll('.error');

 
   for (let i = 0; i < formNumberl; i++)
   formNumber[i].addEventListener('keydown', function(e) {
      
   let isDigit = false;
   let isControl = false;
   let isBackspace = false;

   if (e.key >= 0 || e.key <= 9) {
      isDigit = true;
   }

   if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
      isControl = true;
   }

   if (e.key == 'Backspace') {
      isBackspace = true;
   }

   if (!isDigit && !isControl && !isBackspace) {
      e.preventDefault();
   }
});


formButton.addEventListener('click', function(e) {
   e.preventDefault();

   if (validateForm(myForm)) {
      let data = new FormData;
         data.append("name", myForm.elements.name.value);
         data.append("phone", myForm.elements.phone.value);
         data.append("comment", myForm.elements.comment.value);
         data.append("to", "my@gmail.com");

         const xhr = new XMLHttpRequest();
         xhr.responseType = 'json';
         xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
         xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
         xhr.send(data);
         xhr.addEventListener('load', function () {
            if (xhr.response.status) {

               formOverlay.style.display = 'block';
               popupTextForm.innerHTML = "Сообщение отправленно";
         } else {
               formOverlay.style.display = 'block';
               popupTextForm.innerHTML = "Отправить письмо не удалось, повторите запрос позже";
         }
         }); 
      }
   });

function validateForm(form) {

   let valid = true;

   if (!validateField(form.elements.name)) {
      valid = false;
   }

   if (!validateField(form.elements.phone)) {
      valid = false;
   }

   if (!validateField(form.elements.comment)) {
      valid = false;
   }

   return valid;
}

function validateField(field) {
     if (!field.checkValidity()) {
      formOverlay.style.display = 'block';
      popupTextForm.innerHTML = ['Заполните обязательные поля "Имя", "Телефон", "Комментарий"'];
      document.getElementsByTagName("body")[0].style.overflow="hidden";

      return false;
     } else {
      popupTextForm.innerHTML = '';
      return true;
     }
}

formClose.addEventListener('click', function (e) {
   formOverlay.style.display = 'none';
   document.getElementsByTagName("body")[0].style.overflow="auto";
});


   
