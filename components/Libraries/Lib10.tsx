import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  black80,
  crimson100,
  emerald100,
  grayTransparent,
  purple100,
} from '../../constants/Colors';

export const Lib10 = () => {
  const status: boolean = false;
  const horizontal: boolean = false;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '90%',
      height: '100%',
      backgroundColor: grayTransparent,
      borderRadius: 5,
      borderColor: purple100,
      borderStyle: 'solid',
      borderWidth: 2,
      padding: 10,
      marginBottom: 5,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    table: {
      height: 32,
      width: 20,
      backgroundColor: status ? crimson100 : emerald100,
      borderRadius: 5,
      transform: horizontal ? [{ rotate: '90deg' }] : [{ rotate: '0deg' }],
    },
    tableHorizontal: {
      height: 32,
      width: 18,
      backgroundColor: status ? crimson100 : emerald100,
      borderRadius: 5,
      transform: horizontal ? [{ rotate: '0deg' }] : [{ rotate: '90deg' }],
    },
    shelf: {
      height: 40,
      width: 10,
      backgroundColor: black80,
      borderRadius: 2,
      transform: horizontal ? [{ rotate: '90deg' }] : [{ rotate: '0deg' }],
    },
    shelfHorizontal: {
      height: 40,
      width: 10,
      backgroundColor: black80,
      borderRadius: 2,
      transform: horizontal ? [{ rotate: '0deg' }] : [{ rotate: '90deg' }],
    },
  });

  return (
    <View style={styles.container}>
      {/* First Row */}
      <View style={styles.row}>
        {/* Tables & Shelves */}
        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.tableHorizontal} />
        <View style={styles.tableHorizontal} />
        <View style={styles.tableHorizontal} />
        <View style={styles.shelf} />
        <View style={styles.table} />
      </View>
      {/* Second Row */}
      <View style={styles.row}>
        {/* Tables & Shelves */}
        <View style={styles.table} />
        <View style={styles.shelfHorizontal} />
        <View style={styles.shelfHorizontal} />
        <View style={styles.shelfHorizontal} />
        <View style={styles.shelfHorizontal} />
        <View style={styles.table} />
      </View>
      {/* Third Row */}
      <View style={styles.row}>
        {/* Tables & Shelves */}
        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.tableHorizontal} />
        <View style={styles.tableHorizontal} />
        <View style={styles.tableHorizontal} />

        <View style={styles.shelf} />
        <View style={styles.table} />
      </View>
      {/* Fourth Row */}
      <View style={styles.row}>
        {/* Tables & Shelves */}
        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.table} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 55,
          }}
        >
          <View style={styles.table} />

          <View style={styles.table} />
        </View>

        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.table} />
      </View>
      {/* Fifth Row */}
      <View style={styles.row}>
        {/* Tables & Shelves */}
        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.table} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 55,
          }}
        >
          <View style={styles.table} />

          <View style={styles.table} />
        </View>

        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.table} />
      </View>
      {/* Sixth Row */}
      <View style={styles.row}>
        {/* Tables & Shelves */}
        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.table} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 55,
          }}
        >
          <View style={styles.table} />

          <View style={styles.table} />
        </View>

        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.table} />
      </View>
      {/* Seventh Row */}
      <View style={styles.row}>
        {/* Tables & Shelves */}
        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.table} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 55,
          }}
        >
          <View style={styles.table} />

          <View style={styles.table} />
        </View>
        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.table} />
      </View>
      {/* Eigth Row */}
      <View style={styles.row}>
        {/* Tables & Shelves */}
        <View style={styles.table} />
        <View style={styles.shelfHorizontal} />
        <View style={styles.shelfHorizontal} />
        <View style={styles.shelfHorizontal} />
        <View style={styles.shelfHorizontal} />
        <View style={styles.table} />
      </View>
      {/* Ninth Row */}
      <View style={styles.row}>
        {/* Tables & Shelves */}
        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.table} />
        <View style={styles.table} />
        <View style={styles.table} />
        <View style={styles.shelf} />
        <View style={styles.table} />
      </View>
      {/* Choose Floor & Submit Button */}
    </View>
  );
};
