    const name_input = document.getElementById('name');

    name_input.onmouseover = function(){
        name_input.style.color='red';
    }

    name_input.onmouseout = function(){
        name_input.style.color='';
    }
    
    const btn_hellow = document.getElementById('name_btn');

    btn_hellow.onclick = function(){
        const name = name_input.value;
        document.getElementById('hellow').innerText = 'Привет '+ name;
        document.getElementById('hellow').style.fontSize = '24px';
    }

    btn_hellow.onmousedown = function(){
        btn_hellow.style.backgroundColor = 'green';
        btn_hellow.style.transform = 'scale(2)';
    }

    btn_hellow.onmouseup = function(){
        btn_hellow.style.backgroundColor = '';
        btn_hellow.style.transform = '';
    }

    const calc_button = document.getElementById('date_sum');

    calc_button.onmouseover = function(){
        calc_button.style.color='blue';
    }
    calc_button.onmouseout = function(){
        calc_button.style.color='';
    }

    calc_button.addEventListener('click', function(){
        const day = Number(document.getElementById('day').value);
        const mon = Number(document.getElementById('mon').value);
        const year = Number(document.getElementById('year').value);

        const sum = day+mon+year;
        document.getElementById('res').innerText = sum;

        if (sum%2==0){
            document.getElementById('result_pic').src = '../images/bear.webp';
            document.getElementById('result_pic').style.opacity = 1;
        }
        else{
            document.getElementById('result_pic').src = '../images/arctic.webp'
            document.getElementById('result_pic').style.opacity = 1;
        }
    });

    const clicker = document.getElementById('clicker');
    const clicker_num = document.getElementById('clicker_num');
    let clicks = 0;
    clicker.addEventListener('click', function(){
        clicks+=1;
        clicker_num.innerText = 'Нажато: ' + clicks + 'раз';

        if (clicks%2==0){
            document.getElementById('pic').src = '../images/lion.webp';
            document.getElementById('pic').style.opacity = 1;
        }
        else{
            document.getElementById('pic').src = '../images/bear.webp';
            document.getElementById('pic').style.opacity = 1;
        }
    });

    
    const calc_btn = document.getElementById('calc_btn');

    calc_btn.addEventListener('click', function(){
        const n1= parseInt(document.getElementById('n1').value);
        const n2= parseInt(document.getElementById('n2').value);
        const op = document.getElementById('operation').value;

        if (isNaN(n1) || isNaN(n2)){
            document.getElementById('calc_result').value = 'Введите числа';
            return;
        };

        if (op==='+'){
            document.getElementById('calc_result').value = n1+n2;
            
        }

        else if (op==='-'){
            document.getElementById('calc_result').value = n1-n2;
            
        }

        else if (op==='*'){
            document.getElementById('calc_result').value = n1*n2;
            
        }

        else if (op==='/' && n2!=0){
            document.getElementById('calc_result').value = n1/n2;
            
        }
        else if(op==='/' && n2===0){
            document.getElementById('calc_result').value = 'нельзя делить на ноль';
        }
    });
