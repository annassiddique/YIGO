export interface Project {
  slug: string;
  title: string;
  titleZh: string;
  coverImage: string;
  description: string;
  descriptionZh: string;
  fullDescription: string;
  fullDescriptionZh: string;
  images: string[];
  floorPlans?: string[];
  category: string;
  year: number;
  keyFeatures?: string[];
  keyFeaturesZh?: string[];
  amenities?: string[];
  amenitiesZh?: string[];
  highlights?: {
    totalArea: string;
    totalAreaZh: string;
    totalAreaTitle: string;
    totalAreaTitleZh: string;
    units: string;
    unitsTitle: string;
    unitsTitleZh: string;
    towers: string;
    towersZh: string;
    towersTitle: string;
    towersTitleZh: string;
    commercialTowers: string;
    commercialTowersZh: string;
    commercialTowersTitle: string;
    commercialTowersTitleZh: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'beihu-splendor-residence',
    title: 'Beihu Splendor Residence',
    titleZh: '北湖蒂景',
    coverImage: '/images/projects/beihu-splendor-residence/cover.webp',
    description: 'Rising in the heart of a vibrant urban landscape, Beihu Splendor Residence is more than just a place to live — it is a destination that redefines community living. Designed as a large-scale urban complex, it blends modern architectural elegance with natural serenity, offering residents a home that is both inspiring and practical. With its thoughtful integration of residential, commercial, and leisure spaces, the project envisions a self-sustaining environment where life, work, and recreation coexist seamlessly.',
    descriptionZh: '矗立于充满活力的城市中心，北湖蒂景不仅是居所，更是重新定义社区生活的目的地。作为大型城市综合体设计，它将现代建筑之美与自然静谧完美融合，为居民提供兼具启发性与实用性的理想家园。项目精心整合住宅、商业与休闲空间，打造自给自足的生活环境，让工作、生活与娱乐无缝衔接。',
    fullDescription: 'Rising in the heart of a vibrant urban landscape, Beihu Splendor Residence is more than just a place to live — it is a destination that redefines community living. Designed as a large-scale urban complex, it blends modern architectural elegance with natural serenity, offering residents a home that is both inspiring and practical. With its thoughtful integration of residential, commercial, and leisure spaces, the project envisions a self-sustaining environment where life, work, and recreation coexist seamlessly. The master plan brings together 40 high-rise residential towers and two commercial buildings, complemented by expansive lifestyle and retail zones. Spanning thousands of square meters, the development offers 6,611 thoughtfully designed residential units, each crafted to meet the needs of modern families and professionals. At its core lies Beihu Park, a lush green escape that anchors the community, while a large shopping mall, office buildings, and state-of-the-art facilities create a world-class destination. Residents will discover a neighborhood alive with opportunities. Beihu Park invites calm walks and outdoor activities, while the shopping mall delivers global brands, dining, and entertainment. Office spaces foster a hub for professionals, making the development as much a workplace as it is a retreat. Together, these elements create a lifestyle where convenience, culture, and comfort intersect, ensuring that every day at Beihu Splendor Residence feels complete.',
    fullDescriptionZh: '矗立于充满活力的城市中心，北湖蒂景不仅是居所，更是重新定义社区生活的目的地。作为大型城市综合体设计，它将现代建筑之美与自然静谧完美融合，为居民提供兼具启发性与实用性的理想家园。项目精心整合住宅、商业与休闲空间，打造自给自足的生活环境，让工作、生活与娱乐无缝衔接。总体规划汇聚 40 栋高层住宅楼和 2 栋商业建筑，并辅以宽阔的生活与零售区。开发面积覆盖数千平方米，共提供 6,611 套精心设计的住宅单元，充分满足现代家庭与专业人士的居住需求。项目核心是北湖公园，这片绿意盎然的空间成为社区的心脏；同时，大型购物中心、写字楼及先进设施构成了世界级的生活目的地。居民将在充满活力的社区中尽享多样生活。北湖公园提供宁静的散步与户外活动空间；购物中心汇聚国际品牌、美食及娱乐体验。写字楼为专业人士打造工作枢纽，使整个开发区既是居所，也可作为职场和休闲圣地。这些元素共同营造出便利、文化与舒适交融的生活方式，确保北湖璟宸府的每一天都完整而充实。',
    images: [
      '/images/projects/beihu-splendor-residence/cover.webp',
      '/images/projects/beihu-splendor-residence/image-1.jpg',
      '/images/projects/beihu-splendor-residence/image-2.jpg',
      '/images/projects/beihu-splendor-residence/image-3.jpg',
      '/images/projects/beihu-splendor-residence/image-4.jpg',
      '/images/projects/beihu-splendor-residence/image-5.jpg'
    ],
    category: 'Residential',
    year: 2024,
    keyFeatures: [
      'The master plan brings together 40 high-rise residential towers and two commercial buildings, complemented by expansive lifestyle and retail zones.',
      'Spanning thousands of square meters, the development offers 6,611 thoughtfully designed residential units, each crafted to meet the needs of modern families and professionals.',
      'At its core lies Beihu Park, a lush green escape that anchors the community, while a large shopping mall, office buildings, and state-of-the-art facilities create a world-class destination.'
    ],
    keyFeaturesZh: [
      '总体规划汇聚 40 栋高层住宅楼和 2 栋商业建筑，并辅以宽阔的生活与零售区。',
      '开发面积覆盖数千平方米，共提供 6,611 套精心设计的住宅单元，充分满足现代家庭与专业人士的居住需求。',
      '项目核心是北湖公园，这片绿意盎然的空间成为社区的心脏；同时，大型购物中心、写字楼及先进设施构成了世界级的生活目的地。'
    ],
    amenities: [
      'Residents will discover a neighborhood alive with opportunities.',
      'Beihu Park invites calm walks and outdoor activities, while the shopping mall delivers global brands, dining, and entertainment.',
      'Office spaces foster a hub for professionals, making the development as much a workplace as it is a retreat.',
      'Together, these elements create a lifestyle where convenience, culture, and comfort intersect, ensuring that every day at Beihu Splendor Residence feels complete.'
    ],
    amenitiesZh: [
      '居民将在充满活力的社区中尽享多样生活。',
      '北湖公园提供宁静的散步与户外活动空间；购物中心汇聚国际品牌、美食及娱乐体验。',
      '写字楼为专业人士打造工作枢纽，使整个开发区既是居所，也可作为职场和休闲圣地。',
      '这些元素共同营造出便利、文化与舒适交融的生活方式，确保北湖璟宸府的每一天都完整而充实。'
    ],
    highlights: {
      totalArea: '',
      totalAreaZh: '',
      totalAreaTitle: '',
      totalAreaTitleZh: '',
      units: '6,611',
      unitsTitle: 'Units',
      unitsTitleZh: '住宅单元',
      towers: '42',
      towersZh: '42 栋',
      towersTitle: 'High-Rise Towers',
      towersTitleZh: '住宅楼',
      commercialTowers: '2',
      commercialTowersZh: '2 栋',
      commercialTowersTitle: 'Commercial Towers',
      commercialTowersTitleZh: '商业楼'
    }
  },
  {
    slug: 'donghu-international-hotel',
    title: 'Donghu International Hotel',
    titleZh: '东湖国际酒店',
    coverImage: '/images/projects/donghu-international-hotel/cover.webp',
    description: 'Donghu International Hotel is envisioned as a luxurious retreat that combines hospitality, residential comfort, and modern amenities in one landmark address. Designed to attract both global travelers and long-term residents, it captures the essence of elegant living.',
    descriptionZh: '东湖国际酒店被定位为集酒店服务、住宅舒适与现代配套于一体的标志性项目。旨在吸引全球旅客及长期居住者，完美呈现优雅生活的精髓。',
    fullDescription: 'Donghu International Hotel is envisioned as a luxurious retreat that combines hospitality, residential comfort, and modern amenities in one landmark address. Designed to attract both global travelers and long-term residents, it captures the essence of elegant living. The development features a hotel tower, two residential buildings, and three villas, with a total construction area of 40,000 square meters. Offering approximately 300 units, the project integrates hospitality with lifestyle living, all adjacent to the scenic Donghu Park. Residents and guests can enjoy hotel-standard facilities, fitness centers, and recreational areas, with Donghu Park serving as the natural centerpiece. The combination of greenery, luxury, and convenience ensures a holistic experience of relaxation and sophistication.',
    fullDescriptionZh: '东湖国际酒店被定位为集酒店服务、住宅舒适与现代配套于一体的标志性项目。旨在吸引全球旅客及长期居住者，完美呈现优雅生活的精髓。项目由一栋酒店塔楼、两栋住宅楼及三栋别墅组成，总建筑面积约 40,000 平方米。提供约 300 个住宅单元，将酒店服务与生活方式居住融合，同时毗邻风景如画的东湖公园。居民与宾客可享受酒店级设施、健身中心及休闲娱乐空间，东湖公园成为自然核心景观。绿意、奢华与便利的结合，确保每一位居住者和宾客都能体验到全面的放松与高雅生活',
    images: [
      '/images/projects/donghu-international-hotel/cover.webp',
      '/images/projects/donghu-international-hotel/image-1.jpg',
      '/images/projects/donghu-international-hotel/image-2.jpg',
      '/images/projects/donghu-international-hotel/image-3.jpg'
    ],
    category: 'Hospitality',
    year: 2024,
    keyFeatures: [
      'The development features a hotel tower, two residential buildings, and three villas, with a total construction area of 40,000 square meters.',
      'Offering approximately 300 units, the project integrates hospitality with lifestyle living, all adjacent to the scenic Donghu Park.'
    ],
    keyFeaturesZh: [
      '项目由一栋酒店塔楼、两栋住宅楼及三栋别墅组成，总建筑面积约 40,000 平方米。',
      '提供约 300 个住宅单元，将酒店服务与生活方式居住融合，同时毗邻风景如画的东湖公园。'
    ],
    amenities: [
      'Residents and guests can enjoy hotel-standard facilities, fitness centers, and recreational areas, with Donghu Park serving as the natural centerpiece.',
      'The combination of greenery, luxury, and convenience ensures a holistic experience of relaxation and sophistication.'
    ],
    amenitiesZh: [
      '居民与宾客可享受酒店级设施、健身中心及休闲娱乐空间，东湖公园成为自然核心景观。',
      '绿意、奢华与便利的结合，确保每一位居住者和宾客都能体验到全面的放松与高雅生活'
    ],
    highlights: {
      totalArea: '40,000 m²',
      totalAreaZh: '40,000 平方米',
      totalAreaTitle: 'Total Area',
      totalAreaTitleZh: '总建筑面积',
      units: '300',
      unitsTitle: 'Units',
      unitsTitleZh: '住宅单元',
      towers: '1',
      towersZh: '1 座',
      towersTitle: 'Hotel',
      towersTitleZh: '酒店',
      commercialTowers: '2',
      commercialTowersZh: '2 栋',
      commercialTowersTitle: 'Residential Towers',
      commercialTowersTitleZh: '住宅楼'
    }
  },
 
  {
    slug: 'mansion-court-hotel-apartment',
    title: 'Mansion Court Hotel Apartment',
    titleZh: '漫庭·公寓(沙特项目）',
    coverImage: '/images/projects/mansion-court-hotel-apartment/cover.webp',
    description: 'The Mansion Court Hotel Apartment represents YIGO Development\'s international vision, bringing luxury and functionality to Saudi Arabia. Designed for both short and long-term stays, it combines the comfort of residences with the services of a hotel.',
    descriptionZh: '漫庭·公寓将奢华与实用性带入沙特阿拉伯。项目兼顾短期与长期居住需求，融合住宅的舒适与酒店的服务体验。',
    fullDescription: 'The Mansion Court Hotel Apartment represents YIGO Development\'s international vision, bringing luxury and functionality to Saudi Arabia. Designed for both short and long-term stays, it combines the comfort of residences with the services of a hotel. The project consists of a single landmark building with 60 units, each thoughtfully designed for residents and visitors. Spaces are planned with multi-functionality, ensuring adaptability for both living and hospitality purposes. Featuring a gym, multi-functional rooms, and dedicated kids\' play areas, the development caters to diverse lifestyle needs. Whether for business travelers or families, Mansion Court offers a complete environment where comfort and convenience converge.',
    fullDescriptionZh: '漫庭·公寓将奢华与实用性带入沙特阿拉伯。项目兼顾短期与长期居住需求，融合住宅的舒适与酒店的服务体验。项目由一栋地标性建筑组成，共 60 套单元，每套均经过精心设计，满足居民及访客的需求。空间规划多功能化，可灵活适应居住与酒店双重用途。配备健身中心、多功能活动室及专属儿童游乐区，满足多样化生活需求。无论是商务出行还是家庭居住，Mansion Court 都提供舒适便捷、功能完善的理想环境。',
    images: [
      '/images/projects/mansion-court-hotel-apartment/cover.webp',
      '/images/projects/mansion-court-hotel-apartment/image-1.jpg',
      '/images/projects/mansion-court-hotel-apartment/image-2.jpg'
    ],
    category: 'Hospitality',
    year: 2024,
    keyFeatures: [
      'The project consists of a single landmark building with 60 units, each thoughtfully designed for residents and visitors.',
      'Spaces are planned with multi-functionality, ensuring adaptability for both living and hospitality purposes.'
    ],
    keyFeaturesZh: [
      '项目由一栋地标性建筑组成，共 60 套单元，每套均经过精心设计，满足居民及访客的需求。',
      '空间规划多功能化，可灵活适应居住与酒店双重用途。'
    ],
    amenities: [
      'Featuring a gym, multi-functional rooms, and dedicated kids\' play areas, the development caters to diverse lifestyle needs.',
      'Whether for business travelers or families, Mansion Court offers a complete environment where comfort and convenience converge.'
    ],
    amenitiesZh: [
      '配备健身中心、多功能活动室及专属儿童游乐区，满足多样化生活需求。',
      '无论是商务出行还是家庭居住，Mansion Court 都提供舒适便捷、功能完善的理想环境。'
    ],
    highlights: {
      totalArea: '',
      totalAreaZh: '',
      totalAreaTitle: '',
      totalAreaTitleZh: '',
      units: '60',
      unitsTitle: 'Units',
      unitsTitleZh: '住宅单元',
      towers: '1',
      towersZh: '1 栋',
      towersTitle: 'Hotel Apartment Towers',
      towersTitleZh: '楼栋',
      commercialTowers: '',
      commercialTowersZh: '',
      commercialTowersTitle: '',
      commercialTowersTitleZh: ''
    }
  },
  {
    slug: 'moher-cloud-cape-villas',
    title: 'Moher Cloud Cape Villas',
    titleZh: '莫赫云岬别墅',
    coverImage: '/images/projects/moher-cloud-cape-villas/villa_cover.jpg',
    description: 'Moher Cloud Cape Villas is an exclusive collection of homes located in a premium residential district of Ireland. The project reflects YIGO Development\'s expansion into international markets with a focus on elegance, privacy, and lifestyle.',
    descriptionZh: '莫赫云岬别墅于爱尔兰优质住宅区，是 YIGO Development 拓展国际市场的力作，彰显优雅、私密与高品质生活理念。',
    fullDescription: 'Moher Cloud Cape Villas is an exclusive collection of homes located in a premium residential district of Ireland. The project reflects YIGO Development\'s expansion into international markets with a focus on elegance, privacy, and lifestyle. The development features 55 villa-style residences, each carefully positioned to capture breathtaking views and provide spacious living. With landscaped gardens, premium build quality, and contemporary design, the villas set a new benchmark for luxury living in Ireland. Residents will enjoy access to a members\' club, gym, multi-functional activity rooms, and gardens that blend natural beauty with modern amenities. The project offers not just homes, but a lifestyle rooted in comfort, exclusivity, and community.',
    fullDescriptionZh: '莫赫云岬别墅于爱尔兰优质住宅区，是 YIGO Development 拓展国际市场的力作，彰显优雅、私密与高品质生活理念。项目共规划 55 套别墅式住宅，每栋别墅均经过精心布局，以尽享壮丽景观并提供宽敞居住空间。配备景观花园、高品质建筑工艺及现代设计，别墅树立了爱尔兰豪华生活的新标杆。居民可使用会员俱乐部、健身中心、多功能活动室及景观花园，将自然之美与现代便利完美融合。项目不仅提供居所，更传递舒适、私享及社区感兼具的生活方式。',
    images: [
      '/images/projects/moher-cloud-cape-villas/villa_cover.jpg',
      '/images/projects/moher-cloud-cape-villas/image-1.jpg',
      '/images/projects/moher-cloud-cape-villas/image-2.jpg',
      '/images/projects/moher-cloud-cape-villas/image-3.jpg'
    ],
    category: 'Residential',
    year: 2024,
    keyFeatures: [
      'The development features 55 villa-style residences, each carefully positioned to capture breathtaking views and provide spacious living.',
      'With landscaped gardens, premium build quality, and contemporary design, the villas set a new benchmark for luxury living in Ireland.'
    ],
    keyFeaturesZh: [
      '项目共规划 55 套别墅式住宅，每栋别墅均经过精心布局，以尽享壮丽景观并提供宽敞居住空间。',
      '配备景观花园、高品质建筑工艺及现代设计，别墅树立了爱尔兰豪华生活的新标杆。'
    ],
    amenities: [
      'Residents will enjoy access to a members\' club, gym, multi-functional activity rooms, and gardens that blend natural beauty with modern amenities.',
      'The project offers not just homes, but a lifestyle rooted in comfort, exclusivity, and community.'
    ],
    amenitiesZh: [
      '居民可使用会员俱乐部、健身中心、多功能活动室及景观花园，将自然之美与现代便利完美融合。',
      '项目不仅提供居所，更传递舒适、私享及社区感兼具的生活方式。'
    ],
    highlights: {
      totalArea: '55',
      totalAreaZh: '55',
      totalAreaTitle: 'Villas',
      totalAreaTitleZh: '别墅',
      units: '',
      unitsTitle: '',
      unitsTitleZh: '',
      towers: '',
      towersZh: '',
      towersTitle: '',
      towersTitleZh: '',
      commercialTowers: '',
      commercialTowersZh: '',
      commercialTowersTitle: 'Club',
      commercialTowersTitleZh: ''
    }
  },

  {
    slug: 'yigo-international-city-dubai',
    title: 'YIGO26',
    titleZh: 'YIGO26',
    coverImage: '/images/projects/yigo-residence/cover.jpg',
    description: 'YIGO26\'s landmark debut in the Middle East rises at the epicentre of Dubai\'s International City — Plot CBD26 — standing as the district\'s defining residential tower. Just 188 metres from the Blue Line Metro and 15 minutes from Dubai International Airport, it offers unmatched urban connectivity with a global perspective. Featuring an innovative two-bedroom configuration that optimises comparable floor areas for enhanced functionality and superior rental performance, the development sets a new benchmark for intelligent living. Crafted by YIGO26\'s Hong Kong-based team, with over 23 years of international development excellence, this limited collection of 186 residences reinterprets modern luxury for the discerning global resident.',
    descriptionZh: 'YIGO26中东首作落子迪拜国际城核心——CBD26地块x，片区楼王定位；距地铁蓝线188米，15分钟直达机场。同等面积创新双房设计，空间利用率拉满，租金回报更可观。香港精工团队23年国际开发经验打造，全球限量186席，重塑卓越生活的真义。',
    fullDescription: 'YIGO26\'s landmark debut in the Middle East rises at the epicentre of Dubai\'s International City — Plot CBD26 — standing as the district\'s defining residential tower. Just 188 metres from the Blue Line Metro and 15 minutes from Dubai International Airport, it offers unmatched urban connectivity with a global perspective. Featuring an innovative two-bedroom configuration that optimises comparable floor areas for enhanced functionality and superior rental performance, the development sets a new benchmark for intelligent living. Crafted by YIGO26\'s Hong Kong-based team, with over 23 years of international development excellence, this limited collection of 186 residences reinterprets modern luxury for the discerning global resident. Rooted in YIGO26\'s ethos of "merging rationality with aesthetics," the architecture celebrates balance — between the precision of modernist design and the enduring warmth of Mediterranean influence. The façade, characterised by gracefully curved balconies, creates a sense of rhythm and motion, while the pure white exterior mirrors Dubai\'s radiant skyline. Every contour is designed to capture the interplay of light and shadow, reflecting the natural cadence of the desert. Within, each residence serves as a private sanctuary of calm, engaging in a refined dialogue between form and feeling — restraint and expression, functionality and beauty. Life at YIGO26 International City transcends convention, offering residents an atmosphere of understated sophistication and leisure. The development features resort-style amenities, including private swimming pools, a 24-hour fitness centre, and elevated rooftop leisure decks designed for serenity and connection. Surrounding the tower, the community flourishes with access to GEMS International School, Fakeeh University Hospital, and a wide array of dining, retail, and lifestyle conveniences. Thoughtful planning ensures flexibility across layouts and exceptional livability, while its strategic CBD address guarantees robust rental yields and long-term value appreciation — establishing this project as the final and finest residential investment in Dubai\'s Central Business District.',
    fullDescriptionZh: '秉承“理性与美学的融合”这一设计哲学，在现代主义的精准理性与地中海元素建筑的永恒精神之间找到平衡。立面以流动的弧形阳台勾勒出节奏与律动，纯白外墙映照出迪拜明亮的天空。光影在建筑表面之间的交织变化，展现出沙漠自然之美的和谐意境。每一户住宅皆被构想为一处私密的静谧居所——在克制与艺术、功能与美感之间展开优雅对话。',
    images: [
      // '/images/projects/yigo-residence/cover.png',
      // '/images/projects/yigo-residence/intro.jpeg',
      // '/images/projects/yigo-residence/yigo26_new/1.webp',
      '/images/projects/yigo-residence/yigo26_new/01.webp',
      '/images/projects/yigo-residence/yigo26_new/2.webp',
      '/images/projects/yigo-residence/yigo26_new/3.webp',
      '/images/projects/yigo-residence/yigo26_new/4.webp',
      '/images/projects/yigo-residence/yigo26_new/5.webp',
      '/images/projects/yigo-residence/yigo26_new/6.webp',
      '/images/projects/yigo-residence/yigo26_new/8.webp',
      '/images/projects/yigo-residence/yigo26_new/9.webp',
    ],
    floorPlans: [
      '/images/projects/yigo-residence/floor_plans/Floor Plan6.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan7.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan8.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan9.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan10.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan11.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan12.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan13.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan14.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan15.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan16.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan17.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan18.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan19.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan20.png',
      '/images/projects/yigo-residence/floor_plans/Floor Plan21.png'
    ],
    category: 'Residential',
    year: 2024,
    keyFeatures: [
      'Rooted in YIGO’s ethos of “merging rationality with aesthetics,” the architecture celebrates balance — between the precision of modernist design and the enduring warmth of Mediterranean influence. The façade, characterised by gracefully curved balconies, creates a sense of rhythm and motion, while the pure white exterior mirrors Dubai’s radiant skyline. Every contour is designed to capture the interplay of light and shadow, reflecting the natural cadence of the desert. Within, each residence serves as a private sanctuary of calm, engaging in a refined dialogue between form and feeling — restraint and expression, functionality and beauty.',
      '',
      ''
    ],
    keyFeaturesZh: [
      '秉承“理性与美学的融合”这一设计哲学，在现代主义的精准理性与地中海元素建筑的永恒精神之间找到平衡。立面以流动的弧形阳台勾勒出节奏与律动，纯白外墙映照出迪拜明亮的天空。光影在建筑表面之间的交织变化，展现出沙漠自然之美的和谐意境。每一户住宅皆被构想为一处私密的静谧居所——在克制与艺术、功能与美感之间展开优雅对话。',
      '',
      ''
    ],
    amenities: [
      'Life at YIGO26 International City transcends convention, offering residents an atmosphere of understated sophistication and leisure. The development features resort-style amenities, including private swimming pools, a 24-hour fitness centre, and elevated rooftop leisure decks designed for serenity and connection. Surrounding the tower, the community flourishes with access to GEMS International School, Fakeeh University Hospital, and a wide array of dining, retail, and lifestyle conveniences. Thoughtful planning ensures flexibility across layouts and exceptional livability, while its strategic CBD address guarantees robust rental yields and long-term value appreciation — establishing this project as the final and finest residential investment in Dubai’s Central Business District.',
      '',
      ''
    ],
    amenitiesZh: [
      '业主可尊享度假式生活配置，包括私属泳池、24小时健身中心及精心打造的屋顶休闲空间。',
      '周边配套完善，毗邻GEMS国际学校、Fakeeh大学医院及多样生活设施。',
      '项目户型灵活、功能性强，兼具高租金回报与优越地段优势。'
    ],
    highlights: {
      totalArea: ' CBD26',
      totalAreaZh: '迪拜国际城 CBD26 地块',
      totalAreaTitle: 'International City Location',
      totalAreaTitleZh: '位置',
      units: '186',
      unitsTitle: 'Units',
      unitsTitleZh: '住宅单元',
      towers: '188 m',
      towersZh: '距地铁蓝线 188 米',
      towersTitle: 'Metro Access',
      towersTitleZh: '地铁距离',
      commercialTowers: '15 min',
      commercialTowersZh: '15 分钟直达 DXB 机场',
      commercialTowersTitle: 'DXB Airport',
      commercialTowersTitleZh: '机场距离'
    }
  },
  {
    slug: 'zhongzhou-one-residence',
    title: 'Zhongzhou One Residence',
    titleZh: '中洲壹号院',
    coverImage: '/images/projects/zhongzhou-one-residence/1.webp',
    description: 'Nestled along a serene riverfront, Zhongzhou One Residence is designed to capture the essence of refined urban living. Spread across approximately 43,557 square meters, the development presents a harmonious blend of modern architecture and natural scenery. Residents are treated to unobstructed river views, creating an environment of peace and prestige within the city\'s dynamic heart. Every element — from spacious layouts to landscaped green zones — reflects YIGO\'s dedication to crafting homes that inspire elevated living.',
    descriptionZh: '中洲壹号院依傍静谧的河畔而建，旨在呈现雅致都市生活的至臻典范。项目占地约43,557平方米，以现代建筑美学与自然景观的和谐融合，打造出一处静谧而尊贵的城市居所。开阔的江景视野赋予居者难得的宁静与尊荣，在城市的核心地带营造出一片从容天地。从宽敞的户型设计到精心规划的景观绿化，每一处细节都体现了YIGO对于品质生活与灵感居所的不懈追求。',
    fullDescription: 'Nestled along a serene riverfront, Zhongzhou One Residence is designed to capture the essence of refined urban living. Spread across approximately 43,557 square meters, the development presents a harmonious blend of modern architecture and natural scenery. Residents are treated to unobstructed river views, creating an environment of peace and prestige within the city\'s dynamic heart. Every element — from spacious layouts to landscaped green zones — reflects YIGO\'s dedication to crafting homes that inspire elevated living. The project encompasses eight elegant high-rise buildings and offers a total of 603 premium residences. With two- and three-bedroom configurations ranging from 116 to 188 square meters, the layouts have been thoughtfully planned to maximize light, space, and scenic views. A plot ratio of 2.8 and a green space ratio of 32.62% ensure an open, balanced atmosphere where nature coexists beautifully with contemporary design. Life at Zhongzhou One Residence revolves around comfort, wellness, and community. Residents enjoy exclusive access to a river view park, swimming pool, and private clubhouse. Family life thrives with a children\'s play area, nearby school, and hospital within easy reach. A lively shopping street completes the ecosystem, making daily living as convenient as it is fulfilling.',
    fullDescriptionZh: '中洲壹号院依傍静谧的河畔而建，旨在呈现雅致都市生活的至臻典范。项目占地约43,557平方米，以现代建筑美学与自然景观的和谐融合，打造出一处静谧而尊贵的城市居所。开阔的江景视野赋予居者难得的宁静与尊荣，在城市的核心地带营造出一片从容天地。从宽敞的户型设计到精心规划的景观绿化，每一处细节都体现了YIGO对于品质生活与灵感居所的不懈追求。项目由8栋优雅的高层住宅组成，共规划603套臻品住宅。户型涵盖两房与三房，建筑面积约116–188平方米，格局设计注重采光、空间与景观的平衡。项目容积率为2.8，绿化率达32.62%，营造出开阔舒适、自然与现代共生的居住氛围。中洲壹号院以舒适、健康与社区为生活核心。业主可专享江景公园、泳池及私属会所等高端配套；社区内设有儿童游乐区，周边学校与医院环伺，家庭生活便捷无忧。同时，活力商业街区的配置让日常生活兼具便利与品质，完美实现工作与生活的平衡。',
    images: [
      '/images/projects/zhongzhou-one-residence/1.webp',
      '/images/projects/zhongzhou-one-residence/2.webp'
    ],
    category: 'Residential',
    year: 2024,
    keyFeatures: [
      'The project encompasses eight elegant high-rise buildings and offers a total of 603 premium residences.',
      'With two- and three-bedroom configurations ranging from 116 to 188 square meters, the layouts have been thoughtfully planned to maximize light, space, and scenic views.',
      'A plot ratio of 2.8 and a green space ratio of 32.62% ensure an open, balanced atmosphere where nature coexists beautifully with contemporary design.'
    ],
    keyFeaturesZh: [
      '项目由8栋优雅的高层住宅组成，共规划603套臻品住宅。',
      '户型涵盖两房与三房，建筑面积约116–188平方米，格局设计注重采光、空间与景观的平衡。',
      '项目容积率为2.8，绿化率达32.62%，营造出开阔舒适、自然与现代共生的居住氛围'
    ],
    amenities: [
      'Life at Zhongzhou One Residence revolves around comfort, wellness, and community.',
      'Residents enjoy exclusive access to a river view park, swimming pool, and private clubhouse.',
      'Family life thrives with a children\'s play area, nearby school, and hospital within easy reach.',
      'A lively shopping street completes the ecosystem, making daily living as convenient as it is fulfilling.'
    ],
    amenitiesZh: [
      '中洲壹号院以舒适、健康与社区为生活核心。',
      '业主可专享江景公园、泳池及私属会所等高端配套；社区内设有儿童游乐区，周边学校与医院环伺，家庭生活便捷无忧。',
      '同时，活力商业街区的配置让日常生活兼具便利与品质，完美实现工作与生活的平衡。'
    ],
    highlights: {
      totalArea: '270,060.95 m²',
      totalAreaZh: '270,060.95 平方米',
      totalAreaTitle: 'Total Area',
      totalAreaTitleZh: '总建筑面积',
      units: '603',
      unitsTitle: 'Units',
      unitsTitleZh: '住宅单元',
      towers: '8',
      towersZh: '8',
      towersTitle: 'High-Rise Towers',
      towersTitleZh: '住宅楼',
      commercialTowers: '',
      commercialTowersZh: '',
      commercialTowersTitle: '',
      commercialTowersTitleZh: ''
    }
  },
  {
    slug: 'jiangxi-international-business-center',
    title: 'Jiangxi International Business Center',
    titleZh: '江西国际商务中心',
    coverImage: '/images/projects/jiangxi-international-business-center/1.webp',
    description: 'Jiangxi International Business Center represents a new era of urban integration — a visionary complex where commerce, lifestyle, and hospitality converge. With a total construction area exceeding 100,000 square meters, the project redefines the standards of modern mixed-use development in Jiangxi, offering a world-class environment for business and living alike. Anchored by its international outlook and forward-thinking design, it stands as a dynamic destination for enterprises and residents who aspire to live and work seamlessly.',
    descriptionZh: '江西国际商务中心代表着城市融合发展的全新纪元——一个集商务、生活与酒店于一体的前瞻性综合体。项目总建筑面积超过10万平方米，以国际化视野与创新设计重新定义江西现代城市综合体的标杆，打造兼具世界级商务氛围与高端宜居环境的城市新地标。凭借开放的国际格局与卓越的规划理念，该项目成为企业与居民无缝衔接工作与生活的理想目的地。',
    fullDescription: 'Jiangxi International Business Center represents a new era of urban integration — a visionary complex where commerce, lifestyle, and hospitality converge. With a total construction area exceeding 100,000 square meters, the project redefines the standards of modern mixed-use development in Jiangxi, offering a world-class environment for business and living alike. Anchored by its international outlook and forward-thinking design, it stands as a dynamic destination for enterprises and residents who aspire to live and work seamlessly. The development consists of two office towers, one luxury hotel, four residential buildings, and three commercial clusters, forming a balanced ecosystem of productivity and leisure. The 600 residential units range from three- to four-bedroom layouts between 120 and 150 square meters, while office spaces start from 150 to 300 square meters. Each component has been meticulously designed to foster interaction, convenience, and growth. Residents and visitors can immerse themselves in a fully integrated lifestyle — from shopping malls and international conference centers to fitness clubs and hospitality spaces. Underground car parks ensure smooth accessibility, while the presence of hotels and event facilities makes the development a hub for both business and leisure. Every square meter reflects YIGO\'s dedication to creating world-class urban experiences.',
    fullDescriptionZh: '江西国际商务中心代表着城市融合发展的全新纪元——一个集商务、生活与酒店于一体的前瞻性综合体。项目总建筑面积超过10万平方米，以国际化视野与创新设计重新定义江西现代城市综合体的标杆，打造兼具世界级商务氛围与高端宜居环境的城市新地标。凭借开放的国际格局与卓越的规划理念，该项目成为企业与居民无缝衔接工作与生活的理想目的地。项目由两栋甲级办公楼、一座高端酒店、四栋住宅楼及三组商业集群组成，构建出高效与休闲并重的平衡生态体系。住宅部分共600套，涵盖三房至四房户型，建筑面积约为120–150平方米；办公空间则从150至300平方米起，满足多样化商务需求。每一个功能板块都经过精心规划，旨在促进互动、提升便捷性，并助力可持续发展。无论是居住者还是访客，都能在这里体验全方位一体化的现代都市生活——从大型购物中心、国际会议中心到健身俱乐部与高端酒店，形成一个多元活力的城市空间。地下停车场的配备确保了便捷通行，而会议与宴会设施的完善，使项目成为兼具商务会晤与休闲生活的理想场所。每一平方米都凝聚着YIGO对世界级城市体验的执着追求。',
    images: [
      '/images/projects/jiangxi-international-business-center/1.webp',
      '/images/projects/jiangxi-international-business-center/2.webp',
      '/images/projects/jiangxi-international-business-center/3.webp',
      '/images/projects/jiangxi-international-business-center/4.webp'
    ],
    category: 'Mixed-Use',
    year: 2024,
    keyFeatures: [
      'The development consists of two office towers, one luxury hotel, four residential buildings, and three commercial clusters, forming a balanced ecosystem of productivity and leisure.',
      'The 600 residential units range from three- to four-bedroom layouts between 120 and 150 square meters, while office spaces start from 150 to 300 square meters.',
      'Each component has been meticulously designed to foster interaction, convenience, and growth.'
    ],
    keyFeaturesZh: [
      '项目由两栋甲级办公楼、一座高端酒店、四栋住宅楼及三组商业集群组成，构建出高效与休闲并重的平衡生态体系。',
      '住宅部分共600套，涵盖三房至四房户型，建筑面积约为120–150平方米；办公空间则从150至300平方米起，满足多样化商务需求。',
      '每一个功能板块都经过精心规划，旨在促进互动、提升便捷性，并助力可持续发展'
    ],
    amenities: [
      'Residents and visitors can immerse themselves in a fully integrated lifestyle — from shopping malls and international conference centers to fitness clubs and hospitality spaces.',
      'Underground car parks ensure smooth accessibility, while the presence of hotels and event facilities makes the development a hub for both business and leisure.',
      'Every square meter reflects YIGO\'s dedication to creating world-class urban experiences.'
    ],
    amenitiesZh: [
      '无论是居住者还是访客，都能在这里体验全方位一体化的现代都市生活——从大型购物中心、国际会议中心到健身俱乐部与高端酒店，形成一个多元活力的城市空间。',
      '地下停车场的配备确保了便捷通行，而会议与宴会设施的完善，使项目成为兼具商务会晤与休闲生活的理想场所。',
      '每一平方米都凝聚着YIGO对世界级城市体验的执着追求。'
    ],
    highlights: {
      totalArea: '3',
      totalAreaZh: '3',
      totalAreaTitle: 'Commercial Towers',
      totalAreaTitleZh: '座',
      units: '600',
      unitsTitle: 'Units',
      unitsTitleZh: '住宅单元',
      towers: '1',
      towersZh: '1',
      towersTitle: 'Hotel',
      towersTitleZh: '酒店',
      commercialTowers: '4',
      commercialTowersZh: '4',
      commercialTowersTitle: 'Residential Towers',
      commercialTowersTitleZh: '栋'
    }
  },
  {
    slug: 'minle-culture-creative-park',
    title: 'Minle Culture & Creative Park',
    titleZh: '民乐文化产业园',
    coverImage: '/images/projects/minle-culture-creative-park/1.webp',
    description: 'Spanning an impressive 399,600 square meters, Minle Culture & Creative Park is a landmark destination that celebrates innovation, wellness, and community. Conceived as a cultural and commercial hub, it blends art, recreation, and business into one integrated environment. With an investment of USD 210 million, the park redefines lifestyle and creativity, setting a benchmark for cultural development projects across China.',
    descriptionZh: '民乐文化产业园占地约 399,600 平方米，是集创新、康养与社区活力于一体的地标级文化目的地。项目以文化与商业融合为核心理念，将艺术、休闲与商务多元共生，打造出一个充满创意与人文气息的综合空间。项目总投资达 2.1 亿美元，以国际化视野与创新规划，重新定义生活与创意的边界，树立全国文化类综合项目的新标杆。',
    fullDescription: 'Spanning an impressive 399,600 square meters, Minle Culture & Creative Park is a landmark destination that celebrates innovation, wellness, and community. Conceived as a cultural and commercial hub, it blends art, recreation, and business into one integrated environment. With an investment of USD 210 million, the park redefines lifestyle and creativity, setting a benchmark for cultural development projects across China. The development features 15 commercial buildings, four Hot Spring Wellness Centers, and three educational facilities. Its masterplan integrates diverse functional zones — from cultural shopping streets to sports and fitness areas, creating a holistic environment for work, learning, and leisure. The 2.0 plot ratio and expansive land area enable ample space for open-air experiences, natural light, and human-centered design. Minle Culture & Creative Park offers a vibrant lifestyle that fuses health, art, and family engagement. Residents and visitors can stroll through the cultural shopping street, unwind at the hot spring center, or explore the sports complex and children\'s playground. The presence of educational institutions and cultural parks encourages growth, creativity, and well-being — making it a destination that thrives on inspiration.',
    fullDescriptionZh: '民乐文化产业园占地约 399,600 平方米，是集创新、康养与社区活力于一体的地标级文化目的地。项目以文化与商业融合为核心理念，将艺术、休闲与商务多元共生，打造出一个充满创意与人文气息的综合空间。项目总投资达 2.1 亿美元，以国际化视野与创新规划，重新定义生活与创意的边界，树立全国文化类综合项目的新标杆。项目由 15栋商业建筑、4座温泉康养中心及3栋教育配套建筑组成。总体规划涵盖多元功能分区——从文化商业街区到运动健身中心，构建出兼顾工作、学习与休闲的立体化空间体系。项目容积率为2.0，以开阔的土地尺度与自然采光条件，呈现以人为本、开放通透的城市新形态。民乐文化产业园倡导健康、艺术与家庭互动的多元生活方式。人们可漫步于文化商业街，放松于温泉康养中心，亦可在运动中心或儿童乐园中享受惬意时光。教育配套与文化公园的融入，为社区注入持续的成长力与创造力，构筑出一个以灵感与幸福为核心的理想目的地。',
    images: [
      '/images/projects/minle-culture-creative-park/1.webp',
      '/images/projects/minle-culture-creative-park/2.webp',
      '/images/projects/minle-culture-creative-park/3.webp',
      '/images/projects/minle-culture-creative-park/4.webp'
    ],
    category: 'Mixed-Use',
    year: 2024,
    keyFeatures: [
      'The development features 15 commercial buildings, four Hot Spring Wellness Centers, and three educational facilities.',
      'Its masterplan integrates diverse functional zones — from cultural shopping streets to sports and fitness areas, creating a holistic environment for work, learning, and leisure.',
      'The 2.0 plot ratio and expansive land area enable ample space for open-air experiences, natural light, and human-centered design.'
    ],
    keyFeaturesZh: [
      '项目由 15栋商业建筑、4座温泉康养中心及3栋教育配套建筑组成。',
      '总体规划涵盖多元功能分区——从文化商业街区到运动健身中心，构建出兼顾工作、学习与休闲的立体化空间体系。',
      '项目容积率为2.0，以开阔的土地尺度与自然采光条件，呈现以人为本、开放通透的城市新形态。'
    ],
    amenities: [
      'Minle Culture & Creative Park offers a vibrant lifestyle that fuses health, art, and family engagement.',
      'Residents and visitors can stroll through the cultural shopping street, unwind at the hot spring center, or explore the sports complex and children\'s playground.',
      'The presence of educational institutions and cultural parks encourages growth, creativity, and well-being — making it a destination that thrives on inspiration.'
    ],
    amenitiesZh: [
      '民乐文化产业园倡导健康、艺术与家庭互动的多元生活方式。',
      '人们可漫步于文化商业街，放松于温泉康养中心，亦可在运动中心或儿童乐园中享受惬意时光。',
      '教育配套与文化公园的融入，为社区注入持续的成长力与创造力，构筑出一个以灵感与幸福为核心的理想目的地。'
    ],
    highlights: {
      totalArea: '3',
      totalAreaZh: '3',
      totalAreaTitle: 'Educational',
      totalAreaTitleZh: '栋',
      units: 'USD 210 m',
      unitsTitle: 'Investment',
      unitsTitleZh: '投资额',
      towers: '15',
      towersZh: '15',
      towersTitle: 'Commercial',
      towersTitleZh: '商业楼',
      commercialTowers: '4 Wellness',
      commercialTowersZh: '4 座',
      commercialTowersTitle: 'Facilities',
      commercialTowersTitleZh: '配套设施'
    }
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  return projects
    .filter(project => project.slug !== currentSlug)
    .slice(0, limit);
}
