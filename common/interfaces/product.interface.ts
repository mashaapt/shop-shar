import { Category } from './category.interface'


export const Shape_Types = <const>[
    'Star', 
    'Circle', 
    'Heart', 
    'Square'   
];




export type ShapeType = typeof Shape_Types[number];


export type BalloonType = 'Crystal' | 'Metallic' | 'Pastel' | 'Chrome';
export type Type = BalloonType;

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
    shape: ShapeType; // for foil balloons
    color: string; // for both balloons
    maker: string; //
    type: Type; // for latex balloons
    soldOut: boolean;
}