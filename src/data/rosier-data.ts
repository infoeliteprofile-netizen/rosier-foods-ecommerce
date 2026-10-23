import { CategoryItem, ProductItem } from '@/types';

export const CATEGORIES: CategoryItem[] = [
  {
    slug: 'ghee',
    name: 'Gir Cow A2 Desi Ghee',
    tagline: 'Hand-Churned Traditional Bilona Ghee',
    description: 'Prepared using traditional Vedic Bilona method from curd of pasture-raised Gir cows. Rich in A2 beta-casein, butyric acid, and antioxidants.',
    image: 'https://www.rosierfoods.com/cdn/shop/files/ghee_09a692b1-5b73-4156-a411-b30777b76af0.webp?v=1779380654&width=800',
    icon: '🥛'
  },
  {
    slug: 'atta',
    name: 'Khapli & Traditional Atta',
    tagline: 'Ancient Grains Stoneground to Perfection',
    description: 'Slow stone-milled ancient grains like Emmer (Khapli) wheat, Bajra, Ragi and Sattu that preserve vital dietary fiber, vitamins, and natural sweetness.',
    image: 'https://www.rosierfoods.com/cdn/shop/files/atta.webp?v=1779380667&width=800',
    icon: '🌾'
  },
  {
    slug: 'stone-press-oil',
    name: 'Stone Pressed Oils',
    tagline: 'Pure Cold Pressed Wood & Stone Kolhu Oils',
    description: 'Naturally extracted without chemicals or excessive heat, retaining essential omega fats, aroma, and cardiovascular benefits.',
    image: 'https://www.rosierfoods.com/cdn/shop/files/oils.webp?v=1779380714&width=800',
    icon: '🪔'
  },
  {
    slug: 'healthy-snacking',
    name: 'Healthy Breakfast & Snacking',
    tagline: 'Clean Energy & Wholesome Morning Nutrition',
    description: 'High-protein oats, traditional Gond Laddoos, and handcrafted energy bites prepared with pure A2 Ghee and dry fruits.',
    image: 'https://www.rosierfoods.com/cdn/shop/files/healthy_breakfast.webp?v=1779380683&width=800',
    icon: '🥣'
  },
  {
    slug: 'pickles',
    name: 'Sun Dried Pickles',
    tagline: 'Aged in Clay Barnis with Stone Pressed Oil',
    description: 'Grandmother recipes prepared with natural rock salt, mustard oil, and whole spices without synthetic vinegar or preservatives.',
    image: 'https://www.rosierfoods.com/cdn/shop/files/pickles.webp?v=1779380696&width=800',
    icon: '🏺'
  },
  {
    slug: 'immunity-booster',
    name: 'Immunity Booster',
    tagline: 'Ancient Ayurvedic Vitality & Raw Honey',
    description: 'Authentic Amlaprash (Chyawanprash) and raw unpasteurized forest honey to elevate natural body immunity and vitality.',
    image: 'https://www.rosierfoods.com/cdn/shop/files/immunity_bosters.webp?v=1779380728&width=800',
    icon: '🌿'
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    slug: 'a2-desi-cow-ghee-hand-churned-from-curd',
    name: 'A2 Ghee - Hand Churned Gir Cow Bilona Ghee',
    tagline: '100% Pure Vedic Bilona Ghee made from curd of free-grazing Gir cows',
    description: 'Rosier Foods A2 Gir Cow Ghee is made following the ancient 5-step Vedic Bilona method. Fresh A2 milk from grass-fed indigenous Gir cows is boiled and naturally cultured into curd overnight. The curd is then hand-churned in bidirectional wooden churners (Bilona) to separate cultured butter (Makkhan), which is gently slow-simmered over low fire to produce liquid gold aromatic ghee.',
    price: 559,
    compareAtPrice: 699,
    discountBadge: '20% OFF',
    rating: 4.9,
    reviewCount: 1420,
    badge: '🔥 Best Seller',
    categorySlug: 'ghee',
    categoryName: 'Gir Cow A2 Desi Ghee',
    inStock: true,
    featured: true,
    isNewArrival: false,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-ghee-250-ml-gir-cow-a2-ghee-made-from-curd-1261568460.webp?v=1791458799&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-ghee-250-ml-gir-cow-a2-ghee-made-from-curd-250-ml-1240619455.jpg?v=1779888192&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/Ghee_Icons.png?v=1781252536&width=800'
    ],
    variants: [
      { id: 'v1-250ml', title: '250 ML', price: 559, compareAtPrice: 699, stock: 45 },
      { id: 'v1-500ml', title: '500 ML', price: 1049, compareAtPrice: 1399, stock: 60 },
      { id: 'v1-1ltr', title: '1 Ltr', price: 1999, compareAtPrice: 2699, stock: 35 },
      { id: 'v1-2ltr-glass', title: '2 Ltr (2 Glass Jars)', price: 3899, compareAtPrice: 5200, stock: 20 },
      { id: 'v1-2ltr-steel', title: '2 Ltr (Steel Dolchi)', price: 4199, compareAtPrice: 5500, stock: 15 },
      { id: 'v1-5ltr-glass', title: '5 Ltr (5 Glass Jars)', price: 9499, compareAtPrice: 12999, stock: 10 },
      { id: 'v1-5ltr-steel', title: '5 Ltr (Steel Dolchi)', price: 9999, compareAtPrice: 13500, stock: 8 }
    ],
    benefits: [
      'Certified 100% Pure A2 Beta-Casein protein, gentle on digestion',
      'Slow churned from curd (Makhan), never cream or malai',
      'Naturally rich in Butyric acid and CLA for gut health and metabolism',
      'High smoke point (250°C / 482°F) ideal for healthy Indian cooking',
      'Free from hormones, antibiotics, preservatives and adulterants'
    ],
    ingredients: '100% Pure Grass-Fed Indigenous Gir Cow Curd Cultured Milk Fat.',
    howItsMade: '1. Sourced from free-grazing Gir Cows. 2. Natural fermentation of whole A2 milk into curd. 3. Bi-directional wooden churning of curd. 4. Extraction of makkhan. 5. Slow-fire wood simmering in brass vessel.',
    nutritionalFacts: {
      'Serving Size': '1 Tbsp (15g)',
      'Energy': '135 kcal',
      'Total Fat': '15 g',
      'Saturated Fat': '9 g',
      'Trans Fat': '0 g',
      'Cholesterol': '28 mg',
      'A2 Beta-Casein': 'Certified Present'
    },
    labReport: {
      batchNumber: 'RF-GHEE-2026-B14',
      fssaiLicense: '10821005000492',
      testedParameters: ['Purity & Fatty Acid Profile', 'Zero Adulteration (Baudouin Test Negative)', 'A2 Beta-Casein DNA Certified', 'Heavy Metals Free (<0.01ppm)'],
      reportUrl: '/pages/lab-test-reports'
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Sumit Suhag',
        rating: 5,
        date: '14 Oct 2026',
        title: 'Old-school fuel. Real results.',
        comment: 'Balancing endurance sports, a demanding IT career, and family life has taught me that food needs to do more than just fill the plate. A2 Bilona Desi Ghee supports my digestion, keeps my joints moving freely, and gives me steady, long-lasting energy.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Himanshi S.',
        rating: 5,
        date: '02 Oct 2026',
        title: 'Taste That Feels Like Home',
        comment: 'Using A2 Desi Cow Ghee from Rosier Foods makes my meals comforting and flavorful. The grainy texture (danedar) and aroma when poured over hot rotis or dal is simply unmatched.',
        verified: true
      },
      {
        id: 'rev-3',
        author: 'Sushmita R.',
        rating: 5,
        date: '28 Sep 2026',
        title: 'Rich Tradition in Every Drop',
        comment: 'Rosier Foods A2 Desi Cow Ghee brings the richness of tradition back into my kitchen. Truly authentic Vedic bilona ghee.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-2',
    slug: 'amlaprash',
    name: 'Amlaprash (Chyawanprash)',
    tagline: 'Ancient Ayurvedic Rasayana crafted with organic Indian Gooseberries & Wild Honey',
    description: 'Rosier Foods Amlaprash is a modern evolution of the classic Chyawanprash formulation. Handcrafted using sun-ripened organic Amla (Indian Gooseberry) boiled and simmered with over 40 potent Himalayan herbs, A2 Desi Ghee, and pure raw wild honey—completely free of refined sugar or synthetic preservatives.',
    price: 494.25,
    compareAtPrice: 659,
    discountBadge: '25% OFF',
    rating: 4.9,
    reviewCount: 890,
    badge: '⚡ Selling Fast',
    categorySlug: 'immunity-booster',
    categoryName: 'Immunity Booster',
    inStock: true,
    featured: true,
    isNewArrival: false,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-amlaprash-amlaprash-chyawanprash-1261568414.webp?v=1791458595&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-amlaprash-500g-amlaprash-chyawanprash-1238506732.jpg?v=1778844311&width=800'
    ],
    variants: [
      { id: 'v2-500g', title: '500g', price: 494.25, compareAtPrice: 659, stock: 50 },
      { id: 'v2-1kg', title: '1 Kg', price: 920.00, compareAtPrice: 1200, stock: 30 }
    ],
    benefits: [
      'High in natural Vitamin C for enhanced immune defense',
      'Sweetened solely with Raw Forest Honey and Jaggery—Zero Refined Sugar',
      'Formulated with 40+ traditional revitalizing herbs like Ashwagandha and Shatavari',
      'Promotes respiratory vitality and seasonal resilience',
      'Ideal for the whole family, from children to seniors'
    ],
    ingredients: 'Fresh Forest Amla (Emblica officinalis), Pure Raw Wild Honey, A2 Cow Desi Ghee, Jaggery, Dashmool, Ashwagandha, Pippali, Cardamom, Clove, Cinnamon.',
    reviews: [
      {
        id: 'rev-4',
        author: 'Dr. Ramesh K.',
        rating: 5,
        date: '20 Sep 2026',
        title: 'Zero Sugar, 100% Efficacy',
        comment: 'As a practitioner, I recommend Rosier Foods Amlaprash because it avoids refined sugar entirely. The amla pulp and raw honey balance is exceptional.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-3',
    slug: 'wild-flower-honey',
    name: 'Wild Forest Honey',
    tagline: 'Unfiltered, raw and unprocessed nectar harvested from pristine forest flora',
    description: 'Our Wild Forest Honey is gathered by certified tribal honey hunters from pristine forest reserves. It is completely unheated, unpasteurized, and micro-filtered only to remove bee debris while preserving all living enzymes, bee pollen, propolis, and natural minerals.',
    price: 441.75,
    compareAtPrice: 589,
    discountBadge: '25% OFF',
    rating: 4.7,
    reviewCount: 630,
    badge: '🚀 Trending',
    categorySlug: 'immunity-booster',
    categoryName: 'Immunity Booster',
    inStock: true,
    featured: true,
    isNewArrival: false,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-honey-500g-wild-forest-honey-1261568412.webp?v=1791459039&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-honey-500g-wild-forest-honey-1248149128.webp?v=1783502591&width=800'
    ],
    variants: [
      { id: 'v3-500g', title: '500g', price: 441.75, compareAtPrice: 589, stock: 40 },
      { id: 'v3-1kg', title: '1 Kg', price: 820.00, compareAtPrice: 1099, stock: 25 }
    ],
    benefits: [
      'Raw, unprocessed, never heated above natural beehive temperature (35°C)',
      'Rich in bee pollen, royal jelly traces, and antioxidants',
      'NMR tested for 100% purity and zero corn/rice syrup adulteration',
      'Natural soother for dry cough, throat irritation and digestion'
    ],
    ingredients: '100% Pure Raw Multi-Flora Forest Honey.',
    reviews: [
      {
        id: 'rev-5',
        author: 'Ananya Sharma',
        rating: 5,
        date: '18 Sep 2026',
        title: 'Authentic wild taste',
        comment: 'You can immediately tell this is real forest honey from the floral aroma and slight natural crystallization. The finest honey I have bought in India.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-4',
    slug: 'khapli-emmer-wheat-atta-stoneground-high-fiber-for-gut-health',
    name: 'Khapli (Emmer) Wheat Atta',
    tagline: 'Ancient Heirloom Grain stoneground slowly for optimal gut health & easy digestion',
    description: 'Khapli (Emmer Wheat) is an ancient, unhybridized grain cultivated in India for over 10,000 years. Unlike modern hybridized wheat, Khapli has a simpler gluten structure that is significantly gentler on the digestive system, coupled with a low Glycemic Index and twice the dietary fiber.',
    price: 399.20,
    compareAtPrice: 499,
    discountBadge: '20% OFF',
    rating: 4.8,
    reviewCount: 1150,
    badge: '🔥 Best Seller',
    categorySlug: 'atta',
    categoryName: 'Khapli & Traditional Atta',
    inStock: true,
    featured: true,
    isNewArrival: false,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-khapli-emmer-wheat-atta-1261568450.webp?v=1791458379&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-2-kg-khapli-emmer-wheat-atta-1239446981.jpg?v=1779283597&width=800'
    ],
    variants: [
      { id: 'v4-2kg', title: '2 Kg', price: 399.20, compareAtPrice: 499, stock: 70 },
      { id: 'v4-5kg', title: '5 Kg', price: 949.00, compareAtPrice: 1199, stock: 40 }
    ],
    benefits: [
      'Low Glycemic Index (GI), preventing sudden blood sugar spikes',
      'Easily digestible ancient gluten structure suitable for sensitive digestion',
      'Stoneground in slow natural stone chakki to prevent nutrient loss',
      'High in magnesium, iron, and gut-soothing dietary fiber'
    ],
    ingredients: '100% Ancient Khapli (Emmer) Wheat Grains.',
    reviews: [
      {
        id: 'rev-6',
        author: 'Alisha A.',
        rating: 5,
        date: '10 Oct 2026',
        title: 'Healthy Choice for Everyday Meals!',
        comment: 'Switching to Khapli Wheat Atta from Rosier Foods was the best choice for our health. It’s fresh, nutritious, and makes soft, aromatic rotis that leave you feeling light.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-5',
    slug: 'wood-pressed-black-mustard-oil',
    name: 'Stone Pressed Black Mustard Oil',
    tagline: 'Traditional Cold Pressed Kachi Ghani Oil with authentic pungent zing',
    description: 'Extracted slowly from premium indigenous black mustard seeds using traditional wooden Kolhu pestles at temperatures below 45°C. Retains natural pungent allyl isothiocyanate, essential Omega-3 fatty acids, and vibrant natural yellow tint.',
    price: 312.00,
    compareAtPrice: 390,
    discountBadge: '20% OFF',
    rating: 4.8,
    reviewCount: 490,
    badge: '⚡ Selling Fast',
    categorySlug: 'stone-press-oil',
    categoryName: 'Stone Pressed Oils',
    inStock: true,
    featured: true,
    isNewArrival: false,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/oils.webp?v=1779380714&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/oils.webp?v=1779380714&width=360'
    ],
    variants: [
      { id: 'v5-1ltr', title: '1 Ltr', price: 312.00, compareAtPrice: 390, stock: 55 },
      { id: 'v5-5ltr', title: '5 Ltr', price: 1499.00, compareAtPrice: 1850, stock: 20 }
    ],
    benefits: [
      'True Cold Pressed (Wood Ghani) under 45°C without chemicals or solvents',
      'Zero argemone oil, zero synthetic color or aroma enhancers',
      'High smoke point ideal for Indian sautéing, curries, and pickling',
      'Rich in cardioprotective Monounsaturated Fatty Acids (MUFA)'
    ],
    ingredients: '100% Pure First Cold Pressed Black Mustard Seeds.',
    reviews: [
      {
        id: 'rev-7',
        author: 'Sunil V.',
        rating: 5,
        date: '04 Oct 2026',
        title: 'Real kachi ghani pungency',
        comment: 'Reminds me of the mustard oil my family had directly from the village kolhu 30 years ago. Beautiful pungent flavor and clear pure oil.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-6',
    slug: 'mango-pickle',
    name: 'Mango Pickle - Natural Sun Dried',
    tagline: 'Handmade traditional Aam ka Achaar aged in earthen jars under natural sunlight',
    description: 'Crafted using hand-cut raw Ramkela mango slices, rock salt, methi dana, fennel, and kalonji, preserved entirely in our pure stone-pressed black mustard oil. Naturally sun-cured over weeks in terracotta barnis to develop complex probiotic richness.',
    price: 279.20,
    compareAtPrice: 349,
    discountBadge: '20% OFF',
    rating: 4.9,
    reviewCount: 780,
    badge: '🔥 Best Seller',
    categorySlug: 'pickles',
    categoryName: 'Sun Dried Pickles',
    inStock: true,
    featured: true,
    isNewArrival: false,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/pickles.webp?v=1779380696&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/pickles.webp?v=1779380696&width=360'
    ],
    variants: [
      { id: 'v6-300g', title: '300g', price: 279.20, compareAtPrice: 349, stock: 40 },
      { id: 'v6-500g', title: '500g', price: 420.00, compareAtPrice: 525, stock: 30 }
    ],
    benefits: [
      'Zero synthetic vinegar, acetic acid, or chemical stabilizers',
      'Aged in earthen barnis under natural sun for authentic probiotic fermentation',
      'Immersed in cold-pressed mustard oil with whole roasted spices',
      'Traditional heirloom recipe passed down through generations'
    ],
    ingredients: 'Raw Mango Pieces, Stone Pressed Mustard Oil, Rock Salt, Fenugreek Seeds, Fennel Seeds, Nigella Seeds (Kalonji), Turmeric, Red Chilli, Asafoetida (Hing).',
    reviews: [
      {
        id: 'rev-8',
        author: 'Kavita M.',
        rating: 5,
        date: '12 Oct 2026',
        title: 'Exactly like Grandma made',
        comment: 'The crisp mango pieces and sun-cured spices in pure mustard oil are nostalgic perfection. No vinegar taste at all—just pure home goodness.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-7',
    slug: 'groundnut-oil',
    name: 'Stone Pressed Groundnut Oil',
    tagline: 'Pure Cold Pressed Peanut Oil with rich golden hue and delightful nutty aroma',
    description: 'Freshly extracted from sun-dried Saurashtra groundnuts using slow stone-press technique. Free from bleaching agents, degumming chemicals, or high heat.',
    price: 356.00,
    compareAtPrice: 445,
    discountBadge: '20% OFF',
    rating: 4.8,
    reviewCount: 340,
    badge: 'Pure & Cold Pressed',
    categorySlug: 'stone-press-oil',
    categoryName: 'Stone Pressed Oils',
    inStock: true,
    featured: true,
    isNewArrival: false,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/oils.webp?v=1779380714&width=800'
    ],
    variants: [
      { id: 'v7-1ltr', title: '1 Ltr', price: 356.00, compareAtPrice: 445, stock: 35 },
      { id: 'v7-5ltr', title: '5 Ltr', price: 1699.00, compareAtPrice: 2100, stock: 15 }
    ],
    benefits: [
      'Naturally rich in Vitamin E and Resveratrol antioxidant',
      'Unrefined and unbleached, retaining genuine peanut aroma',
      'High heat resistance for guilt-free frying and daily meals'
    ],
    ingredients: '100% Pure First Cold Pressed Peanuts.',
    reviews: []
  },
  {
    id: 'prod-8',
    slug: 'wood-pressed-coconut-oil',
    name: 'Stone Pressed Coconut Oil',
    tagline: 'Extra Virgin cold-pressed oil made from high-grade sun-dried copras',
    description: 'Crafted with premium sun-dried Kerala coconut copras. Cold pressed to preserve the fresh tropical fragrance, medium-chain triglycerides (MCTs), and lauric acid.',
    price: 719.20,
    compareAtPrice: 899,
    discountBadge: '20% OFF',
    rating: 4.8,
    reviewCount: 290,
    badge: 'Extra Virgin',
    categorySlug: 'stone-press-oil',
    categoryName: 'Stone Pressed Oils',
    inStock: true,
    featured: true,
    isNewArrival: false,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/oils.webp?v=1779380714&width=800'
    ],
    variants: [
      { id: 'v8-500ml', title: '500 ML', price: 380.00, compareAtPrice: 475, stock: 45 },
      { id: 'v8-1ltr', title: '1 Ltr', price: 719.20, compareAtPrice: 899, stock: 30 }
    ],
    benefits: [
      'High in Lauric acid for immunity and cognitive vitality',
      'Multi-purpose: culinary cooking, bulletproof coffee, hair and skin hydration',
      'Zero hydrogenated fats, unrefined and chemical-free'
    ],
    ingredients: '100% Pure Cold Pressed Coconut Kernel Oil.',
    reviews: []
  },
  {
    id: 'prod-9',
    slug: 'gond-laddoo',
    name: 'Gond Laddoo',
    tagline: 'Ayurvedic winter warmth & post-natal strength sweets with A2 Desi Ghee & Edible Gum',
    description: 'Traditional nutritional laddoos prepared with golden fried edible gum (Gond), whole wheat, crushed California almonds, cashews, cardamom, and pure A2 Gir Cow Ghee, sweetened naturally with raw organic jaggery.',
    price: 297.50,
    compareAtPrice: 350,
    discountBadge: '15% OFF',
    rating: 5.0,
    reviewCount: 120,
    badge: '🎉 New Arrival',
    categorySlug: 'healthy-snacking',
    categoryName: 'Healthy Breakfast & Snacking',
    inStock: true,
    featured: false,
    isNewArrival: true,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-gond-laddoo-1261584794.png?v=1791472539&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-gond-laddoo-1261584802.png?v=1791472511&width=800'
    ],
    variants: [
      { id: 'v9-200g', title: '200g', price: 297.50, compareAtPrice: 350, stock: 30 },
      { id: 'v9-500g', title: '500g', price: 680.00, compareAtPrice: 800, stock: 20 }
    ],
    benefits: [
      'Strengthens joints and vertebral column with high collagen-supporting nutrients',
      'Made with 100% authentic A2 Gir Cow Bilona Ghee',
      'Sweetened solely with organic jaggery—Zero refined sugar',
      'Traditional Ayurvedic tonic for endurance and recovery'
    ],
    ingredients: 'Edible Gum (Gond), A2 Gir Cow Ghee, Wheat Flour, Jaggery, Almonds, Cashews, Cardamom, Dry Ginger.',
    reviews: [
      {
        id: 'rev-9',
        author: 'Deepika S.',
        rating: 5,
        date: '17 Oct 2026',
        title: 'Melt-in-mouth and not too sweet!',
        comment: 'These laddoos are wonderfully balanced. The crunch of gond with the aroma of pure A2 ghee makes it the ideal afternoon snack.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-10',
    slug: 'bajra-atta',
    name: 'Bajra Atta',
    tagline: 'Freshly milled whole Pearl Millet flour rich in natural dietary fiber and minerals',
    description: 'Ground slowly in small batches from whole winter pearl millet grains. Naturally gluten-free, Bajra flour provides warming energy, supports heart health, and contains vital iron, zinc, and magnesium.',
    price: 161.50,
    compareAtPrice: 170,
    discountBadge: '5% OFF',
    rating: 4.8,
    reviewCount: 65,
    badge: '🎉 New Arrival',
    categorySlug: 'atta',
    categoryName: 'Khapli & Traditional Atta',
    inStock: true,
    featured: false,
    isNewArrival: true,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-pack-of-2-500g-bajra-atta-1264002449.png?v=1792681991&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-pack-of-2-500g-bajra-atta-1263995283.png?v=1792674998&width=800'
    ],
    variants: [
      { id: 'v10-2x500g', title: 'Pack of 2 (500g)', price: 161.50, compareAtPrice: 170, stock: 40 },
      { id: 'v10-2kg', title: '2 Kg', price: 280.00, compareAtPrice: 320, stock: 25 }
    ],
    benefits: [
      'Naturally gluten-free grain',
      'Rich source of iron and zinc to combat fatigue and anemia',
      'Low Glycemic response assists in diabetes management'
    ],
    ingredients: '100% Whole Pearl Millet (Bajra) Grains.',
    reviews: []
  },
  {
    id: 'prod-11',
    slug: 'multigrain-atta-5kg',
    name: 'Khapli Multigrain Atta (5Kg)',
    tagline: 'Wholesome fusion of ancient Khapli wheat with Ragi, Bajra, Jowar & roasted Chana',
    description: 'Formulated in exact nutritional proportions to provide complete plant protein, complex carbohydrates, and gentle digestive fiber. Makes tender, wholesome rotis with deep earthy taste.',
    price: 596.25,
    compareAtPrice: 795,
    discountBadge: '25% OFF',
    rating: 4.9,
    reviewCount: 210,
    badge: '🎉 New Arrival',
    categorySlug: 'atta',
    categoryName: 'Khapli & Traditional Atta',
    inStock: true,
    featured: false,
    isNewArrival: true,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-5-kg-khapli-multigrain-atta-5kg-1261568438.webp?v=1791458053&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-5-kg-khapli-multigrain-atta-5kg-1239446984.jpg?v=1779283511&width=800'
    ],
    variants: [
      { id: 'v11-5kg', title: '5 Kg', price: 596.25, compareAtPrice: 795, stock: 35 }
    ],
    benefits: [
      'Ancient Khapli base blended with 4 superfood grains',
      'Twice the protein & fiber compared to regular commercial wheat flour',
      'Zero maida, zero starch additives, 100% whole grain stoneground'
    ],
    ingredients: 'Khapli (Emmer) Wheat (70%), Ragi (10%), Jowar (10%), Bajra (5%), Roasted Kala Chana (5%).',
    reviews: []
  },
  {
    id: 'prod-12',
    slug: 'red-chilly-pickle-natural-sun-dried',
    name: 'Red Chilly Pickle - Natural Sun Dried',
    tagline: 'Handmade Banarasi stuffed red chillies matured in sunlit clay barnis',
    description: 'Whole fat red peppers hand-slit and filled with coarse hand-ground mustard, amchur, fennel, coriander, and rock salt, cured slowly in pure cold-pressed mustard oil.',
    price: 279.20,
    compareAtPrice: 349,
    discountBadge: '20% OFF',
    rating: 4.9,
    reviewCount: 185,
    badge: '🎉 New Arrival',
    categorySlug: 'pickles',
    categoryName: 'Sun Dried Pickles',
    inStock: true,
    featured: false,
    isNewArrival: true,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-pickle-300-gms-red-chilly-pickle-natural-sun-dried-1261568424.webp?v=1791465459&width=800',
      'https://www.rosierfoods.com/cdn/shop/files/rosier-foods-pickle-300-gms-red-chilly-pickle-natural-sun-dried-1239710632.jpg?v=1779377051&width=800'
    ],
    variants: [
      { id: 'v12-300g', title: '300g', price: 279.20, compareAtPrice: 349, stock: 40 }
    ],
    benefits: [
      'Original Varanasi style Lal Mirch stuffed pickle',
      'Naturally preserved without synthetic acidity regulators',
      'Rich authentic aroma of stone pressed mustard oil'
    ],
    ingredients: 'Red Chillies, Stone Pressed Mustard Oil, Rock Salt, Amchur (Dry Mango), Fenugreek, Fennel, Mustard, Spices.',
    reviews: []
  },
  {
    id: 'prod-13',
    slug: 'stone-pressed-olive-oil',
    name: 'Olive Oil - Stone Pressed',
    tagline: 'Extra Virgin cold extraction for dressings, grilling, and Mediterranean cooking',
    description: 'Single estate, cold stone-pressed extra virgin olive oil with low acidity (<0.3%) and a fresh peppery finish.',
    price: 719.20,
    compareAtPrice: 899,
    discountBadge: '20% OFF',
    rating: 4.7,
    reviewCount: 95,
    badge: 'Extra Virgin',
    categorySlug: 'stone-press-oil',
    categoryName: 'Stone Pressed Oils',
    inStock: true,
    featured: false,
    isNewArrival: true,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/oils.webp?v=1779380714&width=800'
    ],
    variants: [
      { id: 'v13-500ml', title: '500 ML', price: 719.20, compareAtPrice: 899, stock: 30 },
      { id: 'v13-1ltr', title: '1 Ltr', price: 1349.00, compareAtPrice: 1699, stock: 20 }
    ],
    benefits: [
      'First cold extraction under 27°C',
      'Rich in Polyphenols and Oleic Acid for arterial flexibility'
    ],
    ingredients: '100% Extra Virgin Olive Oil.',
    reviews: []
  },
  {
    id: 'prod-14',
    slug: 'sattu-atta-1kg',
    name: 'Sattu Atta (1Kg)',
    tagline: 'Roasted Bengal Gram flour — India’s original high-protein plant powerhouse',
    description: 'Prepared by roasting selected Bengal gram (Chana) in hot sand according to age-old tradition, then stoneground into a fine flour. Instant source of protein, cooling for the stomach.',
    price: 199.00,
    compareAtPrice: 249,
    discountBadge: '20% OFF',
    rating: 4.9,
    reviewCount: 140,
    badge: 'High Protein',
    categorySlug: 'atta',
    categoryName: 'Khapli & Traditional Atta',
    inStock: true,
    featured: false,
    isNewArrival: true,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/atta.webp?v=1779380667&width=800'
    ],
    variants: [
      { id: 'v14-1kg', title: '1 Kg', price: 199.00, compareAtPrice: 249, stock: 50 }
    ],
    benefits: [
      '26g Plant Protein per 100g',
      'Cooling natural remedy for intense summers and post-workout recovery',
      'Versatile: make sattu sharbat, parathas, or litti chokha'
    ],
    ingredients: '100% Roasted Bengal Gram (Chana).',
    reviews: []
  },
  {
    id: 'prod-15',
    slug: 'high-protein-oats-assorted-pack',
    name: 'High Protein Oats - Assorted Pack',
    tagline: 'Jumbo rolled oats packed with pumpkin seeds, chia seeds, and dried cranberries',
    description: 'Clean breakfast blend designed to provide sustained slow-release energy throughout the morning without insulin spikes.',
    price: 399.00,
    compareAtPrice: 499,
    discountBadge: '20% OFF',
    rating: 4.8,
    reviewCount: 85,
    badge: 'Clean Breakfast',
    categorySlug: 'healthy-snacking',
    categoryName: 'Healthy Breakfast & Snacking',
    inStock: true,
    featured: false,
    isNewArrival: true,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/healthy_breakfast.webp?v=1779380683&width=800'
    ],
    variants: [
      { id: 'v15-800g', title: '800g Assorted Pack', price: 399.00, compareAtPrice: 499, stock: 35 }
    ],
    benefits: [
      'Beta-glucan soluble fiber supports heart cholesterol management',
      'No added refined sugars or artificial flavoring agents'
    ],
    ingredients: 'Whole Rolled Oats, Chia Seeds, Pumpkin Seeds, Dried Cranberries, Raw Honey Essence.',
    reviews: []
  },
  {
    id: 'prod-16',
    slug: 'ragi-atta-1kg',
    name: 'Ragi Atta (1Kg)',
    tagline: 'Freshly milled Finger Millet flour bursting with bioavailable calcium & iron',
    description: 'Made from sun-dried red finger millets. Excellent for infant nutrition, growing children, and active seniors needing calcium supplementation.',
    price: 189.00,
    compareAtPrice: 220,
    discountBadge: '14% OFF',
    rating: 4.8,
    reviewCount: 110,
    badge: 'High Calcium',
    categorySlug: 'atta',
    categoryName: 'Khapli & Traditional Atta',
    inStock: true,
    featured: false,
    isNewArrival: true,
    images: [
      'https://www.rosierfoods.com/cdn/shop/files/atta.webp?v=1779380667&width=800'
    ],
    variants: [
      { id: 'v16-1kg', title: '1 Kg', price: 189.00, compareAtPrice: 220, stock: 45 }
    ],
    benefits: [
      'Highest calcium content among all cereals (344mg / 100g)',
      '100% naturally gluten-free grain',
      'Ideal for soft rotis, ragi malt, dosas, and laddoos'
    ],
    ingredients: '100% Whole Finger Millet (Ragi).',
    reviews: []
  }
];

