export interface Theme {
  name: string;
  gradient: string;
  accent: string;
}

export class ThemeEntity implements Theme {
  constructor(
    public readonly name: string,
    public readonly gradient: string,
    public readonly accent: string
  ) {}

  static fromJson(data: { name: string; gradient: string; accent: string }): ThemeEntity {
    return new ThemeEntity(data.name, data.gradient, data.accent);
  }
}
