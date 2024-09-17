import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllCharacters } from '../../services/CharacterService';
import { useMemo } from 'react';

export const useCharactersQuery = () => {
	const res = useInfiniteQuery({
		queryKey: ['characters'],
		queryFn: async ({ pageParam }) => await getAllCharacters(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			return allPages.length + 1;
		},
	});

	const flattenData = useMemo(() => {
		return res.data?.pages.flatMap((page) => page.results) || [];
	}, [res.data?.pages]);

	return { ...res, data: flattenData };
};
