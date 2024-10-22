function calcAge(event) {

    event.preventDefault();

    // Pega os valores dos inputs
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    //Pega as labels e os inputs para manipular a cor em caso de erro
    const dayLabel = document.querySelector('label[for="day"]');
    const dayInput = document.querySelector('input#day'); 
    const monthLabel = document.querySelector('label[for="month"]');
    const monthInput = document.querySelector('input#month'); 
    const yearLabel = document.querySelector('label[for="year"]');
    const yearInput = document.querySelector('input#year'); 

    // Pega os parágrafos de erro para manipular
    const errorDay = document.getElementById('error-day');
    const errorMonth = document.getElementById('error-month');
    const errorYear = document.getElementById('error-year');

    // Limpar mensagens de erro
    errorDay.textContent = '';
    errorMonth.textContent = '';
    errorYear.textContent = '';

    //Pega os parágrados de output para manipular
    const dayOutput = document.getElementById('outputDay');
    const monthOutput = document.getElementById('outputMonth');
    const yearOutput = document.getElementById('outputYear');

    // Cria os objetos Date para poder usar a data atual no cálculo
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

     //verifica se o mês atual é 28 30 ou 31 dias

     let isThirthToday = (today.getMonth() +1 == 4 || today.getMonth() +1 == 6 || today.getMonth() +1 == 9 ||today.getMonth() +1 == 11);
     let isTwenthEightToday = (today.getMonth() +1 == 2);

     //verifica se o mês de nascimento é 28 30 ou 31 dias

     let isThirthBirth = (month == 4 || month == 6 || month == 9 || month == 11);
     let isTwenthEightBirth = (month == 2);
 

    //tratamento de erros

    let isValid = true;

    if(month > 12 || month < 1){
        errorMonth.textContent = "must be a valid month";
        monthLabel.classList.add('error');
        monthInput.classList.add('error');
        isValid = false;
    }  else{
        monthLabel.classList.remove('error');
        monthInput.classList.remove('error'); 
    }
    if(day > 31 || day < 1){
        errorDay.textContent = "must be a valid day";
        dayLabel.classList.add('error');
        dayInput.classList.add('error');
        isValid = false;
    }else{
        dayLabel.classList.remove('error');
        dayInput.classList.remove('error'); 
    }
    if(birthDate > today){
        errorYear.textContent = "must be in the past";
        yearLabel.classList.add('error');
        yearInput.classList.add('error');
        isValid = false;
    }else{
        yearInput.classList.remove('error');
        yearLabel.classList.remove('error'); 
    }
    if(isThirthBirth && day == 31){
        errorDay.textContent = "must be a valid date";
        dayLabel.classList.add('error');
        dayInput.classList.add('error');
        isValid = false;
    }else if(isTwenthEightBirth && (day > 29 ||(day == 29 && !isLeapYear(year)))){
        errorDay.textContent = "must be a valid date";
        dayLabel.classList.add('error');
        dayInput.classList.add('error');
        isValid = false;
    }

    if(isNaN(birthDate.getTime())){
        alert("invalid date")
        isValid = false;
    }

   
    //calcula a idade

    if(isValid){

        let yearDiff = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();
        let dayDiff = today.getDate() - birthDate.getDate();

        if(monthDiff < 0){
            yearDiff--
            monthDiff = 12 + monthDiff
        }

        if(dayDiff < 0){
            monthDiff--
            if(isThirthToday){
                dayDiff = 30 + dayDiff
            }else if(isTwenthEightToday){
                dayDiff = 28 + dayDiff
            }else{
                dayDiff = 31 + dayDiff
            }
        }
    
    
        dayOutput.textContent = dayDiff;
        monthOutput.textContent = monthDiff;
        yearOutput.textContent = yearDiff;
    }
}

function isLeapYear(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

document.getElementById('ageForm').addEventListener('submit', calcAge);