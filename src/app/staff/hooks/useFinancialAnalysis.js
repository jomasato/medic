// hooks/useFinancialAnalysis.js
"use client"
import { useCallback } from 'react';

export const useFinancialAnalysis = () => {
  // 収益計算
  const calculateRevenue = useCallback((dailyPatients, revenuePerPatient, workingDays) => {
    console.log('Revenue Calculation:', { dailyPatients, revenuePerPatient, workingDays });
    const revenue = dailyPatients * revenuePerPatient * workingDays;
    console.log('Calculated Revenue:', revenue);
    return revenue;
  }, []);

  // 人件費計算
  const calculateLaborCost = useCallback((
    pharmacists,
    clerks,
    pharmacistSalary,
    clerkSalary
  ) => {
    console.log('Labor Cost Calculation:', { 
      pharmacists, clerks, pharmacistSalary, clerkSalary 
    });
    const laborCost = (pharmacists * pharmacistSalary) + (clerks * clerkSalary);
    console.log('Calculated Labor Cost:', laborCost);
    return laborCost;
  }, []);

  // 固定費計算
  const calculateFixedCosts = useCallback((customFixedCosts) => {
    console.log('Fixed Costs Input:', customFixedCosts);
    // オブジェクトの値が存在することを確認
    if (!customFixedCosts || typeof customFixedCosts !== 'object') {
      console.error('Invalid customFixedCosts:', customFixedCosts);
      return 0;
    }
    const fixedCosts = Object.values(customFixedCosts).reduce((a, b) => {
      // 数値でない値をチェック
      const numA = typeof a === 'number' ? a : 0;
      const numB = typeof b === 'number' ? b : 0;
      return numA + numB;
    }, 0);
    console.log('Calculated Fixed Costs:', fixedCosts);
    return fixedCosts;
  }, []);

  // 収支分析
  const analyzeFinancials = useCallback((
    dailyPatients,
    revenuePerPatient,
    workingDays,
    pharmacists,
    clerks,
    pharmacistSalary,
    clerkSalary,
    customFixedCosts
  ) => {
    console.log('Financial Analysis Input:', {
      dailyPatients,
      revenuePerPatient,
      workingDays,
      pharmacists,
      clerks,
      pharmacistSalary,
      clerkSalary,
      customFixedCosts
    });

    // 入力値の検証
// 入力値の検証
if (
    dailyPatients === undefined || dailyPatients === null ||
    revenuePerPatient === undefined || revenuePerPatient === null ||
    workingDays === undefined || workingDays === null ||
    pharmacists === undefined || pharmacists === null
  ) {
    console.error('Missing required inputs for financial analysis');
      return {
        monthlyRevenue: 0,
        monthlyLaborCost: 0,
        monthlyFixedCost: 0,
        monthlyProfit: 0,
        revenuePerPharmacist: 0,
        profitMargin: 0
      };
    }

    const monthlyRevenue = calculateRevenue(dailyPatients, revenuePerPatient, workingDays);
    const monthlyLaborCost = calculateLaborCost(pharmacists, clerks || 0, pharmacistSalary, clerkSalary || 0);
    const monthlyFixedCost = calculateFixedCosts(customFixedCosts);
    
    console.log('Calculated Values:', {
      monthlyRevenue,
      monthlyLaborCost,
      monthlyFixedCost
    });

    const monthlyProfit = monthlyRevenue - monthlyLaborCost - monthlyFixedCost;
    const revenuePerPharmacist = pharmacists > 0 ? monthlyRevenue / pharmacists : 0;
    const profitMargin = monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0;

    const results = {
      monthlyRevenue,
      monthlyLaborCost,
      monthlyFixedCost,
      monthlyProfit,
      revenuePerPharmacist,
      profitMargin
    };

    console.log('Final Financial Results:', results);
    return results;
  }, [calculateRevenue, calculateLaborCost, calculateFixedCosts]);

  // 書式設定
  const formatCurrency = useCallback((amount) => {
    if (!isFinite(amount)) {
      console.error('Invalid amount for currency formatting:', amount);
      return '¥0';
    }
    return new Intl.NumberFormat('ja-JP', { 
      style: 'currency', 
      currency: 'JPY',
      maximumFractionDigits: 0 
    }).format(amount);
  }, []);

  return {
    analyzeFinancials,
    formatCurrency
  };
};