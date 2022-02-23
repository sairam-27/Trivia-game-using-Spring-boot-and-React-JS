export const QuizOptions = () => {
  const categories = [];
  categories.push({ name: "Sports", val: "21" });
  categories.push({ name: "Science: Computers", val: "18" });
  categories.push({ name: "General Knowledge", val: "9" });
  categories.push({ name: "Science: Gadgets", val: "30" });
  categories.push({ name: "Vehicles", val: "28" });
  
  const difficulty = [];
  difficulty.push({name: "Easy",val:"easy"});
  difficulty.push({name: "Medium",val:"medium"});
  difficulty.push({name: "Hard",val:"hard"});

  return ({
      categories,
      difficulty
  })
  
};

export default QuizOptions;
