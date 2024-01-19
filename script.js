document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendar");
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    const months = [
      { days: 30, name: "Kachhala" },
      { days: 29, name: "Thinla" },
      { days: 29, name: "Pohela" },
      { days: 30, name: "Silla" },
      // Add more months as needed
    ];
  
    const events = [
      "Mha Puja New year 1144 1/1",
      "Kijapuja 1/2",
      "Swa Kokyageyu 1/3",
      "Chatparva 1/6",
      "Christmas day 2/13",
      "Happy new year 2024 2/20",
      "Tamu lhoshar 2/19",
      "Tol Lhoshar 3/1",
      "Ghyu Chaku Sahnu 3/4",
      // ... Add more events as needed
    ];
  
    let currentMonthIndex = 0;
    let startDay = 2; // Initial start day for Month 1 (Tuesday)
  
    function renderCalendar() {
      const month = months[currentMonthIndex];
  
      const table = document.createElement("table");
      const headerRow = document.createElement("tr");
      const monthHeader = document.createElement("th");
      monthHeader.colSpan = 7;
      monthHeader.textContent = month.name;
  
      headerRow.appendChild(monthHeader);
      table.appendChild(headerRow);
  
      const daysRow = document.createElement("tr");
  
      // Day labels for the second row
      daysOfWeek.forEach((day) => {
        const dayHeader = document.createElement("th");
        dayHeader.textContent = day;
        daysRow.appendChild(dayHeader);
      });
  
      table.appendChild(daysRow);
  
      // Calculate the number of weeks needed
      const numWeeks = Math.ceil((month.days + startDay - 1) / 7);
  
      for (let weekIndex = 0; weekIndex < numWeeks; weekIndex++) {
        const weekRow = document.createElement("tr");
  
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
          const dayCell = document.createElement("td");
          dayCell.classList.add("day");
  
          // Calculate the day number within the month
          const dayNumber = weekIndex * 7 + dayIndex + 1 - startDay;
  
          // Only display days within the month's range
          if (dayNumber > 0 && dayNumber <= month.days) {
            dayCell.textContent = dayNumber;
  
            // Check if there are events for this day
            const dayEvents = getEventsForDay(currentMonthIndex + 1, dayNumber);
            if (dayEvents.length > 0) {
              const eventsList = document.createElement("ul");
              dayEvents.forEach((event) => {
                const eventItem = document.createElement("li");
                eventItem.textContent = event;
                eventsList.appendChild(eventItem);
              });
              dayCell.appendChild(eventsList);
            }
          }
  
          weekRow.appendChild(dayCell);
        }
  
        table.appendChild(weekRow);
      }
  
      // Update the start day for the next month
      startDay = (startDay + month.days) % 7;
      if (startDay === 0) {
        startDay = 7; // Adjust to Sunday if it's 0
      }
  
      // Clear the calendar container before rendering the new month
      calendarContainer.innerHTML = "";
      calendarContainer.appendChild(table);
    }
  
    function getEventsForDay(month, day) {
      const eventRegex = new RegExp(`^.* ${month}/${day}$`);
      return events.filter((event) => eventRegex.test(event));
    }
  
    // Event listener for the "Next" button
    nextButton.addEventListener("click", function () {
      currentMonthIndex = (currentMonthIndex + 1) % months.length;
      renderCalendar();
    });
  
    // Event listener for the "Previous" button
    prevButton.addEventListener("click", function () {
      currentMonthIndex = (currentMonthIndex - 1 + months.length) % months.length;
  
      // Reset startDay to the initial value when going back to Month 1
      if (currentMonthIndex === 0) {
        startDay = 2; // Initial start day for Month 1 (Tuesday)
      }
  
      renderCalendar();
    });
  
    // Initial rendering
    renderCalendar();
  });
  