import React, { useState } from 'react';
import { DashboardLayout } from '../dashboard/DashboardLayout';
import { DashboardOverview } from '../dashboard/DashboardOverview';
import { ReturnLoadMatcher } from '../dashboard/ReturnLoadMatcher';
import { LiveTrackingView } from '../dashboard/LiveTrackingView';
import { LoadsListView } from '../dashboard/LoadsListView';
import { VehiclesManagement } from '../dashboard/VehiclesManagement';
import { EscrowWalletView } from '../dashboard/EscrowWalletView';
import { ProfileView } from '../dashboard/ProfileView';
import { SettingsView } from '../dashboard/SettingsView';
import { PostLoadModal } from '../dashboard/PostLoadModal';

interface DashboardPageProps {
  setCurrentPage: (page: string) => void;
  initialTab?: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  setCurrentPage,
  initialTab = 'overview',
}) => {
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [isPostLoadModalOpen, setIsPostLoadModalOpen] = useState(false);

  const renderTabContent = () => {
    switch (currentTab) {
      case 'overview':
        return (
          <DashboardOverview
            setCurrentTab={setCurrentTab}
            openPostLoadModal={() => setIsPostLoadModalOpen(true)}
          />
        );
      case 'return_loads':
        return <ReturnLoadMatcher />;
      case 'tracking':
        return <LiveTrackingView />;
      case 'loads':
        return (
          <LoadsListView
            openPostLoadModal={() => setIsPostLoadModalOpen(true)}
            setCurrentTab={setCurrentTab}
          />
        );
      case 'vehicles':
        return <VehiclesManagement />;
      case 'wallet':
        return <EscrowWalletView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <DashboardOverview
            setCurrentTab={setCurrentTab}
            openPostLoadModal={() => setIsPostLoadModalOpen(true)}
          />
        );
    }
  };

  return (
    <>
      <DashboardLayout
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setCurrentPage={setCurrentPage}
        openPostLoadModal={() => setIsPostLoadModalOpen(true)}
      >
        {renderTabContent()}
      </DashboardLayout>

      <PostLoadModal
        isOpen={isPostLoadModalOpen}
        onClose={() => setIsPostLoadModalOpen(false)}
      />
    </>
  );
};
