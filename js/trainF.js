
const calc_btn = document.getElementById('calc_btn');
const result = document.getElementById('result');
const result_pic = document.getElementById('result_pic');



const calculateDiggers = new Function('length', 'mechanized', `
    const rate = mechanized ? 4 : 3;
    return Math.ceil(length / rate);
`);


// =============================================
// 3. ОБРАБОТЧИК КНОПКИ
// =============================================
calc_btn.addEventListener('click', function() {
    
    const length = Number(document.getElementById('length').value);
    const mechanized = document.getElementById('mechanized').checked;
    
    // Проверка
    if (isNaN(length) || length <= 0) {
        result.textContent = 'Введите длину канавы!';
        result_pic.style.display = 'none';
        return;
    }
    
    // Всплывающее окно
    const show = confirm('Показать результат?');
    
    if (show) {
        // Считаем землекопов через new Function
        const diggers = calculateDiggers(length, mechanized);
        
        const brigadeType = mechanized ? 'механизированная' : 'обычная';
        
        result.textContent = 'Длина канавы: ' + length + ' м. ' + 'Тип бригады: ' + brigadeType + '. ' + 'Нужно землекопов: ' + diggers + '.';
        
        result_pic.src = '../images/diggers.png';
    } 
    else 
    {
        result.textContent = 'Бригада в отпуске';
        result_pic.src = '../images/vacation.png';
    }
    
    result_pic.style.display = 'block';
});