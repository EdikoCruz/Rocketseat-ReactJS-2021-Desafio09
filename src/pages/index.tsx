import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

async function fetchImages({ pageParam = null }) {
  return (await api.get('/api/images', {
    params: { pageParam },
  })).data;
}

interface LoadButtonProps {
  handleNextPage: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isFetchingNextPage: boolean
}

function LoadButton({ handleNextPage, isFetchingNextPage }: LoadButtonProps){
  return (
    <Button
      onClick={handleNextPage}
      disabled={isFetchingNextPage}
    >
      { isFetchingNextPage ? 'Carregando...' : 'Carregar mais' }
    </Button>
  )
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchImages,
    // TODO GET AND RETURN NEXT PAGE PARAM
    { getNextPageParam: (lastPage) => (lastPage?.after) }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data?.pages.map(page => page.data).flat()
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading && !isError) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN
  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {
          /* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */
          hasNextPage
            ? <LoadButton handleNextPage={() => fetchNextPage()} isFetchingNextPage={isFetchingNextPage} />
            : <></>
        }
      </Box>
    </>
  );
}
