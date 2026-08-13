// ================= MOVIE BOOKING =================

function bookMovie(movieName) {

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    if (!loggedInUser) {

        alert("Please login to book tickets.");

        window.location.href = "login.html";

        return;
    }

    localStorage.setItem(
        "selectedMovie",
        movieName
    );

    window.location.href = "date.html";
}


// ================= DATE PAGE =================

const dateContainer =
    document.getElementById("date-container");

if (dateContainer) {

    const today = new Date();
    const totalDays = 60;

    let currentMonth = "";
    let monthDates = null;

    for (let i = 0; i < totalDays; i++) {

        const date = new Date(today);

        date.setDate(
            today.getDate() + i
        );

        const monthName =
            date.toLocaleDateString(
                "en-US",
                {
                    month: "long"
                }
            );

        const year =
            date.getFullYear();

        const monthKey =
            monthName + " " + year;


        // Create new month section

        if (monthKey !== currentMonth) {

            currentMonth = monthKey;

            const monthSection =
                document.createElement("div");

            monthSection.classList.add(
                "month-section"
            );


            const monthHeading =
                document.createElement("h3");

            monthHeading.textContent =
                monthKey;


            monthDates =
                document.createElement("div");

            monthDates.classList.add(
                "month-dates"
            );


            monthSection.appendChild(
                monthHeading
            );

            monthSection.appendChild(
                monthDates
            );


            dateContainer.appendChild(
                monthSection
            );
        }


        const day =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );


        const dateNumber =
            date.getDate();


        const dateButton =
            document.createElement("button");

        dateButton.classList.add(
            "date-card"
        );


        dateButton.innerHTML = `
            <span>${day}</span>
            <strong>${dateNumber}</strong>
        `;


        const formattedDate =
            date.toISOString()
                .split("T")[0];


        dateButton.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    "selectedDate",
                    formattedDate
                );

                window.location.href =
                    "showtime.html";
            }
        );


        monthDates.appendChild(
            dateButton
        );
    }
}


// ================= MOVIE + DATE DISPLAY =================

const selectedMovie =
    localStorage.getItem(
        "selectedMovie"
    );

const selectedDate =
    localStorage.getItem(
        "selectedDate"
    );


const movieElement =
    document.getElementById(
        "selected-movie"
    );


if (
    movieElement &&
    selectedMovie
) {

    movieElement.textContent =
        "Movie: " + selectedMovie;
}


const dateElement =
    document.getElementById(
        "selected-date"
    );


if (
    dateElement &&
    selectedDate
) {

    const dateObject =
        new Date(selectedDate);


    const formattedDate =
        dateObject.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    dateElement.textContent =
        "Date: " + formattedDate;
}


// ================= SEAT SYSTEM =================

const seatButtons =
    document.querySelectorAll(
        ".seat"
    );


console.log(
    "Seats found:",
    seatButtons.length
);


// ================= SEAT PRICE =================

function getSeatPrice(seat) {

    if (
        seat.classList.contains(
            "standard-seat"
        )
    ) {
        return 150;
    }


    if (
        seat.classList.contains(
            "premium-seat"
        )
    ) {
        return 200;
    }


    if (
        seat.classList.contains(
            "executive-seat"
        )
    ) {
        return 250;
    }


    return 0;
}


// ================= BOOKING SUMMARY =================

const selectedSeatsDisplay =
    document.getElementById(
        "selected-seats"
    );


const ticketCountDisplay =
    document.getElementById(
        "ticket-count"
    );


const totalPriceDisplay =
    document.getElementById(
        "total-price"
    );


const continueButton =
    document.getElementById(
        "continue-btn"
    );


function updateBookingSummary() {

    const selectedSeats =
        document.querySelectorAll(
            ".seat.selected"
        );


    const seatNames = [];

    let total = 0;


    selectedSeats.forEach(
        function (seat) {

            seatNames.push(
                seat.textContent.trim()
            );

            total +=
                getSeatPrice(seat);
        }
    );


    if (selectedSeatsDisplay) {

        if (
            seatNames.length === 0
        ) {

            selectedSeatsDisplay.textContent =
                "None";

        } else {

            selectedSeatsDisplay.textContent =
                seatNames.join(", ");
        }
    }


    if (ticketCountDisplay) {

        ticketCountDisplay.textContent =
            selectedSeats.length;
    }


    if (totalPriceDisplay) {

        totalPriceDisplay.textContent =
            "₹" + total;
    }


    if (continueButton) {

        continueButton.disabled =
            selectedSeats.length === 0;
    }
}


// ================= LOAD BOOKED SEATS =================

