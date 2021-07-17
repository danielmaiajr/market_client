import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { navRoutes } from '../../routes/navRoutes';

const lowerNav = () => {
	return (
		<Wrapper>
			{navRoutes.map((link, index) => (
				<div className="nav-dropdown" key={index}>
					<li className="nav-item">
						<Link exact="true" to={link.path} style={{ color: 'white' }}>
							{link.name}
						</Link>
					</li>
					<div className="dropdown">
						<div>{link.name}</div>
						<div>{link.name}</div>
					</div>
				</div>
			))}
		</Wrapper>
	);
};

export default lowerNav;

const Wrapper = styled.div`
	color: white;
	display: flex;
	justify-content: space-between;
	background-color: #3d4b56;
	padding: 0 60px;
	font-size: 16px;
	font-weight: 400;
	@media (max-width: 1050px) {
		display: none;
	}
`;
