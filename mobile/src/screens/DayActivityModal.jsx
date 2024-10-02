import { View, FlatList, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconIcon from "react-native-vector-icons/Ionicons";
import Text from "../components/Text";
import { colors } from "../constants/colors";
import Button from "../components/Button";

const dayMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const monthMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const DayActivityModal = () => {
  const { goBack, navigate } = useNavigation();
  const { params } = useRoute();
  const { data } = params;

  if (!data || !data.sessions) {
    return (
      <View>
        <Text>There is no data for this day</Text>
      </View>
    );
  }

  const selectedDate = new Date(data.sessions[0].timestamp);

  const day = selectedDate.getDay();
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const date = selectedDate.getDate();

  const handleSortSessions = (sessions) => {
    return sessions.sort((a, b) => a.timestamp - b.timestamp);
  };

  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: Dimensions.get("window").width - 32 - 24 - 16, // 32 is the icon size, 24 is the margin, 16 is the padding of the parent view
        }}
      >
        <Icon
          name="arrowleft"
          size={24}
          onPress={goBack}
          color={colors.textPrimary}
          style={{ marginRight: 16 }}
        />
        <Text
          style={{
            fontSize: 24,
            flexWrap: "wrap",
          }}
          numberOfLines={0}
        >{`${dayMap[day]}, ${monthMap[month]} ${date}, ${year}`}</Text>
      </View>
      <FlatList
        data={handleSortSessions(data.sessions)}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomColor: colors.onBackground,
              borderBottomWidth: 1,
            }}
          />
        )}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 24 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {item.activity === "Meditation" ? (
                  <MaterialIcon
                    name="meditation"
                    size={24}
                    color={colors.tertiary}
                    style={{ marginRight: 8 }}
                  />
                ) : (
                  <IoniconIcon
                    name="journal"
                    size={24}
                    color={colors.primary}
                    style={{ marginRight: 8 }}
                  />
                )}

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {item.activity}
                </Text>
              </View>
              <Text>
                {new Date(item.timestamp).toLocaleTimeString(["en-US"], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            {item.activity === "Meditation" && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Duration: </Text>
                <Text
                  style={{ fontWeight: "bold" }}
                >{`${item.duration}:00`}</Text>
              </View>
            )}
            {item.activity === "Journal" && (
              <Button
                onPress={() => {
                  navigate("JournalViewer", {
                    journalEntry: item.journalEntry,
                  });
                }}
              >
                <Text>View Journal Entry</Text>
              </Button>
            )}
          </View>
        )}
        keyExtractor={(item) => item.timestamp}
      />
    </View>
  );
};

export default DayActivityModal;
