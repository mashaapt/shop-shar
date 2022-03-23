import { Category } from './category.interface'

export type Shape = 'Star' | 'Circle' | 'Heart' | 'Square';
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
    shape: Shape;
    color: string;
    maker: string;
    type: Type;
    soldOut: boolean;
}