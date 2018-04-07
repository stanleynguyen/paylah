import React from 'react';
import { View } from 'react-native';
import { HeaderStyles } from './CommonStyles';

const Header = ({ customStyle, children }) => (
  <View style={[HeaderStyles.header, customStyle]} accessible={false}>
    {children}
  </View>
);

export default Header;
