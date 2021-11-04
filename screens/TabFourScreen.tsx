import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { peach100, purple100, white } from '../constants/Colors';
import { refresh } from '../utils/refresh';
import {
  bodyContainerStyle,
  bodySubtitleStyle,
  containerStyle,
  headerTitleStyle,
} from '../utils/styles';
import { gql, useQuery } from '@apollo/client';
import { textThree } from '../constants/Fonts';
import { LinearGradient } from 'expo-linear-gradient';

export const getNews = gql`
  query getNews {
    getNews {
      id
      title
      content
      date
    }
  }
`;

export default function TabFourScreen() {
  const { onRefresh, refreshing } = refresh('TabFour');
  const newsData = useQuery(getNews);
  if (newsData.loading) {
    return (
      <>
        <Header />
        <View
          style={[
            containerStyle.container,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <ManropeText bold={true} style={headerTitleStyle.title}>
            Lädt... Bitte warten Sie einen Moment.
          </ManropeText>
        </View>
      </>
    );
  }

  const news = newsData.data.getNews;

  return (
    <>
      <Header />
      <ScrollView
        style={{ backgroundColor: white }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={containerStyle.container}>
          <UpperBody>
            <ManropeText bold={true} style={headerTitleStyle.title}>
              Neuigkeiten
            </ManropeText>
          </UpperBody>
          {news.map(
            (
              post: { title: string; content: string; date: Date },
              index: number
            ) => (
              <LinearGradient
                key={index}
                start={[1, 0]}
                end={[0, 1]}
                colors={[purple100, peach100]}
                style={[
                  bodyContainerStyle.wrap,
                  { height: 'auto', marginBottom: 5 },
                ]}
              >
                <View
                  style={[
                    bodyContainerStyle.container,
                    {
                      width: '100%',
                      marginBottom: 0,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    },
                  ]}
                >
                  <ManropeText
                    bold={true}
                    style={bodySubtitleStyle.bodySubtitle}
                  >
                    {post.title}
                  </ManropeText>
                  <ManropeText
                    style={{
                      fontSize: textThree,
                      lineHeight: 19,
                      marginBottom: 7.5,
                    }}
                  >
                    {post.content}
                  </ManropeText>
                  <ManropeText bold={true} style={{ fontSize: textThree }}>
                    {new Date(post.date).toLocaleString()}
                  </ManropeText>
                </View>
              </LinearGradient>
            )
          )}
        </View>
      </ScrollView>
    </>
  );
}
