import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';

export const refresh = (routeName: any) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    navigation.reset({ routes: [{ name: routeName }] });

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return { onRefresh, refreshing };
};
