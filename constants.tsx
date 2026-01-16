import { SlideData } from './types.ts';

export const SLIDES: SlideData[] = [
  {
    id: 0,
    type: 'cover',
    title: 'Google and AFDB',
    subtitle: 'Abridged version of the Report by CG&R Strategy LLC / Moharram & Partners',
    author: '• Juliet Anammah – janammah@cgandrstrategy.com\n• Linda Quaynor – lindaq@vircancapital.com\n• Mai Ali – maiali@moharram-partners.com',
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
          { label: 'AfDB', value: 'African Development Bank. Potential funding and project partner.' },
          { label: 'BNPL', value: 'Buy Now, Pay Later. Financing mechanism identified as a potential primary driver.' },
          { label: 'CSF', value: 'Critical Success Factor. Key element reliably boosting digital inclusion.' },
          { label: 'FX', value: 'Foreign Exchange. Risk factor in financial modeling.' },
          { label: 'Glo', value: 'Globacom. Mobile Network Operator (MNO) in Nigeria.' },
          { label: 'GSMA', value: 'Global System for Mobile Communications Association. Data source.' },
          { label: 'ITU', value: 'International Telecommunication Union. Data source for quantifying regional baselines.' },
          { label: 'KPIs', value: 'Key Performance Indicators. Metrics for measuring the pilot program’s success.' },
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
        content: 'Across Sub-Saharan Africa, the smartphone has become the single most powerful gateway to digital participation, yet the region continues to experience the world’s widest gap between mobile network coverage and actual usage. As of 2025, roughly 59 percent of people in Sub-Saharan Africa are covered by a mobile-network signal but remain offline. This disconnect stems less from network absence than from barriers of device affordability and user capability. For many households, even an entry-level 4G handset can represent more than 80 percent of monthly income.'
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
        content: 'The digital landscape is evolving rapidly. 4G is expected to reach about half of all mobile connections by 2030, while early 5G deployments will begin adding an estimated $10 billion in annual economic value. However, those gains depend on affordable, capable devices reaching first-time users rather than remaining concentrated among urban elites. Currently, Africa’s data and device costs remain among the highest relative to average consumer income.'
      }
    ]
  },
  {
    id: 4,
    type: 'content',
    title: '1.3 Why Nigeria as Pilot',
    imageUrl: 'https://technext24.wpengine.com/wp-content/uploads/2024/08/5.jpg',
    sections: [
      {
        content: 'Nigeria provides an ideal starting point. It is Africa’s largest smartphone market, yet still has more than 80 million unconnected adults. It has a relatively low cost of mobile data at about $0.38 per 1 gigabyte, yet one of the lowest mobile data consumption per capita. This suggests significant headroom for driving smartphone adoption if structural barriers like affordability are addressed.'
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
        content: 'The program’s core objective is to design a scalable, financially sustainable model for rapidly accelerating smartphone access. This combines innovative financing (usage-based credit, BNPL or PAYGo mechanisms), efficient supply chains, and user-centric support systems. The project seeks to demonstrate measurable increases in smartphone penetration, usage intensity, and repayment performance.'
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
          'Workstream 1: Africa-Wide Diagnostic Scan of existing smartphone-inclusion efforts and affordability initiatives.',
          'Workstream 2: Critical Success Factors (CSF) identification for demand and supply sides.',
          'Workstream 3: Nigeria Pilot Blueprint specifying target states, population segments, and financial architecture.'
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
        heading: '3.1 Data Gathering',
        content: 'The methodology involved secondary data synthesis from global bodies like GSMA, ITU, AfDB, and the World Bank, alongside national regulators like the NCC and NBS.'
      },
      {
        heading: '3.2 Stakeholder Interviews',
        content: 'Broad range of operators interviewed: MNOs, insurance companies, aggregator/BNPL tech companies, OEMs, and PAYGo solar providers. Selected for their high interest in expanding smartphone penetration.'
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
        content: 'Africa faces a critical connectivity deficit. Internet usage is at 38%, significantly below the global average of 68%. Closing this gap is a fundamental economic imperative. The mobile ecosystem contributed $220 billion (7.7% of GDP) in 2024, projected to rise to $270 billion by 2030.'
      },
      {
        heading: 'Socioeconomic Upliftment',
        content: [
          'Poverty Reduction: 3G access linked to 14% increase in household consumption and 10% decline in extreme poverty (e.g., Senegal).',
          'Employment: Stimulating labor force participation among women and rural households.',
          'Infrastructure: Smartphones transform network coverage into actual economic value in the hands of consumers.'
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
        heading: 'Sub-Saharan Africa Usage Disparity',
        content: [
          { label: 'Network Coverage', value: '83% of population' },
          { label: 'Actual Usage', value: '23% of population' },
          { label: 'The Usage Gap', value: '60% (The highest in the world)' }
        ]
      },
      {
        content: 'SSA is the only region where coverage significantly exceeds usage. This usage gap reflects the fact that millions live within range of a signal but cannot afford the devices or lack the literacy to use them. Adults in rural areas are approximately 49% less likely to use mobile internet than their urban counterparts.'
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
        content: 'The average 4G smartphone in SSA costs $71, roughly 80-90% of the monthly income for the poorest 20%. In contrast, a feature phone is 10 times cheaper at $6. This explains why the gap in usage remains difficult to close without intervention.'
      },
      {
        heading: 'Structural Barriers',
        content: 'High import tariffs and VAT raise prices by 20%-30%.'
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
        heading: 'Digital Literacy Barriers',
        content: 'Language literacy prevents users from effectively utilizing smartphones. App developers must incorporate native languages. AI offers unique opportunities for voice-activated apps to overcome these twin barriers.'
      },
      {
        heading: 'The Gender Gap',
        content: 'Access to mobile internet for women lags men by 32% in SSA. Constraints including culture and affordability limit usage by women, requiring specific focus in program design.'
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
        heading: 'Cost of 1GB Data (USD)',
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
        content: 'Nigeria has a relatively low cost of data ($0.38/GB), suggesting that data cost is NOT a primary barrier. The bottleneck remains device affordability and digital literacy.'
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
        heading: 'Action for Funders/Governments',
        content: [
          { label: 'Device Affordability', value: 'Eliminate duties/tariffs on entry-level phones. Localize assembly/manufacturing where feasible to drive out costs.' },
          { label: 'Digital Engagement', value: 'Support native language accessibility and voice prompts. Focus on applications that drive immediate impact and productivity e.g Mobile money, learning, and Telemedicine.' },
          { label: 'Gender', value: 'Offer the right financing model to help poor households afford more than one smartphone when transitioning from feature phones. This will increase access for women' }
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
          { label: 'Central Africa', value: 'Barrier: Coverage Gap (39% affected). Priority: Hard Infrastructure CAPEX (Towers, Fiber).' },
          { label: 'Southern, West, & East Africa', value: 'Barrier: Usage Gap (12% outside coverage). Priority: Consumer-Facing Policies (Affordability, Literacy, Gender).' }
        ]
      }
    ]
  },
  {
    id: 15,
    type: 'content',
    title: 'Key Interviews',
    imageUrl: 'https://xplicitmode.com/wp-content/uploads/2024/11/using-voice-commands-on-a-smartphone.jpg',
    sections: [
      {
        heading: 'Key Roles in Device Financing',
        content: [
          { label: 'Intelligra', value: 'Aggregator/BNPL engine provider for peri-urban and urban consumers.' },
          { label: 'Yellow Solar', value: 'PAYGO solar and smartphone underwriter for off-grid/low-income customers.' },
          { label: 'MTN', value: 'Leading MNO offering operator-led plans and bundled services.' },
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
        content: 'Buy-Now-Pay-Later (BNPL) scheme where cost is bundled with airtime and insurance. Integrates entire value chain (OEMs, MNOs, Financiers). Reports 200,000+ subscribers across three countries.'
      },
      {
        heading: '6.3.2 Key Features',
        content: [
          'Underwriting: Customers pre-qualified based on network history (telco data as credit score substitute).',
          'Daily Repayments: Affordable amounts deducted daily from mobile money accounts to reduce risk.',
          'Device Locking: Proprietary technology manages default risk.'
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
        content: 'Hybrid model established as PAYGo solar provider, expanding into smartphone financing. Serves unbanked customers in remote and peri-urban areas. Active in seven countries.'
      },
      {
        heading: '6.4.2 Key Features',
        content: [
          'Risk: Yellow takes on full credit risk; firm settles directly with retailers.',
          'Underwriting: High-touch, agent-led process using underwriters and guarantors.',
          'Pricing: identified $100–$120 as the "sweet spot" to avoid breakage and default risks associated with low-end devices.'
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
        content: 'MTN acts as the central pillar, connecting OEMs, Financiers, and Retail networks. Uses its balance sheet to secure extended credit windows (90-120 days), lowering finance costs for consumers.'
      },
      {
        heading: '6.5.2 Key Features',
        content: [
          'Credit Scoring: Cross-references applicants against internal data (e.g., MTN XtraTime).',
          'Targeted Outreach: Campaigns to existing feature phone users to upgrade.',
          'Device Locking: Third-party technology varies in cost ($4 to $15 per device).'
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
        content: 'Seasonal smartphone sales in Northern Nigeria (April-Sept) for farming needs, followed by re-purchase during harvest. Financing solutions could be tailored to these cycles. Preference for data and digital access over health/life insurance bundling.'
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
        content: 'Focuses on rural farmers, bundling smartphones with parametric climate-smart insurance. Smartphones provide digital traceability and identity, critical for accessing future credit.'
      },
      {
        heading: '6.6.2 Key Features',
        content: 'Provides a partial credit guarantee (20-30% first loss) to unlock scarce MFB capital. Smartphones are pre-loaded with Leadway applications for mandatory crop insurance.'
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
        heading: 'Partner Value Proposition',
        content: [
          { label: 'Leadway Assurance', value: 'Credit Risk Guarantee & Product Bundling. Provides first-loss layer.' },
          { label: 'MFBs / Fintechs', value: 'Asset Financing and Repayment Infrastructure. Manages origination.' },
          { label: 'Smartphone OEMs', value: 'Supply and Device-Lock Technology. Discounted devices.' },
          { label: 'DAERS/SE4ALL', value: 'Charging and Energy Access. Ensures devices remain powered.' }
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
          'Design open architecture involving multiple direct and indirect participants.',
          'Incorporate alternative credit scoring for thin-file consumers.',
          'Align repayment structures with informal daily income cycles.',
          'Incorporate access to electricity into the rural design.'
        ]
      },
      {
        heading: '7.2 Architecture Implications',
        content: 'Use blended finance strategically (AfDB funds in risk stack). Eliminate upstream costs like duties. Product bundles create stronger and stickier value propositions.'
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
        content: 'Base target: migrate at least 30% of the 80 million unconnected adult Nigerians (about 24 million people) to smartphones by the end of year 5. Current programs are constrained by high device costs and interest rates.'
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
        heading: 'Demand-Side Success Factors',
        content: [
          { label: 'Network', value: 'Multi-sim, 4G LTE enabled, Wi-Fi 802.11ac, Bluetooth, GPS.' },
          { label: 'Display/OS', value: '≥5.5–6.0ʺ, HD+ display, Android 14 or above.' },
          { label: 'Battery', value: '≥4 000 mAh, USB-C port, ideally removable.' },
          { label: 'Storage', value: 'Minimum 3 GB RAM, Micro SD slot.' }
        ]
      }
    ]
  },
  {
    id: 25,
    type: 'content',
    title: 'Table 6: Daily disposable income (DDI) Analysis',
    imageUrl: 'https://www.dhl.com/discover/adobe/dynamicmedia/deliver/dm-aid--bedc2cf4-3af6-41ba-8120-882cf6d77248/what-this-means-for-businesses.png?preferwebp=true&quality=82',
    sections: [
      {
        heading: 'Daily Disposable Income Analysis',
        content: [
          { label: '$1.39 DDI', value: 'Over 2000% of DDI required for outright purchase of $30 device.' },
          { label: '$9.72 DDI', value: 'Only 308% of DDI required for the same $30 device purchase.' }
        ]
      },
      {
        content: 'Using 10% of DDI as a measure of affordability, for lower income consumers even a $30 is still relatively expensive. For this population segment (estimated at 37% of total target) a typical 6 -12 month BNPL model will likely not drive adoption.'
      }
    ]
  },
  {
    id: 26,
    type: 'content',
    title: 'Total Cost of Ownership vs Payback Period',
    imageUrl: 'https://technext24.com/wp-content/uploads/2023/06/Mobile-phone.jpg',
    sections: [
      {
        heading: 'Table 7: Payback period at various daily disposable incomes',
        content: [
          { label: '$60 TCO', value: '432 days to payback (at 10% DDI)' },
          { label: '$70 TCO', value: '504 days to payback (at 10% DDI)' },
          { label: '$80 TCO', value: '576 days to payback (at 10% DDI)' }
        ]
      }
    ]
  },
  {
    id: 27,
    type: 'content',
    title: 'Critical Success Factors',
    imageUrl: 'https://technext24.com/wp-content/uploads/2023/11/Smartphone-users-1.jpg',
    sections: [
      {
        heading: 'Strategic Pillars for Pilot Success',
        content: [
          'Minimum order quantity commitment for OEMs to produce phones at or below $30',
          'Retail / Distribution must go to the consumer where they are; don’t force them to come to you.',
          'Eliminate customs duties/tariffs on entry-level 4G phones (shaves an estimated 10% in landed cost).',
          'Plan for low initial deposits (10%-20%) or zero upfront where possible.',
          'Daily or weekly deductions aligning with informal economy cash flows.',
          'Deploy AFDB guarantees in the risk stack to mobilize private sector capital.'
        ]
      }
    ]
  },
  {
    id: 28,
    type: 'content',
    title: 'BNPL Model Overview',
    imageUrl: 'https://techafricanews.com/wp-content/uploads/2022/08/Mobile-Payment-Africa.jpg',
    sections: [
      {
        heading: 'Model Specifications',
        content: '<ul class="list-disc pl-5 space-y-2"><li>Built upon blended financing powered by AFDB’s credit guarantee and technology-driven risk mitigation.</li><li>Most applicable for consumers with a minimum $5 daily disposable income, likely monthly wage earners.</li></ul>'
      },
      {
        heading: 'Participants',
        content: '<ul class="list-disc pl-5 space-y-2"><li>AfDB, Google, MNOs, Fintechs, OEMs, Distributors, Retailers, Aggregators, Credit guarantee companies, and Insurance.</li></ul>'
      }
    ]
  },
  {
    id: 29,
    type: 'content',
    title: 'Table 8: Model 1 Risks',
    imageUrl: 'https://technext24.com/wp-content/uploads/2024/01/Business-Data-Analytics.jpg',
    sections: [
      {
        heading: 'Mitigation Strategies',
        content: [
          { label: 'Consumer Inertia', value: 'Lower downpayment (10% of cost). Daily manageable deductions.' },
          { label: 'Scale & Default', value: 'Implement Tiered underwriting. Include device management systems (DMS).' },
          { label: 'Reliability', value: 'Cross-Channel Credit Reporting. Mandate real-time reporting of defaults.' },
          { label: 'Collaboration', value: 'Evaluate all partners on the same set of KPIs to force collaboration.' }
        ]
      }
    ]
  },
  {
    id: 30,
    type: 'content',
    title: '9.2 Model 2: Smartphone-as-a-Service',
    imageUrl: 'https://techafricanews.com/wp-content/uploads/2023/06/Digital-Services-Africa.jpg',
    sections: [
      {
        heading: 'Subscription Model',
        content: 'Flips adoption intent from ownership to a lease. Aimed at low-income earners for whom standard BNPL poses a barrier. Requires entry-level 4G devices priced below $30.'
      },
      {
        heading: 'Business Engine',
        content: 'Zero upfront costs, tiered pricing, and bundled services. Can be profitable through low procurement costs, ancillary revenue (ads, insurance), and high customer lifetime value.'
      }
    ]
  },
  {
    id: 31,
    type: 'content',
    title: 'Table 9: Model 2 Risks',
    imageUrl: 'https://technext24.com/wp-content/uploads/2024/02/Security-and-Risk.jpg',
    sections: [
      {
        heading: 'Mitigation Strategies',
        content: [
          { label: 'Consumer Distrust', value: 'All-inclusive single price (e.g., N100/day). No hidden charges.' },
          { label: 'Payment Default', value: 'Auto-debit, USSD approval, micro-savings pockets.' },
          { label: 'Asset Management', value: 'Strong reinforcement with guaranteed rewards for returning old devices.' },
          { label: 'Device Condition', value: 'Condition bonus at upgrade. "Health Score" app inside phone.' }
        ]
      }
    ]
  },
  {
    id: 32,
    type: 'content',
    title: '10. Roll-Out Strategy',
    imageUrl: 'https://technext24.com/wp-content/uploads/2023/12/Logistics-Tech-Nigeria.jpg',
    sections: [
      {
        heading: '10.1 Coverage-Led Phasing',
        content: 'Phased roll-out driven by density of 4G coverage and penetration deficit. Concentration in Southern and Central States. Strategy focuses on high-coverage states where penetration among adults is still less than 100%.'
      },
      {
        heading: '10.2 Targeted Pilot Groups',
        content: 'Pilot Group 1 focuses on high-coverage, low-penetration states. Pilot Group 2 focuses on 3G-dominant states for broader inclusion.'
      }
    ]
  },
  {
    id: 33,
    type: 'content',
    title: 'Table 10: Pilot Group 1',
    imageUrl: 'https://technext24.com/wp-content/uploads/2024/05/Nigerian-Market.jpg',
    sections: [
      {
        heading: 'High Coverage, Low Penetration (Included Pilot States)',
        content: [
          { label: 'Kano', value: 'Penetration: 61.9 | Target: 3,580,226' },
          { label: 'Kaduna', value: 'Penetration: 85.5 | Target: 786,034' },
          { label: 'Imo', value: 'Penetration: 62.0 | Target: 1,312,682' },
          { label: 'Abia', value: 'Penetration: 70.1 | Target: 745,497' },
          { label: 'Enugu', value: 'Penetration: 69.7 | Target: 885,894' },
          { label: 'Cross River', value: 'Penetration: 51.6 | Target: 1,271,213' },
          { label: 'Akwa Ibom', value: 'Penetration: 58.0 | Target: 1,594,387' },
          { label: 'Osun', value: 'Penetration: 89.6 | Target: 298,834' },
          { label: 'Anambra', value: 'Penetration: 68.8 | Target: 1,204,194' }
        ]
      },
      {
        heading: 'Exclusion Criteria',
        content: 'In accordance with the report, states with penetration rates above 100 (Lagos, FCT, Ogun, Oyo, Edo, Delta) were excluded from the initial pilot targeting to focus on the unconnected.'
      }
    ]
  },
  {
    id: 34,
    type: 'content',
    title: 'Table 11: Pilot Group 2',
    imageUrl: 'https://techafricanews.com/wp-content/uploads/2021/09/Connectivity-Rural-Africa.jpg',
    sections: [
      {
        heading: '3G-Dominant States',
        content: [
          { label: 'Bauchi', value: 'Target: 2,657,975 consumers. (Penetration: 45.1)' },
          { label: 'Ebonyi', value: 'Target: 1,047,086 consumers. (Penetration: 45.4)' },
          { label: 'Gombe', value: 'Target: 885,871 consumers. (Penetration: 58.7)' },
          { label: 'Adamawa', value: 'Target: 942,502 consumers. (Penetration: 68.8)' }
        ]
      },
      {
        content: 'Total Addressable Target for Group 2: ~8,965,789 consumers.'
      }
    ]
  },
  {
    id: 35,
    type: 'content',
    title: 'Youth & Sector Targeting',
    imageUrl: 'https://technext24.com/wp-content/uploads/2024/08/Young-Entrepreneurs-Africa.jpg',
    sections: [
      {
        heading: '10.5 Mobility & Drivers',
        content: 'Youth aged 20-30 comprise 40% of SSA workforce but 60% of drivers. Mobility platforms (motorcycle/delivery) provide ideal entry points as they depend on smartphones for business. Win-win alignment for on-boarding youth.'
      }
    ]
  },
  {
    id: 36,
    type: 'content',
    title: 'Table 12: Governance',
    imageUrl: 'https://technext24.com/wp-content/uploads/2023/09/Governance-Board.jpg',
    sections: [
      {
        heading: 'Hub and Spokes Framework',
        content: [
          { label: 'Central (Hub)', value: 'Overarching PMO, Common KPIs, participant selection, and performance transparency.' },
          { label: 'Individual (Spokes)', value: 'Individual project office management. Freedom to create risk/interest tiers.' }
        ]
      }
    ]
  },
  {
    id: 37,
    type: 'content',
    title: 'Monitoring & Evaluation',
    imageUrl: 'https://technext24.com/wp-content/uploads/2024/03/KPI-Dashboard.jpg',
    sections: [
      {
        heading: 'Accountability Structure',
        content: 'Analogous to a central traffic control tower. Individual participants have independence to structure operations but overarching performance is centrally managed via shared KPIs. Central Hub intervenes to recommend corrective action based on run-rates.'
      }
    ]
  },
  {
    id: 38,
    type: 'content',
    title: 'Appendices',
    imageUrl: 'https://techafricanews.com/wp-content/uploads/2020/11/Telecommunication-Infrastructure-Africa.jpg',
    sections: [
      {
        heading: 'Bibliography & Figures',
        content: [
          'The Mobile Connectivity Index (GSMA).',
          'Taxes and Parafiscal Fees (World Bank 2024).',
          'Measuring Digital Development (ITU).',
          'The Cost of 1GB Data in 237 Countries (BestBroadbandDeals.co.uk).'
        ]
      }
    ]
  },
  {
    id: 39,
    type: 'content',
    title: 'Recommended next steps',
    imageUrl: 'https://technext24.com/wp-content/uploads/2024/04/Business-Strategy-Execution.jpg',
    sections: [
      {
        content: [
          '1. Secure MoUs from key participants',
          '2. Develop a business plan for 1 year pilot phase and full 5 year country roll out',
          '3. Test and adjust key assumptions',
          '4. Set up PMO',
          '5. Commence Pilot'
        ]
      }
    ]
  },
  {
    id: 40,
    type: 'content',
    title: 'Conclusion',
    imageUrl: 'https://technext24.com/wp-content/uploads/2024/11/Digital-Access-Africa.jpg',
    sections: [
      {
        heading: 'Final Word',
        content: 'Access to technology is no longer a luxury—it is a human right. By bridging the usage gap in Nigeria, we unlock a future of infinite digital possibility for millions.'
      }
    ]
  }
];