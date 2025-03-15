import { dinos } from '$lib/server/dino.js';
import { error, type Load } from '@sveltejs/kit';

export const load: Load = ({ params: { name } }) => {
	if (!name) {
		throw error(404, { message: 'Dino not found' });
	}

	const dino = dinos.get(name.toLowerCase());

	if (!dino) {
		throw error(404, { message: 'Dino not found' });
	}

	return { name: dino.name, description: dino.description };
};
