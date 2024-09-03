import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllLocations } from '../../services/LocationService';
import { useMemo } from 'react';

export const useLocationsQuery = () => {
	const res = useInfiniteQuery({
		queryKey: ['locations'],
		queryFn: async ({ pageParam }) => await getAllLocations(pageParam),
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
