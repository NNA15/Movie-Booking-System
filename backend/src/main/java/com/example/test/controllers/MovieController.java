package com.example.test.controllers;

import com.example.test.entities.Movie;
import com.example.test.services.MovieService;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/movie")
@CrossOrigin
public class MovieController {

  private final String uploadDir = "src/uploads";

  @Autowired
  private MovieService movieService;

  @PostMapping
  public ResponseEntity<String> createMovie(@ModelAttribute Movie movie,  @RequestParam("file")
  MultipartFile file) {
    try {

      Path uploadPath = Paths.get(uploadDir);
      if(!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
      }
      String fileName = file.getOriginalFilename();
      Path filePath = uploadPath.resolve(fileName);
      Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
      movie.setPoster(filePath.toString().replace("\\", "/"));
      String result = movieService.createMovie(movie);
      return new ResponseEntity<>(result, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping
  public ResponseEntity<List<Movie>> getAllMovie() {
    try {
      List<Movie> movieList = movieService.getAllMovie();
      return new ResponseEntity<>(movieList, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @PutMapping
  public ResponseEntity<Movie> updateMovie(@RequestBody Movie movie) {
    try {
      Movie movieUpdated = movieService.updateMovie(movie);
      return new ResponseEntity<>(movieUpdated, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/images")
  public ResponseEntity<Resource> getImage(@RequestParam String filePath) {
    try {
      Path path = Paths.get(filePath);
      Resource resource = new UrlResource(path.toUri());

      if (resource.exists()) {
        return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG)
            .body(resource);
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (MalformedURLException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }




}
