const formData = {
    email: '',
    message: '',
};

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';


form.addEventListener('input', function (e) {
    e.stopPropagation();
    fillData(e.target);
});

form.addEventListener('submit', submit);

function fillData({name, value}) {
    formData[name] = value.trim();
}

function submit(event) {
    event.preventDefault();
    checkFills(); 
    
    setDataInStorage();
    clearData();
}

function checkFills() {
    if (formData.email.trim() === '' || formData.message.trim() === '') {
        alert('Fill please all fields');
        return;
    }
}

function setDataInStorage() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log('Дані форми:', formData);
}

function clearData() {
    window.localStorage.removeItem(STORAGE_KEY);
    formData.email = '';
    formData.message = '';
    form.reset();
}

function checkStorage() {
    const savedData = JSON.parse(window.localStorage.getItem(STORAGE_KEY));

    if (savedData) {
        if (savedData.email) {
            const clearEmail =savedData.email?.trim() || '';
            form.email.value = clearEmail;
            formData.email = clearEmail;
        }
        if (savedData.message) {
            const clearMessage = savedData.message?.trim() || '';
            form.message.value = clearMessage;
            formData.message = clearMessage;
        }
    }
}

checkStorage();