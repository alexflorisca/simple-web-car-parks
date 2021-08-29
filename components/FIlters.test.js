
import React from 'react';
import renderer from 'react-test-renderer';
import { render, press } from '@testing-library/react-native';
import Filters from './Filters';

/* NOT WORKING due to version conflict with @testing-library/react-native package
I tried to install @testing-library/react-native but there is a peer dependency conflict
with the version of react needed by the library vs the one needed by react-native. React native
is pinned to a specific version by expo so difficult to solve this without more time and digging.

Similarly, I had a look at enzyme, but it needs extra config and setup and I didn't have the time to
spend on this for the code test. 

I've done my best to show how I WOULD test this component, as an example. Given a bit more time I'd
set up my envionment to use the testing libraries properly and run these.
*/
describe('Filters', () => {
	test('should renders correctly', () => {
		const tree = renderer.create(<Filters />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	
	describe('Park and Ride button', () => {
		test('should change colour when pressed ', () => {
			// I would normally do this by shallow rendering with enzyme in a 
			// normal react app and asert on the `color` prop of the button component.			
		});

		test('should call `getCarParks()` prop with the right parameters ', () => {
			const mockFn = jest.fn();
			const { getByText } = render(
				<Filters getCarParks={mockFn} />
			);

			const parkAndRideBtn = getByText('Park and Ride');
			parkAndRideBtn.press();
			expect(mockFn).toBeCalledWith({
				filterParkAndRide: true,
				filterElectricChargePoint: false
			});
		});
	})

	describe('Electric Charge Point button ', () => {
		test('should change colour when pressed ', () => {
			// I would normally do this by shallow rendering with enzyme in a 
			// normal react app and asert on the `color` prop of the button component.
		});

		test('should call `getCarParks()` prop with the right parameters ', () => {
			const mockFn = jest.fn();
			const { getByText } = render(
				<Filters getCarParks={mockFn} />
			);

			const electricChargePointBtn = getByText('Electric Charge Point');
			electricChargePointBtn.press();
			expect(mockFn).toBeCalledWith({
				filterParkAndRide: false,
				filterElectricChargePoint: true
			})
		});
	});
})