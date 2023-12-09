document.addEventListener("DOMContentLoaded", function () {
    loadDataFromLocalStorage();
});

function addData() {
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var job = document.getElementById("job").value;

    if (firstName === "" || lastName === "" || job === "") {
        alert("Mohon isi semua kolom!");
        return;
    }

    var student = {
        firstName: firstName,
        lastName: lastName,
        job: job
    };

    var editIndex = document.getElementById("editIndex").value;

    if (editIndex === "-1") {
        addRowToTable(student);
        saveDataToLocalStorage();
    } else {
        editRowInTable(editIndex, student);
        document.getElementById("editIndex").value = "-1";
        saveDataToLocalStorage();
    }

    document.getElementById("student-form").reset();
}

function addRowToTable(student) {
    var table = document.querySelector("table tbody");

    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = student.firstName;
    cell2.innerHTML = student.lastName;
    cell3.innerHTML = student.job;
    cell4.innerHTML = '<button class="btn btn-warning" onclick="editRow(this)">Edit</button> ' +
        '<button class="btn btn-danger" onclick="deleteRow(this)">Delete</button>';
}

function editRow(btn) {
    var row = btn.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");
    var firstName = cells[0].innerHTML;
    var lastName = cells[1].innerHTML;
    var job = cells[2].innerHTML;

    document.getElementById("firstname").value = firstName;
    document.getElementById("lastname").value = lastName;
    document.getElementById("job").value = job;

    document.getElementById("editIndex").value = row.rowIndex;
}

function editRowInTable(index, student) {
    var table = document.querySelector("table tbody");
    var row = table.rows[index];

    row.cells[0].innerHTML = student.firstName;
    row.cells[1].innerHTML = student.lastName;
    row.cells[2].innerHTML = student.job;
}
function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveDataToLocalStorage();
}

function saveDataToLocalStorage() {
    var table = document.querySelector("table tbody");
    var data = [];

    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var cells = row.getElementsByTagName("td");
        var studentData = {
            firstName: cells[0].innerHTML,
            lastName: cells[1].innerHTML,
            job: cells[2].innerHTML
        };
        data.push(studentData);
    }

    localStorage.setItem('studentData', JSON.stringify(data));
}

function loadDataFromLocalStorage() {
    var data = localStorage.getItem('studentData');

    if (data) {
        data = JSON.parse(data);

        for (var i = 0; i < data.length; i++) {
            addRowToTable(data[i]);
        }
    }
}

document.getElementById("student-form").addEventListener("submit", function (event) {
    event.preventDefault();
    addData();
});
