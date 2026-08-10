export const hinduFestivals2026 = [
  { name: "Makarsankranti", date: "2026-01-14" },
  { name: "Thai Pongal", date: "2026-01-15" },
  { name: "Vasanth Panchami", date: "2026-01-23" },
  { name: "Thai Poosam Flag Hoisting", date: "2026-01-23" },
  { name: "Thai Poosam Kavady", date: "2026-02-01" },
  { name: "Maha Shivaratri", date: "2026-02-15" },

  { name: "Masi Magham", date: "2026-03-02" },
  { name: "Holika Dahan", date: "2026-03-02" },
  { name: "Holi (Rangwali)", date: "2026-03-03" },
  { name: "Hindi New Year / Chaitra Navarathri", date: "2026-03-19" },
  { name: "Ugadhi (Telugu New Year)", date: "2026-03-19" },
  {
    name: "Ramayana Week",
    date: "2026-03-19",
    endDate: "2026-03-25",
  },
  { name: "Sri Ram Naumee", date: "2026-03-26" },

  { name: "Panguni Uthiram", date: "2026-04-01" },
  { name: "Hanuman Jayanti", date: "2026-04-01" },
  { name: "Tamil New Year (Puthaandu)", date: "2026-04-14" },
  {
    name: "Narsingha Jayanti",
    date: "2026-04-30",
    alternateDate: "2026-05-01",
    note: "30 Apr (Smarta), 1 May (Vaishnava)",
  },

  { name: "Chitra Paruvam", date: "2026-05-01" },
  {
    name: "Adhik (JYESHTA) Maas",
    date: "2026-05-17",
    endDate: "2026-06-14",
  },
  { name: "Vaikasi Visakam", date: "2026-05-29" },

  { name: "Nirjala Ekadashi", date: "2026-06-25" },
  { name: "Guru Purnima", date: "2026-07-29" },

  { name: "Naag Panchami", date: "2026-08-17" },
  { name: "Shitla Satam", date: "2026-08-19" },
  { name: "Nori Nem", date: "2026-08-21" },
  { name: "Varalakshmi Vratam", date: "2026-08-21" },
  { name: "Raksha Bandan", date: "2026-08-27" },
  {
    name: "Gita Week",
    date: "2026-08-28",
    endDate: "2026-09-03",
  },
  {
    name: "Partial Lunar Eclipse",
    date: "2026-08-28",
    note: "03:23 to 09:01 throughout South Africa",
    type: "eclipse",
  },

  {
    name: "Krishna Janmashtami",
    date: "2026-09-03",
    alternateDate: "2026-09-04",
    note: "3 Sep (Smarta), 4 Sep (Vaishnava)",
  },
  { name: "Maha Ganesh Chaturthi", date: "2026-09-14" },
  {
    name: "Purattasi",
    date: "2026-09-18",
    endDate: "2026-10-17",
  },
  { name: "Purnima Shraadh", date: "2026-09-26" },
  {
    name: "Pitra Paksha",
    date: "2026-09-27",
    endDate: "2026-10-10",
  },
  {
    name: "Mahalaya Paksham",
    date: "2026-09-27",
    endDate: "2026-10-10",
  },

  {
    name: "Venkateshwara Vratham",
    date: "2026-10-11",
    endDate: "2026-10-20",
  },
  {
    name: "Navaratri",
    date: "2026-10-11",
    endDate: "2026-10-19",
  },
  { name: "Sri Saraswathi Pooja (North)", date: "2026-10-17" },
  { name: "Sri Durga Ashtami", date: "2026-10-18" },
  { name: "Sri Saraswathi Pooja (South)", date: "2026-10-19" },
  { name: "Sri Durga Naumee", date: "2026-10-19" },
  { name: "Vijay Dashmi", date: "2026-10-20" },

  { name: "Dhan Trayodashi", date: "2026-11-06" },
  { name: "Narak Chaturdashi", date: "2026-11-07" },
  {
    name: "Deepavali / Luxmi Pooja",
    date: "2026-11-08",
    note: "North & South",
  },
  { name: "Annakuta Govardhan Pooja", date: "2026-11-09" },
  { name: "Gujarati New Year", date: "2026-11-10" },
  { name: "Skanda Shashti", date: "2026-11-15" },
  {
    name: "Prabhodhini Ekadashi",
    date: "2026-11-20",
    alternateDate: "2026-11-21",
    note: "20 Nov (Smarta), 21 Nov (Vaishnava)",
  },
  { name: "Tulsi Vivaha", date: "2026-11-21" },
  { name: "Kaarthigai Deepam", date: "2026-11-23" },
  { name: "Kartik Purnima", date: "2026-11-24" },

  { name: "Gita Jayanti", date: "2026-12-20" },
];

function localISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function shiftISODate(isoDate, days) {
  const [year, month, day] = isoDate.split("-").map(Number);

  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);

  return localISODate(date);
}

export function getNextFestival(date = new Date()) {
  const today = localISODate(date);

  return (
    hinduFestivals2026.find((festival) => festival.date >= today) || null
  );
}

export function getFestivalAlert(date = new Date()) {
  const today = localISODate(date);
  const tomorrow = shiftISODate(today, 1);

  const todayFestivals = hinduFestivals2026.filter(
    (festival) =>
      festival.date === today || festival.alternateDate === today
  );

  if (todayFestivals.length) {
    return {
      type: "today",
      festivals: todayFestivals,
      title: "Special Prayer Day",
      message:
        todayFestivals.length === 1
          ? `Today is ${todayFestivals[0].name}.`
          : `Today: ${todayFestivals.map((item) => item.name).join(", ")}.`,
    };
  }

  const tomorrowFestivals = hinduFestivals2026.filter(
    (festival) =>
      festival.date === tomorrow || festival.alternateDate === tomorrow
  );

  if (tomorrowFestivals.length) {
    return {
      type: "tomorrow",
      festivals: tomorrowFestivals,
      title: "Special Prayer Day Tomorrow",
      message:
        tomorrowFestivals.length === 1
          ? `Tomorrow is ${tomorrowFestivals[0].name}.`
          : `Tomorrow: ${tomorrowFestivals
              .map((item) => item.name)
              .join(", ")}.`,
    };
  }

  return null;
}

export function formatFestivalDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);

  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}