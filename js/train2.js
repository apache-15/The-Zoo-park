const select_btn = document.getElementById('select');

select_btn.addEventListener('click', function() {
    const name = prompt('Введите имя:');
    
    if (!name) {
        return;   
    }
    
    // Куда-то сохранить имя или вывести
    document.getElementById('user_name').textContent = 'Привет, ' + name + '!';
});


// -----------------------------------------------------------------------------
const calc_btn = document.getElementById('count');
const angles = document.getElementById('angles');
const sides = document.getElementById('sides');
const answer = document.getElementById('answer');

calc_btn.addEventListener('click', function(){
    const a = parseInt(document.getElementById('a').value);
    const b = parseInt(document.getElementById('b').value);
    const c = parseInt(document.getElementById('c').value);

    const r = prompt('рез');

    document.getElementById('res').innerText = 'вот это да'+r;

    if (angles.checked){
        if(isNaN(a)|| isNaN(b)|| isNaN(c)){answer.innerText = 'Где-то пусто'}

        if(a==b && b==c && c==a && a+b+c==180){answer.innerText = 'Равносторонний'}

        if (a+b+c!=180){answer.innerText = 'Не существует'}

        if ((a==b || b==c || c==a) && a+b+c==180){answer.innerText = 'Равнобедренный'}

    }
    else if(sides.checked){
        if(isNaN(a)|| isNaN(b)|| isNaN(c)){answer.innerText = 'Где-то пусто'}

        if(a==b && b==c && c==a){answer.innerText = 'Равносторонний'}

        if(a==b && a+b>c || b==c && b+c>a || c==a && c+a>b){answer.innerText = 'Равнобедренный'}

        if(a+b<c || b+c<a || c+a<b){answer.innerText = 'Не сущ.'}
    }

     
});

