import { View, Text, Image, Pressable, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './MemberProfileScreenStyle';
import CustomHeader from '../../../../custome/CustomHeader';
import { Images } from '../../../../utils/Images';
import { strings } from '../../../../language/strings';
import { useNavigation } from '@react-navigation/native';
import { scale } from '../../../../utils/Responsive';

const MemberProfileScreen = () => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({});

  const questionsData = useMemo(() => {
    return Array.from({ length: 28 }, (_, index) => {
      const id = (index + 1).toString();
      return {
        id,
        text: strings[`question${id}`], // will map question1, question2, … question21
      };
    });
  }, []);

  const options = useMemo(
    () => [
      { key: 'yes', value: strings.yes },
      { key: 'no', value: strings.no },
      { key: 'skip', value: strings.skip },
    ],
    [strings.yes, strings.no, strings.skip],
  );

  const handleAnswer = (questionId, key) => {
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === Number(questionId));

      if (existingIndex !== -1) {
        // update existing answer
        const updated = [...prev];
        updated[existingIndex] = {
          questionId: Number(questionId),
          answer: key,
        };
        return updated;
      } else {
        // add new answer (shouldn’t normally happen)
        return [...prev, { questionId: Number(questionId), answer: key }];
      }
    });
  };

  const renderQuestion = useCallback(
    ({ item }) => {
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {item.id}. {item.text}
          </Text>
          <View style={styles.optionsRow}>
            {options.map(({ key, value }) => {
              const isSelected =
                Array.isArray(answers) &&
                answers.some(a => a.questionId === Number(item.id) && a.answer === key);

              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                  onPress={() => handleAnswer(item.id, key)}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    },
    [answers, options],
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader backArrowVisible={true} />

      <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
        <View>
          <Image source={Images.profileImageIcon} style={styles.profileImage} />
          <Text style={styles.profileName}>Alfrado Bator</Text>
          <Text style={styles.userName}>@alfrado</Text>
        </View>

        <View>
          <Text style={styles.heading}>{strings.bio}</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>

        <View style={styles.devider} />

        <View>
          <Text style={styles.heading}>{strings.denomination}</Text>
          <Text style={styles.text}>Non-Denomination</Text>
        </View>

        <View>
          <View style={styles.introVideoHeader}>
            <Text style={styles.heading}>{strings.introVideo}</Text>
            <Pressable onPress={() => navigation.navigate(screenName.introVideo)}>
              <Image source={Images.videoIcon} style={styles.videoIcon} />
            </Pressable>
          </View>
          <Image source={Images.videoImage} style={styles.videoImage} />
        </View>

        <View>
          <Text style={styles.heading}>{strings.questionnaire}</Text>

          <View>
            <FlatList
              data={questionsData}
              renderItem={renderQuestion}
              keyExtractor={item => item.id}
              contentContainerStyle={{ padding: scale(16) }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(MemberProfileScreen);
