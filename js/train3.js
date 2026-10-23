
const moto_btn = document.getElementById('moto_btn');
const car_btn = document.getElementById('car_btn');
const fuel_input = document.getElementById('fuel');
const fuel_value = document.getElementById('fuel_value');
const distance_input = document.getElementById('distance');
const result = document.getElementById('result');
const smile = document.getElementById('smile');


// =============================================
// 2. ВСПЛЫВАЮЩЕЕ ОКНО ПРИ ЗАГРУЗКЕ — CONFIRM
// =============================================
if (confirm('Приступаем?')) {
    result.textContent = 'Жизнь продолжается, и мы должны двигаться дальше';
} else {
    result.textContent = 'Камень остаётся на месте';
}


// =============================================
// 3. ПОЛЗУНОК — ОБНОВЛЕНИЕ ЗНАЧЕНИЯ
// =============================================
fuel_input.addEventListener('input', () => {
    fuel_value.textContent = fuel_input.value;
});


// =============================================
// 4. СТРЕЛОЧНАЯ ФУНКЦИЯ — ХВАТИТ ЛИ БЕНЗИНА
// =============================================
const checkFuel = (fuel, distance, consumption) => {
    const needed = (distance / 100) * consumption;
    return fuel >= needed;
};


// =============================================
// 5. ОБРАБОТЧИК ДЛЯ МОТОЦИКЛА (расход 5 л / 100 км)
// =============================================
moto_btn.addEventListener('click', () => {
    const fuel = Number(fuel_input.value);
    const distance = Number(distance_input.value);
    
    if (isNaN(distance)) {
        result.textContent = 'Введите длину пути!';
        smile.style.display = 'none';
        return;
    }
    
    if (checkFuel(fuel, distance, 5)) {
        result.textContent = 'Мотоцикл: бензина хватает!';
        result.style.color = 'green';
        smile.src = '../images/happy.png';
    } else {
        result.textContent = 'Мотоцикл: бензина не хватает!';
        result.style.color = 'red';
        smile.src = '../images/sad.png';
    }
    
    smile.style.display = 'block';
});


// =============================================
// 6. ОБРАБОТЧИК ДЛЯ МАШИНЫ (расход 10 л / 100 км)
// =============================================
car_btn.addEventListener('click', () => {
    const fuel = Number(fuel_input.value);
    const distance = Number(distance_input.value);
    
    if (isNaN(distance)) {
        result.textContent = 'Введите длину пути!';
        smile.style.display = 'none';
        return;
    }
    
    if (checkFuel(fuel, distance, 10)) {
        result.textContent = 'Машина: бензина хватает!';
        result.style.color = 'green';
        smile.src = '../images/happy.png';
    } else {
        result.textContent = 'Машина: бензина не хватает!';
        result.style.color = 'red';
        smile.src = '../images/sad.png';
    }
    
    smile.style.display = 'block';
});