export const TESTIMONIALS = [
  {
    quote: "Balancing endurance sports, a demanding IT career, and family life has taught me that food needs to do more than just fill the plate. A2 Bilona Desi Ghee supports my digestion, keeps my joints moving freely, and gives me steady, long-lasting energy.",
    author: "Sumit Suhag",
    role: "Endurance Athlete & IT Leader",
    product: "A2 Ghee - Hand Churned Gir Cow Bilona Ghee",
    avatar: "https://www.rosierfoods.com/cdn/shop/files/sumit_suhag.heic?format=webp&v=1769762816&width=360",
    rating: 5
  },
  {
    quote: "Switching to Khapli Wheat Atta from Rosier Foods was the best choice for our health. It's fresh, nutritious, and perfect for our daily meals! Our digestion feels so much lighter compared to normal commercial wheat flour.",
    author: "Alisha A.",
    role: "Verified Buyer, Bengaluru",
    product: "Khapli (Emmer) Wheat Atta",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    quote: "Using A2 Desi Cow Ghee from Rosier Foods makes my meals comforting and flavorful. The quality and purity are simply outstanding. The fragrance when you pop open the glass jar takes me back to my childhood village home.",
    author: "Himanshi S.",
    role: "Food Enthusiast, Delhi NCR",
    product: "A2 Ghee - Hand Churned Gir Cow Bilona Ghee",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    quote: "Rosier Foods' A2 Desi Cow Ghee brings the richness of tradition to my kitchen. Its pure taste elevates every dish beautifully. I especially appreciate the lab test transparency provided with every batch.",
    author: "Sushmita R.",
    role: "Verified Buyer, Mumbai",
    product: "A2 Ghee - Hand Churned Gir Cow Bilona Ghee",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    rating: 5
  },
  {
    quote: "Pure aroma, authentic taste! The Stone Pressed Black Mustard Oil gives my fish curries and traditional gravies the exact pungent character that was missing from refined supermarket oils.",
    author: "Priya Sharma",
    role: "Verified Buyer, Kolkata",
    product: "Stone Pressed Black Mustard Oil",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    rating: 5
  }
];

