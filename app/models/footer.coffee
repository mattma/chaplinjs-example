Model = require 'models/base/model'

module.exports = class Footer extends Model
	defaults:
		links: [
			{ href: "http://mattmadesign.com", name: "mattma"},
			{ href: "http://yahoo.com", name: "kelly"},
			{ href: "http://google.com", name: "aaron"},
		]
