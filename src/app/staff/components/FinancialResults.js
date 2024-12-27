"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const FinancialResults = ({ financial, formatCurrency }) => {
  const isProfit = financial.monthlyProfit > 0;
  const profitMargin = (financial.monthlyProfit / financial.monthlyRevenue) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CircleDollarSign className="w-5 h-5 mr-2" />
          収支分析
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Financial Metrics */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">月間予想売上</p>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                <p className="text-lg font-bold">
                  {formatCurrency(financial.monthlyRevenue)}
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">月間予想収支</p>
              <div className="flex items-center">
                {isProfit ? (
                  <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
                )}
                <p className={`text-lg font-bold ${
                  isProfit ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(financial.monthlyProfit)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">コスト内訳</h3>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>人件費</span>
              <span>{formatCurrency(financial.monthlyLaborCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>固定費</span>
              <span>{formatCurrency(financial.monthlyFixedCost)}</span>
            </div>
          </div>
        </div>

        {/* Per Pharmacist Metrics */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">薬剤師1人あたり売上</span>
            <span className="font-bold">
              {formatCurrency(financial.revenuePerPharmacist)}
            </span>
          </div>
        </div>

        {/* Alerts */}
        {financial.monthlyProfit < 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              現在の設定では赤字となります。
              収益改善のため、以下をご検討ください：
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>患者数の増加策</li>
                <li>固定費の見直し</li>
                <li>人員配置の最適化</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {profitMargin < 10 && financial.monthlyProfit > 0 && (
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              利益率が{profitMargin.toFixed(1)}%と低めです。
              収益性の改善をご検討ください。
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialResults;