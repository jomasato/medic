// hooks/useQueueTheory.js
"use client"
import { useCallback } from 'react';

export const useQueueTheory = () => {
  // 階乗計算用ヘルパー関数
  const factorial = useCallback((n) => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  }, []);

  // 待ち行列メトリクスの計算
  const calculateQueueMetrics = useCallback((arrivalRate, serviceRate, servers) => {
    const rho = arrivalRate / (servers * serviceRate);
    
    if (rho >= 1) {
      return {
        averageWaitTime: Infinity,
        maxQueueLength: Infinity,
        serviceLevel: 0,
        utilization: rho * 100
      };
    }

    // P0（アイドル確率）の計算
    let sum = 0;
    for (let n = 0; n < servers; n++) {
      sum += Math.pow(servers * rho, n) / factorial(n);
    }
    const p0 = 1 / (sum + (Math.pow(servers * rho, servers) / factorial(servers)) * (1 / (1 - rho)));

    // 平均待ち時間と行列長の計算
    const lq = (Math.pow(servers * rho, servers) * rho * p0) / (factorial(servers) * Math.pow(1 - rho, 2));
    const wq = lq / arrivalRate;

    // 15分以内で対応できる確率（サービスレベル）
    const serviceLevel = 1 - Math.exp(-serviceRate * servers * (1 - rho) * 15);

    return {
      averageWaitTime: wq,
      maxQueueLength: Math.ceil(lq * 1.5), // 95パーセンタイル近似
      serviceLevel,
      utilization: rho * 100
    };
  }, [factorial]);

  // ピーク時の待ち時間計算
  const calculatePeakWaitTime = useCallback((baseWaitTime, utilization) => {
    const fatigueLevel = utilization > 80 ? (utilization - 80) * 2 : 0;
    return baseWaitTime * (1 + fatigueLevel / 100);
  }, []);

  return {
    calculateQueueMetrics,
    calculatePeakWaitTime
  };
};