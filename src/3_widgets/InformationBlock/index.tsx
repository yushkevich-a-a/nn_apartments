import React from 'react';
import { TextH2 } from '6_shared/components/TextH2';
import { WidthWrapperPage } from '6_shared/components/WidthWrapperPage/WidthWrapperPage';
import { IRuleItem } from '6_shared/interfaces/IRuleItem';
import { InformationBlockSection } from '3_widgets/InformationBlockSection';
import data from './data.json';
import './style.scss';

export const InformationBlock = () => {
	return (
		<WidthWrapperPage>
			<div className="information-block">
				<TextH2 title="Важная информация" />
				<div className="information-block__container">
					{data.map((item: IRuleItem) => (
						<InformationBlockSection key={item.title} item={item} />
					))}
				</div>
			</div>
		</WidthWrapperPage>
	);
};
