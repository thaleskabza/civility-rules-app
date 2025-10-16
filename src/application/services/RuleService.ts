import { RuleEntity } from '@/domain/entities/Rule';
import { IRuleRepository } from '@/domain/repositories/IRuleRepository';

export class RuleService {
  constructor(private ruleRepository: IRuleRepository) {}

  async getAllRules(): Promise<RuleEntity[]> {
    return await this.ruleRepository.getAllRules();
  }

  async getRuleById(id: number): Promise<RuleEntity | null> {
    return await this.ruleRepository.getRuleById(id);
  }

  async getNextRule(currentId: number): Promise<RuleEntity | null> {
    const total = await this.ruleRepository.getTotalRules();
    const nextId = (currentId % total) + 1;
    return await this.ruleRepository.getRuleById(nextId);
  }

  async getTotalRules(): Promise<number> {
    return await this.ruleRepository.getTotalRules();
  }
}