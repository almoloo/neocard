const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('NeoCardModule', (m) => {
	const neocard = m.contract('NeoCard');
	return { neocard };
});