if (seatButtons.length > 0) {

    const movie =
        localStorage.getItem(
            "selectedMovie"
        );


    const date =
        localStorage.getItem(
            "selectedDate"
        );


    const showtime =
        localStorage.getItem(
            "selectedShowtime"
        );


    async function loadBookedSeats() {

        try {

            const params =
                new URLSearchParams({
                    movieName: movie || "",
                    bookingDate: date || "",
                    showTime: showtime || ""
                });


            const response =
                await fetch(
                    `https://the-silver-screen.onrender.com/api/bookings/show?${params}`
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to load booked seats"
                );
            }


            const bookings =
                await response.json();


            const bookedSeats = [];


            bookings.forEach(
                function (booking) {

                    if (booking.seats) {

                        const seats =
                            booking.seats
                                .split(",")
                                .map(
                                    function (seat) {

                                        return seat.trim();
                                    }
                                );


                        bookedSeats.push(
                            ...seats
                        );
                    }
                }
            );


            console.log(
                "Booked seats:",
                bookedSeats
            );


            // Mark already booked seats

            seatButtons.forEach(
                function (seat) {

                    const seatName =
                        seat.textContent.trim();


                    if (
                        bookedSeats.includes(
                            seatName
                        )
                    ) {

                        seat.classList.add(
                            "booked"
                        );

                        seat.disabled = true;
                    }
                }
            );


            // Add selection functionality
            // only to available seats

            const availableSeats =
                document.querySelectorAll(
                    ".seat:not(.booked)"
                );


            availableSeats.forEach(
                function (seat) {

                    seat.addEventListener(
                        "click",
                        function () {

                            // Deselect seat

                            if (
                                seat.classList.contains(
                                    "selected"
                                )
                            ) {

                                seat.classList.remove(
                                    "selected"
                                );

                                updateBookingSummary();

                                return;
                            }


                            // Count selected seats

                            const selectedSeats =
                                document.querySelectorAll(
                                    ".seat.selected"
                                );


                            // Maximum 10 seats

                            if (
                                selectedSeats.length >= 10
                            ) {

                                alert(
                                    "Booking limit reached! You can select a maximum of 10 seats per booking."
                                );

                                return;
                            }


                            // Select seat

                            seat.classList.add(
                                "selected"
                            );


                            updateBookingSummary();
                        }
                    );
                }
            );

        } catch (error) {

            console.error(
                "Error loading booked seats:",
                error
            );
        }
    }


    loadBookedSeats();
}


// ================= CONTINUE TO PAYMENT =================

const continueBtn =
    document.getElementById(
        "continue-btn"
    );


if (continueBtn) {

    continueBtn.addEventListener(
        "click",
        function () {

            const selectedSeats =
                document.querySelectorAll(
                    ".seat.selected"
                );


            if (
                selectedSeats.length === 0
            ) {

                return;
            }


            const seatNames = [];

            let total = 0;


            selectedSeats.forEach(
                function (seat) {

                    seatNames.push(
                        seat.textContent.trim()
                    );

                    total +=
                        getSeatPrice(seat);
                }
            );


            // Extra frontend protection

            if (
                seatNames.length > 10
            ) {

                alert(
                    "Booking limit reached! You can book a maximum of 10 seats."
                );

                return;
            }


            // Save selected seats

            localStorage.setItem(
                "selectedSeats",
                JSON.stringify(
                    seatNames
                )
            );


            // Save ticket count

            localStorage.setItem(
                "ticketCount",
                selectedSeats.length
            );


            // Save total price

            localStorage.setItem(
                "totalPrice",
                total
            );


            // Generate Booking ID

            const bookingId =
                "TSS-" +
                Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toUpperCase();


            localStorage.setItem(
                "bookingId",
                bookingId
            );


            // Go to payment

            window.location.href =
                "payment.html";
        }
    );
}


// ================= DISPLAY TICKET =================

const ticketMovie =
    document.getElementById(
        "ticket-movie"
    );


if (ticketMovie) {

    const movie =
        localStorage.getItem(
            "selectedMovie"
        );


    const date =
        localStorage.getItem(
            "selectedDate"
        );


    const showtime =
        localStorage.getItem(
            "selectedShowtime"
        );


    const seats =
        JSON.parse(
            localStorage.getItem(
                "selectedSeats"
            )
        );


    const ticketCount =
        localStorage.getItem(
            "ticketCount"
        );


    const totalPrice =
        localStorage.getItem(
            "totalPrice"
        );


    const bookingId =
        localStorage.getItem(
            "bookingId"
        );


    // Movie

    ticketMovie.textContent =
        movie || "-";


    // Date

    if (date) {

        const dateObject =
            new Date(date);


        const ticket =
            ticketMovie.closest(
                ".ticket"
            );


        if (ticket) {

            const ticketDate =
                ticket.querySelector(
                    "#ticket-date"
                );


            if (ticketDate) {

                ticketDate.textContent =
                    dateObject.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    );
            }
        }
    }


    // Showtime

    const ticketTime =
        document.getElementById(
            "ticket-time"
        );


    if (ticketTime) {

        ticketTime.textContent =
            showtime || "-";
    }


    // Screen

    const ticketScreen =
        document.getElementById(
            "ticket-screen"
        );


    if (ticketScreen) {

        ticketScreen.textContent =
            "M";
    }


    // Seats

    const ticketSeats =
        document.getElementById(
            "ticket-seats"
        );


    if (ticketSeats) {

        ticketSeats.textContent =
            seats
                ? seats.join(", ")
                : "-";
    }


    // Ticket count

    const ticketCountElement =
        document.getElementById(
            "ticket-count"
        );


    if (ticketCountElement) {

        ticketCountElement.textContent =
            ticketCount || "0";
    }


    // Total

    const ticketTotal =
        document.getElementById(
            "ticket-total"
        );


    if (ticketTotal) {

        ticketTotal.textContent =
            "₹" + (totalPrice || "0");
    }


    // Booking ID

    const bookingIdElement =
        document.getElementById(
            "booking-id"
        );


    if (bookingIdElement) {

        bookingIdElement.textContent =
            bookingId || "-";
    }
}


