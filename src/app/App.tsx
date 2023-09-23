import React, { useEffect, useState } from 'react';
import { Footer } from 'widgets/Footer';
import { InformationBlock } from 'widgets/InformationBlock';
import { useApartmentStore } from 'store/useApartmentStore';
import axios, { AxiosResponse } from 'axios';
import { IApartmentModel } from 'shared/types';
import { ApartmentPage } from 'pages/ApartmentPage/ApartmentPage';
import { Header } from 'widgets/Header';
import { contextScreenSize } from 'shared/context';

export const App: React.FC = () => {
	const { addApartments, selectApartment, setServedDates } = useApartmentStore.getState();
	const [sizeWindow, setSizeWindow] = useState<number>(1024);

	const handleLoader = async (): Promise<AxiosResponse<IApartmentModel[]>> => {
		const url: string = process.env.REACT_APP_BASE_URL as string;
		const response = await axios.get(`${url}/api/apartments`);
		addApartments(response.data);
		selectApartment(response.data[1].id);
		const serverDate = await axios.get(`${url}/api/dates/${response.data[1].id}/`);
		if (serverDate.data[0]) {
			setServedDates(serverDate.data[0].dates ? serverDate.data[0].dates : []);
		}
		return response;
	};

	useEffect(() => {
		handleLoader();
		const windowSizeObserver = () => {
			setSizeWindow(document.body.getBoundingClientRect().width);
		};

		document.body.addEventListener('resize', windowSizeObserver);
		windowSizeObserver();
		return () => document.body.removeEventListener('resize', windowSizeObserver);
	}, []);

	return (
		<contextScreenSize.Provider value={sizeWindow}>
			<div className="App">
				<Header />
				<ApartmentPage />
				<InformationBlock />
				<Footer />
			</div>
		</contextScreenSize.Provider>
	);
};