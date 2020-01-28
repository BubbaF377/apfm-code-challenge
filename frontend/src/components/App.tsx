import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { clientRoutes } from 'helpers/clientRoutes';

import { Footer } from 'components/layout/Footer';
import { Header } from 'components/layout/Header';
import { Home } from 'components/Home';
import { Support } from 'components/Support';

import { Category, Question, fetchCategories, fetchQuestions } from '../helpers/apiUtils';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    appWithStickyFooter: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
    },
  });
});

export interface AppProps {}

export const App: React.FC<AppProps> = (props) => {
  const classes = useStyles({});
  const history = useHistory();

  const initialState = {
    categoryId: -1,
    categoryName: 'Any Category',
    gameIsVisible: false,
    numQuestions: 10,
  };

  const [categoryId, setCategoryId] = useState<number>(initialState.categoryId);
  const [categoryName, setCategoryName] = useState<string>(initialState.categoryName);
  const [gameIsVisible, setGameIsVisible] = useState<boolean>(initialState.gameIsVisible);
  const [numQuestions, setNumQuestions] = useState<number>(initialState.numQuestions);

  const categories: Category[] = fetchCategories();
  const questions: Question[] = fetchQuestions(categoryId, numQuestions);
  const currentCategory: Category = {
    id: categoryId,
    name: categoryName,
  };
  const defaultCategory: Category = {
    id: initialState.categoryId,
    name: initialState.categoryName,
  };

  const updateCategory = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }> | null) => {
    const newCategoryId = event && event.target ? event.target.value : '';
    
    if (newCategoryId && typeof newCategoryId == 'number' ) {
      let category: Category | undefined = categories.find(cat => cat.id === newCategoryId);

      setCategoryId(newCategoryId);
      setCategoryName(category ? category.name : '');
    }
  };

  const updateNumQuestions = (newNum: number | null) => {
    if (newNum) {
      setNumQuestions(newNum);
    }
  };

  const playGame = () => {
    setGameIsVisible(true);
  };

  const resetGame = () => {
    const {categoryId, categoryName, gameIsVisible, numQuestions} = initialState;

    setCategoryId(categoryId);
    setCategoryName(categoryName);
    setGameIsVisible(gameIsVisible);
    setNumQuestions(numQuestions);
  };

  const homeProps = {
    categories,
    currentCategory,
    defaultCategory,
    gameIsVisible,
    numQuestions,
    playGame,
    questions,
    resetGame,
    updateCategory,
    updateNumQuestions,
  };

  if ((window as any).Cypress) {
    (window as any).reactRouterHistory = history;
  }
  
  return (
    <div className={classes.appWithStickyFooter}>
      <Header />
      <Switch>
        <Route
          exact path={clientRoutes.home()}
          render={() => <Home {...homeProps} />}
        />
        <Route
          exact path={clientRoutes.support()}
          render={() => <Support />}
        />
      </Switch>
      <Footer />
    </div>
  );
};
