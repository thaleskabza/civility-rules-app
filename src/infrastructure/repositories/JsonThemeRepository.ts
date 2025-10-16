import { IThemeRepository } from '@/domain/repositories/IThemeRepository';
import { ThemeEntity } from '@/domain/entities/Theme';
import themesData from '../data/themes.json';

export class JsonThemeRepository implements IThemeRepository {
  private themes: ThemeEntity[];

  constructor() {
    this.themes = themesData.themes.map(theme => ThemeEntity.fromJson(theme));
  }

  async getAllThemes(): Promise<ThemeEntity[]> {
    return Promise.resolve(this.themes);
  }

  async getThemeByIndex(index: number): Promise<ThemeEntity | null> {
    if (index < 0 || index >= this.themes.length) {
      return Promise.resolve(null);
    }
    return Promise.resolve(this.themes[index]);
  }
}