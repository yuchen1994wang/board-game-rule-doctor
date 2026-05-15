import type { Expansion } from '@/types/game'

export const expansions: Expansion[] = [
  {
    id: 'evolution-flight',
    gameId: 'evolution',
    name: '飞行扩展',
    shortDesc: '新增鸟类物种面板和飞行特性卡，物种可以迁徙和俯冲攻击',
    description: '引入空中维度！飞行物种可以迁徙到新的栖息地，俯冲攻击地面猎物，大大增加策略深度和游戏互动。鸟类物种面板让你的生态系统更加丰富。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Evolution_board_game.jpg/220px-Evolution_board_game.jpg',
    playerCount: '2-6人（基础2-6人不变）',
    conflictsWith: ['evolution-climate'],
    setup: [
      {
        playerCount: '2-6人',
        steps: [
          '增加悬崖板块放在水塘旁',
          '每位玩家额外获得1个鸟类物种面板',
          '将飞行特性卡与基础特性卡分开洗混',
          '飞行物种可以从悬崖获取食物',
          '飞行物种可以俯冲攻击低空的猎物'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '迁徙：飞行物种可以移动到新的栖息地',
          '俯冲攻击：飞行物种可以攻击悬崖上的其他物种'
        ]
      }
    },
    tips: [
      '飞行物种可以绕过地面障碍',
      '俯冲攻击无需体型对比',
      '共有12张飞行特性卡',
      '鸟类物种面板x12'
    ]
  },
  {
    id: 'evolution-climate',
    gameId: 'evolution',
    name: '气候扩展',
    shortDesc: '引入气候变化机制，天气会影响食物产出和物种生存',
    description: '挑战自然之力！气候版图的引入让游戏更加不可预测。极端天气可能导致物种大规模灭绝，你需要提前规划气候适应策略。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Evolution_board_game.jpg/220px-Evolution_board_game.jpg',
    playerCount: '2-6人（基础2-6人不变）',
    conflictsWith: ['evolution-flight'],
    setup: [
      {
        playerCount: '2-6人',
        steps: [
          '将气候版图放在水塘旁',
          '放置气候标记在起始位置',
          '洗混气候事件卡',
          '每位玩家获得气候适应能力标记',
          '物种需要适应气候变化才能生存'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '查看本回合气候状态',
          '根据气候调整喂食策略',
          '使用气候适应能力保护物种'
        ]
      }
    },
    endConditions: [
      '气候事件牌堆耗尽后游戏结束',
      '极端气候可能导致物种大规模灭绝'
    ],
    tips: [
      '共有177张气候扩展卡牌',
      '气候事件卡x30',
      '气候变化是不可预测的',
      '厚皮毛特性可以抵御寒冷'
    ]
  },
  {
    id: 'btc-mad-king',
    gameId: 'between-two-cities',
    name: '疯王城堡扩展',
    shortDesc: '融合疯王城堡机制，增加特殊行动板块和更复杂的合作规则',
    description: '两城之间的进化版！融合经典桌游《疯王城堡》的独特机制，引入城堡控制权争夺和特殊行动板块，让合作建造更加刺激有趣。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Between_Two_Cities_cover.jpg/220px-Between_Two_Cities_cover.jpg',
    playerCount: '3-7人（基础3-7人不变）',
    setup: [
      {
        playerCount: '3-7人',
        steps: [
          '添加疯王城堡特殊板块到版块堆',
          '增加公共目标卡数量',
          '每位玩家获得特殊能力标记',
          '设置疯王城堡计分轨道'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '可以使用疯王城堡特殊行动',
          '争夺城堡控制权获得额外分数',
          '触发城堡事件改变游戏进程'
        ]
      }
    },
    tips: [
      '融合了两款经典桌游的机制',
      '城堡控制权争夺更激烈',
      '特殊行动需要协调配合'
    ]
  },
  {
    id: 'pr-new-roles',
    gameId: 'puerto-rico',
    name: '新角色扩展',
    shortDesc: '新增多种职业角色，丰富游戏策略选择',
    description: '更多选择，更多策略！引入全新的职业角色，每个角色都有独特的能力和经济优势。合理搭配角色顺序将成为获胜的关键。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Puerto_Rico_board_game.jpg/220px-Puerto_Rico_board_game.jpg',
    playerCount: '3-6人（扩展支持到6人）',
    setup: [
      {
        playerCount: '3-6人',
        steps: [
          '添加新角色卡到角色池',
          '每回合可选择的角色增加',
          '调整角色选择顺序',
          '新增建筑类型可用'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '可以选择新增的职业角色',
          '新角色提供独特的经济优势',
          '合理选择角色顺序影响胜负'
        ]
      }
    },
    tips: [
      '新增多个职业角色',
      '角色组合策略更加丰富',
      '需要重新评估角色价值'
    ]
  },
  {
    id: 'tm-colonies',
    gameId: 'terraforming-mars',
    name: '殖民地扩展',
    shortDesc: '新增太空站和轨道设施建造，开拓火星新区域',
    description: '冲出火星，走向太空！殖民地扩展让你可以在轨道上建造太空站，开启全新的资源获取方式和得分途径。战略维度大幅提升。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Terraforming_Mars_board_game.jpg/220px-Terraforming_Mars_board_game.jpg',
    playerCount: '1-5人（基础1-5人不变）',
    setup: [
      {
        playerCount: '1-5人',
        steps: [
          '展开火星版图增加殖民地区域',
          '新增轨道设施token',
          '太空站建筑增加',
          '殖民地提供新的资源获取方式'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '建造太空站连接火星和轨道',
          '在殖民地部署设施获得额外MC',
          '使用轨道资源辅助火星改造'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '太空站建设分数',
          '轨道设施连接分数',
          '殖民地网络完整性分数'
        ]
      }
    },
    tips: [
      '轨道资源是稀缺资源',
      '太空站建设需要提前规划',
      '殖民地提供额外的TR增长途径'
    ]
  },
  {
    id: 'tm-prelude',
    gameId: 'terraforming-mars',
    name: 'Prelude 扩展',
    shortDesc: '游戏开始时获得强力起始资源和项目，快速进入中后期',
    description: '跳过无聊的前期！Prelude让你在游戏开始时就获得强力起始资源和发展项目，直接进入精彩的中后期博弈，大幅缩短游戏时间。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Terraforming_Mars_board_game.jpg/220px-Terraforming_Mars_board_game.jpg',
    playerCount: '1-5人（基础1-5人不变）',
    setup: [
      {
        playerCount: '1-5人',
        steps: [
          '每位玩家从Prelude牌堆抽2张',
          '立即执行Prelude卡的效果',
          '获得起始资源和项目',
          '快速推进terraforming进度'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '跳过前期积累阶段',
          '更快获得高价值项目',
          '提前布局引擎构筑'
        ]
      }
    },
    tips: [
      '大幅缩短游戏时间',
      '加速引擎构筑进程',
      '适合想快速体验后期的玩家'
    ]
  },
  {
    id: 'sagrada-artistry',
    gameId: 'sagrada',
    name: '艺术大师扩展',
    shortDesc: '新增私人目标卡和更复杂的图案挑战',
    description: '成为真正的艺术大师！新增12张私人目标卡和更精美的图案面板，为追求高难度的玩家提供更多策略选择和视觉享受。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Sagrada_board_game.jpg/220px-Sagrada_board_game.jpg',
    playerCount: '1-4人（基础1-4人不变）',
    setup: [
      {
        playerCount: '1-4人',
        steps: [
          '新增私人目标卡池',
          '选择新的图案面板',
          '增加新的工具卡',
          '特殊规则适用'
        ]
      }
    ],
    scoring: {
      additions: {
        duringGame: [
          '完成艺术大师挑战获得额外分数',
          '特殊图案提供独特得分方式'
        ],
        endGame: [
          '艺术成就分数',
          '创意展示分数'
        ]
      }
    },
    tips: [
      '共有12张新私人目标卡',
      '图案设计更加精美',
      '增加了更多策略深度'
    ]
  },
  {
    id: 'sagrada-passion',
    gameId: 'sagrada',
    name: '热情似火扩展',
    shortDesc: '新增特殊骰子和色彩挑战面板',
    description: '热情如火，创意无限！引入彩色骰子打破颜色限制，让你在放置时有更多选择。适合追求高难度挑战和创意的玩家。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Sagrada_board_game.jpg/220px-Sagrada_board_game.jpg',
    playerCount: '1-4人（基础1-4人不变）',
    setup: [
      {
        playerCount: '1-4人',
        steps: [
          '新增特殊彩色骰子',
          '选择热情似火图案面板',
          '特殊色彩限制适用',
          '增加新的公共目标'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '使用彩色骰子突破颜色限制',
          '挑战更高的完成度',
          '解锁特殊得分组合'
        ]
      }
    },
    tips: [
      '彩色骰子提供更多灵活性',
      '增加了面板多样性',
      '适合追求高难度挑战的玩家'
    ]
  },
  {
    id: 'burgundy-exp1',
    gameId: 'burgundy',
    name: '勃艮第城堡：扩展1',
    nameEn: 'The Castles of Burgundy: Expansion',
    shortDesc: '新增6块玩家版图、新建筑和新成就token',
    description: '为勃艮第城堡带来全新体验！扩展包含6块全新的双面玩家版图，提供不同的起始布局和挑战。新增多种建筑token和成就token，让每局游戏都有新鲜感。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/The_Castles_of_Burgundy.jpg/220px-The_Castles_of_Burgundy.jpg',
    playerCount: '2-4人（基础2-4人不变）',
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '选择扩展版的双面玩家版图（C/D面）',
          '新增建筑token混入对应颜色的建筑供应区',
          '新增成就token放置到成就区域',
          '部分版图有特殊起始建筑或限制'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '新建筑token有独特的即时或终局效果',
          '某些版图允许特殊行动（如免费拿取特定颜色token）'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '新成就token的额外分数',
          '特殊版图的完成奖励'
        ]
      }
    },
    tips: [
      '扩展版图有不同的难度等级',
      '新建筑token改变了最优策略',
      '建议熟悉基础后再使用扩展版图'
    ]
  },
  {
    id: 'burgundy-exp2',
    gameId: 'burgundy',
    name: '勃艮第城堡：扩展2',
    nameEn: 'The Castles of Burgundy: 2nd Expansion',
    shortDesc: '新增贸易站和僧侣系统',
    description: '引入贸易站和僧侣系统！贸易站提供新的资源获取方式，僧侣可以执行特殊祈祷行动。扩展还包含新的货物类型和更多的策略选择。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/The_Castles_of_Burgundy.jpg/220px-The_Castles_of_Burgundy.jpg',
    playerCount: '2-4人（基础2-4人不变）',
    conflictsWith: ['burgundy-exp1'],
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '放置贸易站版图在主版图旁',
          '每位玩家获得2个僧侣token',
          '新增货物token放入供应区',
          '翻开贸易站特殊订单卡'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '派遣僧侣到贸易站执行祈祷行动',
          '完成贸易站订单获得额外奖励',
          '使用新货物类型进行出售'
        ]
      }
    },
    scoring: {
      additions: {
        duringGame: [
          '完成贸易站订单获得即时分数',
          '僧侣祈祷行动提供资源或分数'
        ],
        endGame: [
          '贸易站控制区域分数',
          '未完成订单的惩罚分数'
        ]
      }
    },
    tips: [
      '僧侣是稀缺资源，需要合理分配',
      '贸易站订单有时限，注意规划',
      '与扩展1不能同时使用'
    ]
  },
  {
    id: 'concordia-map1',
    gameId: 'concordia',
    name: '康考迪娅：地图扩1',
    nameEn: 'Concordia: Map Expansion 1 - Aelos',
    shortDesc: '新增Aeols地图，增加新的城市和省份布局',
    description: '探索新的领土！新增Aeols地图，包含全新的城市布局和省份配置，为游戏带来更多变数和策略选择。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Concordia_board_game.jpg/220px-Concordia_board_game.jpg',
    playerCount: '2-5人（基础2-5人不变）',
    setup: [
      {
        playerCount: '2-5人',
        steps: [
          '替换基础地图为Aeols地图',
          '重新放置商店token到新城市',
          '其他设置与基础游戏相同'
        ]
      }
    ],
    tips: [
      '新地图有不同的城市布局',
      '路线规划策略需要调整',
      '适合已熟悉基础游戏的玩家'
    ]
  },
  {
    id: 'concordia-map2',
    gameId: 'concordia',
    name: '康考迪娅：地图扩2',
    nameEn: 'Concordia: Map Expansion 2 - Britain & mare Nostrum',
    shortDesc: '新增Britannia和Mare Nostrum两张地图',
    description: '跨越海洋！新增Britannia（大不列颠岛）和Mare Nostrum（地中海）两张地图，带来完全不同的地理布局和路线挑战。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Concordia_board_game.jpg/220px-Concordia_board_game.jpg',
    playerCount: '2-5人（基础2-5人不变）',
    setup: [
      {
        playerCount: '2-5人',
        steps: [
          '选择Britannia或Mare Nostrum地图',
          '地图有不同的省份和城市配置',
          '部分地图有岛屿需要特殊航行路线'
        ]
      }
    ],
    tips: [
      'Britannia有多个岛屿，需要航行',
      'Mare Nostrum跨越更广的地域',
      '不同地图适合不同人数'
    ]
  },
  {
    id: 'himeji-tea',
    gameId: 'himeji-castle',
    name: '姬路城茶道扩',
    nameEn: 'Himeji Castle: Tea Ceremony Expansion',
    shortDesc: '新增茶道系统，提供新的得分方式和互动',
    description: '品味日本茶道文化！引入茶道系统，玩家可以通过举办茶会获得额外资源和分数，增加游戏互动和策略深度。',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Himeji_Castle_02.jpg/220px-Himeji_Castle_02.jpg',
    playerCount: '2-4人（基础2-4人不变）',
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '放置茶道版图在旁边',
          '每位玩家获得茶道token',
          '准备茶道卡牌',
          '翻开起始茶道卡'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '举办茶会：消耗资源邀请其他玩家',
          '品茶：获得资源和分数',
          '收集茶道具：用于特殊行动'
        ]
      }
    },
    scoring: {
      additions: {
        duringGame: [
          '成功举办茶会获得即时分数',
          '茶道组合完成获得额外奖励'
        ],
        endGame: [
          '茶道具收集完整性分数',
          '茶道成就额外分数'
        ]
      }
    },
    tips: [
      '茶会是社交互动的好机会',
      '茶道组合需要提前规划',
      '茶道具是稀缺资源'
    ]
  },
  {
    id: 'troyes-ladies',
    gameId: 'troyes',
    name: '特鲁瓦女士扩',
    nameEn: 'Troyes: Ladies Expansion',
    shortDesc: '新增女士角色卡，提供独特的能力和策略选择',
    description: '引入历史人物！新增多位特鲁瓦历史上的著名女士角色卡，每位女士都有独特的能力和终局计分效果，丰富游戏策略。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Troyes_board_game.jpg/220px-Troyes_board_game.jpg',
    playerCount: '2-4人（基础2-4人不变）',
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '每位玩家额外获得1张女士角色卡',
          '女士卡提供起始特殊能力',
          '设置女士卡终局计分轨道'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '激活女士卡的特殊能力',
          '女士能力可能影响骰子使用',
          '利用女士能力获得竞争优势'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '女士角色卡的终局计分',
          '女士能力使用效率奖励'
        ]
      }
    },
    tips: [
      '女士卡改变游戏中期策略',
      '不同女士适合不同打法',
      '女士能力与建筑配合很重要'
    ]
  },
  {
    id: 'wyrmspan-exp1',
    gameId: 'wyrmspan',
    name: '龙翼翱翔：扩展1',
    nameEn: 'Wyrmspan: Expansion',
    shortDesc: '新增更多龙牌、巢穴卡和森林版图',
    description: '扩展龙的世界！新增更多龙牌种类、新的巢穴卡和森林版图，为游戏带来更多龙类选择和策略变数。',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Wingspan_board_game.jpg/220px-Wingspan_board_game.jpg',
    playerCount: '1-5人（基础1-5人不变）',
    setup: [
      {
        playerCount: '1-5人',
        steps: [
          '添加新森林版图到游戏区',
          '混入新的龙牌到展示区',
          '新巢穴卡加入牌堆',
          '部分新龙有独特能力'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '新龙牌提供更多引擎选择',
          '新巢穴卡有独特效果',
          '新森林版图改变资源分布'
        ]
      }
    },
    tips: [
      '新龙牌增加了引擎构筑选项',
      '新森林版图需要调整策略',
      '巢穴卡组合更加丰富'
    ]
  },
  {
    id: 'lh-inns-cathedrals',
    gameId: 'le-havre',
    name: '港都情浓：旅馆与大教堂',
    nameEn: 'Le Havre: Inns & Cathedrals',
    shortDesc: '新增旅馆和大教堂建筑，提供更多得分途径',
    description: '扩展港都情浓的世界！新增旅馆和大教堂两种特殊建筑，为玩家提供更多得分途径和策略选择。旅馆可以接待旅客获得收入，大教堂则是终局计分的重要来源。',
    image: '/images/le-havre.jpg',
    playerCount: '1-5人（基础1-5人不变）',
    setup: [
      {
        playerCount: '1-5人',
        steps: [
          '将旅馆和大教堂建筑token加入供应区',
          '新增旅客token放入袋中',
          '设置旅馆接待轨道',
          '大教堂建造需要特定资源组合'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '建造旅馆：消耗资源建造，可接待旅客',
          '建造大教堂：消耗大量资源，终局高分',
          '接待旅客：获得即时收入和分数'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '旅馆接待旅客数量分数',
          '大教堂建造完成奖励',
          '旅客满意度额外分数'
        ]
      }
    },
    tips: [
      '旅馆是中期重要的收入来源',
      '大教堂需要提前规划资源',
      '旅客token数量有限，竞争激烈'
    ]
  },
  {
    id: 'carcassonne-exp1',
    gameId: 'carcassonne',
    name: '卡卡颂：旅馆与大教堂',
    nameEn: 'Carcassonne: Inns & Cathedrals',
    shortDesc: '新增旅馆和大教堂板块，以及大 Follower',
    description: '经典扩展！新增旅馆（道路得分翻倍）和大教堂（城市得分翻倍）特殊板块，以及大 Follower（计为2个 Follower）。增加策略深度和互动。',
    image: '/images/carcassonne.jpg',
    playerCount: '2-6人（基础2-5人扩展到6人）',
    setup: [
      {
        playerCount: '2-6人',
        steps: [
          '将扩展板块混入基础板块堆',
          '每位玩家获得1个大 Follower（计为2个）',
          '旅馆板块：道路完成时得分翻倍',
          '大教堂板块：城市完成时得分翻倍'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '使用大 Follower：放置在关键位置，计为2个',
          '完成旅馆道路：道路得分翻倍',
          '完成大教堂城市：城市得分翻倍'
        ]
      }
    },
    scoring: {
      additions: {
        duringGame: [
          '旅馆道路完成：每条道路得分翻倍',
          '大教堂城市完成：每个城市得分翻倍'
        ]
      }
    },
    tips: [
      '大 Follower是强力资源，谨慎使用',
      '旅馆和大教堂是必争之地',
      '扩展支持6人游戏'
    ]
  },
  {
    id: 'carcassonne-traders',
    gameId: 'carcassonne',
    name: '卡卡颂：商人与建筑师',
    nameEn: 'Carcassonne: Traders & Builders',
    shortDesc: '新增商品token和建筑师 Follower',
    description: '引入经济系统！城市中出现葡萄酒、布料和小麦商品token，完成城市的玩家收集商品。建筑师 Follower可以额外放置板块。',
    image: '/images/carcassonne.jpg',
    playerCount: '2-6人',
    setup: [
      {
        playerCount: '2-6人',
        steps: [
          '将商品token（葡萄酒、布料、小麦）放入袋中',
          '每位玩家获得1个建筑师 Follower',
          '城市板块上放置商品token',
          '完成城市时收集商品'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '使用建筑师：可以在已放置 Follower 的板块旁再放置',
          '收集商品：完成城市时获得商品token',
          '商品组合：收集全套商品获得额外分数'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '商品收集：每种商品最高分',
          '全套商品奖励：10分',
          '建筑师使用效率奖励'
        ]
      }
    },
    tips: [
      '商品token数量有限，尽早收集',
      '建筑师可以加速城市完成',
      '注意平衡得分和商品收集'
    ]
  },
  {
    id: 'ttr-europe-1912',
    gameId: 'ticket-to-ride-europe',
    name: '铁路环游欧洲：1912',
    nameEn: 'Ticket to Ride: Europe - 1912',
    shortDesc: '新增目的地卡、仓库和大型欧洲地图',
    description: '扩展欧洲铁路网络！新增1912年大型欧洲地图、仓库机制和更多目的地卡。仓库允许玩家共享路线，增加互动和策略。',
    image: '/images/ticket-to-ride-europe.jpg',
    playerCount: '2-5人（基础2-5人不变）',
    setup: [
      {
        playerCount: '2-5人',
        steps: [
          '使用1912年大型欧洲地图（替换基础地图）',
          '放置仓库token到指定城市',
          '新增目的地卡混入牌堆',
          '仓库规则：连接到仓库可获得额外分数'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '连接仓库：路线连接到仓库城市获得额外分数',
          '使用新目的地卡：更长更复杂的路线',
          '大型地图：更多路线选择'
        ]
      }
    },
    scoring: {
      additions: {
        duringGame: [
          '仓库连接奖励：每次连接获得2分',
          '新目的地卡：更长路线更高分数'
        ],
        endGame: [
          '仓库网络完整性奖励',
          '未完成新目的地卡惩罚：-5分'
        ]
      }
    },
    tips: [
      '仓库是必争之地，尽早连接',
      '新目的地卡更长但分数更高',
      '大型地图需要更长远规划'
    ]
  },
  {
    id: 'ttr-europe-orient',
    gameId: 'ticket-to-ride-europe',
    name: '铁路环游欧洲：东方之旅',
    nameEn: 'Ticket to Ride: Europe - Orient Express',
    shortDesc: '新增东方快车路线和豪华车厢机制',
    description: '乘坐东方快车！新增东方快车特殊路线和豪华车厢机制。豪华车厢提供额外能力，如免费建造、额外抽卡等。',
    image: '/images/ticket-to-ride-europe.jpg',
    playerCount: '2-5人',
    setup: [
      {
        playerCount: '2-5人',
        steps: [
          '放置东方快车路线到地图上',
          '每位玩家获得豪华车厢token',
          '东方快车路线需要特定颜色组合',
          '豪华车厢能力卡洗混放置'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '建造东方快车路线：获得额外分数',
          '使用豪华车厢：获得特殊能力',
          '豪华车厢能力：免费建造、额外抽卡等'
        ]
      }
    },
    scoring: {
      additions: {
        duringGame: [
          '东方快车路线：完成获得5分',
          '豪华车厢使用：每次使用获得1分'
        ],
        endGame: [
          '东方快车网络奖励',
          '豪华车厢剩余奖励'
        ]
      }
    },
    tips: [
      '东方快车路线竞争激烈',
      '豪华车厢能力要适时使用',
      '平衡东方快车和其他路线'
    ]
  },
  {
    id: 'afe-norway',
    gameId: 'a-feast-for-odin',
    name: '奥丁的盛宴：挪威传奇',
    nameEn: 'A Feast for Odin: The Norwegians',
    shortDesc: '新增挪威地图、长屋和传奇卡',
    description: '探索挪威！新增挪威地图、长屋建造机制和传奇卡。长屋提供新的得分方式，传奇卡带来独特能力。',
    image: '/images/a-feast-for-odin.jpg',
    playerCount: '1-4人（基础1-4人不变）',
    setup: [
      {
        playerCount: '1-4人',
        steps: [
          '使用挪威地图（替换或并置）',
          '放置长屋建造区域',
          '传奇卡洗混放置',
          '长屋需要特定资源组合建造'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '建造长屋：消耗资源，提供持续收益',
          '使用传奇卡：获得独特能力',
          '挪威地图：新的探索区域'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '长屋完成奖励',
          '传奇卡使用奖励',
          '挪威区域探索奖励'
        ]
      }
    },
    tips: [
      '长屋是长期投资，尽早建造',
      '传奇卡能力要充分利用',
      '挪威地图与基础地图策略不同'
    ]
  },
  {
    id: 'afe-mini',
    gameId: 'a-feast-for-odin',
    name: '奥丁的盛宴：迷你扩展',
    nameEn: 'A Feast for Odin: Mini Expansion',
    shortDesc: '新增小型岛屿和特殊行动卡',
    description: '小幅扩展！新增小型岛屿板块和特殊行动卡，为游戏增加更多变数和策略选择。',
    image: '/images/a-feast-for-odin.jpg',
    playerCount: '1-4人',
    setup: [
      {
        playerCount: '1-4人',
        steps: [
          '添加小型岛屿到探索区域',
          '特殊行动卡洗混放置',
          '岛屿提供独特资源'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '探索岛屿：获得独特资源',
          '使用特殊行动卡：额外行动'
        ]
      }
    },
    tips: [
      '岛屿资源稀缺但价值高',
      '特殊行动卡要把握时机'
    ]
  },
  {
    id: 'ttr-usa-1910',
    gameId: 'ticket-to-ride',
    name: '铁路环游：1910',
    nameEn: 'Ticket to Ride: USA 1910',
    shortDesc: '新增1910年地图、新目的地卡和大型游戏模式',
    description: '经典扩展！新增1910年地图、更多目的地卡和大型游戏模式（Megalopolis）。大型游戏模式使用全地图，适合5人游戏。',
    image: '/images/ticket-to-ride.jpg',
    playerCount: '2-5人（基础2-5人不变）',
    setup: [
      {
        playerCount: '2-5人',
        steps: [
          '使用1910年地图（替换基础地图）',
          '新增目的地卡混入牌堆',
          '大型游戏模式：使用全地图',
          '新目的地卡更长更复杂'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '新目的地卡：更长路线更高分数',
          '大型游戏模式：更多路线选择',
          '1910年地图：新城市和新路线'
        ]
      }
    },
    scoring: {
      additions: {
        duringGame: [
          '新目的地卡：完成获得更高分数',
          '大型游戏模式：最长路线奖励增加'
        ],
        endGame: [
          '未完成新目的地卡惩罚：-5分',
          '大型游戏模式特殊奖励'
        ]
      }
    },
    tips: [
      '新目的地卡更长但分数更高',
      '大型游戏模式适合5人',
      '1910年地图策略与基础不同'
    ]
  },
  {
    id: 'ttr-usa-big-cities',
    gameId: 'ticket-to-ride',
    name: '铁路环游：大城市',
    nameEn: 'Ticket to Ride: Big Cities',
    shortDesc: '聚焦大城市之间的路线，新增大城市卡',
    description: '大城市之间的铁路战争！新增大城市卡，聚焦主要城市之间的路线。大城市之间路线分数更高，但竞争更激烈。',
    image: '/images/ticket-to-ride.jpg',
    playerCount: '2-5人',
    setup: [
      {
        playerCount: '2-5人',
        steps: [
          '放置大城市标记到地图',
          '大城市卡洗混放置',
          '大城市之间路线分数翻倍'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '完成大城市路线：分数翻倍',
          '收集大城市卡：获得额外奖励'
        ]
      }
    },
    scoring: {
      additions: {
        duringGame: [
          '大城市路线：分数翻倍',
          '大城市卡收集：组合奖励'
        ]
      }
    },
    tips: [
      '大城市路线竞争激烈',
      '提前规划大城市连接',
      '平衡大城市和小城市路线'
    ]
  },
  {
    id: 'com-dark-mountain',
    gameId: 'champions-of-midgard',
    name: '维京传奇：黑暗山脉',
    nameEn: 'Champions of Midgard: The Dark Mountains',
    shortDesc: '新增黑暗山脉地图、新怪物和符文系统',
    description: '征服黑暗山脉！新增黑暗山脉地图、新怪物类型和符文系统。符文提供特殊能力，新怪物更加强大。',
    image: '/images/champions-of-midgard.jpg',
    playerCount: '2-4人（基础2-4人不变）',
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '放置黑暗山脉版图',
          '新怪物token放入袋中',
          '符文卡洗混放置',
          '符文提供特殊能力'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '探索黑暗山脉：遭遇新怪物',
          '使用符文：获得特殊能力',
          '新怪物：更强大但奖励更高'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '黑暗山脉探索奖励',
          '符文收集奖励',
          '新怪物击败奖励'
        ]
      }
    },
    tips: [
      '黑暗山脉怪物更强大',
      '符文能力要充分利用',
      '新怪物奖励丰厚但风险高'
    ]
  },
  {
    id: 'com-valhalla',
    gameId: 'champions-of-midgard',
    name: '维京传奇：瓦尔哈拉',
    nameEn: 'Champions of Midgard: Valhalla',
    shortDesc: '新增瓦尔哈拉机制、英灵战士和荣耀系统',
    description: '为荣耀而战！新增瓦尔哈拉机制，阵亡的维京战士进入瓦尔哈拉，成为英灵战士提供持续收益。荣耀系统记录玩家的英勇事迹。',
    image: '/images/champions-of-midgard.jpg',
    playerCount: '2-4人',
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '放置瓦尔哈拉版图',
          '英灵战士token放置',
          '荣耀卡洗混放置',
          '阵亡战士进入瓦尔哈拉'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '派遣战士：阵亡后进入瓦尔哈拉',
          '英灵战士：提供持续收益',
          '荣耀卡：记录英勇事迹'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '瓦尔哈拉英灵数量奖励',
          '荣耀卡完成奖励',
          '英勇事迹额外分数'
        ]
      }
    },
    tips: [
      '阵亡不一定是坏事',
      '英灵战士是长期收益',
      '荣耀卡要完成'
    ]
  },
  {
    id: 'eclipse-rise-ancients',
    gameId: 'eclipse',
    name: '星蚀：远古崛起',
    nameEn: 'Eclipse: Rise of the Ancients',
    shortDesc: '新增远古种族、新科技和星云版图',
    description: '远古种族觉醒！新增多个远古种族、新科技树和星云版图。远古种族拥有独特能力，星云版图增加探索维度。',
    image: '/images/eclipse.jpg',
    playerCount: '2-9人（基础2-6人扩展到9人）',
    setup: [
      {
        playerCount: '2-9人',
        steps: [
          '选择远古种族（替换基础种族）',
          '使用星云版图（替换或并置）',
          '新科技卡加入科技树',
          '远古种族有独特能力'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '远古种族能力：每回合可使用',
          '星云探索：新区域新资源',
          '新科技：更强大的效果'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '远古种族特殊奖励',
          '星云控制区域奖励',
          '新科技研发奖励'
        ]
      }
    },
    tips: [
      '远古种族能力强大但要善用',
      '星云版图增加探索维度',
      '扩展支持9人游戏'
    ]
  },
  {
    id: 'eclipse-shadow-empire',
    gameId: 'eclipse',
    name: '星蚀：暗影帝国',
    nameEn: 'Eclipse: Shadow of the Rift',
    shortDesc: '新增暗影种族、裂隙机制和外交系统',
    description: '暗影降临！新增暗影种族、裂隙机制和外交系统。裂隙连接不同区域，外交系统允许玩家结盟或背叛。',
    image: '/images/eclipse.jpg',
    playerCount: '2-9人',
    setup: [
      {
        playerCount: '2-9人',
        steps: [
          '放置裂隙token到版图',
          '外交卡洗混放置',
          '暗影种族选择',
          '裂隙连接不同区域'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '穿越裂隙：快速移动单位',
          '外交行动：结盟或背叛',
          '暗影能力：独特且强大'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '裂隙控制奖励',
          '外交关系奖励',
          '暗影种族特殊奖励'
        ]
      }
    },
    tips: [
      '裂隙是战略要地',
      '外交关系要谨慎维护',
      '暗影种族能力独特'
    ]
  },
  {
    id: 'is-aztecs',
    gameId: 'imperial-settlers',
    name: '帝国建筑师：阿兹特克',
    nameEn: 'Imperial Settlers: Aztecs',
    shortDesc: '新增阿兹特克文明、金字塔和祭祀机制',
    description: '阿兹特克文明加入！新增阿兹特克文明、金字塔建造和祭祀机制。金字塔提供持续收益，祭祀可以获得神恩。',
    image: '/images/imperial-settlers.jpg',
    playerCount: '1-4人（基础1-4人不变）',
    setup: [
      {
        playerCount: '1-4人',
        steps: [
          '选择阿兹特克文明（替换或新增）',
          '金字塔建造区域放置',
          '祭祀卡洗混放置',
          '神恩token放置'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '建造金字塔：消耗资源，提供持续收益',
          '祭祀：消耗资源获得神恩',
          '神恩：特殊能力或资源'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '金字塔完成奖励',
          '神恩收集奖励',
          '祭祀次数奖励'
        ]
      }
    },
    tips: [
      '金字塔是长期投资',
      '祭祀要把握时机',
      '神恩能力要充分利用'
    ]
  },
  {
    id: 'is-mayans',
    gameId: 'imperial-settlers',
    name: '帝国建筑师：玛雅',
    nameEn: 'Imperial Settlers: Mayans',
    shortDesc: '新增玛雅文明、历法和天文台机制',
    description: '玛雅文明加入！新增玛雅文明、历法系统和天文台机制。历法提供周期性奖励，天文台可以预测未来。',
    image: '/images/imperial-settlers.jpg',
    playerCount: '1-4人',
    setup: [
      {
        playerCount: '1-4人',
        steps: [
          '选择玛雅文明',
          '历法轨道放置',
          '天文台建造区域',
          '预言卡洗混放置'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '推进历法：获得周期性奖励',
          '建造天文台：预测未来事件',
          '使用预言：提前准备'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '历法推进奖励',
          '天文台完成奖励',
          '预言准确奖励'
        ]
      }
    },
    tips: [
      '历法奖励周期性出现',
      '天文台预测要准确',
      '预言要提前准备'
    ]
  },
  {
    id: 'si-branch-claw',
    gameId: 'spirit-island',
    name: '灵迹岛：分支与利爪',
    nameEn: 'Spirit Island: Branch & Claw',
    shortDesc: '新增事件卡、危险地形和野兽token',
    description: '自然之力增强！新增事件卡带来随机事件，危险地形增加挑战，野兽token可以协助灵体战斗。',
    image: '/images/spirit-island.jpg',
    playerCount: '1-4人（基础1-4人不变）',
    setup: [
      {
        playerCount: '1-4人',
        steps: [
          '事件卡洗混放置',
          '危险地形token放置',
          '野兽token放入袋中',
          '事件卡每回合触发'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '处理事件：随机事件影响游戏',
          '利用危险地形：策略性放置',
          '召唤野兽：协助战斗'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '事件处理奖励',
          '野兽协助奖励',
          '危险地形利用奖励'
        ]
      }
    },
    tips: [
      '事件卡带来不确定性',
      '危险地形可以策略利用',
      '野兽是强力盟友'
    ]
  },
  {
    id: 'si-jagged-earth',
    gameId: 'spirit-island',
    name: '灵迹岛：锯齿大地',
    nameEn: 'Spirit Island: Jagged Earth',
    shortDesc: '新增10个灵体、新岛屿和更复杂的机制',
    description: '灵体大军扩充！新增10个全新灵体、新岛屿版图和更复杂的游戏机制。新灵体拥有独特能力，新岛屿带来更多挑战。',
    image: '/images/spirit-island.jpg',
    playerCount: '1-6人（基础1-4人扩展到6人）',
    setup: [
      {
        playerCount: '1-6人',
        steps: [
          '选择新灵体（共10个新灵体）',
          '使用新岛屿版图',
          '新机制token放置',
          '扩展支持6人游戏'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '新灵体能力：独特且强大',
          '新岛屿机制：更复杂的互动',
          '新策略：更多选择'
        ]
      }
    },
    scoring: {
      additions: {
        endGame: [
          '新灵体特殊奖励',
          '新岛屿探索奖励',
          '新机制掌握奖励'
        ]
      }
    },
    tips: [
      '新灵体能力独特',
      '新岛屿挑战更大',
      '扩展支持6人游戏'
    ]
  },
  {
    id: 'lorenzo-houses',
    gameId: 'lorenzo-il-magnifico',
    name: '家族豪宅',
    nameEn: 'Houses of Renaissance',
    shortDesc: '新增家族豪宅板块和5张新领袖卡，增加更多策略选择',
    description: '《家族豪宅》扩展为《文艺复兴的贵族们》增加了全新的家族豪宅板块系统。玩家现在可以建造和升级家族豪宅，获得独特的持续能力和终局计分。扩展还包含5张全新领袖卡，每位领袖都有独特的能力组合，大大增加了游戏的重玩价值。',
    image: '/images/lorenzo-houses.jpg',
    playerCount: '2-4人（基础2-4人不变）',
    setup: [
      {
        playerCount: '2-4人',
        steps: [
          '将家族豪宅板块放在游戏板旁',
          '每位玩家获得1个家族豪宅标记',
          '将新领袖卡与基础领袖卡混合',
          '翻开新的家族豪宅奖励卡',
          '其他设置与基础游戏相同'
        ]
      }
    ],
    turnActions: {
      additions: {
        onYourTurn: [
          '建造豪宅：支付资源建造家族豪宅获得持续能力',
          '升级豪宅：支付更多资源升级豪宅获得更强能力',
          '新领袖能力：5张新领袖卡提供独特策略路线'
        ]
      }
    },
    scoring: {
      additions: {
        duringGame: [
          '建造豪宅获得即时分数',
          '升级豪宅获得额外分数'
        ],
        endGame: [
          '家族豪宅等级提供终局分数',
          '完成的豪宅奖励卡提供额外分数'
        ]
      }
    },
    tips: [
      '家族豪宅提供持续资源产出',
      '升级豪宅需要大量资源',
      '新领袖卡能力更加多样化',
      '扩展增加约15-20分钟游戏时长'
    ]
  }
]
