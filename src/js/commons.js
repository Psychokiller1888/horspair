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
	},
	validatePassword: function(password) {
		const length = password.length >= 8
		const uppercase = /[A-Z]/.test(password)
		const lowercase = /[a-z]/.test(password)
		const number = /[0-9]/.test(password)
		const special = /[#?!@$%^&*-]/.test(password)
		return !length || !uppercase || !lowercase || !number || !special
	}
}
