export default {
	isEmailValid: function(email) {
		let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return re.test(email.trim())
	},
	capitalFirst: function(string) {
		const arr = string.split(' ')
		for (let i = 0; i < arr.length; i++) {
			arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
		}
		return arr.join(' ')
	}
}
