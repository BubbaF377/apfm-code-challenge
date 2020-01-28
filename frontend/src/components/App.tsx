import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { clientRoutes } from 'helpers/clientRoutes';

import { Footer } from 'components/layout/Footer';
import { Header } from 'components/layout/Header';
import { Home } from 'components/Home';
import { Support } from 'components/Support';

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
  const classes = useStyles();
  return (
    <div className={classes.appWithStickyFooter}>
      <Header />
      <Switch>
        <Route exact path={clientRoutes.home()} component={Home} />
      </Switch>
      <Route
          exact path={clientRoutes.support()}
          render={() => <Support />}
        />
      <Footer />
    </div>
  );
};
