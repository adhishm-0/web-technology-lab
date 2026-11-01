// Question 1: Digital clock, updated every second.
function displayTime() {
  const now = new Date();
  const pad = value => String(value).padStart(2, "0");
  document.getElementById("clock").textContent =
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
displayTime();
window.setInterval(displayTime, 1000);

// Question 2: Random RGB color, updated every 30 seconds.
function setBackgroundColor() {
  const rgb = Array.from({ length: 3 }, () => Math.floor(Math.random() * 256));
  const color = `rgb(${rgb.join(", ")})`;
  document.body.style.backgroundColor = color;
  document.getElementById("colorValue").textContent = color;
}
setBackgroundColor();
window.setInterval(setBackgroundColor, 30000);
document.getElementById("changeColor").addEventListener("click", setBackgroundColor);

// Question 3: Enlarge the paragraph on mouseover and restore it on mouseout.
const zoomText = document.getElementById("zoomText");
zoomText.addEventListener("mouseover", () => { zoomText.style.fontSize = "28px"; });
zoomText.addEventListener("mouseout", () => { zoomText.style.fontSize = "16px"; });

// Question 4: Move the car using setTimeout and stop the scheduled movement.
const car = document.getElementById("car");
const track = document.getElementById("track");
let animationTimer = null;
function moveRight() {
  const maxLeft = track.clientWidth - car.offsetWidth;
  const nextLeft = car.offsetLeft + 2;
  if (nextLeft >= maxLeft) {
    car.style.left = `${maxLeft}px`;
    animationTimer = null;
    return;
  }
  car.style.left = `${nextLeft}px`;
  animationTimer = window.setTimeout(moveRight, 20);
}
function startCar() {
  if (animationTimer === null) moveRight();
}
function stopCar() {
  if (animationTimer !== null) window.clearTimeout(animationTimer);
  animationTimer = null;
}
document.getElementById("moveCar").addEventListener("click", startCar);
document.getElementById("stopCar").addEventListener("click", stopCar);

// Question 5: Student class, array, iteration, and birth-year categorization.
class Student {
  constructor(name, regno, yearOfBirth) {
    this.name = name;
    this.regno = regno;
    this.yearOfBirth = yearOfBirth;
  }
}
const students = [
  new Student("John", "UR13CS129", 1995),
  new Student("Joseph", "UR13CS456", 1998),
  new Student("Maya", "UR13CS789", 2002),
  new Student("Arun", "UR13CS231", 2004)
];
const studentList = document.getElementById("studentList");
students.forEach(student => {
  const category = student.yearOfBirth < 2000 ? "Born before 2000" : "Born after 2000";
  const item = document.createElement("li");
  item.textContent = `${student.name}'s Register Number is ${student.regno} — ${category} (${student.yearOfBirth})`;
  studentList.appendChild(item);
});

// Screenshot helper: ?q=1 through ?q=5 shows one exercise at a time.
const question = new URLSearchParams(location.search).get("q");
if (question) {
  document.body.classList.add("capture-mode");
  const active = document.getElementById(`q${question}`);
  if (active) active.classList.add("capture-active");
  if (question !== "2") document.body.style.backgroundColor = "#f2f5f7";
  if (question === "3") zoomText.dispatchEvent(new MouseEvent("mouseover"));
  if (question === "4") startCar();
}
