"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Building, Building2 } from 'lucide-react';
import { NumberInput } from './NumberInput';

const FixedCostSettings = ({ costs, selectedPreset, onUpdate }) => {
  const handleInputChange = (key, value) => {
    const updatedCosts = {
      ...costs,
      [key]: value // valueは既にNumber型なので変換不要
    };
    onUpdate(selectedPreset, updatedCosts);
  };

  const costItems = [
    { key: 'rent', label: '家賃', icon: Building },
    { key: 'utilities', label: '光熱費', icon: null },
    { key: 'supplies', label: '消耗品費', icon: null },
    { key: 'insurance', label: '保険料', icon: null },
    { key: 'systemFee', label: 'システム料', icon: null },
    { key: 'other', label: 'その他経費', icon: null }
  ];

  // 合計金額の計算と表示用フォーマット
  const totalCost = Object.values(costs || {})
    .filter(value => !isNaN(value) && value !== null && value !== undefined)
    .reduce((a, b) => a + Number(b), 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ja-JP', { 
      style: 'currency', 
      currency: 'JPY',
      maximumFractionDigits: 0 
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* プリセット選択ボタン */}
      <div className="flex space-x-4">
        <Button
          variant={selectedPreset === 'small' ? 'default' : 'outline'}
          className="flex-1"
          onClick={() => onUpdate('small')}
        >
          <Building className="w-4 h-4 mr-2" />
          小規模薬局
        </Button>
        <Button
          variant={selectedPreset === 'medium' ? 'default' : 'outline'}
          className="flex-1"
          onClick={() => onUpdate('medium')}
        >
          <Building2 className="w-4 h-4 mr-2" />
          中規模薬局
        </Button>
      </div>

      {/* 固定費入力フォーム */}
      <div className="space-y-4">
        {costItems.map(({ key, label, icon: Icon }) => (
          <NumberInput
            key={key}
            id={key}
            label={
              <span className="flex items-center">
                {Icon && <Icon className="w-4 h-4 mr-2" />}
                {label}
              </span>
            }
            value={costs?.[key] ?? 0}
            onChange={(value) => handleInputChange(key, value)}
            min={0}
            allowZero={true}
          />
        ))}
      </div>

      {/* 合計表示 */}
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="font-medium">月間固定費合計</span>
          <span className="text-lg font-bold">
            {formatCurrency(totalCost)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FixedCostSettings;
