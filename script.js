const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let viewedDate = new Date();

const createCalendarHeader = (date) => {
	const header = document.createElement('thead');
	const calendarTitle = document.createElement('tr');
	const dayTitle = document.createElement('tr');

	// Create Title Elements
	const leftArrow = document.createElement('span');
	leftArrow.innerText = "<";
	leftArrow.onclick = prevMonth;
	const rightArrow = document.createElement('span');
	rightArrow.innerText = ">";
	rightArrow.onclick = nextMonth;
	const dateString = monthNames[date.getMonth()] + " " + date.getFullYear();
	const dateSpan = document.createElement('span');
	dateSpan.innerText = dateString;

	// Create Calendar Title
	calendarTitle.appendChild(document.createElement('th'));
	calendarTitle.children[0].setAttribute('colspan', '7');
	calendarTitle.children[0].appendChild(leftArrow);
	calendarTitle.children[0].appendChild(dateSpan);
	calendarTitle.children[0].appendChild(rightArrow);

	// Create Day of Week Titles
	for (let i = 0; i < 7; i++) {
		dayTitle.appendChild(document.createElement('th'));
		dayTitle.children[i].innerText = dayNames[i];

	}

	//Put Calendar Header Together
	header.appendChild(calendarTitle);
	header.appendChild(dayTitle);
	return header;
};

function prevMonth() {
	viewedDate = new Date(viewedDate.getFullYear(),
		viewedDate.getMonth() - 1, 1);
	createCalendar(viewedDate)
}

function nextMonth() {
	viewedDate = new Date(viewedDate.getFullYear(),
		viewedDate.getMonth() + 1, 1);
	createCalendar(viewedDate);
}

const getFirstDayOfMonth = date => {
	return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const getLastDateOfMonth = date => {
	return new Date(date.getFullYear(),
		date.getMonth() + 1, 0).getDate();
};

const getWeeksInMonth = date => {
	const lastDate = getLastDateOfMonth(date);
	const firstDay = getFirstDayOfMonth(date);
	if ((lastDate % 7) === 0 && firstDay === 0)
		return 4;
	else if ((lastDate % 7) > (7 - firstDay))
		return 6;
	else
		return 5;
};

const createCalendarBody = (date) => {
	const body  = document.createElement('tbody');

	for (let i = 0, j = 0; i < getWeeksInMonth(date); i++) {
		const row = document.createElement('tr');
		for (j = 0; j < 7; j++) {
			const dayOfMonth = (i * 7) + j - getFirstDayOfMonth(date) + 1;
			row.appendChild(document.createElement('td'));
			 if ((j < getFirstDayOfMonth(date) && i < 1)
			 		|| dayOfMonth >getLastDateOfMonth(date)) {
				row.children[j].setAttribute("class", "empty");
				continue;
			}
				row.children[j].innerHTML = dayOfMonth;
		}
		body.appendChild(row);
	}
	return body;
};

const createCalendar = (date) => {
	const calendarSpan = document.getElementById('calendarSpan');
	if (calendarSpan.hasChildNodes()) {
		calendarSpan.removeChild(calendarSpan.firstChild);
	}
	let calendar = document.createElement('table');
	calendar.appendChild(createCalendarHeader(date));
	calendar.appendChild(createCalendarBody(date));
	calendarSpan.appendChild(calendar);
};

createCalendar(viewedDate);
