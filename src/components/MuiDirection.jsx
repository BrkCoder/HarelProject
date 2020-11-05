import React from 'react';
import { StylesProvider, jssPreset, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import PropTypes from 'prop-types';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const rtlTheme = createMuiTheme({ direction: 'rtl' });
const ltrTheme = createMuiTheme({ direction: 'ltr' });

const MuiDirection = ({ children, dir }) => {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={dir === 'rtl' ? rtlTheme : ltrTheme}>{children}</ThemeProvider>
    </StylesProvider>
  );
};

MuiDirection.propTypes = {
  dir: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default MuiDirection;
