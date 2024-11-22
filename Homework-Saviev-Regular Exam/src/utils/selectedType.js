export  function selectedType(selectedType) {
	const types = [
		'Inner',
		'Outer',
		'Dwarf',
	];

	const typeSelected = types.map((type) => {
		return {
			typePlanet: type,
			label: type,
			selected: selectedType === type ? 'selected' : '',
		};
	});

	
	return typeSelected;
}

export  function selectedYesOrNo(selectedType) {
	const types = [
		'Yes',
		'No',
	];

	const typeSelected = types.map((type) => {
		return {
			typeRings: type,
			label: type,
			selected: selectedType === type ? 'selected' : '',
		};
	});

	
	return typeSelected;
}