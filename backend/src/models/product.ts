import { Schema, model } from 'mongoose';

export interface IImage {
  fileName: string,
  originalName: string
}

export interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description?: string;
  price?: number | null;
}

const imageSchema = new Schema<IImage>({
  fileName: {
    type: String,
    required: [true, 'Путь к файлу должен быть указан'],
  },
  originalName: {
    type: String,
    required: [true, 'Введите имя файла'],
  },
});

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
    required: [true, 'Поле "title" должно быть заполнено'],
    unique: true,
  },
  image: {
    type: imageSchema,
    required: [true, 'Изображение должно быть заполнено'],
  },
  category: {
    type: String,
    required: [true, 'Категория товара должна быть заполнена'],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },

});

export default model<IProduct>('product', productSchema);
