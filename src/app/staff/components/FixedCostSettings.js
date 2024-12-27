"use client"
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building, Building2 } from 'lucide-react';

const FixedCostSettings = ({ costs, selectedPreset, onUpdate }) => {
  const handleInputChange = (key, value) => {
    const updatedCosts = {
      ...costs,
      [key]: Number(value)
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
          <div key={key} className="space-y-2">
            <Label htmlFor={key} className="flex items-center">
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              {label}
            </Label>
            <Input
              id={key}
              type="number"
              value={costs?.[key] ?? ''}
              onChange={(e) => handleInputChange(key, e.target.value)}
              min="0"
            />
          </div>
        ))}
      </div>

      {/* 合計表示 */}
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="font-medium">月間固定費合計</span>
          <span className="text-lg font-bold">
            {new Intl.NumberFormat('ja-JP', { 
              style: 'currency', 
              currency: 'JPY',
              maximumFractionDigits: 0 
            }).format(
              Object.values(costs || {})
                .filter(value => !isNaN(value) && value !== null && value !== undefined)
                .reduce((a, b) => a + Number(b), 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FixedCostSettings;