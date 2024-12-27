// hooks/useStaffingCalculator.js
"use client"
import { useState, useCallback, useMemo } from 'react';
import { useQueueTheory } from './useQueueTheory';
import { useFinancialAnalysis } from './useFinancialAnalysis';
import { 
  INITIAL_INPUTS,
  WORKING_MINUTES,
  FIXED_COST_PRESETS
} from './constants';

export const useStaffingCalculator = () => {
  const [inputs, setInputs] = useState(INITIAL_INPUTS);
  const { calculateQueueMetrics, calculatePeakWaitTime } = useQueueTheory();
  const { analyzeFinancials, formatCurrency } = useFinancialAnalysis();

  // 必要スタッフ数の計算
  const calculateRequiredStaff = useCallback((
    dailyPatients,
    basePharmacistTime,
    clerkTime,
    pharmacistOnly
  ) => {
    // 薬剤師の稼働計算
    const pharmacistTotalMinutes = dailyPatients * basePharmacistTime;
    const requiredPharmacists = Math.ceil(pharmacistTotalMinutes / WORKING_MINUTES);
    const pharmacistUtilization = Math.round((pharmacistTotalMinutes / (requiredPharmacists * WORKING_MINUTES)) * 100);
    
    // 事務員の稼働計算
    const clerkTotalMinutes = pharmacistOnly ? 0 : dailyPatients * clerkTime;
    const requiredClerks = pharmacistOnly ? 0 : 
      Math.ceil(clerkTotalMinutes / WORKING_MINUTES);
    const clerkUtilization = requiredClerks ? 
      Math.round((clerkTotalMinutes / (requiredClerks * WORKING_MINUTES)) * 100) : 0;
    
    // 全体の稼働率（加重平均）
    const totalStaff = requiredPharmacists + requiredClerks;
    const utilization = Math.round(
      (pharmacistUtilization * requiredPharmacists + clerkUtilization * requiredClerks) / totalStaff
    );
    
    const fatigueLevel = utilization > 80 ? (utilization - 80) * 2 : 0;

    return {
      pharmacists: requiredPharmacists,
      clerks: requiredClerks,
      utilization,
      pharmacistUtilization,
      clerkUtilization,
      fatigueLevel
    };
  }, []);

  // 最適スタッフ数の計算
  const calculateOptimalStaff = useCallback((currentStaff) => {
    const TARGET_PHARMACIST_UTILIZATION = 75; // 目標稼働率（薬剤師）
    const TARGET_CLERK_UTILIZATION = 80;      // 目標稼働率（事務員）

    // 現在の労働時間から必要な人数を逆算
    const optimalPharmacists = currentStaff.pharmacistUtilization > TARGET_PHARMACIST_UTILIZATION
      ? Math.ceil(
          (currentStaff.pharmacists * currentStaff.pharmacistUtilization) / TARGET_PHARMACIST_UTILIZATION
        )
      : currentStaff.pharmacists;

    const optimalClerks = currentStaff.clerks > 0 && currentStaff.clerkUtilization > TARGET_CLERK_UTILIZATION
      ? Math.ceil(
          (currentStaff.clerks * currentStaff.clerkUtilization) / TARGET_CLERK_UTILIZATION
        )
      : currentStaff.clerks;

    return {
      optimalPharmacists,
      optimalClerks
    };
  }, []);

  // 結果の計算
  const results = useMemo(() => {
    const {
      dailyPatients,
      revenuePerPatient,
      pharmacistSalary,
      clerkSalary,
      pharmacistOnly,
      workingDays,
      customFixedCosts,
      peakHourRatio,
      standardTimes
    } = inputs;

    // 基本の処理時間設定
    const basePharmacistTime = pharmacistOnly ? 
      standardTimes.pharmacistWithClerk : 
      standardTimes.pharmacistBasic;

    // スタッフ計算
    const staffing = calculateRequiredStaff(
      dailyPatients,
      basePharmacistTime,
      standardTimes.clerk,
      pharmacistOnly
    );

    const optimal = calculateOptimalStaff(staffing);

    // 待ち行列計算
    const peakHourPatients = dailyPatients * peakHourRatio;
    const arrivalRate = peakHourPatients / 60;
    const serviceRate = 1 / basePharmacistTime;

    const queueMetrics = calculateQueueMetrics(
      arrivalRate,
      serviceRate,
      staffing.pharmacists
    );

    const peakWaitTime = calculatePeakWaitTime(
      queueMetrics.averageWaitTime,
      staffing.utilization
    );

    // 財務計算
    const financial = analyzeFinancials(
      dailyPatients,
      revenuePerPatient,
      workingDays,
      staffing.pharmacists,
      staffing.clerks,
      pharmacistSalary,
      clerkSalary,
      customFixedCosts
    );

    return {
      staffing: {
        ...staffing,
        ...optimal
      },
      queue: {
        ...queueMetrics,
        peakWaitTime
      },
      financial
    };
  }, [inputs, calculateRequiredStaff, calculateOptimalStaff, calculateQueueMetrics, calculatePeakWaitTime, analyzeFinancials]);

  // 入力更新ハンドラー
  const updateBasicSettings = useCallback((updates) => {
    setInputs(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const updateFixedCosts = useCallback((preset, customCosts = null) => {
    setInputs(prev => ({
      ...prev,
      selectedPreset: preset,
      customFixedCosts: customCosts || FIXED_COST_PRESETS[preset]
    }));
  }, []);

  const updateOperationMode = useCallback((pharmacistOnly) => {
    setInputs(prev => ({
      ...prev,
      pharmacistOnly
    }));
  }, []);

  // 時間のフォーマット
  const formatTime = useCallback((minutes) => {
    if (!isFinite(minutes)) return "計算不可";
    return `${Math.round(minutes)}分`;
  }, []);

  return {
    inputs,
    results,
    updateBasicSettings,
    updateFixedCosts,
    updateOperationMode,
    formatCurrency,
    formatTime,
    FIXED_COST_PRESETS
  };
};