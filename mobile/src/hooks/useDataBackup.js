import { getData } from "../utils/asyncStorageUtils";
import { useEffect, useState, useCallback } from "react";
import { insertToDatabase } from "../utils/supabase";
import { useStytchUser } from "@stytch/react-native";

/**
 * @function backupData
 * @description This function is used to backup the data to the database. It fetches the data from the sessionData and user_id and inserts it into the backups table in the database.
 */
const useDataBackup = () => {
  const [sessionData, setSessionData] = useState(null);
  const {
    user: { user_id },
  } = useStytchUser();

  const handleGetData = useCallback(async () => {
    const data = await getData("sessions");
    setSessionData(data);
  }, [getData, setSessionData]);

  const backupData = useCallback(async () => {
    if (data && user_id) {
      try {
        const response = await insertToDatabase("backups", [
          {
            user_id,
            backup_date: DateTime.now(),
            data: JSON.stringify(sessionData),
            status: "success",
          },
        ]);
        if (response.error) {
          throw new Error(response.error.message);
        }
        console.log("response", response);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "There was an error backing up your data.",
        });
      }
    }
  }, [insertToDatabase, sessionData, user_id]);

  useEffect(() => {
    handleGetData();
  }, []);

  return {
    backupData,
  };
};

export default useDataBackup;
