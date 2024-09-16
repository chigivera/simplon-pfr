// src/components/ThemeProvider.tsx
import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import themeTokens from '../../utils/theme'; // Adjust the path to your theme tokens

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ConfigProvider theme={themeTokens}>
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;