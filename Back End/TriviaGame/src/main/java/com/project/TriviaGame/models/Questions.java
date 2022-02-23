package com.project.TriviaGame.models;

public class Questions {
	
	public Questions(String question,String options,int correctOption) {
		this.question = question;
		this.options = options;
		this.correctOption = correctOption;
	}
	
	private String question;
	
	private String options;
	
	private int correctOption;

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getOptions() {
		return options;
	}

	public void setOptions(String options) {
		this.options = options;
	}

	public int getCorrectOption() {
		return correctOption;
	}

	public void setCorrectOption(int correctOption) {
		this.correctOption = correctOption;
	}

	
}
