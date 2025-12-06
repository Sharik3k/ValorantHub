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
    description: 'Класична карта з відкритим мідом і сильними ротейшенами.',
    img: 'https://static.wikia.nocookie.net/valorant/images/f/f7/Ascent_map.png',
    pickRate: 18.3,
    winRate: 50.4,
  },
  {
    id: 'bind',
    name: 'Bind',
    region: 'Марокко',
    sites: 2,
    description: 'Телепорти та вузькі коридори задають темп агресивним пушам.',
    img: 'https://static.wikia.nocookie.net/valorant/images/8/85/Bind_map.png',
    pickRate: 15.9,
    winRate: 49.8,
  },
  {
    id: 'haven',
    name: 'Haven',
    region: 'Бутан',
    sites: 3,
    description: 'Єдина карта з трьома плентами та дуже швидкими ротейшенами.',
    img: 'https://static.wikia.nocookie.net/valorant/images/8/8b/Haven_map.png',
    pickRate: 17.5,
    winRate: 51.1,
  },
  {
    id: 'split',
    name: 'Split',
    region: 'Японія',
    sites: 2,
    description: 'Висотні позиції, канати та вузькі проходи для смоків.',
    img: 'https://static.wikia.nocookie.net/valorant/images/b/bf/Split_map.png',
    pickRate: 14.2,
    winRate: 50.0,
  },
  {
    id: 'icebox',
    name: 'Icebox',
    region: 'Росія',
    sites: 2,
    description: 'Вертикальна карта з канатами та складними постплантами.',
    img: 'https://static.wikia.nocookie.net/valorant/images/9/97/Icebox_map.png',
    pickRate: 13.1,
    winRate: 49.3,
  },
  {
    id: 'breeze',
    name: 'Breeze',
    region: 'Карибські острови',
    sites: 2,
    description: 'Великий відкритий простір, що вимагає далекобійної зброї.',
    img: 'https://static.wikia.nocookie.net/valorant/images/8/89/Breeze_map.png',
    pickRate: 12.4,
    winRate: 48.9,
  },
  {
    id: 'fracture',
    name: 'Fracture',
    region: 'США',
    sites: 2,
    description: 'Два шляхи атаки з респа, троси та безліч фланків.',
    img: 'https://static.wikia.nocookie.net/valorant/images/b/bf/Fracture_map.png',
    pickRate: 11.3,
    winRate: 49.5,
  },
  {
    id: 'pearl',
    name: 'Pearl',
    region: 'Португалія',
    sites: 2,
    description: 'Підводне місто з довгими коридорами та відкритим мідом.',
    img: 'https://static.wikia.nocookie.net/valorant/images/2/2e/Pearl_map.png',
    pickRate: 10.8,
    winRate: 48.6,
  },
  {
    id: 'lotus',
    name: 'Lotus',
    region: 'Індія',
    sites: 3,
    description: 'Рухомі двері та розгалужені стратегії через три пленти.',
    img: 'https://static.wikia.nocookie.net/valorant/images/4/4a/Lotus_map.png',
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