export const LAB_REPORTS = [
  {
    title: "A2 Beta-Casein DNA Verification Test",
    product: "A2 Gir Cow Desi Ghee",
    lab: "National Dairy Research Institute Partnered Lab",
    certNumber: "CERT-A2-2026-9941",
    result: "100% Pure A2 Gene Allele (Zero A1 contamination detected)",
    date: "September 2026",
    summary: "Comprehensive DNA sequencing confirms milk solely from certified Bos indicus Gir cows."
  },
  {
    title: "Complete Fatty Acid & Purity Analysis",
    product: "A2 Gir Cow Desi Ghee",
    lab: "NABL Accredited Analytical Laboratory",
    certNumber: "NABL-FA-88124",
    result: "Reichert-Meissl value 28.4 (Optimal 26-32), Baudouin Test Negative",
    date: "October 2026",
    summary: "Zero mineral oils, hydrogenated fats, or plant sterols detected. 100% pure butter fat."
  },
  {
    title: "Heavy Metals & Chemical Residue Screening",
    product: "Khapli (Emmer) Wheat Atta",
    lab: "SGS India Food Safety Lab",
    certNumber: "SGS-RES-77401",
    result: "Pass (Lead, Cadmium, Arsenic below detectable threshold of 0.01 mg/kg)",
    date: "October 2026",
    summary: "Zero organophosphate pesticides or synthetic glyphosate residues detected."
  },
  {
    title: "Nuclear Magnetic Resonance (NMR) Test",
    product: "Wild Forest Honey",
    lab: "Intertek Food Services Testing",
    certNumber: "NMR-HON-55291",
    result: "Authentic Raw Honey Profile (Zero added C3/C4 corn, cane, or beet sugars)",
    date: "September 2026",
    summary: "NMR profiling verifies natural multi-flora enzymatic fingerprints."
  }
];

