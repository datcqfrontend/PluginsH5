//reset localStorage
function clearLocalStorage() {
	if (window.localStorage == null)
		return;
	var pattern = "drcom/13_1_SENSODYNE_DEMO";
	for ( var name in localStorage) {
		if (name.indexOf(pattern) != -1) {
			localStorage.removeItem(name);
		}
	}
}
clearLocalStorage();