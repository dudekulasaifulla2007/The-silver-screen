package com.silverscreen;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {

        if (booking.getSeats() == null ||
            booking.getSeats().trim().isEmpty()) {

            throw new IllegalArgumentException(
                "No seats selected."
            );
        }

        String[] selectedSeats =
            booking.getSeats().split(",");

        // Maximum 10 seats
        if (selectedSeats.length > 10) {

            throw new IllegalArgumentException(
                "You can book a maximum of 10 seats at a time."
            );
        }

        // Check already booked seats
        List<Booking> existingBookings =
            bookingRepository.findByMovieNameAndBookingDateAndShowTime(
                booking.getMovieName(),
                booking.getBookingDate(),
                booking.getShowTime()
            );

        for (Booking existingBooking : existingBookings) {

            if (existingBooking.getSeats() == null) {
                continue;
            }

            String[] bookedSeats =
                existingBooking.getSeats().split(",");

            for (String selectedSeat : selectedSeats) {

                for (String bookedSeat : bookedSeats) {

                    if (selectedSeat.trim()
                            .equals(bookedSeat.trim())) {

                        throw new IllegalArgumentException(
                            "Seat " + selectedSeat.trim() +
                            " is already booked."
                        );
                    }
                }
            }
        }

        // Calculate price on backend
        int totalPrice = 0;

        for (String seat : selectedSeats) {

            seat = seat.trim();

            if (seat.matches("[A-H]\\d+")) {

                char row = seat.charAt(0);

                if (row == 'F' ||
                    row == 'G' ||
                    row == 'H') {

                    totalPrice += 150;

                } else if (row == 'C' ||
                           row == 'D' ||
                           row == 'E') {

                    totalPrice += 200;

                } else if (row == 'A' ||
                           row == 'B') {

                    totalPrice += 250;
                }
            }
        }

        System.out.println(
            "Backend calculated price: ₹" + totalPrice
        );

        return bookingRepository.save(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/show")
    public List<Booking> getBookingsForShow(
            @RequestParam String movieName,
            @RequestParam String bookingDate,
            @RequestParam String showTime) {

        return bookingRepository.findByMovieNameAndBookingDateAndShowTime(
            movieName,
            bookingDate,
            showTime
        );
    }

    @GetMapping("/user")
    public List<Booking> getBookingsByUser(
            @RequestParam String email) {

        return bookingRepository.findByEmail(email);
    }
}