import { dinos } from '$lib/server/dino.js';

export const load = async ({ url }) => {
	const queryParams = url.searchParams;

	const q = queryParams.get('q');
	const pageParam = queryParams.get('page');
	let page = 1;
	if (pageParam) {
		const parsedPage = parseInt(pageParam);
		if (!isNaN(parsedPage)) {
			page = parsedPage;
		}
	}
	const limitParam = queryParams.get('limit');
	let limit = 25;
	if (limitParam) {
		const parsedLimit = parseInt(limitParam);
		if (!isNaN(parsedLimit)) {
			limit = parsedLimit;
		}
	}

	const filteredDinos = Array.from(dinos.values()).filter((d) => {
		if (!q) {
			return true;
		}

		return d.name.toLowerCase().includes(q.toLowerCase());
	});

	const offset = Math.abs((page - 1) * limit);
	const paginatedDinos = Array.from(filteredDinos).slice(offset, offset + limit);
	const totalDinos = filteredDinos.length;
	const totalPages = Math.ceil(totalDinos / limit);

	return {
		dinos: paginatedDinos,
		q,
		page,
		limit,
		totalPages,
		totalDinos
	};
};
