package com.silverscreen;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String movieName;
    private String bookingDate;
    private String showTime;
    private String seats;
    private String email;

    public Booking() {
    }

    public Booking(String movieName,
                   String bookingDate,
                   String showTime,
                   String seats,
                   String email) {

        this.movieName = movieName;
        this.bookingDate = bookingDate;
        this.showTime = showTime;
        this.seats = seats;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getMovieName() {
        return movieName;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public String getShowTime() {
        return showTime;
    }

    public String getSeats() {
        return seats;
    }

    public String getEmail() {
        return email;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public void setSeats(String seats) {
        this.seats = seats;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}