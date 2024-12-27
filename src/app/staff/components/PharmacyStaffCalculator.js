"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Users, Battery, Gauge } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const StaffingResults = ({ staffing }) => {
  const getUtilizationColor = (utilization) => {
    if (utilization > 85) return "text-red-500";
    if (utilization > 75) return "text-amber-500";
    return "text-green-500";
  };

  const getFatigueLevel = (level) => {
    if (level > 30) return { color: "text-red-500", message: "危険" };
    if (level > 15) return { color: "text-amber-500", message: "注意" };
    return { color: "text-green-500", message: "良好" };
  };

  const fatigue = getFatigueLevel(staffing.fatigueLevel);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2" />
          人員配置分析
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Staffing */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">現在の配置</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>必要薬剤師数</span>
                <span className="font-bold text-lg">{staffing.pharmacists}名</span>
              </div>
              <div className="flex justify-between items-center">
                <span>必要事務員数</span>
                <span className="font-bold text-lg">{staffing.clerks}名</span>
              </div>
            </div>
          </div>

          {/* Overall Utilization */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm flex items-center">
                <Gauge className="w-4 h-4 mr-1" />
                全体稼働率
              </h3>
              <span className={`font-bold ${getUtilizationColor(staffing.utilization)}`}>
                {staffing.utilization}%
              </span>
            </div>
            <Progress 
              value={staffing.utilization} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>適正(75%)</span>
              <span>100%</span>
            </div>
          </div>

          {/* Individual Utilization Rates */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">職種別稼働率</h3>
            <div className="space-y-3">
              {/* Pharmacist Utilization */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">薬剤師</span>
                  <span className={`text-sm font-medium ${getUtilizationColor(staffing.pharmacistUtilization)}`}>
                    {staffing.pharmacistUtilization}%
                  </span>
                </div>
                <Progress 
                  value={staffing.pharmacistUtilization} 
                  className="h-1.5"
                />
              </div>
              
              {/* Clerk Utilization */}
              {staffing.clerks > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">事務員</span>
                    <span className={`text-sm font-medium ${getUtilizationColor(staffing.clerkUtilization)}`}>
                      {staffing.clerkUtilization}%
                    </span>
                  </div>
                  <Progress 
                    value={staffing.clerkUtilization} 
                    className="h-1.5"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Fatigue Level */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm flex items-center">
                <Battery className="w-4 h-4 mr-1" />
                疲労度
              </h3>
              <span className={`font-bold ${fatigue.color}`}>
                {fatigue.message}
              </span>
            </div>
            <Progress 
              value={staffing.fatigueLevel} 
              max={40}
              className="h-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>低</span>
              <span>中</span>
              <span>高</span>
            </div>
          </div>

          {/* Optimal Staffing Alert */}
          {staffing.utilization > 80 && (
            <div className="md:col-span-2">
              <Alert variant="warning">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="ml-2">
                    <p className="font-medium">推奨される人員配置：</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>薬剤師：{staffing.optimalPharmacists}名（現在：{staffing.pharmacists}名）</li>
                      {staffing.clerks > 0 && (
                        <li>事務員：{staffing.optimalClerks}名（現在：{staffing.clerks}名）</li>
                      )}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffingResults;