// hooks/constants.js

export const FIXED_COST_PRESETS = {
    small: {
      name: "小規模薬局標準",
      rent: 150000,
      utilities: 30000,
      supplies: 50000,
      insurance: 30000,
      systemFee: 50000,
      other: 40000
    },
    medium: {
      name: "中規模薬局標準",
      rent: 250000,
      utilities: 50000,
      supplies: 80000,
      insurance: 50000,
      systemFee: 70000,
      other: 60000
    }
  };
  
  export const INITIAL_INPUTS = {
    dailyPatients: 20,
    revenuePerPatient: 3000,
    pharmacistSalary: 450000,
    clerkSalary: 250000,
    pharmacistOnly: false,
    workingDays: 22,
    peakHourRatio: 0.2,
    selectedPreset: 'small',
    customFixedCosts: FIXED_COST_PRESETS.small,
    standardTimes: {
      pharmacistBasic: 16,
      pharmacistWithClerk: 24,
      clerk: 8
    }
  };
  
  export const WORKING_MINUTES = 7 * 60; // 7時間営業
  export const TARGET_SERVICE_LEVEL = 0.85; // 目標サービスレベル（15分以内対応率）
  export const OPTIMAL_UTILIZATION = 0.75; // 最適稼働率
  export const WARNING_UTILIZATION = 0.85; // 警告稼働率
  export const CRITICAL_UTILIZATION = 0.90; // 危険稼働率
  
  // 時間帯別の来客ピーク係数
  export const HOURLY_PEAK_FACTORS = {
    morning: 1.2,   // 朝の混雑
    noon: 1.5,      // お昼の混雑
    evening: 1.3    // 夕方の混雑
  };
  
  // 業務タイプ別の標準所要時間（分）
  export const STANDARD_TASK_TIMES = {
    prescription: {
      basic: 10,      // 基本調剤
      complex: 15,    // 複雑な調剤
      advancedCare: 20 // 服薬指導重点
    },
    administrative: {
      reception: 5,    // 受付業務
      insurance: 8,    // 保険請求
      inventory: 10    // 在庫管理
    }
  };
  
  // 収益性の警告閾値
  export const FINANCIAL_THRESHOLDS = {
    profitMargin: {
      warning: 10,     // 10%以下で警告
      critical: 5      // 5%以下で危険警告
    },
    revenuePerPharmacist: {
      minimum: 1500000 // 薬剤師1人あたり最低売上目標
    }
  };