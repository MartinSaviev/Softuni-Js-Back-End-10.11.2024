export  function selectedType(selectedType) {
	const types = [
		'Supervolcanoes',
		'Submarine',
		'Subglacial',
		'Mud',
		'Stratovolcanoes',
		'Shield',
	];

	const typeSelected = types.map((type) => {
		return {
			typeVolcano: type,
			label: type,
			selected: selectedType === type ? 'selected' : '',
		};
	});

	
	return typeSelected;
}
