package com.silverscreen;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByMovieNameAndBookingDateAndShowTime(
            String movieName,
            String bookingDate,
            String showTime
    );

    List<Booking> findByEmail(String email);
}