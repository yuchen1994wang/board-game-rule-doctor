export interface GameSetup {
  playerCount: string;
  steps: string[];
  isExpansion?: boolean;
  expansionId?: string;
}

export interface TurnActions {
  onYourTurn: string[];
  outsideYourTurn: string[];
}

export interface TurnActionsAdditions {
  onYourTurn?: string[];
  outsideYourTurn?: string[];
}

export interface TurnActionsOverrides {
  onYourTurn?: string[];
  outsideYourTurn?: string[];
}

export interface Scoring {
  duringGame: string[];
  endGame: string[];
}

export interface ScoringAdditions {
  duringGame?: string[];
  endGame?: string[];
}

export type GameCategory = '德式' | '美式' | '聚会' | '合作' | '抽象';

export type GameMechanism = '工人放置' | '骰子驱动' | '引擎构筑' | '拍卖' | '卡牌驱动' | '板块放置' | '手牌管理' | '资源管理' | '区域控制' | '合作' | '轮抽' | '谈判' | '路线规划' | '网格移动' | '拼图' | '记忆' | '反应';

export interface TokenReference {
  name: string;
  nameEn?: string;
  description: string;
  image?: string;
}

export interface CardReference {
  name: string;
  nameEn?: string;
  count: number;
  description?: string;
}

export interface RoundPhase {
  name: string;
  description?: string;
  steps: string[];
}

export interface GameRule {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  image: string;
  hasExpansions: boolean;
  category: GameCategory[];
  mechanism: GameMechanism[];
  setup: GameSetup[];
  turnActions: TurnActions;
  endConditions: string[];
  scoring: Scoring;
  tips: string[];
  tokens?: TokenReference[];
  cards?: CardReference[];
  roundPhases?: RoundPhase[];
}

export interface ExpansionSetup extends GameSetup {
  isExpansion: true;
  expansionId: string;
}

export interface ExpansionTurnActions {
  additions?: TurnActionsAdditions;
  overrides?: TurnActionsOverrides;
}

export interface ExpansionScoring {
  additions?: ScoringAdditions;
}

export interface Expansion {
  id: string;
  gameId: string;
  name: string;
  nameEn?: string;
  shortDesc: string;
  description?: string;
  image?: string;
  playerCount?: string;
  conflictsWith?: string[];
  setup?: GameSetup[];
  turnActions?: ExpansionTurnActions;
  endConditions?: string[];
  scoring?: ExpansionScoring;
  tips?: string[];
  warnings?: string[];
}
