import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { clientRoutes } from 'helpers/clientRoutes';

import { Footer } from 'components/layout/Footer';
import { Header } from 'components/layout/Header';
import { Home } from 'components/Home';
import { Support } from 'components/Support';

import { ICategory, IQuestion, fetchCategories, fetchQuestions } from '../helpers/apiUtils'

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
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [categoryName, setCategoryName] = useState<string>('Any Category');
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [setupIsVisible, setSetupIsVisible] = useState<boolean>(true);

  const classes = useStyles({});
  const history = useHistory();

  const categories: ICategory[] = fetchCategories();
  const questions: IQuestion[] = fetchQuestions(categoryId, numQuestions);
  const currentCategory: ICategory = {
    id: categoryId,
    name: categoryName,
  };
  const defaultCategory: ICategory = {
    id: -1,
    name: 'Any Category',
  };

  const updateCategory = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }> | null) => {
    const newCategoryId = event && event.target ? event.target.value : '';
    
    if (newCategoryId && typeof newCategoryId =='number' ) {
      let category: ICategory | undefined = categories.find(cat => cat.id === newCategoryId);

      setCategoryId(newCategoryId);
      setCategoryName(category ? category.name : '');
    }
  }
  const updateNumQuestions = (newNum: number | null) => {
    if (newNum) {
      setNumQuestions(newNum);
    }
  };

  const homeProps = {
    categories,
    currentCategory,
    defaultCategory,
    numQuestions,
    questions,
    setupIsVisible,
    updateCategory,
    updateNumQuestions,
  }

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