// ================= SHOWTIME → SEAT PAGE =================

const timeCards =
    document.querySelectorAll(
        ".time-card"
    );


if (timeCards.length > 0) {

    timeCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    const strong =
                        card.querySelector(
                            "strong"
                        );


                    if (!strong) {

                        return;
                    }


                    const selectedShowtime =
                        strong.textContent.trim();


                    localStorage.setItem(
                        "selectedShowtime",
                        selectedShowtime
                    );


                    window.location.href =
                        "seat.html";
                }
            );
        }
    );
}


// ================= LOAD MOVIES FROM BACKEND =================

fetch(
    "https://the-silver-screen.onrender.com/api/movies"
)
    .then(
        function (response) {

            if (!response.ok) {

                throw new Error(
                    "Failed to load movies"
                );
            }


            return response.json();
        }
    )
    .then(
        function (movies) {

            movies.forEach(
                function (movie) {

                    const category =
                        movie.category
                            ? movie.category.toLowerCase()
                            : "";


                    const segment =
                        movie.segment
                            ? movie.segment.toLowerCase()
                            : "";


                    let sectionId = "";


                    if (
                        category === "hollywood" &&
                        segment === "upcoming"
                    ) {

                        sectionId =
                            "hollywood-upcoming";

                    }
                    else if (
                        category === "hollywood" &&
                        segment === "re-releases"
                    ) {

                        sectionId =
                            "hollywood-rereleases";

                    }
                    else if (
                        category === "tollywood" &&
                        segment === "upcoming"
                    ) {

                        sectionId =
                            "tollywood-upcoming";

                    }
                    else if (
                        category === "tollywood" &&
                        segment === "re-releases"
                    ) {

                        sectionId =
                            "tollywood-rereleases";

                    }
                    else if (
                        category === "bollywood" &&
                        segment === "upcoming"
                    ) {

                        sectionId =
                            "bollywood-upcoming";

                    }
                    else if (
                        category === "bollywood" &&
                        segment === "re-releases"
                    ) {

                        sectionId =
                            "bollywood-rereleases";

                    }
                    else if (
                        category === "kollywood" &&
                        segment === "upcoming"
                    ) {

                        sectionId =
                            "kollywood-upcoming";

                    }
                    else if (
                        category === "kollywood" &&
                        segment === "re-releases"
                    ) {

                        sectionId =
                            "kollywood-rereleases";
                    }


                    const container =
                        document.getElementById(
                            sectionId
                        );


                    // Skip if section doesn't exist

                    if (!container) {

                        return;
                    }


                    const movieCard =
                        document.createElement(
                            "div"
                        );


                    movieCard.classList.add(
                        "movie-card"
                    );


                    movieCard.innerHTML = `
                        <img src="${movie.image}" alt="${movie.name}">
                        <h3>${movie.name}</h3>
                        <p>⭐ ${movie.rating}/10</p>
                        <p>${movie.language} | ${movie.genre}</p>
                        <button onclick="bookMovie('${movie.name}')">
                            Book Now
                        </button>
                    `;


                    container.appendChild(
                        movieCard
                    );
                }
            );
        }
    )
    .catch(
        function (error) {

            console.error(
                "Error loading movies:",
                error
            );
        }
    );


// ================= MOVIE SEARCH =================

const searchInput =
    document.getElementById(
        "movieSearch"
    );


const searchResults =
    document.getElementById(
        "search-results"
    );


const movieSections =
    document.getElementById(
        "movieSections"
    );


if (
    searchInput &&
    searchResults &&
    movieSections
) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchText =
                this.value
                    .toLowerCase()
                    .trim();


            const movieCards =
                document.querySelectorAll(
                    "#movieSections .movie-card"
                );


            searchResults.innerHTML = "";


            if (
                searchText === ""
            ) {

                searchResults.style.display =
                    "none";

                movieSections.style.display =
                    "";

                return;
            }


            movieSections.style.display =
                "none";


            searchResults.style.display =
                "flex";


            let found = false;


            movieCards.forEach(
                function (card) {

                    const movieName =
                        card.querySelector(
                            "h3"
                        )
                            .textContent
                            .toLowerCase();


                    if (
                        movieName.includes(
                            searchText
                        )
                    ) {

                        const clonedCard =
                            card.cloneNode(true);


                        searchResults.appendChild(
                            clonedCard
                        );


                        found = true;
                    }
                }
            );


            if (!found) {

                searchResults.innerHTML = `
                    <div class="no-movie">
                        Movie not available
                    </div>
                `;
            }
        }
    );
}