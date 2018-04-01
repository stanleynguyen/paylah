import React from 'react';
import { View } from 'react-native';
import { HeaderStyles } from './CommonStyles';

const Header = ({ accessibilityLabel, customStyle, children }) => (
  <View
    style={[HeaderStyles.header, customStyle]}
    accessible={true}
    accessibilityLabel={accessibilityLabel}
  >
    {children}
  </View>
);

export default Header;
