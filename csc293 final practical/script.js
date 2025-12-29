let addcoursebtn = document.getElementById("addcoursebtn");
let deletecoursebtn = document.getElementById("deletecoursebtn");
let editcoursebtn = document.getElementById("editcoursebtn");
let seelistcoursebtn = document.getElementById("seelistbtn");
let welcomepage = document.getElementById("welcome");
let courseslistpage = document.getElementById("courses");
let addcoursepage = document.getElementById("addcourse");
let editcoursepage = document.getElementById("editcourse");
let deletecoursepage = document.getElementById("deletecourse");
let quoteblock = document.getElementById("quotes");
let homebtn = document.getElementById("home");

homebtn.onclick = ()=> {
    setallelementtonull();
    welcomepage.style.display = "flex";
    };

const quotes = [
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The beautiful thing about learning is that no one can take it away from you. - B.B. King",
    "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi",
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn. - Benjamin Franklin",
    "An investment in knowledge pays the best interest. - Benjamin Franklin",
    "The mind is not a vessel to be filled but a fire to be kindled. - Plutarch",
    "Education is not preparation for life; education is life itself. - John Dewey",
    "The purpose of education is to replace an empty mind with an open one. - Malcolm Forbes",
    "Wisdom is not a product of schooling but of the lifelong attempt to acquire it. - Albert Einstein"
];

// Load courses from local storage or initialize empty array
let courses = JSON.parse(localStorage.getItem('courses')) || [];

function saveCourses() {
    localStorage.setItem('courses', JSON.stringify(courses));
}

function setallelementtonull() {
    deletecoursepage.style.display = "none";
    welcomepage.style.display = "none";
    courseslistpage.style.display = "none"; 
    addcoursepage.style.display = "none";
    editcoursepage.style.display = "none";
};
addcoursebtn.onclick = ()=> {
    setallelementtonull();
    addcoursepage.style.display = "block";
    };
editcoursebtn.onclick = ()=> {
    setallelementtonull();
    editcoursepage.style.display = "block";
    displayEditCourses();
    };
deletecoursebtn.onclick = ()=> {
    setallelementtonull();
    deletecoursepage.style.display = "block";
    displayDeleteCourses();
    };

// Function to display courses for deletion
// Function to display courses for editing
function displayEditCourses() {
    editcoursepage.innerHTML = "<h2>Edit Courses</h2>";
    if (courses.length === 0) {
        editcoursepage.innerHTML += "<p>No courses to edit.</p>";
    } else {
        editcoursepage.innerHTML += `
            <table class="courses-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Course Code</th>
                        <th>Units</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${courses.map((course, index) => `
                        <tr>
                            <td>${course.title}</td>
                            <td>${course.code}</td>
                            <td>${course.unit}</td>
                            <td><button onclick="editCourse(${index})">Edit</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

// Function to edit a course
function editCourse(index) {
    const course = courses[index];
    editcoursepage.innerHTML = `
        <h2>Edit Course</h2>
        <div class="form-edit-courses">
            <form id="formeditcourse">
                Course title <input class="inputcoursetitle" type="text" name="course title" value="${course.title}" placeholder="course title...">
                <br><br><br><br><br>
                <p>
                    Course code and Unit
                    <input class="inputcoursecode" type="text" name="course code" value="${course.code}" placeholder="course code...">
                    <input class="inputcourseunit" type="number" name="course unit" value="${course.unit}" placeholder="course unit" min="1" max="5">
                </p>
                <p><br>
                    <button type="submit">Update</button>
                    <button type="button" onclick="displayEditCourses()">Cancel</button>
                </p>
            </form>
        </div>
    `;

    // Handle edit form submission
    document.getElementById("formeditcourse").addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.querySelector("#formeditcourse .inputcoursetitle").value.trim();
        const code = document.querySelector("#formeditcourse .inputcoursecode").value.trim();
        const unit = parseInt(document.querySelector("#formeditcourse .inputcourseunit").value);
        
        if (title && code && unit) {
            courses[index] = { title, code, unit };
            saveCourses();
            displayEditCourses();
        } else {
            alert("Please fill in all fields.");
        }
    });
}
    deletecoursepage.innerHTML = "<h2>Delete Courses</h2>";
    if (courses.length === 0) {
        deletecoursepage.innerHTML += "<p>No courses to delete.</p>";
    } else {
        deletecoursepage.innerHTML += `
            <table class="courses-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Course Code</th>
                        <th>Units</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${courses.map((course, index) => `
                        <tr>
                            <td>${course.title}</td>
                            <td>${course.code}</td>
                            <td>${course.unit}</td>
                            <td><button onclick="deleteCourse(${index})">Delete</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }


// Function to delete a course
function deleteCourse(index) {
    if (confirm("Are you sure you want to delete this course?")) {
        courses.splice(index, 1);
        saveCourses();
        displayDeleteCourses();
    }
}

seelistcoursebtn.onclick = ()=> {
    setallelementtonull();
    courseslistpage.style.display = "block";
    displayCourses();
    };

// Handle add course form submission
document.getElementById("formaddcourse").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.querySelector(".inputcoursetitle").value.trim();
    const code = document.querySelector(".inputcoursecode").value.trim();
    const unit = parseInt(document.querySelector(".inputcourseunit").value);
    
    if (title && code && unit) {
        const newCourse = { title, code, unit };
        courses.push(newCourse);
        saveCourses();
        // Clear form
        document.querySelector(".inputcoursetitle").value = "";
        document.querySelector(".inputcoursecode").value = "";
        document.querySelector(".inputcourseunit").value = "";
        // Switch to list view
        setallelementtonull();
        courseslistpage.style.display = "block";
        displayCourses();
    } else {
        alert("Please fill in all fields.");
    }
});

// Handle cancel button in add course form
document.querySelector("#formaddcourse button[type='button']").addEventListener("click", function() {
    setallelementtonull();
    welcomepage.style.display = "block";
});

// Function to display courses in the list
function displayCourses() {
    courseslistpage.innerHTML = "<h2>Your Courses</h2>";
    if (courses.length === 0) {
        courseslistpage.innerHTML += "<p>No courses added yet.</p>";
    } else {
        courseslistpage.innerHTML += `
            <table class="courses-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Course Code</th>
                        <th>Units</th>
                    </tr>
                </thead>
                <tbody>
                    ${courses.map(course => `
                        <tr>
                            <td>${course.title}</td>
                            <td>${course.code}</td>
                            <td>${course.unit}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}
// show one immediately and then change every 10 seconds
function showRandomQuote() {
    quoteblock.innerText = quotes[Math.floor(Math.random() * quotes.length)];
}
showRandomQuote();
const quoteInterval = setInterval(showRandomQuote, 10000);
quoteblock.addEventListener("click", showRandomQuote);
