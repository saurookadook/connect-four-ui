import { Outlet } from 'react-router-dom';

import { TopNavBar, ViteReactHeader } from '@src/components';
import { FlexColumn } from '@src/layouts';
import './styles.css';

export function Root() {
  return (
    <div id="root-layout">
      <TopNavBar />

      <ViteReactHeader />

      <FlexColumn className="card">
        <Outlet />
      </FlexColumn>
    </div>
  );
}
