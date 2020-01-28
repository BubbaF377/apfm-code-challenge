import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    support: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      padding: `0 ${theme.spacing(4)}px`,
    },
    contact: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
    },
    contactHeader: {
      fontWeight: 'bold',
      marginBottom: '1rem',
      textDecoration: 'underline',
      textTransform: 'uppercase',
    },
    contactAnchor: {
      color: '#fff',
      textDecoration: 'none',
    }
  });
});

export interface SupportProps {}

export const Support: React.FC<SupportProps> = (props) => {
  const classes = useStyles();
  
  return (
    <div className={classes.support}>
      <div className={classes.contact}>
        <span className={classes.contactHeader}>SUPPORT</span>
        <span>Christian A. Hankel</span>
        <span>816-716-0743</span>
        <span><a className={classes.contactAnchor} href="mailto:christianahankel@gmail.com">ChristianAHankel@gmail.com</a></span>
        <span><a className={classes.contactAnchor} href="https://www.linkedin.com/in/christianhankel" target="_blank">LinkedIn</a></span>
      </div>
    </div>
  );
};
