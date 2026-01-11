
import { SlideData } from './types.ts';

export const SLIDES: SlideData[] = [
  {
    id: 0,
    type: 'cover',
    title: 'Google and AFDB',
    subtitle: 'Affordable Device Financing Model Project',
    author: 'Report by CG&R Strategy LLC / Moharram & Partners',
    date: '1/08/2026',
    imageUrl: 'https://technext24.com/wp-content/uploads/2024/11/Literacy-affordability-slow-growth-of-global-mobile-internet-users-as-population-reaches-4.6-billion-1.jpg'
  },
  {
    id: 1,
    type: 'content',
    title: 'Glossary of Terms',
    imageUrl: 'https://www.webhaptic.com/wp-content/uploads/2023/10/image-2.png',
    sections: [
      {
        content: [
          { label: 'AfDB', value: 'African Development Bank. Potential funding and archive source; project partner.' },
          { label: 'BNPL', value: 'Buy Now, Pay Later. Financing mechanism (potential primary driver).' },
          { label: 'CSF', value: 'Critical Success Factor. Key element boosting digital inclusion.' },
          { label: 'FX', value: 'Foreign Exchange. Risk factor in financial modeling.' },
          { label: 'Glo', value: 'Globacom. Mobile Network Operator (MNO) in Nigeria.' },
          { label: 'GSMA', value: 'Global System for Mobile Communications Association. Data source.' },
          { label: 'ITU', value: 'International Telecommunication Union. Data source for baselines.' },
          { label: 'KPIs', value: 'Key Performance Indicators. Metrics for program success.' },
          { label: 'LoIs', value: 'Letters of Intent. Non-binding agreement to secure partner commitment.' },
          { label: 'MNO', value: 'Mobile Network Operator (e.g., MTN, Airtel, Glo, 9mobile).' },
          { label: 'NBS', value: 'National Bureau of Statistics (Nigeria). Data source.' },
          { label: 'NCC', value: 'Nigerian Communications Commission. Regulator in Nigeria.' },
          { label: 'OEM', value: 'Original Equipment Manufacturer (e.g., Transsion, Samsung, Xiaomi).' },
          { label: 'PAYGo', value: 'Pay-As-You-Go. Device financing mechanism, often tied to device-locking.' },
          { label: 'USF/USO', value: 'Universal Service Fund / Universal Service Obligation.' }
        ]
      }
    ]
  },
  {
    id: 2,
    type: 'content',
    title: '1.1 Project Background',
    imageUrl: 'https://eu-images.contentstack.com/v3/assets/blta47798dd33129a0c/blt7b52930f48cbfb17/66d7688eb61079061284408d/767358-6843.jpg',
    sections: [
      {
        heading: 'Background and Objectives',
        content: 'Across Sub-Saharan Africa, the smartphone has become the single most powerful gateway to digital participation, yet the region continues to experience the world’s widest gap between mobile network coverage and actual usage. According to GSMA mobile connectivity index report, as of 2025, roughly 59 percent of people in Sub-Saharan Africa are covered by a mobile-network signal but remain offline, while 15 percent still live outside any mobile connectivity footprint. This dis-connect stems less from network absence than from barriers of device affordability and user capability. For many households, even an entry-level 4G handset can represent more than 80 percent of monthly income.'
      }
    ]
  },
  {
    id: 3,
    type: 'content',
    title: '1.2 Rationale for Financing',
    imageUrl: 'https://assets.sunnewsonline.com/2018/09/CELL-PHONES-1.jpg',
    sections: [
      {
        content: 'The digital landscape itself is evolving rapidly. 4G is expected to reach about half of all mobile connections by 2030, while early 50 deployments will begin adding an estimated $10 billion in annual economic value. However, those gains depend on affordable, capable devices reaching first-time users rather than remaining concentrated among urban elites. At the same time, the price of connectivity has declined globally, yet Africa’s data and device costs remain among the highest relative to average consumer income.'
      }
    ]
  },
  {
    id: 4,
    type: 'content',
    title: '1.3 Why Nigeria as Pilot',
    imageUrl: 'https://technext24.com/wp-content/uploads/2024/08/5.jpg',
    sections: [
      {
        content: 'Nigeria provides an ideal starting point for such intervention. It is Africa’s largest smartphone market and one of its most dynamic digital economies, yet the country still has more than 80 million unconnected adults. It has a relatively low cost of mobile data at about $0.38 per 1 gigabyte (on par with China, Brazil and Ghana) and yet it has one of the lowest mobile data consumption per capita. This suggests that there is head room for driving significantly more smartphone adoption even at current mobile data costs.'
      }
    ]
  },
  {
    id: 5,
    type: 'content',
    title: '1.4 Program Objectives',
    imageUrl: 'https://techafricanews.com/wp-content/uploads/2023/09/portrait-of-handsome-african-man-holding-mobile-ph-2023-08-11-20-53-39-utc-scaled.jpg',
    sections: [
      {
        heading: 'Target Outcomes',
        content: 'Accordingly, the program’s core objective is to design and validate a scalable, financially sustainable model for rapidly accelerating smartphone access—one that combines innovative financing (usage-based credit, BNPL or PAYGo mechanisms), efficient supply chains, and user-centric support systems. Through a structured Nigeria pilot, the project seeks to demonstrate measurable increases in smartphone penetration, usage intensity, and repayment performance.'
      }
    ]
  },
  {
    id: 6,
    type: 'content',
    title: '2. Scope and Workstreams',
    imageUrl: 'https://www.conexusmedstaff.com/wp-content/uploads/2024/11/Taimaka.png',
    sections: [
      {
        heading: '2.1 Overview of Workstreams',
        content: [
          'Workstream 1: Diagnostic Scan of existing smartphone-inclusion efforts, affordability initiatives, and related digital-access programs.',
          'Workstream 2: Success Factors identified demand side and supply side critical success factors (CSFs).',
          'Workstream 3: Nigeria Pilot Blueprint specifies target states, population segments, sequencing, specs, price bands, and channels.',
          'Workstream 4: Continental Market Archetype Framework clusters countries by digital maturity and credit readiness.'
        ]
      }
    ]
  },
  {
    id: 7,
    type: 'content',
    title: '3. Data & Methodology',
    imageUrl: 'https://c76c7bbc41.mjedge.net/wp-content/uploads/tc/2020/04/three_men_using_mobile_phones.jpg',
    sections: [
      {
        heading: '3.1 Secondary Data Sources',
        content: 'Datasets provide the quantitative backbone for measuring smartphone penetration, income distribution, and network coverage. Reports such as the GSMA Mobile Economy Sub-Saharan Africa 2024 and the ITU Facts and Figures 2024 served as primary benchmarks.'
      },
      {
        heading: '3.2 Stakeholder Interviews',
        content: 'A broad range of operators were interviewed: MNOs, insurance companies, aggregator/BNPL tech companies, OEMs, and pay as you go solar / smartphone financing companies. Others included banks, credit guarantee companies and a global public goods entity.'
      }
    ]
  },
  {
    id: 8,
    type: 'content',
    title: '4.1 Context & Economic Imperative',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqZ7rFxKhx_67EsJ2fHD_6wc3RgpnI4S2_Jg&s',
    sections: [
      {
        content: 'Africa faces a critical connectivity deficit. Internet usage is at 38%, significantly below the global average of 68%. High-income countries in comparison are at 93%. Closing this gap is not just a social goal but a fundamental economic imperative.'
      },
      {
        heading: 'SDG Benefits',
        content: [
          'Poverty Reduction: In Senegal, 3G access linked to 14% increase in household consumption and 10% decline in extreme poverty.',
          'Employment opportunities: Stimulating labor force participation especially among women and rural households.',
          'Economic Value: Ecosystem contributing $220 billion (7.7% of GDP) in 2024.'
        ]
      }
    ]
  },
  {
    id: 9,
    type: 'content',
    title: '4.2 Coverage vs Usage Gap',
    imageUrl: 'https://techafricanews.com/wp-content/uploads/2019/11/man-with-mobile-phone.jpg',
    sections: [
      {
        heading: 'Figure 1: Largest Broadband Usage Gap',
        content: {
          type: 'chart',
          chartType: 'grouped-bar',
          data: [
            { label: 'Sub-Saharan Africa', value: 23, secondaryValue: 83, unit: '%' },
            { label: 'Europe', value: 85, secondaryValue: 95, unit: '%' },
            { label: 'Asia Pacific', value: 72, secondaryValue: 90, unit: '%' },
            { label: 'Latin America', value: 70, secondaryValue: 92, unit: '%' },
            { label: 'North America', value: 88, secondaryValue: 99, unit: '%' }
          ]
        }
      },
      {
        content: 'Sub-Saharan Africa (SSA) is the only region where mobile broadband coverage significantly exceeds usage. The current usage gap is 60%—the highest in the world. Adults in rural areas are approximately 49% less likely to use mobile internet than their urban counterparts.'
      }
    ]
  },
  {
    id: 10,
    type: 'content',
    title: '4.3.1 Affordability',
    imageUrl: 'https://technext24.com/wp-content/uploads/2025/01/Nigerians-Mobile-Network-Affordability.jpg',
    sections: [
      {
        content: 'The average 4G smartphone in SSA costs $71. In contrast, a feature phone is 10 times cheaper at $6. $71 is about 80-90% of the average monthly income for the poorest 20% in Sub-Saharan Africa. Only about 10% of the working age population in Nigeria meets the income threshold for outright purchase.'
      },
      {
        heading: 'Policy Pressures',
        content: 'High import tariffs and VAT raise the price by 20%-30% or more. Senegal example: up to $100 on top of base price. Transsion and other brands currently control significant market share but room for improvement remains.'
      }
    ]
  },
  {
    id: 11,
    type: 'content',
    title: '4.3.2 Literacy & 4.3.3 Gender',
    imageUrl: 'https://mediaserver.responsesource.com/press-release/132321/OYA_DEVICE_SCREEN_08.jpg',
    sections: [
      {
        heading: 'Language Barriers',
        content: 'Digital literacy is built on language literacy. To close the gap, manufacturers must incorporate native languages. AI offers a unique opportunity for voice-activated apps in local African languages.'
      },
      {
        heading: 'Gender Gap',
        content: 'The gap between men and women\'s access to mobile internet stands at a stubborn 32% in SSA. Additional constraints limiting usage by women need to be better understood and provided for in the program design.'
      }
    ]
  },
  {
    id: 12,
    type: 'content',
    title: '4.3.4 Cost of Mobile Data',
    imageUrl: 'https://dailypost.ng/wp-content/uploads/2022/05/telephone-.jpeg',
    sections: [
      {
        heading: 'Figure 2: Cost of 1GB Data Worldwide',
        content: {
          type: 'chart',
          data: [
            { label: 'Germany', value: 2.14, unit: ' USD' },
            { label: 'Mexico', value: 1.80, unit: ' USD' },
            { label: 'South Africa', value: 1.77, unit: ' USD' },
            { label: 'United Kingdom', value: 0.62, unit: ' USD' },
            { label: 'Kenya', value: 0.59, unit: ' USD' },
            { label: 'Nigeria', value: 0.38, unit: ' USD' },
            { label: 'China', value: 0.37, unit: ' USD' }
          ]
        }
      },
      {
        content: 'Nigeria has about the same cost of data per gigabyte ($0.38) as Ghana but lags behind in consumption. Findings do not suggest data cost is a significant barrier compared to device affordability.'
      }
    ]
  },
  {
    id: 13,
    type: 'content',
    title: 'Table 1: Policy Call Outs',
    imageUrl: 'https://newsverge.com/wp-content/uploads/2019/07/mobile-phones.jpg',
    sections: [
      {
        heading: 'Strategic Interventions',
        content: [
          { label: 'Device Affordability', value: 'Eliminating duties and tariffs on entry-level smart phones. Localize assembly/manufacturing. Use Free Trade zones.' },
          { label: 'Digital Engagement', value: 'Smartphones with native language voice prompts. Focus on Mobile money, learning, and Telemedicine.' },
          { label: 'Gender', value: 'Shorten time between first (man) and second (woman) device purchase in households.' }
        ]
      }
    ]
  },
  {
    id: 14,
    type: 'content',
    title: '5. Regional Prioritization',
    imageUrl: 'https://static.news.bitcoin.com/wp-content/uploads/2022/01/shutterstock_1769153516.jpg',
    sections: [
      {
        heading: 'Table 2: Regional Investment Priorities',
        content: [
          { label: 'Central Africa', value: 'Barrier: Coverage Gap (39% outside). Priority: Hard Infrastructure CAPEX (Towers, Fiber).' },
          { label: 'Southern, West, & East Africa', value: 'Barrier: Usage Gap (12% outside). Priority: Consumer-Facing Policies (Affordability, Literacy, Gender).' }
        ]
      }
    ]
  },
  {
    id: 15,
    type: 'content',
    title: 'Table 3: Use Cases Overview',
    imageUrl: 'https://xplicitmode.com/wp-content/uploads/2024/11/using-voice-commands-on-a-smartphone.jpg',
    sections: [
      {
        heading: 'Summary of Solutions',
        content: [
          { label: 'Intelligra', value: 'Aggregator / BNPL Tech engine provider for peri-urban and urban consumers.' },
          { label: 'Yellow Solar', value: 'Pay-as-you-go solar and smartphone underwriter for off-grid/low-income customers.' },
          { label: 'MTN', value: 'Leading MNO offering operator-led instalment plans bundled with service contracts.' },
          { label: 'Leadway Insurance', value: 'Credit Guarantee and Product Bundling model for rural farmers.' }
        ]
      }
    ]
  },
  {
    id: 16,
    type: 'content',
    title: '6.3 Intelligra Case Study',
    imageUrl: 'https://cdnph.upi.com/svc/sv/upi_com/4841656330256/2022/1/abb69d015c048b25ee9dbce450bc38f1/Silencing-smartphone-leads-to-more-stress-for-many-people.jpg',
    sections: [
      {
        heading: '6.3.1 Business Model',
        content: 'Buy-Now-Pay-Later (BNPL) scheme where cost is bundled with airtime and insurance, spread over typically 6 to 12 months. Integrates entire value chain: OEMs, MNOs, and financial institutions. Reports 200,000+ subscribers in Nigeria, Tanzania, and Rwanda.'
      },
      {
        heading: '6.3.2 Key Features',
        content: [
          'Underwriting: Customers pre-qualified based on network history using anonymized telco data.',
          'Daily Repayments: Structured as small amounts deducted daily from mobile money accounts.',
          'Device Locking: Critical safeguard via proprietary two-app ecosystem.'
        ]
      }
    ]
  },
  {
    id: 17,
    type: 'content',
    title: '6.4 Yellow Solar Case Study',
    imageUrl: 'https://nigeriancurrent.com/wp-content/uploads/2023/08/Phone-chat-1280x720-1.jpg',
    sections: [
      {
        heading: '6.4.1 Business Model',
        content: 'Initially established as PAYGo solar provider, Yellow leverages operational infrastructure for smartphone financing. Serving 800,000 families across Malawi, Madagascar, DRC, Rwanda, Zambia, Uganda, and Nigeria.'
      },
      {
        heading: '6.4.2 Key Features',
        content: [
          'Sweet Spot: Identified $100–$120 price range as ideal for durability and financing margins.',
          'Interest Rates: Effective APR of 80–100% due to depreciation and default risk.',
          'Underwriting: Agent-led process with high-touch verification in less mature markets.'
        ]
      }
    ]
  },
  {
    id: 18,
    type: 'content',
    title: '6.5 MTN Nigeria Case Study',
    imageUrl: 'https://woodcocknotarypublic.com/wp-content/uploads/Nigerian-SIM-card-post.webp',
    sections: [
      {
        heading: '6.5.1 Business Model',
        content: 'MTN leverages its balance sheet to secure extended credit windows directly with OEMs (90 to 120 days). It then provides a shorter, 60-day credit window to its device financier partners. Aims to scale to 200,000–300,000 devices per year.'
      },
      {
        heading: '6.5.2 Key Features',
        content: [
          'Targeted Outreach: Actively campaigns to existing feature phone customers to upgrade.',
          'Retail Integration: Device financiers stock and refill devices in existing retail stores.',
          'Service Bundling: Fixed price includes data, voice, and free access to apps like Facebook Basics.'
        ]
      }
    ]
  },
  {
    id: 19,
    type: 'content',
    title: '6.5.3 Behavioral Insights',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D12AQFJl5C10FbmTQ/article-cover_image-shrink_720_1280/B4DZozvn89IMAI-/0/1761804719533?e=2147483647&v=beta&t=f2Z-HrkDqJRE-W7Lnt6Iv5gmQNLZ8WVpMB7BonU2Gic',
    sections: [
      {
        heading: 'Unique Behaviors Observed',
        content: 'MTN noted seasonal sale of smartphones by farming communities in the Northern region (April to September) to buy seeds, followed by re-purchase during harvest. Financing solutions must be tailored to these cash-flow cycles. Also noted low appetite for health/life insurance bundling due to cultural beliefs.'
      }
    ]
  },
  {
    id: 20,
    type: 'content',
    title: '6.6 Leadway Assurance',
    imageUrl: 'https://cdn.guardian.ng/wp-content/uploads/2022/03/SHAREit-Lite-Image-for-PR9.jpg',
    sections: [
      {
        heading: '6.6.1 Overview',
        content: 'Strategically invested in agricultural sector. Transitioning from area-yield index insurance (AYII) to accurate, specific parametric insurance via smartphones. Provides digital traceability and secure digital identity for farmers.'
      },
      {
        heading: '6.6.2 Key Features',
        content: 'Leadway provides a partial credit guarantee (20-30% first loss) to Micro Finance bank/Fintech partners. This lowers the lender\'s risk and unlocks scarce capital. Repayment timed to coincide with harvest cycles.'
      }
    ]
  },
  {
    id: 21,
    type: 'content',
    title: 'Table 4: Leadway Partner Roles',
    imageUrl: 'https://www.geopoll.com/wp-content/uploads/2021/04/woman-showing-phone_small_2.jpg',
    sections: [
      {
        heading: 'Value Proposition Matrix',
        content: [
          { label: 'Leadway Assurance', value: 'Credit Risk Guarantee & Product Bundling. Provides first-loss layer.' },
          { label: 'MFBs / Fintechs', value: 'Asset Financing and Repayment Infrastructure. Manages loan origination.' },
          { label: 'Smartphone OEMs', value: 'Supply and Device-Lock Technology. Provides discounted devices.' },
          { label: 'Energy Partners', value: 'Charging and Energy Access (DAERS/SE4ALL) for rural farmers.' }
        ]
      }
    ]
  },
  {
    id: 22,
    type: 'content',
    title: '7. Lessons for Pilot Design',
    imageUrl: 'https://www.tekedia.com/wp-content/uploads/2022/06/mobile-cash-phone-fintech-768x576.jpg',
    sections: [
      {
        heading: '7.1 Cross Cutting Insights',
        content: [
          'Open architecture involving multiple participants (MNOs, OEMs, YellowSolar, Leadway).',
          'Incorporate alternative credit scoring for thin file consumers.',
          'Align repayment with informal income cycles (daily mobile money deductions).',
          'Rural needs such as electricity must be incorporated into the design.'
        ]
      },
      {
        heading: '7.2 Architecture Implications',
        content: 'Deploy AFDB funds strategically within the risk stack to mobilize private capital. Minimize reliance on subsidies. Align deposit structures and repayment cycles to consumer income.'
      }
    ]
  },
  {
    id: 23,
    type: 'content',
    title: '8.1 Adoption Targets',
    imageUrl: 'https://naijalifemagazine.com/blog/wp-content/uploads/2018/03/84-OF-NIGERIANS-NOW-USE-MOBILE-PHONE-%E2%80%93-REPORT.jpg',
    sections: [
      {
        heading: 'Market Sizing',
        content: 'Relatively high device costs and interest rates currently constrain existing programs. A reasonable base target for this program would be that at least 30% of the 80 million unconnected adult Nigerians (about 24 million people) migrate to smartphones by the end of year 5.'
      }
    ]
  },
  {
    id: 24,
    type: 'content',
    title: 'Table 5: Minimum Specs',
    imageUrl: 'https://techafricanews.com/wp-content/uploads/2023/11/black-woman-typing-on-mobile-phone-during-night-2023-08-11-18-03-01-utc-1024x683.jpg',
    sections: [
      {
        heading: '8.2.1 Desirable Specifications',
        content: [
          { label: 'Network', value: 'Multi-sim, 4G LTE enabled, Wi-Fi 802.11ac, Bluetooth, GPS.' },
          { label: 'Display/OS', value: '≥5.5–6.0ʺ, HD+ (≈720×1600), Android 14 or above.' },
          { label: 'Battery', value: '≥4 000 mAh (ideally 5 000 mAh), USB-C port.' },
          { label: 'Storage', value: 'Minimum 3 GB RAM, Micro SD slot.' }
        ]
      }
    ]
  },
  {
    id: 25,
    type: 'content',
    title: 'Table 6: DDI Analysis',
    imageUrl: 'https://www.dhl.com/discover/adobe/dynamicmedia/deliver/dm-aid--bedc2cf4-3af6-41ba-8120-882cf6d77248/what-this-means-for-businesses.png?preferwebp=true&quality=82',
    sections: [
      {
        heading: '8.2.3 Disposable Income % Required',
        content: [
          { label: '$1.39 DDI (Informal)', value: 'Requires 2160.0% of DDI for $30 phone purchase.' },
          { label: '$2.78 DDI (Informal)', value: 'Requires 1080.0% of DDI for $30 phone purchase.' },
          { label: '$9.72 DDI (Formal)', value: 'Requires 308.6% of DDI for $30 phone purchase.' },
          { label: '$27.78 DDI (Formal)', value: 'Requires 108.0% of DDI for $30 phone purchase.' }
        ]
      }
    ]
  },
  {
    id: 26,
    type: 'content',
    title: 'Table 7: Payback period',
    imageUrl: 'https://img.freepik.com/free-photo/person-reading-cell-phone-messages_23-2150409981.jpg?semt=ais_hybrid&w=740&q=80',
    sections: [
      {
        heading: 'Number of Days @ 10% DDI',
        content: {
          type: 'chart',
          chartType: 'grouped-bar',
          data: [
            { label: '$60 device', value: 432, secondaryValue: 86, unit: ' days' },
            { label: '$70 device', value: 504, secondaryValue: 100, unit: ' days' },
            { label: '$80 device', value: 576, secondaryValue: 115, unit: ' days' },
            { label: '$100 device', value: 720, secondaryValue: 144, unit: ' days' }
          ]
        }
      },
      {
        content: 'Primary metric: $1.39 DDI earners. Comparative: $6.94 DDI earners. For lowest income earners, a multi-year subscription is more applicable.'
      }
    ]
  },
  {
    id: 27,
    type: 'content',
    title: '8.3 Supply-Side Success',
    imageUrl: 'https://img.globalcitizen.org/OKvWYJ-xbw4mRN-ZcEtGLZKxidgaRgQLLTKaRx5D/1600x900%2Ffilters%3Aquality%2885%29%3Afocal%28615%2C410%29%2Fhttps%3A%2F%2Fmedia.globalcitizen.org%2F9f%2F4d%2F9f4d1e5f-f859-4dba-8a80-d104c098187e%2F1230.jpeg',
    sections: [
      {
        content: [
          'Open program to multiple participants to go TO the consumer.',
          'Eliminate/reduce upstream costs (customs duties/tariffs). Shaves 10% off cost.',
          'Low initial deposits (10%-20%). Where possible, no initial deposits.',
          'Daily or weekly mobile wallet deductions to align with cash flow.',
          'Digital repayment tracking and remote device lock/shutdown to reduce default.'
        ]
      }
    ]
  },
  {
    id: 28,
    type: 'content',
    title: '9.1 Model 1: Blended Finance',
    imageUrl: 'https://img.globalcitizen.org/SKvbUWKmTU76MrP_exggwCW5U2cmwxwLZonMnUhU/1600x900%2Ffilters%3Aquality%2885%29%3Afocal%281500%2C600%29%2Fhttps%3A%2F%2Fmedia.globalcitizen.org%2Fd3%2F49%2Fd349fddc-30d5-4483-a941-9d260d76f161%2Frawpixel-woman-using-phone-unsplash-hero.jpg',
    sections: [
      {
        heading: 'BNPL Model',
        content: 'Built upon blended financing powered by AFDB’s credit guarantee, technology-driven risk mitigation, and collaboration. More applicable for consumers with a minimum $5 daily disposable income (Likely monthly wage earners).'
      },
      {
        heading: 'Participants',
        content: 'AfDB, Google, MNOs, Fintechs, OEMs, Distributors, Retailers, Aggregators, Credit guarantee companies, and Insurance.'
      }
    ]
  },
  {
    id: 29,
    type: 'content',
    title: 'Table 8: Model 1 Risks',
    imageUrl: 'https://arkesel.com/wp-content/uploads/2024/09/83357.jpg',
    sections: [
      {
        heading: 'Mitigation Strategies',
        content: [
          { label: 'Inertia & Friction', value: '10% downpayment, daily manageable deductions, preload social/edu apps.' },
          { label: 'Scale & Default', value: 'Tiered underwriting, DMS (locking/disabling), include offline acquirers.' },
          { label: 'Reliability', value: 'Cross-Channel Credit Reporting. Mandate real-time reporting of defaults.' },
          { label: 'Collaboration', value: 'Shared KPIs to force collaboration toward the set goal.' }
        ]
      }
    ]
  },
  {
    id: 30,
    type: 'content',
    title: '9.2 Model 2: Smartphone-as-a-Service',
    imageUrl: 'https://techafricanews.com/wp-content/uploads/2025/08/telecom-6.png',
    sections: [
      {
        heading: 'Subscription Model',
        content: 'Aimed at low-income earners for whom standard BNPL terms pose a barrier. Flips adoption intent from ownership to a lease. Requires only one key player (OEM or MNO) to take balance sheet risk supported by low interest financing.'
      },
      {
        heading: 'Optimizing Uptake',
        content: 'Offer zero upfront costs, simple tiered pricing, bundled services (data, maintenance), and regular upgrades every 5 years.'
      }
    ]
  },
  {
    id: 31,
    type: 'content',
    title: 'Table 9: Model 2 Risks',
    imageUrl: 'https://thebest.credit/wp-content/uploads/2025/08/cover-image-cover-1.png',
    sections: [
      {
        heading: 'Mitigation Strategies',
        content: [
          { label: 'Inertia & Distrust', value: 'No upfront cost. Single all-inclusive daily price (e.g. N100/day).' },
          { label: 'Payment Default', value: 'Auto-debit, micro-savings pockets, USSD approval mechanisms.' },
          { label: 'Asset Management', value: 'Strong retrieval rewards (instant data boost). Upgrade bonuses.' },
          { label: 'Device Condition', value: '“Health Score” app inside phone tracking battery/scratches.' }
        ]
      }
    ]
  },
  {
    id: 32,
    type: 'content',
    title: '10. Roll-Out Strategy',
    imageUrl: 'https://d27735ao2xxhhe.cloudfront.net/blog/pro/money-transfer-shortcut-every-nigerian-in-malta-should-know-600x400692da57f2352e1764599167.png',
    sections: [
      {
        heading: '10.1 Coverage-Led Logic',
        content: 'Phased roll out primarily driven by density of 4G coverage and penetration deficit at State level. Based on current map, 4G coverage is concentrated in Southern and Central States.'
      },
      {
        heading: '10.2 Selection Process',
        content: 'Recommended using smartphone penetration by State to determine rollout priority. States with dense 4G coverage but penetration < 100 per 100 people are primary targets.'
      }
    ]
  },
  {
    id: 33,
    type: 'content',
    title: 'Table 10: Pilot Group 1',
    imageUrl: 'https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2025-09/KEN_6954%20%281%29.jpg?h=edb91006&itok=ghPXu-KO',
    sections: [
      {
        heading: 'High Coverage, Low Penetration',
        content: [
          { label: 'Lagos', value: 'Target: 885,894 consumers. (Penetration: 144.8)' },
          { label: 'Kano', value: 'Target: 3,580,226 consumers. (Penetration: 61.9)' },
          { label: 'Abia', value: 'Target: 745,497 consumers. (Penetration: 70.1)' },
          { label: 'Rivers', value: 'Target: 1,014,887 consumers. (Penetration: 78.7)' }
        ]
      },
      {
        content: 'Total Addressable Target for Group 1: 14,186,563 consumers.'
      }
    ]
  },
  {
    id: 34,
    type: 'content',
    title: 'Table 11: Pilot Group 2',
    imageUrl: 'https://babbangona.com/wp-content/uploads/2025/05/image_fx-31--768x419.jpg',
    sections: [
      {
        heading: '3G-Dominant States',
        content: [
          { label: 'Niger', value: 'Target: 476,115 consumers. (Penetration: 88.4)' },
          { label: 'Bauchi', value: 'Target: 2,657,975 consumers. (Penetration: 45.1)' },
          { label: 'Ebonyi', value: 'Target: 1,047,086 consumers. (Penetration: 45.4)' },
          { label: 'Adamawa', value: 'Target: 942,502 consumers. (Penetration: 68.8)' }
        ]
      },
      {
        content: 'Total Addressable Target for Group 2: 8,965,789 consumers.'
      }
    ]
  },
  {
    id: 35,
    type: 'content',
    title: 'Youth & Sector Targeting',
    imageUrl: 'https://techafricanews.com/wp-content/uploads/2023/07/a-young-beautiful-african-market-woman-feeling-hap-2022-12-22-23-45-51-utc-scaled.jpeg',
    sections: [
      {
        heading: '10.5 Mobility & Workforce',
        content: 'Youth aged 20-30 comprise 40% of SSA workforce but 60% of drivers in mobility/delivery platforms. Motorcycle imports set to double by 2030. Mobility platforms provide loans and depend on smartphones for management. Win-win alignment.'
      }
    ]
  },
  {
    id: 36,
    type: 'content',
    title: 'Table 12: Governance',
    imageUrl: 'https://i.natgeofe.com/n/fbbf43be-ed2f-4918-8d37-41d3b0d46dcb/02cellphonesfarmer.jpg',
    sections: [
      {
        heading: 'Hub and Spokes Framework',
        content: [
          { label: 'Central (Hub)', value: 'Overarching PMO, Common KPIs, participant selection, publishing performance.' },
          { label: 'Individual (Spokes)', value: 'Individual project office, company-specific KPIs, risk/interest tiering.' }
        ]
      },
      {
        content: 'Central Hub intervenes to redeploy blended finance based on run-rate of KPI performance.'
      }
    ]
  },
  {
    id: 37,
    type: 'content',
    title: 'Portfolio Guarantee Stack',
    imageUrl: 'https://qz.com/cdn-cgi/image/width=1920,quality=85,format=auto/https://assets.qz.com/media/f4bed222a47062c42ef0d27563ca6931.jpg',
    sections: [
      {
        heading: 'Risk Layering',
        content: [
          'Senior Protection: AfDB AAA guarantees layered above market support.',
          'First Loss: OEMs, MNOs, and aggregators absorb initial losses.',
          'Subsidy Layer: MNOs leverage balance sheets to reduce borrower costs.',
          'Participating Lenders: DFIs, Banks, and Fintechs extend affordable credit.'
        ]
      }
    ]
  },
  {
    id: 38,
    type: 'content',
    title: 'Appendices',
    imageUrl: 'https://images.pexels.com/photos/33418517/pexels-photo-33418517/free-photo-of-nigerian-man-in-traditional-attire-using-phone-outdoors.jpeg',
    sections: [
      {
        heading: 'Bibliography & Figures',
        content: [
          'GSMA Mobile Economy Sub-Saharan Africa 2024.',
          'ITU Facts and Figures 2024.',
          'World Bank, Taxes and Parafiscal Fees 2024.',
          'Figure 1-6: Coverage, Cost, Process Simulations, and Density maps.'
        ]
      }
    ]
  }
];
