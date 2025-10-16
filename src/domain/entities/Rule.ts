export interface Rule {
    id: number;
    text: string;
  }
  
  export class RuleEntity implements Rule {
    constructor(
      public readonly id: number,
      public readonly text: string
    ) {
      if (id < 1 || id > 110) {
        throw new Error('Rule ID must be between 1 and 110');
      }
      if (!text || text.trim().length === 0) {
        throw new Error('Rule text cannot be empty');
      }
    }
  
    static fromJson(data: any): RuleEntity {
      return new RuleEntity(data.id, data.text);
    }
  }