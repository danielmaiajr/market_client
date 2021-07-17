import React from 'react';

import LowerNav from './LowerNav';
import UpperNav from './UpperNav';

const Navbar = () => {
	return (
		<React.Fragment>
			<UpperNav />
			<LowerNav />
		</React.Fragment>
	);
};

export default Navbar;
