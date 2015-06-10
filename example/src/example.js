var React = require('react');
var TWzipcode = require('react-twzipcode');

var App = React.createClass({
	render () {
		return (
			<div>
				<TWzipcode />
			</div>
		);
	}
});

React.render(<App />, document.getElementById('app'));
