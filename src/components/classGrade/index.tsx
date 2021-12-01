import React, { useState, useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

import { ClassesHeader } from '../classes/style';
import { ListGrade } from './style';
import Grade from './grade';
import Container from '../UI/Container';
import AddGrade from './addGrade';
import { reorder } from './helper';
import { IPointPart } from '../../type';
import { UpdatePointPartOrder } from '../../api/client';
import { ClassContext } from '../../store/class';

interface ClassGradeProps {
	grades: IPointPart[];
}

const ClassGrade: React.FC<ClassGradeProps> = ({ grades: initGrades }) => {
	const [grades, setGrades] = useState<IPointPart[]>(initGrades);
	const { currentClass } = useContext(ClassContext);

	const onDragEnd = async (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const newGrades = reorder(grades, result.source.index, result.destination.index);

		const newOrder = newGrades.map((grade, index) => ({ id: grade.id, order: index }));
		const response = await UpdatePointPartOrder(currentClass.id, newOrder);
		if (response) {
			setGrades([...newGrades]);
		} else {
			toast.error('Thay đổi thứ tự không thảnh công!');
		}
	};

	const HandleAddGrade = (newGrade: IPointPart) => {
		setGrades((prev) => [...prev, newGrade]);
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
								{grades.map((item, index) => (
									<Grade grade={item} index={index} key={item.id} />
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<AddGrade newOrder={grades.length + 1} onAddComplete={HandleAddGrade} />
			</ListGrade>
		</Container>
	);
};

export default ClassGrade;
