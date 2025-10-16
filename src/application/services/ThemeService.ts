import { ThemeEntity } from '@/domain/entities/Theme';
import { IThemeRepository } from '@/domain/repositories/IThemeRepository';

export class ThemeService {
  constructor(private themeRepository: IThemeRepository) {}

  async getAllThemes(): Promise<ThemeEntity[]> {
    return await this.themeRepository.getAllThemes();
  }

  async getThemeByIndex(index: number): Promise<ThemeEntity | null> {
    return await this.themeRepository.getThemeByIndex(index);
  }
}