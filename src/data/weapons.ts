export interface Weapon {
  id: string;
  name: string;
  type: string;
  damage: string;
  price: number;
  fireRate: number;
  img: string;
}

export const weapons: Weapon[] = [
  { id: 'vandal', name: 'Vandal', type: 'Гвинтівка', damage: '39-160', price: 2900, fireRate: 9.75, img: 'https://static.wikia.nocookie.net/valorant/images/4/4c/Vandal_Side_Standard.png' },
  { id: 'phantom', name: 'Phantom', type: 'Гвинтівка', damage: '39-156', price: 2900, fireRate: 11, img: 'https://static.wikia.nocookie.net/valorant/images/5/5c/Phantom_Side_Standard.png' },
  { id: 'operator', name: 'Operator', type: 'Снайперська', damage: '150-255', price: 4700, fireRate: 0.75, img: 'https://static.wikia.nocookie.net/valorant/images/5/5a/Operator_Side_Standard.png' },
  { id: 'guardian', name: 'Guardian', type: 'Гвинтівка', damage: '65-195', price: 2250, fireRate: 6.5, img: 'https://static.wikia.nocookie.net/valorant/images/4/4c/Guardian_Side_Standard.png' },
  { id: 'bulldog', name: 'Bulldog', type: 'Гвинтівка', damage: '35-116', price: 2050, fireRate: 9.15, img: 'https://static.wikia.nocookie.net/valorant/images/5/5f/Bulldog_Side_Standard.png' },
  { id: 'ares', name: 'Ares', type: 'Легкий кулемет', damage: '30-78', price: 1600, fireRate: 13, img: 'https://static.wikia.nocookie.net/valorant/images/3/3a/Ares_Side_Standard.png' },
  { id: 'odin', name: 'Odin', type: 'Важкий кулемет', damage: '38-95', price: 3200, fireRate: 12 - 15.6, img: 'https://static.wikia.nocookie.net/valorant/images/3/3d/Odin_Side_Standard.png' },
  { id: 'spectre', name: 'Spectre', type: 'Пістолет-кулемет', damage: '26-78', price: 1600, fireRate: 13.33, img: 'https://static.wikia.nocookie.net/valorant/images/3/35/Spectre_Side_Standard.png' },
  { id: 'stinger', name: 'Stinger', type: 'Пістолет-кулемет', damage: '27-67', price: 1100, fireRate: 16, img: 'https://static.wikia.nocookie.net/valorant/images/1/1a/Stinger_Side_Standard.png' },
  { id: 'bucky', name: 'Bucky', type: 'Дробовик', damage: '40-140', price: 900, fireRate: 1.1, img: 'https://static.wikia.nocookie.net/valorant/images/5/5a/Bucky_Side_Standard.png' },
  { id: 'judge', name: 'Judge', type: 'Дробовик', damage: '34-102', price: 1850, fireRate: 3.5, img: 'https://static.wikia.nocookie.net/valorant/images/3/3d/Judge_Side_Standard.png' },
  { id: 'marshal', name: 'Marshal', type: 'Снайперська', damage: '101-202', price: 950, fireRate: 1.5, img: 'https://static.wikia.nocookie.net/valorant/images/3/3d/Marshal_Side_Standard.png' },
  { id: 'sheriff', name: 'Sheriff', type: 'Пістолет', damage: '55-160', price: 800, fireRate: 4, img: 'https://static.wikia.nocookie.net/valorant/images/4/4a/Sheriff_Side_Standard.png' },
  { id: 'ghost', name: 'Ghost', type: 'Пістолет', damage: '30-105', price: 500, fireRate: 6.75, img: 'https://static.wikia.nocookie.net/valorant/images/3/37/Ghost_Side_Standard.png' },
  { id: 'classic', name: 'Classic', type: 'Пістолет', damage: '26-78', price: 0, fireRate: 6.75, img: 'https://static.wikia.nocookie.net/valorant/images/5/5d/Classic_Side_Standard.png' },
  { id: 'frenzy', name: 'Frenzy', type: 'Пістолет', damage: '26-78', price: 450, fireRate: 10, img: 'https://static.wikia.nocookie.net/valorant/images/8/8b/Frenzy_Side_Standard.png' },
  { id: 'shorty', name: 'Shorty', type: 'Пістолет-дробовик', damage: '12×12', price: 150, fireRate: 3.3, img: 'https://static.wikia.nocookie.net/valorant/images/7/7e/Shorty_Side_Standard.png' },
  { id: 'outlaw', name: 'Outlaw', type: 'Снайперська', damage: '140-238', price: 2400, fireRate: 1.2, img: 'https://static.wikia.nocookie.net/valorant/images/1/1c/Outlaw_Side_Standard.png' },
];
