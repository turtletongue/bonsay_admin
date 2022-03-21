export const DEFAULT_FETCH_LIMIT = 8;

export const SECOND = 1000;

export const MINUTE = SECOND * 60;

export const HOUR = MINUTE * 60;

export const DAY = HOUR * 24;

export const WEEK = DAY * 7;

export const ACCESS_TOKEN_TTL = HOUR;

export const REFRESH_TOKEN_TTL = WEEK;

export const errorMessages = {
  'password must be longer than or equal to 7 characters':
    'Пароль должен содержать минимум 7 символов',
  'This email is already taken': 'Этот email уже используется',
  'Invalid login or password': 'Неправильный логин или пароль',
  'Invalid email or password': 'Неправильный логин или пароль',
  'email must be an email': 'Некорректная почта',
};

export const ONLY_ADMIN_ACCESS = 'Отказано в доступе';

export const DEFAULT_IMAGE_PATH = '/images/product.jpg';

export const slicesNames = ['products', 'categories', 'admins'];

export const MAX_PRODUCT_PHOTOS_COUNT = 4;
