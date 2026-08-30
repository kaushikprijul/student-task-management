let students = [];

const form = document.getElementById("StudentForm");
const tableBody = document.getElementById("TableBody");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let subject = document.getElementById("subject").value;
    let marks = document.getElementById("mark").value;
    if (name == "" || subject == "" || marks == "") {
        alert("Please fill all required fields.");
        return;
    }
    let student = {
        name: name,
        subject: subject,
        marks: Number(marks)
    };
    students.push(student);
    displayStudents();
    form.reset();
    document.getElementById("message").innerText =
        "Student Added Successfully";
    setTimeout(() => {
        document.getElementById("message").innerText = "";
    }, 2000);
});

function displayStudents() {
    tableBody.innerHTML = "";
    students.map(function(student) {
        let row = document.createElement("tr");
        let name = document.createElement("td");
        name.innerText = student.name;
        let subject = document.createElement("td");
        subject.innerText = student.subject;
        let marks = document.createElement("td");
        marks.innerText = student.marks;
        let result = document.createElement("td");
        if (student.marks >= 50) {
            result.innerText = "Pass";
        } else {
            result.innerText = "Fail";
            row.classList.add("fail");

        }
        row.appendChild(name);
        row.appendChild(subject);
        row.appendChild(marks);
        row.appendChild(result);
        tableBody.appendChild(row);
    });
}

document.getElementById("avg").addEventListener(
    "click",
    function() {
        if (students.length == 0) {
            document.getElementById("average").innerText =
                "No students available.";
            return;
        }
        let total = students.reduce(function(sum, student) {
            return sum + student.marks;
        }, 0);
        let average = total / students.length;
        document.getElementById("average").innerText =
            "Average Marks: " + average.toFixed(2);
    }
);

document.getElementById("rem").addEventListener(
    "click",
    function() {
        let name = prompt("Enter student name to remove:");
        if (name == null || name == "") {
            return;
        }
        students = students.filter(function(student) {
            return student.name != name;
        });
        displayStudents();
    }
);

function processStudent(callback) {
    students.forEach(callback);
}
