// Set the hackathon start date (April 1st, 2025)
const hackathonStartDate = new Date('April 1, 2025 00:00:00').getTime();

// Hackathon duration in milliseconds (24 hours)
const hackathonDuration = 24 * 60 * 60 * 1000;

function updateCountdown() {
    // Get current date and time
    const now = new Date().getTime();

    // Calculate time until hackathon starts
    const timeUntilStart = hackathonStartDate - now;

    // Calculate time remaining in hackathon
    const timeInHackathon = hackathonDuration - (now - hackathonStartDate);

    // Format time function
    const formatTime = (time) => time.toString().padStart(2, '0');

    // Get all countdown elements
    const preEventCountdowns = document.querySelectorAll('.pre-event-countdown');
    const eventCountdowns = document.querySelectorAll('.event-countdown');

    if (timeUntilStart > 0) {
        // Hackathon hasn't started yet
        const days = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntilStart % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeUntilStart % (1000 * 60)) / 1000);

        const countdownText = `${days}d ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

        preEventCountdowns.forEach(element => {
            element.textContent = countdownText;
            element.style.display = 'block';
        });
        eventCountdowns.forEach(element => {
            element.style.display = 'none';
        });
    } else if (timeInHackathon > 0) {
        // Hackathon is in progress
        const hours = Math.floor(timeInHackathon / (1000 * 60 * 60));
        const minutes = Math.floor((timeInHackathon % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeInHackathon % (1000 * 60)) / 1000);

        const countdownText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

        preEventCountdowns.forEach(element => {
            element.style.display = 'none';
        });
        eventCountdowns.forEach(element => {
            element.textContent = countdownText;
            element.style.display = 'block';
        });
    } else {
        // Hackathon has ended
        preEventCountdowns.forEach(element => {
            element.style.display = 'none';
        });
        eventCountdowns.forEach(element => {
            element.textContent = 'Hackathon Ended!';
            element.style.display = 'block';
        });
        clearInterval(countdownInterval);
    }
}

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initial call to avoid delay
updateCountdown();
