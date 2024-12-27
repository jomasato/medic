"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const QueueAnalysis = ({ queue, formatTime }) => {
  const getServiceLevelColor = (level) => {
    const percentage = level * 100;
    if (percentage >= 85) return "text-green-500";
    if (percentage >= 70) return "text-amber-500";
    return "text-red-500";
  };

  const getWaitTimeColor = (minutes) => {
    if (!isFinite(minutes)) return "text-red-500";
    if (minutes <= 15) return "text-green-500";
    if (minutes <= 30) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          待ち時間分析
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              15分以内対応率
            </h3>
            <span className={`font-bold ${getServiceLevelColor(queue.serviceLevel)}`}>
              {(queue.serviceLevel * 100).toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={queue.serviceLevel * 100} 
            className="h-2"
          />
        </div>

        {/* Wait Times */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">平均待ち時間</p>
              <p className={`text-lg font-bold ${getWaitTimeColor(queue.averageWaitTime)}`}>
                {formatTime(queue.averageWaitTime)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ピーク時待ち時間</p>
              <p className={`text-lg font-bold ${getWaitTimeColor(queue.peakWaitTime)}`}>
                {formatTime(queue.peakWaitTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Queue Length */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-1" />
              最大待ち人数
            </h3>
            <span className="font-bold">
              {isFinite(queue.maxQueueLength) ? 
                `${queue.maxQueueLength}人` : 
                "計算不可"}
            </span>
          </div>
        </div>

        {/* Warnings */}
        {queue.averageWaitTime > 30 && isFinite(queue.averageWaitTime) && (
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              待ち時間が長くなっています。
              人員配置の見直しをご検討ください。
            </AlertDescription>
          </Alert>
        )}

        {!isFinite(queue.averageWaitTime) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              現在の設定では待ち行列が発散します。
              早急な人員増強が必要です。
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default QueueAnalysis;