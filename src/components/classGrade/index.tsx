import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { ClassesHeader } from '../classes/style';
import { ListGrade } from './style';
import Grade from './grade';
import Container from '../UI/Container';
import AddGrade from './addGrade';
import { reorder } from './helper';
import { IPointPart } from '../../type';

const initial: IPointPart[] = [
	{
		id: 1,
		classId: 1,
		name: 'Cuối kỳ',
		ratio: 60,
		order: 1
	},
	{
		id: 2,
		classId: 1,
		name: 'Giữa kỳ',
		ratio: 30,
		order: 2
	},
	{
		id: 3,
		classId: 1,
		name: 'Miệng',
		ratio: 10,
		order: 3
	}
];

const ClassGrade: React.FC = () => {
	const [state, setState] = useState<IPointPart[]>(initial);

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const quotes = reorder(state, result.source.index, result.destination.index);

		setState([...quotes]);
	};

	return (
		<Container>
			<ClassesHeader>
				<div>Cấu trúc điểm</div>
			</ClassesHeader>
			<ListGrade>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='list'>
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{state.map((item, index) => (
									<Grade grade={item} index={index} key={item.id} />
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<AddGrade />
			</ListGrade>
		</Container>
	);
};

export default ClassGrade;
