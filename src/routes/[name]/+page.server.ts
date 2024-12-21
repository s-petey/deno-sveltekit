import { dinos } from '$lib/server/dino.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params: { name } }) => {
	const dino = dinos.get(name.toLowerCase());

	if (!dino) {
		throw error(404, { message: 'Dino not found' });
	}

	return { name: dino.name, description: dino.description };
};
