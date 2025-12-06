export interface Weapon {
  id: string;
  name: string;
  type: string;
  damage: string;
  price: number;
  fireRate: number;
  img: string;
}

const wiki = (slug: string) => `https://static.wikia.nocookie.net/valorant/images/${slug}/latest/scale-to-width-down/512`;

export const weapons: Weapon[] = [
  { id: 'vandal', name: 'Vandal', type: 'Гвинтівка', damage: '39-160', price: 2900, fireRate: 9.75, img: wiki('d/de/Vandal.png') },
  { id: 'phantom', name: 'Phantom', type: 'Гвинтівка', damage: '39-156', price: 2900, fireRate: 11, img: wiki('7/75/Phantom.png') },
  { id: 'operator', name: 'Operator', type: 'Снайперська', damage: '150-255', price: 4700, fireRate: 0.75, img: wiki('8/88/Operator.png') },
  { id: 'guardian', name: 'Guardian', type: 'Гвинтівка', damage: '65-195', price: 2250, fireRate: 6.5, img: wiki('d/df/Guardian.png') },
  { id: 'bulldog', name: 'Bulldog', type: 'Гвинтівка', damage: '35-116', price: 2050, fireRate: 9.15, img: wiki('5/56/Bulldog.png') },
  { id: 'ares', name: 'Ares', type: 'Легкий кулемет', damage: '30-78', price: 1600, fireRate: 13, img: wiki('4/48/Ares.png') },
  { id: 'odin', name: 'Odin', type: 'Важкий кулемет', damage: '38-95', price: 3200, fireRate: 12 - 15.6, img: wiki('9/92/Odin.png') },
  { id: 'spectre', name: 'Spectre', type: 'Пістолет-кулемет', damage: '26-78', price: 1600, fireRate: 13.33, img: wiki('7/7a/Spectre.png') },
  { id: 'stinger', name: 'Stinger', type: 'Пістолет-кулемет', damage: '27-67', price: 1100, fireRate: 16, img: wiki('6/64/Stinger.png') },
  { id: 'bucky', name: 'Bucky', type: 'Дробовик', damage: '40-140', price: 900, fireRate: 1.1, img: wiki('0/08/Bucky.png') },
  { id: 'judge', name: 'Judge', type: 'Дробовик', damage: '34-102', price: 1850, fireRate: 3.5, img: wiki('8/88/Judge.png') },
  { id: 'marshal', name: 'Marshal', type: 'Снайперська', damage: '101-202', price: 950, fireRate: 1.5, img: wiki('7/79/Marshal.png') },
  { id: 'sheriff', name: 'Sheriff', type: 'Пістолет', damage: '55-160', price: 800, fireRate: 4, img: wiki('a/a0/Sheriff.png') },
  { id: 'ghost', name: 'Ghost', type: 'Пістолет', damage: '30-105', price: 500, fireRate: 6.75, img: wiki('b/b2/Ghost.png') },
  { id: 'classic', name: 'Classic', type: 'Пістолет', damage: '26-78', price: 0, fireRate: 6.75, img: wiki('4/43/Classic.png') },
  { id: 'frenzy', name: 'Frenzy', type: 'Пістолет', damage: '26-78', price: 450, fireRate: 10, img: wiki('e/e7/Frenzy.png') },
  { id: 'shorty', name: 'Shorty', type: 'Пістолет-дробовик', damage: '12×12', price: 150, fireRate: 3.3, img: wiki('9/94/Shorty.png') },
];
