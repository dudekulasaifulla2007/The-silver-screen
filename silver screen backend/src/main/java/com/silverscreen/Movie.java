package com.silverscreen;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String language;
    private String genre;
    private double rating;
    private String image;
    private String category;
    private String segment;

    public Movie() {
    }

    public Movie(String name, String language, String genre,
                 double rating, String image,
                 String category, String segment) {

        this.name = name;
        this.language = language;
        this.genre = genre;
        this.rating = rating;
        this.image = image;
        this.category = category;
        this.segment = segment;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLanguage() {
        return language;
    }

    public String getGenre() {
        return genre;
    }

    public double getRating() {
        return rating;
    }

    public String getImage() {
        return image;
    }

    public String getCategory() {
        return category;
    }

    public String getSegment() {
        return segment;
    }
}