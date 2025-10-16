export interface Progress {
    currentIndex: number;
    completedRules: number[];
    totalRules: number;
  }
  
  export class ProgressEntity implements Progress {
    constructor(
      public readonly currentIndex: number,
      public readonly completedRules: number[],
      public readonly totalRules: number
    ) {}
  
    getCompletionPercentage(): number {
      return (this.completedRules.length / this.totalRules) * 100;
    }
  
    isComplete(): boolean {
      return this.completedRules.length === this.totalRules;
    }
  }