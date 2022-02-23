package com.project.TriviaGame.models;

import java.time.LocalDateTime;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "Results")
public class Results {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne()
	@JoinTable(name = "user_results", joinColumns = @JoinColumn(name = "results_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private User user = new User();
	
	@NotNull
	private int correctAnswers;
	
	@NotNull
	private int wrongAnswers;

	@NotNull
	int score;
	
	LocalDateTime quizTime; 
	
	public Results() {
		// TODO Auto-generated constructor stub
	}

	public Results(int score) {
		this.score = score;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getCorrectAnswers() {
		return correctAnswers;
	}

	public void setCorrectAnswers(int correctAnswers) {
		this.correctAnswers = correctAnswers;
	}

	public int getWrongAnswers() {
		return wrongAnswers;
	}

	public void setWrongAnswers(int wrongAnswers) {
		this.wrongAnswers = wrongAnswers;
	}

	public LocalDateTime getQuizTime() {
		return quizTime;
	}

	public void setQuizTime(LocalDateTime quizTime) {
		this.quizTime = quizTime;
	}

}
