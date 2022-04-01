export interface Category {
  _id?: string;
  parent: string;
  child: string;

  parentPhotoUrl?: string;
  photoUrl?: string;
}