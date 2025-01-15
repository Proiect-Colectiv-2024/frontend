import { View, Text, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";
import React, {Component, useContext, useEffect, useState} from "react";
import SemiCircleProgress from "../../components/ProgressChart";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { ScrollView } from "react-native-gesture-handler";
import {AuthContext} from "@/app/AuthProvider";
import axios from "axios";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext)!;
  const [userObject, setUserObject] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [completionRatio, setCompletionRatio] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/users/username/${user}`)
        .then((response) => {
          const userData = response.data;
          setUserObject(userData);

          const completed = userData.completedChallenges.length;
          const missed = userData.missedChallenges.length;

          setCompletedCount(completed);
          setMissedCount(missed);
          setCompletionRatio(missed === 0 ? 100 : (completed / (completed + missed)) * 100);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
  }, [userObject]);

  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}>
        <View>
          <Text style={styles.usernameText}>
            {user}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTopText}>This is your profile</Text>
        <Text style={styles.cardBottomText}>Take a look at your stats!</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statusContainer}>
          <View style={styles.smallCard}>
            <Image
              source={require("../../assets/images/check_box.png")}
              style={styles.icon}
            />
            <View>
              <Text style={styles.completedText}>Completed</Text>
              <Text style={styles.completedNumber}>{completedCount}</Text>
            </View>
          </View>
          <View style={styles.smallCard}>
            <Image
              source={require("../../assets/images/missedIcon.png")}
              style={styles.icon}
            />
            <View>
              <Text style={styles.completedText}>Missed</Text>
              <Text style={styles.completedNumber}>{missedCount}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.percentage}>
          <SemiCircleProgress percentage={Math.round(completionRatio)} />
        </View>
        <View style={styles.barChart}>
          <Text style={styles.barChartTitle}>Last 4 months</Text>
          <BarChart
            showBarTops={false}
            flatColor={true}
            fromZero={true}
            fromNumber={100}
            style={{
              borderRadius: 0,
              padding: 15,
              margin: 0,
            }}
            data={data}
            width={screenWidth * 0.75}
            height={180}
            yAxisSuffix=""
            yAxisLabel=""
            yLabelsOffset={20}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#00008B",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#00008B",
  backgroundGradientToOpacity: 0,
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  propsForBackgroundLines: {
    stroke: "rgba(255, 255, 255, 0.4)",
    strokeDasharray: "0",
    x1: 65,
    x2: "95%",
  },
  showLine: true,
  fillShadowGradientTo: "#8D34F9",
  fillShadowGradientToOpacity: 1,
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientFrom: "#8D34F9",
};
const data = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      data: [15, 45, 28, 99],
    },
  ],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blueContainer: {
    backgroundColor: "#00008B",
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "#F7A348",
    padding: 30,
    borderRadius: 20,
    width: "80%",
    height: 140,
    position: "absolute",
    top: 160,
    left: "10%",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 50,
  },
  cardTopText: {
    color: "white",
    padding: 5,
    backgroundColor: "#00008B",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "Sora",
    fontWeight: "300",
    textAlign: "center",
  },
  cardBottomText: {
    color: "white",
    fontSize: 32,
    fontFamily: "Sora",
    fontWeight: "700",
    textAlign: "left",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 100,
  },
  usernameText: {
    color: "white",
    fontSize: 40,
    fontFamily: "Sora",
    fontWeight: "bold",
    padding: 10,
  },
  profilePic: {
    height: 48,
    width: 48,
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  smallCard: {
    display: "flex",
    width: 140,
    padding: 6,
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    flexShrink: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "#00008B",
  },
  completedText: {
    color: "#FFF",
    fontFamily: "Sora",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "600",
  },
  completedNumber: {
    color: "#FFF",
    fontFamily: "Sora",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "700",
  },
  statusContainer: {
    display: "flex",
    width: 289,
    height: 43,
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: 8.5,
    flexShrink: 0,
    flexWrap: "wrap",
  },
  percentage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#00008B",
    padding: 30,
    borderRadius: 20,
    width: "75%",
    height: 200,
    top: 0,
    left: "12.5%",
    paddingTop: 10,
    paddingBottom: 50,
  },
  barChart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#00008B",
    padding: 30,
    borderRadius: 20,
    width: "75%",
    height: 300,
    top: 20,
    left: "12.5%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  barChartTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    top: 10,
  },
  scrollView: {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    height: "100%",
    marginTop: 5, // Adds space between the buttons and the challenge list
    paddingHorizontal: 10,
  },
});

export default ProfileScreen