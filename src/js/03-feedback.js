import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');
// const inputEl = document.querySelector('input');
// const textareaEl = document.querySelector('textarea');

const FORM_DATA = 'feedback-form-state';

let formObj = {};
    
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onShow, 500));

onLocalStoragGet();

   
    //  зкидання
 
function onFormSubmit(e) {
    e.preventDefault();
    console.log('Это объект с данными формы', formObj);
    
    e.target.reset();
    localStorage.removeItem(FORM_DATA);
}

    // запис з інпута
function onShow(e) {
    formObj[e.target.name] = e.target.value;
    // console.log('formObj', formObj);

    onLocalStoragSave(formObj);
}

    // конвертація у формат Json
function onLocalStoragSave() {
    const localData = JSON.stringify(formObj);
    localStorage.setItem(FORM_DATA, localData);
}

    // вставка тексту із формата json
     
function onLocalStoragGet(e) {
    const savedData = localStorage.getItem(FORM_DATA);
    if (savedData) {
        const saveFormObj = JSON.parse(savedData);
        // console.log('saveFormObj', saveFormObj);
        // console.log(" Object.keys(saveFormObj);", Object.keys(saveFormObj));
        // console.log(" Object.values(saveFormObj);", Object.values(saveFormObj));
        // console.log(" Object.entries(saveFormObj)", Object.entries(saveFormObj));
        Object.entries(saveFormObj).forEach(([key, value]) => {
            formObj[key] = value;
            form.elements[key].value = value;
            // if (inputEl.name === key) {
            //     inputEl.value = value;
            // } else if (textareaEl.name === key) {
            //     textareaEl.value = value;
            // } else return;
        }
        )
    }
}
