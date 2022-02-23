package com.project.TriviaGame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.TriviaGame.models.Results;
import com.project.TriviaGame.models.User;

@Repository
public interface ResultRepository extends JpaRepository<Results, Integer>{
	List<Results> findByUser(User user);
	
}
