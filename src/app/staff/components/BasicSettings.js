// components/BasicSettings.js
"use client"
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { NumberInput } from './NumberInput';

const BasicSettings = ({ inputs, onUpdate, onModeChange }) => {
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
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
      <NumberInput
        id="dailyPatients"
        label="1日あたりの予想来局患者数"
        value={inputs.dailyPatients}
        onChange={(value) => handleInputChange('dailyPatients', value)}
        min={1}
      />

      <NumberInput
        id="workingDays"
        label="月間営業日数"
        value={inputs.workingDays}
        onChange={(value) => handleInputChange('workingDays', value)}
        min={1}
        max={31}
      />

      <NumberInput
        id="revenuePerPatient"
        label="患者1人あたりの平均売上"
        value={inputs.revenuePerPatient}
        onChange={(value) => handleInputChange('revenuePerPatient', value)}
        min={0}
        description="技術料、薬剤料等を含めた総額"
      />

      <div className="space-y-4">
        <NumberInput
          id="pharmacistSalary"
          label="薬剤師月給（1人あたり）"
          value={inputs.pharmacistSalary}
          onChange={(value) => handleInputChange('pharmacistSalary', value)}
          min={0}
        />

        {!inputs.pharmacistOnly && (
          <NumberInput
            id="clerkSalary"
            label="事務員月給（1人あたり）"
            value={inputs.clerkSalary}
            onChange={(value) => handleInputChange('clerkSalary', value)}
            min={0}
          />
        )}
      </div>

      <NumberInput
        id="peakHourRatio"
        label="ピーク時間帯の患者集中率"
        value={inputs.peakHourRatio}
        onChange={(value) => handleInputChange('peakHourRatio', value)}
        min={0}
        max={1}
        step={0.1}
        description="0.0～1.0の間で設定（例：0.2は20%の患者がピーク時間に集中）"
      />

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-medium">標準作業時間（分）</h3>
        
        <NumberInput
          id="pharmacistBasic"
          label="薬剤師基本業務時間"
          value={inputs.standardTimes.pharmacistBasic}
          onChange={(value) => handleInputChange('standardTimes.pharmacistBasic', value)}
          min={1}
        />

        <NumberInput
          id="pharmacistWithClerk"
          label="薬剤師業務時間（事務含む）"
          value={inputs.standardTimes.pharmacistWithClerk}
          onChange={(value) => handleInputChange('standardTimes.pharmacistWithClerk', value)}
          min={1}
        />

        <NumberInput
          id="clerk"
          label="事務員業務時間"
          value={inputs.standardTimes.clerk}
          onChange={(value) => handleInputChange('standardTimes.clerk', value)}
          min={1}
        />
      </div>

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
