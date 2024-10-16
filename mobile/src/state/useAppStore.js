import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandAsyncStorage } from "./customStorage";

export const useAppStore = create(
  persist(
    (set) => ({
      days: {
        "2024-09-29": {
          sessions: [
            {
              date: "2024-09-29",
              timestamp: "2024-09-30T05:19:08.508Z",
              duration: 3,
              activity: "Meditation",
            },
            {
              date: "2024-09-29",
              timestamp: "2024-09-30T05:19:26.327Z",
              activity: "Journal",
              journalEntry: "Test Journal",
            },
            {
              date: "2024-09-29",
              timestamp: "2024-09-30T05:22:08.175Z",
              duration: 5,
              activity: "Meditation",
            },
          ],
          marked: true,
        },
        "2024-09-30": {
          sessions: [
            {
              date: "2024-09-30",
              timestamp: "2024-10-01T03:08:09.740Z",
              duration: 3,
              activity: "Meditation",
            },
          ],
          marked: true,
        },
        "2024-10-01": {
          sessions: [
            {
              date: "2024-10-01",
              timestamp: "2024-10-02T02:47:54.818Z",
              duration: 3,
              activity: "Meditation",
            },
            {
              date: "2024-10-01",
              timestamp: "2024-10-02T02:50:53.869Z",
              activity: "Journal",
              journalEntry:
                "Today I dedicated some quiet time to meditation, and it felt like a much-needed reset. I started by focusing on my breath, something so simple yet so powerful. In the beginning, my mind wandered to different places — work deadlines, random thoughts, and even some worries. But I tried to gently bring myself back to the present moment each time. It’s interesting how quickly the mind likes to escape, even during stillness.\n\nAs I settled into the session, I began to notice a sense of calm washing over me. My body felt lighter, and the mental clutter began to fade. There’s something deeply reassuring about being able to step away from all the noise in life and just exist in the present. No expectations, no rush. Just being.\n\nI also realized how meditation has started to influence other areas of my life. I’m a little more patient, more mindful in conversations, and less reactive when things don’t go as planned. It’s like this practice is slowly rewiring how I respond to challenges. I’ve been paying more attention to how I feel emotionally throughout the day, too, and it’s nice to notice those subtle shifts.\n\nI’m beginning to appreciate how meditation isn’t just about what happens during the session — it’s about how I carry that awareness and peace with me afterward.",
            },
          ],
          marked: true,
        },
      },
      playSoundOnStart: true,
      setPlaySoundOnStart: (value) =>
        set(() => ({
          playSoundOnStart: value,
        })),
      updateSessions: (newSession) =>
        set((state) => ({
          days: {
            ...state.days,
            [newSession.date]: {
              sessions: state.days[newSession.date]?.sessions
                ? [...state.days[newSession.date].sessions, newSession]
                : [newSession],
              marked: true,
            },
          },
        })),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => zustandAsyncStorage),
    }
  )
);
