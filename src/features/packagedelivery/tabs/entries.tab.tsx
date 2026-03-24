import { View, StyleSheet } from 'react-native';
import { GlobalColors } from '../../../theme/global.colors';
import React from 'react';

const EntriesTab = () => {
  return (
    <View style={styles.container}>
    </View>
  );
};

export default EntriesTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
});
