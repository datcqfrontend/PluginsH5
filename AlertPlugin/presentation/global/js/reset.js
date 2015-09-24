function clearLocalStorage() {
	if (window.localStorage == null)
		return;
	var pattern = "drcom/aHUS_Disease_Updated_Aug";
	for ( var name in localStorage) {
		if (name.indexOf(pattern) != -1) {
			localStorage.removeItem(name);
		}
	}
}
clearLocalStorage();