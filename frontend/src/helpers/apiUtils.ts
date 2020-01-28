import { useState, useEffect } from "react";

export interface ICategory {
  id: number,
  name: string,
}

export interface IQuestion {
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: string[],
  question: string,
  type: string,
}

interface ICategoriesData {
  trivia_categories: ICategory[],
}

interface IQuestionsData {
  response_code: number,
  results: IQuestion[],
}

interface IURLS {
  [key: string]: string,
}

const getURL = (type: string): string => {
  const urls: IURLS = {
    api: 'https://opentdb.com/api.php',
    categories: 'https://opentdb.com/api_category.php',
  }

  return urls[type];
}

export const fetchCategories = (): ICategory[] => {
  const [data, setData] = useState<ICategory[]>([]);

  async function getData(stateData: ICategory[]) {
    if  (stateData.length < 1) {
      const response = await fetch(getURL('categories'));
      const data: ICategoriesData = await response.json();
      const categories: ICategory[] = data.trivia_categories;
      
      setData(categories);
    }
  };
  
  useEffect(() => {
    getData(data);
  });
  
  return data;
}

export const fetchQuestions = (categoryId: number, numQuestions: number): IQuestion[] => {
  const [data, setData] = useState<IQuestion[]>([]);
  const [questionsURL, setQuestionsURL] = useState<string>('');
  
  async function getData(stateQuestionsURL: string) {
    const url = getURL('api') + '?amount=' + numQuestions.toString() + (categoryId === -1 ? '' : '&category=' + categoryId.toString());
    
    if (stateQuestionsURL !== url) {
      setQuestionsURL(url);
      const response = await fetch(url);
      const data: IQuestionsData = await response.json();
      const questions: IQuestion[] = data.results;
      
      setData(questions);
    }
  }
  
  useEffect(() => {
    getData(questionsURL);
  });
  
  return data;
}
