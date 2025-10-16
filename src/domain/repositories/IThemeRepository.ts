import { ThemeEntity } from '../entities/Theme';

export interface IThemeRepository {
  getAllThemes(): Promise<ThemeEntity[]>;
  getThemeByIndex(index: number): Promise<ThemeEntity | null>;
}