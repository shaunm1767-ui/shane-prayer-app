export const dailyAudioPlan = {
  0: {
    day: "Sunday",
    theme: "Surya / Energy & Clarity",

    core: [
      { folder: "aarti", match: "uniserval" },
      { folder: "bhajan", match: "shane_ram_bhajan" },
      { folder: "bhajan", match: "jaishreeram" },
    ],

    pool: [
      { folder: "bhajan", match: "siya raam" },
      { folder: "bhajan", match: "mujko pyaari raam" },
      { folder: "bhajan", match: "krishna_bhajan" },
    ],

    futureAnchor: {
      folder: "bhajan",
      match: "mahamantra",
      status: "pending-upload",
    },
  },

  1: {
    day: "Monday",
    theme: "Shiva / Calm & Stillness",

    core: [
      { folder: "aarti", match: "shane_shiv_arthi" },
      { folder: "bhajan", match: "om nmha sivaya" },
      { folder: "bhajan", match: "shane_shiva_bhajan" },
    ],

    pool: [
      { folder: "bhajan", match: "shiva" },
      { folder: "bhajan", match: "gurucharanan" },
      { folder: "bhajan", match: "vishnu" },
    ],
  },

  2: {
    day: "Tuesday",
    theme: "Hanuman / Strength & Courage",

    core: [
      { folder: "aarti", match: "shane_hanuman_arthi" },
      { folder: "chalisa", match: "shane_hanuman_chalisa" },
      { folder: "bhajan", match: "shane_hanuman_bhajan" },
    ],

    pool: [
      { folder: "bhajan", match: "shane_ram_bhajan" },
      { folder: "bhajan", match: "jaishreeram" },
      { folder: "bhajan", match: "siya raam" },
    ],
  },

  3: {
    day: "Wednesday",
    theme: "Ganesha / Wisdom & Flow",

    core: [
      { folder: "bhajan", match: "shane_ganesh_openingprayer" },
      { folder: "chalisa", match: "shane_ganesh_chalisa" },
      { folder: "bhajan", match: "jai ganesh 8 names" },
    ],

    pool: [
      { folder: "bhajan", match: "saraswathi" },
      { folder: "bhajan", match: "gurucharanan" },
    ],
  },

  4: {
    day: "Thursday",
    theme: "Vishnu / Guru / Guidance",

    core: [
      { folder: "bhajan", match: "shane_vishnu_bhajan" },
      { folder: "bhajan", match: "shane_gurucharanan_bhajan" },
      { folder: "bhajan", match: "shane_krishna_bhajan" },
    ],

    pool: [
      { folder: "bhajan", match: "krishna_bhajan4" },
      { folder: "bhajan", match: "krishna_bahajan7" },
      { folder: "bhajan", match: "krishna_bhajan 10" },
    ],
  },

  5: {
    day: "Friday",
    theme: "Lakshmi / Abundance & Gratitude",

    core: [
      { folder: "aarti", match: "shane_luxmi_arthi" },
      { folder: "chalisa", match: "shane_luxmi_chalisa" },
      { folder: "bhajan", match: "shane_mother_stuti" },
    ],

    pool: [
      { folder: "bhajan", match: "shane_mother_bhajan" },
      { folder: "bhajan", match: "mother_bahjan5" },
      { folder: "bhajan", match: "mother_bhajan3" },
    ],
  },

  6: {
    day: "Saturday",
    theme: "Shani / Discipline & Karma",

    core: [
      { folder: "aarti", match: "shane_uniserval_arthi" },
      { folder: "bhajan", match: "shane_nahichaiiye_bhajan" },
    ],

    pool: [
      { folder: "bhajan", match: "shane_satsang1_bhajan" },
      { folder: "bhajan", match: "kabi pyaase" },
      { folder: "bhajan", match: "gurucharanan" },
    ],
  },
};

export function getDailyAudioPlan(day) {
  return dailyAudioPlan[day] || dailyAudioPlan[1];
}