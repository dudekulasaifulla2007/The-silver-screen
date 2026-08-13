const loggedInUser =
JSON.parse(localStorage.getItem("loggedInUser"));

if(!loggedInUser){

    window.location.href="login.html";

}

fetch(
`https://the-silver-screen.onrender.com/api/bookings/user?email=${loggedInUser.email}`
)

.then(response=>response.json())

.then(bookings=>{

const bookingList=document.getElementById("booking-list");

if(bookings.length===0){

bookingList.innerHTML="<h3>No bookings found.</h3>";

return;

}

bookings.forEach(booking=>{

bookingList.innerHTML+=`

<div class="booking-summary">

<h3>${booking.movieName}</h3>

<p><strong>Date :</strong> ${booking.bookingDate}</p>

<p><strong>Time :</strong> ${booking.showTime}</p>

<p><strong>Seats :</strong> ${booking.seats}</p>

<p><strong>Status :</strong>

<span style="color:#00c853;">
Confirmed
</span>

</p>

</div>

`;

});

});
const logoutBtn =
document.getElementById("logout-btn");

logoutBtn.addEventListener("click",()=>{

localStorage.removeItem("loggedInUser");

window.location.href="login.html";

});