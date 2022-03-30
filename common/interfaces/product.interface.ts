import { Category } from './category.interface'


export const Shapes = <const>[
    'Звезда',
    'Круг',
    'Сердце',
    'Квадрат',
    'Сфера'
];

export const Makers = <const>[
    'Gemar',
    'Qualatex',
    'Китай',
    'Belbal',
    'Art Show',
    'Sempertex',
    'Agura',
    'Anagram',
    'Flexmetal',
    'Grabo',
    'Everts',
    'Джи Си Ай',
    'Весёлая затея'
];

export const Balloon_Types = <const>[
    'Кристалл',
    'Металлик',
    'Пастель',
    'Хром',
    'Неон'
]

export const Colors = <const>[
    'Ассорти',
    'Бежевый',
    'Белый',
    'Голубой',
    'Желтый',
    'Зеленый',
    'Золотистый',
    'Коричневый',
    'Красный',
    'Мультицвет',
    'Оранжевый',
    'Прозрачный',
    'Розовое золото',
    'Розовый',
    'Серебристый',
    'Серый',
    'Синий',
    'Фиолетовый',
    'Черный',
    'Аквамарин',
    'Бирюза',
    'Бургундия',
    'Лавандовый',
    'Мятный',
    'Персиковый',
    'Салатовый',
    'Сиреневый',
    'Слоновая кость',
    'Фуксия'
]

export type Shape = typeof Shapes[number];
export type Maker = typeof Makers[number];
export type BalloonType = typeof Balloon_Types[number];
export type Color = typeof Colors[number];

export interface Product {
    _id?: string;
    title: string;
    description: string;
    code: string;
    category: Category;
    price: number;
    pieces: number;
    sizeCm: number;
    widthCm: number;
    heightCm: number;
    shape: Shape; // for foil balloons
    color: Color; // for both balloons
    maker: Maker; //
    type: BalloonType; // for latex balloons
    soldOut: boolean;
}