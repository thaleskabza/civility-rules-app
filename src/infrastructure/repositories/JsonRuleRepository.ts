import { IRuleRepository } from '@/domain/repositories/IRuleRepository';
import { RuleEntity } from '@/domain/entities/Rule';
import rulesData from '../data/rules.json';

export class JsonRuleRepository implements IRuleRepository {
  private rules: RuleEntity[];

  constructor() {
    this.rules = rulesData.rules.map(rule => RuleEntity.fromJson(rule));
  }

  async getAllRules(): Promise<RuleEntity[]> {
    return Promise.resolve(this.rules);
  }

  async getRuleById(id: number): Promise<RuleEntity | null> {
    const rule = this.rules.find(r => r.id === id);
    return Promise.resolve(rule || null);
  }

  async getTotalRules(): Promise<number> {
    return Promise.resolve(this.rules.length);
  }
}