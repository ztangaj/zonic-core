import React from 'react';
import { MainLayout } from '../components/shared/main-layout/MainLayout';
import { User1Page } from '../components/pages/user-page/User1Page';
import { NextPage } from 'next';

interface IProps {}

const IndexRoute: NextPage<IProps> = (props) => {
  return (
    <MainLayout title="Home">
      <User1Page />
    </MainLayout>
  );
};

// ts-prune-ignore-next
export default IndexRoute;
