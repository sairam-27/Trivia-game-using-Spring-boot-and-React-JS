package com.project.TriviaGame.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;

import java.util.List;
import java.util.Optional;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.project.TriviaGame.models.Results;
import com.project.TriviaGame.models.User;
import com.project.TriviaGame.repository.ResultRepository;
import com.project.TriviaGame.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class QuizController {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ResultRepository resultRepository;

	HashMap<String,String> questions = new HashMap<String, String>();
	
	int multiplier;

	@GetMapping("/users")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public List<User> getAllUsers() throws JSONException {
		return userRepository.findAll();
	}
	
	@PostMapping("/getSelectedOptions")
	@PreAuthorize("hasRole('USER')")
	public Results getResultOfQuiz(@RequestBody String body) throws JSONException {
		JSONObject json = new JSONObject(body);
		int score = getScore((JSONArray)json.get("options"));
		Optional<User> t = userRepository.findByUsername(json.get("user").toString());
		User user = t.get();
		Results result = new Results(score);
		result.setUser(user);
		result.setCorrectAnswers(score/multiplier);
		result.setWrongAnswers(10 - result.getCorrectAnswers());
		result.setQuizTime(LocalDateTime.now());
		resultRepository.save(result);
		return result;
	}
	
	@PostMapping("/gethistory")
	@PreAuthorize("hasRole('USER')")
	public List<HashMap<String, String>> getHistory(@RequestParam String username) {
		Optional<User> u = userRepository.findByUsername(username);
		User user = u.get(); 
		List<Results> res = resultRepository.findByUser(user); 
		List<HashMap<String, String>> scores = new ArrayList<>();
		for(int i=0;i<res.size();i++) {
			HashMap<String, String> data = new HashMap<String, String>();
			data.put("score", String.valueOf(res.get(i).getScore()));
			data.put("correct_answers", String.valueOf(res.get(i).getCorrectAnswers()));
			data.put("wrong_answers", String.valueOf(res.get(i).getWrongAnswers()));
			data.put("date", res.get(i).getQuizTime().toString());
			scores.add(data); 
		}
		return scores;
	}
	
	@PostMapping("/global/history")
	@PreAuthorize("hasRole('USER')")
	public List<Results> getGlobalHistory() {
		List<Results> results = resultRepository.findAll();
		Collections.sort(results, new Comparator<Results>() {
			@Override
			public int compare(Results o1, Results o2) {
				return o1.getScore() < o2.getScore() ? 1 :-1;
			}
		});
		return results;
	}

	@PostMapping("/questions")
	@PreAuthorize("hasRole('USER')")
	public ArrayList<HashMap<String, ArrayList<String>>> getQuizQuestions(@RequestBody String body)
			throws JSONException {
		JSONObject json = new JSONObject(body);
		RestTemplate restTemplate = new RestTemplate();
		String url = "https://opentdb.com/api.php?amount=10&category=".concat(json.get("category").toString()).
				concat("&difficulty=").concat(json.get("difficulty").toString()).concat("&type=multiple");
		String obj = restTemplate.getForObject(url, String.class);
		json = new JSONObject(obj);
		return getFormattedQuestions((JSONArray) json.get("results"));
	}

	private ArrayList<HashMap<String, ArrayList<String>>> getFormattedQuestions(JSONArray data) throws JSONException {
		ArrayList<HashMap<String, ArrayList<String>>> dataTransfer = new ArrayList<HashMap<String, ArrayList<String>>>();
		String d = ((JSONObject) data.get(1)).get("difficulty").toString();
		if(d.contentEquals("easy"))
			multiplier = 1;
		else if(d.contentEquals("medium"))
			multiplier = 2;
		else multiplier = 3;
		
		for (int i = 0; i < data.length(); i++) {
			JSONObject jsonObject = (JSONObject) data.get(i);
			HashMap<String, ArrayList<String>> q = new HashMap<String, ArrayList<String>>();
			questions.put(jsonObject.get("question").toString(),
						  jsonObject.get("correct_answer").toString());
			ArrayList<String> options = getOptions(jsonObject.get("correct_answer"),
					jsonObject.get("incorrect_answers"));
			q.put(jsonObject.get("question").toString(), options);
			dataTransfer.add(q);
		}
		System.out.println(questions);
		return dataTransfer;
	}

	private ArrayList<String> getOptions(Object object, Object object2) throws JSONException {
		ArrayList<String> options = new ArrayList<String>();
		options.add(object.toString());
		JSONArray t = (JSONArray) object2;
		for (int i = 0; i < t.length(); i++)
			options.add(t.get(i).toString());
		Collections.shuffle(options);
		return options;
	}
	
	private int getScore(JSONArray actual) throws JSONException {
		int score = 0;
		System.out.println(actual);
		for (int i = 0; i < actual.length(); i++) {
			JSONObject jsonObject = (JSONObject) actual.get(i);
			String question = jsonObject.get("question").toString();
			String selectedOption = jsonObject.get("optionSelected").toString();
			String correctOption = questions.get(question);
			if(selectedOption.contentEquals(correctOption))
				score +=(multiplier * 1);
		}
		return score;
	}

}