document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.menu').classList.toggle('active');
});

// Function to generate calendar for a specific month and year
function generateCalendar(month, year) {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    // Adjust firstDay to make Monday the first day of the week
    const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1;

    const weeks = [];
    let week = Array(adjustedFirstDay).fill(null);
    
    for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }
    if (week.length > 0) {
        week.length = 7;
        weeks.push(week);
    }
    
    let html = '<thead><tr><th>Thứ 2</th><th>Thứ 3</th><th>Thứ 4</th><th>Thứ 5</th><th>Thứ 6</th><th>Thứ 7</th><th>CN</th></tr></thead><tbody>';
    weeks.forEach(week => {
        html += '<tr>';
        week.forEach(day => {
            if (day) {
                html += `<td class="${(day === 5 && month === 8 && year === 2024) || (day === 6 && month === 8 && year === 2024) ? 'highlighted' : ''}">${day}</td>`;
            } else {
                html += '<td></td>';
            }
        });
        html += '</tr>';
    });
    html += '</tbody>';
    calendar.innerHTML = html;
    monthYear.textContent = `${month + 1} / ${year}`;
}

// Initialize calendar with current month and year
const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();
currentMonth = 8; 
currentYear = 2024;
generateCalendar(currentMonth, currentYear);

document.getElementById('prevMonth').addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Ngày cưới
const weddingDate = new Date("September 6, 2024 10:00:00").getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Tính toán thời gian
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Hiển thị kết quả trong các phần tử tương ứng
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // Nếu thời gian đếm ngược kết thúc, hiển thị thông báo
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "Đã đến ngày cưới!";
    }
}, 1000);