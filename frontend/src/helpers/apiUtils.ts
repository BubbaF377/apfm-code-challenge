import { useState, useEffect } from "react";

export interface Category {
  id: number,
  name: string,
}

export interface Question {
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: string[],
  question: string,
  type: string,
}

interface CategoriesData {
  trivia_categories: Category[],
}

interface QuestionsData {
  response_code: number,
  results: Question[],
}

interface URLS {
  [key: string]: string,
}

const getURL = (type: string): string => {
  const urls: URLS = {
    api: 'https://opentdb.com/api.php',
    categories: 'https://opentdb.com/api_category.php',
  }

  return urls[type];
}

export const fetchCategories = (): Category[] => {
  const [data, setData] = useState<Category[]>([]);

  async function getData(stateData: Category[]) {
    if  (stateData.length < 1) {
      const response = await fetch(getURL('categories'));
      const data: CategoriesData = await response.json();
      const categories: Category[] = data.trivia_categories;
      
      setData(categories);
    }
  };
  
  useEffect(() => {
    getData(data);
  });
  
  return data;
}

export const fetchQuestions = (categoryId: number, numQuestions: number): Question[] => {
  const [data, setData] = useState<Question[]>([]);
  const [questionsURL, setQuestionsURL] = useState<string>('');
  
  async function getData(stateQuestionsURL: string) {
    const url = getURL('api') + '?amount=' + numQuestions.toString() + (categoryId === -1 ? '' : '&category=' + categoryId.toString());
    
    if (stateQuestionsURL !== url) {
      setQuestionsURL(url);
      const response = await fetch(url);
      const data: QuestionsData = await response.json();
      const questions: Question[] = data.results;
      
      setData(questions);
    }
  }
  
  useEffect(() => {
    getData(questionsURL);
  });
  
  return data;
}
