var uncompletedCount = 0;
var totalCount = 0;

// Yeni bir görev eklemek için işlev
function addTask() {
    var taskInput = document.querySelector('input[type="text"]');
    if (taskInput.value === '') {
        alert('Lütfen bir görev girin.');
        return;
    }
    
    var taskList = document.getElementById('liste');
    var newTask = document.createElement('li');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'item' + (totalCount + 1);
    checkbox.addEventListener('change', function() {
        updateStatus(checkbox);
    });
    var span = document.createElement('span');
    span.textContent = taskInput.value;
    newTask.appendChild(checkbox);
    newTask.appendChild(span);
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', function() {
        deleteTask(this); // Silme düğmesine tıklandığında işlevi çağır
    });
    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
    taskInput.value = '';
    totalCount++;
    uncompletedCount++;
    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('uncompletedCount').textContent = uncompletedCount;
}

// Görev durumunu günceller
function updateStatus(checkbox) {
    var listItem = checkbox.parentNode;
    if (checkbox.checked) {
        uncompletedCount--;
        // Checkbox işaretlendiğinde arka plan rengini değiştirir.
        listItem.style.backgroundColor = 'green'; 
    } else {
        uncompletedCount++;
        // Checkbox işareti kaldırıldığında arka plan rengi varsayılan renge döndürür.
        listItem.style.backgroundColor = 'rgb(121, 209, 121)'; 
    }
    if (uncompletedCount < 0) {

        uncompletedCount = 0;
    }
    document.getElementById('uncompletedCount').textContent = uncompletedCount;
}

// Görevi listeden kaldırır.
function deleteTask(button) {
    var listItem = button.parentNode;
    if (!listItem.firstChild.checked) {
        // Görevi DOM'dan kaldır
        uncompletedCount--;
    }
    // Toplam görev sayısını azalt
    totalCount--;
    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('uncompletedCount').textContent = uncompletedCount;
    // Görevi DOM'dan kaldır
    listItem.parentNode.removeChild(listItem); 
}


//? Klavye olaylarını dinleyen fonksiyon
// 'add' düğmesine tıklandığında görev eklemek için addTask işlevini çağır
document.getElementById('addBtn').addEventListener('click', addTask);
document.querySelector('input[type="text"]').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // Kullanıcı 'Enter' tuşuna bastığında görev eklemek için addTask işlevini çağır.
        addTask();
    }
});

// Sayfa yüklendiğinde metin giriş alanına focus
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('input[type="text"]').focus();
});
