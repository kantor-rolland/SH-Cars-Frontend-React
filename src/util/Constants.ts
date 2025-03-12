// api url for backend
export class Constants {
  public static readonly BASE_URL = 'http://localhost:8080';

  public static readonly CARS_URL = '/cars';

  public static readonly EXTRAS_URL = '/extras';

  public static readonly BRAND_URL = '/brand';

  public static readonly YEAR_URL = '/year';

  public static readonly FAVORITES_URL = `${this.BASE_URL}/favorites`;

  public static readonly LOGIN_URL = `${this.BASE_URL}/authenticate/web`;

  public static readonly PAGE_SIZE = 10;
}
