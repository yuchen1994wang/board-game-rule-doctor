import type { GameRule } from '@/types/game'

export const games: GameRule[] = [
  {
    id: 'burgundy',
    name: '勃艮第城堡',
    nameEn: 'The Castles of Burgundy',
    description: '经典骰子驱动德式经营桌游',
    image: 'https://cf.geekdo-images.com/5CFwjd8zTcGYVUnkXh04pQ__imagepage/img/kX0J0Ie7Q-uwVbq_Y0x6C7ZF1ts=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1176894.jpg',
    hasExpansions: true,
    category: ['德式'],
    mechanism: ['骰子驱动', '板块放置', '资源管理'],
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '每位玩家拿取1块玩家版图（双面，根据人数选择A/B面）',
          '将货物分成5组，每组5个，放到游戏回合区',
          '建筑token混洗后盲抽，放到对应颜色的建筑供应区',
          '在成就区域放置成就token（大token压住小token）',
          '每位玩家获得1个城堡板块放到版图上',
          '每位玩家获得1个银矿、1艘船、1个牧场作为起始建筑',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '投掷2颗骰子（起始玩家额外投1颗白色骰子决定货物位置）',
        '花费1颗骰子拿取对应点数区域的1个建筑token到储存区',
        '花费1颗骰子将储存区的token放入版图对应点数和颜色的领土',
        '花费1颗骰子出售该点数仓库中的所有货物（获得银币和分数）',
        '花费1颗骰子兑换2个工人片（每个工人可改变骰子±1点）',
        '花费2枚银币+1颗骰子购买黑市建筑（每回合限1次）'
      ],
      outsideYourTurn: [
        '观察供应区即将被拿走的建筑token',
        '计算下回合可能的骰子点数和最优行动',
        '注意其他玩家的区域填满进度'
      ]
    },
    endConditions: [
      '最后一个货物被放置后，完成当前公平轮游戏结束',
      '第5大轮（E轮）结束后游戏必定结束'
    ],
    scoring: {
      duringGame: [
        '建筑进场时触发即时得分效果',
        '填满一个区域时按区域面积得分',
        '在靠前轮次填满区域获得额外加分',
        '出售货物获得玩家人数×货物数量的分数',
        '银矿每阶段提供对应数量的货币'
      ],
      endGame: [
        '填满区域的基础分数',
        '成就板块分数（每种颜色区域首次填满获得）',
        '黄色特殊建筑的终局计分效果',
        '剩余银币每2枚换1分',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏共5大轮，每轮5回合',
      '每回合每人有2颗骰子可用',
      '工人可以将骰子点数±1（1和6循环）',
      '填满区域越早分数越高',
      '船只可以清空仓库并提升顺位',
      '城堡可以额外执行一次任意行动'
    ],
    tokens: [
      { name: '工人片', description: '圆形token，用于改变骰子点数±1（1和6循环），每片可调整1点' },
      { name: '银币', description: '货币token，用于购买黑市建筑、支付费用，终局每2枚换1分' },
      { name: '建筑token', description: '六角形板块，分6种颜色（黑/灰/蓝/黄/绿/棕），对应不同建筑类型' },
      { name: '货物token', description: '方形token，分5种类型，每组5个，用于出售获得银币和分数' },
      { name: '城堡板块', description: '特殊六角板块，放置到版图后每轮可额外执行一次任意行动' },
      { name: '银矿', description: '黑色建筑，放置后每阶段提供对应数量的银币' },
      { name: '船只', description: '蓝色建筑，可清空仓库并提升玩家行动顺位' },
      { name: '牧场', description: '棕色建筑，提供牲畜相关得分效果' },
      { name: '成就token', description: '大token压小token，每种颜色区域首次填满时获得额外分数' }
    ],
    roundPhases: [
      {
        name: 'A轮（第1轮）',
        description: '起始阶段，资源有限',
        steps: [
          '将对应货物token放到游戏板上（起始玩家投白色骰子决定位置）',
          '每位玩家执行2个行动（投2颗骰子）',
          '轮次结束后：清空剩余建筑供应区的token，重新补充'
        ]
      },
      {
        name: 'B轮（第2轮）',
        description: '资源逐渐丰富',
        steps: [
          '放置新一批货物token',
          '玩家执行行动',
          '轮次结束后：清空供应区，补充新token，已放置的建筑开始产生效果'
        ]
      },
      {
        name: 'C轮（第3轮）',
        description: '中期发展阶段',
        steps: [
          '放置货物token',
          '玩家执行行动',
          '轮次结束后：清空供应区，补充新token，银矿开始产出银币'
        ]
      },
      {
        name: 'D轮（第4轮）',
        description: '关键抢分期',
        steps: [
          '放置货物token（最后一批）',
          '玩家执行行动',
          '轮次结束后：清空供应区，不再补充新token，进入终局准备'
        ]
      },
      {
        name: 'E轮（第5轮）',
        description: '终局阶段，最后冲刺',
        steps: [
          '无新货物放置',
          '玩家执行最后2个行动',
          '轮次结束后：游戏结束，进入终局计分'
        ]
      }
    ]
  },
  {
    id: 'brass-birmingham',
    name: '工业革命：伯明翰',
    nameEn: 'Brass: Birmingham',
    description: 'BGG排名第一的硬核德式经济策略桌游',
    image: 'https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDP8b9KWA__imagepage/img/-9x3VfHkR8Wr7eFl7g2nCsOy_U0=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3490053.jpg',
    hasExpansions: false,
    category: ['德式'],
    mechanism: ['手牌管理', '资源管理', '路线规划'],
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '摆放游戏版图（伯明翰地图）',
          '将工业板块按等级分类放置',
          '每位玩家获得8张手牌、17英镑起始资金',
          '放置市场标记和煤炭/铁矿标记到对应位置',
          '将啤酒标记放到贸易商板块',
          '翻开8张牌作为展示牌',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '打出1张牌执行1个行动（每回合可执行2个行动）',
        '建造工业设施：支付费用在对应城市放置工业板块',
        '建造运河/铁路：支付费用连接城市和设施',
        '开发：移除低等级工业板块，解锁高等级板块',
        '出售：将生产的货物出售到市场获得收入',
        '贷款：从银行获得30英镑，降低收入等级'
      ],
      outsideYourTurn: [
        '其他玩家建造铁路/运河时，你可以蹭用其网络',
        '其他玩家消耗煤炭/铁矿时，你的资源可能被使用',
        '市场变化影响你的出售策略',
        '观察其他玩家的工业布局和发展方向'
      ]
    },
    endConditions: [
      '运河时代：所有玩家手牌打完后结束',
      '铁路时代：所有玩家手牌打完后结束',
      '铁路时代结束后游戏结束进入终局计分'
    ],
    scoring: {
      duringGame: [
        '建造工业设施时获得板块上的即时分数',
        '运河/铁路连接城市时获得网络分数',
        '成功出售货物获得收入提升',
        '高等级工业板块提供更多分数'
      ],
      endGame: [
        '所有已建造工业板块上的分数总和',
        '铁路网络的连接分数',
        '剩余现金每1英镑=1分',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏分为运河时代（1770-1830）和铁路时代（1830-1870）',
      '运河时代只能建造等级1的设施',
      '铁路时代可以建造更高等级的设施',
      '啤酒是铁路时代的关键资源',
      '贷款虽然提供资金但会降低收入等级',
      '蹭对手的铁路网络可以节省大量资源',
      '游戏时长约60-120分钟'
    ],
    tokens: [
      { name: '工业板块', description: '代表各种工业设施（煤矿/铁矿/纺织/陶瓷等），分等级1和2，建造后提供分数和产能' },
      { name: '运河标记', description: '运河时代用于连接城市和工业设施，建立运输网络' },
      { name: '铁路标记', description: '铁路时代替代运河，连接范围更广，是高级设施运输的必备条件' },
      { name: '煤炭标记', description: '资源token，用于建造和运输，可在市场上交易' },
      { name: '铁矿标记', description: '资源token，用于建造高级设施，是重要的工业原料' },
      { name: '啤酒标记', description: '特殊资源，铁路时代的关键消耗品，用于出售货物' },
      { name: '英镑货币', description: '游戏货币，用于支付建造费用和贷款还款' },
      { name: '手牌', description: '玩家手牌，决定可在哪些城市执行行动，每回合打出2张' },
      { name: '市场标记', description: '放置在市场需求区，用于出售货物获得收入' }
    ],
    cards: [
      { name: '工业卡', count: 54, description: '包含所有工业建筑（煤、铁、港口等）' },
      { name: '商船卡', count: 14, description: '运河时代和铁路时代的远距离运输' },
      { name: '远见卡', count: 16, description: '玩家手牌，影响资源和建设策略' }
    ]
  },
  {
    id: 'durian',
    name: '榴莲忘贩',
    nameEn: 'Durian',
    description: 'Oink系列欢乐聚会水果大话骰桌游',
    image: 'https://cf.geekdo-images.com/3I5h5_9Z7V0VfxY2TY1Qqw__imagepage/img/3a0S1X8X8X8X8X8X8X8X8X8X8X8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5866197.jpg',
    hasExpansions: false,
    category: ['聚会'],
    mechanism: ['手牌管理', '反应', '记忆'],
    setup: [
      {
        playerCount: '2-7人',
        steps: [
          '将游戏指示板放中间',
          '将铃铛放在指示板旁',
          '愤怒猩猩标志从小到大排好',
          '洗混水果牌',
          '每名玩家拿取1个木架',
          '每名玩家抽1张水果牌放到木架上（背对自己，别人可见）',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '从牌堆抽1张水果牌',
        '将牌放到指示牌前，确定水果的订单数量',
        '可以选择继续翻牌增加订单',
        '或者摇铃铛呼叫店长，质疑供应不足'
      ],
      outsideYourTurn: [
        '观察其他玩家木架上的水果牌',
        '判断当前订单是否超过库存',
        '在他人回合时可以提醒或误导',
        '注意猩猩标志的进度'
      ]
    },
    endConditions: [
      '当一名玩家获得的愤怒标记达到或超过7分时游戏结束',
      '愤怒标记最少的玩家获胜'
    ],
    scoring: {
      duringGame: [
        '成功质疑供应不足，上一名玩家获得愤怒标记',
        '质疑失败，自己获得愤怒标记',
        '猩猩三兄妹牌有特殊效果（哥哥米奇取消3个水果订单，妹妹南茜取消香蕉订单）'
      ],
      endGame: [
        '愤怒标记最少的玩家获胜',
        '平局时共同获胜'
      ]
    },
    tips: [
      '游戏时长约15-20分钟',
      '关键在于观察他人表情和记忆水果数量',
      '猩猩标志从小到大排列',
      '木架上的牌自己看不到，别人都能看到',
      '适合2-7人聚会游戏',
      'Oink games系列小盒便携'
    ],
    tokens: [
      { name: '水果牌', description: '印有各种水果的卡牌，玩家抽牌后放到木架上，背对自己' },
      { name: '铃铛', description: '玩家摇铃表示质疑当前订单供应不足，触发结算' },
      { name: '愤怒猩猩标记', description: '玩家质疑失败或被质疑成功时获得的惩罚标记，达到7分游戏结束' },
      { name: '木架', description: '每位玩家1个，用于放置水果牌，牌背对自己（别人可见）' },
      { name: '水果token', description: '代表各种水果（榴莲/芒果/葡萄等），用于指示板上统计库存' }
    ]
  },
  {
    id: 'between-two-cities',
    name: '双城之间',
    nameEn: 'Between Two Cities',
    description: '合作建造城市的板块轮抽策略桌游',
    image: 'https://cf.geekdo-images.com/qrPLpAnbZdQKHGk7z8WTFQ__imagepage/img/qrPLpAnbZdQKHGk7z8WTFQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2869714.jpg',
    hasExpansions: false,
    category: ['德式', '合作'],
    mechanism: ['轮抽', '板块放置', '合作'],
    setup: [
      {
        playerCount: '3-7人',
        steps: [
          '每位玩家拿取1块玩家提示板',
          '每2名玩家之间放置1块初始城市板',
          '洗混所有建筑板块',
          '根据人数决定每轮发放的板块数量',
          '每位玩家抽取起始手牌（每轮7-9块板块）',
          '决定起始玩家'
        ]
      },
      {
        playerCount: '2人变体',
        steps: [
          '使用2人变体规则',
          '每位玩家建造2座城市',
          '使用自动化对手（Automa）',
          '其他设置与标准游戏相同'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '从手牌中选择2块建筑板块',
        '将1块板块与左手边玩家共同建造的城市中',
        '将另1块板块与右手边玩家共同建造的城市中',
        '将剩余板块传给左手边玩家',
        '可以与左右邻居沟通协商放置位置'
      ],
      outsideYourTurn: [
        '接收右手边玩家传来的板块',
        '与左右邻居协商城市建造策略',
        '观察其他城市的发展情况',
        '注意建筑类型的搭配和得分组合'
      ]
    },
    endConditions: [
      '进行3轮板块轮抽后游戏结束',
      '所有手牌打完即进入终局计分'
    ],
    scoring: {
      duringGame: [
        '住宅区域：按面积和组合得分',
        '工厂区域：提供额外收益',
        '公园区域：相邻建筑获得加分',
        '地标建筑：独特得分条件',
        '商业区域：按类型组合得分'
      ],
      endGame: [
        '每座城市单独计算得分',
        '玩家的最终得分是左右两座城市中得分较低的一个',
        '得分最高的玩家获胜',
        '平局时比较较高分的城市'
      ]
    },
    tips: [
      '游戏共进行3轮',
      '每轮从手牌中选2块留下，其余传给下家',
      '必须与左右邻居合作建造',
      '最终得分取两座城市中较低的一个',
      '平衡两座城市的发展是关键',
      '游戏时长约20-30分钟',
      '支持1-7人（含单人模式）'
    ],
    tokens: [
      { name: '建筑板块', description: '六角形板块，分住宅/工厂/公园/商业/地标等类型，放置到城市版图上得分' },
      { name: '城市版图', description: '每位玩家左右各1块，与邻居合作建造城市，放置建筑板块' },
      { name: '提示板', description: '每位玩家1块，用于提示建筑类型的得分规则和组合效果' }
    ]
  },
  {
    id: 'evolution',
    name: '物种演化',
    nameEn: 'Evolution',
    description: '物竞天择适者生存的进化主题策略桌游',
    image: 'https://cf.geekdo-images.com/9qS2zP6uj5Q5n1V9z5g5xQ__imagepage/img/9qS2zP6uj5Q5n1V9z5g5xQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3544990.jpg',
    hasExpansions: true,
    category: ['德式'],
    mechanism: ['手牌管理', '引擎构筑'],
    setup: [
      {
        playerCount: '2-6人',
        steps: [
          '将水塘放在桌子中央',
          '将食物指示物和属性指示物分开放置',
          '洗混特性卡牌作为公共牌堆',
          '每位玩家拿取1个食物屏风',
          '每位玩家拿取1个物种面板',
          '将2个木质标记物分别放在种群和体型轨道的"1"位置',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '抽牌阶段：抽3张牌，每有1个物种额外多抽1张',
        '选择食物：暗自打出1张牌到水塘，数字之和为植物性食物总量',
        '出牌阶段：可以打出特性卡、弃牌获取新物种、弃牌增加属性',
        '给物种添加特性（同物种不能重复，最多3个特性）',
        '弃1张牌创建新物种（种群和体型均为1）',
        '弃1张牌将某属性+1'
      ],
      outsideYourTurn: [
        '观察其他玩家的物种特性组合',
        '预判食物总量是否足够',
        '注意可能攻击自己的肉食性物种',
        '准备应对食物短缺的情况'
      ]
    },
    endConditions: [
      '牌堆耗尽2次后游戏结束',
      '进入终局计分环节'
    ],
    scoring: {
      duringGame: [
        '成功喂食保持物种种群规模',
        '肉食性物种攻击其他物种获取食物',
        '某些特性在喂食阶段提供额外食物',
        '食物充足时种群可能增长'
      ],
      endGame: [
        '屏风后的每个食物记1分',
        '每个物种的特性牌数量计入总分',
        '每个物种的种群规模计入总分',
        '分数最高者获胜，成为物种演化的胜利者'
      ]
    },
    tips: [
      '游戏时长约60分钟',
      '适合2-6人，10岁以上',
      '共有129张特性卡牌',
      '包含20块物种面板',
      '食物不足时种群会倒退甚至灭绝',
      '肉食性物种需要体型小于自己的目标',
      '特性组合是游戏的核心策略',
      '有飞行和气候扩展包'
    ],
    tokens: [
      { name: '物种面板', description: '代表一个物种，上面有种群和体型两条轨道，用于追踪物种规模' },
      { name: '特性卡牌', description: '赋予物种特殊能力，如飞行、肉食、脂肪组织等，每个物种最多3个特性' },
      { name: '食物token', description: '放置在水塘中的植物性食物，物种需要摄取足够食物来维持种群' },
      { name: '种群标记', description: '木质标记，放在物种面板的种群轨道上，表示物种数量' },
      { name: '体型标记', description: '木质标记，放在物种面板的体型轨道上，表示物种体型大小' },
      { name: '水塘', description: '中央区域，玩家暗自打出卡牌决定每轮植物性食物总量' }
    ],
    cards: [
      { name: '特性卡', count: 129, description: '包含所有生物特性（攻击、防御、食性等）' },
      { name: '食物卡', count: 24, description: '用于喂养物种的食物供应' }
    ]
  },
  {
    id: 'puerto-rico',
    name: '波多黎各',
    nameEn: 'Puerto Rico',
    description: '德式桌游经典之作，玩家扮演种植园主发展殖民地',
    image: 'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/yLZJCVLlIx4c7eJEWUNJ7w=/fit-in/900x600/filters:no_upscale():strip_icc()/pic107809.jpg',
    hasExpansions: true,
    category: ['德式'],
    mechanism: ['工人放置', '资源管理', '引擎构筑'],
    setup: [
      {
        playerCount: '3-4人',
        steps: [
          '摆放主岛板图和副岛板图',
          '将种植园token按颜色分类放置在供应区',
          '放置港口标记',
          '每位玩家选择一个颜色，获得种植园标记和建筑板',
          '每位玩家获得5个Doubloon（金币）作为起始资金',
          '种植园供应区随机放置相应的种植园token',
          '决定起始玩家'
        ]
      },
      {
        playerCount: '2人规则',
        steps: [
          '每位玩家获得双倍数量的建筑',
          '每回合使用两个角色token而非一个',
          '其余规则与标准游戏相同'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '选择一种职业角色执行对应行动',
        '开拓者：在空位放置种植园（需支付金币）',
        '市长：获得移民，建造房屋',
        '建筑师：建造或升级建筑（享受折扣）',
        '工匠：生产货物',
        '商人：出售货物获得金币',
        '船长：运送货物到欧洲获得VP',
        '先驱者：获得1个Doubloon'
      ],
      outsideYourTurn: [
        '当有人选择某角色时，该回合你无法选择相同角色',
        '注意其他玩家的建筑和货物库存',
        '观察即将到来的船只大小',
        '计算最优的行动顺序'
      ]
    },
    endConditions: [
      '当某类种植园全部被使用时，该类最后一次使用时游戏结束',
      '当建筑区有建筑被购买完毕时，最后一次购买后游戏结束',
      '当货物区某种货物耗尽时，最后一次使用后游戏结束'
    ],
    scoring: {
      duringGame: [
        '通过船长运送货物到欧洲获得VP',
        '大型建筑提供额外的VP',
        '特定建筑组合提供额外VP',
        '每回合商人出售货物获得金币'
      ],
      endGame: [
        '每座已建造的建筑按其VP值计分',
        '每个已放置的种植园计1分',
        '每个移民计1分',
        '剩余金币每5枚计1分',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏支持3-6人（标准4人）',
      '共有5种职业角色每回合轮流选择',
      '选择角色时所有玩家受益',
      '建设顺序很重要，优先建造小型建筑获取功能',
      '货物的供需关系影响经济',
      '游戏时长约60-90分钟'
    ],
    tokens: [
      { name: '种植园token', description: '代表各种作物（玉米/靛蓝/糖/烟草/咖啡），放置到种植园上生产货物' },
      { name: '建筑板', description: '玩家个人版图上的建筑区域，用于放置各种功能建筑' },
      { name: 'Doubloon金币', description: '游戏货币，用于支付建造费用和购买种植园' },
      { name: '移民token', description: '代表劳动力，放置在建筑中使其生效，是生产的关键' },
      { name: '货物桶', description: '生产出的货物（玉米/靛蓝/糖/烟草/咖啡），用于出售或运送' },
      { name: '船只', description: '用于运送货物到欧洲获得VP，有不同容量的船只' }
    ],
    cards: [
      { name: '建筑卡', count: 56, description: '包含种植园（玉米/靛蓝/糖/烟草/咖啡）和大型建筑' },
      { name: '角色卡', count: 7, description: '选择器面板：定居者、船长、商人、工匠、船长、矿工、建筑师' }
    ]
  },
  {
    id: 'age-of-innovation',
    name: '大创造时代',
    nameEn: 'Age of Innovation',
    description: '神秘大地系列新作，板块放置与文化发展策略桌游',
    image: 'https://cf.geekdo-images.com/H3k3lOhM9a7gDUD2iVl2hw__imagepage/img/H3k3lOhM9a7gDUD2iVl2hw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7146967.jpg',
    hasExpansions: false,
    category: ['德式'],
    mechanism: ['板块放置', '引擎构筑', '资源管理'],
    setup: [
      {
        playerCount: '1-4人',
        steps: [
          '选择地图并拼接',
          '放置文明token到起始位置',
          '将地形板块按类型分类放置',
          '选择6个时代卡牌组成时代牌堆',
          '每位玩家获得起始资源和工具token',
          '翻开第一张时代卡牌',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '将工具token放置到版图上的对应位置',
        '激活工具：获得板块或资源',
        '发展文明：获得新技术或文化',
        '建造：使用资源放置建筑物',
        '扩展：移动文明token开拓新区域',
        '研究：获得新的工具类型'
      ],
      outsideYourTurn: [
        '观察对手的工具和资源布局',
        '预判下一时代卡的奖励',
        '注意地图上的关键资源位置',
        '观察对手的发展路线'
      ]
    },
    endConditions: [
      '时代牌堆全部使用完毕后游戏结束',
      '最后一轮触发终局计分'
    ],
    scoring: {
      duringGame: [
        '每回合根据时代卡获得即时分数',
        '建造特殊建筑获得分数',
        '科技发展获得分数',
        '文明扩张获得分数'
      ],
      endGame: [
        '城市建筑的总分',
        '科技发展的额外分数',
        '未使用的资源和工具换算分数',
        '文化成就的分数',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏支持1-4人，有单人模式',
      '共有6个时代，每个时代有不同的目标和奖励',
      '12个派系各有独特能力',
      '地形板块影响资源获取',
      '建筑可以合并升级',
      '游戏时长约60-120分钟'
    ],
    tokens: [
      { name: '地形板块', description: '各种地形（平原/山地/水域等），放置在版图上获取资源和分数' },
      { name: '文明token', description: '代表玩家的文明势力，在版图上移动和扩展领土' },
      { name: '工具token', description: '放置在版图上的行动标记，激活后获得板块或资源' },
      { name: '时代卡牌', description: '每轮翻开1张，决定本轮的特殊目标和奖励条件' },
      { name: '建筑token', description: '放置在版图上提供持续效果或终局分数' },
      { name: '资源token', description: '各种资源（木材/石材/金币等），用于建造和升级' }
    ],
    cards: [
      { name: '文明卡', count: 24, description: '提供文化和金钱奖励的特殊卡牌' },
      { name: '地形卡', count: 48, description: '用于构建地形的板块' }
    ]
  },
  {
    id: 'terraforming-mars',
    name: '殖民火星',
    nameEn: 'Terraforming Mars',
    description: '经典火星殖民引擎构筑策略桌游',
    image: 'https://cf.geekdo-images.com/wg3oJD9DIR97F_SG4lzK4g__imagepage/img/wg3oJD9DIR97F_SG4lzK4g=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3538336.jpg',
    hasExpansions: true,
    category: ['德式'],
    mechanism: ['引擎构筑', '手牌管理', '资源管理'],
    setup: [
      {
        playerCount: '1-5人',
        steps: [
          '选择公司卡并放置标记',
          '放置火星版图和海洋版块',
          '设置参数标记（温度、氧气、海洋）',
          '每位玩家获得起始资源',
          '洗混项目卡牌，分发起始手牌',
          '放置先驱者标记',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '将项目卡转换为行动（支付资源执行）',
        '申请项目：使用MC（钱币）申请项目卡',
        '使用卡牌效果',
        '收集资源：每日获得太阳能为1MC',
        '升级：增加terraforming参数',
        '建设城市：放置城市标记获得奖励',
        '放置森林：将海洋邻接区域绿化获得植物和分数'
      ],
      outsideYourTurn: [
        '观察对手的MC使用和资源需求',
        '注意全局参数进度',
        '观察关键项目卡是否被申请',
        '计算全球事件的影响'
      ]
    },
    endConditions: [
      '当氧气达到14%、温度达到8°C、海洋全部放置后',
      '达到三个terraforming目标之一时触发终局',
      '最后一轮结束后进入计分'
    ],
    scoring: {
      duringGame: [
        '放置海洋获得TR（terraforming rating）',
        '城市邻接森林获得分数',
        '某些项目卡有立即触发的效果',
        '全球事件提供分数或资源'
      ],
      endGame: [
        '每位玩家的TR总和',
        '所有项目卡的分数',
        '剩余MC每8MC=1分',
        '剩余资源按比例换算',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏支持1-6人',
      '每张项目卡需要特定的资源和MC',
      'TR（terraforming rating）是基础分数',
      '有多个扩展增加更多内容和变体',
      '游戏时长约120分钟',
      '被誉为最经典的引擎构筑游戏之一'
    ],
    tokens: [
      { name: '项目卡牌', description: '代表各种火星改造项目，打出后提供即时效果或持续能力' },
      { name: '公司卡', description: '游戏开始时选择，决定玩家的起始资源和特殊能力' },
      { name: '火星版图', description: '中央游戏板，展示火星表面，用于放置海洋/城市/森林标记' },
      { name: '海洋板块', description: '放置在火星版图的海洋区域，提升温度和氧气' },
      { name: '城市标记', description: '放置在版图上，终局时相邻森林提供分数' },
      { name: '森林标记', description: '放置在版图上，提升氧气并获得植物资源' },
      { name: '温度标记', description: '追踪火星全局温度，从-30°C升至8°C' },
      { name: '氧气标记', description: '追踪火星大气氧气含量，从0%升至14%' },
      { name: 'MC货币', description: 'MegaCredit，游戏主要货币，用于支付项目费用' }
    ],
    cards: [
      { name: '项目卡', count: 208, description: '蓝色项目卡（标准版）' },
      { name: '公司卡', count: 10, description: '起始公司特殊能力' },
      { name: 'Prelude卡', count: 56, description: '需要Prelude扩' }
    ]
  },
  {
    id: 'concordia',
    name: '康考迪娅',
    nameEn: 'Concordia',
    description: '少即是多的罗马贸易帝国策略桌游',
    image: 'https://cf.geekdo-images.com/sy_6ZeMt4a_pxjpEXJHY_Q__imagepage/img/sy_6ZeMt4a_pxjpEXJHY_Q=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1612412.jpg',
    hasExpansions: true,
    category: ['德式'],
    mechanism: ['手牌管理', '资源管理', '路线规划'],
    setup: [
      {
        playerCount: '2-5人',
        steps: [
          '选择地图并拼接（支持多种地图变体）',
          '每位玩家选择一种颜色，获得商队卡',
          '放置商店token到地图上的城市',
          '洗混商品卡牌',
          '每位玩家获得起始资源',
          '放置先驱者标记到起始城市',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '移动商队到一个相邻城市',
        '建立新商队（需支付资源）',
        '买一张商品卡（需支付MC）',
        '出售商品获得资源和分数',
        '使用一张已购买的卡牌效果',
        '建造一个建筑（提供永久效果）'
      ],
      outsideYourTurn: [
        '观察对手的商队路线',
        '注意商品的价格波动',
        '观察对手的建筑布局',
        '预判下一步行动'
      ]
    },
    endConditions: [
      '当商品牌堆耗尽时，最后一位玩家回合结束后游戏结束',
      '或者当某个玩家所有商队都满员时触发结束'
    ],
    scoring: {
      duringGame: [
        '出售商品时获得MC',
        '某些商品卡有即时效果',
        '建筑提供持续的资源和分数加成'
      ],
      endGame: [
        '每位玩家每张商品卡按其数字计分',
        '每座城市计1分',
        '每张建筑卡计1分',
        '如果有省分图腾，每个图腾计2分',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏支持2-6人',
      '每张地图有不同的城市布局',
      '玩家人数影响地图大小',
      '商品卡同时用于得分和行动',
      '建筑可以重复使用效果',
      '游戏时长约60分钟'
    ],
    tokens: [
      { name: '商队卡', description: '玩家的行动牌库，打出后执行移动/建造/交易等行动' },
      { name: '商店token', description: '放置在地图城市中的贸易站，提供商品和资源' },
      { name: '商品卡牌', description: '收集后用于终局计分，也可打出执行特殊行动' },
      { name: '先驱者标记', description: '代表商队领袖，在地图上移动并建立贸易网络' },
      { name: '建筑token', description: '放置在地图上提供持续资源产出或特殊能力' },
      { name: '省份图腾', description: '控制完整省份后获得的奖励标记，终局计2分' }
    ],
    cards: [
      { name: '商队卡', count: 65, description: ' colonists移民、先驱者、商人、建筑师、Settlers定居者等' }
    ]
  },
  {
    id: 'modern-art',
    name: '现代艺术',
    nameEn: 'Modern Art',
    description: '经典拍卖类桌游，Reiner Knizia拍卖三部曲之首',
    image: 'https://cf.geekdo-images.com/2v1T7pP8VNeiJe0bV8Q2hw__imagepage/img/2v1T7pP8VNeiJe0bV8Q2hw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic893687.jpg',
    hasExpansions: false,
    category: ['聚会'],
    mechanism: ['拍卖', '手牌管理'],
    setup: [
      {
        playerCount: '3-5人',
        steps: [
          '摆放出价指示板',
          '每位玩家获得起始资金和竞价标记',
          '洗混所有名画卡',
          '翻开5张名画作为第一轮拍卖',
          '放置艺术家姓名板到对应位置',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '翻开新一轮的5张名画卡',
        '为5位画家的作品进行竞价拍卖',
        '放置竞价标记到画作上',
        '进行开价和竞价',
        '画家按规则被出售获得资金',
        '获得名画卡'
      ],
      outsideYourTurn: [
        '参与竞价',
        '观察其他玩家的资金状况',
        '评估画家的市场走势',
        '判断何时卖出持有的画作'
      ]
    },
    endConditions: [
      '进行4轮拍卖后游戏结束',
      '当所有名画卡拍卖完毕时游戏结束'
    ],
    scoring: {
      duringGame: [
        '在竞价中获胜需要支付金币',
        '画家在市场展示时可被购买',
        '持有画作等待升值'
      ],
      endGame: [
        '每轮结束时，按画家当前价格计算所有持有该画家画作的玩家得分',
        '价格最高的画家计全价，第二高计90%，以此类推',
        '持有该画家最多画作的玩家额外获得价格分',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏支持3-6人（标准4-5人）',
      '共有70张名画卡，5位画家',
      '画家价格根据拍卖结果浮动',
      '时机选择很关键：买画还是卖画',
      '游戏时长约45-60分钟',
      '被誉为拍卖类桌游的开山之作'
    ],
    tokens: [
      { name: '名画卡', description: '印有5位画家作品的卡牌，玩家通过拍卖获得，终局按画家价格计分' },
      { name: '出价标记', description: '玩家用于在拍卖中出价，最高出价者获得画作' },
      { name: '竞价标记', description: '放置在画作上表示参与竞拍，用于追踪当前最高出价' },
      { name: '艺术家姓名板', description: '展示5位画家的当前市场排名和价格，每轮拍卖后更新' },
      { name: '资金token', description: '玩家的货币，用于拍卖出价购买画作' }
    ],
    cards: [
      { name: '名画卡', count: 60, description: '5位艺术家各12张：Ovan O Beka、Lars Lise、Antoine Vilms、Claire Bishop、Heidi Hayes' }
    ]
  },
  {
    id: 'himeji-castle',
    name: '姬路城',
    nameEn: 'Himeji Castle',
    description: '日本城堡主题工人放置与资源管理策略桌游',
    image: 'https://cf.geekdo-images.com/sbSNGErq9D4rFwB-qcp7JQ__imagepage/img/sbSNGErq9D4rFwB-qcp7JQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2278130.jpg',
    hasExpansions: true,
    category: ['德式'],
    mechanism: ['工人放置', '资源管理'],
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '拼接姬路城版图',
          '放置楼层标记和资源',
          '每位玩家选择一个家族颜色',
          '获得起始资源和工人token',
          '放置起始资源token到供应区',
          '洗混行动卡牌并翻开',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '放置工人到楼层执行行动',
        '获取资源：木材、石材、金币',
        '建造建筑：获得分数和功能',
        '招募侍从：获得额外行动力',
        '收集贡品：获得声望',
        '建造天守阁：获得大量分数',
        '使用侍从执行额外行动'
      ],
      outsideYourTurn: [
        '观察其他玩家的工人位置',
        '注意关键楼层的资源',
        '预判对手的行动意图',
        '计算最优的工人放置时机'
      ]
    },
    endConditions: [
      '进行3轮游戏后结束',
      '最后一轮触发终局计分'
    ],
    scoring: {
      duringGame: [
        '建造天守阁获得即时分数',
        '收集贡品获得声望',
        '建造建筑获得分数',
        '招募侍从获得额外能力'
      ],
      endGame: [
        '声望轨上的分数',
        '建造的建筑总分',
        '剩余资源换算分数',
        '姬路城特定位置的额外分数',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏支持2-4人',
      '共有5层楼，每层有不同功能',
      '工人放置是核心机制',
      '资源管理很重要',
      '建造天守阁是主要得分方式',
      '游戏时长约60-90分钟'
    ],
    tokens: [
      { name: '工人token', description: '放置到楼层上执行各种行动（获取资源/建造/招募等）' },
      { name: '侍从token', description: '招募后提供额外行动力，可执行额外行动增强效率' },
      { name: '资源token', description: '包括木材/石材/金币等，用于建造建筑和支付费用' },
      { name: '楼层标记', description: '姬路城每层楼的标识，不同楼层提供不同行动' },
      { name: '天守阁标记', description: '建造天守阁获得的标记，提供大量分数' },
      { name: '家族颜色标记', description: '每位玩家选择一种家族颜色，用于区分工人和建筑' }
    ]
  },
  {
    id: 'troyes',
    name: '特鲁瓦',
    nameEn: 'Troyes',
    description: '经典骰子驱动工人放置德式策略桌游',
    image: 'https://cf.geekdo-images.com/PY5MMt6X6a39RCqV_CV8Qw__imagepage/img/PY5MMt6X6a39RCqV_CV8Qw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic819625.jpg',
    hasExpansions: true,
    category: ['德式'],
    mechanism: ['骰子驱动', '工人放置'],
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '放置三个城市的版图',
          '放置骰子指示物到对应位置',
          '每位玩家选择一种颜色',
          '放置影响力token到影响力轨',
          '洗混事件卡牌',
          '每位玩家获得起始资源',
          '放置工人士兵到供应区',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '放置骰子到行动位执行行动',
        '建造建筑：获得分数和影响力',
        '招募士兵：增加骰子数量',
        '使用金币购买资源',
        '触发事件：对抗负面事件',
        '挤人：移动其他玩家的骰子',
        '激活能力：使用建筑的持续效果'
      ],
      outsideYourTurn: [
        '观察骰子的点数分布',
        '注意事件的影响',
        '预判关键行动的时机',
        '计算是否需要挤人'
      ]
    },
    endConditions: [
      '当所有事件被成功对抗后游戏结束',
      '或者当某玩家影响力耗尽时触发结束'
    ],
    scoring: {
      duringGame: [
        '建造建筑获得分数',
        '对抗事件成功获得分数',
        '招募士兵增加行动力',
        '使用影响力改变骰子'
      ],
      endGame: [
        '建筑的总分',
        '影响力轨上的分数',
        '剩余金币换算分数',
        '成功对抗事件的额外分数',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏支持2-4人',
      '骰子点数越大行动效果越好',
      '可以购买对手的骰子',
      '影响力可以改变骰子',
      '事件分为正面和负面',
      '游戏时长约60-90分钟',
      '被誉为骰子游戏的开山之作'
    ],
    tokens: [
      { name: '骰子', description: '游戏核心组件，投出后放置到行动位执行建造/招募/事件等行动' },
      { name: '工人士兵', description: '代表工人和士兵，增加玩家可用的骰子数量' },
      { name: '影响力token', description: '用于改变骰子点数或执行特殊行动，放置在影响力轨道上' },
      { name: '事件卡牌', description: '每轮翻开的负面事件，玩家需要合力对抗以避免惩罚' },
      { name: '建筑token', description: '建造后提供分数和持续效果，是主要得分来源' },
      { name: '金币', description: '游戏货币，用于购买资源、改变骰子和支付费用' }
    ],
    cards: [
      { name: '事件卡', count: 24, description: '影响骰子和行动的随机事件' },
      { name: '女士卡', count: 9, description: '需要女士扩，提供独特能力和终局计分' }
    ]
  },
  {
    id: 'sagrada',
    name: '圣家堂',
    nameEn: 'Sagrada',
    description: '骰子分配与图案构建的玻璃艺术策略桌游',
    image: 'https://cf.geekdo-images.com/WZbd7ej5AI4Rxy9ZLOqPHA__imagepage/img/WZbd7ej5AI4Rxy9ZLOqPHA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3516896.jpg',
    hasExpansions: true,
    category: ['德式', '抽象'],
    mechanism: ['骰子驱动', '拼图'],
    setup: [
      {
        playerCount: '1-4人',
        steps: [
          '选择个人面板并放置窗框标记',
          '洗混所有骰子',
          '翻开5张公共目标卡',
          '每位玩家选择1张私人目标卡',
          '放置分数标记到起点',
          '准备骰子池',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '从骰子池中拿取骰子',
        '观察当前轮次和可用骰子',
        '选择骰子放置到自己的面板上',
        '遵守颜色和数字限制',
        '使用工具卡改变骰子点数',
        '完成私人目标卡获得额外分数'
      ],
      outsideYourTurn: [
        '观察其他玩家的面板布局',
        '注意公共目标的完成进度',
        '预判骰子池的剩余',
        '评估工具卡的使用时机'
      ]
    },
    endConditions: [
      '当所有玩家的面板都填满或无法继续放置时游戏结束',
      '或者当骰子池耗尽且无法放置时结束'
    ],
    scoring: {
      duringGame: [
        '完成私人目标卡获得10分',
        '使用工具卡获得分数',
        '放置特殊骰子获得分数',
        '完成行或列获得分数'
      ],
      endGame: [
        '每张完成的公共目标卡计分',
        '每张完成的私人目标卡计分',
        '每行/列的完整性获得分数',
        '颜色和数字的多样性获得分数',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏支持1-4人，有单人模式',
      '每张面板有5种颜色的限制',
      '工具卡可以改变骰子点数',
      '公共目标卡对所有玩家可见',
      '游戏时长约30-45分钟',
      '被誉为最美的小盒桌游之一'
    ],
    tokens: [
      { name: '骰子', description: '5种颜色的透明骰子，每轮从袋中抽取并放置到个人面板上' },
      { name: '个人面板', description: '每位玩家1块，带有窗格图案，用于放置骰子完成彩色玻璃' },
      { name: '窗框标记', description: '放置在个人面板边缘，标记特殊得分位置' },
      { name: '公共目标卡', description: '翻开后所有玩家可见，完成公共目标获得额外分数' },
      { name: '私人目标卡', description: '每位玩家1张，秘密目标，完成获得10分' },
      { name: '工具卡', description: '提供改变骰子点数或放置规则的特殊能力' },
      { name: '分数标记', description: '追踪玩家当前得分，在分数轨道上移动' }
    ],
    cards: [
      { name: '目标卡', count: 16, description: '8张公共目标卡和8张私人目标卡' },
      { name: '工具卡', count: 6, description: '特殊行动能力' }
    ]
  },
  {
    id: 'wyrmspan',
    name: '龙翼翱翔',
    nameEn: 'Wyrmspan',
    description: '龙主题引擎构筑策略桌游，展翅翱翔系列新作',
    image: 'https://cf.geekdo-images.com/7oDJ1QVM5rjIOS_a1bY5Lg__imagepage/img/7oDJ1QVM5rjIOS_a1bY5Lg=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7309045.jpg',
    hasExpansions: true,
    category: ['德式'],
    mechanism: ['引擎构筑', '手牌管理'],
    setup: [
      {
        playerCount: '1-5人',
        steps: [
          '摆放龙穴版图和森林版图',
          '放置龙蛋、宝石和食物指示物',
          '洗混龙牌和巢穴卡',
          '翻开展示区的龙牌',
          '每位玩家选择起始龙穴',
          '每位玩家获得起始资源和龙',
          '放置先驱者标记',
          '决定起始玩家'
        ]
      }
    ],
    turnActions: {
      onYourTurn: [
        '获取龙蛋：从森林收集资源',
        '吸引龙：使用资源招募龙牌',
        '放置龙到龙穴：获得龙的能力',
        '激活龙：从龙的能力获得资源和分数',
        '探索巢穴：发现新的龙牌',
        '收集宝石：用于吸引高级龙',
        '喂食龙：消耗食物激活龙'
      ],
      outsideYourTurn: [
        '观察其他玩家的龙穴布局',
        '注意展示区的龙牌',
        '预判高级龙的招募时机',
        '观察对手的资源储备'
      ]
    },
    endConditions: [
      '当龙的展示区耗尽且无法补牌时触发结束',
      '或者当某玩家完成第4个龙穴后游戏结束'
    ],
    scoring: {
      duringGame: [
        '激活龙获得即时分数',
        '龙的能力提供资源和优势',
        '收集宝石获得分数',
        '探索巢穴获得额外资源'
      ],
      endGame: [
        '每条龙的分数',
        '每个巢穴卡片的分数',
        '龙穴填充的完整性分数',
        '剩余资源和宝石的分数',
        '分数最高者获胜'
      ]
    },
    tips: [
      '游戏支持1-5人，有单人模式',
      '龙分为多个等级，高级龙更强但更难获得',
      '龙有独特的引擎构筑能力',
      '每个回合可以执行多个行动',
      '游戏时长约60-90分钟',
      '展翅翱翔系列的龙主题变体'
    ],
    tokens: [
      { name: '龙牌', description: '代表各种龙，招募后放置到龙穴中，提供独特能力和资源产出' },
      { name: '龙穴版图', description: '每位玩家的个人版图，用于放置龙牌和龙蛋' },
      { name: '龙蛋token', description: '从森林收集的资源，用于吸引龙牌' },
      { name: '宝石token', description: '高级资源，用于吸引更强大的龙' },
      { name: '食物token', description: '用于喂食龙以激活其能力' },
      { name: '巢穴卡', description: '提供特殊能力或奖励，放置在龙穴中增强引擎' },
      { name: '森林版图', description: '中央区域，玩家从中收集龙蛋和资源' }
    ],
    cards: [
      { name: '龙牌', count: 83, description: '红龙、翡翠龙、金龙、蓝龙、紫龙等5种颜色' },
      { name: '巢穴卡', count: 42, description: '提供龙能力增强的特殊卡' }
    ]
  }
]
