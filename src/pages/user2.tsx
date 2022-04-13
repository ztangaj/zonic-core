import React from 'react';
import { MainLayout } from '../components/shared/main-layout/MainLayout';
import { User2Page } from '../components/pages/user-page/User2Page';
import { NextPage } from 'next';

interface IProps {}

const IndexRoute: NextPage<IProps> = (props) => {
  return (
    <MainLayout title="Home">
      <User2Page />
    </MainLayout>
  );
};

// ts-prune-ignore-next
export default IndexRoute;
