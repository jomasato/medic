// app/staff/page.js
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStaffingCalculator } from './hooks/useStaffingCalculator';
import BasicSettings from './components/BasicSettings';
import FixedCostSettings from './components/FixedCostSettings';
import StaffingResults from './components/StaffingResults';
import QueueAnalysis from './components/QueueAnalysis';
import FinancialResults from './components/FinancialResults';

export default function StaffingPage() {
  const {
    inputs,
    results,
    updateBasicSettings,
    updateFixedCosts,
    updateOperationMode,
    formatCurrency,
    formatTime,
  } = useStaffingCalculator();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">薬局スタッフ配置シミュレータ</h1>
          <p className="text-gray-600 mt-1">
            人員配置の最適化と収支シミュレーションを行えます
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>シミュレーション設定</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="basic" className="w-full">基本設定</TabsTrigger>
                  <TabsTrigger value="costs" className="w-full">固定費</TabsTrigger>
                </TabsList>
                <TabsContent value="basic">
                  <BasicSettings 
                    inputs={inputs}
                    onUpdate={updateBasicSettings}
                    onModeChange={updateOperationMode}
                  />
                </TabsContent>
                <TabsContent value="costs">
                  <FixedCostSettings
                    costs={inputs.customFixedCosts}
                    selectedPreset={inputs.selectedPreset}
                    onUpdate={updateFixedCosts}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          <StaffingResults 
            staffing={results.staffing}
            formatTime={formatTime}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QueueAnalysis 
              queue={results.queue}
              formatTime={formatTime}
            />
            
            <FinancialResults 
              financial={results.financial}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  );
}