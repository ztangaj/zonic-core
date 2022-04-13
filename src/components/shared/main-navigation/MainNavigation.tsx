import React from 'react';
import Link from 'next/link';
import { Routes } from '../../../constants/Routes';
import styles from './MainNavigation.module.css';
import environment from 'environment';

interface IProps {}

export const MainNavigation: React.FC<IProps> = (props) => {
  return (
    <nav>
      <ol className={styles.crumb}>
        <li>
          <Link href={Routes.Index}>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href={Routes.User1}>
            <a>User1</a>
          </Link>
        </li>
        <li>
          <Link href={Routes.User2}>
            <a>User2</a>
          </Link>
        </li>
      </ol>
    </nav>
  );
};

MainNavigation.displayName = 'MainNavigation';
