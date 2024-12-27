
// components/BasicSettings.js
"use client"
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const BasicSettings = ({ inputs, onUpdate, onModeChange }) => {
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      // ネストされたフィールドの処理（standardTimes等）
      const [parent, child] = field.split('.');
      onUpdate({
        [parent]: {
          ...inputs[parent],
          [child]: value
        }
      });
    } else {
      onUpdate({ [field]: value });
    }
  };

  return (
    <div className="space-y-4">
      {/* 患者数設定 */}
      <div className="space-y-2">
        <Label htmlFor="dailyPatients">1日あたりの予想来局患者数</Label>
        <Input
          id="dailyPatients"
          type="number"
          value={inputs.dailyPatients}
          onChange={(e) => handleInputChange('dailyPatients', Number(e.target.value))}
          min="1"
        />
      </div>

      {/* 営業日数 */}
      <div className="space-y-2">
        <Label htmlFor="workingDays">月間営業日数</Label>
        <Input
          id="workingDays"
          type="number"
          value={inputs.workingDays}
          onChange={(e) => handleInputChange('workingDays', Number(e.target.value))}
          min="1"
          max="31"
        />
      </div>

      {/* 患者単価 */}
      <div className="space-y-2">
        <Label htmlFor="revenuePerPatient">患者1人あたりの平均売上</Label>
        <Input
          id="revenuePerPatient"
          type="number"
          value={inputs.revenuePerPatient}
          onChange={(e) => handleInputChange('revenuePerPatient', Number(e.target.value))}
          min="0"
        />
        <p className="text-xs text-gray-500">技術料、薬剤料等を含めた総額</p>
      </div>

      {/* 給与設定 */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pharmacistSalary">薬剤師月給（1人あたり）</Label>
          <Input
            id="pharmacistSalary"
            type="number"
            value={inputs.pharmacistSalary}
            onChange={(e) => handleInputChange('pharmacistSalary', Number(e.target.value))}
            min="0"
          />
        </div>

        {!inputs.pharmacistOnly && (
          <div className="space-y-2">
            <Label htmlFor="clerkSalary">事務員月給（1人あたり）</Label>
            <Input
              id="clerkSalary"
              type="number"
              value={inputs.clerkSalary}
              onChange={(e) => handleInputChange('clerkSalary', Number(e.target.value))}
              min="0"
            />
          </div>
        )}
      </div>

      {/* ピーク時設定 */}
      <div className="space-y-2">
        <Label htmlFor="peakHourRatio">ピーク時間帯の患者集中率</Label>
        <Input
          id="peakHourRatio"
          type="number"
          value={inputs.peakHourRatio}
          onChange={(e) => handleInputChange('peakHourRatio', Number(e.target.value))}
          min="0"
          max="1"
          step="0.1"
        />
        <p className="text-xs text-gray-500">0.0～1.0の間で設定（例：0.2は20%の患者がピーク時間に集中）</p>
      </div>

      {/* 標準時間設定 */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-medium">標準作業時間（分）</h3>
        
        <div className="space-y-2">
          <Label htmlFor="pharmacistBasic">薬剤師基本業務時間</Label>
          <Input
            id="pharmacistBasic"
            type="number"
            value={inputs.standardTimes.pharmacistBasic}
            onChange={(e) => handleInputChange('standardTimes.pharmacistBasic', Number(e.target.value))}
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pharmacistWithClerk">薬剤師業務時間（事務含む）</Label>
          <Input
            id="pharmacistWithClerk"
            type="number"
            value={inputs.standardTimes.pharmacistWithClerk}
            onChange={(e) => handleInputChange('standardTimes.pharmacistWithClerk', Number(e.target.value))}
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clerk">事務員業務時間</Label>
          <Input
            id="clerk"
            type="number"
            value={inputs.standardTimes.clerk}
            onChange={(e) => handleInputChange('standardTimes.clerk', Number(e.target.value))}
            min="1"
          />
        </div>
      </div>

      {/* 運営モード切り替え */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="space-y-0.5">
          <Label>薬剤師のみで運営</Label>
          <p className="text-xs text-gray-500">事務業務も薬剤師が実施</p>
        </div>
        <Switch
          checked={inputs.pharmacistOnly}
          onCheckedChange={onModeChange}
        />
      </div>
    </div>
  );
};

export default BasicSettings;