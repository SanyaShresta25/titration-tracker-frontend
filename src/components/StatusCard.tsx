import React from "react";

interface StatusCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ icon: Icon, title, value, color }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
