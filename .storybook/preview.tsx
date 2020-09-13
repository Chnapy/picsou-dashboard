import React from 'react';
import { UIThemeProvider } from '../src/main/view/ui-theme-provider';
import { Box } from '@material-ui/core';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story: React.FC) => <UIThemeProvider>
  <Box p={2}>
    <Story />
    </Box>
  </UIThemeProvider>
];
