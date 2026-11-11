var parseBtn = document.getElementById('parse-btn');
var wordInput = document.getElementById('word-input');
var zone2 = document.getElementById('zone-2');
var zone3 = document.getElementById('zone-3');


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

parseBtn.addEventListener('click', function(){
    
    zone2.innerHTML = '';
    zone3.innerHTML = '';
    document.getElementById('output-box').innerHTML = '';

    var lowercaseWords = [];
    var uppercaseWords = [];
    var numberWords = [];

    var inputText = wordInput.value;
    var rawWords = inputText.split('-');

    for (var i = 0; i < rawWords.length; i++) {
        var word = rawWords[i].trim();
        if (word === '') continue; // Пропускаем пустые куски

        if (!isNaN(word)) {
            numberWords.push(word);
        }
        else if (word[0] === word[0].toUpperCase()) {
            uppercaseWords.push(word);
        }
        else {
            lowercaseWords.push(word);
        }
    }

    lowercaseWords.sort();
    uppercaseWords.sort();
    // Сортировка чисел
    for (var i = 0; i < numberWords.length; i++) {
        for (var j = 0; j < numberWords.length - 1 - i; j++) {
            var currentNum = Number(numberWords[j]);
            var nextNum = Number(numberWords[j + 1]);

            if (currentNum > nextNum) {
                var temp = numberWords[j];
                numberWords[j] = numberWords[j + 1];
                numberWords[j + 1] = temp;
            }
        }
    }

    var finalArray = [];
    var aCount = 1, bCount = 1, nCount = 1;

    for (var i = 0; i < lowercaseWords.length; i++) {
        finalArray.push({ key: 'a' + aCount, text: lowercaseWords[i] });
        aCount++;
    }
    for (var i = 0; i < uppercaseWords.length; i++) {
        finalArray.push({ key: 'b' + bCount, text: uppercaseWords[i] });
        bCount++;
    }
    for (var i = 0; i < numberWords.length; i++) {
        finalArray.push({ key: 'n' + nCount, text: numberWords[i] });
        nCount++;
    }

    for (var i = 0; i < finalArray.length; i++) {
        var item = finalArray[i];
        
        var block = document.createElement('div');
        block.className = 'word-block';
        block.innerText = item.key + ' ' + item.text;
        block.style.backgroundColor = getRandomColor();
        block.setAttribute('draggable', 'true');
        
        block.setAttribute('data-original-color', block.style.backgroundColor);

        zone2.appendChild(block);
    }

});

// Логика перетаскивания
var draggedElement = null;

document.addEventListener('dragstart', function(e) {
    if (e.target.classList.contains('word-block')) {
        draggedElement = e.target;
    }
});

document.addEventListener('dragend', function() {
    if (draggedElement) {
        draggedElement = null;
    }
});

zone3.addEventListener('dragover', function(e) {
    e.preventDefault();
});

zone3.addEventListener('drop', function(e) {
    e.preventDefault();
    
    if (draggedElement) {
        draggedElement.style.backgroundColor = '#d3d3d3'; 
        draggedElement.style.border = '1px solid #999'; 

        var zoneRect = zone3.getBoundingClientRect();
        var dropX = e.clientX - zoneRect.left;
        var dropY = e.clientY - zoneRect.top;

        draggedElement.style.left = (dropX - draggedElement.offsetWidth / 2) + 'px';
        draggedElement.style.top = (dropY - draggedElement.offsetHeight / 2) + 'px';

        zone3.appendChild(draggedElement);
    }
});

// Возврат в Z2
zone2.addEventListener('dragover', function(e) {
    e.preventDefault(); 
});

function compareKeys(a, b) {
    if (a[0] !== b[0]) return a[0] < b[0] ? -1 : 1;
    return Number(a.slice(1)) - Number(b.slice(1));
}

zone2.addEventListener('drop', function(e) {
    e.preventDefault();
    
    if (draggedElement) {
        
        

        draggedElement.style.backgroundColor = draggedElement.getAttribute('data-original-color');
        
        //Сброс абс. настроек из z3
        draggedElement.style.border = 'none';
        draggedElement.style.left = '';
        draggedElement.style.top = '';

        var draggedKey = draggedElement.innerText.split(' ')[0]; 

        // 4. Ищем все блоки в Зоне 2, чтобы найти нужное место
        var allBlocks = zone2.querySelectorAll('.word-block');
        var inserted = false;

        for (var i = 0; i < allBlocks.length; i++) {
            var currentBlock = allBlocks[i];
            var currentKey = currentBlock.innerText.split(' ')[0];

            if (compareKeys(currentKey, draggedKey) > 0) {
                zone2.insertBefore(draggedElement, currentBlock);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            zone2.appendChild(draggedElement);
        }
    }
});

zone3.addEventListener('click', function(e) {
    if (e.target.classList.contains('word-block')) {
        var clickedBlock = e.target;

        var fullText = clickedBlock.innerText;
        var wordText = fullText.split(' ').slice(1).join(' ');

        var outputBox = document.getElementById('output-box');
        var wordSpan = document.createElement('span');
        wordSpan.innerText = wordText;
        wordSpan.style.color = clickedBlock.getAttribute('data-original-color');
        outputBox.appendChild(wordSpan);

    }
});