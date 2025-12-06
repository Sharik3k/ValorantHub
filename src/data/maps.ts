export interface Map {
  id: string;
  name: string;
  region: string;
  sites: number;
  description: string;
  img: string;
  pickRate: number;
  winRate: number;
}

export const maps: Map[] = [
  {
    id: 'ascent',
    name: 'Ascent',
    region: 'Італія',
    sites: 2,
    description: 'Відкритий майданчик для невеликих війн на позиціях та виснаження.',
    img: 'https://static.wikia.nocookie.net/valorant/images/e/e7/Loading_Screen_Ascent.png',
    pickRate: 18.3,
    winRate: 50.4,
  },
  {
    id: 'bind',
    name: 'Bind',
    region: 'Марокко',
    sites: 2,
    description: 'Два майданчики. Немає середини. Вибір лише ліворуч або праворуч.',
    img: 'https://static.wikia.nocookie.net/valorant/images/2/23/Loading_Screen_Bind.png',
    pickRate: 15.9,
    winRate: 49.8,
  },
  {
    id: 'haven',
    name: 'Haven',
    region: 'Бутан',
    sites: 3,
    description: 'Унікальний експеримент з трьома майданчиками.',
    img: 'https://static.wikia.nocookie.net/valorant/images/7/70/Loading_Screen_Haven.png',
    pickRate: 17.5,
    winRate: 51.1,
  },
  {
    id: 'split',
    name: 'Split',
    region: 'Японія',
    sites: 2,
    description: 'Поділений підвищеним центром, кожен бік бореться за контроль.',
    img: 'https://static.wikia.nocookie.net/valorant/images/d/d6/Loading_Screen_Split.png',
    pickRate: 14.2,
    winRate: 50.0,
  },
  {
    id: 'icebox',
    name: 'Icebox',
    region: 'Росія',
    sites: 2,
    description: 'Ваше наступне поле бою - секретний розкопний майданчик Королівства.',
    img: 'https://static.wikia.nocookie.net/valorant/images/1/13/Loading_Screen_Icebox.png',
    pickRate: 13.1,
    winRate: 49.3,
  },
  {
    id: 'breeze',
    name: 'Breeze',
    region: 'Бермудський трикутник',
    sites: 2,
    description: 'Насолоджуйтесь видами на цьому відкритому прибережному мапі.',
    img: 'https://static.wikia.nocookie.net/valorant/images/1/10/Loading_Screen_Breeze.png',
    pickRate: 12.4,
    winRate: 48.9,
  },
  {
    id: 'fracture',
    name: 'Fracture',
    region: 'США',
    sites: 2,
    description: 'Секретний дослідницький об\'єкт, розділений невдалим експериментом.',
    img: 'https://static.wikia.nocookie.net/valorant/images/f/fc/Loading_Screen_Fracture.png',
    pickRate: 11.3,
    winRate: 49.5,
  },
  {
    id: 'pearl',
    name: 'Pearl',
    region: 'Португалія',
    sites: 2,
    description: 'Атакуючі надсилатимуть шум та сигнали через шляхи.',
    img: 'https://static.wikia.nocookie.net/valorant/images/a/af/Loading_Screen_Pearl.png',
    pickRate: 10.8,
    winRate: 48.6,
  },
  {
    id: 'lotus',
    name: 'Lotus',
    region: 'Індія',
    sites: 3,
    description: 'Таємнича споруда, що містить астральний провідник.',
    img: 'https://static.wikia.nocookie.net/valorant/images/d/d0/Loading_Screen_Lotus.png',
    pickRate: 9.9,
    winRate: 49.1,
  },
  {
    id: 'sunset',
    name: 'Sunset',
    region: 'Лос-Анджелес',
    sites: 2,
    description: 'Нова карта з акцентом на мід-контроль та сміливі ретейки.',
    img: 'https://static.wikia.nocookie.net/valorant/images/b/b1/Sunset_map.png',
    pickRate: 8.7,
    winRate: 48.2,
  },
];
