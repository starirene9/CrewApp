import { useState } from "react";
import {
  StyleSheet,
  View,
  // ScrollView,
  FlatList,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    // setCourseGoals([...courseGoals, enteredGoalText]); // spread existing goals and add new entedGoalText
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]); // recommend way, 위와 같이 key 자동 지정하면 나중에 따로 key를 설정할 일이 없음
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="pink"
          onPress={startAddGoalHandler}
        />
        {/* {modalIsVisible && ( */}
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />
        {/* )} */}
        <View style={styles.goalsContainer}>
          {/* 항상 바깥에 감싸서 스타일링 할 것! */}
          {/* 동적인 경우에는 FlastList를 더 많이 씀 : 두 개의 인수를 받음 */}
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              // itemData 는 meta
              return (
                <GoalItem
                  id={itemData.item.id}
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 20,
    paddingTop: 50,
    flex: 1, // height: '100%'와 동일
  },
  goalsContainer: {
    flex: 4,
  },
});
