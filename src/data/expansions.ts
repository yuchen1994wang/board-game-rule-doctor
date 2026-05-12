import type { Expansion } from '@/types/game'

export const expansions: Expansion[] = [
  {
    id: 'evolution-flight',
    gameId: 'evolution',
    name: '飞行扩展',
    shortDesc: '新增鸟类物种面板和飞行特性卡，物种可以迁徙和俯冲攻击',
    description: '引入空中维度！飞行物种可以迁徙到新的栖息地，俯冲攻击地面猎物，大大增加策略深度和游戏互动。鸟类物种面板让你的生态系统更加丰富。',
    image: 'https://cf.geekdo-images.com/8BiGFc6Vck9X7T7RkRVRlQ__imagepage/img/8BiGFc6Vck9X7T7RkRVRlQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2428179.jpg',
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
    image: 'https://cf.geekdo-images.com/8BiGFc6Vck9X7T7RkRVRlQ__imagepage/img/8BiGFc6Vck9X7T7RkRVRlQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2428179.jpg',
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
    image: 'https://cf.geekdo-images.com/qrPLpAnbZdQKHGk7z8WTFQ__imagepage/img/qrPLpAnbZdQKHGk7z8WTFQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2869714.jpg',
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
    image: 'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/yLZJCVLlIx4c7eJEWUNJ7w=/fit-in/900x600/filters:no_upscale():strip_icc()/pic107809.jpg',
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
    image: 'https://cf.geekdo-images.com/wg3oJD9DIR97F_SG4lzK4g__imagepage/img/wg3oJD9DIR97F_SG4lzK4g=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3538336.jpg',
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
    image: 'https://cf.geekdo-images.com/wg3oJD9DIR97F_SG4lzK4g__imagepage/img/wg3oJD9DIR97F_SG4lzK4g=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3538336.jpg',
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
    image: 'https://cf.geekdo-images.com/WZbd7ej5AI4Rxy9ZLOqPHA__imagepage/img/WZbd7ej5AI4Rxy9ZLOqPHA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3516896.jpg',
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
    image: 'https://cf.geekdo-images.com/WZbd7ej5AI4Rxy9ZLOqPHA__imagepage/img/WZbd7ej5AI4Rxy9ZLOqPHA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3516896.jpg',
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
    image: 'https://cf.geekdo-images.com/5CFwjd8zTcGYVUnkXh04pQ__imagepage/img/kX0J0Ie7Q-uwVbq_Y0x6C7ZF1ts=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1176894.jpg',
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
    image: 'https://cf.geekdo-images.com/5CFwjd8zTcGYVUnkXh04pQ__imagepage/img/kX0J0Ie7Q-uwVbq_Y0x6C7ZF1ts=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1176894.jpg',
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
    image: 'https://cf.geekdo-images.com/sy_6ZeMt4a_pxjpEXJHY_Q__imagepage/img/sy_6ZeMt4a_pxjpEXJHY_Q=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1612412.jpg',
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
    image: 'https://cf.geekdo-images.com/sy_6ZeMt4a_pxjpEXJHY_Q__imagepage/img/sy_6ZeMt4a_pxjpEXJHY_Q=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1612412.jpg',
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
    image: 'https://cf.geekdo-images.com/sbSNGErq9D4rFwB-qcp7JQ__imagepage/img/sbSNGErq9D4rFwB-qcp7JQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2278130.jpg',
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
    image: 'https://cf.geekdo-images.com/PY5MMt6X6a39RCqV_CV8Qw__imagepage/img/PY5MMt6X6a39RCqV_CV8Qw=/fit-in/900x600/filters:no_upscale():strip_icc()/pic819625.jpg',
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
    image: 'https://cf.geekdo-images.com/7oDJ1QVM5rjIOS_a1bY5Lg__imagepage/img/7oDJ1QVM5rjIOS_a1bY5Lg=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7309045.jpg',
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
  }
]
