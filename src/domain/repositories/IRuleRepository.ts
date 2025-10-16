import { RuleEntity } from '../entities/Rule';

export interface IRuleRepository {
  getAllRules(): Promise<RuleEntity[]>;
  getRuleById(id: number): Promise<RuleEntity | null>;
  getTotalRules(): Promise<number>;
}