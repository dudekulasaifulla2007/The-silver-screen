// ================= PAYMENT PAGE =================

// Booking details

const movieName = localStorage.getItem("selectedMovie");
const bookingDate = localStorage.getItem("selectedDate");
const showTime = localStorage.getItem("selectedShowtime");

const selectedSeats =
    JSON.parse(localStorage.getItem("selectedSeats")) || [];

const totalPrice =
    localStorage.getItem("totalPrice") || "0";


// ================= DISPLAY AMOUNT =================

const paymentAmount =
    document.getElementById("payment-amount");

if (paymentAmount) {

    paymentAmount.textContent =
        "₹" + totalPrice;
}


// ================= PAYMENT =================

const payButton =
    document.getElementById("pay-button");

const message =
    document.getElementById("message");


if (payButton) {

    payButton.addEventListener(
        "click",
        async function () {


            // Get logged user

            const loggedInUser =
                JSON.parse(
                    localStorage.getItem("loggedInUser")
                );


            if (!loggedInUser) {

                message.textContent =
                    "Please login first.";

                message.style.color =
                    "#ff5555";

                return;
            }


            // Password verification

            const enteredPassword =
                document
                .getElementById("payment-password")
                .value
                .trim();


            if (enteredPassword !== loggedInUser.password) {

                message.textContent =
                    "Incorrect account password.";

                message.style.color =
                    "#ff5555";

                return;
            }



            // Booking object

            const booking = {

                movieName: movieName,

                bookingDate: bookingDate,

                showTime: showTime,

                seats: selectedSeats.join(","),

                email: loggedInUser.email
            };



            try {

                const response =
                    await fetch(
                        "https://the-silver-screen.onrender.com/api/bookings",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                "application/json"
                            },

                            body:
                            JSON.stringify(booking)
                        }
                    );



                if (!response.ok) {

                    throw new Error(
                        "Booking save failed"
                    );
                }



                const savedBooking =
                    await response.json();


                console.log(
                    "Booking Saved:",
                    savedBooking
                );



                localStorage.setItem(
                    "paymentStatus",
                    "Successful"
                );



                message.textContent = "✓ Payment Successful";
message.style.color = "#00c853";
message.style.display = "block";
message.style.marginTop = "20px";
message.style.marginBottom = "20px";
                setTimeout(function(){

                    window.location.href =
                    "ticket.html";

                },1000);



            }

            catch(error){

                console.error(error);


                message.textContent =
                "Payment successful, but booking failed.";


                message.style.color =
                "#ff5555";

            }

        }
    );
}