export interface LabReportProduct {
  id: string;
  title: string;
  imgSrc: string;
  pdfLink: string;
}

export const LAB_REPORT_PRODUCTS: LabReportProduct[] = [
  {
    "id": "lab-p-0",
    "title": "Malai Paneer",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/1_15d7925a-a20b-461b-98f4-5db38f3c21f5.jpg?format=webp&v=1769611004&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Paneer_-112.pdf?v=1753244027"
  },
  {
    "id": "lab-p-1",
    "title": "Gir Cow A2 Ghee",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-ghee-1-ltr-gir-cow-a2-ghee-made-from-curd-1218401163.jpg?format=webp&v=1769608450&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/merged.pdf?v=1768202574"
  },
  {
    "id": "lab-p-2",
    "title": "Better Bars",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/1_016ae094-e9ff-45c5-8ff3-0cdcd6513597.jpg?format=webp&v=1758710517&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Rosier_foods_Protein_Bar.pdf?v=1749046679"
  },
  {
    "id": "lab-p-3",
    "title": "Khapli Atta",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-5-kg-khapli-emmer-wheat-atta-1218401183.jpg?format=webp&v=1769607789&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Khapli_Atta_Lab_Report.pdf?v=1765368662"
  },
  {
    "id": "lab-p-4",
    "title": "Wild Forest Honey",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/1_af2cbd16-c3e7-4eb8-9a7f-492acb60f937.jpg?format=webp&v=1756989923&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Wild_Forest_Honey.pdf?v=1765369651"
  },
  {
    "id": "lab-p-5",
    "title": "Ginger Honey",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/1_d9a20c6e-35e4-4f38-bf06-92cb2525589f.jpg?format=webp&v=1768206824&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Ginger_Honey_-174.pdf?v=1765641667"
  },
  {
    "id": "lab-p-6",
    "title": "Stone Pressed Mustard Oil",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/1_8ebce744-37d0-4fdb-b001-f8bfa2655d89.jpg?format=webp&v=1768206855&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Black_Mustard_Oil_Lab_Report.pdf?v=1765370195"
  },
  {
    "id": "lab-p-7",
    "title": "Stone Pressed Groundnut Oil",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/1_c3fefb11-eeb0-4ffa-a805-f565e01e5bba.jpg?format=webp&v=1768206883&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Groundnut_Oil_Lab_Report.pdf?v=1765370419"
  },
  {
    "id": "lab-p-8",
    "title": "Stone Pressed Coconut Oil",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/1_8126ed29-07d9-49c7-b0c0-32d19d67c9f7.jpg?format=webp&v=1768206916&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Coconut_Oil_Lab_Report.pdf?v=1765370726"
  },
  {
    "id": "lab-p-9",
    "title": "Stone Pressed Yellow Mustard Oil",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/1_8b5d3091-1b71-4ecc-816d-38695e732eb6.jpg?format=webp&v=1768206946&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Yellow_Mustard_Oil_Lab_Report.pdf?v=1765371322"
  },
  {
    "id": "lab-p-10",
    "title": "Stone Pressed Sunflower Oil",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/1_b409400f-9c02-4287-9211-d7431fe2e957.jpg?format=webp&v=1768206975&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Sunflower_Oil-020.pdf?v=1765371422"
  },
  {
    "id": "lab-p-11",
    "title": "Stone Pressed Olive Oil",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-oil-500-ml-stone-pressed-olive-oil-1238550345.jpg?format=webp&v=1778873051&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Olive_Oil-023.pdf?v=1788259531"
  },
  {
    "id": "lab-p-12",
    "title": "Stone Pressed Sesame Oil",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-oil-1000-ml-pet-bottle-stone-pressed-sesame-oil-1238581627.jpg?format=webp&v=1778923451&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/ROSIER_WHITE_SESAME20251001_15433420.pdf?v=1788259530"
  },
  {
    "id": "lab-p-13",
    "title": "Amlaprash",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/Amlaprash_Front.jpg?format=webp&v=1759503392&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Amlaprash_Lab_Report.pdf?v=1765543072"
  },
  {
    "id": "lab-p-14",
    "title": "Nut Butter Dark Chocolate",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-bars-nutbutters-300g-nut-butter-dark-chocolate-1218411524.jpg?format=webp&v=1769614597&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/merged.pdf?v=1768202574"
  },
  {
    "id": "lab-p-15",
    "title": "Nut Butter",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-bars-nutbutters-300g-nut-butter-1218411515.jpg?format=webp&v=1769614690&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/merged.pdf?v=1768202574"
  },
  {
    "id": "lab-p-16",
    "title": "Almond Butter Crunchy",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-bars-nutbutters-300g-almond-butter-crunchy-1218411519.jpg?format=webp&v=1769614511&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/merged.pdf?v=1768202574"
  },
  {
    "id": "lab-p-17",
    "title": "Nut Butter Crunchy",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-bars-nutbutters-300g-nut-butter-crunchy-1218411521.jpg?format=webp&v=1769614465&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/merged.pdf?v=1768202574"
  },
  {
    "id": "lab-p-18",
    "title": "Sattu Flour",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-1-kg-sattu-atta-1kg-1231505540.jpg?format=webp&v=1775647658&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Test_report_of_Sattu_-_206.pdf?v=1776080054"
  },
  {
    "id": "lab-p-19",
    "title": "Multigrain Flour",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-5-kg-multigrain-atta-5kg-1231498774.jpg?format=webp&v=1775641334&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/200-Multigrain_flour_Atta.pdf?v=1776080054"
  },
  {
    "id": "lab-p-20",
    "title": "Jowar Flour",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-1-kg-jowar-atta-1kg-1231498773.jpg?format=webp&v=1775641029&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Test_report_of_Jowar_Flour-202.pdf?v=1776080054"
  },
  {
    "id": "lab-p-21",
    "title": "Ragi Flour",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-flour-1-kg-ragi-atta-1kg-1231498772.jpg?format=webp&v=1775640637&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Test_report_of_Ragi_Flour-201.pdf?v=1776080054"
  },
  {
    "id": "lab-p-22",
    "title": "Banana Cinnamon Oats",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-bars-nutbutters-pack-of-1-x-6-overnight-oats-banana-cinnamon-1231505533.jpg?format=webp&v=1775647778&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/fa20260212-027-114.pdf?v=1776513445"
  },
  {
    "id": "lab-p-23",
    "title": "Cafe Mocha Oats",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-bars-nutbutters-pack-of-1-x-6-overnight-oats-cafe-mocha-1231505529.jpg?format=webp&v=1775647810&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/fa20260212-027-115.pdf?v=1776513627"
  },
  {
    "id": "lab-p-24",
    "title": "Double Chocolate Oats",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-bars-nutbutters-pack-of-1-x-6-overnight-oats-double-chocolate-1231505531.jpg?format=webp&v=1775647691&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/fa20260212-027-116.pdf?v=1776513712"
  },
  {
    "id": "lab-p-25",
    "title": "Mango Oats",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-oats-pack-of-1-x-6-high-protein-oats-mango-tango-1248483154.jpg?format=webp&v=1783696838&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/High_Protein_Oats_-_Mango_-033.pdf?v=1788249684"
  },
  {
    "id": "lab-p-26",
    "title": "Kulfi Oats",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-oats-pack-of-1-x-6-high-protein-oats-kulfi-masti-1248483153.jpg?format=webp&v=1783696812&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Overnight_Oats_Kulfi_-079.pdf?v=1788249685"
  },
  {
    "id": "lab-p-27",
    "title": "Red Chilli Pickle",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-pickle-300-gms-red-chilly-pickle-natural-sun-dried-1239710632.jpg?format=webp&v=1779377051&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Red_Chilli_pickle.pdf?v=1788249685"
  },
  {
    "id": "lab-p-28",
    "title": "Mango Pickle",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-pickle-300-gms-mango-pickle-natural-sun-dried-1239710636.jpg?format=webp&v=1779377171&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Mango_pickle.pdf?v=1788250646"
  },
  {
    "id": "lab-p-29",
    "title": "Sweet Lemon Pickle",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-pickle-300-gms-sweet-lemon-pickle-natural-sun-dried-1239710634.jpg?format=webp&v=1779377111&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Sweet_lemon_Pickle.pdf?v=1788249685"
  },
  {
    "id": "lab-p-30",
    "title": "Green Chilly Pickle",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-pickle-300-gms-green-chilly-pickle-natural-sun-dried-1239710633.jpg?format=webp&v=1779377079&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/green_chilli_pickle.pdf?v=1788259532"
  },
  {
    "id": "lab-p-31",
    "title": "Lemon Pickle",
    "imgSrc": "https://www.rosierfoods.com/cdn/shop/files/rosier-foods-pickle-300-gms-lemon-pickle-natural-sun-dried-1239710635.jpg?format=webp&v=1779377138&width=360",
    "pdfLink": "https://cdn.shopify.com/s/files/1/0653/2605/5654/files/204-Nimbu_Masala_Pickle.pdf?v=1788266555"
  }
];
