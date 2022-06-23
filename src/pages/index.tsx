import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
     <main>
      <Header />
        <div className={styles.default}>
          <Link href="/">
            <a className={styles.post}>
              <h2> Como utilizar Hooks </h2>
              <p> Pensando em sicronização em vez de ciclos de vida.</p>
              <ul>
                <li>
                  <FiCalendar />
                  15 Mar 2021
                </li>
                <li>
                  <FiUser />
                  Daniela Dias
                </li>
              </ul>
            </a>
          </Link>
        </div>
        <Button />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', ' /posts')],
    {
      pageSize: 1
    }
  );
  console.log(postsResponse);

    return {
      props: {
      postsResponse
    }
  }

};
